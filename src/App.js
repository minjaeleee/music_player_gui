import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgrssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";
import React, { useCallback, useRef, useState } from "react";

function App() {
  const audioRef = useRef()
  const onPlay = () => {
    console.log("onPlay", audioRef.current.play())
    audioRef.current.play()
  }
  const onPause = () => {
    console.log("onPause", audioRef.current.pause())
    audioRef.current.pause()
  }
  const changeVolume = (volume) => {
    audioRef.current.changeVolume(volume)
  }
  const resetDuration = () => {
    audioRef.current.resetDuration()
  }

  return (
    <div className="App">
      <div className="container">
        <SongDetail />
        <ProgressArea ref={audioRef} />
        <Controls
          play={onPlay}
          pause={onPause}
          changeVolume={changeVolume}
          resetDuration={resetDuration}
        />
        <PlayList />
      </div>
    </div>
  );
}

export default App;
