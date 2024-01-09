import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MovieDetailsPages from "./pages/MovieDetailsPages";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/movie/:movie_id" element={<MovieDetailsPages />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
