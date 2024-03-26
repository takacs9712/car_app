import React, { useState, useEffect } from "react";
import { get, ref, DataSnapshot } from "firebase/database";
import { db } from "../firebaseConfig";
import VehicleSelect from "../components/VehicleForm/VehicleSelect";
import SearchForm from "../components/SearchForm/SearchForm";
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
    <div className="max-w-md md:max-w-full mx-10 mt-8 overflow-x-auto">
      <h1 className="text-xl font-semibold mb-10">Adatlekérdezés</h1>
      <div className="flex flex-col">
        <div className="mb-4">
          <VehicleSelect />
        </div>
        <h1 className="text-xl font-semibold my-6">Adatbázis</h1>
        <SearchForm updateSearchQuery={updateSearchQuery} />
        {loading ? (
          <p>Betöltés...</p>
        ) : filteredData.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4 ">
            <thead className="text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {tableHeader.map((header, index) => (
                  <th key={index} scope="col" className="p-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y border divide-gray-200">
              {filteredData.map((entry, index) => (
                <tr key={index}>
                  <td className="p-3">{entry.partnerName}</td>
                  <td className="p-3">{entry.type}</td>
                  <td className="p-3">{entry.fromWhere}</td>
                  <td className="p-3">{entry.toWhere}</td>
                  <td className="p-3">{entry.distance} KM</td>
                  <td className="p-3">{entry.consumption} Liter</td>
                  <td className="p-3">{entry.plate_number}</td>
                  <td className="p-3">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
