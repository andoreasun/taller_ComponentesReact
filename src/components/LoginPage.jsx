import { useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(); // Actualiza el estado en App
      navigate('/'); // Redirige al feed
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className="w3-content" style={{ maxWidth: '500px', marginTop: '50px' }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center">Iniciar sesión</h2>
        </div>
        <form className="w3-container w3-padding-24" onSubmit={handleLogin}>
          <div className="w3-section">
            <label><FaEnvelope className="w3-margin-right" /> Correo electrónico</label>
            <input className="w3-input w3-border w3-round" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="w3-section">
            <label><FaLock className="w3-margin-right" /> Contraseña</label>
            <input className="w3-input w3-border w3-round" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="w3-section">
            <button type="submit" className="w3-button w3-theme-d2 w3-round w3-block w3-section"><FaSignInAlt className="w3-margin-right" /> Acceder</button>
          </div>
          <p className="w3-center"><a href="#">¿Olvidaste tu contraseña?</a></p>
          <p className="w3-center">¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>.</p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;