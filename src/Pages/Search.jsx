import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { useAppDispatch, useAppSelector } from '../hooks/useApp'
import { getHomePageVideos } from '../store/reducers/getHomePageVideos'
import Spinner from '../Components/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom'
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos'
import { clearVideos } from '../features/youtube/featureSlice'
import Card from '../Components/Card'
import SearchCard from '../Components/SearchCard'
import {getVideoDetails}  from "../store/reducers/getVideoDetails";

const Home = () => {
    const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.video);

  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  const handleCardClick = (id) => {
    dispatch(getVideoDetails(id));
  };

  useEffect(() => {
    dispatch(clearVideos());
    if(searchTerm === ""){
      navigate('/');
    }else{
        dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, searchTerm, navigate]);

  return (
    <div className='max-h-screen overflow-hidden'>
      <div style={{height:"7.5vh"}}>
      <Navbar/>
      </div>
      <div className='flex' style={{height:"92.5vh"}}>
      <Sidebar/>
      {
        videos.length ? (
            <div className='py-8 pl-8 flex flex-col gap-5 w-full'>
          <InfiniteScroll 
          dataLength={videos.length} 
          next={()=> dispatch(getSearchPageVideos(true))}
          hasMore={videos.length < 500}
          loader={<Spinner/>}
          height={600}
          >
              
                {videos.map((item) => {
                  return (
                    <div className='my-5'  key={item.videoId}>
                  <SearchCard data={item} key={item.videoId} onClick={()=>handleCardClick(item.videoId)} />
                  </div>
                  )
                })}
              
          </InfiniteScroll>
          </div>
        ):(
          <Spinner/>
        )
      }
      </div>
    </div>
  )
}

export default Home