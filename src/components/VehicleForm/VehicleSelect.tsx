import React, { useState, useEffect } from "react";
import { get, ref, DataSnapshot } from "firebase/database";
import { db } from "../../firebaseConfig";

const VehicleSelect: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>();
  const [selectedVehicleData, setSelectedVehicleData] =
    useState<Vehicle | null>(null);
  const [uniqueVehicleTypes, setUniqueVehicleTypes] = useState<Set<string>>(
    new Set()
  );
  const [totalConsumption, setTotalConsumption] = useState<number>(0);
  const [totalDistance, setTotalDistance] = useState<number>(0);

  const fetchData = async () => {
    const dataRef = ref(db, "routes");

    try {
      const snapshot: DataSnapshot = await get(dataRef);

      if (snapshot.exists()) {
        const fetchedData: Route[] = Object.entries(snapshot.val()).map(
          ([uuid, data]: [string, any]) => ({
            uuid,
            ...data,
          })
        );

        // process each item, retrieving a vehicle from the database for each item
        const finalData: Vehicle[] = await Promise.all(
          fetchedData.map(async (route) => {
            const vehicleRef = ref(db, `vehicles/${route.vehicleId}`);
            const vehicleSnapshot: DataSnapshot = await get(vehicleRef);
            const vehicleData: Vehicle = vehicleSnapshot.val();
            // Add vehicle data to the current route
            return Object.assign(route, vehicleData);
          })
        );

        const uniqueTypes = new Set(finalData.map((vehicle) => vehicle.type));
        setUniqueVehicleTypes(uniqueTypes);

        const uniqueVehicles = finalData.filter((vehicle) => {
          return uniqueTypes.has(vehicle.type);
        });
        setVehicles(uniqueVehicles);
      } else {
        setVehicles([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVehicleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedVehicleId(value);
    setSelectedVehicleData(null);
    setTotalConsumption(0);
    setTotalDistance(0);
  };

  // Extra: total consumption on 100km
  const calculateAverageConsumption = (
    totalDistance: number,
    totalConsumption: number
  ) => {
    if (totalDistance === 0) {
      return 0;
    }
    return (totalConsumption / totalDistance) * 100;
  };

  // data querying
  const handleQueryData = async () => {
    if (!selectedVehicleId) return;

    const vehicleRef = ref(db, `vehicles/${selectedVehicleId}`);
    const snapshot: DataSnapshot = await get(vehicleRef);
    const vehicleData: Vehicle = snapshot.val();

    const filteredRoutes = vehicles.filter(
      (route) => route.vehicleId === selectedVehicleId
    );

    const totalConsumption = filteredRoutes.reduce(
      (acc, curr) => acc + parseInt(curr.consumption.toString()),
      0
    );
    const totalDistance = filteredRoutes.reduce(
      (acc, curr) => acc + parseInt(curr.distance.toString()),
      0
    );

    const averageConsumption = calculateAverageConsumption(
      totalDistance,
      totalConsumption
    );
    const roundedAverageConsumption = averageConsumption.toFixed(2);

    setTotalConsumption(totalConsumption);
    setTotalDistance(totalDistance);
    setSelectedVehicleData({
      ...vehicleData,
      averageConsumption: parseFloat(roundedAverageConsumption),
    });
  };

  return (
    <div className="w-full">
      <label htmlFor="vehicleSelect" className="block font-semibold">
        Válasszon járművet:
      </label>
      <select
        required
        id="vehicleSelect"
        className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
        value={selectedVehicleId || ""}
        onChange={handleVehicleChange}
      >
        <option value="" disabled>
          Válassza ki a típust
        </option>
        {[...uniqueVehicleTypes].map((type) => (
          <option
            key={type}
            value={vehicles.find((v) => v.type === type)?.uuid}
          >
            {type}
          </option>
        ))}
      </select>
      <div className="mt-3">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleQueryData}
        >
          Lekérdezés
        </button>

        {selectedVehicleData && (
          <div className="mt-4 p-4 border border-gray-300 rounded">
            <h3 className="font-bold mb-2">A kiválasztott jármű adatai</h3>
            <p>Összes fogyasztás: {totalConsumption} Liter</p>
            <p>Összes megtett kilóméter: {totalDistance} KM</p>
            <p>
              Átlagos fogyasztás : {selectedVehicleData.averageConsumption}{" "}
              Liter / 100 KM
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleSelect;
