# Webpack

http://tooling.github.io/book-of-modern-frontend-tooling/dependency-management/webpack/getting-started.html

http://jamesknelson.com/webpack-made-simple-build-es6-less-with-autorefresh-in-26-lines/

http://jamesknelson.com/unlocking-decorators-and-other-es7-features-with-webpack-and-babel/

https://medium.com/front-end-developers/webpack-your-workflow-7c8f59c0c97c#.o8a9ogc3g

https://github.com/petehunt/webpack-howto#webpack-howto

https://k94n.com/webpack-ftw

https://github.com/petehunt/webpack-howto

## Starter Tool
https://github.com/HenrikJoreteg/hjs-webpack

## Getting an SPA to load the fastest possible way (and how Webpack can help you)
http://rosenfeld.herokuapp.com/en/articles/2016-02-29-getting-an-spa-to-load-the-fastest-possible-way-and-how-webpack-can-help-you?utm_source=javascriptweekly&utm_medium=email

## Config (build performance)

# SourceMaps

Perfect SourceMaps are slow.

`devtool: "source-map"` cannot cache SourceMaps for modules and need to regenerate complete SourceMap for the chunk. It's something for production.

`devtool: "eval-source-map"` is really as good as `devtool: "source-map"`, but can cache SourceMaps for modules. It's much faster for rebuilds.

`devtool: "eval-cheap-module-source-map"` offers SourceMaps that only maps lines (no column mappings) and are much faster.

`devtool: "eval-cheap-source-map"` is similar but doesn't generate SourceMaps for modules (i.e., jsx to js mappings).

`devtool: "eval"` has the best performance, but it only maps to compiled source code per module. In many cases this is good enough. (Hint: combine it with `output.pathinfo: true`.)

The UglifyJsPlugin uses SourceMaps to map errors to source code. And SourceMaps are slow. As you should only use this in production, this is fine. If your production build is *really* slow (or doesn't finish at all) you can disable it with `new UglifyJsPlugin({ sourceMap: false })`.
