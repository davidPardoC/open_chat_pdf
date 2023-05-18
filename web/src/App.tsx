import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Library from "./pages/Library";
import "./App.css";
import ChatBook from "./pages/ChatBook";
const router = createBrowserRouter([
  { path: "/", element: <Library /> },
  { path: "/chatbook/:id", element: <ChatBook /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
