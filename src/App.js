import "./App.scss";
import Controls from "./components/Controls/Controls";
import PlayList from "./components/PlayList/PlayList";
import ProgressArea from "./components/ProgrssArea/ProgressArea";
import SongDetail from "./components/SongDetail/SongDetail";
import React, { useCallback, useRef, useState } from "react";

function App() {
  const audioRef = useRef()
  const [showPlayList, setShowPlayList] = useState(false)

  /* audio를 play시키는 방법은 elment의 play() 함수를 이용하거나, element의 currentTIme을 제공해준다. */
  const onPlay = useCallback(() => {
    audioRef.current.play()
  }, [])
  const onPause = useCallback(() => {
    audioRef.current.pause()
  }, [])
  const changeVolume = useCallback((volume) => {
    audioRef.current.changeVolume(volume)
  }, [])
  const resetDuration = useCallback(() => {
    audioRef.current.resetDuration()
  }, [])

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
          setShowPlayList={setShowPlayList}
        />
        <PlayList
          setShowPlayList={setShowPlayList}
          showPlayList={showPlayList}
        />
      </div>
    </div>
  );
}

export default App;
