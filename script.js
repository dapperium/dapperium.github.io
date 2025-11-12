// Minimal interactivity for menu and hero animation
document.addEventListener('DOMContentLoaded', function(){
  var hero = document.getElementById('heroPhoto');
  hero.addEventListener('mousemove', function(e){
    var rect = hero.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    hero.style.transform = 'rotateX(' + (-y*6) + 'deg) rotateY(' + (x*8) + 'deg) translateZ(0)';
  });
  hero.addEventListener('mouseleave', function(){ hero.style.transform = 'translateY(0)'; });
});
