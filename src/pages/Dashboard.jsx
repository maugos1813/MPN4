import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import icon from "/icon.png";
import flecha from "/flejo.png";
import perfil from "/perfil.png";
import grupo from "/grupo.png";
import salir from "/salir.png";

function Dashboard() {
  const { isLoading, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <div>CARGANDO...</div>;
  }

  const handleEditProfile = () => {
    navigate("/editUser");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); 
  };

  return (
    <main>
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

      <div className="text-center mt-[10px]">
        <h2 className="font-semibold text-[36px]">Personal Info</h2>
        <p className="text-[18px]">Basic info, like your name and photo</p>
      </div>
      <div className="border border-[#E0E0E0] rounded-xl h-[580px] w-[845px] absolute left-0 right-0 mx-auto mt-[50px]">
        <div className="flex justify-between px-[48px] items-center border h-[80px]">
          <div>
            <h1 className="text-[24px]">Profile</h1>
            <p className="text-[13px] text-[#828282]">
              Some info may be visible to other people
            </p>
          </div>
          <button
            onClick={handleEditProfile}
            className="border border-[#828282] text-[#828282] w-[95px] h-[38px] rounded-xl"
          >
            Edit
          </button>
        </div>
        <div className="border flex justify-between px-[48px] h-[80px] items-center">
          <div className="text-[#BDBDBD] text-[13px]">
            <h1>PHOTO</h1>
          </div>
          <div className=" w-[500px]">
            <img
              src={`http://localhost:3000/api/users/image/${user?.image}`}
              alt={user?.f_name}
              height="200"
            />
          </div>
        </div>
        <div className="border flex justify-between px-[48px] h-[80px] items-center">
          <div className="text-[13px] text-[#BDBDBD]">NAME</div>
          <div>
            <p className="w-[500px]">
              {user?.f_name} {user?.m_name}
            </p>
          </div>
        </div>
        <div className="border flex justify-between px-[48px] h-[80px] items-center">
          <div className="text-[13px] text-[#BDBDBD]">BIO</div>
          <div>
            <p className="w-[500px]">{user?.bio || "No disponible"}</p>
          </div>
        </div>
        <div className="border flex justify-between px-[48px] h-[80px] items-center">
          <div className="text-[13px] text-[#BDBDBD]">PHONE</div>
          <div className="w-[500px]">{user?.phone || "No disponible"}</div>
        </div>
        <div className="border flex justify-between items-center h-[80px] px-[48px]">
          <div className="text-[13px] text-[#BDBDBD]">EMAIL</div>
          <div className="w-[500px]">
            <p> {user?.email}</p>
          </div>
        </div>
        <div className="border flex justify-between items-center h-[80px] px-[48px]">
          <div className="text-[13px] text-[#BDBDBD]">PASSWORD</div>
          <div className="w-[500px] font-serif">
            <p>
              If you forgot your password, you can change it by pressing Edit
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;