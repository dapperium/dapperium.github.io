// Toggle profile photo visibility
document.getElementById('showPhotoBtn').addEventListener('click', function() {
  const img = document.getElementById('profilePhoto');
  img.style.display = (img.style.display === 'none') ? 'block' : 'none';
});
