import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import {
  HomePage,
  ApodPage,
  MarsRoverPage,
  NEOTrackerPage,
  EarthImageryPage,
  NotFoundPage,
} from "./pages/index";

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
