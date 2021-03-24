const categoryForm = document.querySelector('#category-form');
const animalForm = document.querySelector('#animal-form');
const addCatBtn = document.querySelector('#add-category-btn');

if (addCatBtn) {
  addCatBtn.addEventListener('click', () => {
    console.log('click');
    categoryForm.classList.toggle('show');
  });
}
