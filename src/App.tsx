import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/react-fliflix" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:tvId" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movies/:movieId" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
