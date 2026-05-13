import "./styles.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/client/Main";
import ClientLayout from "./layouts/ClientLayout";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
