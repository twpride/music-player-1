import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { postSongs } from '../actions/actions'
import { getPostUrls } from '../util/api_util'
import Spinner from './spinner'
import plus from '../icons/plus.svg'
import playlistIcon from '../icons/playlist_grey.svg'
import xIcon from '../icons/x.svg'
import UploadIcon from '../icons/upload.svg'
import { ent_act } from '../reducers/root_reducer';
const ytdlAPI = "https://9fm8fonkk8.execute-api.us-west-1.amazonaws.com/test/?url="
// const ytdlAPI = "https://kp31ynjvnj.execute-api.us-west-1.amazonaws.com/test/?url="
// const ytdlAPI = "https://adtk67yvyl.execute-api.us-west-1.amazonaws.com/test/?url="


const AddIcon = ({ playlist, added }) => {
  if (playlist) {
    return <img src={playlistIcon} />
  } else if (!added) {
    return <img src={plus} />;
  } else {
    return <div></div>
  }
}


const UploadFormEle = styled.form`
  height:100%;
  position: relative;
  margin: auto auto;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color:white;
  label {
    color:#ad0f37; 
    /* border: 1px solid #ad0f37; */
    /* padding: 2px; */
    /* border-radius: 3px; */
    cursor: pointer;
  }
  #file-count {
    font-size:8px;
  }
  input[type=text] {
    width:100%;
  }
  input[type=text]::placeholder {
    text-align: center;
  }
  textarea {
    resize: none;
    height: 19px;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    border: 0;
    border-bottom: 1px solid lightgrey;
    outline: none; 
  }
  textarea:focus {
    border-color:#333;
  }
  .button-box {
    display:flex;
    font-size:1em;
  }
  div.or {
    color:black;
    height: 4em;
    display:flex;
    align-items:center;
  }
  span.divider {
    width: 40px;
    height: 1px;
    margin: 0 16px;
    background-color: lightgrey;
  }
  textarea::placeholder {
    text-align: center;
    color: greyscale(0.4);
  }

  .holder {
    display:flex;
    flex-direction:row;
    width: min(20em,90%);
    position:absolute;
    top: 5px;
    z-index:5;
  }
  .error-holder {
    overflow-y:auto
  }
  input[type=submit] {
    padding:5px;
  }
  div.disclaimer {
    position:absolute;
    bottom:5px;
    font-size:10px;
  }
  .submit-button {
    height:50px;
  }
`
const SearchResDiv = styled.div`
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

export default function UploadForm() {
  const [searchRes, setSearchRes] = useState(null)
  const [added, setAdded] = useState(null)
  // window.added=added;
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState([]);
  const form = useRef(null)
  const tboxRef = useRef(null)
  const dispatch = useDispatch()
  const search = useSelector(state => state.entities.search)
  const [filelist, setFilelist] = useState([]);
  const [urls, setUrls] = useState(search.search_term);

  const loadSong = e => {
    // setFilelist(e.currentTarget.files)
    submitSong(e)
  }

  const submitSong = async e => {

    e.preventDefault();
    setLoading(true)
    const formData = new FormData(form.current);
    const errorsArr = []

    //upload local songs
    const waveforms = formData.getAll('waveform')
    const localFiles = waveforms.map(ent => [ent.name, null]).filter(ent => ent[0]) // if no files return empty array
    if (localFiles.length) {
      try {
        const signedUrls = await getPostUrls(localFiles).then(
          res => res.json()
        )
        await Promise.all(
          signedUrls.map(async (url, idx) => {

            const ul = new FormData()
            for (let key in url.fields) {
              ul.append(key, url.fields[key]);
            }
            ul.append('file', waveforms[idx])

            await fetch(url.url, {
              method: 'POST',
              body: ul,
            });
          })
        )
      } catch (err) {
        errorsArr.push(err.message)
      }
    }

    // scrape youtube songs
    const urlsArray = urls? urls.split("\n").filter(ent => ent) : []//filter blank lines

    const songs = await Promise.all(
      urlsArray.map(async url => {
        // console.log('querying:' + rl)
        const resp = await fetch(ytdlAPI + url)
        const json = await resp.json();
        if (!resp.ok) {
          errorsArr.push(json)
          // console.log("fail")
        }
        return json
      })
    )
    if (!songs.length || songs[0].Key || errorsArr.length) {
      const ytFiles = songs.map(ent => [ent.Key, ent.yt_id]).filter(ent => ent[0]) //filter failed reqs

      const files = Array.concat(localFiles, ytFiles)
      if (files.length) dispatch(postSongs(files))

      if (errorsArr.length) {
        setErr(errorsArr)
      } else {
        setUrls('')
      }
      setLoading(false)
    } else {
      setSearchRes(songs[0])
      dispatch({ type: ent_act.RECEIVE_SEARCH_RESULTS, search_term: urls, search_results: songs[0] })
      console.log(songs[0])
      setAdded(Array(songs[0].length).fill(false))
    }
  }

  function onTextChange(e) {
    const tbox = tboxRef.current;
    setUrls(tbox.value)
    // const nLine = (tbox.value.match(/\n/g) || []).length + 1;
    // if (nLine > 3) {
    //   tbox.style.overflowY = "scroll"
    //   tbox.style.height = (19 * 3 + 2) + 'px';
    // } else {
    //   tbox.style.height = (nLine * 19 + 2) + 'px';
    //   tbox.style.overflowY = "hidden"
    // }
  }

  const addSong = (url) => async (e) => {
    const resp = await fetch(ytdlAPI + url)
    const json = await resp.json();
    if (json.Key) {
      dispatch(postSongs([[json.Key, json.yt_id]]))
    } else {
      dispatch({ type: ent_act.RECEIVE_SEARCH_RESULTS, search_term: urls, search_results: json })
    }
  }

  return (
    <UploadFormEle className="scrollable" ref={form} onSubmit={submitSong}
      onClick={(e) => e.stopPropagation()}
    >
      <input type="file" name="waveform"
        onChange={loadSong} multiple hidden id='choose-file' />
      <div className="holder">
        <label htmlFor='choose-file'>
          <img src={UploadIcon}></img>
        </label>
        <textarea type="text"
          name="url"
          value={urls}
          placeholder="Search song, album, artist"
          onChange={onTextChange}
          onKeyDown={(e) => { if (e.key === 'Enter') submitSong(e) }}
          wrap="off"
          ref={tboxRef}
        />
        <img src={xIcon} onClick={e => {
          dispatch({ type: ent_act.CLEAR_SEARCH_RESULTS })
          setUrls('')
        }} />
      </div>

      {!search.search_results && loading && <Spinner />}
      {search.search_results && <div className="scrollable">
        {search.search_results.map((el, idx) => (
          <SearchResDiv key={idx}>
            <div>{el.title}</div>
            <div onClick={addSong(el.url)}>
              <AddIcon playlist={el.type === "playlist"} added={search.yt_id_set.has(el.id)} />
            </div>
          </SearchResDiv>
        ))}
      </div>}

      <div className='holder error-holder'>
        {err.map((mes, i) => (
          <div key={i}>
            {mes}
          </div>
        ))}
      </div>
      <div className="disclaimer">Disclaimer: I condone only adding music that you own or ones that are royalty-free.</div>
    </UploadFormEle>
  )
};


