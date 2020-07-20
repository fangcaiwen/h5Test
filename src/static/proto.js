
    /**
     * 日期转换到格式化字符串
     */
    Date.prototype.toFormatString = function ($f) {

        var i;

        // 年
        if ((/(Y+)/).test($f))
            $f = $f.replace(RegExp.$1, (i = RegExp.$1.length) > 1 ? String(this.getFullYear()).slice(-i) : String(this.getFullYear()));

        // 月
        if ((/(M+)/).test($f))
            $f = $f.replace(RegExp.$1, (i = RegExp.$1.length) > 1 ? String('0' + (this.getMonth() + 1)).slice(-i) : String(this.getMonth() + 1));

        // 日
        if ((/(D+)/).test($f))
            $f = $f.replace(RegExp.$1, (i = RegExp.$1.length) > 1 ? String('0' + this.getDate()).slice(-i) : String(this.getDate()));

        // 时
        if ((/(h+)/).test($f))
            $f = $f.replace(RegExp.$1, (i = RegExp.$1.length) > 1 ? String('0' + this.getHours()).slice(-i) : String(this.getHours()));

        // 分
        if ((/(m+)/).test($f))
            $f = $f.replace(RegExp.$1, (i = RegExp.$1.length) > 1 ? String('0' + this.getMinutes()).slice(-i) : String(this.getMinutes()));

        // 秒
        if ((/(s+)/).test($f))
            $f = $f.replace(RegExp.$1, (i = RegExp.$1.length) > 1 ? String('0' + this.getSeconds()).slice(-i) : String(this.getSeconds()));

        return $f;

    };



    /**
     * 日期转换到 00:00:00:0000
     */
    Date.prototype.toZeroTime = function () {

        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);

    };



    /**
     * 日期转换到 今日 00:00
     */
    Date.prototype.toSmartDate = function () {

        var a, b;

        switch (true) {

            case (a = new Date, a.toZeroTime(), a) - (b = new Date( this.getTime() ), b.toZeroTime(), b) < 864E5 :
                return '今日 ' + this.toFormatString('hh:mm');

            case a - b < 1728E5 :
                return '昨日 ' + this.toFormatString('hh:mm');

            default :
                return this.toFormatString('YYYY/M/D hh:mm');

        }

    };



    /**
     * 数字转换到千分位字符串
     */
    Number.prototype.toSeparatorString = function () {

        return String(this).replace(/(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,');

    };
