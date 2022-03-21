export function msToString(ms) {
  const duration = (ms - (ms % 1000)) / 1000;
  const seconds = (duration % 60);
  const minutes = (duration - seconds) % 3600;
  const hours = (duration - minutes - seconds) / 3600;
  const durationString = 
    hours > 0 ? hours.toString() + ':' + ('0' + (minutes / 60).toString()).slice(-2) : (minutes / 60).toString()
    + ':' + ('0' + seconds.toString()).slice(-2);
  return durationString;
}