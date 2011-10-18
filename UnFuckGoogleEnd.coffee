UnFuckGoogleEnd = ->
    PREVIEW_CLASSDEF = 'vspib'
    
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
