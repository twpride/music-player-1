function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const fetchHeader = () => ({
  "X-CSRFToken": getCookie('csrftoken'),
})

export const postSongs = songs => (
  fetch('/api/post_songs', {
    method: 'POST',
    body: JSON.stringify(songs),
    headers: fetchHeader(),
  })
);

export const editSongs = (song) => (
  fetch('/api/edit_songs', {
    method: 'POST',
    body: song,
    headers: fetchHeader(),
  })
);


export const getSongD = () => (
  fetch('/api/song_d/', {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const getSongUrl = id => (
  fetch(`/api/song_d/${id}`, {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const deleteSong = id => (
  fetch(`/api/song_d/${id}`, {
    method: 'DELETE',
    headers: fetchHeader(),
  })
)

export const createPlaylist = playlist => (
  fetch('/api/playlist_d/', {
    method: 'POST',
    body: playlist,
    headers: fetchHeader(),
  })
);

export const addTrack = (playlist, song) => (
  fetch(`/api/add_track/${playlist}/${song}`, {
    method: 'POST',
    headers: fetchHeader(),
  })
);



export const getPlaylistTitleD = () => (
  fetch('/api/playlist_d/', {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const getPlaylist = (id) => (
  fetch(`/api/playlist_d/${id}`, {
    method: 'GET',
    headers: fetchHeader(),
  })
);

export const deletePlaylist = (id) => (
  fetch(`/api/playlist_d/${id}`, {
    method: 'DELETE',
    headers: fetchHeader(),
  })
);


export const moveTrack = req => (
  fetch('/api/move_track', {
    method: 'POST',
    body: JSON.stringify(req),
    headers: fetchHeader(),
  })
);

export const deleteTrack = req => (
  fetch('/api/delete_track', {
    method: 'POST',
    body: JSON.stringify(req),
    headers: fetchHeader(),
  })
);