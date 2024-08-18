import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import flecha from '/flecha.png'

const DropdownExample = () => {
  const { user } = useContext(AuthContext)

  return (
    <div className='flex w-[100px] border items-center px-[18px]'>
      <button className='flex items-center'>{user?.f_name} <img src={flecha} alt="flecha icon" className='w-[16px] h-[16px] items-center'/></button>
    </div>
  );
};

export default DropdownExample;