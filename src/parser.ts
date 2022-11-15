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
     * foo-(bip|bap)-bar => ['foo-bip-bar', 'foo-bap-bar']
     */
    protected expand = (hint: string): string[] => {
        if (hint.includes('(') && hint.includes(')')) {
            const matches = hint.match(/\(([^*(]+?)\)/) // foo-(bip|bap)-bar
            if (matches) {  // ['(bip|bap)', 'bip|bap']
                return matches[1]   // bip|bap
                    .split('|') // ['bip','bap']
                    .map(option => hint.replace(matches[0], option)) // 'foo-(bip|bap)-bar'.replace('(bip|bap)','bip')
            }
        }

        return [hint] // convert to an array
    }


    /**
     * Parses a hint into an array of classes
     */
    public parse = (hint: string) => this.hints(hint)
        .map(this.expand)
        .flat()

}
