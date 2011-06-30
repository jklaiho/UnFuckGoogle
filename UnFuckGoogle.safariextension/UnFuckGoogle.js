/*
UnFuckGoogle Safari Extension v1.0 by JK Laiho (jklaiho@iki.fi)

This script removes annoying stuff from Google.

Current features (more features in UnFuckGoogle.css):

* Removes +1 buttons from search results (a plain CSS approach didn't suffice)
* Removes the annoying activation of instant previews through the clicking of
  empty areas near the results. Now only activated when clicking the
  magnifying glass icon.

As of this writing, the layout on various "*.google.*" subdomains is pretty
inconsistent. As a first pass, naively apply the changes on all subdomains
except "mail.google.*". My JavaScript-fu is weak, so expect bad code.

This script is set to run on all sites, and the domain checking is done here
due to the Safari Extension Builder's whitelisting/blacklisting not being
very powerful, e.g. not allowing wildcards on TLDs.

Future versions may fix bugs or oversights, be more efficient, remove
additional annoyances, or introduce settings to configure what stuff to
remove.
*/

if (window.top === window) {
    var tehGoogles = /\.google\.\w+(\.\w+)?$/;
    var subdomain = document.domain.split('.')[0];

    if (tehGoogles.test(document.domain) && subdomain !== 'mail') {
        /* +1 button removal */
        var removePlusOnes = function(buttons) {
            if (buttons.length !== 0) {
                for (var i = buttons.length-1; i >= 0; i--) {
                    var undoDiv = document.getElementById(buttons[i].getAttribute('g:undo'));
                    buttons[i].parentNode.removeChild(buttons[i]);
                    undoDiv.parentNode.removeChild(undoDiv);
                }
            }
        };
        var plusOneButtons = document.getElementsByClassName('esw eswd');
        removePlusOnes(plusOneButtons);
        
        /* +1 button removal for items dynamically created after clicking
        "Show more results...", not caught by getElementsByClassName above */
        var showMorePlusRemoval = function(e) {
            var elem = e.target;
            var newPlusOneButtons = document.getElementsByClassName('esw eswd');
            removePlusOnes(newPlusOneButtons);
        };
        document.addEventListener('DOMNodeInsertedIntoDocument', showMorePlusRemoval, true);
        
        /* Disabling activation of previews by clicking areas around results */
        var preventPreview = function(e) {
            var elem = e.target;
            var shouldPrevent = false;
            /* Recurse up the chain of nodes with a JSLint-angering assignment
            inside the while statement */
            do {
                if (elem.tagName === 'A' || elem.tagName === 'BUTTON' || elem.tagName === 'BODY') {
                    break;
                }
                if (elem.className.indexOf('vsc') !== -1 ||
                    elem.className.indexOf('vspi') !== -1) {
                    shouldPrevent = true;
                    break;
                }
            } while (elem = elem.parentNode);
            
            if (shouldPrevent) {
                /* This is a bit brutal perhaps, but the preview functionality
                seems to be buried so deep within obfuscated anonymous
                event handler functions that I gave up on a finer-grained
                approach. */
                e.stopPropagation();
            }
        };
        document.addEventListener('click', preventPreview, true);
    }
}