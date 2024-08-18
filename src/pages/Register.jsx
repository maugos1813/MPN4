// Este componente permite a los nuevos usuarios crear una cuenta nueva en el app.

import { useContext } from "react"; // Permite acceder a valores almacenados,
import { AuthContext } from "../context/AuthContext"; // Contexto que contiene las funciones.
import { Link } from "react-router-dom"; // Componente que permite crear enlaces de navegacion.
import icon from '/icon.png'
import candado from '/candado.png'
import email from '/email.png'
import { Buttons } from "../components/Buttons";

function Register() {
  const { registerMutation } = useContext(AuthContext); // Se usa el useContext para extraer "registerMutation"

  const handleRegister = async (e) => {
    // Funcion que se ejecuta cuando el usuario envia el formulario
    e.preventDefault(); // Evita que el formulario realice su accion preterminada.
    const data = new FormData(e.target); // Se crea un objeto con los datos del formulario

    await registerMutation.mutateAsync(data); // Envia los datos del formulario al servidor utilizando la mutacion  de registro.
  };

  return (
    <div className="border-[#BDBDBD] border rounded-3xl w-[470px] h-[634px] absolute left-0 right-0 mx-auto top-0 bottom-0 my-auto">
      <main className="flex flex-col justify-center items-center">
        <div className="w-[350.88px]">
          <div className="flex items-center mt-[30px] ml-[-5px]">
            <img src={icon} alt="devchallenges icon" className="w-[36px]" />
            <h3 className="text-[14px]">devchallenges</h3>
          </div>
          <h1 className="font-semibold mt-[25px] text-[18px]">Join thousands of learners from around the worls</h1>
          <p className="mt-[20px] text-[16px]">
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
        </div>
        <form onSubmit={handleRegister} className="flex flex-col items-center mt-[40px]">
          {" "}
          {/* Se crea un formulario que al ser enviado, llama la funcion "handleRegister" */}
          <div className="flex flex-col items-center gap-4">
            {/* <label className="flex flex-col items-center w-full">
              <input
                type="text"
                name="fName"
                placeholder="Name"
                //required
                className="w-[356px] h-[48px] border border-[#BDBDBD] rounded-lg px-2 "
              />
            </label> */}

            {/* <label className="flex flex-col items-center w-full">
              <input
                type="text"
                name="username"
                placeholder="Username"
                //required
                className="w-[356px] h-[48px] border border-[#BDBDBD] rounded-lg  px-2"
              />
            </label> */}

            <label className="flex flex-col items-center w-full">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-[356px] h-[48px] border border-[#BDBDBD] rounded-lg  px-10"
              />
              <img src={email} alt="email icon" className="absolute left-[70px] bottom-[320px] h-[18px]"/>
            </label>

            <label className="flex flex-col items-center w-full">
              <input
                type="password"
                name="password"
                required
                pattern="(?=.*[A-Z]).{8,}"
                title="La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula"
                placeholder="Password"
                className="w-[356px] h-[48px] border border-[#BDBDBD] rounded-lg  px-10"
              />
              <img src={candado} alt="lock icon" className="absolute left-[70px] bottom-[260px]"/>
            </label>

            {/* <label>
              Imagen:
              <input type="file" name="image" required accept="image/*" />
            </label> */}
          </div>
          <button type="submit" className="w-[356px] h-[38px] bg-[#2F80ED] text-white rounded-lg mt-[22px] hover:bg-blue-400 ">Start coding now</button>
        </form>
        <p className="text-[14px] text-[#828282] mt-[30px]">or continue with these social profile</p>
        {/* Dirige a la pagina de inicio de sesion */}
        <Buttons/>
        <h2 className="text-[#828282] text-[14px] mt-[27px]">Adready a member?: <Link to="/" className="text-blue-500">Login</Link>{" "} </h2>
      </main>
    </div>
  );
}

export default Register;
