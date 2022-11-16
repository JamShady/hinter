export default class implements Matcher {

    public matches(sourceCode: SourceCode, _keywords: Keywords, variables: Variables = {}): HintMatches {
        const empty: HintMatches = []


        const keys = Object.keys(variables)
        if (!keys.length) {
            return empty // there are no variables
        }


        // { 'key':'keys' }
        const map = keys
            .map(plural => ({
                plural: plural,
                single: plural
                    .replace(/ies$/, 'y')
                    .replace(/s$/, ''),
            }))
            .filter(({ single }) => ['${','.'].some(prefix => sourceCode.includes(prefix + single + '}')))
            .map(({ plural, single }) => ({ [single]: plural }))
            .reduce((prev, curr) => ({ ...prev, ...curr }), {})

        const singles = Object.keys(map)
        if (!singles.length) {
            return empty // there are no matching variables within the sourceCode
        }

        const matchKnownVariables = '\\${(?:\\w+\\.)*(' + singles.join('|') + ')}'
        const knownVariables = new RegExp(matchKnownVariables, 'g')

        const allPotentialClassesWithOurKnownVariables = new RegExp([
            // any number of class leads and prefixes
            // '([\\w\\d]+(-|:)?)*',

            // match until we hit anything that could be part of the class definition
            // careful to accommodate variable definitions that we may not recognise
            '[^\\s\'`"]*',

            // variables
            matchKnownVariables,

            // match until we hit anything definitely not part of the class definition
            // don't prevent more variable definitions!!
            '[^\\s\'`"]*',

            // custom value
            // '(\[.*?\])?',
        ].join(''), 'gm')

        return (sourceCode.match(allPotentialClassesWithOurKnownVariables) as string[] || empty)
            .filter((match, index, self) => self.indexOf(match) === index)
            .map(match => ({
                full: match,
                curr: match,
                hint: match.replace(
                    knownVariables,
                    (_full, name) => '$' + map[name]
                )
            }))
    }

}