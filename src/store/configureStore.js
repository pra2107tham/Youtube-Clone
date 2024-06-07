import { configureStore } from '@reduxjs/toolkit'
import  youtubeReducer  from '../features/youtube/featureSlice'

const store = configureStore({
  reducer: {
    youtubeApp: youtubeReducer,
  },
})

export {store}