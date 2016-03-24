# react-github-notetaker 

## Install

```sh
npm install
```

## Dependencies

- [moment](https://github.com/moment/moment): Parse, validate, manipulate, and display dates
- [react](https://github.com/facebook/react): React is a JavaScript library for building user interfaces.

## Dev Dependencies

- [browserify](https://github.com/substack/node-browserify): browser-side require() the node way
- [reactify](https://github.com/andreypopp/reactify): Browserify transform for JSX (a superset of JS used by React.js)
- [uglify-js](https://github.com/mishoo/UglifyJS2): JavaScript parser, mangler/compressor and beautifier toolkit
- [watchify](https://github.com/substack/watchify): watch mode for browserify builds


## THE APP

1. App is the main component. It contains methods for the actions that 
cant be performed by the user like searching, adding a location to
favorites and more, The other components are nested inside it.

2. CurrentLocation presents the currently visited address in the map.
Adresses can be added or removed from favorites by clicking the star icon.

3. LocationList renders all favorite locations. It creates a LocationItem for each.

4. LocationItem is an individual location. When it is clicked, its corresponding
address is searched for and highlighted in the map.

5. Map integrates with the GMaps library, and renders a map from Google Maps.

6. Search is a component that wraps around the search from. When it is submitted,
a search for the location is triggered.



## License

MIT

