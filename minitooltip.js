(function(doc){

  // create the tip element and her style
  var tip = doc.createElement('div'), style = doc.createElement('style'),
  css = '#tip{display:block;opacity:0;position:absolute;z-index:9999;color:#fff;text-align:center;'
  +'background-color:#333;padding:8px;font-family:sans-serif;font-size:.8em;font-weight:lighter;'
  +'border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;pointer-events:none;}'
  +'#tip:after{content:"";width:0;height:0;left:50%;border-left:8px transparent solid;margin-left:-8px;'
  +'border-right:8px transparent solid;position:absolute;}#tip[data-p=u]:after{top:100%;'
  +'border-top:8px #333 solid;}#tip[data-p=d]:after{border-bottom:8px #333 solid;bottom:100%;}';
  tip.id = 'tip';
  style.type = 'text/css';
  style.appendChild(doc.createTextNode(css));

  // append tip and style to document
  doc.head.appendChild(style);
  doc.body.appendChild(tip);

  // add events to show tips
  doc.onmouseover = function(e){

    // check if the element is a tooltip
    var tooltip = e.target;
    if(tooltip.getAttribute('data-tip') == null){
      tip.style.opacity = 0;
      return false;
    }

    // set the content of tip and show it
    tip.textContent = tooltip.getAttribute('data-tip');

    // suport to positions
    var position = 'u', top,
    dataP = tooltip.getAttribute('data-tip-position'),
    rect = tooltip.getBoundingClientRect();
    if(dataP && ['u', 'd'].indexOf(dataP.charAt(0)) != -1)
    position = dataP.charAt(0);
    else if(rect.top - 40 <= 0)
    position = 'd';
    if(position == 'u')
    top = rect.top + window.scrollY - tip.offsetHeight - 9 + 'px';
    else if(position == 'd')
    top = rect.top + window.scrollY + rect.height + 9 + 'px';
    tip.style.top = top;
    tip.setAttribute('data-p', position);

    // align horizontal
    tip.style.left = (rect.left + rect.width / 2) - tip.offsetWidth / 2 + 'px';

    // show it!
    tip.style.opacity = 1;
  };

})(document);
