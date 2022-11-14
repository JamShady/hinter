type SourceCode = string
type Keyword = string
type Keywords = Keyword[]

type HintMatch = {
    full: string
    hint: string
}
type HintMatches = HintMatch[]

interface Matcher {
    matches: (sourceCode: SourceCode, keywords: Keywords) => HintMatches
}
