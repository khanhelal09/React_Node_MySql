import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = () => {

  const VIDEO_PATH = "https://www.youtube.com/watch?v=y_BrP2adctM&list=PLU2LduF4t5E4N3m9mnZs7NDaEmEdiT-EU&index=9&ab_channel=Dr.SayemHossain";

  return (
    <div style={{background:'gray'}}>
      <ReactPlayer
        height={'300px'}
        width={'300px'}
        url={VIDEO_PATH}
        controls={true}
        onPlay={() => console.log("VideoPlayer >> video is playing")}
        onPause={() => console.log("VideoPlayer >> video is paused")}
      />
    </div>
  );
};

export default VideoPlayer;
