# UnFuckGoogle Safari/Chrome Extension v1.1 by JK Laiho (jklaiho@iki.fi)
SetupUnFuckGoogle = ->
    PLUSONE_CLASSDEF = 'esw eswd'
    PREVIEW_CLASSDEF = 'vspib'
    
    removePlusOnes = (buttons) ->
        for i in [buttons.length-1..0]
            undoDiv = document.getElementById(buttons[i].getAttribute('g:undo'))
            buttons[i].parentNode.removeChild(buttons[i])
            undoDiv.parentNode.removeChild(undoDiv)
    
    removePreviewActivators = (divs) ->
        for i in [divs.length-1..0]
            divs[i]?.parentNode.removeChild(divs[i])
    
    # Find and remove the +1 buttons that exist at page load
    plusOneButtons = document.getElementsByClassName(PLUSONE_CLASSDEF)
    removePlusOnes(plusOneButtons)
    
    # Listen for DOM insertions and look for new +1 buttons
    document.addEventListener('DOMNodeInsertedIntoDocument', showMorePlusRemoval, true)
    showMorePlusRemoval = ->
        newPlusOneButtons = document.getElementsByClassName(PLUSONE_CLASSDEF)
        removePlusOnes(newPlusOneButtons)
    
    # Find and remove the preview activator divs that exist at page load
    previewActivators = document.getElementsByClassName(PREVIEW_CLASSDEF)
    removePreviewActivators(previewActivators)
    
    # Listen for DOM insertions and look for new preview activator divs
    document.addEventListener('DOMNodeInsertedIntoDocument', showMorePreviewRemoval, true)
    showMorePreviewRemoval = ->
        newPreviewActivators = document.getElementsByClassName(PREVIEW_CLASSDEF)
        removePreviewActivators(newPreviewActivators)
