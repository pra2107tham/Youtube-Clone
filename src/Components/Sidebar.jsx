import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";

const Sidebar = () => {
    const mainLinks = [
        {
        icon: <GoHomeFill size={25}/>,
        title: "Home"
       },
         {
          icon: <SiYoutubeshorts  size={25}/>,
          title: "Shorts"
         },
         {
          icon: <MdSubscriptions size={25} />,
          title: "Subscriptions"
         }
    ]

    const secondaryLinks = [
        {
        icon: <MdOutlineVideoLibrary size={25} />,
        title: "Library"
       },
         {
          icon: <GoHistory size={25} />,
          title: "History"
         },
         {
          icon: <AiOutlineLike size={25} />,
          title: "Liked Videos"
         }
    ]

  return (
    <div className='p-2 w-2/12 bg-[#212121] pr-5 overflow-auto pb-8 h-screen'>
        <ul className='flex flex-col border-b-2 border-gray-600'>
            {mainLinks.map((link, index) => (
                <li key={index} className='pl-6 py-3 rounded-xl    hover:bg-zinc-600 ${name === "Home" : "bg-slate-600 : " "}'>
                    <a href="#" className='flex items-center gap-5 justify-start'>
                        {link.icon}
                        <span className='text-sm tracking-wider'>{link.title}</span>
                    </a>
                </li>
            ))}
        </ul>

        <ul className='flex flex-col border-b-1 border-gray-800'>
            {secondaryLinks.map((link, index) => (
                <li key={index} className='pl-6 py-3 rounded-xl    hover:bg-zinc-600 ${name === "Home" : "bg-slate-600 : " "}'>
                    <a href="#" className='flex items-center gap-5 justify-start'>
                        {link.icon}
                        <span className='text-sm tracking-wider'>{link.title}</span>
                    </a>
                </li>
            ))}
        </ul>
        
    </div>
  )
}

export default Sidebar