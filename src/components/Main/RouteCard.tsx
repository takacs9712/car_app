import adatlekeres from "../../assets/adatlekeres.webp";
import { Button } from "../Buttons/Button";

export const RouteCard: React.FC<CardProps> = ({
  title,
  description,
  link,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={adatlekeres}
        alt="Útvonal rögzítés"
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2>{title}</h2>
        <p className="text-gray-600">{description}</p>
        <div className="mt-6">
          <Button to={link}>Tovább</Button>
        </div>
      </div>
    </div>
  );
};
