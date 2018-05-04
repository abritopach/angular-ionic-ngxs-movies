(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-home-home-module"],{

/***/ "./node_modules/izitoast/dist/js/iziToast.js":
/*!***************************************************!*\
  !*** ./node_modules/izitoast/dist/js/iziToast.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* iziToast | v1.3.0
* http://izitoast.marcelodolce.com
* by Marcelo Dolce.
*/
(function (root, factory) {
	if(true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory(root)),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
})(typeof global !== 'undefined' ? global : window || this.window || this.global, function (root) {

	'use strict';

	//
	// Variables
	//
	var $iziToast = {},
		PLUGIN_NAME = 'iziToast',
		BODY = document.querySelector('body'),
		ISMOBILE = (/Mobi/.test(navigator.userAgent)) ? true : false,
		ISCHROME = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
		ISFIREFOX = typeof InstallTrigger !== 'undefined',
		ACCEPTSTOUCH = 'ontouchstart' in document.documentElement,
		POSITIONS = ['bottomRight','bottomLeft','bottomCenter','topRight','topLeft','topCenter','center'],
		THEMES = {
			info: {
				color: 'blue',
				icon: 'ico-info'
			},
			success: {
				color: 'green',
				icon: 'ico-success'
			},
			warning: {
				color: 'orange',
				icon: 'ico-warning'
			},
			error: {
				color: 'red',
				icon: 'ico-error'
			},
			question: {
				color: 'yellow',
				icon: 'ico-question'
			}
		},
		MOBILEWIDTH = 568,
		CONFIG = {};

	$iziToast.children = {};

	// Default settings
	var defaults = {
		id: null, 
		class: '',
		title: '',
		titleColor: '',
		titleSize: '',
		titleLineHeight: '',
		message: '',
		messageColor: '',
		messageSize: '',
		messageLineHeight: '',
		backgroundColor: '',
		theme: 'light', // dark
		color: '', // blue, red, green, yellow
		icon: '',
		iconText: '',
		iconColor: '',
		image: '',
		imageWidth: 50,
		maxWidth: null,
		zindex: null,
		layout: 1,
		balloon: false,
		close: true,
		closeOnEscape: false,
		closeOnClick: false,
		rtl: false,
		position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
		target: '',
		targetFirst: true,
		toastOnce: false,
		timeout: 5000,
		animateInside: true,
		drag: true,
		pauseOnHover: true,
		resetOnHover: false,
		progressBar: true,
		progressBarColor: '',
		progressBarEasing: 'linear',
		overlay: false,
		overlayClose: false,
		overlayColor: 'rgba(0, 0, 0, 0.6)',
		transitionIn: 'fadeInUp', // bounceInLeft, bounceInRight, bounceInUp, bounceInDown, fadeIn, fadeInDown, fadeInUp, fadeInLeft, fadeInRight, flipInX
		transitionOut: 'fadeOut', // fadeOut, fadeOutUp, fadeOutDown, fadeOutLeft, fadeOutRight, flipOutX
		transitionInMobile: 'fadeInUp',
		transitionOutMobile: 'fadeOutDown',
		buttons: {},
		inputs: {},
		onOpening: function () {},
		onOpened: function () {},
		onClosing: function () {},
		onClosed: function () {}
	};

	//
	// Methods
	//


	/**
	 * Polyfill for remove() method
	 */
	if(!('remove' in Element.prototype)) {
	    Element.prototype.remove = function() {
	        if(this.parentNode) {
	            this.parentNode.removeChild(this);
	        }
	    };
	}

	/*
     * Polyfill for CustomEvent for IE >= 9
     * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
     */
    if(typeof window.CustomEvent !== 'function') {
        var CustomEventPolyfill = function (event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        CustomEventPolyfill.prototype = window.Event.prototype;

        window.CustomEvent = CustomEventPolyfill;
    }

	/**
	 * A simple forEach() implementation for Arrays, Objects and NodeLists
	 * @private
	 * @param {Array|Object|NodeList} collection Collection of items to iterate
	 * @param {Function} callback Callback function for each iteration
	 * @param {Array|Object|NodeList} scope Object/NodeList/Array that forEach is iterating over (aka `this`)
	 */
	var forEach = function (collection, callback, scope) {
		if(Object.prototype.toString.call(collection) === '[object Object]') {
			for (var prop in collection) {
				if(Object.prototype.hasOwnProperty.call(collection, prop)) {
					callback.call(scope, collection[prop], prop, collection);
				}
			}
		} else {
			if(collection){
				for (var i = 0, len = collection.length; i < len; i++) {
					callback.call(scope, collection[i], i, collection);
				}
			}
		}
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	var extend = function (defaults, options) {
		var extended = {};
		forEach(defaults, function (value, prop) {
			extended[prop] = defaults[prop];
		});
		forEach(options, function (value, prop) {
			extended[prop] = options[prop];
		});
		return extended;
	};


	/**
	 * Create a fragment DOM elements
	 * @private
	 */
	var createFragElem = function(htmlStr) {
		var frag = document.createDocumentFragment(),
			temp = document.createElement('div');
		temp.innerHTML = htmlStr;
		while (temp.firstChild) {
			frag.appendChild(temp.firstChild);
		}
		return frag;
	};


	/**
	 * Check if is a color
	 * @private
	 */
	var isColor = function(color){
		if( color.substring(0,1) == '#' || color.substring(0,3) == 'rgb' || color.substring(0,3) == 'hsl' ){
			return true;
		} else {
			return false;
		}
	};


	/**
	 * Check if is a Base64 string
	 * @private
	 */
	var isBase64 = function(str) {
	    try {
	        return btoa(atob(str)) == str;
	    } catch (err) {
	        return false;
	    }
	};


	/**
	 * Drag method of toasts
	 * @private
	 */
	var drag = function() {
	    
	    return {
	        move: function(toast, instance, settings, xpos) {

	        	var opacity,
	        		opacityRange = 0.3,
	        		distance = 180;
	            
	            if(xpos !== 0){
	            	
	            	toast.classList.add(PLUGIN_NAME+'-dragged');

	            	toast.style.transform = 'translateX('+xpos + 'px)';

		            if(xpos > 0){
		            	opacity = (distance-xpos) / distance;
		            	if(opacity < opacityRange){
							instance.hide(extend(settings, { transitionOut: 'fadeOutRight', transitionOutMobile: 'fadeOutRight' }), toast, 'drag');
						}
		            } else {
		            	opacity = (distance+xpos) / distance;
		            	if(opacity < opacityRange){
							instance.hide(extend(settings, { transitionOut: 'fadeOutLeft', transitionOutMobile: 'fadeOutLeft' }), toast, 'drag');
						}
		            }
					toast.style.opacity = opacity;
			
					if(opacity < opacityRange){

						if(ISCHROME || ISFIREFOX)
							toast.style.left = xpos+'px';

						toast.parentNode.style.opacity = opacityRange;

		                this.stopMoving(toast, null);
					}
	            }

				
	        },
	        startMoving: function(toast, instance, settings, e) {

	            e = e || window.event;
	            var posX = ((ACCEPTSTOUCH) ? e.touches[0].clientX : e.clientX),
	                toastLeft = toast.style.transform.replace('px)', '');
	                toastLeft = toastLeft.replace('translateX(', '');
	            var offsetX = posX - toastLeft;

				toast.classList.remove(settings.transitionIn);
				toast.classList.remove(settings.transitionInMobile);
				toast.style.transition = '';

	            if(ACCEPTSTOUCH) {
	                document.ontouchmove = function(e) {
	                    e.preventDefault();
	                    e = e || window.event;
	                    var posX = e.touches[0].clientX,
	                        finalX = posX - offsetX;
                        drag.move(toast, instance, settings, finalX);
	                };
	            } else {
	                document.onmousemove = function(e) {
	                    e.preventDefault();
	                    e = e || window.event;
	                    var posX = e.clientX,
	                        finalX = posX - offsetX;
                        drag.move(toast, instance, settings, finalX);
	                };
	            }

	        },
	        stopMoving: function(toast, e) {

	            if(ACCEPTSTOUCH) {
	                document.ontouchmove = function() {};
	            } else {
	            	document.onmousemove = function() {};
	            }

				toast.style.opacity = '';
				toast.style.transform = '';

	            if(toast.classList.contains(PLUGIN_NAME+'-dragged')){
	            	
	            	toast.classList.remove(PLUGIN_NAME+'-dragged');

					toast.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
					setTimeout(function() {
						toast.style.transition = '';
					}, 400);
	            }

	        }
	    };

	}();





	$iziToast.setSetting = function (ref, option, value) {

		$iziToast.children[ref][option] = value;

	};


	$iziToast.getSetting = function (ref, option) {

		return $iziToast.children[ref][option];

	};


	/**
	 * Destroy the current initialization.
	 * @public
	 */
	$iziToast.destroy = function () {

		forEach(document.querySelectorAll('.'+PLUGIN_NAME+'-wrapper'), function(element, index) {
			element.remove();
		});

		forEach(document.querySelectorAll('.'+PLUGIN_NAME), function(element, index) {
			element.remove();
		});

		// Remove event listeners
		document.removeEventListener(PLUGIN_NAME+'-opened', {}, false);
		document.removeEventListener(PLUGIN_NAME+'-opening', {}, false);
		document.removeEventListener(PLUGIN_NAME+'-closing', {}, false);
		document.removeEventListener(PLUGIN_NAME+'-closed', {}, false);
		document.removeEventListener('keyup', {}, false);

		// Reset variables
		CONFIG = {};
	};

	/**
	 * Initialize Plugin
	 * @public
	 * @param {Object} options User settings
	 */
	$iziToast.settings = function (options) {

		// Destroy any existing initializations
		$iziToast.destroy();

		CONFIG = options;
		defaults = extend(defaults, options || {});
	};


	/**
	 * Building themes functions.
	 * @public
	 * @param {Object} options User settings
	 */
	forEach(THEMES, function (theme, name) {

		$iziToast[name] = function (options) {

			var settings = extend(CONFIG, options || {});
			settings = extend(theme, settings || {});

			this.show(settings);
		};

	});


	/**
	 * Do the calculation to move the progress bar
	 * @private
	 */
	$iziToast.progress = function (options, $toast, callback) {


		var that = this,
			ref = $toast.getAttribute('data-iziToast-ref'),
			settings = extend(this.children[ref], options || {}),
			$elem = $toast.querySelector('.'+PLUGIN_NAME+'-progressbar div');

	    return {
	        start: function() {

	        	if(typeof settings.time.REMAINING == 'undefined'){

	        		$toast.classList.remove(PLUGIN_NAME+'-reseted');

		        	if($elem !== null){
						$elem.style.transition = 'width '+ settings.timeout +'ms '+settings.progressBarEasing;
						$elem.style.width = '0%';
					}

		        	settings.time.START = new Date().getTime();
		        	settings.time.END = settings.time.START + settings.timeout;
					settings.time.TIMER = setTimeout(function() {

						clearTimeout(settings.time.TIMER);

						if(!$toast.classList.contains(PLUGIN_NAME+'-closing')){

							that.hide(settings, $toast, 'timeout');

							if(typeof callback === 'function'){
								callback.apply(that);
							}
						}

					}, settings.timeout);			
		        	that.setSetting(ref, 'time', settings.time);
	        	}
	        },
	        pause: function() {

	        	if(typeof settings.time.START !== 'undefined' && !$toast.classList.contains(PLUGIN_NAME+'-paused') && !$toast.classList.contains(PLUGIN_NAME+'-reseted')){

        			$toast.classList.add(PLUGIN_NAME+'-paused');

					settings.time.REMAINING = settings.time.END - new Date().getTime();

					clearTimeout(settings.time.TIMER);

					that.setSetting(ref, 'time', settings.time);

					if($elem !== null){
						var computedStyle = window.getComputedStyle($elem),
							propertyWidth = computedStyle.getPropertyValue('width');

						$elem.style.transition = 'none';
						$elem.style.width = propertyWidth;					
					}

					if(typeof callback === 'function'){
						setTimeout(function() {
							callback.apply(that);						
						}, 10);
					}
        		}
	        },
	        resume: function() {

				if(typeof settings.time.REMAINING !== 'undefined'){

					$toast.classList.remove(PLUGIN_NAME+'-paused');

		        	if($elem !== null){
						$elem.style.transition = 'width '+ settings.time.REMAINING +'ms '+settings.progressBarEasing;
						$elem.style.width = '0%';
					}

		        	settings.time.END = new Date().getTime() + settings.time.REMAINING;
					settings.time.TIMER = setTimeout(function() {

						clearTimeout(settings.time.TIMER);

						if(!$toast.classList.contains(PLUGIN_NAME+'-closing')){

							that.hide(settings, $toast, 'timeout');

							if(typeof callback === 'function'){
								callback.apply(that);
							}
						}


					}, settings.time.REMAINING);

					that.setSetting(ref, 'time', settings.time);
				} else {
					this.start();
				}
	        },
	        reset: function(){

				clearTimeout(settings.time.TIMER);

				delete settings.time.REMAINING;

				that.setSetting(ref, 'time', settings.time);

				$toast.classList.add(PLUGIN_NAME+'-reseted');

				$toast.classList.remove(PLUGIN_NAME+'-paused');

				if($elem !== null){
					$elem.style.transition = 'none';
					$elem.style.width = '100%';
				}

				if(typeof callback === 'function'){
					setTimeout(function() {
						callback.apply(that);						
					}, 10);
				}
	        }
	    };

	};


	/**
	 * Close the specific Toast
	 * @public
	 * @param {Object} options User settings
	 */
	$iziToast.hide = function (options, $toast, closedBy) {

		var that = this,
			settings = extend(this.children[$toast.getAttribute('data-iziToast-ref')], options || {});
			settings.closedBy = closedBy || null;

		delete settings.time.REMAINING;

		if(typeof $toast != 'object'){
			$toast = document.querySelector($toast);
		}		

		$toast.classList.add(PLUGIN_NAME+'-closing');

		// Overlay
		(function(){

			var $overlay = document.querySelector('.'+PLUGIN_NAME+'-overlay');
			if($overlay !== null){
				var refs = $overlay.getAttribute('data-iziToast-ref');		
					refs = refs.split(',');
				var index = refs.indexOf(String(settings.ref));

				if(index !== -1){
					refs.splice(index, 1);			
				}
				$overlay.setAttribute('data-iziToast-ref', refs.join());

				if(refs.length === 0){
					$overlay.classList.remove('fadeIn');
					$overlay.classList.add('fadeOut');
					setTimeout(function() {
						$overlay.remove();
					}, 700);
				}
			}

		})();

		if(settings.transitionIn || settings.transitionInMobile){
			$toast.classList.remove(settings.transitionIn);
			$toast.classList.remove(settings.transitionInMobile);
		}

		if(ISMOBILE || window.innerWidth <= MOBILEWIDTH){
			if(settings.transitionOutMobile)
				$toast.classList.add(settings.transitionOutMobile);
		} else {
			if(settings.transitionOut)
				$toast.classList.add(settings.transitionOut);
		}
		var H = $toast.parentNode.offsetHeight;
				$toast.parentNode.style.height = H+'px';
				$toast.style.pointerEvents = 'none';
		
		if(!ISMOBILE || window.innerWidth > MOBILEWIDTH){
			$toast.parentNode.style.transitionDelay = '0.2s';
		}

		try {
			var event = new CustomEvent(PLUGIN_NAME+'-closing', {detail: settings, bubbles: true, cancelable: true});
			document.dispatchEvent(event);
		} catch(ex){
			console.warn(ex);
		}

		setTimeout(function() {
			
			$toast.parentNode.style.height = '0px';
			$toast.parentNode.style.overflow = '';

			setTimeout(function(){
				
				delete that.children[settings.ref];

				$toast.parentNode.remove();

				try {
					var event = new CustomEvent(PLUGIN_NAME+'-closed', {detail: settings, bubbles: true, cancelable: true});
					document.dispatchEvent(event);
				} catch(ex){
					console.warn(ex);
				}

				if(typeof settings.onClosed !== 'undefined'){
					settings.onClosed.apply(null, [settings, $toast, closedBy]);
				}

			}, 1000);
		}, 200);


		if(typeof settings.onClosing !== 'undefined'){
			settings.onClosing.apply(null, [settings, $toast, closedBy]);
		}
	};

	/**
	 * Create and show the Toast
	 * @public
	 * @param {Object} options User settings
	 */
	$iziToast.show = function (options) {

		var that = this;

		// Merge user options with defaults
		var settings = extend(CONFIG, options || {});
			settings = extend(defaults, settings);
			settings.time = {};

		if(settings.toastOnce && settings.id && document.querySelectorAll('.'+PLUGIN_NAME+'#'+settings.id).length > 0){
			return false;
		}

		settings.ref = new Date().getTime() + Math.floor((Math.random() * 10000000) + 1);

		$iziToast.children[settings.ref] = settings;

		var $DOM = {
			body: document.querySelector('body'),
			overlay: document.createElement('div'),
			toast: document.createElement('div'),
			toastBody: document.createElement('div'),
			toastTexts: document.createElement('div'),
			toastCapsule: document.createElement('div'),
			icon: document.createElement('i'),
			cover: document.createElement('div'),
			buttons: document.createElement('div'),
			inputs: document.createElement('div'),
			wrapper: null
		};

		$DOM.toast.setAttribute('data-iziToast-ref', settings.ref);
		$DOM.toast.appendChild($DOM.toastBody);
		$DOM.toastCapsule.appendChild($DOM.toast);

		// CSS Settings
		(function(){

			$DOM.toast.classList.add(PLUGIN_NAME);
			$DOM.toast.classList.add(PLUGIN_NAME+'-opening');
			$DOM.toastCapsule.classList.add(PLUGIN_NAME+'-capsule');
			$DOM.toastBody.classList.add(PLUGIN_NAME + '-body');
			$DOM.toastTexts.classList.add(PLUGIN_NAME + '-texts');

			if(ISMOBILE || window.innerWidth <= MOBILEWIDTH){
				if(settings.transitionInMobile)
					$DOM.toast.classList.add(settings.transitionInMobile);
			} else {
				if(settings.transitionIn)
					$DOM.toast.classList.add(settings.transitionIn);
			}

			if(settings.class){
				var classes = settings.class.split(' ');
				forEach(classes, function (value, index) {
					$DOM.toast.classList.add(value);
				});
			}

			if(settings.id){ $DOM.toast.id = settings.id; }

			if(settings.rtl){
				$DOM.toast.classList.add(PLUGIN_NAME + '-rtl');
				$DOM.toast.setAttribute('dir', 'rtl');
			}

			if(settings.layout > 1){ $DOM.toast.classList.add(PLUGIN_NAME+'-layout'+settings.layout); }

			if(settings.balloon){ $DOM.toast.classList.add(PLUGIN_NAME+'-balloon'); }

			if(settings.maxWidth){
				if( !isNaN(settings.maxWidth) ){
					$DOM.toast.style.maxWidth = settings.maxWidth+'px';
				} else {
					$DOM.toast.style.maxWidth = settings.maxWidth;
				}
			}

			if(settings.theme !== '' || settings.theme !== 'light') {

				$DOM.toast.classList.add(PLUGIN_NAME+'-theme-'+settings.theme);
			}

			if(settings.color) { //#, rgb, rgba, hsl
				
				if( isColor(settings.color) ){
					$DOM.toast.style.background = settings.color;
				} else {
					$DOM.toast.classList.add(PLUGIN_NAME+'-color-'+settings.color);
				}
			}

			if(settings.backgroundColor) {
				$DOM.toast.style.background = settings.backgroundColor;
				if(settings.balloon){
					$DOM.toast.style.borderColor = settings.backgroundColor;				
				}
			}
		})();

		// Cover image
		(function(){
			if(settings.image) {
				$DOM.cover.classList.add(PLUGIN_NAME + '-cover');
				$DOM.cover.style.width = settings.imageWidth + 'px';

				if(isBase64(settings.image.replace(/ /g,''))){
					$DOM.cover.style.backgroundImage = 'url(data:image/png;base64,' + settings.image.replace(/ /g,'') + ')';
				} else {
					$DOM.cover.style.backgroundImage = 'url(' + settings.image + ')';
				}

				if(settings.rtl){
					$DOM.toastBody.style.marginRight = (settings.imageWidth + 10) + 'px';
				} else {
					$DOM.toastBody.style.marginLeft = (settings.imageWidth + 10) + 'px';				
				}
				$DOM.toast.appendChild($DOM.cover);
			}
		})();

		// Button close
		(function(){
			if(settings.close){
				
				$DOM.buttonClose = document.createElement('button');

				$DOM.buttonClose.classList.add(PLUGIN_NAME + '-close');
				$DOM.buttonClose.addEventListener('click', function (e) {
					var button = e.target;
					that.hide(settings, $DOM.toast, 'button');
				});
				$DOM.toast.appendChild($DOM.buttonClose);
			} else {
				if(settings.rtl){
					$DOM.toast.style.paddingLeft = '18px';
				} else {
					$DOM.toast.style.paddingRight = '18px';
				}
			}
		})();

		// Progress Bar & Timeout
		(function(){

			if(settings.progressBar){
				$DOM.progressBar = document.createElement('div');
				$DOM.progressBarDiv = document.createElement('div');
				$DOM.progressBar.classList.add(PLUGIN_NAME + '-progressbar');
				$DOM.progressBarDiv.style.background = settings.progressBarColor;
				$DOM.progressBar.appendChild($DOM.progressBarDiv);
				$DOM.toast.appendChild($DOM.progressBar);
			}

			if(settings.timeout) {

				if(settings.pauseOnHover && !settings.resetOnHover){
					
					$DOM.toast.addEventListener('mouseenter', function (e) {
						that.progress(settings, $DOM.toast).pause();
					});
					$DOM.toast.addEventListener('mouseleave', function (e) {
						that.progress(settings, $DOM.toast).resume();
					});
				}

				if(settings.resetOnHover){

					$DOM.toast.addEventListener('mouseenter', function (e) {
						that.progress(settings, $DOM.toast).reset();
					});
					$DOM.toast.addEventListener('mouseleave', function (e) {
						that.progress(settings, $DOM.toast).start();
					});
				}
			}
		})();

		// Icon
		(function(){
			if(settings.icon) {
				$DOM.icon.setAttribute('class', PLUGIN_NAME + '-icon ' + settings.icon);
				
				if(settings.iconText){
					$DOM.icon.appendChild(document.createTextNode(settings.iconText));
				}

				if(settings.rtl){
					$DOM.toastBody.style.paddingRight = '33px';
				} else {
					$DOM.toastBody.style.paddingLeft = '33px';				
				}
				
				if(settings.iconColor){
					$DOM.icon.style.color = settings.iconColor;
				}
				$DOM.toastBody.appendChild($DOM.icon);
			}
		})();

		// Title & Message
		(function(){
			if(settings.title.length > 0) {

				$DOM.strong = document.createElement('strong');
				$DOM.strong.classList.add(PLUGIN_NAME + '-title');
				$DOM.strong.appendChild(createFragElem(settings.title));
				$DOM.toastTexts.appendChild($DOM.strong);

				if(settings.titleColor) {
					$DOM.strong.style.color = settings.titleColor;
				}
				if(settings.titleSize) {
					if( !isNaN(settings.titleSize) ){
						$DOM.strong.style.fontSize = settings.titleSize+'px';
					} else {
						$DOM.strong.style.fontSize = settings.titleSize;
					}
				}
				if(settings.titleLineHeight) {
					if( !isNaN(settings.titleSize) ){
						$DOM.strong.style.lineHeight = settings.titleLineHeight+'px';
					} else {
						$DOM.strong.style.lineHeight = settings.titleLineHeight;
					}
				}
			}

			if(settings.message.length > 0) {

				$DOM.p = document.createElement('p');
				$DOM.p.classList.add(PLUGIN_NAME + '-message');
				$DOM.p.appendChild(createFragElem(settings.message));
				$DOM.toastTexts.appendChild($DOM.p);

				if(settings.messageColor) {
					$DOM.p.style.color = settings.messageColor;
				}
				if(settings.messageSize) {
					if( !isNaN(settings.titleSize) ){
						$DOM.p.style.fontSize = settings.messageSize+'px';
					} else {
						$DOM.p.style.fontSize = settings.messageSize;
					}
				}
				if(settings.messageLineHeight) {
					
					if( !isNaN(settings.titleSize) ){
						$DOM.p.style.lineHeight = settings.messageLineHeight+'px';
					} else {
						$DOM.p.style.lineHeight = settings.messageLineHeight;
					}
				}
			}

			if(settings.title.length > 0 && settings.message.length > 0) {
				if(settings.rtl){
					$DOM.strong.style.marginLeft = '10px';
				} else if(settings.layout !== 2 && !settings.rtl) {
					$DOM.strong.style.marginRight = '10px';	
				}
			}
		})();

		$DOM.toastBody.appendChild($DOM.toastTexts);

		// Inputs
		var $inputs;
		(function(){
			if(settings.inputs.length > 0) {

				$DOM.inputs.classList.add(PLUGIN_NAME + '-inputs');

				forEach(settings.inputs, function (value, index) {
					$DOM.inputs.appendChild(createFragElem(value[0]));

					$inputs = $DOM.inputs.childNodes;

					$inputs[index].classList.add(PLUGIN_NAME + '-inputs-child');

					if(value[3]){
						setTimeout(function() {
							$inputs[index].focus();
						}, 300);
					}

					$inputs[index].addEventListener(value[1], function (e) {
						var ts = value[2];
						return ts(that, $DOM.toast, this, e);
					});
				});
				$DOM.toastBody.appendChild($DOM.inputs);
			}
		})();

		// Buttons
		(function(){
			if(settings.buttons.length > 0) {

				$DOM.buttons.classList.add(PLUGIN_NAME + '-buttons');

				forEach(settings.buttons, function (value, index) {
					$DOM.buttons.appendChild(createFragElem(value[0]));

					var $btns = $DOM.buttons.childNodes;

					$btns[index].classList.add(PLUGIN_NAME + '-buttons-child');

					if(value[2]){
						setTimeout(function() {
							$btns[index].focus();
						}, 300);
					}

					$btns[index].addEventListener('click', function (e) {
						e.preventDefault();
						var ts = value[1];
						return ts(that, $DOM.toast, this, e, $inputs);
					});
				});
			}
			$DOM.toastBody.appendChild($DOM.buttons);
		})();

		if(settings.message.length > 0 && (settings.inputs.length > 0 || settings.buttons.length > 0)) {
			$DOM.p.style.marginBottom = '0';
		}

		if(settings.inputs.length > 0 || settings.buttons.length > 0){
			if(settings.rtl){
				$DOM.toastTexts.style.marginLeft = '10px';
			} else {
				$DOM.toastTexts.style.marginRight = '10px';
			}
			if(settings.inputs.length > 0 && settings.buttons.length > 0){
				if(settings.rtl){
					$DOM.inputs.style.marginLeft = '8px';
				} else {
					$DOM.inputs.style.marginRight = '8px';
				}
			}
		}

		// Wrap
		(function(){
			$DOM.toastCapsule.style.visibility = 'hidden';
			setTimeout(function() {
				var H = $DOM.toast.offsetHeight;
				var style = $DOM.toast.currentStyle || window.getComputedStyle($DOM.toast);
				var marginTop = style.marginTop;
					marginTop = marginTop.split('px');
					marginTop = parseInt(marginTop[0]);
				var marginBottom = style.marginBottom;
					marginBottom = marginBottom.split('px');
					marginBottom = parseInt(marginBottom[0]);

				$DOM.toastCapsule.style.visibility = '';
				$DOM.toastCapsule.style.height = (H+marginBottom+marginTop)+'px';

				setTimeout(function() {
					$DOM.toastCapsule.style.height = 'auto';
					if(settings.target){
						$DOM.toastCapsule.style.overflow = 'visible';
					}
				}, 500);

				if(settings.timeout) {
					that.progress(settings, $DOM.toast).start();
				}
			}, 100);
		})();

		// Target
		(function(){
			var position = settings.position;

			if(settings.target){

				$DOM.wrapper = document.querySelector(settings.target);
				$DOM.wrapper.classList.add(PLUGIN_NAME + '-target');

				if(settings.targetFirst) {
					$DOM.wrapper.insertBefore($DOM.toastCapsule, $DOM.wrapper.firstChild);
				} else {
					$DOM.wrapper.appendChild($DOM.toastCapsule);
				}

			} else {

				if( POSITIONS.indexOf(settings.position) == -1 ){
					console.warn('['+PLUGIN_NAME+'] Incorrect position.\nIt can be › ' + POSITIONS);
					return;
				}

				if(ISMOBILE || window.innerWidth <= MOBILEWIDTH){
					if(settings.position == 'bottomLeft' || settings.position == 'bottomRight' || settings.position == 'bottomCenter'){
						position = PLUGIN_NAME+'-wrapper-bottomCenter';
					}
					else if(settings.position == 'topLeft' || settings.position == 'topRight' || settings.position == 'topCenter'){
						position = PLUGIN_NAME+'-wrapper-topCenter';
					}
					else {
						position = PLUGIN_NAME+'-wrapper-center';
					}
				} else {
					position = PLUGIN_NAME+'-wrapper-'+position;
				}
				$DOM.wrapper = document.querySelector('.' + PLUGIN_NAME + '-wrapper.'+position);

				if(!$DOM.wrapper) {
					$DOM.wrapper = document.createElement('div');
					$DOM.wrapper.classList.add(PLUGIN_NAME + '-wrapper');
					$DOM.wrapper.classList.add(position);
					document.body.appendChild($DOM.wrapper);
				}
				if(settings.position == 'topLeft' || settings.position == 'topCenter' || settings.position == 'topRight'){
					$DOM.wrapper.insertBefore($DOM.toastCapsule, $DOM.wrapper.firstChild);
				} else {
					$DOM.wrapper.appendChild($DOM.toastCapsule);
				}
			}

			if(!isNaN(settings.zindex)) {
				$DOM.wrapper.style.zIndex = settings.zindex;
			} else {
				console.warn('['+PLUGIN_NAME+'] Invalid zIndex.');
			}
		})();

		// Overlay
		(function(){

			if(settings.overlay) {

				if( document.querySelector('.'+PLUGIN_NAME+'-overlay.fadeIn') !== null ){

					$DOM.overlay = document.querySelector('.'+PLUGIN_NAME+'-overlay');
					$DOM.overlay.setAttribute('data-iziToast-ref', $DOM.overlay.getAttribute('data-iziToast-ref') + ',' + settings.ref);

					if(!isNaN(settings.zindex) && settings.zindex !== null) {
						$DOM.overlay.style.zIndex = settings.zindex-1;
					}

				} else {

					$DOM.overlay.classList.add(PLUGIN_NAME+'-overlay');
					$DOM.overlay.classList.add('fadeIn');
					$DOM.overlay.style.background = settings.overlayColor;
					$DOM.overlay.setAttribute('data-iziToast-ref', settings.ref);
					if(!isNaN(settings.zindex) && settings.zindex !== null) {
						$DOM.overlay.style.zIndex = settings.zindex-1;
					}
					document.querySelector('body').appendChild($DOM.overlay);
				}

				if(settings.overlayClose) {

					$DOM.overlay.removeEventListener('click', {});
					$DOM.overlay.addEventListener('click', function (e) {
						that.hide(settings, $DOM.toast, 'overlay');
					});
				} else {
					$DOM.overlay.removeEventListener('click', {});
				}

			}

		})();

		// Inside animations
		(function(){
			if(settings.animateInside){
				$DOM.toast.classList.add(PLUGIN_NAME+'-animateInside');
			
				var animationTimes = [200, 100, 300];
				if(settings.transitionIn == 'bounceInLeft' || settings.transitionIn == 'bounceInRight'){
					animationTimes = [400, 200, 400];
				}

				if(settings.title.length > 0) {
					setTimeout(function(){
						$DOM.strong.classList.add('slideIn');
					}, animationTimes[0]);
				}

				if(settings.message.length > 0) {
					setTimeout(function(){
						$DOM.p.classList.add('slideIn');
					}, animationTimes[1]);
				}

				if(settings.icon) {
					setTimeout(function(){
						$DOM.icon.classList.add('revealIn');
					}, animationTimes[2]);
				}

				var counter = 150;
				if(settings.buttons.length > 0 && $DOM.buttons) {

					setTimeout(function(){

						forEach($DOM.buttons.childNodes, function(element, index) {

							setTimeout(function(){
								element.classList.add('revealIn');
							}, counter);
							counter = counter + 150;
						});

					}, settings.inputs.length > 0 ? 150 : 0);
				}

				if(settings.inputs.length > 0 && $DOM.inputs) {
					counter = 150;
					forEach($DOM.inputs.childNodes, function(element, index) {

						setTimeout(function(){
							element.classList.add('revealIn');
						}, counter);
						counter = counter + 150;
					});
				}
			}
		})();

		settings.onOpening.apply(null, [settings, $DOM.toast]);

		try {
			var event = new CustomEvent(PLUGIN_NAME + '-opening', {detail: settings, bubbles: true, cancelable: true});
			document.dispatchEvent(event);
		} catch(ex){
			console.warn(ex);
		}

		setTimeout(function() {

			$DOM.toast.classList.remove(PLUGIN_NAME+'-opening');
			$DOM.toast.classList.add(PLUGIN_NAME+'-opened');

			try {
				var event = new CustomEvent(PLUGIN_NAME + '-opened', {detail: settings, bubbles: true, cancelable: true});
				document.dispatchEvent(event);
			} catch(ex){
				console.warn(ex);
			}

			settings.onOpened.apply(null, [settings, $DOM.toast]);
		}, 1000);

		if(settings.drag){

			if(ACCEPTSTOUCH) {

			    $DOM.toast.addEventListener('touchstart', function(e) {
			        drag.startMoving(this, that, settings, e);
			    }, false);

			    $DOM.toast.addEventListener('touchend', function(e) {
			        drag.stopMoving(this, e);
			    }, false);
			} else {

			    $DOM.toast.addEventListener('mousedown', function(e) {
			    	e.preventDefault();
			        drag.startMoving(this, that, settings, e);
			    }, false);

			    $DOM.toast.addEventListener('mouseup', function(e) {
			    	e.preventDefault();
			        drag.stopMoving(this, e);
			    }, false);
			}
		}

		if(settings.closeOnEscape) {

			document.addEventListener('keyup', function (evt) {
				evt = evt || window.event;
				if(evt.keyCode == 27) {
				    that.hide(settings, $DOM.toast, 'esc');
				}
			});
		}

		if(settings.closeOnClick) {
			$DOM.toast.addEventListener('click', function (evt) {
				that.hide(settings, $DOM.toast, 'toast');
			});
		}

		that.toast = $DOM.toast;		
	};
	

	return $iziToast;
});

/***/ }),

/***/ "./src/app/modals/movie.modal.html":
/*!*****************************************!*\
  !*** ./src/app/modals/movie.modal.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-toolbar color=\"primary\">\n        <ion-buttons slot=\"end\">\n            <ion-icon name=\"close\" (click)=\"dismiss(movieForm.value)\" color=\"light\"></ion-icon>\n        </ion-buttons>\n        <ion-title>\n          {{ modal.title }}\n        </ion-title>\n    </ion-toolbar>\n</ion-header>\n      \n<ion-content class=\"outer-content\" padding>\n    <form [formGroup]=\"movieForm\" novalidate ngxsForm=\"catalog.movieForm\" (ngSubmit)=\"movieFormSubmit()\">\n    <ion-list inset>\n        <ion-item [class.has-error]=\"movieForm.get('title').hasError('required') && movieForm.get('title').touched\">\n          <ion-label position=\"floating\">Title *</ion-label>\n          <ion-input #myInput id='myInput' type=\"text\" formControlName=\"title\" required></ion-input>\n        </ion-item>\n        <ion-item *ngIf=\"movieForm.get('title').hasError('required') && movieForm.get('title').touched\" no-lines>\n          <div class=\"error-message\">\n              This field is required.\n          </div>\n        </ion-item>\n        <ion-item [class.has-error]=\"movieForm.get('year').hasError('required') && movieForm.get('year').touched\">\n          <ion-label position=\"floating\">Year *</ion-label>\n          <ion-input type=\"number\" formControlName=\"year\" required></ion-input>\n        </ion-item>\n        <ion-item *ngIf=\"movieForm.get('year').hasError('required') && movieForm.get('year').touched\" no-lines>\n            <div class=\"error-message\">\n                This field is required.\n            </div>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"floating\">Director</ion-label>\n          <ion-input type=\"text\" formControlName=\"director\"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"floating\">Cast</ion-label>\n          <ion-textarea formControlName=\"cast\"></ion-textarea>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"floating\">Genre</ion-label>\n          <ion-input type=\"text\" formControlName=\"genre\"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label position=\"floating\">Notes</ion-label>\n            <ion-textarea formControlName=\"notes\"></ion-textarea>\n        </ion-item>\n        <ion-item>\n          <ion-label position=\"floating\">URL Poster</ion-label>\n          <ion-input type=\"text\" formControlName=\"poster\"></ion-input>\n        </ion-item>\n        <ion-item class=\"take-picture\">\n            <p><b>NOTE</b>: Select movie picture from your device or take a movie picture.</p>\n            <ion-button (click)=\"takePicture()\" color=\"secondary\">Select / Take Picture</ion-button>\n        </ion-item>\n    </ion-list>\n    <ion-button type=\"submit\" color=\"primary\" [disabled]='!movieForm.valid' >{{ modal.buttonText }}</ion-button>\n    <ion-button color=\"danger\" [disabled]='!movieForm.valid' (click)=\"clearMovieForm()\" *ngIf=\"navParams.data.option === 'add'\">Clear</ion-button>\n    </form>\n</ion-content>"

/***/ }),

