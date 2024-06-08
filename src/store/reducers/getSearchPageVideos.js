import React from 'react'
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {parseData} from "../../utils/parseData.jsx"

export const getSearchPageVideos = createAsyncThunk(
    
    'youtube/App/SearchPageVideos',
    async (isNext, {getState}) => {
        // console.log(API_KEY);
        const {
            youtubeApp : {nextPageToken : nextPageTokenFromState,video, searchTerm},
        } = getState()
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?&q=${searchTerm}&key=AIzaSyDq5Pk92DgT0Q-Rf9n6u4Nzj5bBgzNyLUY&part=snippet&type=video&${isNext ? `pageToken=${pageTokenFromState}` : ""}`);
        
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