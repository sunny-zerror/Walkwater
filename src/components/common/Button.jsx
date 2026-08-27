import { RiArrowRightLine } from '@remixicon/react'
import CustomLink from './CustomLink'
import React from 'react'

const Button = ({ label, href = "/", className = "", theme = "outline" }) => {
  const getThemeStyles = () => {
    switch (theme) {
      case "solid":
        return {
          link: "text-[#ffffff] border-[#00689F50] hover:bg-[#ffffff]! hover:text-[#00689F]! bg-[#00689F]",
          icon: "group-hover:bg-[#00689F] group-hover:text-[#ffffff] text-[#00689F] bg-[#ffffff]"
        };
      case "light":
        return {
          link: "text-[#00689F] border-transparent hover:bg-transparent! hover:text-white! hover:border-white bg-white",
          icon: "group-hover:bg-white group-hover:text-[#00689F] text-white bg-[#00689F]"
        };
      case "outline":
      default:
        return {
          link: "text-[#00689F] border-[#00689F50] hover:bg-[#00689F]! hover:text-white! bg-white",
          icon: "group-hover:bg-white group-hover:text-[#00689F] text-white bg-[#00689F]"
        };
    }
  };

  const { link: themeLinkClass, icon: themeIconClass } = getThemeStyles();

  return (
    <>
      <CustomLink href={href} label={label} className={`group border w-fit p-2 pl-3 rounded-lg text-sm flex items-center gap-x-2 transition-all duration-300 pointer-events-auto ${themeLinkClass} ${className}`}>
        <p className='font-medium transition-all duration-300'>{label}</p>
        <div className={`relative p-1 center rounded-md overflow-hidden transition-all duration-300 ${themeIconClass}`}>
          <RiArrowRightLine size={14} className='group-hover:translate-x-[120%] transition-all duration-300' />
          <RiArrowRightLine size={14} className='absolute -translate-x-[120%] group-hover:translate-x-0 transition-all duration-300' />
        </div>
      </CustomLink>
    </>
  )
}

export default Button