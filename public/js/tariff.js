const tariff = document.querySelector('.tariff');
const tariffWeekDays = document.querySelector('.tab-tariffWeekDays');
const tariffDaysOff = document.querySelector('.tab-tariffDaysOff');
const tariffEditForm = document.querySelectorAll('.tariffEdit');

if (tariff) {
  tariff.addEventListener('click', async (event) => {
    console.log(123);
    if (event.target.id === 'tariffWeekDays') {
      tariffDaysOff.style.display = 'none';
      tariffWeekDays.style.display = '';
    }
    if (event.target.id === 'dayOff') {
      tariffDaysOff.style.display = '';
      tariffWeekDays.style.display = 'none';
    }
  });
}

if (tariffEditForm) {
  for (let i = 0; i < tariffEditForm.length; i++) {
    tariffEditForm[i].addEventListener('submit', async (event) => {
      event.preventDefault();
      const response = await fetch('/admin/prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: event.target.querySelector('button').dataset.edit,
          priceToChildren: event.target.priceToChildren.value,
          price: event.target.price.value,
        }),
      });
      const jsonResponse = await response.json();
    });
  }
}
