! function(e, t) {
  'object' == typeof module && 'object' == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
    if (!e.document) throw new Error('jQuery requires a window with a document');
    return t(e)
  } : t(e)
}('undefined' != typeof window ? window : this, function(e, n) {
  var y = [],
    h = y.slice,
    be = y.concat,
    X = y.push,
    M = y.indexOf,
    D = {},
    At = D.toString,
    U = D.hasOwnProperty,
    o = {},
    r = e.document,
    he = '2.1.4',
    t = function(e, n) {
      return new t.fn.init(e, n)
    },
    Mt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    Pt = /^-ms-/,
    It = /-([\da-z])/gi,
    Bt = function(e, t) {
      return t.toUpperCase()
    };
  t.fn = t.prototype = {
    jquery: he,
    constructor: t,
    selector: '',
    length: 0,
    toArray: function() {
      return h.call(this)
    },
    get: function(e) {
      return null != e ? 0 > e ? this[e + this.length] : this[e] : h.call(this)
    },
    pushStack: function(e) {
      var n = t.merge(this.constructor(), e);
      return n.prevObject = this, n.context = this.context, n
    },
    each: function(e, n) {
      return t.each(this, e, n)
    },
    map: function(e) {
      return this.pushStack(t.map(this, function(t, n) {
        return e.call(t, n, t)
      }))
    },
    slice: function() {
      return this.pushStack(h.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(e) {
      var n = this.length,
        t = +e + (0 > e ? n : 0);
      return this.pushStack(t >= 0 && n > t ? [this[t]] : [])
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: X,
    sort: y.sort,
    splice: y.splice
  }, t.extend = t.fn.extend = function() {
    var c, o, r, n, s, u, e = arguments[0] || {},
      i = 1,
      l = arguments.length,
      a = !1;
    for ('boolean' == typeof e && (a = e, e = arguments[i] || {}, i++), 'object' == typeof e || t.isFunction(e) || (e = {}), i === l && (e = this, i--); l > i; i++)
      if (null != (c = arguments[i]))
        for (o in c) r = e[o], n = c[o], e !== n && (a && n && (t.isPlainObject(n) || (s = t.isArray(n))) ? (s ? (s = !1, u = r && t.isArray(r) ? r : []) : u = r && t.isPlainObject(r) ? r : {}, e[o] = t.extend(a, u, n)) : void 0 !== n && (e[o] = n));
    return e
  }, t.extend({
    expando: 'jQuery' + (he + Math.random()).replace(/\D/g, ''),
    isReady: !0,
    error: function(e) {
      throw new Error(e)
    },
    noop: function() {},
    isFunction: function(e) {
      return 'function' === t.type(e)
    },
    isArray: Array.isArray,
    isWindow: function(e) {
      return null != e && e === e.window
    },
    isNumeric: function(e) {
      return !t.isArray(e) && e - parseFloat(e) + 1 >= 0
    },
    isPlainObject: function(e) {
      return 'object' !== t.type(e) || e.nodeType || t.isWindow(e) ? !1 : e.constructor && !U.call(e.constructor.prototype, 'isPrototypeOf') ? !1 : !0
    },
    isEmptyObject: function(e) {
      var t;
      for (t in e) return !1;
      return !0
    },
    type: function(e) {
      return null == e ? e + '' : 'object' == typeof e || 'function' == typeof e ? D[At.call(e)] || 'object' : typeof e
    },
    globalEval: function(e) {
      var n, i = eval;
      e = t.trim(e), e && (1 === e.indexOf('use strict') ? (n = r.createElement('script'), n.text = e, r.head.appendChild(n).parentNode.removeChild(n)) : i(e))
    },
    camelCase: function(e) {
      return e.replace(Pt, 'ms-').replace(It, Bt)
    },
    nodeName: function(e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    },
    each: function(e, t, n) {
      var r, i = 0,
        a = e.length,
        o = H(e);
      if (n) {
        if (o) {
          for (; a > i; i++)
            if (r = t.apply(e[i], n), r === !1) break
        } else
          for (i in e)
            if (r = t.apply(e[i], n), r === !1) break
      } else if (o) {
        for (; a > i; i++)
          if (r = t.call(e[i], i, e[i]), r === !1) break
      } else
        for (i in e)
          if (r = t.call(e[i], i, e[i]), r === !1) break;
      return e
    },
    trim: function(e) {
      return null == e ? '' : (e + '').replace(Mt, '')
    },
    makeArray: function(e, n) {
      var i = n || [];
      return null != e && (H(Object(e)) ? t.merge(i, 'string' == typeof e ? [e] : e) : X.call(i, e)), i
    },
    inArray: function(e, t, n) {
      return null == t ? -1 : M.call(t, e, n)
    },
    merge: function(e, t) {
      for (var r = +t.length, n = 0, i = e.length; r > n; n++) e[i++] = t[n];
      return e.length = i, e
    },
    grep: function(e, t, n) {
      for (var r, o = [], i = 0, s = e.length, a = !n; s > i; i++) r = !t(e[i], i), r !== a && o.push(e[i]);
      return o
    },
    map: function(e, t, n) {
      var r, i = 0,
        s = e.length,
        a = H(e),
        o = [];
      if (a)
        for (; s > i; i++) r = t(e[i], i, n), null != r && o.push(r);
      else
        for (i in e) r = t(e[i], i, n), null != r && o.push(r);
      return be.apply([], o)
    },
    guid: 1,
    proxy: function(e, n) {
      var r, o, i;
      return 'string' == typeof n && (r = e[n], n = e, e = r), t.isFunction(e) ? (o = h.call(arguments, 2), i = function() {
        return e.apply(n || this, o.concat(h.call(arguments)))
      }, i.guid = e.guid = e.guid || t.guid++, i) : void 0
    },
    now: Date.now,
    support: o
  }), t.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function(e, t) {
    D['[object ' + t + ']'] = t.toLowerCase()
  });

  function H(e) {
    var n = 'length' in e && e.length,
      i = t.type(e);
    return 'function' === i || t.isWindow(e) ? !1 : 1 === e.nodeType && n ? !0 : 'array' === i || 0 === n || 'number' == typeof n && n > 0 && n - 1 in e
  };
  var w = function(e) {
    var S, r, t, L, ae, M, G, oe, D, y, T, C, s, d, h, a, b, N, A, o = 'sizzle' + 1 * new Date,
      c = e.document,
      f = 0,
      he = 0,
      te = B(),
      ie = B(),
      ue = B(),
      Y = function(e, t) {
        return e === t && (T = !0), 0
      },
      se = 1 << 31,
      ce = {}.hasOwnProperty,
      w = [],
      le = w.pop,
      pe = w.push,
      v = w.push,
      ne = w.slice,
      k = function(e, t) {
        for (var n = 0, i = e.length; i > n; n++)
          if (e[n] === t) return n;
        return -1
      },
      Q = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      n = '[\\x20\\t\\r\\n\\f]',
      E = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
      ee = E.replace('w', 'w#'),
      re = '\\[' + n + '*(' + E + ')(?:' + n + '*([*^$|!~]?=)' + n + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + ee + '))|)' + n + '*\\]',
      P = ':(' + E + ')(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' + re + ')*)|.*)\\)|)',
      ke = new RegExp(n + '+', 'g'),
      j = new RegExp('^' + n + '+|((?:^|[^\\\\])(?:\\\\.)*)' + n + '+$', 'g'),
      Te = new RegExp('^' + n + '*,' + n + '*'),
      Ee = new RegExp('^' + n + '*([>+~]|' + n + ')' + n + '*'),
      be = new RegExp('=' + n + '*([^\\]\'"]*?)' + n + '*\\]', 'g'),
      xe = new RegExp(P),
      ge = new RegExp('^' + ee + '$'),
      F = {
        ID: new RegExp('^#(' + E + ')'),
        CLASS: new RegExp('^\\.(' + E + ')'),
        TAG: new RegExp('^(' + E.replace('w', 'w*') + ')'),
        ATTR: new RegExp('^' + re),
        PSEUDO: new RegExp('^' + P),
        CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + n + '*(even|odd|(([+-]|)(\\d*)n|)' + n + '*(?:([+-]|)' + n + '*(\\d+)|))' + n + '*\\)|)', 'i'),
        bool: new RegExp('^(?:' + Q + ')$', 'i'),
        needsContext: new RegExp('^' + n + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + n + '*((?:-\\d)?\\d*)' + n + '*\\)|)(?=[^-]|$)', 'i')
      },
      ve = /^(?:input|select|textarea|button)$/i,
      we = /^h\d$/i,
      q = /^[^{]+\{\s*\[native \w/,
      Ce = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      R = /[+~]/,
      ye = /'|\\/g,
      g = new RegExp('\\\\([\\da-f]{1,6}' + n + '?|(' + n + ')|.)', 'ig'),
      m = function(e, t, n) {
        var i = '0x' + t - 65536;
        return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
      },
      K = function() {
        C()
      };
    try {
      v.apply(w = ne.call(c.childNodes), c.childNodes), w[c.childNodes.length].nodeType
    } catch (u) {
      v = {
        apply: w.length ? function(e, t) {
          pe.apply(e, ne.call(t))
        } : function(e, t) {
          var n = e.length,
            i = 0;
          while (e[n++] = t[i++]);
          e.length = n - 1
        }
      }
    };

    function i(e, t, n, i) {
      var g, l, f, d, x, m, w, p, b, y;
      if ((t ? t.ownerDocument || t : c) !== s && C(t), t = t || s, n = n || [], d = t.nodeType, 'string' != typeof e || !e || 1 !== d && 9 !== d && 11 !== d) return n;
      if (!i && h) {
        if (11 !== d && (g = Ce.exec(e)))
          if (f = g[1]) {
            if (9 === d) {
              if (l = t.getElementById(f), !l || !l.parentNode) return n;
              if (l.id === f) return n.push(l), n
            } else if (t.ownerDocument && (l = t.ownerDocument.getElementById(f)) && A(t, l) && l.id === f) return n.push(l), n
          }
        else {
          if (g[2]) return v.apply(n, t.getElementsByTagName(e)), n;
          if ((f = g[3]) && r.getElementsByClassName) return v.apply(n, t.getElementsByClassName(f)), n
        };
        if (r.qsa && (!a || !a.test(e))) {
          if (p = w = o, b = t, y = 1 !== d && e, 1 === d && 'object' !== t.nodeName.toLowerCase()) {
            m = M(e), (w = t.getAttribute('id')) ? p = w.replace(ye, '\\$&') : t.setAttribute('id', p), p = '[id=\'' + p + '\'] ', x = m.length;
            while (x--) m[x] = p + I(m[x]);
            b = R.test(e) && V(t.parentNode) || t, y = m.join(',')
          };
          if (y) try {
            return v.apply(n, b.querySelectorAll(y)), n
          } catch (u) {} finally {
            w || t.removeAttribute('id')
          }
        }
      };
      return oe(e.replace(j, '$1'), t, n, i)
    };

    function B() {
      var n = [];

      function e(i, r) {
        return n.push(i + ' ') > t.cacheLength && delete e[n.shift()], e[i + ' '] = r
      };
      return e
    };

    function l(e) {
      return e[o] = !0, e
    };

    function p(e) {
      var n = s.createElement('div');
      try {
        return !!e(n)
      } catch (t) {
        return !1
      } finally {
        n.parentNode && n.parentNode.removeChild(n), n = null
      }
    };

    function X(e, n) {
      var r = e.split('|'),
        i = e.length;
      while (i--) t.attrHandle[r[i]] = n
    };

    function Z(e, t) {
      var n = t && e,
        i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || se) - (~e.sourceIndex || se);
      if (i) return i;
      if (n)
        while (n = n.nextSibling)
          if (n === t) return -1;
      return e ? 1 : -1
    };

    function me(e) {
      return function(t) {
        var n = t.nodeName.toLowerCase();
        return 'input' === n && t.type === e
      }
    };

    function Se(e) {
      return function(t) {
        var n = t.nodeName.toLowerCase();
        return ('input' === n || 'button' === n) && t.type === e
      }
    };

    function x(e) {
      return l(function(t) {
        return t = +t, l(function(n, i) {
          var r, a = e([], n.length, t),
            o = a.length;
          while (o--) n[r = a[o]] && (n[r] = !(i[r] = n[r]))
        })
      })
    };

    function V(e) {
      return e && 'undefined' != typeof e.getElementsByTagName && e
    };
    r = i.support = {}, ae = i.isXML = function(e) {
      var t = e && (e.ownerDocument || e).documentElement;
      return t ? 'HTML' !== t.nodeName : !1
    }, C = i.setDocument = function(e) {
      var l, u, i = e ? e.ownerDocument || e : c;
      return i !== s && 9 === i.nodeType && i.documentElement ? (s = i, d = i.documentElement, u = i.defaultView, u && u !== u.top && (u.addEventListener ? u.addEventListener('unload', K, !1) : u.attachEvent && u.attachEvent('onunload', K)), h = !ae(i), r.attributes = p(function(e) {
        return e.className = 'i', !e.getAttribute('className')
      }), r.getElementsByTagName = p(function(e) {
        return e.appendChild(i.createComment('')), !e.getElementsByTagName('*').length
      }), r.getElementsByClassName = q.test(i.getElementsByClassName), r.getById = p(function(e) {
        return d.appendChild(e).id = o, !i.getElementsByName || !i.getElementsByName(o).length
      }), r.getById ? (t.find.ID = function(e, t) {
        if ('undefined' != typeof t.getElementById && h) {
          var n = t.getElementById(e);
          return n && n.parentNode ? [n] : []
        }
      }, t.filter.ID = function(e) {
        var t = e.replace(g, m);
        return function(e) {
          return e.getAttribute('id') === t
        }
      }) : (delete t.find.ID, t.filter.ID = function(e) {
        var t = e.replace(g, m);
        return function(e) {
          var n = 'undefined' != typeof e.getAttributeNode && e.getAttributeNode('id');
          return n && n.value === t
        }
      }), t.find.TAG = r.getElementsByTagName ? function(e, t) {
        return 'undefined' != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : r.qsa ? t.querySelectorAll(e) : void 0
      } : function(e, t) {
        var n, i = [],
          o = 0,
          r = t.getElementsByTagName(e);
        if ('*' === e) {
          while (n = r[o++]) 1 === n.nodeType && i.push(n);
          return i
        };
        return r
      }, t.find.CLASS = r.getElementsByClassName && function(e, t) {
        return h ? t.getElementsByClassName(e) : void 0
      }, b = [], a = [], (r.qsa = q.test(i.querySelectorAll)) && (p(function(e) {
        d.appendChild(e).innerHTML = '<a id=\'' + o + '\'></a><select id=\'' + o + '-\f]\' msallowcapture=\'\'><option selected=\'\'></option></select>', e.querySelectorAll('[msallowcapture^=\'\']').length && a.push('[*^$]=' + n + '*(?:\'\'|"")'), e.querySelectorAll('[selected]').length || a.push('\\[' + n + '*(?:value|' + Q + ')'), e.querySelectorAll('[id~=' + o + '-]').length || a.push('~='), e.querySelectorAll(':checked').length || a.push(':checked'), e.querySelectorAll('a#' + o + '+*').length || a.push('.#.+[+~]')
      }), p(function(e) {
        var t = i.createElement('input');
        t.setAttribute('type', 'hidden'), e.appendChild(t).setAttribute('name', 'D'), e.querySelectorAll('[name=d]').length && a.push('name' + n + '*[*^$|!~]?='), e.querySelectorAll(':enabled').length || a.push(':enabled', ':disabled'), e.querySelectorAll('*,:x'), a.push(',.*:')
      })), (r.matchesSelector = q.test(N = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && p(function(e) {
        r.disconnectedMatch = N.call(e, 'div'), N.call(e, '[s!=\'\']:x'), b.push('!=', P)
      }), a = a.length && new RegExp(a.join('|')), b = b.length && new RegExp(b.join('|')), l = q.test(d.compareDocumentPosition), A = l || q.test(d.contains) ? function(e, t) {
        var i = 9 === e.nodeType ? e.documentElement : e,
          n = t && t.parentNode;
        return e === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(n)))
      } : function(e, t) {
        if (t)
          while (t = t.parentNode)
            if (t === e) return !0;
        return !1
      }, Y = l ? function(e, t) {
        if (e === t) return T = !0, 0;
        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
        return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !r.sortDetached && t.compareDocumentPosition(e) === n ? e === i || e.ownerDocument === c && A(c, e) ? -1 : t === i || t.ownerDocument === c && A(c, t) ? 1 : y ? k(y, e) - k(y, t) : 0 : 4 & n ? -1 : 1)
      } : function(e, t) {
        if (e === t) return T = !0, 0;
        var r, n = 0,
          u = e.parentNode,
          s = t.parentNode,
          a = [e],
          o = [t];
        if (!u || !s) return e === i ? -1 : t === i ? 1 : u ? -1 : s ? 1 : y ? k(y, e) - k(y, t) : 0;
        if (u === s) return Z(e, t);
        r = e;
        while (r = r.parentNode) a.unshift(r);
        r = t;
        while (r = r.parentNode) o.unshift(r);
        while (a[n] === o[n]) n++;
        return n ? Z(a[n], o[n]) : a[n] === c ? -1 : o[n] === c ? 1 : 0
      }, i) : s
    }, i.matches = function(e, t) {
      return i(e, null, null, t)
    }, i.matchesSelector = function(e, t) {
      if ((e.ownerDocument || e) !== s && C(e), t = t.replace(be, '=\'$1\']'), !(!r.matchesSelector || !h || b && b.test(t) || a && a.test(t))) try {
        var o = N.call(e, t);
        if (o || r.disconnectedMatch || e.document && 11 !== e.document.nodeType) return o
      } catch (n) {};
      return i(t, s, null, [e]).length > 0
    }, i.contains = function(e, t) {
      return (e.ownerDocument || e) !== s && C(e), A(e, t)
    }, i.attr = function(e, n) {
      (e.ownerDocument || e) !== s && C(e);
      var o = t.attrHandle[n.toLowerCase()],
        i = o && ce.call(t.attrHandle, n.toLowerCase()) ? o(e, n, !h) : void 0;
      return void 0 !== i ? i : r.attributes || !h ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null
    }, i.error = function(e) {
      throw new Error('Syntax error, unrecognized expression: ' + e)
    }, i.uniqueSort = function(e) {
      var o, i = [],
        n = 0,
        t = 0;
      if (T = !r.detectDuplicates, y = !r.sortStable && e.slice(0), e.sort(Y), T) {
        while (o = e[t++]) o === e[t] && (n = i.push(t));
        while (n--) e.splice(i[n], 1)
      };
      return y = null, e
    }, L = i.getText = function(e) {
      var i, n = '',
        r = 0,
        t = e.nodeType;
      if (t) {
        if (1 === t || 9 === t || 11 === t) {
          if ('string' == typeof e.textContent) return e.textContent;
          for (e = e.firstChild; e; e = e.nextSibling) n += L(e)
        } else if (3 === t || 4 === t) return e.nodeValue
      } else
        while (i = e[r++]) n += L(i);
      return n
    }, t = i.selectors = {
      cacheLength: 50,
      createPseudo: l,
      match: F,
      attrHandle: {},
      find: {},
      relative: {
        '>': {
          dir: 'parentNode',
          first: !0
        },
        ' ': {
          dir: 'parentNode'
        },
        '+': {
          dir: 'previousSibling',
          first: !0
        },
        '~': {
          dir: 'previousSibling'
        }
      },
      preFilter: {
        ATTR: function(e) {
          return e[1] = e[1].replace(g, m), e[3] = (e[3] || e[4] || e[5] || '').replace(g, m), '~=' === e[2] && (e[3] = ' ' + e[3] + ' '), e.slice(0, 4)
        },
        CHILD: function(e) {
          return e[1] = e[1].toLowerCase(), 'nth' === e[1].slice(0, 3) ? (e[3] || i.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ('even' === e[3] || 'odd' === e[3])), e[5] = +(e[7] + e[8] || 'odd' === e[3])) : e[3] && i.error(e[0]), e
        },
        PSEUDO: function(e) {
          var n, t = !e[6] && e[2];
          return F.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || '' : t && xe.test(t) && (n = M(t, !0)) && (n = t.indexOf(')', t.length - n) - t.length) && (e[0] = e[0].slice(0, n), e[2] = t.slice(0, n)), e.slice(0, 3))
        }
      },
      filter: {
        TAG: function(e) {
          var t = e.replace(g, m).toLowerCase();
          return '*' === e ? function() {
            return !0
          } : function(e) {
            return e.nodeName && e.nodeName.toLowerCase() === t
          }
        },
        CLASS: function(e) {
          var t = te[e + ' '];
          return t || (t = new RegExp('(^|' + n + ')' + e + '(' + n + '|$)')) && te(e, function(e) {
            return t.test('string' == typeof e.className && e.className || 'undefined' != typeof e.getAttribute && e.getAttribute('class') || '')
          })
        },
        ATTR: function(e, t, n) {
          return function(r) {
            var o = i.attr(r, e);
            return null == o ? '!=' === t : t ? (o += '', '=' === t ? o === n : '!=' === t ? o !== n : '^=' === t ? n && 0 === o.indexOf(n) : '*=' === t ? n && o.indexOf(n) > -1 : '$=' === t ? n && o.slice(-n.length) === n : '~=' === t ? (' ' + o.replace(ke, ' ') + ' ').indexOf(n) > -1 : '|=' === t ? o === n || o.slice(0, n.length + 1) === n + '-' : !1) : !0
          }
        },
        CHILD: function(e, t, n, i, r) {
          var u = 'nth' !== e.slice(0, 3),
            s = 'last' !== e.slice(-4),
            a = 'of-type' === t;
          return 1 === i && 0 === r ? function(e) {
            return !!e.parentNode
          } : function(t, n, c) {
            var p, y, l, d, h, v, g = u !== s ? 'nextSibling' : 'previousSibling',
              m = t.parentNode,
              x = a && t.nodeName.toLowerCase(),
              w = !c && !a;
            if (m) {
              if (u) {
                while (g) {
                  l = t;
                  while (l = l[g])
                    if (a ? l.nodeName.toLowerCase() === x : 1 === l.nodeType) return !1;
                  v = g = 'only' === e && !v && 'nextSibling'
                };
                return !0
              };
              if (v = [s ? m.firstChild : m.lastChild], s && w) {
                y = m[o] || (m[o] = {}), p = y[e] || [], h = p[0] === f && p[1], d = p[0] === f && p[2], l = h && m.childNodes[h];
                while (l = ++h && l && l[g] || (d = h = 0) || v.pop())
                  if (1 === l.nodeType && ++d && l === t) {
                    y[e] = [f, h, d];
                    break
                  }
              } else if (w && (p = (t[o] || (t[o] = {}))[e]) && p[0] === f) d = p[1];
              else
                while (l = ++h && l && l[g] || (d = h = 0) || v.pop())
                  if ((a ? l.nodeName.toLowerCase() === x : 1 === l.nodeType) && ++d && (w && ((l[o] || (l[o] = {}))[e] = [f, d]), l === t)) break;
              return d -= r, d === i || d % i === 0 && d / i >= 0
            }
          }
        },
        PSEUDO: function(e, n) {
          var a, r = t.pseudos[e] || t.setFilters[e.toLowerCase()] || i.error('unsupported pseudo: ' + e);
          return r[o] ? r(n) : r.length > 1 ? (a = [e, e, '', n], t.setFilters.hasOwnProperty(e.toLowerCase()) ? l(function(e, t) {
            var o, a = r(e, n),
              i = a.length;
            while (i--) o = k(e, a[i]), e[o] = !(t[o] = a[i])
          }) : function(e) {
            return r(e, 0, a)
          }) : r
        }
      },
      pseudos: {
        not: l(function(e) {
          var n = [],
            i = [],
            t = G(e.replace(j, '$1'));
          return t[o] ? l(function(e, n, i, r) {
            var a, s = t(e, null, r, []),
              o = e.length;
            while (o--)(a = s[o]) && (e[o] = !(n[o] = a))
          }) : function(e, r, o) {
            return n[0] = e, t(n, null, o, i), n[0] = null, !i.pop()
          }
        }),
        has: l(function(e) {
          return function(t) {
            return i(e, t).length > 0
          }
        }),
        contains: l(function(e) {
          return e = e.replace(g, m),
            function(t) {
              return (t.textContent || t.innerText || L(t)).indexOf(e) > -1
            }
        }),
        lang: l(function(e) {
          return ge.test(e || '') || i.error('unsupported lang: ' + e), e = e.replace(g, m).toLowerCase(),
            function(t) {
              var n;
              do
                if (n = h ? t.lang : t.getAttribute('xml:lang') || t.getAttribute('lang')) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + '-'); while ((t = t.parentNode) && 1 === t.nodeType);
              return !1
            }
        }),
        target: function(t) {
          var n = e.location && e.location.hash;
          return n && n.slice(1) === t.id
        },
        root: function(e) {
          return e === d
        },
        focus: function(e) {
          return e === s.activeElement && (!s.hasFocus || s.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        },
        enabled: function(e) {
          return e.disabled === !1
        },
        disabled: function(e) {
          return e.disabled === !0
        },
        checked: function(e) {
          var t = e.nodeName.toLowerCase();
          return 'input' === t && !!e.checked || 'option' === t && !!e.selected
        },
        selected: function(e) {
          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
        },
        empty: function(e) {
          for (e = e.firstChild; e; e = e.nextSibling)
            if (e.nodeType < 6) return !1;
          return !0
        },
        parent: function(e) {
          return !t.pseudos.empty(e)
        },
        header: function(e) {
          return we.test(e.nodeName)
        },
        input: function(e) {
          return ve.test(e.nodeName)
        },
        button: function(e) {
          var t = e.nodeName.toLowerCase();
          return 'input' === t && 'button' === e.type || 'button' === t
        },
        text: function(e) {
          var t;
          return 'input' === e.nodeName.toLowerCase() && 'text' === e.type && (null == (t = e.getAttribute('type')) || 'text' === t.toLowerCase())
        },
        first: x(function() {
          return [0]
        }),
        last: x(function(e, t) {
          return [t - 1]
        }),
        eq: x(function(e, t, n) {
          return [0 > n ? n + t : n]
        }),
        even: x(function(e, t) {
          for (var n = 0; t > n; n += 2) e.push(n);
          return e
        }),
        odd: x(function(e, t) {
          for (var n = 1; t > n; n += 2) e.push(n);
          return e
        }),
        lt: x(function(e, t, n) {
          for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
          return e
        }),
        gt: x(function(e, t, n) {
          for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
          return e
        })
      }
    }, t.pseudos.nth = t.pseudos.eq;
    for (S in {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0
      }) t.pseudos[S] = me(S);
    for (S in {
        submit: !0,
        reset: !0
      }) t.pseudos[S] = Se(S);

    function J() {};
    J.prototype = t.filters = t.pseudos, t.setFilters = new J, M = i.tokenize = function(e, n) {
      var a, o, c, s, r, l, u, d = ie[e + ' '];
      if (d) return n ? 0 : d.slice(0);
      r = e, l = [], u = t.preFilter;
      while (r) {
        (!a || (o = Te.exec(r))) && (o && (r = r.slice(o[0].length) || r), l.push(c = [])), a = !1, (o = Ee.exec(r)) && (a = o.shift(), c.push({
          value: a,
          type: o[0].replace(j, ' ')
        }), r = r.slice(a.length));
        for (s in t.filter) !(o = F[s].exec(r)) || u[s] && !(o = u[s](o)) || (a = o.shift(), c.push({
          value: a,
          type: s,
          matches: o
        }), r = r.slice(a.length));
        if (!a) break
      };
      return n ? r.length : r ? i.error(e) : ie(e, l).slice(0)
    };

    function I(e) {
      for (var t = 0, i = e.length, n = ''; i > t; t++) n += e[t].value;
      return n
    };

    function W(e, t, n) {
      var i = t.dir,
        r = n && 'parentNode' === i,
        a = he++;
      return t.first ? function(t, n, o) {
        while (t = t[i])
          if (1 === t.nodeType || r) return e(t, n, o)
      } : function(t, n, s) {
        var u, l, c = [f, a];
        if (s) {
          while (t = t[i])
            if ((1 === t.nodeType || r) && e(t, n, s)) return !0
        } else
          while (t = t[i])
            if (1 === t.nodeType || r) {
              if (l = t[o] || (t[o] = {}), (u = l[i]) && u[0] === f && u[1] === a) return c[2] = u[2];
              if (l[i] = c, c[2] = e(t, n, s)) return !0
            }
      }
    };

    function H(e) {
      return e.length > 1 ? function(t, n, i) {
        var r = e.length;
        while (r--)
          if (!e[r](t, n, i)) return !1;
        return !0
      } : e[0]
    };

    function de(e, t, n) {
      for (var r = 0, o = t.length; o > r; r++) i(e, t[r], n);
      return n
    };

    function O(e, t, n, i, r) {
      for (var a, s = [], o = 0, c = e.length, u = null != t; c > o; o++)(a = e[o]) && (!n || n(a, i, r)) && (s.push(a), u && t.push(o));
      return s
    };

    function z(e, t, n, i, r, a) {
      return i && !i[o] && (i = z(i)), r && !r[o] && (r = z(r, a)), l(function(o, a, s, u) {
        var d, l, f, m = [],
          p = [],
          y = a.length,
          g = o || de(t || '*', s.nodeType ? [s] : s, []),
          h = !e || !o && t ? g : O(g, m, e, s, u),
          c = n ? r || (o ? e : y || i) ? [] : a : h;
        if (n && n(h, c, s, u), i) {
          d = O(c, p), i(d, [], s, u), l = d.length;
          while (l--)(f = d[l]) && (c[p[l]] = !(h[p[l]] = f))
        };
        if (o) {
          if (r || e) {
            if (r) {
              d = [], l = c.length;
              while (l--)(f = c[l]) && d.push(h[l] = f);
              r(null, c = [], d, u)
            };
            l = c.length;
            while (l--)(f = c[l]) && (d = r ? k(o, f) : m[l]) > -1 && (o[d] = !(a[d] = f))
          }
        } else c = O(c === a ? c.splice(y, c.length) : c), r ? r(null, a, c, u) : v.apply(a, c)
      })
    };

    function U(e) {
      for (var u, r, i, s = e.length, c = t.relative[e[0].type], l = c || t.relative[' '], n = c ? 1 : 0, f = W(function(e) {
          return e === u
        }, l, !0), d = W(function(e) {
          return k(u, e) > -1
        }, l, !0), a = [function(e, t, n) {
          var i = !c && (n || t !== D) || ((u = t).nodeType ? f(e, t, n) : d(e, t, n));
          return u = null, i
        }]; s > n; n++)
        if (r = t.relative[e[n].type]) a = [W(H(a), r)];
        else {
          if (r = t.filter[e[n].type].apply(null, e[n].matches), r[o]) {
            for (i = ++n; s > i; i++)
              if (t.relative[e[i].type]) break;
            return z(n > 1 && H(a), n > 1 && I(e.slice(0, n - 1).concat({
              value: ' ' === e[n - 2].type ? '*' : ''
            })).replace(j, '$1'), r, i > n && U(e.slice(n, i)), s > i && U(e = e.slice(i)), s > i && I(e))
          };
          a.push(r)
        };
      return H(a)
    };

    function fe(e, n) {
      var r = n.length > 0,
        a = e.length > 0,
        o = function(o, u, c, l, d) {
          var p, w, g, y = 0,
            h = '0',
            x = o && [],
            m = [],
            C = D,
            k = o || a && t.find.TAG('*', d),
            b = f += null == C ? 1 : Math.random() || .1,
            T = k.length;
          for (d && (D = u !== s && u); h !== T && null != (p = k[h]); h++) {
            if (a && p) {
              w = 0;
              while (g = e[w++])
                if (g(p, u, c)) {
                  l.push(p);
                  break
                };
              d && (f = b)
            };
            r && ((p = !g && p) && y--, o && x.push(p))
          };
          if (y += h, r && h !== y) {
            w = 0;
            while (g = n[w++]) g(x, m, u, c);
            if (o) {
              if (y > 0)
                while (h--) x[h] || m[h] || (m[h] = le.call(l));
              m = O(m)
            };
            v.apply(l, m), d && !o && m.length > 0 && y + n.length > 1 && i.uniqueSort(l)
          };
          return d && (f = b, D = C), x
        };
      return r ? l(o) : o
    };
    return G = i.compile = function(e, t) {
      var i, r = [],
        a = [],
        n = ue[e + ' '];
      if (!n) {
        t || (t = M(e)), i = t.length;
        while (i--) n = U(t[i]), n[o] ? r.push(n) : a.push(n);
        n = ue(e, fe(a, r)), n.selector = e
      };
      return n
    }, oe = i.select = function(e, n, i, o) {
      var c, a, s, d, f, l = 'function' == typeof e && e,
        u = !o && M(e = l.selector || e);
      if (i = i || [], 1 === u.length) {
        if (a = u[0] = u[0].slice(0), a.length > 2 && 'ID' === (s = a[0]).type && r.getById && 9 === n.nodeType && h && t.relative[a[1].type]) {
          if (n = (t.find.ID(s.matches[0].replace(g, m), n) || [])[0], !n) return i;
          l && (n = n.parentNode), e = e.slice(a.shift().value.length)
        };
        c = F.needsContext.test(e) ? 0 : a.length;
        while (c--) {
          if (s = a[c], t.relative[d = s.type]) break;
          if ((f = t.find[d]) && (o = f(s.matches[0].replace(g, m), R.test(a[0].type) && V(n.parentNode) || n))) {
            if (a.splice(c, 1), e = o.length && I(a), !e) return v.apply(i, o), i;
            break
          }
        }
      };
      return (l || G(e, u))(o, n, !h, i, R.test(e) && V(n.parentNode) || n), i
    }, r.sortStable = o.split('').sort(Y).join('') === o, r.detectDuplicates = !!T, C(), r.sortDetached = p(function(e) {
      return 1 & e.compareDocumentPosition(s.createElement('div'))
    }), p(function(e) {
      return e.innerHTML = '<a href=\'#\'></a>', '#' === e.firstChild.getAttribute('href')
    }) || X('type|href|height|width', function(e, t, n) {
      return n ? void 0 : e.getAttribute(t, 'type' === t.toLowerCase() ? 1 : 2)
    }), r.attributes && p(function(e) {
      return e.innerHTML = '<input/>', e.firstChild.setAttribute('value', ''), '' === e.firstChild.getAttribute('value')
    }) || X('value', function(e, t, n) {
      return n || 'input' !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
    }), p(function(e) {
      return null == e.getAttribute('disabled')
    }) || X(Q, function(e, t, n) {
      var i;
      return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
    }), i
  }(e);
  t.find = w, t.expr = w.selectors, t.expr[':'] = t.expr.pseudos, t.unique = w.uniqueSort, t.text = w.getText, t.isXMLDoc = w.isXML, t.contains = w.contains;
  var re = t.expr.match.needsContext,
    ne = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    mt = /^.[^:#\[\.,]*$/;

  function Y(e, n, i) {
    if (t.isFunction(n)) return t.grep(e, function(e, t) {
      return !!n.call(e, t, e) !== i
    });
    if (n.nodeType) return t.grep(e, function(e) {
      return e === n !== i
    });
    if ('string' == typeof n) {
      if (mt.test(n)) return t.filter(n, e, i);
      n = t.filter(n, e)
    };
    return t.grep(e, function(e) {
      return M.call(n, e) >= 0 !== i
    })
  };
  t.filter = function(e, n, i) {
    var r = n[0];
    return i && (e = ':not(' + e + ')'), 1 === n.length && 1 === r.nodeType ? t.find.matchesSelector(r, e) ? [r] : [] : t.find.matches(e, t.grep(n, function(e) {
      return 1 === e.nodeType
    }))
  }, t.fn.extend({
    find: function(e) {
      var n, r = this.length,
        i = [],
        o = this;
      if ('string' != typeof e) return this.pushStack(t(e).filter(function() {
        for (n = 0; r > n; n++)
          if (t.contains(o[n], this)) return !0
      }));
      for (n = 0; r > n; n++) t.find(e, o[n], i);
      return i = this.pushStack(r > 1 ? t.unique(i) : i), i.selector = this.selector ? this.selector + ' ' + e : e, i
    },
    filter: function(e) {
      return this.pushStack(Y(this, e || [], !1))
    },
    not: function(e) {
      return this.pushStack(Y(this, e || [], !0))
    },
    is: function(e) {
      return !!Y(this, 'string' == typeof e && re.test(e) ? t(e) : e || [], !1).length
    }
  });
  var q, Et = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    St = t.fn.init = function(e, n) {
      var i, o;
      if (!e) return this;
      if ('string' == typeof e) {
        if (i = '<' === e[0] && '>' === e[e.length - 1] && e.length >= 3 ? [null, e, null] : Et.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || q).find(e) : this.constructor(n).find(e);
        if (i[1]) {
          if (n = n instanceof t ? n[0] : n, t.merge(this, t.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : r, !0)), ne.test(i[1]) && t.isPlainObject(n))
            for (i in n) t.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
          return this
        };
        return o = r.getElementById(i[2]), o && o.parentNode && (this.length = 1, this[0] = o), this.context = r, this.selector = e, this
      };
      return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : t.isFunction(e) ? 'undefined' != typeof q.ready ? q.ready(e) : e(t) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), t.makeArray(e, this))
    };
  St.prototype = t.fn, q = t(r);
  var Ct = /^(?:parents|prev(?:Until|All))/,
    Tt = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  t.extend({
    dir: function(e, n, i) {
      var r = [],
        o = void 0 !== i;
      while ((e = e[n]) && 9 !== e.nodeType)
        if (1 === e.nodeType) {
          if (o && t(e).is(i)) break;
          r.push(e)
        };
      return r
    },
    sibling: function(e, t) {
      for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
      return n
    }
  }), t.fn.extend({
    has: function(e) {
      var n = t(e, this),
        i = n.length;
      return this.filter(function() {
        for (var e = 0; i > e; e++)
          if (t.contains(this, n[e])) return !0
      })
    },
    closest: function(e, n) {
      for (var i, o = 0, s = this.length, r = [], a = re.test(e) || 'string' != typeof e ? t(e, n || this.context) : 0; s > o; o++)
        for (i = this[o]; i && i !== n; i = i.parentNode)
          if (i.nodeType < 11 && (a ? a.index(i) > -1 : 1 === i.nodeType && t.find.matchesSelector(i, e))) {
            r.push(i);
            break
          };
      return this.pushStack(r.length > 1 ? t.unique(r) : r)
    },
    index: function(e) {
      return e ? 'string' == typeof e ? M.call(t(e), this[0]) : M.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(e, n) {
      return this.pushStack(t.unique(t.merge(this.get(), t(e, n))))
    },
    addBack: function(e) {
      return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }
  });

  function pe(e, t) {
    while ((e = e[t]) && 1 !== e.nodeType);
    return e
  };
  t.each({
    parent: function(e) {
      var t = e.parentNode;
      return t && 11 !== t.nodeType ? t : null
    },
    parents: function(e) {
      return t.dir(e, 'parentNode')
    },
    parentsUntil: function(e, n, i) {
      return t.dir(e, 'parentNode', i)
    },
    next: function(e) {
      return pe(e, 'nextSibling')
    },
    prev: function(e) {
      return pe(e, 'previousSibling')
    },
    nextAll: function(e) {
      return t.dir(e, 'nextSibling')
    },
    prevAll: function(e) {
      return t.dir(e, 'previousSibling')
    },
    nextUntil: function(e, n, i) {
      return t.dir(e, 'nextSibling', i)
    },
    prevUntil: function(e, n, i) {
      return t.dir(e, 'previousSibling', i)
    },
    siblings: function(e) {
      return t.sibling((e.parentNode || {}).firstChild, e)
    },
    children: function(e) {
      return t.sibling(e.firstChild)
    },
    contents: function(e) {
      return e.contentDocument || t.merge([], e.childNodes)
    }
  }, function(e, n) {
    t.fn[e] = function(i, r) {
      var o = t.map(this, n, i);
      return 'Until' !== e.slice(-5) && (r = i), r && 'string' == typeof r && (o = t.filter(r, o)), this.length > 1 && (Tt[e] || t.unique(o), Ct.test(e) && o.reverse()), this.pushStack(o)
    }
  });
  var l = /\S+/g,
    ie = {};

  function Lt(e) {
    var n = ie[e] = {};
    return t.each(e.match(l) || [], function(e, t) {
      n[t] = !0
    }), n
  };
  t.Callbacks = function(e) {
    e = 'string' == typeof e ? ie[e] || Lt(e) : t.extend({}, e);
    var r, l, u, d, a, o, n = [],
      i = !e.once && [],
      c = function(t) {
        for (r = e.memory && t, l = !0, o = d || 0, d = 0, a = n.length, u = !0; n && a > o; o++)
          if (n[o].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
            r = !1;
            break
          };
        u = !1, n && (i ? i.length && c(i.shift()) : r ? n = [] : s.disable())
      },
      s = {
        add: function() {
          if (n) {
            var i = n.length;
            ! function o(i) {
              t.each(i, function(i, r) {
                var a = t.type(r);
                'function' === a ? e.unique && s.has(r) || n.push(r) : r && r.length && 'string' !== a && o(r)
              })
            }(arguments), u ? a = n.length : r && (d = i, c(r))
          };
          return this
        },
        remove: function() {
          return n && t.each(arguments, function(e, i) {
            var r;
            while ((r = t.inArray(i, n, r)) > -1) n.splice(r, 1), u && (a >= r && a--, o >= r && o--)
          }), this
        },
        has: function(e) {
          return e ? t.inArray(e, n) > -1 : !(!n || !n.length)
        },
        empty: function() {
          return n = [], a = 0, this
        },
        disable: function() {
          return n = i = r = void 0, this
        },
        disabled: function() {
          return !n
        },
        lock: function() {
          return i = void 0, r || s.disable(), this
        },
        locked: function() {
          return !i
        },
        fireWith: function(e, t) {
          return !n || l && !i || (t = t || [], t = [e, t.slice ? t.slice() : t], u ? i.push(t) : c(t)), this
        },
        fire: function() {
          return s.fireWith(this, arguments), this
        },
        fired: function() {
          return !!l
        }
      };
    return s
  }, t.extend({
    Deferred: function(e) {
      var r = [
          ['resolve', 'done', t.Callbacks('once memory'), 'resolved'],
          ['reject', 'fail', t.Callbacks('once memory'), 'rejected'],
          ['notify', 'progress', t.Callbacks('memory')]
        ],
        o = 'pending',
        i = {
          state: function() {
            return o
          },
          always: function() {
            return n.done(arguments).fail(arguments), this
          },
          then: function() {
            var e = arguments;
            return t.Deferred(function(o) {
              t.each(r, function(r, a) {
                var s = t.isFunction(e[r]) && e[r];
                n[a[1]](function() {
                  var e = s && s.apply(this, arguments);
                  e && t.isFunction(e.promise) ? e.promise().done(o.resolve).fail(o.reject).progress(o.notify) : o[a[0] + 'With'](this === i ? o.promise() : this, s ? [e] : arguments)
                })
              }), e = null
            }).promise()
          },
          promise: function(e) {
            return null != e ? t.extend(e, i) : i
          }
        },
        n = {};
      return i.pipe = i.then, t.each(r, function(e, t) {
        var a = t[2],
          s = t[3];
        i[t[1]] = a.add, s && a.add(function() {
          o = s
        }, r[1 ^ e][2].disable, r[2][2].lock), n[t[0]] = function() {
          return n[t[0] + 'With'](this === n ? i : this, arguments), this
        }, n[t[0] + 'With'] = a.fireWith
      }), i.promise(n), e && e.call(n, n), n
    },
    when: function(e) {
      var n = 0,
        r = h.call(arguments),
        i = r.length,
        a = 1 !== i || e && t.isFunction(e.promise) ? i : 0,
        o = 1 === a ? e : t.Deferred(),
        c = function(e, t, n) {
          return function(i) {
            t[e] = this, n[e] = arguments.length > 1 ? h.call(arguments) : i, n === u ? o.notifyWith(t, n) : --a || o.resolveWith(t, n)
          }
        },
        u, l, s;
      if (i > 1)
        for (u = new Array(i), l = new Array(i), s = new Array(i); i > n; n++) r[n] && t.isFunction(r[n].promise) ? r[n].promise().done(c(n, s, r)).fail(o.reject).progress(c(n, l, u)) : --a;
      return a || o.resolveWith(s, r), o.promise()
    }
  });
  var A;
  t.fn.ready = function(e) {
    return t.ready.promise().done(e), this
  }, t.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(e) {
      e ? t.readyWait++ : t.ready(!0)
    },
    ready: function(e) {
      (e === !0 ? --t.readyWait : t.isReady) || (t.isReady = !0, e !== !0 && --t.readyWait > 0 || (A.resolveWith(r, [t]), t.fn.triggerHandler && (t(r).triggerHandler('ready'), t(r).off('ready'))))
    }
  });

  function j() {
    r.removeEventListener('DOMContentLoaded', j, !1), e.removeEventListener('load', j, !1), t.ready()
  };
  t.ready.promise = function(n) {
    return A || (A = t.Deferred(), 'complete' === r.readyState ? setTimeout(t.ready) : (r.addEventListener('DOMContentLoaded', j, !1), e.addEventListener('load', j, !1))), A.promise(n)
  }, t.ready.promise();
  var d = t.access = function(e, n, i, r, o, a, u) {
    var s = 0,
      l = e.length,
      c = null == i;
    if ('object' === t.type(i)) {
      o = !0;
      for (s in i) t.access(e, n, s, i[s], !0, a, u)
    } else if (void 0 !== r && (o = !0, t.isFunction(r) || (u = !0), c && (u ? (n.call(e, r), n = null) : (c = n, n = function(e, n, i) {
        return c.call(t(e), i)
      })), n))
      for (; l > s; s++) n(e[s], i, u ? r : r.call(e[s], s, n(e[s], i)));
    return o ? e : c ? n.call(e) : l ? n(e[0], i) : a
  };
  t.acceptData = function(e) {
    return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
  };

  function f() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function() {
        return {}
      }
    }), this.expando = t.expando + f.uid++
  };
  f.uid = 1, f.accepts = t.acceptData, f.prototype = {
    key: function(e) {
      if (!f.accepts(e)) return 0;
      var r = {},
        i = e[this.expando];
      if (!i) {
        i = f.uid++;
        try {
          r[this.expando] = {
            value: i
          }, Object.defineProperties(e, r)
        } catch (n) {
          r[this.expando] = i, t.extend(e, r)
        }
      };
      return this.cache[i] || (this.cache[i] = {}), i
    },
    set: function(e, n, i) {
      var o, a = this.key(e),
        r = this.cache[a];
      if ('string' == typeof n) r[n] = i;
      else if (t.isEmptyObject(r)) t.extend(this.cache[a], n);
      else
        for (o in n) r[o] = n[o];
      return r
    },
    get: function(e, t) {
      var n = this.cache[this.key(e)];
      return void 0 === t ? n : n[t]
    },
    access: function(e, n, i) {
      var r;
      return void 0 === n || n && 'string' == typeof n && void 0 === i ? (r = this.get(e, n), void 0 !== r ? r : this.get(e, t.camelCase(n))) : (this.set(e, n, i), void 0 !== i ? i : n)
    },
    remove: function(e, n) {
      var a, i, o, s = this.key(e),
        r = this.cache[s];
      if (void 0 === n) this.cache[s] = {};
      else {
        t.isArray(n) ? i = n.concat(n.map(t.camelCase)) : (o = t.camelCase(n), n in r ? i = [n, o] : (i = o, i = i in r ? [i] : i.match(l) || [])), a = i.length;
        while (a--) delete r[i[a]]
      }
    },
    hasData: function(e) {
      return !t.isEmptyObject(this.cache[e[this.expando]] || {})
    },
    discard: function(e) {
      e[this.expando] && delete this.cache[e[this.expando]]
    }
  };
  var i = new f,
    a = new f,
    kt = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    qt = /([A-Z])/g;

  function me(e, n, i) {
    var o;
    if (void 0 === i && 1 === e.nodeType)
      if (o = 'data-' + n.replace(qt, '-$1').toLowerCase(), i = e.getAttribute(o), 'string' == typeof i) {
        try {
          i = 'true' === i ? !0 : 'false' === i ? !1 : 'null' === i ? null : +i + '' === i ? +i : kt.test(i) ? t.parseJSON(i) : i
        } catch (r) {};
        a.set(e, n, i)
      }
    else i = void 0;
    return i
  };
  t.extend({
    hasData: function(e) {
      return a.hasData(e) || i.hasData(e)
    },
    data: function(e, t, n) {
      return a.access(e, t, n)
    },
    removeData: function(e, t) {
      a.remove(e, t)
    },
    r$: function(e, t, n) {
      return i.access(e, t, n)
    },
    i$: function(e, t) {
      i.remove(e, t)
    }
  }), t.fn.extend({
    data: function(e, n) {
      var s, o, c, r = this[0],
        u = r && r.attributes;
      if (void 0 === e) {
        if (this.length && (c = a.get(r), 1 === r.nodeType && !i.get(r, 'hasDataAttrs'))) {
          s = u.length;
          while (s--) u[s] && (o = u[s].name, 0 === o.indexOf('data-') && (o = t.camelCase(o.slice(5)), me(r, o, c[o])));
          i.set(r, 'hasDataAttrs', !0)
        };
        return c
      };
      return 'object' == typeof e ? this.each(function() {
        a.set(this, e)
      }) : d(this, function(n) {
        var i, o = t.camelCase(e);
        if (r && void 0 === n) {
          if (i = a.get(r, e), void 0 !== i) return i;
          if (i = a.get(r, o), void 0 !== i) return i;
          if (i = me(r, o, void 0), void 0 !== i) return i
        } else this.each(function() {
          var t = a.get(this, o);
          a.set(this, o, n), -1 !== e.indexOf('-') && void 0 !== t && a.set(this, e, n)
        })
      }, null, n, arguments.length > 1, null, !0)
    },
    removeData: function(e) {
      return this.each(function() {
        a.remove(this, e)
      })
    }
  }), t.extend({
    queue: function(e, n, r) {
      var o;
      return e ? (n = (n || 'fx') + 'queue', o = i.get(e, n), r && (!o || t.isArray(r) ? o = i.access(e, n, t.makeArray(r)) : o.push(r)), o || []) : void 0
    },
    dequeue: function(e, n) {
      n = n || 'fx';
      var r = t.queue(e, n),
        a = r.length,
        i = r.shift(),
        o = t.t$(e, n),
        s = function() {
          t.dequeue(e, n)
        };
      'inprogress' === i && (i = r.shift(), a--), i && ('fx' === n && r.unshift('inprogress'), delete o.stop, i.call(e, s, o)), !a && o && o.empty.fire()
    },
    t$: function(e, n) {
      var r = n + 'queueHooks';
      return i.get(e, r) || i.access(e, r, {
        empty: t.Callbacks('once memory').add(function() {
          i.remove(e, [n + 'queue', r])
        })
      })
    }
  }), t.fn.extend({
    queue: function(e, n) {
      var i = 2;
      return 'string' != typeof e && (n = e, e = 'fx', i--), arguments.length < i ? t.queue(this[0], e) : void 0 === n ? this : this.each(function() {
        var i = t.queue(this, e, n);
        t.t$(this, e), 'fx' === e && 'inprogress' !== i[0] && t.dequeue(this, e)
      })
    },
    dequeue: function(e) {
      return this.each(function() {
        t.dequeue(this, e)
      })
    },
    clearQueue: function(e) {
      return this.queue(e || 'fx', [])
    },
    promise: function(e, n) {
      var r, u = 1,
        c = t.Deferred(),
        o = this,
        s = this.length,
        a = function() {
          --u || c.resolveWith(o, [o])
        };
      'string' != typeof e && (n = e, e = void 0), e = e || 'fx';
      while (s--) r = i.get(o[s], e + 'queueHooks'), r && r.empty && (u++, r.empty.add(a));
      return a(), c.promise(n)
    }
  });
  var F = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    p = ['Top', 'Right', 'Bottom', 'Left'],
    x = function(e, n) {
      return e = n || e, 'none' === t.css(e, 'display') || !t.contains(e.ownerDocument, e)
    },
    Ee = /^(?:checkbox|radio)$/i;
  ! function() {
    var n = r.createDocumentFragment(),
      t = n.appendChild(r.createElement('div')),
      e = r.createElement('input');
    e.setAttribute('type', 'radio'), e.setAttribute('checked', 'checked'), e.setAttribute('name', 't'), t.appendChild(e), o.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = '<textarea>x</textarea>', o.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
  }();
  var C = 'undefined';
  o.focusinBubbles = 'onfocusin' in e;
  var xt = /^key/,
    bt = /^(?:mouse|pointer|contextmenu)|click/,
    ze = /^(?:focusinfocus|focusoutblur)$/,
    Ue = /^([^.]*)(?:\.(.+)|)$/;

  function S() {
    return !0
  };

  function v() {
    return !1
  };

  function ke() {
    try {
      return r.activeElement
    } catch (e) {}
  };
  t.event = {
    global: {},
    add: function(e, n, r, o, a) {
      var p, m, g, h, y, c, u, d, s, v, w, f = i.get(e);
      if (f) {
        r.handler && (p = r, r = p.handler, a = p.selector), r.guid || (r.guid = t.guid++), (h = f.events) || (h = f.events = {}), (m = f.handle) || (m = f.handle = function(n) {
          return typeof t !== C && t.event.triggered !== n.type ? t.event.dispatch.apply(e, arguments) : void 0
        }), n = (n || '').match(l) || [''], y = n.length;
        while (y--) g = Ue.exec(n[y]) || [], s = w = g[1], v = (g[2] || '').split('.').sort(), s && (u = t.event.special[s] || {}, s = (a ? u.delegateType : u.bindType) || s, u = t.event.special[s] || {}, c = t.extend({
          type: s,
          origType: w,
          data: o,
          handler: r,
          guid: r.guid,
          selector: a,
          needsContext: a && t.expr.match.needsContext.test(a),
          namespace: v.join('.')
        }, p), (d = h[s]) || (d = h[s] = [], d.delegateCount = 0, u.setup && u.setup.call(e, o, v, m) !== !1 || e.addEventListener && e.addEventListener(s, m, !1)), u.add && (u.add.call(e, c), c.handler.guid || (c.handler.guid = r.guid)), a ? d.splice(d.delegateCount++, 0, c) : d.push(c), t.event.global[s] = !0)
      }
    },
    remove: function(e, n, r, o, a) {
      var m, y, c, p, g, u, d, f, s, v, w, h = i.hasData(e) && i.get(e);
      if (h && (p = h.events)) {
        n = (n || '').match(l) || [''], g = n.length;
        while (g--)
          if (c = Ue.exec(n[g]) || [], s = w = c[1], v = (c[2] || '').split('.').sort(), s) {
            d = t.event.special[s] || {}, s = (o ? d.delegateType : d.bindType) || s, f = p[s] || [], c = c[2] && new RegExp('(^|\\.)' + v.join('\\.(?:.*\\.|)') + '(\\.|$)'), y = m = f.length;
            while (m--) u = f[m], !a && w !== u.origType || r && r.guid !== u.guid || c && !c.test(u.namespace) || o && o !== u.selector && ('**' !== o || !u.selector) || (f.splice(m, 1), u.selector && f.delegateCount--, d.remove && d.remove.call(e, u));
            y && !f.length && (d.teardown && d.teardown.call(e, v, h.handle) !== !1 || t.removeEvent(e, s, h.handle), delete p[s])
          }
        else
          for (s in p) t.event.remove(e, s + n[g], r, o, !0);
        t.isEmptyObject(p) && (delete h.handle, i.remove(e, 'events'))
      }
    },
    trigger: function(n, o, a, s) {
      var v, u, l, g, f, h, d, m = [a || r],
        c = U.call(n, 'type') ? n.type : n,
        p = U.call(n, 'namespace') ? n.namespace.split('.') : [];
      if (u = l = a = a || r, 3 !== a.nodeType && 8 !== a.nodeType && !ze.test(c + t.event.triggered) && (c.indexOf('.') >= 0 && (p = c.split('.'), c = p.shift(), p.sort()), f = c.indexOf(':') < 0 && 'on' + c, n = n[t.expando] ? n : new t.Event(c, 'object' == typeof n && n), n.isTrigger = s ? 2 : 3, n.namespace = p.join('.'), n.namespace_re = n.namespace ? new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, n.result = void 0, n.target || (n.target = a), o = null == o ? [n] : t.makeArray(o, [n]), d = t.event.special[c] || {}, s || !d.trigger || d.trigger.apply(a, o) !== !1)) {
        if (!s && !d.noBubble && !t.isWindow(a)) {
          for (g = d.delegateType || c, ze.test(g + c) || (u = u.parentNode); u; u = u.parentNode) m.push(u), l = u;
          l === (a.ownerDocument || r) && m.push(l.defaultView || l.parentWindow || e)
        };
        v = 0;
        while ((u = m[v++]) && !n.isPropagationStopped()) n.type = v > 1 ? g : d.bindType || c, h = (i.get(u, 'events') || {})[n.type] && i.get(u, 'handle'), h && h.apply(u, o), h = f && u[f], h && h.apply && t.acceptData(u) && (n.result = h.apply(u, o), n.result === !1 && n.preventDefault());
        return n.type = c, s || n.isDefaultPrevented() || d.e$ && d.e$.apply(m.pop(), o) !== !1 || !t.acceptData(a) || f && t.isFunction(a[c]) && !t.isWindow(a) && (l = a[f], l && (a[f] = null), t.event.triggered = c, a[c](), t.event.triggered = void 0, l && (a[f] = l)), n.result
      }
    },
    dispatch: function(e) {
      e = t.event.fix(e);
      var s, l, a, o, n, c = [],
        u = h.call(arguments),
        d = (i.get(this, 'events') || {})[e.type] || [],
        r = t.event.special[e.type] || {};
      if (u[0] = e, e.delegateTarget = this, !r.preDispatch || r.preDispatch.call(this, e) !== !1) {
        c = t.event.handlers.call(this, e, d), s = 0;
        while ((o = c[s++]) && !e.isPropagationStopped()) {
          e.currentTarget = o.elem, l = 0;
          while ((n = o.handlers[l++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(n.namespace)) && (e.handleObj = n, e.data = n.data, a = ((t.event.special[n.origType] || {}).handle || n.handler).apply(o.elem, u), void 0 !== a && (e.result = a) === !1 && (e.preventDefault(), e.stopPropagation()))
        };
        return r.postDispatch && r.postDispatch.call(this, e), e.result
      }
    },
    handlers: function(e, n) {
      var u, r, o, s, c = [],
        a = n.delegateCount,
        i = e.target;
      if (a && i.nodeType && (!e.button || 'click' !== e.type))
        for (; i !== this; i = i.parentNode || this)
          if (i.disabled !== !0 || 'click' !== e.type) {
            for (r = [], u = 0; a > u; u++) s = n[u], o = s.selector + ' ', void 0 === r[o] && (r[o] = s.needsContext ? t(o, this).index(i) >= 0 : t.find(o, this, null, [i]).length), r[o] && r.push(s);
            r.length && c.push({
              elem: i,
              handlers: r
            })
          };
      return a < n.length && c.push({
        elem: this,
        handlers: n.slice(a)
      }), c
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function(e, t) {
        return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function(e, t) {
        var a, n, i, o = t.button;
        return null == e.pageX && null != t.clientX && (a = e.target.ownerDocument || r, n = a.documentElement, i = a.body, e.pageX = t.clientX + (n && n.scrollLeft || i && i.scrollLeft || 0) - (n && n.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (n && n.scrollTop || i && i.scrollTop || 0) - (n && n.clientTop || i && i.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
      }
    },
    fix: function(e) {
      if (e[t.expando]) return e;
      var s, u, a, i = e.type,
        o = e,
        n = this.fixHooks[i];
      n || (this.fixHooks[i] = n = bt.test(i) ? this.mouseHooks : xt.test(i) ? this.keyHooks : {}), a = n.props ? this.props.concat(n.props) : this.props, e = new t.Event(o), s = a.length;
      while (s--) u = a[s], e[u] = o[u];
      return e.target || (e.target = r), 3 === e.target.nodeType && (e.target = e.target.parentNode), n.filter ? n.filter(e, o) : e
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          return this !== ke() && this.focus ? (this.focus(), !1) : void 0
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function() {
          return this === ke() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: 'focusout'
      },
      click: {
        trigger: function() {
          return 'checkbox' === this.type && this.click && t.nodeName(this, 'input') ? (this.click(), !1) : void 0
        },
        e$: function(e) {
          return t.nodeName(e.target, 'a')
        }
      },
      beforeunload: {
        postDispatch: function(e) {
          void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
        }
      }
    },
    simulate: function(e, n, i, r) {
      var o = t.extend(new t.Event, i, {
        type: e,
        isSimulated: !0,
        originalEvent: {}
      });
      r ? t.event.trigger(o, null, n) : t.event.dispatch.call(n, o), o.isDefaultPrevented() && i.preventDefault()
    }
  }, t.removeEvent = function(e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n, !1)
  }, t.Event = function(e, n) {
    return this instanceof t.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? S : v) : this.type = e, n && t.extend(this, n), this.timeStamp = e && e.timeStamp || t.now(), void(this[t.expando] = !0)) : new t.Event(e, n)
  }, t.Event.prototype = {
    isDefaultPrevented: v,
    isPropagationStopped: v,
    isImmediatePropagationStopped: v,
    preventDefault: function() {
      var e = this.originalEvent;
      this.isDefaultPrevented = S, e && e.preventDefault && e.preventDefault()
    },
    stopPropagation: function() {
      var e = this.originalEvent;
      this.isPropagationStopped = S, e && e.stopPropagation && e.stopPropagation()
    },
    stopImmediatePropagation: function() {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = S, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
    }
  }, t.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout',
    pointerenter: 'pointerover',
    pointerleave: 'pointerout'
  }, function(e, n) {
    t.event.special[e] = {
      delegateType: n,
      bindType: n,
      handle: function(e) {
        var a, o = this,
          i = e.relatedTarget,
          r = e.handleObj;
        return (!i || i !== o && !t.contains(o, i)) && (e.type = r.origType, a = r.handler.apply(this, arguments), e.type = n), a
      }
    }
  }), o.focusinBubbles || t.each({
    focus: 'focusin',
    blur: 'focusout'
  }, function(e, n) {
    var r = function(e) {
      t.event.simulate(n, e.target, t.event.fix(e), !0)
    };
    t.event.special[n] = {
      setup: function() {
        var t = this.ownerDocument || this,
          o = i.access(t, n);
        o || t.addEventListener(e, r, !0), i.access(t, n, (o || 0) + 1)
      },
      teardown: function() {
        var t = this.ownerDocument || this,
          o = i.access(t, n) - 1;
        o ? i.access(t, n, o) : (t.removeEventListener(e, r, !0), i.remove(t, n))
      }
    }
  }), t.fn.extend({
    on: function(e, n, i, r, o) {
      var a, s;
      if ('object' == typeof e) {
        'string' != typeof n && (i = i || n, n = void 0);
        for (s in e) this.on(s, n, i, e[s], o);
        return this
      };
      if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ('string' == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), r === !1) r = v;
      else if (!r) return this;
      return 1 === o && (a = r, r = function(e) {
        return t().off(e), a.apply(this, arguments)
      }, r.guid = a.guid || (a.guid = t.guid++)), this.each(function() {
        t.event.add(this, e, r, i, n)
      })
    },
    one: function(e, t, n, i) {
      return this.on(e, t, n, i, 1)
    },
    off: function(e, n, i) {
      var r, o;
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, t(e.delegateTarget).off(r.namespace ? r.origType + '.' + r.namespace : r.origType, r.selector, r.handler), this;
      if ('object' == typeof e) {
        for (o in e) this.off(o, n, e[o]);
        return this
      };
      return (n === !1 || 'function' == typeof n) && (i = n, n = void 0), i === !1 && (i = v), this.each(function() {
        t.event.remove(this, e, i, n)
      })
    },
    trigger: function(e, n) {
      return this.each(function() {
        t.event.trigger(e, n, this)
      })
    },
    triggerHandler: function(e, n) {
      var i = this[0];
      return i ? t.event.trigger(e, n, i, !0) : void 0
    }
  });
  var Re = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    De = /<([\w:]+)/,
    yt = /<|&#?\w+;/,
    wt = /<(?:script|style|link)/i,
    vt = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Be = /^$|\/(?:java|ecma)script/i,
    gt = /^true\/(.*)/,
    pt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    c = {
      option: [1, '<select multiple=\'multiple\'>', '</select>'],
      thead: [1, '<table>', '</table>'],
      col: [2, '<table><colgroup>', '</colgroup></table>'],
      tr: [2, '<table><tbody>', '</tbody></table>'],
      td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
      e$: [0, '', '']
    };
  c.optgroup = c.option, c.tbody = c.tfoot = c.colgroup = c.caption = c.thead, c.th = c.td;

  function ge(e, n) {
    return t.nodeName(e, 'table') && t.nodeName(11 !== n.nodeType ? n : n.firstChild, 'tr') ? e.getElementsByTagName('tbody')[0] || e.appendChild(e.ownerDocument.createElement('tbody')) : e
  };

  function Wt(e) {
    return e.type = (null !== e.getAttribute('type')) + '/' + e.type, e
  };

  function st(e) {
    var t = gt.exec(e.type);
    return t ? e.type = t[1] : e.removeAttribute('type'), e
  };

  function Q(e, t) {
    for (var n = 0, r = e.length; r > n; n++) i.set(e[n], 'globalEval', !t || i.get(t[n], 'globalEval'))
  };

  function fe(e, n) {
    var s, f, o, c, u, d, l, r;
    if (1 === n.nodeType) {
      if (i.hasData(e) && (c = i.access(e), u = i.set(n, c), r = c.events)) {
        delete u.handle, u.events = {};
        for (o in r)
          for (s = 0, f = r[o].length; f > s; s++) t.event.add(n, o, r[o][s])
      };
      a.hasData(e) && (d = a.access(e), l = t.extend({}, d), a.set(n, l))
    }
  };

  function u(e, n) {
    var i = e.getElementsByTagName ? e.getElementsByTagName(n || '*') : e.querySelectorAll ? e.querySelectorAll(n || '*') : [];
    return void 0 === n || n && t.nodeName(e, n) ? t.merge([e], i) : i
  };

  function Ve(e, t) {
    var n = t.nodeName.toLowerCase();
    'input' === n && Ee.test(e.type) ? t.checked = e.checked : ('input' === n || 'textarea' === n) && (t.defaultValue = e.defaultValue)
  };
  t.extend({
    clone: function(e, n, i) {
      var r, l, s, a, c = e.cloneNode(!0),
        d = t.contains(e.ownerDocument, e);
      if (!(o.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || t.isXMLDoc(e)))
        for (a = u(c), s = u(e), r = 0, l = s.length; l > r; r++) Ve(s[r], a[r]);
      if (n)
        if (i)
          for (s = s || u(e), a = a || u(c), r = 0, l = s.length; l > r; r++) fe(s[r], a[r]);
        else fe(e, c);
      return a = u(c, 'script'), a.length > 0 && Q(a, !d && u(e, 'script')), c
    },
    buildFragment: function(e, n, i, r) {
      for (var o, a, p, d, m, f, s = n.createDocumentFragment(), h = [], l = 0, g = e.length; g > l; l++)
        if (o = e[l], o || 0 === o)
          if ('object' === t.type(o)) t.merge(h, o.nodeType ? [o] : o);
          else if (yt.test(o)) {
        a = a || s.appendChild(n.createElement('div')), p = (De.exec(o) || ['', ''])[1].toLowerCase(), d = c[p] || c.e$, a.innerHTML = d[1] + o.replace(Re, '<$1></$2>') + d[2], f = d[0];
        while (f--) a = a.lastChild;
        t.merge(h, a.childNodes), a = s.firstChild, a.textContent = ''
      } else h.push(n.createTextNode(o));
      s.textContent = '', l = 0;
      while (o = h[l++])
        if ((!r || -1 === t.inArray(o, r)) && (m = t.contains(o.ownerDocument, o), a = u(s.appendChild(o), 'script'), m && Q(a), i)) {
          f = 0;
          while (o = a[f++]) Be.test(o.type || '') && i.push(o)
        };
      return s
    },
    cleanData: function(e) {
      for (var s, n, o, r, c = t.event.special, u = 0; void 0 !== (n = e[u]); u++) {
        if (t.acceptData(n) && (r = n[i.expando], r && (s = i.cache[r]))) {
          if (s.events)
            for (o in s.events) c[o] ? t.event.remove(n, o) : t.removeEvent(n, o, s.handle);
          i.cache[r] && delete i.cache[r]
        };
        delete a.cache[n[a.expando]]
      }
    }
  }), t.fn.extend({
    text: function(e) {
      return d(this, function(e) {
        return void 0 === e ? t.text(this) : this.empty().each(function() {
          (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
        })
      }, null, e, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = ge(this, e);
          t.appendChild(e)
        }
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(e) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var t = ge(this, e);
          t.insertBefore(e, t.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    },
    after: function() {
      return this.domManip(arguments, function(e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    },
    remove: function(e, n) {
      for (var i, o = e ? t.filter(e, this) : this, r = 0; null != (i = o[r]); r++) n || 1 !== i.nodeType || t.cleanData(u(i)), i.parentNode && (n && t.contains(i.ownerDocument, i) && Q(u(i, 'script')), i.parentNode.removeChild(i));
      return this
    },
    empty: function() {
      for (var e, n = 0; null != (e = this[n]); n++) 1 === e.nodeType && (t.cleanData(u(e, !1)), e.textContent = '');
      return this
    },
    clone: function(e, n) {
      return e = null == e ? !1 : e, n = null == n ? e : n, this.map(function() {
        return t.clone(this, e, n)
      })
    },
    html: function(e) {
      return d(this, function(e) {
        var i = this[0] || {},
          r = 0,
          o = this.length;
        if (void 0 === e && 1 === i.nodeType) return i.innerHTML;
        if ('string' == typeof e && !wt.test(e) && !c[(De.exec(e) || ['', ''])[1].toLowerCase()]) {
          e = e.replace(Re, '<$1></$2>');
          try {
            for (; o > r; r++) i = this[r] || {}, 1 === i.nodeType && (t.cleanData(u(i, !1)), i.innerHTML = e);
            i = 0
          } catch (n) {}
        };
        i && this.empty().append(e)
      }, null, e, arguments.length)
    },
    replaceWith: function() {
      var e = arguments[0];
      return this.domManip(arguments, function(n) {
        e = this.parentNode, t.cleanData(u(this)), e && e.replaceChild(n, this)
      }), e && (e.length || e.nodeType) ? this : this.remove()
    },
    detach: function(e) {
      return this.remove(e, !0)
    },
    domManip: function(e, n) {
      e = be.apply([], e);
      var c, h, s, l, r, m, a = 0,
        f = this.length,
        v = this,
        g = f - 1,
        d = e[0],
        p = t.isFunction(d);
      if (p || f > 1 && 'string' == typeof d && !o.checkClone && vt.test(d)) return this.each(function(t) {
        var i = v.eq(t);
        p && (e[0] = d.call(this, t, i.html())), i.domManip(e, n)
      });
      if (f && (c = t.buildFragment(e, this[0].ownerDocument, !1, this), h = c.firstChild, 1 === c.childNodes.length && (c = h), h)) {
        for (s = t.map(u(c, 'script'), Wt), l = s.length; f > a; a++) r = c, a !== g && (r = t.clone(r, !0, !0), l && t.merge(s, u(r, 'script'))), n.call(this[a], r, a);
        if (l)
          for (m = s[s.length - 1].ownerDocument, t.map(s, st), a = 0; l > a; a++) r = s[a], Be.test(r.type || '') && !i.access(r, 'globalEval') && t.contains(m, r) && (r.src ? t.n$ && t.n$(r.src) : t.globalEval(r.textContent.replace(pt, '')))
      };
      return this
    }
  }), t.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function(e, n) {
    t.fn[e] = function(e) {
      for (var r, a = [], s = t(e), o = s.length - 1, i = 0; o >= i; i++) r = i === o ? this : this.clone(!0), t(s[i])[n](r), X.apply(a, r.get());
      return this.pushStack(a)
    }
  });
  var O, Me = {};

  function ve(n, i) {
    var o, r = t(i.createElement(n)).appendTo(i.body),
      a = e.getDefaultComputedStyle && (o = e.getDefaultComputedStyle(r[0])) ? o.display : t.css(r[0], 'display');
    return r.detach(), a
  };

  function G(e) {
    var i = r,
      n = Me[e];
    return n || (n = ve(e, i), 'none' !== n && n || (O = (O || t('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>')).appendTo(i.documentElement), i = O[0].contentDocument, i.write(), i.close(), n = ve(e, i), O.detach()), Me[e] = n), n
  };
  var Se = /^margin/,
    W = new RegExp('^(' + F + ')(?!px)[a-z%]+$', 'i'),
    L = function(t) {
      return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
    };

  function T(e, n, i) {
    var a, s, u, o, r = e.style;
    return i = i || L(e), i && (o = i.getPropertyValue(n) || i[n]), i && ('' !== o || t.contains(e.ownerDocument, e) || (o = t.style(e, n)), W.test(o) && Se.test(n) && (a = r.width, s = r.minWidth, u = r.maxWidth, r.minWidth = r.maxWidth = r.width = o, o = i.width, r.width = a, r.minWidth = s, r.maxWidth = u)), void 0 !== o ? o + '' : o
  };

  function ye(e, t) {
    return {
      get: function() {
        return e() ? void delete this.get : (this.get = t).apply(this, arguments)
      }
    }
  };
  ! function() {
    var c, s, a = r.documentElement,
      i = r.createElement('div'),
      n = r.createElement('div');
    if (n.style) {
      n.style.backgroundClip = 'content-box', n.cloneNode(!0).style.backgroundClip = '', o.clearCloneStyle = 'content-box' === n.style.backgroundClip, i.style.cssText = 'border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute', i.appendChild(n);

      function u() {
        n.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute', n.innerHTML = '', a.appendChild(i);
        var t = e.getComputedStyle(n, null);
        c = '1%' !== t.top, s = '4px' === t.width, a.removeChild(i)
      };
      e.getComputedStyle && t.extend(o, {
        pixelPosition: function() {
          return u(), c
        },
        boxSizingReliable: function() {
          return null == s && u(), s
        },
        reliableMarginRight: function() {
          var o, t = n.appendChild(r.createElement('div'));
          return t.style.cssText = n.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0', t.style.marginRight = t.style.width = '0', n.style.width = '1px', a.appendChild(i), o = !parseFloat(e.getComputedStyle(t, null).marginRight), a.removeChild(i), n.removeChild(t), o
        }
      })
    }
  }(), t.swap = function(e, t, n, i) {
    var a, r, o = {};
    for (r in t) o[r] = e.style[r], e.style[r] = t[r];
    a = n.apply(e, i || []);
    for (r in t) e.style[r] = o[r];
    return a
  };
  var Dt = /^(none|table(?!-c[ea]).+)/,
    Ot = new RegExp('^(' + F + ')(.*)$', 'i'),
    Ht = new RegExp('^([+-])=(' + F + ')', 'i'),
    Rt = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    },
    Ne = {
      letterSpacing: '0',
      fontWeight: '400'
    },
    Ae = ['Webkit', 'O', 'Moz', 'ms'];

  function de(e, t) {
    if (t in e) return t;
    var i = t[0].toUpperCase() + t.slice(1),
      r = t,
      n = Ae.length;
    while (n--)
      if (t = Ae[n] + i, t in e) return t;
    return r
  };

  function Ce(e, t, n) {
    var i = Ot.exec(t);
    return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || 'px') : t
  };

  function we(e, n, i, r, o) {
    for (var a = i === (r ? 'border' : 'content') ? 4 : 'width' === n ? 1 : 0, s = 0; 4 > a; a += 2) 'margin' === i && (s += t.css(e, i + p[a], !0, o)), r ? ('content' === i && (s -= t.css(e, 'padding' + p[a], !0, o)), 'margin' !== i && (s -= t.css(e, 'border' + p[a] + 'Width', !0, o))) : (s += t.css(e, 'padding' + p[a], !0, o), 'padding' !== i && (s += t.css(e, 'border' + p[a] + 'Width', !0, o)));
    return s
  };

  function xe(e, n, i) {
    var u = !0,
      r = 'width' === n ? e.offsetWidth : e.offsetHeight,
      a = L(e),
      s = 'border-box' === t.css(e, 'boxSizing', !1, a);
    if (0 >= r || null == r) {
      if (r = T(e, n, a), (0 > r || null == r) && (r = e.style[n]), W.test(r)) return r;
      u = s && (o.boxSizingReliable() || r === e.style[n]), r = parseFloat(r) || 0
    };
    return r + we(e, n, i || (s ? 'border' : 'content'), u, a) + 'px'
  };

  function Te(e, n) {
    for (var a, r, u, s = [], o = 0, c = e.length; c > o; o++) r = e[o], r.style && (s[o] = i.get(r, 'olddisplay'), a = r.style.display, n ? (s[o] || 'none' !== a || (r.style.display = ''), '' === r.style.display && x(r) && (s[o] = i.access(r, 'olddisplay', G(r.nodeName)))) : (u = x(r), 'none' === a && u || i.set(r, 'olddisplay', u ? a : t.css(r, 'display'))));
    for (o = 0; c > o; o++) r = e[o], r.style && (n && 'none' !== r.style.display && '' !== r.style.display || (r.style.display = n ? s[o] || '' : 'none'));
    return e
  };
  t.extend({
    cssHooks: {
      opacity: {
        get: function(e, t) {
          if (t) {
            var n = T(e, 'opacity');
            return '' === n ? '1' : n
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      'float': 'cssFloat'
    },
    style: function(e, n, i, r) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var u, l, a, s = t.camelCase(n),
          c = e.style;
        return n = t.cssProps[s] || (t.cssProps[s] = de(c, s)), a = t.cssHooks[n] || t.cssHooks[s], void 0 === i ? a && 'get' in a && void 0 !== (u = a.get(e, !1, r)) ? u : c[n] : (l = typeof i, 'string' === l && (u = Ht.exec(i)) && (i = (u[1] + 1) * u[2] + parseFloat(t.css(e, n)), l = 'number'), null != i && i === i && ('number' !== l || t.cssNumber[s] || (i += 'px'), o.clearCloneStyle || '' !== i || 0 !== n.indexOf('background') || (c[n] = 'inherit'), a && 'set' in a && void 0 === (i = a.set(e, i, r)) || (c[n] = i)), void 0)
      }
    },
    css: function(e, n, i, r) {
      var o, u, a, s = t.camelCase(n);
      return n = t.cssProps[s] || (t.cssProps[s] = de(e.style, s)), a = t.cssHooks[n] || t.cssHooks[s], a && 'get' in a && (o = a.get(e, !0, i)), void 0 === o && (o = T(e, n, r)), 'normal' === o && n in Ne && (o = Ne[n]), '' === i || i ? (u = parseFloat(o), i === !0 || t.isNumeric(u) ? u || 0 : o) : o
    }
  }), t.each(['height', 'width'], function(e, n) {
    t.cssHooks[n] = {
      get: function(e, i, r) {
        return i ? Dt.test(t.css(e, 'display')) && 0 === e.offsetWidth ? t.swap(e, Rt, function() {
          return xe(e, n, r)
        }) : xe(e, n, r) : void 0
      },
      set: function(e, i, r) {
        var o = r && L(e);
        return Ce(e, i, r ? we(e, n, r, 'border-box' === t.css(e, 'boxSizing', !1, o), o) : 0)
      }
    }
  }), t.cssHooks.marginRight = ye(o.reliableMarginRight, function(e, n) {
    return n ? t.swap(e, {
      display: 'inline-block'
    }, T, [e, 'marginRight']) : void 0
  }), t.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function(e, n) {
    t.cssHooks[e + n] = {
      expand: function(t) {
        for (var i = 0, o = {}, r = 'string' == typeof t ? t.split(' ') : [t]; 4 > i; i++) o[e + p[i] + n] = r[i] || r[i - 2] || r[0];
        return o
      }
    }, Se.test(e) || (t.cssHooks[e + n].set = Ce)
  }), t.fn.extend({
    css: function(e, n) {
      return d(this, function(e, n, i) {
        var a, s, o = {},
          r = 0;
        if (t.isArray(n)) {
          for (a = L(e), s = n.length; s > r; r++) o[n[r]] = t.css(e, n[r], !1, a);
          return o
        };
        return void 0 !== i ? t.style(e, n, i) : t.css(e, n)
      }, e, n, arguments.length > 1)
    },
    show: function() {
      return Te(this, !0)
    },
    hide: function() {
      return Te(this)
    },
    toggle: function(e) {
      return 'boolean' == typeof e ? e ? this.show() : this.hide() : this.each(function() {
        x(this) ? t(this).show() : t(this).hide()
      })
    }
  });

  function s(e, t, n, i, r) {
    return new s.prototype.init(e, t, n, i, r)
  };
  t.Tween = s, s.prototype = {
    constructor: s,
    init: function(e, n, i, r, o, a) {
      this.elem = e, this.prop = i, this.easing = o || 'swing', this.options = n, this.start = this.now = this.cur(), this.end = r, this.unit = a || (t.cssNumber[i] ? '' : 'px')
    },
    cur: function() {
      var e = s.propHooks[this.prop];
      return e && e.get ? e.get(this) : s.propHooks.e$.get(this)
    },
    run: function(e) {
      var i, n = s.propHooks[this.prop];
      return this.options.duration ? this.pos = i = t.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = i = e, this.now = (this.end - this.start) * i + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : s.propHooks.e$.set(this), this
    }
  }, s.prototype.init.prototype = s.prototype, s.propHooks = {
    e$: {
      get: function(e) {
        var n;
        return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (n = t.css(e.elem, e.prop, ''), n && 'auto' !== n ? n : 0) : e.elem[e.prop]
      },
      set: function(e) {
        t.fx.step[e.prop] ? t.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[t.cssProps[e.prop]] || t.cssHooks[e.prop]) ? t.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
      }
    }
  }, s.propHooks.scrollTop = s.propHooks.scrollLeft = {
    set: function(e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, t.easing = {
    linear: function(e) {
      return e
    },
    swing: function(e) {
      return .5 - Math.cos(e * Math.PI) / 2
    }
  }, t.fx = s.prototype.init, t.fx.step = {};
  var m, I, Nt = /^(?:toggle|show|hide)$/,
    Ie = new RegExp('^(?:([+-])=|)(' + F + ')([a-z%]*)$', 'i'),
    ht = /queueHooks$/,
    N = [rt],
    b = {
      '*': [function(e, n) {
        var o = this.createTween(e, n),
          u = o.cur(),
          r = Ie.exec(n),
          a = r && r[3] || (t.cssNumber[e] ? '' : 'px'),
          i = (t.cssNumber[e] || 'px' !== a && +u) && Ie.exec(t.css(o.elem, e)),
          s = 1,
          c = 20;
        if (i && i[3] !== a) {
          a = a || i[3], r = r || [], i = +u || 1;
          do s = s || '.5', i /= s, t.style(o.elem, e, i + a); while (s !== (s = o.cur() / u) && 1 !== s && --c)
        };
        return r && (i = o.start = +i || +u || 0, o.unit = a, o.end = r[1] ? i + (r[1] + 1) * r[2] : +r[2]), o
      }]
    };

  function ue() {
    return setTimeout(function() {
      m = void 0
    }), m = t.now()
  };

  function P(e, t) {
    var i, r = 0,
      n = {
        height: e
      };
    for (t = t ? 1 : 0; 4 > r; r += 2 - t) i = p[r], n['margin' + i] = n['padding' + i] = e;
    return t && (n.opacity = n.width = e), n
  };

  function le(e, t, n) {
    for (var r, o = (b[t] || []).concat(b['*']), i = 0, a = o.length; a > i; i++)
      if (r = o[i].call(n, t, e)) return r
  };

  function rt(e, n, r) {
    var o, f, m, p, u, v, l, g, d = this,
      h = {},
      s = e.style,
      c = e.nodeType && x(e),
      a = i.get(e, 'fxshow');
    r.queue || (u = t.t$(e, 'fx'), null == u.unqueued && (u.unqueued = 0, v = u.empty.fire, u.empty.fire = function() {
      u.unqueued || v()
    }), u.unqueued++, d.always(function() {
      d.always(function() {
        u.unqueued--, t.queue(e, 'fx').length || u.empty.fire()
      })
    })), 1 === e.nodeType && ('height' in n || 'width' in n) && (r.overflow = [s.overflow, s.overflowX, s.overflowY], l = t.css(e, 'display'), g = 'none' === l ? i.get(e, 'olddisplay') || G(e.nodeName) : l, 'inline' === g && 'none' === t.css(e, 'float') && (s.display = 'inline-block')), r.overflow && (s.overflow = 'hidden', d.always(function() {
      s.overflow = r.overflow[0], s.overflowX = r.overflow[1], s.overflowY = r.overflow[2]
    }));
    for (o in n)
      if (f = n[o], Nt.exec(f)) {
        if (delete n[o], m = m || 'toggle' === f, f === (c ? 'hide' : 'show')) {
          if ('show' !== f || !a || void 0 === a[o]) continue;
          c = !0
        };
        h[o] = a && a[o] || t.style(e, o)
      }
    else l = void 0;
    if (t.isEmptyObject(h)) 'inline' === ('none' === l ? G(e.nodeName) : l) && (s.display = l);
    else {
      a ? 'hidden' in a && (c = a.hidden) : a = i.access(e, 'fxshow', {}), m && (a.hidden = !c), c ? t(e).show() : d.done(function() {
        t(e).hide()
      }), d.done(function() {
        var n;
        i.remove(e, 'fxshow');
        for (n in h) t.style(e, n, h[n])
      });
      for (o in h) p = le(c ? a[o] : 0, o, d), o in a || (a[o] = p.start, c && (p.end = p.start, p.start = 'width' === o || 'height' === o ? 1 : 0))
    }
  };

  function it(e, n) {
    var i, o, s, r, a;
    for (i in e)
      if (o = t.camelCase(i), s = n[o], r = e[i], t.isArray(r) && (s = r[1], r = e[i] = r[0]), i !== o && (e[o] = r, delete e[i]), a = t.cssHooks[o], a && 'expand' in a) {
        r = a.expand(r), delete e[o];
        for (i in r) i in e || (e[i] = r[i], n[i] = s)
      }
    else n[o] = s
  };

  function ce(e, n, i) {
    var c, u, s = 0,
      d = N.length,
      o = t.Deferred().always(function() {
        delete l.elem
      }),
      l = function() {
        if (u) return !1;
        for (var c = m || ue(), n = Math.max(0, r.startTime + r.duration - c), s = n / r.duration || 0, t = 1 - s, i = 0, a = r.tweens.length; a > i; i++) r.tweens[i].run(t);
        return o.notifyWith(e, [r, t, n]), 1 > t && a ? n : (o.resolveWith(e, [r]), !1)
      },
      r = o.promise({
        elem: e,
        props: t.extend({}, n),
        opts: t.extend(!0, {
          specialEasing: {}
        }, i),
        originalProperties: n,
        originalOptions: i,
        startTime: m || ue(),
        duration: i.duration,
        tweens: [],
        createTween: function(n, i) {
          var o = t.Tween(e, r.opts, n, i, r.opts.specialEasing[n] || r.opts.easing);
          return r.tweens.push(o), o
        },
        stop: function(t) {
          var n = 0,
            i = t ? r.tweens.length : 0;
          if (u) return this;
          for (u = !0; i > n; n++) r.tweens[n].run(1);
          return t ? o.resolveWith(e, [r, t]) : o.rejectWith(e, [r, t]), this
        }
      }),
      a = r.props;
    for (it(a, r.opts.specialEasing); d > s; s++)
      if (c = N[s].call(r, e, a, r.opts)) return c;
    return t.map(a, le, r), t.isFunction(r.opts.start) && r.opts.start.call(e, r), t.fx.timer(t.extend(l, {
      elem: e,
      anim: r,
      queue: r.opts.queue
    })), r.progress(r.opts.progress).done(r.opts.done, r.opts.complete).fail(r.opts.fail).always(r.opts.always)
  };
  t.Animation = t.extend(ce, {
      tweener: function(e, n) {
        t.isFunction(e) ? (n = e, e = ['*']) : e = e.split(' ');
        for (var i, r = 0, o = e.length; o > r; r++) i = e[r], b[i] = b[i] || [], b[i].unshift(n)
      },
      prefilter: function(e, t) {
        t ? N.unshift(e) : N.push(e)
      }
    }), t.speed = function(e, n, i) {
      var r = e && 'object' == typeof e ? t.extend({}, e) : {
        complete: i || !i && n || t.isFunction(e) && e,
        duration: e,
        easing: i && n || n && !t.isFunction(n) && n
      };
      return r.duration = t.fx.off ? 0 : 'number' == typeof r.duration ? r.duration : r.duration in t.fx.speeds ? t.fx.speeds[r.duration] : t.fx.speeds.e$, (null == r.queue || r.queue === !0) && (r.queue = 'fx'), r.old = r.complete, r.complete = function() {
        t.isFunction(r.old) && r.old.call(this), r.queue && t.dequeue(this, r.queue)
      }, r
    }, t.fn.extend({
      fadeTo: function(e, t, n, i) {
        return this.filter(x).css('opacity', 0).show().end().animate({
          opacity: t
        }, e, n, i)
      },
      animate: function(e, n, r, o) {
        var u = t.isEmptyObject(e),
          s = t.speed(n, r, o),
          a = function() {
            var n = ce(this, t.extend({}, e), s);
            (u || i.get(this, 'finish')) && n.stop(!0)
          };
        return a.finish = a, u || s.queue === !1 ? this.each(a) : this.queue(s.queue, a)
      },
      stop: function(e, n, r) {
        var o = function(e) {
          var t = e.stop;
          delete e.stop, t(r)
        };
        return 'string' != typeof e && (r = n, n = e, e = void 0), n && e !== !1 && this.queue(e || 'fx', []), this.each(function() {
          var u = !0,
            n = null != e && e + 'queueHooks',
            s = t.timers,
            a = i.get(this);
          if (n) a[n] && a[n].stop && o(a[n]);
          else
            for (n in a) a[n] && a[n].stop && ht.test(n) && o(a[n]);
          for (n = s.length; n--;) s[n].elem !== this || null != e && s[n].queue !== e || (s[n].anim.stop(r), u = !1, s.splice(n, 1));
          (u || !r) && t.dequeue(this, e)
        })
      },
      finish: function(e) {
        return e !== !1 && (e = e || 'fx'), this.each(function() {
          var n, a = i.get(this),
            o = a[e + 'queue'],
            s = a[e + 'queueHooks'],
            r = t.timers,
            u = o ? o.length : 0;
          for (a.finish = !0, t.queue(this, e, []), s && s.stop && s.stop.call(this, !0), n = r.length; n--;) r[n].elem === this && r[n].queue === e && (r[n].anim.stop(!0), r.splice(n, 1));
          for (n = 0; u > n; n++) o[n] && o[n].finish && o[n].finish.call(this);
          delete a.finish
        })
      }
    }), t.each(['toggle', 'show', 'hide'], function(e, n) {
      var i = t.fn[n];
      t.fn[n] = function(e, t, r) {
        return null == e || 'boolean' == typeof e ? i.apply(this, arguments) : this.animate(P(n, !0), e, t, r)
      }
    }), t.each({
      slideDown: P('show'),
      slideUp: P('hide'),
      slideToggle: P('toggle'),
      fadeIn: {
        opacity: 'show'
      },
      fadeOut: {
        opacity: 'hide'
      },
      fadeToggle: {
        opacity: 'toggle'
      }
    }, function(e, n) {
      t.fn[e] = function(e, t, i) {
        return this.animate(n, e, t, i)
      }
    }), t.timers = [], t.fx.tick = function() {
      var i, n = 0,
        e = t.timers;
      for (m = t.now(); n < e.length; n++) i = e[n], i() || e[n] !== i || e.splice(n--, 1);
      e.length || t.fx.stop(), m = void 0
    }, t.fx.timer = function(e) {
      t.timers.push(e), e() ? t.fx.start() : t.timers.pop()
    }, t.fx.interval = 13, t.fx.start = function() {
      I || (I = setInterval(t.fx.tick, t.fx.interval))
    }, t.fx.stop = function() {
      clearInterval(I), I = null
    }, t.fx.speeds = {
      slow: 600,
      fast: 200,
      e$: 400
    }, t.fn.delay = function(e, n) {
      return e = t.fx ? t.fx.speeds[e] || e : e, n = n || 'fx', this.queue(n, function(t, n) {
        var i = setTimeout(t, e);
        n.stop = function() {
          clearTimeout(i)
        }
      })
    },
    function() {
      var e = r.createElement('input'),
        n = r.createElement('select'),
        t = n.appendChild(r.createElement('option'));
      e.type = 'checkbox', o.checkOn = '' !== e.value, o.optSelected = t.selected, n.disabled = !0, o.optDisabled = !t.disabled, e = r.createElement('input'), e.value = 't', e.type = 'radio', o.radioValue = 't' === e.value
    }();
  var jt, Fe, k = t.expr.attrHandle;
  t.fn.extend({
    attr: function(e, n) {
      return d(this, t.attr, e, n, arguments.length > 1)
    },
    removeAttr: function(e) {
      return this.each(function() {
        t.removeAttr(this, e)
      })
    }
  }), t.extend({
    attr: function(e, n, i) {
      var r, o, a = e.nodeType;
      if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === C ? t.prop(e, n, i) : (1 === a && t.isXMLDoc(e) || (n = n.toLowerCase(), r = t.attrHooks[n] || (t.expr.match.bool.test(n) ? Fe : jt)), void 0 === i ? r && 'get' in r && null !== (o = r.get(e, n)) ? o : (o = t.find.attr(e, n), null == o ? void 0 : o) : null !== i ? r && 'set' in r && void 0 !== (o = r.set(e, i, n)) ? o : (e.setAttribute(n, i + ''), i) : void t.removeAttr(e, n))
    },
    removeAttr: function(e, n) {
      var i, r, a = 0,
        o = n && n.match(l);
      if (o && 1 === e.nodeType)
        while (i = o[a++]) r = t.propFix[i] || i, t.expr.match.bool.test(i) && (e[r] = !1), e.removeAttribute(i)
    },
    attrHooks: {
      type: {
        set: function(e, n) {
          if (!o.radioValue && 'radio' === n && t.nodeName(e, 'input')) {
            var i = e.value;
            return e.setAttribute('type', n), i && (e.value = i), n
          }
        }
      }
    }
  }), Fe = {
    set: function(e, n, i) {
      return n === !1 ? t.removeAttr(e, i) : e.setAttribute(i, i), i
    }
  }, t.each(t.expr.match.bool.source.match(/\w+/g), function(e, n) {
    var i = k[n] || t.find.attr;
    k[n] = function(e, t, n) {
      var r, o;
      return n || (o = k[t], k[t] = r, r = null != i(e, t, n) ? t.toLowerCase() : null, k[t] = o), r
    }
  });
  var Ft = /^(?:input|select|textarea|button)$/i;
  t.fn.extend({
    prop: function(e, n) {
      return d(this, t.prop, e, n, arguments.length > 1)
    },
    removeProp: function(e) {
      return this.each(function() {
        delete this[t.propFix[e] || e]
      })
    }
  }), t.extend({
    propFix: {
      'for': 'htmlFor',
      'class': 'className'
    },
    prop: function(e, n, i) {
      var a, r, s, o = e.nodeType;
      if (e && 3 !== o && 8 !== o && 2 !== o) return s = 1 !== o || !t.isXMLDoc(e), s && (n = t.propFix[n] || n, r = t.propHooks[n]), void 0 !== i ? r && 'set' in r && void 0 !== (a = r.set(e, i, n)) ? a : e[n] = i : r && 'get' in r && null !== (a = r.get(e, n)) ? a : e[n]
    },
    propHooks: {
      tabIndex: {
        get: function(e) {
          return e.hasAttribute('tabindex') || Ft.test(e.nodeName) || e.href ? e.tabIndex : -1
        }
      }
    }
  }), o.optSelected || (t.propHooks.selected = {
    get: function(e) {
      var t = e.parentNode;
      return t && t.parentNode && t.parentNode.selectedIndex, null
    }
  }), t.each(['tabIndex', 'readOnly', 'maxLength', 'cellSpacing', 'cellPadding', 'rowSpan', 'colSpan', 'useMap', 'frameBorder', 'contentEditable'], function() {
    t.propFix[this.toLowerCase()] = this
  });
  var J = /[\t\r\n\f]/g;
  t.fn.extend({
    addClass: function(e) {
      var s, n, i, a, u, o, d = 'string' == typeof e && e,
        r = 0,
        c = this.length;
      if (t.isFunction(e)) return this.each(function(n) {
        t(this).addClass(e.call(this, n, this.className))
      });
      if (d)
        for (s = (e || '').match(l) || []; c > r; r++)
          if (n = this[r], i = 1 === n.nodeType && (n.className ? (' ' + n.className + ' ').replace(J, ' ') : ' ')) {
            u = 0;
            while (a = s[u++]) i.indexOf(' ' + a + ' ') < 0 && (i += a + ' ');
            o = t.trim(i), n.className !== o && (n.className = o)
          };
      return this
    },
    removeClass: function(e) {
      var s, n, i, a, u, o, d = 0 === arguments.length || 'string' == typeof e && e,
        r = 0,
        c = this.length;
      if (t.isFunction(e)) return this.each(function(n) {
        t(this).removeClass(e.call(this, n, this.className))
      });
      if (d)
        for (s = (e || '').match(l) || []; c > r; r++)
          if (n = this[r], i = 1 === n.nodeType && (n.className ? (' ' + n.className + ' ').replace(J, ' ') : '')) {
            u = 0;
            while (a = s[u++])
              while (i.indexOf(' ' + a + ' ') >= 0) i = i.replace(' ' + a + ' ', ' ');
            o = e ? t.trim(i) : '', n.className !== o && (n.className = o)
          };
      return this
    },
    toggleClass: function(e, n) {
      var r = typeof e;
      return 'boolean' == typeof n && 'string' === r ? n ? this.addClass(e) : this.removeClass(e) : this.each(t.isFunction(e) ? function(i) {
        t(this).toggleClass(e.call(this, i, this.className, n), n)
      } : function() {
        if ('string' === r) {
          var n, s = 0,
            o = t(this),
            a = e.match(l) || [];
          while (n = a[s++]) o.hasClass(n) ? o.removeClass(n) : o.addClass(n)
        } else(r === C || 'boolean' === r) && (this.className && i.set(this, '__className__', this.className), this.className = this.className || e === !1 ? '' : i.get(this, '__className__') || '')
      })
    },
    hasClass: function(e) {
      for (var i = ' ' + e + ' ', t = 0, n = this.length; n > t; t++)
        if (1 === this[t].nodeType && (' ' + this[t].className + ' ').replace(J, ' ').indexOf(i) >= 0) return !0;
      return !1
    }
  });
  var Je = /\r/g;
  t.fn.extend({
    val: function(e) {
      var n, i, o, r = this[0]; {
        if (arguments.length) return o = t.isFunction(e), this.each(function(i) {
          var r;
          1 === this.nodeType && (r = o ? e.call(this, i, t(this).val()) : e, null == r ? r = '' : 'number' == typeof r ? r += '' : t.isArray(r) && (r = t.map(r, function(e) {
            return null == e ? '' : e + ''
          })), n = t.valHooks[this.type] || t.valHooks[this.nodeName.toLowerCase()], n && 'set' in n && void 0 !== n.set(this, r, 'value') || (this.value = r))
        });
        if (r) return n = t.valHooks[r.type] || t.valHooks[r.nodeName.toLowerCase()], n && 'get' in n && void 0 !== (i = n.get(r, 'value')) ? i : (i = r.value, 'string' == typeof i ? i.replace(Je, '') : null == i ? '' : i)
      }
    }
  }), t.extend({
    valHooks: {
      option: {
        get: function(e) {
          var n = t.find.attr(e, 'value');
          return null != n ? n : t.trim(t.text(e))
        }
      },
      select: {
        get: function(e) {
          for (var s, n, l = e.options, i = e.selectedIndex, a = 'select-one' === e.type || 0 > i, c = a ? null : [], u = a ? i + 1 : l.length, r = 0 > i ? u : a ? i : 0; u > r; r++)
            if (n = l[r], !(!n.selected && r !== i || (o.optDisabled ? n.disabled : null !== n.getAttribute('disabled')) || n.parentNode.disabled && t.nodeName(n.parentNode, 'optgroup'))) {
              if (s = t(n).val(), a) return s;
              c.push(s)
            };
          return c
        },
        set: function(e, n) {
          var s, i, a = e.options,
            o = t.makeArray(n),
            r = a.length;
          while (r--) i = a[r], (i.selected = t.inArray(i.value, o) >= 0) && (s = !0);
          return s || (e.selectedIndex = -1), o
        }
      }
    }
  }), t.each(['radio', 'checkbox'], function() {
    t.valHooks[this] = {
      set: function(e, n) {
        return t.isArray(n) ? e.checked = t.inArray(t(e).val(), n) >= 0 : void 0
      }
    }, o.checkOn || (t.valHooks[this].get = function(e) {
      return null === e.getAttribute('value') ? 'on' : e.value
    })
  }), t.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function(e, n) {
    t.fn[n] = function(e, t) {
      return arguments.length > 0 ? this.on(n, null, e, t) : this.trigger(n)
    }
  }), t.fn.extend({
    hover: function(e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    },
    bind: function(e, t, n) {
      return this.on(e, null, t, n)
    },
    unbind: function(e, t) {
      return this.off(e, null, t)
    },
    delegate: function(e, t, n, i) {
      return this.on(t, e, n, i)
    },
    undelegate: function(e, t, n) {
      return 1 === arguments.length ? this.off(e, '**') : this.off(t, e || '**', n)
    }
  });
  var ee = t.now(),
    K = /\?/;
  t.parseJSON = function(e) {
    return JSON.parse(e + '')
  }, t.parseXML = function(e) {
    var i, r;
    if (!e || 'string' != typeof e) return null;
    try {
      r = new DOMParser, i = r.parseFromString(e, 'text/xml')
    } catch (n) {
      i = void 0
    };
    return (!i || i.getElementsByTagName('parsererror').length) && t.error('Invalid XML: ' + e), i
  };
  var nt = /#.*$/,
    je = /([?&])_=[^&]*/,
    tt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
    Xe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Ye = /^(?:GET|HEAD)$/,
    Qe = /^\/\//,
    Pe = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Oe = {},
    R = {},
    Le = '*/'.concat('*'),
    te = e.location.href,
    g = Pe.exec(te.toLowerCase()) || [];

  function oe(e) {
    return function(n, i) {
      'string' != typeof n && (i = n, n = '*');
      var r, a = 0,
        o = n.toLowerCase().match(l) || [];
      if (t.isFunction(i))
        while (r = o[a++]) '+' === r[0] ? (r = r.slice(1) || '*', (e[r] = e[r] || []).unshift(i)) : (e[r] = e[r] || []).push(i)
    }
  };

  function se(e, n, i, r) {
    var o = {},
      s = e === R;

    function a(u) {
      var c;
      return o[u] = !0, t.each(e[u] || [], function(e, t) {
        var u = t(n, i, r);
        return 'string' != typeof u || s || o[u] ? s ? !(c = u) : void 0 : (n.dataTypes.unshift(u), a(u), !1)
      }), c
    };
    return a(n.dataTypes[0]) || !o['*'] && a('*')
  };

  function Z(e, n) {
    var i, r, o = t.ajaxSettings.flatOptions || {};
    for (i in n) void 0 !== n[i] && ((o[i] ? e : r || (r = {}))[i] = n[i]);
    return r && t.extend(!0, e, r), e
  };

  function ft(e, t, n) {
    var a, o, r, u, s = e.contents,
      i = e.dataTypes;
    while ('*' === i[0]) i.shift(), void 0 === a && (a = e.mimeType || t.getResponseHeader('Content-Type'));
    if (a)
      for (o in s)
        if (s[o] && s[o].test(a)) {
          i.unshift(o);
          break
        };
    if (i[0] in n) r = i[0];
    else {
      for (o in n) {
        if (!i[0] || e.converters[o + ' ' + i[0]]) {
          r = o;
          break
        };
        u || (u = o)
      };
      r = r || u
    };
    return r ? (r !== i[0] && i.unshift(r), n[r]) : void 0
  };

  function et(e, t, n, i) {
    var l, o, a, c, u, s = {},
      d = e.dataTypes.slice();
    if (d[1])
      for (a in e.converters) s[a.toLowerCase()] = e.converters[a];
    o = d.shift();
    while (o)
      if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = d.shift())
        if ('*' === o) o = u;
        else if ('*' !== u && u !== o) {
      if (a = s[u + ' ' + o] || s['* ' + o], !a)
        for (l in s)
          if (c = l.split(' '), c[1] === o && (a = s[u + ' ' + c[0]] || s['* ' + c[0]])) {
            a === !0 ? a = s[l] : s[l] !== !0 && (o = c[0], d.unshift(c[1]));
            break
          };
      if (a !== !0)
        if (a && e['throws']) t = a(t);
        else try {
          t = a(t)
        } catch (r) {
          return {
            state: 'parsererror',
            error: a ? r : 'No conversion from ' + u + ' to ' + o
          }
        }
    };
    return {
      state: 'success',
      data: t
    }
  };
  t.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: te,
      type: 'GET',
      isLocal: Xe.test(g[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': Le,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON'
      },
      converters: {
        '* text': String,
        'text html': !0,
        'text json': t.parseJSON,
        'text xml': t.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(e, n) {
      return n ? Z(Z(e, t.ajaxSettings), n) : Z(t.ajaxSettings, e)
    },
    ajaxPrefilter: oe(Oe),
    ajaxTransport: oe(R),
    ajax: function(e, n) {
      'object' == typeof e && (n = e, e = void 0), n = n || {};
      var h, a, x, p, w, d, f, c, i = t.ajaxSetup({}, n),
        u = i.context || i,
        y = i.context && (u.nodeType || u.jquery) ? t(u) : t.event,
        b = t.Deferred(),
        T = t.Callbacks('once memory'),
        v = i.statusCode || {},
        C = {},
        k = {},
        s = 0,
        E = 'canceled',
        r = {
          readyState: 0,
          getResponseHeader: function(e) {
            var t;
            if (2 === s) {
              if (!p) {
                p = {};
                while (t = tt.exec(x)) p[t[1].toLowerCase()] = t[2]
              };
              t = p[e.toLowerCase()]
            };
            return null == t ? null : t
          },
          getAllResponseHeaders: function() {
            return 2 === s ? x : null
          },
          setRequestHeader: function(e, t) {
            var n = e.toLowerCase();
            return s || (e = k[n] = k[n] || e, C[e] = t), this
          },
          overrideMimeType: function(e) {
            return s || (i.mimeType = e), this
          },
          statusCode: function(e) {
            var t;
            if (e)
              if (2 > s)
                for (t in e) v[t] = [v[t], e[t]];
              else r.always(e[r.status]);
            return this
          },
          abort: function(e) {
            var t = e || E;
            return h && h.abort(t), m(0, t), this
          }
        };
      if (b.promise(r).complete = T.add, r.success = r.done, r.error = r.fail, i.url = ((e || i.url || te) + '').replace(nt, '').replace(Qe, g[1] + '//'), i.type = n.method || n.type || i.method || i.type, i.dataTypes = t.trim(i.dataType || '*').toLowerCase().match(l) || [''], null == i.crossDomain && (d = Pe.exec(i.url.toLowerCase()), i.crossDomain = !(!d || d[1] === g[1] && d[2] === g[2] && (d[3] || ('http:' === d[1] ? '80' : '443')) === (g[3] || ('http:' === g[1] ? '80' : '443')))), i.data && i.processData && 'string' != typeof i.data && (i.data = t.param(i.data, i.traditional)), se(Oe, i, n, r), 2 === s) return r;
      f = t.event && i.global, f && 0 === t.active++ && t.event.trigger('ajaxStart'), i.type = i.type.toUpperCase(), i.hasContent = !Ye.test(i.type), a = i.url, i.hasContent || (i.data && (a = i.url += (K.test(a) ? '&' : '?') + i.data, delete i.data), i.cache === !1 && (i.url = je.test(a) ? a.replace(je, '$1_=' + ee++) : a + (K.test(a) ? '&' : '?') + '_=' + ee++)), i.ifModified && (t.lastModified[a] && r.setRequestHeader('If-Modified-Since', t.lastModified[a]), t.etag[a] && r.setRequestHeader('If-None-Match', t.etag[a])), (i.data && i.hasContent && i.contentType !== !1 || n.contentType) && r.setRequestHeader('Content-Type', i.contentType), r.setRequestHeader('Accept', i.dataTypes[0] && i.accepts[i.dataTypes[0]] ? i.accepts[i.dataTypes[0]] + ('*' !== i.dataTypes[0] ? ', ' + Le + '; q=0.01' : '') : i.accepts['*']);
      for (c in i.headers) r.setRequestHeader(c, i.headers[c]);
      if (i.beforeSend && (i.beforeSend.call(u, r, i) === !1 || 2 === s)) return r.abort();
      E = 'abort';
      for (c in {
          success: 1,
          error: 1,
          complete: 1
        }) r[c](i[c]);
      if (h = se(R, i, n, r)) {
        r.readyState = 1, f && y.trigger('ajaxSend', [r, i]), i.async && i.timeout > 0 && (w = setTimeout(function() {
          r.abort('timeout')
        }, i.timeout));
        try {
          s = 1, h.send(C, m)
        } catch (o) {
          if (!(2 > s)) throw o;
          m(-1, o)
        }
      } else m(-1, 'No Transport');

      function m(e, n, o, c) {
        var d, C, g, m, p, l = n;
        2 !== s && (s = 2, w && clearTimeout(w), h = void 0, x = c || '', r.readyState = e > 0 ? 4 : 0, d = e >= 200 && 300 > e || 304 === e, o && (m = ft(i, r, o)), m = et(i, m, r, d), d ? (i.ifModified && (p = r.getResponseHeader('Last-Modified'), p && (t.lastModified[a] = p), p = r.getResponseHeader('etag'), p && (t.etag[a] = p)), 204 === e || 'HEAD' === i.type ? l = 'nocontent' : 304 === e ? l = 'notmodified' : (l = m.state, C = m.data, g = m.error, d = !g)) : (g = l, (e || !l) && (l = 'error', 0 > e && (e = 0))), r.status = e, r.statusText = (n || l) + '', d ? b.resolveWith(u, [C, l, r]) : b.rejectWith(u, [r, l, g]), r.statusCode(v), v = void 0, f && y.trigger(d ? 'ajaxSuccess' : 'ajaxError', [r, i, d ? C : g]), T.fireWith(u, [r, l]), f && (y.trigger('ajaxComplete', [r, i]), --t.active || t.event.trigger('ajaxStop')))
      };
      return r
    },
    getJSON: function(e, n, i) {
      return t.get(e, n, i, 'json')
    },
    getScript: function(e, n) {
      return t.get(e, void 0, n, 'script')
    }
  }), t.each(['get', 'post'], function(e, n) {
    t[n] = function(e, i, r, o) {
      return t.isFunction(i) && (o = o || r, r = i, i = void 0), t.ajax({
        url: e,
        type: n,
        dataType: o,
        data: i,
        success: r
      })
    }
  }), t.n$ = function(e) {
    return t.ajax({
      url: e,
      type: 'GET',
      dataType: 'script',
      async: !1,
      global: !1,
      'throws': !0
    })
  }, t.fn.extend({
    wrapAll: function(e) {
      var n;
      return t.isFunction(e) ? this.each(function(n) {
        t(this).wrapAll(e.call(this, n))
      }) : (this[0] && (n = t(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && n.insertBefore(this[0]), n.map(function() {
        var e = this;
        while (e.firstElementChild) e = e.firstElementChild;
        return e
      }).append(this)), this)
    },
    wrapInner: function(e) {
      return this.each(t.isFunction(e) ? function(n) {
        t(this).wrapInner(e.call(this, n))
      } : function() {
        var i = t(this),
          n = i.contents();
        n.length ? n.wrapAll(e) : i.append(e)
      })
    },
    wrap: function(e) {
      var n = t.isFunction(e);
      return this.each(function(i) {
        t(this).wrapAll(n ? e.call(this, i) : e)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        t.nodeName(this, 'body') || t(this).replaceWith(this.childNodes)
      }).end()
    }
  }), t.expr.filters.hidden = function(e) {
    return e.offsetWidth <= 0 && e.offsetHeight <= 0
  }, t.expr.filters.visible = function(e) {
    return !t.expr.filters.hidden(e)
  };
  var at = /%20/g,
    ot = /\[\]$/,
    qe = /\r?\n/g,
    dt = /^(?:submit|button|image|reset|file)$/i,
    lt = /^(?:input|select|textarea|keygen)/i;

  function V(e, n, i, r) {
    var o;
    if (t.isArray(n)) t.each(n, function(t, n) {
      i || ot.test(e) ? r(e, n) : V(e + '[' + ('object' == typeof n ? t : '') + ']', n, i, r)
    });
    else if (i || 'object' !== t.type(n)) r(e, n);
    else
      for (o in n) V(e + '[' + o + ']', n[o], i, r)
  };
  t.param = function(e, n) {
    var r, i = [],
      o = function(e, n) {
        n = t.isFunction(n) ? n() : null == n ? '' : n, i[i.length] = encodeURIComponent(e) + '=' + encodeURIComponent(n)
      };
    if (void 0 === n && (n = t.ajaxSettings && t.ajaxSettings.traditional), t.isArray(e) || e.jquery && !t.isPlainObject(e)) t.each(e, function() {
      o(this.name, this.value)
    });
    else
      for (r in e) V(r, e[r], n, o);
    return i.join('&').replace(at, '+')
  }, t.fn.extend({
    serialize: function() {
      return t.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var e = t.prop(this, 'elements');
        return e ? t.makeArray(e) : this
      }).filter(function() {
        var e = this.type;
        return this.name && !t(this).is(':disabled') && lt.test(this.nodeName) && !dt.test(e) && (this.checked || !Ee.test(e))
      }).map(function(e, n) {
        var i = t(this).val();
        return null == i ? null : t.isArray(i) ? t.map(i, function(e) {
          return {
            name: n.name,
            value: e.replace(qe, '\r\n')
          }
        }) : {
          name: n.name,
          value: i.replace(qe, '\r\n')
        }
      }).get()
    }
  }), t.ajaxSettings.xhr = function() {
    try {
      return new XMLHttpRequest
    } catch (e) {}
  };
  var ut = 0,
    B = {},
    ct = {
      0: 200,
      1223: 204
    },
    E = t.ajaxSettings.xhr();
  e.attachEvent && e.attachEvent('onunload', function() {
    for (var e in B) B[e]()
  }), o.cors = !!E && 'withCredentials' in E, o.ajax = E = !!E, t.ajaxTransport(function(e) {
    var t;
    return o.cors || E && !e.crossDomain ? {
      send: function(n, i) {
        var a, r = e.xhr(),
          s = ++ut;
        if (r.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
          for (a in e.xhrFields) r[a] = e.xhrFields[a];
        e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType), e.crossDomain || n['X-Requested-With'] || (n['X-Requested-With'] = 'XMLHttpRequest');
        for (a in n) r.setRequestHeader(a, n[a]);
        t = function(e) {
          return function() {
            t && (delete B[s], t = r.onload = r.onerror = null, 'abort' === e ? r.abort() : 'error' === e ? i(r.status, r.statusText) : i(ct[r.status] || r.status, r.statusText, 'string' == typeof r.responseText ? {
              text: r.responseText
            } : void 0, r.getAllResponseHeaders()))
          }
        }, r.onload = t(), r.onerror = t('error'), t = B[s] = t('abort');
        try {
          r.send(e.hasContent && e.data || null)
        } catch (o) {
          if (t) throw o
        }
      },
      abort: function() {
        t && t()
      }
    } : void 0
  }), t.ajaxSetup({
    accepts: {
      script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      'text script': function(e) {
        return t.globalEval(e), e
      }
    }
  }), t.ajaxPrefilter('script', function(e) {
    void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = 'GET')
  }), t.ajaxTransport('script', function(e) {
    if (e.crossDomain) {
      var i, n;
      return {
        send: function(o, a) {
          i = t('<script>').prop({
            async: !0,
            charset: e.scriptCharset,
            src: e.url
          }).on('load error', n = function(e) {
            i.remove(), n = null, e && a('error' === e.type ? 404 : 200, e.type)
          }), r.head.appendChild(i[0])
        },
        abort: function() {
          n && n()
        }
      }
    }
  });
  var We = [],
    z = /(=)\?(?=&|$)|\?\?/;
  t.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function() {
      var e = We.pop() || t.expando + '_' + ee++;
      return this[e] = !0, e
    }
  }), t.ajaxPrefilter('json jsonp', function(n, i, r) {
    var o, s, a, u = n.jsonp !== !1 && (z.test(n.url) ? 'url' : 'string' == typeof n.data && !(n.contentType || '').indexOf('application/x-www-form-urlencoded') && z.test(n.data) && 'data');
    return u || 'jsonp' === n.dataTypes[0] ? (o = n.jsonpCallback = t.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(z, '$1' + o) : n.jsonp !== !1 && (n.url += (K.test(n.url) ? '&' : '?') + n.jsonp + '=' + o), n.converters['script json'] = function() {
      return a || t.error(o + ' was not called'), a[0]
    }, n.dataTypes[0] = 'json', s = e[o], e[o] = function() {
      a = arguments
    }, r.always(function() {
      e[o] = s, n[o] && (n.jsonpCallback = i.jsonpCallback, We.push(o)), a && t.isFunction(s) && s(a[0]), a = s = void 0
    }), 'script') : void 0
  }), t.parseHTML = function(e, n, i) {
    if (!e || 'string' != typeof e) return null;
    'boolean' == typeof n && (i = n, n = !1), n = n || r;
    var a = ne.exec(e),
      o = !i && [];
    return a ? [n.createElement(a[1])] : (a = t.buildFragment([e], n, o), o && o.length && t(o).remove(), t.merge([], a.childNodes))
  };
  var Ge = t.fn.load;
  t.fn.load = function(e, n, i) {
    if ('string' != typeof e && Ge) return Ge.apply(this, arguments);
    var a, s, u, o = this,
      r = e.indexOf(' ');
    return r >= 0 && (a = t.trim(e.slice(r)), e = e.slice(0, r)), t.isFunction(n) ? (i = n, n = void 0) : n && 'object' == typeof n && (s = 'POST'), o.length > 0 && t.ajax({
      url: e,
      type: s,
      dataType: 'html',
      data: n
    }).done(function(e) {
      u = arguments, o.html(a ? t('<div>').append(t.parseHTML(e)).find(a) : e)
    }).complete(i && function(e, t) {
      o.each(i, u || [e.responseText, t, e])
    }), this
  }, t.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function(e, n) {
    t.fn[n] = function(e) {
      return this.on(n, e)
    }
  }), t.expr.filters.animated = function(e) {
    return t.grep(t.timers, function(t) {
      return e === t.elem
    }).length
  };
  var He = e.document.documentElement;

  function ae(e) {
    return t.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
  };
  t.offset = {
    setOffset: function(e, n, i) {
      var l, d, f, c, r, a, h, u = t.css(e, 'position'),
        s = t(e),
        o = {};
      'static' === u && (e.style.position = 'relative'), r = s.offset(), f = t.css(e, 'top'), a = t.css(e, 'left'), h = ('absolute' === u || 'fixed' === u) && (f + a).indexOf('auto') > -1, h ? (l = s.position(), c = l.top, d = l.left) : (c = parseFloat(f) || 0, d = parseFloat(a) || 0), t.isFunction(n) && (n = n.call(e, i, r)), null != n.top && (o.top = n.top - r.top + c), null != n.left && (o.left = n.left - r.left + d), 'using' in n ? n.using.call(e, o) : s.css(o)
    }
  }, t.fn.extend({
    offset: function(e) {
      if (arguments.length) return void 0 === e ? this : this.each(function(n) {
        t.offset.setOffset(this, e, n)
      });
      var i, a, n = this[0],
        r = {
          top: 0,
          left: 0
        },
        o = n && n.ownerDocument;
      if (o) return i = o.documentElement, t.contains(i, n) ? (typeof n.getBoundingClientRect !== C && (r = n.getBoundingClientRect()), a = ae(o), {
        top: r.top + a.pageYOffset - i.clientTop,
        left: r.left + a.pageXOffset - i.clientLeft
      }) : r
    },
    position: function() {
      if (this[0]) {
        var e, i, r = this[0],
          n = {
            top: 0,
            left: 0
          };
        return 'fixed' === t.css(r, 'position') ? i = r.getBoundingClientRect() : (e = this.offsetParent(), i = this.offset(), t.nodeName(e[0], 'html') || (n = e.offset()), n.top += t.css(e[0], 'borderTopWidth', !0), n.left += t.css(e[0], 'borderLeftWidth', !0)), {
          top: i.top - n.top - t.css(r, 'marginTop', !0),
          left: i.left - n.left - t.css(r, 'marginLeft', !0)
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        var e = this.offsetParent || He;
        while (e && !t.nodeName(e, 'html') && 'static' === t.css(e, 'position')) e = e.offsetParent;
        return e || He
      })
    }
  }), t.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function(n, i) {
    var r = 'pageYOffset' === i;
    t.fn[n] = function(t) {
      return d(this, function(t, n, o) {
        var a = ae(t);
        return void 0 === o ? a ? a[i] : t[n] : void(a ? a.scrollTo(r ? e.pageXOffset : o, r ? o : e.pageYOffset) : t[n] = o)
      }, n, t, arguments.length, null)
    }
  }), t.each(['top', 'left'], function(e, n) {
    t.cssHooks[n] = ye(o.pixelPosition, function(e, i) {
      return i ? (i = T(e, n), W.test(i) ? t(e).position()[n] + 'px' : i) : void 0
    })
  }), t.each({
    Height: 'height',
    Width: 'width'
  }, function(e, n) {
    t.each({
      padding: 'inner' + e,
      content: n,
      '': 'outer' + e
    }, function(i, r) {
      t.fn[r] = function(r, o) {
        var s = arguments.length && (i || 'boolean' != typeof r),
          a = i || (r === !0 || o === !0 ? 'margin' : 'border');
        return d(this, function(n, i, r) {
          var o;
          return t.isWindow(n) ? n.document.documentElement['client' + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body['scroll' + e], o['scroll' + e], n.body['offset' + e], o['offset' + e], o['client' + e])) : void 0 === r ? t.css(n, i, a) : t.style(n, i, r, a)
        }, n, s ? r : void 0, s, null)
      }
    })
  }), t.fn.size = function() {
    return this.length
  }, t.fn.andSelf = t.fn.addBack, 'function' == typeof define && define.amd && define('jquery', [], function() {
    return t
  });
  var Ze = e.jQuery,
    Ke = e.$;
  return t.noConflict = function(n) {
    return e.$ === t && (e.$ = Ke), n && e.jQuery === t && (e.jQuery = Ze), t
  }, typeof n === C && (e.jQuery = e.$ = t), t
});

