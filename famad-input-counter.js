
$(function(){
	"use strict";
	///////////////////// Input Character Counter /////////////
    $.fn.famadInputCounter = function(option){
		var DEFAULTS = {
			element: '.famad-input-counter',
			elementText: '.famad-input-counter-text',
			elementInput: '.famad-input-counter-input',
			textMax: 170,
			bestRange: 150,
			warningRange: 160
		};
        this.each(function() {
			var setofObjects = ['element','elementText','elementInput','textMax','bestRange','warningRange'];
			var $options = {};
			var $this = $(this);
			if(option){
				for(var i=0; i<Object.keys(DEFAULTS).length;i++){
					var obj = setofObjects[i];
					
					if(!(obj in option)){
						$options[obj] = DEFAULTS[obj];
					}else{
						$options[obj] = option[obj];
					}
				}
			}
			
			var bestRangePercent = (($options.bestRange * 100)/ $options.textMax);
			var warningRangePercent = (($options.warningRange * 100)/ $options.textMax);
			$($this.find($options.elementInput)).attr('maxlength',$options.textMax);
			$(document).ready(function(){
				if($($this.find($options.elementInput)).val().length !== null || $($this.find($options.elementInput)).val().length !== 0){
					var text_length = $($this.find($options.elementInput)).val().length;
					var text_remaining = $options.textMax - text_length;
					var text_percent = parseInt((text_remaining * 100) / $options.textMax);
					var percent = 100 - text_percent;
					if(percent >= 0 && percent < bestRangePercent){
					 $($this.find($options.element)).addClass('progress-bar-success');
					}
					if(percent >= bestRangePercent && percent < warningRangePercent){
					 $($this.find($options.element)).addClass('progress-bar-warning');
					}
					if(percent >= warningRangePercent && percent < 100){
					 $($this.find($options.element)).addClass('progress-bar-danger');
					}
					$($this.find($options.element)).attr("aria-valuenow","10").css("width",percent+"%");
					$($this.find($options.elementText)).html(text_remaining + ' remaining');
				}else{
					$($this.find($options.elementText)).html($options.textMax + ' remaining');
				}
			});
			$($this.find($options.elementInput)).on('keyup',function() {
				$($this.find($options.elementText)).html($options.textMax + ' remaining');
				var text_length = $($this.find($options.elementInput)).val().length;
				var text_remaining = $options.textMax - text_length;
				var text_percent = parseInt((text_remaining * 100) / $options.textMax);
				var percent = 100 - text_percent;
				$($this.find($options.element)).removeClass('progress-bar-success').removeClass('progress-bar-warning').removeClass('progress-bar-danger');
				if(percent >= 0 && percent < bestRangePercent){
				 $($this.find($options.element)).addClass('progress-bar-success');
				}
				if(percent >= bestRangePercent && percent < warningRangePercent){
				 $($this.find($options.element)).addClass('progress-bar-warning');
				}
				if(percent >= warningRangePercent && percent < 100){
				 $($this.find($options.element)).addClass('progress-bar-danger');
				}
				$($this.find($options.element)).attr("aria-valuenow","10").css("width",percent+"%");
				$($this.find($options.elementText)).html(text_remaining + ' remaining');
			});

        });
    };	
});