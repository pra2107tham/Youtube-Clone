import { createSlice } from '@reduxjs/toolkit'
import { getHomePageVideos } from '../../store/reducers/getHomePageVideos';
import { getSearchPageVideos } from '../../store/reducers/getSearchPageVideos';
import { getRecommendedVideos } from '../../store/reducers/getRecommendedVideos';
import { getVideoDetails } from '../../store/reducers/getVideoDetails';

const initialState = {
    video : [],
    currentPlaying: null,
    searchTerm:"",
    searchResults:[],
    nextPageToken:null,
    recommendedVideo:[]
};

export const youtubeSlice = createSlice({
    name: 'youtubeApp',
    initialState,
    reducers: {
        clearVideos: (state) => {
            state.video = [];
            state.nextPageToken = null;
        },
        changeSearchTerm: (state,action) => {
            state.searchTerm = action.payload;
        },
        clearSearchTerm: (state,action) => {
            state.searchTerm = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getHomePageVideos.fulfilled,(state,action) => {
            if(action.payload && action.payload.parsedData){
                state.video = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            
            }
        }),
        builder.addCase(getSearchPageVideos.fulfilled,(state,action) => {
            if(action.payload && action.payload.parsedData){
                state.video = action.payload.parsedData;
                state.nextPageToken = action.payload.nextPageToken;
            
            }
        }),
        builder.addCase(getRecommendedVideos.fulfilled,(state,action) => {
            if(action.payload && action.payload.parsedData){
                state.recommendedVideo = action.payload.parsedData;
            }
        }),
        builder.addCase(getVideoDetails.fulfilled,(state,action) => {
            if(action.payload && action.payload.parsedData){
                state.currentPlaying = action.payload.currentPlaying;
            
            }
        })
    }
    
})
export const {clearVideos, changeSearchTerm, clearSearchTerm} = youtubeSlice.actions
export default youtubeSlice.reducer