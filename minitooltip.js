/*! MiniTooltip v0.2.7 (github.com/leocamelo/minitooltip) - Licence: MIT */

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
      opacity: 0,
      display: 'block',
      position: 'absolute',
      top: 0,
      zIndex: 9999,
      textAlign: 'center',
      padding: px(6),
      fontFamily: 'sans-serif',
      fontSize: px(12),
      fontWeight: 'lighter',
      pointerEvents: 'none',
      WebkitBorderRadius: px(2),
      MozBorderRadius: px(2),
      borderRadius: px(2),
      WebkitBoxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      boxSizing: 'border-box',
    },
    '#tip:after': {
      content: '""',
      width: 0,
      height: 0,
      position: 'absolute',
      left: '50%',
      marginLeft: px(-8),
      border: '8px solid transparent'
    }
  };

  function each(arr, fn){
    var i = -1, l = arr.length;
    while(++i < l) fn(arr[i]);
  }
  function addEvent(el, ev, fn){
    el.addEventListener ? el.addEventListener(ev, fn) : el.attachEvent('on' + ev, fn);
  }
  function getEl(q){
    var criteria = 'Tag';
    if(q.charAt(0) == '.'){
      q = q.substr(1);
      criteria = 'Class';
    }
    return doc['getElementsBy' + criteria + 'Name'](q);
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
  function px(val){
    return val + 'px';
  }
  function setTipsDataFromClass(scope, alts){
    each(alts, function(a){
      each(getEl('.tip-' + a), function(el){
        setData(el, scope, a);
      });
    });
  }
  function tipMark(data){
    return '#tip' + mapObjJoin(data, '', function(k, v){
      return '[data-tip-' + k + '=' + v + ']';
    });
  }
  function tipMarkAfter(data){
    return tipMark(data) + ':after';
  }
  function toKebabCase(str){
    return str.replace(/([A-Z])/g, '-$1').toLowerCase();
  }
  function mapObjJoin(obj, glue, fn){
    var k = Object.keys(obj), i = -1,
    l = k.length, res = new Array(l);
    while(++i < l) res[i] = fn(k[i], obj[k[i]]);
    return res.join(glue);
  }
  function compileCSS(css){
    return mapObjJoin(css, '', function(k1, v1){
      return k1 + '{' + mapObjJoin(v1, ';', function(k2, v2){
        return toKebabCase(k2) + ':' + v2;
      }) + '}';
    });
  }

  css[tipMark({ theme: 'dark' })] = { background: '#333', color: '#fff' };
  css[tipMark({ theme: 'light' })] = { background: '#eee', color: '#222' };

  css[tipMarkAfter({ position: 'up' })] = { top: '100%' };
  css[tipMarkAfter({ position: 'up', theme: 'dark' })] = { borderTopColor: '#333' };
  css[tipMarkAfter({ position: 'up', theme: 'light' })] = { borderTopColor: '#eee' };

  css[tipMarkAfter({ position: 'down' })] = { bottom: '100%' };
  css[tipMarkAfter({ position: 'down', theme: 'dark' })] = { borderBottomColor: '#333' };
  css[tipMarkAfter({ position: 'down', theme: 'light' })] = { borderBottomColor: '#eee' };

  tip.id = 'tip';
  style.type = 'text/css';
  style.media = 'screen';
  style.appendChild(doc.createTextNode(compileCSS(css)));

  getEl('head')[0].appendChild(style);
  body.appendChild(tip);

  each(getEl(hasClass(body, 'minitooltip') ? '*' : '.tip'), function(el){
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
