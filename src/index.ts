import matchers from './matchers'
import Parser from './parser'

const hinter: Hinter = (sourceCode: SourceCode, variables: Variables = {}, triggers: Keyword|Keywords = 'hint'): SourceCode => {
    const keywords = Array.isArray(triggers)
        ? triggers
        : [triggers]

    const p = new Parser

    matchers.forEach(matcher => matcher
        .matches(sourceCode, keywords, variables)
        .forEach(({ full, curr, hint }) => {
            sourceCode = sourceCode.replace(
                full, // replace the original full search match...
                full.replace( // ... with the same, but replace...
                    curr, // ... the current content with
                    ' ' + p.parse(hint, variables).join(' ') + ' ' // our newly parsed variables
                )
            )
        })
    )

    return sourceCode
}

export default hinter
