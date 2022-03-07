const { ESLint } = require('eslint')

const removeIgnoredFiles = async (files) => {
    const eslint = new ESLint()
    const isIgnored = await Promise.all(
        files.map((file) => {
        return eslint.isPathIgnored(file)
        })
    )
        const filteredFiles = files.filter((_, i) => !isIgnored[i])
        return filteredFiles.join(' ')
    }

module.exports = {
    'src/**/*.{js,jsx,ts,tsx,html,css,scss}': async (files) => {
        const filesToLint = await removeIgnoredFiles(files)
        return [`npx prettier --write ${filesToLint}`, `npx eslint ${filesToLint}`]
    },
}