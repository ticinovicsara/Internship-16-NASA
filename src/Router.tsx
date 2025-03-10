import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { HomePage, NotFoundPage } from "./pages/index.ts";
import MarsRoverPage from "./pages/MarsRoverPage";
import { ApodPage } from "./pages";
import NEOTrackerPage from "./pages/NEOTrackerPage";
import EarthImageryPage from "./pages/EarthImageryPage";
import DetailPage from "./pages/DetailPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="apod" element={<ApodPage />} />
          <Route path="mars" element={<MarsRoverPage />} />
          <Route path="neo" element={<NEOTrackerPage />} />
          <Route path="earth" element={<EarthImageryPage />} />
          <Route path="/details/:type/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
