import { useState } from 'react';
import { FaTimes, FaUserPlus, FaComment, FaMapMarkerAlt, FaBriefcase, FaCheck } from 'react-icons/fa';

function ProfileModal({ user, onClose }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return null;

  const handleFollow = () => setIsFollowing(!isFollowing);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    alert(`Mensaje enviado a ${user.name}: "${message}"`);
    setMessage('');
    setShowMessageBox(false);
  };

  return (
    <div className="w3-modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000 }}>
      <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{ maxWidth: '450px', borderRadius: '16px', overflow: 'hidden' }}>
        <div className="w3-center">
          <span onClick={onClose} className="w3-button w3-display-topright w3-hover-red w3-round" style={{ margin: '10px', color: 'white', zIndex: 10 }}>
            <FaTimes />
          </span>
          <div style={{ backgroundColor: '#1da1f2', height: '120px' }}></div>
          <img src={user.avatar} alt="Avatar" className="w3-circle" style={{ width: '120px', height: '120px', marginTop: '-60px', border: '4px solid white', objectFit: 'cover', position: 'relative', zIndex: 5 }} />
        </div>
        <div className="w3-container w3-padding-16 w3-center">
          <h3 style={{ margin: '0 0 5px 0' }}>{user.name}</h3>
          <p className="w3-opacity" style={{ margin: '0 0 10px 0' }}>
            <FaBriefcase className="w3-margin-right w3-text-theme" /> 
            {user.role || 'Miembro de la Red Social'}
          </p>
          <p className="w3-opacity" style={{ margin: '0 0 15px 0' }}>
            <FaMapMarkerAlt className="w3-margin-right w3-text-theme" /> 
            {user.location || 'Ubicación desconocida'}
          </p>
          <hr />
          <div className="w3-row w3-padding-16">
            <div className="w3-half">
              <button 
                onClick={handleFollow}
                className={`w3-button w3-round ${isFollowing ? 'w3-green' : 'w3-theme'}`} 
                style={{ width: '90%' }}
              >
                {isFollowing ? <><FaCheck className="w3-margin-right"/> Siguiendo</> : <><FaUserPlus className="w3-margin-right"/> Seguir</>}
              </button>
            </div>
            <div className="w3-half">
              <button 
                onClick={() => setShowMessageBox(!showMessageBox)}
                className="w3-button w3-light-grey w3-round" 
                style={{ width: '90%' }}
              >
                <FaComment className="w3-margin-right" /> Mensaje
              </button>
            </div>
          </div>

          {/* Caja de mensaje rápida */}
          {showMessageBox && (
            <div className="w3-container w3-padding w3-light-grey w3-round w3-animate-opacity w3-margin-bottom">
              <input 
                type="text" 
                className="w3-input w3-border w3-round w3-margin-bottom" 
                placeholder={`Escribe un mensaje a ${user.name}...`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage} className="w3-button w3-theme w3-round w3-small w3-block">
                Enviar Mensaje
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;