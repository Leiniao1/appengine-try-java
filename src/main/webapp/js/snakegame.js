var t = new Date + "",
    canvas_whole = document.getElementsByTagName("canvas")[0],
    canvas_context = canvas_whole.getContext("2d"),
    h = innerHeight,
    w = innerWidth,
    timeout_millsecond = 50,
    food_array = [];
key = {}, key.keydown = function (t) {
    var event = document.createEvent("KeyboardEvent");
    Object.defineProperty(event, "keyCode", {
      get: function () {
          return this.keyCodeVal
      }
    }), Object.defineProperty(event, "key", {
      get: function () {
          return this.keyCodeVal == 37 ? "ArrowLeft" : this.keyCodeVal == 38 ? "ArrowUp" : this.keyCodeVal == 39 ? "ArrowRight" : this.keyCodeVal == 40 ? "ArrowDown" : "ArrowUnknown"
      }
    });

}

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

function init() {
    canvas_whole.height = h, canvas_whole.width = w;
    canvas_context.fillRect(0, 0, w, innerHeight);
    for (var food_index = 0; food_index < 10; food_index++) food_array.push(new food);
    
}

function foodcolor() {
    for (var colorcode = "0123456789ABCDEF", color = "#", i = 0; i < 6; i++) {
        color += colorcode[Math.ceil(15 * Math.random())];
    }
    return color
}    

function food() {
    this.x = 0, this.y = 0, this.w = 10, this.h = 10, this.color = foodcolor(), this.renew = function() {
        this.x = Math.floor(Math.random() * (w - 20) + 10),
        this.y = Math.floor(Math.random() * (h - 20) + 10),
        this.color = foodcolor()
    }, this.renew(), this.put = (() => {
        canvas_context.fillStyle = this.color;
        canvas_context.fillRect(this.x, this.y, this.w, this.h);
    })
}

function anima() {
    canvas_context.fillStyle = "rgba(0, 0, 0, 0.12)", canvas_context.fillRect(0, 0, canvas_whole.width, canvas_whole.height),
        food_array.forEach(target => target.put()), document.getElementById("time").innerText = timer(), setTimeout(
        () => {requestAnimationFrame(anima)}, timeout_millsecond)
    
}
