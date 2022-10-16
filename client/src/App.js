import "./index.css";
import "antd/dist/antd.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Index />
              </PublicRoute>
            }
          />

          <Route
            path="/easy-booking"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
