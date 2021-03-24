const tariff = document.querySelector('.tariff');
const tariffWeekDays = document.querySelector('.tab-tariffWeekDays')
const tariffDaysOff = document.querySelector('.tab-tariffDaysOff')


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
 