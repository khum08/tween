export interface TweenItem {
    /**
     * 开始值
     */
    start: number,
    /**
     * 结束值
     */
    end: number,
    /**
     * 总时长
     */
    duration: number,
    /**
     * 每帧更新
     */
    onUpdate?: Function,
    /**
     * 结束时回调
     */
    onComplete?: Function,
    /**
     * 无线循环，默认false
     */
    infinite?: boolean,
    /**
     * 交替
     */
    alternate?: boolean,
    /**
     * 插值曲线，默认linear
     * 入参[0,1], 返回值[0.1]
     */
    timing?: (v: number) => number
}

export const linearTiming = (v: number ) => v;


export default class Tween {
    _start: number = 0;
    _end: number = 0;
    _duration: number = 1;
    _onUpdate: Function | undefined;
    _onComplete: Function | undefined;

    _startT: number = 0;
    _timing: ((v: number) => number) = linearTiming;
    _infinite: boolean = false;
    _alternate: boolean = false;
    raf: number = 0;

    constructor(params: TweenItem) {
        this.reset(params);
    }

    reset(params: TweenItem) {
        this._start = params.start;
        this._end = params.end;
        this._duration = params.duration;
        this._onUpdate = params.onUpdate;
        this._onComplete = params.onComplete;

        this._infinite = params.infinite || false;
        this._alternate = params.alternate || false;
        this._timing = params.timing || linearTiming;
    }

    update() {
        // udpate switch
        if (!this._startT) {
            return;
        }
        let costT = Date.now() - this._startT;
        if (costT > this._duration) {
            costT = this._duration;
        }
        const percent = costT / this._duration;
        const v = this._start + (this._end - this._start) * this._timing(percent);
        this._onUpdate && this._onUpdate(v);
        
        if (percent === 1) {
            this._onComplete && this._onComplete();
            this._startT = 0;
            if (this._infinite) {
                if (this._alternate) {
                    let tmp = this._start;
                    this._start = this._end;
                    this._end = tmp;
                }
                this.start();
            }
        } else {
            this.raf = requestAnimationFrame(this.update.bind(this));
        }

    }

    start() {
        this._startT = Date.now();
        this.raf = requestAnimationFrame(this.update.bind(this));
    }

    stop() {
        this._startT = 0;
        cancelAnimationFrame(this.raf);
    }
}
