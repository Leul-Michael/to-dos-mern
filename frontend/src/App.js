import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import NewTask from "./pages/Newtask/NewTask";
import NewList from "./pages/Newlist/NewList";
import Register from "./pages/Sign/Register";
import Login from "./pages/Sign/Login";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      <Navigate to="/login" />;
    }
  }, [user]);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={user ? <Home /> : <Navigate to="/login" />} />
          {user && (
            <>
              <Route path="new/">
                <Route path="task" element={<NewTask />} />
                <Route path="list" element={<NewList />} />
              </Route>
              <Route path="edit/">
                <Route path="task/:id" element={<NewTask />} />
                <Route path="list/:id" element={<NewList />} />
              </Route>
            </>
          )}
          <Route
            path="login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
