// Este códifo define tres funciones asíncronas que interactuan con una API a través de solicitudes HTTP usando la librería axios.

import axios from 'axios'; // Librería para ejecutar solicitudes HTTP 

export const loginUser = async ({ usernameOrEmail, password }) => {
  const response = await axios.post('http://localhost:3000/api/auth/login', { // Se hace solicitud "post" a la URL
    usernameOrEmail, // Envían el cuerpo de solicitud
    password, // Envía el cuerpo de solicitud
  });
  return response;
};

export const registerUser = async (data) => {
  const response = await axios.post('http://localhost:3000/api/users', data); // Se envía "data como cuerpo de la solicitud"
  return response;
};

export const getMe = async () => {
  const token = localStorage.getItem('tokenLogin'); // Obtiene el token y lo almacena en localstorage bajo clave "tokenLogin" 
  const response = await axios.get('http://localhost:3000/api/auth/me', { // El token se envía en las cabeceras de la solicitud.
    headers: { Authorization: token },
    timeout: 3000 // Se establece tiempo máximo de 3 segundos para la solicitud.
  });
  return response.data
};

export const editUser = async (userData) => {
  const { id } = userData;  // Asegúrate de que 'id' está definido y es el correcto.
  const response = await axios.patch(`http://localhost:3000/api/users/${id}`, userData);
  return response.data;
};

// loginUser: Envía los datos de inicio de sesión y retorna la respuesta con el token y los datos del usuario.
// registerUser: Envía los datos del formulario de registro y retorna la respuesta del servidor.
// getMe: Obtiene los datos del usuario autenticado utilizando el token almacenado en "localstorage".