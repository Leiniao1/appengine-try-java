var t = new Date + "",
    canvas_whole = document.getElementsByTagName("canvas")[0];

function timer() {
  var current_time = new Date,
      game_init_time = new Date(t),
      minutes = current_time.getMinutes() - game_init_time.getMinutes(),
      seconds = current_time.getSeconds() - game_init_time.getSeconds();
  if (seconds < 0) {
    minutes = minutes - 1;
    seconds = seconds + 60;
  }
  return minutes + " : " + seconds
}
    
