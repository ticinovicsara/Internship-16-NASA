import { Link } from "react-router-dom";
import "../styles/home/card.css"; // Dodajte odgovarajući CSS za kartice

interface CardProps {
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, description, link }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link} className="card-link">
        See Details
      </Link>
    </div>
  );
};

export default Card;
