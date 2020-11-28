
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import styled from 'styled-components'

import { getPlaylistTitleD } from '../actions/actions'

import { Link } from 'react-router-dom'
import Header from './header'
import burgerIcon from '../icons/burger.svg';

import { context_act } from '../reducers/ui_reducer'
const PlaylistTitleDiv = styled.div`
  font-size: 1em;
  display:flex;
  flex-direction:row;
  align-items: center;
  padding-left: 1.5em;
  &:hover {
      background-color: #F0F0F0;
  }
  .row {
    display:flex;
    flex-direction:row;
  }
  >div {
    height:4em;
    display:flex;
    align-items:center;
  }
  >:last-child {
    margin-left: auto;
    min-width:3em;
    justify-content:center;
  }

`

const NewPlaylistDiv = styled.button`
  margin-left: 1.5em;
  height:4em;
  display:flex;
  align-items:center;
`

export default function PlaylistD() {

  const dispatch = useDispatch();

  const titleD = useSelector(state => state.entities.playlistD.playlistTitleD)

  useEffect(() => {
    if (!titleD) {
      dispatch(getPlaylistTitleD())
    }
  }, [])

  const launchBurger = (playlist_id) => (e) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch({ type: context_act.PLAYLIST_BURGER_C, playlist_id })
  }

  return <>
    <Header title='Playlists' />
    <div className="scrollable">
      {titleD && Object.values(titleD).map((pl, index) => (
        <Link key={index} to={`/playlist_D/${pl.id}`}>
          <PlaylistTitleDiv className='row'  >
            <div>{pl.title}</div>
            <div onClick={launchBurger(pl.id)}>
              <div><img src={burgerIcon} /></div>
           </div>
          </PlaylistTitleDiv>
        </Link>
      ))}
      <NewPlaylistDiv
        onClick={() => dispatch({ type: context_act.NEW_PLAYLIST })}>
        New playlist
      </NewPlaylistDiv>
    </div>
  </>
};












