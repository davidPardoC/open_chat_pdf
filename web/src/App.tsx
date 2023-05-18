import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Library from "./pages/Library";
import './App.css'
const router = createBrowserRouter([{ path: "/", element: <Library /> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
