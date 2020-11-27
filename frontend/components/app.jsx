import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components'

import SongD from './songD';
import UploadForm from './upload_form';
import Playlist from './playlist';
import PlaylistD from './playlistD';
import AudioPlayer from './audio_player'
import Navbar from './navbar';
import Modal from './modal'
import ContextMenu from './contextMenu'

import LoginForm from './login_form'
import SignupForm from './signup_form'

import { getSongD, getPlaylistTitleD } from '../util/api_util'
import { ProtectedRoute } from '../util/route_util'
import { loginThunk } from '../actions/actions'
import { ent_act } from "../reducers/root_reducer"

const AppDiv = styled.div`
  display: flex;
  flex-direction: column;
  height:100%;
  width:100%;

  .scrollable {
    height:95%;
    overflow-y:auto;
    z-index:1;
  }
`

export const HeaderDiv = styled.div`

  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: center;

  min-height: 50px;
  width: 100%;
  z-index: 10;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,0.03), 0 3px 3px -2px rgba(0,0,0,0.03), 0 1px 8px 0 rgba(0,0,0,0.05);

  .title {
    justify-self:center;
  }
`

const App = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.session.currentUser)

  useEffect(() => {
    console.log('yolo',currentUser)
    getSongD()
      .then(response => response.json())
      .then(songD => dispatch({ type: ent_act.RECEIVE_SONG_D, songD }));

    getPlaylistTitleD()
      .then(response => response.json())
      .then(playlistTitleD => dispatch(
        { type: ent_act.RECEIVE_PLAYLIST_TITLE_D, playlistTitleD }
      ));
    
  }, [])
  return (
    <AppDiv id="appdiv">
      <Switch>
        <Route exact path='/' component={SongD} />
        <Route exact path='/upload' component={UploadForm} />
        <Route path='/playlist_d/:playlist_id' component={Playlist} />
        <Route path='/playlist_d/' component={PlaylistD} />
      </Switch>
      <AudioPlayer />
      <Navbar />
      <Modal />
      <ContextMenu />
    </AppDiv>
  )
};

const SplashDiv = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:100%;
  >button {
    margin: 0.7em;
  }

`
export default function Splash() {
  const [mode, setMode] = useState(null)
  const dispatch = useDispatch()

  const demoScript = () => {
    const form = new FormData();
    form.append('email', 'demo1@demo.com')
    form.append('password', 'demodemo')
    dispatch(loginThunk(form))
  }

  const Choose = () => (
    <>
      <button onClick={() => setMode('login')}>Log in</button>
      <button onClick={() => setMode('signup')}>Sign up</button>
      <button onClick={demoScript}>Demo</button>
    </>
  )

  let Comp;
  switch (mode) {
    case 'login':
      Comp = LoginForm;
      break;
    case 'signup':
      Comp = SignupForm;
      break;
    default:
      Comp = Choose;
  }
  const currentUser = useSelector(state => state.session.currentUser);
  return (
    <>
      <SplashDiv>
        <ProtectedRoute exact path='/' component={App} />
        {!currentUser && <Comp setMode={setMode} />}
      </SplashDiv>
    </>
  )
}



