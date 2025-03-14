"use client"
import React, { useState } from 'react'
import { Player } from "@remotion/player";
import RemotionComposition from '@/app/_components/RemotionComposition';

function RemotionPlayer({videoData}) {

  const [durationInFrame, setDurationInFrame] = useState(100);

  return (
    <div>
      <Player
        component={RemotionComposition}
        durationInFrames={Number(durationInFrame.toFixed(0)) + 100}
        compositionWidth={720}
        compositionHeight={1280}
        fps={30}
        controls
        style={{
            width: '25vw',
            height: '70vh',
        }}
        inputProps={{
            videoData: videoData,
            setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
        }}
        />
    </div>
  )
}

export default RemotionPlayer
