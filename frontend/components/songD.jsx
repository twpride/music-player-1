
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useReducer, useEffect } from 'react';
import burgerIcon from './icons/burger.svg'
import { getSongUrl } from './actions'
import { SONG_EDIT_C, SONG_BURGER_C } from './contextMenu'
import { openModal, openContextMenu } from '../actions/ui_actions';
const Table = styled.table`
  font-size: .9em;
  font-family: Sans-Serif;

  table-layout: fixed;
  border-collapse: collapse;
  
  width: 100%;

  tr {
    &:hover {
      background-color: #F0F0F0;
    }
  }
  
  td {
    height: 4em;
    &:not(:nth-child(2)) {
      width:3em;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    &:nth-child(2) {
      div {
        overflow:hidden;
        white-space: nowrap;
        &:nth-child(1) {
          color: #606060;
        }
      }
    }
  }
`

export default function SongD() {
  const dispatch = useDispatch();
  const playSong = (id) => (e) => {
    console.log(e, "not here")
    dispatch(getSongUrl(id))
  }

  const launchBurger = (id) => (e) => {
    console.log(e)
    e.stopPropagation()
    dispatch(openContextMenu(SONG_BURGER_C, id)) 
  }


  const songD = useSelector(state => state.entities.songD)

  return (
    <Table>
      <tbody>
        {Object.values(songD).map((song, i) => (
          <tr key={i} onClick={playSong(song.id)}>
            <td><div>{i + 1}</div></td>
            <td>
              <div>{song.artist}&nbsp;</div>
              <div>{song.title}&nbsp;</div>
            </td>
            <td onClick={launchBurger(song.id)}>
              <div><img src={burgerIcon} /></div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
};











