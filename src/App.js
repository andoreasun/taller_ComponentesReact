import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SidebarLeft from './components/SidebarLeft';
import Feed from './components/Feed';
import SidebarRight from './components/SidebarRight';
import ProfilePage from './components/ProfilePage';
import ProfileModal from './components/ProfileModal';
import FriendsListModal from './components/FriendsListModal';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MessagesPage from './components/MessagesPage';
import SettingsPage from './components/SettingsPage';
import GroupsPage from './components/GroupsPage';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
// Importamos todos los datos generados
import { 
  users, initialPosts, initialStories, initialOnlineFriends, 
  initialFriendRequests, initialEvents, initialMessages, initialNotifications 
} from './data/mockData';
import './App.css';

function App() {
  // 1. Estado del perfil (carga desde localStorage o usa el perfil piloto de mujer)
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'Andrea Rodríguez',
      avatar: 'https://i.pravatar.cc/150?img=47', // Avatar femenino
      role: 'Desarrolladora Frontend',
      location: 'Madrid, España',
      birthday: '1 de Abril, 1988',
      cover: 'https://picsum.photos/1200/300?random=99'
    };
  });

  // 2. Estado de sesión
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // 3. Estados globales de la aplicación (usando los datos masivos)
  const [selectedUser, setSelectedUser] = useState(null);
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [stories] = useState(initialStories);
  const [onlineFriends] = useState(initialOnlineFriends);
  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);
  const [events] = useState(initialEvents);
  const [messages] = useState(initialMessages);
  const [notifications] = useState(initialNotifications);

  // 4. Sincronizar perfil y sesión con localStorage
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  // 5. Funciones de manejo
  const handleLogin = (userData) => {
    if (userData) {
      setProfile(prev => ({ ...prev, ...userData }));
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    // No borramos el perfil para que si vuelve a entrar, sus datos sigan ahí
  };

  const handleAcceptFriend = (id) => setFriendRequests(friendRequests.filter(req => req.id !== id));
  const handleDeclineFriend = (id) => setFriendRequests(friendRequests.filter(req => req.id !== id));
  
  const handleAddPost = (newPost) => {
    newPost.author = profile.name;
    newPost.avatar = profile.avatar;
    setPosts([newPost, ...posts]);
  };

  const handleAddComment = (postId, commentText) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, { id: Date.now(), author: profile.name, text: commentText }] };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <Router>
      <div className="w3-theme-l5" style={{ minHeight: '100vh' }}>
        {/* El Navbar solo se muestra si el usuario inició sesión. Le pasamos las notificaciones y mensajes */}
        {isLoggedIn && <Navbar profile={profile} onLogout={handleLogout} notifications={notifications} messages={messages} />}
        
        <div className="w3-container w3-content" style={{ maxWidth: '1400px', marginTop: isLoggedIn ? '80px' : '0' }}>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} setProfile={setProfile} />} />
            <Route path="/register" element={<RegisterPage setProfile={setProfile} />} />

            {/* Rutas Protegidas (Solo accesibles si isLoggedIn es true) */}
            <Route path="/" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <div className="w3-row">
                  <SidebarLeft profile={profile} />
                  <Feed 
                    posts={posts} stories={stories} onAddPost={handleAddPost} profile={profile} 
                    onProfileClick={setSelectedUser} onAddComment={handleAddComment}
                  />
                  <SidebarRight 
                    friendRequests={friendRequests} onlineFriends={onlineFriends} events={events}
                    onAccept={handleAcceptFriend} onDecline={handleDeclineFriend}
                    onProfileClick={setSelectedUser} onOpenFriendsList={() => setShowFriendsList(true)}
                  />
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ProfilePage profile={profile} setProfile={setProfile} posts={posts} onAddPost={handleAddPost} />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MessagesPage initialMessages={messages} />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SettingsPage profile={profile} setProfile={setProfile} />
              </ProtectedRoute>
            } />
            <Route path="/groups" element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <GroupsPage />
              </ProtectedRoute>
            } />

            {/* Redirigir cualquier otra ruta */}
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/landing"} replace />} />
          </Routes>
        </div>

        {/* Modales Globales */}
        {selectedUser && <ProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />}
        {showFriendsList && <FriendsListModal users={users} onClose={() => setShowFriendsList(false)} onProfileClick={setSelectedUser} />}
      </div>
    </Router>
  );
}

export default App;