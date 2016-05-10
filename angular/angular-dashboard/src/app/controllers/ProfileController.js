/**
 * Created by hugo.queiros on 10/05/16.
 */

(function(){

    angular
        .module('app')
        .controller('ProfileController', [
            'userService', '$q',
            ProfileController
        ]);

    function ProfileController(userService, $q) {
/*        var vm = this;*/

        userService.fetchUser()
            .then(function(data) {
                this.user = data;
            }.bind(this));

/*        vm.user = {
            title: 'Hugo',
            email: 'hugofqueiros@gmail.com',
            firstName: 'Hugo',
            lastName: 'Queirós' ,
            company: 'hugofqueiros.com.' ,
            address: 'Street Whatever, 10 ' ,
            city: 'Madrid' ,
            state: '' ,
            biography: 'I currently work as a Senior Front-end Web Programmer at Gigigo in Madrid. ' +
            'I have solid knowledge of JavaScript, HTML5 and CSS3, and I am passionate about top niche tools.',
            postalCode : '000000'
        };*/
    }

})();