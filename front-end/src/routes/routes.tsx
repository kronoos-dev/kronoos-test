import { Routes, Route } from "react-router-dom";

import Home from "../features/Home";
import "../App.css";
export default function BaseRoutes() {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
