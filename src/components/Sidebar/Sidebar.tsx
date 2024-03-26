import { Link } from "react-router-dom";
import { FcAddDatabase, FcDatabase } from "react-icons/fc";
import { TbCornerDownRight } from "react-icons/tb";

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-y-0 left-0 w-64 bg-gray-800 text-white flex-col justify-between sm:block`}
    >
      <div className="p-4">
        <h1 className="text-xl font-bold mb-10">Útvonal Nyilvántartás</h1>
        <h1 className="text-xl font-bold  text-slate-300">Navigáció</h1>
        <TbCornerDownRight />

        <ul className="ml-5">
          <li className="mb-2 ">
            <Link
              to="/app/data-capture/"
              className="flex items-center text-gray-300 hover:text-white"
            >
              <FcAddDatabase className="mr-2" />
              Gépjármű adatok
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/app/route-record/"
              className="flex items-center text-gray-300 hover:text-white"
            >
              <FcAddDatabase className="mr-2" />
              Útvonal rögzítés
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/app/data-list/"
              className="flex items-center text-gray-300 hover:text-white"
            >
              <FcDatabase className="mr-2" />
              Adatlekérdezés
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
