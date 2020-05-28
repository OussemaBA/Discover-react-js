import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./core/Routes/MainRouter";

require("dotenv").config();

const App = () => (
    
    <div>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </div>
);

export default App;
