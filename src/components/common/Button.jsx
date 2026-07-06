import { RiArrowRightLine } from '@remixicon/react'
import CustomLink from './CustomLink'
import React from 'react'

const Button = ({ label, href = "/", className = "", theme = "outline" }) => {
  return (
    <>
      <CustomLink href={href} label={label} className={`  text-[#00689F] ${theme === "light" ?"bg-white  border-transparent hover:bg-transparent! hover:text-white! hover:border-white ":"border-[#00689F50] hover:bg-[#00689F]! hover:text-white!"} group border w-fit  bg-white p-2 rounded-lg text-sm flex items-center gap-x-2 transition-all duration-300  ${className}`}>
        <p className='font-medium leading-none p-1 transition-all duration-300 '>{label}</p>
        <div className={` relative group-hover:bg-white group-hover:text-[#00689F] p-1 center text-white rounded-md overflow-hidden bg-[#00689F] transition-all duration-300 `}>
          <RiArrowRightLine size={14} className='group-hover:translate-x-[120%] transition-all duration-300 ' />
          <RiArrowRightLine size={14} className='absolute -translate-x-[120%] group-hover:translate-x-0 transition-all duration-300' />
        </div>
      </CustomLink>
    </>
  )
}

export default Button