var SFX = function() {
  try {
  //控制聲音//
      var e,
          t = this;
      var n = new (window.webkitAudioContext || window.AudioContext);
      var r = new XMLHttpRequest;
      r.open("GET", "audio/pop.mp3", true);
      r.responseType = "arraybuffer";
      r.onload = function() {
          n.decodeAudioData(r.response, function(t) {
              e = t
          })
      };
      r.send();
      this.pop = function() {
          if (e) {
              var t = n.createBufferSource();
              t.playbackRate.value = Math.pow(Math.random(), 2) * .9 + .5;
              t.buffer = e;
              t.connect(n.destination);
              t.start(0)
          }
      }
  } catch (i) {
      this.pop = function() {}
  }
};
var DOT = DOT || {};
DOT.core = function() {
  var e = $("body"),
      t = $("html"),
      n = $(".content"),
      r = $("#svg"),
      i = Raphael("svg", $(window).innerWidth(), $(window).innerHeight()),
      s = .4,
      o = .9,
      u = null,
      a = 0,
      f = new SFX,
      l = 0,
      c = function(e, t, n, r) {
          if (e > 0) {
              $("#game").find(".active").removeClass("active");
              $("#progress").find("." + e).addClass("active");
              $("#game").find(".bg" + e).addClass("active");
              $(".dot").remove();
              $(".number").remove();
              for (var i = 0; i < n.length; i++) {
                  n[i].controls.remove();
                  n[i].curve.remove()
              }
              if (!r) {
                  $("#retry").css({
                      display: "none"
                  })
              }
          }
          switch (e) {
          case 0:
              break;
          case 1:
              if (r) {
                  $("#start").css({
                      display: "none"
                  });
                  $(".awards").css({
                      display: "none"
                  });
                  $("#game").css({
                      display: "block"
                  })
              }
              break;
          case 2:
              break;
          case 3:
              break;
          case 4:
          //分數算式//
              var s = 2.273,
                  o = Math.floor(1e3 * s),
                  u = Math.floor(2e3 * s),
                  a = Math.floor(3e3 * s),
                  f = Math.floor(l * s),
                  p = (6e3 - Math.round(l)) * 1e-6 + "",
                  d = p.substr(2, 2) + ":" + p.substr(4, 2) + ":" + p.substr(6, 2);
              switch (true) {
              case f < o:
                  $("#medal").attr("src", "images/img_end.png");
                  $("#finish .score").html(f);
                  $("#finish .play-time").html(d);
                  $(".next-medal").show();
                  $(".next-medal .points").html("+" + (o - f));
                  break;
              case f < u:
                  $("#medal").attr("src", "images/img_end-br.png");
                  $("#finish .score").html(f);
                  $("#finish .play-time").html(d);
                  $("#finish .next-medal").show();
                  $("#finish .next-medal .points").html("+" + (u - f));
                  break;
              case f < a:
                  $("#medal").attr("src", "images/img_end-si.png");
                  $("#finish .score").html(f);
                  $("#finish .play-time").html(d);
                  $("#finish .next-medal").show();
                  $("#finish .next-medal .points").html("+" + (a - f));
                  break;
              case f >= a:
                  $("#medal").attr("src", "images/img_end-go.png");
                  $("#finish .score").html(f);
                  $("#finish .play-time").html(d);
                  $("#finish .next-medal").hide();
                  break
              }
              $("#game").css({
                  display: "none"
              });
              $("#finish").css({
                  display: "block"
              });
              $("#again").on("touchstart mouseup", function() {
                  l = 0;
                  $("#finish").css({
                      display: "none"
                  });
                  $("#start").css({
                      display: "block"
                  });
                  c(0);
                  return
              });
              break
          }
          if (e < 6) {
              h(e)
          }
      },
      //座標//
      h = function(r) {
          var a = [],
              h = [],
              p = [],
              d = [
                //start//
                [-100, 50, 100, 50, ],
                //xmas tree//
                [0, -180, -120, -80, -50, -80, -120, -10, -50, -10, -120, 60, -50, 60, -50, 140, 50, 140, 50, 60, 120, 60, 50,-10, 120,-10, 50,-80, 120,-80],
                //alligator//
                  [-252, -25, -478, -25, -478, -83, -308, -83, -252, -140, -252, -196, -195, -196, -195, -139, -138, -139, -138, -196, -81, -196, -81, -139, 201, -139, 486, -25, 315, -25, 315, 32, 258, 32, 258, -25, 201, -25, 201, 32, 144, 32, 144, -25, -27, -25, -27, 32, -84, 32, -84, -25, -141, -25, -141, 32, -195, 32, -195, -25],
                //|-----1----|-----2---|----3-----|----4-----|-----5-----|-----6-----|-----7-----|-----8-----|-----9-----|-----10-----|----11---|----12----|----13----|----14---|----15---|----16--|----17--|----18---|-----19---|----20--|----21--|---22---|----23---|----24--|----25--|----26---|----27----|----28---|----29---|----30----|

                [-244, -175, -230, -86, -194, -29, -133, 5, -43, 5, -15, 18, 25, 21, 25, -20, 76, -42, 123, -66, 171, -101, 206, -130, 249, -109, 296, -118, 267, -143, 230, -162, 262, -194, 270, -234, 226, -221, 199, -197, 187, -154],
              ];
          var v = function() {
              i.setSize($(window).innerWidth(), $(window).innerHeight());
              for (var t = 0; t < d[r].length; t += 2) {
                  $(a[t / 2]).css({
                      left: d[r][t] + e.width() / 2 - 12,
                      top: d[r][t + 1] + e.height() / 2 - 12
                  });
                  $(h[t / 2]).css({
                      left: d[r][t] + e.width() / 2 - 12,
                      top: d[r][t + 1] + e.height() / 2 - 27
                  })
              }
              for (t = 0; t < p.length; t++) {
                  if (p[t].loop) {
                      window.clearInterval(p[t].loop)
                  }
                  p[t].curve.remove();
                  p[t].controls.remove()
              }
              $(a).removeClass("full");
              p = []
          };
          $(window).resize(function() {
              v()
          });
          var m = function(e) {
              var t = e.toString();
              while (t.length < 4) {
                  t = "0" + t
              }
              var n = t.substr(0, 2) + ":" + t.substr(2, 2);
              return n
          };
          var g = function() {
              var e = 3,
                  t = $("#countdown");
              t.css({
                  display: "block"
              });
              t.find("h1").html(e);
              //"+ 1400"計時器顯示時間的算式，千分秒計算//
              $("#timer").html(m(r * 100 + 1400)).css({
                  display: "block"
              });
              var n = window.setInterval(function() {
                  e--;
                  t.find("h1").html(e);
                  if (e === 0) {
                      clearInterval(n);
                      u = null;
                      t.css({
                          display: "none"
                      });
                      //真正計時器倒數的算式//
                      y(r * 100 + 1400);
                      return
                  }
              }, 1e3)
          };
          //計時器設定//
          var y = function(e) {
              var t = Date.now();
              u = window.setInterval(function() {
                  var n = Date.now();
                  //.1是滑鼠click之後，計時器的跑動速度//
                  var i = Math.round((n - t) * .1);
                  e -= i;
                  t = n;
                  $("#timer").html(m(e));
                  if (e <= 0) {
                      clearInterval(u);
                      u = null;
                      $("#retry").css({
                          display: "block"
                      }).off().on("click", function() {
                          c(r, a, p, false)
                      });
                      $("#timer").css({
                          display: "none"
                      });
                      return
                  }
                  //100是計時器小數點後兩位跑動的預設速度，與實際數字無關，數字越小越慢，1則都不動//
              }, 1e3 / 100)
          };
          //控制點跟數字整體位置//
          var b = function() {
              for (var t = 0; t < d[r].length; t += 2) {
                  var i = $("<div/>", {
                      "class": "dot"
                  }).css({
                      position: "absolute",
                      left: d[r][t] + e.width() / 2 - 12,
                      top: d[r][t + 1] + e.height() / 2 - 12
                  });
                  a.push(i[0]);
                  var s = $("<div/>", {
                      "class": "number",
                      html: a.length
                  }).css({
                      position: "absolute",
                      left: d[r][t] + e.width() / 2 - 12,
                      top: d[r][t + 1] + e.height() / 2 - 27
                  });
                  h.push(s[0])
              }
              var o = 0;
              var u = window.setInterval(function() {
                  if (o > a.length - 1) {
                      clearInterval(u);
                      return
                  }
                  n.append(a[o]);
                  n.append(h[o]);
                  o++;
                  f.pop()
                  //設定每一關卡點點 pop 出來的速度，數字越大越快。預設 15//
              }, 1e3 / 15);
              w()
          };
          //設定線的樣式，預設 width 為10//
          var w = function() {
              var n = function(e, t, n, r, s, o, u) {
                  var a = {
                      path: [["M", e, t], ["Q", n, r, s, o]],
                      curve: i.path(this.path).attr({
                          stroke: u,
                          "stroke-width": 12,
                          "stroke-linecap": "round"
                      }),
                          //線段開始之後的點點 顏色、大小//
                      controls: i.set(i.circle(e, t, 5).attr({
                          fill: "#fff",
                          stroke: "none"
                          //線段中間的點點 顏色、大小//
                      }), i.circle(n, r, 5).attr({
                          fill: "none",
                          stroke: "none"
                          //線段經過之後的點點 顏色、大小//
                      }), i.circle(s, o, 5).attr({
                          fill: "none",
                          stroke: "none"
                      })),
                      elastic: {
                          currentX: e,
                          currentY: t,
                          targetX: e,
                          targetY: t,
                          vX: 0,
                          vY: 0,
                      },
                      startDot: null,
                      endDot: null,
                      correct: false,
                      loop: null,
                  };
                  return a
              };
              var u = function(n, i, s, o) {
                  var u = p.length - 1;
                  $(a).off("mouseover");
                  e.off();
                  $(document).off();
                  if (n === true) {
                      var f = p[u],
                          c = $(a[s]).position().left + 12,
                          h = $(a[s]).position().top + 12;
                      f.controls[2].attr({
                          cx: c,
                          cy: h
                      });
                      f.path[1][3] = c;
                      f.path[1][4] = h;
                      //控制拉線的拉力（變形）//
                      f.elastic.targetX = f.controls[0].attr("cx") + (c - f.controls[0].attr("cx")) * 1 / 2;
                      f.elastic.targetY = f.controls[0].attr("cy") + (h - f.controls[0].attr("cy")) * 1 / 2;
                      var d = p[u].loop;
                      window.setTimeout(function() {
                          window.clearInterval(d)
                      }, 4e3);
                      f.correct = s - i === 1 || s - i === 1 - a.length ? true : false;
                      if (p.length === a.length || r === 0) {
                          var v = true;
                          for (var m = 0; m < p.length; m++) {
                              if (!p[m].correct) {
                                  v = false
                              }
                          }
                          if (v) {
                              E();
                              return false
                          }
                      }
                      if (t.hasClass("touch")) {
                          l(a[s], o)
                      } else {
                          $(a[s]).trigger("mousedown")
                      }
                  } else {
                      $(a[i]).removeClass("full");
                      window.clearInterval(p[u].loop);
                      p[p.length - 1].curve.remove();
                      p[p.length - 1].controls.remove();
                      p.splice(p.length - 1, 1)
                  }
              };
              var l = function(t) {
                  $(t).addClass("full");
                  f.pop();
                  var r = -1;
                  for (var i = 0; i < p.length; i++) {
                      if (p[i].startDot === a.indexOf(t)) {
                          r = i
                      }
                  }
                  if (r >= 0) {
                      if (p[r].loop) {
                          window.clearInterval(p[r].loop)
                      }
                      p[r].curve.remove();
                      p[r].controls.remove();
                      p.splice(r, 1)
                  }
                  p.push(n($(t).position().left + 12, $(t).position().top + 12, $(t).position().left + 12, $(t).position().top + 12, $(t).position().left + 12, $(t).position().top + 12, "#d10632"));
                  var l = p[p.length - 1];
                  l.startDot = a.indexOf(t);
                  e.on("touchmove", function(e) {
                      e.preventDefault();
                      var n = e.originalEvent.changedTouches[0].pageX,
                          r = e.originalEvent.changedTouches[0].pageY;
                      l.controls[2].attr({
                          cx: n,
                          cy: r
                      });
                      l.path[1][3] = n;
                      l.path[1][4] = r;
                      l.elastic.targetX = l.controls[0].attr("cx") + (n - l.controls[0].attr("cx")) * 1 / 2;
                      l.elastic.targetY = l.controls[0].attr("cy") + (r - l.controls[0].attr("cy")) * 1 / 2;
                      if (!l.loop) {
                          l.loop = window.setInterval(function() {
                              var e = l.elastic;
                              e.vX += (e.targetX - e.currentX) * s;
                              e.currentX += e.vX *= o;
                              e.vY += (e.targetY - e.currentY) * s;
                              e.currentY += e.vY *= o;
                              l.controls[1].attr({
                                  cx: e.currentX,
                                  cy: e.currentY
                              });
                              l.path[1][1] = e.currentX;
                              l.path[1][2] = e.currentY;
                              l.curve.attr({
                                  path: l.path
                              })
                          }, 1e3 / 30)
                      }
                      $(a).each(function(e, i) {
                          if (a.indexOf(t) !== a.indexOf(i)) {
                              var s = $(i).position().left,
                                  o = $(i).position().top;
                              if (n > s && r > o && n < s + 24 && r < o + 24) {
                                  u(true, a.indexOf(t), a.indexOf(i))
                              }
                          }
                      })
                  });
                  e.on("touchend", function(e) {
                      e.preventDefault();
                      u(false, a.indexOf(t))
                  })
              };
              if (t.hasClass("touch")) {
                  $(a).each(function(e, t) {
                      $(t).on("touchstart", function(e) {
                          e.preventDefault();
                          l(t)
                      })
                  })
              } else {
                  $(a).each(function(t, r) {
                      $(r).on("mousedown", function(t) {
                          $(r).addClass("full");
                          f.pop();
                          var i = -1;
                          for (var l = 0; l < p.length; l++) {
                              if (p[l].startDot === a.indexOf(this)) {
                                  i = l
                              }
                          }
                          if (i >= 0) {
                              if (p[i].loop) {
                                  window.clearInterval(p[i].loop)
                              }
                              p[i].curve.remove();
                              p[i].controls.remove();
                              p.splice(i, 1)
                          }
                          //設定拉線的顏色//
                          p.push(n($(r).position().left + 12, $(r).position().top + 12, t.pageX, t.pageY, t.pageX, t.pageY, "#03c46d"));
                          var c = p[p.length - 1];
                          c.startDot = a.indexOf(this);
                          e.on("mousemove", function(e) {
                              var t = e.pageX,
                                  n = e.pageY;
                              c.controls[2].attr({
                                  cx: t,
                                  cy: n
                              });
                              c.path[1][3] = t;
                              c.path[1][4] = n;
                              c.elastic.targetX = c.controls[0].attr("cx") + (t - c.controls[0].attr("cx")) * 1 / 2;
                              c.elastic.targetY = c.controls[0].attr("cy") + (n - c.controls[0].attr("cy")) * 1 / 2;
                              if (!c.loop) {
                                  c.loop = window.setInterval(function() {
                                      var e = c.elastic;
                                      e.vX += (e.targetX - e.currentX) * s;
                                      e.currentX += e.vX *= o;
                                      e.vY += (e.targetY - e.currentY) * s;
                                      e.currentY += e.vY *= o;
                                      c.controls[1].attr({
                                          cx: e.currentX,
                                          cy: e.currentY
                                      });
                                      c.path[1][1] = e.currentX;
                                      c.path[1][2] = e.currentY;
                                      c.curve.attr({
                                          path: c.path
                                      })
                                  }, 1e3 / 30)
                              }
                          });
                          $(a).on("mouseover", function() {
                              if (a.indexOf(r) !== a.indexOf(this)) {
                                  u(true, a.indexOf(r), a.indexOf(this))
                              }
                          });
                          e.on("mouseup", function() {
                              u(false, a.indexOf(r))
                          });
                          $(document).on("mouseout", function(e) {
                              e = e ? e : window.event;
                              var t = e.relatedTarget || e.toElement;
                              if (!t || t.nodeName == "HTML") {
                                  u(false, a.indexOf(r))
                              }
                          })
                      })
                  })
              }
          };
          var E = function() {
              f.pop();
              if (u || r === 0) {
                  if (r === 0) {
                      c(r + 1, a, p, true)
                  } else {
                      var e = parseInt($("#timer").html().split(":").join(""));
                      l += e;
                      window.clearInterval(u);
                      u = null;
                      $("#nice").css({
                          display: "block"
                      });
                      setTimeout(function() {
                          $("#nice").css({
                              display: "none"
                          });
                          c(r + 1, a, p, true)
                      }, 2e3)
                  }
              }
          };
          b();
          if (r > 0) {
              g()
          }
      },
      p = function() {
          var e = function(e) {
              var t = parseInt(e * 100);
              loadVal = t
          };
          var t = ["images/img_dot.png", "images/img_dot-full.png", "images/img_end.png", "images/img_end-br.png", "images/img_end-si.png", "images/img_end-go.png", "images/img_retry.png", "images/img_play-again.png"];
          Preloader.initialize(t, null, e)
      };
  return {
      init: function() {
          p();
          c(0);
          $(window).load(function() {
              $(".content, footer").removeClass("hide")
          });
          $(document).on("touchmove", function(e) {
              e.preventDefault()
          })
      }
  }
}();
(function(e, t) {
  Preloader = function() {
      var e = function(e) {
          if (typeof e == "function")
              e()
      };
      var t = function(t, n, r, i) {
          var s = 0,
              o,
              u = t.length;
          $.each(t, function(t, a) {
              return $("<img />").attr("src", a).error(function() {
                  if (typeof i != "undefined" && typeof i == "function")
                      i();
                  if (_DEBUGG)
                      alert("error on loading")
              }).load(function() {
                  s++;
                  if (u == s) {
                      e(n)
                  }
                  o = s / u;
                  if (typeof r != "undefined" && typeof r == "function")
                      r(o)
              })
          })
      };
      var n = function(e, n, r) {
          t(e, n, r)
      };
      return {
          initialize: n
      }
  }();
  e.Preloader = Preloader
})(window)
