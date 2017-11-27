/*
 * jQuery Countdown - v1.2.4
 * http://github.com/kemar/jquery.countdown
 * Licensed MIT
 */

(function ($, window, document, undefined) {

    "use strict";

    /*
     * .countDown()
     *
     * Description:
     *      Unobtrusive and easily skinable countdown jQuery plugin.
     *
     * Usage:
     *      $(element).countDown()
     *
     *      $(element) is a valid <time> or any other HTML tag containing a text representation of a date/time
     *      or duration remaining before a deadline expires.
     *      If $(element) is a <time> tag, the datetime attribute is checked first.
     *          <time datetime="2013-12-13T17:43:00">Friday, December 13th, 2013 5:43pm</time>
     *          <time>2012-12-08T14:30:00+0100</time>
     *          <time>PT01H01M15S</time>
     *          <h1>600 days, 3:59:12</h1>
     *
     *      The text representation of a date/time or duration can be:
     *      - a valid duration string:
     *          PT00M10S
     *          PT01H01M15S
     *          P2DT20H00M10S
     *      - a valid global date and time string with its timezone offset:
     *          2012-12-08T14:30:00.432+0100
     *          2012-12-08T05:30:00-0800
     *          2012-12-08T13:30Z
     *      - a valid time string:
     *          12:30
     *          12:30:39
     *          12:30:39.929
     *      - a human readable duration string:
     *          2h 0m
     *          4h 18m 3s
     *          24h00m59s
     *          600 jours, 3:59:12
     *          600 days, 3:59:12
     *      - the output of a JavaScript Date.parse() parsable string:
     *          Date.toDateString() => Sat Dec 20 2014
     *          Date.toGMTString()  => Sat, 20 Dec 2014 09:24:00 GMT
     *          Date.toUTCString()  => Sat, 20 Dec 2014 09:24:00 GMT
     *
     *      If $(element) is not a <time> tag, a new one is created and appended to $(element).
     *
     * Literature, resources and inspiration:
     *      JavaScript Date reference:
     *          https://developer.mozilla.org/docs/JavaScript/Reference/Global_Objects/Date
     *      About the <time> element:
     *          https://html.spec.whatwg.org/multipage/semantics.html#the-time-element
     *          http://www.w3.org/TR/html5/text-level-semantics.html#the-time-element
     *          http://wiki.whatwg.org/wiki/Time_element
     *      <time> history:
     *          http://www.brucelawson.co.uk/2012/best-of-time/
     *          http://www.webmonkey.com/2011/11/w3c-adds-time-element-back-to-html5/
     *      Formats:
     *          http://en.wikipedia.org/wiki/ISO_8601
     *      jQuery plugin syntax:
     *          https://github.com/jquery-boilerplate/jquery-patterns
     *          https://github.com/jquery-boilerplate/jquery-boilerplate/wiki/Extending-jQuery-Boilerplate
     *          http://frederictonug.net/jquery-plugin-development-with-the-jquery-boilerplate
     *
     * Example of generated HTML markup:
     *      <time class="countdown" datetime="P12DT05H16M22S">
     *          <span class="item item-dd">
     *              <span class="dd"></span>
     *              <span class="label label-dd">days</span>
     *          </span>
     *          <span class="separator separator-dd">,</span>
     *          <span class="item item-hh">
     *              <span class="hh-1"></span>
     *              <span class="hh-2"></span>
     *              <span class="label label-hh">hours</span>
     *          </span>
     *          <span class="separator">:</span>
     *          <span class="item item-mm">
     *              <span class="mm-1"></span>
     *              <span class="mm-2"></span>
     *              <span class="label label-mm">minutes</span>
     *          </span>
     *          <span class="separator">:</span>
     *          <span class="item item-ss">
     *              <span class="ss-1"></span>
     *              <span class="ss-2"></span>
     *              <span class="label label-ss">seconds</span>
     *          </span>
     *      </time>
    */

    var pluginName = 'countDown';

    var defaults = {
        css_class:        'countdown',
        always_show_days: false,
        with_labels:      true,
        with_seconds:     true,
        with_separators:  true,
        label_dd:         'days',
        label_hh:         'hours',
        label_mm:         'minutes',
        label_ss:         'seconds',
        separator:        ':',
        separator_days:   ','
    };

    function CountDown(element, options) {
        this.element = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(CountDown.prototype, {

        init: function () {
            if (this.element.children().length) {
                return;
            }
            if (this.element.attr('datetime')) {  // Try to parse the datetime attribute first.
                this.endDate = this.parseEndDate(this.element.attr('datetime'));
            }
            if (this.endDate === undefined) {  // Fallback on the text content.
                this.endDate = this.parseEndDate(this.element.text());
            }
            if (this.endDate === undefined) {  // Unable to parse a date.
                return;
            }
            if (this.element.is('time')) {
                this.timeElement = this.element;
            } else {
                this.timeElement = $('<time></time>');
                this.element.html(this.timeElement);
            }
            this.markup();
            this.setTimeoutDelay = this.sToMs(1);
            this.daysVisible = true;
            this.timeElement.bind('time.elapsed', this.options.onTimeElapsed);
            this.doCountDown();
        },

        parseEndDate: function (str) {

            var d;

            d = this.parseDuration(str);
            if (d instanceof Date) {
                return d;
            }

            d = this.parseDateTime(str);
            if (d instanceof Date) {
                return d;
            }

            d = this.parseHumanReadableDuration(str);
            if (d instanceof Date) {
                return d;
            }

            // Try to parse a string representation of a date.
            // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
            d = Date.parse(str);
            if (!isNaN(d)) {
                return new Date(d);
            }

        },

        // Convert a valid duration string representing a duration to a Date object.
        //
        // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-duration-string
        // http://en.wikipedia.org/wiki/ISO_8601#Durations
        // i.e.: P2DT20H00M10S, PT01H01M15S, PT00M10S, P2D, P2DT20H00M10.55S
        //
        // RegExp:
        // /^
        //    P                     => duration designator (historically called "period")
        //    (?:(\d+)D)?           => (days) followed by the letter "D" (optional)
        //    T?                    => the letter "T" that precedes the time components of the representation (optional)
        //    (?:(\d+)H)?           => (hours) followed by the letter "H" (optional)
        //    (?:(\d+)M)?           => (minutes) followed by the letter "M" (optional)
        //    (
        //         ?:(\d+)          => (seconds) (optional)
        //         (?:\.(\d{1,3}))? => (milliseconds) full stop character (.) and fractional part of second (optional)
        //         S                => followed by the letter "S"
        //    )?
        // $/
        parseDuration: function (str) {
            var timeArray = str.match(/^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(?:\.(\d{1,3}))?S)?$/);
            if (timeArray) {
                var d, dd, hh, mm, ss, ms;
                dd = timeArray[1] ? this.dToMs(timeArray[1]) : 0;
                hh = timeArray[2] ? this.hToMs(timeArray[2]) : 0;
                mm = timeArray[3] ? this.mToMs(timeArray[3]) : 0;
                ss = timeArray[4] ? this.sToMs(timeArray[4]) : 0;
                ms = timeArray[5] ? parseInt(timeArray[5], 10) : 0;
                d = new Date();
                d.setTime(d.getTime() + dd + hh + mm + ss + ms);
                return d;
            }
        },

        // Convert a valid global date and time string to a Date object.
        // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-global-date-and-time-string
        //
        // 2012-12-08T13:30:39+0100
        //     => ["2012-12-08T13:30:39+0100", "2012", "12", "08", "13", "30", "39", undefined, "+0100"]
        // 2012-12-08T06:54-0800
        //     => ["2012-12-08T06:54-0800", "2012", "12", "08", "06", "54", undefined, undefined, "-0800"]
        // 2012-12-08 13:30Z
        //     => ["2012-12-08 13:30Z", "2012", "12", "08", "13", "30", undefined, undefined, "Z"]
        // 2013-12-08 06:54:39.929-10:30
        //     => ["2013-12-08 06:54:39.929-08:30", "2013", "12", "08", "06", "54", "39", "929", "-10:30"]
        //
        // RegExp:
        // ^
        //     (\d{4,})         => (year) (four or more ASCII digits)
        //     -                => hyphen-minus
        //     (\d{2})          => (month)
        //     -                => hyphen-minus
        //     (\d{2})          => (day)
        //     [T\s]            => T or space
        //     (\d{2})          => (hours)
        //     :                => colon
        //     (\d{2})          => (minutes)
        //     (?:\:(\d{2}))?   => colon and (seconds) (optional)
        //     (?:\.(\d{1,3}))? => full stop character (.) and fractional part of second (milliseconds) (optional)
        //     ([Z\+\-\:\d]+)?  => time-zone (offset) string (optional)
        // $
        parseDateTime: function (str) {
            var timeArray = str.match(
                /^(\d{4,})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})(?:\:(\d{2}))?(?:\.(\d{1,3}))?([Z\+\-\:\d]+)?$/);
            if (timeArray) {

                // Convert UTC offset from string to milliseconds.
                // +01:00 => ["+01:00", "+", "01", "00"] => -360000
                // -08:00 => ["-08:00", "-", "08", "00"] => 28800000
                // +05:30 => ["+05:30", "+", "05", "30"] => -19800000
                var offset = timeArray[8] ? timeArray[8].match(/^([\+\-])?(\d{2}):?(\d{2})$/) : undefined;

                // Time difference between UTC and the given time zone in milliseconds.
                var utcOffset = 0;
                if (offset) {
                    utcOffset = this.hToMs(offset[2]) + this.mToMs(offset[3]);
                    utcOffset = (offset[1] === '-') ? utcOffset : -utcOffset;
                }

                var d, yy, mo, dd, hh, mm, ss, ms;
                yy = timeArray[1];
                mo = timeArray[2] - 1;
                dd = timeArray[3];
                hh = timeArray[4] || 0;
                mm = timeArray[5] || 0;
                ss = timeArray[6] || 0;
                ms = timeArray[7] || 0;
                d = new Date(Date.UTC(yy, mo, dd, hh, mm, ss, ms));

                d.setTime(d.getTime() + utcOffset);

                return d;

            }
        },

        // Convert a string representing a human readable duration to a Date object.
        // Hours and minutes are mandatory.
        //
        // 600 days, 3:59:12 => ["600 days, 3:59:12", "600", "3", "59", "12", undefined]
        //           3:59:12 => ["3:59:12", undefined, "3", "59", "12", undefined]
        //             00:01 => ["00:01", undefined, "00", "01", undefined, undefined]
        //          00:00:59 => ["00:00:59", undefined, "00", "00", "59", undefined]
        //         240:00:59 => ["240:00:59", undefined, "240", "00", "59", undefined]
        //         4h 18m 3s => ["4h 18m 3s", undefined, "4", "18", "3", undefined]
        //     1d 0h 00m 59s => ["1d 0h 00m 59s", "1", "0", "00", "59", undefined]
        //             2h 0m => ["2h 0m", undefined, "2", "0", undefined, undefined]
        //         24h00m59s => ["24h00m59s", undefined, "24", "00", "59", undefined]
        //      12:30:39.929 => ["12:30:39.929", undefined, "12", "30", "39", "929"]
        //
        // RegExp:
        // /^
        //     (?:(\d+).+\s)?   => (days) followed by any character 0 or more times and a space (optional)
        //     (\d+)[h:]\s?     => (hours) followed by "h" or ":" and an optional space
        //     (\d+)[m:]?\s?    => (minutes) followed by "m" or ":" and an optional space
        //     (\d+)?[s]?       => (seconds) followed by an optional space (optional)
        //     (?:\.(\d{1,3}))? => (milliseconds) full stop character (.) and fractional part of second (optional)
        // $/
        parseHumanReadableDuration: function (str) {
            var timeArray = str.match(/^(?:(\d+).+\s)?(\d+)[h:]\s?(\d+)[m:]?\s?(\d+)?[s]?(?:\.(\d{1,3}))?$/);
            if (timeArray) {
                var d, dd, hh, mm, ss, ms;
                d = new Date();
                dd = timeArray[1] ? this.dToMs(timeArray[1]) : 0;
                hh = timeArray[2] ? this.hToMs(timeArray[2]) : 0;
                mm = timeArray[3] ? this.mToMs(timeArray[3]) : 0;
                ss = timeArray[4] ? this.sToMs(timeArray[4]) : 0;
                ms = timeArray[5] ? parseInt(timeArray[5], 10) : 0;
                d.setTime(d.getTime() + dd + hh + mm + ss + ms);
                return d;
            }
        },

        // Convert seconds to milliseconds.
        sToMs: function (s) {
            return parseInt(s, 10) * 1000;
        },

        // Convert minutes to milliseconds.
        mToMs: function (m) {
            return parseInt(m, 10) * 60 * 1000;
        },

        // Convert hours to milliseconds.
        hToMs: function (h) {
            return parseInt(h, 10) * 60 * 60 * 1000;
        },

        // Convert days to milliseconds.
        dToMs: function (d) {
            return parseInt(d, 10) * 24 * 60 * 60 * 1000;
        },

        // Extract seconds (0-59) from the given timedelta expressed in milliseconds.
        // A timedelta represents a duration, the difference between two dates or times.
        msToS: function (ms) {
            return parseInt((ms / 1000) % 60, 10);
        },

        // Extract minutes (0-59) from the given timedelta expressed in milliseconds.
        msToM: function (ms) {
            return parseInt((ms / 1000 / 60) % 60, 10);
        },

        // Extract hours (0-23) from the given timedelta expressed in milliseconds.
        msToH: function (ms) {
            return parseInt((ms / 1000 / 60 / 60) % 24, 10);
        },

        // Extract the number of days from the given timedelta expressed in milliseconds.
        msToD: function (ms) {
            return parseInt((ms / 1000 / 60 / 60 / 24), 10);
        },

        markup: function () {
            // Prepare the HTML content of the <time> element.
            var html = [
                '<span class="item item-dd">',
                    '<span class="dd"></span>',
                    '<span class="label label-dd">', this.options.label_dd, '</span>',
                '</span>',
                '<span class="separator separator-dd">', this.options.separator_days, '</span>',
                '<span class="item item-hh">',
                    '<span class="hh-1"></span>',
                    '<span class="hh-2"></span>',
                    '<span class="label label-hh">', this.options.label_hh, '</span>',
                '</span>',
                '<span class="separator">', this.options.separator, '</span>',
                '<span class="item item-mm">',
                    '<span class="mm-1"></span>',
                    '<span class="mm-2"></span>',
                    '<span class="label label-mm">', this.options.label_mm, '</span>',
                '</span>',
                '<span class="separator">', this.options.separator, '</span>',
                '<span class="item item-ss">',
                    '<span class="ss-1"></span>',
                    '<span class="ss-2"></span>',
                    '<span class="label label-ss">', this.options.label_ss, '</span>',
                '</span>'
            ];
            this.timeElement.html(html.join(''));
            // Customize HTML according to options.
            if (!this.options.with_labels) {
                this.timeElement.find('.label').remove();
            }
            if (!this.options.with_separators) {
                this.timeElement.find('.separator').remove();
            }
            if (!this.options.with_seconds) {
                this.timeElement.find('.item-ss').remove();
                this.timeElement.find('.separator').last().remove();
            }
            // Cache elements.
            this.item_dd       = this.timeElement.find('.item-dd');
            this.separator_dd  = this.timeElement.find('.separator-dd');
            this.remaining_dd  = this.timeElement.find('.dd');
            this.remaining_hh1 = this.timeElement.find('.hh-1');
            this.remaining_hh2 = this.timeElement.find('.hh-2');
            this.remaining_mm1 = this.timeElement.find('.mm-1');
            this.remaining_mm2 = this.timeElement.find('.mm-2');
            this.remaining_ss1 = this.timeElement.find('.ss-1');
            this.remaining_ss2 = this.timeElement.find('.ss-2');
            // Set the css class of the <time> element.
            this.timeElement.addClass(this.options.css_class);
        },

        doCountDown: function () {
            // Calculate the difference between the two dates in milliseconds.
            // Note: in old iOS, JavaScript is paused during elastic scroll and not resumed until the scrolling stops.
            // Therefore we have to evaluate the remaining time with a new Date() object.
            var ms = this.endDate.getTime() - new Date().getTime();
            // Extract seconds, minutes, hours and days from the timedelta expressed in milliseconds.
            var ss = this.msToS(ms);
            var mm = this.msToM(ms);
            var hh = this.msToH(ms);
            var dd = this.msToD(ms);
            // Prevent display of negative values.
            if (ms <= 0) {
                ss = mm = hh = dd = 0;
            }
            // Update display.
            this.displayRemainingTime({
                'ss': ss < 10 ? '0' + ss.toString() : ss.toString(),
                'mm': mm < 10 ? '0' + mm.toString() : mm.toString(),
                'hh': hh < 10 ? '0' + hh.toString() : hh.toString(),
                'dd': dd.toString()
            });
            // If seconds are hidden, stop the counter as soon as there is no minute left.
            if (!this.options.with_seconds && dd === 0 && mm === 0 && hh === 0) {
                ss = 0;
            }
            if (dd === 0 && mm === 0 && hh === 0 && ss === 0) {
                return this.timeElement.trigger('time.elapsed');
            }
            // Reload it.
            var self = this;
            window.setTimeout(function () { self.doCountDown(); }, self.setTimeoutDelay);
        },

        // @param remaining: an object literal containing a string representation of days, hours, minutes and
        // seconds remaining. e.g. { dd: "600", hh: "03", mm: "59", ss: "11" }
        displayRemainingTime: function (remaining) {
            // Format the datetime attribute of the <time> element to an ISO 8601 duration.
            // https://html.spec.whatwg.org/multipage/semantics.html#datetime-value
            // i.e.: <time datetime="P2DT00H00M30S">2 00:00:00</time>
            var attr = [];
            attr.push('P');
            if (remaining.dd !== '0') {
                attr.push(remaining.dd, 'D');
            }
            attr.push('T', remaining.hh, 'H', remaining.mm, 'M');
            if (this.options.with_seconds) {
                attr.push(remaining.ss, 'S');
            }
            this.timeElement.attr('datetime', attr.join(''));
            // Remove days if necessary.
            if (this.daysVisible && !this.options.always_show_days && remaining.dd === '0') {
                this.item_dd.remove();
                this.separator_dd.remove();
                this.daysVisible = false;
            }
            // Update countdown values.
            this.remaining_dd.text(remaining.dd);
            this.remaining_hh1.text(remaining.hh[0]);
            this.remaining_hh2.text(remaining.hh[1]);
            this.remaining_mm1.text(remaining.mm[0]);
            this.remaining_mm2.text(remaining.mm[1]);
            this.remaining_ss1.text(remaining.ss[0]);
            this.remaining_ss2.text(remaining.ss[1]);
        }

    });

    $.fn[pluginName] = function (options) {

        var args = arguments;

        // If the first parameter is an object (options) or was omitted, instantiate a new plugin instance.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new CountDown(this, options));
                }
            });
        }

        // Allow any public function (i.e. a function whose name isn't 'init' or doesn't start with an underscore)
        // to be called via the jQuery plugin, e.g. $(element).countDown('functionName', arg1, arg2).
        else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call to make it possible to return a value.
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);

                // Tests that there's already a plugin instance and checks that the requested public method exists.
                if (instance instanceof CountDown && typeof instance[options] === 'function') {
                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }

                // Allow instances to be destroyed via the 'destroy' method.
                if (options === 'destroy') {
                    $.data(this, 'plugin_' + pluginName, null);
                }

            });

            // If the earlier cached method gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;

        }

    };

})(window.jQuery, window, document);
