import './MusicPlayer.css'
import React, { useContext, useEffect, useState, useRef } from 'react'
import styled from 'styled-components';

import { GlobalContext } from '../context/GlobalState'


const HeaderText = styled.h2`
text-align: center; 
padding-block: 10px;
`;

const TextContainer = styled.div`
text-align: center;
`

const ButtonsDiv = styled.div`
display: flex;
align-items: center;
gap: 10px
`;

const Button = styled.button`
padding: 7px;
width: 30px;
box-shadow: 1px 1px 7px #000;
border-radius: 50px;
cursor: pointer;
font-size: .5rem;

@media (min-width: 376px) {
  width: 50px;
  font-size: .7rem;
}
`;

const ImgContainer = styled.div`
  width: 40%;
  margin-inline: auto;
  border-radius: 50%;
`
const Img = styled.img`
  width: 100%;
  border-radius: 50%;
`

const MusicPlayer = () => {


  //Background
  const { getPeriod, currentHour } = useContext(GlobalContext)

  //Music
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dataLength, setDataLength] = useState(0)
  const [fetched, setFetched] = useState(false)
  const [src, setSrc] = useState("../sounds/15-Alexandre Desplat – New Moon (The Meado).mp3")
  const [song, setSong] = useState("")
  const [newSong, setNewSong] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const playPauseRef = useRef()
  const audioRef = useRef()
  const progressRef = useRef()
  const playAnimationRef = useRef();


  //Background
  useEffect(() => {
    getPeriod()
  }, [currentHour]) //period ?
  getPeriod()

  //Music

  /*useEffect(() => {
    progressRef.current.max = song.duration;
    progressRef.current.value = song.currentTime;
  }, [data])*/

  useEffect(() => {
    //isPlaying(false)
    setFetched(false)
    getData()
  }, [currentIndex, duration])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      progressRef.current.value = song.currentTime
      setTimeProgress(song.currentTime)
      if (song.currentTime == song.duration) {
        playPauseRef.current.classList.add("fa-reply")
        playPauseRef.current.classList.remove("fa-pause")
      }
    }, 500)
    return () => {
      clearInterval(progressInterval)
    }
  }, [song])



  function getData() {
    setFetched(false)
    //console.log(fetched)
    fetch("./data.json")
      .then(response => response.json())
      .then((data) => {
        setData(data)

        setDataLength(data.length - 1)
        setFetched(true)

        setSong(new Audio(data[currentIndex].sound))

        console.log(song.duration)

      })

  }


  function jumpToNext() {
    setFetched(false)
    song.pause();
    //setPlay(false)
    if (currentIndex === dataLength) {
      setCurrentIndex(0)

    } else {
      setCurrentIndex(prevIndex => prevIndex + 1)

    }

    //setSrc(data[currentIndex].sound)
    playPauseRef.current.className = 'fa-solid fa-play'

    /*setNewSong(!newSong)
    if (newSong) {
      console.log(song.currentTime)
    }*/

    if (song.duration !== "Nan") {
      progressRef.current.max = song.duration
    }

  }


  function jumpToPrev() {
    if (currentIndex === 0) {
      setCurrentIndex(dataLength)
    } else {
      setCurrentIndex(prevIndex => prevIndex - 1)
    }

    //setPlay(false)
    song.pause();
    //setSrc(data[currentIndex].sound)
    playPauseRef.current.className = 'fa-solid fa-play'


  }

  function playPause() {
    //handleProgressChange()
    if (playPauseRef.current.classList.contains("fa-pause")) {
      song.pause();
      playPauseRef.current.classList.remove("fa-pause")
      playPauseRef.current.classList.add("fa-play")
    } else if (playPauseRef.current.classList.contains("fa-play")) {
      song.play();
      playPauseRef.current.classList.add("fa-pause")
      playPauseRef.current.classList.remove("fa-play")

    } else {
      //progressRef.current.value = 0;
      song.play()
      playPauseRef.current.classList.add("fa-pause")
      playPauseRef.current.classList.remove("fa-reply")

    }
  }

  function jumpToLeft() {
    progressRef.current.value = progressRef.current.value - 30;
    song.currentTime = progressRef.current.value;
    song.play();
    playPauseRef.current.classList.remove("fa-play")
    playPauseRef.current.classList.add("fa-pause")

  }

  function jumpToRight() {
    progressRef.current.value = song.currentTime + 30;
    song.currentTime = progressRef.current.value;
    song.play();
    playPauseRef.current.classList.add("fa-pause")
    playPauseRef.current.classList.remove("fa-play")
  }

  function useProgressBar() {
    song.play();
    song.currentTime = progressRef.current.value;
    playPauseRef.current.classList.remove("fa-play")
    playPauseRef.current.classList.add("fa-pause")
  }


  const onLoadedMetadata = () => {
    
      //console.log(fetched)
      //console.log(song.duration)
      const seconds = song.duration
      setDuration(seconds);
      progressRef.current.max = song.duration;
      progressRef.current.value = song.currentTime;
      console.log(progressRef.current.max)

    }

    const formatTime = (time) => {
      if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60);
        const formatMinutes =
          minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(time % 60);
        const formatSeconds =
          seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${formatMinutes}:${formatSeconds}`;
      }
      return '00:00';
    };




    return (

      <div className="container fade-in-container">
        <HeaderText>Zenelejátszó</HeaderText>
        {
          fetched &&
          <div className="song-card fade-in-container block-container">
            <ImgContainer>
              <Img src={data[currentIndex].img} alt="" />
            </ImgContainer>
            <TextContainer className="text">
              <h2>{data[currentIndex].title}</h2>
              <h3>{data[currentIndex].author}</h3>
            </TextContainer>
          </div>
        }

        {
          fetched &&

          <audio src={src}
            ref={audioRef}
            preload='metadata'
            onLoadedMetadata={onLoadedMetadata}>
          </audio>
        }

        {fetched &&
          <div className='fade-in-container'>
            <input type='range'
              ref={progressRef}
              value={timeProgress}
              onChange={useProgressBar}
              max={duration ? duration : `${duration}`}
              id='progress' />

            <ButtonsDiv className="buttons">

              <span className="time current">{formatTime(timeProgress)}</span>
              <Button onClick={jumpToPrev} className="jump-btn-s">
                <i className="fa-solid fa-arrow-left" id="left"></i>
              </Button>
              <Button onClick={jumpToLeft} className="jump-btn-s">
                <i className="fa-solid fa-backward" id="backwards"></i>
              </Button>
              <Button onClick={playPause} className="play-pause-btn">
                <i ref={playPauseRef} className={isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"} id="ctrl-icon"></i>
              </Button >
              <Button onClick={jumpToRight} className="jump-btn-s">
                <i className="fa-solid fa-forward" id="forwards"></i>
              </Button>
              <Button onClick={jumpToNext} className="jump-btn-s">
                <i className="fa-solid fa-arrow-right" id="right"></i>
              </Button>
              <span>
                {formatTime(duration)}
              </span>


            </ButtonsDiv>
          </div>
        }

      </div>

    )
  }


  export default MusicPlayer

