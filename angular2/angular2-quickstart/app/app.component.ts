/**
 * Created by hugo.queiros on 15/03/16.
 */


/**
 * AppComponent is the root of the application
 * Every Angular app has at least one root component, conventionally named AppComponent
 * , that hosts the client user experience
 */
import {Component} from 'angular2/core';

// @Component decorator that tells Angular what template to use and hor to create the component
// Component is a decorator function that takes a metadata object
// the selector specifies a simple CSS selector
@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
// component class that controls the appearance and behaviour of a view through its template

export class AppComponent { }