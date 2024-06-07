import React from 'react'

const convertRawToString = (lableValue, isSub=false) => {
    // console.log(lableValue)
    const num = Math.abs(Number(lableValue));

    if(num >= 1.0e+9){
        return `${(num / 1.0e+9).toFixed(1)}B`;
    }
    if(num >= 1.0e+6){
        return `${(num / 1.0e+6).toFixed(1)}M`;
    }
    if(num >= 1.0e+3){
        return `${(num / 1.0e+3).toFixed(1)}K`;
    }
    return num.toString();

}

export default convertRawToString