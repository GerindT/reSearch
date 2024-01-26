import "./App.css";
import { Flowbite } from "flowbite-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Landing from "./pages/Landing";
import Paper from "./pages/Paper";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Flowbite>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}>
              <Route index element={<Home />} />
              <Route path="paper/:paper" element={<Paper />} />
              <Route path="/*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </>
  );
}

export default App;
