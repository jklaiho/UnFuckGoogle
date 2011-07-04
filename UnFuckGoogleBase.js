SetupUnFuckGoogle = function () {
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