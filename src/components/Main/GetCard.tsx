import adatmodositas from "../../assets/adatmodositas.webp";
import { Button } from "../buttons/Button";

export const GetCard: React.FC<CardProps> = ({ title, description, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={adatmodositas}
        alt="Adat lekérdezés"
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2>{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="mt-6">
          <div className="mt-6">
            <Button href={link}>Tovább</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
