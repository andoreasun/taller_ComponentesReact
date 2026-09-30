function Stories({ stories, onProfileClick }) {
  return (
    <div className="w3-card w3-round w3-white w3-margin-bottom" style={{ padding: '15px 10px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {stories.map(story => (
        <div 
          key={story.id} 
          style={{ display: 'inline-block', margin: '0 10px', textAlign: 'center', cursor: 'pointer', width: '70px' }} 
          onClick={() => onProfileClick(story)}
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img 
              src={story.avatar} 
              alt={story.name} 
              className="w3-circle" 
              style={{ width: '60px', height: '60px', objectFit: 'cover', border: story.isOwn ? '2px solid #ccc' : '3px solid #1da1f2', padding: '2px' }} 
            />
            {story.isOwn && (
              <span className="w3-badge w3-blue w3-small" style={{ position: 'absolute', bottom: 0, right: 0, borderRadius: '50%' }}>+</span>
            )}
          </div>
          <p className="w3-small" style={{ margin: '5px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis' }}>{story.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Stories;