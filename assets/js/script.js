// simple helpers: cover fallback, email copy, generate demo cards, card tilt micro-interaction

(function(){
  const coverPath = 'images/cover.jpg';
  const profilePath = 'images/profile.jpg';
  const heroCover = document.getElementById('hero-cover');
  const dp = document.getElementById('dp');

  // try cover then fallback to profile (HEAD check)
  fetch(coverPath, {method:'HEAD'})
    .then(r => {
      heroCover.style.backgroundImage = r.ok ? `url('${coverPath}')` : `url('${profilePath}')`;
    })
    .catch(()=> { heroCover.style.backgroundImage = `url('${profilePath}')`; });

  // dp fallback
  dp.onerror = ()=> { dp.src = profilePath; };

  // copy email
  const copyBtn = document.getElementById('copyEmail');
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('hello@dapperium.com');
      copyBtn.textContent = 'Copied ✓';
      setTimeout(()=> copyBtn.textContent = 'Copy email', 1800);
    } catch(e) {
      alert('Copy failed — please copy hello@dapperium.com manually');
    }
  });

  // Demo: generate placeholder cards if grids empty (so you can preview)
  function fillDemoGrid(id, count, type){
    const grid = document.getElementById(id);
    if(!grid) return;
    if(grid.children.length>0) return; // skip if you added real items
    for(let i=1;i<=count;i++){
      const fig = document.createElement('figure');
      fig.className = 'card';
      fig.style.minHeight = (type==='reel'? '120px' : '180px');
      const img = document.createElement('img');
      // use profile image as demo thumbnail to keep visual
      img.src = profilePath;
      img.alt = `${type} ${i}`;
      fig.appendChild(img);

      // for lookbook add buy link button overlay
      if(type==='look'){
        const overlay = document.createElement('a');
        overlay.className = 'buy';
        overlay.textContent = 'Buy link';
        overlay.href = '#';
        overlay.style.position = 'absolute';
        overlay.style.right = '10px';
        overlay.style.bottom = '10px';
        overlay.style.padding = '8px 10px';
        overlay.style.background = 'rgba(0,0,0,0.6)';
        overlay.style.color = '#fff';
        overlay.style.borderRadius = '8px';
        overlay.style.fontSize = '13px';
        overlay.style.textDecoration = 'none';
        fig.appendChild(overlay);
      }

      grid.appendChild(fig);
    }
  }

  // generate placeholders (you will later replace by real content)
  fillDemoGrid('modelGrid', 8, 'model');
  fillDemoGrid('lookbookGrid', 6, 'look');
  fillDemoGrid('reelsGrid', 12, 'reel');

  // simple pointer 3D tilt (improves hover) for .card elements
  function attachTilt() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width; // 0..1
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (y - 0.5) * 10; // rotateX
        const ry = (x - 0.5) * -10; // rotateY
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // run after DOM mutation (since we generate demo cards)
  setTimeout(attachTilt, 120);

  // small load animation
  document.documentElement.style.opacity = 0;
  window.addEventListener('load', ()=> {
    document.documentElement.style.transition = 'opacity .45s ease';
    document.documentElement.style.opacity = 1;
  });
})();
