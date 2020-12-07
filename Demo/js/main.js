/*! Snowflakes | Ã‚Â© 2018 Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Snowflakes = factory());
}(this, (function () { 'use strict';

var animationPrefix = '';
if (typeof window !== 'undefined') {
    animationPrefix = Array.prototype.slice.call(window.getComputedStyle(document.documentElement, '')).join(',').search(/,animation/) > -1 ? '' : 'Webkit';
}

/**
 * Set inline style.
 *
 * @param {DOMElement} dom
 * @param {Object} props
 */
function setStyle(dom, props) {
    Object.keys(props).forEach(function (originalKey) {
        var key = originalKey;
        if (animationPrefix && originalKey.search('animation') > -1) {
            key = animationPrefix + originalKey[0].toUpperCase() + originalKey.substr(1);
        }

        dom.style[key] = props[originalKey];
    });
}

/**
 * Get random number.
 *
 * @param {number} from
 * @param {number} max
 *
 * @returns {number}
 */
function getRandom(from, max) {
    return from + Math.floor(Math.random() * (max - from));
}

/**
 * Linear interpolation.
 *
 * @param {number} x
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 *
 * @returns {number}
 */
function interpolation(x, x1, x2, y1, y2) {
    return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
}

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Flake = function () {

    /**
     * @constructor
     *
     * @param {DOMElement} container
     * @param {number} containerHeight
     * @param {Object} params
     * @param {number} [params.count=50]
     * @param {number} [params.speed=1]
     * @param {boolean} [useRotate=true]
     * @param {boolean} [useScale=true]
     * @param {number} [params.zIndex=9999]
     */
    function Flake(container, containerHeight, params) {
        _classCallCheck$1(this, Flake);

        this.size = params.useScale ? getRandom(Flake.minSize, Flake.maxSize) : Flake.maxSize;

        var flake = document.createElement('div'),
            innerFlake = document.createElement('div'),
            animationProps = this.getAnimationProps(containerHeight, params.speed),
            styleProps = {
            animationDelay: animationProps.animationDelay,
            animationDuration: animationProps.animationDuration,
            left: Math.random() * 100 + '%',
            width: this.size + 'px',
            height: this.size + 'px'
        };

        if (params.useScale) {
            styleProps.zIndex = params.zIndex + this.size * 10;
            styleProps.opacity = interpolation(this.size, Flake.minSize, Flake.maxSize, Flake.minOpacity, Flake.maxOpacity);
        }

        setStyle(flake, styleProps);
        flake.classList.add('snowflake');

        innerFlake.classList.add('snowflake__inner');
        innerFlake.classList.add('snowflake__inner_num_' + getRandom(0, Flake.count));
        if (params.useRotate) {
            innerFlake.classList.add('snowflake__inner_use-rotate' + (Math.random() > 0.5 ? '' : '-reverse'));
        }

        setStyle(innerFlake, {
            animationName: 'snowflake_x_' + this.size,
            animationDelay: Math.random() + 's'
        });

        flake.appendChild(innerFlake);
        this._elem = flake;

        container.appendChild(flake);
    }

    /**
     * Get animation properties.
     *
     * @param {number} containerHeight
     * @param {number} speed
     *
     * @returns {Object}
     */


    Flake.prototype.getAnimationProps = function getAnimationProps(containerHeight, speed) {
        var speedMax = containerHeight / 50 / speed,
            speedMin = speedMax / 3;

        return {
            animationDelay: Math.random() * speedMax + 's',
            animationDuration: interpolation(this.size, Flake.minSize, Flake.maxSize, speedMax, speedMin) + 's'
        };
    };

    /**
     * Resize a flake.
     *
     * @param {number} containerHeight
     * @param {number} speed
     */


    Flake.prototype.resize = function resize(containerHeight, speed) {
        var props = this.getAnimationProps(containerHeight, speed);
        setStyle(this._elem, props);
    };

    /**
     * Destroy a flake.
     */


    Flake.prototype.destroy = function destroy() {
        delete this._elem;
    };

    return Flake;
}();

