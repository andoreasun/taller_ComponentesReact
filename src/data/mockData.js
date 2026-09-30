// src/data/mockData.js

// ==========================================
// ARREGLOS BASE PARA GENERAR DATOS ALEATORIOS
// ==========================================
const firstNames = ['Andrea', 'María', 'Sofía', 'Lucía', 'Valentina', 'Camila', 'Isabella', 'Juan', 'Carlos', 'Luis', 'Diego', 'Javier', 'Pedro', 'Alejandro', 'Daniel', 'Ana', 'Laura', 'Paula', 'Sara', 'Elena', 'Marta', 'Carmen', 'Rosa', 'Pablo', 'Miguel', 'Jorge', 'Alberto', 'Raquel', 'Silvia', 'Patricia'];
const lastNames = ['Rodríguez', 'García', 'Martínez', 'Hernández', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales', 'Ortiz', 'Gutiérrez', 'Chávez', 'Ramos', 'Vargas', 'Castillo', 'Jiménez', 'Mendoza', 'Rojas', 'Silva', 'Navarro', 'Molina', 'Suárez', 'Peña'];
const roles = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Product Manager', 'Data Scientist', 'DevOps Engineer', 'QA Analyst', 'Scrum Master', 'Tech Lead', 'Mobile Developer', 'Game Developer', 'Cloud Architect', 'Security Analyst'];
const cities = ['Madrid, España', 'Bogotá, Colombia', 'Ciudad de México', 'Buenos Aires, Argentina', 'Lima, Perú', 'Santiago, Chile', 'Londres, UK', 'Nueva York, USA', 'Barcelona, España', 'Montevideo, Uruguay', 'Quito, Ecuador', 'Caracas, Venezuela', 'La Paz, Bolivia', 'San José, Costa Rica', 'Panamá City, Panamá'];
const postContents = [
  '¡Acabo de terminar el diseño de la nueva interfaz! ¿Qué les parece? 🎨🚀',
  'Un día perfecto para trabajar desde la cafetería ☕️💻',
  '¿Alguien más emocionado por la nueva actualización de React? Vienen cosas geniales.',
  'Explorando nuevas ideas para el proyecto de UX. La investigación de usuarios es clave. 🔍',
  'Terminando el backend de una nueva app. Node.js y MongoDB son una combinación ganadora. 🚀',
  'Comparto mi último proyecto de diseño. ¡Feedback es bienvenido! 💖',
  'Aprendiendo TypeScript poco a poco. ¡Es un cambio de paradigma!',
  '¿Recomendaciones de podcasts sobre tecnología y programación?',
  'Hoy fue un día productivo. 8 horas de código puro. 💻',
  'No hay nada como un buen café y una pantalla con código limpio.',
  'Refactorizando código antiguo. A veces hay que romper para construir mejor.',
  'La importancia de las pruebas unitarias en el desarrollo moderno.',
  '¿Alguien ha probado las nuevas features de CSS? Son una locura.',
  'Diseñando para la accesibilidad. Todos merecen usar la web.',
  'Mi setup de trabajo actual. ¡Me encanta! 🖥️'
];
const commentTexts = ['¡Increíble trabajo!', 'Me encanta.', '¿Cómo lo hiciste?', '¡Felicidades!', 'Se ve súper moderno.', 'Totalmente de acuerdo.', '¡Qué genial!', 'Necesito aprender eso.', 'Jaja, muy bueno.', 'Sigue así.', 'Gran aporte.', '¡Excelente!'];
const eventTitles = ['Reunión de Desarrolladores', 'Taller de UX/UI', 'Conferencia Tech 2026', 'Meetup de React', 'Hackathon de Fin de Semana', 'Webinar de Inteligencia Artificial', 'Networking de Diseñadores', 'Curso intensivo de Python', 'Seminario de Ciberseguridad', 'Feria de Startups'];
const groupNames = ['Diseñadores UI/UX', 'Desarrollo Web', 'Amantes de los Gatos', 'Salidas en la Ciudad', 'Universidad Central', 'Ofertas de Trabajo Tech', 'Fotografía Creativa', 'Viajeros del Mundo', 'Cocina Fácil', 'Tecnología y Gadgets', 'Música y Conciertos', 'Ciencia y Futuro', 'Lectores de Ciencia Ficción', 'Gamers Unidos', 'Fitness y Salud', 'Emprendedores Digitales'];

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ==========================================
// GENERACIÓN DE DATOS MASIVOS
// ==========================================

// 1. Generar 120 Usuarios
export const users = Array.from({ length: 120 }, (_, i) => {
  const name = `${getRandom(firstNames)} ${getRandom(lastNames)}`;
  return {
    id: i + 1,
    name: name,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    role: getRandom(roles),
    location: getRandom(cities)
  };
});

// 2. Generar 150 Publicaciones
export const initialPosts = Array.from({ length: 150 }, (_, i) => {
  const author = users[getRandomInt(0, users.length - 1)];
  const hasImages = Math.random() > 0.4;
  const imageCount = hasImages ? getRandomInt(1, 3) : 0;
  
  return {
    id: i + 1,
    author: author.name,
    avatar: author.avatar,
    time: `${getRandomInt(1, 59)} min`,
    content: getRandom(postContents),
    images: Array.from({ length: imageCount }, (_, imgIdx) => `https://picsum.photos/seed/${i + imgIdx}/600/400`),
    likes: getRandomInt(5, 850),
    comments: Array.from({ length: getRandomInt(0, 6) }, (_, c) => ({
      id: c + 1,
      author: users[getRandomInt(0, users.length - 1)].name,
      text: getRandom(commentTexts)
    }))
  };
});

// 3. Generar 100 Historias
export const initialStories = Array.from({ length: 100 }, (_, i) => {
  const user = users[i % users.length];
  return {
    id: i + 1,
    name: user.name.split(' ')[0],
    avatar: user.avatar,
    isOwn: i === 0
  };
});

// 4. Generar 100 Amigos en Línea
export const initialOnlineFriends = Array.from({ length: 100 }, (_, i) => {
  const user = users[getRandomInt(0, users.length - 1)];
  return {
    id: user.id + i,
    name: user.name,
    avatar: user.avatar
  };
});

// 5. Generar 100 Solicitudes de Amistad
export const initialFriendRequests = Array.from({ length: 100 }, (_, i) => {
  const user = users[getRandomInt(0, users.length - 1)];
  return {
    id: user.id + i + 100,
    name: user.name,
    avatar: user.avatar
  };
});

// 6. Generar 100 Eventos
export const initialEvents = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: getRandom(eventTitles),
  date: `Próximo ${getRandom(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'])} ${getRandomInt(8, 20)}:00`,
  image: `https://picsum.photos/seed/event${i}/300/200`,
  attendees: getRandomInt(10, 500)
}));

