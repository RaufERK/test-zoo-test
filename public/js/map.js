ymaps.ready(init);

const placemarks = [
  {
    coordinates: [50.81604258053943, 42.00369995771158],
    hintContent: 'Млекопитающие',
    iconImageHref: 'https://cdn4.iconfinder.com/data/icons/zoo-line-welcome-to-zootopia/512/gorilla-256.png',
  },
  {
    coordinates: [50.815852268428856, 42.00166147886025],
    hintContent: 'Рыбы',
    iconImageHref: 'https://cdn4.iconfinder.com/data/icons/zoo-line-welcome-to-zootopia/512/dolphin-256.png',
  },
  {
    coordinates: [50.81530378861023, 41.99812880958451],
    hintContent: 'Птицы',
    iconImageHref: 'https://cdn4.iconfinder.com/data/icons/zoo-line-welcome-to-zootopia/512/owl-256.png',
  },
  {
    coordinates: [50.81677190774814, 42.00175515617264],
    hintContent: 'Рептилии',
    iconImageHref: 'https://cdn4.iconfinder.com/data/icons/zoo-line-welcome-to-zootopia/512/crocodile-512.png',
  },
  {
    coordinates: [50.81611941608175, 41.998879828108684],
    hintContent: 'Насекомые',
    iconImageHref: 'https://cdn2.iconfinder.com/data/icons/spring-31/30/Honny_Bee-512.png',
  },
  {
    coordinates: [50.81654081799782, 42.00059644187822],
    hintContent: 'Паукообразные',
    iconImageHref: 'https://cdn4.iconfinder.com/data/icons/halloween-line-terror-night/512/Spider-512.png',
  },
];

function init() {
  const myMap = new ymaps.Map('map', {
    center: [50.816501242251555, 42.0017821222875],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  });

  for (let i = 0; i < placemarks.length; i++) {
    let myPlacemark = new ymaps.Placemark(
      placemarks[i].coordinates,
      {
        hintContent: placemarks[i].hintContent,
        balloonContent: placemarks[i].balloonContent,
      },
      {
        iconLayout: 'default#image',
        iconImageHref: placemarks[i].iconImageHref,
        iconImageSize: [45, 45],
      }
    );
    myMap.geoObjects.add(myPlacemark);
  }
}
