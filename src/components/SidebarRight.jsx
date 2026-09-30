import { useState } from 'react';
import { FaCheck, FaTimes, FaUserPlus, FaCalendarCheck } from 'react-icons/fa';

function SidebarRight({ friendRequests, onlineFriends, events, onAccept, onDecline, onProfileClick, onOpenFriendsList }) {
  const [attendingEvents, setAttendingEvents] = useState([]);

  const toggleAttend = (eventId) => {
    if (attendingEvents.includes(eventId)) {
      setAttendingEvents(attendingEvents.filter(id => id !== eventId));
    } else {
      setAttendingEvents([...attendingEvents, eventId]);
    }
  };

  return (
    <div className="w3-col m2">
      
      {/* EVENTOS */}
      <div className="w3-card w3-round w3-white w3-margin-bottom">
        <div className="w3-container w3-padding-small">
          <p className="w3-center w3-opacity"><strong>Próximos Eventos</strong></p>
          {/* Scroll para eventos */}
          <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '5px' }}>
            {events.map(event => {
              const isAttending = attendingEvents.includes(event.id);
              return (
                <div key={event.id} className="w3-margin-bottom w3-border-bottom w3-padding-small">
                  <img src={event.image} alt={event.title} style={{ width: '100%', borderRadius: '8px', height: '70px', objectFit: 'cover' }} />
                  <p style={{ margin: '5px 0 0 0', fontSize: '12px', fontWeight: 'bold' }}>{event.title}</p>
                  <p className="w3-small w3-opacity" style={{ margin: '2px 0' }}>{event.date}</p>
                  <p className="w3-tiny w3-text-theme" style={{ margin: '2px 0' }}>{event.attendees} asistentes</p>
                  <button 
                    onClick={() => toggleAttend(event.id)}
                    className={`w3-button w3-block w3-round w3-small ${isAttending ? 'w3-green' : 'w3-theme-l4'}`} 
                    style={{ padding: '2px' }}
                  >
                    {isAttending ? <><FaCheck className="w3-margin-right"/> Asistiré</> : 'Asistir'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AMIGOS EN LÍNEA */}
      <div className="w3-card w3-round w3-white w3-margin-bottom">
        <div className="w3-container w3-padding-small">
          <p className="w3-center w3-opacity"><strong>Amigos en Línea</strong></p>
          {/* Scroll para amigos */}
          <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {onlineFriends.map(friend => (
              <div 
                key={friend.id} 
                className="w3-margin-bottom w3-padding-small w3-hover-light-grey w3-round" 
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                onClick={() => onProfileClick(friend)}
              >
                <div style={{ position: 'relative', marginRight: '10px' }}>
                  <img src={friend.avatar} alt={friend.name} className="w3-circle" style={{ width: '30px', height: '30px', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', backgroundColor: '#4caf50', borderRadius: '50%', border: '2px solid white' }}></span>
                </div>
                <span style={{ fontSize: '12px' }}>{friend.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SOLICITUDES DE AMISTAD */}
      <div className="w3-card w3-round w3-white w3-margin-bottom">
        <div className="w3-container w3-padding-small">
          <p className="w3-center w3-opacity"><strong>Solicitudes</strong></p>
          {/* Scroll para solicitudes */}
          <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {friendRequests.length === 0 ? (
              <p className="w3-small w3-center w3-opacity">No hay solicitudes pendientes</p>
            ) : (
              friendRequests.map(req => (
                <div key={req.id} className="w3-margin-bottom w3-padding-small w3-border-bottom w3-center">
                  <img src={req.avatar} alt="Avatar" className="w3-circle" style={{ width: '40px', height: '40px', objectFit: 'cover', marginBottom: '5px' }} />
                  <p style={{ fontSize: '12px', margin: '0' }}>{req.name}</p>
                  <div className="w3-row w3-margin-top">
                    <div className="w3-half">
                      <button onClick={() => onAccept(req.id)} className="w3-button w3-block w3-green w3-tiny w3-round" title="Accept"><FaCheck /></button>
                    </div>
                    <div className="w3-half">
                      <button onClick={() => onDecline(req.id)} className="w3-button w3-block w3-red w3-tiny w3-round" title="Decline"><FaTimes /></button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <button onClick={onOpenFriendsList} className="w3-button w3-block w3-theme-l4 w3-round w3-small" style={{ padding: '2px' }}>
            <FaUserPlus className="w3-margin-right" /> Ver más perfiles
          </button>
        </div>
      </div>
      
      {/* PUBLICIDAD */}
      <div className="w3-card w3-round w3-white w3-padding-16 w3-center w3-margin-bottom">
        <p className="w3-opacity">PUBLICIDAD</p>
        <img src="https://picsum.photos/200/100?random=20" alt="Ad" style={{ width: '100%', borderRadius: '8px' }} />
      </div>

    </div>
  );
}

export default SidebarRight;