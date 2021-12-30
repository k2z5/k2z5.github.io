ymaps.ready(init);

function init() {

  var map = new ymaps.Map('map', {
    center: [68, 105],
    zoom: 2,
    type: null,
    controls: ['zoomControl']
  },{
    suppressMapOpenBlock: true
//    ,
//    restrictMapArea: [[10, 10], [95,-160]]
  });
  map.controls.get('zoomControl').options.set({size: 'small'});

  // Добавим заливку цветом.
  var pane = new ymaps.pane.StaticPane(map, {
    zIndex: 100,
    css: {
      width: '100%', height: '100%', backgroundColor: '#ddd'
    }
  });
  map.panes.append('background', pane);
  // Каждый регион мы будем относить к одной из 4-x групп
  // в зависимости от регионального валового продукта на душу населения.
  var percents = [0.54, 0.78, 1.04, 15];
  // Зададим цвета, которые будут использоваться для этих групп.
  var colors = [
    '#e07983',
    '#fccacf',
    '#acfcbe',
    '#5af27c'
  ];
  var rdpTable = "<thead><tr><th>Название региона</th><th class='text-right'>Валовый региональный продукт на душу населения в 2017 г. (рублей)</th></tr></thead><tbody>";
  
  var objectManager = new ymaps.ObjectManager();
  // Загрузим регионы.
  ymaps.borders.load('RU', {
    lang: 'ru',
    quality: 2
  }).then(function (result) {
    // Подготовим данные для objectManager.
    result.features.forEach(function (feature) {
      // Добавим iso код региона в качестве feature.id для objectManager.
      var iso = feature.properties.iso3166;
      feature.id = iso;
      // Получим процент продукта, от общего по стране.
      // Данные лежат в файле rdp.js.
      var rdp = rdpData[iso].percent;
      // Зададим цвет в зависимости от РВП.
      for (var i = 0; i < percents.length; i++) {
        if (rdp < percents[i]) {
          feature.options = {
            fillColor: colors[i]
          };
          break;
        }
      }
      // добавим данные регионального валового продукта
      feature.properties.hintContent += "<br>Валовый региональный продукт<br>" + rdpData[iso].rdp;
      rdpTable += "<tr>" + "<td class='text-nowrap'>" + feature.properties.name + "</td>";
      rdpTable += "<td class='text-right'>" + Intl.NumberFormat('ru-RU').format(rdpData[iso].rdp) + "</td>";
      rdpTable += "</tr>";
    });
    // Добавим регионы на карту.
    objectManager.add(result);
    map.geoObjects.add(objectManager);
    
    //Добавим таблицу с данными
    rdpTable += "</tbody>";  
    $(".table").append(rdpTable);
    
  })
}