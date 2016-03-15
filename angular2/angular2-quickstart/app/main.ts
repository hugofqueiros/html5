/**
 * Created by hugo.queiros on 15/03/16.
 */

/**
 * Import the two things we need to launch the application
 * Angular's browser bootstrap function
 * The application root component, AppComponent
 *
 * Then we call bootstrap with AppComponent
 *
 * Bootstrapping is platform-specific

 Notice that we import the bootstrap function from angular2/platform/browser, not angular2/core.

 Bootstrapping isn't core because there isn't a single way to bootstrap the app. True, most applications that run in a browser call the bootstrap function from this library.

 */
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'

bootstrap(AppComponent);