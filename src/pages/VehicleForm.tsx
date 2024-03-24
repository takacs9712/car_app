import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebaseConfig";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import carModelsData from "../data/carModelsData";
import Modal from "../components/UI/Modal";
import InputField from "../components/VehicleForm/InputField";
import vehicle from "../assets/vehicle.webp";

const VehicleForm = () => {
  const [plateNumber, setPlateNumber] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [consumption, setConsumption] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!plateNumber || !type || !consumption) {
      alert("Please fill in all fields");
      return;
    }

    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy.MM.dd");

    try {
      const vehicleRef = ref(db, `vehicles/${uuid()}`);
      await set(vehicleRef, {
        plate_number: plateNumber,
        type,
        consumption,
        uuid: vehicleRef.key,
        added_date: formattedDate,
      });
      setModalOpen(true);
      setPlateNumber("");
      setType("");
      setConsumption("");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // minimal formatting for license plate (preserving xyz-123 format)
  const handlePlateNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toUpperCase();
    const lettersOnly = input.replace(/[^A-Z]/g, "");
    const numbersOnly = input.replace(/\D/g, "").slice(0, 3);
    const formattedPlateNumber = `${lettersOnly.slice(
      0,
      3
    )}-${numbersOnly.slice(0, 3)}`;

    setPlateNumber(formattedPlateNumber);
  };

  return (
    <>
      <div className="max-w-md mx-10 mt-8 ">
        <h2 className="text-xl font-semibold mb-4">Gépjármű hozzáadása</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Válasszon típust
              </option>
              {carModelsData.map((car, index) => (
                <option key={index} value={car.name}>
                  {car.name}
                </option>
              ))}
            </select>
          </div>
          <InputField
            type="text"
            placeholder="Rendszám (XYZ-123)"
            value={plateNumber}
            onChange={handlePlateNumberChange}
          />
          <InputField
            type="number"
            placeholder="Fogyasztás (liter/100 km)"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Hozzáadás
          </button>
        </form>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          redirectPath="/app/route-record"
        >
          <h1 className="text-xl font-bold mb-4">
            A gépjármű adatai sikeresen elmentve
          </h1>
          <p>Szeretné rögzíteni most az útvonalat?</p>
        </Modal>
      </div>
      <img
        src={vehicle}
        alt=""
        className="absolute bottom-0 right-0"
        style={{ zIndex: -10 }}
      />
    </>
  );
};

export default VehicleForm;
