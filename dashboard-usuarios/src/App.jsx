import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserCard from './components/UserCard';
import UserDetail from './components/UserDetail'; 
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const usuariosPorPagina = 6;

  useEffect(() => {
    fetch('http://localhost:3001/peoples')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Erro ao buscar usuarios:', err));
  }, []);

  const totalPaginas = Math.ceil(users.length / usuariosPorPagina);
  const indexDoUltimoUsuario = paginaAtual * usuariosPorPagina;
  const indexDoPrimeiroUser = indexDoUltimoUsuario - usuariosPorPagina;
  const currentUsers = users.slice(indexDoPrimeiroUser, indexDoUltimoUsuario);

  const paginaAtualVai = (page) => setPaginaAtual(page);
  const paginaAnterior = () => setPaginaAtual((prev) => Math.max(prev - 1, 1));
  const paginaProxima = () => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas));

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <h1>Dashboard de Usuarios</h1>
              <p>Total de usuarios: {users.length}</p>
              <div className="user-container">
                {currentUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
              <div className="paginacao">
                <button onClick={paginaAnterior} disabled={paginaAtual === 1}>
                  Página anterior
                </button>
                {Array.from({ length: totalPaginas }, (_, idx) => (
                  <button
                    key={idx + 1}
                    className={paginaAtual === idx + 1 ? 'active' : ''}
                    onClick={() => paginaAtualVai(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button onClick={paginaProxima} disabled={paginaAtual === totalPaginas}>
                  Próxima página
                </button>
              </div>
            </div>
          }
        />
        <Route path="/user/:id" element={<UserDetail users={users} />} />
      </Routes>
    </Router>
  );
}

export default App;