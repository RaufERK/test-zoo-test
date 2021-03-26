const animalPic = document.querySelector('#animal-pic');


animalPic.addEventListener('click', async (e) => {
  if(e.target.classList.contains('preview-close-btn')){
    e.preventDefault();

    const idAnimal = e.target.parentNode.parentNode.dataset.animalId;
    const srcPicToDelete = e.target.previousElementSibling.currentSrc.slice(22);
    
    const response = await fetch(`/admin/animals/delete/image/${idAnimal}?srcDel=${srcPicToDelete}`);
    if(response.status === 200){
      console.log('Картинка удалена');
    }
  }
})
