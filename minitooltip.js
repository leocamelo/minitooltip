/*! MiniTooltip v0.1.7 (github.com/leonardocamelo/minitooltip) - Licence: MIT */

(function(doc){
  // create the tip element, his style and others helpers
  var tooltip, body = doc.body, tip = doc.createElement('div'), style = doc.createElement('style'),
  css = '#tip{display:block;opacity:0;position:absolute;z-index:9999;color:#fff;text-align:center;'
  +'background-color:#333;padding:6px;font-family:sans-serif;font-size:12px;font-weight:lighter;'
  +'border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;pointer-events:none;top:0;'
  +'box-sizing:border-box;-webkit-box-sizing:border-box;-moz-box-sizing:border-box}#tip:after{'
  +'content:"";width:0;height:0;left:50%;border-left:8px transparent solid;margin-left:-8px;'
  +'border-right:8px solid transparent;position:absolute}#tip[data-p=u]:after{top:100%;'
  +'border-top:8px solid #333}#tip[data-p=d]:after{border-bottom:8px solid #333;bottom:100%}',
  dataTipPosition = 'data-tip-position', dataTip = 'data-tip';
  function tipsFromTitle(els){
    for(var i = 0, l = els.length; i < l; i++){
      if(els[i].title != '' && !els[i].getAttribute(dataTip)){
        els[i].setAttribute(dataTip, els[i].title);
        els[i].removeAttribute('title');
      }
    }
  }
  function hasClass(el, cl){
    return (' ' + el.className + ' ').indexOf(' ' + cl + ' ') > -1;
  }
  function recursiveTipped(target){
    if(!target || target == body) return false;
    else if(target.getAttribute(dataTip)) return target;
    else return recursiveTipped(target.parentElement);
  }

  // set tip element and style attributes
  tip.id = 'tip';
  style.type = 'text/css';
  style.media = 'screen';
  style.appendChild(doc.createTextNode(css));

  // append tip and style to document
  doc.getElementsByTagName('head')[0].appendChild(style);
  body.appendChild(tip);

  // check for simplest setup
  if(hasClass(body, 'minitooltip')){
    tipsFromTitle(doc.getElementsByTagName('*'));
  }

  // check for tip class
  tipsFromTitle(doc.getElementsByClassName('tip'));

  // add events to show tips
  doc.onmouseover = function(e){

    // check if any element is a tooltip
    if(typeof e.path == 'undefined'){
      tooltip = recursiveTipped(e.target);
    }else{
      tooltip = false;
      for(var i = 0, l = e.path.length; i < l - 4; i++){
        if(e.path[i].getAttribute(dataTip)){
          tooltip = e.path[i];
          break;
        }
      }
    }
    if(!tooltip){
      tip.style.opacity = 0;
      return false;
    }

    // set the content of tip
    tip.textContent = tooltip.getAttribute(dataTip);

    // check for tips class position
    if(!tooltip.getAttribute(dataTipPosition)){
      if(hasClass(tooltip, 'tip-down'))
      tooltip.setAttribute(dataTipPosition, 'down');
      else if(hasClass(tooltip, 'tip-up'))
      tooltip.setAttribute(dataTipPosition, 'up');
    }

    // suport to positions
    var dataPosition = tooltip.getAttribute(dataTipPosition), rect = tooltip.getBoundingClientRect(),
    position = dataPosition && ['u', 'd'].indexOf(dataPosition.charAt(0)) != -1 ? dataPosition.charAt(0) : rect.top - 40 <= 0 ? 'd' : 'u';
    tip.style.top = rect.top + (position == 'u' ? window.scrollY - tip.offsetHeight - 9 : window.scrollY + rect.height + 9) + 'px';
    tip.setAttribute('data-p', position);

    // align horizontal
    tip.style.left = (rect.left + rect.width / 2) - (tip.offsetWidth / 2) + 'px';

    // show it!
    tip.style.opacity = 1;
  };
}(document));
