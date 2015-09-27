(function(doc){

  // create the tip element, his style and others helpers
  var body = doc.body, tip = doc.createElement('div'), style = doc.createElement('style'),
  css = '#tip{display:block;opacity:0;position:absolute;z-index:9999;color:#fff;text-align:center;'
  +'background-color:#333;padding:8px;font-family:sans-serif;font-size:.8em;font-weight:lighter;'
  +'border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;pointer-events:none;}'
  +'#tip:after{content:"";width:0;height:0;left:50%;border-left:8px transparent solid;margin-left:-8px;'
  +'border-right:8px transparent solid;position:absolute;}#tip[data-p=u]:after{top:100%;'
  +'border-top:8px #333 solid;}#tip[data-p=d]:after{border-bottom:8px #333 solid;bottom:100%;}',
  dataPosition = 'data-tip-position', dataTip = 'data-tip', u = 'u', d = 'd', _ = ' ', px = 'px',
  tipsFromTitle = function(els){
    for(i = 0, len = els.length; i < len; i++){
      if(els[i].title != '' && !els[i].getAttribute(dataTip))
      els[i].setAttribute(dataTip, els[i].title);
    }
  },
  hasClass = function(el, cl){
    return (_ + el.className + _).indexOf(_ + cl + _) > -1;
  };

  // set tip element and style attributes
  tip.id = 'tip';
  style.type = 'text/css';
  style.appendChild(doc.createTextNode(css));

  // append tip and style to document
  doc.head.appendChild(style);
  body.appendChild(tip);

  // check for simplest setup
  if(hasClass(body, 'minitooltip'))
  tipsFromTitle(doc.getElementsByTagName('*'));

  // check for tip class
  tipsFromTitle(doc.getElementsByClassName('tip'));

  // add events to show tips
  doc.onmouseover = function(e){

    // check if the element is a tooltip
    var tooltip = e.target;
    if(!tooltip.getAttribute(dataTip)){
      tip.style.opacity = 0;
      return false;
    }

    // set the content of tip
    tip.textContent = tooltip.getAttribute(dataTip);

    // check for tips class position
    if(!tooltip.getAttribute(dataPosition)){
      if(hasClass(tooltip, 'tip-up'))
      tooltip.setAttribute(dataPosition, 'up');
      else if(hasClass(tooltip, 'tip-down'))
      tooltip.setAttribute(dataPosition, 'down');
    }

    // suport to positions
    var position = u, top,
    dataP = tooltip.getAttribute(dataPosition),
    rect = tooltip.getBoundingClientRect();
    if(dataP && [u, d].indexOf(dataP.charAt(0)) != -1)
    position = dataP.charAt(0);
    else if(rect.top - 40 <= 0)
    position = d;
    if(position == u)
    top = rect.top + window.scrollY - tip.offsetHeight - 9 + px;
    else if(position == d)
    top = rect.top + window.scrollY + rect.height + 9 + px;
    tip.style.top = top;
    tip.setAttribute('data-p', position);

    // align horizontal
    tip.style.left = (rect.left + rect.width / 2) - tip.offsetWidth / 2 + px;

    // show it!
    tip.style.opacity = 1;
  };

})(document);
