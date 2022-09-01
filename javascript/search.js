const searchInput = document.querySelector('.search-input');
const focus = document.querySelector('.focus');
const search = document.querySelector('.search');

searchInput.addEventListener('click', function () {
  this.classList.add('focus');
});

searchInput.addEventListener('blur', function () {
  this.classList.remove('focus');
});
