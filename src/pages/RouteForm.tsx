import { useState, useEffect, FormEvent } from "react";
import { db } from "../firebaseConfig";
import { uid } from "uid";
import { ref, set, get } from "firebase/database";
import Modal from "../components/UI/Modal";

interface Vehicle {
  uuid: string;
  type: string;
}

const RouteForm = () => {
  const [date, setDate] = useState<string>("");
  const [fromWhere, setFromWhere] = useState<string>("");
  const [toWhere, setToWhere] = useState<string>("");
  const [partnerName, setPartnerName] = useState<string>("");
  const [distance, setDistance] = useState<string>("");
  const [vehicleId, setVehicleId] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const uuid = uid();

  useEffect(() => {
    const vehiclesRef = ref(db, `vehicles`);

    const fetchVehicles = async () => {
      try {
        const snapshot = await get(vehiclesRef);
        if (snapshot.exists()) {
          const vehiclesData: Vehicle[] = Object.keys(snapshot.val()).map(
            (key) => {
              const vehicleData = snapshot.val()[key];
              return {
                uuid: key,
                type: vehicleData.type,
              };
            }
          );
          setVehicles(vehiclesData);
        }
      } catch (error) {
        console.error("Error fetching vehicles data:", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // minimalistic validation
    let errors = ["Kérem adja a következőket"];

    if (!vehicleId) {
      errors.push("-Válasszon egy autótípust!");
    }
    if (!date) {
      errors.push("-Adjon meg egy dátumot!");
    }

    if (!fromWhere || !toWhere) {
      errors.push("-Töltsd ki mindkét helyszínt!");
    }

    if (!partnerName.trim()) {
      errors.push("-Adja meg a partner nevét!");
    }

    if (!distance || isNaN(parseFloat(distance)) || parseFloat(distance) <= 0) {
      errors.push(
        "-Adj meg egy érvényes, pozitív számot a megtett kilométerekhez!"
      );
    }

    if (errors.length > 1) {
      alert(errors.join("\n"));
      return;
    }

    // Send to database
    const routeRef = ref(db, `routes/${uuid}`);

    try {
      await set(routeRef, {
        uuid: uuid,
        date: date,
        fromWhere: fromWhere,
        toWhere: toWhere,
        partnerName: partnerName,
        distance: distance,
        vehicleId,
      });

      setModalOpen(true);
      setDate("");
      setFromWhere("");
      setToWhere("");
      setPartnerName("");
      setDistance("");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-10 mt-8">
        <div className="text-xl font-semibold mb-4">Útvonal rögzítése</div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Jármű modellje
                </label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                >
                  <option value="" disabled>
                    Válassza ki a típust
                  </option>
                  {vehicles.map((vehicle, index) => (
                    <option key={index} value={vehicle.uuid}>
                      {vehicle.type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dátum
                </label>
                <input
                  type="date"
                  placeholder="Dátum"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Honnan
            </label>
            <input
              type="text"
              placeholder="Honnan"
              value={fromWhere}
              onChange={(e) => setFromWhere(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hová
            </label>
            <input
              type="text"
              placeholder="Hová"
              value={toWhere}
              onChange={(e) => setToWhere(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Partner neve
            </label>
            <input
              type="text"
              placeholder="Partner neve"
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Megtett kilóméter
            </label>
            <input
              type="number"
              placeholder="Megtett kilóméter"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500  text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              Rögzítés
            </button>
          </div>
        </form>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          redirectPath="/app/data-list"
        >
          <h1 className="text-xl font-bold mb-4">Útvonal sikeresen rögzítve</h1>
          <p>
            Adatait lekérdezheti az <strong>IGEN</strong> gombra kattintva
          </p>
        </Modal>
      </div>
    </>
  );
};

export default RouteForm;
