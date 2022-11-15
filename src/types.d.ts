type SourceCode = string
type Keyword = string
type Keywords = Keyword[]

type HintMatch = {
    full: string
    curr: string
    hint: string
}
type HintMatches = HintMatch[]

type Variable = string
type Variables = {
    [key:string]: Variable[]
}

interface Matcher {
    matches: (sourceCode: SourceCode, keywords: Keywords, variables: Variables) => HintMatches
}

type Hinter = (sourceCode: SourceCode, variables: Variables, triggers: Keyword|Keywords) => SourceCode