function FastClick(e, t) {
  'use strict';

  function a(e, t) {
    return function() {
      return e.apply(t, arguments)
    }
  };
  var o;
  t = t || {};
  this.trackingClick = !1;
  this.trackingClickStart = 0;
  this.targetElement = null;
  this.touchStartX = 0;
  this.touchStartY = 0;
  this.lastTouchIdentifier = 0;
  this.touchBoundary = t.touchBoundary || 10;
  this.layer = e;
  this.tapDelay = t.tapDelay || 200;
  if (FastClick.notNeeded(e)) {
    return
  };
  var i = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'],
    r = this;
  for (var n = 0, s = i.length; n < s; n++) {
    r[i[n]] = a(r[i[n]], r)
  };
  if (deviceIsAndroid) {
    e.addEventListener('mouseover', this.onMouse, !0);
    e.addEventListener('mousedown', this.onMouse, !0);
    e.addEventListener('mouseup', this.onMouse, !0)
  };
  e.addEventListener('click', this.onClick, !0);
  e.addEventListener('touchstart', this.onTouchStart, !1);
  e.addEventListener('touchmove', this.onTouchMove, !1);
  e.addEventListener('touchend', this.onTouchEnd, !1);
  e.addEventListener('touchcancel', this.onTouchCancel, !1);
  if (!Event.prototype.stopImmediatePropagation) {
    e.removeEventListener = function(t, n, i) {
      var r = Node.prototype.removeEventListener;
      if (t === 'click') {
        r.call(e, t, n.hijacked || n, i)
      } else {
        r.call(e, t, n, i)
      }
    };
    e.addEventListener = function(t, n, i) {
      var r = Node.prototype.addEventListener;
      if (t === 'click') {
        r.call(e, t, n.hijacked || (n.hijacked = function(e) {
          if (!e.propagationStopped) {
            n(e)
          }
        }), i)
      } else {
        r.call(e, t, n, i)
      }
    }
  };
  if (typeof e.onclick === 'function') {
    o = e.onclick;
    e.addEventListener('click', function(e) {
      o(e)
    }, !1);
    e.onclick = null
  }
};
var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0,
  deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent),
  deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent),
  deviceIsIOSWithBadTarget = deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
