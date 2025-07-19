import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./app.css";
import MovieDetail from "./pages/MovieDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movieDetail/:id" element={<MovieDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