/***/ "./src/app/modals/movie.modal.scss":
/*!*****************************************!*\
  !*** ./src/app/modals/movie.modal.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".has-error {\n  border-bottom: solid 1px #ea6153; }\n\n.error-message {\n  color: #ea6153 !important; }\n\n.take-picture {\n  padding-left: 0;\n  margin-top: 10px; }\n"

/***/ }),

/***/ "./src/app/modals/movie.modal.ts":
/*!***************************************!*\
  !*** ./src/app/modals/movie.modal.ts ***!
  \***************************************/
/*! exports provided: MovieModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovieModalComponent", function() { return MovieModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _ngxs_form_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngxs/form-plugin */ "./node_modules/@ngxs/form-plugin/fesm5/ngxs-form-plugin.js");
/* harmony import */ var _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/actions/movies.actions */ "./src/app/store/actions/movies.actions.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MovieModalComponent = /** @class */ (function () {
    function MovieModalComponent(formBuilder, modalCtrl, navParams, store, actions$, renderer) {
        this.formBuilder = formBuilder;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.store = store;
        this.actions$ = actions$;
        this.renderer = renderer;
        this.movie = {
            id: '',
            title: '',
            year: new Date().getFullYear(),
            director: '',
            cast: '',
            genre: '',
            notes: '',
            poster: ''
        };
        this.modal = {
            title: '',
            buttonText: ''
        };
        this.emptyMovie = this.movie;
        this.createForm();
    }
    MovieModalComponent.prototype.createForm = function () {
        var _this = this;
        this.movieForm = this.formBuilder.group({
            id: '',
            index: 0,
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required),
            year: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](new Date().getFullYear(), _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required),
            director: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            cast: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            genre: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            notes: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"](''),
            poster: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('')
        });
        this.movieForm$ = this.store.select(function (state) { return state.catalog.movieForm; });
        this.movieForm$.subscribe((function (data) {
            if ((data['model'] !== null) && (data['status'] === 'PENDING')) {
                // Check if the user has added information about a movie but has not inserted it.
                _this.movieForm.patchValue(data['model']);
            }
        }));
    };
    MovieModalComponent.prototype.ngOnInit = function () {
        this.modal = __assign({}, this.navParams.data.modalProps);
        if (this.navParams.data.option === 'edit') {
            // this.movie = { ...this.navParams.data.modalProps.movie };
            this.movieForm.patchValue(this.navParams.data.modalProps.movie);
        }
    };
    MovieModalComponent.prototype.ngAfterViewInit = function () {
        console.log('ngAfterViewInit movie.modal');
        var element = this.renderer.selectRootElement('#myInput');
        console.log('element', element);
        setTimeout(function () { return element.focus(); }, 3000);
    };
    MovieModalComponent.prototype.dismiss = function (data) {
        // Using the injected ModalController this page
        // can "dismiss" itself and pass back data.
        // console.log('dismiss', data);
        if (this.navParams.data.option === 'add') {
            this.store.dispatch([
                new _ngxs_form_plugin__WEBPACK_IMPORTED_MODULE_3__["UpdateFormValue"]({
                    value: data,
                    path: 'catalog.movieForm'
                }),
                new _ngxs_form_plugin__WEBPACK_IMPORTED_MODULE_3__["UpdateFormStatus"]({
                    status: 'PENDING',
                    path: 'catalog.movieForm'
                })
            ]);
        }
        this.modalCtrl.dismiss(data);
    };
    MovieModalComponent.prototype.movieFormSubmit = function () {
        var _this = this;
        this.movie = this.movieForm.value;
        if (this.navParams.data.option === 'add') {
            console.log('movieFormSubmit add');
            this.store.dispatch(new _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_4__["AddMovie"](this.movie)).subscribe(function () { return _this.clearMovieForm(); });
        }
        else if (this.navParams.data.option === 'edit') {
            console.log('movieFormSubmit edit');
            this.store.dispatch(new _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_4__["EditMovie"](this.movie));
        }
    };
    MovieModalComponent.prototype.clearMovieForm = function () {
        console.log('clearMovieForm');
        this.movieForm.reset();
        this.store.dispatch([
            new _ngxs_form_plugin__WEBPACK_IMPORTED_MODULE_3__["UpdateFormValue"]({
                value: this.emptyMovie,
                path: 'catalog.movieForm'
            }),
            new _ngxs_form_plugin__WEBPACK_IMPORTED_MODULE_3__["UpdateFormStatus"]({
                status: '',
                path: 'catalog.movieForm'
            })
        ]);
    };
    MovieModalComponent.prototype.takePicture = function () {
        console.log('takePicture');
    };
    MovieModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-movie-modal',
            template: __webpack_require__(/*! ./movie.modal.html */ "./src/app/modals/movie.modal.html"),
            styles: [__webpack_require__(/*! ./movie.modal.scss */ "./src/app/modals/movie.modal.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"], _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ModalController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["NavParams"], _ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Store"],
            _ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Actions"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], MovieModalComponent);
    return MovieModalComponent;
}());



