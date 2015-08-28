# Flux React RequireJS Layers

Example application that shows how to use Require.js build layers in a ReactJS
application using Flux stores. This repository contains the code that
accompanies the blogpost 
[Lazy loading React Components using RequireJS and Flux](http://add.link.here).

## Running

Make sure you have [npm](https://www.npmjs.org/) installed on your computer. 
Then run these commands from the root directory of the project, to install all
the dependencies.

```bash
npm install --global gulp
npm install
```

To build the project, run

```bash
gulp
```

This will transform all JSX to Javascript, move a few libraries from the npm
modules to the build directory and combine some files to create optimized
builds.

After running the build, you can open `index.html` in your browser to open the
application.

## Usage

The application implements two lazy loadable components. I've called them
'plugins' in this example, but you can call it whatever you want, of course. It
implements the two loading strategies that are discussed in the blogpost. There
are four buttons, each of which loads one of the plugins, using one of the
strategies. 

I have implemented a delay in the `actions/plugin_action_creators.js` 
`pluginLoader` method, to simulate the fact that loading a large plugin takes
some time (network and parsing). The delay is now 2 seconds, to exaggerate the
effect.

To see which Javascript files are requested by the browser, I recommend keeping
the 'Network' tab of the developer tools of your browser open.