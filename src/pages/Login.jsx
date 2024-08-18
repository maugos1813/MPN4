// Este código implementa un componente que permite iniciar sesión a los usuarios.

import { useContext } from "react"; // Permite acceder a valores almacenados en un contexto
import { AuthContext } from "../context/AuthContext"; // Es el contexto de autenticación qu econtiene funciones y el estado relacionado.
import { Link } from "react-router-dom"; // Componente que permite crear enlaces de navegación entre las diferentes rutas.
import icon from "/icon.png";
import candado from "/candado.png";
import email from "/email.png";
import { Buttons } from "../components/Buttons";

function Login() {
  const { loginMutation } = useContext(AuthContext); // Se usa "useContext" para extraer "loginMutation" del "AuthContext", "loginMutation" es una mutación que maneja el proceso de inicio de sesión.

  const handleLogin = async (e) => {
    // "handleLogin" es una función que se ejecuta cuando el usuario inicia sesión.
    e.preventDefault(); // Evita que el formulario realice la acción predeterminada de enviar datos de manera tradicional.
    const data = {
      // ESte objeto contiene los valores del formulario
      usernameOrEmail: e.target.usernameOrEmail.value,
      password: e.target.password.value,
    };

    await loginMutation.mutateAsync(data); // Esta mutacion envia los datos del formulario al servidor utilizando la mutacion de inicio de sesion.
  };

  return (
    <div>
      <main className="border border-[#BDBDBD]  rounded-3xl w-[470px] h-[544px] absolute left-0 right-0 mx-auto top-0 bottom-0 my-auto">
        <div className="w-[350.88px] border-violet-500 ml-[58px]">
          <div className="flex items-center mt-[30px] ml-[-5px]">
            <img src={icon} alt="devchallenges icon" className="w-[36px]" />
            <h3 className="text-[14px]">devchallenges</h3>
          </div>
          <h1 className="font-semibold mt-[25px] text-[18px]">Login</h1>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center mt-[40px]"
        >
          {" "}
          {/* Al enviar el formulario se llama la funcion "handleLogin" */}
          <div className="flex flex-col items-center justify-center gap-2">
            <label>
              <input
                type="text"
                name="usernameOrEmail"
                required
                placeholder="Email"
                className="w-[356px] h-[48px] border border-[#BDBDBD] rounded-lg  px-10"
              />
              <img
                src={email}
                alt="email icon"
                className="absolute left-[70px] bottom-[350px] h-[18px]"
              />
            </label>
            <br />
            <label>
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                className="w-[356px] h-[48px] border border-[#BDBDBD] rounded-lg  px-10"
              />
              <img
                src={candado}
                alt="lock icon"
                className="absolute left-[70px] bottom-[288px]"
              />
            </label>
            <br />
            <button type="submit" className="w-[356px] h-[38px] bg-[#2F80ED] text-white rounded-lg hover:bg-blue-400 mt-[10px]">Login</button>
          </div>
        </form>
        <p className="text-[14px] text-center text-[#828282] mt-[30px]">or continue with these social profile</p>
        <Buttons/>
        <p className="text-[#828282] text-[14px] mt-[27px] text-center" >Don't have an account yet? <Link to="/register" className="text-blue-500">Register</Link>{" "}</p> 
        {/* Enlace que dirije a la page de registro(permite a los ususarios que no tienen una cuenta, poder crear una)*/}
      </main>
    </div>
  );
}

export default Login;
