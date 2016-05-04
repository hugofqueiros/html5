/**
 * Created by hugo.queiros on 27/04/16.
 */
(function(){

    angular
        .module('app')
        .controller('MainController', [
            'navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$state', '$mdToast',
            MainController
        ]);

    function MainController(navService, $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast) {
        var self = this;

        self.menuItems = [ ];
        self.selectItem = selectItem;
        self.toggleItemsList = toggleItemsList;
        self.showActions = showActions;
        self.title = $state.current.data.title;
        self.showSimpleToast = showSimpleToast;
        self.toggleRightSidebar = toggleRightSidebar;
        self.toggleLeftSidebar = toggleLeftSidebar;

        navService
            .loadAllItems()
            .then(function(menuItems) {
                this.menuItems = [].concat(menuItems);
            }.bind(this));

        function toggleRightSidebar() {
            $mdSidenav('right').toggle();
        }

        function toggleLeftSidebar() {
            $mdSidenav('left').toggle();
        }

        function toggleItemsList() {
            $mdSidenav('left').toggle();

/*            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function(){
                $mdSidenav('left').toggle();
            });*/
        }

        function selectItem (item) {
            self.title = item.name;
            self.toggleItemsList();
            self.showSimpleToast(self.title);
        }

        function showActions($event) {
            $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: 'app/views/partials/bottomSheet.html',
                controller: [ '$mdBottomSheet', SheetController],
                controllerAs: 'bottomsheet',
                bindToController : true,
                targetEvent: $event
            }).then(function(clickedItem) {
                clickedItem && $log.debug(clickedItem.name + ' clicked!');
            });

            function SheetController($mdBottomSheet) {
                this.actions = [
                    {
                        name: 'Share',
                        icon: 'share',
                        url: 'https://twitter.com/intent/tweet?text=Hugo Queirós - checkout my website at: http://hugofqueiros.com via @hugofqueiros' },
                    {
                        name: 'Star',
                        icon: 'star',
                        url: 'https://github.com/hugofqueiros/html5/stargazers'
                    }
                ];

                this.performAction = function(action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }

        function showSimpleToast(title) {
            $mdToast.show(
                $mdToast.simple()
                    .content(title)
                    .hideDelay(3000)
                    .position('bottom right')
            );
        }
    }
})();