Flake.minSize = 8;
Flake.maxSize = 18;
Flake.minOpacity = 0.6;
Flake.maxOpacity = 1;
Flake.count = 9;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mainStyle = '.snowflakes_paused .snowflake,.snowflakes_paused .snowflake__inner,.snowflakes_paused .snowflake__inner:before{-webkit-animation-play-state:paused;animation-play-state:paused}.snowflakes_body{position:fixed;left:0;top:0;width:100%}.snowflake{position:absolute;margin:-21px 0 0;width:18px;height:18px;-webkit-animation:snowflake_y 10s infinite linear;animation:snowflake_y 10s infinite linear;will-change:transform}.snowflake__inner{position:absolute;left:0;right:0;top:0;bottom:0;-webkit-animation:snowflake_x_8 1s infinite alternate ease-in-out;animation:snowflake_x_8 1s infinite alternate ease-in-out}.snowflake__inner:before{position:absolute;left:0;right:0;top:0;bottom:0;content:\'\';background-size:100% 100%}.snowflake__inner_use-rotate:before{-webkit-animation:snowflake_rotate 2s infinite linear;animation:snowflake_rotate 2s infinite linear}.snowflake__inner_use-rotate-reverse:before{-webkit-animation:snowflake_rotate-reverse 2s infinite linear;animation:snowflake_rotate-reverse 2s infinite linear}.snowflake__inner_num_0:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAR5JREFUeNqsU9ERgjAMpZ4D1AlkAx0BN4ANcAJxAzZwBHQC3AA30A3QCXCD+nL3qjkO6Qfk7hlM0kfyGqIoYM65LVBEUw0kDdABdiqRkIglY3WL0FhwZ+ABvMdqDVsuWPwwxjwVUQ337QS5Ve9FCfNXw0ALFwNCkgEVcGTsQH/k+Q3wAtZsQGynb0ZEvQspNUmpT8245AvmO0Ji+ZAmqftZq9ApUm8nfXY5oNuewh44vxfZ8n/GZxu67pQtt/TeGjVOGSKpSFCr/bmr8ZzSrP1HkhP+QD6gkdawZI3td6ILPJGMcWIHBbupVVe+Y7vET8w9uQEXWS4u5hW5iDsl9kQs47Z78zeXhDTL1dvLub7+eK6vfzuVSMRvQnUfAQYAlDiqBKyfYxoAAAAASUVORK5CYII=)}.snowflake__inner_num_1:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNqcVNFVwkAQzPn85zrgOhArSKxArQCsAKkAqCAlQCoI6SBUgFRgqMBYQZyNs7DywBj3vXm5XCa7M7d3F0Ud0TRNAiy6eK4jyQSPMVADlXNuFvUNKgnADvgARsDrNf7t2c8jVg+AB3JgCcj8lJzA72+tJefqozV8TPH4pI0HJhAbj8CEdTbAlgUEA+AAxEj2rEo88N58xxPHC1pKgRxYcT6n7R35baEbVlOpM1oItBhR6Z7KRFUCrIASWFPdqWuihFaEWDFZyYSyRoXpoBYuYGttFWkIOeO4ZLXA+SnndL0yfosuJfKsWJt3G4cr8z/aX1F6YshSdUjLGVVV5HgqPSni/tEtoHbkxzlVbDnOTCFpQKxds4oCSffcRwPddIg7jmOzPqlRfUwkll7YVrVZUM3cLH5hFG84bpvgzo6IN0TPJHpEhqQtLx2R3w5t6HNo/3KNxFT3v2uk78X2JcAAER7UaQF92qUAAAAASUVORK5CYII=)}.snowflake__inner_num_2:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARNJREFUeNq0VIsRwUAUvNOAqAAVSAeUEBVIB+ggKqCDUEGiglABKkAFdHD2sY8bM/EZ8WZ2bi73bm/fvrsY8yacc1NgY34NkJzcLcJXebUPuA5P41cqMikHCIAYSPk9FYWliuhDAST8vgZawJRKjkKIMQJW3BNxT+ErSNwjRlSypz89rmfePPTyr0TWI4upYsBTF0DheSNrYyBgTi5Kgbm19lzm0YiK9lSTqj+0ISjtGjfIRodplydvgSawoyJVpmVnSlozFcWdCHUmQBuw7JrUHdKHDud6nySvAfTVn2rNrqL9WlqdKiZgn2GMeXLu2bDkOESONKGvl/PVE0m/fSJlRIG2lYTOm7f++hsxVf3YLgIMALFoWqycnmrfAAAAAElFTkSuQmCC)}.snowflake__inner_num_3:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXtJREFUeNqUlIFRwzAMRZMeA3gDwgSBCRomoJ2AdILCBmxQmKBlgnSDpBOknSBmgoYJgnR9BmECPXT3z7Uiy19fcpMksmEYsmi/UvwVM2rDyQqz7xRmXwra+NzFSK4rwVKCnaw90ATXsjgwjw+lI4z0wFqg6zPud8GloBTsBYs0Tfc/GEHVCw4w0CDVYUdStQWJNC7jwqn+lqS3KYlUk1qwMfR3sOjNxcos5xL1F7DbJJGIR1YVeMY+2BGffiu0Co0N5yfmtgxGd4IXQQWzwMjh21JuQ5mnRJK1prQcDQ4mQU+HHon3lPdK7BKW9QQtPIc9NzWGRWh7sIZmhMSeHJ8aad0VWrSRNlarELOyg2s1uqeUGzOY3nzv8c2IKdD1ayAl89oMm0ODKWuObrlpf0Hs9/ZDU9uemTEY8HfgAV8YDZXiCRKjT0QZtTDTm95g5ylL17mw6M+9tdJ0xzEzDl1cSCaJtuf+Rjrekd1X0Quokv+aamCfwm/2IcAAVp5PM2ba8ocAAAAASUVORK5CYII=)}.snowflake__inner_num_4:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAR5JREFUeNqsU9ERgjAMpZ4D1AlkAx0BN4ANcAJxAzZwBHQC3AA30A3QCXCD+nL3qjkO6Qfk7hlM0kfyGqIoYM65LVBEUw0kDdABdiqRkIglY3WL0FhwZ+ABvMdqDVsuWPwwxjwVUQ337QS5Ve9FCfNXw0ALFwNCkgEVcGTsQH/k+Q3wAtZsQGynb0ZEvQspNUmpT8245AvmO0Ji+ZAmqftZq9ApUm8nfXY5oNuewh44vxfZ8n/GZxu67pQtt/TeGjVOGSKpSFCr/bmr8ZzSrP1HkhP+QD6gkdawZI3td6ILPJGMcWIHBbupVVe+Y7vET8w9uQEXWS4u5hW5iDsl9kQs47Z78zeXhDTL1dvLub7+eK6vfzuVSMRvQnUfAQYAlDiqBKyfYxoAAAAASUVORK5CYII=)}.snowflake__inner_num_5:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNqcVNFVwkAQzPn85zrgOhArSKxArQCsAKkAqCAlQCoI6SBUgFRgqMBYQZyNs7DywBj3vXm5XCa7M7d3F0Ud0TRNAiy6eK4jyQSPMVADlXNuFvUNKgnADvgARsDrNf7t2c8jVg+AB3JgCcj8lJzA72+tJefqozV8TPH4pI0HJhAbj8CEdTbAlgUEA+AAxEj2rEo88N58xxPHC1pKgRxYcT6n7R35baEbVlOpM1oItBhR6Z7KRFUCrIASWFPdqWuihFaEWDFZyYSyRoXpoBYuYGttFWkIOeO4ZLXA+SnndL0yfosuJfKsWJt3G4cr8z/aX1F6YshSdUjLGVVV5HgqPSni/tEtoHbkxzlVbDnOTCFpQKxds4oCSffcRwPddIg7jmOzPqlRfUwkll7YVrVZUM3cLH5hFG84bpvgzo6IN0TPJHpEhqQtLx2R3w5t6HNo/3KNxFT3v2uk78X2JcAAER7UaQF92qUAAAAASUVORK5CYII=)}.snowflake__inner_num_6:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARNJREFUeNq0VIsRwUAUvNOAqAAVSAeUEBVIB+ggKqCDUEGiglABKkAFdHD2sY8bM/EZ8WZ2bi73bm/fvrsY8yacc1NgY34NkJzcLcJXebUPuA5P41cqMikHCIAYSPk9FYWliuhDAST8vgZawJRKjkKIMQJW3BNxT+ErSNwjRlSypz89rmfePPTyr0TWI4upYsBTF0DheSNrYyBgTi5Kgbm19lzm0YiK9lSTqj+0ISjtGjfIRodplydvgSawoyJVpmVnSlozFcWdCHUmQBuw7JrUHdKHDud6nySvAfTVn2rNrqL9WlqdKiZgn2GMeXLu2bDkOESONKGvl/PVE0m/fSJlRIG2lYTOm7f++hsxVf3YLgIMALFoWqycnmrfAAAAAElFTkSuQmCC)}.snowflake__inner_num_7:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAXtJREFUeNqUlIFRwzAMRZMeA3gDwgSBCRomoJ2AdILCBmxQmKBlgnSDpBOknSBmgoYJgnR9BmECPXT3z7Uiy19fcpMksmEYsmi/UvwVM2rDyQqz7xRmXwra+NzFSK4rwVKCnaw90ATXsjgwjw+lI4z0wFqg6zPud8GloBTsBYs0Tfc/GEHVCw4w0CDVYUdStQWJNC7jwqn+lqS3KYlUk1qwMfR3sOjNxcos5xL1F7DbJJGIR1YVeMY+2BGffiu0Co0N5yfmtgxGd4IXQQWzwMjh21JuQ5mnRJK1prQcDQ4mQU+HHon3lPdK7BKW9QQtPIc9NzWGRWh7sIZmhMSeHJ8aad0VWrSRNlarELOyg2s1uqeUGzOY3nzv8c2IKdD1ayAl89oMm0ODKWuObrlpf0Hs9/ZDU9uemTEY8HfgAV8YDZXiCRKjT0QZtTDTm95g5ylL17mw6M+9tdJ0xzEzDl1cSCaJtuf+Rjrekd1X0Quokv+aamCfwm/2IcAAVp5PM2ba8ocAAAAASUVORK5CYII=)}.snowflake__inner_num_8:before{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWNJREFUeNqcVNFVwkAQzPn85zrgOhArSKxArQCsAKkAqCAlQCoI6SBUgFRgqMBYQZyNs7DywBj3vXm5XCa7M7d3F0Ud0TRNAiy6eK4jyQSPMVADlXNuFvUNKgnADvgARsDrNf7t2c8jVg+AB3JgCcj8lJzA72+tJefqozV8TPH4pI0HJhAbj8CEdTbAlgUEA+AAxEj2rEo88N58xxPHC1pKgRxYcT6n7R35baEbVlOpM1oItBhR6Z7KRFUCrIASWFPdqWuihFaEWDFZyYSyRoXpoBYuYGttFWkIOeO4ZLXA+SnndL0yfosuJfKsWJt3G4cr8z/aX1F6YshSdUjLGVVV5HgqPSni/tEtoHbkxzlVbDnOTCFpQKxds4oCSffcRwPddIg7jmOzPqlRfUwkll7YVrVZUM3cLH5hFG84bpvgzo6IN0TPJHpEhqQtLx2R3w5t6HNo/3KNxFT3v2uk78X2JcAAER7UaQF92qUAAAAASUVORK5CYII=)}@-webkit-keyframes snowflake_rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes snowflake_rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes snowflake_rotate-reverse{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes snowflake_rotate-reverse{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}';

