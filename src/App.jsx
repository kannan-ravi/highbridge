import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateWorkflow from "./pages/CreateWorkflow";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/create-workflow" element={<CreateWorkflow />} />
      </Route>
    </Routes>
  );
}

export default App;
