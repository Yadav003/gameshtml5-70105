(function($){

	$.appswise = {};

	$.appswise.options = {
		position: '',
		class_name: '',
		fade_in_speed: 'medium',
		fade_out_speed: 1000,
		time: 6000,
		max_to_display: 0,
		close_on_click: false
	};

	$.appswise.add = function(params){

		try {
			return Appswise.addToQueue(params || {});
		} catch(e) {
		
			var err = 'Appswise Error: ' + e;
			if (typeof(console) !== 'undefined' && console.error) {
				console.error(err, params);
			} else {
				alert(err);
			}
				
		}
		
	};

	$.appswise.remove = function(id, params){
		Appswise.removeSpecific(id, params || {});
	};

	$.appswise.removeAll = function(params){
		Appswise.stop(params || {});
	}

	var Appswise = {

		position: '',
		fade_in_speed: '',
		fade_out_speed: '',
		time: '',
		close_on_click: '',

		_custom_timer: 0,
		_item_count: 0,
		_is_setup: 0,
		_tpl_close: '<a class="www-appswisegames-com-close" href="#" tabindex="1">Close Notification</a>',
		_tpl_title: '<span class="www-appswisegames-com-title">[[title]]</span>',
		_tpl_item: '<div id="www-appswisegames-com-item-[[number]]" class="www-appswisegames-com-item-wrapper [[item_class]]" style="display:none" role="alert"><div class="www-appswisegames-com-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="www-appswisegames-com-bottom"></div></div>',
		_tpl_wrap: '<div id="www-appswisegames-com-notice-wrapper"></div>',
		_notificaiton_queue: [],
		
		addToQueue: function(params){
			// Handle straight text
			if(typeof(params) === 'string'){
				params = {text:params};
			}
			
			this._item_count++;
			this._notificaiton_queue.push($.extend(params, {item_number: this._item_count}));
			this._updateDomFromQueue();
			return this._item_count;
		},

		_updateDomFromQueue: function(){
			var maxNotifications = $.appswise.options.max_to_display;
			var isLimited = maxNotifications > 0;
			if(!isLimited || $('.www-appswisegames-com-item-wrapper').length < maxNotifications){
				if(this._notificaiton_queue.length > 0){
					this._addToDom(this._notificaiton_queue.shift());
				}
			}
		},

		_addToDom: function(params){
		
			if(params.text === null){
				throw 'You must supply "text" parameter.'; 
			}

			if(!this._is_setup){
				this._runSetup();
			}

			var title = params.title, 
				text = params.text,
				image = params.image || '',
				sticky = params.sticky || false,
				item_class = params.class_name || $.appswise.options.class_name,
				position = $.appswise.options.position,
				time_alive = params.time || '',
				widget_click_close = params.close_on_click || false;

			this._verifyWrapper();
			
			var number = params.item_number, 
				tmp = this._tpl_item;

			$(['before_open', 'after_open', 'before_close', 'after_close','on_click']).each(function(i, val){
				Appswise['_' + val + '_' + number] = ($.isFunction(params[val])) ? params[val] : function(){};
			});

			this._custom_timer = 0;

			if(time_alive){
				this._custom_timer = time_alive;
			}
			
			var image_str = (image !== '') ? '<img src="' + image + '" class="www-appswisegames-com-image" />' : '',
				class_name = (image !== '') ? 'www-appswisegames-com-with-image' : 'www-appswisegames-com-without-image';

			if(title){
				title = this._str_replace('[[title]]',title,this._tpl_title);
			}else{
				title = '';
			}
			
			tmp = this._str_replace(
				['[[title]]', '[[text]]', '[[close]]', '[[image]]', '[[number]]', '[[class_name]]', '[[item_class]]'],
				[title, text, this._tpl_close, image_str, number, class_name, item_class], tmp
			);

			if(this['_before_open_' + number]() === false){
				return false;
			}

			$('#www-appswisegames-com-notice-wrapper').addClass(position).append(tmp);
			
			var item = $('#www-appswisegames-com-item-' + number);
			
			item.fadeIn(this.fade_in_speed, function(){
				Appswise['_after_open_' + number]($(this));
			});
			
			if(!sticky){
				this._setFadeTimer(item, number);
			}

			$(item).click(function(){
				Appswise['_' + 'on_click' + '_' + number]($(this));
				if(widget_click_close) {
					Appswise.removeSpecific(number, {}, $(item), true);
				}
			});

			$(item).find('.www-appswisegames-com-close').bind('mouseenter mouseleave', function(event){
				if(event.type == 'mouseenter'){
					$(item).off("click");
				} else {
					$(item).on("click",function(){
						Appswise['_' + 'on_click' + '_' + number]($(this));
						if(widget_click_close) {
							Appswise.removeSpecific(number, {}, $(item), true);
						}
					});
				}
			});

			$(item).bind('mouseenter mouseleave', function(event){
				if(event.type === 'mouseenter'){
					if(!sticky){ 
						Appswise._restoreItemIfFading($(this), number);
					}
				}
				else {
					if(!sticky){
						Appswise._setFadeTimer($(this), number);
					}
				}

			});

			$(item).find('.www-appswisegames-com-close').click(function(){
				Appswise.removeSpecific(number, {}, null, true);
				return false;
			});
		},

		_countRemoveWrapper: function(unique_id, e, manual_close){

			e.remove();
			this['_after_close_' + unique_id](e, manual_close);

			if($('.www-appswisegames-com-item-wrapper').length === 0){
				$('#www-appswisegames-com-notice-wrapper').remove();
			}
		
		},
		
		_fade: function(e, unique_id /*, params, unbind_events */){

			var params = arguments[2] || {},
				unbind_events = arguments[3] || false,
				fade = (typeof(params.fade) !== 'undefined') ? params.fade : true,
				fade_out_speed = params.speed || this.fade_out_speed,
				manual_close = unbind_events;

			this['_before_close_' + unique_id](e, manual_close);

			if(unbind_events){
				e.unbind('mouseenter mouseleave');
			}

			if(fade){

				e.animate({
					opacity: 0
				}, fade_out_speed, function(){
					e.animate({ height: 0 }, 300, function(){
						Appswise._countRemoveWrapper(unique_id, e, manual_close);
					});
				});

			} else {

				this._countRemoveWrapper(unique_id, e);
			}

		},

		removeSpecific: function(unique_id, params /*, e, unbind_events */){

			var e = arguments[2] || false,
				unbind_events = arguments[3] || false;

			if(!e){
				e = $('#www-appswisegames-com-item-' + unique_id);
			}

			this._fade(e, unique_id, params || {}, unbind_events);

		},

		_restoreItemIfFading: function(e, unique_id){
			
			clearTimeout(this['_int_id_' + unique_id]);
			e.stop().css({ opacity: '', height: '' });
			
		},

		_runSetup: function(){
		
			for(var opt in $.appswise.options){
				this[opt] = $.appswise.options[opt];
			}
			this._is_setup = 1;
			
		},

		_setFadeTimer: function(e, unique_id){
			
			var timer_str = (this._custom_timer) ? this._custom_timer : this.time;
			this['_int_id_' + unique_id] = setTimeout(function(){
				Appswise._fade(e, unique_id);
			}, timer_str);
		
		},
 
		stop: function(params){
			
			// callbacks (if passed)
			var before_close = ($.isFunction(params.before_close)) ? params.before_close : function(){};
			var after_close = ($.isFunction(params.after_close)) ? params.after_close : function(){};
			
			var wrap = $('#www-appswisegames-com-notice-wrapper');
			before_close(wrap);
			wrap.fadeOut(function(){
				$(this).remove();
				after_close();
			});
		
		},

		_str_replace: function(search, replace, subject, count){
		
			var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
				f = [].concat(search),
				r = [].concat(replace),
				s = subject,
				ra = r instanceof Array, sa = s instanceof Array;
			s = [].concat(s);
			
			if(count){
				this.window[count] = 0;
			}
		
			for(i = 0, sl = s.length; i < sl; i++){
				
				if(s[i] === ''){
					continue;
				}
				
				for (j = 0, fl = f.length; j < fl; j++){
					
					temp = s[i] + '';
					repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
					s[i] = (temp).split(f[j]).join(repl);
					
					if(count && s[i] !== temp){
						this.window[count] += (temp.length-s[i].length) / f[j].length;
					}
					
				}
			}
			
			return sa ? s : s[0];	
		},

		_verifyWrapper: function(){
		  
			if($('#www-appswisegames-com-notice-wrapper').length === 0){
				$('#c2canvasdiv').append(this._tpl_wrap);
			}
		}	
	}
})(jQuery);
