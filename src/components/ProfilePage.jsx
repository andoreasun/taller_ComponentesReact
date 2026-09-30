import { useState } from 'react';
import { FaCamera, FaSave, FaMapMarkerAlt, FaBirthdayCake, FaBriefcase, FaPencilAlt, FaImage, FaUser, FaTimes } from 'react-icons/fa';
import Post from './Post';

function ProfilePage({ profile, setProfile, posts, onAddPost }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null); // Estado para el Lightbox

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, avatar: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    alert('Perfil actualizado correctamente.');
  };

  const handlePostImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewPostImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (newPostText.trim() === '' && !newPostImage) return;
    onAddPost({
      id: Date.now(),
      author: profile.name,
      avatar: profile.avatar,
      time: 'Ahora mismo',
      content: newPostText,
      images: newPostImage ? [newPostImage] : [],
      likes: 0,
      comments: []
    });
    setNewPostText('');
    setNewPostImage(null);
  };

  const userPosts = posts.filter(p => p.author === profile.name);

  // Array de fotos de ejemplo
  const profilePhotos = [
    'https://picsum.photos/seed/p1/400/400',
    'https://picsum.photos/seed/p2/400/400',
    'https://picsum.photos/seed/p3/400/400',
    'https://picsum.photos/seed/p4/400/400',
    'https://picsum.photos/seed/p5/400/400',
    'https://picsum.photos/seed/p6/400/400',
    'https://picsum.photos/seed/p7/400/400',
    'https://picsum.photos/seed/p8/400/400',
    'https://picsum.photos/seed/p9/400/400',
  ];

  return (
    <div className="w3-row">
      {/* Columna Izquierda: Info del perfil */}
      <div className="w3-col m3">
        <div className="w3-card w3-round w3-white">
          <div className="w3-container w3-center w3-padding-16">
            <h4>Mi perfil</h4>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img src={isEditing ? formData.avatar : profile.avatar} className="w3-circle" style={{ height: '106px', width: '106px', objectFit: 'cover', marginTop: '10px' }} alt="Avatar" />
              {isEditing && (
                <label className="w3-button w3-circle w3-theme w3-small" style={{ position: 'absolute', bottom: '5px', right: '5px', cursor: 'pointer' }}>
                  <FaCamera />
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
              )}
            </div>
            <hr />
            
            {isEditing ? (
              <div className="w3-left-align">
                <label><FaUser className="w3-margin-right" /> Nombre</label>
                <input className="w3-input w3-border w3-round w3-margin-bottom" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                
                <label><FaBriefcase className="w3-margin-right" /> Rol</label>
                <input className="w3-input w3-border w3-round w3-margin-bottom" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
                
                <label><FaMapMarkerAlt className="w3-margin-right" /> Ubicación</label>
                <input className="w3-input w3-border w3-round w3-margin-bottom" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                
                <label><FaBirthdayCake className="w3-margin-right" /> Cumpleaños</label>
                <input className="w3-input w3-border w3-round w3-margin-bottom" value={formData.birthday} onChange={(e) => setFormData({...formData, birthday: e.target.value})} />
                
                <button onClick={handleSave} className="w3-button w3-block w3-theme-d2 w3-round w3-margin-bottom"><FaSave className="w3-margin-right" /> Guardar</button>
                <button onClick={() => setIsEditing(false)} className="w3-button w3-block w3-light-grey w3-round w3-margin-bottom">Cancelar</button>
              </div>
            ) : (
              <>
                <p><FaBriefcase className="w3-margin-right w3-text-theme" /> {profile.role}</p>
                <p><FaMapMarkerAlt className="w3-margin-right w3-text-theme" /> {profile.location}</p>
                <p><FaBirthdayCake className="w3-margin-right w3-text-theme" /> {profile.birthday}</p>
                <p><strong>1.2k</strong> seguidores · <strong>345</strong> siguiendo</p>
                <button onClick={() => setIsEditing(true)} className="w3-button w3-block w3-theme-d2 w3-round w3-margin-bottom"><FaPencilAlt className="w3-margin-right" /> Editar perfil</button>
              </>
            )}
          </div>
        </div>
        <br />
        {/* Fotos del perfil (Ahora se abren al hacer clic) */}
        <div className="w3-card w3-round w3-white w3-hide-small">
          <div className="w3-container w3-padding-16">
            <p><FaCamera className="w3-margin-right" /> Fotos</p>
            <div className="w3-row-padding">
              {profilePhotos.map((photo, index) => (
                <div className="w3-third" key={index}>
                  <img 
                    src={photo} 
                    style={{ width: '100%', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px' }} 
                    alt={`Foto ${index}`} 
                    onClick={() => setLightboxImage(photo)} // Abre el lightbox
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Columna Central: Publicaciones */}
      <div className="w3-col m7">
        <div className="w3-card w3-round w3-white w3-margin-bottom">
          <img src={profile.cover || 'https://picsum.photos/1200/300?random=99'} alt="Portada" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} />
          <div className="w3-container w3-padding">
            <h3>{profile.name} <span className="w3-opacity w3-medium">@{profile.name.toLowerCase().replace(' ', '_')}</span></h3>
            <p>{profile.role} · {profile.location}</p>
          </div>
        </div>

        <div className="w3-card w3-round w3-white w3-margin-bottom">
          <div className="w3-container w3-padding">
            <h6 className="w3-opacity">¿Qué estás pensando?</h6>
            <textarea className="w3-input w3-border w3-round" rows="2" placeholder="Comparte algo..." value={newPostText} onChange={(e) => setNewPostText(e.target.value)}></textarea>
            {newPostImage && (<div className="w3-margin-top"><img src={newPostImage} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px' }} /></div>)}
            <div className="w3-margin-top">
              <label className="w3-button w3-light-grey w3-round w3-margin-right" style={{ cursor: 'pointer' }}>
                <FaImage className="w3-margin-right" /> Añadir foto
                <input type="file" accept="image/*" onChange={handlePostImageUpload} style={{ display: 'none' }} />
              </label>
              <button onClick={handlePost} className="w3-button w3-theme w3-round"><FaPencilAlt className="w3-margin-right" /> Publicar</button>
            </div>
          </div>
        </div>

        {userPosts.map(post => (
          <Post key={post.id} post={post} onProfileClick={() => {}} onAddComment={() => {}} />
        ))}
        {userPosts.length === 0 && <p className="w3-center w3-opacity">Aún no has publicado nada.</p>}
      </div>

      {/* Columna Derecha */}
      <div className="w3-col m2">
        <div className="w3-card w3-round w3-white w3-center w3-padding-16 w3-margin-bottom">
          <p><i className="fa fa-calendar w3-margin-right"></i> Próximos eventos</p>
          <p><strong>Reunión de diseño</strong><br />Viernes 15:00</p>
          <button className="w3-button w3-block w3-theme-l4 w3-round">Info</button>
        </div>
        <div className="w3-card w3-round w3-white w3-padding-16 w3-center">
          <p>PUBLICIDAD</p>
          <img src="https://picsum.photos/200/100?random=20" alt="Ad" style={{ width: '100%', borderRadius: '8px' }} />
        </div>
      </div>

      {/* MODAL LIGHTBOX (Para ver las fotos en grande) */}
      {lightboxImage && (
        <div 
          className="w3-modal" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 10000, cursor: 'pointer' }} 
          onClick={() => setLightboxImage(null)}
        >
          <span className="w3-button w3-display-topright w3-xlarge w3-text-white">&times;</span>
          <div className="w3-modal-content w3-animate-zoom" style={{ backgroundColor: 'transparent', boxShadow: 'none', maxWidth: '90%', margin: 'auto' }}>
            <img 
              src={lightboxImage} 
              style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }} 
              alt="Zoom" 
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;