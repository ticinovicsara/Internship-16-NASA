import { useState } from "react";
import useFetchNEO from "../hooks/useFetchNEO";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import "../styles/neo/neo.css";

const NEOTrackerPage: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("2025-03-01");
  const [endDate, setEndDate] = useState<string>("2025-03-07");

  const { data, loading, error } = useFetchNEO(startDate, endDate);

  return (
    <div className="neo-tracker-page">
      <h1 className="page-title">Near Earth Objects (NEO) Tracker</h1>

      <div className="filters">
        <label>Početni datum:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label>Završni datum:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {loading && <p>Učitavanje...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Lista NEO objekata</h2>
      <ul className="neo-list">
        {data.map((neo) => (
          <li key={neo.id}>
            <Link to={`/details/neo/${neo.id}`}>
              <strong>{neo.name}</strong>
            </Link>
            {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
              2
            )}{" "}
            km
          </li>
        ))}
      </ul>

      <h2>Grafikon: Maksimalni prečnik objekata</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data.map((neo) => ({
              name: neo.name,
              diameter:
                neo.estimated_diameter.kilometers.estimated_diameter_max,
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="diameter" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default NEOTrackerPage;
