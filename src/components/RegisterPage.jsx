import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaCalendar, FaVenusMars, FaUserPlus } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', birthday: '1990-01-01', gender: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <div className="w3-content" style={{ maxWidth: '600px', marginTop: '50px' }}>
      <div className="w3-card-4 w3-round-xlarge w3-white">
        <div className="w3-container w3-theme-d2 w3-round-xlarge w3-padding-16">
          <h2 className="w3-center">Crear cuenta</h2>
        </div>
        <form className="w3-container w3-padding-24" onSubmit={handleRegister}>
          <div className="w3-section">
            <label><FaUser className="w3-margin-right" /> Nombre completo</label>
            <input className="w3-input w3-border w3-round" type="text" name="name" placeholder="Juan Pérez" onChange={handleChange} required />
          </div>
          <div className="w3-section">
            <label><FaEnvelope className="w3-margin-right" /> Correo electrónico</label>
            <input className="w3-input w3-border w3-round" type="email" name="email" placeholder="tu@email.com" onChange={handleChange} required />
          </div>
          <div className="w3-section">
            <label><FaLock className="w3-margin-right" /> Contraseña</label>
            <input className="w3-input w3-border w3-round" type="password" name="password" placeholder="********" onChange={handleChange} required />
          </div>
          <div className="w3-section">
            <label><FaCalendar className="w3-margin-right" /> Fecha de nacimiento</label>
            <input className="w3-input w3-border w3-round" type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
          </div>
          <div className="w3-section">
            <label><FaVenusMars className="w3-margin-right" /> Género</label>
            <select className="w3-select w3-border w3-round" name="gender" onChange={handleChange} required>
              <option value="" disabled selected>Selecciona</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="w3-section">
            <button type="submit" className="w3-button w3-theme-d2 w3-round w3-block w3-section"><FaUserPlus className="w3-margin-right" /> Registrarse</button>
          </div>
          <p className="w3-center">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>.</p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;