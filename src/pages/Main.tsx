import bcg from "../assets/bcg.webp";
import { DataCard } from "../components/Main/DataCard";
import { GetCard } from "../components/Main/GetCard";
import { RouteCard } from "../components/Main/RouteCard";

const Main: React.FC = () => {
  const backgroundStyle = {
    backgroundImage: `url(${bcg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "multiply",
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24" style={backgroundStyle}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-8">
          Üdvözöljük az <strong>Útvonal Nyilvántartóban!</strong>
        </h1>

        <p className="text-lg mb-12">
          Kövesse nyomon útvonalait és gépjárműveit egyszerűen és hatékonyan.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <DataCard
            title="Gépjármű adatrögzítés"
            description="Rögzítse a gépjárműjét a megfelelő adatokkal."
            link="/app/data-capture/"
          />
          <RouteCard
            title="Útvonal rögzítés"
            description="Rögzítse a gépjárműje útvonalát a megfelelő adatokkal."
            link="/app/route-record/"
          />
          <GetCard
            title="Adatlekérdezés"
            description="Adatok lekérése a korábban rögzített útvonalakról."
            link="/app/data-list/"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
