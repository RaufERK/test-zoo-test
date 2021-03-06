const categoryForm = document.querySelector('#category-form');
const animalForm = document.querySelector('#animal-form');
const addCatBtn = document.querySelector('#add-category-btn');
const mainContent = document.querySelector('.maincontent');

if (addCatBtn) {
  addCatBtn.addEventListener('click', () => {
    categoryForm.classList.toggle('show');
  });
}

if (mainContent) {
  mainContent.addEventListener('click', async (event) => {
    // удаление категории
    if (event.target.dataset.action === 'delete') {
      event.preventDefault();
      const confirmDelete = confirm('Подтвердите удаление категории');
      if (confirmDelete) {
        const categoryId = event.target.dataset.id;
        const data = await fetch(`/admin/categories/delete/${categoryId}`);
        if (data.status === 200) {
          const categoryDiv = document.querySelector(`#segment${categoryId}`);
          categoryDiv.remove();
        }
      }
    }
    // редактирование категории, редактирование изображения
    if (event.target.dataset.action === 'delete-preview-pic') {
      event.preventDefault();

      const picUrl = document.querySelector('#picUrl');
      const previewPic = document.querySelector('#preview-pic');
      const previewCloseBtn = document.querySelector('.preview-close-btn');

      // picUrl.remove();
      previewPic.remove();
      previewCloseBtn.remove();
    }
  });
}
