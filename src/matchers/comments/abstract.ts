export default abstract class {

    protected keywordRegex(keywords: Keywords) {
        // keywords can have optional trailing semicolon
        // they can also be preceded by any number of spaces,
        // and must be followed by at least a space (because our content will certainly follow)
        return '\\s*(?:' + keywords.join(':?|') + ':?)\\s+'
    }

    protected contentRegex() {
        return '(.*?)'
    }

    protected regex(head: string, keywords: Keywords, tail: string) {
        return head +
            this.keywordRegex(keywords) +
            this.contentRegex() +
            tail
    }

    protected matches(sourceCode: SourceCode, keywords: Keywords, head: string, tail: string = '$'): HintMatches {
        const regexp = this.regex(head, keywords, tail)
        const global = new RegExp(regexp, 'misg') // returns an array of each match, no breakdown
        const single = new RegExp(regexp, 'mis')  // returns a breakdown of the first match

        // @ts-ignore
        return (sourceCode.match(global) || [])     // find all the matches
            .map(match => {                         // foreach match...
                const parts = match.match(single)   // ... parse into the full match, as well as the hint itself
                if (parts) {
                    const [full, hint] = parts
                    return {
                        full,
                        curr: hint,
                        hint,
                    }
                }
                return undefined // keep typescript happy
            })
            .filter(match => !!match)
    }

}
