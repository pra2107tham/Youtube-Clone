import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import { useAppDispatch, useAppSelector } from '../hooks/useApp'
import { getHomePageVideos } from '../store/reducers/getHomePageVideos'
import Spinner from '../Components/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom'
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos'

const Home = () => {
    const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if(searchTerm === ""){
      navigate('/');
    }else{
        dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, searchTerm, navigate]);

  return (
    <div className='max-h-screen overflow-auto'>
      <div style={{height:"7.5vh"}}>
        <Navbar />
        </div>
        <div className='flex' style={{height:"92.5vh"}}>
        <Sidebar />
        {
         videos && videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getSearchPageVideos(true))}
            hasMore={videos.length<500}
            loader={<Spinner />}
            height={650}
            >
              <div>
                {videos.map((video) => {
                  return <Card data={item} key={item.videoId}/>
                })}
              </div>
            </InfiniteScroll>
         ):(
          <Spinner />
         ) 
        }
        
        </div>
    </div>
  )
}

export default Home