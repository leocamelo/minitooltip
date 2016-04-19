/*! MiniTooltip v0.2.0 (github.com/leonardocamelo/minitooltip) - Licence: MIT */

(function(win, doc){
  var tooltip;
  var rect;
  var position;
  var body = doc.body;
  var tip = doc.createElement('div');
  var style = doc.createElement('style');
  var css = '#tip{display:block;opacity:0;position:absolute;top:0;z-index:9999;' +
  'text-align:center;padding:6px;font-family:sans-serif;font-size:12px;font-weight:lighter;' +
  'pointer-events:none;border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;' +
  'box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box}' +
  '#tip[data-tip-theme=dark]{background:#333;color:#fff}#tip[data-tip-theme=light]' +
  '{background:#eee;color:#222}#tip:after{content:"";width:0;height:0;position:absolute;' +
  'left:50%;margin-left:-8px;border:8px solid transparent}#tip[data-tip-position=up]:after' +
  '{top:100%}#tip[data-tip-position=up][data-tip-theme=dark]:after{border-top-color:#333}' +
  '#tip[data-tip-position=up][data-tip-theme=light]:after{border-top-color:#eee}' +
  '#tip[data-tip-position=down]:after{bottom:100%}#tip[data-tip-position=down]' +
  '[data-tip-theme=dark]:after{border-bottom-color:#333}#tip[data-tip-position=down]' +
  '[data-tip-theme=light]:after{border-bottom-color:#eee}';
  var globalTheme = hasClass(body, 'minitooltip-light') ? 'light' : 'dark';

  function getTip(el){
    return el.getAttribute('data-tip');
  }
  function tipsFromTitle(els){
    for(var i = 0, l = els.length; i < l; i++){
      if(els[i].title && !getTip(els[i])){
        els[i].setAttribute('data-tip', els[i].title);
        els[i].removeAttribute('title');
      }
    }
  }
  function hasClass(el, cl){
    return (' ' + el.className + ' ').indexOf(' ' + cl + ' ') > -1;
  }
  function recursiveTipped(target){
    return !target || target == body ? false : getTip(target) ? target : recursiveTipped(target.parentElement);
  }

  tip.id = 'tip';
  style.type = 'text/css';
  style.media = 'screen';
  style.appendChild(doc.createTextNode(css));

  doc.getElementsByTagName('head')[0].appendChild(style);
  body.appendChild(tip);

  if(hasClass(body, 'minitooltip')){
    tipsFromTitle(doc.getElementsByTagName('*'));
  }else{
    tipsFromTitle(doc.getElementsByClassName('tip'));
  }

  doc.onmouseover = function(e){
    // Check if it's a tooltip
    if(typeof e.path == 'undefined'){
      tooltip = recursiveTipped(e.target);
    }else{
      tooltip = false;
      for(var i = 0, l = e.path.length - 4; i < l; i++){
        if(getTip(e.path[i])){
          tooltip = e.path[i];
          break;
        }
      }
    }

    // Guard clause
    if(!tooltip){
      tip.style.opacity = 0;
      return false;
    }

    tip.textContent = getTip(tooltip);
    rect = tooltip.getBoundingClientRect();

    // Vertical position
    position = tooltip.getAttribute('data-tip-position') || hasClass(tooltip, 'tip-down') ? 'down' : hasClass(tooltip, 'tip-up') ? 'up' : rect.top - 40 <= 0 ? 'down' : 'up';
    tip.style.top = rect.top + (position == 'up' ? win.scrollY - tip.offsetHeight - 9 : win.scrollY + rect.height + 9) + 'px';
    tip.setAttribute('data-tip-position', position);

    // Horizontal position
    tip.style.left = (rect.left + rect.width / 2) - (tip.offsetWidth / 2) + 'px';

    // Theme
    tip.setAttribute('data-tip-theme', tooltip.getAttribute('data-tip-theme') || hasClass(tooltip, 'tip-light') ? 'light' : hasClass(tooltip, 'tip-dark') ? 'dark' : globalTheme)

    // Show it!
    tip.style.opacity = 1;
  };
}(window, document));
