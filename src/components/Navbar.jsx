import { useState, useEffect, useRef } from 'react';
import { FaHome, FaGlobe, FaUser, FaEnvelope, FaBell, FaBars, FaUsers, FaCog, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { users } from '../data/mockData';

function Navbar({ profile, onLogout, notifications = [], messages = [] }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = (name) => setActiveDropdown(activeDropdown === name ? null : name);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) setActiveDropdown(null);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const news = [{ id: 1, title: 'Nueva versión de React', desc: 'React 19 ya está disponible.' }, { id: 2, title: 'Tendencias UX 2026', desc: 'Lo que se viene este año.' }];

  const headerStyle = { padding: '10px 15px', backgroundColor: '#f0f2f5', borderBottom: '1px solid #ddd', fontWeight: 'bold', fontSize: '16px', color: '#1c1e21' };
  const itemStyle = { display: 'flex', alignItems: 'center', padding: '10px 15px', borderBottom: '1px solid #f0f2f5', textDecoration: 'none', color: '#1c1e21', fontSize: '14px', cursor: 'pointer' };

  const searchResults = searchTerm.trim() === '' ? [] : users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5);

  return (
    <>
      <div className="w3-top" ref={navbarRef}>
        <div className="w3-bar w3-theme-d2 w3-left-align w3-large" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-padding-large w3-theme-d2" onClick={() => setIsMobileOpen(!isMobileOpen)}>
              <FaBars />
            </button>
            <Link to="/" className="w3-bar-item w3-button w3-padding-large w3-theme-d4" onClick={() => setActiveDropdown(null)}>
              <FaHome className="w3-margin-right" /> Red Social
            </Link>
          </div>

          <div className="w3-hide-small w3-hide-medium" style={{ position: 'relative', width: '300px' }}>
            <div className="w3-row">
              <div className="w3-col s10">
                <input 
                  type="text" 
                  className="w3-input w3-border w3-round w3-small" 
                  placeholder="Buscar personas o grupos..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              </div>
              <div className="w3-col s2 w3-center">
                <button className="w3-button w3-small w3-round" style={{ marginTop: '8px' }}><FaSearch /></button>
              </div>
            </div>
            {searchResults.length > 0 && (
              <div className="nav-dropdown-menu" style={{ left: 0, width: '300px', marginTop: '5px' }}>
                <div style={headerStyle}>Resultados de búsqueda</div>
                {searchResults.map(user => (
                  <div key={user.id} style={itemStyle} className="w3-hover-light-grey" onClick={() => { navigate('/profile'); setSearchTerm(''); setActiveDropdown(null); }}>
                    <img src={user.avatar} alt="Avatar" className="w3-circle w3-margin-right" style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                    <div><strong>{user.name}</strong><br/><span style={{ fontSize: '11px', color: '#65676b' }}>{user.role}</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="w3-hide-small nav-dropdown-container">
              <button className="w3-bar-item w3-button w3-padding-large w3-hover-white" onClick={() => toggleDropdown('news')} title="Noticias"><FaGlobe /></button>
              {activeDropdown === 'news' && (
                <div className="nav-dropdown-menu">
                  <div style={headerStyle}>Noticias</div>
                  {news.map(item => <div key={item.id} style={itemStyle} className="w3-hover-light-grey"><div><strong>{item.title}</strong><br/><span style={{ color: '#65676b', fontSize: '12px' }}>{item.desc}</span></div></div>)}
                </div>
              )}
            </div>

            <Link to="/profile" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Mi Perfil" onClick={() => setActiveDropdown(null)}><FaUser /></Link>
            
            <div className="w3-hide-small nav-dropdown-container">
              <button className="w3-bar-item w3-button w3-padding-large w3-hover-white" onClick={() => toggleDropdown('messages')} title="Mensajes"><FaEnvelope /></button>
              {activeDropdown === 'messages' && (
                <div className="nav-dropdown-menu">
                  <div style={headerStyle}>Mensajes</div>
                  {messages.slice(0, 5).map(msg => <div key={msg.id} style={itemStyle} className="w3-hover-light-grey" onClick={() => { navigate('/messages'); setActiveDropdown(null); }}><img src={msg.avatar} alt="Avatar" className="w3-circle w3-margin-right" style={{ width: '35px', height: '35px', objectFit: 'cover' }} /><div><strong>{msg.sender || msg.name}</strong><br/><span style={{ color: '#65676b', fontSize: '12px' }}>{msg.text || msg.lastMsg}</span></div></div>)}
                  <div className="w3-bar-item w3-button w3-center" onClick={() => { navigate('/messages'); setActiveDropdown(null); }}>Ver todos los mensajes</div>
                </div>
              )}
            </div>

            <div className="w3-hide-small nav-dropdown-container">
              <button className="w3-bar-item w3-button w3-padding-large w3-hover-white" onClick={() => toggleDropdown('notifications')} title="Notificaciones"><FaBell /><span className="w3-badge w3-right w3-small w3-green" style={{ position: 'absolute', top: '15px', right: '15px' }}>{notifications.length > 99 ? '99+' : notifications.length}</span></button>     
              {activeDropdown === 'notifications' && (
                <div className="nav-dropdown-menu">
                  <div style={headerStyle}>Notificaciones</div>
                  {notifications.slice(0, 5).map(notif => <div key={notif.id} style={itemStyle} className="w3-hover-light-grey"><img src={notif.avatar} alt="Avatar" className="w3-circle w3-margin-right" style={{ width: '35px', height: '35px', objectFit: 'cover' }} /><div>{notif.text}</div></div>)}
                  <div className="w3-bar-item w3-button w3-center">Ver todas</div>
                </div>
              )}
            </div>

            <Link to="/groups" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Grupos" onClick={() => setActiveDropdown(null)}><FaUsers /></Link>
            
            <Link to="/settings" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Configuración" onClick={() => setActiveDropdown(null)}><FaCog /></Link>
            <button onClick={onLogout} className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Cerrar Sesión"><FaSignOutAlt /></button>
            
            <Link to="/profile" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Mi Perfil" onClick={() => setActiveDropdown(null)}>
              <img src={profile.avatar} className="w3-circle" style={{ height: '30px', width: '30px', objectFit: 'cover' }} alt="Avatar" />
            </Link>
          </div>
        </div>
      </div>

      <div className={`w3-bar-block w3-theme-d2 w3-hide-large w3-hide-medium w3-large ${isMobileOpen ? 'w3-show' : 'w3-hide'}`}>
        <Link to="/" className="w3-bar-item w3-button w3-padding-large" onClick={() => setIsMobileOpen(false)}>Inicio</Link>
        <Link to="/profile" className="w3-bar-item w3-button w3-padding-large" onClick={() => setIsMobileOpen(false)}>Mi Perfil</Link>
        <Link to="/messages" className="w3-bar-item w3-button w3-padding-large" onClick={() => setIsMobileOpen(false)}>Mensajes</Link>
        <Link to="/groups" className="w3-bar-item w3-button w3-padding-large" onClick={() => setIsMobileOpen(false)}>Grupos</Link>
        <Link to="/settings" className="w3-bar-item w3-button w3-padding-large" onClick={() => setIsMobileOpen(false)}>Configuración</Link>
        <button onClick={onLogout} className="w3-bar-item w3-button w3-padding-large w3-left-align">Cerrar Sesión</button>
      </div>
    </>
  );
}

export default Navbar;