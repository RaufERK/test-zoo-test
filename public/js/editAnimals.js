const animalPic = document.querySelector('#animal-pic');


animalPic.addEventListener('click', async (e) => {
  if(e.target.classList.contains('preview-close-btn')){
    e.preventDefault();
    
    const response = await fetch('/animals/delete/image/:id');


  }
})
