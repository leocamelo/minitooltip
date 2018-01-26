/*! MiniTooltip v0.2.8 (github.com/leocamelo/minitooltip) - Licence: MIT */

;(function(win, doc) {
  "use strict";

  var body = doc.body;
  var html = doc.documentElement;
  var tip = doc.createElement("div");
  var style = doc.createElement("style");

  var winWidth = html.clientWidth;
  var winHeight = html.clientHeight;
  var globalTheme = hasClass(body, "minitooltip-light") ? "light" : "dark";

  var css = {
    "#tip": {
      opacity: 0,
      display: "block",
      position: "absolute",
      top: 0,
      zIndex: 9999,
      textAlign: "center",
      padding: px(6),
      fontFamily: "sans-serif",
      fontSize: px(12),
      fontWeight: "lighter",
      pointerEvents: "none",
      WebkitBorderRadius: px(2),
      MozBorderRadius: px(2),
      borderRadius: px(2),
      WebkitBoxSizing: "border-box",
      MozBoxSizing: "border-box",
      boxSizing: "border-box",
    },
    "#tip:after": {
      content: "\"\"",
      width: 0,
      height: 0,
      position: "absolute",
      left: "50%",
      marginLeft: px(-8),
      border: "8px solid transparent"
    }
  };

  function each(arr, fn) {
    var index = -1;
    var limit = arr.length;

    while (++index < limit) {
      fn(arr[index]);
    }
  }
  function addEvent(el, ev, fn) {
    if (el.addEventListener) {
      el.addEventListener(ev, fn);
    } else {
      el.attachEvent("on" + ev, fn);
    }
  }
  function getEl(query) {
    if (query.charAt(0) === ".") {
      return doc.getElementsByClassName(query.substr(1));
    }
    return doc.getElementsByTagName(query);
  }
  function getData(el, key, alt) {
    return el.getAttribute("data-tip-" + key) || alt;
  }
  function setData(el, key, data) {
    el.setAttribute("data-tip-" + key, data);
    return data;
  }
  function getTip(el) {
    return el.getAttribute("data-tip");
  }
  function hasClass(el, cl) {
    return (" " + el.className + " ").indexOf(" " + cl + " ") > -1;
  }
  function recursiveTipped(el) {
    if (!el || el === body) {
      return null;
    } else if (getTip(el)) {
      return el;
    }
    return recursiveTipped(el.parentNode);
  }
  function px(val) {
    return val + "px";
  }
  function setTipsDataFromClass(scope, alts) {
    each(alts, function (alt) {
      each(getEl(".tip-" + alt), function (el) {
        setData(el, scope, alt);
      });
    });
  }
  function tipMark(data) {
    return "#tip" + mapObjJoin(data, "", function (key, val) {
      return "[data-tip-" + key + "=" + val + "]";
    });
  }
  function tipMarkAfter(data) {
    return tipMark(data) + ":after";
  }
  function tipTop(position, target, glue) {
    if (position === "up") {
      return win.scrollY - tip.offsetHeight - glue;
    }
    return win.scrollY + target.offsetHeight + glue;
  }
  function toKebabCase(str) {
    return str.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  function mapObjJoin(obj, glue, fn) {
    var keys = Object.keys(obj);
    var index = -1;
    var limit = keys.length;
    var res = new Array(limit);

    while (++index < limit) {
      res[index] = fn(keys[index], obj[keys[index]]);
    }
    return res.join(glue);
  }
  function compileCSS(css) {
    return mapObjJoin(css, "", function (key1, val1) {
      return key1 + "{" + mapObjJoin(val1, ";", function (key2, val2) {
        return toKebabCase(key2) + ":" + val2;
      }) + "}";
    });
  }
  function genTargetPosition(rect) {
    var offset = 40;
    if (rect.bottom + offset >= winHeight) return "up";
    if (rect.top - offset <= 0) return "down";
    return null;
  }

  css[tipMark({ theme: "dark" })] = { background: "#333", color: "#fff" };
  css[tipMark({ theme: "light" })] = { background: "#eee", color: "#222" };

  css[tipMarkAfter({ position: "up" })] = { top: "100%" };
  css[tipMarkAfter({ position: "up", theme: "dark" })] = { borderTopColor: "#333" };
  css[tipMarkAfter({ position: "up", theme: "light" })] = { borderTopColor: "#eee" };

  css[tipMarkAfter({ position: "down" })] = { bottom: "100%" };
  css[tipMarkAfter({ position: "down", theme: "dark" })] = { borderBottomColor: "#333" };
  css[tipMarkAfter({ position: "down", theme: "light" })] = { borderBottomColor: "#eee" };

  tip.id = "tip";
  style.type = "text/css";
  style.media = "screen";
  style.appendChild(doc.createTextNode(compileCSS(css)));

  getEl("head")[0].appendChild(style);
  body.appendChild(tip);

  each(getEl(hasClass(body, "minitooltip") ? "*" : ".tip"), function (el) {
    if (el.title && !getTip(el)) {
      el.setAttribute("data-tip", el.title);
      el.removeAttribute("title");
    }
  });

  setTipsDataFromClass("position", ["up", "down"]);
  setTipsDataFromClass("theme", ["light", "dark"]);

  addEvent(win, "resize", function () {
    winWidth = html.clientWidth;
    winHeight = html.clientHeight;
  });

  addEvent(doc, "mouseover", function (ev) {
    // Check if it's a tooltip
    var target = null;
    if (typeof ev.path === "undefined") {
      target = recursiveTipped(ev.target);
    } else {
      var index = -1;
      var limit = ev.path.length - 4;

      while (++index < limit) {
        if (getTip(ev.path[index])) {
          target = ev.path[index];
          break;
        }
      }
    }

    // Guard clause
    if (!target) {
      tip.style.opacity = 0;
      return;
    }

    // Set tip text
    tip.textContent = getTip(target);

    var tipHalfWidth = tip.offsetWidth / 2;
    var targetRect = target.getBoundingClientRect();
    var targetPosX = targetRect.left + (target.offsetWidth / 2);

    // Horizontal position
    var tipLeft = "0";
    var tipWidth = "auto";
    if (targetPosX - tipHalfWidth <= 0) {
      tipWidth = px(targetPosX * 2);
    } else if (targetPosX + tipHalfWidth >= winWidth) {
      tipLeft = px(winWidth - tip.offsetWidth);
      tipWidth = px((winWidth - targetPosX) * 2);
    } else {
      tipLeft = px(targetPosX - tipHalfWidth);
    }
    tip.style.left = tipLeft;
    tip.style.width = tipWidth;

    // Vertical position
    var targetPosition = genTargetPosition(targetRect) || getData(target, "position", "up");
    var tipPosition = setData(tip, "position", targetPosition);
    tip.style.top = px(targetRect.top + tipTop(tipPosition, target, 9));

    // Theme
    setData(tip, "theme", getData(target, "theme", globalTheme));

    // Show it!
    tip.style.opacity = 1;
  });
}(window, document));
