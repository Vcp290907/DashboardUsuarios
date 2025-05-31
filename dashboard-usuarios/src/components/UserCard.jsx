// src/components/UserCard.jsx
import { Link } from 'react-router-dom';
import './UserCard.css';

function UserCard({ user }) {
  return (
    <Link to={`/user/${user.id}`} className="user-card-link">
      <div className="user-card">
        <img src={user.avatar} alt={user.nome} className="avatar" />
        <h3>{user.firstName} {user.lastName}</h3>
      </div>
    </Link>
  );
}

export default UserCard;