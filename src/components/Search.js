import { useState, useEffect } from 'react'
import { spotifyAPI } from './Spotify';
import Track from './Track';
import TrackList, { trackStructFromResult } from './TrackList';

const Search = ({ changePlayingTrack }) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  function chooseTrack(track) {
    setSearch('');
    changePlayingTrack(track);
  }
  
  useEffect(()=> {
    window.history.pushState({}, null, '/search'+ (search ? '/' + search : ''));
    if (!search) return setSearchResults([]);

    let cancel = false;
    spotifyAPI.searchTracks(search).then(res => {
      if (cancel) return;
      setSearchResults(res.body.tracks.items.map(track => trackStructFromResult(track)))
    })
    return () => cancel = true;
  }, [search])

  return (
    <div className='search'>
      <input 
        className='search-bar'
        type='search' 
        placeholder='Search Songs/Artists...'
        spellCheck='false'
        value={search} 
        onChange={event => {setSearch(event.target.value)}}
      />
      <TrackList tracks={searchResults} chooseTrack={chooseTrack} />
    </div>
  )
}

export default Search