.PHONY: build
build: chrome/manifest.json chrome/load.js UnFuckGoogleBase.js UnFuckGoogle.safariextension/UnFuckGoogle.css
	mkdir -p build
	cp $^ build
