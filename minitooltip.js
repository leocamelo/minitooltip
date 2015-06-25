(function(){

  // search all minitooltips elements
  var tooltips = [],
  all = document.getElementsByTagName('*');
  for(var i = 0; i < all.length; i++){
    if(all[i].getAttribute('data-tip') !== null)
    tooltips.push(all[i]);
  }

  // create the tip element and her style
  var tip = document.createElement('span'), style = document.createElement('style'),
  css = '#minitooltip{display:none;position:absolute;z-index:9999;pointer-events:none;color:#fff;'
  +'background-color:#333;padding:8px;font-family:sans-serif;font-size:.8em;font-weight:lighter;'
  +'border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;}#minitooltip:after{content:"";'
  +'width:0;height:0;position:absolute;border-top:8px #333 solid;border-left:8px transparent solid;'
  +'border-right:8px transparent solid;top:100%;left:50%;margin-left:-8px;}';
  tip.id = 'minitooltip';
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  // append tip and style to document
  document.head.appendChild(style);
  document.body.appendChild(tip);

  // add events to show/hide tips
  tooltips.forEach(function(tooltip){
    tooltip.onmouseover = function(){
      tip.textContent = this.dataset.tip;
      tip.style.display = 'block';
      tip.style.top = this.offsetTop - 40 + 'px';
      tip.style.left = (this.offsetLeft + this.offsetWidth / 2) - tip.offsetWidth / 2 + 'px';
    };
    tooltip.onmouseout = function(){
      tip.style.display = 'none';
    };
  });

})();
