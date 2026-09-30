import { useState } from 'react';
import Post from './Post';
import Stories from './Stories';
import { FaPencilAlt, FaImage } from 'react-icons/fa';

function Feed({ posts, stories, onAddPost, profile, onProfileClick, onAddComment }) {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [visiblePosts, setVisiblePosts] = useState(10); // Mostrar solo 10 al inicio

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPostImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePost = () => {
    if (postText.trim() === '' && !postImage) return;
    onAddPost({
      id: Date.now(),
      author: profile.name,
      avatar: profile.avatar,
      time: 'Ahora mismo',
      content: postText,
      images: postImage ? [postImage] : [],
      likes: 0,
      comments: []
    });
    setPostText('');
    setPostImage(null);
    setVisiblePosts(prev => prev + 1); // Mostrar el nuevo post inmediatamente
  };

  return (
    <div className="w3-col m7">
      <Stories stories={stories} onProfileClick={onProfileClick} />
      
      {/* Crear Publicación */}
      <div className="w3-row-padding">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white">
            <div className="w3-container w3-padding">
              <h6 className="w3-opacity">Crea una publicación</h6>
              <textarea 
                className="w3-border w3-padding w3-round" 
                style={{ width: '100%', resize: 'none', fontFamily: 'inherit' }}
                rows="2"
                placeholder={`¿Qué estás pensando, ${profile.name}?`}
                value={postText} 
                onChange={(e) => setPostText(e.target.value)} 
              />
              {postImage && (
                <div className="w3-margin-top">
                  <img src={postImage} alt="Preview" style={{ maxHeight: '200px', borderRadius: '8px' }} />
                </div>
              )}
              <div className="w3-margin-top">
                <label className="w3-button w3-light-grey w3-round w3-margin-right" style={{ cursor: 'pointer' }}>
                  <FaImage className="w3-margin-right" /> Añadir foto
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
                <button type="button" className="w3-button w3-theme w3-round" onClick={handlePost}>
                  <FaPencilAlt className="w3-margin-right" /> Publicar
                </button> 
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Posts (con límite visible) */}
      {posts.slice(0, visiblePosts).map(post => (
        <Post key={post.id} post={post} onProfileClick={onProfileClick} onAddComment={onAddComment} />
      ))}

      {/* Botón Cargar Más */}
      {visiblePosts < posts.length && (
        <div className="w3-center w3-margin-top w3-margin-bottom">
          <button 
            onClick={() => setVisiblePosts(prev => prev + 10)} 
            className="w3-button w3-theme-l4 w3-round w3-large"
          >
            Cargar más publicaciones
          </button>
        </div>
      )}
    </div>
  );
}

export default Feed;