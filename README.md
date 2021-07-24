# Intro
Simple、Lightful、Efficient tween interpolate library. less than 2kb.


# Quick Start

## install
```
npm install yzk-tween
```

## usage example
```
const params = {
    start: 0,
    end: 100,
    duration: 3000,
    infinite: true,
    alternate: true,
    timing: v => {
      return v * v;
    },
    onUpdate: v => {
        console.log(v);
    },
    onComplete: () => {
        console.log('mission completed');
    }
}

let t = new Tween(params);
t.start();
```
