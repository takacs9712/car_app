import React, { useState, useEffect } from "react";
import { get, ref, DataSnapshot } from "firebase/database";
import { db } from "../firebaseConfig";
import VehicleSelect from "../components/VehicleForm/VehicleSelect";
import SearchForm from "../components/SearchForm";
import { tableHeader } from "../components/DataList/TableHeader";

const DataList: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Data retrieval
  const fetchData = async () => {
    try {
      setLoading(true);
      const routeRef = ref(db, "routes");
      const snapshot: DataSnapshot = await get(routeRef);

      // Error handling
      if (!snapshot.exists()) {
        setData([]);
        return;
      }

      const fetchedData: RouteData[] = Object.entries(snapshot.val()).map(
        ([uuid, data]: [string, any]) => ({
          uuid,
          ...data,
        })
      );

      // mprocessing of each element, retrieves a vehicle data from the database for each element
      const finalData = await Promise.allSettled(
        fetchedData.map(async (route) => {
          const vehicleRef = ref(db, `vehicles/${route.vehicleId}`);
          const snapshot: DataSnapshot = await get(vehicleRef);
          // Add vehicle data to the current route
          return Object.assign(route, snapshot.val());
        })
      );

      const results = finalData.map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          console.error("Error fetching vehicle data:", result.reason);
          return null;
        }
      });

      setData(results.filter((result) => result !== null));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  // Search status update
  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  // Filter the data based on the search query
  const filteredData = data.filter((entry) =>
    entry.partnerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-10 mt-8 overflow-x-auto">
      <div className="flex flex-col overflow-auto">
        <h1 className="text-xl font-semibold">Adatlekérdezés</h1>
        <div className="py-10">
          <VehicleSelect />
        </div>
        <h1 className="text-xl font-semibold mb-4">Adatbázis</h1>
        <SearchForm updateSearchQuery={updateSearchQuery} />
        {loading ? (
          <p>Betöltés...</p>
        ) : filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {tableHeader.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((entry, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.partnerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.fromWhere}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.toWhere}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.distance} KM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.consumption} Liter
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.plate_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {entry.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Nem áll rendelkezésre adat</p>
        )}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
        onClick={handleRefresh}
      >
        Frissítés
      </button>
    </div>
  );
};

export default DataList;
