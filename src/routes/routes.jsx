import { Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import Register from "../components/Register";
import Admin from "../components/Admin";

import Private from "./Private";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin"
        element={
          <Private>
            <Admin />
          </Private>
        }
      />
    </Routes>
  );
}

export default RoutesApp;