FastClick.prototype.needsClick = function(e) {
  'use strict';
  switch (e.nodeName.toLowerCase()) {
    case 'button':
    case 'select':
    case 'textarea':
      if (e.disabled) {
        return !0
      };
      break;
    case 'input':
      if (deviceIsIOS && e.type === 'file' || e.disabled) {
        return !0
      };
      break;
    case 'label':
    case 'video':
      return !0
  };
  return /\bneedsclick\b/.test(e.className)
};
FastClick.prototype.needsFocus = function(e) {
  'use strict';
  switch (e.nodeName.toLowerCase()) {
    case 'textarea':
      return !0;
    case 'select':
      return !deviceIsAndroid;
    case 'input':
      switch (e.type) {
        case 'button':
        case 'checkbox':
        case 'file':
        case 'image':
        case 'radio':
        case 'submit':
          return !1
      };
      return !e.disabled && !e.readOnly;
    default:
      return /\bneedsfocus\b/.test(e.className)
  }
};
FastClick.prototype.sendClick = function(e, t) {
  'use strict';
  var i, n;
  if (document.activeElement && document.activeElement !== e) {
    document.activeElement.blur()
  };
  n = t.changedTouches[0];
  i = document.createEvent('MouseEvents');
  i.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null);
  i.forwardedTouchEvent = !0;
  e.dispatchEvent(i)
};
FastClick.prototype.determineEventType = function(e) {
  'use strict';
  if (deviceIsAndroid && e.tagName.toLowerCase() === 'select') {
    return 'mousedown'
  };
  return 'click'
};
FastClick.prototype.focus = function(e) {
  'use strict';
  var t;
  if (deviceIsIOS && e.setSelectionRange && e.type.indexOf('date') !== 0 && e.type !== 'time') {
    t = e.value.length;
    e.setSelectionRange(t, t)
  } else {
    e.focus()
  }
};
FastClick.prototype.updateScrollParent = function(e) {
  'use strict';
  var n, t;
  n = e.fastClickScrollParent;
  if (!n || !n.contains(e)) {
    t = e;
    do {
      if (t.scrollHeight > t.offsetHeight) {
        n = t;
        e.fastClickScrollParent = t;
        break
      };
      t = t.parentElement
    }
    while (t)
  };
  if (n) {
    n.fastClickLastScrollTop = n.scrollTop
  }
};
FastClick.prototype.getTargetElementFromEventTarget = function(e) {
  'use strict';
  if (e.nodeType === Node.TEXT_NODE) {
    return e.parentNode
  };
  return e
};
FastClick.prototype.onTouchStart = function(e) {
  'use strict';
  var i, t, n;
  if (e.targetTouches.length > 1) {
    return !0
  };
  i = this.getTargetElementFromEventTarget(e.target);
  t = e.targetTouches[0];
  if (deviceIsIOS) {
    n = window.getSelection();
    if (n.rangeCount && !n.isCollapsed) {
      return !0
    };
    if (!deviceIsIOS4) {
      if (t.identifier === this.lastTouchIdentifier) {
        e.preventDefault();
        return !1
      };
      this.lastTouchIdentifier = t.identifier;
      this.updateScrollParent(i)
    }
  };
  this.trackingClick = !0;
  this.trackingClickStart = e.timeStamp;
  this.targetElement = i;
  this.touchStartX = t.pageX;
  this.touchStartY = t.pageY;
  if (e.timeStamp - this.lastClickTime < this.tapDelay) {
    e.preventDefault()
  };
  return !0
};
FastClick.prototype.touchHasMoved = function(e) {
  'use strict';
  var n = e.changedTouches[0],
    t = this.touchBoundary;
  if (Math.abs(n.pageX - this.touchStartX) > t || Math.abs(n.pageY - this.touchStartY) > t) {
    return !0
  };
  return !1
};
FastClick.prototype.onTouchMove = function(e) {
  'use strict';
  if (!this.trackingClick) {
    return !0
  };
  if (this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) {
    this.trackingClick = !1;
    this.targetElement = null
  };
  return !0
};
FastClick.prototype.findControl = function(e) {
  'use strict';
  if (e.control !== undefined) {
    return e.control
  };
  if (e.htmlFor) {
    return document.getElementById(e.htmlFor)
  };
  return e.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea')
};
FastClick.prototype.onTouchEnd = function(e) {
  'use strict';
  var r, a, i, n, o, t = this.targetElement;
  if (!this.trackingClick) {
    return !0
  };
  if (e.timeStamp - this.lastClickTime < this.tapDelay) {
    this.cancelNextClick = !0;
    return !0
  };
  this.cancelNextClick = !1;
  this.lastClickTime = e.timeStamp;
  a = this.trackingClickStart;
  this.trackingClick = !1;
  this.trackingClickStart = 0;
  if (deviceIsIOSWithBadTarget) {
    o = e.changedTouches[0];
    t = document.elementFromPoint(o.pageX - window.pageXOffset, o.pageY - window.pageYOffset) || t;
    t.fastClickScrollParent = this.targetElement.fastClickScrollParent
  };
  i = t.tagName.toLowerCase();
  if (i === 'label') {
    r = this.findControl(t);
    if (r) {
      this.focus(t);
      if (deviceIsAndroid) {
        return !1
      };
      t = r
    }
  } else if (this.needsFocus(t)) {
    if (e.timeStamp - a > 100 || deviceIsIOS && window.top !== window && i === 'input') {
      this.targetElement = null;
      return !1
    };
    this.focus(t);
    this.sendClick(t, e);
    if (!deviceIsIOS || i !== 'select') {
      this.targetElement = null;
      e.preventDefault()
    };
    return !1
  };
  if (deviceIsIOS && !deviceIsIOS4) {
    n = t.fastClickScrollParent;
    if (n && n.fastClickLastScrollTop !== n.scrollTop) {
      return !0
    }
  };
  if (!this.needsClick(t)) {
    e.preventDefault();
    this.sendClick(t, e)
  };
  return !1
};
FastClick.prototype.onTouchCancel = function() {
  'use strict';
  this.trackingClick = !1;
  this.targetElement = null
};
FastClick.prototype.onMouse = function(e) {
  'use strict';
  if (!this.targetElement) {
    return !0
  };
  if (e.forwardedTouchEvent) {
    return !0
  };
  if (!e.cancelable) {
    return !0
  };
  if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
    if (e.stopImmediatePropagation) {
      e.stopImmediatePropagation()
    } else {
      e.propagationStopped = !0
    };
    e.stopPropagation();
    e.preventDefault();
    return !1
  };
  return !0
};
FastClick.prototype.onClick = function(e) {
  'use strict';
  var t;
  if (this.trackingClick) {
    this.targetElement = null;
    this.trackingClick = !1;
    return !0
  };
  if (e.target.type === 'submit' && e.detail === 0) {
    return !0
  };
  t = this.onMouse(e);
  if (!t) {
    this.targetElement = null
  };
  return t
};
FastClick.prototype.destroy = function() {
  'use strict';
  var e = this.layer;
  if (deviceIsAndroid) {
    e.removeEventListener('mouseover', this.onMouse, !0);
    e.removeEventListener('mousedown', this.onMouse, !0);
    e.removeEventListener('mouseup', this.onMouse, !0)
  };
  e.removeEventListener('click', this.onClick, !0);
  e.removeEventListener('touchstart', this.onTouchStart, !1);
  e.removeEventListener('touchmove', this.onTouchMove, !1);
  e.removeEventListener('touchend', this.onTouchEnd, !1);
  e.removeEventListener('touchcancel', this.onTouchCancel, !1)
};
FastClick.notNeeded = function(e) {
  'use strict';
  var n, t;
  if (typeof window.ontouchstart === 'undefined') {
    return !0
  };
  t = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
  if (t) {
    if (deviceIsAndroid) {
      n = document.querySelector('meta[name=viewport]');
      if (n) {
        if (n.content.indexOf('user-scalable=no') !== -1) {
          return !0
        };
        if (t > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
          return !0
        }
      }
    } else {
      return !0
    }
  };
  if (e.style.msTouchAction === 'none') {
    return !0
  };
  return !1
};
FastClick.attach = function(e, t) {
  'use strict';
  return new FastClick(e, t)
};
if (typeof define !== 'undefined' && define.amd) {
  define(function() {
    'use strict';
    return FastClick
  })
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = FastClick.attach;
  module.exports.FastClick = FastClick
} else {
  window.FastClick = FastClick
};
! function(e) {
  var t = {
    sectionContainer: 'section',
    easing: 'ease',
    animationTime: 1e3,
    pagination: !0,
    updateURL: !1,
    keyboard: !0,
    beforeMove: null,
    afterMove: null,
    loop: !0,
    responsiveFallback: !1,
    direction: 'vertical'
  };
  e.fn.swipeEvents = function() {
    return this.each(function() {
      function o(e) {
        var o = e.originalEvent.touches;
        if (o && o.length) {
          i = o[0].pageX;
          r = o[0].pageY;
          t.bind('touchmove', n)
        }
      };

      function n(e) {
        var o = e.originalEvent.touches;
        if (o && o.length) {
          var a = i - o[0].pageX,
            s = r - o[0].pageY;
          if (a >= 50) {
            t.trigger('swipeLeft')
          };
          if (a <= -50) {
            t.trigger('swipeRight')
          };
          if (s >= 50) {
            t.trigger('swipeUp')
          };
          if (s <= -50) {
            t.trigger('swipeDown')
          };
          if (Math.abs(a) >= 50 || Math.abs(s) >= 50) {
            t.unbind('touchmove', n)
          }
        }
      };
      var i, r, t = e(this);
      t.bind('touchstart', o)
    })
  };
  e.fn.onepage_scroll = function(n) {
    function a() {
      var t = !1,
        n = typeof i.responsiveFallback;
      if (n == 'number') {
        t = e(window).width() < i.responsiveFallback
      };
      if (n == 'boolean') {
        t = i.responsiveFallback
      };
      if (n == 'function') {
        valFunction = i.responsiveFallback();
        t = valFunction;
        typeOFv = typeof t;
        if (typeOFv == 'number') {
          t = e(window).width() < valFunction
        }
      };
      if (t) {
        e('body').addClass('disabled-onepage-scroll');
        e(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
        r.swipeEvents().unbind('swipeDown swipeUp')
      } else {
        if (e('body').hasClass('disabled-onepage-scroll')) {
          e('body').removeClass('disabled-onepage-scroll');
          e('html, body, .wrapper').animate({
            scrollTop: 0
          }, 'fast')
        };
        r.swipeEvents().bind('swipeDown', function(t) {
          if (!e('body').hasClass('disabled-onepage-scroll')) t.preventDefault();
          r.moveUp()
        }).bind('swipeUp', function(t) {
          if (!e('body').hasClass('disabled-onepage-scroll')) t.preventDefault();
          r.moveDown()
        });
        r.bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e) {
          e.preventDefault();
          var t = e.originalEvent.wheelDelta || -e.originalEvent.detail;
          o(e, t)
        })
      }
    };

    function o(e, t) {
      deltaOfInterest = t;
      var n = (new Date).getTime();
      if (n - lastAnimation < quietPeriod + i.animationTime) {
        e.preventDefault();
        return
      };
      if (deltaOfInterest < 0) {
        r.moveDown()
      } else {
        r.moveUp()
      };
      lastAnimation = n
    };
    var i = e.extend({}, t, n),
      r = e(this),
      s = e(i.sectionContainer);
    total = s.length, status = 'off', topPos = 0, leftPos = 0, lastAnimation = 0, quietPeriod = 500, paginationList = '';
    e.fn.transformPage = function(t, n, i) {
      if (typeof t.beforeMove == 'function') t.beforeMove(i);
      if (e('html').hasClass('ie8')) {
        if (t.direction == 'horizontal') {
          var o = r.width() / 100 * n;
          e(this).animate({
            left: o + 'px'
          }, t.animationTime)
        } else {
          var o = r.height() / 100 * n;
          e(this).animate({
            top: o + 'px'
          }, t.animationTime)
        }
      } else {
        e(this).css({
          '-webkit-transform': t.direction == 'horizontal' ? 'translate3d(' + n + '%, 0, 0)' : 'translate3d(0, ' + n + '%, 0)',
          '-webkit-transition': 'all ' + t.animationTime + 'ms ' + t.easing,
          '-moz-transform': t.direction == 'horizontal' ? 'translate3d(' + n + '%, 0, 0)' : 'translate3d(0, ' + n + '%, 0)',
          '-moz-transition': 'all ' + t.animationTime + 'ms ' + t.easing,
          '-ms-transform': t.direction == 'horizontal' ? 'translate3d(' + n + '%, 0, 0)' : 'translate3d(0, ' + n + '%, 0)',
          '-ms-transition': 'all ' + t.animationTime + 'ms ' + t.easing,
          transform: t.direction == 'horizontal' ? 'translate3d(' + n + '%, 0, 0)' : 'translate3d(0, ' + n + '%, 0)',
          transition: 'all ' + t.animationTime + 'ms ' + t.easing
        })
      };
      e(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
        if (typeof t.afterMove == 'function') t.afterMove(i)
      })
    };
    e.fn.moveDown = function() {
      var t = e(this);
      index = e(i.sectionContainer + '.active').data('index');
      current = e(i.sectionContainer + '[data-index=\'' + index + '\']');
      next = e(i.sectionContainer + '[data-index=\'' + (index + 1) + '\']');
      if (next.length < 1) {
        if (i.loop == !0) {
          pos = 0;
          next = e(i.sectionContainer + '[data-index=\'1\']')
        } else {
          return
        }
      } else {
        pos = index * 100 * -1
      };
      if (typeof i.beforeMove == 'function') i.beforeMove(next.data('index'));
      current.removeClass('active');
      next.addClass('active');
      if (i.pagination == !0) {
        e('.onepage-pagination li a[data-index=\'' + index + '\']').removeClass('active');
        e('.onepage-pagination li a[data-index=\'' + next.data('index') + '\']').addClass('active')
      };
      e('body')[0].className = e('body')[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      e('body').addClass('viewing-page-' + next.data('index'));
      if (history.replaceState && i.updateURL == !0) {
        var n = window.location.href.substr(0, window.location.href.indexOf('#')) + '#' + (index + 1);
        history.pushState({}, document.title, n)
      };
      t.transformPage(i, pos, next.data('index'))
    };
    e.fn.moveUp = function() {
      var t = e(this);
      index = e(i.sectionContainer + '.active').data('index');
      current = e(i.sectionContainer + '[data-index=\'' + index + '\']');
      next = e(i.sectionContainer + '[data-index=\'' + (index - 1) + '\']');
      if (next.length < 1) {
        if (i.loop == !0) {
          pos = (total - 1) * 100 * -1;
          next = e(i.sectionContainer + '[data-index=\'' + total + '\']')
        } else {
          return
        }
      } else {
        pos = (next.data('index') - 1) * 100 * -1
      };
      if (typeof i.beforeMove == 'function') i.beforeMove(next.data('index'));
      current.removeClass('active');
      next.addClass('active');
      if (i.pagination == !0) {
        e('.onepage-pagination li a[data-index=\'' + index + '\']').removeClass('active');
        e('.onepage-pagination li a[data-index=\'' + next.data('index') + '\']').addClass('active')
      };
      e('body')[0].className = e('body')[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      e('body').addClass('viewing-page-' + next.data('index'));
      if (history.replaceState && i.updateURL == !0) {
        var n = window.location.href.substr(0, window.location.href.indexOf('#')) + '#' + (index - 1);
        history.pushState({}, document.title, n)
      };
      t.transformPage(i, pos, next.data('index'))
    };
    e.fn.moveTo = function(t) {
      current = e(i.sectionContainer + '.active');
      next = e(i.sectionContainer + '[data-index=\'' + t + '\']');
      if (next.length > 0) {
        if (typeof i.beforeMove == 'function') i.beforeMove(next.data('index'));
        current.removeClass('active');
        next.addClass('active');
        e('.onepage-pagination li a.active').removeClass('active');
        e('.onepage-pagination li a[data-index=\'' + t + '\']').addClass('active');
        e('body')[0].className = e('body')[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
        e('body').addClass('viewing-page-' + next.data('index'));
        pos = (t - 1) * 100 * -1;
        if (history.replaceState && i.updateURL == !0) {
          var n = window.location.href.substr(0, window.location.href.indexOf('#')) + '#' + (t - 1);
          history.pushState({}, document.title, n)
        };
        r.transformPage(i, pos, t)
      }
    };
    r.addClass('onepage-wrapper').css('position', 'relative');
    e.each(s, function(t) {
      e(this).css({
        position: 'absolute',
        top: topPos + '%'
      }).addClass('section').attr('data-index', t + 1);
      e(this).css({
        position: 'absolute',
        left: i.direction == 'horizontal' ? leftPos + '%' : 0,
        top: i.direction == 'vertical' || i.direction != 'horizontal' ? topPos + '%' : 0
      });
      if (i.direction == 'horizontal') leftPos = leftPos + 100;
      else topPos = topPos + 100;
      if (i.pagination == !0) {
        paginationList += '<li><a data-index=\'' + (t + 1) + '\' href=\'#' + (t + 1) + '\'></a></li>'
      }
    });
    r.swipeEvents().bind('swipeDown', function(t) {
      if (!e('body').hasClass('disabled-onepage-scroll')) t.preventDefault();
      r.moveUp()
    }).bind('swipeUp', function(t) {
      if (!e('body').hasClass('disabled-onepage-scroll')) t.preventDefault();
      r.moveDown()
    });
    if (i.pagination == !0) {
      if (e('ul.onepage-pagination').length < 1) e('<ul class=\'onepage-pagination\'></ul>').prependTo('body');
      if (i.direction == 'horizontal') {
        posLeft = r.find('.onepage-pagination').width() / 2 * -1;
        r.find('.onepage-pagination').css('margin-left', posLeft)
      } else {
        posTop = r.find('.onepage-pagination').height() / 2 * -1;
        r.find('.onepage-pagination').css('margin-top', posTop)
      };
      e('ul.onepage-pagination').html(paginationList)
    };
    if (window.location.hash != '' && window.location.hash != '#1') {
      init_index = window.location.hash.replace('#', '');
      if (parseInt(init_index) <= total && parseInt(init_index) > 0) {
        e(i.sectionContainer + '[data-index=\'' + init_index + '\']').addClass('active');
        e('body').addClass('viewing-page-' + init_index);
        if (i.pagination == !0) e('.onepage-pagination li a[data-index=\'' + init_index + '\']').addClass('active');
        next = e(i.sectionContainer + '[data-index=\'' + init_index + '\']');
        if (next) {
          next.addClass('active');
          if (i.pagination == !0) e('.onepage-pagination li a[data-index=\'' + init_index + '\']').addClass('active');
          e('body')[0].className = e('body')[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
          e('body').addClass('viewing-page-' + next.data('index'));
          if (history.replaceState && i.updateURL == !0) {
            var u = window.location.href.substr(0, window.location.href.indexOf('#')) + '#' + init_index;
            history.pushState({}, document.title, u)
          }
        };
        pos = (init_index - 1) * 100 * -1;
        r.transformPage(i, pos, init_index)
      } else {
        e(i.sectionContainer + '[data-index=\'1\']').addClass('active');
        e('body').addClass('viewing-page-1');
        if (i.pagination == !0) e('.onepage-pagination li a[data-index=\'1\']').addClass('active')
      }
    } else {
      e(i.sectionContainer + '[data-index=\'1\']').addClass('active');
      e('body').addClass('viewing-page-1');
      if (i.pagination == !0) e('.onepage-pagination li a[data-index=\'1\']').addClass('active')
    };
    if (i.pagination == !0) {
      e('.onepage-pagination li a').click(function() {
        var t = e(this).data('index');
        r.moveTo(t)
      })
    };
    e('.onepage_scroll').bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(t) {
      t.preventDefault();
      var n = t.originalEvent.wheelDelta || -t.originalEvent.detail;
      if (!e('body').hasClass('disabled-onepage-scroll')) o(t, n)
    });
    if (i.responsiveFallback != !1) {
      e(window).resize(function() {
        a()
      });
      a()
    };
    if (i.keyboard == !0) {
      e(document).keydown(function(t) {
        var n = t.target.tagName.toLowerCase();
        if (!e('body').hasClass('disabled-onepage-scroll')) {
          switch (t.which) {
            case 38:
              if (n != 'input' && n != 'textarea') r.moveUp();
              break;
            case 40:
              if (n != 'input' && n != 'textarea') r.moveDown();
              break;
            case 32:
              if (n != 'input' && n != 'textarea') r.moveDown();
              break;
            case 33:
              if (n != 'input' && n != 'textarea') r.moveUp();
              break;
            case 34:
              if (n != 'input' && n != 'textarea') r.moveDown();
              break;
            case 36:
              r.moveTo(1);
              break;
            case 35:
              r.moveTo(total);
              break;
            default:
              return
          }
        }
      })
    };
    return !1
  }
}(window.jQuery);
eval(function(e, t, n, i, r, o) {
  if (r = function(e) {
      return (t > e ? '' : r(parseInt(e / t))) + ((e %= t) > 35 ? String.fromCharCode(e + 29) : e.toString(36))
    }, !''.replace(/^/, String)) {
    for (; n--;) o[r(n)] = i[n] || r(n);
    i = [function(e) {
      return o[e]
    }], r = function() {
      return '\\w+'
    }, n = 1
  };
  for (; n--;) i[n] && (e = e.replace(new RegExp('\\b' + r(n) + '\\b', 'g'), i[n]));
  return e
}('D H=q(n,t,i){D j="T",1U="3c",2s=\'<3d 1V="\',1W="q",p="4g",l=3e,h=1X,b="3f",1Y="3g",g="4h",d="1t",1Z="1c",o=x,f,s,21,a,22;J("4i"==1u n)A 1I(n).H(t);J("4j"==1u n&&n.H)A n.H;J("4k"==1u n)A 1j H.2t(n);D u=o,e=i(n),k,y,v,c,w,n={1v:1Z,23:d,M:g,2u:"1k",24:"2v",12:"4l",3h:q(n,t){J(18 0===t)A n.3i();n.3i(t)},Z:q(n,t){J(18 0===t)A n.1c();n.1c(t)},26:q(n,t){J(18 0===t)A n.1t();n.1t(t)}},3j={1v:d,23:1Z,M:"2v",2u:"3k",24:g,12:"4m",3h:q(n,t){J(18 0===t)A n.2w();n.2w(t)},Z:q(n,t){J(18 0===t)A n.1t();n.1t(t)},26:q(n,t){J(18 0===t)A n.1c();n.1c(t)}},27,28,29,2a,r=i.O({},2x.H.F,t);o.19=q(){A x.3l=u.B.Z(y)},o.3m=q(){A(r.1l-x.I())/(r.1l-(u.B.Z(e)-x.19()-r.2b))},o.T=q(n){A 0>n&&(n=0),1<n&&(n=1),x.G(x.2c(n)),x},o.2c=q(n){A r.1l-n*(r.1l-(u.B.Z(e)-x.19()-r.2b))},o.I=q(){A w.I()},o.G=q(n){A 29(n),x},o.W=q(n){A 2a(n)};D m=q(n){(r.3n||!(u.19()<=u.B.Z(e)))&&w.G(n)},2y=q(n){J(n>r.1l)A r.1l;D t=u.B.Z(e)-u.19()-r.2b;A n<t?t:n},3o=q(n){D t=w.I();1a=u.19()/2,n>1a&&(n%=1a);D i=t+1a-n,t=N.U(t-n)<N.U(i)?n:n-1a,n=2y(n);n!=t&&(w.1J(n>t?1a:-1a),t+=n>t?1a:-1a),w.G(t)},3p=q(n){A n};J(o.2d=q(n){A u.G(u.I()+n)},o.1d=q(n){A u.G(u.W(u.I()+n))},o.2z=q(){J(v=y.1w(),v.3q(r.11+"-1K"),e.E({4n:"4o",T:"4p"}),v.E({4q:g}),(r.1L=1Y)&&!X(e.E(d))){13(D s=v.1b,o=0,t=0,n,f=0;f<s;f++)$1K=i(v[f]),n=X($1K.E("2e-2v")),2f(n)&&(n=0),t=n,n=X($1K.2w()),2f(n)&&(n=0),t+=n,n=X($1K.E("2e-3k")),2f(n)&&(n=0),t+=n,t>o&&(o=t);e.E(d,o)}A 1Y==r.1L&&u.B.Z(k,3r),r.2A?(v.4r(!0).4s(y),29=3o,2a=3p):(29=m,2a=2y),x},o.3s=q(){A y},o.3t=q(n){A i.O(r,n),x.s=r,21(),x},o.V=q(){13(D n=0;n<c.1b;n++)c[n].V();A x},o.P=q(){13(D n=0;n<c.1b;n++)c[n].P();A x},o.1m=q(){e.1n(r.2B,u)},o.2g=q(){e.1n(r.2C,u)},o.1o=q(){e.1n(r.2D,u)},f={1M:q(n,t,i){D r=n.O({},f.1M.F,i),u=!1,e=q(n){n=n[t.B.12]-r.C.G()[t.B.M],t.T((n-r.1x)/(t.B.Z(r.C)-r.1x-r.1N)),u=!1};x.P=q(){r.C.R(b,e),u=!1},x.V=q(){u||(u=!0,r.C.14(b,e))},r.C=r.C?n(r.C):t.$S}},f.1M.F={C:h,1x:50,1N:50},f.2h=q(n,t,i){D c="3u",r=n.O({},f.2h.F,i),s=0,h=!1,o,u=!1,a=q(){t.1d(s),e()},v=q(n){h=!1,n=n[t.B.12]-r.C.G()[t.B.M]-(N.3v(t.B.Z(r.C)/2)+r.3w),s=r.2E?r.2E(n):n<-r.1x||n>r.1N?-r.1p*(n+(0<n?-r.1N:r.1x)):0,u||(a(),o=1O(a,r.1e),u=!0)},l=q(){s=0,u&&(1y(o),u=!1),e(),4t=!1},e=q(){h||(r.C.1f(b,v),h=!0)};x.P=q(){r.C.R(b,v),r.C.R(c,l),u&&(1y(o),u=!1)},x.V=q(){e();r.C.1f(c,l)},r.C=r.C?n(r.C):t.$S},f.2h.F={C:h,1e:50,1x:3x,1N:3x,3w:0,1p:.2,2E:h},f.2F=q(n,t,i){D r=n.O({},f.2F.F,i),h,e=!1,u=0,c=0,o=!1,v=q(i){r.1z&&i.1g(),e=!0,h=i[t.B.12],u=0,n(K).14(r.1A,s);n(K).1f(r.1B,a);o=!1,t.$S.1n("4u",t)},s=q(n){D n,f,i,o;n.1g(),e&&(c=u,u=(n[t.B.12]-h)*r.1p,n=t.I()+u-c,f=t.W(n),n!=f&&(i=N.U(f-n),o=r.1h?r.1h(i):i*r.2i,u+=f<n?o-i:i-o),t.2d(u-c),r.C[0].1C=!0)},a=q(i){r.1z&&i.1g(),t.$S.R(r.1A,s),e=!1,t.1d((i[t.B.12]-h)*r.1p-u),n(K).R(r.1A,s),l(),t.$S.1n("4v",t),2j(q(){r.C[0].1C=!1},r.2k)},l=q(){o||(o=!0,r.C.1f(r.1P,v))};x.P=q(){e&&(n(K).R(r.1A,s),n(K).R(r.1B,a),t.G(t.W(t.I())),e=!1,r.C[0].1C=!1),n(K).R(r.1P,v),o=!1},x.V=q(){l()},r.C=r.C?n(r.C):t.$S},f.2F.F={C:h,1P:"4w",1A:b,1B:"4x",1p:1,2i:.3y,1h:h,2k:3z,1z:!1},f.2l=q(n,t,i){D l="4y",a="4z 4A",c="4B",r=n.O({},f.2l.F,i),y,u=0,h=0,e=!1,o=!1,p=q(i){r.1z&&i.1g(),e=!0,y=i.3A.3B[0][t.B.12],u=0,n(K).14(c,s);n(K).1f(a,w);o=!1,t.$S.1n("4C",t)},s=q(n){D n,f,i,o;n.1g(),e&&(h=u,u=(n.3A.3B[0][t.B.12]-y)*r.1p,n=t.I()+u-h,f=t.W(n),n!=f&&(i=N.U(f-n),o=r.1h?r.1h(i):i*r.2i,u+=f<n?o-i:i-o),t.2d(u-h),r.C[0].1C=!0)},w=q(i){r.1z&&i.1g(),e=!1,n(K).R(r.1A,s),t.G(t.W(t.I())),v(),t.$S.1n("4D",t),2j(q(){r.C[0].1C=!1},r.2k)},v=q(){o||(o=!0,r.C.1f(l,p))};x.P=q(){e&&(n(K).R(c,s),n(K).R(a,w),t.G(t.W(t.I())),e=!1,r.C[0].1C=!1),n(K).R(l,p),o=!1},x.V=q(){v()},r.C=r.C?n(r.C):t.$S},f.2l.F={C:h,1e:50,1p:1,2i:.3y,1h:h,2k:3z,1z:!1},f.2G=q(n,t,i){D o="4E",r=n.O({},f.2G.F,i),e=!1,u=0,h=q(){D n=+1j 2H;n>=u+r.1e?(t.G(t.W(t.I())),e=!1):2j(h,r.1e-(n-u))},s=q(n,i){n.1g(),r.3C&&(i=0<i?1:-1);D f=i*r.1i;G=t.I()+f,2m=t.W(G),G!=2m&&(f=r.1h(i,N.U(2m-G))),r.1e?(t.2d(f),u=+1j 2H,!e&&G!=2m&&(2j(h,r.1e),e=!0)):t.1d(f)};x.P=q(){t.$S.R(o,s)},x.V=q(){t.$S.14(o,s)}},f.2G.F={1i:40,3C:!1,1e:4F,1h:q(n,t){A l<t?0:4G*n/t}},f.2I=q(n,t,i){D r=n.O({},f.2I.F,i),e=n(r.2J),u=q(n){n.3D==r.3E&&t.1d(-r.Y),n.3D==r.3F&&t.1d(r.Y)};x.P=q(){e.R("3G",u)},x.V=q(){e.3G(u)}},f.2I.F={2J:K,Y:l,3E:39,3F:37},f.2K=q(n,t,i){D u=n.O({},f.2K.F,i),r=2x.1D.3H,e=q(){D n=t.I();t.s.2A&&(n%=t.19()/2),2x.1D.3H=N.3v(-n/N.U(u.Y))+1};x.P=q(){},x.V=q(){r&&(r=X(r.4H(1,r.1b-1)),2f(r)&&(r=1),t.G(t.W(-u.Y*(r-1)))),t.$S.14("3I",e)}},f.2K.F={Y:l},f.2L=q(n,t,i){D r=n.O({},f.2L.F,i),e,o=q(){t.1d(-r.Y)},u=q(){1y(e)};x.P=q(){u()},x.V=q(){n(r.C).14(r.1P,q(){J(e=1O(o,r.1E),r.1B)n(r.C).1f(r.1B,u)})}},f.2L.F={1P:"4I",1B:h,C:K,Y:l,1E:4J},f.2M=q(n,t,i){D r=n.O({},f.2M.F,i),u=q(n){J(n.1g(),r.3J){D n=t.I(),i=t.W(n-r.Y);J(n==i){t.T(0<-r.Y?1:0);A}}t.1d(-r.Y)};x.P=q(){r.C.R(r.2N,u)},x.V=q(){r.C.14(r.2N,u)},r.C=r.C?n(r.C):t.$S},f.2M.F={C:h,2N:"4K",Y:l,3J:!0},s={4L:q(n,t){D i;x.I=q(){A i},x.G=q(n){t.1m(),i=n,t.$L.E(t.B.M,i),t.1o()},x.1J=q(){},(i=X(t.$L.E(t.B.M)))||(i=0)},1Q:q(n,t,i){D e="16-4M-q",n=n.O({},s.1Q.F,i),u=X(t.$L.E(t.B.M)),o=t.B.M,c=t.$L[0].1q,f=!0,i="",h=q(){f=!0,t.1o()},r;3K=q(){t.$L.1f("4N",h)},x.I=q(){A u},x.G=q(n){u=n,c[o]=u+p,f&&(f=!1,3K(),t.1m())},(u=X(t.$L.E(o)))||(u=0),i=H.2O.2P(),!1!==i&&(r={},r[i+"16-4O"]=t.B.M,n.2Q&&(r[i+e]=n.2Q),r[i+"16-3L"]=n.1E+"2R",r[i+"16-1F"]=n.1F+"2R",t.$L.E(r),t.$L.E(i+e,n.16))}},s.1Q.F={1F:-20,1E:2S,2Q:"2T-3M(0.3N, 1.0, 0.3O, 0.3P)",16:"2T-3M(0.3N, 1.4P, 0.3O, 0.3P)"},s.2n=q(n,t,i){D o=n.O({},s.2n.F,i),r,u,l,f=!1,e=t.B.M,a=t.$L[0].1q,h,c,v=q(){h=(u-r)*o.3Q,c=.5>N.U(h),u!=r&&!c?(r+=h,a[e]=r+p,t.2g()):(o.3R&&(a[e]=u+p),f&&(1y(l),f=!1,t.1o()))};x.I=q(){A u},x.G=q(n){u=n,f||(l=1O(v,o.1r),f=!0,t.1m())},x.1J=q(n){r+=n,u+=n},(r=X(t.$L.E(e)))||(r=0),u=r},s.2n.F={3R:!1,1r:25,3Q:.25},s.2U=q(n,t,i){D u=n.O({},s.2U.F,i),e,o,a,h=!1,v=t.B.M,w=t.$L[0].1q,r=0,c,l,f,y=q(){(f=o-e)?(r=u.1G?r+(0<f?u.1G:-u.1G):u.1i,u.1H&&(c=N.U(r)/u.1H,l=u.1H*c*(c+1)/2,l>N.U(f-r)&&(r=(0<f?1:-1)*(-1+N.3S(u.1H*(u.1H+8*N.U(f))))/2)),u.3T||(0>f&&0<r&&(r=-u.1G),0<f&&0>r&&(r=u.1G)),r>u.1i&&(r=u.1i),r<-u.1i&&(r=-u.1i),0<f&&r>f&&(r=f),0>f&&r<f&&(r=f),e+=r,w[v]=e+p,t.2g()):(r=0,h&&(1y(a),h=!1,t.1o()))};x.I=q(){A o},x.G=q(n){o=n,h||(a=1O(y,u.1r),h=!0,t.1m())},x.1J=q(n){e+=n,o+=n},(o=e=X(t.$L.E(v)))||(e=0)},s.2U.F={1r:50,1i:50,1G:3,1H:3,3T:!0},s.1I=q(n,t,i){D f=n.O({},s.1I.F,i),r,u=t.B.M;x.I=q(){A r},x.G=q(n){r=n,n={},n[u]=r,t.$L.P(!0).2o(n,f.1E,f.3U,t.1o),t.1m()},(r=X(t.$L.E(u)))||(r=0)},s.1I.F={1E:2S,3U:"4Q"},s.1R=q(n,t,i){D u=n.O({},s.1R.F,i),k,v=!1,h,f,r,d,y,a,o,l=0,e,c,w=t.B.M,b=t.$L[0].1q,g=q(){o=+1j 2H,y!=r&&(l=l>o?o+e+N.U(r-h)*u.2V:o+N.U(r-h)*u.2V-u.1r/2,a=o+u.1F,e=l-a,e>u.2W&&(e=u.2W,l=a+e),e<u.2X&&(e=u.2X,l=a+e),h=f,d=r-h),o>=l?(f=r,b[w]=f+p,v&&(1y(k),v=!1,t.1o())):(c=(o-a)/e,1<c&&(c=1),0>c&&(c=0),f=h+d*u.16(c),b[w]=f+p,y=r,t.2g())};x.I=q(){A r},x.G=q(n){r=n,v||(k=1O(g,u.1r),v=!0,t.1m())},x.1J=q(n){f+=n,r+=n,h+=n,y+=n},(f=X(t.$L.E(t.B.M)))||(f=0),h=r=f},s.1R.F={1F:-20,1r:20,2X:l,2W:4R,2V:10,16:H.1R.3V},21=q(){r.3W&&"4S"3X K.3Y&&(r.1s=["2l"],r.1S=[r.3Z]),c=[];13(D t,n=0;n<r.1s.1b;n++)t=r.1S[n]?r.1S[n]:r.1S[0],c[n]=1j f[r.1s[n]](i,u,t);r.41&&"1Q"!=r.2p&&!1!==H.2O.2P()&&(r.2p="1Q",r.2Y=r.42),w=1j s[r.2p](i,u,r.2Y)},H.1T.43++,1W==1u r.2Z&&e.14(r.2D,r.2Z),1W==1u r.30&&e.14(r.2B,r.30),1W==1u r.31&&e.14(r.2C,r.31),o.B=1Y==r.1L?n:3j,t=r.11+"-L",e.44(\'<4T 1V="\'+t+\'-2" 1q="45:4U-46;"/>\'),e.44(2s+t+\'-1" 1q="T:3c;"/>\'),k=i(e.1w("."+t+"-1")[0]),y=i(k.1w("."+t+"-2")[0]),"4V"==r.1L&&y.E(1Z,"3e%"),o.s=r,o.$S=e,o.$L=k,e.3q(r.11),o.2z(),""==1D.32||"4W"==1D.32||1D.32.4X(/47\\.48/i)||(e.34(\'<a 4Y="49://4Z.47.48" 51="52 53 54&55;56 57 59!" 2J="5a" 1V="\'+r.11+\'-35"></a>\'),a=e.1w("a."+r.11+"-35"),H.1T.4a||(H.1T.4a=!0,t=K.5b("5c"),t.5d="5e/E",n="."+r.11+"-35 {36:5f(5g:5h/5i;5j,5k/5l/5m+5n/5o+5p+5q+5r/5s/5t+5u/5v+5w/Q+5x/6/5y+5z+5A+5B+5C+/n/5D+5E/5F+5G+5H+5I/5J/+5K+5L/5M+5N+5O/5P/5Q+5R/5S/5T+5U+5V+5W+5X/5Y+5Z/i/60+61+62/63+64/65/66+68/69+6a+/6b+6c/6d//6e+6f+6g==);z-6h:3r !38;6i:0 !38;45:46 !38}",t.4b?t.4b.6j=n:t.6k(K.6l(n)),i("6m").34(t)),a.E({2e:0,T:1U,1c:17,1t:17,2e:0,1k:-20}).1F(6n).2o({1k:4},2S),a.6o(q(){a.P().E({"36-T":"-6p 0",1k:-58,1c:6q}).2o({1k:0},l)}),a.3u(q(){a.P().2o({1k:-58},{3L:l,6r:q(){a.E({"36-T":"0 0",1k:4,1c:17})}})})),r.4c){13(t=!1,n=0;n<r.1s.1b;n++)J("1M"==r.1s[n]||"2h"==r.1s[n]){t=!0;3a}t&&(e.34(2s+r.11+\'-2q-1"/><3d 1V="\'+r.11+\'-2q-2"/>\'),27=e.1w("."+r.11+"-2q-1"),28=e.1w("."+r.11+"-2q-2"),27.E(j,1U).E(u.B.1v,u.19()).E(u.B.23,u.B.26(e)).E(u.B.M,0).E(u.B.24,0),28.E(j,1U).E(u.B.1v,u.3l).E(u.B.23,u.B.26(e)).E(u.B.2u,0).E(u.B.24,0),e.3f(q(n){22=n[u.B.12]-e.G()[u.B.M],27.E(u.B.1v,22-r.3b),28.E(u.B.1v,u.B.Z(e)-22-r.3b)}))}13(k.E(o.B.M,o.2c(r.4d)),21(),o.T(r.T),n=0;n<c.1b;n++)c[n].V()};H.F={1L:"3g",2A:!1,2p:"2n",2Y:{},1s:["1M"],1S:[{}],1l:25,2b:25,4d:0,T:.5,4c:!1,3b:7,3W:!0,3Z:{},41:!1,42:{},3n:!1,30:1X,2Z:1X,31:1X,11:"6s",2B:"6t",2D:"3I",2C:"6u"},H.1T={6v:"1.6.0",6w:"6x",6y:!1,43:0},H.2O={2P:q(){D n=H.1T,r,t,i;J(18 0===n.2r){n.2r=!1,r=(K.6z||K.3Y).1q,t={16:"",6A:"-6B-",6C:"-6D-",6E:"-2R-",6F:"-o-"};13(i 3X t)J(18 0!==r[i]){n.2r=t[i];3a}}A n.2r},4e:q(){A"4f:"==K.1D.4e?"4f:":"49:"}},H.2t=q(n){13(D i="19 3m T 2c I G W 2z 3s 3t V P".6G(" "),r=x,t=0;t<i.1b;t++)(q(t){r[t]=q(){13(D u,i,f=0;f<n.1b;f++)J(u=n[f].H,i=u[t].6H(u,6I),18 0!==i&&i!==u)A i;A r}})(i[t]);A x},H.1R={6J:q(){A 1},6K:q(n){A n},6L:q(n){D t=n*n;A n*(-t*n+4*t-6*n+4)},2T:q(n){A n*(4*n*n-9*n+6)},6M:q(n){D t=n*n;A n*(33*t*t-6N*t*n+6O*t-67*n+15)},3V:q(n){A N.3S(1-(n-=1)*n)},6P:q(n,t,i,r,u,f){D v=u?u:.6Q,y=f?f:5,e=3*n,o=3*(i-n)-e,p=2*o,c=1-e-o,a=3*c,s=3*t,h=3*(r-t)-s,l=1-s-h;x.16=q(n){13(D t=n,r=0,i;r<y;r++){J(i=t*(e+t*(o+t*c))-n,N.U(i)<v)3a;t-=i/(e+t*(p+t*a))}A t*(s+t*(h+t*l))}}},q(n){n.6R.H=q(t){A H.2t(x.6S(q(i,r){r.H||(r.H=1j H(r,t,n))}))}}(1I);', 62, 427, '||||||||||||||||||||||||||function|||||||this|||return|props|el|var|css|defaults|offset|FlowSlider|getOffset|if|document|wrap|edge|Math|extend|stop||unbind|mask|position|abs|start|boundOffset|parseInt|step|fSize||prefix|mouse|for|bind||transition||void|calcSize|half_size|length|width|moveBounded|timeout|one|preventDefault|outFunction|speed|new|right|marginStart|_triggerOnStart|trigger|_triggerOnStop|coefficient|style|frequency|controllers|height|typeof|size|children|mouseStart|clearInterval|prevent|eventMove|eventEnd|fsDragging|location|time|delay|acc|dec|jQuery|shift|item|mode|Hover|mouseEnd|setInterval|eventStart|CSS|Transition|controllerOptions|Global|ht|class|it|null|nt|tt||st|rt|sizeC|edgeC||fSizeC|et|ft|ut|ot|marginEnd|positionToOffset|move|margin|isNaN|_triggerOnMove|HoverCenter|outCoefficient|setTimeout|_delay|Touch|bound|Elastic|animate|animation|overlay|tPrefix|ct|Array|edgeEnd|top|outerHeight|window|at|setupDOM|infinite|eMoveStart|eMove|eMoveStop|moveFunction|Drag|Wheel|Date|Key|target|Hash|Timer|Event|event|Util|transitionPrefix|transitionAlt|ms|1e3|cubic|Accelerating|timeCoefficient|timeMax|timeMin|animationOptions|onMoveStop|onMoveStart|onMove|host||append|branding|background||important||break|overlayPrecision|absolute|div|100|mousemove|horizontal|fOuterSize|outerWidth|vt|bottom|wrapSize|getPosition|moveIfSmaller|yt|pt|addClass|9999999|content|set|mouseleave|round|center|150|125|200|originalEvent|touches|normalize|keyCode|keyFwd|keyRev|keydown|hash|flowSliderMoveStop|rewind|hookStopEvent|duration|bezier|345|535|795|elasticity|snap|sqrt|overshoot|easing|circ|detectTouchDevice|in|documentElement|touchOptions||detectCssTransition|cssAnimationOptions|sliders|wrapInner|display|block|flowslider|com|http|brandingCSS|styleSheet|externalContent|startPosition|protocol|https|px|left|string|object|array|pageX|pageY|overflow|hidden|relative|float|clone|appendTo|eventLeaveOn|flowSliderDragStart|flowSliderDragEnd|mousedown|mouseup|touchstart|touchend|touchcancel|touchmove|flowSliderTouchStart|flowSliderTouchEnd|mousewheel|500|300|substr|ready|3e3|click|None|timing|transitionend|property|650|swing|1500|ontouchstart|span|inline|vertical|localhost|match|href|www||title|Flow|Slider|plugin|mdash|slide|your||HTML|_blank|createElement|STYLE|type|text|url|data|image|png|base64|iVBORw0KGgoAAAANSUhEUgAAAGAAAAARCAYAAAAi5qlcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw|eHBhY2tldCBiZWdpbj0i77u|IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8|IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0MTJEMUUwQ0IxMjlFMTExQTdENUE2NkI4MENGMEUyQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NjZGQ0EwNDQ3NkIxMUUxQjhBOUNEQUU5RTA3NzY4MiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NjZGQ0EwMzQ3NkIxMUUxQjhBOUNEQUU5RTA3NzY4MiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMzRBQjk2MzZCNDdFMTExQThDOEFBQzQzREU4RDlCMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0MTJEMUUwQ0IxMjlFMTExQTdENUE2NkI4MENGMEUyQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI|PjyGfq4AAASpSURBVHja7FhdSBxXFD4z|6fRdsWEUrJUS1swJKhJaLp9iCJp4gaKPgqlWAxFQ8DkzSd91CehULRgkVKoSIkvBW0h2hSCW2Jt0aJv2pKiSZsmGrImJq7r7k7ud|OZ3J2dWVc67UPZA4c7c|69585837nnzFzNMAz6pxKNRo1QKERer5d0XZdaEHtJp9NSk8kk7ezskNcNpwDe7|fL1uPxFAjYg4BUKmVi5BoBUJ|PZ|6CgjgTgOjna1cIAOCIfCbivyZgcXGRampq|hXfKysrVFZWRsFg0LYPa6Ovvr4|bwK4BU5e7ev1KnF|irOeYdE9omtMti3xTaOH9EN3M|LjNJ2LPqV7ceca8|vZEhpZ3aFPlhMZ9lKvRt|dLqZwuce0xWIx|bKqVFZWUlVVlbyOx|OugA0FmQC9sbGRpqenqb|r6|uR6s7Oz5vjR0VHq7e2lnp4eamho2FfAsnoZ|M9PldoOvvjL5vei|eOLcOmVZDqrD5Om7OYx|E5|x1bi9HqJTjXlfjHGb|VL7|4RcvnS6jcr5lRDkAADEd7a2ura5E|MDBAXV1dVFtbK8lWfWNNRDgIcFu8DD5eWsr8JNHJiDrmqtAzH89uBqz9u|NsEWbwnfwOnSyiG2tJavtpixz80pOkYRLAAvCnpl5w3t7ebl6PjIzIiEQUA7CxsTFqaWmRAOIaBDY1Nck|gK36QYRDJicn5XiQgOjn3QdlwRqDg4MZNlx3dHTQ|Pi4JArrIWgwjncXfFdXV2fuBo44BsHo|9CKJXbAOb6R|QBLnecgufy|94qHfrifov363djYkMAwOGr6ABkAF2kC|QAEAlB4zsTEhFQniUQitLCwIEmwrgmQmWSsg9TDAkKxztLSknwWEI8WvlAjQAr8ZKUjwn|ArpogvbD9aXxwaFW0p00bg6XMs5Ucfg8XEb12QKeb60nar1|8FACAqgJguC4gjTDwfM3jASQik|1mShQRC9ABWDgclnPthMnr7Oy0tfOOxHOycFDYFWpdexQjVn3oN2lUbDPCFhTtcbbJSWKcOs9Ocvl9t3ibNhJpWlx9QDn9Guksv5yC1PSRS7heAHSOaoBcV1eXMY5BYmI4dVhFTTt2dhRsfBDk|1Gge9bvkqq|3mn1|prQ80I9Dv1S7SSX38ghg67feki05rjuc7|pdN7FDLmdI5yjD4WUCQBAHLVcI6xFGKmiu7vb3El2ohJkjXKuJXgGpx2UVYS1tbs|Ydmz5Ux2|EfrWHj9|JXnrLany7KE5ztx9mDS72eaj5zRPUfnWetLW|HZ2|cVB8ARXl|z8BYIaHh2Uuxqdpc3OzjEY1l4MQpCKAq9p3j1MkeCAKYGIu8rhVQBDXE|XfAOO5DqAPPvL5N9ECbUPBXZBDlr5rQj8V||i0C2qkmCv3o5uVTdyoqKigQCJg|Yo|2EnTxyyj9FXuaMeHssRBdOnOUWj67LgLcPs|XCw|TS|U0eGyA|bP|FEIkHb29ukuXEYNzc3Z4AAPg8qHEXkT4ArRxE4XIJTBr5AwN4EADPXzoKYAF5A0zSpBXE|DQVeUFdSEGRmZsbAgRy0QEBuAngXQJ8JMABn2v61okLcyAAAAABJRU5ErkJggg|index|padding|cssText|appendChild|createTextNode|head|5e3|mouseenter|17px|79|complete|www_FlowSlider_com|flowSliderMoveStart|flowSliderMove|VERSION|PACK|Free|pinged|body|MozTransition|moz|WebkitTransition|webkit|MsTransition|OTransition|split|apply|arguments|none|linear|quadratic|elastic|106|126|CubicBezier|001|fn|each'.split('|'), 0, {}));
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
  def: 'easeOutQuad',
  swing: function(e, t, n, i, r) {
    return jQuery.easing[jQuery.easing.def](e, t, n, i, r)
  },
  easeInQuad: function(e, t, n, i, r) {
    return i * (t /= r) * t + n
  },
  easeOutQuad: function(e, t, n, i, r) {
    return -i * (t /= r) * (t - 2) + n
  },
  easeInOutQuad: function(e, t, n, i, r) {
    return (t /= r / 2) < 1 ? i / 2 * t * t + n : -i / 2 * (--t * (t - 2) - 1) + n
  },
  easeInCubic: function(e, t, n, i, r) {
    return i * (t /= r) * t * t + n
  },
  easeOutCubic: function(e, t, n, i, r) {
    return i * ((t = t / r - 1) * t * t + 1) + n
  },
  easeInOutCubic: function(e, t, n, i, r) {
    return (t /= r / 2) < 1 ? i / 2 * t * t * t + n : i / 2 * ((t -= 2) * t * t + 2) + n
  },
  easeInQuart: function(e, t, n, i, r) {
    return i * (t /= r) * t * t * t + n
  },
  easeOutQuart: function(e, t, n, i, r) {
    return -i * ((t = t / r - 1) * t * t * t - 1) + n
  },
  easeInOutQuart: function(e, t, n, i, r) {
    return (t /= r / 2) < 1 ? i / 2 * t * t * t * t + n : -i / 2 * ((t -= 2) * t * t * t - 2) + n
  },
  easeInQuint: function(e, t, n, i, r) {
    return i * (t /= r) * t * t * t * t + n
  },
  easeOutQuint: function(e, t, n, i, r) {
    return i * ((t = t / r - 1) * t * t * t * t + 1) + n
  },
  easeInOutQuint: function(e, t, n, i, r) {
    return (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + n : i / 2 * ((t -= 2) * t * t * t * t + 2) + n
  },
  easeInSine: function(e, t, n, i, r) {
    return -i * Math.cos(t / r * (Math.PI / 2)) + i + n
  },
  easeOutSine: function(e, t, n, i, r) {
    return i * Math.sin(t / r * (Math.PI / 2)) + n
  },
  easeInOutSine: function(e, t, n, i, r) {
    return -i / 2 * (Math.cos(Math.PI * t / r) - 1) + n
  },
  easeInExpo: function(e, t, n, i, r) {
    return 0 == t ? n : i * Math.pow(2, 10 * (t / r - 1)) + n
  },
  easeOutExpo: function(e, t, n, i, r) {
    return t == r ? n + i : i * (-Math.pow(2, -10 * t / r) + 1) + n
  },
  easeInOutExpo: function(e, t, n, i, r) {
    return 0 == t ? n : t == r ? n + i : (t /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + n : i / 2 * (-Math.pow(2, -10 * --t) + 2) + n
  },
  easeInCirc: function(e, t, n, i, r) {
    return -i * (Math.sqrt(1 - (t /= r) * t) - 1) + n
  },
  easeOutCirc: function(e, t, n, i, r) {
    return i * Math.sqrt(1 - (t = t / r - 1) * t) + n
  },
  easeInOutCirc: function(e, t, n, i, r) {
    return (t /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + n : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
  },
  easeInElastic: function(e, t, n, i, r) {
    var s = 1.70158,
      o = 0,
      a = i;
    if (0 == t) return n;
    if (1 == (t /= r)) return n + i;
    if (o || (o = .3 * r), a < Math.abs(i)) {
      a = i;
      var s = o / 4
    } else var s = o / (2 * Math.PI) * Math.asin(i / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - s) * Math.PI / o)) + n
  },
  easeOutElastic: function(e, t, n, i, r) {
    var s = 1.70158,
      o = 0,
      a = i;
    if (0 == t) return n;
    if (1 == (t /= r)) return n + i;
    if (o || (o = .3 * r), a < Math.abs(i)) {
      a = i;
      var s = o / 4
    } else var s = o / (2 * Math.PI) * Math.asin(i / a);
    return a * Math.pow(2, -10 * t) * Math.sin(2 * (t * r - s) * Math.PI / o) + i + n
  },
  easeInOutElastic: function(e, t, n, i, r) {
    var s = 1.70158,
      o = 0,
      a = i;
    if (0 == t) return n;
    if (2 == (t /= r / 2)) return n + i;
    if (o || (o = .3 * r * 1.5), a < Math.abs(i)) {
      a = i;
      var s = o / 4
    } else var s = o / (2 * Math.PI) * Math.asin(i / a);
    return 1 > t ? -.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin(2 * (t * r - s) * Math.PI / o) + n : a * Math.pow(2, -10 * (t -= 1)) * Math.sin(2 * (t * r - s) * Math.PI / o) * .5 + i + n
  },
  easeInBack: function(e, t, n, i, r, o) {
    return void 0 == o && (o = 1.70158), i * (t /= r) * t * ((o + 1) * t - o) + n
  },
  easeOutBack: function(e, t, n, i, r, o) {
    return void 0 == o && (o = 1.70158), i * ((t = t / r - 1) * t * ((o + 1) * t + o) + 1) + n
  },
  easeInOutBack: function(e, t, n, i, r, o) {
    return void 0 == o && (o = 1.70158), (t /= r / 2) < 1 ? i / 2 * t * t * (((o *= 1.525) + 1) * t - o) + n : i / 2 * ((t -= 2) * t * (((o *= 1.525) + 1) * t + o) + 2) + n
  },
  easeInBounce: function(e, t, n, i, r) {
    return i - jQuery.easing.easeOutBounce(e, r - t, 0, i, r) + n
  },
  easeOutBounce: function(e, t, n, i, r) {
    return (t /= r) < 1 / 2.75 ? 7.5625 * i * t * t + n : 2 / 2.75 > t ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : 2.5 / 2.75 > t ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
  },
  easeInOutBounce: function(e, t, n, i, r) {
    return r / 2 > t ? .5 * jQuery.easing.easeInBounce(e, 2 * t, 0, i, r) + n : .5 * jQuery.easing.easeOutBounce(e, 2 * t - r, 0, i, r) + .5 * i + n
  }
});
! function(e) {
  var n, i, t;
  return t = 'resizeEnd', i = {
    delay: 250
  }, n = function(n, r, o) {
    return 'function' == typeof r && (o = r, r = {}), o = o || null, this.element = n, this.settings = e.extend({}, i, r), this.g$ = i, this.v$ = t, this.a$ = !1, this.f$ = o, this.init()
  }, n.prototype = {
    init: function() {
      var n, t;
      return t = this, n = e(this.element), n.on('resize', function() {
        return t.initResize()
      })
    },
    getUTCDate: function(e) {
      var t;
      return e = e || new Date, t = Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds())
    },
    initResize: function() {
      var e;
      return e = this, e.controlTime = e.getUTCDate(), e.a$ === !1 ? (e.a$ = !0, setTimeout(function() {
        return e.runCallback(e)
      }, e.settings.delay)) : void 0
    },
    runCallback: function(e) {
      var t;
      return t = e.getUTCDate(), t - e.controlTime < e.settings.delay ? setTimeout(function() {
        return e.runCallback(e)
      }, e.settings.delay) : (e.a$ = !1, e.f$())
    }
  }, e.fn[t] = function(i, r) {
    return this.each(function() {
      return e.data(this, 'plugin_' + t) ? void 0 : e.data(this, 'plugin_' + t, new n(this, i, r))
    })
  }
}(jQuery, window, document);
(function(e, t, n) {
  e.fn.backstretch = function(i, r) {
    (i === n || 0 === i.length) && e.error('No images were supplied for Backstretch');
    0 === e(t).scrollTop() && t.scrollTo(0, 0);
    return this.each(function() {
      var n = e(this),
        t = n.data('backstretch');
      if (t) {
        if ('string' == typeof i && 'function' == typeof t[i]) {
          t[i](r);
          return
        };
        r = e.extend(t.options, r);
        t.destroy(!0)
      };
      t = new l(this, i, r);
      n.data('backstretch', t)
    })
  };
  e.backstretch = function(t, n) {
    return e('body').backstretch(t, n).data('backstretch')
  };
  e.expr[':'].backstretch = function(t) {
    return e(t).data('backstretch') !== n
  };
  e.fn.backstretch.defaults = {
    centeredX: !0,
    centeredY: !0,
    duration: 5E3,
    fade: 0
  };
  var f = {
      left: 0,
      top: 0,
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      height: '100%',
      width: '100%',
      zIndex: -999999
    },
    d = {
      position: 'absolute',
      display: 'none',
      margin: 0,
      padding: 0,
      border: 'none',
      width: 'auto',
      height: 'auto',
      maxHeight: 'none',
      maxWidth: 'none',
      zIndex: -999999
    },
    l = function(n, i, r) {
      this.options = e.extend({}, e.fn.backstretch.defaults, r || {});
      this.images = e.isArray(i) ? i : [i];
      e.each(this.images, function() {
        e('<img />')[0].src = this
      });
      this.isBody = n === document.body;
      this.e$ = e(n);
      this.o$ = this.isBody ? u ? e(t) : e(document) : this.e$;
      n = this.e$.children('.backstretch').first();
      this.t$ = n.length ? n : e('<div class="backstretch"></div>').css(f).appendTo(this.e$);
      this.isBody || (n = this.e$.css('position'), i = this.e$.css('zIndex'), this.e$.css({
        position: 'static' === n ? 'relative' : n,
        zIndex: 'auto' === i ? 0 : i,
        background: 'none'
      }), this.t$.css({
        zIndex: -999998
      }));
      this.t$.css({
        position: this.isBody && u ? 'fixed' : 'absolute'
      });
      this.index = 0;
      this.show(this.index);
      e(t).on('resize.backstretch', e.proxy(this.resize, this)).on('orientationchange.backstretch', e.proxy(function() {
        this.isBody && 0 === t.pageYOffset && (t.scrollTo(0, 1), this.resize())
      }, this))
    };
  l.prototype = {
    resize: function() {
      try {
        var s = {
            left: 0,
            top: 0
          },
          a = this.isBody ? this.o$.width() : this.o$.innerWidth(),
          o = a,
          r = this.isBody ? t.innerHeight ? t.innerHeight : this.o$.height() : this.o$.innerHeight(),
          n = o / this.n$.data('ratio'),
          i;
        n >= r ? (i = (n - r) / 2, this.options.centeredY && (s.top = '-' + i + 'px')) : (n = r, o = n * this.n$.data('ratio'), i = (o - a) / 2, this.options.centeredX && (s.left = '-' + i + 'px'));
        this.t$.css({
          width: a,
          height: r
        }).find('img:not(.deleteable)').css({
          width: o,
          height: n
        }).css(s)
      } catch (e) {};
      return this
    },
    show: function(t) {
      if (!(Math.abs(t) > this.images.length - 1)) {
        var n = this,
          r = n.t$.find('img').addClass('deleteable'),
          i = {
            relatedTarget: n.e$[0]
          };
        n.e$.trigger(e.Event('backstretch.before', i), [n, t]);
        this.index = t;
        clearInterval(n.interval);
        n.n$ = e('<img />').css(d).bind('load', function(o) {
          var a = this.width || e(o.target).width();
          o = this.height || e(o.target).height();
          e(this).data('ratio', a / o);
          e(this).fadeIn(n.options.speed || n.options.fade, function() {
            r.remove();
            n.paused || n.cycle();
            e(['after', 'show']).each(function() {
              n.e$.trigger(e.Event('backstretch.' + this, i), [n, t])
            })
          });
          n.resize()
        }).appendTo(n.t$);
        n.n$.attr('src', n.images[t]);
        return n
      }
    },
    next: function() {
      return this.show(this.index < this.images.length - 1 ? this.index + 1 : 0)
    },
    prev: function() {
      return this.show(0 === this.index ? this.images.length - 1 : this.index - 1)
    },
    pause: function() {
      this.paused = !0;
      return this
    },
    resume: function() {
      this.paused = !1;
      this.next();
      return this
    },
    cycle: function() {
      1 < this.images.length && (clearInterval(this.interval), this.interval = setInterval(e.proxy(function() {
        this.paused || this.next()
      }, this), this.options.duration));
      return this
    },
    destroy: function(n) {
      e(t).off('resize.backstretch orientationchange.backstretch');
      clearInterval(this.interval);
      n || this.t$.remove();
      this.e$.removeData('backstretch')
    }
  };
  var u, r = navigator.userAgent,
    c = navigator.platform,
    i = r.match(/AppleWebKit\/([0-9]+)/),
    i = !!i && i[1],
    a = r.match(/Fennec\/([0-9]+)/),
    a = !!a && a[1],
    s = r.match(/Opera Mobi\/([0-9]+)/),
    h = !!s && s[1],
    o = r.match(/MSIE ([0-9]+)/),
    o = !!o && o[1];
  u = !((-1 < c.indexOf('iPhone') || -1 < c.indexOf('iPad') || -1 < c.indexOf('iPod')) && i && 534 > i || t.operamini && '[object OperaMini]' === {}.toString.call(t.operamini) || s && 7458 > h || -1 < r.indexOf('Android') && i && 533 > i || a && 6 > a || 'palmGetResource' in t && i && 534 > i || -1 < r.indexOf('MeeGo') && -1 < r.indexOf('NokiaBrowser/8.5.0') || o && 6 >= o)
})(jQuery, window);