/***/ }),

/***/ "./src/app/pages/home/home-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/pages/home/home-routing.module.ts ***!
  \***************************************************/
/*! exports provided: HomeComponentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponentRoutingModule", function() { return HomeComponentRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home */ "./src/app/pages/home/home.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _home__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]
    }
];
var HomeComponentRoutingModule = /** @class */ (function () {
    function HomeComponentRoutingModule() {
    }
    HomeComponentRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], HomeComponentRoutingModule);
    return HomeComponentRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/home/home.html":
/*!**************************************!*\
  !*** ./src/app/pages/home/home.html ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-toolbar color='primary'>\n      <ion-title>Movies List</ion-title>\n      <ion-buttons slot='end'>\n        <ion-button (click)=\"presentPopover($event)\">\n          <ion-icon slot=\"icon-only\" name=\"funnel\"></ion-icon>\n        </ion-button>\n      </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content no-bounce>\n\n  <!-- Add movie fab button. -->\n  <ion-fab vertical=\"top\" horizontal=\"end\" edge slot=\"fixed\">\n    <ion-fab-button mini color=\"secondary\" (click)=\"addMovie()\">\n      <ion-icon name=\"add\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n\n  <ion-fab [hidden]=\"!showScrollTop\" vertical=\"bottom\" horizontal=\"end\" edge slot=\"fixed\">\n    <ion-fab-button mini color=\"secondary\" (click)=\"scrollToTop()\">\n      <ion-icon name=\"arrow-dropup\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n\n  <ion-item no-lines class=\"item-info\">\n      <h2>Sample project that shows how to build a Movies Catalog APP with Angular, Ionic 4, Capacitor and NGXS (State Management).</h2>\n  </ion-item>\n\n  <!-- Movies List. -->\n  <ion-list *ngIf=\"!showSkeleton\">\n    <!--<ion-item *ngFor=\"let movie of movies$ | async\" detail=\"true\" tappable routerLink=\"/detail/{{ movie.title }}\">-->\n    <ion-item-sliding *ngFor=\"let movie of movies$ | async; let i = index\" detail=\"true\">\n\n      <ion-item tappable (click)=\"viewMovieDetails(movie)\">\n      <ion-thumbnail slot=\"start\">\n        <img [src]=\"movie.poster\" alt=\"\">\n      </ion-thumbnail>\n      <ion-label>\n        <h2>{{ movie.title }}</h2>\n        <h3><ion-icon name=\"calendar\" color=\"primary\" slot=\"start\"></ion-icon>{{ movie.year }}</h3>\n        <h4>{{ movie.notes }}</h4>\n      </ion-label>\n      <ion-note slot=\"end\">\n          <ion-icon name=\"swap\"></ion-icon>\n      </ion-note>\n      </ion-item>\n\n      <!-- Sliding options. -->\n      <ion-item-options side=\"end\">\n        <ion-item-option color=\"secondary\" (click)=\"editMovie(movie, i)\"><ion-icon name=\"create\"></ion-icon></ion-item-option>\n        <ion-item-option color=\"danger\" (click)=\"deleteMovie(movie)\"><ion-icon name=\"trash\"></ion-icon></ion-item-option>\n      </ion-item-options>\n  \n    </ion-item-sliding>\n  </ion-list> \n\n  <ion-list *ngIf=\"showSkeleton\">\n\n    <ion-item *ngFor=\"let number of [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]\">\n      <ion-thumbnail slot=\"start\">\n        <img [src]=\"\" alt=\"\" class=\"skeleton-thumbnail\">\n      </ion-thumbnail>\n      <ion-label>\n        <h2><ion-skeleton-text width=200px></ion-skeleton-text></h2>\n        <h3><ion-skeleton-text width=80px></ion-skeleton-text></h3>\n        <h4><ion-skeleton-text width=500px></ion-skeleton-text></h4>\n      </ion-label>\n      <ion-note slot=\"end\">\n        <ion-icon name=\"swap\"></ion-icon>\n      </ion-note>\n    </ion-item>\n\n  </ion-list>\n\n  <!-- Infinite Scroll. -->\n  <ion-infinite-scroll #infiniteScroll id=\"infinite-scroll\" threshold=\"100px\" (ionInfinite)=\"doInfinite()\">\n    <ion-infinite-scroll-content\n      loadingSpinner=\"bubbles\"\n      loadingText=\"Loading more movies...\">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar color=\"primary\">\n        <ion-title>© {{ currentYear }} Adrián Brito Pacheco</ion-title>\n        <ion-buttons slot=\"end\">\n          <div class=\"github-button\"><iframe allowtransparency=\"true\" scrolling=\"no\" frameborder=\"0\" src=\"https://buttons.github.io/buttons.html#href=https%3A%2F%2Fgithub.com%2Fabritopach%2Fangular-ionic-master-detail&amp;title=&amp;aria-label=Star%20abritopach%2Fangular-ionic-master-detail%20on%20GitHub&amp;data-icon=octicon-star&amp;data-text=Star\" style=\"width: 50px; height: 20px; border: none;\"></iframe></div>\n          <div class=\"github-button\"><iframe allowtransparency=\"true\" scrolling=\"no\" frameborder=\"0\" src=\"https://buttons.github.io/buttons.html#href=https%3A%2F%2Fgithub.com%2Fabritopach&amp;title=&amp;aria-label=Follow%20%40abritopach%20on%20GitHub&amp;data-text=GitHub\" style=\"width: 67px; height: 20px; border: none;\"></iframe></div>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer>\n"

/***/ }),

