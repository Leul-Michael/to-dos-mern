import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { TodoContextProvider } from "./context/todoContext/TodoContext";
import { ListContextProvider } from "./context/listContext/ListContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TodoContextProvider>
        <ListContextProvider>
          <Router>
            <App />
          </Router>
        </ListContextProvider>
      </TodoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
