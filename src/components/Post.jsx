import { useState } from 'react';
import { FaThumbsUp, FaComment, FaPaperPlane } from 'react-icons/fa';

function Post({ post, onProfileClick, onAddComment }) {
  const [likes, setLikes] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setLikes(hasLiked ? likes - 1 : likes + 1);
    setHasLiked(!hasLiked);
  };

  const handleCommentSubmit = () => {
    if (commentText.trim() === '') return;
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="w3-container w3-card w3-white w3-round w3-margin">
      <br />
      <div style={{ cursor: 'pointer', display: 'inline-block' }} onClick={() => onProfileClick({ name: post.author, avatar: post.avatar, role: 'Miembro de la comunidad', location: 'Desconocida' })}>
        <img src={post.avatar} alt="Avatar" className="w3-left w3-circle w3-margin-right" style={{ width: '60px' }} />
        <h4 style={{ margin: '0' }}>{post.author}</h4>
      </div>
      <span className="w3-right w3-opacity">{post.time}</span>
      <br />
      <hr className="w3-clear" />
      
      <p style={{ fontSize: '15px' }}>{post.content}</p>
      
      {post.images && post.images.length > 0 && (
        <div className="w3-row-padding" style={{ margin: '0 -16px' }}>
          {post.images.map((img, index) => (
            <div className={post.images.length === 1 ? "w3-col s12" : "w3-half"} key={index}>
              <img src={img} style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} alt="Post" />
            </div>
          ))}
        </div>
      )}

      <div className="w3-border-top w3-padding-small">
        <button 
          type="button" 
          className={`w3-button w3-round ${hasLiked ? 'w3-theme-d2' : 'w3-light-grey'}`} 
          onClick={handleLike}
          style={{ width: '48%', marginRight: '4%' }}
        >
          <FaThumbsUp className="w3-margin-right" /> Me gusta {likes > 0 && `(${likes})`}
        </button> 
        <button 
          type="button" 
          className={`w3-button w3-round ${showComments ? 'w3-theme-d2' : 'w3-light-grey'}`}
          onClick={() => setShowComments(!showComments)}
          style={{ width: '48%' }}
        >
          <FaComment className="w3-margin-right" /> Comentar {post.comments.length > 0 && `(${post.comments.length})`}
        </button> 
      </div>

      {/* Sección de Comentarios */}
      {showComments && (
        <div className="w3-container w3-padding w3-light-grey w3-round w3-margin-bottom w3-animate-opacity">
          {post.comments.map(comment => (
            <div key={comment.id} className="w3-margin-bottom" style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div className="w3-circle w3-theme-l3 w3-center" style={{ width: '35px', height: '35px', marginRight: '10px', lineHeight: '35px', fontSize: '14px', fontWeight: 'bold' }}>
                {comment.author.charAt(0)}
              </div>
              <div className="w3-white w3-padding-small w3-round" style={{ flex: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                <strong>{comment.author}</strong>
                <p style={{ margin: '2px 0 0 0', fontSize: '14px' }}>{comment.text}</p>
              </div>
            </div>
          ))}

          <div className="w3-row w3-margin-top">
            <div className="w3-col s10">
              <input 
                type="text" 
                className="w3-input w3-border w3-round" 
                placeholder="Escribe un comentario..." 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
              />
            </div>
            <div className="w3-col s2 w3-center">
              <button className="w3-button w3-theme w3-round" onClick={handleCommentSubmit}>
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;