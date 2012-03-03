UnFuckGoogle = ->
    PREVIEW_CLASSDEF = 'vspib'
    REDIRECT_CLASSDEFS = ['r', 'fc']
    PLUSONE_CLASSDEF = 'esw eswd'
    
    #
    # Preview functionality removal
    #
    removePreviewActivators = ->
        elems = document.getElementsByClassName(PREVIEW_CLASSDEF)
        if elems.length > 0
            for i in [elems.length-1..0]
                elems[i].parentNode.removeChild(elems[i])
    removePreviewActivators()
    document.addEventListener('DOMNodeInsertedIntoDocument', removePreviewActivators, true)
    
    #
    # Result link to onmousedown-toggled google.com redirect removal
    #
    removeRedirectOnmousedowns = (containers) ->
        for cls in REDIRECT_CLASSDEFS
            elems = document.getElementsByClassName(cls)
            for elem in elems
                for link in elem.getElementsByTagName('a')
                    link.removeAttribute('onmousedown')
    removeRedirectOnmousedowns()
    document.addEventListener('DOMNodeInsertedIntoDocument', removeRedirectOnmousedowns, true)
    
    #
    # +1 Button removal
    #
    removePlusOnes = ->
        buttons = document.getElementsByClassName(PLUSONE_CLASSDEF)
        undoDivs = []
        if buttons.length > 0
            for i in [buttons.length-1..0]
                undoDivs.push(document.getElementById(buttons[i].getAttribute('g:undo')))
                buttons[i].parentNode.removeChild(buttons[i])
            for i in [undoDivs.length-1..0]
                undoDivs[i].parentNode.removeChild(undoDivs[i])
    removePlusOnes()
    document.addEventListener('DOMNodeInsertedIntoDocument', removePlusOnes, true)
