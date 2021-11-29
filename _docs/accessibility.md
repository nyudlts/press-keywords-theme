# Menus

The idea behind menus with labels and checkboxes is that there can be
collapsible menus without JavaScript.  But the design requires for their
labels to be on different parts of the HTML code, so these measures were
taken to ensure they are available to assistive technologies:

* Labels for opening and closing menus are focusable via keyboard.
  There's a small inline JS to allow keyboard users to press Enter or
  Spacebar to open the menus.

* Labels are hidden for screen readers, since the menu contents are
  available on other elements.

* Checkboxes are available to screen readers, so activating them
  actually enables the menu.

* Labels for closing menus are also keyboard and screen reader
  accessible.


```html
<div>
  <label tabindex="0" aria-hidden="true" for="toggler" id="label">
    Toggle menu
  </label>
</div>

<div>
  <input type="checkbox" class="sr-only" id="toggler" aria-labeledby="label" />

  <div class="toggled">
    <label for="toggler" tabindex="0" class="sr-only">
      Close menu
    </label>

    <!-- menu contents -->
  </div>
</div>
```
