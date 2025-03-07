import React, { useState } from "react";
import "../styles/neo/neo.css";
import { withLoader } from "../hoc/withLoader";
import { fetchNEOData } from "../services/fetchNEOData";
import { NEOTrackerGallery } from "../components/galeries/NEOTrackerGallery";
import { validateDates } from "../utils/validateDates";

const NEOTrackerWithLoading = withLoader(NEOTrackerGallery, fetchNEOData);

const NEOTrackerPage: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("2025-03-01");
  const [endDate, setEndDate] = useState<string>("2025-03-07");

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    if (validateDates(newStartDate, endDate)) {
      setStartDate(newStartDate);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    if (validateDates(startDate, newEndDate)) {
      setEndDate(newEndDate);
    }
  };

  return (
    <div className="neo-tracker-page">
      <h1 className="page-title">Near Earth Objects (NEO) Tracker</h1>

      <div className="filters">
        <label>Start date:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />

        <label>End date:</label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </div>

      <NEOTrackerWithLoading params={{ startDate, endDate }} />
    </div>
  );
};

export default NEOTrackerPage;
