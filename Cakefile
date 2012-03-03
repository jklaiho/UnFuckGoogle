fs      = require('fs')
{exec}  = require('child_process')

# Chrome is stupid about the target dirs of packaged extensions. If built in
# the directory named below, the .crx and .pem files will end up in
# chrome/build (the parent directory) with no option of changing the output
# path. For this reason, chrome/build is also the dist directory.
buildDirs = {
    'safari': 'safari/UnFuckGoogle.safariextension'
    'chrome': 'chrome/build/UnFuckGoogle'
}

distDirs = {
    'safari': 'safari/dist'
    'chrome': 'chrome/build'
}

coffeeSources = {
    'safari': {
        'UnFuckGoogle': [
            "safari/preflight.coffee"
            'UnFuckGoogle.coffee'
        ]
    }
    'chrome': {
        'UnFuckGoogle': [
            "chrome/preflight.coffee"
            'UnFuckGoogle.coffee'
        ]
    }
}

build = (browser) ->
    if not coffeeSources.hasOwnProperty(browser) then throw "Invalid target: #{browser}"
    buildDirExists = false
    try
        if fs.statSync(buildDirs[browser]).isDirectory() then buildDirExists = true
    catch error then # do nothing
    if not buildDirExists then fs.mkdirSync(buildDirs[browser])
    buildDir = buildDirs[browser]
    
    # Concatenate the files listed in coffeeSources and compile the output
    # into JavaScript
    fileContents = {}
    remaining = {}
    for target, sources of coffeeSources[browser] then do (target, sources) ->
        fileContents[target] = []
        remaining[target] = sources.length
        for file, i in sources then do (file, i) ->
            fs.readFile(file, 'utf8', (err, contents) ->
                throw err if err
                fileContents[target][i] = contents
                return process(target, buildDir) if --remaining[target] == 0
            )
        
        process = (target, buildDir) ->
            tempName = "_#{browser}_#{target}_temp"
            fs.writeFile("#{buildDir}/#{tempName}.coffee", fileContents[target].join('\n\n'), 'utf8', (err) -> 
                throw err if err
                exec("coffee -c #{buildDir}/#{tempName}.coffee", (err, stdout, stderr) ->
                    throw err if err
                    console.log(stdout + stderr) if stdout or stderr
                    fs.rename("#{buildDir}/#{tempName}.js", "#{buildDir}/#{target}.js", (err) -> throw err if err)
                    fs.unlink("#{buildDir}/#{tempName}.coffee", (err) -> throw err if err)
                )
            )
            exec("cp UnFuckGoogle.css #{buildDir}/", (err) -> throw err if err)

task('build_safari', "Prepare #{buildDirs['safari']}/ for Extension Builder processing", ->
    build('safari')
    console.log("Safari build complete. Now run the Extension Builder on #{buildDirs['safari']}")
)

task('build_chrome', "Prepare #{buildDirs['chrome']}/ for Extension Manager processing", ->
    build('chrome')
    console.log("Chrome build complete. Now run the Extension Manager on #{buildDirs['chrome']}")
)

task('build', "Prepare the Safari and Chrome build directories for distributable extension creation", ->
    invoke('build_safari')
    invoke('build_chrome')
)

rm = (file) ->
    try
        fs.unlinkSync(file)
    catch error then # do nothing, not fatal if this fails

task('clean', "Remove the products of any previous build runs (successful or failed)", ->
    safBd = buildDirs['safari']
    chrBd = buildDirs['chrome']
    [
        "#{safBd}/UnFuckGoogle.css"
        "#{safBd}/UnFuckGoogle.js"
        "#{safBd}/_safari_UnFuckGoogle_temp.coffee"
        "#{safBd}/_safari_UnFuckGoogle_temp.js"
        
        "#{chrBd}/UnFuckGoogle.css"
        "#{chrBd}/UnFuckGoogle.js"
        "#{chrBd}/_chrome_UnFuckGoogle_temp.coffee"
        "#{chrBd}/_chrome_UnFuckGoogle_temp.js"
    ].map(rm)
)

task('clean_dist', "Remove the distributable extensions created by Chrome and Safari extension machinery", ->
    # Only remove the generated packages, not the update mechanism files
    [
        "#{distDirs['safari']}/UnFuckGoogle.safariextz"
        # The .pem file is ignored by git, no need to delete. Makes future
        # updates using the private key easier.
        "#{distDirs['chrome']}/UnFuckGoogle.crx"
    ].map(rm)
)