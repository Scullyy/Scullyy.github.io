function int64(low, hi) {
    this.low = (low >>> 0);
    this.hi = (hi >>> 0);

    this.add32inplace = function (val) {
        var new_lo = (((this.low >>> 0) + val) & 0xFFFFFFFF) >>> 0;
        var new_hi = this.hi;

        if (new_lo < this.low) {
            new_hi = (new_hi + 1) & 0xFFFFFFFF;
        }

        this.hi = new_hi;
        this.low = new_lo;
    };

    this.add32 = function (val) {
        var new_lo = (((this.low >>> 0) + val) & 0xFFFFFFFF) >>> 0;
        var new_hi = this.hi;

        if (new_lo < this.low) {
            new_hi = (new_hi + 1) & 0xFFFFFFFF;
        }

        return new int64(new_lo, new_hi);
    };

    this.sub32 = function (val) {
        var new_lo = (((this.low >>> 0) - val) & 0xFFFFFFFF) >>> 0;
        var new_hi = this.hi;

        if (new_lo > this.low) {
            new_hi = (new_hi - 1) & 0xFFFFFFFF;
        }

        return new int64(new_lo, new_hi);
    };

    this.sub32inplace = function (val) {
        var new_lo = (((this.low >>> 0) - val) & 0xFFFFFFFF) >>> 0;
        var new_hi = this.hi;

        if (new_lo > this.low) {
            new_hi = (new_hi - 1) & 0xFFFFFFFF;
        }

        this.hi = new_hi;
        this.low = new_lo;
    };

    this.and32 = function (val) {
        var new_lo = this.low & val;
        var new_hi = this.hi;
        return new int64(new_lo, new_hi);
    };

    this.and64 = function (vallo, valhi) {
        var new_lo = this.low & vallo;
        var new_hi = this.hi & valhi;
        return new int64(new_lo, new_hi);
    };

    this.toString = function (val) {
        val = val || 16;
        var lo_str = (this.low >>> 0).toString(val);
        var hi_str = (this.hi >>> 0).toString(val);
    
        if (this.hi == 0) {
            return lo_str;
        } else {
            lo_str = zeroFill(lo_str, 8);
            return hi_str + lo_str;
        }
    };    

    return this;
}

function zeroFill(number, width) {
    width = Math.max(0, width - number.toString().length); // Ensure width is non-negative

    if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }

    return number + ""; // always return a string
}
