var g = Object.defineProperty;
var w = (n, e, s) => e in n ? g(n, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[e] = s;
var m = (n, e, s) => w(n, typeof e != "symbol" ? e + "" : e, s);
class x {
  keywordRegex(e) {
    return "\\s*(?:" + e.join(":?|") + ":?)\\s+";
  }
  contentRegex() {
    return "(.*?)";
  }
  regex(e, s, r) {
    return e + this.keywordRegex(s) + this.contentRegex() + r;
  }
  matches(e, s, r, t = "$") {
    const l = this.regex(r, s, t), a = new RegExp(l, "misg"), i = new RegExp(l, "mis");
    return (e.match(a) || []).map((o) => {
      const h = o.match(i);
      if (h) {
        const [u, c] = h;
        return {
          full: u,
          curr: c,
          hint: c
        };
      }
    }).filter((o) => !!o);
  }
}
class y extends x {
  matches(e, s) {
    return super.matches(e, s, "//");
  }
}
class k extends x {
  matches(e, s) {
    return super.matches(e, s, "#");
  }
}
class d extends x {
  keywordRegex() {
    return "";
  }
  removeKeyWord(e) {
    return e.trim().split(/\s+/).slice(1).join(" ");
  }
  matches(e, s, r, t, l = (a) => a) {
    return super.matches(e, s, r, t).map((a) => {
      const i = a.hint.trim().split(/\n/);
      for (; i.length; ) {
        const h = l(i[0]).trim();
        if (s.some((u) => h.startsWith(u))) {
          i[0] = h;
          break;
        } else
          i.shift();
      }
      const o = i.join(`
`);
      return {
        ...a,
        curr: o,
        hint: this.removeKeyWord(o)
      };
    }).filter((a) => a.hint.length);
  }
}
class $ extends d {
  matches(e, s) {
    return super.matches(e, s, "<!-{2,}", "-{2,}>");
  }
}
class j extends d {
  matches(e, s) {
    return super.matches(
      e,
      s,
      "/\\*+",
      "\\*+/",
      (r) => r.replace(/^\s*\*+/, "")
    );
  }
}
class R {
  matches(e, s, r = {}) {
    const t = [], l = Object.keys(r);
    if (!l.length)
      return t;
    const a = l.map((c) => ({
      plural: c,
      single: c.replace(/ies$/, "y").replace(/s$/, "")
    })).filter(({ single: c }) => ["${", "."].some((p) => e.includes(p + c + "}"))).map(({ plural: c, single: p }) => ({ [p]: c })).reduce((c, p) => ({ ...c, ...p }), {}), i = Object.keys(a);
    if (!i.length)
      return t;
    const o = "\\${(?:\\w+\\.)*(" + i.join("|") + ")}", h = new RegExp(o, "g"), u = new RegExp([
      // any number of class leads and prefixes
      // '([\\w\\d]+(-|:)?)*',
      // match until we hit anything that could be part of the class definition
      // careful to accommodate variable definitions that we may not recognise
      "[^\\s'`\"]*",
      // variables
      o,
      // match until we hit anything definitely not part of the class definition
      // don't prevent more variable definitions!!
      "[^\\s'`\"]*"
      // custom value
      // '(\[.*?\])?',
    ].join(""), "gm");
    return (e.match(u) || t).filter((c, p, f) => f.indexOf(c) === p).map((c) => ({
      full: c,
      curr: c,
      hint: c.replace(
        h,
        (p, f) => "$" + a[f]
      )
    }));
  }
}
const E = [
  new y(),
  new k(),
  new $(),
  new j(),
  new R()
];
class b {
  constructor() {
    /**
     * 'foo bar' => ['foo','bar']
     */
    m(this, "hints", (e) => e.trim().split(/\s+/).map((s) => s.trim()).filter((s, r, t) => t.indexOf(s) === r));
    /**
     * foo(-bar)? => foo(-bar|)
     */
    m(this, "optional", (e) => e.replaceAll(")?", "|)"));
    /**
     * foo-(bip|bap)-bar => ['foo-bip-bar', 'foo-bap-bar']
     */
    m(this, "expand", (e) => {
      if (e.includes("(") && e.includes(")")) {
        const s = e.match(/\(([^*(]+?)\)/);
        if (s)
          return s[1].split("|").map((r) => e.replace(s[0], r)).map(this.expand).flat();
      }
      return [e];
    });
    /**
     * Generates a callback to replace all the variables within a hint, i.e. given colors=blue|red
     * foo-$colors-bar => foo-(blue|red)-bar
     */
    m(this, "replace", (e, s) => (Object.keys(s).sort((t, l) => l.length - t.length).forEach((t) => {
      e.includes(`$${t}`) && (e = e.replaceAll(`$${t}`, `(${s[t].join("|")})`));
    }), e));
    /**
     * Generates a callback to process each hint, respecting variable assignment and expansion
     */
    m(this, "processWith", (e) => (s) => {
      if (s = this.replace(s, e), s.includes("=")) {
        const [r, t] = s.split("=");
        return e[r] = t.split("|"), [];
      }
      return this.expand(s);
    });
    /**
     * Parses a hint into an array of classes
     */
    m(this, "parse", (e, s = {}) => this.hints(this.optional(e)).map(this.processWith(s)).flat().filter((r, t, l) => l.indexOf(r) === t));
  }
}
const W = (n, e = {}, s = "hint") => {
  const r = Array.isArray(s) ? s : [s], t = new b();
  return E.forEach(
    (l) => l.matches(n, r, e).forEach(({ full: a, curr: i, hint: o }) => {
      n = n.replace(
        a,
        // replace the original full search match...
        a.replace(
          // ... with the same, but replace...
          i,
          // ... the current content with
          " " + t.parse(o, e).join(" ") + " "
          // our newly parsed variables
        )
      );
    })
  ), n;
};
export {
  W as default
};
