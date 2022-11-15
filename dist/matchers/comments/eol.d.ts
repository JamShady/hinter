import { default as base } from './abstract';
/**
 * Matches End-of-Line comments, i.e. // these comments
 */
export default class extends base implements Matcher {
    matches(sourceCode: SourceCode, keywords: Keywords): HintMatches;
}
