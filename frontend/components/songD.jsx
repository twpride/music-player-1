
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import React, { } from 'react';

import burgerIcon from '../icons/burger.svg';
import { context_act } from '../reducers/ui_reducer'
import { ent_act } from '../reducers/root_reducer'
import PlayingIcon from '../icons/playing.gif'
import PausedIcon from '../icons/paused.gif'

function preventDrag(e) {
  e.preventDefault()
  e.stopPropagation()
}
const options = { year: 'numeric', month: 'long', day: 'numeric' }
export const CardDiv = styled.div`
  font-size: .9em;
  display:flex;
  flex-direction:row;
  align-items: center;
  @media (hover: hover) {
    &:hover {
        background-color: #F0F0F0;
    }
  }

  >div {
    height: 4em;
    opacity: ${props => props.isDragging ? 0.4 : 1};

    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      
      overflow:hidden;
      white-space: nowrap;
      div:nth-child(1) {
        color: #777777;
      }
    }

    &:not(:nth-child(2)) {
      min-width:3em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    &:nth-of-type(3) {
      margin-left: auto;
      color: #777777;
    }
  }
  img.equalizer {
    height:14px;
  }

  .drag-handle{
    cursor: move;
    user-select: none;
  }
  cursor: pointer;

`

export const Equalizer = ({ track, pl_id, index, playing }) => {
  if (track && track[0] === pl_id && track[1] === index) {
    if (playing) {
      return <img className='equalizer' src={PlayingIcon}
        onDragStart={preventDrag}
      ></img>
    } else {
      return <img className='equalizer' src={PausedIcon}
        onDragStart={preventDrag}
      ></img>
    }
  } else return index + 1
}

export default function SongD({ winWidth }) {
  const dispatch = useDispatch();
  const track = useSelector(state => state.player.track)
  const playing = useSelector(state => state.player.playing)
  const playSong = (i) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (document.getSelection().type === 'Range') return;
    dispatch({ type: ent_act.LOAD_TRACK, track: [null, i] })
    dispatch({ type: ent_act.SET_PLAY })
  }

  const launchBurger = (song_id, index) => (e) => {
    e.stopPropagation()
    dispatch({ type: context_act.SONG_BURGER_C, song_id, playlist_id: null, index })
  }

  const songD = useSelector(state => state.entities.songD)
  const songs_playlist = useSelector(state => state.entities.playlistD.songs_playlist)

  return (

    <div className="scrollable">
      {/* {songs_playlist && songs_playlist.map((song_id, i) => ( */}
      {Object.values(songD).map((song, i) => (
        <CardDiv key={i} onClick={playSong(i)}>
          <div>
            <Equalizer
              track={track}
              pl_id={null}
              index={i}
              playing={playing}
            />
          </div>
          <div>
            {/* <div>{songD[song_id].artist}</div> */}
            {/* <div>{songD[song_id].title}</div> */}
            <div>{song.artist}</div>
            <div>{song.title}</div>
          </div>
          {winWidth > 730 &&
            // <div>{(new Date(Date.parse(songD[song_id].date_added))).toLocaleDateString()}</div>
            <div>{(new Date(Date.parse(songD[song.id].date_added))).toLocaleDateString()}</div>
          }
          {/* <div onClick={launchBurger(parseInt(song_id), i)}> */}
          <div onClick={launchBurger(song.id, i)}>
            <div><img src={burgerIcon} /></div>
          </div>
        </CardDiv>
      ))}
    </div>
  )
};






