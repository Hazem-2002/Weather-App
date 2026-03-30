import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import History from "./Pages/History";
import Layout from "./Pages/Layout";
import Settings from "./Pages/Settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
