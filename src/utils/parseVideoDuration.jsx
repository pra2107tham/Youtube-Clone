import React from 'react'

const parseVideoDuration = (duration) => {
    // console.log(duration)

    const durationParts = duration
    .replace("PT", "")
    .replace("H", ":")
    .replace("M", ":")
    .replace("S", "")
    .split(":");

    // console.log(durationParts)

    if(durationParts.length === 3){ 
        return `${durationParts[0]}:${durationParts[1]}<:${durationParts[2]}`;
    }

    if(durationParts.length === 2){
        return `00:${durationParts[0]}:${durationParts[1]}`;
    }

    if(durationParts.length === 1){
        return `00:00:${durationParts[0]}`;
    }

    

  return (  
    <div>

    </div>
  )
}

export default parseVideoDuration