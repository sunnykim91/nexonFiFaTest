import React, { useEffect } from "react";
import "./App.css";
import { Grid } from "@mui/material";
import NEXONAPI from "./NEXONAPI";

function App() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await NEXONAPI.fetchMatchTypes();
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return <Grid>NEXON</Grid>;
}

export default App;
