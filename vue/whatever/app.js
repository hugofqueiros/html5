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
        srcImage: 'http://www.robotshop.com/media/catalog/product/cache/15/image/900x900/9df78eab33525d08d6e5fb8d27136e95/e/z/ez-robot-jd-humanoid-robot.jpg'
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
        increase: function(step, event)
    }
})
