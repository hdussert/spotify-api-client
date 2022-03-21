import React from 'react'

import { msToString } from '../utils/duration';
import Track from './Track';

export function trackStructFromResult(track) {
  const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
    if (smallest.height > image.height) return image;
    return smallest;
  });
  
  return {
    title: track.name,
    artist: track.artists[0].name,
    uri: track.uri,
    albumUrl: smallestAlbumImage.url,
    duration: msToString(track.duration_ms),
  }
}

const TrackList = ({ tracks, chooseTrack }) => {
  return (
    <div className='track-list'>
      {tracks.map((track, k) => <Track track={track} chooseTrack={chooseTrack} key={k}/>)}
    </div>
  )
}

export default TrackList