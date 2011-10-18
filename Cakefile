fs      = require('fs')
{exec}  = require('child_process')

buildDirs = {
    'safari': 'safari/UnFuckGoogle.safariextension'
    'chrome': 'chrome'
}

distDirs = {
    'safari': 'safari/dist'
    'chrome': 'chrome/dist'
}

coffeeSources = {
    'safari': {
        'start': [
            'UnFuckGoogleStart.coffee'
            "safari/start.coffee"
        ]
        'end': [
            'UnFuckGoogleEnd.coffee'
            "safari/end.coffee"
        ]
    }
    'chrome': {
        'start': [
            'UnFuckGoogleStart.coffee'
            "chrome/run.coffee"
        ]
        'end': [
            'UnFuckGoogleEnd.coffee'
            "chrome/end.coffee"
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
            fs.writeFile("#{buildDir}/_#{browser}_#{target}_temp.coffee", fileContents[target].join('\n\n'), 'utf8', (err) -> 
                throw err if err
                exec("coffee -c #{buildDir}/_#{browser}_#{target}_temp.coffee", (err, stdout, stderr) ->
                    throw err if err
                    console.log(stdout + stderr) if stdout or stderr
                    fs.rename("#{buildDir}/_#{browser}_#{target}_temp.js", "#{buildDir}/#{target}.js", (err) -> throw err if err)
                    fs.unlink("#{buildDir}/_#{browser}_#{target}_temp.coffee", (err) -> throw err if err)
                )
            )
            exec("cp UnFuckGoogle.css #{buildDir}/", (err) -> throw err if err)

task('build_safari', "Prepare #{buildDirs['safari']}/ for Extension Builder processing", ->
    build('safari')
    console.log("Safari build complete. Now run the Extension Builder on #{buildDirs['safari']}")
)

task('build_chrome', "Prepare #{buildDirs['chrome']}/ for TODO processing", ->
    # build('chrome')
    # console.log("Chrome build complete. Now TODO the TODO")
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
        "#{safBd}/_safari_start_temp.coffee"
        "#{safBd}/_safari_end_temp.coffee"
        "#{safBd}/_safari_start_temp.js"
        "#{safBd}/_safari_end_temp.js"
        
        "#{chrBd}/UnFuckGoogle.css"
        "#{chrBd}/_chrome_start_temp.coffee"
        "#{chrBd}/_chrome_start_temp.js"
        "#{chrBd}/_chrome_end_temp.coffee"
        "#{chrBd}/_chrome_end_temp.js"
    ].map(rm)
)

task('clean_dist', "Remove the distributable extensions created by Chrome and Safari out of the build products", ->
    [
        # Only remove the .safariextz file, not UnFuckGoogle.plist since that's
        # created by hand, not by Extension Builder
        "#{distDirs['safari']}/UnFuckGoogle.safariextz"
    ].map(rm)
)