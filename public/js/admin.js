const categoryForm = document.querySelector('#category-form');
const animalForm = document.querySelector('#animal-form');

categoryForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const response = await fetch('/admin/addCategory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({category})
  })
  
})
