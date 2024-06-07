import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {parseData} from "../../utils/parseData.jsx"

// const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;


export const getHomePageVideos = createAsyncThunk(
    
    'youtube/App/HomePageVideos',
    async (isNext, {getState}) => {
        // console.log(API_KEY);
        const {
            youtubeApp : {nextPageToken : pageTokenFromState,video},
        } = getState()
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q="music"&key=AIzaSyDq5Pk92DgT0Q-Rf9n6u4Nzj5bBgzNyLUY&part=snippet&type=video&${isNext ? `pageToken=${pageTokenFromState}` : ""}`);
        
        // console.log(response.data.items);

        const items = response.data.items;

        // console.log(items); 

        const parsedData = await parseData(items);

        return {
            parsedData: [...video, ...parsedData],
            nextPageToken: nextPageTokenFromState
        }
    }
    )