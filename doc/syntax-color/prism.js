var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (e) {
    var a = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
      n = 0,
      t = {},
      r = {
        manual: e.Prism && e.Prism.manual,
        disableWorkerMessageHandler:
          e.Prism && e.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(a) {
            return a instanceof s
              ? new s(a.type, e(a.content), a.alias)
              : Array.isArray(a)
              ? a.map(e)
              : a
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id
            );
          },
          clone: function e(a, n) {
            var t, s;
            switch (((n = n || {}), r.util.type(a))) {
              case "Object":
                if (n[(s = r.util.objId(a))]) return n[s];
                for (var i in ((t = {}), (n[s] = t), a))
                  a.hasOwnProperty(i) && (t[i] = e(a[i], n));
                return t;
              case "Array":
                return n[(s = r.util.objId(a))]
                  ? n[s]
                  : ((t = []),
                    (n[s] = t),
                    a.forEach(function (a, r) {
                      t[r] = e(a, n);
                    }),
                    t);
              default:
                return a;
            }
          },
          getLanguage: function (e) {
            for (; e; ) {
              var n = a.exec(e.className);
              if (n) return n[1].toLowerCase();
              e = e.parentElement;
            }
            return "none";
          },
          setLanguage: function (e, n) {
            (e.className = e.className.replace(RegExp(a, "gi"), "")),
              e.classList.add("language-" + n);
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw Error();
            } catch (e) {
              var a = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack) ||
                [])[1];
              if (a) {
                var n = document.getElementsByTagName("script");
                for (var t in n) if (n[t].src == a) return n[t];
              }
              return null;
            }
          },
          isActive: function (e, a, n) {
            for (var t = "no-" + a; e; ) {
              var r = e.classList;
              if (r.contains(a)) return !0;
              if (r.contains(t)) return !1;
              e = e.parentElement;
            }
            return !!n;
          },
        },
        languages: {
          plain: t,
          plaintext: t,
          text: t,
          txt: t,
          extend: function (e, a) {
            var n = r.util.clone(r.languages[e]);
            for (var t in a) n[t] = a[t];
            return n;
          },
          insertBefore: function (e, a, n, t) {
            var s = (t = t || r.languages)[e],
              i = {};
            for (var l in s)
              if (s.hasOwnProperty(l)) {
                if (l == a)
                  for (var o in n) n.hasOwnProperty(o) && (i[o] = n[o]);
                n.hasOwnProperty(l) || (i[l] = s[l]);
              }
            var u = t[e];
            return (
              (t[e] = i),
              r.languages.DFS(r.languages, function (a, n) {
                n === u && a != e && (this[a] = i);
              }),
              i
            );
          },
          DFS: function e(a, n, t, s) {
            s = s || {};
            var i = r.util.objId;
            for (var l in a)
              if (a.hasOwnProperty(l)) {
                n.call(a, l, a[l], t || l);
                var o = a[l],
                  u = r.util.type(o);
                "Object" !== u || s[i(o)]
                  ? "Array" !== u || s[i(o)] || ((s[i(o)] = !0), e(o, n, l, s))
                  : ((s[i(o)] = !0), e(o, n, null, s));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, a) {
          r.highlightAllUnder(document, e, a);
        },
        highlightAllUnder: function (e, a, n) {
          var t = {
            callback: n,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          r.hooks.run("before-highlightall", t),
            (t.elements = Array.prototype.slice.apply(
              t.container.querySelectorAll(t.selector)
            )),
            r.hooks.run("before-all-elements-highlight", t);
          for (var s, i = 0; (s = t.elements[i++]); )
            r.highlightElement(s, !0 === a, t.callback);
        },
        highlightElement: function (a, n, t) {
          var s = r.util.getLanguage(a),
            i = r.languages[s];
          r.util.setLanguage(a, s);
          var l = a.parentElement;
          l && "pre" === l.nodeName.toLowerCase() && r.util.setLanguage(l, s);
          var o = { element: a, language: s, grammar: i, code: a.textContent };
          function u(e) {
            (o.highlightedCode = e),
              r.hooks.run("before-insert", o),
              (o.element.innerHTML = o.highlightedCode),
              r.hooks.run("after-highlight", o),
              r.hooks.run("complete", o),
              t && t.call(o.element);
          }
          if (
            (r.hooks.run("before-sanity-check", o),
            (l = o.element.parentElement) &&
              "pre" === l.nodeName.toLowerCase() &&
              !l.hasAttribute("tabindex") &&
              l.setAttribute("tabindex", "0"),
            !o.code)
          )
            return r.hooks.run("complete", o), void (t && t.call(o.element));
          if ((r.hooks.run("before-highlight", o), o.grammar)) {
            if (n && e.Worker) {
              var g = new Worker(r.filename);
              (g.onmessage = function (e) {
                u(e.data);
              }),
                g.postMessage(
                  JSON.stringify({
                    language: o.language,
                    code: o.code,
                    immediateClose: !0,
                  })
                );
            } else u(r.highlight(o.code, o.grammar, o.language));
          } else u(r.util.encode(o.code));
        },
        highlight: function (e, a, n) {
          var t = { code: e, grammar: a, language: n };
          if ((r.hooks.run("before-tokenize", t), !t.grammar))
            throw Error('The language "' + t.language + '" has no grammar.');
          return (
            (t.tokens = r.tokenize(t.code, t.grammar)),
            r.hooks.run("after-tokenize", t),
            s.stringify(r.util.encode(t.tokens), t.language)
          );
        },
        tokenize: function (e, a) {
          var n = a.rest;
          if (n) {
            for (var t in n) a[t] = n[t];
            delete a.rest;
          }
          var g = new l();
          return (
            o(g, g.head, e),
            (function e(a, n, t, l, g, c) {
              for (var d in t)
                if (t.hasOwnProperty(d) && t[d]) {
                  var p = t[d];
                  p = Array.isArray(p) ? p : [p];
                  for (var m = 0; m < p.length; ++m) {
                    if (c && c.cause == d + "," + m) return;
                    var f = p[m],
                      h = f.inside,
                      v = !!f.lookbehind,
                      $ = !!f.greedy,
                      F = f.alias;
                    if ($ && !f.pattern.global) {
                      var y = f.pattern.toString().match(/[imsuy]*$/)[0];
                      f.pattern = RegExp(f.pattern.source, y + "g");
                    }
                    for (
                      var b = f.pattern || f, k = l.next, x = 0;
                      k !== n.tail && !(c && x >= c.reach);
                      x += k.value.length, k = k.next
                    ) {
                      var w = k.value;
                      if (n.length > a.length) return;
                      if (!(w instanceof s)) {
                        var A,
                          P = 1;
                        if ($) {
                          if (!(A = i(b, x, a, v)) || A.index >= a.length)
                            break;
                          var S = A.index,
                            j = A.index + A[0].length,
                            z = x;
                          for (z += k.value.length; S >= z; )
                            z += (k = k.next).value.length;
                          if (((x = z -= k.value.length), k.value instanceof s))
                            continue;
                          for (
                            var C = k;
                            C !== n.tail &&
                            (z < j || "string" == typeof C.value);
                            C = C.next
                          )
                            P++, (z += C.value.length);
                          P--, (w = a.slice(x, z)), (A.index -= x);
                        } else if (!(A = i(b, 0, w, v))) continue;
                        S = A.index;
                        var _ = A[0],
                          E = w.slice(0, S),
                          L = w.slice(S + _.length),
                          T = x + w.length;
                        c && T > c.reach && (c.reach = T);
                        var O = k.prev;
                        if (
                          (E && ((O = o(n, O, E)), (x += E.length)),
                          u(n, O, P),
                          (k = o(
                            n,
                            O,
                            new s(d, h ? r.tokenize(_, h) : _, F, _)
                          )),
                          L && o(n, k, L),
                          P > 1)
                        ) {
                          var D = { cause: d + "," + m, reach: T };
                          e(a, n, t, k.prev, x, D),
                            c && D.reach > c.reach && (c.reach = D.reach);
                        }
                      }
                    }
                  }
                }
            })(e, g, a, g.head, 0),
            (function (e) {
              for (var a = [], n = e.head.next; n !== e.tail; )
                a.push(n.value), (n = n.next);
              return a;
            })(g)
          );
        },
        hooks: {
          all: {},
          add: function (e, a) {
            var n = r.hooks.all;
            (n[e] = n[e] || []), n[e].push(a);
          },
          run: function (e, a) {
            var n = r.hooks.all[e];
            if (n && n.length) for (var t, s = 0; (t = n[s++]); ) t(a);
          },
        },
        Token: s,
      };
    function s(e, a, n, t) {
      (this.type = e),
        (this.content = a),
        (this.alias = n),
        (this.length = 0 | (t || "").length);
    }
    function i(e, a, n, t) {
      e.lastIndex = a;
      var r = e.exec(n);
      if (r && t && r[1]) {
        var s = r[1].length;
        (r.index += s), (r[0] = r[0].slice(s));
      }
      return r;
    }
    function l() {
      var e = { value: null, prev: null, next: null },
        a = { value: null, prev: e, next: null };
      (e.next = a), (this.head = e), (this.tail = a), (this.length = 0);
    }
    function o(e, a, n) {
      var t = a.next,
        r = { value: n, prev: a, next: t };
      return (a.next = r), (t.prev = r), e.length++, r;
    }
    function u(e, a, n) {
      for (var t = a.next, r = 0; r < n && t !== e.tail; r++) t = t.next;
      (a.next = t), (t.prev = a), (e.length -= r);
    }
    if (
      ((e.Prism = r),
      (s.stringify = function e(a, n) {
        if ("string" == typeof a) return a;
        if (Array.isArray(a)) {
          var t = "";
          return (
            a.forEach(function (a) {
              t += e(a, n);
            }),
            t
          );
        }
        var s = {
            type: a.type,
            content: e(a.content, n),
            tag: "span",
            classes: ["token", a.type],
            attributes: {},
            language: n,
          },
          i = a.alias;
        i &&
          (Array.isArray(i)
            ? Array.prototype.push.apply(s.classes, i)
            : s.classes.push(i)),
          r.hooks.run("wrap", s);
        var l = "";
        for (var o in s.attributes)
          l +=
            " " +
            o +
            '="' +
            (s.attributes[o] || "").replace(/"/g, "&quot;") +
            '"';
        return (
          "<" +
          s.tag +
          ' class="' +
          s.classes.join(" ") +
          '"' +
          l +
          ">" +
          s.content +
          "</" +
          s.tag +
          ">"
        );
      }),
      !e.document)
    )
      return (
        e.addEventListener &&
          (r.disableWorkerMessageHandler ||
            e.addEventListener(
              "message",
              function (a) {
                var n = JSON.parse(a.data),
                  t = n.language,
                  s = n.code,
                  i = n.immediateClose;
                e.postMessage(r.highlight(s, r.languages[t], t)),
                  i && e.close();
              },
              !1
            )),
        r
      );
    var g = r.util.currentScript();
    function c() {
      r.manual || r.highlightAll();
    }
    if (
      (g &&
        ((r.filename = g.src),
        g.hasAttribute("data-manual") && (r.manual = !0)),
      !r.manual)
    ) {
      var d = document.readyState;
      "loading" === d || ("interactive" === d && g && g.defer)
        ? document.addEventListener("DOMContentLoaded", c)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(c)
        : window.setTimeout(c, 16);
    }
    return r;
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism),
  (Prism.languages.markup = {
    comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
    prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
    doctype: {
      pattern:
        /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: !0,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: !0,
          greedy: !0,
          inside: null,
        },
        string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
        punctuation: /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        name: /[^\s<>'"]+/,
      },
    },
    cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
    tag: {
      pattern:
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: !0,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/,
          inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            punctuation: [
              { pattern: /^=/, alias: "attr-equals" },
              { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
            ],
          },
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: { namespace: /^[^\s>\/:]+:/ },
        },
      },
    },
    entity: [
      { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
      /&#x?[\da-f]{1,8};/i,
    ],
  }),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside["internal-subset"].inside =
    Prism.languages.markup),
  Prism.hooks.add("wrap", function (e) {
    "entity" === e.type &&
      (e.attributes.title = e.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (e, a) {
      var n = {};
      (n["language-" + a] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[a],
      }),
        (n.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var t = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: n },
      };
      t["language-" + a] = { pattern: /[\s\S]+/, inside: Prism.languages[a] };
      var r = {};
      (r[e] = {
        pattern: RegExp(
          "(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
            /__/g,
            function () {
              return e;
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore("markup", "cdata", r);
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    value: function (e, a) {
      Prism.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          "(^|[\"'\\s])(?:" +
            e +
            ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))",
          "i"
        ),
        lookbehind: !0,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [a, "language-" + a],
                inside: Prism.languages[a],
              },
              punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
            },
          },
        },
      });
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml),
  (function (e) {
    var a =
      /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    (e.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: RegExp(
          "@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" +
            a.source +
            ")*?(?:;|(?=\\s*\\{))"
        ),
        inside: {
          rule: /^@[\w-]+/,
          "selector-function-argument": {
            pattern:
              /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: !0,
            alias: "selector",
          },
          keyword: {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: !0,
          },
        },
      },
      url: {
        pattern: RegExp(
          "\\burl\\((?:" + a.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)",
          "i"
        ),
        greedy: !0,
        inside: {
          function: /^url/i,
          punctuation: /^\(|\)$/,
          string: { pattern: RegExp("^" + a.source + "$"), alias: "url" },
        },
      },
      selector: {
        pattern: RegExp(
          "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
            a.source +
            ")*(?=\\s*\\{)"
        ),
        lookbehind: !0,
      },
      string: { pattern: a, greedy: !0 },
      property: {
        pattern:
          /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: !0,
      },
      important: /!important\b/i,
      function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
      punctuation: /[(){};:,]/,
    }),
      (e.languages.css.atrule.inside.rest = e.languages.css);
    var n = e.languages.markup;
    n && (n.tag.addInlined("style", "css"), n.tag.addAttribute("style", "css"));
  })(Prism),
  (Prism.languages.clike = {
    comment: [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0,
        greedy: !0,
      },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0,
    },
    "class-name": {
      pattern:
        /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ },
    },
    keyword:
      /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/,
  }),
  (Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [
      Prism.languages.clike["class-name"],
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: !0,
      },
    ],
    keyword: [
      { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
      {
        pattern:
          /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0,
      },
    ],
    function:
      /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
      pattern: RegExp(
        "(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"
      ),
      lookbehind: !0,
    },
    operator:
      /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
  })),
  (Prism.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: RegExp(
        "((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: "language-regex",
          inside: Prism.languages.regex,
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/,
      },
    },
    "function-variable": {
      pattern:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
    "template-string": {
      pattern:
        /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern:
            /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
    "string-property": {
      pattern:
        /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
    },
  }),
  Prism.languages.insertBefore("javascript", "operator", {
    "literal-property": {
      pattern:
        /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: !0,
      alias: "property",
    },
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined("script", "javascript"),
    Prism.languages.markup.tag.addAttribute(
      "on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)",
      "javascript"
    )),
  (Prism.languages.js = Prism.languages.javascript);
