import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Line } from "recharts";

export const NEOTrackerGallery: React.FC<{ loadingData: any[] }> = ({
  loadingData,
}) => {
  return (
    <div className="neo-tracker-page">
      <h2>Lista NEO objekata</h2>
      <ul className="neo-list">
        {loadingData.map((neo) => (
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
            data={loadingData.map((neo) => ({
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
