import { useState } from 'react';
import { FaComments, FaPaperPlane } from 'react-icons/fa';

function MessagesPage({ initialMessages }) {
  const [chats] = useState(initialMessages);
  const [activeChat, setActiveChat] = useState(initialMessages[0]?.id || 1);
  const [messageText, setMessageText] = useState('');
  
  const [messages, setMessages] = useState([
    { id: 1, chatId: initialMessages[0]?.id || 1, sender: initialMessages[0]?.name || 'Usuario', text: '¡Hola! ¿Cómo va el diseño?', time: '10:28', isMe: false },
    { id: 2, chatId: initialMessages[0]?.id || 1, sender: 'Tú', text: 'Muy bien, casi terminado. ¿Te gustó la última versión?', time: '10:30', isMe: true },
    { id: 3, chatId: initialMessages[0]?.id || 1, sender: initialMessages[0]?.name || 'Usuario', text: 'Sí, está genial. Solo unos ajustes en los colores.', time: '10:32', isMe: false },
  ]);

  const currentChat = chats.find(c => c.id === activeChat);

  const handleSendMessage = () => {
    if (messageText.trim() === '') return;
    const newMsg = { id: Date.now(), chatId: activeChat, sender: 'Tú', text: messageText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isMe: true };
    setMessages([...messages, newMsg]);
    setMessageText('');
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), chatId: activeChat, sender: currentChat?.name || 'Usuario', text: '¡Recibido! Gracias por el mensaje.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isMe: false }]);
    }, 1500);
  };

  const chatMessages = messages.filter(m => m.chatId === activeChat);

  return (
    <div className="w3-row">
      {/* Lista de Chats (con Scroll) */}
      <div className="w3-col m4">
        <div className="w3-card w3-round w3-white">
          <div className="w3-container w3-padding-16 w3-theme-d2 w3-round-top">
            <h4><FaComments className="w3-margin-right" /> Conversaciones</h4>
            <div className="w3-section">
              <input className="w3-input w3-border w3-round" type="text" placeholder="Buscar mensajes..." />
            </div>
          </div>
          <ul className="w3-ul w3-hoverable" style={{ maxHeight: '550px', overflowY: 'auto' }}>
            {chats.map(chat => (
              <li key={chat.id} className={`w3-padding-16 w3-pointer ${activeChat === chat.id ? 'w3-theme-l4' : ''}`} onClick={() => setActiveChat(chat.id)} style={{ cursor: 'pointer' }}>
                <div style={{ position: 'relative', display: 'inline-block' }} className="w3-left w3-margin-right">
                  <img src={chat.avatar} className="w3-circle" style={{ width: '45px', height: '45px', objectFit: 'cover' }} alt="Avatar" />
                  {chat.online && <span style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', backgroundColor: '#4caf50', borderRadius: '50%', border: '2px solid white' }}></span>}
                </div>
                <span className="w3-medium">{chat.name}</span><br />
                <span className="w3-small w3-opacity">{chat.lastMsg}</span>
                <span className="w3-right w3-small w3-text-theme">{chat.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ventana de Chat */}
      <div className="w3-col m8">
        <div className="w3-card w3-round w3-white">
          <div className="w3-container w3-padding-16 w3-theme-d2 w3-round-top">
            <h4>
              <img src={currentChat?.avatar} className="w3-circle" style={{ width: '40px', verticalAlign: 'middle', marginRight: '10px' }} alt="Avatar" />
              {currentChat?.name} <span className="w3-opacity w3-medium"> · {currentChat?.online ? 'Activa ahora' : 'Desconectada'}</span>
            </h4>
          </div>
          
          <div className="w3-container w3-padding-16" style={{ height: '400px', overflowY: 'scroll', backgroundColor: '#f9f9f9' }}>
            {chatMessages.map(msg => (
              <div key={msg.id} className={`w3-panel w3-round-large ${msg.isMe ? 'w3-rightbar w3-border-green w3-theme-l4 w3-right' : 'w3-leftbar w3-border-blue w3-white'}`} style={{ maxWidth: '80%', clear: 'both', marginBottom: '10px' }}>
                <p style={{ margin: '0 0 5px 0' }}><strong>{msg.sender}</strong> <span className="w3-opacity w3-small">{msg.time}</span></p>
                <p style={{ margin: 0 }}>{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="w3-container w3-padding-16 w3-border-top">
            <div className="w3-row">
              <div className="w3-col s10">
                <input className="w3-input w3-border w3-round" type="text" placeholder="Escribe un mensaje..." value={messageText} onChange={(e) => setMessageText(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} />
              </div>
              <div className="w3-col s2">
                <button className="w3-button w3-theme-d2 w3-round w3-block" onClick={handleSendMessage}><FaPaperPlane /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;