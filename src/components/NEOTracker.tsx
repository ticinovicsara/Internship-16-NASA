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

const NEOTracker: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("2025-03-01");
  const [endDate, setEndDate] = useState<string>("2025-03-07");

  const { data, loading, error } = useFetchNEO(startDate, endDate);

  return (
    <div>
      <h1>Near Earth Objects (NEO) Tracker</h1>

      <div>
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
      <ul>
        {data.map((neo) => (
          <li key={neo.id}>
            <strong>{neo.name}</strong> -{" "}
            {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
              2
            )}{" "}
            km
          </li>
        ))}
      </ul>

      <h2>Grafikon: Maksimalni prečnik objekata</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data.map((neo) => ({
            name: neo.name,
            diameter: neo.estimated_diameter.kilometers.estimated_diameter_max,
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
  );
};

export default NEOTracker;
