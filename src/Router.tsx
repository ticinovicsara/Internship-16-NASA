import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import {
  EarthImageryPage,
  HomePage,
  NEOTrackerPage,
  NotFoundPage,
} from "./pages";
import MarsRoverPage from "./pages/MarsRoverPage";
import ApodPage from "./pages/ApodPage";

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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
