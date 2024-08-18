import React from "react";
import facebook from '/facebook.png'
import google from '/google.png'
import x from '/x.png'
import github from '/github.png'

export const Buttons = () => {
  return (
    <div className="flex gap-4 w-full justify-center mt-[23px]">
      <button className="border border-[#BDBDBD] w-[42px] h-[42px] rounded-full flex justify-center items-center">
        <img src={google} alt="google icon" className="w-[18px] h-[18px]" />
      </button>
      <button className="border border-[#BDBDBD] w-[42px] h-[42px] rounded-full flex justify-center items-center">
        <img src={facebook} alt="facebook icon" className="w-[18px] h-[18px]" />
      </button>
      <button className="border border-[#BDBDBD] w-[42px] h-[42px] rounded-full flex justify-center items-center">
        <img src={x} alt="x icon" className="w-[18px] h-[18px]" />
      </button>
      <button className="border border-[#BDBDBD] w-[42px] h-[42px] rounded-full flex justify-center items-center">
        <img src={github} alt="github icon" className="w-[18px] h-[18px]" />
      </button>
    </div>
  );
};
