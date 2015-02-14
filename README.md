# jQuery.tap

http://aarongloege.github.com/jquery.tap/
A jQuery plugin that creates a click alternative for touch enabled browsers.

## Why?

Click events on touch devices do not work the best. There is a ~300ms delay from when you release your finger to the time the click event is triggered. This behavior is not desired. :(

## How do I use it?

What is nice about this plugin, and what makes it different from other plugins, is that it is globally triggered simply by including the script. No need to enable it on an element you with to capture it from.

```javascript
// jQuery.on method
$('.element').on('tap', onTapHandler);
$('.element').on('tap', dataObject, onTapHandler);
```

And, because the event is bound through jQuery's `on` API, you can take advantage of namespaces and delegate events:

```javascript
// Namespace
$('.element').on('tap.widget', onTapHandler);
$('.element').on('tap.widget', dataObject, onTapHandler);

// Delegate
$('.element').on('tap', '.child-element', onTapHandler);
$('.element').on('tap', '.child-element', dataObject, onTapHandler);

// Together now
$('.element').on('tap.widget', '.child-element', onTapHandler);
$('.element').on('tap.widget', '.child-element', dataObject, onTapHandler);
```

The tap event will also bubble.

## What About Desktop?

If the browser does not support touch events, then the regular mouse events to create a tap event. No need for if/else statements, jQuery.tap will do that for you.

## Now What About Browsers That Support Both Touch and Mouse?

Gotcha covered. jQuery.tap listens for both touch and mouse events and will use the first event that is fired to detect a tap.

## Caveats

### Click events

There is currently not a way to stop the `click` event from triggering after `touchstart`/`touchend` and `mousedown`/`mouseup` events if the `tap` event is canceled with `preventDefault()`. The `click` event will still fire, but `preventDefault` will be called on that `click` event if `preventDefault` was called on the tap event.

## Tests
You can view an integration test [here](http://aarongloege.github.io/jquery.tap/test/) and you can test support for yourself [here](http://aarongloege.github.io/jquery.tap/example/).

## Licence

jQuery.tap is licensed under the [MIT license](http://opensource.org/licenses/mit-license.html).