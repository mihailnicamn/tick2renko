class Renko {
    constructor() {
        this._set = {
            brickSize: 0,
        }
        this._brick = {
            open : 0,
            close : 0,
            high : 0,
            low : 0,
        }
        this._bricks = [];
        this._lastClose = null;
        this._nextClose = {
            up: null,
            down: null,
        }
    }
    setBrickSize(brickSize) {
        this._set.brickSize = parseFloat(brickSize);
    }
    addTick(tick) {
        //parseFloat(tick) = float
        this._brick.close = parseFloat(tick);
        if (this._lastClose === null) {
            this._brick.open = parseFloat(tick);
            this._brick.close = parseFloat(tick);
            this._brick.high = parseFloat(tick);
            this._brick.low = parseFloat(tick);
            this._lastClose = parseFloat(tick);
            this._nextClose.up = parseFloat(tick) + this._set.brickSize;
            this._nextClose.down = parseFloat(tick) - this._set.brickSize;
            return;
        }
        if (parseFloat(tick) > parseFloat(this._brick.high)) {
            this._brick.high = parseFloat(tick);
        }
        if (parseFloat(tick) < parseFloat(this._brick.low)) {
            this._brick.low = parseFloat(tick);
        }
        if (parseFloat(tick) >= parseFloat(this._nextClose.up)) {
            this._brick.close = this._nextClose.up;
            this._bricks.push(this._brick);
            this._brick = {
                open : this._nextClose.up,
                close : this._nextClose.up,
                high : this._nextClose.up,
                low : this._nextClose.up,
            }
            this._lastClose = this._nextClose.up;
            this._nextClose.up = this._lastClose + this._set.brickSize;
            this._nextClose.down = this._lastClose - this._set.brickSize;
            return;
        }
        if (parseFloat(tick) <= parseFloat(this._nextClose.down)) {
            this._brick.close = this._nextClose.down;
            this._bricks.push(this._brick);
            this._brick = {
                open : this._nextClose.down,
                close : this._nextClose.down,
                high : this._nextClose.down,
                low : this._nextClose.down,
            }
            this._lastClose = this._nextClose.down;
            this._nextClose.up = this._lastClose + this._set.brickSize;
            this._nextClose.down = this._lastClose - this._set.brickSize;
            return;
        }
    }
    loadTicksHistory(ticks) {
        ticks.forEach((tick) => {
            this.addTick(tick);
        });
    }
        
}

module.exports = Renko;