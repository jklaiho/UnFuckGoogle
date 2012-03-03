document.addEventListener("DOMContentLoaded", ->
    # Google uses a "color: #fff !important" CSS clause on the currently 
    # selected top bar element. For some reason (probably extension element
    # loading order technicalities), in Chrome our style override in
    # UnFuckGoogle.css is not getting precedence. So, set the style on the
    # element itself for maximum specificity.
    document.getElementsByClassName('gbz0l')[0].lastChild.setAttribute('style', 'color:black !important')
, false)
