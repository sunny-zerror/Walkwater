import { RiArrowRightLine } from '@remixicon/react'
import CustomLink from './CustomLink'
import React from 'react'

const Button = ({ label, href = "/", className = "", theme = "outline" }) => {
  // Use bg-[#ffffff] instead of bg-white: globals.css forces `.bg-white` with !important,
  // which blocks every hover background on elements carrying that class.
  const getThemeStyles = () => {
    switch (theme) {
      case "solid":
        return {
          link: "bg-[#00689F] text-[#ffffff] border-[#00689F] hover:bg-[#ffffff] hover:text-[#00689F] hover:border-[#00689F]",
          icon: "bg-[#ffffff] text-[#00689F] group-hover:bg-[#00689F] group-hover:text-[#ffffff]"
        };
      case "light":
        return {
          link: "bg-[#ffffff] text-[#00689F] border-[#ffffff] hover:bg-transparent hover:text-[#ffffff] hover:border-[#ffffff]",
          icon: "bg-[#00689F] text-[#ffffff] group-hover:bg-[#ffffff] group-hover:text-[#00689F]"
        };
      case "transparent":
        return {
          link: "bg-transparent text-[#ffffff] border-[#ffffff] hover:bg-[#ffffff] hover:text-[#00689F] hover:border-[#ffffff]",
          icon: "bg-[#ffffff] text-[#00689F] group-hover:bg-[#00689F] group-hover:text-[#ffffff]"
        };
      case "outline":
      default:
        return {
          link: "bg-[#ffffff] text-[#00689F] border-[#00689F50] hover:bg-[#00689F] hover:text-[#ffffff] hover:border-[#00689F]",
          icon: "bg-[#00689F] text-[#ffffff] group-hover:bg-[#ffffff] group-hover:text-[#00689F]"
        };
    }
  };

  const { link: themeLinkClass, icon: themeIconClass } = getThemeStyles();

  return (
    <>
      <CustomLink href={href} label={label} className={`group border w-fit p-2 pl-3 rounded-full text-sm flex items-center gap-x-2 transition-all duration-300 pointer-events-auto ${themeLinkClass} ${className}`}>
        <p className='font-medium transition-all duration-300'>{label}</p>
        <div className={`relative p-1 center rounded-full overflow-hidden transition-all duration-300 ${themeIconClass}`}>
          <RiArrowRightLine size={14} className='group-hover:translate-x-[120%] transition-all duration-300' />
          <RiArrowRightLine size={14} className='absolute -translate-x-[120%] group-hover:translate-x-0 transition-all duration-300' />
        </div>
      </CustomLink>
    </>
  )
}

export default Button