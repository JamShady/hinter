import EolSearch from './comments/eol'
import HashSearch from './comments/hash'
import HtmlSearch from './comments/html'
import BlockSearch from './comments/block'
import InlineSearch from './inline'

export default [
    new EolSearch(),
    new HashSearch(),
    new HtmlSearch(),
    new BlockSearch(),
    new InlineSearch(),
] as Matcher[]
