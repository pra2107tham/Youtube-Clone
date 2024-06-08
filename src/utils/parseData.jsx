import React from 'react'
import axios from 'axios'
import parseVideoDuration from './parseVideoDuration'
import convertRawToString from './convertRawToString'
import timeSince from './timeSince'

export const parseData = async (items) => {

  try{
    console.log(items)
    const videoIds = [];
    const channelIds = [];

    items.forEach(items => {
      videoIds.push(items.id.videoId);
      channelIds.push(items.snippet.channelId);
    }
    )
    const {
      data : {items: channelsData},
    } = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=AIzaSyDq5Pk92DgT0Q-Rf9n6u4Nzj5bBgzNyLUY`);
    
    const parsedChannelsData = [];
    channelsData.forEach((channel) => {
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      });
    });

    const {
      data : {items: videosData}
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=AIzaSyDq5Pk92DgT0Q-Rf9n6u4Nzj5bBgzNyLUY`
    )
    // console.log(data)

    const parseData = [];
    items.forEach((item, index) => {
      const {image: channelImage} = parsedChannelsData.find(
        (channel) => channel.id === item.snippet.channelId
      );
      if(channelImage){
        parseData.push({
          videoId : item.id.videoId,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: parseVideoDuration(videosData[index].contentDetails.duration),
          videoViews: convertRawToString(videosData[index].statistics.viewCount),
          videoAge: timeSince(new Date(item.snippet.publishedAt)),
          channelInfo:{
            id: item.snippet.channelId,
            image: channelImage,
            name: item.snippet.channelTitle,
          }
        })
      }
    });

    return parseData;

  }catch(error){
    console.log(error);
  }

  return (
    <div>

    </div>
  )
}
