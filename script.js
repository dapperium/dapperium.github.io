// --------- MENU ---------
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// --------- LIKE + COMMENTS (LOCAL ONLY) ---------

function initLikeButtons() {
  document.querySelectorAll('[data-like-id]').forEach(btn => {
    const id = btn.dataset.likeId;
    const countEl = document.querySelector(`[data-like-count="${id}"]`);

    // Load from localStorage
    const liked = localStorage.getItem('like_' + id) === '1';
    const count = Number(localStorage.getItem('like_count_' + id) || '0');

    if (liked) btn.classList.add('liked');
    if (countEl) countEl.textContent = count + ' likes';

    btn.addEventListener('click', () => {
      const already = localStorage.getItem('like_' + id) === '1';
      if (already) return; // one like per browser

      const newCount = Number(localStorage.getItem('like_count_' + id) || '0') + 1;
      localStorage.setItem('like_' + id, '1');
      localStorage.setItem('like_count_' + id, String(newCount));

      btn.classList.add('liked');
      if (countEl) countEl.textContent = newCount + ' likes';
    });
  });
}

function initComments() {
  document.querySelectorAll('[data-comments-id]').forEach(box => {
    const id = box.dataset.commentsId;
    const listEl = box.querySelector('.comment-list');
    const form = box.querySelector('.comment-form');

    const key = 'comments_' + id;

    function render() {
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      listEl.innerHTML = '';
      arr.forEach(c => {
        const item = document.createElement('div');
        item.className = 'comment-item';
        item.innerHTML = `
          <div class="comment-meta">${c.name || 'Someone'} · ${c.time}</div>
          <div class="comment-text">${c.text}</div>
        `;
        listEl.appendChild(item);
      });
    }

    render();

    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.elements['name'].value.trim();
      const text = form.elements['text'].value.trim();
      if (!text) return;

      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push({
        name: name || 'Anonymous',
        text,
        time: new Date().toLocaleString()
      });
      localStorage.setItem(key, JSON.stringify(arr));
      form.reset();
      render();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLikeButtons();
  initComments();
});
