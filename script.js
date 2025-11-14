// script.js — small helpers for cover/profile handling + copy email
(function(){
  // If there is a cover.jpg uploaded, use it for the header background.
  // Otherwise the header will fall back to profile.jpg (set here).
  const coverPath = 'assets/images/cover.jpg';
  const fallback = 'assets/images/profile.jpg';
  const coverEl = document.getElementById('cover');

  // try HEAD request to check if cover exists
  fetch(coverPath, { method: 'HEAD' })
    .then(res => {
      if (res.ok) {
        coverEl.style.backgroundImage = `url('${coverPath}')`;
      } else {
        coverEl.style.backgroundImage = `url('${fallback}')`;
      }
    })
    .catch(() => {
      coverEl.style.backgroundImage = `url('${fallback}')`;
    });

  // small utility: copy email (if you add a button to call this)
  window.copyEmail = function(){
    const email = 'hello@dapperium.com';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(()=> alert('Email copied: ' + email));
    } else {
      alert('Copy: ' + email);
    }
  };
})();
