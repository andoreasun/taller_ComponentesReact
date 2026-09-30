import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaUsers, FaComments, FaImages, FaHeart } from 'react-icons/fa';

function LandingPage() {
  return (
    <div className="w3-content" style={{ maxWidth: '1200px', marginTop: '50px' }}>
      <div className="w3-row-padding w3-margin-bottom">
        <div className="w3-col m6">
          <h1 className="w3-xxxlarge w3-text-theme"><strong>RedSocial</strong></h1>
          <p className="w3-xlarge">Conecta con amigos, comparte momentos y descubre nuevas comunidades.</p>
          <div className="w3-margin-top">
            <Link to="/login" className="w3-button w3-theme-d2 w3-round w3-margin-right w3-large"><FaSignInAlt className="w3-margin-right" /> Iniciar sesión</Link>
            <Link to="/register" className="w3-button w3-theme-l4 w3-round w3-large"><FaUserPlus className="w3-margin-right" /> Registrarse</Link>
          </div>
          <div className="w3-margin-top w3-padding-16 w3-light-grey w3-round">
            <h4>¿Por qué unirte?</h4>
            <ul className="w3-ul">
              <li><FaUsers className="w3-margin-right w3-text-theme" /> Grupos de interés para todos.</li>
              <li><FaComments className="w3-margin-right w3-text-theme" /> Mensajería instantánea.</li>
              <li><FaImages className="w3-margin-right w3-text-theme" /> Comparte fotos y momentos.</li>
              <li><FaHeart className="w3-margin-right w3-text-theme" /> Reacciona a las publicaciones.</li>
            </ul>
          </div>
        </div>
        <div className="w3-col m6">
          <img src="https://picsum.photos/600/400?random=100" alt="Landing" className="w3-round w3-image w3-card" style={{ width: '100%' }} />
          <div className="w3-row-padding w3-margin-top">
            <div className="w3-half"><img src="https://picsum.photos/300/200?random=101" className="w3-round w3-image" style={{ width: '100%' }} alt="Preview" /></div>
            <div className="w3-half"><img src="https://picsum.photos/300/200?random=102" className="w3-round w3-image" style={{ width: '100%' }} alt="Preview" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;