/***/ "./src/app/pages/home/home.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/home/home.module.ts ***!
  \*******************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home */ "./src/app/pages/home/home.ts");
/* harmony import */ var _modals_movie_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modals/movie.modal */ "./src/app/modals/movie.modal.ts");
/* harmony import */ var _popovers_filter_movie_popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../popovers/filter-movie.popover */ "./src/app/popovers/filter-movie.popover.ts");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home-routing.module */ "./src/app/pages/home/home-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["IonicModule"],
                _home_routing_module__WEBPACK_IMPORTED_MODULE_7__["HomeComponentRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"]
            ],
            declarations: [_home__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"], _modals_movie_modal__WEBPACK_IMPORTED_MODULE_5__["MovieModalComponent"], _popovers_filter_movie_popover__WEBPACK_IMPORTED_MODULE_6__["FilterMoviePopoverComponent"]],
            entryComponents: [_home__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"], _modals_movie_modal__WEBPACK_IMPORTED_MODULE_5__["MovieModalComponent"], _popovers_filter_movie_popover__WEBPACK_IMPORTED_MODULE_6__["FilterMoviePopoverComponent"]],
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ }),

/***/ "./src/app/pages/home/home.scss":
/*!**************************************!*\
  !*** ./src/app/pages/home/home.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".item-info {\n  padding: 5px;\n  color: darkgray; }\n\n.github-button {\n  width: 49px;\n  height: 20px;\n  padding-right: 5px;\n  display: inline; }\n\n.item-option-md {\n  border-radius: 25px;\n  width: 40px;\n  height: 40px;\n  margin-top: 25px;\n  margin-right: 2px; }\n\n.skeleton-text span {\n  background-image: linear-gradient(100deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 80%), linear-gradient(#5e5757 20px, transparent 0);\n  background-repeat: repeat-y;\n  background-size: 50px 1em, 100% 1em;\n  background-position: -50px 0, 0 0;\n  -webkit-animation: shine 1s infinite;\n          animation: shine 1s infinite; }\n\n.skeleton-thumbnail {\n  background-color: lightgrey;\n  opacity: 0.5; }\n\n@-webkit-keyframes shine {\n  to {\n    background-position: 120% 0, 0 0; } }\n\n@keyframes shine {\n  to {\n    background-position: 120% 0, 0 0; } }\n"

/***/ }),

