import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();

  const backToMain = () => {
    navigate("/");
  };

  return (
    <>
      <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16 ">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className="">
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  Úgy tűnik, ez az oldal virtuális vakációra ment. Élvezze a
                  váratlan kitérőt, és ne feledjék: Az eltévedés csak a kaland
                  kezdete! 🚀🌍
                </h1>
                <p className="my-2 text-gray-800">
                  Úgy érzi, mintha egy digitális sitcomban ragadt volna? Ne
                  aggódjon! Ön megtalálhatja a kiutat.
                </p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                  onClick={backToMain}
                >
                  Kezdőlap
                </button>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
