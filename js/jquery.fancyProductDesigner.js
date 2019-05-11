function Tree() {
    var a = this;
    a.build_tree = function(b) {
        var c, d, e = a.dyn_tree,
            f = a.stat_desc.static_tree,
            g = a.stat_desc.elems,
            h = -1;
        for (b.heap_len = 0, b.heap_max = HEAP_SIZE, c = 0; g > c; c++) 0 !== e[2 * c] ? (b.heap[++b.heap_len] = h = c, b.depth[c] = 0) : e[2 * c + 1] = 0;
        for (; 2 > b.heap_len;) d = b.heap[++b.heap_len] = 2 > h ? ++h : 0, e[2 * d] = 1, b.depth[d] = 0, b.opt_len--, f && (b.static_len -= f[2 * d + 1]);
        for (a.max_code = h, c = Math.floor(b.heap_len / 2); c >= 1; c--) b.pqdownheap(e, c);
        d = g;
        do c = b.heap[1], b.heap[1] = b.heap[b.heap_len--], b.pqdownheap(e, 1), f = b.heap[1], b.heap[--b.heap_max] = c, b.heap[--b.heap_max] = f, e[2 * d] = e[2 * c] + e[2 * f], b.depth[d] = Math.max(b.depth[c], b.depth[f]) + 1, e[2 * c + 1] = e[2 * f + 1] = d, b.heap[1] = d++, b.pqdownheap(e, 1); while (2 <= b.heap_len);
        b.heap[--b.heap_max] = b.heap[1], c = a.dyn_tree;
        for (var i, j, h = a.stat_desc.static_tree, k = a.stat_desc.extra_bits, l = a.stat_desc.extra_base, m = a.stat_desc.max_length, n = 0, g = 0; MAX_BITS >= g; g++) b.bl_count[g] = 0;
        for (c[2 * b.heap[b.heap_max] + 1] = 0, d = b.heap_max + 1; HEAP_SIZE > d; d++) f = b.heap[d], g = c[2 * c[2 * f + 1] + 1] + 1, g > m && (g = m, n++), c[2 * f + 1] = g, f > a.max_code || (b.bl_count[g]++, i = 0, f >= l && (i = k[f - l]), j = c[2 * f], b.opt_len += j * (g + i), h && (b.static_len += j * (h[2 * f + 1] + i)));
        if (0 !== n) {
            do {
                for (g = m - 1; 0 === b.bl_count[g];) g--;
                b.bl_count[g]--, b.bl_count[g + 1] += 2, b.bl_count[m]--, n -= 2
            } while (n > 0);
            for (g = m; 0 !== g; g--)
                for (f = b.bl_count[g]; 0 !== f;) h = b.heap[--d], h > a.max_code || (c[2 * h + 1] != g && (b.opt_len += (g - c[2 * h + 1]) * c[2 * h], c[2 * h + 1] = g), f--)
        }
        for (c = a.max_code, d = b.bl_count, b = [], f = 0, g = 1; MAX_BITS >= g; g++) b[g] = f = f + d[g - 1] << 1;
        for (d = 0; c >= d; d++)
            if (k = e[2 * d + 1], 0 !== k) {
                f = e, g = 2 * d, h = b[k]++, l = 0;
                do l |= 1 & h, h >>>= 1, l <<= 1; while (0 < --k);
                f[g] = l >>> 1
            }
    }
}

function StaticTree(a, b, c, d, e) {
    this.static_tree = a, this.extra_bits = b, this.extra_base = c, this.elems = d, this.max_length = e
}

function Config(a, b, c, d, e) {
    this.good_length = a, this.max_lazy = b, this.nice_length = c, this.max_chain = d, this.func = e
}

function smaller(a, b, c, d) {
    var e = a[2 * b];
    return a = a[2 * c], a > e || e == a && d[b] <= d[c]
}

