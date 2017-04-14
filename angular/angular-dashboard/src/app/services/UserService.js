/**
 * Created by hugo.queiros on 10/05/16.
 */

(function(){
    'use strict';

    angular.module('app')
        .service('userService', [
            '$q',
            userService
        ]);

    function userService($q){

        var user = {
            title: 'hugofqueiros',
            email: 'hugofqueiros@gmail.com',
            firstName: 'Hugo',
            lastName: 'Queirós' ,
            company: 'hugofqueiros.com.' ,
            address: 'Street Whatever, 10 ' ,
            city: 'Madrid' ,
            state: '' ,
            biography: 'I currently work as a Web developer contractor for Fyusion (San Francisco, USA). ' +
            'You know nothing Jon Snow!',
            postalCode : '000000'
        };

        return {
            fetchUser: function() {
                return $q.when(user);
            }
        };
    }
})();
