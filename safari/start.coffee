# The Safari extension builder doesn't support the use of TLD wildcards, so
# we need to do the domain wildcarding here.
if window.top == window
    tehGoogles = /\.google\.\w+(\.\w+)?$/
    subdomain = document.domain.split('.')[0]
    if tehGoogles.test(document.domain)
        document.addEventListener("DOMContentLoaded", ->
            UnFuckGoogleStart()
        true)
