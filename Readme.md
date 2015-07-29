# Introduction
Train is a logical game similar to old game snake. The tricky part is that
there is usualy only one way out of the labirint full of items the train
has to take with it.

Idea and game originaly developed by Miroslav Nemecek aka Golem in assembler for MS-DOS.
See also [wiki](https://github.com/besnik/train/wiki) pages for more info.

# Technologies
* frontend - javascript, html, css. 
* backend - TBA

## Design
The aim is to create loosely coupled and object oriented design using plain javascript.
Idealy each component is easily replacable by another.
This allows us to implement for example multiple views: one that is using div+css,
another that is using html5 canvas, etc.

## MVC - Model View Controller
Core functionality is designed using a variation of MVC design pattern. View engine and 
domain model is separated. Components are connected using *application* type that acts as
controller. Level data are loaded using level repository. View engine is getting view model
to render.

**Frontend part** runs completely in the browser. As we are quite flexibile with html
in browser, one could design bunch of specific levels, not just standard rectangle
type (e.g. wide screen full HD level :-) Html ensures that game is playable on all 
current and future platforms like pc, mobile, television, consoles, etc.
It also allows easy resize in both directions; meaning fine rendering on big screens
as well as on smaller mobile devices.

**Backend part** is TBD, but we want to support both standalone and remote versions.
Standalone means all levels are loaded in the beginning to the browser and no
internet connection is required. Remote means the levels are loaded from the server.
This can be specific host or a cloud. Remote would allow to play custom levels
created by community.

## Dependencies
All components except current view are written in POJO - plain old javascript.
Current view engine depends on jQuery and it's DOM and CSS manipulations. As discussed
before, this can be easily replacable with another view engine.

## Implementation
To avoid dependencies and heavy external libraries, many core components are implemented
using plain old javascript:
* binding and event handling with correct context of the event handler (clock, keyboard).
* clock
* classes and inheritance. We developed simple helper function that sets up the inheritance.

## Testing
Browsers included in testing: FF, IE, Chrome

## Extensions
Plan is to provide level editor to allow community to create new levels.
It should be also possible to easily create new graphics for a view engine and
configure it to be used.
Would be nice to have also new set of graphics in high resolution; or increase fps by having
images representing more frames.

# Learning
The project is relatively simple and one can benefit from studying the source codes.
Almost all core components are written in plain javascript including class inheritance
and event handling with scope management.
Source codes are well documented. Aim is also given on KISS rule and self explaining
simple names.


