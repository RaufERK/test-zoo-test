ymaps.ready(init);

const placemarks = [
  {
    coordinates: [50.81604258053943, 42.00369995771158],
    hintContent: 'Млекопитающие',
  },
  {
    coordinates: [50.815852268428856, 42.00166147886025],
    hintContent: 'Рыбы',
  },
  {
    coordinates: [50.81530378861023,41.99812880958451],
    hintContent: 'Птицы',
  },
  {
    coordinates: [50.81677190774814,42.00175515617264],
    hintContent: 'Рептилии',
  },
  {
    coordinates: [50.81611941608175,41.998879828108684],
    hintContent: 'Насекомые',
  },
  {
    coordinates: [50.81654081799782,42.00059644187822],
    hintContent: 'Паукообразные',
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
    let myPlacemark = new ymaps.Placemark(placemarks[i].coordinates, {
      hintContent: placemarks[i].hintContent,
    });
    myMap.geoObjects.add(myPlacemark);
  }
}
