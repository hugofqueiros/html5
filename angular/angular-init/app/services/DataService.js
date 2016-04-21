// data provider, controller never provides data, you always have to pass data

export default class DataService {
    constructor() {

    }
    load(obj) {
        this.obj = obj
    }
    $get() {
        return {
            foo: 'bar',
            bob: 'elisa'
        }
    }
}
