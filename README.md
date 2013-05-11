Web of Slides, a JQuery plugin that allows to build interlinked slideshows

-------------
Documentation
-------------

Plugin and documentation created by: Stefan Winkler (https://github.com/Sigma-90, http://webentwinkler.net)

Documentation for Version: 0.9.1 (beta)

Updated: December 21st, 2012

------------------------------------------

What does this plugin do?
-------------------------

This plugin helps to create interactive, branchable slideshows. Auto-play is also possible, 
but keep in mind that applying this to all slides means to give up the capability of 
creating a non-linear slide flow, which is the main purpose of this plugin after all. 

To be bit more specific about the purpose: The main use for this plugin are on-page tutorials, 
where certain business processes or operating instructions are explained to the user. 
Most web-based (business-)processes often have branching options and with this plugin you won't have to 
create an entire slideshow for each decision that may take the process into a different direction. 
Each slide can be linked to multiple others, effectively building a node-based net structure for your
slidesshow in which you can jump back and forth as you like, hence the name "Web of Slides".

The slides will not actually "slide", animation-wise, they always cross-fade, with a bit of delay 
between the slide canvas (usually containing an image) and the description text for it, to redirect 
the attention of the viewer to the text after the information from the image has been perceived. 
Showing both at the same time could cause the viewer to look at the image for too long and miss out 
on the text in case the slides are (partially or completely) automated.

The behavior of the plugin can be altered by applying special class names and attributes to certain 
HTML tags. Check the section "Behavior alteration" below for details.

------------------------------------------

Requirements:
-------------

 - JQuery 1.8.3 or higher, should work with older versions as well but I won't make any promises.

 - A modern browser that supports CSS3 and HTML5 (if you intend to use the default CSS)

------------------------------------------


Usage:
------

HTML/CSS structure:
-------------------

A certain structure has to be maintained and there are some important class names that must be present.
While the plugin is intended for HTML5 pages where the entire slide is a <figure> tag and the text a 
<figcaption> tag, it is perfectly possible to use <div> tags as well, in case you want to style your default
<figure> tags differently or you're building an XHTML page. Take a look at the structure of the demo page, 
it contains all the structures supported by the plugin. 

Here's a rough textual description of what goes where:

The main container block element should have the class "web-of-slides", unless you want to delay the 
initialization, in which case you can choose a class name of your own, for example "tss", und then use a 
selector to call the initialization upon every matched DOM element: 
$('.tss').each(function(){ $(this).initWebOfSlides(); });

The child elements of this container element should be the slide elements. Each has to have the class 
"slide" and a unique id, because that's what we're targeting when jumping to other slides. The first one 
should also have the class "active" if you want the first slide to be visible from the beginning. 
If you want to make the slides visible after some JS-triggered event, just add the class to the start slide 
with JQuery instead. You might want to remove the min-height CSS rule defined for the container tag in 
that case so the container can collapse when invisible.

The tags inside the container should have the classes "slide-canvas" (which contains your img or canvas tags), 
"slide-comments"(which contains the text part) and "nav-btn-wrapper" (this is usually where the links go).
Prefereably these tags should appear in exactly that order I just listed them in. The last one is optional, you 
can place the navigational links into the "slide-comments" block instead if you want but if you have more than 
one link, you have to place them inside a div with the class "button-box", because the absolute positioning 
of all loose links inside the "slide-comments" container places them in the lower right corner of the container, 
so they would stack on top of each other. The "button-box" is also placed in the same corner, but the links 
inside it have a normal text flow so you can have multiple ones inside it without problems.

The "nav-btn-wrapper" is styled to show the navigational links below both halves of the slide, to free 
up space for more text in the "slide-comments" part and is mainly there to support your typical forward and back 
buttons, but can contain more than two links without problems. The links inside are centered so they will be 
evenly distributed at all times. You could easily modify the CSS to float the first and last ones left and right 
respectively if you want to separate them a bit more. The demo page CSS in general is just a guideline of course, 
you can fiddle around with it as you please to achieve the look that you want to create. If you want to show the 
text below the image, or left to it, because your target audience is not of western "reading-from-left-to-right" 
culture, feel free to do so, the plugin will still work as long as you maintain the structure.

Last but not least, the navigational links: Those have to have the class "animation-nav-btn" and their href
attribute has to be an on-page anchor for the target slide (like "#target_slide_id"), it's as easy as that.

---------------------------

Configuring plugin behavior
---------------------------

Stopping auto-play at a certain slide:
----------------------------------------
The special class "reset" used on a "animation-nav-btn" link aborts an automated animation at the 
current slide to require user interaction for the entire rest of the presentation. 

Pausing auto-play at a certain slide:
-------------------------------------
If the slide itself has the class "pause" or contains more than one link with the class 
"animation-nav-btn", the automated animation flow gets paused at at the current slide and the 
buttons are shown, so the user can decide which branch to follow. The animation will resume when 
a slide without that class is reached, as long as no button has the "reset" class.

Positioning of images and text:
-------------------------------
By default, it is intended that the image appears on the left and the related text on the right,
because of the western culture where text is read from left to right. If you want to swap this 
around, for example when you are builing a slideshow for an arabic page, this is no problem as well. 
But if you want to display the text below the image, for example because you want to use the 
slideshow in a narrow sidebar or your target audience is from a eastern cuture that reads from 
top to bottom, you should remove the class "equalize-heights" from the main wrapper block, because 
this class triggers a JS function that ensures that the text containers will have the same height as 
their corresponding image containers if the original height was smaller than that. The main reason 
for this behavior is that the navigation button block that can be placed inside the text container 
is absolutely positioned by default and by ensuring that the height of its container is at least as 
high as the entire slide, the buttons will always appear in the bottom right corner of the slide.

Configuring the delay between slides for auto-play:
---------------------------------------------------
If a slide has the attribute "data-slide-anim-speed" and its value is a number, this number will 
define the amount of milliseconds the slide will be shown during an automated animation sequence.
If it is not set, the default value of 4000 milliseconds will be used. The default can also be
modified by adding the attribute "data-overall-anim-speed" to the link that starts the animation 
(the link with the class "animation-play-btn").

Configuring the delay between image and text:
---------------------------------------------
The delay after which the text will be shown once the image appeared is a quarter of a second by 
default, but if the "slide-comments" container has the attribute "data-text-delay" specified and 
its value is a number, this will define the time in milliseconds after which the text starts to 
fade in after the image has faded in completely. In any case, the delay will be added to the time 
the entire slide is shown, so it is not possible to have a text delay that is so long that the next 
slide is shown before the current slide's text. So, if the slide has a data-slide-anim-speed of
5000 and the slide comments block has a data-text-delay of 2000, the entire slide will be visible 
for 7 seconds in total.