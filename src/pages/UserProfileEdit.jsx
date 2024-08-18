import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import icon from "/icon.png";
import flecha from "/flejo.png";
import perfil from "/perfil.png";
import grupo from "/grupo.png";
import salir from "/salir.png";
import { useNavigate } from "react-router-dom";
import defaultProfilePic from "/perfil.png";

const UserProfileEdit = () => {
  const { user, updateUser, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    fName: "",
    mName: "",
    lName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    image: user?.image || defaultProfilePic,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData({
        fName: user.f_name || "",
        mName: user.m_name || "",
        lName: user.l_name || "",
        username: user.username || "",
        email: user.email || "",
        password: user.password || "", // No llenar con la contraseña actual por seguridad
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateUser(user.user_id, userData);
      setMessage("Usuario actualizado exitosamente");
    } catch (error) {
      setMessage("Error actualizando usuario");
      console.error("Error actualizando usuario:", error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData({
        ...userData,
        image: URL.createObjectURL(file), // Mostrar vista previa de la imagen seleccionada
      });
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center">
        <div className="flex items-center ml-[72px] mt-[26px]">
          <img src={icon} alt="icon logo" className="w-[38px]" />
          <h2 className="text-[18px] font-semibold">devchallenges</h2>
        </div>
        <div className="flex w-[155px] items-center mr-[50px] gap-2 relative">
          <button
            onClick={toggleModal}
            className="flex items-center font-semibold"
          >
            {user?.f_name} {user?.l_name}
          </button>
          <img
            src={flecha}
            alt="flecha icon"
            className="w-[16px] h-[16px] items-center"
          />
          {isModalOpen && (
            <div className="border w-[188px] h-[174px] rounded-xl flex flex-col justify-center items-center absolute left-[0%] top-[150%]">
              <div className="border-b flex flex-col justify-center items-center w-[160px]">
                <div className="border w-[164px] h-[39px] rounded-lg flex justify-center items-center bg-[#F2F2F2] gap-2">
                  <img src={perfil} alt="" />
                  <p className="text-[12px]">My Profile</p>
                </div>
                <div className="w-[180px] h-[39px] flex justify-center items-center gap-2">
                  <img src={grupo} alt="" />
                  <p className="text-[12px]">Group Chat</p>
                </div>
              </div>
              <div className="flex justify-center items-center w-full mt-2">
                <button
                  onClick={logout}
                  className="text-[12px] text-[#EB5757] flex gap-2"
                >
                  <img src={salir} alt="" />
                  <p>Logout</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="ml-[21.5%] mt-[15px]" onClick={goBack}>
        <button className="text-[#2D9CDB] text-[18px]"> {"<"} Back</button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border w-[845px] h-[700px] absolute left-0 right-0 mx-auto rounded-xl px-[40px] "
      >
        <div className="mt-[20px]">
          <h1 className="text-[24px] font-semi">Change Info</h1>
          <p className="text-[13px] text-[#828282]">
            Changes will be reflected to every services
          </p>
        </div>
        <div className="flex items-center mt-[20px]">
          <div className="relative">
            <img
              src={userData.image}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
            <label htmlFor="imageUpload">
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg cursor-pointer">
                <img src="" alt="" className="w-6 h-6" />
              </div>
              <input
                id="imageUpload"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="ml-4 text-[#828282]">CHANGE PHOTO</p>
        </div>
        <div className="mt-[12px] flex flex-col">
          <label htmlFor="fName" className="text-[13px]">
            Name
          </label>
          <input
            type="text"
            name="fName"
            value={userData.fName}
            onChange={handleChange}
            placeholder="Enter your name..."
            className="border border-[#828282] w-[416px] h-[52px] rounded-xl px-[12px] text-[13px]"
          />
        </div>
        <div className="mt-[12px] flex flex-col">
          <label htmlFor="bio" className="text-[13px]">
            Bio
          </label>
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            placeholder="Enter your bio..."
            className="border border-[#828282] w-[416px] h-[91px] rounded-xl px-[12px] py-[12px] text-[13px]"
          />
        </div>
        <div className="mt-[12px] flex flex-col">
          <label htmlFor="phone" className="text-[13px]">Phone</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="phone"
            className="border border-[#828282] w-[416px] h-[52px] rounded-xl px-[12px] text-[13px]"
          />
        </div>
        <div className="mt-[12px] flex flex-col">
          <label htmlFor="email" className="text-[13px]">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Enter your email..."
            className="border border-[#828282] w-[416px] h-[52px] rounded-xl px-[12px] text-[13px]"
          />
        </div>
        <div className="mt-[12px] flex flex-col">
          <label htmlFor="password" className="text-[13px]">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter your new password..."
            className="border border-[#828282] w-[416px] h-[52px] rounded-xl px-[12px] text-[13px]"
          />
        </div>
        <div className="flex items-center gap-3">
        <button
          type="submit"
          className="w-[82px] h-[38px] rounded-lg bg-[#2F80ED] text-white hover:bg-blue-400 mt-[12px]"
        >
          Save
        </button> {message && <div className="mt-[15px] text-red-400">{message}</div>}
        </div>
        
      </form>
     
    </div>
  );
};

export default UserProfileEdit;
