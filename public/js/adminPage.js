const mainDiv = document.querySelector('.wrap');
const addAnimalForm = document.querySelector('#animal-form');
const showBtn = document.querySelector('#show-animal-list');

mainDiv.addEventListener('click', (e) => {
  if (e.target.id === 'add-animal-btn') {
    mainDiv.style.display = 'none';
    addAnimalForm.style.display = 'block';
  }
});

showBtn.addEventListener('click', () => {
  addAnimalForm.style.display = 'none';
  mainDiv.style.display = 'block';
});

// addAnimalForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const form = document.getElementById("formToAddAnimals");
//   const formData = new FormData(form);
//   console.log(formData);
//   const response = await fetch('/admin', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'multipart/form-data',
//     },
//     body: JSON.stringify({
//       name: e.target.name.value,
//       description: e.target.description.value,
//       englishName: e.target.englishName.value,
//       categoryes: e.target.categoryes.value,
//     }),
//     file
//   });
// //   console.log('catch');
// });