function setLocation(e) {
  try {
    history.pushState(null, null, e);
    return !1
  } catch (t) {};
  location.hash = '#' + e
};
! function(e, t, i, n, r) {
  'use strict';

  function Ot(e) {
    var t = 'bez_' + n.makeArray(arguments).join('_').replace('.', 'p');
    if ('function' != typeof n.easing[t]) {
      var i = function(e, t) {
        var r = [null, null],
          i = [null, null],
          n = [null, null],
          o = function(o, a) {
            return n[a] = 3 * e[a], i[a] = 3 * (t[a] - e[a]) - n[a], r[a] = 1 - n[a] - i[a], o * (n[a] + o * (i[a] + o * r[a]))
          },
          s = function(e) {
            return n[0] + e * (2 * i[0] + 3 * r[0] * e)
          },
          a = function(e) {
            for (var n, t = e, i = 0; ++i < 14 && (n = o(t, 0) - e, !(Math.abs(n) < .001));) t -= n / s(t);
            return t
          };
        return function(e) {
          return o(a(e), 1)
        }
      };
      n.easing[t] = function(t, n, r, o, a) {
        return o * i([e[0], e[1]], [e[2], e[3]])(n / a) + r
      }
    };
    return t
  };

  function c() {};

  function f(e, t, n) {
    return Math.max(isNaN(t) ? -1 / 0 : t, Math.min(isNaN(n) ? 1 / 0 : n, e))
  };

  function Rt(e) {
    return e.match(/ma/) && e.match(/-?\d+(?!d)/g)[e.match(/3d/) ? 12 : 4]
  };

  function Bt(e) {
    return v ? +Rt(e.css('transform')) : +e.css('left').replace('px', '')
  };

  function B(e, t) {
    var n = {};
    return v ? n.transform = 'translate3d(' + (e + (t ? .001 : 0)) + 'px,0,0)' : n.left = e, n
  };

  function V(e) {
    return {
      'transition-duration': e + 'ms'
    }
  };

  function d(e, t) {
    return +String(e).replace(t || 'px', '') || r
  };

  function j(e) {
    return /%$/.test(e) && d(e, '%')
  };

  function k(e) {
    return (!!d(e) || !!d(e, '%')) && e
  };

  function H(e, t, n, i) {
    return (e - (i || 0)) * (t + (n || 0))
  };

  function Qe(e, t, n, i) {
    return -Math.round(e / (t + (n || 0)) - (i || 0))
  };

  function Ge(e) {
    var t = e.data();
    if (!t.tEnd) {
      var n = e[0],
        i = {
          WebkitTransition: 'webkitTransitionEnd',
          MozTransition: 'transitionend',
          OTransition: 'oTransitionEnd otransitionend',
          msTransition: 'MSTransitionEnd',
          transition: 'transitionend'
        };
      n.addEventListener(i[fe.prefixed('transition')], function(e) {
        t.tProp && e.propertyName.match(t.tProp) && t.onEndFn()
      }, !1), t.tEnd = !0
    }
  };

  function Ve(e, t, n, i) {
    var o, r = e.data();
    r && (r.onEndFn = function() {
      o || (o = !0, clearTimeout(r.tT), n())
    }, r.tProp = t, clearTimeout(r.tT), r.tT = setTimeout(function() {
      r.onEndFn()
    }, 1.5 * i), Ge(e))
  };

  function te(e, t, n) {
    if (e.length) {
      var i = e.data();
      v ? (e.css(V(0)), i.onEndFn = c, clearTimeout(i.tT)) : e.stop();
      var r = ve(t, function() {
        return Bt(e)
      });
      return e.css(B(r, n)), r
    }
  };

  function ve() {
    for (var t, e = 0, n = arguments.length; n > e && (t = e ? arguments[e]() : arguments[e], 'number' != typeof t); e++);
    return t
  };

  function ge(e, t) {
    return Math.round(e + (t - e) / 1.5)
  };

  function A() {
    return A.p = A.p || ('https://' === i.protocol ? 'https://' : 'http://'), A.p
  };

  function ct(e) {
    var n = t.createElement('a');
    return n.href = e, n
  };

  function we(e, t) {
    if ('string' != typeof e) return e;
    e = ct(e);
    var n, i;
    if (e.host.match(/youtube\.com/) && e.search) {
      if (n = e.search.split('v=')[1]) {
        var r = n.indexOf('&'); - 1 !== r && (n = n.substring(0, r)), i = 'youtube'
      }
    } else e.host.match(/youtube\.com|youtu\.be/) ? (n = e.pathname.replace(/^\/(embed\/|v\/)?/, '').replace(/\/.*/, ''), i = 'youtube') : e.host.match(/vimeo\.com/) && (i = 'vimeo', n = e.pathname.replace(/^\/(video\/)?/, '').replace(/\/.*/, ''));
    return n && i || !t || (n = e.href, i = 'custom'), n ? {
      id: n,
      type: i,
      s: e.search.replace(/^\?/, '')
    } : !1
  };

  function at(e, t, i) {
    var a, o, r = e.video;
    return 'youtube' === r.type ? (o = A() + 'img.youtube.com/vi/' + r.id + '/default.jpg', a = o.replace(/\/default.jpg$/, '/hqdefault.jpg'), e.thumbsReady = !0) : 'vimeo' === r.type ? n.ajax({
      url: A() + 'vimeo.com/api/v2/video/' + r.id + '.json',
      dataType: 'jsonp',
      success: function(n) {
        e.thumbsReady = !0, Ce(t, {
          img: n[0].thumbnail_large,
          thumb: n[0].thumbnail_small
        }, e.i, i)
      }
    }) : e.thumbsReady = !0, {
      img: a,
      thumb: o
    }
  };

  function Ce(e, t, i, r) {
    for (var a = 0, c = e.length; c > a; a++) {
      var s = e[a];
      if (s.i === i && s.thumbsReady) {
        var o = {
          videoReady: !0
        };
        o[u] = o[N] = o[O] = !1, r.splice(a, 1, n.extend({}, s, o, t));
        break
      }
    }
  };

  function Ke(e) {
    function r(e, i, r) {
      var l = e.children('img').eq(0),
        o = e.attr('href'),
        c = e.attr('src'),
        u = l.attr('src'),
        s = i.video,
        a = r ? we(o, s === !0) : !1;
      a ? o = !1 : a = s, t(e, l, n.extend(i, {
        video: a,
        img: i.img || o || c || u,
        thumb: i.thumb || u || c || o
      }))
    };

    function t(e, t, i) {
      var a = i.thumb && i.img !== i.thumb,
        o = d(i.width || e.attr('width')),
        r = d(i.height || e.attr('height'));
      n.extend(i, {
        width: o,
        height: r,
        thumbratio: Le(i.thumbratio || d(i.thumbwidth || t && t.attr('width') || a || o) / d(i.thumbheight || t && t.attr('height') || a || r))
      })
    };
    var i = [];
    return e.children().each(function() {
      var e = n(this),
        o = G(n.extend(e.data(), {
          id: e.attr('id')
        }));
      if (e.is('a, img')) r(e, o, !0);
      else {
        if (e.is(':empty')) return;
        t(e, null, n.extend(o, {
          html: this,
          d$: e.html()
        }))
      };
      i.push(o)
    }), i
  };

  function ut(e) {
    return 0 === e.offsetWidth && 0 === e.offsetHeight
  };

  function ot(e) {
    return !n.contains(t.documentElement, e)
  };

  function M(e, t, n) {
    e() ? t() : setTimeout(function() {
      M(e, t)
    }, n || 100)
  };

  function et(e) {
    i.replace(i.protocol + '//' + i.host + i.pathname.replace(/^\/?/, '/') + i.search + '#' + e)
  };

  function se(e, t, n) {
    var r = e.data(),
      i = r.measures;
    if (i && (!r.l || r.l.W !== i.width || r.l.H !== i.height || r.l.r !== i.ratio || r.l.w !== t.w || r.l.h !== t.h || r.l.m !== n)) {
      var o = i.width,
        a = i.height,
        d = t.w / t.h,
        u = i.ratio >= d,
        s = 'scaledown' === n,
        l = 'contain' === n,
        c = 'cover' === n;
      u && (s || l) || !u && c ? (o = f(t.w, 0, s ? o : 1 / 0), a = o / i.ratio) : (u && c || !u && (s || l)) && (a = f(t.h, 0, s ? a : 1 / 0), o = a * i.ratio), e.css({
        width: Math.ceil(o),
        height: Math.ceil(a),
        marginLeft: Math.floor(-o / 2),
        marginTop: Math.floor(-a / 2)
      }), r.l = {
        W: i.width,
        H: i.height,
        r: i.ratio,
        w: t.w,
        h: t.h,
        m: n
      }
    };
    return !0
  };

  function tt(e, t) {
    var n = e[0];
    n.styleSheet ? n.styleSheet.cssText = t : e.html(t)
  };

  function L(e, t, n) {
    return t === n ? !1 : t >= e ? 'left' : e >= n ? 'right' : 'left right'
  };

  function de(e, t, n, i) {
    if (!n) return !1;
    if (!isNaN(e)) return e - (i ? 0 : 1);
    for (var o, r = 0, a = t.length; a > r; r++) {
      var s = t[r];
      if (s.id === e) {
        o = r;
        break
      }
    };
    return o
  };

  function it(e, t, i) {
    i = i || {}, e.each(function() {
      var o, r = n(this),
        e = r.data();
      e.clickOn || (e.clickOn = !0, n.extend(We(r, {
        onStart: function(e) {
          o = e, (i.onStart || c).call(this, e)
        },
        onMove: i.onMove || c,
        onTouchEnd: i.onTouchEnd || c,
        onEnd: function(e) {
          e.moved || t.call(this, o)
        }
      }), {
        noMove: !0
      }))
    })
  };

  function a(e, t) {
    return '<div class="' + e + '">' + (t || '') + '</div>'
  };

  function be(e) {
    for (var t = e.length; t;) {
      var n = Math.floor(Math.random() * t--),
        i = e[t];
      e[t] = e[n], e[n] = i
    };
    return e
  };

  function Be(e) {
    return '[object Array]' == Object.prototype.toString.call(e) && n.map(e, function(e) {
      return n.extend({}, e)
    })
  };

  function Re(e, t) {
    y.scrollLeft(e).scrollTop(t)
  };

  function G(e) {
    if (e) {
      var t = {};
      return n.each(e, function(e, n) {
        t[e.toLowerCase()] = n
      }), t
    }
  };

  function Le(e) {
    if (e) {
      var t = +e;
      return isNaN(t) ? (t = e.split('/'), +t[0] / +t[1] || r) : t
    }
  };

  function p(e, t) {
    e.preventDefault(), t && e.stopPropagation()
  };

  function z(e) {
    return e ? '>' : '<'
  };

  function x(e, t) {
    var a = e.data(),
      r = Math.round(t.pos),
      i = function() {
        a.sliding = !1, (t.onEnd || c)()
      };
    'undefined' != typeof t.overPos && t.overPos !== t.pos && (r = t.overPos, i = function() {
      x(e, n.extend({}, t, {
        overPos: t.pos,
        time: Math.max(T, t.time / 2)
      }))
    });
    var o = n.extend(B(r, t.i$), t.width && {
      width: t.width
    });
    a.sliding = !0, v ? (e.css(n.extend(V(t.time), o)), t.time > 10 ? Ve(e, 'transform', i, t.time) : i()) : e.stop().animate(o, t.time, It, i)
  };

  function De(e, t, i, r, o, a) {
    var l = 'undefined' != typeof a;
    if (l || (o.push(arguments), Array.prototype.push.call(arguments, o.length), !(o.length > 1))) {
      e = e || n(e), t = t || n(t);
      var h = e[0],
        f = t[0],
        u = 'crossfade' === r.method,
        s = function() {
          if (!s.done) {
            s.done = !0;
            var e = (l || o.shift()) && o.shift();
            e && De.apply(this, e), (r.onEnd || c)(!!e)
          }
        },
        d = r.time / (a || 1);
      i.not(e.addClass(ne).removeClass(X)).not(t.addClass(X).removeClass(ne)).removeClass(ne + ' ' + X), e.stop(), t.stop(), u && f && e.fadeTo(0, 0), e.fadeTo(u ? d : 1, 1, u && s), t.fadeTo(d, 0, s), h && u || f || s()
    }
  };

  function Fe(e) {
    var t = (e.touches || [])[0] || e;
    e._x = t.pageX, e._y = t.clientY, e.l$ = n.now()
  };

  function We(i, r) {
    function x(e) {
      return f = n(e.target), o.checked = k = b = v = !1, s || o.flow || e.touches && e.touches.length > 1 || e.which > 1 || oe && oe.type !== e.type && ie || (k = r.select && f.is(r.select, a)) ? k : (d = 'touchstart' === e.type, b = f.is('a, a *', a), T = o.noMove || o.noSwipe ? 16 : o.snap ? 0 : 4, Fe(e), h = oe = e, Me = e.type.replace(/down|start/, 'move').replace(/Down/, 'Move'), C = o.control, (r.onStart || c).call(a, e, {
        control: C,
        c$: f
      }), s = o.flow = !0, (!d || o.go) && p(e), void 0)
    };

    function y(e) {
      if (e.touches && e.touches.length > 1 || m && !e.isPrimary || Me !== e.type || !s) return s && u(), (r.onTouchEnd || c)(), void 0;
      Fe(e);
      var l = Math.abs(e._x - h._x),
        i = Math.abs(e._y - h._y),
        n = l - i,
        t = (o.go || o.x || n >= 0) && !o.noSwipe,
        f = 0 > n;
      d && !o.checked ? (s = t) && p(e) : (p(e), (r.onMove || c).call(a, e, {
        touch: d
      })), !v && Math.sqrt(Math.pow(l, 2) + Math.pow(i, 2)) > T && (v = !0), o.checked = o.checked || t || f
    };

    function u(e) {
      (r.onTouchEnd || c)();
      var t = s;
      o.control = s = !1, t && (o.flow = !1), !t || b && !o.checked || (e && p(e), ie = !0, clearTimeout(He), He = setTimeout(function() {
        ie = !1
      }, 1e3), (r.onEnd || c).call(a, {
        moved: v,
        c$: f,
        control: C,
        touch: d,
        startEvent: h,
        aborted: !e || 'MSPointerCancel' === e.type
      }))
    };

    function E() {
      o.flow || setTimeout(function() {
        o.flow = !0
      }, 10)
    };

    function w() {
      o.flow && setTimeout(function() {
        o.flow = !1
      }, g)
    };
    var s, h, f, C, d, k, b, T, v, a = i[0],
      o = {};
    return m ? (a[l]('MSPointerDown', x, !1), t[l]('MSPointerMove', y, !1), t[l]('MSPointerCancel', u, !1), t[l]('MSPointerUp', u, !1)) : (a[l] && (a[l]('touchstart', x, !1), a[l]('touchmove', y, !1), a[l]('touchend', u, !1), t[l]('touchstart', E, !1), t[l]('touchend', w, !1), t[l]('touchcancel', w, !1), e[l]('scroll', w, !1)), i.on('mousedown', x), I.on('mousemove', y).on('mouseup', u)), i.on('click', 'a', function(e) {
      o.checked && p(e)
    }), o
  };

  function qe(e, t) {
    function v(n) {
      d = !0, p = l = n._x, E = n.l$, u = [
        [E, p]
      ], b = i = a.noMove ? 0 : te(e, (t.getPos || c)(), t.i$), (t.onStart || c).call(w, n)
    };

    function M(e, t) {
      r = a.min, o = a.max, s = a.snap, k = e.altKey, d = y = !1, h = t.control, h || q.sliding || v(e)
    };

    function A(n, s) {
      d || (h = !1, v(n)), a.noSwipe || (l = n._x, u.push([n.l$, l]), i = b - (p - l), C = L(i, r, o), r >= i ? i = ge(i, r) : i >= o && (i = ge(i, o)), a.noMove || (e.css(B(i, t.i$)), y || (y = !0, s.touch || m || e.addClass(he)), (t.onMove || c).call(w, n, {
        pos: i,
        edge: C
      })))
    };

    function S(a) {
      if (!h) {
        d || v(a.startEvent), a.touch || m || e.removeClass(he), x = n.now();
        for (var j, M, F, I, y, C, p, S, A, L = x - g, N = null, E = T, O = t.friction, q = u.length - 1; q >= 0; q--) {
          if (j = u[q][0], M = Math.abs(j - L), null === N || F > M) N = j, I = u[q][1];
          else if (N === L || M > F) break;
          F = M
        };
        p = f(i, r, o);
        var P = I - l,
          D = P >= 0,
          B = x - N,
          R = B > g,
          H = !R && i !== b && p === i;
        s && (p = f(Math[H ? D ? 'floor' : 'ceil' : 'round'](i / s) * s, r, o), r = o = p), H && (s || p === i) && (A = -(P / B), E *= f(Math.abs(A), t.timeLow, t.timeHigh), y = Math.round(i + A * E / O), s || (p = y), (!D && y > o || D && r > y) && (C = D ? r : o, S = y - C, s || (p = C), S = f(p + .03 * S, C - 50, C + 50), E = Math.abs((i - S) / (A / O)))), E *= k ? 10 : 1, (t.onEnd || c).call(w, n.extend(a, {
          moved: a.moved || R && s,
          pos: i,
          newPos: p,
          overPos: S,
          time: E
        }))
      }
    };
    var p, l, b, i, C, u, E, x, r, o, s, k, h, y, d, w = e[0],
      q = e.data(),
      a = {};
    return a = n.extend(We(t.t$, {
      onStart: M,
      onMove: A,
      onTouchEnd: t.onTouchEnd,
      onEnd: S,
      select: t.select
    }), a)
  };

  function Ae(e, t) {
    var r, a, s, o = e[0],
      i = {
        prevent: {}
      };
    return o[l] && o[l](Xe, function(e) {
      var h = e.wheelDeltaY || -1 * e.deltaY || 0,
        u = e.wheelDeltaX || -1 * e.deltaX || 0,
        f = Math.abs(u) > Math.abs(h),
        o = z(0 > u),
        m = a === o,
        l = n.now(),
        d = g > l - s;
      a = o, s = l, f && i.ok && (!i.prevent[o] || r) && (p(e, !0), r && m && d || (t.shift && (r = !0, clearTimeout(i.t), i.t = setTimeout(function() {
        r = !1
      }, Ye)), (t.onEnd || c)(e, t.shift ? o : u)))
    }, !1), i
  };

  function Se() {
    n.each(n.Fotorama.instances, function(e, t) {
      t.index = e
    })
  };

  function Ue(e) {
    n.Fotorama.instances.push(e), Se()
  };

  function Je(e) {
    n.Fotorama.instances.splice(e.index, 1), Se()
  };
  var o = 'fotorama',
    E = 'fullscreen',
    h = o + '__wrap',
    gt = h + '--css2',
    mt = h + '--css3',
    ze = h + '--video',
    ht = h + '--fade',
    pt = h + '--slide',
    At = h + '--no-controls',
    St = h + '--no-shadows',
    Tt = h + '--pan-y',
    Ft = h + '--rtl',
    Pe = h + '--only-active',
    Q = o + '__stage',
    je = Q + '__frame',
    kt = je + '--video',
    Ct = Q + '__shaft',
    Oe = o + '__grab',
    Et = o + '__pointer',
    C = o + '__arr',
    Ne = C + '--disabled',
    qt = C + '--prev',
    Mt = C + '--next',
    w = o + '__nav',
    bt = w + '-wrap',
    xt = w + '__shaft',
    U = w + '--dots',
    W = w + '--thumbs',
    S = w + '__frame',
    ft = S + '--dot',
    dt = S + '--thumb',
    Ie = o + '__fade',
    X = Ie + '-front',
    ne = Ie + '-rear',
    wt = o + '__shadow',
    Y = wt + 's',
    yt = Y + '--left',
    vt = Y + '--right',
    K = o + '__active',
    ee = o + '__select',
    Dt = o + '--hidden',
    ue = o + '--fullscreen',
    Nt = o + '__fullscreen-icon',
    Z = o + '__error',
    J = o + '__loading',
    D = o + '__loaded',
    zt = D + '--full',
    Xt = D + '--img',
    he = o + '__grabbing',
    Te = o + '__img',
    Yt = Te + '--full',
    Jt = o + '__dot',
    pe = o + '__thumb',
    Vt = pe + '-border',
    Qt = o + '__html',
    ke = o + '__video',
    xe = ke + '-play',
    Wt = ke + '-close',
    Ht = o + '__caption',
    Lt = o + '__caption__wrap',
    lt = o + '__spinner',
    q = n && n.fn.jquery.split('.');
  if (!q || q[0] < 1 || 1 == q[0] && q[1] < 8) throw 'Fotorama requires jQuery 1.8 or later and will not run without it.';
  var ce = {},
    fe = function(e, t, n) {
      function A(e) {
        v.cssText = e
      };

      function r(e, t) {
        return typeof e === t
      };

      function b(e, t) {
        return !!~('' + e).indexOf(t)
      };

      function m(e, t) {
        for (var r in e) {
          var i = e[r];
          if (!b(i, '-') && v[i] !== n) return 'pfx' == t ? i : !0
        };
        return !1
      };

      function C(e, t, i) {
        for (var a in e) {
          var o = t[e[a]];
          if (o !== n) return i === !1 ? e[a] : r(o, 'function') ? o.bind(i || t) : o
        };
        return !1
      };

      function c(e, t, n) {
        var i = e.charAt(0).toUpperCase() + e.slice(1),
          o = (e + ' ' + x.join(i + ' ') + i).split(' ');
        return r(t, 'string') || r(t, 'undefined') ? m(o, t) : (o = (e + ' ' + y.join(i + ' ') + i).split(' '), C(o, t, n))
      };
      var T, s, h, E = '2.6.2',
        i = {},
        o = t.documentElement,
        a = 'modernizr',
        g = t.createElement(a),
        v = g.style,
        k = ({}.toString, ' -webkit- -moz- -o- -ms- '.split(' ')),
        w = 'Webkit Moz O ms',
        x = w.split(' '),
        y = w.toLowerCase().split(' '),
        u = {},
        p = [],
        l = p.slice,
        S = function(e, n, i, r) {
          var f, d, l, h, u = t.createElement('div'),
            c = t.body,
            s = c || t.createElement('body');
          if (parseInt(i, 10))
            for (; i--;) l = t.createElement('div'), l.id = r ? r[i] : a + (i + 1), u.appendChild(l);
          return f = ['&#173;', '<style id="s', a, '">', e, '</style>'].join(''), u.id = a, (c ? u : s).innerHTML += f, s.appendChild(u), c || (s.style.background = '', s.style.overflow = 'hidden', h = o.style.overflow, o.style.overflow = 'hidden', o.appendChild(s)), d = n(u, e), c ? u.parentNode.removeChild(u) : (s.parentNode.removeChild(s), o.style.overflow = h), !!d
        },
        d = {}.hasOwnProperty;
      h = r(d, 'undefined') || r(d.call, 'undefined') ? function(e, t) {
        return t in e && r(e.constructor.prototype[t], 'undefined')
      } : function(e, t) {
        return d.call(e, t)
      }, Function.prototype.bind || (Function.prototype.bind = function(e) {
        var t = this;
        if ('function' != typeof t) throw new TypeError;
        var n = l.call(arguments, 1),
          i = function() {
            if (this instanceof i) {
              var o = function() {};
              o.prototype = t.prototype;
              var a = new o,
                r = t.apply(a, n.concat(l.call(arguments)));
              return Object(r) === r ? r : a
            };
            return t.apply(e, n.concat(l.call(arguments)))
          };
        return i
      }), u.csstransforms3d = function() {
        var e = !!c('perspective');
        return e
      };
      for (var f in u) h(u, f) && (s = f.toLowerCase(), i[s] = u[f](), p.push((i[s] ? '' : 'no-') + s));
      return i.addTest = function(e, t) {
        if ('object' == typeof e)
          for (var r in e) h(e, r) && i.addTest(r, e[r]);
        else {
          if (e = e.toLowerCase(), i[e] !== n) return i;
          t = 'function' == typeof t ? t() : t, 'undefined' != typeof enableClasses && enableClasses && (o.className += ' ' + (t ? '' : 'no-') + e), i[e] = t
        };
        return i
      }, A(''), g = T = null, i.w$ = E, i.b$ = k, i.E$ = y, i.C$ = x, i.testProp = function(e) {
        return m([e])
      }, i.testAllProps = c, i.testStyles = S, i.prefixed = function(e, t, n) {
        return t ? c(e, t, n) : c(e, 'pfx')
      }, i
    }(e, t),
    s = {
      ok: !1,
      is: function() {
        return !1
      },
      request: function() {},
      cancel: function() {},
      event: '',
      prefix: ''
    },
    le = 'webkit moz o ms khtml'.split(' ');
  if ('undefined' != typeof t.cancelFullScreen) s.ok = !0;
  else
    for (var re = 0, Gt = le.length; Gt > re; re++)
      if (s.prefix = le[re], 'undefined' != typeof t[s.prefix + 'CancelFullScreen']) {
        s.ok = !0;
        break
      };
  s.ok && (s.event = s.prefix + 'fullscreenchange', s.is = function() {
    switch (this.prefix) {
      case '':
        return t.fullScreen;
      case 'webkit':
        return t.webkitIsFullScreen;
      default:
        return t[this.prefix + 'FullScreen']
    }
  }, s.request = function(e) {
    return '' === this.prefix ? e.requestFullScreen() : e[this.prefix + 'RequestFullScreen']()
  }, s.cancel = function() {
    return '' === this.prefix ? t.cancelFullScreen() : t[this.prefix + 'CancelFullScreen']()
  });
  var ye, jt = {
      lines: 12,
      length: 5,
      width: 2,
      radius: 7,
      corners: 1,
      rotate: 15,
      color: 'rgba(128, 128, 128, .75)',
      hwaccel: !0
    },
    Ut = {
      top: 'auto',
      left: 'auto',
      className: ''
    };
  ! function(e, t) {
    ye = t()
  }(this, function() {
    function o(e, n) {
      var i, r = t.createElement(e || 'div');
      for (i in n) r[i] = n[i];
      return r
    };

    function n(e) {
      for (var t = 1, n = arguments.length; n > t; t++) e.appendChild(arguments[t]);
      return e
    };

    function g(e, t, n, i) {
      var o = ['opacity', t, ~~(100 * e), n, i].join('-'),
        r = .01 + 100 * (n / i),
        s = Math.max(1 - (1 - e) / t * (100 - r), e),
        u = a.substring(0, a.indexOf('Animation')).toLowerCase(),
        l = u && '-' + u + '-' || '';
      return h[o] || (c.insertRule('@' + l + 'keyframes ' + o + '{0%{opacity:' + s + '}' + r + '%{opacity:' + e + '}' + (r + .01) + '%{opacity:1}' + (r + t) % 100 + '%{opacity:' + e + '}100%{opacity:' + s + '}}', c.cssRules.length), h[o] = 1), o
    };

    function s(e, t) {
      var i, n, o = e.style;
      for (t = t.charAt(0).toUpperCase() + t.slice(1), n = 0; n < p.length; n++)
        if (i = p[n] + t, o[i] !== r) return i;
      return o[t] !== r ? t : void 0
    };

    function e(e, t) {
      for (var n in t) e.style[s(e, n) || n] = t[n];
      return e
    };

    function f(e) {
      for (var t = 1; t < arguments.length; t++) {
        var i = arguments[t];
        for (var n in i) e[n] === r && (e[n] = i[n])
      };
      return e
    };

    function l(e) {
      for (var t = {
          x: e.offsetLeft,
          y: e.offsetTop
        }; e = e.offsetParent;) t.x += e.offsetLeft, t.y += e.offsetTop;
      return t
    };

    function d(e, t) {
      return 'string' == typeof e ? e : e[t % e.length]
    };

    function i(e) {
      return 'undefined' == typeof this ? new i(e) : (this.opts = f(e || {}, i.defaults, v), void 0)
    };

    function m() {
      function t(e, t) {
        return o('<' + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', t)
      };
      c.addRule('.spin-vml', 'behavior:url(#default#VML)'), i.prototype.lines = function(i, r) {
        function c() {
          return e(t('group', {
            coordsize: a + ' ' + a,
            coordorigin: -s + ' ' + -s
          }), {
            width: a,
            height: a
          })
        };

        function u(i, o, a) {
          n(l, n(e(c(), {
            rotation: 360 / r.lines * i + 'deg',
            left: ~~o
          }), n(e(t('roundrect', {
            arcsize: r.corners
          }), {
            width: s,
            height: r.width,
            left: r.radius,
            top: -r.width >> 1,
            filter: a
          }), t('fill', {
            color: d(r.color, i),
            opacity: r.opacity
          }), t('stroke', {
            opacity: 0
          }))))
        };
        var o, s = r.length + r.width,
          a = 2 * s,
          f = 2 * -(r.width + r.length) + 'px',
          l = e(c(), {
            position: 'absolute',
            top: f,
            left: f
          });
        if (r.shadow)
          for (o = 1; o <= r.lines; o++) u(o, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
        for (o = 1; o <= r.lines; o++) u(o);
        return n(i, l)
      }, i.prototype.opacity = function(e, t, n, i) {
        var r = e.firstChild;
        i = i.shadow && i.lines || 0, r && t + i < r.childNodes.length && (r = r.childNodes[t + i], r = r && r.firstChild, r = r && r.firstChild, r && (r.opacity = n))
      }
    };
    var a, p = ['webkit', 'Moz', 'ms', 'O'],
      h = {},
      c = function() {
        var e = o('style', {
          type: 'text/css'
        });
        return n(t.getElementsByTagName('head')[0], e), e.sheet || e.styleSheet
      }(),
      v = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        corners: 1,
        color: '#000',
        direction: 1,
        speed: 1,
        trail: 100,
        opacity: .25,
        fps: 20,
        zIndex: 2e9,
        className: 'spinner',
        top: 'auto',
        left: 'auto',
        position: 'relative'
      };
    i.defaults = {}, f(i.prototype, {
      spin: function(t) {
        this.stop();
        var u, s, i = this,
          n = i.opts,
          r = i.el = e(o(0, {
            className: n.className
          }), {
            position: n.position,
            width: 0,
            zIndex: n.zIndex
          }),
          h = n.radius + n.length + n.width;
        if (t && (t.insertBefore(r, t.firstChild || null), s = l(t), u = l(r), e(r, {
            left: ('auto' == n.left ? s.x - u.x + (t.offsetWidth >> 1) : parseInt(n.left, 10) + h) + 'px',
            top: ('auto' == n.top ? s.y - u.y + (t.offsetHeight >> 1) : parseInt(n.top, 10) + h) + 'px'
          })), r.setAttribute('role', 'progressbar'), i.lines(r, i.opts), !a) {
          var d, f = 0,
            v = (n.lines - 1) * (1 - n.direction) / 2,
            p = n.fps,
            c = p / n.speed,
            g = (1 - n.opacity) / (c * n.trail / 100),
            m = c / n.lines;
          ! function y() {
            f++;
            for (var e = 0; e < n.lines; e++) d = Math.max(1 - (f + (n.lines - e) * m) % c * g, n.opacity), i.opacity(r, e * n.direction + v, d, n);
            i.timeout = i.el && setTimeout(y, ~~(1e3 / p))
          }()
        };
        return i
      },
      stop: function() {
        var e = this.el;
        return e && (clearTimeout(this.timeout), e.parentNode && e.parentNode.removeChild(e), this.el = r), this
      },
      lines: function(t, i) {
        function u(t, n) {
          return e(o(), {
            position: 'absolute',
            width: i.length + i.width + 'px',
            height: i.width + 'px',
            background: t,
            boxShadow: n,
            transformOrigin: 'left',
            transform: 'rotate(' + ~~(360 / i.lines * r + i.rotate) + 'deg) translate(' + i.radius + 'px,0)',
            borderRadius: (i.corners * i.width >> 1) + 'px'
          })
        };
        for (var s, r = 0, c = (i.lines - 1) * (1 - i.direction) / 2; r < i.lines; r++) s = e(o(), {
          position: 'absolute',
          top: 1 + ~(i.width / 2) + 'px',
          transform: i.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: i.opacity,
          animation: a && g(i.opacity, i.trail, c + r * i.direction, i.lines) + ' ' + 1 / i.speed + 's linear infinite'
        }), i.shadow && n(s, e(u('#000', '0 0 4px #000'), {
          top: '2px'
        })), n(t, n(s, u(d(i.color, r), '0 0 1px rgba(0,0,0,.1)')));
        return t
      },
      opacity: function(e, t, n) {
        t < e.childNodes.length && (e.childNodes[t].style.opacity = n)
      }
    });
    var u = e(o('group'), {
      behavior: 'url(#default#VML)'
    });
    return !s(u, 'transform') && u.adj ? m() : a = s(u, 'animation'), i
  });
  var R, b, oe, Me, ie, He, y = n(e),
    I = n(t),
    st = 'quirks' === i.hash.replace('#', ''),
    Ee = fe.csstransforms3d,
    v = Ee && !st,
    rt = Ee || 'CSS1Compat' === t.compatMode,
    me = s.ok,
    Ze = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),
    F = !v || Ze,
    l = 'addEventListener',
    m = e.navigator.msPointerEnabled,
    Xe = 'onwheel' in t.createElement('div') ? 'wheel' : t.onmousewheel !== r ? 'mousewheel' : 'DOMMouseScroll',
    g = 250,
    T = 300,
    Ye = 1400,
    nt = 5e3,
    ae = 2,
    P = 64,
    Zt = 500,
    Pt = 333,
    u = '$stageFrame',
    O = '$navDotFrame',
    N = '$navThumbFrame',
    It = Ot([.1, 0, .25, 1]);
  jQuery.Fotorama = function(e, r) {
    function Mi() {
      n.each(q, function(e, t) {
        if (!t.i) {
          t.i = Ei++;
          var i = we(t.video, !0);
          if (i) {
            var n = {};
            t.video = i, t.img || t.thumb ? t.thumbsReady = !0 : n = at(t, q, c), Ce(q, {
              img: n.img,
              thumb: n.thumb
            }, t.i, c)
          }
        }
      })
    };

    function Li(e) {
      var n = 'keydown.' + o,
        i = 'keydown.' + o + un,
        t = 'resize.' + o + un;
      e ? (I.on(i, function(e) {
        ie && 27 === e.keyCode ? (p(e), Ie(ie, !0, !0)) : (c.fullScreen || r.keyboard && !c.index) && (27 === e.keyCode ? (p(e), c.cancelFullScreen()) : 39 === e.keyCode || 40 === e.keyCode && c.fullScreen ? (p(e), c.show({
          index: '>',
          slow: e.altKey,
          user: !0
        })) : (37 === e.keyCode || 38 === e.keyCode && c.fullScreen) && (p(e), c.show({
          index: '<',
          slow: e.altKey,
          user: !0
        })))
      }), c.index || I.off(n).on(n, 'textarea, input, select', function(e) {
        !b.hasClass(E) && e.stopPropagation()
      }), y.on(t, c.resize)) : (I.off(i), y.off(t))
    };

    function fn(t) {
      t !== fn.f && (t ? (e.html('').addClass(o + ' ' + oi).append(re).before(qn).before(Sn), Ue(c)) : (re.detach(), qn.detach(), Sn.detach(), e.html(fi.urtext).removeClass(oi), Je(c)), Li(t), fn.f = t)
    };

    function Pi() {
      q = c.data = q || Be(r.data) || Ke(e), ne = c.size = q.length, !yn.ok && r.shuffle && be(q), Mi(), A = Mn(A), ne && fn(!0)
    };

    function An() {
      var e = 2 > ne || ie;
      ce.noMove = e || he, ce.noSwipe = e || !r.swipe, Ve.toggleClass(Oe, !ce.noMove && !ce.noSwipe), m && re.toggleClass(Tt, !ce.noSwipe)
    };

    function wi(e) {
      e === !0 && (e = ''), r.autoplay = Math.max(+e || nt, 1.5 * on)
    };

    function dn(e) {
      return e ? 'add' : 'remove'
    };

    function Ni() {
      c.options = r = G(r), he = 'crossfade' === r.transition || 'dissolve' === r.transition, Ee = r.loop && (ne > 2 || he), on = +r.transitionduration || T, Ge = 'rtl' === r.direction;
      var e = {
        add: [],
        remove: []
      };
      ne > 1 ? (ge = r.nav, Vn = 'top' === r.navposition, e.remove.push(ee), vn.toggle(r.arrows)) : (ge = !1, vn.hide()), ui(), mn = new ye(n.extend(jt, r.spinner, Ut, {
        direction: Ge ? -1 : 1
      })), ii(), ei(), r.autoplay && wi(r.autoplay), Fn = d(r.thumbwidth) || P, cn = d(r.thumbheight) || P, gn.ok = nn.ok = r.trackpad && !F, An(), Zn(r, !0), It = 'thumbs' === ge, It ? (Ln(ne, 'navThumb'), Rn = pn, We = N, tt(qn, n.Fotorama.jst.style({
        w: Fn,
        h: cn,
        b: r.thumbborderwidth,
        m: r.thumbmargin,
        s: un,
        q: !rt
      })), ae.addClass(W).removeClass(U)) : 'dots' === ge ? (Ln(ne, 'navDot'), Rn = Dn, We = O, ae.addClass(U).removeClass(W)) : (ge = !1, ae.removeClass(W + ' ' + U)), ge && (Vn ? Bn.insertBefore(oe) : Bn.insertAfter(oe), en.nav = !1, en(Rn, fe, 'nav')), wn = r.allowfullscreen, wn ? (On.appendTo(oe), sn = me && 'native' === wn) : (On.detach(), sn = !1), e[dn(he)].push(ht), e[dn(!he)].push(pt), e[dn(Ge)].push(Ft), an = r.shadows && !F, e[dn(!an)].push(St), re.addClass(e.add.join(' ')).removeClass(e.remove.join(' ')), ji = n.extend({}, r)
    };

    function Ze(e) {
      return 0 > e ? (ne + e % ne) % ne : e >= ne ? e % ne : e
    };

    function Mn(e) {
      return f(e, 0, ne - 1)
    };

    function ri(e) {
      return Ee ? Ze(e) : Mn(e)
    };

    function gi(e) {
      return e > 0 || Ee ? e - 1 : !1
    };

    function vi(e) {
      return ne - 1 > e || Ee ? e + 1 : !1
    };

    function ki() {
      ce.min = Ee ? -1 / 0 : -H(ne - 1, l.w, r.margin, Me), ce.max = Ee ? 1 / 0 : -H(0, l.w, r.margin, Me), ce.snap = l.w + r.margin
    };

    function bi() {
      X.min = Math.min(0, l.W - fe.width()), X.max = 0, fe.toggleClass(Oe, !(X.noMove = X.min === X.max))
    };

    function Tn(e, t, i) {
      if ('number' == typeof e) {
        e = new Array(e);
        var r = !0
      };
      return n.each(e, function(e, n) {
        if (r && (n = e), 'number' == typeof n) {
          var a = q[Ze(n)];
          if (a) {
            var s = '$' + t + 'Frame',
              o = a[s];
            i.call(this, e, n, a, o, s, o && o.data())
          }
        }
      })
    };

    function yi(e, t, n, i) {
      (!En || '*' === En && i === rn) && (e = k(r.width) || k(e) || Zt, t = k(r.height) || k(t) || Pt, c.resize({
        width: e,
        ratio: r.ratio || n || e / t
      }, 0, i === rn ? !0 : '*'))
    };

    function tn(e, t, i, o, a) {
      Tn(e, t, function(e, s, u, d, f, h) {
        function x(e) {
          var t = Ze(s);
          ke(e, {
            index: t,
            src: p,
            frame: q[t]
          })
        };

        function w() {
          v.remove(), n.Fotorama.cache[p] = 'error', u.html && 'stage' === t || !b || b === p ? (!p || u.html || m ? 'stage' === t && (d.trigger('f:load').removeClass(J + ' ' + Z).addClass(D), x('load'), yi()) : (d.trigger('f:error').removeClass(J).addClass(Z), x('error')), h.state = 'error', !(ne > 1 && q[s] === u) || u.html || u.deleted || u.video || m || (u.deleted = !0, c.splice(s, 1))) : (u[C] = p = b, tn([s], t, i, o, !0))
        };

        function T() {
          n.Fotorama.measures[p] = y.measures = n.Fotorama.measures[p] || {
            width: g.width,
            height: g.height,
            ratio: g.width / g.height
          }, yi(y.measures.width, y.measures.height, y.measures.ratio, s), v.off('load error').addClass(Te + (m ? ' ' + Yt : '')).prependTo(d), se(v, i || l, o || u.fit || r.fit), n.Fotorama.cache[p] = h.state = 'loaded', setTimeout(function() {
            d.trigger('f:load').removeClass(J + ' ' + Z).addClass(D + ' ' + (m ? zt : Xt)), 'stage' === t && x('load')
          }, 5)
        };

        function k() {
          var e = 10;
          M(function() {
            return !hn || !e-- && !F
          }, function() {
            T()
          })
        };
        if (d) {
          var m = c.fullScreen && u.full && u.full !== u.img && !h.h$ && 'stage' === t;
          if (!h.n$ || a || m) {
            var g = new Image,
              v = n(g),
              y = v.data();
            h[m ? '$full' : '$img'] = v;
            var C = 'stage' === t ? m ? 'full' : 'img' : 'thumb',
              p = u[C],
              b = m ? null : u['stage' === t ? 'thumb' : 'img'];
            if ('navThumb' === t && (d = h.t$), !p) return w(), void 0;
            n.Fotorama.cache[p] ? ! function E() {
              'error' === n.Fotorama.cache[p] ? w() : 'loaded' === n.Fotorama.cache[p] ? setTimeout(k, 0) : setTimeout(E, 100)
            }() : (n.Fotorama.cache[p] = '*', v.on('load', k).on('error', w)), h.state = '', g.src = p
          }
        }
      })
    };

    function Si(e) {
      si.append(mn.spin().el).appendTo(e)
    };

    function ui() {
      si.detach(), mn && mn.stop()
    };

    function Qn() {
      var e = c.activeFrame[u];
      e && !e.data().state && (Si(e), e.on('f:load f:error', function() {
        e.off('f:load f:error'), ui()
      }))
    };

    function Ln(e, t) {
      Tn(e, t, function(e, i, o, s, u, c) {
        s || (s = o[u] = re[u].clone(), c = s.data(), c.data = o, 'stage' === t ? (o.html && n('<div class="' + Qt + '"></div>').append(o.d$ ? n(o.html).removeAttr('id').html(o.d$) : o.html).appendTo(s), r.captions && o.caption && n(a(Ht, a(Lt, o.caption))).appendTo(s), o.video && s.addClass(kt).append(ai.clone()), In = In.add(s)) : 'navDot' === t ? Dn = Dn.add(s) : 'navThumb' === t && (c.t$ = s.children(':first'), pn = pn.add(s), o.video && s.append(ai.clone())))
      })
    };

    function Hn(e, t, n) {
      return e && e.length && se(e, t, n)
    };

    function Un(e) {
      Tn(e, 'stage', function(e, t, i, o, a, s) {
        if (o) {
          Cn[u][Ze(t)] = o.css(n.extend({
            left: he ? 0 : H(t, l.w, r.margin, Me)
          }, he && V(0))), ot(o[0]) && (o.appendTo(Ve), Ie(i.r$));
          var c = i.fit || r.fit;
          Hn(s.n$, l, c), Hn(s.h$, l, c)
        }
      })
    };

    function Kt(e, t) {
      if ('thumbs' === ge && !isNaN(e)) {
        var r = -e,
          i = -e + l.w;
        pn.each(function() {
          var u = n(this),
            e = u.data(),
            s = e.eq,
            o = {
              h: cn
            },
            a = 'cover';
          o.w = e.w, e.l + e.w < r || e.l > i || Hn(e.n$, o, a) || t && tn([s], 'navThumb', o, a)
        })
      }
    };

    function en(e, t, i) {
      if (!en[i]) {
        var a = 'nav' === i && It,
          o = 0;
        t.append(e.filter(function() {
          for (var t, r = n(this), i = r.data(), e = 0, o = q.length; o > e; e++)
            if (i.data === q[e]) {
              t = !0, i.eq = e;
              break
            };
          return t || r.remove() && !1
        }).sort(function(e, t) {
          return n(e).data().eq - n(t).data().eq
        }).each(function() {
          if (a) {
            var i = n(this),
              t = i.data(),
              e = Math.round(cn * t.data.thumbratio) || Fn;
            t.l = o, t.w = e, i.css({
              width: e
            }), o += e + r.thumbmargin
          }
        })), en[i] = !0
      }
    };

    function Wn(e) {
      return e - pi > l.w / 3
    };

    function Gt(e) {
      return !(Ee || A + e && A - ne + e || ie)
    };

    function ii() {
      hi.toggleClass(Ne, Gt(0)), li.toggleClass(Ne, Gt(1))
    };

    function ei() {
      gn.ok && (gn.prevent = {
        '<': Gt(0),
        '>': Gt(1)
      })
    };

    function ti(e) {
      var t, n, i = e.data();
      return It ? (t = i.l, n = i.w) : (t = e.position().left, n = e.width()), {
        c: t + n / 2,
        min: -t + 10 * r.thumbmargin,
        max: -t + l.w - n - 10 * r.thumbmargin
      }
    };

    function ni(e) {
      var t = c.activeFrame[We].data();
      x(Oi, {
        time: .9 * e,
        pos: t.l,
        width: t.w - 2 * r.thumbborderwidth
      })
    };

    function ct(e) {
      var i = q[e.guessIndex][We];
      if (i) {
        var t = X.min !== X.max,
          o = t && ti(c.activeFrame[We]),
          r = t && (e.keep && ct.l ? ct.l : f((e.coo || l.w / 2) - ti(i).c, o.min, o.max)),
          n = t && f(r, X.min, X.max),
          a = .9 * e.time;
        x(fe, {
          time: a,
          pos: n || 0,
          onEnd: function() {
            Kt(n, !0)
          }
        }), wt(ae, L(n, X.min, X.max)), ct.l = r
      }
    };

    function Ai() {
      Yn(We), st[We].push(c.activeFrame[We].addClass(K))
    };

    function Yn(e) {
      for (var t = st[e]; t.length;) t.shift().removeClass(K)
    };

    function bn(e) {
      var t = Cn[e];
      n.each(Se, function(e, n) {
        delete t[Ze(n)]
      }), n.each(t, function(e, n) {
        delete t[e], n.detach()
      })
    };

    function Kn(e) {
      Me = le = A;
      var n = c.activeFrame,
        t = n[u];
      t && (Yn(u), st[u].push(t.addClass(K)), e || c.show.onEnd(!0), te(Ve, 0, !0), bn(u), Un(Se), ki(), bi())
    };

    function Zn(e, t) {
      e && n.extend(l, {
        width: e.width || l.width,
        height: e.height,
        minwidth: e.minwidth,
        maxwidth: e.maxwidth,
        minheight: e.minheight,
        maxheight: e.maxheight,
        ratio: Le(e.ratio)
      }) && !t && n.extend(r, {
        width: l.width,
        height: l.height,
        minwidth: l.minwidth,
        maxwidth: l.maxwidth,
        minheight: l.minheight,
        maxheight: l.maxheight,
        ratio: l.ratio
      })
    };

    function ke(t, n) {
      e.trigger(o + ':' + t, [c, n])
    };

    function Rt() {
      clearTimeout(Ye.t), hn = 1, r.stopautoplayontouch ? c.stopAutoplay() : Bt = !0
    };

    function Ye() {
      Ye.t = setTimeout(function() {
        hn = 0
      }, T + g)
    };

    function jn() {
      Bt = !(!ie && !Nn)
    };

    function Xe() {
      if (clearTimeout(Xe.t), !r.autoplay || Bt) return c.autoplay && (c.autoplay = !1, ke('stopautoplay')), void 0;
      c.autoplay || (c.autoplay = !0, ke('startautoplay'));
      var e = A,
        t = c.activeFrame[u].data();
      M(function() {
        return t.state || e !== A
      }, function() {
        Xe.t = setTimeout(function() {
          Bt || e !== A || c.show(Ee ? z(!Ge) : Ze(A + (Ge ? -1 : 1)))
        }, r.autoplay)
      })
    };

    function Jn() {
      c.fullScreen && (c.fullScreen = !1, me && s.cancel(ci), b.removeClass(E), R.removeClass(E), e.removeClass(ue).insertAfter(Sn), l = n.extend({}, xi), Ie(ie, !0, !0), xn('x', !1), c.resize(), tn(Se, 'stage'), Re(Xn, zn), ke('fullscreenexit'))
    };

    function wt(e, t) {
      an && (e.removeClass(yt + ' ' + vt), t && !ie && e.addClass(t.replace(/^|\s/g, ' ' + Y + '--')))
    };

    function Ie(e, t, n) {
      t && (re.removeClass(ze), ie = !1, An()), e && e !== ie && (e.remove(), ke('unloadvideo')), n && (jn(), Xe())
    };

    function Pn(e) {
      re.toggleClass(At, e)
    };

    function Ot(e) {
      if (!ce.flow) {
        var n = e ? e.pageX : Ot.x,
          t = n && !Gt(Wn(n)) && r.click;
        Ot.p === t || !he && r.swipe || !oe.toggleClass(Et, t) || (Ot.p = t, Ot.x = n)
      }
    };

    function Ci(e, t) {
      var i = e.target,
        o = n(i);
      o.hasClass(xe) ? c.playVideo() : i === Ii ? c[(c.fullScreen ? 'cancel' : 'request') + 'FullScreen']() : ie ? i === Di && Ie(ie, !0, !0) : t ? Pn() : r.click && c.show({
        index: e.shiftKey || z(Wn(e._x)),
        slow: e.altKey,
        user: !0
      })
    };

    function xn(e, t) {
      ce[e] = X[e] = t
    };

    function Ti(e, t) {
      var i = n(this).data().eq;
      c.show({
        index: i,
        slow: e.altKey,
        user: !0,
        coo: e._x - ae.offset().left,
        time: t
      })
    };

    function He() {
      if (Pi(), Ni(), !He.i) {
        He.i = !0;
        var e = r.startindex;
        (e || r.hash && i.hash) && (rn = de(e || i.hash.replace(/^#/, ''), q, 0 === c.index || e, e)), A = Me = le = Fe = rn = ri(rn) || 0
      };
      if (ne) {
        if (kn()) return;
        ie && Ie(ie, !0), Se = [], bn(u), c.show({
          index: A,
          time: 0,
          reset: He.ok
        }), c.resize()
      } else c.destroy();
      He.ok = !0
    };

    function kn() {
      return !kn.f === Ge ? (kn.f = Ge, A = ne - 1 - A, c.reverse(), !0) : void 0
    };

    function yn() {
      yn.ok || (yn.ok = !0, ke('ready'))
    };
    R = R || n('html'), b = b || n('body');
    var q, ne, Rn, mn, ie, ln, Se, Me, le, Fe, di, mi, rn, Ee, ge, It, Vn, wn, sn, he, Fn, cn, on, an, Ge, En, zn, Xn, Gn, Bt, Nn, xi, hn, ut, We, c = this,
      un = n.now(),
      oi = o + un,
      ci = e[0],
      Ei = 1,
      fi = e.data(),
      qn = n('<style></style>'),
      Sn = n(a(Dt)),
      re = n(a(h)),
      oe = n(a(Q)).appendTo(re),
      Ve = (oe[0], n(a(Ct)).appendTo(oe)),
      In = n(),
      hi = n(a(C + ' ' + qt)),
      li = n(a(C + ' ' + Mt)),
      vn = hi.add(li).appendTo(oe),
      Bn = n(a(bt)),
      ae = n(a(w)).appendTo(Bn),
      fe = n(a(xt)).appendTo(ae),
      Dn = n(),
      pn = n(),
      Oi = (Ve.data(), fe.data(), n(a(Vt)).appendTo(fe)),
      On = n(a(Nt)),
      Ii = On[0],
      ai = n(a(xe)),
      Fi = n(a(Wt)).appendTo(oe),
      Di = Fi[0],
      si = n(a(lt)),
      A = !1,
      ji = {},
      l = {},
      ce = {},
      gn = {},
      X = {},
      nn = {},
      st = {},
      Cn = {},
      pi = 0,
      qi = [];
    re[u] = n(a(je)), re[N] = n(a(S + ' ' + dt, a(pe))), re[O] = n(a(S + ' ' + ft, a(Jt))), st[u] = [], st[N] = [], st[O] = [], Cn[u] = {}, re.addClass(v ? mt : gt), fi.fotorama = this, c.startAutoplay = function(e) {
      return c.autoplay ? this : (Bt = Nn = !1, wi(e || r.autoplay), Xe(), this)
    }, c.stopAutoplay = function() {
      return c.autoplay && (Bt = Nn = !0, Xe()), this
    }, c.show = function(e) {
      var t;
      'object' != typeof e ? (t = e, e = {}) : t = e.index, t = '>' === t ? le + 1 : '<' === t ? le - 1 : '<<' === t ? 0 : '>>' === t ? ne - 1 : t, t = isNaN(t) ? de(t, q, !0) : t, t = 'undefined' == typeof t ? A || 0 : t, c.activeIndex = A = ri(t), di = gi(A), mi = vi(A), Se = [A, di, mi], le = Ee ? t : A;
      var d = Math.abs(Fe - le),
        n = ve(e.time, function() {
          return Math.min(on * (1 + (d - 1) / 12), 2 * on)
        }),
        a = e.overPos;
      e.slow && (n *= 10), c.activeFrame = ln = q[A], Ie(ie, ln.i !== q[Ze(Me)].i), Ln(Se, 'stage'), Un(F ? [le] : [le, gi(le), vi(le)]), xn('go', !0), e.reset || ke('show', {
        user: e.user,
        time: n
      });
      var i = c.show.onEnd = function(t) {
        i.ok || (i.ok = !0, Qn(), tn(Se, 'stage'), t || Kn(!0), e.reset || ke('showend', {
          user: e.user
        }), xn('go', !1), ei(), Ot(), jn(), Xe())
      };
      if (he) {
        var s = ln[u],
          h = A !== Fe ? q[Fe][u] : null;
        De(s, h, In, {
          time: n,
          method: r.transition,
          onEnd: i
        }, qi)
      } else x(Ve, {
        pos: -H(le, l.w, r.margin, Me),
        overPos: a,
        time: n,
        onEnd: i,
        i$: !0
      });
      if (ii(), ge) {
        Ai();
        var o = Mn(A + f(le - Fe, -1, 1));
        ct({
          time: n,
          coo: o !== A && e.coo,
          guessIndex: 'undefined' != typeof e.coo ? o : A
        }), It && ni(n)
      };
      return Gn = 'undefined' != typeof Fe && Fe !== A, Fe = A, r.hash && Gn && !c.eq && et(ln.id || A + 1), this
    }, c.requestFullScreen = function() {
      return wn && !c.fullScreen && (zn = y.scrollTop(), Xn = y.scrollLeft(), Re(0, 0), xn('x', !0), xi = n.extend({}, l), e.addClass(ue).appendTo(b.addClass(E)), R.addClass(E), Ie(ie, !0, !0), c.fullScreen = !0, sn && s.request(ci), c.resize(), tn(Se, 'stage'), Qn(), ke('fullscreenenter')), this
    }, c.cancelFullScreen = function() {
      return sn && s.is() ? s.cancel(t) : Jn(), this
    }, t.addEventListener && t.addEventListener(s.event, function() {
      !q || s.is() || ie || Jn()
    }, !1), c.resize = function(e) {
      if (!q) return this;
      Zn(c.fullScreen ? {
        width: '100%',
        maxwidth: null,
        minwidth: null,
        height: '100%',
        maxheight: null,
        minheight: null
      } : G(e), c.fullScreen);
      var i = arguments[1] || 0,
        s = arguments[2],
        n = l.width,
        t = l.height,
        a = l.ratio,
        o = y.height() - (ge ? ae.height() : 0);
      return k(n) && (re.addClass(Pe).css({
        width: n,
        minWidth: l.minwidth,
        maxWidth: l.maxwidth
      }), n = l.W = l.w = re.width(), r.glimpse && (l.w -= Math.round(2 * (j(r.glimpse) / 100 * n || d(r.glimpse) || 0))), Ve.css({
        width: l.w,
        marginLeft: (l.W - l.w) / 2
      }), t = j(t) / 100 * o || d(t), t = t || a && n / a, t && (n = Math.round(n), t = l.h = Math.round(f(t, j(l.minheight) / 100 * o || d(l.minheight), j(l.maxheight) / 100 * o || d(l.maxheight))), Kn(), oe.stop().animate({
        width: n,
        height: t
      }, i, function() {
        re.removeClass(Pe)
      }), ge && (ae.stop().animate({
        width: n
      }, i), ct({
        guessIndex: A,
        time: i,
        keep: !0
      }), It && en.nav && ni(i)), En = s || !0, yn())), pi = oe.offset().left, this
    }, c.setOptions = function(e) {
      return n.extend(r, e), He(), this
    }, c.shuffle = function() {
      return q && be(q) && He(), this
    }, c.destroy = function() {
      return c.cancelFullScreen(), c.stopAutoplay(), q = c.data = null, fn(), Se = [], bn(u), this
    }, c.playVideo = function() {
      var e = c.activeFrame,
        i = e.video,
        t = A;
      return 'object' == typeof i && e.videoReady && (sn && c.fullScreen && c.cancelFullScreen(), M(function() {
        return !s.is() || t !== A
      }, function() {
        t === A && (e.r$ = e.r$ || n(n.Fotorama.jst.video(i)), e.r$.appendTo(e[u]), re.addClass(ze), ie = e.r$, An(), ke('loadvideo'))
      })), this
    }, c.stopVideo = function() {
      return Ie(ie, !0, !0), this
    }, oe.on('mousemove', Ot), ce = qe(Ve, {
      onStart: Rt,
      onMove: function(e, t) {
        wt(oe, t.edge)
      },
      onTouchEnd: Ye,
      onEnd: function(e) {
        wt(oe);
        var t = (m && !ut || e.touch) && r.arrows;
        if (e.moved || t && e.pos !== e.newPos) {
          var n = Qe(e.newPos, l.w, r.margin, Me);
          c.show({
            index: n,
            time: he ? on : e.time,
            overPos: e.overPos,
            user: !0
          })
        } else e.aborted || Ci(e.startEvent, t)
      },
      i$: !0,
      timeLow: 1,
      timeHigh: 1,
      friction: 2,
      select: '.' + ee + ', .' + ee + ' *',
      t$: oe
    }), X = qe(fe, {
      onStart: Rt,
      onMove: function(e, t) {
        wt(ae, t.edge)
      },
      onTouchEnd: Ye,
      onEnd: function(e) {
        function t() {
          ct.l = e.newPos, jn(), Xe(), Kt(e.newPos, !0)
        };
        if (e.moved) e.pos !== e.newPos ? (x(fe, {
          time: e.time,
          pos: e.newPos,
          overPos: e.overPos,
          onEnd: t
        }), Kt(e.newPos), an && wt(ae, L(e.newPos, X.min, X.max))) : t();
        else {
          var n = e.c$.closest('.' + S, fe)[0];
          n && Ti.call(n, e.startEvent)
        }
      },
      timeLow: .5,
      timeHigh: 2,
      friction: 5,
      t$: ae
    }), gn = Ae(oe, {
      shift: !0,
      onEnd: function(e, t) {
        Rt(), Ye(), c.show({
          index: t,
          slow: e.altKey
        })
      }
    }), nn = Ae(ae, {
      onEnd: function(e, t) {
        Rt(), Ye();
        var n = te(fe) + .25 * t;
        fe.css(B(f(n, X.min, X.max))), an && wt(ae, L(n, X.min, X.max)), nn.prevent = {
          '<': n >= X.max,
          '>': n <= X.min
        }, clearTimeout(nn.t), nn.t = setTimeout(function() {
          Kt(n, !0)
        }, g), Kt(n)
      }
    }), re.hover(function() {
      setTimeout(function() {
        hn || (ut = !0, Pn(!ut))
      }, 0)
    }, function() {
      ut && (ut = !1, Pn(!ut))
    }), it(vn, function(e) {
      p(e), c.show({
        index: vn.index(this) ? '>' : '<',
        slow: e.altKey,
        user: !0
      })
    }, {
      onStart: function() {
        Rt(), ce.control = !0
      },
      onTouchEnd: Ye
    }), n.each('load push pop shift unshift reverse sort splice'.split(' '), function(e, t) {
      c[t] = function() {
        return q = q || [], 'load' !== t ? Array.prototype[t].apply(q, arguments) : arguments[0] && 'object' == typeof arguments[0] && arguments[0].length && (q = Be(arguments[0])), He(), c
      }
    }), He()
  }, n.fn.fotorama = function(t) {
    return this.each(function() {
      var a = this,
        r = n(this),
        i = r.data(),
        o = i.fotorama;
      o ? o.setOptions(t) : M(function() {
        return !ut(a)
      }, function() {
        i.urtext = r.html(), new n.Fotorama(r, n.extend({}, {
          width: null,
          minwidth: null,
          maxwidth: '100%',
          height: null,
          minheight: null,
          maxheight: null,
          ratio: null,
          margin: ae,
          glimpse: 0,
          nav: 'dots',
          navposition: 'bottom',
          thumbwidth: P,
          thumbheight: P,
          thumbmargin: ae,
          thumbborderwidth: ae,
          allowfullscreen: !1,
          fit: 'contain',
          transition: 'slide',
          transitionduration: T,
          captions: !0,
          hash: !1,
          startindex: 0,
          loop: !1,
          autoplay: !1,
          stopautoplayontouch: !0,
          keyboard: !1,
          arrows: !0,
          click: !0,
          swipe: !0,
          trackpad: !0,
          shuffle: !1,
          direction: 'ltr',
          shadows: !0,
          spinner: null
        }, e.fotoramaDefaults, t, i))
      })
    })
  }, n.Fotorama.instances = [], n.Fotorama.cache = {}, n.Fotorama.measures = {}, n = n || {}, n.Fotorama = n.Fotorama || {}, n.Fotorama.jst = n.Fotorama.jst || {}, n.Fotorama.jst.style = function(e) {
    var t, n = '';
    return ce.escape, n += '.fotorama' + (null == (t = e.s) ? '' : t) + ' .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:' + (null == (t = e.m) ? '' : t) + 'px;\nheight:' + (null == (t = e.h) ? '' : t) + 'px}\n.fotorama' + (null == (t = e.s) ? '' : t) + ' .fotorama__thumb-border{\nheight:' + (null == (t = e.h - e.b * (e.q ? 0 : 2)) ? '' : t) + 'px;\nborder-width:' + (null == (t = e.b) ? '' : t) + 'px;\nmargin-top:' + (null == (t = e.m) ? '' : t) + 'px}'
  }, n.Fotorama.jst.video = function(e) {
    function n() {
      t += i.call(arguments, '')
    };
    var t = '',
      i = (ce.escape, Array.prototype.join);
    return t += '<div class="fotorama__video"><iframe src="', n(('youtube' == e.type ? 'http://youtube.com/embed/' + e.id + '?autoplay=1' : 'vimeo' == e.type ? 'http://player.vimeo.com/video/' + e.id + '?autoplay=1&badge=0' : e.id) + (e.s && 'custom' != e.type ? '&' + e.s : '')), t += '" frameborder="0" allowfullscreen></iframe></div>'
  }, n(function() {
    n('.' + o + ':not([data-auto="false"])').fotorama()
  })
}(window, document, location, window.jQuery);
(function() {
  function t() {};

  function i(e, t) {
    for (var n = e.length; n--;)
      if (e[n].listener === t) return n;
    return -1
  };

  function n(e) {
    return function() {
      return this[e].apply(this, arguments)
    }
  };
  var e = t.prototype,
    r = this,
    o = r.EventEmitter;
  e.getListeners = function(e) {
    var i, t, n = this.u$();
    if ('object' == typeof e) {
      i = {};
      for (t in n) n.hasOwnProperty(t) && e.test(t) && (i[t] = n[t])
    } else i = n[e] || (n[e] = []);
    return i
  }, e.flattenListeners = function(e) {
    var t, n = [];
    for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
    return n
  }, e.getListenersAsObject = function(e) {
    var n, t = this.getListeners(e);
    return t instanceof Array && (n = {}, n[e] = t), n || t
  }, e.addListener = function(e, t) {
    var r, n = this.getListenersAsObject(e),
      o = 'object' == typeof t;
    for (r in n) n.hasOwnProperty(r) && -1 === i(n[r], t) && n[r].push(o ? t : {
      listener: t,
      once: !1
    });
    return this
  }, e.on = n('addListener'), e.addOnceListener = function(e, t) {
    return this.addListener(e, {
      listener: t,
      once: !0
    })
  }, e.once = n('addOnceListener'), e.defineEvent = function(e) {
    return this.getListeners(e), this
  }, e.defineEvents = function(e) {
    for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
    return this
  }, e.removeListener = function(e, t) {
    var o, n, r = this.getListenersAsObject(e);
    for (n in r) r.hasOwnProperty(n) && (o = i(r[n], t), -1 !== o && r[n].splice(o, 1));
    return this
  }, e.off = n('removeListener'), e.addListeners = function(e, t) {
    return this.manipulateListeners(!1, e, t)
  }, e.removeListeners = function(e, t) {
    return this.manipulateListeners(!0, e, t)
  }, e.manipulateListeners = function(e, t, n) {
    var i, r, o = e ? this.removeListener : this.addListener,
      a = e ? this.removeListeners : this.addListeners;
    if ('object' != typeof t || t instanceof RegExp)
      for (i = n.length; i--;) o.call(this, t, n[i]);
    else
      for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ('function' == typeof r ? o.call(this, i, r) : a.call(this, i, r));
    return this
  }, e.removeEvent = function(e) {
    var n, i = typeof e,
      t = this.u$();
    if ('string' === i) delete t[e];
    else if ('object' === i)
      for (n in t) t.hasOwnProperty(n) && e.test(n) && delete t[n];
    else delete this.s$;
    return this
  }, e.removeAllListeners = n('removeEvent'), e.emitEvent = function(e, t) {
    var n, o, i, a, r = this.getListenersAsObject(e);
    for (i in r)
      if (r.hasOwnProperty(i))
        for (o = r[i].length; o--;) n = r[i][o], n.once === !0 && this.removeListener(e, n.listener), a = n.listener.apply(this, t || []), a === this.m$() && this.removeListener(e, n.listener);
    return this
  }, e.trigger = n('emitEvent'), e.emit = function(e) {
    var t = Array.prototype.slice.call(arguments, 1);
    return this.emitEvent(e, t)
  }, e.setOnceReturnValue = function(e) {
    return this.p$ = e, this
  }, e.m$ = function() {
    return this.hasOwnProperty('_onceReturnValue') ? this.p$ : !0
  }, e.u$ = function() {
    return this.s$ || (this.s$ = {})
  }, t.noConflict = function() {
    return r.EventEmitter = o, t
  }, 'function' == typeof define && define.amd ? define('eventEmitter/EventEmitter', [], function() {
    return t
  }) : 'object' == typeof module && module.exports ? module.exports = t : this.EventEmitter = t
}).call(this),
  function(e) {
    function r(t) {
      var n = e.event;
      return n.target = n.target || n.srcElement || t, n
    };
    var t = document.documentElement,
      n = function() {};
    t.addEventListener ? n = function(e, t, n) {
      e.addEventListener(t, n, !1)
    } : t.attachEvent && (n = function(e, t, n) {
      e[t + n] = n.handleEvent ? function() {
        var t = r(e);
        n.handleEvent.call(n, t)
      } : function() {
        var t = r(e);
        n.call(e, t)
      }, e.attachEvent('on' + t, e[t + n])
    });
    var i = function() {};
    t.removeEventListener ? i = function(e, t, n) {
      e.removeEventListener(t, n, !1)
    } : t.detachEvent && (i = function(e, t, n) {
      e.detachEvent('on' + t, e[t + n]);
      try {
        delete e[t + n]
      } catch (i) {
        e[t + n] = void 0
      }
    });
    var o = {
      bind: n,
      unbind: i
    };
    'function' == typeof define && define.amd ? define('eventie/eventie', o) : e.eventie = o
  }(this),
  function(e, t) {
    'function' == typeof define && define.amd ? define(['eventEmitter/EventEmitter', 'eventie/eventie'], function(n, i) {
      return t(e, n, i)
    }) : 'object' == typeof exports ? module.exports = t(e, require('wolfy87-eventemitter'), require('eventie')) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
  }(window, function(e, t, n) {
    function s(e, t) {
      for (var n in t) e[n] = t[n];
      return e
    };

    function f(e) {
      return '[object Array]' === d.call(e)
    };

    function h(e) {
      var t = [];
      if (f(e)) t = e;
      else if ('number' == typeof e.length)
        for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
      else t.push(e);
      return t
    };

    function i(e, t, n) {
      if (!(this instanceof i)) return new i(e, t);
      'string' == typeof e && (e = document.querySelectorAll(e)), this.elements = h(e), this.options = s({}, this.options), 'function' == typeof t ? n = t : s(this.options, t), n && this.on('always', n), this.getImages(), o && (this.jqDeferred = new o.Deferred);
      var r = this;
      setTimeout(function() {
        r.check()
      })
    };

    function a(e) {
      this.img = e
    };

    function r(e) {
      this.src = e, u[e] = this
    };
    var o = e.jQuery,
      c = e.console,
      l = c !== void 0,
      d = Object.prototype.toString;
    i.prototype = new t, i.prototype.options = {}, i.prototype.getImages = function() {
      this.images = [];
      for (var i = 0, o = this.elements.length; o > i; i++) {
        var e = this.elements[i];
        'IMG' === e.nodeName && this.addImage(e);
        var t = e.nodeType;
        if (t && (1 === t || 9 === t || 11 === t))
          for (var r = e.querySelectorAll('img'), n = 0, a = r.length; a > n; n++) {
            var s = r[n];
            this.addImage(s)
          }
      }
    }, i.prototype.addImage = function(e) {
      var t = new a(e);
      this.images.push(t)
    }, i.prototype.check = function() {
      function o(n, r) {
        return t.options.debug && l && c.log('confirm', n, r), t.progress(n), i++, i === e && t.complete(), !0
      };
      var t = this,
        i = 0,
        e = this.images.length;
      if (this.hasAnyBroken = !1, !e) return this.complete(), void 0;
      for (var n = 0; e > n; n++) {
        var r = this.images[n];
        r.on('confirm', o), r.check()
      }
    }, i.prototype.progress = function(e) {
      this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
      var t = this;
      setTimeout(function() {
        t.emit('progress', t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
      })
    }, i.prototype.complete = function() {
      var t = this.hasAnyBroken ? 'fail' : 'done';
      this.isComplete = !0;
      var e = this;
      setTimeout(function() {
        if (e.emit(t, e), e.emit('always', e), e.jqDeferred) {
          var n = e.hasAnyBroken ? 'reject' : 'resolve';
          e.jqDeferred[n](e)
        }
      })
    }, o && (o.fn.imagesLoaded = function(e, t) {
      var n = new i(this, e, t);
      return n.jqDeferred.promise(o(this))
    }), a.prototype = new t, a.prototype.check = function() {
      var e = u[this.img.src] || new r(this.img.src);
      if (e.isConfirmed) return this.confirm(e.isLoaded, 'cached was confirmed'), void 0;
      if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, 'naturalWidth'), void 0;
      var t = this;
      e.on('confirm', function(e, n) {
        return t.confirm(e.isLoaded, n), !0
      }), e.check()
    }, a.prototype.confirm = function(e, t) {
      this.isLoaded = e, this.emit('confirm', this, t)
    };
    var u = {};
    return r.prototype = new t, r.prototype.check = function() {
      if (!this.isChecked) {
        var e = new Image;
        n.bind(e, 'load', this), n.bind(e, 'error', this), e.src = this.src, this.isChecked = !0
      }
    }, r.prototype.handleEvent = function(e) {
      var t = 'on' + e.type;
      this[t] && this[t](e)
    }, r.prototype.onload = function(e) {
      this.confirm(!0, 'onload'), this.unbindProxyEvents(e)
    }, r.prototype.onerror = function(e) {
      this.confirm(!1, 'onerror'), this.unbindProxyEvents(e)
    }, r.prototype.confirm = function(e, t) {
      this.isConfirmed = !0, this.isLoaded = e, this.emit('confirm', this, t)
    }, r.prototype.unbindProxyEvents = function(e) {
      n.unbind(e.target, 'load', this), n.unbind(e.target, 'error', this)
    }, i
  });
$ = jQuery;
var hash = window.location.hash,
  AjaxUrl = $('body').attr('data-ajax'),
  mob = !1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone|ZuneWP7|Nokia|Opera Mini/i.test(navigator.userAgent)) {
  var mob = !0
};
var supportsTouch = !1;
if (window.hasOwnProperty('ontouchstart') || window.navigator.msPointerEnabled) {
  supportsTouch = !0
};
var TouchClickEvent = supportsTouch ? 'touchstart' : 'click';

function cbg() {
  'use strict';
  if ($('section.contact').length) {
    var e = $('section.contact').data('img');
    $('section.contact').backstretch(e)
  }
};

function fotorama_init() {
  'use strict';
  if (mob) {
    $('.fotorama').removeAttr('data-nav').attr('data-auto', 'false')
  };
  imagesLoaded('main', function() {
    $('.fotorama').fotorama({
      width: '100%',
      height: '100%',
      click: !0,
      swipe: !0,
      trackpad: !0,
      allowfullscreen: !1,
      loop: !0,
      autoplay: !1,
      stopAutoplayOnAction: !0,
      transition: 'crossfade',
      thumbmargin: 0,
      thumbborderwidth: 0,
      thumbwidth: 100,
      thumbheight: 100,
      arrows: !1,
      shadows: !1,
      margin: 0,
      fit: 'contain',
      nav: mob ? !1 : 'thumbs'
    });
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    }, 1e3)
  })
};

