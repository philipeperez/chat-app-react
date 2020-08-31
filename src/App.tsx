import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes/Routes";
import { AppProvider } from "./providers/app-provider";

import "./App.css";

const App: FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes />
      </Router>
    </AppProvider>
  );
};

export default App;