function Deflate() {
    function a() {
        var a;
        for (a = 0; L_CODES > a; a++) V[2 * a] = 0;
        for (a = 0; D_CODES > a; a++) W[2 * a] = 0;
        for (a = 0; BL_CODES > a; a++) X[2 * a] = 0;
        V[2 * END_BLOCK] = 1, ca = ea = Y.opt_len = Y.static_len = 0
    }

    function b(a, b) {
        var c, d, e = -1,
            f = a[1],
            g = 0,
            h = 7,
            i = 4;
        for (0 === f && (h = 138, i = 3), a[2 * (b + 1) + 1] = 65535, c = 0; b >= c; c++) d = f, f = a[2 * (c + 1) + 1], ++g < h && d == f || (i > g ? X[2 * d] += g : 0 !== d ? (d != e && X[2 * d]++, X[2 * REP_3_6]++) : 10 >= g ? X[2 * REPZ_3_10]++ : X[2 * REPZ_11_138]++, g = 0, e = d, 0 === f ? (h = 138, i = 3) : d == f ? (h = 6, i = 3) : (h = 7, i = 4))
    }

    function c(a) {
        Y.pending_buf[Y.pending++] = a
    }

    function d(a) {
        c(255 & a), c(a >>> 8 & 255)
    }

    function e(a, b) {
        ha > Buf_size - b ? (ga |= a << ha & 65535, d(ga), ga = a >>> Buf_size - ha, ha += b - Buf_size) : (ga |= a << ha & 65535, ha += b)
    }

    function f(a, b) {
        var c = 2 * a;
        e(65535 & b[c], 65535 & b[c + 1])
    }

    function g(a, b) {
        var c, d, g = -1,
            h = a[1],
            i = 0,
            j = 7,
            k = 4;
        for (0 === h && (j = 138, k = 3), c = 0; b >= c; c++)
            if (d = h, h = a[2 * (c + 1) + 1], !(++i < j && d == h)) {
                if (k > i) {
                    do f(d, X); while (0 !== --i)
                } else 0 !== d ? (d != g && (f(d, X), i--), f(REP_3_6, X), e(i - 3, 2)) : 10 >= i ? (f(REPZ_3_10, X), e(i - 3, 3)) : (f(REPZ_11_138, X), e(i - 11, 7));
                i = 0, g = d, 0 === h ? (j = 138, k = 3) : d == h ? (j = 6, k = 3) : (j = 7, k = 4)
            }
    }

    function h() {
        16 == ha ? (d(ga), ha = ga = 0) : ha >= 8 && (c(255 & ga), ga >>>= 8, ha -= 8)
    }

    function i(a, b) {
        var c, d, e;
        if (Y.pending_buf[da + 2 * ca] = a >>> 8 & 255, Y.pending_buf[da + 2 * ca + 1] = 255 & a, Y.pending_buf[aa + ca] = 255 & b, ca++, 0 === a ? V[2 * b]++ : (ea++, a--, V[2 * (Tree._length_code[b] + LITERALS + 1)]++, W[2 * Tree.d_code(a)]++), 0 === (8191 & ca) && R > 2) {
            for (c = 8 * ca, d = L - H, e = 0; D_CODES > e; e++) c += W[2 * e] * (5 + Tree.extra_dbits[e]);
            if (ea < Math.floor(ca / 2) && c >>> 3 < Math.floor(d / 2)) return !0
        }
        return ca == ba - 1
    }

    function j(a, b) {
        var c, d, g, h, i = 0;
        if (0 !== ca)
            do c = Y.pending_buf[da + 2 * i] << 8 & 65280 | 255 & Y.pending_buf[da + 2 * i + 1], d = 255 & Y.pending_buf[aa + i], i++, 0 === c ? f(d, a) : (g = Tree._length_code[d], f(g + LITERALS + 1, a), h = Tree.extra_lbits[g], 0 !== h && (d -= Tree.base_length[g], e(d, h)), c--, g = Tree.d_code(c), f(g, b), h = Tree.extra_dbits[g], 0 !== h && (c -= Tree.base_dist[g], e(c, h))); while (ca > i);
        f(END_BLOCK, a), fa = a[2 * END_BLOCK + 1]
    }

    function k() {
        ha > 8 ? d(ga) : ha > 0 && c(255 & ga), ha = ga = 0
    }

    function l(a, b, c) {
        e((STORED_BLOCK << 1) + (c ? 1 : 0), 3), k(), fa = 8, d(b), d(~b), Y.pending_buf.set(y.subarray(a, a + b), Y.pending), Y.pending += b
    }

    function m(c) {
        var d, f, h = H >= 0 ? H : -1,
            i = L - H,
            m = 0;
        if (R > 0) {
            for (Z.build_tree(Y), $.build_tree(Y), b(V, Z.max_code), b(W, $.max_code), _.build_tree(Y), m = BL_CODES - 1; m >= 3 && 0 === X[2 * Tree.bl_order[m] + 1]; m--);
            Y.opt_len += 3 * (m + 1) + 14, d = Y.opt_len + 3 + 7 >>> 3, f = Y.static_len + 3 + 7 >>> 3, d >= f && (d = f)
        } else d = f = i + 5;
        if (d >= i + 4 && -1 != h) l(h, i, c);
        else if (f == d) e((STATIC_TREES << 1) + (c ? 1 : 0), 3), j(StaticTree.static_ltree, StaticTree.static_dtree);
        else {
            for (e((DYN_TREES << 1) + (c ? 1 : 0), 3), h = Z.max_code + 1, i = $.max_code + 1, m += 1, e(h - 257, 5), e(i - 1, 5), e(m - 4, 4), d = 0; m > d; d++) e(X[2 * Tree.bl_order[d] + 1], 3);
            g(V, h - 1), g(W, i - 1), j(V, W)
        }
        a(), c && k(), H = L, r.flush_pending()
    }

    function n() {
        var a, b, c, d;
        do {
            if (d = z - N - L, 0 === d && 0 === L && 0 === N) d = v;
            else if (-1 == d) d--;
            else if (L >= v + v - MIN_LOOKAHEAD) {
                y.set(y.subarray(v, v + v), 0), M -= v, L -= v, H -= v, c = a = D;
                do b = 65535 & B[--c], B[c] = b >= v ? b - v : 0; while (0 !== --a);
                c = a = v;
                do b = 65535 & A[--c], A[c] = b >= v ? b - v : 0; while (0 !== --a);
                d += v
            }
            if (0 === r.avail_in) break;
            a = r.read_buf(y, L + N, d), N += a, N >= MIN_MATCH && (C = 255 & y[L], C = (C << G ^ 255 & y[L + 1]) & F)
        } while (MIN_LOOKAHEAD > N && 0 !== r.avail_in)
    }

    function o(a) {
        var b, c = 65535;
        for (c > t - 5 && (c = t - 5);;) {
            if (1 >= N) {
                if (n(), 0 === N && a == Z_NO_FLUSH) return NeedMore;
                if (0 === N) break
            }
            if (L += N, N = 0, b = H + c, (0 === L || L >= b) && (N = L - b, L = b, m(!1), 0 === r.avail_out)) return NeedMore;
            if (L - H >= v - MIN_LOOKAHEAD && (m(!1), 0 === r.avail_out)) return NeedMore
        }
        return m(a == Z_FINISH), 0 === r.avail_out ? a == Z_FINISH ? FinishStarted : NeedMore : a == Z_FINISH ? FinishDone : BlockDone
    }

    function p(a) {
        var b, c = P,
            d = L,
            e = O,
            f = L > v - MIN_LOOKAHEAD ? L - (v - MIN_LOOKAHEAD) : 0,
            g = U,
            h = x,
            i = L + MAX_MATCH,
            j = y[d + e - 1],
            k = y[d + e];
        O >= T && (c >>= 2), g > N && (g = N);
        do
            if (b = a, y[b + e] == k && y[b + e - 1] == j && y[b] == y[d] && y[++b] == y[d + 1]) {
                d += 2, b++;
                do; while (y[++d] == y[++b] && y[++d] == y[++b] && y[++d] == y[++b] && y[++d] == y[++b] && y[++d] == y[++b] && y[++d] == y[++b] && y[++d] == y[++b] && y[++d] == y[++b] && i > d);
                if (b = MAX_MATCH - (i - d), d = i - MAX_MATCH, b > e) {
                    if (M = a, e = b, b >= g) break;
                    j = y[d + e - 1], k = y[d + e]
                }
            }
        while ((a = 65535 & A[a & h]) > f && 0 !== --c);
        return N >= e ? e : N
    }

    function q(a) {
        for (var b, c, d = 0;;) {
            if (MIN_LOOKAHEAD > N) {
                if (n(), MIN_LOOKAHEAD > N && a == Z_NO_FLUSH) return NeedMore;
                if (0 === N) break
            }
            if (N >= MIN_MATCH && (C = (C << G ^ 255 & y[L + (MIN_MATCH - 1)]) & F, d = 65535 & B[C], A[L & x] = B[C], B[C] = L), O = I, J = M, I = MIN_MATCH - 1, 0 !== d && Q > O && v - MIN_LOOKAHEAD >= (L - d & 65535) && (S != Z_HUFFMAN_ONLY && (I = p(d)), 5 >= I && (S == Z_FILTERED || I == MIN_MATCH && L - M > 4096) && (I = MIN_MATCH - 1)), O >= MIN_MATCH && O >= I) {
                c = L + N - MIN_MATCH, b = i(L - 1 - J, O - MIN_MATCH), N -= O - 1, O -= 2;
                do ++L <= c && (C = (C << G ^ 255 & y[L + (MIN_MATCH - 1)]) & F, d = 65535 & B[C], A[L & x] = B[C], B[C] = L); while (0 !== --O);
                if (K = 0, I = MIN_MATCH - 1, L++, b && (m(!1), 0 === r.avail_out)) return NeedMore
            } else if (0 !== K) {
                if ((b = i(0, 255 & y[L - 1])) && m(!1), L++, N--, 0 === r.avail_out) return NeedMore
            } else K = 1, L++, N--
        }
        return 0 !== K && (i(0, 255 & y[L - 1]), K = 0), m(a == Z_FINISH), 0 === r.avail_out ? a == Z_FINISH ? FinishStarted : NeedMore : a == Z_FINISH ? FinishDone : BlockDone
    }
    var r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y = this,
        Z = new Tree,
        $ = new Tree,
        _ = new Tree;
    Y.depth = [];
    var aa, ba, ca, da, ea, fa, ga, ha;
    Y.bl_count = [], Y.heap = [], V = [], W = [], X = [], Y.pqdownheap = function(a, b) {
        for (var c = Y.heap, d = c[b], e = b << 1; e <= Y.heap_len && (e < Y.heap_len && smaller(a, c[e + 1], c[e], Y.depth) && e++, !smaller(a, d, c[e], Y.depth));) c[b] = c[e], b = e, e <<= 1;
        c[b] = d
    }, Y.deflateInit = function(b, c, d, e, f, g) {
        if (e || (e = Z_DEFLATED), f || (f = DEF_MEM_LEVEL), g || (g = Z_DEFAULT_STRATEGY), b.msg = null, c == Z_DEFAULT_COMPRESSION && (c = 6), 1 > f || f > MAX_MEM_LEVEL || e != Z_DEFLATED || 9 > d || d > 15 || 0 > c || c > 9 || 0 > g || g > Z_HUFFMAN_ONLY) return Z_STREAM_ERROR;
        for (b.dstate = Y, w = d, v = 1 << w, x = v - 1, E = f + 7, D = 1 << E, F = D - 1, G = Math.floor((E + MIN_MATCH - 1) / MIN_MATCH), y = new Uint8Array(2 * v), A = [], B = [], ba = 1 << f + 6, Y.pending_buf = new Uint8Array(4 * ba), t = 4 * ba, da = Math.floor(ba / 2), aa = 3 * ba, R = c, S = g, b.total_in = b.total_out = 0, b.msg = null, Y.pending = 0, Y.pending_out = 0, s = BUSY_STATE, u = Z_NO_FLUSH, Z.dyn_tree = V, Z.stat_desc = StaticTree.static_l_desc, $.dyn_tree = W, $.stat_desc = StaticTree.static_d_desc, _.dyn_tree = X, _.stat_desc = StaticTree.static_bl_desc, ha = ga = 0, fa = 8, a(), z = 2 * v, b = B[D - 1] = 0; D - 1 > b; b++) B[b] = 0;
        return Q = config_table[R].max_lazy, T = config_table[R].good_length, U = config_table[R].nice_length, P = config_table[R].max_chain, N = H = L = 0, I = O = MIN_MATCH - 1, C = K = 0, Z_OK
    }, Y.deflateEnd = function() {
        return s != INIT_STATE && s != BUSY_STATE && s != FINISH_STATE ? Z_STREAM_ERROR : (y = A = B = Y.pending_buf = null, Y.dstate = null, s == BUSY_STATE ? Z_DATA_ERROR : Z_OK)
    }, Y.deflateParams = function(a, b, c) {
        var d = Z_OK;
        return b == Z_DEFAULT_COMPRESSION && (b = 6), 0 > b || b > 9 || 0 > c || c > Z_HUFFMAN_ONLY ? Z_STREAM_ERROR : (config_table[R].func != config_table[b].func && 0 !== a.total_in && (d = a.deflate(Z_PARTIAL_FLUSH)), R != b && (R = b, Q = config_table[R].max_lazy, T = config_table[R].good_length, U = config_table[R].nice_length, P = config_table[R].max_chain), S = c, d)
    }, Y.deflateSetDictionary = function(a, b, c) {
        a = c;
        var d = 0;
        if (!b || s != INIT_STATE) return Z_STREAM_ERROR;
        if (MIN_MATCH > a) return Z_OK;
        for (a > v - MIN_LOOKAHEAD && (a = v - MIN_LOOKAHEAD, d = c - a), y.set(b.subarray(d, d + a), 0), H = L = a, C = 255 & y[0], C = (C << G ^ 255 & y[1]) & F, b = 0; a - MIN_MATCH >= b; b++) C = (C << G ^ 255 & y[b + (MIN_MATCH - 1)]) & F, A[b & x] = B[C], B[C] = b;
        return Z_OK
    }, Y.deflate = function(a, b) {
        var d, g, j;
        if (b > Z_FINISH || 0 > b) return Z_STREAM_ERROR;
        if (!a.next_out || !a.next_in && 0 !== a.avail_in || s == FINISH_STATE && b != Z_FINISH) return a.msg = z_errmsg[Z_NEED_DICT - Z_STREAM_ERROR], Z_STREAM_ERROR;
        if (0 === a.avail_out) return a.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR], Z_BUF_ERROR;
        if (r = a, d = u, u = b, s == INIT_STATE && (g = Z_DEFLATED + (w - 8 << 4) << 8, j = (R - 1 & 255) >> 1, j > 3 && (j = 3), g |= j << 6, 0 !== L && (g |= PRESET_DICT), s = BUSY_STATE, g += 31 - g % 31, c(g >> 8 & 255), c(255 & g)), 0 !== Y.pending) {
            if (r.flush_pending(), 0 === r.avail_out) return u = -1, Z_OK
        } else if (0 === r.avail_in && d >= b && b != Z_FINISH) return r.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR], Z_BUF_ERROR;
        if (s == FINISH_STATE && 0 !== r.avail_in) return a.msg = z_errmsg[Z_NEED_DICT - Z_BUF_ERROR], Z_BUF_ERROR;
        if (0 !== r.avail_in || 0 !== N || b != Z_NO_FLUSH && s != FINISH_STATE) {
            switch (d = -1, config_table[R].func) {
                case STORED:
                    d = o(b);
                    break;
                case FAST:
                    a: {
                        for (d = 0;;) {
                            if (MIN_LOOKAHEAD > N) {
                                if (n(), MIN_LOOKAHEAD > N && b == Z_NO_FLUSH) {
                                    d = NeedMore;
                                    break a
                                }
                                if (0 === N) break
                            }
                            if (N >= MIN_MATCH && (C = (C << G ^ 255 & y[L + (MIN_MATCH - 1)]) & F, d = 65535 & B[C], A[L & x] = B[C], B[C] = L), 0 !== d && v - MIN_LOOKAHEAD >= (L - d & 65535) && S != Z_HUFFMAN_ONLY && (I = p(d)), I >= MIN_MATCH)
                                if (g = i(L - M, I - MIN_MATCH), N -= I, Q >= I && N >= MIN_MATCH) {
                                    I--;
                                    do L++, C = (C << G ^ 255 & y[L + (MIN_MATCH - 1)]) & F, d = 65535 & B[C], A[L & x] = B[C], B[C] = L; while (0 !== --I);
                                    L++
                                } else L += I, I = 0, C = 255 & y[L], C = (C << G ^ 255 & y[L + 1]) & F;
                            else g = i(0, 255 & y[L]), N--, L++;
                            if (g && (m(!1), 0 === r.avail_out)) {
                                d = NeedMore;
                                break a
                            }
                        }
                        m(b == Z_FINISH),
                        d = 0 === r.avail_out ? b == Z_FINISH ? FinishStarted : NeedMore : b == Z_FINISH ? FinishDone : BlockDone
                    }
                    break;
                case SLOW:
                    d = q(b)
            }
            if ((d == FinishStarted || d == FinishDone) && (s = FINISH_STATE), d == NeedMore || d == FinishStarted) return 0 === r.avail_out && (u = -1), Z_OK;
            if (d == BlockDone) {
                if (b == Z_PARTIAL_FLUSH) e(STATIC_TREES << 1, 3), f(END_BLOCK, StaticTree.static_ltree), h(), 9 > 1 + fa + 10 - ha && (e(STATIC_TREES << 1, 3), f(END_BLOCK, StaticTree.static_ltree), h()), fa = 7;
                else if (l(0, 0, !1), b == Z_FULL_FLUSH)
                    for (d = 0; D > d; d++) B[d] = 0;
                if (r.flush_pending(), 0 === r.avail_out) return u = -1, Z_OK
            }
        }
        return b != Z_FINISH ? Z_OK : Z_STREAM_END
    }
}

