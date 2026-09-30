import { FaTimes, FaUserPlus } from 'react-icons/fa';

function FriendsListModal({ users, onClose, onProfileClick }) {
  if (!users) return null;

  return (
    <div className="w3-modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000 }}>
      <div className="w3-modal-content w3-card-4 w3-animate-zoom" style={{ maxWidth: '600px', borderRadius: '16px', overflow: 'hidden' }}>
        <header className="w3-container w3-theme-d2 w3-padding"> 
          <span onClick={onClose} className="w3-button w3-display-topright"><FaTimes /></span>
          <h3>Descubre Personas</h3>
        </header>
        <div className="w3-container w3-padding-16" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <div className="w3-row-padding">
            {users.map(user => (
              <div key={user.id} className="w3-col s6 m4 w3-margin-bottom w3-center">
                <div className="w3-card w3-padding w3-round w3-hover-shadow" style={{ cursor: 'pointer' }} onClick={() => { onProfileClick(user); onClose(); }}>
                  <img src={user.avatar} alt={user.name} className="w3-circle" style={{ width: '70px', height: '70px', objectFit: 'cover', marginBottom: '10px' }} />
                  <p style={{ margin: '0', fontWeight: 'bold', fontSize: '14px' }}>{user.name}</p>
                  <p className="w3-small w3-opacity" style={{ margin: '0 0 10px 0' }}>{user.role}</p>
                  <button className="w3-button w3-theme-l4 w3-round w3-small" style={{ width: '100%' }}>
                    <FaUserPlus className="w3-margin-right" /> Seguir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendsListModal;