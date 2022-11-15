import { default as base } from './multiline';
/**
 * Matches HTML comments, i.e. <!-- these ones -->
 */
export default class extends base implements Matcher {
    matches(sourceCode: SourceCode, keywords: Keywords): HintMatches;
}
