UnFuckGoogleEnd = ->
    PREVIEW_CLASSDEF = 'vspib'
    REDIRECT_CLASSDEFS = ['r', 'fc']
    
    #
    # Preview functionality removal
    #
    
    removePreviewActivators = (divs) ->
        if divs.length > 0
            for i in [divs.length-1..0]
                divs[i]?.parentNode.removeChild(divs[i])
    
    # Find and remove the preview activator divs that exist at page load
    previewActivators = document.getElementsByClassName(PREVIEW_CLASSDEF)
    removePreviewActivators(previewActivators)
    
    # Listen for DOM insertions and look for new preview activator divs
    showMorePreviewRemoval = ->
        newPreviewActivators = document.getElementsByClassName(PREVIEW_CLASSDEF)
        removePreviewActivators(newPreviewActivators)
    document.addEventListener('DOMNodeInsertedIntoDocument', showMorePreviewRemoval, true)
    
    #
    # Result link to onmousedown-toggled google.com redirect removal
    #
    
    removeRedirectOnmousedowns = (containers) ->
        for cls in REDIRECT_CLASSDEFS
            containers = document.getElementsByClassName(cls)
            for container in containers
                for link in container.getElementsByTagName('a')
                    link.removeAttribute('onmousedown')
    document.addEventListener('DOMNodeInsertedIntoDocument', removeRedirectOnmousedowns, true)
