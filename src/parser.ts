export default class {

    /**
     * 'foo bar' => ['foo','bar']
     */
    protected hints = (hint: string) => hint // text-(red|blue)
     // .replace(/\*/g, '') // remove *'s from docblock matches
        .trim() // remove excess whitespace
        .split(/\s+/) // split on the whitespace into an array
        .map(hint => hint.trim()) // trim each hint
        .filter((hint, index, self) => self.indexOf(hint) === index)

    /**
     * foo(-bar)? => foo(-bar|)
     */
    protected optional = (hint: string) => hint.replaceAll(')?','|)')

    /**
     * foo-(bip|bap)-bar => ['foo-bip-bar', 'foo-bap-bar']
     */
    protected expand = (hint: string): string[] => {
        if (hint.includes('(') && hint.includes(')')) {
            const matches = hint.match(/\(([^*(]+?)\)/) // foo-(bip|bap)-bar
            if (matches) {  // ['(bip|bap)', 'bip|bap']
                return matches[1]   // bip|bap
                    .split('|') // ['bip','bap']
                    .map(option => hint.replace(matches[0], option)) // 'foo-(bip|bap)-bar'.replace('(bip|bap)','bip')
                    .map(this.expand)
                    .flat()
            }
        }

        return [hint] // convert to an array
    }

    /**
     * Generates a callback to replace all the variables within a hint, i.e. given colors=blue|red
     * foo-$colors-bar => foo-(blue|red)-bar
     */
    protected replace = (hint: string, variables: Variables) => {
        // replace all variables in order of length (i.e. longest first)
        const keys = Object.keys(variables).sort((a, b) => b.length - a.length)
        keys.forEach(key => {
            if (hint.includes(`$${key}`)) {
                hint = hint.replaceAll(`$${key}`, `(${variables[key].join('|')})`)
            }
        })
        return hint
    }

    /**
     * Generates a callback to process each hint, respecting variable assignment and expansion
     */
    protected processWith = (variables: Variables) => (hint: string): string[] => {
        if (hint.includes('=')) {
            const [key,val] = hint.split('=')
            variables[key] = val.split('|')
            return []
        }

        hint = this.replace(hint, variables)
        return this.expand(hint)
    }

    /**
     * Parses a hint into an array of classes
     */
    public parse = (hint: string, variables: Variables = {}) => this.hints(this.optional(hint))
        .map(this.processWith(variables))
        .flat()
        .filter((hint, index, self) => self.indexOf(hint) === index)

}
