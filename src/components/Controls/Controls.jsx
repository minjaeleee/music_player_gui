import React, { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import RepeatIcon from "@mui/icons-material/Repeat"
import RepeatOneIcon from "@mui/icons-material/RepeatOne"
import PauseIcon from "@mui/icons-material/Pause";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import QueueMusic from "@mui/icons-material/QueueMusic";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

import { nextMusic, prevMusic, setRepeatMusic } from "../../store/musicPlayerReducer";
import "./Controls.scss";

const RepeatButton = ({repeat, ...props}) => {
  switch(repeat) {
    case 'ALL':
      return <RepeatIcon sx={{fontSize:30, cursor:"pointer"}} {...props}/>
    case 'ONE':
      return <RepeatOneIcon sx={{fontSize:30, cursor:"pointer"}} {...props}/>
    case 'SHUFFLE':
      return <ShuffleIcon sx={{fontSize:30, cursor:"pointer"}} {...props}/>
    default: 
      return null;
  }
}

const Controls = ({
  showMusicList,
  setshowPlayList,
  resetDuration,
  play,
  pause,
  changeVolume
}) => {
  const playing = useSelector(state=>state.playing)
  const repeat = useSelector(state=>state.repeat)
  const dispatch = useDispatch()

  const onClickPlay = () => play()
  const onClickPause = () => pause()

  const onClickNext = useCallback(() => {
    if(repeat === "ONE") {
      resetDuration()
    } else {
      dispatch(nextMusic())
    }
  },[repeat, resetDuration, dispatch])
  // redux 최신의 상태(repeat)를 보장하기 위해서 useCallback
  const onClickPrev = useCallback(() => {
    if(repeat === "ONE") {
      resetDuration()
    } else {
      dispatch(prevMusic())
    }
  },[repeat, resetDuration, dispatch])

  const onChangeVolume = (e) => {
    changeVolume(e.target.value)
  }

  const onClickRepeat = () => {
    dispatch(setRepeatMusic())
  }

  return (
    <div className="control-area">
      <QueueMusic
        sx={{ fontSize: 30, cursor: "pointer" }}
      />
      {/* <RepeatIcon sx={{fontSize:30, cursor:"pointer"}}></RepeatIcon>
      <RepeatOneIcon />
      <ShuffleIcon /> */}
      <RepeatButton repeat={repeat} onClick={onClickRepeat}/>
      <SkipPrevious
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickPrev}
      />
      {playing ? (
        <PauseIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPause}
        />
      ) : (
        <PlayArrow
          className="play"
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPlay}
        />
      )}
      <SkipNext
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickNext}
      />
      <div className="volume-container">
        <VolumeUpIcon sx={{ fontSize: 20 }} />
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          onChange={onChangeVolume}
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </div>
  );
};

export default memo(Controls);
