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
        SetupUnFuckGoogle();
    }
}