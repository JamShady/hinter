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
     * Parses a hint into an array of classes
     */
    public parse = (hint: string) => this.hints(hint)

}