function gallery_load(e, t, n) {
  'use strict';
  var i = $(n);
  i.addClass('preload');
  $.ajax({
    type: 'post',
    url: AjaxUrl,
    data: {
      action: 'master_gallery',
      galleryid: e
    },
    success: function(e) {
      $('main').after(e);
      setLocation(t);
      $('body').addClass('single-gallery');
      i.removeClass('preload');
      fotorama_init()
    }
  })
};

function clearAjax(e) {
  'use strict';
  setLocation('/');
  $('.onepagescroll').moveTo(e ? e : 1);
  $('#blogpost, #fgallery').fadeOut(500, function() {
    $(this).delay(500).remove()
  });
  $('body.single-gallery').removeClass('single-gallery')
};
$(document).ready(function() {
  'use strict';
  FastClick.attach(document.body);
  $('iframe').each(function() {
    $(this).wrap('<div class="fullframe" />')
  });
  $(this).on('click', '.sb-slide #fgallery, .sb-slide .onepagescroll', function() {
    $('body').toggleClass('sb-slide');
    return !1
  });
  $(this).on(TouchClickEvent, '[data-sb]', function() {
    $('body').toggleClass('sb-slide');
    return !1
  });
  $(this).on(TouchClickEvent, 'nav a', function() {
    var t = $(this),
      e = t.attr('href'),
      n = t.parent().attr('data-id'),
      i = e.substring(0, 1);
    if (i === '#') {
      clearAjax();
      $('.onepagescroll').moveTo(e.replace('#', ''));
      window.location.hash = e.replace('#', '')
    } else {
      clearAjax();
      gallery_load(n, e, $('.quad a[data-id="' + n + '"]').parent('div'))
    };
    $('body').removeClass('sb-slide');
    return !1
  });
  $(this).on('click', '.move2move article a', function() {
    var e = $(this),
      t = e.parents('article'),
      n = e.attr('data-id');
    t.addClass('preload');
    $.ajax({
      type: 'post',
      url: AjaxUrl,
      data: {
        action: 'master_blog',
        postid: n
      },
      success: function(n) {
        $('main').after(n);
        setLocation(e.attr('href'));
        var i = $('#blogpost');
        $('iframe').each(function() {
          $(this).wrap('<div class="fullframe" />')
        });
        i.fadeIn(500, function() {
          t.removeClass('preload')
        })
      }
    });
    return !1
  });
  $(this).on('click', 'a[data-clear]', function() {
    if ($(this).hasClass('close')) {
      clearAjax(2)
    } else {
      clearAjax()
    };
    return !1
  });
//  $(this).on('click', '.quad a', function() {
//    var e = $(this),
//      n = e.parents('div'),
//      t = e.attr('data-id');
//    clearAjax();
//    gallery_load(t, e.attr('href'), n);
//    return !1
//  });
  $('.onepagescroll').onepage_scroll({
    sectionContainer: 'section',
    easing: 'ease',
    pagination: !1,
    loop: !1,
    animationTime: 500,
    responsiveFallback: 1024,
    updateURL: !0
  })
});
$(window).load(function() {
  'use strict';
  imagesLoaded('main', function() {
    cbg();
    fotorama_init();
    $('.move2move > div').FlowSlider({
      animation: 'None'
    })
  })
});
$(window).resizeEnd(function() {
  'use strict';
  cbg()
});
WebFontConfig = {
  google: {
    families: ['Exo+2:400,200,200italic,300,300italic,600,600italic,700italic,700:latin-ext,cyrillic']
  }
};
(function() {
  var e = document.createElement('script');
  e.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  e.type = 'text/javascript';
  e.async = 'true';
  var t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(e, t)
})();