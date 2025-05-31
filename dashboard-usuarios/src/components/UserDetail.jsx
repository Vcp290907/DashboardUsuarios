import { useParams, Link } from 'react-router-dom';
import './UserDetail.css';

function UserDetail({ users }) {
  const { id } = useParams();
  const user = users.find((u) => String(u.id) === id);

  if (!user) {
    return (
      <div>
        <p>Usuário não encontrado.</p>
        <Link to="/">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="user-detail">
      <img src={user.avatar} className="avatar-large" />
      <h2>{user.firstName} {user.lastName}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Endereço:</strong> {user.address}</p>
      <Link to="/" className="back-btn">Voltar</Link>
    </div>
  );
}

export default UserDetail;