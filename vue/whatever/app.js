// Put this in the script section in JSFiddle
// In a local setup, you need to merge this and the index.html file into one file
new Vue({
	el: '#app',
	data: {
        title: 'Hello World!',
        link: 'http://google.com',
        finishedLink: '<a href="google.com">Google</a>',
        name: 'Hugo',
        age: 34,
        srcImage: 'http://www.robotshop.com/media/catalog/product/cache/15/image/900x900/9df78eab33525d08d6e5fb8d27136e95/e/z/ez-robot-jd-humanoid-robot.jpg',
        counter: 0,
        secondCounter: 0,
        x: 0,
        y: 0,
        attachRed: false
    },
    // use computed bc it's more optimized, for cache porpuses and other stuff... it's synchronous (you can't do async, call backend and stuff)
    computed: {
        output: function() {
            console.log('Computed');
            return this.counter > 5 ? 'Greater 5' : 'Smaller than 5'
        },
        divClasses: function() {
            return {
                red: this.attachRed,
                blue: !this.attachRed
            }
        }
    },
    // async things
    watch: {
        counter: function(value) {
            var vm = this;

            setTimeout(function() {
                vm.counter = 0;
            }, 2000);
        }
    },
    methods: {
        sayHello: function() {
            this.title = 'Hello!';
            return this.title;
        },
        ageTimes: function() {
            return this.age * 3;
        },
        random: function() {
            return Math.random(0, 100);
        },
        increase: function(step, event) {
            this.count += step;
        },
        updateCoordinates: function(event) {
            this.x = event.clientX;
            this.y = event.clientY;
        },
        dummy: function(event) {
            event.stopPropagation();

        },
        alertMe: function() {
            alert('Alert!');
        },
        changeLink: function() {
            this.link = 'http://apple.com'
        }
    }
})
