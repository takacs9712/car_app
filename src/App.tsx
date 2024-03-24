import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Main from "./pages/Main";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import VehicleForm from "./pages/VehicleForm";
import RouteForm from "./pages/RouteForm";
import DataList from "./pages/DataList";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Main /> }],
  },
  {
    path: "/app",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, path: "/app/data-capture/", element: <VehicleForm /> },
      { path: "/app/route-record/", element: <RouteForm /> },
      { path: "/app/data-list/", element: <DataList /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
