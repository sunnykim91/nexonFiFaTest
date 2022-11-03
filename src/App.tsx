import React, { useEffect } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import NEXONAPI from "./NEXONAPI";
import HomePage from "./HomePage/HomPage";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
}

export default App;
