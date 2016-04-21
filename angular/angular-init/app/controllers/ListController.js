export default class ListController {
    constructor($stateParams, $exceptionHandler) {
        //this.foo = 'woooo'
        try {
            this.foo = $stateParams.id;
            //throw(new Error('Something went boom'));
        }
        catch (e) {
            $exceptionHandler(e);
        }
    }
}
