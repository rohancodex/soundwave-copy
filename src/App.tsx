import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { authRoutes, publicRoutes } from "./Routes";
import Cookies from "js-cookie";

function App() {
  const authUser = Cookies.get("authUser");
  const routes = authUser ? authRoutes : publicRoutes;
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
