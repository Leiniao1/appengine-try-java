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

function coll(t, e) {
    return t.x < e.x + e.w && t.x + t.w > e.x && t.y < e.y + e.h && t.h + t.y > e.y
}

function snake() {
    this.w = 15, this.h = 15, this.dx = 1, this.dy = 1, this.xf = 1, this.yf = 1, this.snake_body = [];
    for (var t = {
        x: w / 2,
        y: h / 2
    }, e = 0; e < 5; e++) this.snake_body.push(Object.assign({}, t)), t.x += this.w;
    this.draw = function () {
        var t = d && d.search("Arrow") > -1,
            e = -1;
        if (t) {
            var i = {
                ...this.snake_body[0]
            };
            if ("ArrowUp" == d && (i.y -= this.h), "ArrowDown" == d && (i.y += this.h), "ArrowLeft" == d && (i.x -= this.w), "ArrowRight" == d && (i.x += this.w), i.x >= w ? i.x = 0 : i.x < 0 && (i.x = w - this.w), i.y > h ? i.y = 0 : i.y < 0 && (i.y = h), e = fa.findIndex(t => coll({
                ...this.snake_body[0],
                h: this.h,
                w: this.w
            }, t)), this.snake_body.unshift(i), -1 != e) return console.log(e), fa[e].renew(), void (document.getElementById("score").innerText = Number(document.getElementById("score").innerText) + 1);
            this.snake_body.pop(), console.log(6)
        }
        this.snake_body.forEach((t, e, i) => {
            if (0 == e || i.length - 1 == e) {
                var n = canvas_context.createLinearGradient(t.x, t.y, t.x + this.w, t.y + this.h);
                i.length - 1 == e ? (n.addColorStop(0, "black"), n.addColorStop(1, "#8BC34A")) : (n.addColorStop(0, "#8BC34A"), n.addColorStop(1, "white")), canvas_context.fillStyle = n
            } else canvas_context.fillStyle = "#8BC34A";
            canvas_context.fillRect(t.x, t.y, this.w, this.h), canvas_context.strokeStyle = "#E91E63", canvas_context.font = "30px serif", canvas_context.strokeStyle = "#9E9E9E", i.length - 1 != e && 0 != e && canvas_context.strokeRect(t.x, t.y, this.w, this.h), 0 == e && (canvas_context.beginPath(), canvas_context.fillStyle = "#F44336", canvas_context.arc(t.x + 10, t.y + 2, 5, 360, 0), canvas_context.fill()), canvas_context.arc(t.x + 10, t.y + 2, 5, 360, 0), canvas_context.fill(), canvas_context.beginPath()
        })
    }
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
        }, this.renew(), 
        this.put = (() => {
            canvas_context.fillStyle = this.color,
            canvas_context.fillRect(this.x, this.y, this.w, this.h)
    })
}

function init() {
    canvas_whole.height = h, canvas_whole.width = w, canvas_context.fillRect(0, 0, w, innerHeight);
    for (var t = 0; t < 10; t++) food_array.push(new food);
    s = new snake(w / 2, h / 2, 400, 4, 4), anima()
}

function anima() {
    canvas_context.fillStyle = "rgba(0,0,0,0.11)", canvas_context.fillRect(0, 0, canvas_whole.width, canvas_whole.height), food_array.forEach(t => t.put()), s.draw(), document.getElementById("time").innerText = timer(), setTimeout(() => {
        requestAnimationFrame(anima)
    }, fw)
}

function emit(t) {
    key.keydown(t)
}

var t = new Date + "",
    d = void 0,
    canvas_whole = document.getElementsByTagName("canvas")[0],
    canvas_context = canvas_whole.getContext("2d"),
    key = {}, key.keydown = function (t) {
        var e = document.createEvent("KeyboardEvent");
        Object.defineProperty(e, "keyCode", {
            get: function () {
                return this.keyCodeVal
            }
        }), Object.defineProperty(e, "key", {
            get: function () {
                return 37 == this.keyCodeVal ? "ArrowLeft" : 38 == this.keyCodeVal ? "ArrowUp" : 39 == this.keyCodeVal ? "ArrowRight" : "ArrowDown"
            }
        }), e.initKeyboardEvent ? e.initKeyboardEvent("keydown", !0, !0, document.defaultView, !1, !1, !1, !1, t, t) : e.initKeyEvent("keydown", !0, !0, document.defaultView, !1, !1, !1, !1, t, 0), e.keyCodeVal = t, e.keyCode !== t && alert("keyCode mismatch " + e.keyCode), document.dispatchEvent(e)
    };
var o, s, h = innerHeight,
    w = innerWidth,
    timeout_millsecond = 50,
    food_array = [];
window.onkeydown = function (t) {
    var e = t.key;
    (e.search("Arrow") > -1 || "1" == e) && (d = t.key),
    "i" != e && "I" != e || (console.log("inc"), timeout_millsecond -= 10), 
    "d" != e && "D" != e || (console.log("dec"), timeout_millsecond += 10)
}, init();
