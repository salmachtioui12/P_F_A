import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h1>Bienvenue sur votre tableau de bord</h1>
      <button onClick={handleLogout}>Déconnexion</button>
    </div>
  );
}