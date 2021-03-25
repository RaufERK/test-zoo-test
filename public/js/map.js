ymaps.ready(init);

async function init() {
  const myMap = new ymaps.Map('map', {
    center: [50.816501242251555, 42.0017821222875],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  });

  const result = await (await fetch('/mapcategories')).json();

  for (let i = 0; i < result.length; i++) {
    console.log(result[i]);
    let myPlacemark = new ymaps.Placemark(
      result[i].coordinates,
      {
        hintContent: result[i].title,
        balloonContent: [
          `<div class='map'><a href='/${result[i].englishName}'>${result[i].title}</a></div>`,
        ],
      },
      {
        iconLayout: 'default#image',
        iconImageHref: result[i].icon,
        iconImageSize: [30, 30],
      }
    );
    myMap.geoObjects.add(myPlacemark);
  }
}
