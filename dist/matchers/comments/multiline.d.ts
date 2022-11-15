import { default as base } from './abstract';
export default abstract class extends base {
    protected keywordRegex(): string;
    protected removeKeyWord(hint: string): string;
    protected matches(sourceCode: SourceCode, keywords: Keywords, head: string, tail: string, lineNormaliser?: (line: string) => string): HintMatches;
}
