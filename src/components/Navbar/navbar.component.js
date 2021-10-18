import React from "react";
import { BiChevronRight, BiSearch, BiChevronDown, BiMenu  } from "react-icons/bi";


const NavSm = () => {
  return (
    <>
    <div className="text-white flex items-center justify-between" >
    <div>
    <h3 className="text-xl font-bold">IT ALL START HERE!</h3>
    <span className="text-gray-400 text-xs flex items-center">
    Kolhapur<BiChevronRight />
    </span>
    </div>
    <div className="w-8 h-8">
    <BiSearch className="w-full h-full" />
    </div>
    </div>
    </>
  )
};
const NavMd = () => {
  return (
    <div className="w-full flex items-center bg-white gap-3 px-3 py-2 rounded-sm">
    <BiSearch/>
    <input type="search" className="w-full focus:outline-none" placeholder="Search for movies,events,plays,sports and activities"/>
    </div>
  )
};
const NavLg = () => {
return(
<>
<div className="container mx-auto px-4 flex items-center justify-between ">

<div className="flex items-center w-1/2">
<div className="w-12 h-12">
<img
src="https://www.vhv.rs/dpng/f/422-4222380_50-off-png.png "
alt="logo"
className="w-full h-full"/>
</div>
<div className="w-full flex items-center bg-white gap-3 px-3 py-2 rounded-sm">
<BiSearch/>
<input type="search" className="w-full focus:outline-none" placeholder="Search for movies,events,plays,sports and activities"/>
</div>
</div>

<div className="flex items-center gap-3">
<span className="text-gray-400 text-xs flex items-center hover:text-white cursor-pointer">
Kolhapur<BiChevronRight />
</span>
<button className="bg-red-600 text-white text-sm rounded px-2 py-1">
sign in
</button>
<div className="w-8 h-8 text-white">
  <BiMenu className="w-full h-full" />
 </div>

</div>
</div>
</>
)
};

const Navbar = () => {
  return(
    <>
    <nav className="bg-navCol-800 px-4 py-2">
    <div className="md:hidden">{
      <NavSm/>
      /*Mobile screen*/
    }</div>
    <div className="hidden lg:hidden md:flex">{
      <NavMd/>
      /*tablet screen*/
    }</div>
    <div className="hidden lg:flex">{
      <NavLg/>
      /*desktop screen*/
    }</div>
    </nav>
    </>
  )
};

export default Navbar;
