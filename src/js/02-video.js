import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTimeData =
  JSON.parse(localStorage.getItem('videoplayer-current-time')) || {};
player
  .setCurrentTime(currentTimeData.seconds || 0)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        console.log(error.name);
        break;

      default:
        // some other error occurred
        console.log(error.name);
        break;
    }
  });

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
  }, 1000)
);
