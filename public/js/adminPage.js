const mainDiv = document.querySelector('.wrap');
const addAnimalForm = document.querySelector('#animal-form');
const showBtn = document.querySelector('#show-animal-list');


mainDiv.addEventListener('click', (e) => {
  if(e.target.id === 'add-animal-btn'){
    mainDiv.style.display = 'none';
    addAnimalForm.style.display = 'block';
  }
})

showBtn.addEventListener('click', () => {
  addAnimalForm.style.display = 'none';
  mainDiv.style.display = 'block';
})
