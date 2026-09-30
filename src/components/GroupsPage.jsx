import { useState } from 'react';
import { FaUsers, FaPlus, FaStar, FaSearch, FaThumbsUp, FaComment, FaShare, FaTimes } from 'react-icons/fa';
import { initialGroups, initialGroupPosts } from '../data/mockData';

function GroupsPage() {
  const [myGroups, setMyGroups] = useState(initialGroups.slice(0, 20)); // Los primeros 20 son "Mis Grupos"
  const [suggestedGroups, setSuggestedGroups] = useState(initialGroups.slice(20)); // El resto son "Sugeridos"
  const [groupPosts, setGroupPosts] = useState(initialGroupPosts);
  
  const [activeGroup, setActiveGroup] = useState(null);
  const [newPostText, setNewPostText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estados para el modal de crear grupo
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');

  // Unirse a un grupo sugerido
  const handleJoinGroup = (id) => {
    const group = suggestedGroups.find(g => g.id === id);
    setMyGroups([...myGroups, group]);
    setSuggestedGroups(suggestedGroups.filter(g => g.id !== id));
    alert(`Te has unido a ${group.name}`);
  };

  // Crear un grupo nuevo
  const handleCreateGroup = () => {
    if (newGroupName.trim() === '') return;
    const newGroup = {
      id: Date.now(),
      name: newGroupName,
      members: '1',
      posts: 0,
      image: `https://picsum.photos/seed/newgroup${Date.now()}/100/100`,
      description: newGroupDesc || 'Un nuevo grupo creado por ti.'
    };
    setMyGroups([newGroup, ...myGroups]);
    setShowCreateModal(false);
    setNewGroupName('');
    setNewGroupDesc('');
    alert('¡Grupo creado exitosamente!');
  };

  // Publicar en el grupo activo
  const handlePost = () => {
    if (newPostText.trim() === '' || !activeGroup) return;
    const newPost = {
      id: Date.now(),
      groupId: activeGroup.id,
      author: 'Andrea Rodríguez',
      avatar: 'https://i.pravatar.cc/150?img=47',
      time: 'Ahora mismo',
      content: newPostText,
      image: null,
      likes: 0,
      comments: 0
    };
    setGroupPosts([newPost, ...groupPosts]);
    
    // Actualizar el contador de posts del grupo activo
    const updatedGroups = myGroups.map(g => 
      g.id === activeGroup.id ? { ...g, posts: g.posts + 1 } : g
    );
    setMyGroups(updatedGroups);
    setActiveGroup(prev => ({ ...prev, posts: prev.posts + 1 }));
    setNewPostText('');
  };

  // Filtrar grupos por búsqueda
  const filteredMyGroups = myGroups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSuggested = suggestedGroups.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w3-row-padding">
      {/* Columna Izquierda: Mis grupos */}
      <div className="w3-col m4">
        <div className="w3-card w3-round w3-white">
          <div className="w3-container w3-padding-16 w3-theme-d2 w3-round-top">
            <h3><FaUsers className="w3-margin-right" /> Mis grupos</h3>
          </div>
          <ul className="w3-ul w3-hoverable" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredMyGroups.map(group => (
              <li 
                key={group.id} 
                className={`w3-padding-16 w3-pointer ${activeGroup?.id === group.id ? 'w3-theme-l4' : ''}`}
                onClick={() => setActiveGroup(group)}
                style={{ cursor: 'pointer' }}
              >
                <img src={group.image} className="w3-left w3-circle w3-margin-right" style={{ width: '50px', height: '50px', objectFit: 'cover' }} alt="Grupo" />
                <span className="w3-large">{group.name}</span><br />
                <span className="w3-opacity">{group.members} miembros · {group.posts} publicaciones</span>
              </li>
            ))}
          </ul>
          <div className="w3-container w3-padding-16">
            <button onClick={() => setShowCreateModal(true)} className="w3-button w3-block w3-theme-l1 w3-round"><FaPlus className="w3-margin-right" /> Crear nuevo grupo</button>
          </div>
        </div>
      </div>

      {/* Columna Central: Publicaciones del grupo activo */}
      <div className="w3-col m5">
        {activeGroup ? (
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding-16 w3-theme-d1 w3-round-top">
              <h3>{activeGroup.name}</h3>
              <p className="w3-opacity">{activeGroup.description}</p>
            </div>
            <div className="w3-container w3-padding-16">
              <textarea 
                className="w3-input w3-border w3-round" 
                rows="2" 
                placeholder={`Escribe algo en ${activeGroup.name}...`}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
              />
              <button onClick={handlePost} className="w3-button w3-theme w3-margin-top w3-round">Publicar</button>
            </div>
            <div className="w3-container w3-padding-16" style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {/* Mostrar SOLO los posts de este grupo */}
              {groupPosts.filter(p => p.groupId === activeGroup.id).map(post => (
                <div key={post.id} className="w3-card w3-round w3-white w3-margin-bottom w3-padding-16">
                  <div className="w3-container">
                    <img src={post.avatar} className="w3-left w3-circle w3-margin-right" style={{ width: '40px' }} alt="Avatar" />
                    <strong>{post.author}</strong> <span className="w3-opacity w3-small">{post.time}</span>
                    <p>{post.content}</p>
                    {post.image && <img src={post.image} style={{ width: '100%', borderRadius: '8px' }} alt="Post" />}
                    <div className="w3-margin-top">
                      <button className="w3-button w3-small w3-round"><FaThumbsUp className="w3-margin-right" /> {post.likes}</button>
                      <button className="w3-button w3-small w3-round"><FaComment className="w3-margin-right" /> {post.comments}</button>
                      <button className="w3-button w3-small w3-round"><FaShare className="w3-margin-right" /> Compartir</button>
                    </div>
                  </div>
                </div>
              ))}
              {groupPosts.filter(p => p.groupId === activeGroup.id).length === 0 && (
                <p className="w3-center w3-opacity">No hay publicaciones aún. ¡Sé el primero!</p>
              )}
            </div>
          </div>
        ) : (
          <div className="w3-card w3-round w3-white w3-padding-32 w3-center">
            <FaUsers className="w3-xxlarge w3-opacity" />
            <p>Selecciona un grupo para ver sus publicaciones</p>
          </div>
        )}
      </div>

      {/* Columna Derecha: Grupos sugeridos y Buscar */}
      <div className="w3-col m3">
        <div className="w3-card w3-round w3-white w3-margin-bottom">
          <div className="w3-container w3-padding-16 w3-theme-d1 w3-round-top">
            <h4><FaStar className="w3-margin-right" /> Sugeridos</h4>
          </div>
          <ul className="w3-ul w3-hoverable" style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {filteredSuggested.map(group => (
              <li key={group.id} className="w3-padding-16">
                <img src={group.image} className="w3-left w3-circle w3-margin-right" style={{ width: '40px', height: '40px', objectFit: 'cover' }} alt="Grupo" />
                <span className="w3-medium">{group.name}</span><br />
                <span className="w3-small w3-opacity">{group.members} miembros</span>
                <button onClick={() => handleJoinGroup(group.id)} className="w3-button w3-small w3-green w3-right w3-round"><FaPlus /> Unirse</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w3-card w3-round w3-white">
          <div className="w3-container w3-padding-16">
            <h4>Buscar grupos</h4>
            <input 
              className="w3-input w3-border w3-round" 
              type="text" 
              placeholder="Nombre del grupo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="w3-button w3-theme-d2 w3-margin-top w3-round w3-block"><FaSearch className="w3-margin-right" /> Buscar</button>
          </div>
        </div>
      </div>

      {/* Modal para Crear Grupo */}
      {showCreateModal && (
        <div className="w3-modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1000 }}>
          <div className="w3-modal-content w3-card-4 w3-animate-zoom w3-round" style={{ maxWidth: '500px' }}>
            <header className="w3-container w3-theme-d2 w3-round-top"> 
              <span onClick={() => setShowCreateModal(false)} className="w3-button w3-display-topright"><FaTimes /></span>
              <h3>Crear nuevo grupo</h3>
            </header>
            <div className="w3-container w3-padding-16">
              <label>Nombre del grupo</label>
              <input className="w3-input w3-border w3-round w3-margin-bottom" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} placeholder="Ej: Amantes del café" />
              <label>Descripción</label>
              <textarea className="w3-input w3-border w3-round w3-margin-bottom" rows="2" value={newGroupDesc} onChange={(e) => setNewGroupDesc(e.target.value)} placeholder="¿De qué trata el grupo?" />
              <button onClick={handleCreateGroup} className="w3-button w3-theme-d2 w3-round w3-block">Crear Grupo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupsPage;