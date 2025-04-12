import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateWorkflow from "./pages/CreateWorkflow";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/create-workflow" element={<CreateWorkflow />} />
      </Route>
    </Routes>
  );
}

export default App;