function ZStream() {
    this.total_out = this.avail_out = this.total_in = this.avail_in = this.next_out_index = this.next_in_index = 0
}

function Deflater(a) {
    var b = new ZStream,
        c = Z_NO_FLUSH,
        d = new Uint8Array(512);
    "undefined" == typeof a && (a = Z_DEFAULT_COMPRESSION), b.deflateInit(a), b.next_out = d, this.append = function(a, e) {
        var f, g, h = [],
            i = 0,
            j = 0,
            k = 0;
        if (a.length) {
            b.next_in_index = 0, b.next_in = a, b.avail_in = a.length;
            do {
                if (b.next_out_index = 0, b.avail_out = 512, f = b.deflate(c), f != Z_OK) throw "deflating: " + b.msg;
                b.next_out_index && h.push(512 == b.next_out_index ? new Uint8Array(d) : new Uint8Array(d.subarray(0, b.next_out_index))), k += b.next_out_index, e && 0 < b.next_in_index && b.next_in_index != i && (e(b.next_in_index), i = b.next_in_index)
            } while (0 < b.avail_in || 0 === b.avail_out);
            return g = new Uint8Array(k), h.forEach(function(a) {
                g.set(a, j), j += a.length
            }), g
        }
    }, this.flush = function() {
        var a, c, e = [],
            f = 0,
            g = 0;
        do {
            if (b.next_out_index = 0, b.avail_out = 512, a = b.deflate(Z_FINISH), a != Z_STREAM_END && a != Z_OK) throw "deflating: " + b.msg;
            0 < 512 - b.avail_out && e.push(new Uint8Array(d.subarray(0, b.next_out_index))), g += b.next_out_index
        } while (0 < b.avail_in || 0 === b.avail_out);
        return b.deflateEnd(), c = new Uint8Array(g), e.forEach(function(a) {
            c.set(a, f), f += a.length
        }), c
    }
}! function(a) {
    "use strict";
    var b = a.fabric || (a.fabric = {}),
        c = b.util.object.extend,
        d = b.util.object.clone;
    if (b.CurvedText) return void b.warn("fabric.CurvedText is already defined");
    var e = b.Text.prototype.stateProperties.concat();
    e.push("radius", "spacing", "reverse", "effect", "range", "largeFont", "smallFont");
    var f = b.Text.prototype._dimensionAffectingProps;
    f.radius = !0, f.spacing = !0, f.reverse = !0, f.fill = !0, f.effect = !0, f.width = !0, f.height = !0, f.range = !0, f.fontSize = !0, f.shadow = !0, f.largeFont = !0, f.smallFont = !0;
    var g = b.Group.prototype.delegatedProperties;
    g.backgroundColor = !0, g.textBackgroundColor = !0, g.textDecoration = !0, g.stroke = !0, g.strokeWidth = !0, g.shadow = !0, b.CurvedText = b.util.createClass(b.Text, b.Collection, {
        type: "curvedText",
        radius: 50,
        range: 5,
        smallFont: 10,
        largeFont: 30,
        effect: "curved",
        spacing: 0,
        reverse: !1,
        stateProperties: e,
        delegatedProperties: g,
        _dimensionAffectingProps: f,
        _isRendering: 0,
        complexity: function() {
            this.callSuper("complexity")
        },
        initialize: function(a, c) {
            c || (c = {}), this.letters = new b.Group([], {
                selectable: !1,
                padding: 0
            }), this.__skipDimension = !0, this.setOptions(c), this.__skipDimension = !1, this.setText(a)
        },
        setText: function(a) {
            if (this.letters) {
                for (; 0 !== a.length && this.letters.size() >= a.length;) this.letters.remove(this.letters.item(this.letters.size() - 1));
                for (var c = 0; c < a.length; c++) void 0 === this.letters.item(c) ? this.letters.add(new b.Text(a[c])) : this.letters.item(c).setText(a[c])
            }
            this.callSuper("setText", a)
        },
        _render: function() {
            var a = b.util.getRandomInt(100, 999);
            if (this._isRendering = a, this.letters) {
                var c = 0,
                    d = 0,
                    e = 0,
                    f = 0,
                    g = parseInt(this.spacing),
                    h = 0;
                if ("curved" == this.effect) {
                    for (var i = 0, j = this.text.length; j > i; i++) f += this.letters.item(i).width + g;
                    f -= g
                } else "arc" == this.effect && (h = (this.letters.item(0).fontSize + g) / this.radius / (Math.PI / 180), f = (this.text.length + 1) * (this.letters.item(0).fontSize + g));
                c = "right" === this.get("textAlign") ? 90 - f / 2 / this.radius / (Math.PI / 180) : "left" === this.get("textAlign") ? -90 - f / 2 / this.radius / (Math.PI / 180) : -(f / 2 / this.radius / (Math.PI / 180)), this.reverse && (c = -c);
                for (var k = 0, l = this.reverse ? -1 : 1, m = 0, n = 0, i = 0, j = this.text.length; j > i; i++) {
                    if (a !== this._isRendering) return;
                    for (var o in this.delegatedProperties) this.letters.item(i).set(o, this.get(o));
                    if (this.letters.item(i).set("left", k), this.letters.item(i).set("top", 0), this.letters.item(i).setAngle(0), this.letters.item(i).set("padding", 0), "curved" === this.effect) m = (this.letters.item(i).width + g) / this.radius / (Math.PI / 180), d = l * (l * c + n + m / 2), c = l * (l * c + n), e = c * (Math.PI / 180), n = m, this.letters.item(i).setAngle(d), this.letters.item(i).set("top", -1 * l * Math.cos(e) * this.radius), this.letters.item(i).set("left", l * Math.sin(e) * this.radius), this.letters.item(i).set("padding", 0), this.letters.item(i).set("selectable", !1);
                    else if ("arc" === this.effect) c = l * (l * c + h), e = c * (Math.PI / 180), this.letters.item(i).set("top", -1 * l * Math.cos(e) * this.radius), this.letters.item(i).set("left", l * Math.sin(e) * this.radius), this.letters.item(i).set("padding", 0), this.letters.item(i).set("selectable", !1);
                    else if ("STRAIGHT" === this.effect) this.letters.item(i).set("left", k), this.letters.item(i).set("top", 0), this.letters.item(i).setAngle(0), k += this.letters.item(i).get("width"), this.letters.item(i).set("padding", 0), this.letters.item(i).set({
                        borderColor: "red",
                        cornerColor: "green",
                        cornerSize: 6,
                        transparentCorners: !1
                    }), this.letters.item(i).set("selectable", !1);
                    else if ("smallToLarge" === this.effect) {
                        var p = parseInt(this.smallFont),
                            q = parseInt(this.largeFont),
                            r = q - p,
                            s = Math.ceil(this.text.length / 2),
                            t = r / this.text.length,
                            u = p + i * t;
                        this.letters.item(i).set("fontSize", u), this.letters.item(i).set("left", k), k += this.letters.item(i).get("width"), this.letters.item(i).set("padding", 0), this.letters.item(i).set("selectable", !1), this.letters.item(i).set("top", -1 * this.letters.item(i).get("fontSize") + i)
                    } else if ("largeToSmallTop" === this.effect) {
                        var p = parseInt(this.largeFont),
                            q = parseInt(this.smallFont),
                            r = q - p,
                            s = Math.ceil(this.text.length / 2),
                            t = r / this.text.length,
                            u = p + i * t;
                        this.letters.item(i).set("fontSize", u), this.letters.item(i).set("left", k), k += this.letters.item(i).get("width"), this.letters.item(i).set("padding", 0), this.letters.item(i).set({
                            borderColor: "red",
                            cornerColor: "green",
                            cornerSize: 6,
                            transparentCorners: !1
                        }), this.letters.item(i).set("padding", 0), this.letters.item(i).set("selectable", !1), this.letters.item(i).top = -1 * this.letters.item(i).get("fontSize") + i / this.text.length
                    } else if ("largeToSmallBottom" === this.effect) {
                        var p = parseInt(this.largeFont),
                            q = parseInt(this.smallFont),
                            r = q - p,
                            s = Math.ceil(this.text.length / 2),
                            t = r / this.text.length,
                            u = p + i * t;
                        this.letters.item(i).set("fontSize", u), this.letters.item(i).set("left", k), k += this.letters.item(i).get("width"), this.letters.item(i).set("padding", 0), this.letters.item(i).set({
                            borderColor: "red",
                            cornerColor: "green",
                            cornerSize: 6,
                            transparentCorners: !1
                        }), this.letters.item(i).set("padding", 0), this.letters.item(i).set("selectable", !1), this.letters.item(i).top = -1 * this.letters.item(i).get("fontSize") - i
                    } else if ("bulge" === this.effect) {
                        var p = parseInt(this.smallFont),
                            q = parseInt(this.largeFont),
                            r = q - p,
                            s = Math.ceil(this.text.length / 2),
                            t = r / (this.text.length - s);
                        if (s > i) var u = p + i * t;
                        else var u = q - (i - s + 1) * t;
                        this.letters.item(i).set("fontSize", u), this.letters.item(i).set("left", k), k += this.letters.item(i).get("width"), this.letters.item(i).set("padding", 0), this.letters.item(i).set("selectable", !1), this.letters.item(i).set("top", -1 * this.letters.item(i).get("height") / 2)
                    }
                }
                this.letters._calcBounds(), this.letters._updateObjectsCoords(), this.letters.saveCoords(), this.width = this.letters.width, this.height = this.letters.height, this.letters.left = -(this.letters.width / 2), this.letters.top = -(this.letters.height / 2)
            }
        },
        _renderOld: function() {
            if (this.letters) {
                var a = 0,
                    b = 0,
                    c = 0;
                "center" === this.get("textAlign") || "justify" === this.get("textAlign") ? c = this.spacing / 2 * (this.text.length - 1) : "right" === this.get("textAlign") && (c = this.spacing * (this.text.length - 1));
                for (var d = this.reverse ? 1 : -1, e = 0, f = this.text.length; f > e; e++) {
                    a = d * (-e * parseInt(this.spacing, 10) + c), b = a * (Math.PI / 180);
                    for (var g in this.delegatedProperties) this.letters.item(e).set(g, this.get(g));
                    this.letters.item(e).set("top", -Math.cos(b) * this.radius), this.letters.item(e).set("left", +Math.sin(b) * this.radius), this.letters.item(e).setAngle(a), this.letters.item(e).set("padding", 0), this.letters.item(e).set("selectable", !1)
                }
                this.letters._calcBounds(), this.letters._updateObjectsCoords(), this.letters.saveCoords(), this.width = this.letters.width, this.height = this.letters.height, this.letters.left = -(this.letters.width / 2), this.letters.top = -(this.letters.height / 2)
            }
        },
        render: function(a) {
            if (this.visible && this.letters) {
                this.transform(a); {
                    Math.max(this.scaleX, this.scaleY)
                }
                this.clipTo && b.util.clipContext(this, a);
                for (var c = 0, d = this.letters.size(); d > c; c++) {
                    {
                        var e = this.letters.item(c);
                        e.borderScaleFactor, e.hasRotatingPoint
                    }
                    e.visible && e.render(a)
                }
                this.clipTo && a.restore(), this.setCoords()
            }
        },
        _set: function(a, b) {
            this.callSuper("_set", a, b), this.letters && a in this._dimensionAffectingProps && (this._initDimensions(), this.setCoords())
        },
        toObject: function(a) {
            var b = c(this.callSuper("toObject", a), {
                radius: this.radius,
                spacing: this.spacing,
                reverse: this.reverse,
                effect: this.effect,
                range: this.range,
                smallFont: this.smallFont,
                largeFont: this.largeFont
            });
            return this.includeDefaultValues || this._removeDefaultValues(b), b
        },
        toString: function() {
            return "#<fabric.CurvedText (" + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '", "radius": "' + this.radius + '", "spacing": "' + this.spacing + '", "reverse": "' + this.reverse + '" }>'
        },
        toSVG: function(a) {
            var b = ["<g ", 'transform="', this.getSvgTransform(), '">'];
            if (this.letters)
                for (var c = 0, d = this.letters.size(); d > c; c++) b.push(this.letters.item(c).toSVG(a));
            return b.push("</g>"), a ? a(b.join("")) : b.join("")
        }
    }), b.CurvedText.fromObject = function(a) {
        return new b.CurvedText(a.text, d(a))
    }, b.util.createAccessors(b.CurvedText), b.CurvedText.async = !1
}("undefined" != typeof exports ? exports : this), ! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
}), ! function(a, b, c) {
    ! function(b) {
        var d = "function" == typeof define && define.amd,
            e = "https:" == c.location.protocol ? "https:" : "http:",
            f = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
        d || a.event.special.mousewheel || a("head").append(decodeURI("%3Cscript src=" + e + "//" + f + "%3E%3C/script%3E")), b()
    }(function() {
            var d, e = "mCustomScrollbar",
                f = "mCS",
                g = ".mCustomScrollbar",
                h = {
                    setTop: 0,
                    setLeft: 0,
                    axis: "y",
                    scrollbarPosition: "inside",
                    scrollInertia: 950,
                    autoDraggerLength: !0,
                    alwaysShowScrollbar: 0,
                    snapOffset: 0,
                    mouseWheel: {
                        enable: !0,
                        scrollAmount: "auto",
                        axis: "y",
                        deltaFactor: "auto",
                        disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                    },
                    scrollButtons: {
                        scrollType: "stepless",
                        scrollAmount: "auto"
                    },
                    keyboard: {
                        enable: !0,
                        scrollType: "stepless",
                        scrollAmount: "auto"
                    },
                    contentTouchScroll: 25,
                    advanced: {
                        autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                        updateOnContentResize: !0,
                        updateOnImageLoad: !0
                    },
                    theme: "light",
                    callbacks: {
                        onTotalScrollOffset: 0,
                        onTotalScrollBackOffset: 0,
                        alwaysTriggerOffsets: !0
                    }
                },
                i = 0,
                j = {},
                k = b.attachEvent && !b.addEventListener ? 1 : 0,
                l = !1,
                m = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
                n = {
                    init: function(b) {
                        var b = a.extend(!0, {}, h, b),
                            c = o.call(this);
                        if (b.live) {
                            var d = b.liveSelector || this.selector || g,
                                e = a(d);
                            if ("off" === b.live) return void q(d);
                            j[d] = setTimeout(function() {
                                e.mCustomScrollbar(b), "once" === b.live && e.length && q(d)
                            }, 500)
                        } else q(d);
                        return b.setWidth = b.set_width ? b.set_width : b.setWidth, b.setHeight = b.set_height ? b.set_height : b.setHeight, b.axis = b.horizontalScroll ? "x" : r(b.axis), b.scrollInertia = b.scrollInertia > 0 && b.scrollInertia < 17 ? 17 : b.scrollInertia, "object" != typeof b.mouseWheel && 1 == b.mouseWheel && (b.mouseWheel = {
                            enable: !0,
                            scrollAmount: "auto",
                            axis: "y",
                            preventDefault: !1,
                            deltaFactor: "auto",
                            normalizeDelta: !1,
                            invert: !1
                        }), b.mouseWheel.scrollAmount = b.mouseWheelPixels ? b.mouseWheelPixels : b.mouseWheel.scrollAmount, b.mouseWheel.normalizeDelta = b.advanced.normalizeMouseWheelDelta ? b.advanced.normalizeMouseWheelDelta : b.mouseWheel.normalizeDelta, b.scrollButtons.scrollType = s(b.scrollButtons.scrollType), p(b), a(c).each(function() {
                            var c = a(this);
                            if (!c.data(f)) {
                                c.data(f, {
                                    idx: ++i,
                                    opt: b,
                                    scrollRatio: {
                                        y: null,
                                        x: null
                                    },
                                    overflowed: null,
                                    contentReset: {
                                        y: null,
                                        x: null
                                    },
                                    bindEvents: !1,
                                    tweenRunning: !1,
                                    sequential: {},
                                    langDir: c.css("direction"),
                                    cbOffsets: null,
                                    trigger: null
                                });
                                var d = c.data(f),
                                    e = d.opt,
                                    g = c.data("mcs-axis"),
                                    h = c.data("mcs-scrollbar-position"),
                                    j = c.data("mcs-theme");
                                g && (e.axis = g), h && (e.scrollbarPosition = h), j && (e.theme = j, p(e)), t.call(this), a("#mCSB_" + d.idx + "_container img:not(." + m[2] + ")").addClass(m[2]), n.update.call(null, c)
                            }
                        })
                    },
                    update: function(b, c) {
                        var d = b || o.call(this);
                        return a(d).each(function() {
                            var b = a(this);
                            if (b.data(f)) {
                                var d = b.data(f),
                                    e = d.opt,
                                    g = a("#mCSB_" + d.idx + "_container"),
                                    h = [a("#mCSB_" + d.idx + "_dragger_vertical"), a("#mCSB_" + d.idx + "_dragger_horizontal")];
                                if (!g.length) return;
                                d.tweenRunning && W(b), b.hasClass(m[3]) && b.removeClass(m[3]), b.hasClass(m[4]) && b.removeClass(m[4]), x.call(this), v.call(this), "y" === e.axis || e.advanced.autoExpandHorizontalScroll || g.css("width", u(g.children())), d.overflowed = B.call(this), F.call(this), e.autoDraggerLength && y.call(this), z.call(this), D.call(this);
                                var i = [Math.abs(g[0].offsetTop), Math.abs(g[0].offsetLeft)];
                                "x" !== e.axis && (d.overflowed[0] ? h[0].height() > h[0].parent().height() ? C.call(this) : (X(b, i[0].toString(), {
                                    dir: "y",
                                    dur: 0,
                                    overwrite: "none"
                                }), d.contentReset.y = null) : (C.call(this), "y" === e.axis ? E.call(this) : "yx" === e.axis && d.overflowed[1] && X(b, i[1].toString(), {
                                    dir: "x",
                                    dur: 0,
                                    overwrite: "none"
                                }))), "y" !== e.axis && (d.overflowed[1] ? h[1].width() > h[1].parent().width() ? C.call(this) : (X(b, i[1].toString(), {
                                    dir: "x",
                                    dur: 0,
                                    overwrite: "none"
                                }), d.contentReset.x = null) : (C.call(this), "x" === e.axis ? E.call(this) : "yx" === e.axis && d.overflowed[0] && X(b, i[0].toString(), {
                                    dir: "y",
                                    dur: 0,
                                    overwrite: "none"
                                }))), c && d && (2 === c && e.callbacks.onImageLoad && "function" == typeof e.callbacks.onImageLoad ? e.callbacks.onImageLoad.call(this) : 3 === c && e.callbacks.onSelectorChange && "function" == typeof e.callbacks.onSelectorChange ? e.callbacks.onSelectorChange.call(this) : e.callbacks.onUpdate && "function" == typeof e.callbacks.onUpdate && e.callbacks.onUpdate.call(this)), U.call(this)
                            }
                        })
                    },
                    scrollTo: function(b, c) {
                        if ("undefined" != typeof b && null != b) {
                            var d = o.call(this);
                            return a(d).each(function() {
                                var d = a(this);
                                if (d.data(f)) {
                                    var e = d.data(f),
                                        g = e.opt,
                                        h = {
                                            trigger: "external",
                                            scrollInertia: g.scrollInertia,
                                            scrollEasing: "mcsEaseInOut",
                                            moveDragger: !1,
                                            timeout: 60,
                                            callbacks: !0,
                                            onStart: !0,
                                            onUpdate: !0,
                                            onComplete: !0
                                        },
                                        i = a.extend(!0, {}, h, c),
                                        j = S.call(this, b),
                                        k = i.scrollInertia > 0 && i.scrollInertia < 17 ? 17 : i.scrollInertia;
                                    j[0] = T.call(this, j[0], "y"), j[1] = T.call(this, j[1], "x"), i.moveDragger && (j[0] *= e.scrollRatio.y, j[1] *= e.scrollRatio.x), i.dur = k, setTimeout(function() {
                                        null !== j[0] && "undefined" != typeof j[0] && "x" !== g.axis && e.overflowed[0] && (i.dir = "y", i.overwrite = "all", X(d, j[0].toString(), i)), null !== j[1] && "undefined" != typeof j[1] && "y" !== g.axis && e.overflowed[1] && (i.dir = "x", i.overwrite = "none", X(d, j[1].toString(), i))
                                    }, i.timeout)
                                }
                            })
                        }
                    },
                    stop: function() {
                        var b = o.call(this);
                        return a(b).each(function() {
                            var b = a(this);
                            b.data(f) && W(b)
                        })
                    },
                    disable: function(b) {
                        var c = o.call(this);
                        return a(c).each(function() {
                            var c = a(this);
                            c.data(f) && (c.data(f), U.call(this, "remove"), E.call(this), b && C.call(this), F.call(this, !0), c.addClass(m[3]))
                        })
                    },
                    destroy: function() {
                        var b = o.call(this);
                        return a(b).each(function() {
                            var c = a(this);
                            if (c.data(f)) {
                                var d = c.data(f),
                                    g = d.opt,
                                    h = a("#mCSB_" + d.idx),
                                    i = a("#mCSB_" + d.idx + "_container"),
                                    j = a(".mCSB_" + d.idx + "_scrollbar");
                                g.live && q(g.liveSelector || a(b).selector), U.call(this, "remove"), E.call(this), C.call(this), c.removeData(f), _(this, "mcs"), j.remove(), i.find("img." + m[2]).removeClass(m[2]), h.replaceWith(i.contents()), c.removeClass(e + " _" + f + "_" + d.idx + " " + m[6] + " " + m[7] + " " + m[5] + " " + m[3]).addClass(m[4])
                            }
                        })
                    }
                },
                o = function() {
                    return "object" != typeof a(this) || a(this).length < 1 ? g : this
                },
                p = function(b) {
                    var c = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                        d = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                        e = ["minimal", "minimal-dark"],
                        f = ["minimal", "minimal-dark"],
                        g = ["minimal", "minimal-dark"];
                    b.autoDraggerLength = a.inArray(b.theme, c) > -1 ? !1 : b.autoDraggerLength, b.autoExpandScrollbar = a.inArray(b.theme, d) > -1 ? !1 : b.autoExpandScrollbar, b.scrollButtons.enable = a.inArray(b.theme, e) > -1 ? !1 : b.scrollButtons.enable, b.autoHideScrollbar = a.inArray(b.theme, f) > -1 ? !0 : b.autoHideScrollbar, b.scrollbarPosition = a.inArray(b.theme, g) > -1 ? "outside" : b.scrollbarPosition
                },
                q = function(a) {
                    j[a] && (clearTimeout(j[a]), _(j, a))
                },
                r = function(a) {
                    return "yx" === a || "xy" === a || "auto" === a ? "yx" : "x" === a || "horizontal" === a ? "x" : "y"
                },
                s = function(a) {
                    return "stepped" === a || "pixels" === a || "step" === a || "click" === a ? "stepped" : "stepless"
                },
                t = function() {
                    var b = a(this),
                        c = b.data(f),
                        d = c.opt,
                        g = d.autoExpandScrollbar ? " " + m[1] + "_expand" : "",
                        h = ["<div id='mCSB_" + c.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + c.idx + "_scrollbar mCS-" + d.theme + " mCSB_scrollTools_vertical" + g + "'><div class='" + m[12] + "'><div id='mCSB_" + c.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + c.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + c.idx + "_scrollbar mCS-" + d.theme + " mCSB_scrollTools_horizontal" + g + "'><div class='" + m[12] + "'><div id='mCSB_" + c.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                        i = "yx" === d.axis ? "mCSB_vertical_horizontal" : "x" === d.axis ? "mCSB_horizontal" : "mCSB_vertical",
                        j = "yx" === d.axis ? h[0] + h[1] : "x" === d.axis ? h[1] : h[0],
                        k = "yx" === d.axis ? "<div id='mCSB_" + c.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                        l = d.autoHideScrollbar ? " " + m[6] : "",
                        n = "x" !== d.axis && "rtl" === c.langDir ? " " + m[7] : "";
                    d.setWidth && b.css("width", d.setWidth), d.setHeight && b.css("height", d.setHeight), d.setLeft = "y" !== d.axis && "rtl" === c.langDir ? "989999px" : d.setLeft, b.addClass(e + " _" + f + "_" + c.idx + l + n).wrapInner("<div id='mCSB_" + c.idx + "' class='mCustomScrollBox mCS-" + d.theme + " " + i + "'><div id='mCSB_" + c.idx + "_container' class='mCSB_container' style='position:relative; top:" + d.setTop + "; left:" + d.setLeft + ";' dir=" + c.langDir + " /></div>");
                    var o = a("#mCSB_" + c.idx),
                        p = a("#mCSB_" + c.idx + "_container");
                    "y" === d.axis || d.advanced.autoExpandHorizontalScroll || p.css("width", u(p.children())), "outside" === d.scrollbarPosition ? ("static" === b.css("position") && b.css("position", "relative"), b.css("overflow", "visible"), o.addClass("mCSB_outside").after(j)) : (o.addClass("mCSB_inside").append(j), p.wrap(k)), w.call(this);
                    var q = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")];
                    q[0].css("min-height", q[0].height()), q[1].css("min-width", q[1].width())
                },
                u = function(b) {
                    return Math.max.apply(Math, b.map(function() {
                        return a(this).outerWidth(!0)
                    }).get())
                },
                v = function() {
                    var b = a(this),
                        c = b.data(f),
                        d = c.opt,
                        e = a("#mCSB_" + c.idx + "_container");
                    d.advanced.autoExpandHorizontalScroll && "y" !== d.axis && e.css({
                        position: "absolute",
                        width: "auto"
                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                        width: Math.ceil(e[0].getBoundingClientRect().right + .4) - Math.floor(e[0].getBoundingClientRect().left),
                        position: "relative"
                    }).unwrap()
                },
                w = function() {
                    var b = a(this),
                        c = b.data(f),
                        d = c.opt,
                        e = a(".mCSB_" + c.idx + "_scrollbar:first"),
                        g = ca(d.scrollButtons.tabindex) ? "tabindex='" + d.scrollButtons.tabindex + "'" : "",
                        h = ["<a href='#' class='" + m[13] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + m[14] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + m[15] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + m[16] + "' oncontextmenu='return false;' " + g + " />"],
                        i = ["x" === d.axis ? h[2] : h[0], "x" === d.axis ? h[3] : h[1], h[2], h[3]];
