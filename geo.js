import ymaps from './map.js';


export default class Geo {
    constructor() {
        this.formTemplate = document.querySelector('#addFormTemplate').innerHTML;
        this.map = new ymaps('map', this.onClick.bind(this));
        this.map.init().then(this.onInit.bind(this));
    }
    async onInit() {
    }

    async callApi(method, body = {}) {
        const res = await fetch(`/geo-review/${method}`, {
            method: 'post',
            body: JSON.stringify(body),
        });
        return await res.json();
    }

    createForm(coords, reviews) {
        const root = document.createElement('div');
        root.innerHTML = this.formTemplate;
        const reviewForm = root.querySelector('[data-role=review-form]');
        reviewForm.dataset.coords = JSON.stringify(coords);

        return root;
    }

    onClick(coords) {
        const form = this.createForm(coords);
        this.map.openBalloon(coords, form.innerHTML);
    }
}
