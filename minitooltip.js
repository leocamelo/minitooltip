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
  css = '#tip{display:none;position:absolute;z-index:9999;pointer-events:none;color:#fff;'
  +'background-color:#333;padding:8px;font-family:sans-serif;font-size:.8em;font-weight:lighter;'
  +'border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;}#tip:after{content:"";'
  +'width:0;height:0;position:absolute;left:50%;border-left:8px transparent solid;margin-left:-8px;'
  +'border-right:8px transparent solid;}#tip[data-p=u]:after{border-top:8px #333 solid;top:100%;}'
  +'#tip[data-p=d]:after{border-bottom:8px #333 solid;bottom:100%;}';
  tip.id = 'tip';
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  // append tip and style to document
  document.head.appendChild(style);
  document.body.appendChild(tip);

  // add events to show/hide tips
  tooltips.forEach(function(tooltip){
    tooltip.onmouseover = function(){

      // set the content of tip and show it
      tip.textContent = this.dataset.tip;
      tip.style.display = 'block';

      // suport to positions
      var position = 'u', dataP = this.dataset.tipPosition;
      if(dataP && ['u', 'd'].indexOf(dataP.charAt(0)) != -1)
      position = dataP.charAt(0);
      else if(this.getBoundingClientRect().top - 40 <= 0)
      position = 'd';
      if(position == 'u')
      tip.style.top = this.offsetTop - tip.offsetHeight - 9 + 'px';
      else if(position == 'd')
      tip.style.top = this.offsetTop + this.offsetHeight + 9 + 'px';
      tip.dataset.p = position;

      tip.style.left = (this.offsetLeft + this.offsetWidth / 2) - tip.offsetWidth / 2 + 'px';
    };
    tooltip.onmouseout = function(){
      tip.style.display = 'none';
    };
  });

})();
