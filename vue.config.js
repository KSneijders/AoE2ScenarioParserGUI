module.exports = {
    // Needs to be '' so that the built html file doesn't output asset filenames with a forward slash.
    publicPath: '',
    configureWebpack: {
        output: {
            // The filenames need to have a ./ otherwise Electron won't be able to find the files.
            filename: './[name].js',
            chunkFilename: './[name].js',
        },
        watchOptions: {
            // Ignore items for webpack rebuilds. Electron reloads aren't affected by this
            // For electron reloads, check electron/main.js (top of the file)
            ignored: [
                'node_modules/**/*',
                'logs/**/*',
                'public/**/*'
            ],
        }
    },
}
