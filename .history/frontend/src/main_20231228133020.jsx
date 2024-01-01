import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as BrowserRouting } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouting>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </BrowserRouting>
  </React.StrictMode>
);
