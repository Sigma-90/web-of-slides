/*
* Web of Slides, a JQuery plugin that allows to build interlinked slideshows
*
* By: Stefan Winkler (http://webentwinkler.net)
* Version: 0.9.1 (beta)
* Updated: December 21st, 2012
*
* Copyright 2012 Stefan Winkler
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
window.currentWebOfSlidesTimer = 0;
window.webOfSlidesAutoTimer = 4000;

function equalizeSlideCommentsHeights($wrapper){
		if($wrapper.hasClass('equalize-heights')){
		$wrapper.find('.slide').each(function(){
			var canvas_height = $(this).find('.slide-canvas').outerHeight();
			var comments_height = $(this).find('.slide-comments').outerHeight();
			if(comments_height < canvas_height){
				$(this).find('.slide-comments').outerHeight(canvas_height);
			}
		});			
	}
}
jQuery.fn.extend({
    initWebOfSlides: function(){
        var targetBtnId = null;
        var $animationContainer = $(this);
		var $playButton = $animationContainer.find('a.animation-play-btn');
		if($playButton.length == 1){
			if ( !!( $playButton.attr('data-overall-anim-speed') !== undefined ) ) {
				try{ webOfSlidesAutoTimer = parseInt($playButton.attr('data-overall-anim-speed')); }
				catch(e){
					webOfSlidesAutoTimer = 4000;
				}
			}
		}
		equalizeSlideCommentsHeights($animationContainer);		
        $(this).find('a.animation-nav-btn').each(function(){
            $(this).click(function(e){
                e.preventDefault();
                if($(this).hasClass('reset')){
                    $animationContainer.find('a.animation-nav-btn').removeClass('invis');
					window.currentWebOfSlidesTimer = 0;
                }
				var timer = currentWebOfSlidesTimer;
                var $triggeredButton = $(this);                
                var $parentSlide = $(this).parent().hasClass('button-box') ? $(this).parent().parent().parent() : $(this).parent().parent();
                $parentSlide.fadeOut(500, function(){
                    $(this).removeClass('active');
                    var $targetSlide = $animationContainer.find($triggeredButton.attr('href'));
                    if ( !!( $targetSlide.attr('data-slide-anim-speed') !== undefined ) ) {
                        try{ timer = parseInt($targetSlide.attr('data-slide-anim-speed')); }
						catch(e){
							timer = currentWebOfSlidesTimer;
						}
                    }
					if(($targetSlide.hasClass('pause') || $targetSlide.find('a.animation-nav-btn').length > 1) && timer > 0){
						$targetSlide.find('a.animation-nav-btn').removeClass('invis').addClass('vis');
					}
                    $targetSlide.find('.slide-canvas').hide();
                    $targetSlide.find('.slide-comments').hide();					
                    $targetSlide.addClass('active');
                    $targetSlide.show();
                    $targetSlide.find('.slide-canvas').fadeIn(500, function(){
						equalizeSlideCommentsHeights($animationContainer);
						var $comments = $targetSlide.find('.slide-comments');
						var comments_delay = 250;
						if ( !!( $comments.attr('data-text-delay') !== undefined ) ) {
							try{ comments_delay = parseInt($comments.attr('data-text-delay')); }
							catch(e){
								comments_delay = 250;
							}							
						}
						setTimeout(function($cmt = $comments){$cmt.fadeIn(500);}, comments_delay);
                        if(timer > 0 && ($triggeredButton.hasClass('invis') || $triggeredButton.hasClass('vis')) && !$targetSlide.hasClass('pause') && !($targetSlide.find('.animation-nav-btn').length > 1)){
                            targetBtnId = $targetSlide.find('.animation-nav-btn').addClass('invis').attr('id');
                            setTimeout("$('#"+targetBtnId+"').click();", parseInt(timer)+parseInt(comments_delay));
                        }
                    });
                });
            });
        });
        $playButton.each(function(){
            $(this).click(function(e){
				currentWebOfSlidesTimer = webOfSlidesAutoTimer;
				var $startButton = $(this).parent().parent().find('a.animation-nav-btn');
				if($startButton.length == 1){
					$startButton.hide();
					$startButton.click();
				}
                e.preventDefault();
            });
        });
    }
});

$(document).ready(function(){
    $('.web-of-slides').each(function(){
        $(this).initWebOfSlides();
    });
});