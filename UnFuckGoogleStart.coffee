UnFuckGoogleStart = ->
    PLUSONE_CLASSDEF = 'esw eswd'
    
    removePlusOnes = (buttons) ->
        if buttons.length > 0
            for i in [buttons.length-1..0]
                undoDiv = document.getElementById(buttons[i].getAttribute('g:undo'))
                buttons[i].parentNode.removeChild(buttons[i])
                undoDiv.parentNode.removeChild(undoDiv)
    
    # Find and remove the +1 buttons that exist at page load
    plusOneButtons = document.getElementsByClassName(PLUSONE_CLASSDEF)
    removePlusOnes(plusOneButtons)
    
    # Listen for DOM insertions and look for new +1 buttons
    showMorePlusRemoval = ->
        newPlusOneButtons = document.getElementsByClassName(PLUSONE_CLASSDEF)
        removePlusOnes(newPlusOneButtons)
    document.addEventListener('DOMNodeInsertedIntoDocument', showMorePlusRemoval, true)
