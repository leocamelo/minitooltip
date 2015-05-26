(function(){
  var tooltips = [];
  var all = document.getElementsByTagName('*');
  for(var i = 0; i < all.length; i++){
    if(all[i].getAttribute('data-tip') !== null)
    tooltips.push(all[i]);
  }
  tooltips.forEach(function(tooltip){
    tooltip.addEventListener('mouseover', function(){
      console.log(this.dataset.tip);
    });
  });
}).call(this);
