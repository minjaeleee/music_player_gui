import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import "./ProgressArea.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { nextMusic, playMusic,stopMusic } from "../../store/musicPlayerReducer";
function ProgressArea(props, ref) {
  const audio = useRef()
  const progressBar = useRef()
  const dispatch = useDispatch()
  const{playList, currentIndex} = useSelector(state => ({playList: state.playList, currentIndex:state.currentIndex}), shallowEqual)
  const [currentTime, setCurrentTime] = useState("00:00")
  const [duration, setDuration] = useState("00:00")

  useImperativeHandle(ref, ()=> ({
    play: ()=>{audio.current.play()},
    pause: ()=>{audio.current.pause()},
    changeVolume: (volume) => {audio.current.volume = volume}
  }))

  const onPlay = () => dispatch(playMusic())

  const getTimeConvert = (time) => {
    const minute = `0${parseInt(time/60,10)}`
    const seconds =`0${parseInt(time%60)}`
    return `${minute}:${seconds.slice(-2)}`
  }

  const onClickProgress = e => {
    const progressBarWidth = e.currentTarget.clientWidth
    const offsetX = e.nativeEvent.offsetX
    const duration = audio.current.duration
    audio.current.currentTime = (offsetX/progressBarWidth) * duration
  }

  const onTimeUpdate = (e) => {
    if(e.target.readyState === 0) return;
    const currentTime = e.target.currentTime
    const duration = e.target.duration
    const progressBarWidth = currentTime/duration * 100
    progressBar.current.style.width = `${progressBarWidth}%`
    setCurrentTime(getTimeConvert(currentTime))
    setDuration(getTimeConvert(duration))
  }
  const onPause = () => dispatch(stopMusic())
  const onEnded = () => dispatch(nextMusic())

  return (
    <div className="progress-area" onClick={onClickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio 
          autoPlay
          ref={audio}
          src={playList[currentIndex].src}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
        >
          autoPlay
        </audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default forwardRef(ProgressArea);
