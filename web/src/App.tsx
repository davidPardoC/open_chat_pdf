import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Library from "./pages/Library";
import ChatBook from "./pages/ChatBook";
const router = createBrowserRouter([
  { path: "/", element: <Library /> },
  { path: "/book/:id", element: <ChatBook /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
