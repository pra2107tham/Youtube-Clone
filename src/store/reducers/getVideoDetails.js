import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import convertRawToString from '../../utils/convertRawToString.jsx';
import timeSince from '../../utils/timeSince.jsx';

export const getVideoDetails = createAsyncThunk(
    
    'youtube/App/videoByDetails ',
    async (id) => {
        const {
            data : {items},
        } = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?key=AIzaSyDq5Pk92DgT0Q-Rf9n6u4Nzj5bBgzNyLUY&part=snippet,statistics&type=video&id=${id}`);

        const parsedData =  await parseData(items[0]);
        console.log(parsedData)
        return parsedData;
    }
    )

export const parseData = async (item) => {
    const channelResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=AIzaSyDq5Pk92DgT0Q-Rf9n6u4Nzj5bBgzNyLUY`)

   const id = item.id;
   const snippet = item.snippet;
   const statistics = item.statistics;
   const channelImage = channelResponse.data.items[0].snippet.thumbnails.default.url;
   const subcriberCount = channelResponse.data.items[0].statistics.subscriberCount;

   return{
    videoId : id,
    videoTitle: snippet.title,
    videoDescription: snippet.description,
    videoViews: convertRawToString(statistics.viewCount),
    videoLikes: convertRawToString(statistics.likeCount),
    videoAge: timeSince(new Date(snippet.publishedAt)),
    channelInfo:{
      id: snippet.channelId,
      name:snippet.channelTitle,
      image: channelImage,
      subcribers: convertRawToString(subcriberCount,true)
    }
   }

}