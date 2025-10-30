import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./css/index.css";
import App from "./App.jsx";
// import AuthForm from "./components/UserProfile.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App />
      {/* <AuthForm/> */}
    </BrowserRouter>
);
