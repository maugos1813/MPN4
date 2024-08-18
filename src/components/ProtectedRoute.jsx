// ESte codigo esta diseñado para proteger ciertas rutas de el app,se asegura de que el usuario esté autenticado antes de acceder a ellas.

import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute() {
  const token = localStorage.getItem('tokenLogin'); // Se recupera un token desde el "localstorage", este token se guarda al momento de que un usuario inicie sesion.
  const { isLoading, isError } = useContext(AuthContext); // Se extraen dos valores del contexto de autenticacion 1ro indica si la autenticacioin aún se está procesando, el 2do indica que hubo un error.

  if (!token) { // Si no hay token en el "localstorage", redirige al ususario a la página de inicio.
    window.location.href = '/';
    return null;
  }

  if (isLoading) { // Si se está procesando la autenticación se muestra el mensaje entre los div
    return <div>CARGANDO...</div>;
  }

  if (isError) { // Si hubo un error en el proceso de autenticación se redirige al usuario a la página de inicio.
    return <Navigate to='/' />;
  }

  return <Outlet />; // Si todo es válido y no hay errores, entonces se admite el acceso a ciertas rutas hijas.
}

export default ProtectedRoute;