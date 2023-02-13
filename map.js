export default class ymaps {
    constructor(mapId, onClick) {
        this.mapId = mapId;
        this.onClick = onClick;
    }
async init() {
    await this.injectYMapsScript();
    await this.loadYMaps();
    this.initMap();
    }
injectYMapsScript() {
    return new Promise((resolve) => {
        const ymapsScript = document.createElement('script');
        ymapsScript.src =
        'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        document.body.appendChild(ymapsScript);
        ymapsScript.addEventListener('load', resolve);
        });
    }


loadYMaps() {
return new Promise((resolve) => ymaps.ready(resolve));
    }  


initMap() {
    this.clusterer = new ymaps.Clusterer({
        groupByCoordinates: true,
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: false,
    });
    this.clusterer.events.add('click', (e) => {
        const coords = e.get('target').geometry.getCoordinates();
        this.onClick(coords);
    });
    this.map = new ymaps.Map(this.mapId, {
        center: [49.92, 82.51],
        zoom: 11,
    });
    this.map.events.add('click', (e) => this.onClick(e.get('coords')));
    this.map.geoObjects.add(this.clusterer);
}
}
