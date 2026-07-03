import { RiArrowRightLine } from '@remixicon/react'
import { Link } from 'next-view-transitions'
import React from 'react'

const Button = ({ label, href = "/", className = "", theme = "outline" }) => {
  return (
    <>
      <Link href={href} className={` ${theme === "light" && "bg-white! text-[#00689F]!"} border w-fit border-[#00689F50] bg-white p-2 rounded-lg text-sm flex items-center gap-x-0 hover:gap-x-2 transition-all duration-300 group ${className}`}>
        <p className='text-[#00689F] font-medium leading-none p-1'>{label}</p>
        <div className=" group-hover:scale-100 transition-all duration-300 scale-0 w-0 p-0 group-hover:w-5.5 center group-hover:p-1  text-white rounded-md bg-[#00689F]">
          <RiArrowRightLine size={14} />
        </div>
      </Link>
    </>
  )
}

export default Button