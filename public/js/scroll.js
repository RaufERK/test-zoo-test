const animalTypes = document.querySelector('.animal-types');
const animalsBtn = document.querySelector('.hero-btn');

if (animalsBtn) {
  animalsBtn.addEventListener('click', () => {
    animalTypes.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}
