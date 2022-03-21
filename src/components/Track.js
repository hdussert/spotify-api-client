import React from 'react'

const Track = ({ track, chooseTrack }) => {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div className='track' onClick={handlePlay}>
      <img src={track.albumUrl}/>
      <div className='track-text'>
        <div className='track-text-title'>{track.title}</div>
        <div className='track-text-artist'>{track.artist}</div>
      </div>
      <div className='track-duration'>{track.duration}</div>
    </div>
  )
}

export default Track