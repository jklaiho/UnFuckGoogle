UnFuckGoogle
============

UnFuckGoogle is an extension for Safari and Chrome that removes various
annoyances from Google.

The current features are as follows:

* Search results:
  * remove +1 buttons
  * disable page previews
  * remove the prompts to add your Twitter account to your Google profile
* Global:
  * restore the top navigation bar to its original white background

To build the extension, you need Node.js and CoffeeScript. Run `cake` at the
root of the cloned repo (where `Cakefile` resides) for the available commands.
The build products will go in their respective locations under `safari/` and
`chrome/`.

You will have to package the build products into distributable form by using
Extension Builder (Safari) and Extension Management (Chrome). See Apple's and
Google's developer documentation for details.

For more information and a downloadable version of the extension, go to
[http://jklaiho.net/UnFuckGoogle/](http://jklaiho.net/UnFuckGoogle/)
