import { useState } from 'react';
import { FaPencilAlt, FaHome, FaBirthdayCake, FaCircleNotch, FaCalendarCheck, FaUsers, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SidebarLeft({ profile }) {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const toggleAccordion = (id) => setActiveAccordion(activeAccordion === id ? null : id);

  return (
    <div className="w3-col m3">
      <div className="w3-card w3-round w3-white">
        <div className="w3-container">
          <h4 className="w3-center">Mi Perfil</h4>
          <p className="w3-center"><img src={profile.avatar} className="w3-circle" style={{ height: '106px', width: '106px', objectFit: 'cover' }} alt="Avatar" /></p>
          <hr />
          <p><FaPencilAlt className="w3-margin-right w3-text-theme" /> {profile.role}</p>
          <p><FaHome className="w3-margin-right w3-text-theme" /> {profile.location}</p>
          <p><FaBirthdayCake className="w3-margin-right w3-text-theme" /> {profile.birthday}</p>
          <Link to="/profile" className="w3-button w3-block w3-theme-l4 w3-round w3-margin-bottom">
            <FaCog className="w3-margin-right" /> Editar Perfil
          </Link>
        </div>
      </div>
      <br />

      <div className="w3-card w3-round">
        <div className="w3-white">
          <button onClick={() => toggleAccordion('demo1')} className={`w3-button w3-block w3-left-align ${activeAccordion === 'demo1' ? 'w3-theme-d1' : 'w3-theme-l1'}`}>
            <FaCircleNotch className="w3-margin-right" /> Mis Grupos
          </button>
          <div className={`w3-container ${activeAccordion === 'demo1' ? 'w3-show' : 'w3-hide'}`}>
            <p>Contenido de grupos...</p>
            <Link to="/groups" className="w3-button w3-small w3-theme w3-round">Ir a Grupos</Link>
          </div>

          <button onClick={() => toggleAccordion('demo2')} className={`w3-button w3-block w3-left-align ${activeAccordion === 'demo2' ? 'w3-theme-d1' : 'w3-theme-l1'}`}>
            <FaCalendarCheck className="w3-margin-right" /> Mis Eventos
          </button>
          <div className={`w3-container ${activeAccordion === 'demo2' ? 'w3-show' : 'w3-hide'}`}>
            <p>Contenido de eventos...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarLeft;