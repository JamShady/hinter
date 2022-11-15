export default class implements Matcher {
    matches(sourceCode: SourceCode, _keywords: Keywords, variables?: Variables): HintMatches;
}
