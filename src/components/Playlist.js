import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import { spotifyAPI } from './Spotify';
import TrackList from './TrackList';
import { trackStructFromResult } from './TrackList';

const Playlist = ({changePlayingTrack}) => {
  const [ playlistID, setPlaylistID ] = useState();
  const [ tracks, setTracks ] = useState([]);
  const [ playlistInfos, setPlaylistInfos ] = useState();

  const history = useLocation();

  useEffect(()=> {
    setPlaylistID(history.pathname.split('/').pop());
  }, [history]);

  useEffect(()=>{
    if (!playlistID) return;
    spotifyAPI.getPlaylist(playlistID)
    .then(data => {
      console.log(data.body);
      setPlaylistInfos({
        name: data.body.name,
        img: data.body.images[0]?.url,
        numberOfTracks: data.body.tracks.total
      })
      setTracks(data.body.tracks.items.map(item => trackStructFromResult(item.track)))
    })
  }, [playlistID])

  return (
    <div className='playlist'>
      <div className='playlist-header'>
        <img className='playlist-header-img' src={playlistInfos?.img} />
        <div className='playlist-header-infos'>
          <div className='playlist-header-infos-name'>
            {playlistInfos?.name}
          </div>
          <div className='playlist-header-infos-nb'>
            ({playlistInfos?.numberOfTracks} tracks)
          </div>
        </div>
      </div>
      <TrackList tracks={tracks} chooseTrack={changePlayingTrack}/>
    </div>
  )
}

export default Playlist