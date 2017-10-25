# generator-virtualmin [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

## Description
This Yeoman generator will connect to your private server via SSH based on credentials given. It will then setup a new virtual server with the credentials you specify. Setting up SSH is optional. If you select YES(default), it will use let's encrypt to apply your SSL. 

## Installation

First, install [Yeoman](http://yeoman.io) and generator-virtualmin using [npm](https://www.npmjs.com/package/generator-virtualmin) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-virtualmin
```

Setup your virtual server:

```bash
yo virtualmin
```

## License

Apache-2.0 © [Steve]()


[npm-image]: https://badge.fury.io/js/generator-virtualmin.svg
[npm-url]: https://npmjs.org/package/generator-virtualmin
[travis-image]: https://travis-ci.org/tex0gen/generator-virtualmin.svg?branch=master
[travis-url]: https://travis-ci.org/tex0gen/generator-virtualmin
[daviddm-image]: https://david-dm.org/tex0gen/generator-virtualmin.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/tex0gen/generator-virtualmin
