import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { ImYoutube } from "react-icons/im";
import { IoSearchOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../hooks/useApp"
import { clearVideos, changeSearchTerm, clearSearchTerm } from '../features/youtube/featureSlice';

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

    const handleSearch = () => {
        if(location.pathname !== '/search') navigate('/search');
        else{
            dispatch(clearVideos);
            dispatch(getSearchPageVideos(false));

        }
    }


  return (
    <div className='flex justify-between px-14 h-16 items-center bg-[#212121] opacity-95 sticky'>
        <div className='flex gap-8 items-center text-2xl text-white'>
            <div>
            <GiHamburgerMenu size={30}/>
            </div>
            <div className='flex gap-2 items-center justify-center'>
            <ImYoutube size={50} className='text-3xl text-red-500'/>
            <span className='text-2xl font-medium'>YouTube</span>
            </div>
        </div>
        <div className='flex gap-8'>
            <form  onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}>
                <div className='flex bg-[#333] py-1 px-3 rounded-lg '>
                    <div className='flex gap-5 items-center justify-center'>
                        <input type="text" placeholder='Search' className='bg-[#333] text-white px-2 py-1 border-none' value={searchTerm} onChange={(e) => dispatch(changeSearchTerm(e.target.value))}/>
                        <button>
                        <IoSearchOutline className='text-white text-2xl'/>
                        </button>
                    </div> 
                </div>
            </form>
            <button>
            <div className='flex items-center justify-center rounded-full p-2 bg-[#333] '>
                <FaMicrophone size={20} className='text-white '/>
            </div>
            </button>
        </div>
        <div>
            <div className='flex gap-8 items-center text-2xl text-white'>
                <div>
                <BsFillCameraVideoFill size={30} />
                </div>
                <div className='relative'>
                <IoMdNotifications size={30}/>
                <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-0.5 text-xs'>9+</span>
                </div>
                <div>
                <CgProfile size={30}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar