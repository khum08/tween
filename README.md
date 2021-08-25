# Tween.js
![npm-version](https://img.shields.io/npm/v/yzk-tween)
![npm-size](https://img.shields.io/bundlephobia/minzip/yzk-tween)
![npm-download](https://img.shields.io/npm/dm/yzk-tween)

# Intro
Simple、Lightful、Efficient tween interpolate library. less than 2kb.


# Quick Start

## install
```shell
npm install yzk-tween
```

## usage example
```javascript
import { Tween } from 'yzk-tween';

const params = {
    // startValue of tween.
    start: 0,
    // endValue of tween.
    end: 100,
    // the length of time that a tween takes to complete one cycle.
    duration: 3000,
    // repeat the tween repeat forever.
    infinite: true,
    // interpolate direction when repeat a tween.
    alternate: true,
    // how a tween progresses through the duration of each cycle.
    timing: v => {
      return v * v;
    },
    // get value of tween at current time.
    onUpdate: v => {
        console.log(v);
    },
    // a tween completed.
    onComplete: () => {
        console.log('mission completed');
    }
}

let t = new Tween(params);
t.start();

// stop this tween.
t.stop();

// reuse tween instance.
t.reset(params);
```


