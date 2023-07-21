import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/LogIn";
import ProtectedLayout from "./layouts/ProtectedLayout";
import RootLayout from "./layouts/RootLayout";
import { ErrorBoundry } from "./pages/errorBoundry/ErrorBoundry";

export const publicRoutes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement:<ErrorBoundry/>,
    children: [{ path: "/", element: <Login /> }],
  
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const authRoutes = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <ErrorBoundry/>,
    loader: () => <>Loading...</>,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