/***/ "./src/app/pages/home/home.ts":
/*!************************************!*\
  !*** ./src/app/pages/home/home.ts ***!
  \************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _providers_movies_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../providers/movies-service */ "./src/app/providers/movies-service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../store/actions/movies.actions */ "./src/app/store/actions/movies.actions.ts");
/* harmony import */ var _modals_movie_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modals/movie.modal */ "./src/app/modals/movie.modal.ts");
/* harmony import */ var _popovers_filter_movie_popover__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../popovers/filter-movie.popover */ "./src/app/popovers/filter-movie.popover.ts");
/* harmony import */ var izitoast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! izitoast */ "./node_modules/izitoast/dist/js/iziToast.js");
/* harmony import */ var izitoast__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(izitoast__WEBPACK_IMPORTED_MODULE_8__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var HomeComponent = /** @class */ (function () {
    function HomeComponent(moviesService, store, router, modalCtrl, actions$, popoverCtrl) {
        this.moviesService = moviesService;
        this.store = store;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.actions$ = actions$;
        this.popoverCtrl = popoverCtrl;
        this.showScrollTop = false;
        this.showSkeleton = true;
        this.start = 0;
        this.end = 20;
        this.movies$ = this.store.select(function (state) { return state.catalog.movies; });
        this.fetchMovies(this.start, this.end);
    }
    HomeComponent.prototype.ngOnInit = function () {
        /*
        console.log('ngOnInit home');
         // Check if we have movies in local storage.
         if (localStorage.getItem('@@STATE') !== 'undefined') {
          const state = JSON.parse(localStorage.getItem('@@STATE'));
          const { movies } = state.catalog;
          console.log('movies', movies);
        }
        */
        var _this = this;
        this.actions$.pipe(Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["ofActionSuccessful"])(_store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_5__["AddMovie"])).subscribe(function () {
            var _a = { title: 'Add movie', message: 'Movie added successfully.', position: 'bottomLeft' }, title = _a.title, message = _a.message, position = _a.position;
            _this.modalCtrl.dismiss();
            izitoast__WEBPACK_IMPORTED_MODULE_8___default.a.success({ title: title, message: message, position: position });
        });
        this.actions$.pipe(Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["ofActionSuccessful"])(_store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_5__["EditMovie"])).subscribe(function () {
            _this.modalCtrl.dismiss();
            var _a = { title: 'Edit movie', message: 'Movie updated successfully.', position: 'bottomLeft' }, title = _a.title, message = _a.message, position = _a.position;
            izitoast__WEBPACK_IMPORTED_MODULE_8___default.a.success({ title: title, message: message, position: position });
        });
        this.actions$.pipe(Object(_ngxs_store__WEBPACK_IMPORTED_MODULE_4__["ofActionSuccessful"])(_store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_5__["DeleteMovie"])).subscribe(function () {
            var _a = { title: 'Delete movie', message: 'Movie deleted successfully.', position: 'bottomLeft' }, title = _a.title, message = _a.message, position = _a.position;
            izitoast__WEBPACK_IMPORTED_MODULE_8___default.a.success({ title: title, message: message, position: position });
        });
        // this.infiniteScroll = document.getElementById('infinite-scroll');
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        console.log('ngOnDestroy home');
        // localStorage.removeItem('@@STATE');
    };
    HomeComponent.prototype.fetchMovies = function (name, url) {
        var _this = this;
        this.store.dispatch(new _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_5__["FetchMovies"]({ start: this.start, end: this.end })).subscribe(function () {
            setTimeout(function () {
                _this.showSkeleton = false;
            }, 2000);
            if (_this.infiniteScroll) {
                _this.infiniteScroll.nativeElement.complete();
            }
        });
    };
    HomeComponent.prototype.viewMovieDetails = function (movie) {
        // console.log('viewMovieDetails', movie);
        this.store.dispatch(new _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_5__["SelectedMovie"]({ title: movie.title }));
        this.router.navigateByUrl("/detail");
    };
    HomeComponent.prototype.presentModal = function (componentProps) {
        return __awaiter(this, void 0, void 0, function () {
            var modal, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: _modals_movie_modal__WEBPACK_IMPORTED_MODULE_6__["MovieModalComponent"],
                            componentProps: componentProps
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, modal.onWillDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (data) {
                            console.log('data', data);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.addMovie = function () {
        // console.log('addMovie');
        var componentProps = { modalProps: { title: 'Add Movie', buttonText: 'Add Movie' }, option: 'add' };
        this.presentModal(componentProps);
    };
    HomeComponent.prototype.editMovie = function (movie, index) {
        // console.log('editMovie', movie, 'index', index);
        movie['index'] = index;
        var componentProps = { modalProps: { title: 'Edit Movie', buttonText: 'Edit Movie', movie: movie }, option: 'edit' };
        this.presentModal(componentProps);
    };
    HomeComponent.prototype.deleteMovie = function (movie) {
        // console.log('deleteMovie', movie);
        this.store.dispatch(new _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_5__["DeleteMovie"](movie));
    };
    HomeComponent.prototype.doInfinite = function () {
        // console.log('Begin async operation');
        this.showSkeleton = true;
        this.start = this.end;
        this.end += 20;
        this.showScrollTop = true;
        this.fetchMovies(this.start, this.end);
    };
    HomeComponent.prototype.presentPopover = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var popover, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverCtrl.create({
                            component: _popovers_filter_movie_popover__WEBPACK_IMPORTED_MODULE_7__["FilterMoviePopoverComponent"],
                            ev: event
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, popover.onWillDismiss()];
                    case 3:
                        data = (_a.sent()).data;
                        if (data) {
                            console.log('data popover.onWillDismiss', data);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.scrollToTop = function () {
        console.log('scrollToTop');
        setTimeout(function () { window.scrollTo(0, 0); }, 1000);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('infiniteScroll'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], HomeComponent.prototype, "infiniteScroll", void 0);
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-home',
            template: __webpack_require__(/*! ./home.html */ "./src/app/pages/home/home.html"),
            styles: [__webpack_require__(/*! ./home.scss */ "./src/app/pages/home/home.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_providers_movies_service__WEBPACK_IMPORTED_MODULE_2__["MoviesService"], _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Store"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ModalController"],
            _ngxs_store__WEBPACK_IMPORTED_MODULE_4__["Actions"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/popovers/filter-movie.popover.html":
/*!****************************************************!*\
  !*** ./src/app/popovers/filter-movie.popover.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n    <ion-toolbar color=\"secondary\">\n        <ion-title>\n          Filter Movies\n        </ion-title>\n    </ion-toolbar>\n</ion-header>\n      \n<ion-content>\n  <ion-list>\n    <!--<ion-list-header>Filter by</ion-list-header>-->\n    <ion-item>\n      <ion-label>Genre</ion-label>\n      <ion-select id=\"genre\" [(ngModel)]=\"filters.genre\" placeholder=\"Select One\" interface=\"popover\">\n          <ion-select-option value=\"Action\">Action</ion-select-option>\n          <ion-select-option value=\"Adventure\">Adventure</ion-select-option>\n          <ion-select-option value=\"Comedy\">Comedy</ion-select-option>\n          <ion-select-option value=\"Crime\">Crime</ion-select-option>\n          <ion-select-option value=\"Drama\">Drama</ion-select-option>\n          <ion-select-option value=\"Horror\">Horror</ion-select-option>\n          <ion-select-option value=\"Musicals\">Musicals</ion-select-option>\n          <ion-select-option value=\"Science Fiction\">Science Fiction</ion-select-option>\n          <ion-select-option value=\"War\">War</ion-select-option>\n          <ion-select-option value=\"Westerns\">Westerns</ion-select-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-range dualKnobs=\"true\" pin=\"true\" color=\"secondary\" [min]=\"range.lower\" [max]=\"range.upper\" step=\"1\" [(ngModel)]=\"filters.years\">\n        <ion-icon small name=\"remove\" slot=\"start\"></ion-icon>\n        <ion-icon name=\"add\" slot=\"end\"></ion-icon>\n      </ion-range>\n    </ion-item>\n  </ion-list>\n  <ion-row justify-content-center>\n    <ion-col col-3>\n        <ion-button (click)=\"filterMovies()\">Accept</ion-button>      \n    </ion-col>\n    <ion-col col-3>\n        <ion-button color=\"danger\" (click)=\"clearFilterMovies()\">Clear</ion-button>      \n    </ion-col>\n  </ion-row>\n</ion-content>"

/***/ }),

/***/ "./src/app/popovers/filter-movie.popover.scss":
/*!****************************************************!*\
  !*** ./src/app/popovers/filter-movie.popover.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "form {\n  margin-top: 10px; }\n\n.has-danger {\n  border: solid 1px red; }\n\n.has-sucess {\n  border: solid 1px green; }\n"

/***/ }),

/***/ "./src/app/popovers/filter-movie.popover.ts":
/*!**************************************************!*\
  !*** ./src/app/popovers/filter-movie.popover.ts ***!
  \**************************************************/
/*! exports provided: FilterMoviePopoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterMoviePopoverComponent", function() { return FilterMoviePopoverComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/index.js");
/* harmony import */ var _ngxs_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngxs/store */ "./node_modules/@ngxs/store/fesm5/ngxs-store.js");
/* harmony import */ var _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/actions/movies.actions */ "./src/app/store/actions/movies.actions.ts");
var __assign = (undefined && undefined.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FilterMoviePopoverComponent = /** @class */ (function () {
    function FilterMoviePopoverComponent(popoverCtrl, store, zone) {
        this.popoverCtrl = popoverCtrl;
        this.store = store;
        this.zone = zone;
        this.range = {
            lower: 1900,
            upper: new Date().getFullYear()
        };
        this.filters = {
            years: {
                lower: 1900,
                upper: new Date().getFullYear()
            },
            genre: ''
        };
    }
    FilterMoviePopoverComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filter$ = this.store.select(function (state) { return state.catalog.filter; });
        this.filterSubscription = this.filter$.subscribe((function (filter) {
            // console.log('filter', filter);
            _this.filters = __assign({}, filter);
        }));
    };
    FilterMoviePopoverComponent.prototype.ngOnDestroy = function () {
        this.filterSubscription.unsubscribe();
    };
    FilterMoviePopoverComponent.prototype.filterMovies = function () {
        this.store.dispatch([
            new _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_3__["FilterMovies"](this.filters),
            new _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_3__["SaveFilterMovies"](this.filters)
        ]);
        this.popoverCtrl.dismiss();
    };
    FilterMoviePopoverComponent.prototype.clearFilterMovies = function () {
        this.filters = {};
        this.store.dispatch([
            new _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_3__["FilterMovies"](this.filters),
            new _store_actions_movies_actions__WEBPACK_IMPORTED_MODULE_3__["SaveFilterMovies"](this.filters)
        ]);
        this.popoverCtrl.dismiss();
    };
    FilterMoviePopoverComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-filter-movie-popover',
            template: __webpack_require__(/*! ./filter-movie.popover.html */ "./src/app/popovers/filter-movie.popover.html"),
            styles: [__webpack_require__(/*! ./filter-movie.popover.scss */ "./src/app/popovers/filter-movie.popover.scss")],
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__["PopoverController"], _ngxs_store__WEBPACK_IMPORTED_MODULE_2__["Store"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]])
    ], FilterMoviePopoverComponent);
    return FilterMoviePopoverComponent;
}());



/***/ })

}]);
//# sourceMappingURL=pages-home-home-module.js.map