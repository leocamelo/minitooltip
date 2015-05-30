(function(){

  // search all minitooltips enabled
  var tooltips = [];
  var all = document.getElementsByTagName('*');
  for(var i = 0; i < all.length; i++){
    if(all[i].getAttribute('data-tip') !== null)
    tooltips.push(all[i]);
  }

  // create the tip element
  var tip = document.createElement('div');
  tip.id = 'minitooltip';
  document.body.appendChild(tip);

  // add events to show/hide tips
  tooltips.forEach(function(tooltip){  
    tooltip.addEventListener('mouseenter', function(){
      tip.textContent = this.dataset.tip;
      tip.style.display = 'block';
      tip.style.top = this.offsetTop - 40 + 'px';
      tip.style.left = (this.offsetLeft + this.offsetWidth / 2) - tip.offsetWidth / 2 + 'px';
    });
    tooltip.addEventListener('mouseleave', function(){
      tip.style.display = 'none';
    });
  });

}).call(this);
