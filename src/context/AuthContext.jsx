// Este código implementa un contexto de autenticación en una aplicación React.

import { createContext, useEffect, useState } from 'react';
import { getMe, loginUser, registerUser, editUser } from '../Services/authService.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = createContext(); // Es un contexto creado que permitirá a los componentes hijos acceder al estado de autenticación y las funciones relacionadas con la autenticación.

export const AuthProvider = ({ children }) => {  // Componente que envuelve a otros componentes y les proporciona el contexto de autenticación. Este gestiona el estado y las acciones relacionadas con la autenticación.
  const navigate = useNavigate(); // Permite redirigir al ususario a diferentes rutas
  const { pathname } = useLocation(); // Almacena la ruta actual
  const rutasIgnoradas = ['/', '/register']; // Array de rutas en las cuales no se realizará la consulta del usuario autenticado.

  const [user, setUser] = useState(null); // Almacena los datos del usuario autenticado. Inicialmente está vacío.

  const loginMutation = useMutation({ // Es una mutación que maneja el proceso de inicio de sesión.
    mutationKey: ['login'], 
    mutationFn: loginUser,
    onError: data => alert(data.response.data.message), // Si hay un error se mostrará un mensaje de error.
    onSuccess: ({ data }) => {
      localStorage.setItem('tokenLogin', data.token); // Si es exitoso, se guarda el token en "localstorage"
      setUser(data.user);
      navigate('/dashboard');
    },
  });

  const registerMutation = useMutation({ // Similar a "loginMutation" pero maneja el proceso de registro de un nuevo usuario.
    mutationKey: ['register'],
    mutationFn: registerUser,
    onError: data => alert(data.response.data.message),
    onSuccess: ({ data }) => {
      alert(data.message);
      navigate('/'); // Al completarse el registro exitosamente, se redirije al usuario a la página de inicio.
    },
  });

  const editUserMutation = useMutation({
    mutationKey: ['editUser'],
  mutationFn: editUser,
  onError: (data) => alert(data.response.data.message),
  onSuccess: ({ data }) => {
    setUser(data.user);
    alert('Usuario actualizado exitosamente');
  },
  })

  const { data, isLoading, isError } = useQuery({ // Realiza una consulta para obtener los datos del usuario autenticado.
    queryKey: ['user'],
    queryFn: getMe,
    enabled: !rutasIgnoradas.includes(pathname),
  });

  const logout = () => { // ELimina el token de autenticación, resetea el estado del ususaio y redirige al usuario a la página de inicio.
    localStorage.removeItem('tokenLogin');
    setUser(null);
    navigate('/');
  };

  useEffect(() => {
    if (data && !isLoading) { // Gracias a este useEffect, el estado cambiará dependiendo de la carga de los datos del usuario.
      setUser(data);
    }
  }, [data, isLoading]);

  const updateUser = (id, userData) => {
    editUserMutation.mutate({ id, ...userData });
  };

  return (
    <AuthContext.Provider // Proporciona a los componentes hijos acceso al contexto de autenticación, incluyendo el estado del usuario y las funciones para login, registro y logout.
      value={{
        user,
        loginMutation,
        registerMutation,
        editUserMutation,
        updateUser,
        isLoading,
        logout,
        isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};