// 7. Generar 100 Conversaciones de Mensajes
export const initialMessages = Array.from({ length: 100 }, (_, i) => {
  const user = users[getRandomInt(0, users.length - 1)];
  return {
    id: i + 1,
    name: user.name,
    avatar: user.avatar,
    lastMsg: getRandom(['Hola, ¿cómo estás?', '¿Viste el nuevo proyecto?', '¡Claro! Quedó genial.', 'Nos vemos en la reunión.', 'Me encantó tu diseño.', '¿Tienes un momento?', 'Perfecto, gracias.', 'Hablamos luego.']),
    time: getRandom(['10:30', 'Ayer', 'Lunes', 'Domingo', 'Hace 2 días']),
    online: Math.random() > 0.5
  };
});

// 8. Generar 100 Notificaciones
export const initialNotifications = Array.from({ length: 100 }, (_, i) => {
  const user = users[getRandomInt(0, users.length - 1)];
  const actions = ['le dio like a tu publicación.', 'comentó: "¡Excelente!"', 'te envió una solicitud.', 'empezó a seguirte.', 'reaccionó a tu foto.', 'compartió tu publicación.', 'mencionó en un comentario.'];
  return {
    id: i + 1,
    avatar: user.avatar,
    text: `${user.name} ${getRandom(actions)}`
  };
});

// 9. Generar 100 Grupos
export const initialGroups = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `${getRandom(groupNames)} ${i + 1}`,
  members: `${getRandomInt(1, 50)}.${getRandomInt(1, 9)}k`,
  posts: getRandomInt(1, 100),
  image: `https://picsum.photos/seed/group${i}/100/100`,
  description: 'Un espacio para compartir y aprender con la comunidad.'
}));

// 10. Generar publicaciones exactas para cada grupo
export const initialGroupPosts = [];
initialGroups.forEach(group => {
  for (let i = 0; i < group.posts; i++) {
    const author = users[getRandomInt(0, users.length - 1)];
    initialGroupPosts.push({
      id: `gp-${group.id}-${i}`,
      groupId: group.id,
      author: author.name,
      avatar: author.avatar,
      time: `${getRandomInt(1, 59)} min`,
      content: getRandom(postContents),
      image: Math.random() > 0.6 ? `https://picsum.photos/seed/group${group.id}-${i}/600/400` : null,
      likes: getRandomInt(0, 150),
      comments: getRandomInt(0, 15)
    });
  }
});