var Snowflakes = function () {
    /**
     * @constructor
     *
     * @param {Object} params
     *
     * @param {DOMElem} [params.container=document.body]
     * @param {number} [params.count=50]
     * @param {number} [params.speed=1]
     * @param {boolean} [useRotate=true]
     * @param {boolean} [useScale=true]
     * @param {number} [params.zIndex=9999]
     * @param {number} [params.width=width of container]
     * @param {number} [params.height=height of container]
     */
    function Snowflakes(params) {
        var _this = this;

        _classCallCheck(this, Snowflakes);

        this.params = this._setParams(params);

        this._flakes = [];
        this._isBody = this.params.container === document.body;

        var container = document.createElement('div');
        container.classList.add('snowflakes');
        this._isBody && container.classList.add('snowflakes_body');
        setStyle(container, { zIndex: this.params.zIndex });

        this.params.container.appendChild(container);
        this._container = container;

        if (!Snowflakes._mainStyleNode) {
            Snowflakes._mainStyleNode = this._injectStyle(mainStyle);
            Snowflakes._count = (Snowflakes._count || 0) + 1;
        }

        this._winHeight = this._getWindowHeight();
        this._onResize = function () {
            _this._winHeight = _this._getWindowHeight();
            var height = _this._height();
            setStyle(_this._container, { display: 'none' });
            _this._flakes.forEach(function (flake) {
                return flake.resize(height, _this.params.speed);
            });
            _this._updateAnimationStyle();
            setStyle(_this._container, { display: 'block' });
        };
        this._addAnimationStyle();
        window.addEventListener('resize', this._onResize, false);

        for (var i = 0; i < this.params.count; i++) {
            this._flakes.push(new Flake(container, this._height(), this.params));
        }
    }

    /**
     * Destroy flakes.
     */


    Snowflakes.prototype.destroy = function destroy() {
        this._removeStyle();

        this._container && this._container.parentNode.removeChild(this._container);
        delete this._container;

        window.removeEventListener('resize', this._onResize, false);

        this._flakes.forEach(function (flake) {
            return flake.destroy();
        });
        delete this._flakes;

        delete this.params;
    };

    /**
     * Start CSS animation.
     */


    Snowflakes.prototype.start = function start() {
        this._container.classList.remove('snowflakes_paused');
    };

    /**
     * Stop CSS animation.
     */


    Snowflakes.prototype.stop = function stop() {
        this._container.classList.add('snowflakes_paused');
    };

    Snowflakes.prototype._setParams = function _setParams(params) {
        params = params || {};

        return {
            container: params.container || document.body,
            count: params.count || 50,
            speed: params.speed || 1,
            zIndex: params.zIndex || 9999,
            useRotate: 'useRotate' in params ? params.useRotate : true,
            useScale: 'useScale' in params ? params.useScale : true,
            width: params.width,
            height: params.height
        };
    };

    Snowflakes.prototype._getAnimationStyle = function _getAnimationStyle() {
        var maxSize = Flake.maxSize,
            minSize = Flake.minSize,
            height = this._height() + maxSize + 'px';

        var css = '@-webkit-keyframes snowflake_y{from{-webkit-transform:translateY(0px)}to{-webkit-transform:translateY(' + height + ');}}\n@keyframes snowflake_y{from{transform:translateY(0px)}to{transform:translateY(' + height + ')}}';

        for (var i = minSize; i <= maxSize; i++) {
            var left = (i - minSize) * 4 + 'px';
            css += '@-webkit-keyframes snowflake_x_' + i + '{from{-webkit-transform:translateX(0px)}to{-webkit-transform:translateX(' + left + ');}}\n@keyframes snowflake_x_' + i + '{from{transform:translateX(0px)}to{transform:translateX(' + left + ')}}';
        }

        return css;
    };

    Snowflakes.prototype._addAnimationStyle = function _addAnimationStyle() {
        this._animationStyleNode = this._injectStyle(this._getAnimationStyle());
    };

    Snowflakes.prototype._updateAnimationStyle = function _updateAnimationStyle() {
        this._injectStyle(this._getAnimationStyle(), this._animationStyleNode);
    };

    Snowflakes.prototype._injectStyle = function _injectStyle(style, styleNode) {
        if (!styleNode) {
            styleNode = document.createElement('style');
            document.body.appendChild(styleNode);
        }

        if (styleNode.styleSheet) {
            // IE
            styleNode.styleSheet.cssText = style;
        } else if ('textContent' in styleNode) {
            styleNode.textContent = style;
        } else {
            styleNode.innerHTML = style;
        }

        return styleNode;
    };

    Snowflakes.prototype._removeStyle = function _removeStyle() {
        Snowflakes._count--;
        if (Snowflakes._count <= 0) {
            Snowflakes._count = 0;
            if (Snowflakes._mainStyleNode) {
                Snowflakes._mainStyleNode.parentNode.removeChild(Snowflakes._mainStyleNode);
                delete Snowflakes._mainStyleNode;
            }
        }

        this._animationStyleNode.parentNode.removeChild(this._animationStyleNode);
        delete this._animationStyleNode;
    };

    Snowflakes.prototype._height = function _height() {
        return this.params.height || (this._isBody ? this._winHeight : this.params.container.offsetHeight + Flake.maxSize);
    };

    Snowflakes.prototype._getWindowHeight = function _getWindowHeight() {
        var body = document.body,
            docElement = document.documentElement;

        var height = void 0;

        if (window.innerHeight) {
            height = window.innerHeight;
        } else if (docElement && docElement.clientHeight) {
            height = docElement.clientHeight;
        } else if (body) {
            height = body.clientHeight;
        }

        return height;
    };

    return Snowflakes;
}();

var snowflakes = function (params) {
    return new Snowflakes(params);
};

return snowflakes;

})));
