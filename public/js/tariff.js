const tariff = document.querySelector('.tariff');
const tariffWeekDays = document.querySelector('.tab-tariffWeekDays');
const tariffDaysOff = document.querySelector('.tab-tariffDaysOff');
const tariffEditForm = document.querySelectorAll('.tariffEdit');
const summ = document.querySelector('#cost');
const dateTicket = document.querySelector('#dateTicket');
const childTicket = document.querySelector('#childTicket');
const parentTicket = document.querySelector('#parentTicket');
const buyTicket = document.querySelector('#buyTicket');
const childTariffWeekDays = document.querySelector('#childTariffWeekDays');
const parentTariffWeekDays = document.querySelector('#parentTariffWeekDays');
const childTariffDaysOff = document.querySelector('#childTariffDaysOff');
const parentTariffDaysOff = document.querySelector('#parentTariffDaysOff');
const payment = document.querySelector('#payment');

if (tariff) {
  tariff.addEventListener('click', async (event) => {
    if (event.target.id === 'tariffWeekDays') {
      tariffDaysOff.style.display = 'none';
      tariffWeekDays.style.display = '';
      document.querySelector('#tariffWeekDays').style.opacity = 1;
      document.querySelector('#dayOff').style.opacity = 0.5;
    }
    if (event.target.id === 'dayOff') {
      tariffDaysOff.style.display = '';
      document.querySelector('#tariffWeekDays').style.opacity = 0.5;
      document.querySelector('#dayOff').style.opacity = 1;
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

dateTicket.valueAsDate = new Date();
dateTicket.min = new Date().toISOString().slice(0, 10);

buyTicket.addEventListener('change', async (event) => {
  const date = new Date(dateTicket.value);
  if (date.getDay() === 0 || date.getDay() === 6) {
    let sum =
      Number(childTariffDaysOff.innerText) * childTicket.value +
      parentTicket.value * Number(parentTariffDaysOff.innerText);
    summ.innerText = sum;
  } else {
    let sum =
      Number(childTariffWeekDays.innerText) * childTicket.value +
      parentTicket.value * Number(parentTariffWeekDays.innerText);
    summ.innerText = sum;
  }
});

buyTicket.addEventListener('submit', async (event) => {
  event.preventDefault();
  const response = await fetch('/prices', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: event.target.name.value,
      phone: event.target.phone.value,
      date: event.target.date.value,
      amountChild: event.target.childTicket.value,
      amountParent: event.target.parentTicket.value,
      sum: summ.innerText,
    }),
  });
  const jsonResponse = await response.json();
  window.location = `/payment?id=${jsonResponse._id}&sum=${summ.innerText}`;
});

if (payment) {
  payment.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(document.querySelector('#paymentSum').innerText)
    const ftch = await fetch('/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentSum: document.querySelector('#paymentSum').innerText,
      }),
    });
    const jsonResponse = await ftch.json();
  });
}
