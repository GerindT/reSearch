import "./App.css";
import { Flowbite } from "flowbite-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Landing from "./pages/Landing";

function App() {
  return (
    <>
      <Flowbite>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />}>
              {/* <Route index element={<Home />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="contact" element={<Contact />} /> */}
            </Route>
            <Route path="/*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </>
  );
}

export default App;
