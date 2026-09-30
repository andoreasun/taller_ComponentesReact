import { useState } from 'react';
import { FaCogs, FaSave, FaLock, FaBell } from 'react-icons/fa';

function SettingsPage({ profile, setProfile }) {
  const [activeTab, setActiveTab] = useState('General');
  const [formData, setFormData] = useState(profile);
  const [privacySettings, setPrivacySettings] = useState({ profileView: 'Solo amigos', friendRequests: 'Amigos de amigos', password: '' });
  const [notifications, setNotifications] = useState({ email: true, messages: true, birthdays: false, groups: true });

  const handleSaveGeneral = () => {
    setProfile(formData);
    alert('Cambios guardados exitosamente.');
  };

  const handleSavePrivacy = () => alert('Privacidad actualizada.');
  const handleSaveNotifications = () => alert('Preferencias de notificaciones guardadas.');

  const tabStyle = (tabName) => `w3-bar-item w3-button ${activeTab === tabName ? 'w3-theme-d1' : ''}`;

  return (
    <div className="w3-content" style={{ maxWidth: '1000px' }}>
      <div className="w3-card w3-round w3-white">
        <div className="w3-container w3-padding-16 w3-theme-d2 w3-round-top">
          <h2><FaCogs className="w3-margin-right" /> Configuración de la cuenta</h2>
        </div>

        <div className="w3-bar w3-theme-l4">
          <button className={tabStyle('General')} onClick={() => setActiveTab('General')}>General</button>
          <button className={tabStyle('Privacidad')} onClick={() => setActiveTab('Privacidad')}>Privacidad</button>
          <button className={tabStyle('Notificaciones')} onClick={() => setActiveTab('Notificaciones')}>Notificaciones</button>
        </div>

        {activeTab === 'General' && (
          <div className="w3-container w3-padding-24 w3-animate-opacity">
            <h4>Información personal</h4>
            <div className="w3-section">
              <label>Nombre</label>
              <input className="w3-input w3-border w3-round" type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="w3-section">
              <label>Correo electrónico</label>
              <input className="w3-input w3-border w3-round" type="email" value="andrea@email.com" readOnly />
            </div>
            <div className="w3-section">
              <label>Biografía / Rol</label>
              <textarea className="w3-input w3-border w3-round" rows="3" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}></textarea>
            </div>
            <button className="w3-button w3-theme-d2 w3-round" onClick={handleSaveGeneral}><FaSave className="w3-margin-right" /> Guardar cambios</button>
          </div>
        )}

        {activeTab === 'Privacidad' && (
          <div className="w3-container w3-padding-24 w3-animate-opacity">
            <h4>Privacidad y seguridad</h4>
            <div className="w3-section">
              <label>¿Quién puede ver tu perfil?</label>
              <select className="w3-select w3-border w3-round" value={privacySettings.profileView} onChange={(e) => setPrivacySettings({...privacySettings, profileView: e.target.value})}>
                <option>Todos</option><option>Solo amigos</option><option>Solo yo</option>
              </select>
            </div>
            <div className="w3-section">
              <label>¿Quién puede enviarte solicitudes?</label>
              <select className="w3-select w3-border w3-round" value={privacySettings.friendRequests} onChange={(e) => setPrivacySettings({...privacySettings, friendRequests: e.target.value})}>
                <option>Todos</option><option>Amigos de amigos</option>
              </select>
            </div>
            <div className="w3-section">
              <label>Cambiar contraseña</label>
              <input className="w3-input w3-border w3-round" type="password" placeholder="Nueva contraseña" value={privacySettings.password} onChange={(e) => setPrivacySettings({...privacySettings, password: e.target.value})} />
            </div>
            <button className="w3-button w3-theme-d2 w3-round" onClick={handleSavePrivacy}><FaLock className="w3-margin-right" /> Actualizar privacidad</button>
          </div>
        )}

        {activeTab === 'Notificaciones' && (
          <div className="w3-container w3-padding-24 w3-animate-opacity">
            <h4>Preferencias de notificaciones</h4>
            <div className="w3-section">
              <input className="w3-check" type="checkbox" checked={notifications.email} onChange={(e) => setNotifications({...notifications, email: e.target.checked})} /> <label>Recibir notificaciones por correo</label>
            </div>
            <div className="w3-section">
              <input className="w3-check" type="checkbox" checked={notifications.messages} onChange={(e) => setNotifications({...notifications, messages: e.target.checked})} /> <label>Notificaciones de nuevos mensajes</label>
            </div>
            <div className="w3-section">
              <input className="w3-check" type="checkbox" checked={notifications.birthdays} onChange={(e) => setNotifications({...notifications, birthdays: e.target.checked})} /> <label>Notificaciones de cumpleaños</label>
            </div>
            <div className="w3-section">
              <input className="w3-check" type="checkbox" checked={notifications.groups} onChange={(e) => setNotifications({...notifications, groups: e.target.checked})} /> <label>Notificaciones de grupos</label>
            </div>
            <button className="w3-button w3-theme-d2 w3-round" onClick={handleSaveNotifications}><FaBell className="w3-margin-right" /> Guardar preferencias</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;