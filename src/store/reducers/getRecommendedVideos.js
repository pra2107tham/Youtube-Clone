import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {parseRecommendedData} from "../../utils/parseRecommendedData.jsx"

export const getRecommendedVideos = createAsyncThunk(
    
    'youtube/App/recommendedVideos',
    async (videoId, {getState}) => {
        const {
            youtubeApp : {currentPlaying:{
                channelInfo:{id:channelId}
            }},
        } = getState()
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/activities?&key=AIzaSyDq5Pk92DgT0Q-Rf9n6u4Nzj5bBgzNyLUY&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=videoId=${videoId}`);
        const items = response.data.items;
        const recommendedVideos = await parseRecommendedData(items, videoId);

        return {
            parsedData
        }
    }
    )