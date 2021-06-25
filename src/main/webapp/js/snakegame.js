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
    this.w = 15, this.h = 15, this.dx = 1, this.dy = 1, this.xf = 1, this.yf = 1, this.sn = [];
    for (var t = {
        x: w / 2,
        y: h / 2
    }, e = 0; e < 5; e++) this.sn.push(Object.assign({}, t)), t.x += this.w;
    this.draw = function () {
        var t = d && d.search("Arrow") > -1,
            e = -1;
        if (t) {
            var i = {
                ...this.sn[0]
            };
            if ("ArrowUp" == d && (i.y -= this.h), "ArrowDown" == d && (i.y += this.h), "ArrowLeft" == d && (i.x -= this.w), "ArrowRight" == d && (i.x += this.w), i.x >= w ? i.x = 0 : i.x < 0 && (i.x = w - this.w), i.y > h ? i.y = 0 : i.y < 0 && (i.y = h), e = food_array.findIndex(t => coll({
                ...this.sn[0],
                h: this.h,
                w: this.w
            }, t)), this.sn.unshift(i), -1 != e) return console.log(e), food_array[e].renew(), void (document.getElementById("score").innerText = Number(document.getElementById("score").innerText) + 1);
            this.sn.pop(), console.log(6)
        }
        this.sn.forEach((t, e, i) => {
            if (0 == e || i.length - 1 == e) {
                var n = c.createLinearGradient(t.x, t.y, t.x + this.w, t.y + this.h);
                i.length - 1 == e ? (n.addColorStop(0, "black"), n.addColorStop(1, "#8BC34A")) : (n.addColorStop(0, "#8BC34A"), n.addColorStop(1, "white")), c.fillStyle = n
            } else c.fillStyle = "#8BC34A";
            c.fillRect(t.x, t.y, this.w, this.h), c.strokeStyle = "#E91E63", c.font = "30px serif", c.strokeStyle = "#9E9E9E", i.length - 1 != e && 0 != e && c.strokeRect(t.x, t.y, this.w, this.h), 0 == e && (c.beginPath(), c.fillStyle = "#F44336", c.arc(t.x + 10, t.y + 2, 5, 360, 0), c.fill()), c.arc(t.x + 10, t.y + 2, 5, 360, 0), c.fill(), c.beginPath()
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
    cc.height = h, cc.width = w, c.fillRect(0, 0, w, innerHeight);
    for (var t = 0; t < 10; t++) food_array.push(new food);
    s = new snake(w / 2, h / 2, 400, 4, 4), anima()
}

function anima() {
    c.fillStyle = "rgba(0,0,0,0.11)", c.fillRect(0, 0, cc.width, cc.height), food_array.forEach(t => t.put()), s.draw(), document.getElementById("time").innerText = timer(), setTimeout(() => {
        requestAnimationFrame(anima)
    }, timeout_millsecond)
}

function emit(t) {
    key.keydown(t)
}

var t = new Date + "",
    d = void 0,
    cc = document.getElementsByTagName("canvas")[0],
    c = cc.getContext("2d");
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
