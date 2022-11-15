import { default as base } from './abstract';
/**
 * Matches Hash comments, i.e. # these comments
 */
export default class extends base implements Matcher {
    matches(sourceCode: SourceCode, keywords: Keywords): HintMatches;
}
