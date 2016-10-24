/*! MiniTooltip v0.2.5 (github.com/leonardocamelo/minitooltip) - Licence: MIT */

(function(win, doc){
  'use strict';

  var i, l;
  var target;
  var tipLeft;
  var tipWidth;
  var targetRect;
  var targetPosX;
  var tipPosition;
  var tipHalfWidth;

  var glue = 9;
  var body = doc.body;
  var html = doc.documentElement;
  var tip = doc.createElement('div');
  var style = doc.createElement('style');

  var winWidth = html.clientWidth;
  var globalTheme = hasClass(body, 'minitooltip-light') ? 'light' : 'dark';

  var css = {
    '#tip': {
      display: 'block',
      opacity: 0,
      position: 'absolute',
      top: 0,
      zIndex: 9999,
      textAlign: 'center',
      padding: px(6),
      fontFamily: 'sans-serif',
      fontSize: px(12),
      fontWeight: 'lighter',
      pointerEvents: 'none',
      '-webkitBorderRadius': px(2),
      '-mozBorderRadius': px(2),
      borderRadius: px(2),
      '-webkitBoxSizing': 'border-box',
      '-mozBoxSizing': 'border-box',
      boxSizing: 'border-box',
    },
    '#tip[data-tip-theme=dark]': {
      background: '#333',
      color: '#fff'
    },
    '#tip[data-tip-theme=light]': {
      background: '#eee',
      color: '#222',
    },
    '#tip:after': {
      content: '""',
      width: 0,
      height: 0,
      position: 'absolute',
      left: '50%',
      marginLeft: px(-8),
      border: '8px solid transparent'
    },
    '#tip[data-tip-position=up]:after': {
      top: '100%'
    },
    '#tip[data-tip-position=up][data-tip-theme=dark]:after': {
      borderTopColor: '#333'
    },
    '#tip[data-tip-position=up][data-tip-theme=light]:after': {
      borderTopColor: '#eee'
    },
    '#tip[data-tip-position=down]:after': {
      bottom: '100%'
    },
    '#tip[data-tip-position=down][data-tip-theme=dark]:after': {
      borderBottomColor: '#333'
    },
    '#tip[data-tip-position=down][data-tip-theme=light]:after': {
      borderBottomColor: '#eee'
    }
  };

  function each(list, fn){
    var i = -1, l = list.length;
    while(++i < l) fn(list[i]);
  }
  function addEvent(el, ev, fn){
    el.addEventListener ? el.addEventListener(ev, fn) : el.attachEvent('on' + ev, fn);
  }
  function getData(el, key, alt){
    return el.getAttribute('data-tip-' + key) || alt;
  }
  function setData(el, key, data){
    el.setAttribute('data-tip-' + key, data);
    return data;
  }
  function getTip(el){
    return el.getAttribute('data-tip');
  }
  function hasClass(el, cl){
    return (' ' + el.className + ' ').indexOf(' ' + cl + ' ') > -1;
  }
  function recursiveTipped(el){
    return !el || el == body ? false : getTip(el) ? el : recursiveTipped(el.parentNode);
  }
  function px(value){
    return value + 'px';
  }
  function setTipsDataFromClass(scope, alts){
    each(alts, function(a){
      each(doc.getElementsByClassName('tip-' + a), function(el){
        setData(el, scope, a);
      });
    });
  }
  function toDash(str){
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }
  function mapObj(obj, glue, fn){
    var k = Object.keys(obj), i = -1,
    l = k.length, res = new Array(l);
    while(++i < l) res[i] = fn(k[i], obj[k[i]]);
    return res.join(glue);
  }
  function compileCSS(css){
    return mapObj(css, '', function(k1, v1){
      return k1 + '{' + mapObj(v1, ';', function(k2, v2){
        return toDash(k2) + ':' + v2;
      }) + '}';
    });
  }

  tip.id = 'tip';
  style.type = 'text/css';
  style.media = 'screen';
  style.appendChild(doc.createTextNode(compileCSS(css)));

  doc.getElementsByTagName('head')[0].appendChild(style);
  body.appendChild(tip);

  each(hasClass(body, 'minitooltip') ? doc.getElementsByTagName('*') : doc.getElementsByClassName('tip'), function(el){
    if(el.title && !getTip(el)){
      el.setAttribute('data-tip', el.title);
      el.removeAttribute('title');
    }
  });

  setTipsDataFromClass('position', ['up', 'down']);
  setTipsDataFromClass('theme', ['light', 'dark']);

  addEvent(win, 'resize', function(){
    winWidth = html.clientWidth;
  });

  addEvent(doc, 'mouseover', function(e){
    // Check if it's a tooltip
    if(typeof e.path == 'undefined'){
      target = recursiveTipped(e.target);
    }else{
      target = false;
      i = -1, l = e.path.length - 4;
      while(++i < l){
        if(getTip(e.path[i])){
          target = e.path[i];
          break;
        }
      }
    }

    // Guard clause
    if(!target){
      tip.style.opacity = 0;
      return;
    }

    tip.textContent = getTip(target);
    tipHalfWidth = tip.offsetWidth / 2;
    targetRect = target.getBoundingClientRect();
    targetPosX = targetRect.left + (target.offsetWidth / 2);

    // Horizontal position
    if(targetPosX - tipHalfWidth <= 0){
      tipLeft = 0;
      tipWidth = px(targetPosX * 2);
    }else if(targetPosX + tipHalfWidth >= winWidth){
      tipLeft = px(winWidth - tip.offsetWidth);
      tipWidth = px((winWidth - targetPosX) * 2);
    }else{
      tipLeft = px(targetPosX - tipHalfWidth);
      tipWidth = 'auto';
    }
    tip.style.left = tipLeft;
    tip.style.width = tipWidth;

    // Vertical position
    tipPosition = setData(tip, 'position', getData(target, 'position', targetRect.top - 40 <= 0 ? 'down' : 'up'));
    tip.style.top = px(targetRect.top + (tipPosition == 'up' ? win.scrollY - tip.offsetHeight - glue : win.scrollY + target.offsetHeight + glue));

    // Theme
    setData(tip, 'theme', getData(target, 'theme', globalTheme));

    // Show it!
    tip.style.opacity = 1;
  });
}(window, document));
