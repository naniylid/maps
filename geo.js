import ymaps from './map';


export default class Geo {
    constructor() {
        this.map = new ymaps('map', this.onClick.bind(this));
        this.map.init().then(this.onInit.bind(this));
    }
    async onInit() {
    }
    onClick(coords) {}
}
