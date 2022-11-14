import base from './abstract'

export default abstract class extends base {

    protected keywordRegex() {
        // don't bother searching for the keywords to appear somewhere magically
        // just match every block, and search for the keywords within them after
        // this is easier, and orders of magnitude faster, than trying to search
        // for the block with the keyword present somewhere, etc
        return ''
    }

    protected removeKeyWord(hint: string) {
        return hint
            .trim()
            .split(/\s+/)
            .slice(1)
            .join(' ')
    }

    protected matches(sourceCode: SourceCode, keywords: Keywords, head: string, tail: string): HintMatches {
        return super.matches(sourceCode, keywords, head, tail)
            .map((match: HintMatch): HintMatch => {
                const lines = match.hint
                    .trim()
                    .split(/\n/)
                    .map(line => line.trim())

                // strip off lines until we find one that starts with a hint
                while(lines.length) {
                    const line = lines[0]

                    if (keywords.some(keyword => line.startsWith(keyword))) {
                        lines[0] = line // restore as a cleaned version, with the hint prefixed
                        break
                    }
                    else {
                        lines.shift() // get rid of this line
                    }
                }

                const curr = lines.join("\n")

                return {
                    ...match,
                    curr,
                    hint: this.removeKeyWord(curr),
                }
            })
            .filter(match => match.hint.length)
    }

}
