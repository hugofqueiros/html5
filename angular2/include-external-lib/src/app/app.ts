import { Component, View } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";

declare var jsSHA: any;

@Component({
    selector: "my-app",
    templateUrl: "app/app.html",
    directives: []
})

class App {

    shaObj: any;
    hash: String;

    constructor() {
        this.shaObj = new jsSHA("SHA-512", "TEXT");
        this.shaObj.update("This is a test");
        this.hash = this.shaObj.getHash("HEX");
    }

}

bootstrap(App, []);