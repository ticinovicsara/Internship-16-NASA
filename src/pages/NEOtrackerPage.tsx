import React, { useState } from "react";
import "../styles/neo/neo.css";
import { withLoader } from "../hoc/withLoader";
import { fetchNEOData } from "../services/fetchNEOData";
import { NEOTrackerGallery } from "../components/galeries/NEOTrackerGallery";

const NEOTrackerWithLoading = withLoader(NEOTrackerGallery, fetchNEOData);

const NEOTrackerPage: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("2025-03-01");
  const [endDate, setEndDate] = useState<string>("2025-03-07");

  return (
    <div className="neo-tracker-page">
      <h1 className="page-title">Near Earth Objects (NEO) Tracker</h1>

      <div className="filters">
        <label>Start date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>End date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <NEOTrackerWithLoading params={{ startDate, endDate }} />
    </div>
  );
};

export default NEOTrackerPage;
