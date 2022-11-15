export default abstract class {
    protected keywordRegex(keywords: Keywords): string;
    protected contentRegex(): string;
    protected regex(head: string, keywords: Keywords, tail: string): string;
    protected matches(sourceCode: SourceCode, keywords: Keywords, head: string, tail?: string): HintMatches;
}
