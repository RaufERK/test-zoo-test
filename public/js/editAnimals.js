const animalPic = document.querySelector('#animal-pic');

const editForm = document.querySelector('#animal-form-edit');
const addPicForm = document.querySelector('.wrap-add-pic');

editForm.addEventListener('click', (e) => {
  if(e.target.id === 'add-animal-pic'){
    editForm.style.display = 'none';
    addPicForm.style.display = 'block';
  }
})

addPicForm.addEventListener('click', (e) => {
  if(e.target.id === 'add-animal-pic'){
    addPicForm.style.display = 'none';
    editForm.style.display = 'block';
  }
})

animalPic.addEventListener('click', async (e) => {
  if(e.target.classList.contains('preview-close-btn')){
    e.preventDefault();

    const idAnimal = e.target.parentNode.parentNode.dataset.animalId;
    const srcPicToDelete = e.target.previousElementSibling.currentSrc.slice(22);
    
    const response = await fetch(`/admin/animals/delete/image/${idAnimal}?srcDel=${srcPicToDelete}`);
    if(response.status === 200){
      e.target.parentNode.remove();
    }
  }
})
