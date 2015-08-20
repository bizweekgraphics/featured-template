projector_require = function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;
                if (!h && i) return i(g, !0);
                if (f) return f(g, !0);
                var j = new Error("Cannot find module '" + g + "'");
                throw j.code = "MODULE_NOT_FOUND", j
            }
            var k = c[g] = {
                exports: {}
            };
            b[g][0].call(k.exports, function(a) {
                var c = b[g][1][a];
                return e(c ? c : a)
            }, k, k.exports, a, b, c, d)
        }
        return c[g].exports
    }
    for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
    return e
}({
    1: [function() {}, {}],
    2: [function(a, b) {
        b.exports.isIOS = function() {
            return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) ? !0 : !1
        }, b.exports.isAndroid = function() {
            return navigator.userAgent.match(/Android/i) ? !0 : !1
        }
    }, {}],
    3: [function(a, b) {
        function c(b, c, d) {
            function e(a) {
                throw new Error("'" + a + "' is missing")
            }
            this.options = b || e("options"), this.video = c || e("video"), this.device_utils = "undefined" == typeof d ? a("device-utils-js") : d, this._init()
        }

        function d() {
            return this.video.preroll_ad_unit && this.options.vertical
        }

        function e() {
            return [this.options.vertical, this.video.preroll_ad_unit].join("/")
        }

        function f() {
            return this.live ? this.options.ad_tag : this.video.ad_tag
        }

        function g(a) {
            return this.apply_offsite_embed(this.prepend_ad_code_prefix(a))
        }

        function h() {
            return g.call(this, !this.live && d.call(this) ? e.call(this) : f.call(this))
        }

        function i() {
            return this.live ? g.call(this, this.options.ad_tag_midroll) : ""
        }

        function j(a) {
            var b = {};
            if (!a) return b;
            for (var c = a.split(/[;&]/), d = 0; d < c.length; d++) {
                var e = c[d].split("=");
                e && 2 == e.length && (b[unescape(e[0])] = unescape(e[1]).replace(/\+/g, " "))
            }
            return b
        }
        var k = function(a) {
            return a ? a : ""
        };
        c.prototype._init = function() {
            this.live = this.options.live ? !0 : !1, this.prepend_ad_code_prefix = this.options.ad_code_prefix ? function(a) {
                return a ? this.options.ad_code_prefix + a : ""
            } : k, this.offsite_embed = this.options.offsite_embed && (this.options.offsite_embed === !0 || "true" === this.options.offsite_embed), this.apply_offsite_embed = this.offsite_embed ? function(a) {
                return a ? a.replace(/\/vod$/, "/embed/vod").replace(/\/vod\//g, "/embed/vod/").replace(/^vod\//, "embed/vod/") : ""
            } : k, this.preroll_unit = h.apply(this), this.midroll_unit = i.apply(this), this.ads_enabled = "disabled" !== this.options.module_ad_player && (this.preroll_unit || this.midroll_unit) ? !0 : !1
        }, c.prototype.cust_params = function() {
            var a = {};
            return this.video.ni && (a.ni = this.video.ni), this.video.id && (a.guid = this.video.id), a.autoplay = this.options.video_autoplay_on_page ? !0 : !1, a.platform = this.device_utils.isIOS() || this.device_utils.isAndroid() ? "mobile" : "desktop", a
        }, c.prototype.merge_cust_params = function(a) {
            function b(a, b) {
                e && (e += "&"), e = e + a + "=" + b
            }
            var c = j(decodeURIComponent(a)),
                d = this.cust_params(),
                e = "";
            return ["ni", "guid", "autoplay", "platform"].forEach(function(a) {
                d.hasOwnProperty(a) && (delete c[a], b(a, d[a]))
            }), Object.keys(c).sort().forEach(function(a) {
                b(a, c[a])
            }), e
        }, c.prototype.prepare = function() {
            return this.ads_enabled ? {
                module_ad_player: "enabled",
                ad_tag: this.preroll_unit,
                ad_tag_midroll: this.midroll_unit,
                ad_tag_cust_params_preroll: this.preroll_unit ? encodeURIComponent(this.merge_cust_params(this.options.ad_tag_cust_params_preroll)) : "",
                ad_tag_cust_params_midroll: this.midroll_unit ? encodeURIComponent(this.merge_cust_params(this.options.ad_tag_cust_params_midroll)) : "",
                share_overrides: {
                    ad_tag: this.preroll_unit,
                    ad_tag_midroll: this.midroll_unit
                }
            } : {
                module_ad_player: "disabled",
                ad_tag: "",
                ad_tag_midroll: "",
                ad_tag_cust_params_preroll: "",
                share_overrides: {
                    ad_tag: "",
                    ad_tag_midroll: ""
                }
            }
        }, b.exports = c
    }, {
        "device-utils-js": 2
    }],
    4: [function(a, b) {
        b.exports.isIEBasedXml = function() {
            return void 0 !== window.ActiveXObject
        }, b.exports.parseXml = function(a) {
            if (this.isIEBasedXml()) {
                var b = new window.ActiveXObject("Microsoft.XMLDOM");
                if (b) return b.async = "false", b.loadXML(a), b
            }
            var c = new window.DOMParser;
            return c.parseFromString(a, "text/xml")
        }, b.exports.removeXmlNamespaces = function(a) {
            return a.replace(/xmlns[:]*[a-z]*=\"[^\"]*\"/g, "").replace(/xsi[:]*[a-z]*=\"[^\"]*\"/g, "")
        }, b.exports.getNodeForXPath = function(a, b) {
            if (this.isIEBasedXml()) return a.selectSingleNode(b);
            var c = a.evaluate(b, a.documentElement, null, XPathResult.ANY_TYPE, null);
            return c ? c.iterateNext() : null
        }, b.exports.getTextForXPath = function(a, b) {
            var c = this.getNodeForXPath(a, b);
            if (c) {
                var d = this.getTextForNode(c);
                if (d) return d
            }
            return null
        }, b.exports.getTextForNode = function(a) {
            return a ? this.isIEBasedXml() ? a.childNodes && a.childNodes[0] && void 0 !== a.childNodes.nodeValue ? a.childNodes[0].nodeValue : null : void 0 !== a.textContent ? a.textContent : null : null
        }
    }, {}],
    5: [function(a, b) {
        var c = a("xml-utils-js"),
            d = a("./video-stream"),
            e = a("./caption"),
            f = a("./comscore-metadata"),
            g = "/bmObject/bmContents/bmContent/descriptions/description/ExtensionGroup/bmBloombergCustom",
            h = "/bmObject/bmContents/bmContent/descriptions/description/bmContentDescription/alternativeTitle",
            i = {
                resourceID: "/bmObject/resourceID",
                durationMSec: g + "/durationMSec",
                createdUnixUTC: g + "/createdUnixUTC",
                showName: g + "/showName",
                thumbnails: g + "/thumbnails",
                niCodes: g + "/NiCodes",
                comscore: {
                    nt_st_ep: g + "/comscore/nt_st_ep",
                    bb_pub_d: g + "/comscore/bb_pub_d",
                    ns_st_ty: g + "/comscore/ns_st_ty",
                    c5: g + "/comscore/C5"
                },
                web_title: h + '[@typeDefinition="web_title"]',
                mobile_title: h + '[@typeDefinition="mobile_title"]',
                avmm_media_title: h + '[@typeDefinition="avmm_media_title"]',
                terminal_story_title: h + '[@typeDefinition="terminal_story_title"]',
                seo_title: h + '[@typeDefinition="seo_title"]'
            },
            j = function(a) {
                this.bmmrResponse = a, this.xmlObject, this.id, this.duration, this.createDate, this.showName, this.niCodes, this.images, this.version, this.captions, this.webTitle, this.mobileTitle, this.avmmMediaTitle, this.terminalStoryTitle, this.seoTitle, this.comscoreTitle, this.title, this._init()
            };
        j.prototype._init = function() {
            if (!this.bmmrResponse || !this.bmmrResponse.xml) throw new Error("Invalid BMMR response passed.");
            var a = c.removeXmlNamespaces(this.bmmrResponse.xml);
            this.xmlObject = c.parseXml(a), this.id = c.getTextForXPath(this.xmlObject, i.resourceID), this.duration = this._extractDuration(), this.createDate = this._extractCreateDate(), this.showName = c.getTextForXPath(this.xmlObject, i.showName), this.niCodes = this._extractNiCodes(), this.images = this._extractImages(), this.webTitle = c.getTextForXPath(this.xmlObject, i.web_title), this.mobileTitle = c.getTextForXPath(this.xmlObject, i.mobile_title), this.avmmMediaTitle = c.getTextForXPath(this.xmlObject, i.avmm_media_title), this.terminalStoryTitle = c.getTextForXPath(this.xmlObject, i.terminal_story_title), this.seoTitle = c.getTextForXPath(this.xmlObject, i.seo_title), this.comscoreTitle = c.getTextForXPath(this.xmlObject, i.comscore.nt_st_ep), this.title = this._getPrimaryTitle(), this.captions = this._extractCaptions(), this.streams = this._extractStreams(), this.comscoreMetadata = this._extractComscoreMetadata()
        }, j.prototype._extractComscoreMetadata = function() {
            return new f({
                ntStEp: c.getTextForXPath(this.xmlObject, i.comscore.nt_st_ep),
                nsStTy: c.getTextForXPath(this.xmlObject, i.comscore.ns_st_ty),
                c5: c.getTextForXPath(this.xmlObject, i.comscore.c5),
                bbPubD: c.getTextForXPath(this.xmlObject, i.comscore.bb_pub_d)
            })
        }, j.prototype._extractStreams = function() {
            var a = [];
            if (this.bmmrResponse.streams)
                for (var b = 0; b < this.bmmrResponse.streams.length; ++b) a.push(new d(this.bmmrResponse.streams[b]));
            return a
        }, j.prototype._extractCaptions = function() {
            var a = [];
            return this.bmmrResponse.captions && a.push(new e({
                url: this.bmmrResponse.captions
            })), a
        }, j.prototype._getPrimaryTitle = function() {
            return this.webTitle || this.mobileTitle || this.avmmMediaTitle || this.terminalStoryTitle || this.seoTitle || this.comscoreTitle || ""
        }, j.prototype._extractDuration = function() {
            var a = c.getTextForXPath(this.xmlObject, i.durationMSec);
            return a ? parseInt(a) : null
        }, j.prototype._extractCreateDate = function() {
            var a = c.getTextForXPath(this.xmlObject, i.createdUnixUTC),
                b = 1e3 * parseInt(a);
            return b ? this._getBasicDate(new Date(b)) : null
        }, j.prototype._extractNiCodes = function() {
            var a = [],
                b = c.getNodeForXPath(this.xmlObject, i.niCodes);
            if (b)
                for (var d = b.childNodes, e = 0; e < d.length; ++e) {
                    for (var f = d[e], g = f.childNodes, h = {}, j = 0; j < g.length; ++j) {
                        var k = g[j];
                        "code" === k.nodeName ? h.code = c.getTextForNode(k) : "description" === k.nodeName && (h.description = c.getTextForNode(k))
                    }
                    a.push(h)
                }
            return a
        }, j.prototype._extractImages = function() {
            var a = [],
                b = c.getNodeForXPath(this.xmlObject, i.thumbnails);
            if (b)
                for (var d = b.childNodes, e = 0; e < d.length; ++e) {
                    for (var f, g, h, j, k = d[e], l = k.childNodes, m = 0; m < l.length; ++m) {
                        var n = l[m],
                            o = n.nodeName,
                            p = c.getTextForNode(n);
                        switch (o) {
                            case "imageIDEncoded":
                                f = p;
                                break;
                            case "imageExtension":
                                g = p;
                                break;
                            case "imageWidth":
                                h = p;
                                break;
                            case "imageHeight":
                                j = p
                        }
                    }
                    a.push({
                        url: "http://www.bloomberg.com/image/" + f + "." + g,
                        width: parseInt(h),
                        height: parseInt(j)
                    })
                }
            return a
        }, j.prototype.getId = function() {
            return this.id
        }, j.prototype.getTitle = function() {
            return this.title
        }, j.prototype.getDuration = function() {
            return this.duration
        }, j.prototype.getCreateDate = function() {
            return this.createDate
        }, j.prototype.getShowName = function() {
            return this.showName
        }, j.prototype.getNiCodes = function() {
            return this.niCodes
        }, j.prototype.getImages = function() {
            return this.images
        }, j.prototype.getVersion = function() {
            return this.version
        }, j.prototype.getCaptions = function() {
            return this.captions
        }, j.prototype.getStreams = function() {
            return this.streams
        }, j.prototype.getComscoreMetadata = function() {
            return this.comscoreMetadata
        }, j.prototype.closestImage = function(a, b) {
            if (!a || !b || 0 > a || 0 > b) return null;
            for (var c, d, e = 999999999, f = 0; f < this.images.length; f++) {
                var g = this.images[f];
                d = Math.abs(a / b - g.width / g.height) + Math.abs(a - g.width) / 1e3 + Math.abs(b - g.height) / 1e3, e > d && (e = d, c = g.url)
            }
            return c
        }, j.prototype._getBasicDate = function(a) {
            if (!(a && a instanceof Date)) return null;
            var b = String(a.getUTCFullYear()),
                c = String(a.getUTCMonth() + 1);
            c.length < 2 && (c = "0" + c);
            var d = String(a.getUTCDate());
            return d.length < 2 && (d = "0" + d), b + "-" + c + "-" + d
        }, b.exports = j
    }, {
        "./caption": 6,
        "./comscore-metadata": 7,
        "./video-stream": 8,
        "xml-utils-js": 4
    }],
    6: [function(a, b) {
        var c = function(a) {
            this.config = a, this.url, this._init()
        };
        c.prototype._init = function() {
            this.url = this.config.url ? this.config.url : null
        }, c.prototype.getUrl = function() {
            return this.url
        }, b.exports = c
    }, {}],
    7: [function(a, b) {
        var c = function(a) {
            this.config = a, this.ntStEp, this.nsStTy, this.bbPubD, this.c5, this._init()
        };
        c.prototype._init = function() {
            this.ntStEp = this.config.ntStEp ? this.config.ntStEp : null, this.nsStTy = this.config.nsStTy ? this.config.nsStTy : null, this.bbPubD = this.config.bbPubD ? this.config.bbPubD : null, this.c5 = this.config.c5 ? this.config.c5 : null
        }, c.prototype.getNtStEp = function() {
            return this.ntStEp
        }, c.prototype.getNsStTy = function() {
            return this.nsStTy
        }, c.prototype.getBbPubD = function() {
            return this.bbPubD
        }, c.prototype.getC5 = function() {
            return this.c5
        }, b.exports = c
    }, {}],
    8: [function(a, b) {
        var c = function(a) {
            this.bmmrStream = a, this.videoCodec, this.muxingFormat, this.videoBitrate, this.audioCodec, this.audioBitrate, this.profile, this.streamType, this.url, this.height, this.width, this.fileSize, this.percent, this._init()
        };
        c.prototype._init = function() {
            this.videoCodec = this.bmmrStream.video_codec ? this.bmmrStream.video_codec : null, this.muxingFormat = this.bmmrStream.muxing_format ? this.bmmrStream.muxing_format : null, this.videoBitrate = this.bmmrStream.video_bitrate ? parseInt(this.bmmrStream.video_bitrate) : 0, this.audioCodec = this.bmmrStream.audio_codec ? this.bmmrStream.audio_codec : null, this.audioBitrate = this.bmmrStream.audio_bitrate ? parseInt(this.bmmrStream.audio_bitrate) : null, this.profile = this.bmmrStream.profile ? this.bmmrStream.profile : null, this.streamType = this.bmmrStream.stream_type ? this.bmmrStream.stream_type : null, this.url = this.bmmrStream.url ? this.bmmrStream.url : null, this.height = this.bmmrStream.height ? parseInt(this.bmmrStream.height) : null, this.width = this.bmmrStream.width ? parseInt(this.bmmrStream.width) : null, this.fileSize = this.bmmrStream.file_size ? parseInt(this.bmmrStream.file_size) : null, this.percent = this.bmmrStream.percent ? parseInt(this.bmmrStream.percent) : null
        }, c.prototype.getVideoCodec = function() {
            return this.videoCodec
        }, c.prototype.getMuxingFormat = function() {
            return this.muxingFormat
        }, c.prototype.getVideoBitrate = function() {
            return this.videoBitrate
        }, c.prototype.getAudioCodec = function() {
            return this.audioCodec
        }, c.prototype.getAudioBitrate = function() {
            return this.audioBitrate
        }, c.prototype.getProfile = function() {
            return this.profile
        }, c.prototype.getStreamType = function() {
            return this.streamType
        }, c.prototype.getUrl = function() {
            return this.url
        }, c.prototype.getHeight = function() {
            return this.height
        }, c.prototype.getWidth = function() {
            return this.width
        }, c.prototype.getFileSize = function() {
            return this.fileSize
        }, c.prototype.getPercent = function() {
            return this.percent
        }, b.exports = c
    }, {}],
    9: [function(a, b) {
        "use strict";
        var c = a("./lib/js-yaml.js");
        b.exports = c
    }, {
        "./lib/js-yaml.js": 10
    }],
    10: [function(a, b) {
        "use strict";

        function c(a) {
            return function() {
                throw new Error("Function " + a + " is deprecated and cannot be used.")
            }
        }
        var d = a("./js-yaml/loader"),
            e = a("./js-yaml/dumper");
        b.exports.Type = a("./js-yaml/type"), b.exports.Schema = a("./js-yaml/schema"), b.exports.FAILSAFE_SCHEMA = a("./js-yaml/schema/failsafe"), b.exports.JSON_SCHEMA = a("./js-yaml/schema/json"), b.exports.CORE_SCHEMA = a("./js-yaml/schema/core"), b.exports.DEFAULT_SAFE_SCHEMA = a("./js-yaml/schema/default_safe"), b.exports.DEFAULT_FULL_SCHEMA = a("./js-yaml/schema/default_full"), b.exports.load = d.load, b.exports.loadAll = d.loadAll, b.exports.safeLoad = d.safeLoad, b.exports.safeLoadAll = d.safeLoadAll, b.exports.dump = e.dump, b.exports.safeDump = e.safeDump, b.exports.YAMLException = a("./js-yaml/exception"), b.exports.MINIMAL_SCHEMA = a("./js-yaml/schema/failsafe"), b.exports.SAFE_SCHEMA = a("./js-yaml/schema/default_safe"), b.exports.DEFAULT_SCHEMA = a("./js-yaml/schema/default_full"), b.exports.scan = c("scan"), b.exports.parse = c("parse"), b.exports.compose = c("compose"), b.exports.addConstructor = c("addConstructor")
    }, {
        "./js-yaml/dumper": 12,
        "./js-yaml/exception": 13,
        "./js-yaml/loader": 14,
        "./js-yaml/schema": 16,
        "./js-yaml/schema/core": 17,
        "./js-yaml/schema/default_full": 18,
        "./js-yaml/schema/default_safe": 19,
        "./js-yaml/schema/failsafe": 20,
        "./js-yaml/schema/json": 21,
        "./js-yaml/type": 22
    }],
    11: [function(a, b) {
        "use strict";

        function c(a) {
            return void 0 === a || null === a
        }

        function d(a) {
            return "object" == typeof a && null !== a
        }

        function e(a) {
            return Array.isArray(a) ? a : c(a) ? [] : [a]
        }

        function f(a, b) {
            var c, d, e, f;
            if (b)
                for (f = Object.keys(b), c = 0, d = f.length; d > c; c += 1) e = f[c], a[e] = b[e];
            return a
        }

        function g(a, b) {
            var c, d = "";
            for (c = 0; b > c; c += 1) d += a;
            return d
        }

        function h(a) {
            return 0 === a && Number.NEGATIVE_INFINITY === 1 / a
        }
        b.exports.isNothing = c, b.exports.isObject = d, b.exports.toArray = e, b.exports.repeat = g, b.exports.isNegativeZero = h, b.exports.extend = f
    }, {}],
    12: [function(a, b) {
        "use strict";

        function c(a, b) {
            var c, d, e, f, g, h, i;
            if (null === b) return {};
            for (c = {}, d = Object.keys(b), e = 0, f = d.length; f > e; e += 1) g = d[e], h = String(b[g]), "!!" === g.slice(0, 2) && (g = "tag:yaml.org,2002:" + g.slice(2)), i = a.compiledTypeMap[g], i && x.call(i.styleAliases, h) && (h = i.styleAliases[h]), c[g] = h;
            return c
        }

        function d(a) {
            var b, c, d;
            if (b = a.toString(16).toUpperCase(), 255 >= a) c = "x", d = 2;
            else if (65535 >= a) c = "u", d = 4;
            else {
                if (!(4294967295 >= a)) throw new t("code point within a string may not be greater than 0xFFFFFFFF");
                c = "U", d = 8
            }
            return "\\" + c + s.repeat("0", d - b.length) + b
        }

        function e(a) {
            this.schema = a.schema || u, this.indent = Math.max(1, a.indent || 2), this.skipInvalid = a.skipInvalid || !1, this.flowLevel = s.isNothing(a.flowLevel) ? -1 : a.flowLevel, this.styleMap = c(this.schema, a.styles || null), this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null
        }

        function f(a, b) {
            return "\n" + s.repeat(" ", a.indent * b)
        }

        function g(a, b) {
            var c, d, e;
            for (c = 0, d = a.implicitTypes.length; d > c; c += 1)
                if (e = a.implicitTypes[c], e.resolve(b)) return !0;
            return !1
        }

        function h(a, b) {
            var c, e, f, h, i, j;
            for (a.dump = "", c = !1, e = 0, j = b.charCodeAt(0) || 0, -1 !== W.indexOf(b) ? c = !0 : 0 === b.length ? c = !0 : B === j || B === b.charCodeAt(b.length - 1) ? c = !0 : (K === j || N === j) && (c = !0), f = 0, h = b.length; h > f; f += 1) i = b.charCodeAt(f), c || (y === i || z === i || A === i || J === i || P === i || Q === i || S === i || U === i || E === i || G === i || I === i || C === i || T === i || M === i || H === i || D === i || F === i || O === i || L === i || R === i) && (c = !0), (V[i] || !(i >= 32 && 126 >= i || 133 === i || i >= 160 && 55295 >= i || i >= 57344 && 65533 >= i || i >= 65536 && 1114111 >= i)) && (a.dump += b.slice(e, f), a.dump += V[i] || d(i), e = f + 1, c = !0);
            f > e && (a.dump += b.slice(e, f)), !c && g(a, a.dump) && (c = !0), c && (a.dump = '"' + a.dump + '"')
        }

        function i(a, b, c) {
            var d, e, f = "",
                g = a.tag;
            for (d = 0, e = c.length; e > d; d += 1) n(a, b, c[d], !1, !1) && (0 !== d && (f += ", "), f += a.dump);
            a.tag = g, a.dump = "[" + f + "]"
        }

        function j(a, b, c, d) {
            var e, g, h = "",
                i = a.tag;
            for (e = 0, g = c.length; g > e; e += 1) n(a, b + 1, c[e], !0, !0) && (d && 0 === e || (h += f(a, b)), h += "- " + a.dump);
            a.tag = i, a.dump = h || "[]"
        }

        function k(a, b, c) {
            var d, e, f, g, h, i = "",
                j = a.tag,
                k = Object.keys(c);
            for (d = 0, e = k.length; e > d; d += 1) h = "", 0 !== d && (h += ", "), f = k[d], g = c[f], n(a, b, f, !1, !1) && (a.dump.length > 1024 && (h += "? "), h += a.dump + ": ", n(a, b, g, !1, !1) && (h += a.dump, i += h));
            a.tag = j, a.dump = "{" + i + "}"
        }

        function l(a, b, c, d) {
            var e, g, h, i, j, k, l = "",
                m = a.tag,
                o = Object.keys(c);
            for (e = 0, g = o.length; g > e; e += 1) k = "", d && 0 === e || (k += f(a, b)), h = o[e], i = c[h], n(a, b + 1, h, !0, !0) && (j = null !== a.tag && "?" !== a.tag || a.dump && a.dump.length > 1024, j && (k += a.dump && z === a.dump.charCodeAt(0) ? "?" : "? "), k += a.dump, j && (k += f(a, b)), n(a, b + 1, i, !0, j) && (k += a.dump && z === a.dump.charCodeAt(0) ? ":" : ": ", k += a.dump, l += k));
            a.tag = m, a.dump = l || "{}"
        }

        function m(a, b, c) {
            var d, e, f, g, h, i;
            for (e = c ? a.explicitTypes : a.implicitTypes, f = 0, g = e.length; g > f; f += 1)
                if (h = e[f], (h.instanceOf || h.predicate) && (!h.instanceOf || "object" == typeof b && b instanceof h.instanceOf) && (!h.predicate || h.predicate(b))) {
                    if (a.tag = c ? h.tag : "?", h.represent) {
                        if (i = a.styleMap[h.tag] || h.defaultStyle, "[object Function]" === w.call(h.represent)) d = h.represent(b, i);
                        else {
                            if (!x.call(h.represent, i)) throw new t("!<" + h.tag + '> tag resolver accepts not "' + i + '" style');
                            d = h.represent[i](b, i)
                        }
                        a.dump = d
                    }
                    return !0
                }
            return !1
        }

        function n(a, b, c, d, e) {
            a.tag = null, a.dump = c, m(a, c, !1) || m(a, c, !0);
            var f = w.call(a.dump);
            d && (d = 0 > a.flowLevel || a.flowLevel > b), (null !== a.tag && "?" !== a.tag || 2 !== a.indent && b > 0) && (e = !1);
            var g, n, o = "[object Object]" === f || "[object Array]" === f;
            if (o && (g = a.duplicates.indexOf(c), n = -1 !== g), n && a.usedDuplicates[g]) a.dump = "*ref_" + g;
            else {
                if (o && n && !a.usedDuplicates[g] && (a.usedDuplicates[g] = !0), "[object Object]" === f) d && 0 !== Object.keys(a.dump).length ? (l(a, b, a.dump, e), n && (a.dump = "&ref_" + g + (0 === b ? "\n" : "") + a.dump)) : (k(a, b, a.dump), n && (a.dump = "&ref_" + g + " " + a.dump));
                else if ("[object Array]" === f) d && 0 !== a.dump.length ? (j(a, b, a.dump, e), n && (a.dump = "&ref_" + g + (0 === b ? "\n" : "") + a.dump)) : (i(a, b, a.dump), n && (a.dump = "&ref_" + g + " " + a.dump));
                else {
                    if ("[object String]" !== f) {
                        if (a.skipInvalid) return !1;
                        throw new t("unacceptable kind of an object to dump " + f)
                    }
                    "?" !== a.tag && h(a, a.dump)
                }
                null !== a.tag && "?" !== a.tag && (a.dump = "!<" + a.tag + "> " + a.dump)
            }
            return !0
        }

        function o(a, b) {
            var c, d, e = [],
                f = [];
            for (p(a, e, f), c = 0, d = f.length; d > c; c += 1) b.duplicates.push(e[f[c]]);
            b.usedDuplicates = new Array(d)
        }

        function p(a, b, c) {
            {
                var d, e, f;
                w.call(a)
            }
            if (null !== a && "object" == typeof a)
                if (e = b.indexOf(a), -1 !== e) - 1 === c.indexOf(e) && c.push(e);
                else if (b.push(a), Array.isArray(a))
                for (e = 0, f = a.length; f > e; e += 1) p(a[e], b, c);
            else
                for (d = Object.keys(a), e = 0, f = d.length; f > e; e += 1) p(a[d[e]], b, c)
        }

        function q(a, b) {
            b = b || {};
            var c = new e(b);
            return o(a, c), n(c, 0, a, !0, !0) ? c.dump + "\n" : ""
        }

        function r(a, b) {
            return q(a, s.extend({
                schema: v
            }, b))
        }
        var s = a("./common"),
            t = a("./exception"),
            u = a("./schema/default_full"),
            v = a("./schema/default_safe"),
            w = Object.prototype.toString,
            x = Object.prototype.hasOwnProperty,
            y = 9,
            z = 10,
            A = 13,
            B = 32,
            C = 33,
            D = 34,
            E = 35,
            F = 37,
            G = 38,
            H = 39,
            I = 42,
            J = 44,
            K = 45,
            L = 58,
            M = 62,
            N = 63,
            O = 64,
            P = 91,
            Q = 93,
            R = 96,
            S = 123,
            T = 124,
            U = 125,
            V = {};
        V[0] = "\\0", V[7] = "\\a", V[8] = "\\b", V[9] = "\\t", V[10] = "\\n", V[11] = "\\v", V[12] = "\\f", V[13] = "\\r", V[27] = "\\e", V[34] = '\\"', V[92] = "\\\\", V[133] = "\\N", V[160] = "\\_", V[8232] = "\\L", V[8233] = "\\P";
        var W = ["y", "Y", "yes", "Yes", "YES", "on", "On", "ON", "n", "N", "no", "No", "NO", "off", "Off", "OFF"];
        b.exports.dump = q, b.exports.safeDump = r
    }, {
        "./common": 11,
        "./exception": 13,
        "./schema/default_full": 18,
        "./schema/default_safe": 19
    }],
    13: [function(a, b) {
        "use strict";

        function c(a, b) {
            this.name = "YAMLException", this.reason = a, this.mark = b, this.message = this.toString(!1)
        }
        c.prototype.toString = function(a) {
            var b;
            return b = "JS-YAML: " + (this.reason || "(unknown reason)"), !a && this.mark && (b += " " + this.mark.toString()), b
        }, b.exports = c
    }, {}],
    14: [function(a, b) {
        "use strict";

        function c(a) {
            return 10 === a || 13 === a
        }

        function d(a) {
            return 9 === a || 32 === a
        }

        function e(a) {
            return 9 === a || 32 === a || 10 === a || 13 === a
        }

        function f(a) {
            return 44 === a || 91 === a || 93 === a || 123 === a || 125 === a
        }

        function g(a) {
            var b;
            return a >= 48 && 57 >= a ? a - 48 : (b = 32 | a, b >= 97 && 102 >= b ? b - 97 + 10 : -1)
        }

        function h(a) {
            return 120 === a ? 2 : 117 === a ? 4 : 85 === a ? 8 : 0
        }

        function i(a) {
            return a >= 48 && 57 >= a ? a - 48 : -1
        }

        function j(a) {
            return 48 === a ? "\x00" : 97 === a ? "" : 98 === a ? "\b" : 116 === a ? "	" : 9 === a ? "	" : 110 === a ? "\n" : 118 === a ? "" : 102 === a ? "\f" : 114 === a ? "\r" : 101 === a ? "" : 32 === a ? " " : 34 === a ? '"' : 47 === a ? "/" : 92 === a ? "\\" : 78 === a ? "Â…" : 95 === a ? "Â " : 76 === a ? "\u2028" : 80 === a ? "\u2029" : ""
        }

        function k(a) {
            return 65535 >= a ? String.fromCharCode(a) : String.fromCharCode((a - 65536 >> 10) + 55296, (a - 65536 & 1023) + 56320)
        }

        function l(a, b) {
            this.input = a, this.filename = b.filename || null, this.schema = b.schema || R, this.onWarning = b.onWarning || null, this.legacy = b.legacy || !1, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = a.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.documents = []
        }

        function m(a, b) {
            return new O(b, new P(a.filename, a.input, a.position, a.line, a.position - a.lineStart))
        }

        function n(a, b) {
            throw m(a, b)
        }

        function o(a, b) {
            var c = m(a, b);
            if (!a.onWarning) throw c;
            a.onWarning.call(null, c)
        }

        function p(a, b, c, d) {
            var e, f, g, h;
            if (c > b) {
                if (h = a.input.slice(b, c), d)
                    for (e = 0, f = h.length; f > e; e += 1) g = h.charCodeAt(e), 9 === g || g >= 32 && 1114111 >= g || n(a, "expected valid JSON character");
                a.result += h
            }
        }

        function q(a, b, c) {
            var d, e, f, g;
            for (N.isObject(c) || n(a, "cannot merge mappings; the provided source object is unacceptable"), d = Object.keys(c), f = 0, g = d.length; g > f; f += 1) e = d[f], S.call(b, e) || (b[e] = c[e])
        }

        function r(a, b, c, d, e) {
            var f, g;
            if (d = String(d), null === b && (b = {}), "tag:yaml.org,2002:merge" === c)
                if (Array.isArray(e))
                    for (f = 0, g = e.length; g > f; f += 1) q(a, b, e[f]);
                else q(a, b, e);
            else b[d] = e;
            return b
        }

        function s(a) {
            var b;
            b = a.input.charCodeAt(a.position), 10 === b ? a.position++ : 13 === b ? (a.position++, 10 === a.input.charCodeAt(a.position) && a.position++) : n(a, "a line break is expected"), a.line += 1, a.lineStart = a.position
        }

        function t(a, b, e) {
            for (var f = 0, g = a.input.charCodeAt(a.position); 0 !== g;) {
                for (; d(g);) g = a.input.charCodeAt(++a.position);
                if (b && 35 === g)
                    do g = a.input.charCodeAt(++a.position); while (10 !== g && 13 !== g && 0 !== g);
                if (!c(g)) break;
                for (s(a), g = a.input.charCodeAt(a.position), f++, a.lineIndent = 0; 32 === g;) a.lineIndent++, g = a.input.charCodeAt(++a.position)
            }
            return -1 !== e && 0 !== f && a.lineIndent < e && o(a, "deficient indentation"), f
        }

        function u(a) {
            var b, c = a.position;
            return b = a.input.charCodeAt(c), 45 !== b && 46 !== b || a.input.charCodeAt(c + 1) !== b || a.input.charCodeAt(c + 2) !== b || (c += 3, b = a.input.charCodeAt(c), 0 !== b && !e(b)) ? !1 : !0
        }

        function v(a, b) {
            1 === b ? a.result += " " : b > 1 && (a.result += N.repeat("\n", b - 1))
        }

        function w(a, b, g) {
            var h, i, j, k, l, m, n, o, q, r = a.kind,
                s = a.result;
            if (q = a.input.charCodeAt(a.position), e(q) || f(q) || 35 === q || 38 === q || 42 === q || 33 === q || 124 === q || 62 === q || 39 === q || 34 === q || 37 === q || 64 === q || 96 === q) return !1;
            if ((63 === q || 45 === q) && (i = a.input.charCodeAt(a.position + 1), e(i) || g && f(i))) return !1;
            for (a.kind = "scalar", a.result = "", j = k = a.position, l = !1; 0 !== q;) {
                if (58 === q) {
                    if (i = a.input.charCodeAt(a.position + 1), e(i) || g && f(i)) break
                } else if (35 === q) {
                    if (h = a.input.charCodeAt(a.position - 1), e(h)) break
                } else {
                    if (a.position === a.lineStart && u(a) || g && f(q)) break;
                    if (c(q)) {
                        if (m = a.line, n = a.lineStart, o = a.lineIndent, t(a, !1, -1), a.lineIndent >= b) {
                            l = !0, q = a.input.charCodeAt(a.position);
                            continue
                        }
                        a.position = k, a.line = m, a.lineStart = n, a.lineIndent = o;
                        break
                    }
                }
                l && (p(a, j, k, !1), v(a, a.line - m), j = k = a.position, l = !1), d(q) || (k = a.position + 1), q = a.input.charCodeAt(++a.position)
            }
            return p(a, j, k, !1), a.result ? !0 : (a.kind = r, a.result = s, !1)
        }

        function x(a, b) {
            var d, e, f;
            if (d = a.input.charCodeAt(a.position), 39 !== d) return !1;
            for (a.kind = "scalar", a.result = "", a.position++, e = f = a.position; 0 !== (d = a.input.charCodeAt(a.position));)
                if (39 === d) {
                    if (p(a, e, a.position, !0), d = a.input.charCodeAt(++a.position), 39 !== d) return !0;
                    e = f = a.position, a.position++
                } else c(d) ? (p(a, e, f, !0), v(a, t(a, !1, b)), e = f = a.position) : a.position === a.lineStart && u(a) ? n(a, "unexpected end of the document within a single quoted scalar") : (a.position++, f = a.position);
            n(a, "unexpected end of the stream within a single quoted scalar")
        }

        function y(a, b) {
            var d, e, f, i, j, l;
            if (l = a.input.charCodeAt(a.position), 34 !== l) return !1;
            for (a.kind = "scalar", a.result = "", a.position++, d = e = a.position; 0 !== (l = a.input.charCodeAt(a.position));) {
                if (34 === l) return p(a, d, a.position, !0), a.position++, !0;
                if (92 === l) {
                    if (p(a, d, a.position, !0), l = a.input.charCodeAt(++a.position), c(l)) t(a, !1, b);
                    else if (256 > l && da[l]) a.result += ea[l], a.position++;
                    else if ((j = h(l)) > 0) {
                        for (f = j, i = 0; f > 0; f--) l = a.input.charCodeAt(++a.position), (j = g(l)) >= 0 ? i = (i << 4) + j : n(a, "expected hexadecimal character");
                        a.result += k(i), a.position++
                    } else n(a, "unknown escape sequence");
                    d = e = a.position
                } else c(l) ? (p(a, d, e, !0), v(a, t(a, !1, b)), d = e = a.position) : a.position === a.lineStart && u(a) ? n(a, "unexpected end of the document within a double quoted scalar") : (a.position++, e = a.position)
            }
            n(a, "unexpected end of the stream within a double quoted scalar")
        }

        function z(a, b) {
            var c, d, f, g, h, i, j, k, l, m, o, p = !0,
                q = a.tag,
                s = a.anchor;
            if (o = a.input.charCodeAt(a.position), 91 === o) g = 93, j = !1, d = [];
            else {
                if (123 !== o) return !1;
                g = 125, j = !0, d = {}
            }
            for (null !== a.anchor && (a.anchorMap[a.anchor] = d), o = a.input.charCodeAt(++a.position); 0 !== o;) {
                if (t(a, !0, b), o = a.input.charCodeAt(a.position), o === g) return a.position++, a.tag = q, a.anchor = s, a.kind = j ? "mapping" : "sequence", a.result = d, !0;
                p || n(a, "missed comma between flow collection entries"), l = k = m = null, h = i = !1, 63 === o && (f = a.input.charCodeAt(a.position + 1), e(f) && (h = i = !0, a.position++, t(a, !0, b))), c = a.line, G(a, b, T, !1, !0), l = a.tag, k = a.result, t(a, !0, b), o = a.input.charCodeAt(a.position), !i && a.line !== c || 58 !== o || (h = !0, o = a.input.charCodeAt(++a.position), t(a, !0, b), G(a, b, T, !1, !0), m = a.result), j ? r(a, d, l, k, m) : d.push(h ? r(a, null, l, k, m) : k), t(a, !0, b), o = a.input.charCodeAt(a.position), 44 === o ? (p = !0, o = a.input.charCodeAt(++a.position)) : p = !1
            }
            n(a, "unexpected end of the stream within a flow collection")
        }

        function A(a, b) {
            var e, f, g, h, j = X,
                k = !1,
                l = b,
                m = 0,
                o = !1;
            if (h = a.input.charCodeAt(a.position), 124 === h) f = !1;
            else {
                if (62 !== h) return !1;
                f = !0
            }
            for (a.kind = "scalar", a.result = ""; 0 !== h;)
                if (h = a.input.charCodeAt(++a.position), 43 === h || 45 === h) X === j ? j = 43 === h ? Z : Y : n(a, "repeat of a chomping mode identifier");
                else {
                    if (!((g = i(h)) >= 0)) break;
                    0 === g ? n(a, "bad explicit indentation width of a block scalar; it cannot be less than one") : k ? n(a, "repeat of an indentation width identifier") : (l = b + g - 1, k = !0)
                }
            if (d(h)) {
                do h = a.input.charCodeAt(++a.position); while (d(h));
                if (35 === h)
                    do h = a.input.charCodeAt(++a.position); while (!c(h) && 0 !== h)
            }
            for (; 0 !== h;) {
                for (s(a), a.lineIndent = 0, h = a.input.charCodeAt(a.position);
                    (!k || a.lineIndent < l) && 32 === h;) a.lineIndent++, h = a.input.charCodeAt(++a.position);
                if (!k && a.lineIndent > l && (l = a.lineIndent), c(h)) m++;
                else {
                    if (a.lineIndent < l) {
                        j === Z ? a.result += N.repeat("\n", m) : j === X && k && (a.result += "\n");
                        break
                    }
                    for (f ? d(h) ? (o = !0, a.result += N.repeat("\n", m + 1)) : o ? (o = !1, a.result += N.repeat("\n", m + 1)) : 0 === m ? k && (a.result += " ") : a.result += N.repeat("\n", m) : a.result += k ? N.repeat("\n", m + 1) : N.repeat("\n", m), k = !0, m = 0, e = a.position; !c(h) && 0 !== h;) h = a.input.charCodeAt(++a.position);
                    p(a, e, a.position, !1)
                }
            }
            return !0
        }

        function B(a, b) {
            var c, d, f, g = a.tag,
                h = a.anchor,
                i = [],
                j = !1;
            for (null !== a.anchor && (a.anchorMap[a.anchor] = i), f = a.input.charCodeAt(a.position); 0 !== f && 45 === f && (d = a.input.charCodeAt(a.position + 1), e(d));)
                if (j = !0, a.position++, t(a, !0, -1) && a.lineIndent <= b) i.push(null), f = a.input.charCodeAt(a.position);
                else if (c = a.line, G(a, b, V, !1, !0), i.push(a.result), t(a, !0, -1), f = a.input.charCodeAt(a.position), (a.line === c || a.lineIndent > b) && 0 !== f) n(a, "bad indentation of a sequence entry");
            else if (a.lineIndent < b) break;
            return j ? (a.tag = g, a.anchor = h, a.kind = "sequence", a.result = i, !0) : !1
        }

        function C(a, b, c) {
            var f, g, h, i, j = a.tag,
                k = a.anchor,
                l = {},
                m = null,
                o = null,
                p = null,
                q = !1,
                s = !1;
            for (null !== a.anchor && (a.anchorMap[a.anchor] = l), i = a.input.charCodeAt(a.position); 0 !== i;) {
                if (f = a.input.charCodeAt(a.position + 1), h = a.line, 63 !== i && 58 !== i || !e(f)) {
                    if (!G(a, c, U, !1, !0)) break;
                    if (a.line === h) {
                        for (i = a.input.charCodeAt(a.position); d(i);) i = a.input.charCodeAt(++a.position);
                        if (58 === i) i = a.input.charCodeAt(++a.position), e(i) || n(a, "a whitespace character is expected after the key-value separator within a block mapping"), q && (r(a, l, m, o, null), m = o = p = null), s = !0, q = !1, g = !1, m = a.tag, o = a.result;
                        else {
                            if (!s) return a.tag = j, a.anchor = k, !0;
                            n(a, "can not read an implicit mapping pair; a colon is missed")
                        }
                    } else {
                        if (!s) return a.tag = j, a.anchor = k, !0;
                        n(a, "can not read a block mapping entry; a multiline key may not be an implicit key")
                    }
                } else 63 === i ? (q && (r(a, l, m, o, null), m = o = p = null), s = !0, q = !0, g = !0) : q ? (q = !1, g = !0) : n(a, "incomplete explicit mapping pair; a key node is missed"), a.position += 1, i = f;
                if ((a.line === h || a.lineIndent > b) && (G(a, b, W, !0, g) && (q ? o = a.result : p = a.result), q || (r(a, l, m, o, p), m = o = p = null), t(a, !0, -1), i = a.input.charCodeAt(a.position)), a.lineIndent > b && 0 !== i) n(a, "bad indentation of a mapping entry");
                else if (a.lineIndent < b) break
            }
            return q && r(a, l, m, o, null), s && (a.tag = j, a.anchor = k, a.kind = "mapping", a.result = l), s
        }

        function D(a) {
            var b, c, d, f, g = !1,
                h = !1;
            if (f = a.input.charCodeAt(a.position), 33 !== f) return !1;
            if (null !== a.tag && n(a, "duplication of a tag property"), f = a.input.charCodeAt(++a.position), 60 === f ? (g = !0, f = a.input.charCodeAt(++a.position)) : 33 === f ? (h = !0, c = "!!", f = a.input.charCodeAt(++a.position)) : c = "!", b = a.position, g) {
                do f = a.input.charCodeAt(++a.position); while (0 !== f && 62 !== f);
                a.position < a.length ? (d = a.input.slice(b, a.position), f = a.input.charCodeAt(++a.position)) : n(a, "unexpected end of the stream within a verbatim tag")
            } else {
                for (; 0 !== f && !e(f);) 33 === f && (h ? n(a, "tag suffix cannot contain exclamation marks") : (c = a.input.slice(b - 1, a.position + 1), ba.test(c) || n(a, "named tag handle cannot contain such characters"), h = !0, b = a.position + 1)), f = a.input.charCodeAt(++a.position);
                d = a.input.slice(b, a.position), aa.test(d) && n(a, "tag suffix cannot contain flow indicator characters")
            }
            return d && !ca.test(d) && n(a, "tag name cannot contain such characters: " + d), g ? a.tag = d : S.call(a.tagMap, c) ? a.tag = a.tagMap[c] + d : "!" === c ? a.tag = "!" + d : "!!" === c ? a.tag = "tag:yaml.org,2002:" + d : n(a, 'undeclared tag handle "' + c + '"'), !0
        }

        function E(a) {
            var b, c;
            if (c = a.input.charCodeAt(a.position), 38 !== c) return !1;
            for (null !== a.anchor && n(a, "duplication of an anchor property"), c = a.input.charCodeAt(++a.position), b = a.position; 0 !== c && !e(c) && !f(c);) c = a.input.charCodeAt(++a.position);
            return a.position === b && n(a, "name of an anchor node must contain at least one character"), a.anchor = a.input.slice(b, a.position), !0
        }

        function F(a) {
            {
                var b, c, d;
                a.length, a.input
            }
            if (d = a.input.charCodeAt(a.position), 42 !== d) return !1;
            for (d = a.input.charCodeAt(++a.position), b = a.position; 0 !== d && !e(d) && !f(d);) d = a.input.charCodeAt(++a.position);
            return a.position === b && n(a, "name of an alias node must contain at least one character"), c = a.input.slice(b, a.position), a.anchorMap.hasOwnProperty(c) || n(a, 'unidentified alias "' + c + '"'), a.result = a.anchorMap[c], t(a, !0, -1), !0
        }

        function G(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, p = 1,
                q = !1,
                r = !1;
            if (a.tag = null, a.anchor = null, a.kind = null, a.result = null, f = g = h = W === c || V === c, d && t(a, !0, -1) && (q = !0, a.lineIndent > b ? p = 1 : a.lineIndent === b ? p = 0 : a.lineIndent < b && (p = -1)), 1 === p)
                for (; D(a) || E(a);) t(a, !0, -1) ? (q = !0, h = f, a.lineIndent > b ? p = 1 : a.lineIndent === b ? p = 0 : a.lineIndent < b && (p = -1)) : h = !1;
            if (h && (h = q || e), (1 === p || W === c) && (l = T === c || U === c ? b : b + 1, m = a.position - a.lineStart, 1 === p ? h && (B(a, m) || C(a, m, l)) || z(a, l) ? r = !0 : (g && A(a, l) || x(a, l) || y(a, l) ? r = !0 : F(a) ? (r = !0, (null !== a.tag || null !== a.anchor) && n(a, "alias node should not have any properties")) : w(a, l, T === c) && (r = !0, null === a.tag && (a.tag = "?")), null !== a.anchor && (a.anchorMap[a.anchor] = a.result)) : 0 === p && (r = h && B(a, m))), null !== a.tag && "!" !== a.tag)
                if ("?" === a.tag) {
                    for (i = 0, j = a.implicitTypes.length; j > i; i += 1)
                        if (k = a.implicitTypes[i], k.resolve(a.result)) {
                            a.result = k.construct(a.result), a.tag = k.tag, null !== a.anchor && (a.anchorMap[a.anchor] = a.result);
                            break
                        }
                } else S.call(a.typeMap, a.tag) ? (k = a.typeMap[a.tag], null !== a.result && k.kind !== a.kind && n(a, "unacceptable node kind for !<" + a.tag + '> tag; it should be "' + k.kind + '", not "' + a.kind + '"'), k.resolve(a.result) ? (a.result = k.construct(a.result), null !== a.anchor && (a.anchorMap[a.anchor] = a.result)) : n(a, "cannot resolve a node with !<" + a.tag + "> explicit tag")) : o(a, "unknown tag !<" + a.tag + ">");

            return null !== a.tag || null !== a.anchor || r
        }

        function H(a) {
            var b, f, g, h, i = a.position,
                j = !1;
            for (a.version = null, a.checkLineBreaks = a.legacy, a.tagMap = {}, a.anchorMap = {}; 0 !== (h = a.input.charCodeAt(a.position)) && (t(a, !0, -1), h = a.input.charCodeAt(a.position), !(a.lineIndent > 0 || 37 !== h));) {
                for (j = !0, h = a.input.charCodeAt(++a.position), b = a.position; 0 !== h && !e(h);) h = a.input.charCodeAt(++a.position);
                for (f = a.input.slice(b, a.position), g = [], f.length < 1 && n(a, "directive name must not be less than one character in length"); 0 !== h;) {
                    for (; d(h);) h = a.input.charCodeAt(++a.position);
                    if (35 === h) {
                        do h = a.input.charCodeAt(++a.position); while (0 !== h && !c(h));
                        break
                    }
                    if (c(h)) break;
                    for (b = a.position; 0 !== h && !e(h);) h = a.input.charCodeAt(++a.position);
                    g.push(a.input.slice(b, a.position))
                }
                0 !== h && s(a), S.call(ga, f) ? ga[f](a, f, g) : o(a, 'unknown document directive "' + f + '"')
            }
            return t(a, !0, -1), 0 === a.lineIndent && 45 === a.input.charCodeAt(a.position) && 45 === a.input.charCodeAt(a.position + 1) && 45 === a.input.charCodeAt(a.position + 2) ? (a.position += 3, t(a, !0, -1)) : j && n(a, "directives end mark is expected"), G(a, a.lineIndent - 1, W, !1, !0), t(a, !0, -1), a.checkLineBreaks && _.test(a.input.slice(i, a.position)) && o(a, "non-ASCII line breaks are interpreted as content"), a.documents.push(a.result), a.position === a.lineStart && u(a) ? void(46 === a.input.charCodeAt(a.position) && (a.position += 3, t(a, !0, -1))) : void(a.position < a.length - 1 && n(a, "end of the stream or a document separator is expected"))
        }

        function I(a, b) {
            a = String(a), b = b || {}, 0 !== a.length && 10 !== a.charCodeAt(a.length - 1) && 13 !== a.charCodeAt(a.length - 1) && (a += "\n");
            var c = new l(a, b);
            for ($.test(c.input) && n(c, "the stream contains non-printable characters"), c.input += "\x00"; 32 === c.input.charCodeAt(c.position);) c.lineIndent += 1, c.position += 1;
            for (; c.position < c.length - 1;) H(c);
            return c.documents
        }

        function J(a, b, c) {
            var d, e, f = I(a, c);
            for (d = 0, e = f.length; e > d; d += 1) b(f[d])
        }

        function K(a, b) {
            var c = I(a, b);
            if (0 === c.length) return void 0;
            if (1 === c.length) return c[0];
            throw new O("expected a single document in the stream, but found more")
        }

        function L(a, b, c) {
            J(a, b, N.extend({
                schema: Q
            }, c))
        }

        function M(a, b) {
            return K(a, N.extend({
                schema: Q
            }, b))
        }
        for (var N = a("./common"), O = a("./exception"), P = a("./mark"), Q = a("./schema/default_safe"), R = a("./schema/default_full"), S = Object.prototype.hasOwnProperty, T = 1, U = 2, V = 3, W = 4, X = 1, Y = 2, Z = 3, $ = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uD800-\uDFFF\uFFFE\uFFFF]/, _ = /[\x85\u2028\u2029]/, aa = /[,\[\]\{\}]/, ba = /^(?:!|!!|![a-z\-]+!)$/i, ca = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i, da = new Array(256), ea = new Array(256), fa = 0; 256 > fa; fa++) da[fa] = j(fa) ? 1 : 0, ea[fa] = j(fa);
        var ga = {
            YAML: function(a, b, c) {
                var d, e, f;
                null !== a.version && n(a, "duplication of %YAML directive"), 1 !== c.length && n(a, "YAML directive accepts exactly one argument"), d = /^([0-9]+)\.([0-9]+)$/.exec(c[0]), null === d && n(a, "ill-formed argument of the YAML directive"), e = parseInt(d[1], 10), f = parseInt(d[2], 10), 1 !== e && n(a, "unacceptable YAML version of the document"), a.version = c[0], a.checkLineBreaks = 2 > f, 1 !== f && 2 !== f && o(a, "unsupported YAML version of the document")
            },
            TAG: function(a, b, c) {
                var d, e;
                2 !== c.length && n(a, "TAG directive accepts exactly two arguments"), d = c[0], e = c[1], ba.test(d) || n(a, "ill-formed tag handle (first argument) of the TAG directive"), S.call(a.tagMap, d) && n(a, 'there is a previously declared suffix for "' + d + '" tag handle'), ca.test(e) || n(a, "ill-formed tag prefix (second argument) of the TAG directive"), a.tagMap[d] = e
            }
        };
        b.exports.loadAll = J, b.exports.load = K, b.exports.safeLoadAll = L, b.exports.safeLoad = M
    }, {
        "./common": 11,
        "./exception": 13,
        "./mark": 15,
        "./schema/default_full": 18,
        "./schema/default_safe": 19
    }],
    15: [function(a, b) {
        "use strict";

        function c(a, b, c, d, e) {
            this.name = a, this.buffer = b, this.position = c, this.line = d, this.column = e
        }
        var d = a("./common");
        c.prototype.getSnippet = function(a, b) {
            var c, e, f, g, h;
            if (!this.buffer) return null;
            for (a = a || 4, b = b || 75, c = "", e = this.position; e > 0 && -1 === "\x00\r\nÂ…\u2028\u2029".indexOf(this.buffer.charAt(e - 1));)
                if (e -= 1, this.position - e > b / 2 - 1) {
                    c = " ... ", e += 5;
                    break
                }
            for (f = "", g = this.position; g < this.buffer.length && -1 === "\x00\r\nÂ…\u2028\u2029".indexOf(this.buffer.charAt(g));)
                if (g += 1, g - this.position > b / 2 - 1) {
                    f = " ... ", g -= 5;
                    break
                }
            return h = this.buffer.slice(e, g), d.repeat(" ", a) + c + h + f + "\n" + d.repeat(" ", a + this.position - e + c.length) + "^"
        }, c.prototype.toString = function(a) {
            var b, c = "";
            return this.name && (c += 'in "' + this.name + '" '), c += "at line " + (this.line + 1) + ", column " + (this.column + 1), a || (b = this.getSnippet(), b && (c += ":\n" + b)), c
        }, b.exports = c
    }, {
        "./common": 11
    }],
    16: [function(a, b) {
        "use strict";

        function c(a, b, d) {
            var e = [];
            return a.include.forEach(function(a) {
                d = c(a, b, d)
            }), a[b].forEach(function(a) {
                d.forEach(function(b, c) {
                    b.tag === a.tag && e.push(c)
                }), d.push(a)
            }), d.filter(function(a, b) {
                return -1 === e.indexOf(b)
            })
        }

        function d() {
            function a(a) {
                d[a.tag] = a
            }
            var b, c, d = {};
            for (b = 0, c = arguments.length; c > b; b += 1) arguments[b].forEach(a);
            return d
        }

        function e(a) {
            this.include = a.include || [], this.implicit = a.implicit || [], this.explicit = a.explicit || [], this.implicit.forEach(function(a) {
                if (a.loadKind && "scalar" !== a.loadKind) throw new g("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.")
            }), this.compiledImplicit = c(this, "implicit", []), this.compiledExplicit = c(this, "explicit", []), this.compiledTypeMap = d(this.compiledImplicit, this.compiledExplicit)
        }
        var f = a("./common"),
            g = a("./exception"),
            h = a("./type");
        e.DEFAULT = null, e.create = function() {
            var a, b;
            switch (arguments.length) {
                case 1:
                    a = e.DEFAULT, b = arguments[0];
                    break;
                case 2:
                    a = arguments[0], b = arguments[1];
                    break;
                default:
                    throw new g("Wrong number of arguments for Schema.create function")
            }
            if (a = f.toArray(a), b = f.toArray(b), !a.every(function(a) {
                    return a instanceof e
                })) throw new g("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
            if (!b.every(function(a) {
                    return a instanceof h
                })) throw new g("Specified list of YAML types (or a single Type object) contains a non-Type object.");
            return new e({
                include: a,
                explicit: b
            })
        }, b.exports = e
    }, {
        "./common": 11,
        "./exception": 13,
        "./type": 22
    }],
    17: [function(a, b) {
        "use strict";
        var c = a("../schema");
        b.exports = new c({
            include: [a("./json")]
        })
    }, {
        "../schema": 16,
        "./json": 21
    }],
    18: [function(a, b) {
        "use strict";
        var c = a("../schema");
        b.exports = c.DEFAULT = new c({
            include: [a("./default_safe")],
            explicit: [a("../type/js/undefined"), a("../type/js/regexp"), a("../type/js/function")]
        })
    }, {
        "../schema": 16,
        "../type/js/function": 27,
        "../type/js/regexp": 28,
        "../type/js/undefined": 29,
        "./default_safe": 19
    }],
    19: [function(a, b) {
        "use strict";
        var c = a("../schema");
        b.exports = new c({
            include: [a("./core")],
            implicit: [a("../type/timestamp"), a("../type/merge")],
            explicit: [a("../type/binary"), a("../type/omap"), a("../type/pairs"), a("../type/set")]
        })
    }, {
        "../schema": 16,
        "../type/binary": 23,
        "../type/merge": 31,
        "../type/omap": 33,
        "../type/pairs": 34,
        "../type/set": 36,
        "../type/timestamp": 38,
        "./core": 17
    }],
    20: [function(a, b) {
        "use strict";
        var c = a("../schema");
        b.exports = new c({
            explicit: [a("../type/str"), a("../type/seq"), a("../type/map")]
        })
    }, {
        "../schema": 16,
        "../type/map": 30,
        "../type/seq": 35,
        "../type/str": 37
    }],
    21: [function(a, b) {
        "use strict";
        var c = a("../schema");
        b.exports = new c({
            include: [a("./failsafe")],
            implicit: [a("../type/null"), a("../type/bool"), a("../type/int"), a("../type/float")]
        })
    }, {
        "../schema": 16,
        "../type/bool": 24,
        "../type/float": 25,
        "../type/int": 26,
        "../type/null": 32,
        "./failsafe": 20
    }],
    22: [function(a, b) {
        "use strict";

        function c(a) {
            var b = {};
            return null !== a && Object.keys(a).forEach(function(c) {
                a[c].forEach(function(a) {
                    b[String(a)] = c
                })
            }), b
        }

        function d(a, b) {
            if (b = b || {}, Object.keys(b).forEach(function(b) {
                    if (-1 === f.indexOf(b)) throw new e('Unknown option "' + b + '" is met in definition of "' + a + '" YAML type.')
                }), this.tag = a, this.kind = b.kind || null, this.resolve = b.resolve || function() {
                    return !0
                }, this.construct = b.construct || function(a) {
                    return a
                }, this.instanceOf = b.instanceOf || null, this.predicate = b.predicate || null, this.represent = b.represent || null, this.defaultStyle = b.defaultStyle || null, this.styleAliases = c(b.styleAliases || null), -1 === g.indexOf(this.kind)) throw new e('Unknown kind "' + this.kind + '" is specified for "' + a + '" YAML type.')
        }
        var e = a("./exception"),
            f = ["kind", "resolve", "construct", "instanceOf", "predicate", "represent", "defaultStyle", "styleAliases"],
            g = ["scalar", "sequence", "mapping"];
        b.exports = d
    }, {
        "./exception": 13
    }],
    23: [function(a, b) {
        "use strict";

        function c(a) {
            if (null === a) return !1;
            var b, c, d = 0,
                e = a.length,
                f = i;
            for (c = 0; e > c; c++)
                if (b = f.indexOf(a.charAt(c)), !(b > 64)) {
                    if (0 > b) return !1;
                    d += 6
                }
            return d % 8 === 0
        }

        function d(a) {
            var b, c, d = a.replace(/[\r\n=]/g, ""),
                e = d.length,
                f = i,
                h = 0,
                j = [];
            for (b = 0; e > b; b++) b % 4 === 0 && b && (j.push(h >> 16 & 255), j.push(h >> 8 & 255), j.push(255 & h)), h = h << 6 | f.indexOf(d.charAt(b));
            return c = e % 4 * 6, 0 === c ? (j.push(h >> 16 & 255), j.push(h >> 8 & 255), j.push(255 & h)) : 18 === c ? (j.push(h >> 10 & 255), j.push(h >> 2 & 255)) : 12 === c && j.push(h >> 4 & 255), g ? new g(j) : j
        }

        function e(a) {
            var b, c, d = "",
                e = 0,
                f = a.length,
                g = i;
            for (b = 0; f > b; b++) b % 3 === 0 && b && (d += g[e >> 18 & 63], d += g[e >> 12 & 63], d += g[e >> 6 & 63], d += g[63 & e]), e = (e << 8) + a[b];
            return c = f % 3, 0 === c ? (d += g[e >> 18 & 63], d += g[e >> 12 & 63], d += g[e >> 6 & 63], d += g[63 & e]) : 2 === c ? (d += g[e >> 10 & 63], d += g[e >> 4 & 63], d += g[e << 2 & 63], d += g[64]) : 1 === c && (d += g[e >> 2 & 63], d += g[e << 4 & 63], d += g[64], d += g[64]), d
        }

        function f(a) {
            return g && g.isBuffer(a)
        }
        var g = a("buffer").Buffer,
            h = a("../type"),
            i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
        b.exports = new h("tag:yaml.org,2002:binary", {
            kind: "scalar",
            resolve: c,
            construct: d,
            predicate: f,
            represent: e
        })
    }, {
        "../type": 22,
        buffer: 1
    }],
    24: [function(a, b) {
        "use strict";

        function c(a) {
            if (null === a) return !1;
            var b = a.length;
            return 4 === b && ("true" === a || "True" === a || "TRUE" === a) || 5 === b && ("false" === a || "False" === a || "FALSE" === a)
        }

        function d(a) {
            return "true" === a || "True" === a || "TRUE" === a
        }

        function e(a) {
            return "[object Boolean]" === Object.prototype.toString.call(a)
        }
        var f = a("../type");
        b.exports = new f("tag:yaml.org,2002:bool", {
            kind: "scalar",
            resolve: c,
            construct: d,
            predicate: e,
            represent: {
                lowercase: function(a) {
                    return a ? "true" : "false"
                },
                uppercase: function(a) {
                    return a ? "TRUE" : "FALSE"
                },
                camelcase: function(a) {
                    return a ? "True" : "False"
                }
            },
            defaultStyle: "lowercase"
        })
    }, {
        "../type": 22
    }],
    25: [function(a, b) {
        "use strict";

        function c(a) {
            if (null === a) return !1;
            return i.test(a) ? !0 : !1
        }

        function d(a) {
            var b, c, d, e;
            return b = a.replace(/_/g, "").toLowerCase(), c = "-" === b[0] ? -1 : 1, e = [], 0 <= "+-".indexOf(b[0]) && (b = b.slice(1)), ".inf" === b ? 1 === c ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : ".nan" === b ? 0 / 0 : 0 <= b.indexOf(":") ? (b.split(":").forEach(function(a) {
                e.unshift(parseFloat(a, 10))
            }), b = 0, d = 1, e.forEach(function(a) {
                b += a * d, d *= 60
            }), c * b) : c * parseFloat(b, 10)
        }

        function e(a, b) {
            if (isNaN(a)) switch (b) {
                case "lowercase":
                    return ".nan";
                case "uppercase":
                    return ".NAN";
                case "camelcase":
                    return ".NaN"
            } else if (Number.POSITIVE_INFINITY === a) switch (b) {
                case "lowercase":
                    return ".inf";
                case "uppercase":
                    return ".INF";
                case "camelcase":
                    return ".Inf"
            } else {
                if (Number.NEGATIVE_INFINITY !== a) return g.isNegativeZero(a) ? "-0.0" : a.toString(10);
                switch (b) {
                    case "lowercase":
                        return "-.inf";
                    case "uppercase":
                        return "-.INF";
                    case "camelcase":
                        return "-.Inf"
                }
            }
        }

        function f(a) {
            return "[object Number]" === Object.prototype.toString.call(a) && (0 !== a % 1 || g.isNegativeZero(a))
        }
        var g = a("../common"),
            h = a("../type"),
            i = new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)\\.[0-9_]*(?:[eE][-+][0-9]+)?|\\.[0-9_]+(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
        b.exports = new h("tag:yaml.org,2002:float", {
            kind: "scalar",
            resolve: c,
            construct: d,
            predicate: f,
            represent: e,
            defaultStyle: "lowercase"
        })
    }, {
        "../common": 11,
        "../type": 22
    }],
    26: [function(a, b) {
        "use strict";

        function c(a) {
            return a >= 48 && 57 >= a || a >= 65 && 70 >= a || a >= 97 && 102 >= a
        }

        function d(a) {
            return a >= 48 && 55 >= a
        }

        function e(a) {
            return a >= 48 && 57 >= a
        }

        function f(a) {
            if (null === a) return !1;
            var b, f = a.length,
                g = 0,
                h = !1;
            if (!f) return !1;
            if (b = a[g], ("-" === b || "+" === b) && (b = a[++g]), "0" === b) {
                if (g + 1 === f) return !0;
                if (b = a[++g], "b" === b) {
                    for (g++; f > g; g++)
                        if (b = a[g], "_" !== b) {
                            if ("0" !== b && "1" !== b) return !1;
                            h = !0
                        }
                    return h
                }
                if ("x" === b) {
                    for (g++; f > g; g++)
                        if (b = a[g], "_" !== b) {
                            if (!c(a.charCodeAt(g))) return !1;
                            h = !0
                        }
                    return h
                }
                for (; f > g; g++)
                    if (b = a[g], "_" !== b) {
                        if (!d(a.charCodeAt(g))) return !1;
                        h = !0
                    }
                return h
            }
            for (; f > g; g++)
                if (b = a[g], "_" !== b) {
                    if (":" === b) break;
                    if (!e(a.charCodeAt(g))) return !1;
                    h = !0
                }
            return h ? ":" !== b ? !0 : /^(:[0-5]?[0-9])+$/.test(a.slice(g)) : !1
        }

        function g(a) {
            var b, c, d = a,
                e = 1,
                f = [];
            return -1 !== d.indexOf("_") && (d = d.replace(/_/g, "")), b = d[0], ("-" === b || "+" === b) && ("-" === b && (e = -1), d = d.slice(1), b = d[0]), "0" === d ? 0 : "0" === b ? "b" === d[1] ? e * parseInt(d.slice(2), 2) : "x" === d[1] ? e * parseInt(d, 16) : e * parseInt(d, 8) : -1 !== d.indexOf(":") ? (d.split(":").forEach(function(a) {
                f.unshift(parseInt(a, 10))
            }), d = 0, c = 1, f.forEach(function(a) {
                d += a * c, c *= 60
            }), e * d) : e * parseInt(d, 10)
        }

        function h(a) {
            return "[object Number]" === Object.prototype.toString.call(a) && 0 === a % 1 && !i.isNegativeZero(a)
        }
        var i = a("../common"),
            j = a("../type");
        b.exports = new j("tag:yaml.org,2002:int", {
            kind: "scalar",
            resolve: f,
            construct: g,
            predicate: h,
            represent: {
                binary: function(a) {
                    return "0b" + a.toString(2)
                },
                octal: function(a) {
                    return "0" + a.toString(8)
                },
                decimal: function(a) {
                    return a.toString(10)
                },
                hexadecimal: function(a) {
                    return "0x" + a.toString(16).toUpperCase()
                }
            },
            defaultStyle: "decimal",
            styleAliases: {
                binary: [2, "bin"],
                octal: [8, "oct"],
                decimal: [10, "dec"],
                hexadecimal: [16, "hex"]
            }
        })
    }, {
        "../common": 11,
        "../type": 22
    }],
    27: [function(a, b) {
        "use strict";

        function c(a) {
            if (null === a) return !1;
            try {
                var b = "(" + a + ")",
                    c = g.parse(b, {
                        range: !0
                    });
                return "Program" !== c.type || 1 !== c.body.length || "ExpressionStatement" !== c.body[0].type || "FunctionExpression" !== c.body[0].expression.type ? !1 : !0
            } catch (d) {
                return !1
            }
        }

        function d(a) {
            var b, c = "(" + a + ")",
                d = g.parse(c, {
                    range: !0
                }),
                e = [];
            if ("Program" !== d.type || 1 !== d.body.length || "ExpressionStatement" !== d.body[0].type || "FunctionExpression" !== d.body[0].expression.type) throw new Error("Failed to resolve function");
            return d.body[0].expression.params.forEach(function(a) {
                e.push(a.name)
            }), b = d.body[0].expression.body.range, new Function(e, c.slice(b[0] + 1, b[1] - 1))
        }

        function e(a) {
            return a.toString()
        }

        function f(a) {
            return "[object Function]" === Object.prototype.toString.call(a)
        }
        var g;
        try {
            g = a("esprima")
        } catch (h) {
            "undefined" != typeof window && (g = window.esprima)
        }
        var i = a("../../type");
        b.exports = new i("tag:yaml.org,2002:js/function", {
            kind: "scalar",
            resolve: c,
            construct: d,
            predicate: f,
            represent: e
        })
    }, {
        "../../type": 22,
        esprima: 39
    }],
    28: [function(a, b) {
        "use strict";

        function c(a) {
            if (null === a) return !1;
            if (0 === a.length) return !1;
            var b = a,
                c = /\/([gim]*)$/.exec(a),
                d = "";
            if ("/" === b[0]) {
                if (c && (d = c[1]), d.length > 3) return !1;
                if ("/" !== b[b.length - d.length - 1]) return !1;
                b = b.slice(1, b.length - d.length - 1)
            }
            try {
                {
                    new RegExp(b, d)
                }
                return !0
            } catch (e) {
                return !1
            }
        }

        function d(a) {
            var b = a,
                c = /\/([gim]*)$/.exec(a),
                d = "";
            return "/" === b[0] && (c && (d = c[1]), b = b.slice(1, b.length - d.length - 1)), new RegExp(b, d)
        }

        function e(a) {
            var b = "/" + a.source + "/";
            return a.global && (b += "g"), a.multiline && (b += "m"), a.ignoreCase && (b += "i"), b
        }

        function f(a) {
            return "[object RegExp]" === Object.prototype.toString.call(a)
        }
        var g = a("../../type");
        b.exports = new g("tag:yaml.org,2002:js/regexp", {
            kind: "scalar",
            resolve: c,
            construct: d,
            predicate: f,
            represent: e
        })
    }, {
        "../../type": 22
    }],
    29: [function(a, b) {
        "use strict";

        function c() {
            return !0
        }

        function d() {
            return void 0
        }

        function e() {
            return ""
        }

        function f(a) {
            return "undefined" == typeof a
        }
        var g = a("../../type");
        b.exports = new g("tag:yaml.org,2002:js/undefined", {
            kind: "scalar",
            resolve: c,
            construct: d,
            predicate: f,
            represent: e
        })
    }, {
        "../../type": 22
    }],
    30: [function(a, b) {
        "use strict";
        var c = a("../type");
        b.exports = new c("tag:yaml.org,2002:map", {
            kind: "mapping",
            construct: function(a) {
                return null !== a ? a : {}
            }
        })
    }, {
        "../type": 22
    }],
    31: [function(a, b) {
        "use strict";

        function c(a) {
            return "<<" === a || null === a
        }
        var d = a("../type");
        b.exports = new d("tag:yaml.org,2002:merge", {
            kind: "scalar",
            resolve: c
        })
    }, {
        "../type": 22
    }],
    32: [function(a, b) {
        "use strict";

        function c(a) {
            if (null === a) return !0;
            var b = a.length;
            return 1 === b && "~" === a || 4 === b && ("null" === a || "Null" === a || "NULL" === a)
        }

        function d() {
            return null
        }

        function e(a) {
            return null === a
        }
        var f = a("../type");
        b.exports = new f("tag:yaml.org,2002:null", {
            kind: "scalar",
            resolve: c,
            construct: d,
            predicate: e,
            represent: {
                canonical: function() {
                    return "~"
                },
                lowercase: function() {
                    return "null"
                },
                uppercase: function() {
                    return "NULL"
                },
                camelcase: function() {
                    return "Null"
                }
            },
            defaultStyle: "lowercase"
        })
    }, {
        "../type": 22
    }],
    33: [function(a, b) {
        "use strict";

        function c(a) {
            if (null === a) return !0;
            var b, c, d, e, h, i = [],
                j = a;
            for (b = 0, c = j.length; c > b; b += 1) {
                if (d = j[b], h = !1, "[object Object]" !== g.call(d)) return !1;
                for (e in d)
                    if (f.call(d, e)) {
                        if (h) return !1;
                        h = !0
                    }
                if (!h) return !1;
                if (-1 !== i.indexOf(e)) return !1;
                i.push(e)
            }
            return !0
        }

        function d(a) {
            return null !== a ? a : []
        }
        var e = a("../type"),
            f = Object.prototype.hasOwnProperty,
            g = Object.prototype.toString;
        b.exports = new e("tag:yaml.org,2002:omap", {
            kind: "sequence",
            resolve: c,
            construct: d
        })
    }, {
        "../type": 22
    }],
    34: [function(a, b) {
        "use strict";

        function c(a) {
            if (null === a) return !0;
            var b, c, d, e, g, h = a;
            for (g = new Array(h.length), b = 0, c = h.length; c > b; b += 1) {
                if (d = h[b], "[object Object]" !== f.call(d)) return !1;
                if (e = Object.keys(d), 1 !== e.length) return !1;
                g[b] = [e[0], d[e[0]]]
            }
            return !0
        }

        function d(a) {
            if (null === a) return [];
            var b, c, d, e, f, g = a;
            for (f = new Array(g.length), b = 0, c = g.length; c > b; b += 1) d = g[b], e = Object.keys(d), f[b] = [e[0], d[e[0]]];
            return f
        }
        var e = a("../type"),
            f = Object.prototype.toString;
        b.exports = new e("tag:yaml.org,2002:pairs", {
            kind: "sequence",
            resolve: c,
            construct: d
        })
    }, {
        "../type": 22
    }],
    35: [function(a, b) {
        "use strict";
        var c = a("../type");
        b.exports = new c("tag:yaml.org,2002:seq", {
            kind: "sequence",
            construct: function(a) {
                return null !== a ? a : []
            }
        })
    }, {
        "../type": 22
    }],
    36: [function(a, b) {
        "use strict";

        function c(a) {
            if (null === a) return !0;
            var b, c = a;
            for (b in c)
                if (f.call(c, b) && null !== c[b]) return !1;
            return !0
        }

        function d(a) {
            return null !== a ? a : {}
        }
        var e = a("../type"),
            f = Object.prototype.hasOwnProperty;
        b.exports = new e("tag:yaml.org,2002:set", {
            kind: "mapping",
            resolve: c,
            construct: d
        })
    }, {
        "../type": 22
    }],
    37: [function(a, b) {
        "use strict";
        var c = a("../type");
        b.exports = new c("tag:yaml.org,2002:str", {
            kind: "scalar",
            construct: function(a) {
                return null !== a ? a : ""
            }
        })
    }, {
        "../type": 22
    }],
    38: [function(a, b) {
        "use strict";

        function c(a) {
            if (null === a) return !1;
            var b;
            return b = g.exec(a), null === b ? !1 : !0
        }

        function d(a) {
            var b, c, d, e, f, h, i, j, k, l, m = 0,
                n = null;
            if (b = g.exec(a), null === b) throw new Error("Date resolve error");
            if (c = +b[1], d = +b[2] - 1, e = +b[3], !b[4]) return new Date(Date.UTC(c, d, e));
            if (f = +b[4], h = +b[5], i = +b[6], b[7]) {
                for (m = b[7].slice(0, 3); m.length < 3;) m += "0";
                m = +m
            }
            return b[9] && (j = +b[10], k = +(b[11] || 0), n = 6e4 * (60 * j + k), "-" === b[9] && (n = -n)), l = new Date(Date.UTC(c, d, e, f, h, i, m)), n && l.setTime(l.getTime() - n), l
        }

        function e(a) {
            return a.toISOString()
        }
        var f = a("../type"),
            g = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$");
        b.exports = new f("tag:yaml.org,2002:timestamp", {
            kind: "scalar",
            resolve: c,
            construct: d,
            instanceOf: Date,
            represent: e
        })
    }, {
        "../type": 22
    }],
    39: [function(a, b, c) {
        ! function(a, b) {
            "use strict";
            "function" == typeof define && define.amd ? define(["exports"], b) : b("undefined" != typeof c ? c : a.esprima = {})
        }(this, function(a) {
            "use strict";

            function b(a, b) {
                if (!a) throw new Error("ASSERT: " + b)
            }

            function c(a) {
                return a >= 48 && 57 >= a
            }

            function d(a) {
                return "0123456789abcdefABCDEF".indexOf(a) >= 0
            }

            function e(a) {
                return "01234567".indexOf(a) >= 0
            }

            function f(a) {
                return 32 === a || 9 === a || 11 === a || 12 === a || 160 === a || a >= 5760 && [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279].indexOf(a) >= 0
            }

            function g(a) {
                return 10 === a || 13 === a || 8232 === a || 8233 === a
            }

            function h(a) {
                return 36 === a || 95 === a || a >= 65 && 90 >= a || a >= 97 && 122 >= a || 92 === a || a >= 128 && vb.NonAsciiIdentifierStart.test(String.fromCharCode(a))
            }

            function i(a) {
                return 36 === a || 95 === a || a >= 65 && 90 >= a || a >= 97 && 122 >= a || a >= 48 && 57 >= a || 92 === a || a >= 128 && vb.NonAsciiIdentifierPart.test(String.fromCharCode(a))
            }

            function j(a) {
                switch (a) {
                    case "class":
                    case "enum":
                    case "export":
                    case "extends":
                    case "import":
                    case "super":
                        return !0;
                    default:
                        return !1
                }
            }

            function k(a) {
                switch (a) {
                    case "implements":
                    case "interface":
                    case "package":
                    case "private":
                    case "protected":
                    case "public":
                    case "static":
                    case "yield":
                    case "let":
                        return !0;
                    default:
                        return !1
                }
            }

            function l(a) {
                return "eval" === a || "arguments" === a
            }

            function m(a) {
                if (xb && k(a)) return !0;
                switch (a.length) {
                    case 2:
                        return "if" === a || "in" === a || "do" === a;
                    case 3:
                        return "var" === a || "for" === a || "new" === a || "try" === a || "let" === a;
                    case 4:
                        return "this" === a || "else" === a || "case" === a || "void" === a || "with" === a || "enum" === a;
                    case 5:
                        return "while" === a || "break" === a || "catch" === a || "throw" === a || "const" === a || "yield" === a || "class" === a || "super" === a;
                    case 6:
                        return "return" === a || "typeof" === a || "delete" === a || "switch" === a || "export" === a || "import" === a;
                    case 7:
                        return "default" === a || "finally" === a || "extends" === a;
                    case 8:
                        return "function" === a || "continue" === a || "debugger" === a;
                    case 10:
                        return "instanceof" === a;
                    default:
                        return !1
                }
            }

            function n(a, c, d, e, f) {
                var g;
                b("number" == typeof d, "Comment must have valid position"), Db.lastCommentStart >= d || (Db.lastCommentStart = d, g = {
                    type: a,
                    value: c
                }, Eb.range && (g.range = [d, e]), Eb.loc && (g.loc = f), Eb.comments.push(g), Eb.attachComment && (Eb.leadingComments.push(g), Eb.trailingComments.push(g)))
            }

            function o(a) {
                var b, c, d, e;
                for (b = yb - a, c = {
                        start: {
                            line: zb,
                            column: yb - Ab - a
                        }
                    }; Bb > yb;)
                    if (d = wb.charCodeAt(yb), ++yb, g(d)) return Eb.comments && (e = wb.slice(b + a, yb - 1), c.end = {
                        line: zb,
                        column: yb - Ab - 1
                    }, n("Line", e, b, yb - 1, c)), 13 === d && 10 === wb.charCodeAt(yb) && ++yb, ++zb, void(Ab = yb);
                Eb.comments && (e = wb.slice(b + a, yb), c.end = {
                    line: zb,
                    column: yb - Ab
                }, n("Line", e, b, yb, c))
            }

            function p() {
                var a, b, c, d;
                for (Eb.comments && (a = yb - 2, b = {
                        start: {
                            line: zb,
                            column: yb - Ab - 2
                        }
                    }); Bb > yb;)
                    if (c = wb.charCodeAt(yb), g(c)) 13 === c && 10 === wb.charCodeAt(yb + 1) && ++yb, ++zb, ++yb, Ab = yb, yb >= Bb && Y();
                    else if (42 === c) {
                    if (47 === wb.charCodeAt(yb + 1)) return ++yb, ++yb, void(Eb.comments && (d = wb.slice(a + 2, yb - 2), b.end = {
                        line: zb,
                        column: yb - Ab
                    }, n("Block", d, a, yb, b)));
                    ++yb
                } else ++yb;
                Y()
            }

            function q() {
                var a, b;
                for (b = 0 === yb; Bb > yb;)
                    if (a = wb.charCodeAt(yb), f(a)) ++yb;
                    else if (g(a)) ++yb, 13 === a && 10 === wb.charCodeAt(yb) && ++yb, ++zb, Ab = yb, b = !0;
                else if (47 === a)
                    if (a = wb.charCodeAt(yb + 1), 47 === a) ++yb, ++yb, o(2), b = !0;
                    else {
                        if (42 !== a) break;
                        ++yb, ++yb, p()
                    } else if (b && 45 === a) {
                    if (45 !== wb.charCodeAt(yb + 1) || 62 !== wb.charCodeAt(yb + 2)) break;
                    yb += 3, o(3)
                } else {
                    if (60 !== a) break;
                    if ("!--" !== wb.slice(yb + 1, yb + 4)) break;
                    ++yb, ++yb, ++yb, ++yb, o(4)
                }
            }

            function r(a) {
                var b, c, e, f = 0;
                for (c = "u" === a ? 4 : 2, b = 0; c > b; ++b) {
                    if (!(Bb > yb && d(wb[yb]))) return "";
                    e = wb[yb++], f = 16 * f + "0123456789abcdef".indexOf(e.toLowerCase())
                }
                return String.fromCharCode(f)
            }

            function s() {
                var a, b, c, e;
                for (a = wb[yb], b = 0, "}" === a && Y(); Bb > yb && (a = wb[yb++], d(a));) b = 16 * b + "0123456789abcdef".indexOf(a.toLowerCase());
                return (b > 1114111 || "}" !== a) && Y(), 65535 >= b ? String.fromCharCode(b) : (c = (b - 65536 >> 10) + 55296, e = (b - 65536 & 1023) + 56320, String.fromCharCode(c, e))
            }

            function t() {
                var a, b;
                for (a = wb.charCodeAt(yb++), b = String.fromCharCode(a), 92 === a && (117 !== wb.charCodeAt(yb) && Y(), ++yb, a = r("u"), a && "\\" !== a && h(a.charCodeAt(0)) || Y(), b = a); Bb > yb && (a = wb.charCodeAt(yb), i(a));) ++yb, b += String.fromCharCode(a), 92 === a && (b = b.substr(0, b.length - 1), 117 !== wb.charCodeAt(yb) && Y(), ++yb, a = r("u"), a && "\\" !== a && i(a.charCodeAt(0)) || Y(), b += a);
                return b
            }

            function u() {
                var a, b;
                for (a = yb++; Bb > yb;) {
                    if (b = wb.charCodeAt(yb), 92 === b) return yb = a, t();
                    if (!i(b)) break;
                    ++yb
                }
                return wb.slice(a, yb)
            }

            function v() {
                var a, b, c;
                return a = yb, b = 92 === wb.charCodeAt(yb) ? t() : u(), c = 1 === b.length ? ob.Identifier : m(b) ? ob.Keyword : "null" === b ? ob.NullLiteral : "true" === b || "false" === b ? ob.BooleanLiteral : ob.Identifier, {
                    type: c,
                    value: b,
                    lineNumber: zb,
                    lineStart: Ab,
                    start: a,
                    end: yb
                }
            }

            function w() {
                var a, b, c, d, e = yb,
                    f = wb.charCodeAt(yb),
                    g = wb[yb];
                switch (f) {
                    case 46:
                    case 40:
                    case 41:
                    case 59:
                    case 44:
                    case 123:
                    case 125:
                    case 91:
                    case 93:
                    case 58:
                    case 63:
                    case 126:
                        return ++yb, Eb.tokenize && (40 === f ? Eb.openParenToken = Eb.tokens.length : 123 === f && (Eb.openCurlyToken = Eb.tokens.length)), {
                            type: ob.Punctuator,
                            value: String.fromCharCode(f),
                            lineNumber: zb,
                            lineStart: Ab,
                            start: e,
                            end: yb
                        };
                    default:
                        if (a = wb.charCodeAt(yb + 1), 61 === a) switch (f) {
                            case 43:
                            case 45:
                            case 47:
                            case 60:
                            case 62:
                            case 94:
                            case 124:
                            case 37:
                            case 38:
                            case 42:
                                return yb += 2, {
                                    type: ob.Punctuator,
                                    value: String.fromCharCode(f) + String.fromCharCode(a),
                                    lineNumber: zb,
                                    lineStart: Ab,
                                    start: e,
                                    end: yb
                                };
                            case 33:
                            case 61:
                                return yb += 2, 61 === wb.charCodeAt(yb) && ++yb, {
                                    type: ob.Punctuator,
                                    value: wb.slice(e, yb),
                                    lineNumber: zb,
                                    lineStart: Ab,
                                    start: e,
                                    end: yb
                                }
                        }
                }
                return d = wb.substr(yb, 4), ">>>=" === d ? (yb += 4, {
                    type: ob.Punctuator,
                    value: d,
                    lineNumber: zb,
                    lineStart: Ab,
                    start: e,
                    end: yb
                }) : (c = d.substr(0, 3), ">>>" === c || "<<=" === c || ">>=" === c ? (yb += 3, {
                    type: ob.Punctuator,
                    value: c,
                    lineNumber: zb,
                    lineStart: Ab,
                    start: e,
                    end: yb
                }) : (b = c.substr(0, 2), g === b[1] && "+-<>&|".indexOf(g) >= 0 || "=>" === b ? (yb += 2, {
                    type: ob.Punctuator,
                    value: b,
                    lineNumber: zb,
                    lineStart: Ab,
                    start: e,
                    end: yb
                }) : "<>=!+-*%&|^/".indexOf(g) >= 0 ? (++yb, {
                    type: ob.Punctuator,
                    value: g,
                    lineNumber: zb,
                    lineStart: Ab,
                    start: e,
                    end: yb
                }) : void Y()))
            }

            function x(a) {
                for (var b = ""; Bb > yb && d(wb[yb]);) b += wb[yb++];
                return 0 === b.length && Y(), h(wb.charCodeAt(yb)) && Y(), {
                    type: ob.NumericLiteral,
                    value: parseInt("0x" + b, 16),
                    lineNumber: zb,
                    lineStart: Ab,
                    start: a,
                    end: yb
                }
            }

            function y(a) {
                var b, d;
                for (d = ""; Bb > yb && (b = wb[yb], "0" === b || "1" === b);) d += wb[yb++];
                return 0 === d.length && Y(), Bb > yb && (b = wb.charCodeAt(yb), (h(b) || c(b)) && Y()), {
                    type: ob.NumericLiteral,
                    value: parseInt(d, 2),
                    lineNumber: zb,
                    lineStart: Ab,
                    start: a,
                    end: yb
                }
            }

            function z(a, b) {
                var d, f;
                for (e(a) ? (f = !0, d = "0" + wb[yb++]) : (f = !1, ++yb, d = ""); Bb > yb && e(wb[yb]);) d += wb[yb++];
                return f || 0 !== d.length || Y(), (h(wb.charCodeAt(yb)) || c(wb.charCodeAt(yb))) && Y(), {
                    type: ob.NumericLiteral,
                    value: parseInt(d, 8),
                    octal: f,
                    lineNumber: zb,
                    lineStart: Ab,
                    start: b,
                    end: yb
                }
            }

            function A() {
                var a, b;
                for (a = yb + 1; Bb > a; ++a) {
                    if (b = wb[a], "8" === b || "9" === b) return !1;
                    if (!e(b)) return !0
                }
                return !0
            }

            function B() {
                var a, d, f;
                if (f = wb[yb], b(c(f.charCodeAt(0)) || "." === f, "Numeric literal must start with a decimal digit or a decimal point"), d = yb, a = "", "." !== f) {
                    if (a = wb[yb++], f = wb[yb], "0" === a) {
                        if ("x" === f || "X" === f) return ++yb, x(d);
                        if ("b" === f || "B" === f) return ++yb, y(d);
                        if ("o" === f || "O" === f) return z(f, d);
                        if (e(f) && A()) return z(f, d)
                    }
                    for (; c(wb.charCodeAt(yb));) a += wb[yb++];
                    f = wb[yb]
                }
                if ("." === f) {
                    for (a += wb[yb++]; c(wb.charCodeAt(yb));) a += wb[yb++];
                    f = wb[yb]
                }
                if ("e" === f || "E" === f)
                    if (a += wb[yb++], f = wb[yb], ("+" === f || "-" === f) && (a += wb[yb++]), c(wb.charCodeAt(yb)))
                        for (; c(wb.charCodeAt(yb));) a += wb[yb++];
                    else Y();
                return h(wb.charCodeAt(yb)) && Y(), {
                    type: ob.NumericLiteral,
                    value: parseFloat(a),
                    lineNumber: zb,
                    lineStart: Ab,
                    start: d,
                    end: yb
                }
            }

            function C() {
                var a, c, d, f, h, i, j, k, l = "",
                    m = !1;
                for (j = zb, k = Ab, a = wb[yb], b("'" === a || '"' === a, "String literal must starts with a quote"), c = yb, ++yb; Bb > yb;) {
                    if (d = wb[yb++], d === a) {
                        a = "";
                        break
                    }
                    if ("\\" === d)
                        if (d = wb[yb++], d && g(d.charCodeAt(0))) ++zb, "\r" === d && "\n" === wb[yb] && ++yb, Ab = yb;
                        else switch (d) {
                            case "u":
                            case "x":
                                "{" === wb[yb] ? (++yb, l += s()) : (i = yb, h = r(d), h ? l += h : (yb = i, l += d));
                                break;
                            case "n":
                                l += "\n";
                                break;
                            case "r":
                                l += "\r";
                                break;
                            case "t":
                                l += "	";
                                break;
                            case "b":
                                l += "\b";
                                break;
                            case "f":
                                l += "\f";
                                break;
                            case "v":
                                l += "";
                                break;
                            default:
                                e(d) ? (f = "01234567".indexOf(d), 0 !== f && (m = !0), Bb > yb && e(wb[yb]) && (m = !0, f = 8 * f + "01234567".indexOf(wb[yb++]), "0123".indexOf(d) >= 0 && Bb > yb && e(wb[yb]) && (f = 8 * f + "01234567".indexOf(wb[yb++]))), l += String.fromCharCode(f)) : l += d
                        } else {
                            if (g(d.charCodeAt(0))) break;
                            l += d
                        }
                }
                return "" !== a && Y(), {
                    type: ob.StringLiteral,
                    value: l,
                    octal: m,
                    startLineNumber: j,
                    startLineStart: k,
                    lineNumber: zb,
                    lineStart: Ab,
                    start: c,
                    end: yb
                }
            }

            function D(a, b) {
                var c, d = a;
                b.indexOf("u") >= 0 && (d = d.replace(/\\u\{([0-9a-fA-F]+)\}/g, function(a, b) {
                    return parseInt(b, 16) <= 1114111 ? "x" : void V(ub.InvalidRegExp)
                }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x"));
                try {
                    c = new RegExp(d)
                } catch (e) {
                    V(ub.InvalidRegExp)
                }
                try {
                    return new RegExp(a, b)
                } catch (f) {
                    return null
                }
            }

            function E() {
                var a, c, d, e, f;
                for (a = wb[yb], b("/" === a, "Regular expression literal must start with a slash"), c = wb[yb++], d = !1, e = !1; Bb > yb;)
                    if (a = wb[yb++], c += a, "\\" === a) a = wb[yb++], g(a.charCodeAt(0)) && V(ub.UnterminatedRegExp), c += a;
                    else if (g(a.charCodeAt(0))) V(ub.UnterminatedRegExp);
                else if (d) "]" === a && (d = !1);
                else {
                    if ("/" === a) {
                        e = !0;
                        break
                    }
                    "[" === a && (d = !0)
                }
                return e || V(ub.UnterminatedRegExp), f = c.substr(1, c.length - 2), {
                    value: f,
                    literal: c
                }
            }

            function F() {
                var a, b, c, d;
                for (b = "", c = ""; Bb > yb && (a = wb[yb], i(a.charCodeAt(0)));)
                    if (++yb, "\\" === a && Bb > yb)
                        if (a = wb[yb], "u" === a) {
                            if (++yb, d = yb, a = r("u"))
                                for (c += a, b += "\\u"; yb > d; ++d) b += wb[d];
                            else yb = d, c += "u", b += "\\u";
                            Z()
                        } else b += "\\", Z();
                else c += a, b += a;
                return {
                    value: c,
                    literal: b
                }
            }

            function G() {
                var a, b, c, d;
                return Cb = null, q(), a = yb, b = E(), c = F(), d = D(b.value, c.value), Eb.tokenize ? {
                    type: ob.RegularExpression,
                    value: d,
                    regex: {
                        pattern: b.value,
                        flags: c.value
                    },
                    lineNumber: zb,
                    lineStart: Ab,
                    start: a,
                    end: yb
                } : {
                    literal: b.literal + c.literal,
                    value: d,
                    regex: {
                        pattern: b.value,
                        flags: c.value
                    },
                    start: a,
                    end: yb
                }
            }

            function H() {
                var a, b, c, d;
                return q(), a = yb, b = {
                    start: {
                        line: zb,
                        column: yb - Ab
                    }
                }, c = G(), b.end = {
                    line: zb,
                    column: yb - Ab
                }, Eb.tokenize || (Eb.tokens.length > 0 && (d = Eb.tokens[Eb.tokens.length - 1], d.range[0] === a && "Punctuator" === d.type && ("/" === d.value || "/=" === d.value) && Eb.tokens.pop()), Eb.tokens.push({
                    type: "RegularExpression",
                    value: c.literal,
                    regex: c.regex,
                    range: [a, yb],
                    loc: b
                })), c
            }

            function I(a) {
                return a.type === ob.Identifier || a.type === ob.Keyword || a.type === ob.BooleanLiteral || a.type === ob.NullLiteral
            }

            function J() {
                var a, b;
                if (a = Eb.tokens[Eb.tokens.length - 1], !a) return H();
                if ("Punctuator" === a.type) {
                    if ("]" === a.value) return w();
                    if (")" === a.value) return b = Eb.tokens[Eb.openParenToken - 1], !b || "Keyword" !== b.type || "if" !== b.value && "while" !== b.value && "for" !== b.value && "with" !== b.value ? w() : H();
                    if ("}" === a.value) {
                        if (Eb.tokens[Eb.openCurlyToken - 3] && "Keyword" === Eb.tokens[Eb.openCurlyToken - 3].type) {
                            if (b = Eb.tokens[Eb.openCurlyToken - 4], !b) return w()
                        } else {
                            if (!Eb.tokens[Eb.openCurlyToken - 4] || "Keyword" !== Eb.tokens[Eb.openCurlyToken - 4].type) return w();
                            if (b = Eb.tokens[Eb.openCurlyToken - 5], !b) return H()
                        }
                        return qb.indexOf(b.value) >= 0 ? w() : H()
                    }
                    return H()
                }
                return "Keyword" === a.type && "this" !== a.value ? H() : w()
            }

            function K() {
                var a;
                return q(), yb >= Bb ? {
                    type: ob.EOF,
                    lineNumber: zb,
                    lineStart: Ab,
                    start: yb,
                    end: yb
                } : (a = wb.charCodeAt(yb), h(a) ? v() : 40 === a || 41 === a || 59 === a ? w() : 39 === a || 34 === a ? C() : 46 === a ? c(wb.charCodeAt(yb + 1)) ? B() : w() : c(a) ? B() : Eb.tokenize && 47 === a ? J() : w())
            }

            function L() {
                var a, b, c, d;
                return q(), a = {
                    start: {
                        line: zb,
                        column: yb - Ab
                    }
                }, b = K(), a.end = {
                    line: zb,
                    column: yb - Ab
                }, b.type !== ob.EOF && (c = wb.slice(b.start, b.end), d = {
                    type: pb[b.type],
                    value: c,
                    range: [b.start, b.end],
                    loc: a
                }, b.regex && (d.regex = {
                    pattern: b.regex.pattern,
                    flags: b.regex.flags
                }), Eb.tokens.push(d)), b
            }

            function M() {
                var a;
                return a = Cb, yb = a.end, zb = a.lineNumber, Ab = a.lineStart, Cb = "undefined" != typeof Eb.tokens ? L() : K(), yb = a.end, zb = a.lineNumber, Ab = a.lineStart, a
            }

            function N() {
                var a, b, c;
                a = yb, b = zb, c = Ab, Cb = "undefined" != typeof Eb.tokens ? L() : K(), yb = a, zb = b, Ab = c
            }

            function O() {
                this.line = zb, this.column = yb - Ab
            }

            function P() {
                this.start = new O, this.end = null
            }

            function Q(a) {
                this.start = a.type === ob.StringLiteral ? {
                    line: a.startLineNumber,
                    column: a.start - a.startLineStart
                } : {
                    line: a.lineNumber,
                    column: a.start - a.lineStart
                }, this.end = null
            }

            function R() {
                yb = Cb.start, Cb.type === ob.StringLiteral ? (zb = Cb.startLineNumber, Ab = Cb.startLineStart) : (zb = Cb.lineNumber, Ab = Cb.lineStart), Eb.range && (this.range = [yb, 0]), Eb.loc && (this.loc = new P)
            }

            function S(a) {
                Eb.range && (this.range = [a.start, 0]), Eb.loc && (this.loc = new Q(a))
            }

            function T() {
                var a, b, c, d;
                return a = yb, b = zb, c = Ab, q(), d = zb !== b, yb = a, zb = b, Ab = c, d
            }

            function U(a, b, c) {
                var d = new Error("Line " + a + ": " + c);
                return d.index = b, d.lineNumber = a, d.column = b - Ab + 1, d.description = c, d
            }

            function V(a) {
                var c, d;
                throw c = Array.prototype.slice.call(arguments, 1), d = a.replace(/%(\d)/g, function(a, d) {
                    return b(d < c.length, "Message reference must be in range"), c[d]
                }), U(zb, yb, d)
            }

            function W(a) {
                var c, d, e;
                if (c = Array.prototype.slice.call(arguments, 1), d = a.replace(/%(\d)/g, function(a, d) {
                        return b(d < c.length, "Message reference must be in range"), c[d]
                    }), e = U(zb, yb, d), !Eb.errors) throw e;
                Eb.errors.push(e)
            }

            function X(a, b) {
                var c = ub.UnexpectedToken;
                return a && (c = b ? b : a.type === ob.EOF ? ub.UnexpectedEOS : a.type === ob.Identifier ? ub.UnexpectedIdentifier : a.type === ob.NumericLiteral ? ub.UnexpectedNumber : a.type === ob.StringLiteral ? ub.UnexpectedString : ub.UnexpectedToken, a.type === ob.Keyword && (j(a.value) ? c = ub.UnexpectedReserved : xb && k(a.value) && (c = ub.StrictReservedWord))), c = c.replace("%0", a ? a.value : "ILLEGAL"), a && "number" == typeof a.lineNumber ? U(a.lineNumber, a.start, c) : U(zb, yb, c)
            }

            function Y(a, b) {
                throw X(a, b)
            }

            function Z(a, b) {
                var c = X(a, b);
                if (!Eb.errors) throw c;
                Eb.errors.push(c)
            }

            function $(a) {
                var b = M();
                (b.type !== ob.Punctuator || b.value !== a) && Y(b)
            }

            function _() {
                var a;
                Eb.errors ? (a = Cb, a.type === ob.Punctuator && "," === a.value ? M() : a.type === ob.Punctuator && ";" === a.value ? (M(), Z(a)) : Z(a, ub.UnexpectedToken)) : $(",")
            }

            function aa(a) {
                var b = M();
                (b.type !== ob.Keyword || b.value !== a) && Y(b)
            }

            function ba(a) {
                return Cb.type === ob.Punctuator && Cb.value === a
            }

            function ca(a) {
                return Cb.type === ob.Keyword && Cb.value === a
            }

            function da() {
                var a;
                return Cb.type !== ob.Punctuator ? !1 : (a = Cb.value, "=" === a || "*=" === a || "/=" === a || "%=" === a || "+=" === a || "-=" === a || "<<=" === a || ">>=" === a || ">>>=" === a || "&=" === a || "^=" === a || "|=" === a)
            }

            function ea() {
                var a, b = yb,
                    c = zb,
                    d = Ab,
                    e = Cb;
                return 59 === wb.charCodeAt(yb) || ba(";") ? void M() : (a = zb, q(), zb !== a ? (yb = b, zb = c, Ab = d, void(Cb = e)) : void(Cb.type === ob.EOF || ba("}") || Y(Cb)))
            }

            function fa(a) {
                return a.type === rb.Identifier || a.type === rb.MemberExpression
            }

            function ga() {
                var a = [],
                    b = new R;
                for ($("["); !ba("]");) ba(",") ? (M(), a.push(null)) : (a.push(Da()), ba("]") || $(","));
                return M(), b.finishArrayExpression(a)
            }

            function ha(a, b) {
                var c, d, e = new R;
                return c = xb, d = cb(), b && xb && l(a[0].name) && Z(b, ub.StrictParamName), xb = c, e.finishFunctionExpression(null, a, [], d)
            }

            function ia() {
                var a, b, c;
                return a = xb, xb = !0, b = fb(), c = ha(b.params), xb = a, c
            }

            function ja() {
                var a, b = new R;
                return a = M(), a.type === ob.StringLiteral || a.type === ob.NumericLiteral ? (xb && a.octal && Z(a, ub.StrictOctalLiteral), b.finishLiteral(a)) : b.finishIdentifier(a.value)
            }

            function ka() {
                var a, b, c, d, e, f = new R;
                if (a = Cb, a.type === ob.Identifier) return c = ja(), "get" !== a.value || ba(":") || ba("(") ? "set" !== a.value || ba(":") || ba("(") ? ba(":") ? (M(), d = Da(), f.finishProperty("init", c, d, !1, !1)) : ba("(") ? (d = ia(), f.finishProperty("init", c, d, !0, !1)) : (d = c, f.finishProperty("init", c, d, !1, !0)) : (b = ja(), $("("), a = Cb, a.type !== ob.Identifier ? ($(")"), Z(a), d = ha([])) : (e = [Ha()], $(")"), d = ha(e, a)), f.finishProperty("set", b, d, !1, !1)) : (b = ja(), $("("), $(")"), d = ha([]), f.finishProperty("get", b, d, !1, !1));
                if (a.type === ob.EOF || a.type === ob.Punctuator) Y(a);
                else {
                    if (b = ja(), ba(":")) return M(), d = Da(), f.finishProperty("init", b, d, !1, !1);
                    if (ba("(")) return d = ia(), f.finishProperty("init", b, d, !0, !1);
                    Y(M())
                }
            }

            function la() {
                var a, b, c, d, e = [],
                    f = {},
                    g = String,
                    h = new R;
                for ($("{"); !ba("}");) a = ka(), b = a.key.type === rb.Identifier ? a.key.name : g(a.key.value), d = "init" === a.kind ? tb.Data : "get" === a.kind ? tb.Get : tb.Set, c = "$" + b, Object.prototype.hasOwnProperty.call(f, c) ? (f[c] === tb.Data ? xb && d === tb.Data ? W(ub.StrictDuplicateProperty) : d !== tb.Data && W(ub.AccessorDataProperty) : d === tb.Data ? W(ub.AccessorDataProperty) : f[c] & d && W(ub.AccessorGetSet), f[c] |= d) : f[c] = d, e.push(a), ba("}") || _();
                return $("}"), h.finishObjectExpression(e)
            }

            function ma() {
                var a;
                return $("("), ba(")") ? (M(), sb.ArrowParameterPlaceHolder) : (++Db.parenthesisCount, a = Ea(), $(")"), a)
            }

            function na() {
                var a, b, c, d;
                if (ba("(")) return ma();
                if (ba("[")) return ga();
                if (ba("{")) return la();
                if (a = Cb.type, d = new R, a === ob.Identifier) c = d.finishIdentifier(M().value);
                else if (a === ob.StringLiteral || a === ob.NumericLiteral) xb && Cb.octal && Z(Cb, ub.StrictOctalLiteral), c = d.finishLiteral(M());
                else if (a === ob.Keyword) {
                    if (ca("function")) return hb();
                    ca("this") ? (M(), c = d.finishThisExpression()) : Y(M())
                } else a === ob.BooleanLiteral ? (b = M(), b.value = "true" === b.value, c = d.finishLiteral(b)) : a === ob.NullLiteral ? (b = M(), b.value = null, c = d.finishLiteral(b)) : ba("/") || ba("/=") ? (c = d.finishLiteral("undefined" != typeof Eb.tokens ? H() : G()), N()) : Y(M());
                return c
            }

            function oa() {
                var a = [];
                if ($("("), !ba(")"))
                    for (; Bb > yb && (a.push(Da()), !ba(")"));) _();
                return $(")"), a
            }

            function pa() {
                var a, b = new R;
                return a = M(), I(a) || Y(a), b.finishIdentifier(a.value)
            }

            function qa() {
                return $("."), pa()
            }

            function ra() {
                var a;
                return $("["), a = Ea(), $("]"), a
            }

            function sa() {
                var a, b, c = new R;
                return aa("new"), a = ua(), b = ba("(") ? oa() : [], c.finishNewExpression(a, b)
            }

            function ta() {
                var a, b, c, d, e = Db.allowIn;
                for (d = Cb, Db.allowIn = !0, a = ca("new") ? sa() : na();;)
                    if (ba(".")) c = qa(), a = new S(d).finishMemberExpression(".", a, c);
                    else if (ba("(")) b = oa(), a = new S(d).finishCallExpression(a, b);
                else {
                    if (!ba("[")) break;
                    c = ra(), a = new S(d).finishMemberExpression("[", a, c)
                }
                return Db.allowIn = e, a
            }

            function ua() {
                var a, c, d;
                for (b(Db.allowIn, "callee of new expression always allow in keyword."), d = Cb, a = ca("new") ? sa() : na();;)
                    if (ba("[")) c = ra(), a = new S(d).finishMemberExpression("[", a, c);
                    else {
                        if (!ba(".")) break;
                        c = qa(), a = new S(d).finishMemberExpression(".", a, c)
                    }
                return a
            }

            function va() {
                var a, b, c = Cb;
                return a = ta(), Cb.type === ob.Punctuator && (!ba("++") && !ba("--") || T() || (xb && a.type === rb.Identifier && l(a.name) && W(ub.StrictLHSPostfix), fa(a) || W(ub.InvalidLHSInAssignment), b = M(), a = new S(c).finishPostfixExpression(b.value, a))), a
            }

            function wa() {
                var a, b, c;
                return Cb.type !== ob.Punctuator && Cb.type !== ob.Keyword ? b = va() : ba("++") || ba("--") ? (c = Cb, a = M(), b = wa(), xb && b.type === rb.Identifier && l(b.name) && W(ub.StrictLHSPrefix), fa(b) || W(ub.InvalidLHSInAssignment), b = new S(c).finishUnaryExpression(a.value, b)) : ba("+") || ba("-") || ba("~") || ba("!") ? (c = Cb, a = M(), b = wa(), b = new S(c).finishUnaryExpression(a.value, b)) : ca("delete") || ca("void") || ca("typeof") ? (c = Cb, a = M(), b = wa(), b = new S(c).finishUnaryExpression(a.value, b), xb && "delete" === b.operator && b.argument.type === rb.Identifier && W(ub.StrictDelete)) : b = va(), b
            }

            function xa(a, b) {
                var c = 0;
                if (a.type !== ob.Punctuator && a.type !== ob.Keyword) return 0;
                switch (a.value) {
                    case "||":
                        c = 1;
                        break;
                    case "&&":
                        c = 2;
                        break;
                    case "|":
                        c = 3;
                        break;
                    case "^":
                        c = 4;
                        break;
                    case "&":
                        c = 5;
                        break;
                    case "==":
                    case "!=":
                    case "===":
                    case "!==":
                        c = 6;
                        break;
                    case "<":
                    case ">":
                    case "<=":
                    case ">=":
                    case "instanceof":
                        c = 7;
                        break;
                    case "in":
                        c = b ? 7 : 0;
                        break;
                    case "<<":
                    case ">>":
                    case ">>>":
                        c = 8;
                        break;
                    case "+":
                    case "-":
                        c = 9;
                        break;
                    case "*":
                    case "/":
                    case "%":
                        c = 11
                }
                return c
            }

            function ya() {
                var a, b, c, d, e, f, g, h, i, j;
                if (a = Cb, i = wa(), i === sb.ArrowParameterPlaceHolder) return i;
                if (d = Cb, e = xa(d, Db.allowIn), 0 === e) return i;
                for (d.prec = e, M(), b = [a, Cb], g = wa(), f = [i, d, g];
                    (e = xa(Cb, Db.allowIn)) > 0;) {
                    for (; f.length > 2 && e <= f[f.length - 2].prec;) g = f.pop(), h = f.pop().value, i = f.pop(), b.pop(), c = new S(b[b.length - 1]).finishBinaryExpression(h, i, g), f.push(c);
                    d = M(), d.prec = e, f.push(d), b.push(Cb), c = wa(), f.push(c)
                }
                for (j = f.length - 1, c = f[j], b.pop(); j > 1;) c = new S(b.pop()).finishBinaryExpression(f[j - 1].value, f[j - 2], c), j -= 2;
                return c
            }

            function za() {
                var a, b, c, d, e;
                return e = Cb, a = ya(), a === sb.ArrowParameterPlaceHolder ? a : (ba("?") && (M(), b = Db.allowIn, Db.allowIn = !0, c = Da(), Db.allowIn = b, $(":"), d = Da(), a = new S(e).finishConditionalExpression(a, c, d)), a)
            }

            function Aa() {
                return ba("{") ? cb() : Da()
            }

            function Ba(a) {
                var b, c, d, e, f, g, h, i, j;
                for (e = [], f = [], g = 0, i = null, h = {
                        paramSet: {}
                    }, b = 0, c = a.length; c > b; b += 1)
                    if (d = a[b], d.type === rb.Identifier) e.push(d), f.push(null), db(h, d, d.name);
                    else {
                        if (d.type !== rb.AssignmentExpression) return null;
                        e.push(d.left), f.push(d.right), ++g, db(h, d.left, d.left.name)
                    }
                return h.message === ub.StrictParamDupe && (j = xb ? h.stricted : h.firstRestricted, Y(j, h.message)), 0 === g && (f = []), {
                    params: e,
                    defaults: f,
                    rest: i,
                    stricted: h.stricted,
                    firstRestricted: h.firstRestricted,
                    message: h.message
                }
            }

            function Ca(a, b) {
                var c, d;
                return $("=>"), c = xb, d = Aa(), xb && a.firstRestricted && Y(a.firstRestricted, a.message), xb && a.stricted && Z(a.stricted, a.message), xb = c, b.finishArrowFunctionExpression(a.params, a.defaults, d, d.type !== rb.BlockStatement)
            }

            function Da() {
                var a, b, c, d, e, f;
                return a = Db.parenthesisCount, f = Cb, b = Cb, c = za(), c !== sb.ArrowParameterPlaceHolder && !ba("=>") || Db.parenthesisCount !== a && Db.parenthesisCount !== a + 1 || (c.type === rb.Identifier ? e = Ba([c]) : c.type === rb.AssignmentExpression ? e = Ba([c]) : c.type === rb.SequenceExpression ? e = Ba(c.expressions) : c === sb.ArrowParameterPlaceHolder && (e = Ba([])), !e) ? (da() && (fa(c) || W(ub.InvalidLHSInAssignment), xb && c.type === rb.Identifier && l(c.name) && Z(b, ub.StrictLHSAssignment), b = M(), d = Da(), c = new S(f).finishAssignmentExpression(b.value, c, d)), c) : Ca(e, new S(f))
            }

            function Ea() {
                var a, b, c = Cb;
                if (a = Da(), ba(",")) {
                    for (b = [a]; Bb > yb && ba(",");) M(), b.push(Da());
                    a = new S(c).finishSequenceExpression(b)
                }
                return a
            }

            function Fa() {
                for (var a, b = []; Bb > yb && !ba("}") && (a = ib(), "undefined" != typeof a);) b.push(a);
                return b
            }

            function Ga() {
                var a, b = new R;
                return $("{"), a = Fa(), $("}"), b.finishBlockStatement(a)
            }

            function Ha() {
                var a, b = new R;
                return a = M(), a.type !== ob.Identifier && (xb && a.type === ob.Keyword && k(a.value) ? Z(a, ub.StrictReservedWord) : Y(a)), b.finishIdentifier(a.value)
            }

            function Ia(a) {
                var b, c = null,
                    d = new R;
                return b = Ha(), xb && l(b.name) && W(ub.StrictVarName), "const" === a ? ($("="), c = Da()) : ba("=") && (M(), c = Da()), d.finishVariableDeclarator(b, c)
            }

            function Ja(a) {
                var b = [];
                do {
                    if (b.push(Ia(a)), !ba(",")) break;
                    M()
                } while (Bb > yb);
                return b
            }

            function Ka(a) {
                var b;
                return aa("var"), b = Ja(), ea(), a.finishVariableDeclaration(b, "var")
            }

            function La(a) {
                var b, c = new R;
                return aa(a), b = Ja(a), ea(), c.finishVariableDeclaration(b, a)
            }

            function Ma() {
                var a = new R;
                return $(";"), a.finishEmptyStatement()
            }

            function Na(a) {
                var b = Ea();
                return ea(), a.finishExpressionStatement(b)
            }

            function Oa(a) {
                var b, c, d;
                return aa("if"), $("("), b = Ea(), $(")"), c = bb(), ca("else") ? (M(), d = bb()) : d = null, a.finishIfStatement(b, c, d)
            }

            function Pa(a) {
                var b, c, d;
                return aa("do"), d = Db.inIteration, Db.inIteration = !0, b = bb(), Db.inIteration = d, aa("while"), $("("), c = Ea(), $(")"), ba(";") && M(), a.finishDoWhileStatement(b, c)
            }

            function Qa(a) {
                var b, c, d;
                return aa("while"), $("("), b = Ea(), $(")"), d = Db.inIteration, Db.inIteration = !0, c = bb(), Db.inIteration = d, a.finishWhileStatement(b, c)
            }

            function Ra() {
                var a, b, c = new R;
                return a = M(), b = Ja(), c.finishVariableDeclaration(b, a.value)
            }

            function Sa(a) {
                var b, c, d, e, f, g, h, i = Db.allowIn;
                return b = c = d = null, aa("for"), $("("), ba(";") ? M() : (ca("var") || ca("let") ? (Db.allowIn = !1, b = Ra(), Db.allowIn = i, 1 === b.declarations.length && ca("in") && (M(), e = b, f = Ea(), b = null)) : (Db.allowIn = !1, b = Ea(), Db.allowIn = i, ca("in") && (fa(b) || W(ub.InvalidLHSInForIn), M(), e = b, f = Ea(), b = null)), "undefined" == typeof e && $(";")), "undefined" == typeof e && (ba(";") || (c = Ea()), $(";"), ba(")") || (d = Ea())), $(")"), h = Db.inIteration, Db.inIteration = !0, g = bb(), Db.inIteration = h, "undefined" == typeof e ? a.finishForStatement(b, c, d, g) : a.finishForInStatement(e, f, g)
            }

            function Ta(a) {
                var b, c = null;
                return aa("continue"), 59 === wb.charCodeAt(yb) ? (M(), Db.inIteration || V(ub.IllegalContinue), a.finishContinueStatement(null)) : T() ? (Db.inIteration || V(ub.IllegalContinue), a.finishContinueStatement(null)) : (Cb.type === ob.Identifier && (c = Ha(), b = "$" + c.name, Object.prototype.hasOwnProperty.call(Db.labelSet, b) || V(ub.UnknownLabel, c.name)), ea(), null !== c || Db.inIteration || V(ub.IllegalContinue), a.finishContinueStatement(c))
            }

            function Ua(a) {
                var b, c = null;
                return aa("break"), 59 === wb.charCodeAt(yb) ? (M(), Db.inIteration || Db.inSwitch || V(ub.IllegalBreak), a.finishBreakStatement(null)) : T() ? (Db.inIteration || Db.inSwitch || V(ub.IllegalBreak), a.finishBreakStatement(null)) : (Cb.type === ob.Identifier && (c = Ha(), b = "$" + c.name, Object.prototype.hasOwnProperty.call(Db.labelSet, b) || V(ub.UnknownLabel, c.name)), ea(), null !== c || Db.inIteration || Db.inSwitch || V(ub.IllegalBreak), a.finishBreakStatement(c))
            }

            function Va(a) {
                var b = null;
                return aa("return"), Db.inFunctionBody || W(ub.IllegalReturn), 32 === wb.charCodeAt(yb) && h(wb.charCodeAt(yb + 1)) ? (b = Ea(), ea(), a.finishReturnStatement(b)) : T() ? a.finishReturnStatement(null) : (ba(";") || ba("}") || Cb.type === ob.EOF || (b = Ea()), ea(), a.finishReturnStatement(b))
            }

            function Wa(a) {
                var b, c;
                return xb && (q(), W(ub.StrictModeWith)), aa("with"), $("("), b = Ea(), $(")"), c = bb(), a.finishWithStatement(b, c)
            }

            function Xa() {
                var a, b, c = [],
                    d = new R;
                for (ca("default") ? (M(), a = null) : (aa("case"), a = Ea()), $(":"); Bb > yb && !(ba("}") || ca("default") || ca("case"));) b = bb(), c.push(b);
                return d.finishSwitchCase(a, c)
            }

            function Ya(a) {
                var b, c, d, e, f;
                if (aa("switch"), $("("), b = Ea(), $(")"), $("{"), c = [], ba("}")) return M(), a.finishSwitchStatement(b, c);
                for (e = Db.inSwitch, Db.inSwitch = !0, f = !1; Bb > yb && !ba("}");) d = Xa(), null === d.test && (f && V(ub.MultipleDefaultsInSwitch), f = !0), c.push(d);
                return Db.inSwitch = e, $("}"), a.finishSwitchStatement(b, c)
            }

            function Za(a) {
                var b;
                return aa("throw"), T() && V(ub.NewlineAfterThrow), b = Ea(), ea(), a.finishThrowStatement(b)
            }

            function $a() {
                var a, b, c = new R;
                return aa("catch"), $("("), ba(")") && Y(Cb), a = Ha(), xb && l(a.name) && W(ub.StrictCatchVariable), $(")"), b = Ga(), c.finishCatchClause(a, b)
            }

            function _a(a) {
                var b, c = [],
                    d = null;
                return aa("try"), b = Ga(), ca("catch") && c.push($a()), ca("finally") && (M(), d = Ga()), 0 !== c.length || d || V(ub.NoCatchOrFinally), a.finishTryStatement(b, [], c, d)
            }

            function ab(a) {
                return aa("debugger"), ea(), a.finishDebuggerStatement()
            }

            function bb() {
                var a, b, c, d, e = Cb.type;
                if (e === ob.EOF && Y(Cb), e === ob.Punctuator && "{" === Cb.value) return Ga();
                if (d = new R, e === ob.Punctuator) switch (Cb.value) {
                        case ";":
                            return Ma(d);
                        case "(":
                            return Na(d)
                    } else if (e === ob.Keyword) switch (Cb.value) {
                        case "break":
                            return Ua(d);
                        case "continue":
                            return Ta(d);
                        case "debugger":
                            return ab(d);
                        case "do":
                            return Pa(d);
                        case "for":
                            return Sa(d);
                        case "function":
                            return gb(d);
                        case "if":
                            return Oa(d);
                        case "return":
                            return Va(d);
                        case "switch":
                            return Ya(d);
                        case "throw":
                            return Za(d);
                        case "try":
                            return _a(d);
                        case "var":
                            return Ka(d);
                        case "while":
                            return Qa(d);
                        case "with":
                            return Wa(d)
                    }
                    return a = Ea(), a.type === rb.Identifier && ba(":") ? (M(), c = "$" + a.name, Object.prototype.hasOwnProperty.call(Db.labelSet, c) && V(ub.Redeclaration, "Label", a.name), Db.labelSet[c] = !0, b = bb(), delete Db.labelSet[c], d.finishLabeledStatement(a, b)) : (ea(), d.finishExpressionStatement(a))
            }

            function cb() {
                var a, b, c, d, e, f, g, h, i, j = [],
                    k = new R;
                for ($("{"); Bb > yb && Cb.type === ob.StringLiteral && (b = Cb, a = ib(), j.push(a), a.expression.type === rb.Literal);) c = wb.slice(b.start + 1, b.end - 1), "use strict" === c ? (xb = !0, d && Z(d, ub.StrictOctalLiteral)) : !d && b.octal && (d = b);
                for (e = Db.labelSet, f = Db.inIteration, g = Db.inSwitch, h = Db.inFunctionBody, i = Db.parenthesizedCount, Db.labelSet = {}, Db.inIteration = !1, Db.inSwitch = !1, Db.inFunctionBody = !0, Db.parenthesizedCount = 0; Bb > yb && !ba("}") && (a = ib(), "undefined" != typeof a);) j.push(a);
                return $("}"), Db.labelSet = e, Db.inIteration = f, Db.inSwitch = g, Db.inFunctionBody = h, Db.parenthesizedCount = i, k.finishBlockStatement(j)
            }

            function db(a, b, c) {
                var d = "$" + c;
                xb ? (l(c) && (a.stricted = b, a.message = ub.StrictParamName), Object.prototype.hasOwnProperty.call(a.paramSet, d) && (a.stricted = b, a.message = ub.StrictParamDupe)) : a.firstRestricted || (l(c) ? (a.firstRestricted = b, a.message = ub.StrictParamName) : k(c) ? (a.firstRestricted = b, a.message = ub.StrictReservedWord) : Object.prototype.hasOwnProperty.call(a.paramSet, d) && (a.firstRestricted = b, a.message = ub.StrictParamDupe)), a.paramSet[d] = !0
            }

            function eb(a) {
                var b, c, d;
                return b = Cb, c = Ha(), db(a, b, b.value), ba("=") && (M(), d = Da(), ++a.defaultCount), a.params.push(c), a.defaults.push(d), !ba(")")
            }

            function fb(a) {
                var b;
                if (b = {
                        params: [],
                        defaultCount: 0,
                        defaults: [],
                        firstRestricted: a
                    }, $("("), !ba(")"))
                    for (b.paramSet = {}; Bb > yb && eb(b);) $(",");
                return $(")"), 0 === b.defaultCount && (b.defaults = []), {
                    params: b.params,
                    defaults: b.defaults,
                    stricted: b.stricted,
                    firstRestricted: b.firstRestricted,
                    message: b.message
                }
            }

            function gb() {
                var a, b, c, d, e, f, g, h, i = [],
                    j = [],
                    m = new R;
                return aa("function"), c = Cb, a = Ha(), xb ? l(c.value) && Z(c, ub.StrictFunctionName) : l(c.value) ? (f = c, g = ub.StrictFunctionName) : k(c.value) && (f = c, g = ub.StrictReservedWord), e = fb(f), i = e.params, j = e.defaults, d = e.stricted, f = e.firstRestricted, e.message && (g = e.message), h = xb, b = cb(), xb && f && Y(f, g), xb && d && Z(d, g), xb = h, m.finishFunctionDeclaration(a, i, j, b)
            }

            function hb() {
                var a, b, c, d, e, f, g, h = null,
                    i = [],
                    j = [],
                    m = new R;
                return aa("function"), ba("(") || (a = Cb, h = Ha(), xb ? l(a.value) && Z(a, ub.StrictFunctionName) : l(a.value) ? (c = a, d = ub.StrictFunctionName) : k(a.value) && (c = a, d = ub.StrictReservedWord)), e = fb(c), i = e.params, j = e.defaults, b = e.stricted, c = e.firstRestricted, e.message && (d = e.message), g = xb, f = cb(), xb && c && Y(c, d), xb && b && Z(b, d), xb = g, m.finishFunctionExpression(h, i, j, f)
            }

            function ib() {
                if (Cb.type === ob.Keyword) switch (Cb.value) {
                    case "const":
                    case "let":
                        return La(Cb.value);
                    case "function":
                        return gb();
                    default:
                        return bb()
                }
                return Cb.type !== ob.EOF ? bb() : void 0
            }

            function jb() {
                for (var a, b, c, d, e = []; Bb > yb && (b = Cb, b.type === ob.StringLiteral) && (a = ib(), e.push(a), a.expression.type === rb.Literal);) c = wb.slice(b.start + 1, b.end - 1), "use strict" === c ? (xb = !0, d && Z(d, ub.StrictOctalLiteral)) : !d && b.octal && (d = b);
                for (; Bb > yb && (a = ib(), "undefined" != typeof a);) e.push(a);
                return e
            }

            function kb() {
                var a, b;
                return q(), N(), b = new R, xb = !1, a = jb(), b.finishProgram(a)
            }

            function lb() {
                var a, b, c, d = [];
                for (a = 0; a < Eb.tokens.length; ++a) b = Eb.tokens[a], c = {
                    type: b.type,
                    value: b.value
                }, b.regex && (c.regex = {
                    pattern: b.regex.pattern,
                    flags: b.regex.flags
                }), Eb.range && (c.range = b.range), Eb.loc && (c.loc = b.loc), d.push(c);
                Eb.tokens = d
            }

            function mb(a, b) {
                var c, d;
                c = String, "string" == typeof a || a instanceof String || (a = c(a)), wb = a, yb = 0, zb = wb.length > 0 ? 1 : 0, Ab = 0, Bb = wb.length, Cb = null, Db = {
                    allowIn: !0,
                    labelSet: {},
                    inFunctionBody: !1,
                    inIteration: !1,
                    inSwitch: !1,
                    lastCommentStart: -1
                }, Eb = {}, b = b || {}, b.tokens = !0, Eb.tokens = [], Eb.tokenize = !0, Eb.openParenToken = -1, Eb.openCurlyToken = -1, Eb.range = "boolean" == typeof b.range && b.range, Eb.loc = "boolean" == typeof b.loc && b.loc, "boolean" == typeof b.comment && b.comment && (Eb.comments = []), "boolean" == typeof b.tolerant && b.tolerant && (Eb.errors = []);
                try {
                    if (N(), Cb.type === ob.EOF) return Eb.tokens;
                    for (M(); Cb.type !== ob.EOF;) try {
                        M()
                    } catch (e) {
                        if (Eb.errors) {
                            Eb.errors.push(e);
                            break
                        }
                        throw e
                    }
                    lb(), d = Eb.tokens, "undefined" != typeof Eb.comments && (d.comments = Eb.comments), "undefined" != typeof Eb.errors && (d.errors = Eb.errors)
                } catch (f) {
                    throw f
                } finally {
                    Eb = {}
                }
                return d
            }

            function nb(a, b) {
                var c, d;
                d = String, "string" == typeof a || a instanceof String || (a = d(a)), wb = a, yb = 0, zb = wb.length > 0 ? 1 : 0, Ab = 0, Bb = wb.length, Cb = null, Db = {
                    allowIn: !0,
                    labelSet: {},
                    parenthesisCount: 0,
                    inFunctionBody: !1,
                    inIteration: !1,
                    inSwitch: !1,
                    lastCommentStart: -1
                }, Eb = {}, "undefined" != typeof b && (Eb.range = "boolean" == typeof b.range && b.range, Eb.loc = "boolean" == typeof b.loc && b.loc, Eb.attachComment = "boolean" == typeof b.attachComment && b.attachComment, Eb.loc && null !== b.source && void 0 !== b.source && (Eb.source = d(b.source)), "boolean" == typeof b.tokens && b.tokens && (Eb.tokens = []), "boolean" == typeof b.comment && b.comment && (Eb.comments = []), "boolean" == typeof b.tolerant && b.tolerant && (Eb.errors = []), Eb.attachComment && (Eb.range = !0, Eb.comments = [], Eb.bottomRightStack = [], Eb.trailingComments = [], Eb.leadingComments = []));
                try {
                    c = kb(), "undefined" != typeof Eb.comments && (c.comments = Eb.comments), "undefined" != typeof Eb.tokens && (lb(), c.tokens = Eb.tokens), "undefined" != typeof Eb.errors && (c.errors = Eb.errors)
                } catch (e) {
                    throw e
                } finally {
                    Eb = {}
                }
                return c
            }
            var ob, pb, qb, rb, sb, tb, ub, vb, wb, xb, yb, zb, Ab, Bb, Cb, Db, Eb;
            ob = {
                BooleanLiteral: 1,
                EOF: 2,
                Identifier: 3,
                Keyword: 4,
                NullLiteral: 5,
                NumericLiteral: 6,
                Punctuator: 7,
                StringLiteral: 8,
                RegularExpression: 9
            }, pb = {}, pb[ob.BooleanLiteral] = "Boolean", pb[ob.EOF] = "<end>", pb[ob.Identifier] = "Identifier", pb[ob.Keyword] = "Keyword", pb[ob.NullLiteral] = "Null", pb[ob.NumericLiteral] = "Numeric", pb[ob.Punctuator] = "Punctuator", pb[ob.StringLiteral] = "String", pb[ob.RegularExpression] = "RegularExpression", qb = ["(", "{", "[", "in", "typeof", "instanceof", "new", "return", "case", "delete", "throw", "void", "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "&=", "|=", "^=", ",", "+", "-", "*", "/", "%", "++", "--", "<<", ">>", ">>>", "&", "|", "^", "!", "~", "&&", "||", "?", ":", "===", "==", ">=", "<=", "<", ">", "!=", "!=="], rb = {
                AssignmentExpression: "AssignmentExpression",
                ArrayExpression: "ArrayExpression",
                ArrowFunctionExpression: "ArrowFunctionExpression",
                BlockStatement: "BlockStatement",
                BinaryExpression: "BinaryExpression",
                BreakStatement: "BreakStatement",
                CallExpression: "CallExpression",
                CatchClause: "CatchClause",
                ConditionalExpression: "ConditionalExpression",
                ContinueStatement: "ContinueStatement",
                DoWhileStatement: "DoWhileStatement",
                DebuggerStatement: "DebuggerStatement",
                EmptyStatement: "EmptyStatement",
                ExpressionStatement: "ExpressionStatement",
                ForStatement: "ForStatement",
                ForInStatement: "ForInStatement",
                FunctionDeclaration: "FunctionDeclaration",
                FunctionExpression: "FunctionExpression",
                Identifier: "Identifier",
                IfStatement: "IfStatement",
                Literal: "Literal",
                LabeledStatement: "LabeledStatement",
                LogicalExpression: "LogicalExpression",
                MemberExpression: "MemberExpression",
                NewExpression: "NewExpression",
                ObjectExpression: "ObjectExpression",
                Program: "Program",
                Property: "Property",
                ReturnStatement: "ReturnStatement",
                SequenceExpression: "SequenceExpression",
                SwitchStatement: "SwitchStatement",
                SwitchCase: "SwitchCase",
                ThisExpression: "ThisExpression",
                ThrowStatement: "ThrowStatement",
                TryStatement: "TryStatement",
                UnaryExpression: "UnaryExpression",
                UpdateExpression: "UpdateExpression",
                VariableDeclaration: "VariableDeclaration",
                VariableDeclarator: "VariableDeclarator",
                WhileStatement: "WhileStatement",
                WithStatement: "WithStatement"
            }, sb = {
                ArrowParameterPlaceHolder: {
                    type: "ArrowParameterPlaceHolder"
                }
            }, tb = {
                Data: 1,
                Get: 2,
                Set: 4
            }, ub = {
                UnexpectedToken: "Unexpected token %0",
                UnexpectedNumber: "Unexpected number",
                UnexpectedString: "Unexpected string",
                UnexpectedIdentifier: "Unexpected identifier",
                UnexpectedReserved: "Unexpected reserved word",
                UnexpectedEOS: "Unexpected end of input",
                NewlineAfterThrow: "Illegal newline after throw",
                InvalidRegExp: "Invalid regular expression",
                UnterminatedRegExp: "Invalid regular expression: missing /",
                InvalidLHSInAssignment: "Invalid left-hand side in assignment",
                InvalidLHSInForIn: "Invalid left-hand side in for-in",
                MultipleDefaultsInSwitch: "More than one default clause in switch statement",
                NoCatchOrFinally: "Missing catch or finally after try",
                UnknownLabel: "Undefined label '%0'",
                Redeclaration: "%0 '%1' has already been declared",
                IllegalContinue: "Illegal continue statement",
                IllegalBreak: "Illegal break statement",
                IllegalReturn: "Illegal return statement",
                StrictModeWith: "Strict mode code may not include a with statement",
                StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
                StrictVarName: "Variable name may not be eval or arguments in strict mode",
                StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
                StrictParamDupe: "Strict mode function may not have duplicate parameter names",
                StrictFunctionName: "Function name may not be eval or arguments in strict mode",
                StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
                StrictDelete: "Delete of an unqualified identifier in strict mode.",
                StrictDuplicateProperty: "Duplicate data property in object literal not allowed in strict mode",
                AccessorDataProperty: "Object literal may not have data and accessor property with the same name",
                AccessorGetSet: "Object literal may not have multiple get/set accessors with the same name",
                StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
                StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
                StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
                StrictReservedWord: "Use of future reserved word in strict mode"
            }, vb = {
                NonAsciiIdentifierStart: new RegExp("[ÂªÂµÂºÃ€-Ã–Ã˜-Ã¶Ã¸-ËË†-Ë‘Ë -Ë¤Ë¬Ë®Í°-Í´Í¶Í·Íº-Í½Í¿Î†Îˆ-ÎŠÎŒÎŽ-Î¡Î£-ÏµÏ·-ÒÒŠ-Ô¯Ô±-Õ–Õ™Õ¡-Ö‡×-×ª×°-×²Ø -ÙŠÙ®Ù¯Ù±-Û“Û•Û¥Û¦Û®Û¯Ûº-Û¼Û¿ÜÜ’-Ü¯Ý-Þ¥Þ±ßŠ-ßªß´ßµßºà €-à •à šà ¤à ¨à¡€-à¡˜à¢ -à¢²à¤„-à¤¹à¤½à¥à¥˜-à¥¡à¥±-à¦€à¦…-à¦Œà¦à¦à¦“-à¦¨à¦ª-à¦°à¦²à¦¶-à¦¹à¦½à§Žà§œà§à§Ÿ-à§¡à§°à§±à¨…-à¨Šà¨à¨à¨“-à¨¨à¨ª-à¨°à¨²à¨³à¨µà¨¶à¨¸à¨¹à©™-à©œà©žà©²-à©´àª…-àªàª-àª‘àª“-àª¨àªª-àª°àª²àª³àªµ-àª¹àª½à«à« à«¡à¬…-à¬Œà¬à¬à¬“-à¬¨à¬ª-à¬°à¬²à¬³à¬µ-à¬¹à¬½à­œà­à­Ÿ-à­¡à­±à®ƒà®…-à®Šà®Ž-à®à®’-à®•à®™à®šà®œà®žà®Ÿà®£à®¤à®¨-à®ªà®®-à®¹à¯à°…-à°Œà°Ž-à°à°’-à°¨à°ª-à°¹à°½à±˜à±™à± à±¡à²…-à²Œà²Ž-à²à²’-à²¨à²ª-à²³à²µ-à²¹à²½à³žà³ à³¡à³±à³²à´…-à´Œà´Ž-à´à´’-à´ºà´½àµŽàµ àµ¡àµº-àµ¿à¶…-à¶–à¶š-à¶±à¶³-à¶»à¶½à·€-à·†à¸-à¸°à¸²à¸³à¹€-à¹†àºàº‚àº„àº‡àºˆàºŠàºàº”-àº—àº™-àºŸàº¡-àº£àº¥àº§àºªàº«àº­-àº°àº²àº³àº½à»€-à»„à»†à»œ-à»Ÿà¼€à½€-à½‡à½‰-à½¬à¾ˆ-à¾Œá€€-á€ªá€¿á-á•áš-áá¡á¥á¦á®-á°áµ-á‚á‚Žá‚ -áƒ…áƒ‡áƒáƒ-áƒºáƒ¼-á‰ˆá‰Š-á‰á‰-á‰–á‰˜á‰š-á‰á‰ -áŠˆáŠŠ-áŠáŠ-áŠ°áŠ²-áŠµáŠ¸-áŠ¾á‹€á‹‚-á‹…á‹ˆ-á‹–á‹˜-áŒáŒ’-áŒ•áŒ˜-ášáŽ€-áŽáŽ -á´á-á™¬á™¯-á™¿áš-áššáš -á›ªá›®-á›¸áœ€-áœŒáœŽ-áœ‘áœ -áœ±á€-á‘á -á¬á®-á°áž€-áž³áŸ—áŸœá  -á¡·á¢€-á¢¨á¢ªá¢°-á£µá¤€-á¤žá¥-á¥­á¥°-á¥´á¦€-á¦«á§-á§‡á¨€-á¨–á¨ -á©”áª§á¬…-á¬³á­…-á­‹á®ƒ-á® á®®á®¯á®º-á¯¥á°€-á°£á±-á±á±š-á±½á³©-á³¬á³®-á³±á³µá³¶á´€-á¶¿á¸€-á¼•á¼˜-á¼á¼ -á½…á½ˆ-á½á½-á½—á½™á½›á½á½Ÿ-á½½á¾€-á¾´á¾¶-á¾¼á¾¾á¿‚-á¿„á¿†-á¿Œá¿-á¿“á¿–-á¿›á¿ -á¿¬á¿²-á¿´á¿¶-á¿¼â±â¿â‚-â‚œâ„‚â„‡â„Š-â„“â„•â„™-â„â„¤â„¦â„¨â„ª-â„­â„¯-â„¹â„¼-â„¿â……-â…‰â…Žâ… -â†ˆâ°€-â°®â°°-â±žâ± -â³¤â³«-â³®â³²â³³â´€-â´¥â´§â´­â´°-âµ§âµ¯â¶€-â¶–â¶ -â¶¦â¶¨-â¶®â¶°-â¶¶â¶¸-â¶¾â·€-â·†â·ˆ-â·Žâ·-â·–â·˜-â·žâ¸¯ã€…-ã€‡ã€¡-ã€©ã€±-ã€µã€¸-ã€¼ã-ã‚–ã‚-ã‚Ÿã‚¡-ãƒºãƒ¼-ãƒ¿ã„…-ã„­ã„±-ã†Žã† -ã†ºã‡°-ã‡¿ã€-ä¶µä¸€-é¿Œê€€-ê’Œê“-ê“½ê”€-ê˜Œê˜-ê˜Ÿê˜ªê˜«ê™€-ê™®ê™¿-êšêš -ê›¯êœ—-êœŸêœ¢-êžˆêž‹-êžŽêž-êž­êž°êž±êŸ·-ê ê ƒ-ê …ê ‡-ê Šê Œ-ê ¢ê¡€-ê¡³ê¢‚-ê¢³ê£²-ê£·ê£»ê¤Š-ê¤¥ê¤°-ê¥†ê¥ -ê¥¼ê¦„-ê¦²ê§ê§ -ê§¤ê§¦-ê§¯ê§º-ê§¾ê¨€-ê¨¨ê©€-ê©‚ê©„-ê©‹ê© -ê©¶ê©ºê©¾-êª¯êª±êªµêª¶êª¹-êª½ê«€ê«‚ê«›-ê«ê« -ê«ªê«²-ê«´ê¬-ê¬†ê¬‰-ê¬Žê¬‘-ê¬–ê¬ -ê¬¦ê¬¨-ê¬®ê¬°-ê­šê­œ-ê­Ÿê­¤ê­¥ê¯€-ê¯¢ê°€-íž£íž°-íŸ†íŸ‹-íŸ»ï¤€-ï©­ï©°-ï«™ï¬€-ï¬†ï¬“-ï¬—ï¬ï¬Ÿ-ï¬¨ï¬ª-ï¬¶ï¬¸-ï¬¼ï¬¾ï­€ï­ï­ƒï­„ï­†-ï®±ï¯“-ï´½ïµ-ï¶ï¶’-ï·‡ï·°-ï·»ï¹°-ï¹´ï¹¶-ï»¼ï¼¡-ï¼ºï½-ï½šï½¦-ï¾¾ï¿‚-ï¿‡ï¿Š-ï¿ï¿’-ï¿—ï¿š-ï¿œ]"),
                NonAsciiIdentifierPart: new RegExp("[ÂªÂµÂºÃ€-Ã–Ã˜-Ã¶Ã¸-ËË†-Ë‘Ë -Ë¤Ë¬Ë®Ì€-Í´Í¶Í·Íº-Í½Í¿Î†Îˆ-ÎŠÎŒÎŽ-Î¡Î£-ÏµÏ·-ÒÒƒ-Ò‡ÒŠ-Ô¯Ô±-Õ–Õ™Õ¡-Ö‡Ö‘-Ö½Ö¿××‚×„×…×‡×-×ª×°-×²Ø-ØšØ -Ù©Ù®-Û“Û•-ÛœÛŸ-Û¨Ûª-Û¼Û¿Ü-ÝŠÝ-Þ±ß€-ßµßºà €-à ­à¡€-à¡›à¢ -à¢²à£¤-à¥£à¥¦-à¥¯à¥±-à¦ƒà¦…-à¦Œà¦à¦à¦“-à¦¨à¦ª-à¦°à¦²à¦¶-à¦¹à¦¼-à§„à§‡à§ˆà§‹-à§Žà§—à§œà§à§Ÿ-à§£à§¦-à§±à¨-à¨ƒà¨…-à¨Šà¨à¨à¨“-à¨¨à¨ª-à¨°à¨²à¨³à¨µà¨¶à¨¸à¨¹à¨¼à¨¾-à©‚à©‡à©ˆà©‹-à©à©‘à©™-à©œà©žà©¦-à©µàª-àªƒàª…-àªàª-àª‘àª“-àª¨àªª-àª°àª²àª³àªµ-àª¹àª¼-à«…à«‡-à«‰à«‹-à«à«à« -à«£à«¦-à«¯à¬-à¬ƒà¬…-à¬Œà¬à¬à¬“-à¬¨à¬ª-à¬°à¬²à¬³à¬µ-à¬¹à¬¼-à­„à­‡à­ˆà­‹-à­à­–à­—à­œà­à­Ÿ-à­£à­¦-à­¯à­±à®‚à®ƒà®…-à®Šà®Ž-à®à®’-à®•à®™à®šà®œà®žà®Ÿà®£à®¤à®¨-à®ªà®®-à®¹à®¾-à¯‚à¯†-à¯ˆà¯Š-à¯à¯à¯—à¯¦-à¯¯à°€-à°ƒà°…-à°Œà°Ž-à°à°’-à°¨à°ª-à°¹à°½-à±„à±†-à±ˆà±Š-à±à±•à±–à±˜à±™à± -à±£à±¦-à±¯à²-à²ƒà²…-à²Œà²Ž-à²à²’-à²¨à²ª-à²³à²µ-à²¹à²¼-à³„à³†-à³ˆà³Š-à³à³•à³–à³žà³ -à³£à³¦-à³¯à³±à³²à´-à´ƒà´…-à´Œà´Ž-à´à´’-à´ºà´½-àµ„àµ†-àµˆàµŠ-àµŽàµ—àµ -àµ£àµ¦-àµ¯àµº-àµ¿à¶‚à¶ƒà¶…-à¶–à¶š-à¶±à¶³-à¶»à¶½à·€-à·†à·Šà·-à·”à·–à·˜-à·Ÿà·¦-à·¯à·²à·³à¸-à¸ºà¹€-à¹Žà¹-à¹™àºàº‚àº„àº‡àºˆàºŠàºàº”-àº—àº™-àºŸàº¡-àº£àº¥àº§àºªàº«àº­-àº¹àº»-àº½à»€-à»„à»†à»ˆ-à»à»-à»™à»œ-à»Ÿà¼€à¼˜à¼™à¼ -à¼©à¼µà¼·à¼¹à¼¾-à½‡à½‰-à½¬à½±-à¾„à¾†-à¾—à¾™-à¾¼à¿†á€€-á‰á-á‚á‚ -áƒ…áƒ‡áƒáƒ-áƒºáƒ¼-á‰ˆá‰Š-á‰á‰-á‰–á‰˜á‰š-á‰á‰ -áŠˆáŠŠ-áŠáŠ-áŠ°áŠ²-áŠµáŠ¸-áŠ¾á‹€á‹‚-á‹…á‹ˆ-á‹–á‹˜-áŒáŒ’-áŒ•áŒ˜-ášá-áŸáŽ€-áŽáŽ -á´á-á™¬á™¯-á™¿áš-áššáš -á›ªá›®-á›¸áœ€-áœŒáœŽ-áœ”áœ -áœ´á€-á“á -á¬á®-á°á²á³áž€-áŸ“áŸ—áŸœáŸáŸ -áŸ©á ‹-á á -á ™á  -á¡·á¢€-á¢ªá¢°-á£µá¤€-á¤žá¤ -á¤«á¤°-á¤»á¥†-á¥­á¥°-á¥´á¦€-á¦«á¦°-á§‰á§-á§™á¨€-á¨›á¨ -á©žá© -á©¼á©¿-áª‰áª-áª™áª§áª°-áª½á¬€-á­‹á­-á­™á­«-á­³á®€-á¯³á°€-á°·á±€-á±‰á±-á±½á³-á³’á³”-á³¶á³¸á³¹á´€-á·µá·¼-á¼•á¼˜-á¼á¼ -á½…á½ˆ-á½á½-á½—á½™á½›á½á½Ÿ-á½½á¾€-á¾´á¾¶-á¾¼á¾¾á¿‚-á¿„á¿†-á¿Œá¿-á¿“á¿–-á¿›á¿ -á¿¬á¿²-á¿´á¿¶-á¿¼â€Œâ€â€¿â€â”â±â¿â‚-â‚œâƒ-âƒœâƒ¡âƒ¥-âƒ°â„‚â„‡â„Š-â„“â„•â„™-â„â„¤â„¦â„¨â„ª-â„­â„¯-â„¹â„¼-â„¿â……-â…‰â…Žâ… -â†ˆâ°€-â°®â°°-â±žâ± -â³¤â³«-â³³â´€-â´¥â´§â´­â´°-âµ§âµ¯âµ¿-â¶–â¶ -â¶¦â¶¨-â¶®â¶°-â¶¶â¶¸-â¶¾â·€-â·†â·ˆ-â·Žâ·-â·–â·˜-â·žâ· -â·¿â¸¯ã€…-ã€‡ã€¡-ã€¯ã€±-ã€µã€¸-ã€¼ã-ã‚–ã‚™ã‚šã‚-ã‚Ÿã‚¡-ãƒºãƒ¼-ãƒ¿ã„…-ã„­ã„±-ã†Žã† -ã†ºã‡°-ã‡¿ã€-ä¶µä¸€-é¿Œê€€-ê’Œê“-ê“½ê”€-ê˜Œê˜-ê˜«ê™€-ê™¯ê™´-ê™½ê™¿-êšêšŸ-ê›±êœ—-êœŸêœ¢-êžˆêž‹-êžŽêž-êž­êž°êž±êŸ·-ê §ê¡€-ê¡³ê¢€-ê£„ê£-ê£™ê£ -ê£·ê£»ê¤€-ê¤­ê¤°-ê¥“ê¥ -ê¥¼ê¦€-ê§€ê§-ê§™ê§ -ê§¾ê¨€-ê¨¶ê©€-ê©ê©-ê©™ê© -ê©¶ê©º-ê«‚ê«›-ê«ê« -ê«¯ê«²-ê«¶ê¬-ê¬†ê¬‰-ê¬Žê¬‘-ê¬–ê¬ -ê¬¦ê¬¨-ê¬®ê¬°-ê­šê­œ-ê­Ÿê­¤ê­¥ê¯€-ê¯ªê¯¬ê¯­ê¯°-ê¯¹ê°€-íž£íž°-íŸ†íŸ‹-íŸ»ï¤€-ï©­ï©°-ï«™ï¬€-ï¬†ï¬“-ï¬—ï¬-ï¬¨ï¬ª-ï¬¶ï¬¸-ï¬¼ï¬¾ï­€ï­ï­ƒï­„ï­†-ï®±ï¯“-ï´½ïµ-ï¶ï¶’-ï·‡ï·°-ï·»ï¸€-ï¸ï¸ -ï¸­ï¸³ï¸´ï¹-ï¹ï¹°-ï¹´ï¹¶-ï»¼ï¼-ï¼™ï¼¡-ï¼ºï¼¿ï½-ï½šï½¦-ï¾¾ï¿‚-ï¿‡ï¿Š-ï¿ï¿’-ï¿—ï¿š-ï¿œ]")
            }, S.prototype = R.prototype = {
                processComment: function() {
                    var a, b, c, d, e, f = Eb.bottomRightStack,
                        g = f[f.length - 1];
                    if (!(this.type === rb.Program && this.body.length > 0)) {
                        if (Eb.trailingComments.length > 0) {
                            for (c = [], d = Eb.trailingComments.length - 1; d >= 0; --d) e = Eb.trailingComments[d], e.range[0] >= this.range[1] && (c.unshift(e), Eb.trailingComments.splice(d, 1));
                            Eb.trailingComments = []
                        } else g && g.trailingComments && g.trailingComments[0].range[0] >= this.range[1] && (c = g.trailingComments, delete g.trailingComments);
                        if (g)
                            for (; g && g.range[0] >= this.range[0];) a = g, g = f.pop();
                        if (a) a.leadingComments && a.leadingComments[a.leadingComments.length - 1].range[1] <= this.range[0] && (this.leadingComments = a.leadingComments, a.leadingComments = void 0);
                        else if (Eb.leadingComments.length > 0)
                            for (b = [], d = Eb.leadingComments.length - 1; d >= 0; --d) e = Eb.leadingComments[d], e.range[1] <= this.range[0] && (b.unshift(e), Eb.leadingComments.splice(d, 1));
                        b && b.length > 0 && (this.leadingComments = b), c && c.length > 0 && (this.trailingComments = c), f.push(this)
                    }
                },
                finish: function() {
                    Eb.range && (this.range[1] = yb), Eb.loc && (this.loc.end = new O, Eb.source && (this.loc.source = Eb.source)), Eb.attachComment && this.processComment()
                },
                finishArrayExpression: function(a) {
                    return this.type = rb.ArrayExpression, this.elements = a, this.finish(), this
                },
                finishArrowFunctionExpression: function(a, b, c, d) {
                    return this.type = rb.ArrowFunctionExpression, this.id = null, this.params = a, this.defaults = b, this.body = c, this.rest = null, this.generator = !1, this.expression = d, this.finish(), this
                },
                finishAssignmentExpression: function(a, b, c) {
                    return this.type = rb.AssignmentExpression, this.operator = a, this.left = b, this.right = c, this.finish(), this
                },
                finishBinaryExpression: function(a, b, c) {
                    return this.type = "||" === a || "&&" === a ? rb.LogicalExpression : rb.BinaryExpression, this.operator = a, this.left = b, this.right = c, this.finish(), this
                },
                finishBlockStatement: function(a) {
                    return this.type = rb.BlockStatement, this.body = a, this.finish(), this
                },
                finishBreakStatement: function(a) {
                    return this.type = rb.BreakStatement, this.label = a, this.finish(), this
                },
                finishCallExpression: function(a, b) {
                    return this.type = rb.CallExpression, this.callee = a, this.arguments = b, this.finish(), this
                },
                finishCatchClause: function(a, b) {
                    return this.type = rb.CatchClause, this.param = a, this.body = b, this.finish(), this
                },
                finishConditionalExpression: function(a, b, c) {
                    return this.type = rb.ConditionalExpression, this.test = a, this.consequent = b, this.alternate = c, this.finish(), this
                },
                finishContinueStatement: function(a) {
                    return this.type = rb.ContinueStatement, this.label = a, this.finish(), this
                },
                finishDebuggerStatement: function() {
                    return this.type = rb.DebuggerStatement, this.finish(), this
                },
                finishDoWhileStatement: function(a, b) {
                    return this.type = rb.DoWhileStatement, this.body = a, this.test = b, this.finish(), this
                },
                finishEmptyStatement: function() {
                    return this.type = rb.EmptyStatement, this.finish(), this
                },
                finishExpressionStatement: function(a) {
                    return this.type = rb.ExpressionStatement, this.expression = a, this.finish(), this
                },
                finishForStatement: function(a, b, c, d) {
                    return this.type = rb.ForStatement, this.init = a, this.test = b, this.update = c, this.body = d, this.finish(), this
                },
                finishForInStatement: function(a, b, c) {
                    return this.type = rb.ForInStatement, this.left = a, this.right = b, this.body = c, this.each = !1, this.finish(), this
                },
                finishFunctionDeclaration: function(a, b, c, d) {
                    return this.type = rb.FunctionDeclaration, this.id = a, this.params = b, this.defaults = c, this.body = d, this.rest = null, this.generator = !1, this.expression = !1, this.finish(), this
                },
                finishFunctionExpression: function(a, b, c, d) {
                    return this.type = rb.FunctionExpression, this.id = a, this.params = b, this.defaults = c, this.body = d, this.rest = null, this.generator = !1, this.expression = !1, this.finish(), this
                },
                finishIdentifier: function(a) {
                    return this.type = rb.Identifier, this.name = a, this.finish(), this
                },
                finishIfStatement: function(a, b, c) {
                    return this.type = rb.IfStatement, this.test = a, this.consequent = b, this.alternate = c, this.finish(), this
                },
                finishLabeledStatement: function(a, b) {
                    return this.type = rb.LabeledStatement, this.label = a, this.body = b, this.finish(), this
                },
                finishLiteral: function(a) {
                    return this.type = rb.Literal, this.value = a.value, this.raw = wb.slice(a.start, a.end), a.regex && (this.regex = a.regex), this.finish(), this
                },
                finishMemberExpression: function(a, b, c) {
                    return this.type = rb.MemberExpression, this.computed = "[" === a, this.object = b, this.property = c, this.finish(), this
                },
                finishNewExpression: function(a, b) {
                    return this.type = rb.NewExpression, this.callee = a, this.arguments = b, this.finish(), this
                },
                finishObjectExpression: function(a) {
                    return this.type = rb.ObjectExpression, this.properties = a, this.finish(), this
                },
                finishPostfixExpression: function(a, b) {
                    return this.type = rb.UpdateExpression, this.operator = a, this.argument = b, this.prefix = !1, this.finish(), this
                },
                finishProgram: function(a) {
                    return this.type = rb.Program, this.body = a, this.finish(), this
                },
                finishProperty: function(a, b, c, d, e) {
                    return this.type = rb.Property, this.key = b, this.value = c, this.kind = a, this.method = d, this.shorthand = e, this.finish(), this
                },
                finishReturnStatement: function(a) {
                    return this.type = rb.ReturnStatement, this.argument = a, this.finish(), this
                },
                finishSequenceExpression: function(a) {
                    return this.type = rb.SequenceExpression, this.expressions = a, this.finish(), this
                },
                finishSwitchCase: function(a, b) {
                    return this.type = rb.SwitchCase, this.test = a, this.consequent = b, this.finish(), this
                },
                finishSwitchStatement: function(a, b) {
                    return this.type = rb.SwitchStatement, this.discriminant = a, this.cases = b, this.finish(), this
                },
                finishThisExpression: function() {
                    return this.type = rb.ThisExpression, this.finish(), this
                },
                finishThrowStatement: function(a) {
                    return this.type = rb.ThrowStatement, this.argument = a, this.finish(), this
                },
                finishTryStatement: function(a, b, c, d) {
                    return this.type = rb.TryStatement, this.block = a, this.guardedHandlers = b, this.handlers = c, this.finalizer = d, this.finish(), this
                },
                finishUnaryExpression: function(a, b) {
                    return this.type = "++" === a || "--" === a ? rb.UpdateExpression : rb.UnaryExpression, this.operator = a, this.argument = b, this.prefix = !0, this.finish(), this
                },
                finishVariableDeclaration: function(a, b) {
                    return this.type = rb.VariableDeclaration, this.declarations = a, this.kind = b, this.finish(), this
                },
                finishVariableDeclarator: function(a, b) {
                    return this.type = rb.VariableDeclarator, this.id = a, this.init = b, this.finish(), this
                },
                finishWhileStatement: function(a, b) {
                    return this.type = rb.WhileStatement, this.test = a, this.body = b, this.finish(), this
                },
                finishWithStatement: function(a, b) {
                    return this.type = rb.WithStatement, this.object = a, this.body = b, this.finish(), this
                }
            }, a.version = "2.0.0", a.tokenize = mb, a.parse = nb, a.Syntax = function() {
                var a, b = {};
                "function" == typeof Object.create && (b = Object.create(null));
                for (a in rb) rb.hasOwnProperty(a) && (b[a] = rb[a]);
                return "function" == typeof Object.freeze && Object.freeze(b), b
            }()
        })
    }, {}],
    40: [function(a, b) {
        b.exports.mergeAndMap = function(a, b, c) {
            a && "object" == typeof a || (a = {}), b && "object" == typeof b || (b = {});
            var d = this.deepMerge(a, b);
            return this.mapOptions(d, c)
        }, b.exports.mapOptions = function(a, b) {
            if (!a || "object" != typeof a) return {};
            if (!b || "object" != typeof b) return JSON.parse(JSON.stringify(a));
            var c = {};
            for (var d in a) a.hasOwnProperty(d) && (d in b ? this.replaceWithMappings(c, a[d], b[d]) : c[d] = a[d]);
            return c
        }, b.exports.replaceWithMappings = function(a, b, c) {
            if (a && "object" == typeof a)
                if (c instanceof Array)
                    for (var d in c) c.hasOwnProperty(d) && this.replaceWithMapping(a, b, c[d]);
                else this.replaceWithMapping(a, b, c)
        }, b.exports.replaceWithMapping = function(a, b, c) {
            if (a && "object" == typeof a)
                if ("object" == typeof c)
                    for (var d in c) c.hasOwnProperty(d) && (d in a || (a[d] = {}), this.replaceWithMapping(a[d], b, c[d]));
                else a[c] = b
        }, b.exports.deepMerge = function(a, b) {
            if (!a) return JSON.parse(JSON.stringify(b));
            if (!b) return JSON.parse(JSON.stringify(a));
            var c = JSON.parse(JSON.stringify(a));
            for (var d in b) b.hasOwnProperty(d) && (c[d] = d in c && "object" == typeof c[d] ? this.deepMerge(c[d], b[d]) : b[d]);
            return c
        }
    }, {}],
    41: [function(a, b) {
        var c = a("bmmr-asset-js"),
            d = a("./merge-utils"),
            e = a("js-yaml"),
            f = "BloombergPlayer.swf",
            g = "skin.png",
            h = "buffering-animation.gif",
            i = e.safeLoad('\ntech_order:\n - flash\n - html5\n\ncontrols: false\nlive: false\nposter_as_slate: false\n#poster:\n\n# Disabled ads: If you would like to disable ads, set module_ad_player to\n# disabled, or ad_tag to an empty String (its default).\n#\n# module_ad_player and module_live_stream_ad_sensor are currently specific to\n# the flash player. They should be set to either enabled or disabled. The\n# flash player will check each for \'enabled,\' and if it doesn\'t see the term,\n# it won\'t load the class that enables its functionality. module_ad_player\n# reflects all ads (preroll and midroll for live).\n# module_live_stream_ad_sensor reflects only midrolls for live.\nmodule_ad_player: enabled\nmodule_live_stream_ad_sensor: enabled\n\n# If using ads, the following configuration options define how the calls will\n# be made to the ad server. There are two different templates we support, DART\n# and GPT. If ad_tag_gpt_preroll or ad_tag_gpt_midroll is set to true, the\n# player will use that template for prerolls or midrolls, respectively.\n#\n# The folloing define our ad tag templates for DART and GPT, and show how the\n# configuration parameters get used in each.\n#\n# When you see a * after a parameter in the description, this generally refers\n# to supporting separate configuration for prerolls and midrolls.\n#\n# DART:\n#   http://ad.doubleclick.net/{ad_network_id_*}/pfadx/{ad_tag*}\n#\n#   ad_network_id_* - if no network ID is provided, the URL will not use a\n#                     network ID\n#   ad_tag*         - is one of ad_tag (preroll) or ad_tag_midroll\n#\n#   Other options are appended to the URL with semicolons (;) as delimiters.\n#   ad_tag_sz_*   - ;sz={value}   - defaults to 1x1\n#   ad_tag_tile_* - ;tile={value} - defaults to 1\n#\n#   The following options are automatically filled in and appended. If you\n#   need to change any of these, please reach out to us.\n#   ;tp_video=null\n#   ;dcmt=text/xml\n#   ;url={current page URL}\n#   ;ord={unique identifier}\n#\n# GPT:\n#   http://pubads.g.doubleclick.net/gampad/ads?"\n#\n#   ad_network_id_* and ad_tag* are concatenated and added to the URL as a GET\n#   param called \'iu\'\n#\n#   Options are appended to the URL as GET params\n#   ad_tag_sz_*            - &sz={value}          - defaults to 1x1\n#   ad_tag_cust_params_*   - &cust_params={value} - unused if not set\n#     Note that the value of cust_params should be encoded prior to sending\n#\n#   The following options are automatically filled in and appended. If you\n#   need to change any of these, please reach out to us.\n#   &ciu_szs=300x250,728x90\n#   &impl=s\n#   &gdfp_req=1\n#   &env=vp\n#   &output=xml_vast2\n#   &unviewed_position_start=1\n#   &url={current page URL}\n#   &correlator={unique identifier}\n#\n# For both DART and GPT, if you specify ad_tag_suffix_*, it will be appended,\n# untouched, to the end of the URL before making the request.\nad_tag: ""\nad_code_prefix: ""\n#ad_network_id_preroll: \n#ad_tag_suffix_preroll:\n#ad_tag_sz_preroll:\n#ad_tag_tile_preroll:\nad_tag_gpt_preroll: false\n#ad_tag_cust_params_preroll:\nad_tag_midroll: ""\n#ad_network_id_midroll: \n#ad_tag_suffix_midroll:\n#ad_tag_sz_midroll:\n#ad_tag_tile_midroll:\n#ad_tag_cust_params_midroll:\nad_tag_gpt_midroll: false\nad_tag_overlay: ""\n#ad_network_id_overlay:\n#ad_tag_suffix_overlay:\n#ad_tag_sz_overlay:\n#ad_tag_tile_overlay:\n#ad_tag_cust_params_overlay:\nad_tag_gpt_overlay: false\n\n# If you would like to tell Google\'s IMA SDK to not companion its ads, set\n# this to false\ndisable_companion_ads: false\n\n# How long to wait for a successfully retrieved ad to play before determining\n# it a failure and moving on (in milliseconds)\nads_playback_timeout: 3000\n\n# How long to wait for retrieving an ad before determining it a failure and\n# moving on (in milliseconds)\nads_vast_timeout: 3000\n\n# Number of times to retry a failed ad request/play before giving up\nads_max_retries_preroll: 100\nads_max_retries_midroll: 100\n\n# Number of ads to play during each midroll\nads_live_per_block: 3\n# Number of ads to play during each preroll\npreroll_ads_per_block: 1\n\n# Number of seconds to wait after seeing a midroll cue point in the live\n# stream before playing the midroll ads\nads_live_playback_delay: 4\n# Number of seconds to wait after preparing a preroll before playing it\npreroll_ads_playback_delay: 0\n\nautoplay: true\nstart_time: 0\n#metadata:\n#swf: <%= "http://cdn.gotraffic.net/projector/v#{Gem.loaded_specs[\'projector\'].version.version}/BloombergPlayer.swf" %>\nmodule_media_controller: enabled\nmodule_media_loader: enabled\nmodule_media_container: enabled\nmodule_chrome: enabled\nmodule_captions: enabled\nmodule_js_media_controller: enabled\nmodule_event_bridge: enabled\nmodule_user_preferences_store: enabled\nmodule_conviva_insights: disabled\nlog_debug: true\njs_events_callback: onPlayerEvent\njs_playback_callback: onPlaybackStatusChange\n#ui_skin_url: <%= "http://cdn.gotraffic.net/projector/v#{Gem.loaded_specs[\'projector\'].version.version}/skin.png" %>\n# Milliseconds to wait between user interactions until controls are fade out\nui_autohide_timeout: 2000\nui_controls_popout: true\nui_controls_fullscreen: true\nquality: high\nbgcolor: "#000000"\nallow_script_access: always\nauto_setup: true\ncomscore_c3: "BBG"\ncomscore_ns_site: "bloomberg-stream-test"\ncomscore_page_level_tags: {}\nuse_comscore: true\nuse_clickable_ads: true\nuse_thumbnail: 111011423\nuse_live_display: true\nuse_overlay: false\n#overlay_id:\nuse_child_video: false\n\n# If true, the player will use JavaScript for requesting and playing ads\n# instead of making the calls and playing the ads from flash. Note that this\n# is currently experimental, and should not be used in production yet.\nuse_js_ads: false\n\n# Chartbeat is an analytics service. To enable it, set use_chartbeat to true,\n# and fill in the properties you need set. The required properties are:\n# chartbeat_uid - the UID of your account\n# chartbeat_domain - one of your account\'s available domains\n#\n# Chartbeat provides additional options, some specifically around video.\n#\n# chartbeat_videodomain\n# The purpose of videodomain is to allow all traffic for a website to go to\n# the location set in chartbeat_domain, and the video traffic to go to the\n# location under videodomain (when Chartbeat buckets the traffic). For\n# example, if you wanted the website traffic to go to businessweek.com, but\n# video analytics to go to video@bloomberg.com, you would set chartbeat_domain\n# to "businessweek.com" and chartbeat_videodomain to "video@bloomberg.com"\nuse_chartbeat: false\n#chartbeat_uid:\n#chartbeat_domain:\n#chartbeat_videodomain:\n\n#buffering_animation: <%= "http://cdn.gotraffic.net/projector/v#{Gem.loaded_specs[\'projector\'].version.version}/buffering-animation.gif" %>\n#conviva_custom_tags:\n#conviva_account: c3.Bloomberg-Test\ncomscore_c4: "BBG"\ncomscore_c5: "02"\ncomscore_ns_site: \'bloomberg-stream-test\'\nad_click_plugin: {}\n#wmode:\nlimit_html_player_to: \'\'\nallow_dvr: false\n\n# Assets are of the form:\n# {protocol}://www.cdn.gotraffic.net/projector/{version}/asset_name.extension\n#\n# {protocol} - defined by asset_protocol\n#              options: http or https\n# {version}  - defined by asset_version\n#              options:\n#                version - use the version of the included projector Gem\n#                latest - use the latest deployed asset version\n#                         (at /projector/latest/...)\nasset_protocol: http\nasset_version: version\n'),
            j = e.safeLoad('tech_order: techOrder\ncontrols: controls\nwidth: width\nheight: height\nmetadata: metadata\nplayer_type: player_type\nplugins: plugins\nasset_protocol:\n  - "asset_protocol"\n  - flash:\n      flashVars: "asset_protocol"\nposter:\n  - "poster"\n  - flash:\n      flashVars: "poster"\nposter_as_slate:\n  flash:\n    flashVars: "poster_as_slate"\nconviva_account:\n  flash:\n    flashVars: "conviva.account"\nconviva_custom_tags:\n  flash:\n    flashVars: "conviva.custom.tags"\nbuffering_animation:\n  - flash:\n      flashVars: "buffering.animation"\n  - plugins:\n      googleAdsPlugin: "bufferingAnimation"\nad_tag:\n  - flash:\n      flashVars: "ads.preroll.unit"\n  - plugins:\n      googleAdsPlugin: "prerollUnit"\nad_tag_midroll:\n  - flash:\n      flashVars: "ads.midroll.unit"\n  - plugins:\n      googleAdsPlugin: "midrollUnit"\nad_tag_overlay:\n  - flash:\n      flashVars: "ads.overlay.unit"\n  - plugins:\n      googleAdsPlugin: "overlayUnit"\nad_network_id_preroll:\n  - flash:\n      flashVars: "ads.preroll.network.id"\n  - plugins:\n      googleAdsPlugin: "prerollNetworkId"\nad_network_id_midroll:\n  - flash:\n      flashVars: "ads.midroll.network.id"\n  - plugins:\n      googleAdsPlugin: "midrollNetworkId"\nad_network_id_overlay:\n  - flash:\n      flashVars: "ads.overlay.network.id"\n  - plugins:\n      googleAdsPlugin: "overlayNetworkId"\nad_tag_suffix_preroll:\n  - flash:\n      flashVars: "ads.preroll.suffix"\n  - plugins:\n      googleAdsPlugin: "prerollSuffix"\nad_tag_suffix_midroll:\n  - flash:\n      flashVars: "ads.midroll.suffix"\n  - plugins:\n      googleAdsPlugin: "midrollSuffix"\nad_tag_suffix_overlay:\n  - flash:\n      flashVars: "ads.overlay.suffix"\n  - plugins:\n      googleAdsPlugin: "overlaySuffix"\nad_tag_sz_preroll:\n  - flash:\n      flashVars: "ads.preroll.sz"\n  - plugins:\n      googleAdsPlugin: "prerollSz"\nad_tag_sz_midroll:\n  - flash:\n      flashVars: "ads.midroll.sz"\n  - plugins:\n      googleAdsPlugin: "midrollSz"\nad_tag_sz_overlay:\n  - flash:\n      flashVars: "ads.overlay.sz"\n  - plugins:\n      googleAdsPlugin: "overlaySz"\nad_tag_tile_preroll:\n  - flash:\n      flashVars: "ads.preroll.tile"\n  - plugins:\n      googleAdsPlugin: "prerollTile"\nad_tag_tile_midroll:\n  - flash:\n      flashVars: "ads.midroll.tile"\n  - plugins:\n      googleAdsPlugin: "midrollTile"\nad_tag_tile_overlay:\n  - flash:\n      flashVars: "ads.overlay.tile"\n  - plugins:\n      googleAdsPlugin: "overlayTile"\nad_tag_gpt_preroll:\n  - flash:\n      flashVars: "ads.preroll.gpt"\n  - plugins:\n      googleAdsPlugin: "prerollIsGPT"\nad_tag_gpt_midroll:\n  - flash:\n      flashVars: "ads.midroll.gpt"\n  - plugins:\n      googleAdsPlugin: "midrollIsGPT"\nad_tag_gpt_overlay:\n  - flash:\n      flashVars: "ads.overlay.gpt"\n  - plugins:\n      googleAdsPlugin: "overlayIsGPT"\nad_tag_cust_params_preroll:\n  - flash:\n      flashVars: "ads.preroll.cust_params"\n  - plugins:\n      googleAdsPlugin: "prerollCustParams"\nad_tag_cust_params_midroll:\n  - flash:\n      flashVars: "ads.midroll.cust_params"\n  - plugins:\n      googleAdsPlugin: "midrollCustParams"\nad_tag_cust_params_overlay:\n  - flash:\n      flashVars: "ads.overlay.cust_params"\n  - plugins:\n      googleAdsPlugin: "overlayCustParams"\ndisable_companion_ads:\n  - flash:\n      flashVars: "ads.companions.disable"\n  - plugins:\n      googleAdsPlugin: "prerollDisableCompanionAds"\n  - plugins:\n      googleAdsPlugin: "midrollDisableCompanionAds"\nads_playback_timeout:\n  - flash:\n      flashVars: "ads.playback.timeout"\n  - plugins:\n      googleAdsPlugin: "prerollPlaybackTimeout"\n  - plugins:\n      googleAdsPlugin: "midrollPlaybackTimeout"\nads_vast_timeout:\n  - flash:\n      flashVars: "ads.vast.timeout"\n  - plugins:\n      googleAdsPlugin: "prerollLoadTimeout"\n  - plugins:\n      googleAdsPlugin: "midrollLoadTimeout"\nautoplay:\n  flash:\n    flashVars: "autoplay"\ncontinuous_play_previous_url:\n  flash:\n    flashVars: "continuous_play_previous_url"\nstart_at:\n  flash:\n    flashVars: "video.start_at"\nlive:\n  flash:\n    flashVars: live\nswf:\n  flash: swf\nmodule_media_controller:\n  flash:\n    flashVars: "module.com.bloomberg.player.media::MediaController"\nmodule_media_loader:\n  flash:\n    flashVars: "module.com.bloomberg.player.media::MediaLoader"\nmodule_media_container:\n  flash:\n    flashVars: "module.com.bloomberg.player.media::MediaContainer"\nmodule_chrome:\n  flash:\n    flashVars: "module.com.bloomberg.player.chrome::Chrome"\nmodule_captions:\n  flash:\n    flashVars: "module.com.bloomberg.player.captions::Captions"\nmodule_ad_player:\n  flash:\n    flashVars: "module.com.bloomberg.player.ads::AdPlayer"\n  plugins:\n    googleAdsPlugin: "enabled"\nmodule_live_stream_ad_sensor:\n  flash:\n    flashVars: "module.com.bloomberg.player.ads::LiveStreamAdSensor"\nmodule_js_media_controller:\n  flash:\n    flashVars: "module.com.bloomberg.player.js::JsMediaController"\nmodule_event_bridge:\n  flash:\n    flashVars: "module.com.bloomberg.player.js::EventBridge"\nmodule_user_preferences_store:\n  flash:\n    flashVars: "module.com.bloomberg.player.js::UserPreferencesStore"\nmodule_conviva_insights:\n  flash:\n    flashVars: "module.com.bloomberg.player.reporting::ConvivaInsights"\nlog_debug:\n  - flash:\n      flashVars: "log.*.debug"\n  - plugins:\n      googleAdsPlugin: "debug"\nlog_debug_2:\n  flash:\n    flashVars: "log.com.bloomberg.player::Player.debug"\njs_events_callback:\n  flash:\n    flashVars: "js.events.callback"\njs_playback_callback:\n  flash:\n    flashVars: "js.playback.callback"\npreroll_ads_per_block:\n  plugins:\n    googleAdsPlugin: "prerollAdsPerBlock"\nads_live_per_block:\n  - flash:\n      flashVars: "ads.live.ads_per_block"\n  - plugins:\n      googleAdsPlugin: "midrollAdsPerBlock"\npreroll_ads_playback_delay:\n  plugins:\n    googleAdsPlugin: "prerollPlaybackDelay"\nads_live_playback_delay:\n  - flash:\n      flashVars: "ads.live.playback_delay"\n  - plugins:\n      googleAdsPlugin: "midrollPlaybackDelay"\nui_skin_url:\n  flash:\n    flashVars: "ui.skin.url"\nui_autohide_timeout:\n  - flash:\n      flashVars: "ui.autohide.timeout"\n  - plugins:\n      googleAdsPlugin: controlsFadeMillis\nui_controls_popout:\n  flash:\n    flashVars: "controls.popout"\nui_controls_fullscreen:\n  flash:\n    flashVars: "controls.fullscreen"\n    params: allowfullscreen\nquality:\n  flash:\n    params: quality \nbgcolor:\n  flash:\n    params: bgcolor\nwmode:\n  flash:\n    params: wmode\nallow_script_access:\n  flash:\n    params: allowscriptaccess\ncomscore_c3:\n  plugins:\n    comscoreMatrixPlugin: c3\ncomscore_c4:\n  plugins:\n    comscoreStreamSensePlugin: c4\ncomscore_c5:\n  plugins:\n    comscoreStreamSensePlugin: c5\ncomscore_ns_site:\n  plugins:\n    comscoreStreamSensePlugin: ns_site\ncomscore_page_level_tags:\n  plugins:\n    comscoreStreamSensePlugin: page_level_tags\nad_click_plugin:\n  plugins: adClickPlugin\nchartbeat_uid:\n  plugins:\n    chartbeatPlugin: uid\nchartbeat_domain:\n  plugins:\n    chartbeatPlugin: domain\nchartbeat_videodomain:\n  plugins:\n    chartbeatPlugin: videodomain\nuse_live_display:\n  plugins:\n    liveDisplayPlugin: enabled\nuse_share_overlay:\n  plugins:\n    shareOverlayPlugin: enabled\n  flash:\n    flashVars: "use_share_overlay"\nallow_dvr:\n  flash:\n    flashVars: allow_dvr\nuse_overlay:\n  plugins:\n    overlayPlugin: enabled\noverlay_id:\n  plugins:\n    overlayPlugin: id\nuse_child_video:\n  plugins:\n    childVideoPlugin: enabled\nuse_js_ads:\n  - flash:\n      flashVars: jsAdsEnabled\n  - plugins:\n      googleAdsPlugin: jsAdsEnabled\nads_max_retries_preroll:\n  plugins:\n    googleAdsPlugin: "prerollMaxRetries"\nads_max_retries_midroll:\n  plugins:\n    googleAdsPlugin: "midrollMaxRetries"\nuse_parsely:\n  plugins:\n    parselyPlugin: enabled\nuse_mediabong:\n  plugins:\n    mediabongPlugin: enabled\n'),
            k = e.safeLoad('US :\n  id : LIVE_US\n  title : LIVE_US\n  live : 1\n  form_type : Live U.S.\n  poster: \'http://www.bloomberg.com/image/iUFlwtQzdxWE.jpg\'\n  player_type : standard  \n  streams :\n  - url : "http://cdn3.videos.bloomberg.com/btv/us/master.m3u8"\n    type : "application/x-mpegURL"\n  - url : "http://blivehd-lh.akamaihd.net/z/us2_1@143156/manifest.f4m?hdcore=1"\n    type : "video/mp4"\n\nASIA :\n  id : LIVE_ASIA\n  title : LIVE_ASIA\n  live : 1\n  form_type : Live Asia\n  poster: \'http://www.bloomberg.com/image/iUFlwtQzdxWE.jpg\'\n  player_type : standard\n  streams :\n  - url : "http://cdn3.videos.bloomberg.com/btv/asia/master.m3u8"\n    type : "application/x-mpegURL"\n  - url : "http://blivehd-lh.akamaihd.net/z/asia_1@143161/manifest.f4m?hdcore=1"\n    type : "video/mp4"\n\nEU :\n  id : LIVE_EU\n  title : LIVE_EU\n  live : 1\n  form_type : Live Europe\n  poster: \'http://www.bloomberg.com/image/iUFlwtQzdxWE.jpg\'\n  player_type : standard\n  streams :\n  - url : "http://cdn3.videos.bloomberg.com/btv/eu/master.m3u8"\n    type : "application/x-mpegURL"\n  - url : "http://blivehd-lh.akamaihd.net/z/uk_1@143162/manifest.f4m?hdcore=1"\n    type : "video/mp4"\n\nEVENT :\n  id : LIVE_EVENT\n  title : LIVE_EVENT\n  live : 1\n  form_type : Live Event\n  poster: \'http://www.bloomberg.com/image/iUFlwtQzdxWE.jpg\'\n  player_type : standard\n  streams :\n  - url : "http://cdn3.videos.bloomberg.com/btv/event/master.m3u8"\n    type : "application/x-mpegURL"\n  - url : "http://blivehd-lh.akamaihd.net/z/event_1@143160/manifest.f4m?hdcore=1"\n    type : "video/mp4"\n\nEMEA_EVENT :\n  id : LIVE_EMEA_EVENT\n  title : LIVE_EMEA_EVENT\n  live : 1\n  form_type : Live EMEA Event\n  poster: \'http://www.bloomberg.com/image/iUFlwtQzdxWE.jpg\'\n  player_type : standard\n  streams :\n  - url : "http://bloomberghdsemea-lh.akamaihd.net/z/poliveEU_1@304670/manifest.f4m?hdcore=1"\n    type : "video/mp4"\n\nUS_MINI :\n  id : LIVE_US_MINI\n  title : LIVE_US_MINI\n  live : 1\n  form_type : Live US Mini\n  player_type : mini\n  poster: \'http://www.bloomberg.com/image/iUFlwtQzdxWE.jpg\'\n  streams :\n  - url : "http://cdn3.videos.bloomberg.com/btv/us/master.m3u8"\n    type : "application/x-mpegURL"\n  - url : "http://blive_us-lh.akamaihd.net/z/us_1@141015/manifest.f4m?hdcore=1"\n    type : "video/mp4"\n\nASIA_MINI :\n  id : LIVE_ASIA_MINI\n  title : LIVE_ASIA_MINI\n  live : 1\n  form_type : Live Asia Mini\n  poster: \'http://www.bloomberg.com/image/iUFlwtQzdxWE.jpg\'\n  player_type : mini\n  streams :\n    - url : "http://cdn3.videos.bloomberg.com/btv/asia/master.m3u8"\n      type : "application/x-mpegURL"\n    - url : "http://blive_asia-lh.akamaihd.net/z/asia2_1@186253/manifest.f4m?hdcore=1"\n      type : "video/mp4"\n\nEU_MINI :\n  id : LIVE_EU_MINI\n  title : LIVE_EU_MINI\n  live : 1\n  form_type : Live Europe Mini\n  poster: \'http://www.bloomberg.com/image/iUFlwtQzdxWE.jpg\'\n  player_type : mini\n  streams :\n  - url : "http://cdn3.videos.bloomberg.com/btv/eu/master.m3u8"\n    type : "application/x-mpegURL"\n  - url : "http://blive_eu-lh.akamaihd.net/z/uk2_1@186252/manifest.f4m?hdcore=1"\n    type : "video/mp4"\n\nRADIO :\n  id : LIVE_RADIO\n  title : LIVE_RADIO\n  live : 1\n  form_type : Live Radio\n  poster: \'http://www.bloomberg.com/image/iUFlwtQzdxWE.jpg\'\n  player_type : radio\n  streams :\n  - url : "http://provisioning.streamtheworld.com/pls/WBBRAMAAC.pls"\n    type : "audio/x-scpls"\n  - url : "http://blivehd-lh.akamaihd.net/z/radio_1@143157/manifest.f4m?hdcore=1"\n    type : "video/mp4"\n\nPOLITICS :\n  id : LIVE_POLITICS\n  title : LIVE_POLITICS\n  live : 1\n  form_type : Live Politics\n  poster: \'http://www.bloomberg.com/image/iUFlwtQzdxWE.jpg\'\n  player_type : standard\n  streams :\n  - url : "http://cdn3.videos.bloomberg.com/btv/politics/master.m3u8"\n    type : "application/x-mpegURL"\n  - url : "http://bloomberghds-lh.akamaihd.net/z/polive1_1@25840/manifest.f4m?hdcore=1"\n    type : "video/mp4"\n'),
            l = function(a) {
                this.config = a, this.version, this.userOptions, this.bmmrAsset, this.options, this.liveId, this.dataSetup, this._init()
            };
        l.prototype._init = function() {
            if (!this.config.version) throw new Error("Invalid version passed");
            if (this.version = this.config.version, this.userOptions = this.config.userOptions, this.userOptions.live && 1 == this.userOptions.live) {
                if (this.userOptions.live = !0, !this.config.liveId) throw new Error("liveId not passed");
                this.liveId = this.config.liveId
            } else this.bmmrAsset = this._generateBmmrAsset();
            this.options = this._generateOptions(), this.dataSetup = this._generateDataSetupWithStreams()
        }, l.prototype._generateBmmrAsset = function() {
            return this.config.bmmrAsset instanceof c ? this.config.bmmrAsset : new c(this.config.bmmrAsset)
        }, l.prototype._generateOptions = function() {
            return d.mergeAndMap(i, this.userOptions, this.getMappings())
        }, l.prototype._setProjectorAssetCaptionsVod = function(a) {
            var b = this.bmmrAsset.getCaptions();
            if (b) {
                for (var c = [], d = 0; d < b.length; ++d) c.push({
                    url: b[d].getUrl()
                });
                a.metadata.captions = c
            }
        }, l.prototype._setProjectorAssetStreamsVod = function(a) {
            for (var b = this.bmmrAsset.getStreams(), c = [], d = 0; d < b.length; ++d) {
                var e = b[d],
                    f = e.getMuxingFormat();
                ("MP4" === f || "TS" === f) && c.push({
                    url: e.getUrl(),
                    type: "video/mp4",
                    bitrate: e.getVideoBitrate(),
                    percent: e.getPercent()
                })
            }
            a.streams = c
        }, l.prototype._setProjectorAssetNiCodesVod = function(a) {
            for (var b = this.bmmrAsset.getNiCodes(), c = [], d = 0; d < b.length; ++d) c.push(b[d].code);
            a.metadata.ni_codes = c
        }, l.prototype._setProjectorAssetImagesVod = function(a) {
            var b = this.bmmrAsset.getImages();
            if (b) {
                var c = this.options.width || 9999,
                    d = this.options.height || 9999,
                    e = this.bmmrAsset.closestImage(c, d);
                e && this._addMappedOption(a, "poster", e)
            }
        }, l.prototype._generateProjectorAssetWithStreamsVod = function() {
            var a = {};
            return a.metadata = {
                version: this.version,
                id: this.bmmrAsset.getId(),
                title: this.bmmrAsset.getTitle(),
                duration: "" + this.bmmrAsset.getDuration(),
                createdate: this.bmmrAsset.getCreateDate(),
                show_name: (this.bmmrAsset.getShowName() || "").replace(/[']/g, "&apos;"),
                form_type: this.bmmrAsset.getComscoreMetadata().getNsStTy(),
                c5: this.bmmrAsset.getComscoreMetadata().getC5(),
                bb_pub_d: this.bmmrAsset.getComscoreMetadata().getBbPubD()
            }, this._setProjectorAssetCaptionsVod(a), this._setProjectorAssetStreamsVod(a), this._setProjectorAssetNiCodesVod(a), this._setProjectorAssetImagesVod(a), a
        }, l.prototype._generateProjectorAssetWithStreamsLive = function() {
            var a = {};
            return a.metadata = k[this.liveId], a.streams = k[this.liveId].streams, a.player_type = k[this.liveId].player_type, this._addMappedOption(a, "poster", k[this.liveId].poster), a
        }, l.prototype._generateProjectorAssetWithStreams = function() {
            return this.userOptions.live && 1 == this.userOptions.live ? this._generateProjectorAssetWithStreamsLive() : this._generateProjectorAssetWithStreamsVod()
        }, l.prototype._generateDataSetupWithStreams = function() {
            var a = this._generateProjectorAssetWithStreams();
            return this._addMappedOption(a, "swf", this._getSwfUrl()), this._addMappedOption(a, "ui_skin_url", this._getSkinUrl()), this._addMappedOption(a, "buffering_animation", this._getBufferingAnimationUrl()), d.deepMerge(this.options, a)
        }, l.prototype._addMappedOption = function(a, b, c) {
            this.getMappings()[b] && !this.userOptions[b] && d.replaceWithMappings(a, c, this.getMappings()[b])
        }, l.prototype._getProtocol = function() {
            var a = "asset_protocol";
            return this.userOptions[a] || i[a]
        }, l.prototype._getSwfUrl = function() {
            return this._getCdnUrl(f)
        }, l.prototype._getSkinUrl = function() {
            return this._getCdnUrl(g)
        }, l.prototype._getBufferingAnimationUrl = function() {
            return this._getCdnUrl(h)
        }, l.prototype.getOptions = function() {
            return this.options
        }, l.prototype._getCdnUrl = function(a) {
            return this._getProtocol() + "://cdn.gotraffic.net/projector/" + this.version + "/" + a
        }, l.prototype.getMappings = function() {
            return j
        }, l.prototype.getDataSetup = function() {
            return this.dataSetup
        }, l._getMappedDefaultOptions = function() {
            return d.mergeAndMap({}, i, j)
        }, l._getDefaultOptions = function() {
            return i
        }, l._getSwfFileName = function() {
            return f
        }, l._getSkinFileName = function() {
            return g
        }, l._getBufferingAnimationFileName = function() {
            return h
        }, l.mergeUtils = d, b.exports = l
    }, {
        "./merge-utils": 40,
        "bmmr-asset-js": 5,
        "js-yaml": 9
    }],
    42: [function(a, b) {
        function c(a, b) {
            Array.isArray(b) || (b = [b]), b.forEach(function(b) {
                a.hasOwnProperty("classList") && a.classList.hasOwnProperty("add") ? a.classList.add(b) : a.className += " " + b
            })
        }
        var d = function(a) {
            this.config = a, this.settings, this.options, this.version, this.playerId, this._init()
        };
        d.prototype._init = function() {
            if (!this.config) throw new Error("Config required");
            if (!this.config.settings) throw new Error("Config must contain a ProjectorSettings instance");
            if (this.settings = this.config.settings, this.options = this.settings.userOptions, this.version = this.settings.version, this.playerId = this.settings.getDataSetup().htmlChildId, !this.version) throw new Error("Version required")
        }, d.prototype.generateVideoTag = function() {
            var a = document.createElement("video");
            a.setAttribute("id", this.playerId), c(a, ["video-js", "vjs-default-skin"]);
            var b = this.settings.getDataSetup(),
                d = b.auto_setup,
                e = b.streams,
                f = b.poster,
                g = b.limitHtmlPlayerTo;
            return delete b.auto_setup, delete b.streams, delete b.poster, a.setAttribute("data-setup", JSON.stringify(b)), b.width && a.setAttribute("width", b.width), b.height && a.setAttribute("height", b.height), f && a.setAttribute("poster", f), g && a.setAttribute("style", "visibility: hidden;"), d && a.setAttribute("auto-setup", d), this._sortStreamsByBitrate(e), this._addSourceTagsToVideoTag(a, e), a
        }, d.prototype._sortStreamsByBitrate = function(a) {
            for (var b = 0; b < a.length; ++b)
                if (!a[b].bitrate) return;
            a.sort(function(a, b) {
                var c = a.bitrate,
                    d = b.bitrate;
                return d > c ? -1 : c > d ? 1 : 0
            })
        }, d.prototype._addSourceTagsToVideoTag = function(a, b) {
            for (var c = 0; c < b.length; ++c) {
                var d = b[c],
                    e = document.createElement("source");
                e.setAttribute("src", d.url), e.setAttribute("type", d.type), e.setAttribute("data-bitrate", d.bitrate), d.percent && e.setAttribute("data-percent", d.percent), a.appendChild(e)
            }
        }, d.prototype.createVideoNotFoundDiv = function() {
            var a = document.createElement("div");
            return a.setAttribute("id", this.playerId), this.options.width && a.setAttribute("width", this.options.width), this.options.height && a.setAttribute("height", this.options.height), a.innerHTML = "Video not found", a
        }, b.exports = d
    }, {}],
    43: [function(a, b) {
        var c = b.exports = function(a) {
            this.player_ = a, this.videoState_ = c.VideoState.UNPLAYED, this.viewStartTime_ = void 0, this.videoStartTime_ = void 0, this.videoPlayed_ = !1, this.prerollPlayed_ = !1, this.player_.el_ && this.subscribeEvents_()
        };
        c.ContentType = {
            AD: "ad",
            CONTENT: "ct"
        }, c.AdPosition = {
            PREROLL: "a1",
            MIDROLL: "a2",
            POSTROLL: "a3",
            OVERLAY: "a4",
            SPECIAL: "a5"
        }, c.VideoState = {
            UNPLAYED: "s1",
            PLAYED: "s2",
            STOPPED: "s3",
            COMPLETED: "s4"
        }, c.prototype.subscribeEvents_ = function() {
            var a = this;
            this.player_.on("play", function(b) {
                a.onPlay_(b)
            }), this.player_.on("pause", function(b) {
                a.onPause_(b)
            }), this.player_.on("ended", function(b) {
                a.onEnded_(b)
            }), this.player_.on("videostart", function(b) {
                a.onVideoStart_(b)
            }), this.player_.on("clip", function(b) {
                a.onClip_(b)
            })
        }, c.prototype.onClip_ = function(a) {
            this.contentType_ = this.getContentType_(a.data.clip.type), a.data.clip.ad ? (this.adPosition_ = this.getAdPosition_(a.data.clip.type), this.prerollPlayed_ || this.adPosition_ !== c.AdPosition.PREROLL || (this.prerollPlayed_ = !0)) : this.adPosition_ = void 0
        }, c.prototype.getContentType_ = function(a) {
            switch (a) {
                case "ad-preroll":
                case "ad-midroll":
                    return c.ContentType.AD;
                case "live":
                case "vod":
                    return c.ContentType.CONTENT
            }
            return null
        }, c.prototype.getAdPosition_ = function(a) {
            switch (a) {
                case "ad-preroll":
                    return c.AdPosition.PREROLL;
                case "ad-midroll":
                    return c.AdPosition.MIDROLL
            }
            return null
        }, c.prototype.onPlay_ = function() {
            this.videoState_ = c.VideoState.PLAYED, void 0 === this.viewStartTime_ && (this.viewStartTime_ = (new Date).getTime()), this.videoPlayed_ || (this.videoPlayed_ = !0)
        }, c.prototype.onVideoStart_ = function() {
            this.videoStartTime_ = (new Date).getTime()
        }, c.prototype.onEnded_ = function() {
            this.videoState_ = c.VideoState.COMPLETED
        }, c.prototype.onPause_ = function() {
            this.videoState_ = c.VideoState.STOPPED
        }, c.prototype.getMetadata_ = function() {
            var a = this.player_.options();
            return a.hasOwnProperty("metadata") ? a.metadata : void 0
        }, c.prototype.isReady = function() {
            return void 0 !== this.getTitle()
        }, c.prototype.getTitle = function() {
            var a = this.getMetadata_();
            return a && a.hasOwnProperty("title") ? unescape(a.title) : void 0
        }, c.prototype.getVideoPath = function() {
            var a = this.getMetadata_();
            return a && a.hasOwnProperty("id") ? a.id : void 0
        }, c.prototype.getContentType = function() {
            return this.contentType_
        }, c.prototype.getAdPosition = function() {
            return this.adPosition_
        }, c.prototype.getTotalDuration = function() {
            var a = this.getMetadata_();
            return a && a.hasOwnProperty("live") && a.live ? void 0 : 1e3 * this.player_.duration()
        }, c.prototype.getState = function() {
            return this.videoState_
        }, c.prototype.getCurrentPlayTime = function() {
            return this.player_.currentTime()
        }, c.prototype.getBitrate = function() {
            try {
                return this.player_.bitrate()
            } catch (a) {
                return -1
            }
        }, c.prototype.getThumbnailPath = function() {
            return this.player_.poster()
        }, c.prototype.getPlayerType = function() {
            return this.player_.techName
        }, c.prototype.getViewStartTime = function() {
            return isNaN(this.viewStartTime_) ? 0 : (new Date).getTime() - this.viewStartTime_
        }, c.prototype.getViewPlayTime = function() {
            return this.videoPlayed_ ? (new Date).getTime() - this.viewStartTime_ : -1
        }, c.prototype.getViewAdPlayTime = function() {
            return this.videoPlayed_ && this.prerollPlayed_ ? (new Date).getTime() - this.viewStartTime_ : -1
        }, c.verify = function(a) {
            return "function" == typeof a.chartbeatPlugin ? !0 : !1
        }
    }, {}],
    44: [function(a) {
        function b(b, c) {
            function d() {
                var d = ((new Date).getTime(), {});
                d.uid = b.uid, d.domain = b.domain, d.videodomain = b.videodomain ? b.videodomain : b.domain, d.autoDetect = "false", window._sf_async_config = d, window._sf_endpt = (new Date).getTime(), window._cbv_strategies = window._cbv_strategies || [], window._cbv_strategies.push(a("./bvp-strategy"));
                var e = window._cbv || (window._cbv = []);
                e.push(a("video")(c.id));
                var f = document.createElement("script");
                f.setAttribute("language", "javascript"), f.setAttribute("type", "text/javascript"), f.setAttribute("src", "//static.chartbeat.com/js/chartbeat_video.js"), document.body.appendChild(f)
            }
            if (c.use_chartbeat && b.uid && b.domain) {
                d()
            }
        }
        videojs.plugin("chartbeatPlugin", b)
    }, {
        "./bvp-strategy": 43,
        video: "video"
    }],
    45: [function() {
        ! function() {
            function a(a) {
                function b(a, b) {
                    var d = {
                        content_id: b.id,
                        clip: {
                            content_id: b.id
                        },
                        type: b.formType,
                        duration: a.duration,
                        metadata: {
                            title: b.title,
                            formType: b.formType,
                            live: b.isLive
                        }
                    };
                    a.onplay = function() {
                        c.trigger("clip", d)
                    }
                }
                if (a.enabled) {
                    var c = this;
                    c.plugins = this.plugins || {}, c.plugins.childVideoPlugin = {}, c.plugins.childVideoPlugin.addChildVideo = b
                }
            }
            videojs.plugin("childVideoPlugin", a)
        }()
    }, {}],
    46: [function() {
        function a(a, b) {
            var c, d, e, f, g, h = "comScore=",
                i = document,
                j = i.cookie,
                k = "",
                l = "indexOf",
                m = "substring",
                n = "length",
                o = 2048,
                p = "&ns_",
                q = "&",
                r = window,
                s = r.encodeURIComponent || escape;
            if (j[l](h) + 1)
                for (f = 0, e = j.split(";"), g = e[n]; g > f; f++) d = e[f][l](h), d + 1 && (k = q + unescape(e[f][m](d + h[n])));
            a += p + "_t=" + +new Date + p + "c=" + (i.characterSet || i.defaultCharset || "") + "&c8=" + s(i.title) + k + "&c7=" + s(i.URL) + "&c9=" + s(i.referrer), a[n] > o && a[l](q) > 0 && (c = a[m](0, o - 8).lastIndexOf(q), a = (a[m](0, c) + p + "cut=" + s(a[m](c + 1)))[m](0, o)), i.images ? (d = new Image, r.ns_p || (ns_p = d), "function" == typeof b && (d.onload = d.onerror = b), d.src = a) : i.write("<", "p", "><", 'img src="', a, '" height="1" width="1" alt="*"', "><", "/p", ">")
        }
        "undefined" == typeof _comscore && (_comscore = []),
            function() {
                var b, c = "length",
                    d = self,
                    e = d.encodeURIComponent ? encodeURIComponent : escape,
                    f = ".scorecardresearch.com",
                    g = "//app" + f + "/s2e/invite",
                    h = Math,
                    i = "script",
                    j = "width",
                    k = /c2=(\d*)&/,
                    l = function(b) {
                        if (b) {
                            var d, g, h, i, j = [],
                                k = 0,
                                l = "";
                            for (var m in b) g = typeof b[m], ("string" == g || "number" == g) && (j[j[c]] = m + "=" + e(b[m]), "c2" == m ? l = b[m] : "c1" == m && (k = 1));
                            if (j[c] <= 0 || "" == l) return;
                            if (i = b.options || {}, i.d = i.d || document, "string" == typeof i.url_append) {
                                h = i.url_append.replace(/&amp;/, "&").split("&");
                                for (var o, m = 0, p = h[c]; p > m; m++) o = h[m].split("="), 2 == o[c] && (j[j[c]] = o[0] + "=" + e(o[1]))
                            }
                            d = ["http", "s" == i.d.URL.charAt(4) ? "s://sb" : "://b", f, "/b?", k ? "" : "c1=2&", j.join("&").replace(/&$/, "")], a(d.join(""), function() {
                                n(this, i)
                            })
                        }
                    },
                    m = function(a) {
                        a = a || _comscore;
                        for (var b = 0, d = a[c]; d > b; b++) l(a[b]);
                        a = _comscore = []
                    },
                    n = function(a, b) {
                        if (!(a.src.indexOf("c1=2") < 0) && b.d.createElement && (b.force_script_extension || 2 == a[j] && a.height > h.round(100 * h.random()))) {
                            var c = b.d.createElement(i),
                                d = b.d.getElementsByTagName(i)[0],
                                e = [b.script_extension_url || g, "?", "c2=", a.src.match(k)[1]].join("");
                            d && (c.src = e, c.async = !0, d.parentNode.insertBefore(c, d))
                        }
                    };
                m(), (b = d.COMSCORE) ? (b.purge = m, b.beacon = l) : COMSCORE = {
                    purge: m,
                    beacon: l
                }
            }()
    }, {}],
    47: [function(a) {
        function b(a, b) {
            function c(a) {
                var b = {};
                for (var c in e) b[c] = e[c];
                return 0 == a.type.indexOf("ad-") ? b.c5 = "ad-preroll" === a.type ? "09" : "10" : a.metadata.live ? (b.c6 = "live", b.c5 = "03") : b.c5 = a.metadata.c5 ? a.metadata.c5 : "02", b
            }

            function d(a, b) {
                var c = {
                    c1: 1,
                    c2: "3005059",
                    c3: a.c3,
                    c4: "BBG",
                    c5: "",
                    c6: "",
                    c10: ""
                };
                return "mini" == b.player_type && (c.c2 = "6961552"), 1 == b.metadata.live && (c.c6 = "live"), c
            }
            if (b.use_comscore) {
                var e = d(a, b),
                    f = null;
                this.on("clip", function(a) {
                    f = c(a.data)
                }), this.on("play", function() {
                    null != f && (COMSCORE.beacon(f), f = null)
                })
            }
        }
        a("./beacon"), videojs.plugin("comscoreMatrixPlugin", b)
    }, {
        "./beacon": 46
    }],
    48: [function(a, b) {
        var c = c || {};
        c.StreamSense = c.StreamSense || function() {
            function a(a, b) {
                var c = a || "",
                    e = "undefined",
                    f = l.comScore || l.sitestat || function(a) {
                        var b, c, f, g, h, i = "comScore=",
                            k = m.cookie,
                            n = "",
                            o = "indexOf",
                            p = "substring",
                            q = "length",
                            s = d.browserAcceptsLargeURLs() ? r.URL_LENGTH_LIMIT : r.RESTRICTED_URL_LENGTH_LIMIT,
                            t = "&ns_",
                            u = "&",
                            v = l.encodeURIComponent || escape;
                        if (k[o](i) + 1)
                            for (g = 0, f = k.split(";"), h = f[q]; h > g; g++) c = f[g][o](i), c + 1 && (n = u + unescape(f[g][p](c + i[q])));
                        a += t + "_t=" + +new Date + t + "c=" + (m.characterSet || m.defaultCharset || "") + n, a.length > s && a.indexOf(u) > 0 && (b = a.substr(0, s - 8).lastIndexOf(u), a = (a.substring(0, b) + t + "cut=" + v(a.substring(b + 1))).substr(0, s)), j.httpGet(a), typeof ns_p === e && (ns_p = {
                            src: a
                        }), ns_p.lastMeasurement = a
                    };
                if (typeof b !== e) {
                    var g = [],
                        h = l.encodeURIComponent || escape;
                    for (var i in b) b.hasOwnProperty(i) && g.push(h(i) + "=" + h(b[i]));
                    /[\?\&]$/.test(c) || (c += "&"), c += g.join("&")
                }
                return f(c)
            }

            function b(a, b) {
                for (var c, e = l.encodeURIComponent || escape, f = [], g = r.LABELS_ORDER, h = a.split("?"), i = h[0], j = h[1], k = j.split("&"), n = 0, o = k.length; o > n; n++) {
                    var p = k[n].split("="),
                        q = unescape(p[0]),
                        s = unescape(p[1]);
                    q && (b[q] = s)
                }
                for (var t = {}, n = 0, o = g.length; o > n; n++) {
                    var u = g[n];
                    if (b.hasOwnProperty(u)) {
                        var v = b[u];
                        "undefined" != typeof v && null != v && (t[u] = !0, f.push(e(u) + "=" + e(b[u])))
                    }
                }
                for (var u in b)
                    if (!t[u] && b.hasOwnProperty(u)) {
                        var v = b[u];
                        "undefined" != typeof v && null != v && f.push(e(u) + "=" + e(b[u]))
                    }
                c = i + "?" + f.join("&"), c = c + (c.indexOf("&c8=") < 0 ? "&c8=" + e(m.title) : "") + (c.indexOf("&c7=") < 0 ? "&c7=" + e(m.URL) : "") + (c.indexOf("&c9=") < 0 ? "&c9=" + e(m.referrer) : "");
                var w = d.browserAcceptsLargeURLs() ? r.URL_LENGTH_LIMIT : r.RESTRICTED_URL_LENGTH_LIMIT;
                if (c.length > w && c.indexOf("&") > 0) {
                    var x = c.substr(0, w - 8).lastIndexOf("&");
                    c = (c.substring(0, x) + "&ns_cut=" + e(c.substring(x + 1))).substr(0, w)
                }
                return c
            }
            var d = function() {
                    var a = {
                        uid: function() {
                            var a = 1;
                            return function() {
                                return +new Date + "_" + a++
                            }
                        }(),
                        filter: function(a, b) {
                            var c = {};
                            for (var d in b) b.hasOwnProperty(d) && a(b[d]) && (c[d] = b[d]);
                            return c
                        },
                        extend: function(a) {
                            var b, c = arguments.length;
                            a = a || {};
                            for (var d = 1; c > d; d++)
                                if (b = arguments[d])
                                    for (var e in b) b.hasOwnProperty(e) && (a[e] = b[e]);
                            return a
                        },
                        getString: function(a, b) {
                            var c = String(a);
                            return null == a ? b || "na" : c
                        },
                        getLong: function(a, b) {
                            var c = Number(a);
                            return null == a || isNaN(c) ? b || 0 : c
                        },
                        getInteger: function(a, b) {
                            var c = Number(a);
                            return null == a || isNaN(c) ? b || 0 : c
                        },
                        getBoolean: function(a, b) {
                            var c = "true" == String(a).toLowerCase();
                            return null == a ? b || !1 : c
                        },
                        isNotEmpty: function(a) {
                            return "undefined" != typeof a && null != a && "undefined" != typeof a.length && a.length > 0
                        },
                        indexOf: function(b, c) {
                            var d = -1;
                            return a.forEach(c, function(a, c) {
                                a == b && (d = c)
                            }), d
                        },
                        forEach: function(a, b, c) {
                            try {
                                if ("function" == typeof b)
                                    if (c = "undefined" != typeof c ? c : null, "number" != typeof a.length || "undefined" == typeof a[0]) {
                                        var d = "undefined" != typeof a.__proto__;
                                        for (var e in a)(!d || d && "undefined" == typeof a.__proto__[e]) && "function" != typeof a[e] && b.call(c, a[e], e)
                                    } else
                                        for (var e = 0, f = a.length; f > e; e++) b.call(c, a[e], e)
                            } catch (g) {}
                        },
                        regionMatches: function(a, b, c, d, e) {
                            if (0 > b || 0 > d || b + e > a.length || d + e > c.length) return !1;
                            for (; --e >= 0;) {
                                var f = a.charAt(b++),
                                    g = c.charAt(d++);
                                if (f != g) return !1
                            }
                            return !0
                        },
                        size: function(a) {
                            var b, c = 0;
                            for (var b in a) a.hasOwnProperty(b) && c++;
                            return c
                        },
                        log: function(a, b) {
                            if ("undefined" != typeof b && b) {
                                var c = new Date,
                                    d = c.getHours() + ":" + c.getMinutes() + ":" + c.getSeconds();
                                console.log(d, a)
                            }
                        },
                        isTrue: function(a) {
                            return "undefined" == typeof a ? !1 : "string" == typeof a ? (a = a.toLowerCase(), "true" === a || "1" === a || "on" === a) : a ? !0 : !1
                        },
                        toString: function(b) {
                            if ("undefined" == typeof b) return "undefined";
                            if ("string" == typeof b) return b;
                            if ("[object Array]" === Object.prototype.toString.call(b)) return b.join(",");
                            if (a.size(b) > 0) {
                                var c = "";
                                for (var d in b) b.hasOwnProperty(d) && (c += d + ":" + b[d] + ";");
                                return c
                            }
                            return b.toString()
                        },
                        exists: function(a) {
                            return "undefined" != typeof a && null != a
                        },
                        firstGreaterThan0: function() {
                            for (var a = 0, b = arguments.length; b > a; a++) {
                                var c = arguments[a];
                                if (c > 0) return c
                            }
                            return 0
                        },
                        cloneObject: function(a) {
                            if (null == a || "object" != typeof a) return a;
                            var b = a.constructor();
                            for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                            return b
                        },
                        safeGet: function(b, c) {
                            return c = a.exists(c) ? c : "", a.exists(b) ? b : c
                        },
                        getBrowserName: function() {
                            var a, b, c = navigator.userAgent,
                                d = navigator.appName;
                            return -1 != (b = c.indexOf("Opera")) || -1 != (b = c.indexOf("OPR/")) ? d = "Opera" : -1 != (b = c.indexOf("Android")) ? d = "Android" : -1 != (b = c.indexOf("Chrome")) ? d = "Chrome" : -1 != (b = c.indexOf("Safari")) ? d = "Safari" : -1 != (b = c.indexOf("Firefox")) ? d = "Firefox" : -1 != (b = c.indexOf("IEMobile")) ? d = "Internet Explorer Mobile" : "Microsoft Internet Explorer" == d || "Netscape" == d ? d = "Internet Explorer" : (a = c.lastIndexOf(" ") + 1) < (b = c.lastIndexOf("/")) && (d = c.substring(a, b), d.toLowerCase() == d.toUpperCase() && (d = navigator.appName)), d
                        },
                        getBrowserFullVersion: function() {
                            var a, b, c, d, e, f = navigator.userAgent,
                                g = navigator.appName,
                                h = "" + parseFloat(navigator.appVersion);
                            return -1 != (c = f.indexOf("Opera")) ? (h = f.substring(c + 6), -1 != (c = f.indexOf("Version")) && (h = f.substring(c + 8))) : -1 != (c = f.indexOf("OPR/")) ? h = f.substring(c + 4) : -1 != (c = f.indexOf("Android")) ? h = f.substring(c + 11) : -1 != (c = f.indexOf("Chrome")) ? h = f.substring(c + 7) : -1 != (c = f.indexOf("Safari")) ? (h = f.substring(c + 7), -1 != (c = f.indexOf("Version")) && (h = f.substring(c + 8))) : -1 != (c = f.indexOf("Firefox")) ? h = f.substring(c + 8) : "Microsoft Internet Explorer" == g ? (e = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})"), null != e.exec(f) && (h = parseFloat(RegExp.$1))) : "Netscape" == g ? (e = new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})"), null != e.exec(f) && (h = parseFloat(RegExp.$1))) : (b = f.lastIndexOf(" ") + 1) < (c = f.lastIndexOf("/")) && (h = f.substring(c + 1)), h = h.toString(), -1 != (d = h.indexOf(";")) && (h = h.substring(0, d)), -1 != (d = h.indexOf(" ")) && (h = h.substring(0, d)), -1 != (d = h.indexOf(")")) && (h = h.substring(0, d)), a = parseInt("" + h, 10), isNaN(a) && (h = "" + parseFloat(navigator.appVersion)), h
                        },
                        browserAcceptsLargeURLs: function() {
                            return null === window.ActiveXObject || !0
                        }
                    };
                    return a
                }(),
                e = function() {
                    var a = "cs_",
                        b = function() {
                            var b = "undefined" != typeof localStorage ? localStorage : {};
                            d.extend(this, {
                                get: function(c) {
                                    return b[a + c]
                                },
                                set: function(c, d) {
                                    b[a + c] = d
                                },
                                has: function(c) {
                                    return a + c in b
                                },
                                remove: function(c) {
                                    delete b[a + c]
                                },
                                clear: function() {
                                    for (var a in b) b.hasOwnProperty(a) && delete b[a]
                                }
                            })
                        };
                    return b
                }(),
                f = function(a, b) {
                    var c = new Image;
                    c.onload = function() {
                        b && b(200)
                    }, c.onerror = function() {
                        b && b()
                    }, c.src = a
                },
                g = function(a, b, c) {
                    c && setTimeout(c, 0)
                },
                h = function() {
                    return {
                        dir: function() {
                            return null
                        },
                        append: function() {},
                        write: function() {},
                        deleteFile: function() {
                            return !1
                        },
                        read: function() {
                            return null
                        }
                    }
                }(),
                i = function(a, b) {
                    "undefined" != typeof engine && b && setTimeout(b, 0);
                    var c = engine.createHttpClient(),
                        d = c.createRequest("GET", a, null);
                    d.start(), b && setTimeout(b, 0)
                },
                j = function() {
                    var a = {
                        PLATFORM: "generic",
                        httpGet: f,
                        httpPost: g,
                        Storage: e,
                        IO: h,
                        getCrossPublisherId: function() {
                            return null
                        },
                        getAppName: function() {
                            return Constants.UNKNOWN_VALUE
                        },
                        getAppVersion: function() {
                            return Constants.UNKNOWN_VALUE
                        },
                        getVisitorId: function() {
                            return this.getDeviceName() + +new Date + ~~(1e3 * Math.random())
                        },
                        getVisitorIdSuffix: function() {
                            return "72"
                        },
                        getDeviceName: function() {
                            return ""
                        },
                        getPlatformVersion: function() {
                            return ""
                        },
                        getPlatformName: function() {
                            return "js"
                        },
                        getRuntimeName: function() {
                            return ""
                        },
                        getRuntimeVersion: function() {
                            return ""
                        },
                        getResolution: function() {
                            return ""
                        },
                        getLanguage: function() {
                            return ""
                        },
                        getPackageName: function() {
                            return ""
                        },
                        isConnectionAvailable: function() {
                            return !0
                        },
                        isCompatible: function() {
                            return !0
                        },
                        autoSelect: function() {},
                        isCrossPublisherIdChanged: function() {
                            return !1
                        }
                    };
                    return a
                }(),
                k = function() {
                    function a() {
                        return "undefined" != typeof engine && "undefined" != typeof engine.stats
                    }

                    function b() {
                        return d.isNotEmpty(engine.stats.device.id) ? engine.stats.device.id : d.isNotEmpty(engine.stats.network.mac) ? engine.stats.network.mac : null
                    }

                    function c() {
                        if (null == f) {
                            var a = b();
                            null != a ? (f = a, j = "31", k = a) : (f = +new Date + ~~(1e3 * Math.random()), j = "72", k = null)
                        }
                    }
                    var f = null,
                        j = null,
                        k = null;
                    return {
                        PLATFORM: "trilithium",
                        httpGet: i,
                        httpPost: g,
                        Storage: e,
                        IO: h,
                        getCrossPublisherId: function() {
                            return c(), k
                        },
                        getAppName: function() {
                            return d.isNotEmpty(engine.stats.application.name) ? engine.stats.application.name : Constants.UNKNOWN_VALUE
                        },
                        getAppVersion: function() {
                            return d.isNotEmpty(engine.stats.application.version) ? engine.stats.application.version : Constants.UNKNOWN_VALUE
                        },
                        getVisitorId: function() {
                            return c(), f
                        },
                        getVisitorIdSuffix: function() {
                            return j
                        },
                        getDeviceName: function() {
                            return d.safeGet(engine.stats.device.platform, "")
                        },
                        getPlatformVersion: function() {
                            return d.safeGet(engine.stats.device.version, "")
                        },
                        getPlatformName: function() {
                            return "js"
                        },
                        getRuntimeName: function() {
                            return "trilithium"
                        },
                        getRuntimeVersion: function() {
                            return ""
                        },
                        getResolution: function() {
                            return "undefined" != typeof screen && "undefined" != typeof screen.height && "undefined" != typeof screen.width ? screen.height + "x" + screen.width : ""
                        },
                        getLanguage: function() {
                            return ""
                        },
                        getPackageName: function() {
                            return ""
                        },
                        isConnectionAvailable: function() {
                            return !0
                        },
                        isCompatible: a
                    }
                }();
            j.autoSelect = function() {
                k.isCompatible() && d.extend(j, k)
            };
            var l, m, n = "undefined" != typeof window && "undefined" != typeof document;
            n ? (l = window, m = document) : (l = {}, m = {
                location: {
                    href: ""
                },
                title: "",
                URL: "",
                referrer: "",
                cookie: ""
            });
            var d = d || {};
            d.filterMap = function(a, b) {
                for (var c in a) - 1 == d.indexOf(c, b) && delete a[c]
            }, d.getKeys = function(a, b) {
                var c, d = [];
                for (c in a)(!b || b.test(c)) && a.hasOwnProperty(c) && (d[d.length] = c);
                return d
            };
            var o = function() {
                    var a = ["play", "pause", "end", "buffer", "keep-alive", "hb", "custom", "ad_play", "ad_pause", "ad_end", "ad_click"];
                    return {
                        PLAY: 0,
                        PAUSE: 1,
                        END: 2,
                        BUFFER: 3,
                        KEEP_ALIVE: 4,
                        HEART_BEAT: 5,
                        CUSTOM: 6,
                        AD_PLAY: 7,
                        AD_PAUSE: 8,
                        AD_END: 9,
                        AD_CLICK: 10,
                        toString: function(b) {
                            return a[b]
                        }
                    }
                }(),
                p = function() {
                    var a = [o.END, o.PLAY, o.PAUSE, o.BUFFER];
                    return {
                        IDLE: 0,
                        PLAYING: 1,
                        PAUSED: 2,
                        BUFFERING: 3,
                        toEventType: function(b) {
                            return a[b]
                        }
                    }
                }(),
                q = {
                    ADPLAY: o.AD_PLAY,
                    ADPAUSE: o.AD_PAUSE,
                    ADEND: o.AD_END,
                    ADCLICK: o.AD_CLICK
                },
                r = {
                    STREAMSENSE_VERSION: "4.1412.05",
                    DEFAULT_PLAYERNAME: "streamsense",
                    DEFAULT_HEARTBEAT_INTERVAL: [{
                        playingtime: 6e4,
                        interval: 1e4
                    }, {
                        playingtime: null,
                        interval: 6e4
                    }],
                    DEFAULT_KEEP_ALIVE_INTERVAL: 12e5,
                    DEFAULT_PAUSED_ON_BUFFERING_INTERVAL: 500,
                    C1_VALUE: "19",
                    C10_VALUE: "js",
                    NS_AP_C12M_VALUE: "1",
                    NS_NC_VALUE: "1",
                    PAGE_NAME_LABEL: "name",
                    RESTRICTED_URL_LENGTH_LIMIT: 2048,
                    URL_LENGTH_LIMIT: 4096,
                    LABELS_ORDER: ["c1", "c2", "ca2", "cb2", "cc2", "cd2", "ns_site", "ca_ns_site", "cb_ns_site", "cc_ns_site", "cd_ns_site", "ns_vsite", "ca_ns_vsite", "cb_ns_vsite", "cc_ns_vsite", "cd_ns_vsite", "ns_ap_an", "ca_ns_ap_an", "cb_ns_ap_an", "cc_ns_ap_an", "cd_ns_ap_an", "ns_ap_pn", "ns_ap_pv", "c12", "ca12", "cb12", "cc12", "cd12", "ns_ak", "ns_ns_ap_hw", "name", "ns_ap_ni", "ns_ap_ec", "ns_ap_ev", "ns_ap_device", "ns_ap_id", "ns_ap_csf", "ns_ap_bi", "ns_ap_pfm", "ns_ap_pfv", "ns_ap_ver", "ca_ns_ap_ver", "cb_ns_ap_ver", "cc_ns_ap_ver", "cd_ns_ap_ver", "ns_ap_sv", "ns_ap_cv", "ns_type", "ca_ns_type", "cb_ns_type", "cc_ns_type", "cd_ns_type", "ns_radio", "ns_nc", "ns_ap_ui", "ca_ns_ap_ui", "cb_ns_ap_ui", "cc_ns_ap_ui", "cd_ns_ap_ui", "ns_ap_gs", "ns_st_sv", "ns_st_pv", "ns_st_it", "ns_st_id", "ns_st_ec", "ns_st_sp", "ns_st_sq", "ns_st_cn", "ns_st_ev", "ns_st_po", "ns_st_cl", "ns_st_el", "ns_st_pb", "ns_st_hc", "ns_st_mp", "ca_ns_st_mp", "cb_ns_st_mp", "cc_ns_st_mp", "cd_ns_st_mp", "ns_st_mv", "ca_ns_st_mv", "cb_ns_st_mv", "cc_ns_st_mv", "cd_ns_st_mv", "ns_st_pn", "ns_st_tp", "ns_st_pt", "ns_st_pa", "ns_st_ad", "ns_st_li", "ns_st_ci", "ns_ap_jb", "ns_ap_res", "ns_ap_c12m", "ns_ap_install", "ns_ap_updated", "ns_ap_lastrun", "ns_ap_cs", "ns_ap_runs", "ns_ap_usage", "ns_ap_fg", "ns_ap_ft", "ns_ap_dft", "ns_ap_bt", "ns_ap_dbt", "ns_ap_dit", "ns_ap_as", "ns_ap_das", "ns_ap_it", "ns_ap_uc", "ns_ap_aus", "ns_ap_daus", "ns_ap_us", "ns_ap_dus", "ns_ap_ut", "ns_ap_oc", "ns_ap_uxc", "ns_ap_uxs", "ns_ap_lang", "ns_ap_ar", "ns_ap_miss", "ns_ts", "ns_st_ca", "ns_st_cp", "ns_st_er", "ca_ns_st_er", "cb_ns_st_er", "cc_ns_st_er", "cd_ns_st_er", "ns_st_pe", "ns_st_ui", "ca_ns_st_ui", "cb_ns_st_ui", "cc_ns_st_ui", "cd_ns_st_ui", "ns_st_bc", "ns_st_bt", "ns_st_bp", "ns_st_pc", "ns_st_pp", "ns_st_br", "ns_st_ub", "ns_st_vo", "ns_st_ws", "ns_st_pl", "ns_st_pr", "ns_st_ep", "ns_st_ty", "ns_st_ct", "ns_st_cs", "ns_st_ge", "ns_st_st", "ns_st_dt", "ns_st_de", "ns_st_pu", "ns_st_cu", "ns_st_fee", "ns_ap_i1", "ns_ap_i2", "ns_ap_i3", "ns_ap_i4", "ns_ap_i5", "ns_ap_i6", "c3", "ca3", "cb3", "cc3", "cd3", "c4", "ca4", "cb4", "cc4", "cd4", "c5", "ca5", "cb5", "cc5", "cd5", "c6", "ca6", "cb6", "cc6", "cd6", "c10", "c11", "c13", "c14", "c15", "c16", "c7", "c8", "c9"]
                },
                s = function() {
                    var a = function() {
                        function a(a, b) {
                            var d = b[a];
                            null != d && (c[a] = d)
                        }
                        var b, c, e = this,
                            f = 0,
                            g = 0,
                            h = 0,
                            i = 0,
                            j = 0,
                            k = 0;
                        d.extend(this, {
                            reset: function(a) {
                                null != a && a.length > 0 ? d.filterMap(c, a) : c = {}, c.hasOwnProperty("ns_st_cl") || (c.ns_st_cl = "0"), c.hasOwnProperty("ns_st_pn") || (c.ns_st_pn = "1"), c.hasOwnProperty("ns_st_tp") || (c.ns_st_tp = "1"), e.setPauses(0), e.setStarts(0), e.setBufferingTime(0), e.setBufferingTimestamp(-1), e.setPlaybackTime(0), e.setPlaybackTimestamp(-1)
                            },
                            setLabels: function(a, b) {
                                null != a && d.extend(c, a), e.setRegisters(c, b)
                            },
                            getLabels: function() {
                                return c
                            },
                            setLabel: function(a, b) {
                                var c = {};
                                c[a] = b, e.setLabels(c, null)
                            },
                            getLabel: function(a) {
                                return c[a]
                            },
                            getClipId: function() {
                                return ("undefined" == typeof b || null == b) && e.setClipId("1"), b
                            },
                            setClipId: function(a) {
                                b = a
                            },
                            setRegisters: function(b, c) {
                                var d = b.ns_st_cn;
                                null != d && (e.setClipId(d), delete b.ns_st_cn), d = b.ns_st_bt, null != d && (h = Number(d), delete b.ns_st_bt), a("ns_st_cl", b), a("ns_st_pn", b), a("ns_st_tp", b), a("ns_st_ub", b), a("ns_st_br", b), (c == p.PLAYING || null == c) && (d = b.ns_st_sq, null != d && (g = Number(d), delete b.ns_st_sq)), c != p.BUFFERING && (d = b.ns_st_pt, null != d && (j = Number(d), delete b.ns_st_pt)), (c == p.PAUSED || c == p.IDLE || null == c) && (d = b.ns_st_pc, null != d && (f = Number(d), delete b.ns_st_pc))
                            },
                            createLabels: function(a, b) {
                                var c = b || {};
                                return c.ns_st_cn = e.getClipId(), c.ns_st_bt = String(e.getBufferingTime()), (a == o.PLAY || null == a) && (c.ns_st_sq = String(g)), (a == o.PAUSE || a == o.END || a == o.KEEP_ALIVE || a == o.HEART_BEAT || null == a) && (c.ns_st_pt = String(e.getPlaybackTime()), c.ns_st_pc = String(f)), d.extend(c, e.getLabels()), c
                            },
                            incrementPauses: function() {
                                f++
                            },
                            incrementStarts: function() {
                                g++
                            },
                            getBufferingTime: function() {
                                var a = h;
                                return i >= 0 && (a += +new Date - i), a
                            },
                            setBufferingTime: function(a) {
                                h = a
                            },
                            getPlaybackTime: function() {
                                var a = j;
                                return k >= 0 && (a += +new Date - k), a
                            },
                            setPlaybackTime: function(a) {
                                j = a
                            },
                            getPlaybackTimestamp: function() {
                                return k
                            },
                            setPlaybackTimestamp: function(a) {
                                k = a
                            },
                            getBufferingTimestamp: function() {
                                return i
                            },
                            setBufferingTimestamp: function(a) {
                                i = a
                            },
                            getPauses: function() {
                                return f
                            },
                            setPauses: function(a) {
                                f = a
                            },
                            getStarts: function() {
                                return g
                            },
                            setStarts: function(a) {
                                g = a
                            }
                        }), c = {}, e.reset()
                    };
                    return a
                }(),
                t = function() {
                    var a = function() {
                        var a, b, c = this,
                            e = null,
                            f = 0,
                            g = 0,
                            h = 0,
                            i = 0,
                            j = 0,
                            k = 0,
                            l = !1;
                        d.extend(this, {
                            reset: function(a) {
                                null != a && a.length > 0 ? d.filterMap(b, a) : b = {}, c.setPlaylistId(+new Date + "_" + k), c.setBufferingTime(0), c.setPlaybackTime(0), c.setPauses(0), c.setStarts(0), c.setRebufferCount(0), l = !1
                            },
                            setLabels: function(a, e) {
                                null != a && d.extend(b, a), c.setRegisters(b, e)
                            },
                            getLabels: function() {
                                return b
                            },
                            setLabel: function(a, b) {
                                var d = {};
                                d[a] = b, c.setLabels(d, null)
                            },
                            getLabel: function(a) {
                                return b[a]
                            },
                            getClip: function() {
                                return e
                            },
                            getPlaylistId: function() {
                                return a
                            },
                            setPlaylistId: function(b) {
                                a = b
                            },
                            setRegisters: function(b, c) {
                                var d = b.ns_st_sp;
                                null != d && (f = Number(d), delete b.ns_st_sp), d = b.ns_st_bc, null != d && (h = Number(d), delete b.ns_st_bc), d = b.ns_st_bp, null != d && (i = Number(d), delete b.ns_st_bp), d = b.ns_st_id, null != d && (a = d, delete b.ns_st_id), c != p.BUFFERING && (d = b.ns_st_pa, null != d && (j = Number(d), delete b.ns_st_pa)), (c == p.PAUSED || c == p.IDLE || null == c) && (d = b.ns_st_pp, null != d && (g = Number(d), delete b.ns_st_pp))
                            },
                            createLabels: function(b, e) {
                                var i = e || {};
                                return i.ns_st_bp = String(c.getBufferingTime()), i.ns_st_sp = String(f), i.ns_st_id = String(a), h > 0 && (i.ns_st_bc = String(h)), (b == o.PAUSE || b == o.END || b == o.KEEP_ALIVE || b == o.HEART_BEAT || null == b) && (i.ns_st_pa = String(c.getPlaybackTime()), i.ns_st_pp = String(g)), (b == o.PLAY || null == b) && (c.didFirstPlayOccurred() || (i.ns_st_pb = "1", c.setFirstPlayOccurred(!0))), d.extend(i, c.getLabels()), i
                            },
                            incrementStarts: function() {
                                f++
                            },
                            incrementPauses: function() {
                                g++, e.incrementPauses()
                            },
                            setPlaylistCounter: function(a) {
                                k = a
                            },
                            incrementPlaylistCounter: function() {
                                k++
                            },
                            addPlaybackTime: function(a) {
                                if (e.getPlaybackTimestamp() >= 0) {
                                    var b = a - e.getPlaybackTimestamp();
                                    e.setPlaybackTimestamp(-1), e.setPlaybackTime(e.getPlaybackTime() + b), c.setPlaybackTime(c.getPlaybackTime() + b)
                                }
                            },
                            addBufferingTime: function(a) {
                                if (e.getBufferingTimestamp() >= 0) {
                                    var b = a - e.getBufferingTimestamp();
                                    e.setBufferingTimestamp(-1), e.setBufferingTime(e.getBufferingTime() + b), c.setBufferingTime(c.getBufferingTime() + b)
                                }
                            },
                            getBufferingTime: function() {
                                var a = i;
                                return e.getBufferingTimestamp() >= 0 && (a += +new Date - e.getBufferingTimestamp()), a
                            },
                            setBufferingTime: function(a) {
                                i = a
                            },
                            getPlaybackTime: function() {
                                var a = j;
                                return e.getPlaybackTimestamp() >= 0 && (a += +new Date - e.getPlaybackTimestamp()), a
                            },
                            setPlaybackTime: function(a) {
                                j = a
                            },
                            getStarts: function() {
                                return f
                            },
                            setStarts: function(a) {
                                f = a
                            },
                            getPauses: function() {
                                return g
                            },
                            setPauses: function(a) {
                                g = a
                            },
                            getRebufferCount: function() {
                                return h
                            },
                            incrementRebufferCount: function() {
                                h++
                            },
                            setRebufferCount: function(a) {
                                h = a
                            },
                            didFirstPlayOccurred: function() {
                                return l
                            },
                            setFirstPlayOccurred: function(a) {
                                l = a
                            }
                        }), e = new s, b = {}, c.reset()
                    };
                    return a
                }(),
                u = function() {
                    var e = function(e, f) {
                        function g(a) {
                            var b = 0;
                            if (null != na)
                                for (var c = 0; c < na.length; c++) {
                                    var d = na[c],
                                        e = d.playingtime;
                                    if (!e || e > a) {
                                        b = d.interval;
                                        break
                                    }
                                }
                            return b
                        }

                        function h() {
                            m();
                            var a = g(ka.getClip().getPlaybackTime());
                            if (a > 0) {
                                var b = qa > 0 ? qa : a;
                                $ = setTimeout(l, b)
                            }
                            qa = 0
                        }

                        function i() {
                            m();
                            var a = g(ka.getClip().getPlaybackTime());
                            qa = a - ka.getClip().getPlaybackTime() % a, null != $ && m()
                        }

                        function k() {
                            qa = 0, sa = 0, ra = 0
                        }

                        function l() {
                            ra++;
                            var a = O(o.HEART_BEAT, null);
                            C(a), qa = 0, h()
                        }

                        function m() {
                            null != $ && (clearTimeout($), $ = null)
                        }

                        function n() {
                            s(), Z = setTimeout(q, oa)
                        }

                        function q() {
                            var a = O(o.KEEP_ALIVE, null);
                            C(a), ja++, n()
                        }

                        function s() {
                            null != Z && (clearTimeout(Z), Z = null)
                        }

                        function u() {
                            w(), ea.isPauseOnBufferingEnabled() && H(p.PAUSED) && (Y = setTimeout(v, pa))
                        }

                        function v() {
                            if (_ == p.PLAYING) {
                                ka.incrementRebufferCount(), ka.incrementPauses();
                                var a = O(o.PAUSE, null);
                                C(a), ja++, _ = p.PAUSED
                            }
                        }

                        function w() {
                            null != Y && (clearTimeout(Y), Y = null)
                        }

                        function x(a) {
                            return a == p.PLAYING || a == p.PAUSED
                        }

                        function y() {
                            U && (clearTimeout(U), U = null)
                        }

                        function z(a) {
                            return a == o.PLAY ? p.PLAYING : a == o.PAUSE ? p.PAUSED : a == o.BUFFER ? p.BUFFERING : a == o.END ? p.IDLE : null
                        }

                        function A(a, b, c) {
                            if (y(), c) U = setTimeout(function(a, b) {
                                return function() {
                                    A(a, b)
                                }
                            }(a, b), c);
                            else if (K(a)) {
                                var e = M(),
                                    f = ha,
                                    g = J(b),
                                    h = f >= 0 ? g - f : 0;
                                F(M(), b), G(a, b), N(M()), L(a);
                                for (var i = 0, j = da.length; j > i; i++) da[i](e, a, b, h);
                                B(b), ka.setRegisters(b, a), ka.getClip().setRegisters(b, a);
                                var k = O(p.toEventType(a), b);
                                d.extend(k, b), H(W) && (C(k), _ = W, ja++)
                            }
                        }

                        function B(a) {
                            var b = a.ns_st_mp;
                            null != b && (aa = b, delete a.ns_st_mp), b = a.ns_st_mv, null != b && (ba = b, delete a.ns_st_mv), b = a.ns_st_ec, null != b && (ja = Number(b), delete a.ns_st_ec)
                        }

                        function C(a, c) {
                            void 0 === c && (c = !0), c && E(a);
                            var d = ea.getPixelURL();
                            if (X) {
                                if (!D()) {
                                    var e = ua.am,
                                        f = ua.et,
                                        g = e.newApplicationMeasurement(X, f.HIDDEN, a, d);
                                    X.getQueue().offer(g)
                                }
                            } else d && j.httpGet(b(d, a))
                        }

                        function D() {
                            var a = X.getAppContext(),
                                b = X.getSalt(),
                                c = X.getPixelURL();
                            return null == a || null == b || 0 == b.length || null == c || 0 == c.length
                        }

                        function E(a) {
                            ca = O(null), d.extend(ca, a)
                        }

                        function F(a, b) {
                            var c = J(b);
                            if (a == p.PLAYING) ka.addPlaybackTime(c), i(), s();
                            else if (a == p.BUFFERING) ka.addBufferingTime(c), w();
                            else if (a == p.IDLE) {
                                var e = d.getKeys(ka.getClip().getLabels());

                                ka.getClip().reset(e)
                            }
                        }

                        function G(a, b) {
                            var c = J(b),
                                d = I(b);
                            ia = d, a == p.PLAYING ? (h(), n(), ka.getClip().setPlaybackTimestamp(c), H(a) && (ka.getClip().incrementStarts(), ka.getStarts() < 1 && ka.setStarts(1))) : a == p.PAUSED ? H(a) && ka.incrementPauses() : a == p.BUFFERING ? (ka.getClip().setBufferingTimestamp(c), ma && u()) : a == p.IDLE && k()
                        }

                        function H(a) {
                            return a != p.PAUSED && a != p.IDLE || _ != p.IDLE && null != _ ? a != p.BUFFERING && _ != a : !1
                        }

                        function I(a) {
                            var b = -1;
                            return a.hasOwnProperty("ns_st_po") && (b = d.getInteger(a.ns_st_po)), b
                        }

                        function J(a) {
                            var b = -1;
                            return a.hasOwnProperty("ns_ts") && (b = Number(a.ns_ts)), b
                        }

                        function K(a) {
                            return null != a && M() != a
                        }

                        function L(a) {
                            W = a, ha = +new Date
                        }

                        function M() {
                            return W
                        }

                        function N(a) {
                            V = a
                        }

                        function O() {
                            var a, b;
                            1 == arguments.length ? (a = p.toEventType(W), b = arguments[0]) : (a = arguments[0], b = arguments[1]);
                            var c = {};
                            if ("undefined" != typeof document) {
                                var e = document;
                                c.c7 = e.URL, c.c8 = e.title, c.c9 = e.referrer
                            }
                            return null != b && d.extend(c, b), c.hasOwnProperty("ns_ts") || (c.ns_ts = String(+new Date)), null != a && !c.hasOwnProperty("ns_st_ev") && (c.ns_st_ev = o.toString(a)), ea.isPersistentLabelsShared() && X && d.extend(c, X.getLabels()), d.extend(c, ea.getLabels()), P(a, c), ka.createLabels(a, c), ka.getClip().createLabels(a, c), c.hasOwnProperty("ns_st_mp") || (c.ns_st_mp = aa), c.hasOwnProperty("ns_st_mv") || (c.ns_st_mv = ba), c.hasOwnProperty("ns_st_ub") || (c.ns_st_ub = "0"), c.hasOwnProperty("ns_st_br") || (c.ns_st_br = "0"), c.hasOwnProperty("ns_st_pn") || (c.ns_st_pn = "1"), c.hasOwnProperty("ns_st_tp") || (c.ns_st_tp = "1"), c.hasOwnProperty("ns_st_it") || (c.ns_st_it = "c"), c.ns_st_sv = r.STREAMSENSE_VERSION, c.ns_type = "hidden", c
                        }

                        function P(a, b) {
                            var c = b || {};
                            if (c.ns_st_ec = String(ja), !c.hasOwnProperty("ns_st_po")) {
                                var e = ia,
                                    f = J(c);
                                (a == o.PLAY || a == o.KEEP_ALIVE || a == o.HEART_BEAT || null == a && W == p.PLAYING) && (e += f - ka.getClip().getPlaybackTimestamp()), c.ns_st_po = d.getInteger(e)
                            }
                            return a == o.HEART_BEAT && (c.ns_st_hc = String(ra)), c
                        }

                        function Q(a) {
                            var b = J(a);
                            0 > b && (a.ns_ts = String(+new Date))
                        }

                        function R(a, b, c) {
                            b = b || {}, b.ns_st_ad = 1, a >= o.AD_PLAY && a <= o.AD_CLICK && ea.notify(a, b, c)
                        }

                        function S(a, b) {
                            ea.notify(o.CUSTOM, a, b)
                        }
                        var T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea = this,
                            fa = 500,
                            ga = null,
                            ha = 0,
                            ia = 0,
                            ja = 0,
                            ka = null,
                            la = !0,
                            ma = !0,
                            na = r.DEFAULT_HEARTBEAT_INTERVAL,
                            oa = r.DEFAULT_KEEP_ALIVE_INTERVAL,
                            pa = r.DEFAULT_PAUSED_ON_BUFFERING_INTERVAL,
                            qa = 0,
                            ra = 0,
                            sa = 0,
                            ta = !1,
                            ua = {};
                        j.autoSelect(), d.extend(this, {
                            reset: function(a) {
                                ka.reset(a), ka.setPlaylistCounter(0), ka.setPlaylistId(+new Date + "_1"), ka.getClip().reset(a), null == a || a.isEmpty() ? T = {} : d.filterMap(T, a), ja = 1, ra = 0, i(), k(), s(), w(), y(), W = p.IDLE, V = null, ha = -1, _ = null, aa = r.DEFAULT_PLAYERNAME, ba = r.STREAMSENSE_VERSION, ca = null
                            },
                            setPauseOnBufferingInterval: function(a) {
                                pa = a
                            },
                            getPauseOnBufferingInterval: function() {
                                return pa
                            },
                            setKeepAliveInterval: function(a) {
                                oa = a
                            },
                            getKeepAliveInterval: function() {
                                return oa
                            },
                            setHeartbeatIntervals: function(a) {
                                na = a
                            },
                            notify: function() {
                                var a, b, c, e;
                                b = arguments[0], 3 == arguments.length ? (c = arguments[1], e = arguments[2]) : (c = {}, e = arguments[1]), a = z(b);
                                var f = d.extend({}, c);
                                if (Q(f), f.hasOwnProperty("ns_st_po") || (f.ns_st_po = d.getInteger(e).toString()), b == o.PLAY || b == o.PAUSE || b == o.BUFFER || b == o.END) ea.isPausePlaySwitchDelayEnabled() && x(W) && x(a) && (W != p.PLAYING || a != p.PAUSED || U) ? A(a, f, fa) : A(a, f);
                                else {
                                    var g = O(b, f);
                                    d.extend(g, f), C(g, !1), ja++
                                }
                            },
                            getLabels: function() {
                                return T
                            },
                            getState: function() {
                                return W
                            },
                            setLabels: function(a) {
                                null != a && (null == T ? T = a : d.extend(T, a))
                            },
                            getLabel: function(a) {
                                return T[a]
                            },
                            setLabel: function(a, b) {
                                null == b ? delete T[a] : T[a] = b
                            },
                            setPixelURL: function(a) {
                                if (null == a || 0 == a.length) return null;
                                var b = decodeURIComponent || unescape,
                                    c = a.indexOf("?");
                                if (c >= 0) {
                                    if (c < a.length - 1) {
                                        for (var d = a.substring(c + 1).split("&"), e = 0, f = d.length; f > e; e++) {
                                            var g = d[e],
                                                h = g.split("=");
                                            2 == h.length ? ea.setLabel(h[0], b(h[1])) : 1 == h.length && ea.setLabel(r.PAGE_NAME_LABEL, b(h[0]))
                                        }
                                        a = a.substring(0, c + 1)
                                    }
                                } else a += "?";
                                return ga = a
                            },
                            getPixelURL: function() {
                                return ga ? ga : "undefined" != typeof ns_p && "string" == typeof ns_p.src ? ga = ns_p.src.replace(/&amp;/, "&").replace(/&ns__t=\d+/, "") : "string" == typeof ns_pixelUrl ? ga = ns_pixelUrl.replace(/&amp;/, "&").replace(/&ns__t=\d+/, "") : null
                            },
                            isPersistentLabelsShared: function() {
                                return la
                            },
                            setPersistentLabelsShared: function(a) {
                                la = a
                            },
                            isPauseOnBufferingEnabled: function() {
                                return ma
                            },
                            setPauseOnBufferingEnabled: function(a) {
                                ma = a
                            },
                            isPausePlaySwitchDelayEnabled: function() {
                                return ta
                            },
                            setPausePlaySwitchDelayEnabled: function(a) {
                                ta = a
                            },
                            setPausePlaySwitchDelay: function(a) {
                                a && a > 0 && (fa = a)
                            },
                            getPausePlaySwitchDelay: function() {
                                return fa
                            },
                            setClip: function(a, b) {
                                var c = !1;
                                return W == p.IDLE && (ka.getClip().reset(), ka.getClip().setLabels(a, null), b && ka.incrementStarts(), c = !0), c
                            },
                            setPlaylist: function(a) {
                                var b = !1;
                                return W == p.IDLE && (ka.incrementPlaylistCounter(), ka.reset(), ka.getClip().reset(), ka.setLabels(a, null), b = !0), b
                            },
                            importState: function(a) {
                                reset();
                                var b = d.extend({}, a);
                                ka.setRegisters(b, null), ka.getClip().setRegisters(b, null), B(b), ja++
                            },
                            exportState: function() {
                                return ca
                            },
                            getVersion: function() {
                                return r.STREAMSENSE_VERSION
                            },
                            addListener: function(a) {
                                da.push(a)
                            },
                            removeListener: function(a) {
                                da.splice(d.indexOf(a, da), 1)
                            },
                            getClip: function() {
                                return ka.getClip()
                            },
                            getPlaylist: function() {
                                return ka
                            }
                        }), d.extend(this, {
                            adNotify: R,
                            customNotify: S,
                            viewNotify: function(b, c) {
                                b = b || ea.getPixelURL(), b && a(b, c)
                            }
                        }), c.comScore && (ua = c.comScore.exports, X = ua.c()), T = {}, ja = 1, W = p.IDLE, ka = new t, Y = null, ma = !0, $ = null, ra = 0, k(), Z = null, U = null, ta = !1, _ = null, ia = 0, da = [], ea.reset(), e && ea.setLabels(e), f && ea.setPixelURL(f)
                    };
                    return function(a) {
                        function b(a, b) {
                            return x[z] || f(a, b)
                        }

                        function e() {
                            z = -1;
                            for (var a = 0; y >= a; a++)
                                if (x.hasOwnProperty(a)) {
                                    z = a;
                                    break
                                }
                            return c.StreamSense.activeIndex = z, z
                        }

                        function f(a, b) {
                            return a = a || null, b = b || null, a && "object" == typeof a && (b = a, a = null), x[++y] = new c.StreamSense(b, a), e(), x[y]
                        }

                        function g() {
                            var a = !1,
                                b = z;
                            if ("number" == typeof arguments[0] && isFinite(arguments[0])) b = arguments[0];
                            else if (arguments[0] instanceof c.StreamSense)
                                for (var d in x)
                                    if (x[d] === arguments[0]) {
                                        b = d;
                                        break
                                    }
                            return x.hasOwnProperty(b) && (a = x[b], delete x[b], a.reset(), e()), a
                        }

                        function h(a) {
                            return a = a || {}, b().setPlaylist(a), b().getPlaylist()
                        }

                        function i(a, c, d) {
                            return a = a || {}, "number" == typeof c && (a.ns_st_cn = c), b().setClip(a, d), b().getClip()
                        }

                        function j(a, c, d) {
                            return "undefined" == typeof a ? !1 : (d = d || null, c = c || {}, b().notify(a, c, d))
                        }

                        function k(a) {
                            "undefined" != typeof a && b().setLabels(a)
                        }

                        function l() {
                            return b().getLabels()
                        }

                        function m(a) {
                            "undefined" != typeof a && b().getPlaylist().setLabels(a)
                        }

                        function n() {
                            return b().getPlaylist().getLabels()
                        }

                        function o(a) {
                            "undefined" != typeof a && b().getClip().setLabels(a)
                        }

                        function p() {
                            return b().getClip().getLabels()
                        }

                        function q(a) {
                            return b().reset(a || {})
                        }

                        function r(a) {
                            return b().getPlaylist().reset(a || {})
                        }

                        function s(a) {
                            return b().getClip().reset(a || {})
                        }

                        function t(a) {
                            return a = a || {}, b().viewNotify(null, a)
                        }

                        function u(a, c) {
                            return arguments.length > 2 && (a = arguments[1], c = arguments[2]), a = a || {}, "number" == typeof c && (a.ns_st_po = c), b().customNotify(a, c)
                        }

                        function v() {
                            return b().exportState()
                        }

                        function w(a) {
                            b().importState(a)
                        }
                        var x = {},
                            y = -1,
                            z = -1;
                        d.extend(a, {
                            activeIndex: z,
                            newInstance: f,
                            "new": f,
                            destroyInstance: g,
                            destroy: g,
                            newPlaylist: h,
                            newClip: i,
                            notify: j,
                            setLabels: k,
                            getLabels: l,
                            setPlaylistLabels: m,
                            getPlaylistLabels: n,
                            setClipLabels: o,
                            getClipLabels: p,
                            resetInstance: q,
                            resetPlaylist: r,
                            resetClip: s,
                            viewEvent: t,
                            customEvent: u,
                            exportState: v,
                            importState: w
                        })
                    }(e), e
                }();
            return u.AdEvents = q, u.PlayerEvents = o, c.StreamingTag = c.StreamingTag || function() {
                var a = function() {
                    var a = function(a) {
                        function b() {
                            if (!c.comScore && d.exists(a))
                                if (v = d.isTrue(a.debug), d.exists(a.customerC2)) {
                                    var b = a.secure ? "https://sb" : "http" + ("s" == document.location.href.charAt(4) ? "s://sb" : "://b");
                                    t.setPixelURL(b + ".scorecardresearch.com/p?c1=2"), t.setLabel("c2", a.customerC2)
                                } else t.setPixelURL(""), v && console.log("Warning: customerC2 is not provided (or incorrect) in the StreamingTag configuration.");
                            t.setLabel("ns_st_it", "r")
                        }

                        function e(a) {
                            return d.exists(a) || (a = {}), d.exists(a.ns_st_ci) || (a.ns_st_ci = "0"), d.exists(a.c3) || (a.c3 = "*null"), d.exists(a.c4) || (a.c4 = "*null"), d.exists(a.c6) || (a.c6 = "*null"), a
                        }

                        function f(a) {
                            return n > 0 && a >= n ? q += a - n : q = 0, q
                        }

                        function g(a) {
                            t.getState() != p.IDLE && t.getState() != p.PAUSED ? t.notify(o.END, f(a)) : t.getState() == p.PAUSED && t.notify(o.END, q)
                        }

                        function h(a) {
                            return i("ns_st_ci", r, a) && i("c3", r, a) && i("c4", r, a) && i("c6", r, a)
                        }

                        function i(a, b, c) {
                            if (d.exists(a) && d.exists(b) && d.exists(c)) {
                                var e = b[a],
                                    f = c[a];
                                return d.exists(e) && d.exists(f) && e === f
                            }
                            return !1
                        }

                        function j(a, b) {
                            g(a), m++;
                            var c = {
                                ns_st_cn: m,
                                ns_st_pn: "1",
                                ns_st_tp: "0"
                            };
                            d.extend(c, b), t.setClip(c), r = b, n = a, q = 0, t.notify(o.PLAY, q)
                        }

                        function k(a) {
                            var b = +new Date;
                            g(b), m++, a = e(a);
                            var c = {
                                ns_st_cn: m,
                                ns_st_pn: "1",
                                ns_st_tp: "1",
                                ns_st_ad: "1"
                            };
                            d.extend(c, a), t.setClip(c), q = 0, t.notify(o.PLAY, q), n = b, s = !1
                        }

                        function l(a, b) {
                            var c = +new Date;
                            a = e(a), x == w.None && (x = b), s && x == b && h(a) ? (t.getClip().setLabels(a), t.getState() != p.PLAYING && (n = c, t.notify(o.PLAY, q))) : j(c, a), s = !0, x = b
                        }
                        var m = 0,
                            n = 0,
                            q = 0,
                            r = null,
                            s = !1,
                            t = new u,
                            v = !1,
                            w = {
                                None: 0,
                                AudioContent: 1,
                                VideoContent: 2
                            },
                            x = w.None;
                        d.extend(this, {
                            playAdvertisement: function() {
                                v && console && console.warn("Calling deprecated function 'playAdvertisement'. Please call 'playVideoAdvertisement' or 'playAudioAdvertisement' functions instead.");
                                var a = {
                                    ns_st_ct: "va"
                                };
                                k(a)
                            },
                            playVideoAdvertisement: function(a) {
                                var b = {
                                    ns_st_ct: "va"
                                };
                                a && d.extend(b, a), k(b)
                            },
                            playAudioAdvertisement: function(a) {
                                var b = {
                                    ns_st_ct: "aa"
                                };
                                a && d.extend(b, a), k(b)
                            },
                            playContentPart: function(a) {
                                v && console && console.warn("Calling deprecated function 'playContentPart'. Please call 'playVideoContentPart' or 'playAudioContentPart' functions instead.");
                                var b = {
                                    ns_st_ct: "vc"
                                };
                                a && d.extend(b, a), l(b, w.VideoContent)
                            },
                            playVideoContentPart: function(a) {
                                var b = {
                                    ns_st_ct: "vc"
                                };
                                a && d.extend(b, a), l(b, w.VideoContent)
                            },
                            playAudioContentPart: function(a) {
                                var b = {
                                    ns_st_ct: "ac"
                                };
                                a && d.extend(b, a), l(b, w.AudioContent)
                            },
                            stop: function() {
                                var a = +new Date;
                                t.notify(o.PAUSE, f(a))
                            }
                        }), b()
                    };
                    return function() {}(a), a
                }();
                return a
            }(), u
        }(), b.exports = c
    }, {}],
    49: [function(a) {
        function b(a, b) {
            function d(a) {
                return v ? 0 : Math.round(void 0 != a.data && void 0 != a.data.position ? 1e3 * a.data.position : 1e3 * p.currentTime())
            }

            function e(a) {
                return void 0 != a.data && void 0 != a.data.state ? "fullscreen" == a.data.state ? "full" : "norm" : p.isFullScreen ? "full" : "norm"
            }

            function f(a) {
                a > 0 && (q += a, x.getPlaylist().setLabel("ns_st_ca", q))
            }

            function g(a, b, c) {
                var d = x.getPlaylist().getLabel("ns_st_pl");
                x.customNotify({
                    social_network: a,
                    social_url: "" != d ? d : window.location,
                    social_action: b,
                    social_position: "video-controlbar"
                }, c)
            }

            function h(a, b) {
                var c = {};
                if (a.createdate ? c.ns_st_dt = a.createdate : 1 == a.live && (c.ns_st_dt = "N/A"), a.title) {
                    var d = unescape(a.title);
                    c.ns_st_ep = d, t || void 0 !== l && "" !== l || (l = d, x && x.getPlaylist.setLabel("ns_st_pl", d))
                }
                if (a.live && (c.ns_st_li = a.live, v = !0), a.id && (c.ns_st_ci = a.id), a.show_name && (c.ns_st_pr = a.show_name), a.form_type && (c.ns_st_ty = a.form_type, a.form_type != o && (o = a.form_type, b || x.getPlaylist.setLabel("bss_vid_type", o))), a.bb_pub_d && (c.bb_pub_d = a.bb_pub_d), a.c5 && (c.c5 = a.c5), a.ni_codes) {
                    for (var e = "", f = 0; f < a.ni_codes.length; ++f) f > 0 && (e += " "), e += a.ni_codes[f];
                    c.bss_ni_codes = e
                }
                return a.duration && b === !0 && (q = parseInt(a.duration), m = a.id), c.ns_st_ct = t ? v ? "va21" : "va11" : v ? "vc13" : "short-form" == c.ns_st_ty ? "vc11" : "vc12", c
            }

            function i(a, b) {
                if (!b) return a;
                for (var c in b) a[c] = b[c];
                return a
            }

            function j(a, c) {
                var d = h(b.metadata, !0);
                return i(d, {
                    c6: "*null",
                    c7: window.location,
                    c8: document.title,
                    ns_st_mp: "BPlayer",
                    ns_st_mv: c.metadata.version,
                    ns_st_pu: "Bloomberg",
                    bss_flash: videojs.Flash.version(),
                    bss_iframe: window != window.top ? "1" : "0"
                }), i(d, a), a.c5 && (d.c5 = a.c5), document.referrer && (d.c9 = document.referrer), a.title && (l = a.title, delete d.title), a.page_level_tags && (delete d.page_level_tags, "string" == typeof a.page_level_tags && 0 == a.page_level_tags.indexOf("javascript:") ? (fname = a.page_level_tags.substring(11), fname.indexOf("(") > 0 && (fname = fname.substring(0, fname.indexOf("("))), i(d, window[fname]())) : i(d, a.page_level_tags)), d.bss_auto_play = 0, c.flash.flashVars.hasOwnProperty("autoplay") && c.flash.flashVars.autoplay && (d.bss_auto_play = 1), d.bss_cont_play = 0, c.flash.flashVars.hasOwnProperty("continuous_play_previous_url") && c.flash.flashVars.continuous_play_previous_url && (d.bss_cont_play = 1), d
            }

            function k() {
                var a = {};
                a.ns_st_pl = l || "", a.ns_st_ca = q || 0, a.bss_vid_type = o || "", a.bss_pl_num = w, x.setPlaylist(a)
            }
            if (b.use_comscore) {
                var l, m, n, o, p = this,
                    q = 0,
                    r = {},
                    s = 0,
                    t = !1,
                    u = 0,
                    v = !1,
                    w = 1,
                    x = new c.StreamSense(j(a, b), ("https" === b.asset_protocol ? "https://s" : "http://") + "b.scorecardresearch.com/p?c1=2&c2=" + ("mini" === b.player_type ? "6961552" : "3005059"));
                x.setLabels(j(a, b)), k(), x.setPauseOnBufferingInterval(0), x.setKeepAliveInterval(6e5), x.customNotify({
                    ns_st_ev: "playerstarting"
                }, 0), this.on("contentchange", function(a) {
                    w++, l = "", q = 0, o = "", void 0 != a.data && (a.data.title && (l = a.data.title), a.data.duration && (q = parseInt(a.data.duration)), a.data.form_type && (o = a.data.form_type)), k()
                }), this.on("play", function(a) {
                    var b = a.data.isUserInteraction ? 1 : 0;
                    x.notify(c.StreamSense.PlayerEvents.PLAY, {
                        bss_user_action: b
                    }, d(a))
                }), this.on("pause", function(a) {
                    var b = a.data.isUserInteraction ? 1 : 0;
                    x.notify(c.StreamSense.PlayerEvents.PAUSE, {
                        bss_user_action: b
                    }, d(a))
                }), this.on("share", function(a) {
                    g("share-menu", "share", d(a))
                }), this.on("share_action", function(a) {
                    "embed-copy" == a.data ? g(a.data, "embed", d(a)) : "embed-text" == a.data ? g(a.data, "embed", d(a)) : g(a.data, "share", d(a))
                }), this.on("dispose", function(a) {
                    x.notify(c.StreamSense.PlayerEvents.END, {
                        ns_st_pe: 1
                    }, d(a)), p = void 0
                }), this.on("ended", function(a) {
                    x.notify(c.StreamSense.PlayerEvents.END, {
                        ns_st_pe: 1
                    }, d(a))
                }), this.on("error", function(a) {
                    x.notify(c.StreamSense.PlayerEvents.END, {
                        ns_st_pe: 1,
                        ns_st_er: "Error"
                    }, d(a)), x.customNotify({
                        ns_st_ev: "error",
                        ns_st_pe: 1,
                        ns_st_er: "Error"
                    }, d(a))
                }), this.on("volumechange", function(a) {
                    if (void 0 != a.data && void 0 != a.data.volume) {
                        var b = a.data.volume;
                        1 == a.data.mute && (b = 0), x.setLabel("ns_st_vo", b)
                    }
                }), this.on("bitratechange", function(a) {
                    x.notify(c.StreamSense.PlayerEvents.PAUSE, {
                        ns_st_br: x.getLabel("ns_st_br")
                    }, d(a));
                    var b = p.bitrate();
                    x.setLabel("ns_st_br", b), x.notify(c.StreamSense.PlayerEvents.PLAY, {
                        ns_st_br: b
                    }, d(a))
                }), this.on("retry", function(a) {
                    if (!t) {
                        var b = "none";
                        a.data.url && (b = a.data.url), x.getClip().setLabel("bss_stream_url", b), x.customNotify({
                            ns_st_ev: "retry",
                            bss_stream_url: b
                        }, d(a))
                    }
                }), this.on("fullscreenchange", function(a) {
                    var b = e(a);
                    x.setLabel("ns_st_ws", b), x.customNotify({
                        ns_st_ev: "wstate"
                    }, d(a))
                }), this.on("buffer", function(a) {
                    x.notify(c.StreamSense.PlayerEvents.BUFFER, {}, d(a))
                }), this.on("durationchange", function(a) {
                    (0 == s || isNaN(s) || void 0 == s && (!t || t && a.data.duration <= 60)) && (s = 1e3 * (a.data.duration ? a.data.duration : p.duration()), n != m && f(s), x.getClip().setLabel("ns_st_cl", s), x.customNotify({
                        ns_st_ev: "duration"
                    }, d(a)))
                }), this.on("clip", function(a) {
                    x.notify(c.StreamSense.PlayerEvents.END, {}, d(a)), n = a.data.clip.content_id, t = 0 == a.data.type.indexOf("ad-");
                    var b;
                    t ? (s = 1e3 * a.data.duration, n || (n = "ad_clip_ " + u)) : s = 1e3 * p.duration();
                    var e = "none";
                    a.data.url && (e = a.data.url), r[n] ? (r[n].part++, b = r[n]) : (n != m && f(s), u++, b = h(a.data.metadata), b.ns_st_cu = e, r[n] = b, b.clip_num = u, b.part = 1), t ? (v && (b.ns_st_li = "1"), b.ns_st_ad = 1, b.ns_st_ty = a.data.type.substring(3)) : b.bss_precision = a.data.isConvivaPrecision ? 1 : 0, b.ns_st_cn = r[n].clip_num, b.ns_st_ci = n, b.ns_st_cl = s, b.ns_st_pn = r[n].part, b.ns_st_tp = 0, b.ns_st_cs = p.width() + "x" + p.height(), b.bss_stream_url = e, x.setClip(b)
                })
            }
        }
        var c = a("./streamsense.min");
        videojs.plugin("comscoreStreamSensePlugin", b)
    }, {
        "./streamsense.min": 48
    }],
    50: [function(a, b, c) {
        arguments[4][2][0].apply(c, arguments)
    }, {
        dup: 2
    }],
    51: [function(a, b) {
        var c = function(a) {
            this.name = a, this.callbacks = []
        };
        c.prototype.registerCallback = function(a) {
            this.callbacks.push(a)
        }, b.exports.addEventHandling = function(a) {
            a._eventUtilsEvents = {};
            var b = Object.getPrototypeOf(a);
            b.registerEvent = function(a) {
                var b = new c(a);
                this._eventUtilsEvents[a] = b
            }, b.dispatchEvent = function(a, b) {
                for (var c = this._eventUtilsEvents[a].callbacks, d = 0; d < c.length; ++d) c[d](b)
            }, b.addEventListener = function(a, b) {
                this._eventUtilsEvents[a].registerCallback(b)
            }, b.removeEventListener = function(a, b) {
                var c = this._eventUtilsEvents[a];
                if (c && c.callbacks)
                    for (var d = c.callbacks, e = 0; e < d.length; ++e) d[e] === b && (this._eventUtilsEvents[a].callbacks.splice(e, 1), --e)
            }
        }
    }, {}],
    52: [function(a, b) {
        var c = function() {
                this.LOG_LEVELS = {
                    TRACE: 5,
                    DEBUG: 4,
                    INFO: 3,
                    WARN: 2,
                    ERROR: 1
                }, this.minLogLevel = 0
            },
            d = new c,
            e = function(a) {
                this.loggerFor = a, this.logConfig = d
            };
        e.getConsole = function() {
            return console
        }, e.prototype.log = function(a, b) {
            a <= this.logConfig.minLogLevel && e.getConsole().log((new Date).getTime() + " " + this.loggerFor + ": " + b)
        }, e.prototype.getLogLevels = function() {
            return this.logConfig.LOG_LEVELS
        }, e.prototype.setMinLogLevel = function(a) {
            this.logConfig.minLogLevel = a
        }, e.prototype.trace = function(a) {
            this.log(this.getLogLevels().TRACE, a)
        }, e.prototype.debug = function(a) {
            this.log(this.getLogLevels().DEBUG, a)
        }, e.prototype.info = function(a) {
            this.log(this.getLogLevels().INFO, a)
        }, e.prototype.warn = function(a) {
            this.log(this.getLogLevels().WARN, a)
        }, e.prototype.error = function(a) {
            this.log(this.getLogLevels().ERROR, a)
        }, b.exports = e
    }, {}],
    53: [function(a, b) {
        var c = a("projector-js-logger"),
            d = new c("AdController"),
            e = a("./ad-manager.js"),
            f = a("./ad-controls.js"),
            g = a("device-utils-js"),
            h = 250,
            i = function(a, b) {
                this.config = a, this.player = b, this.isMobile, this.bufferingAnimation = a.bufferingAnimation, this.controlsFadeMillis = a.controlsFadeMillis, this.prerollConfigs, this.midrollConfigs, this.adControls, this.loadedMetadata, this.currentAd, this.currentAdStarted, this.remainingTimeInterval, this.onMobileInitialInteractionBoundEvent, this.player.ready(this._init.bind(this))
            };
        i.prototype._init = function() {
            d.debug("Initializing ad controller."), this.isMobile = g.isIOS() || g.isAndroid(), this.loadedMetadata = !1, this.prerollConfigs = this._getAdConfigs("preroll"), this.midrollConfigs = this._getAdConfigs("midroll"), this._initControls();
            var a = this.adControls.getAdTagContainerId(),
                b = this.adControls.getAvailableAdWidth(),
                c = this.adControls.getAvailableAdHeight();
            this.prerollConfigs.adContainerId = a, this.prerollConfigs.player = this.player, this.prerollConfigs.width = b, this.prerollConfigs.height = c, this.midrollConfigs.adContainerId = a, this.midrollConfigs.player = this.player, this.midrollConfigs.width = b, this.midrollConfigs.height = c, this._prerollEnabled() && this._initPreroll(), this._midrollEnabled() && this._initMidrolls()
        }, i.prototype._prerollEnabled = function() {
            return this.prerollConfigs.unit && this.prerollConfigs.unit.length > 0 ? !0 : !1
        }, i.prototype._midrollEnabled = function() {
            return this.midrollConfigs.unit && this.midrollConfigs.unit.length > 0 ? !0 : !1
        }, i.prototype._initControls = function() {
            var a = {
                playerWidth: this.player.width(),
                playerHeight: this.player.height(),
                playerId: this.player.el().id,
                poster: this.player.poster(),
                bufferingAnimation: this.bufferingAnimation,
                controlsFadeMillis: this.controlsFadeMillis
            };
            this.adControls = new f(a), this.adControls.render(), this._trackControlEvents()
        }, i.prototype._trackControlEvents = function() {
            this.adControls.addEventListener(f.events.PLAY_REQUEST, this._onControlPlayRequest.bind(this)), this.adControls.addEventListener(f.events.PAUSE_REQUEST, this._onControlPauseRequest.bind(this))
        }, i.prototype._onControlPlayRequest = function() {
            this.currentAdStarted && this.currentAd.resume()
        }, i.prototype._onControlPauseRequest = function() {
            this.currentAdStarted && this.currentAd.pause()
        }, i.prototype._onAdReady = function() {
            this.currentAd.startAds()
        }, i.prototype._onAdStart = function() {
            this.currentAdStarted = !0, this.adControls.setPlayStatus(f.playStatus.PLAYING), this._trackRemainingTime()
        }, i.prototype._onAdResume = function() {
            this.adControls.setPlayStatus(f.playStatus.PLAYING), this._trackRemainingTime()
        }, i.prototype._onAdPause = function() {
            this.adControls.setPlayStatus(f.playStatus.PAUSED), this._stopTrackingRemainingTime()
        }, i.prototype._onAdComplete = function() {
            this._switchToContent(), this._stopTrackingRemainingTime()
        }, i.prototype._onRemainingTimeInterval = function() {
            var a = this.currentAd.getRemainingTime(),
                b = this.currentAd.getDuration(),
                c = b - a,
                d = Math.round(c / b * 100);
            this.adControls.setAdCountdownTime(a), this.adControls.setProgressBarPercentComplete(d)
        }, i.prototype._trackRemainingTime = function() {
            this.remainingTimeInterval = setInterval(this._onRemainingTimeInterval.bind(this), h)
        }, i.prototype._stopTrackingRemainingTime = function() {
            clearInterval(this.remainingTimeInterval)
        }, i.prototype._onContentPauseRequested = function() {
            this.player.pause()
        }, i.prototype._onContentResumeRequested = function() {
            this.player.play()
        }, i.prototype._onAdFailure = function() {
            this._stopTrackingRemainingTime(), this._switchToContent()
        }, i.prototype._switchToContent = function() {
            this.adControls.moveContentVideoOnScreen(), this.adControls.removeAdControls(), this.player.play()
        }, i.prototype._initPreroll = function() {
            this.isMobile ? (d.debug("Detected mobile browser."), this._initPrerollForMobile()) : (d.debug("Detected desktop browser."), this._initPrerollForDesktop())
        }, i.prototype._initPrerollForMobile = function() {
            this.adControls.moveContentVideoOffScreen(), this.onMobileInitialInteractionBoundEvent = this._onMobileInitialInteraction.bind(this), this.adControls.addEventListener(f.events.PLAY_REQUEST, this.onMobileInitialInteractionBoundEvent)
        }, i.prototype._onMobileInitialInteraction = function() {
            this.adControls.removeEventListener(f.events.PLAY_REQUEST, this.onMobileInitialInteractionBoundEvent), d.debug("Loading the content video tag"), this.currentAd = new e(this.prerollConfigs), this.adControls.setPlayStatus(f.playStatus.BUFFERING);
            var a = this.adControls.getContentVideoTag(),
                b = this._onMobileVideoLoadedMetadata.bind(this);
            a.addEventListener("loadedmetadata", b), this.player.one("loadedmetadata_shim", b), a.load(), this.player.trigger("loadedmetadata_shim")
        }, i.prototype._onMobileVideoLoadedMetadata = function() {
            this.loadedMetadata || (this.loadedMetadata = !0, this.currentAd.requestAds(), this._trackAdEvents(this.currentAd))
        }, i.prototype._initPrerollForDesktop = function() {
            this.currentAd = new e(this.prerollConfigs), this.currentAd.requestAds(), this._trackAdEvents(this.currentAd)
        }, i.prototype._initMidrolls = function() {
            this.player.on("preparemidroll", function() {}), this.player.on("startmidroll", function() {})
        }, i.prototype._trackAdEvents = function(a) {
            a.addEventListener(e.events.ADS_READY, this._onAdReady.bind(this)), a.addEventListener(e.events.STARTED, this._onAdStart.bind(this)), a.addEventListener(e.events.RESUMED, this._onAdResume.bind(this)), a.addEventListener(e.events.PAUSED, this._onAdPause.bind(this)), a.addEventListener(e.events.ADS_COMPLETE, this._onAdComplete.bind(this)), a.addEventListener(e.events.ADS_FAILURE, this._onAdFailure.bind(this)), a.addEventListener(e.events.CONTENT_PAUSE_REQUESTED, this._onContentPauseRequested.bind(this)), a.addEventListener(e.events.CONTENT_RESUME_REQUESTED, this._onContentResumeRequested.bind(this))
        }, i.prototype._getAdConfigs = function(a) {
            return {
                loadTimeoutMillis: this.config[a + "LoadTimeout"],
                playTimeoutMillis: this.config[a + "PlaybackTimeout"],
                disableCompanionAds: this.config[a + "DisableCompanionAds"],
                adsPerBlock: this.config[a + "AdsPerBlock"],
                playbackDelay: this.config[a + "PlaybackDelay"],
                unit: this.config[a + "Unit"],
                isGPT: this.config[a + "IsGPT"],
                networkId: this.config[a + "NetworkId"],
                sz: this.config[a + "Sz"],
                tile: this.config[a + "Tile"],
                tpVideo: this.config[a + "TpVideo"],
                suffix: this.config[a + "Suffix"],
                custParams: this.config[a + "CustParams"],
                maxRetries: this.config[a + "MaxRetries"],
                isMobile: this.isMobile
            }
        }, b.exports = i
    }, {
        "./ad-controls.js": 54,
        "./ad-manager.js": 55,
        "device-utils-js": 50,
        "projector-js-logger": 52
    }],
    54: [function(a, b) {
        var c = a("projector-js-logger"),
            d = new c("AdControls"),
            e = a("event-utils-js"),
            f = 22,
            g = 30,
            h = 4,
            i = f,
            j = g + h,
            k = function(a) {
                k.playStatus = {
                    PAUSED: "PAUSED",
                    PLAYING: "PLAYING",
                    SETUP: "SETUP",
                    BUFFERING: "BUFFERING"
                }, k.events = {
                    PLAY_REQUEST: "PLAY_REQUEST",
                    PAUSE_REQUEST: "PAUSE_REQUEST"
                }, this.playerId = a.playerId, this.poster = a.poster, this.controlsFadeMillis = a.controlsFadeMillis, this.bufferingAnimation = a.bufferingAnimation, this.adTagContainerId = this.playerId + "AdTagContainer", this.playStatus = k.playStatus.SETUP, this.container, this.videojsContainer, this.videoContainer, this.adTagContainer, this.controlsContainer, this.playStatusButton, this.bigPlayButtonContainer, this.bigPlayButton, this.adCountdownContainer, this.adCountdownText, this.adCountdownTime, this.bufferingAnimationImage, this.hadInitialPlay, this.controlsFadeTimeout, e.addEventHandling(this), this.registerEvent(k.events.PLAY_REQUEST), this.registerEvent(k.events.PAUSE_REQUEST)
            };
        k.prototype.getAdTagContainerId = function() {
            return this.adTagContainerId
        }, k.prototype.getAvailableAdWidth = function() {
            return this.adTagContainer.width
        }, k.prototype.getAvailableAdHeight = function() {
            return this.adTagContainer.height
        }, k.prototype.render = function() {
            this._renderDisplayElements(), this._trackInteractions()
        }, k.prototype.getPlayStatus = function() {
            return this.playStatus
        }, k.prototype.setPlayStatus = function(a) {
            switch (a) {
                case k.playStatus.PAUSED:
                    this._setPause();
                    break;
                case k.playStatus.PLAYING:
                    this._setPlay();
                    break;
                case k.playStatus.BUFFERING:
                    this._setBuffering();
                    break;
                default:
                    d.debug("Received unsupported play status: " + a)
            }
        }, k.prototype.setAdCountdownTime = function(a) {
            if (this.adCountdownTime) {
                "string" == typeof a && (this.adCountdownTime.innerHTML = a);
                var b = Math.round(a),
                    c = 0;
                b > 60 && (c = b % 60, b = Math.round(b / 60));
                var d = "" + c;
                d.length < 2 && (d = "0" + d);
                var e = "" + b;
                e.length < 2 && (e = "0" + e), this.adCountdownTime.innerHTML = d + ":" + e
            }
        }, k.prototype.setProgressBarPercentComplete = function() {}, k.prototype.forceRedraw = function(a) {
            a.style.display = "run-in", a.offsetHeight, a.style.display = ""
        }, k.prototype.moveContentVideoOffScreen = function() {
            this.videoContainer.style.position = "absolute", this.videoContainer.style.left = "-5000px", this.forceRedraw(this.videoContainer)
        }, k.prototype.moveContentVideoOnScreen = function() {
            this.videoContainer.style.position = "relative", this.videoContainer.style.left = "0px", this.forceRedraw(this.videoContainer)
        }, k.prototype.removeAdControls = function() {
            this._removeNode(this.bufferingAnimationImage, this.container), this._removeNode(this.adTagContainer, this.container), this._removeNode(this.controlsContainer, this.container)
        }, k.prototype.getContentVideoTag = function() {
            return document.getElementById(this.playerId + "_html5_api")
        }, k.prototype._setPause = function() {
            this.playStatusButton.className = "bvp-google-ads-icon-play", this.playStatus = k.playStatus.PAUSED, this.controlsContainer.appendChild(this.bigPlayButtonContainer), this._showControls()
        }, k.prototype._removeNode = function(a, b) {
            a && b && a.parentNode && a.parentNode === b && b.removeChild(a)
        }, k.prototype._setPlay = function() {
            this.playStatusButton.className = "bvp-google-ads-icon-pause", this.playStatus = k.playStatus.PLAYING, this._removeNode(this.bigPlayButtonContainer, this.controlsContainer), this._removeNode(this.bufferingAnimationImage, this.container), this.hadInitialPlay || (this.hadInitialPlay = !0, this.controlsContainer.appendChild(this.adCountdownContainer)), this._showControls()
        }, k.prototype._setBuffering = function() {
            this.playStatus = k.playStatus.BUFFERING, this._removeNode(this.bigPlayButtonContainer, this.controlsContainer), this._removePoster(), this.bufferingAnimationImage && this.container.appendChild(this.bufferingAnimationImage)
        }, k.prototype._removePoster = function() {
            this.container.style.backgroundImage = ""
        }, k.prototype._showControls = function() {
            this.controlsFadeTimeout && clearTimeout(this.controlsFadeTimeout), this.controlsFadeTimeout = setTimeout(function() {
                this._fadeOutControls()
            }.bind(this), this.controlsFadeMillis)
        }, k.prototype._fadeOutControls = function() {
            this.playStatus === k.playStatus.PAUSED
        }, k.prototype._renderDisplayElements = function() {
            this.videojsContainer = this._getVideojsContainer(this.playerId), this.container = this._createContainer(this.videojsContainer.parentNode.offsetWidth, this.videojsContainer.parentNode.offsetHeight, this.poster), this.videoContainer = document.createElement("div"), this.adTagContainer = this._createAdTagContainer(this.adTagContainerId), this.controlsContainer = this._createControlsContainer(), this.playStatusButton = this._createPlayStatusButton(), this.bigPlayButtonContainer = this._createBigPlayButtonContainer(), this.bigPlayButton = this._createBigPlayButton(), this.adCountdownContainer = this._createAdCountdownContainer(), this.adCountdownText = this._createAdCountdownText(), this.adCountdownTime = this._createAdCountdownTime(), this.bufferingAnimation && (this.bufferingAnimationImage = this._createBufferingAnimationImage(this.bufferingAnimation)), this.videojsContainer.parentNode.insertBefore(this.container, this.videojsContainer), this.container.appendChild(this.videoContainer), this.videoContainer.appendChild(this.videojsContainer), this.container.appendChild(this.adTagContainer), this.bigPlayButtonContainer.appendChild(this.bigPlayButton), this.controlsContainer.appendChild(this.bigPlayButtonContainer), this.adCountdownContainer.appendChild(this.adCountdownText), this.adCountdownContainer.appendChild(this.adCountdownTime), this.container.appendChild(this.controlsContainer), this._resizeAdTagContainer()
        }, k.prototype._resizeAdTagContainer = function() {
            this.adTagContainer.width = this.container.clientWidth, this.adTagContainer.height = this.container.clientHeight - i - j, this.adTagContainer.style.top = i + "px"
        }, k.prototype._handleTouchEvents = function() {
            return vjs.IOS && "ontouchend" in window ? /CriOS/.test(navigator.userAgent) ? !1 : !0 : !1
        }, k.prototype._trackInteractions = function() {
            function a(a) {
                var c = !1;
                a.addEventListener("touchmove", function() {
                    c = !0
                }), a.addEventListener("touchstart", function() {
                    c = !1
                }), a.addEventListener("touchend", function() {
                    c || b()
                })
            }
            var b = this._onPlayStatusButtonClick.bind(this);
            this._handleTouchEvents() ? (a(this.playStatusButton), a(this.bigPlayButtonContainer)) : (this.playStatusButton.addEventListener("click", b), this.bigPlayButtonContainer.addEventListener("click", b))
        }, k.prototype._onPlayStatusButtonClick = function() {
            switch (this.playStatus) {
                case k.playStatus.PAUSED:
                case k.playStatus.SETUP:
                    this.dispatchEvent(k.events.PLAY_REQUEST);
                    break;
                case k.playStatus.PLAYING:
                    this.dispatchEvent(k.events.PAUSE_REQUEST);
                    break;
                case k.playStatus.BUFFERING:
            }
        }, k.prototype._createBufferingAnimationImage = function(a) {
            var b = document.createElement("img");
            return b.className = "bvp-google-ads-buffering-animation", b.src = a, b
        }, k.prototype._createBigPlayButton = function() {
            var a = document.createElement("div");
            return a.className = "bvp-google-ads-icon-big-play", a
        }, k.prototype._createBigPlayButtonContainer = function() {
            var a = document.createElement("div");
            return a.className = "bvp-google-ads-big-play-container", a
        }, k.prototype._createPlayStatusButton = function() {
            var a = document.createElement("div");
            return a.className = "bvp-google-ads-icon-play", a
        }, k.prototype._createControlsContainer = function() {
            var a = document.createElement("div");
            return a.className = "bvp-google-ads-controls", a
        }, k.prototype._createAdCountdownContainer = function() {
            var a = document.createElement("div");
            return a.className = "bvp-google-ads-ad-countdown", a
        }, k.prototype._createAdCountdownText = function() {
            var a = document.createElement("div");
            return a.className = "bvp-google-ads-ad-countdown-text", a.innerHTML = "Advertisement", a
        }, k.prototype._createAdCountdownTime = function() {
            var a = document.createElement("div");
            return a.className = "bvp-google-ads-ad-countdown-time", a.innerHTML = "", a
        }, k.prototype._createAdTagContainer = function(a) {
            var b = document.createElement("div");
            return b.id = a, b.className = "bvp-google-ads-ad-tag-container", b
        }, k.prototype._getVideojsContainer = function(a) {
            return document.getElementById(a)
        }, k.prototype._createContainer = function(a, b, c) {
            var d = document.createElement("div");
            return d.className = "bvp-google-ads-container", d.style.width = a + "px", d.style.height = b + "px", c && (d.style.backgroundImage = 'url("' + c + '")', d.style.backgroundSize = "contain"), d
        }, b.exports = k
    }, {
        "event-utils-js": 51,
        "projector-js-logger": 52
    }],
    55: [function(a, b) {
        a("./ima3");
        var c = a("./ad-tag-generator"),
            d = a("projector-js-logger"),
            e = new d("AdManager"),
            f = a("event-utils-js"),
            g = 50,
            h = 1500,
            j = function(a) {
                j.events = {
                        ADS_READY: "ADS_READY",
                        ADS_COMPLETE: "ADS_COMPLETE",
                        ADS_FAILURE: "ADS_FAILURE",
                        STARTED: "STARTED",
                        RESUMED: "RESUMED",
                        PAUSED: "PAUSED",
                        CONTENT_PAUSE_REQUESTED: "CONTENT_PAUSE_REQUESTED",
                        CONTENT_RESUME_REQUESTED: "CONTENT_RESUME_REQUESTED"
                    }, this.player = a.player, this.adsManager, this.adsLoader, this.adDisplayContainer, this.currentAd, this.adContainer, this.adContainerId = a.adContainerId, this.width = a.width, this.height = a.height, this.adTagGenerator = new c({
                        unit: a.unit,
                        isGPT: a.isGPT,
                        networkId: a.networkId,
                        sz: a.sz,
                        tile: a.tile,
                        tpVideo: a.tpVideo,
                        suffix: a.suffix,
                        custParams: a.custParams,
                        isMobile: a.isMobile
                    }), this.maxRetries = a.maxRetries,
                    this.loadTimeoutMillis = a.loadTimeoutMillis, this.playTimeoutMillis = a.playTimeoutMillis, this.retryCount = 0, this.loadTimeout, this.playTimeout, this.boundEvents = [], this.isPlaying, f.addEventHandling(this), this.registerEvent(j.events.STARTED), this.registerEvent(j.events.RESUMED), this.registerEvent(j.events.PAUSED), this.registerEvent(j.events.ADS_READY), this.registerEvent(j.events.ADS_COMPLETE), this.registerEvent(j.events.ADS_FAILURE), this.registerEvent(j.events.CONTENT_PAUSE_REQUESTED), this.registerEvent(j.events.CONTENT_RESUME_REQUESTED), this._init()
            };
        j.prototype._init = function() {
            e.debug("Initializing"), e.debug("Getting element by adContainerId: " + this.adContainerId), this.adContainer = document.getElementById(this.adContainerId), this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainer), this.adDisplayContainer.initialize()
        }, j.prototype.getAdContainer = function() {
            return this.adContainer
        }, j.prototype.getRemainingTime = function() {
            return this.adsManager ? this.adsManager.getRemainingTime() : void 0
        }, j.prototype.getDuration = function() {
            return this.currentAd ? this.currentAd.getDuration() : void 0
        }, j.prototype._getAdTagUrl = function() {
            return this.adTagGenerator.getAdTag()
        }, j.prototype._onLoadTimeout = function() {
            console.error("Load timeout reached."), this._reportAdLoadTimeout(), this._destroyRequest()
        }, j.prototype._onPlayTimeout = function() {
            console.error("Play timeout reached."), this._reportAdPlayTimeout(), this._destroyRequest()
        }, j.prototype._addBoundEvent = function(a, b, c) {
            var d = c.bind(this);
            a.addEventListener(b, d), this.boundEvents.push({
                target: a,
                type: b,
                boundListener: d
            })
        }, j.prototype._clearBoundEvents = function() {
            var a, b;
            for (a = 0; a < this.boundEvents.length; ++a) b = this.boundEvents[a], b.target.removeEventListener(b.type, b.boundListener)
        }, j.prototype.requestAds = function() {
            this.loadTimeout = setTimeout(this._onLoadTimeout.bind(this), this.loadTimeoutMillis), this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer), this.adsManagerLoadedFunc = this._onAdsManagerLoaded.bind(this), this._addBoundEvent(this.adsLoader, google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._onAdsManagerLoaded), this._addBoundEvent(this.adsLoader, google.ima.AdErrorEvent.Type.AD_ERROR, this._onAdError);
            var a = new google.ima.AdsRequest;
            a.adTagUrl = this._getAdTagUrl(), a.linearAdSlotWidth = this.width, a.linearAdSlotHeight = this.height, e.debug("Requesting ads"), this.adsLoader.requestAds(a)
        }, j.prototype._reportAdLoadError = function() {
            this.player.trigger("adsloaderror")
        }, j.prototype._reportAdPlayError = function() {
            this.player.trigger("adsplayerror")
        }, j.prototype._reportAdLoadTimeout = function() {
            this.player.trigger("adsloadtimeout")
        }, j.prototype._reportAdPlayTimeout = function() {
            this.player.trigger("adsplaytimeout")
        }, j.prototype._onAdError = function(a) {
            switch (e.debug("Ad error: " + a.getError()), a.getError().getType()) {
                case google.ima.AdError.Type.AD_LOAD:
                    this._reportAdLoadError();
                    break;
                case google.ima.AdError.Type.AD_PLAY:
                    this._reportAdPlayError()
            }
            this._resolveError(a.getError())
        }, j.prototype._clearTimeouts = function() {
            clearTimeout(this.loadTimeout), clearTimeout(this.playTimeout)
        }, j.prototype._resolveError = function(a) {
            if (console.error(a), this.retryCount < this.maxRetries) {
                this._clearTimeouts(), ++this.retryCount;
                var b = g * Math.pow(2, this.retryCount - 1),
                    c = Math.min(b, h);
                e.debug("Retrying request for ads (time number " + this.retryCount + ") in " + c + "ms"), setTimeout(this.requestAds.bind(this), c)
            } else e.info("Max retries reached. Requesting no further ads."), this._destroyRequest()
        }, j.prototype._destroyRequest = function() {
            e.debug("Destroying request"), this.retryCount = 0, this._clearTimeouts(), this._clearBoundEvents(), this.adsManager && this.adsManager.destroy(), this.dispatchEvent(j.events.ADS_FAILURE)
        }, j.prototype._onContentPauseRequested = function() {
            e.debug("Content pause requested"), this.dispatchEvent(j.events.CONTENT_PAUSE_REQUESTED)
        }, j.prototype._onContentResumeRequested = function() {
            e.debug("Content resume requested"), this.dispatchEvent(j.events.CONTENT_RESUME_REQUESTED)
        }, j.prototype._onAdsManagerLoaded = function(a) {
            clearTimeout(this.loadTimeout), e.debug("Ads manager loaded"), this.adsManager = a.getAdsManager(this.adDisplayContainer), this._addBoundEvent(this.adsManager, google.ima.AdErrorEvent.Type.AD_ERROR, this._onAdError), this._addBoundEvent(this.adsManager, google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this._onContentPauseRequested), this._addBoundEvent(this.adsManager, google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this._onContentResumeRequested), this._addBoundEvent(this.adsManager, google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this._onAllAdsCompleted), this._addBoundEvent(this.adsManager, google.ima.AdEvent.Type.LOADED, this._onLoaded), this._addBoundEvent(this.adsManager, google.ima.AdEvent.Type.STARTED, this._onStarted), this._addBoundEvent(this.adsManager, google.ima.AdEvent.Type.COMPLETE, this._onComplete), this._addBoundEvent(this.adsManager, google.ima.AdEvent.Type.PAUSED, this._onPaused), this._addBoundEvent(this.adsManager, google.ima.AdEvent.Type.RESUMED, this._onResumed), this.dispatchEvent(j.events.ADS_READY)
        }, j.prototype.startAds = function() {
            e.debug("Starting ads"), this.playTimeout = setTimeout(this._onPlayTimeout.bind(this), this.playTimeoutMillis);
            try {
                var a;
                try {
                    a = this.player.isFullScreen() ? google.ima.ViewMode.FULLSCREEN : google.ima.ViewMode.NORMAL
                } catch (b) {
                    a = google.ima.ViewMode.NORMAL
                }
                this.adsManager.init(this.width, this.height, a), this.adsManager.start()
            } catch (c) {
                this._reportAdPlayError(), this._resolveError(c)
            }
        }, j.prototype._onLoaded = function(a) {
            e.debug("Ad loaded");
            var b = a.getAd();
            !b.isLinear()
        }, j.prototype._onStarted = function(a) {
            clearTimeout(this.playTimeout), this.retryCount = 0, this.isPlaying = !0, this.dispatchEvent("STARTED"), e.debug("Ad started"), this.currentAd = a.getAd()
        }, j.prototype._onComplete = function() {
            e.debug("Ad complete")
        }, j.prototype._onAllAdsCompleted = function() {
            e.debug("All ads completed"), this.isPlaying = !1, this.dispatchEvent(j.events.ADS_COMPLETE)
        }, j.prototype.pause = function() {
            this.adsManager.pause()
        }, j.prototype.resume = function() {
            this.adsManager.resume()
        }, j.prototype._onPaused = function() {
            var a = this.adContainer.querySelectorAll("video");
            for (i in a) "object" == typeof a[i] && a[i].classList.add("bvp-google-ads-no-native-controls-on-iphone");
            this.isPlaying = !1, this.dispatchEvent("PAUSED")
        }, j.prototype._onResumed = function() {
            this.isPlaying = !0, this.dispatchEvent("RESUMED")
        }, j.prototype.isPlayingAd = function() {
            return this.isPlaying
        }, b.exports = j
    }, {
        "./ad-tag-generator": 56,
        "./ima3": 57,
        "event-utils-js": 51,
        "projector-js-logger": 52
    }],
    56: [function(a, b) {
        var c = a("projector-js-logger"),
            d = new c("AdTagGenerator"),
            e = "{server_id}",
            f = "{unit}",
            g = "{sz}",
            h = "{tile}",
            i = "{tp_video}",
            j = "{url}",
            k = "{ord}",
            l = "",
            m = "1x1",
            n = "1",
            o = "null",
            p = "http://ad.doubleclick.net" + e + "/pfadx/" + f + ";sz=" + g + ";tile=" + h + ";tp_video=" + i + ";dcmt=text/xml;url=" + j + ";ord=" + k,
            q = "http://pubads.g.doubleclick.net/gampad/ads?sz=" + g + "&iu=" + e + f + "&ciu_szs=300x250,728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&correlator=" + k,
            r = function(a) {
                this.unit = a.unit, this.isGPT = a.isGPT, this.networkId = a.networkId, this.sz = a.sz, this.tile = a.tile, this.tpVideo = a.tpVideo, this.suffix = a.suffix, this.custParams = decodeURIComponent(a.custParams), this.isMobile = a.isMobile ? !0 : !1, this.ordIncrementer = Math.round(1e3 * Math.random())
            };
        r.prototype.getServerId = function() {
            var a = this.networkId ? "" + this.networkId : l;
            return a.length > 0 && (a = "/" + a, this.isGPT && (a += "/")), a
        }, r.getWindowLocationPathname = function() {
            return window.location.pathname.toString()
        }, r.prototype.getPageUrl = function() {
            var a = r.getWindowLocationPathname();
            return a ? (a = a.replace(/[?&#].*/, ""), a = decodeURIComponent(a).replace(/[\"\'=!\+*~^\(\)<>\[\]]/g, "")) : void 0
        }, r.prototype.getAdTag = function() {
            var a = this.getServerId(),
                b = "" + this.ordIncrementer++ + (new Date).getTime(),
                c = this.getPageUrl(),
                l = this.isGPT ? q : p,
                r = l.replace(f, this.unit).replace(g, this.sz ? this.sz : m).replace(h, this.tile ? this.tile : n).replace(i, this.tpVideo ? this.tpVideo : o).replace(e, a).replace(k, b).replace(j, c ? c : "");
            if (this.isGPT && this.pageUrl && (r = r.replace(j, c)), this.isGPT) {
                var s = this.custParams || "";
                s && s.length > 0 && (s += "&"), s = s + "url=" + c, this.isMobile && (s = s.replace(/(autoplay)=(\w+)/, "$1=false")), r = r + "&cust_params=" + encodeURIComponent(s)
            }
            return this.suffix && this.suffix.length > 0 && (r = r + (this.isGPT ? "&" : ";") + this.suffix), d.debug("Generated ad tag: " + r), r
        }, r.prototype.getDefaultServerId = function() {
            return l
        }, b.exports = r
    }, {
        "projector-js-logger": 52
    }],
    57: [function(require, module, exports) {
        ! function() {
            function xc(a, b) {
                var c = wc();
                return c ? c : b ? a.referrer : a.URL
            }
            var g, l = this,
                p = function(a) {
                    return void 0 !== a
                },
                q = function(a, b, c) {
                    a = a.split("."), c = c || l, a[0] in c || !c.execScript || c.execScript("var " + a[0]);
                    for (var d; a.length && (d = a.shift());) !a.length && p(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
                },
                aa = function(a, b) {
                    for (var c, d = a.split("."), e = b || l; c = d.shift();) {
                        if (null == e[c]) return null;
                        e = e[c]
                    }
                    return e
                },
                ba = function(a) {
                    var b = typeof a;
                    if ("object" == b) {
                        if (!a) return "null";
                        if (a instanceof Array) return "array";
                        if (a instanceof Object) return b;
                        var c = Object.prototype.toString.call(a);
                        if ("[object Window]" == c) return "object";
                        if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                        if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                    } else if ("function" == b && "undefined" == typeof a.call) return "object";
                    return b
                },
                r = function(a) {
                    return "array" == ba(a)
                },
                ca = function(a) {
                    var b = ba(a);
                    return "array" == b || "object" == b && "number" == typeof a.length
                },
                t = function(a) {
                    return "string" == typeof a
                },
                da = function(a) {
                    return "number" == typeof a
                },
                ea = function(a) {
                    return "function" == ba(a)
                },
                fa = function(a) {
                    var b = typeof a;
                    return "object" == b && null != a || "function" == b
                },
                ga = function(a) {
                    return a.call.apply(a.bind, arguments)
                },
                ha = function(a, b) {
                    if (!a) throw Error();
                    if (2 < arguments.length) {
                        var c = Array.prototype.slice.call(arguments, 2);
                        return function() {
                            var d = Array.prototype.slice.call(arguments);
                            return Array.prototype.unshift.apply(d, c), a.apply(b, d)
                        }
                    }
                    return function() {
                        return a.apply(b, arguments)
                    }
                },
                u = function() {
                    return u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ga : ha, u.apply(null, arguments)
                },
                ia = function(a) {
                    var b = Array.prototype.slice.call(arguments, 1);
                    return function() {
                        var c = b.slice();
                        return c.push.apply(c, arguments), a.apply(this, c)
                    }
                },
                ja = Date.now || function() {
                    return +new Date
                },
                v = function(a, b) {
                    function c() {}
                    c.prototype = b.prototype, a.T = b.prototype, a.prototype = new c, a.sd = function(a, c) {
                        return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
                    }
                };
            Function.prototype.bind = Function.prototype.bind || function(a) {
                if (1 < arguments.length) {
                    var b = Array.prototype.slice.call(arguments, 1);
                    return b.unshift(this, a), u.apply(null, b)
                }
                return u(this, a)
            };
            var ka, la = function(a) {
                    return /^[\s\xa0]*$/.test(a)
                },
                ma = String.prototype.trim ? function(a) {
                    return a.trim()
                } : function(a) {
                    return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
                },
                ua = function(a) {
                    return na.test(a) ? (-1 != a.indexOf("&") && (a = a.replace(oa, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(pa, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(qa, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(ra, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(sa, "&#39;")), -1 != a.indexOf("\x00") && (a = a.replace(ta, "&#0;")), a) : a
                },
                oa = /&/g,
                pa = /</g,
                qa = />/g,
                ra = /"/g,
                sa = /'/g,
                ta = /\x00/g,
                na = /[\x00&<>"']/,
                w = function(a, b) {
                    return -1 != a.toLowerCase().indexOf(b.toLowerCase())
                },
                va = function(a) {
                    return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
                },
                wa = function(a) {
                    return null == a ? "" : String(a)
                },
                ya = function(a, b) {
                    for (var c = 0, d = ma(String(a)).split("."), e = ma(String(b)).split("."), f = Math.max(d.length, e.length), g = 0; 0 == c && f > g; g++) {
                        var h = d[g] || "",
                            i = e[g] || "",
                            j = RegExp("(\\d*)(\\D*)", "g"),
                            k = RegExp("(\\d*)(\\D*)", "g");
                        do {
                            var l = j.exec(h) || ["", "", ""],
                                m = k.exec(i) || ["", "", ""];
                            if (0 == l[0].length && 0 == m[0].length) break;
                            c = xa(0 == l[1].length ? 0 : parseInt(l[1], 10), 0 == m[1].length ? 0 : parseInt(m[1], 10)) || xa(0 == l[2].length, 0 == m[2].length) || xa(l[2], m[2])
                        } while (0 == c)
                    }
                    return c
                },
                xa = function(a, b) {
                    return b > a ? -1 : a > b ? 1 : 0
                },
                za = 2147483648 * Math.random() | 0,
                Ba = function() {
                    return "transform".replace(/\-([a-z])/g, function(a, b) {
                        return b.toUpperCase()
                    })
                },
                Ca = function(a) {
                    var b = t(void 0) ? va(void 0) : "\\s";
                    return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
                        return b + c.toUpperCase()
                    })
                },
                Da = function(a) {
                    return Da[" "](a), a
                };
            Da[" "] = function() {};
            var Ea = function(a, b) {
                    try {
                        return Da(a[b]), !0
                    } catch (c) {}
                    return !1
                },
                Fa = function(a) {
                    try {
                        return !!a && null != a.location.href && Ea(a, "foo")
                    } catch (b) {
                        return !1
                    }
                },
                Ga = document,
                x = window,
                Ha = function(a) {
                    var b = a.toString();
                    if (a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name), a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message), a.stack) {
                        a = a.stack;
                        var c = b;
                        try {
                            -1 == a.indexOf(c) && (a = c + "\n" + a);
                            for (var d; a != d;) d = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                            b = a.replace(/\n */g, "\n")
                        } catch (e) {
                            b = c
                        }
                    }
                    return b
                },
                Ia = function(a, b) {
                    for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(null, a[c], c, a)
                },
                Ka = function(a) {
                    if (!a) return !1;
                    var b = !0;
                    return Ia(Ja.prototype, function(c, d) {
                        b && d in a && typeof c == typeof a[d] || (b = !1)
                    }), b
                },
                La = !!window.g,
                Ma = La && window.parent || window,
                Na = function() {
                    if (La && !Fa(Ma)) {
                        for (var a = "." + Ga.domain; 2 < a.split(".").length && !Fa(Ma);) Ga.domain = a = a.substr(a.indexOf(".") + 1), Ma = window.parent;
                        Fa(Ma) || (Ma = window)
                    }
                    return Ma
                },
                Oa = Array.prototype,
                Pa = function(a, b) {
                    if (t(a)) return t(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
                    for (var c = 0; c < a.length; c++)
                        if (c in a && a[c] === b) return c;
                    return -1
                },
                y = function(a, b, c) {
                    for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; d > f; f++) f in e && b.call(c, e[f], f, a)
                },
                Qa = function(a, b, c) {
                    for (var d = a.length, e = [], f = 0, g = t(a) ? a.split("") : a, h = 0; d > h; h++)
                        if (h in g) {
                            var i = g[h];
                            b.call(c, i, h, a) && (e[f++] = i)
                        }
                    return e
                },
                Ra = function(a, b, c) {
                    for (var d = a.length, e = Array(d), f = t(a) ? a.split("") : a, g = 0; d > g; g++) g in f && (e[g] = b.call(c, f[g], g, a));
                    return e
                },
                Sa = function(a, b, c) {
                    for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; d > f; f++)
                        if (f in e && b.call(c, e[f], f, a)) return !0;
                    return !1
                },
                Ua = function(a, b, c) {
                    return b = Ta(a, b, c), 0 > b ? null : t(a) ? a.charAt(b) : a[b]
                },
                Ta = function(a, b, c) {
                    for (var d = a.length, e = t(a) ? a.split("") : a, f = 0; d > f; f++)
                        if (f in e && b.call(c, e[f], f, a)) return f;
                    return -1
                },
                Wa = function() {
                    var a = Va;
                    if (!r(a))
                        for (var b = a.length - 1; b >= 0; b--) delete a[b];
                    a.length = 0
                },
                Xa = function() {
                    return Oa.concat.apply(Oa, arguments)
                },
                Ya = function(a) {
                    var b = a.length;
                    if (b > 0) {
                        for (var c = Array(b), d = 0; b > d; d++) c[d] = a[d];
                        return c
                    }
                    return []
                },
                Za = function(a) {
                    for (var b = 1; b < arguments.length; b++) {
                        var c, d = arguments[b];
                        if (r(d) || (c = ca(d)) && Object.prototype.hasOwnProperty.call(d, "callee")) a.push.apply(a, d);
                        else if (c)
                            for (var e = a.length, f = d.length, g = 0; f > g; g++) a[e + g] = d[g];
                        else a.push(d)
                    }
                },
                $a = function(a, b, c) {
                    return 2 >= arguments.length ? Oa.slice.call(a, b) : Oa.slice.call(a, b, c)
                },
                ab = function() {
                    for (var a = [], b = 0; b < arguments.length; b++) {
                        var c = arguments[b];
                        if (r(c))
                            for (var d = 0; d < c.length; d += 8192)
                                for (var e = ab.apply(null, $a(c, d, d + 8192)), f = 0; f < e.length; f++) a.push(e[f]);
                        else a.push(c)
                    }
                    return a
                },
                Ja = function() {
                    this.b = {};
                    for (var a = 0, b = arguments.length; b > a; ++a) this.b[arguments[a]] = ""
                };
            Ja.prototype.yb = function(a) {
                return this.b.hasOwnProperty(a) ? this.b[a] : ""
            }, Ja.prototype.geil = Ja.prototype.yb;
            var bb = !0,
                cb = {},
                fb = function(a, b, c, d) {
                    var e, f = db,
                        g = bb;
                    try {
                        e = b()
                    } catch (h) {
                        try {
                            var i = Ha(h);
                            b = "", h.fileName && (b = h.fileName);
                            var j = -1;
                            h.lineNumber && (j = h.lineNumber), g = f(a, i, b, j, c)
                        } catch (k) {
                            try {
                                var l = Ha(k);
                                a = "", k.fileName && (a = k.fileName), c = -1, k.lineNumber && (c = k.lineNumber), db("pAR", l, a, c, void 0, void 0)
                            } catch (m) {
                                eb({
                                    context: "mRE",
                                    msg: m.toString() + "\n" + (m.stack || "")
                                }, void 0)
                            }
                        }
                        if (!g) throw h
                    } finally {
                        if (d) try {
                            d()
                        } catch (n) {}
                    }
                    return e
                },
                db = function(a, b, c, d, e, f) {
                    var g = {};
                    if (e) try {
                        e(g)
                    } catch (h) {}
                    return g.context = a, g.msg = b.substring(0, 512), c && (g.file = c), d > 0 && (g.line = d.toString()), g.url = Ga.URL.substring(0, 512), g.ref = Ga.referrer.substring(0, 512), gb(g), eb(g, f), bb
                },
                eb = function(a, b) {
                    try {
                        if (Math.random() < (b || .01)) {
                            var c = "/pagead/gen_204?id=jserror" + hb(a),
                                d = "http" + ("http:" == x.location.protocol ? "" : "s") + "://pagead2.googlesyndication.com" + c,
                                c = d = d.substring(0, 2e3);
                            x.google_image_requests || (x.google_image_requests = []);
                            var e = x.document.createElement("img");
                            e.src = c, x.google_image_requests.push(e)
                        }
                    } catch (f) {}
                },
                gb = function(a) {
                    var b = a || {};
                    Ia(cb, function(a, c) {
                        b[c] = x[a]
                    })
                },
                ib = function(a, b, c, d, e) {
                    return function() {
                        var f = arguments;
                        return fb(a, function() {
                            return b.apply(c, f)
                        }, d, e)
                    }
                },
                jb = function(a, b) {
                    return ib(a, b, void 0, void 0, void 0)
                },
                hb = function(a) {
                    var b = "";
                    return Ia(a, function(a, c) {
                        (0 === a || a) && (b += "&" + c + "=" + ("function" == typeof encodeURIComponent ? encodeURIComponent(a) : escape(a)))
                    }), b
                },
                kb = function(a) {
                    for (var b = a, c = 0; a != a.parent;) a = a.parent, c++, Fa(a) && (b = a);
                    return b
                },
                nb = function(a) {
                    if (this.S = a, z(this, 3, null), z(this, 4, 0), z(this, 5, 0), z(this, 6, 0), z(this, 15, 0), z(this, 7, "C" == Na().google_pstate_rc_expt ? (new Date).getTime() : Math.floor(Math.random() * Math.pow(2, 43))), z(this, 8, {}), z(this, 9, {}), z(this, 10, {}), z(this, 11, []), z(this, 12, 0), z(this, 16, null), a = Na(), lb(a)) {
                        var b;
                        b = a.b || {}, b = this.S[mb(14)] = b, a.b = b
                    } else z(this, 14, {})
                },
                ob = {},
                lb = function(a) {
                    return "E" == a.google_pstate_expt || "EU" == a.google_pstate_expt
                },
                qb = function() {
                    var a = Na();
                    if (lb(a)) {
                        var b;
                        a: {
                            var c, d;
                            try {
                                var e = a.google_pstate;
                                if (c = pb(e)) {
                                    e.C = (e.C || 0) + 1, b = e;
                                    break a
                                }
                            } catch (f) {
                                d = Ha(f)
                            }
                            eb({
                                context: "ps::eg",
                                msg: d,
                                L: p(c) ? c ? 1 : 0 : 2,
                                url: a.location.href
                            }, 1), b = a.google_pstate = new nb({})
                        }
                        return b
                    }
                    return b = La ? "google_persistent_state_async" : "google_persistent_state", ob[b] ? ob[b] : (c = "google_persistent_state_async" == b ? {} : a, d = a[b], pb(d) ? ob[b] = d : a[b] = ob[b] = new nb(c))
                },
                pb = function(a) {
                    return "object" == typeof a && "object" == typeof a.S
                },
                mb = function(a) {
                    switch (a) {
                        case 3:
                            return "google_exp_persistent";
                        case 4:
                            return "google_num_sdo_slots";
                        case 5:
                            return "google_num_0ad_slots";
                        case 6:
                            return "google_num_ad_slots";
                        case 7:
                            return "google_correlator";
                        case 8:
                            return "google_prev_ad_formats_by_region";
                        case 9:
                            return "google_prev_ad_slotnames_by_region";
                        case 10:
                            return "google_num_slots_by_channel";
                        case 11:
                            return "google_viewed_host_channels";
                        case 12:
                            return "google_num_slot_to_show";
                        case 14:
                            return "gaGlobal";
                        case 15:
                            return "google_num_reactive_ad_slots";
                        case 16:
                            return "google_persistent_language"
                    }
                    throw Error("unexpected state")
                },
                z = function(a, b, c) {
                    a = a.S, b = mb(b), void 0 === a[b] && (a[b] = c)
                },
                rb, sb = function() {
                    if (rb) return !0;
                    var a;
                    a = qb();
                    var b = mb(3);
                    return (a = a.S[b]) && a && ("object" == typeof a || "function" == typeof a) && Ka(a) ? (rb = a, !0) : !1
                },
                ub = "StopIteration" in l ? l.StopIteration : Error("StopIteration"),
                vb = function() {};
            vb.prototype.next = function() {
                throw ub
            }, vb.prototype.wa = function() {
                return this
            };
            var wb = function(a) {
                    if (a instanceof vb) return a;
                    if ("function" == typeof a.wa) return a.wa(!1);
                    if (ca(a)) {
                        var b = 0,
                            c = new vb;
                        return c.next = function() {
                            for (;;) {
                                if (b >= a.length) throw ub;
                                if (b in a) return a[b++];
                                b++
                            }
                        }, c
                    }
                    throw Error("Not implemented")
                },
                xb = function(a, b, c) {
                    if (ca(a)) try {
                        y(a, b, c)
                    } catch (d) {
                        if (d !== ub) throw d
                    } else {
                        a = wb(a);
                        try {
                            for (;;) b.call(c, a.next(), void 0, a)
                        } catch (e) {
                            if (e !== ub) throw e
                        }
                    }
                },
                yb = function(a, b, c) {
                    for (var d in a) b.call(c, a[d], d, a)
                },
                Ab = function(a) {
                    var b, c = zb;
                    for (b in c)
                        if (a.call(void 0, c[b], b, c)) return !0;
                    return !1
                },
                Bb = function(a) {
                    var b, c = [],
                        d = 0;
                    for (b in a) c[d++] = a[b];
                    return c
                },
                Cb = function(a) {
                    var b, c = [],
                        d = 0;
                    for (b in a) c[d++] = b;
                    return c
                },
                Eb = function(a) {
                    var b, c = Db;
                    for (b in c)
                        if (a.call(void 0, c[b], b, c)) return b
                },
                Fb = function(a) {
                    var b, c = {};
                    for (b in a) c[b] = a[b];
                    return c
                },
                Gb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
                Hb = function(a) {
                    for (var b, c, d = 1; d < arguments.length; d++) {
                        c = arguments[d];
                        for (b in c) a[b] = c[b];
                        for (var e = 0; e < Gb.length; e++) b = Gb[e], Object.prototype.hasOwnProperty.call(c, b) && (a[b] = c[b])
                    }
                },
                A = function(a) {
                    this.g = {}, this.b = [], this.j = this.h = 0;
                    var b = arguments.length;
                    if (b > 1) {
                        if (b % 2) throw Error("Uneven number of arguments");
                        for (var c = 0; b > c; c += 2) Ib(this, arguments[c], arguments[c + 1])
                    } else if (a) {
                        a instanceof A ? (b = a.ka(), c = a.ba()) : (b = Cb(a), c = Bb(a));
                        for (var d = 0; d < b.length; d++) Ib(this, b[d], c[d])
                    }
                };
            g = A.prototype, g.ga = function() {
                return this.h
            }, g.ba = function() {
                Jb(this);
                for (var a = [], b = 0; b < this.b.length; b++) a.push(this.g[this.b[b]]);
                return a
            }, g.ka = function() {
                return Jb(this), this.b.concat()
            }, g.isEmpty = function() {
                return 0 == this.h
            }, g.clear = function() {
                this.g = {}, this.j = this.h = this.b.length = 0
            };
            var Lb = function(a, b) {
                    Kb(a.g, b) && (delete a.g[b], a.h--, a.j++, a.b.length > 2 * a.h && Jb(a))
                },
                Jb = function(a) {
                    if (a.h != a.b.length) {
                        for (var b = 0, c = 0; b < a.b.length;) {
                            var d = a.b[b];
                            Kb(a.g, d) && (a.b[c++] = d), b++
                        }
                        a.b.length = c
                    }
                    if (a.h != a.b.length) {
                        for (var e = {}, c = b = 0; b < a.b.length;) d = a.b[b], Kb(e, d) || (a.b[c++] = d, e[d] = 1), b++;
                        a.b.length = c
                    }
                };
            A.prototype.get = function(a, b) {
                return Kb(this.g, a) ? this.g[a] : b
            };
            var Ib = function(a, b, c) {
                Kb(a.g, b) || (a.h++, a.b.push(b), a.j++), a.g[b] = c
            };
            A.prototype.forEach = function(a, b) {
                for (var c = this.ka(), d = 0; d < c.length; d++) {
                    var e = c[d],
                        f = this.get(e);
                    a.call(b, f, e, this)
                }
            }, A.prototype.clone = function() {
                return new A(this)
            }, A.prototype.wa = function(a) {
                Jb(this);
                var b = 0,
                    c = this.b,
                    d = this.g,
                    e = this.j,
                    f = this,
                    g = new vb;
                return g.next = function() {
                    for (;;) {
                        if (e != f.j) throw Error("The map has changed since the iterator was created");
                        if (b >= c.length) throw ub;
                        var g = c[b++];
                        return a ? g : d[g]
                    }
                }, g
            };
            var Kb = function(a, b) {
                    return Object.prototype.hasOwnProperty.call(a, b)
                },
                B;
            a: {
                var Mb = l.navigator;
                if (Mb) {
                    var Nb = Mb.userAgent;
                    if (Nb) {
                        B = Nb;
                        break a
                    }
                }
                B = ""
            }
            var D = function(a) {
                    return -1 != B.indexOf(a)
                },
                Ob, Pb, Qb = D("Opera") || D("OPR"),
                E = D("Trident") || D("MSIE"),
                Rb = D("Gecko") && !w(B, "WebKit") && !(D("Trident") || D("MSIE")),
                Sb = w(B, "WebKit"),
                Tb = B;
            Ob = !!Tb && -1 != Tb.indexOf("Android"), Pb = !!Tb && -1 != Tb.indexOf("iPhone");
            var Ub = !!Tb && -1 != Tb.indexOf("iPad"),
                Vb = function() {
                    var a = l.document;
                    return a ? a.documentMode : void 0
                },
                Wb = function() {
                    var a, b = "";
                    return Qb && l.opera ? (b = l.opera.version, ea(b) ? b() : b) : (Rb ? a = /rv\:([^\);]+)(\)|;)/ : E ? a = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Sb && (a = /WebKit\/(\S+)/), a && (b = (b = a.exec(B)) ? b[1] : ""), E && (a = Vb(), a > parseFloat(b)) ? String(a) : b)
                }(),
                Xb = {},
                G = function(a) {
                    return Xb[a] || (Xb[a] = 0 <= ya(Wb, a))
                },
                Yb = l.document,
                Zb = Yb && E ? Vb() || ("CSS1Compat" == Yb.compatMode ? parseInt(Wb, 10) : 5) : void 0,
                $b = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/,
                bc = function(a) {
                    if (ac) {
                        ac = !1;
                        var b = l.location;
                        if (b) {
                            var c = b.href;
                            if (c && (c = (c = bc(c)[3] || null) ? decodeURI(c) : c) && c != b.hostname) throw ac = !0, Error()
                        }
                    }
                    return a.match($b)
                },
                ac = Sb,
                cc = /#|$/,
                dc = function(a, b) {
                    var c;
                    a instanceof dc ? (this.fa = p(b) ? b : a.fa, ec(this, a.ea), this.Fa = a.Fa, this.aa = a.aa, fc(this, a.Ea), this.ua = a.ua, gc(this, a.b.clone()), this.Da = a.Da) : a && (c = bc(String(a))) ? (this.fa = !!b, ec(this, c[1] || "", !0), this.Fa = hc(c[2] || ""), this.aa = hc(c[3] || "", !0), fc(this, c[4]), this.ua = hc(c[5] || "", !0), gc(this, c[6] || "", !0), this.Da = hc(c[7] || "")) : (this.fa = !!b, this.b = new ic(null, 0, this.fa))
                };
            g = dc.prototype, g.ea = "", g.Fa = "", g.aa = "", g.Ea = null, g.ua = "", g.Da = "", g.fa = !1, g.toString = function() {
                var a = [],
                    b = this.ea;
                if (b && a.push(jc(b, kc, !0), ":"), b = this.aa) {
                    a.push("//");
                    var c = this.Fa;
                    c && a.push(jc(c, kc, !0), "@"), a.push(encodeURIComponent(String(b)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), b = this.Ea, null != b && a.push(":", String(b))
                }
                return (b = this.ua) && (this.aa && "/" != b.charAt(0) && a.push("/"), a.push(jc(b, "/" == b.charAt(0) ? lc : mc, !0))), (b = this.b.toString()) && a.push("?", b), (b = this.Da) && a.push("#", jc(b, nc)), a.join("")
            }, g.clone = function() {
                return new dc(this)
            };
            var ec = function(a, b, c) {
                    a.ea = c ? hc(b, !0) : b, a.ea && (a.ea = a.ea.replace(/:$/, ""))
                },
                oc = function(a) {
                    return a.aa
                },
                fc = function(a, b) {
                    if (b) {
                        if (b = Number(b), isNaN(b) || 0 > b) throw Error("Bad port number " + b);
                        a.Ea = b
                    } else a.Ea = null
                },
                gc = function(a, b, c) {
                    b instanceof ic ? (a.b = b, pc(a.b, a.fa)) : (c || (b = jc(b, qc)), a.b = new ic(b, 0, a.fa))
                },
                hc = function(a, b) {
                    return a ? b ? decodeURI(a) : decodeURIComponent(a) : ""
                },
                jc = function(a, b, c) {
                    return t(a) ? (a = encodeURI(a).replace(b, rc), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
                },
                rc = function(a) {
                    return a = a.charCodeAt(0), "%" + (a >> 4 & 15).toString(16) + (15 & a).toString(16)
                },
                kc = /[#\/\?@]/g,
                mc = /[\#\?:]/g,
                lc = /[\#\?]/g,
                qc = /[\#\?@]/g,
                nc = /#/g,
                ic = function(a, b, c) {
                    this.h = a || null, this.j = !!c
                },
                tc = function(a) {
                    if (!a.b && (a.b = new A, a.g = 0, a.h))
                        for (var b = a.h.split("&"), c = 0; c < b.length; c++) {
                            var d = b[c].indexOf("="),
                                e = null,
                                f = null;
                            d >= 0 ? (e = b[c].substring(0, d), f = b[c].substring(d + 1)) : e = b[c], e = decodeURIComponent(e.replace(/\+/g, " ")), e = sc(a, e), d = a, f = f ? decodeURIComponent(f.replace(/\+/g, " ")) : "", tc(d), d.h = null;
                            var e = sc(d, e),
                                g = d.b.get(e);
                            g || Ib(d.b, e, g = []), g.push(f), d.g++
                        }
                };
            ic.prototype.b = null, ic.prototype.g = null, ic.prototype.ga = function() {
                return tc(this), this.g
            };
            var uc = function(a, b) {
                tc(a), b = sc(a, b), Kb(a.b.g, b) && (a.h = null, a.g -= a.b.get(b).length, Lb(a.b, b))
            };
            ic.prototype.clear = function() {
                this.b = this.h = null, this.g = 0
            }, ic.prototype.isEmpty = function() {
                return tc(this), 0 == this.g
            };
            var vc = function(a, b) {
                return tc(a), b = sc(a, b), Kb(a.b.g, b)
            };
            g = ic.prototype, g.ka = function() {
                tc(this);
                for (var a = this.b.ba(), b = this.b.ka(), c = [], d = 0; d < b.length; d++)
                    for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
                return c
            }, g.ba = function(a) {
                tc(this);
                var b = [];
                if (t(a)) vc(this, a) && (b = Xa(b, this.b.get(sc(this, a))));
                else {
                    a = this.b.ba();
                    for (var c = 0; c < a.length; c++) b = Xa(b, a[c])
                }
                return b
            }, g.get = function(a, b) {
                var c = a ? this.ba(a) : [];
                return 0 < c.length ? String(c[0]) : b
            }, g.toString = function() {
                if (this.h) return this.h;
                if (!this.b) return "";
                for (var a = [], b = this.b.ka(), c = 0; c < b.length; c++)
                    for (var d = b[c], e = encodeURIComponent(String(d)), d = this.ba(d), f = 0; f < d.length; f++) {
                        var g = e;
                        "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f]))), a.push(g)
                    }
                return this.h = a.join("&")
            }, g.clone = function() {
                var a = new ic;
                return a.h = this.h, this.b && (a.b = this.b.clone(), a.g = this.g), a
            };
            var sc = function(a, b) {
                    var c = String(b);
                    return a.j && (c = c.toLowerCase()), c
                },
                pc = function(a, b) {
                    b && !a.j && (tc(a), a.h = null, a.b.forEach(function(a, b) {
                        var c = b.toLowerCase();
                        b != c && (uc(this, b), uc(this, c), 0 < a.length && (this.h = null, Ib(this.b, sc(this, c), Ya(a)), this.g += a.length))
                    }, a)), a.j = b
                },
                wc = function(a) {
                    var b;
                    if (sb()) b = rb;
                    else {
                        b = qb();
                        var c = new Ja(2, 1, 3, 4, 7, 10, 12, 13, 14, 16, 17, 19, 20, 23, 24, 26, 29);
                        b = rb = b.S[mb(3)] = c
                    }
                    return b = b.yb(10), "317150305" == b || "317150306" == b ? null : (b = Na().h) && (c = b[3], a && (c = b[4]), c) ? c + "" : null
                },
                H = function(a, b, c) {
                    this.j = b, this.b = c, this.h = a
                };
            g = H.prototype, g.Qa = function() {
                return this.g
            }, g.Ab = function() {
                return this.j
            }, g.zb = function() {
                return this.b
            }, g.qc = function() {
                return 1e3 > this.b ? this.b : 900
            }, g.rc = function() {
                return this.h
            }, g.toString = function() {
                return "AdError " + this.zb() + ": " + this.Ab() + (null != this.Qa() ? " Caused by: " + this.Qa() : "")
            };
            var yc = function() {
                this.O = this.O, this.o = this.o
            };
            yc.prototype.O = !1, yc.prototype.G = function() {
                this.O || (this.O = !0, this.B())
            };
            var zc = function(a, b) {
                a.o || (a.o = []), a.o.push(p(void 0) ? u(b, void 0) : b)
            };
            yc.prototype.B = function() {
                if (this.o)
                    for (; this.o.length;) this.o.shift()()
            };
            var Ac = function(a) {
                    a && "function" == typeof a.G && a.G()
                },
                I = function(a, b) {
                    this.type = a, this.b = this.target = b, this.wb = !0
                };
            I.prototype.G = function() {}, I.prototype.preventDefault = function() {
                this.wb = !1
            };
            var Bc = function(a, b) {
                I.call(this, "adError"), this.g = a, this.h = b ? b : null
            };
            v(Bc, I), Bc.prototype.j = function() {
                return this.g
            }, Bc.prototype.k = function() {
                return this.h
            };
            var J = function() {
                    this.h = "always", this.k = 4, this.b = !1, this.g = !0, this.o = !1, this.j = "en"
                },
                Cc = "af am ar bg bn ca cs da de el en en_gb es es_419 et eu fa fi fil fr fr_ca gl gu he hi hr hu id in is it iw ja kn ko lt lv ml mr ms nb nl no pl pt_br pt_pt ro ru sk sl sr sv sw ta te th tr uk ur vi zh_cn zh_hk zh_tw zu".split(" ");
            g = J.prototype, g.cd = function(a) {
                this.h = a
            }, g.Ya = function() {
                return this.h
            }, g.dd = function(a) {
                this.k = a
            }, g.Za = function() {
                return this.k
            }, g.ed = function(a) {
                this.l = a
            }, g.$a = function() {
                return this.l
            }, g.od = function(a) {
                this.b = a
            }, g.bd = function(a) {
                this.g = a
            }, g.ab = function() {
                return this.g
            }, g.nd = function(a) {
                this.o = a
            }, g.ta = function() {
                return this.o
            }, g.md = function(a) {
                if (null != a) {
                    if (a = a.toLowerCase().replace("-", "_"), !(0 <= Pa(Cc, a) || (a = (a = a.match(/^\w{2,3}([-_]|$)/)) ? a[0].replace(/[_-]/g, "") : "", 0 <= Pa(Cc, a)))) return;
                    this.j = a
                }
            }, g.Wa = function() {
                return this.j
            };
            var Dc = new J,
                Db = {
                    Cb: "start",
                    FIRST_QUARTILE: "firstquartile",
                    MIDPOINT: "midpoint",
                    THIRD_QUARTILE: "thirdquartile",
                    COMPLETE: "complete",
                    jc: "metric",
                    Bb: "pause",
                    lc: "resume",
                    SKIPPED: "skip",
                    nc: "viewable_impression",
                    kc: "mute",
                    mc: "unmute",
                    FULLSCREEN: "fullscreen",
                    ic: "exitfullscreen"
                },
                Ec = {
                    Qd: -1,
                    Cb: 0,
                    FIRST_QUARTILE: 1,
                    MIDPOINT: 2,
                    THIRD_QUARTILE: 3,
                    COMPLETE: 4,
                    jc: 5,
                    Bb: 6,
                    lc: 7,
                    SKIPPED: 8,
                    nc: 9,
                    kc: 10,
                    mc: 11,
                    FULLSCREEN: 12,
                    ic: 13
                },
                K = function(a, b) {
                    this.x = p(a) ? a : 0, this.y = p(b) ? b : 0
                };
            K.prototype.clone = function() {
                return new K(this.x, this.y)
            }, K.prototype.floor = function() {
                return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
            }, K.prototype.round = function() {
                return this.x = Math.round(this.x), this.y = Math.round(this.y), this
            }, K.prototype.scale = function(a, b) {
                var c = da(b) ? b : a;
                return this.x *= a, this.y *= c, this
            };
            var L = function(a, b) {
                this.width = a, this.height = b
            };
            g = L.prototype, g.clone = function() {
                return new L(this.width, this.height)
            }, g.isEmpty = function() {
                return !(this.width * this.height)
            }, g.floor = function() {
                return this.width = Math.floor(this.width), this.height = Math.floor(this.height), this
            }, g.round = function() {
                return this.width = Math.round(this.width), this.height = Math.round(this.height), this
            }, g.scale = function(a, b) {
                var c = da(b) ? b : a;
                return this.width *= a, this.height *= c, this
            };
            var Fc = !E || E && Zb >= 9;
            !Rb && !E || E && E && Zb >= 9 || Rb && G("1.9.1"), E && G("9");
            var Ic = function(a) {
                    return a ? new Gc(Hc(a)) : ka || (ka = new Gc)
                },
                Jc = function() {
                    var a = document;
                    return a.querySelectorAll && a.querySelector ? a.querySelectorAll("SCRIPT") : a.getElementsByTagName("SCRIPT")
                },
                Lc = function(a, b) {
                    yb(b, function(b, c) {
                        "style" == c ? a.style.cssText = b : "class" == c ? a.className = b : "for" == c ? a.htmlFor = b : c in Kc ? a.setAttribute(Kc[c], b) : 0 == c.lastIndexOf("aria-", 0) || 0 == c.lastIndexOf("data-", 0) ? a.setAttribute(c, b) : a[c] = b
                    })
                },
                Kc = {
                    cellpadding: "cellPadding",
                    cellspacing: "cellSpacing",
                    colspan: "colSpan",
                    frameborder: "frameBorder",
                    height: "height",
                    maxlength: "maxLength",
                    role: "role",
                    rowspan: "rowSpan",
                    type: "type",
                    usemap: "useMap",
                    valign: "vAlign",
                    width: "width"
                },
                Mc = function(a) {
                    var b = Sb || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
                    return a = a.parentWindow || a.defaultView, E && G("10") && a.pageYOffset != b.scrollTop ? new K(b.scrollLeft, b.scrollTop) : new K(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
                },
                M = function(a) {
                    return a ? a.parentWindow || a.defaultView : window
                },
                Oc = function() {
                    var a = arguments,
                        b = document,
                        c = a[0],
                        d = a[1];
                    if (!Fc && d && (d.name || d.type)) {
                        if (c = ["<", c], d.name && c.push(' name="', ua(d.name), '"'), d.type) {
                            c.push(' type="', ua(d.type), '"');
                            var e = {};
                            Hb(e, d), delete e.type, d = e
                        }
                        c.push(">"), c = c.join("")
                    }
                    return c = b.createElement(c), d && (t(d) ? c.className = d : r(d) ? c.className = d.join(" ") : Lc(c, d)), 2 < a.length && Nc(b, c, a), c
                },
                Nc = function(a, b, c) {
                    function d(c) {
                        c && b.appendChild(t(c) ? a.createTextNode(c) : c)
                    }
                    for (var e = 2; e < c.length; e++) {
                        var f = c[e];
                        !ca(f) || fa(f) && 0 < f.nodeType ? d(f) : y(Pc(f) ? Ya(f) : f, d)
                    }
                },
                Qc = function(a) {
                    a && a.parentNode && a.parentNode.removeChild(a)
                },
                Rc = function(a, b) {
                    if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
                    if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(16 & a.compareDocumentPosition(b));
                    for (; b && a != b;) b = b.parentNode;
                    return b == a
                },
                Hc = function(a) {
                    return 9 == a.nodeType ? a : a.ownerDocument || a.document
                },
                Sc = function(a) {
                    return a.contentWindow || M(a.contentDocument || a.contentWindow.document)
                },
                Pc = function(a) {
                    if (a && "number" == typeof a.length) {
                        if (fa(a)) return "function" == typeof a.item || "string" == typeof a.item;
                        if (ea(a)) return "function" == typeof a.item
                    }
                    return !1
                },
                Gc = function(a) {
                    this.b = a || l.document || document
                },
                Tc = function(a) {
                    return Mc(a.b)
                };
            Gc.prototype.appendChild = function(a, b) {
                a.appendChild(b)
            }, Gc.prototype.contains = Rc;
            var Uc = function(a, b, c, d) {
                this.top = a, this.right = b, this.bottom = c, this.left = d
            };
            g = Uc.prototype, g.clone = function() {
                return new Uc(this.top, this.right, this.bottom, this.left)
            }, g.contains = function(a) {
                return this && a ? a instanceof Uc ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
            }, g.floor = function() {
                return this.top = Math.floor(this.top), this.right = Math.floor(this.right), this.bottom = Math.floor(this.bottom), this.left = Math.floor(this.left), this
            }, g.round = function() {
                return this.top = Math.round(this.top), this.right = Math.round(this.right), this.bottom = Math.round(this.bottom), this.left = Math.round(this.left), this
            }, g.scale = function(a, b) {
                var c = da(b) ? b : a;
                return this.left *= a, this.right *= a, this.top *= c, this.bottom *= c, this
            };
            var Vc = function(a, b) {
                    var c;
                    return c = Hc(a), c = c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null)) ? c[b] || c.getPropertyValue(b) || "" : "",
                        c || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
                },
                Wc = function(a) {
                    var b;
                    try {
                        b = a.getBoundingClientRect()
                    } catch (c) {
                        return {
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0
                        }
                    }
                    return E && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop), b
                },
                Xc = function(a) {
                    if (E && !(E && Zb >= 8)) return a.offsetParent;
                    var b = Hc(a),
                        c = Vc(a, "position"),
                        d = "fixed" == c || "absolute" == c;
                    for (a = a.parentNode; a && a != b; a = a.parentNode)
                        if (c = Vc(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
                    return null
                },
                Yc = function(a) {
                    var b, c, d = Hc(a),
                        e = Vc(a, "position"),
                        f = Rb && d.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == e && (b = d.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY),
                        g = new K(0, 0);
                    if (b = d ? Hc(d) : document, (c = !E || E && Zb >= 9) || (c = "CSS1Compat" == Ic(b).b.compatMode), c = c ? b.documentElement : b.body, a == c) return g;
                    if (a.getBoundingClientRect) b = Wc(a), a = Tc(Ic(d)), g.x = b.left + a.x, g.y = b.top + a.y;
                    else if (d.getBoxObjectFor && !f) b = d.getBoxObjectFor(a), a = d.getBoxObjectFor(c), g.x = b.screenX - a.screenX, g.y = b.screenY - a.screenY;
                    else {
                        b = a;
                        do {
                            if (g.x += b.offsetLeft, g.y += b.offsetTop, b != a && (g.x += b.clientLeft || 0, g.y += b.clientTop || 0), Sb && "fixed" == Vc(b, "position")) {
                                g.x += d.body.scrollLeft, g.y += d.body.scrollTop;
                                break
                            }
                            b = b.offsetParent
                        } while (b && b != a);
                        for ((Qb || Sb && "absolute" == e) && (g.y -= d.body.offsetTop), b = a;
                            (b = Xc(b)) && b != d.body && b != c;) g.x -= b.scrollLeft, Qb && "TR" == b.tagName || (g.y -= b.scrollTop)
                    }
                    return g
                },
                Zc = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/,
                $c = !E || E && Zb >= 9,
                ad = E && !G("9");
            !Sb || G("528"), Rb && G("1.9b") || E && G("8") || Qb && G("9.5") || Sb && G("528"), Rb && !G("8") || E && G("9");
            var bd = function(a, b) {
                if (I.call(this, a ? a.type : ""), this.b = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.g = this.state = null, a) {
                    this.type = a.type, this.target = a.target || a.srcElement, this.b = b;
                    var c = a.relatedTarget;
                    c && Rb && Ea(c, "nodeName"), this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0, this.button = a.button, this.ctrlKey = a.ctrlKey, this.altKey = a.altKey, this.shiftKey = a.shiftKey, this.metaKey = a.metaKey, this.state = a.state, this.g = a, a.defaultPrevented && this.preventDefault()
                }
            };
            v(bd, I), bd.prototype.preventDefault = function() {
                bd.T.preventDefault.call(this);
                var a = this.g;
                if (a.preventDefault) a.preventDefault();
                else if (a.returnValue = !1, ad) try {
                    (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) && (a.keyCode = -1)
                } catch (b) {}
            };
            var cd = "closure_listenable_" + (1e6 * Math.random() | 0),
                fd = function(a) {
                    return !(!a || !a[cd])
                },
                gd = 0,
                hd = function(a, b, c, d, e) {
                    this.listener = a, this.b = null, this.src = b, this.type = c, this.Aa = !!d, this.Ga = e, this.Pa = ++gd, this.ma = this.Ba = !1
                },
                id = function(a) {
                    a.ma = !0, a.listener = null, a.b = null, a.src = null, a.Ga = null
                },
                jd = function(a) {
                    this.src = a, this.b = {}, this.g = 0
                },
                ld = function(a, b, c, d, e, f) {
                    var g = b.toString();
                    b = a.b[g], b || (b = a.b[g] = [], a.g++);
                    var h = kd(b, c, e, f);
                    return h > -1 ? (a = b[h], d || (a.Ba = !1)) : (a = new hd(c, a.src, g, !!e, f), a.Ba = d, b.push(a)), a
                },
                md = function(a, b) {
                    var c = b.type;
                    if (!(c in a.b)) return !1;
                    var d, e = a.b[c],
                        f = Pa(e, b);
                    return (d = f >= 0) && Oa.splice.call(e, f, 1), d && (id(b), 0 == a.b[c].length && (delete a.b[c], a.g--)), d
                },
                nd = function(a, b, c, d, e) {
                    return a = a.b[b.toString()], b = -1, a && (b = kd(a, c, d, e)), b > -1 ? a[b] : null
                },
                kd = function(a, b, c, d) {
                    for (var e = 0; e < a.length; ++e) {
                        var f = a[e];
                        if (!f.ma && f.listener == b && f.Aa == !!c && f.Ga == d) return e
                    }
                    return -1
                },
                od = "closure_lm_" + (1e6 * Math.random() | 0),
                pd = {},
                qd = 0,
                rd = function(a, b, c, d, e) {
                    if (r(b)) {
                        for (var f = 0; f < b.length; f++) rd(a, b[f], c, d, e);
                        return null
                    }
                    return c = sd(c), fd(a) ? a.r(b, c, d, e) : td(a, b, c, !1, d, e)
                },
                td = function(a, b, c, d, e, f) {
                    if (!b) throw Error("Invalid event type");
                    var g = !!e,
                        h = ud(a);
                    return h || (a[od] = h = new jd(a)), c = ld(h, b, c, d, e, f), c.b ? c : (d = vd(), c.b = d, d.src = a, d.listener = c, a.addEventListener ? a.addEventListener(b.toString(), d, g) : a.attachEvent(wd(b.toString()), d), qd++, c)
                },
                vd = function() {
                    var a = xd,
                        b = $c ? function(c) {
                            return a.call(b.src, b.listener, c)
                        } : function(c) {
                            return c = a.call(b.src, b.listener, c), c ? void 0 : c
                        };
                    return b
                },
                yd = function(a, b, c, d, e) {
                    if (r(b)) {
                        for (var f = 0; f < b.length; f++) yd(a, b[f], c, d, e);
                        return null
                    }
                    return c = sd(c), fd(a) ? ld(a.X, String(b), c, !0, d, e) : td(a, b, c, !0, d, e)
                },
                zd = function(a, b, c, d, e) {
                    if (r(b))
                        for (var f = 0; f < b.length; f++) zd(a, b[f], c, d, e);
                    else c = sd(c), fd(a) ? a.Ca(b, c, d, e) : a && (a = ud(a)) && (b = nd(a, b, c, !!d, e)) && Ad(b)
                },
                Ad = function(a) {
                    if (da(a) || !a || a.ma) return !1;
                    var b = a.src;
                    if (fd(b)) return md(b.X, a);
                    var c = a.type,
                        d = a.b;
                    return b.removeEventListener ? b.removeEventListener(c, d, a.Aa) : b.detachEvent && b.detachEvent(wd(c), d), qd--, (c = ud(b)) ? (md(c, a), 0 == c.g && (c.src = null, b[od] = null)) : id(a), !0
                },
                wd = function(a) {
                    return a in pd ? pd[a] : pd[a] = "on" + a
                },
                Cd = function(a, b, c, d) {
                    var e = 1;
                    if ((a = ud(a)) && (b = a.b[b.toString()]))
                        for (b = b.concat(), a = 0; a < b.length; a++) {
                            var f = b[a];
                            f && f.Aa == c && !f.ma && (e &= !1 !== Bd(f, d))
                        }
                    return Boolean(e)
                },
                Bd = function(a, b) {
                    var c = a.listener,
                        d = a.Ga || a.src;
                    return a.Ba && Ad(a), c.call(d, b)
                },
                xd = function(a, b) {
                    if (a.ma) return !0;
                    if (!$c) {
                        var c = b || aa("window.event"),
                            d = new bd(c, this),
                            e = !0;
                        if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                            a: {
                                var f = !1;
                                if (0 == c.keyCode) try {
                                    c.keyCode = -1;
                                    break a
                                } catch (g) {
                                    f = !0
                                }(f || void 0 == c.returnValue) && (c.returnValue = !0)
                            }
                            for (c = [], f = d.b; f; f = f.parentNode) c.push(f);
                            for (var f = a.type, h = c.length - 1; h >= 0; h--) d.b = c[h],
                            e &= Cd(c[h], f, !0, d);
                            for (h = 0; h < c.length; h++) d.b = c[h],
                            e &= Cd(c[h], f, !1, d)
                        }
                        return e
                    }
                    return Bd(a, new bd(b, this))
                },
                ud = function(a) {
                    return a = a[od], a instanceof jd ? a : null
                },
                Dd = "__closure_events_fn_" + (1e9 * Math.random() >>> 0),
                sd = function(a) {
                    return ea(a) ? a : (a[Dd] || (a[Dd] = function(b) {
                        return a.handleEvent(b)
                    }), a[Dd])
                },
                N = function() {
                    yc.call(this), this.X = new jd(this), this.pa = this, this.$ = null
                };
            v(N, yc), N.prototype[cd] = !0, g = N.prototype, g.addEventListener = function(a, b, c, d) {
                rd(this, a, b, c, d)
            }, g.removeEventListener = function(a, b, c, d) {
                zd(this, a, b, c, d)
            }, g.dispatchEvent = function(a) {
                var b, c = this.$;
                if (c)
                    for (b = []; c; c = c.$) b.push(c);
                var c = this.pa,
                    d = a.type || a;
                if (t(a)) a = new I(a, c);
                else if (a instanceof I) a.target = a.target || c;
                else {
                    var e = a;
                    a = new I(d, c), Hb(a, e)
                }
                var f, e = !0;
                if (b)
                    for (var g = b.length - 1; g >= 0; g--) f = a.b = b[g], e = Ed(f, d, !0, a) && e;
                if (f = a.b = c, e = Ed(f, d, !0, a) && e, e = Ed(f, d, !1, a) && e, b)
                    for (g = 0; g < b.length; g++) f = a.b = b[g], e = Ed(f, d, !1, a) && e;
                return e
            }, g.B = function() {
                if (N.T.B.call(this), this.X) {
                    var a, b = this.X,
                        c = 0;
                    for (a in b.b) {
                        for (var d = b.b[a], e = 0; e < d.length; e++) ++c, id(d[e]);
                        delete b.b[a], b.g--
                    }
                }
                this.$ = null
            }, g.r = function(a, b, c, d) {
                return ld(this.X, String(a), b, !1, c, d)
            }, g.Ca = function(a, b, c, d) {
                var e;
                if (e = this.X, a = String(a).toString(), a in e.b) {
                    var f = e.b[a];
                    b = kd(f, b, c, d), b > -1 ? (id(f[b]), Oa.splice.call(f, b, 1), 0 == f.length && (delete e.b[a], e.g--), e = !0) : e = !1
                } else e = !1;
                return e
            };
            var Ed = function(a, b, c, d) {
                    if (b = a.X.b[String(b)], !b) return !0;
                    b = b.concat();
                    for (var e = !0, f = 0; f < b.length; ++f) {
                        var g = b[f];
                        if (g && !g.ma && g.Aa == c) {
                            var h = g.listener,
                                i = g.Ga || g.src;
                            g.Ba && md(a.X, g), e = !1 !== h.call(i, d) && e
                        }
                    }
                    return e && 0 != d.wb
                },
                O = function(a, b) {
                    N.call(this), this.h = a || 1, this.g = b || l, this.k = u(this.m, this), this.l = ja()
                };
            v(O, N), O.prototype.j = !1, O.prototype.b = null, O.prototype.m = function() {
                if (this.j) {
                    var a = ja() - this.l;
                    a > 0 && a < .8 * this.h ? this.b = this.g.setTimeout(this.k, this.h - a) : (this.b && (this.g.clearTimeout(this.b), this.b = null), this.dispatchEvent("tick"), this.j && (this.b = this.g.setTimeout(this.k, this.h), this.l = ja()))
                }
            }, O.prototype.start = function() {
                this.j = !0, this.b || (this.b = this.g.setTimeout(this.k, this.h), this.l = ja())
            };
            var Fd = function(a) {
                a.j = !1, a.b && (a.g.clearTimeout(a.b), a.b = null)
            };
            O.prototype.B = function() {
                O.T.B.call(this), Fd(this), delete this.g
            };
            var Gd = function(a, b, c) {
                    if (ea(a)) c && (a = u(a, c));
                    else {
                        if (!a || "function" != typeof a.handleEvent) throw Error("Invalid listener argument");
                        a = u(a.handleEvent, a)
                    }
                    return b > 2147483647 ? -1 : l.setTimeout(a, b || 0)
                },
                Hd = !1,
                Id = function(a) {
                    (a = a.match(/[\d]+/g)) && (a.length = 3)
                };
            if (navigator.plugins && navigator.plugins.length) {
                var Jd = navigator.plugins["Shockwave Flash"];
                Jd && (Hd = !0, Jd.description && Id(Jd.description)), navigator.plugins["Shockwave Flash 2.0"] && (Hd = !0)
            } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
                var Kd = navigator.mimeTypes["application/x-shockwave-flash"];
                (Hd = Kd && Kd.enabledPlugin) && Id(Kd.enabledPlugin.description)
            } else try {
                var Ld = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
                    Hd = !0;
                Id(Ld.GetVariable("$version"))
            } catch (Md) {
                try {
                    Ld = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"), Hd = !0
                } catch (Nd) {
                    try {
                        Ld = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), Hd = !0, Id(Ld.GetVariable("$version"))
                    } catch (Od) {}
                }
            }
            var Pd = Hd,
                Qd, Rd, Sd, Td, Ud, Vd, Wd;
            Wd = Vd = Ud = Td = Sd = Rd = Qd = !1;
            var Xd = B;
            Xd && (-1 != Xd.indexOf("Firefox") ? Qd = !0 : -1 != Xd.indexOf("Camino") ? Rd = !0 : -1 != Xd.indexOf("iPhone") || -1 != Xd.indexOf("iPod") ? Sd = !0 : -1 != Xd.indexOf("iPad") ? Td = !0 : -1 != Xd.indexOf("Chrome") ? Vd = !0 : -1 != Xd.indexOf("Android") ? Ud = !0 : -1 != Xd.indexOf("Safari") && (Wd = !0));
            var Yd = Qd,
                Zd = Rd,
                $d = Sd,
                ae = Td,
                be = Ud,
                ce = Vd,
                de = Wd;
            if (Ga && Ga.URL) var ee = Ga.URL,
                bb = !(ee && (0 < ee.indexOf("?google_debug") || 0 < ee.indexOf("&google_debug")));
            var fe = function(a, b, c, d) {
                    return c = ib(d || "osd_or_lidar::" + b, c, void 0, void 0, void 0), a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c), c
                },
                ge = {};
            q("gteh", ib("osd_or_lidar::gteh_ex", function(a, b) {
                var c = ge[a];
                ea(c) && c(b)
            }), void 0);
            var he = function(a, b) {
                    var c = a || x;
                    c.top != c && (c = c.top);
                    try {
                        var d;
                        if (c.document && !c.document.body) d = new L(-1, -1);
                        else {
                            var e;
                            if (b) e = new L(c.innerWidth, c.innerHeight);
                            else {
                                var f = (c || window).document,
                                    g = "CSS1Compat" == f.compatMode ? f.documentElement : f.body;
                                e = new L(g.clientWidth, g.clientHeight)
                            }
                            d = e
                        }
                        return d
                    } catch (h) {
                        return new L(-12245933, -12245933)
                    }
                },
                ie = 0,
                ne = function() {
                    var a, b, c = je >= 0 ? P() - je : -1,
                        d = ke ? P() - le : -1,
                        e = me >= 0 ? P() - me : -1;
                    a = [2e3, 4e3], b = [250, 500, 1e3];
                    var f = c; - 1 != d && c > d && (f = d);
                    for (var g, c = 0; c < a.length; ++c)
                        if (f < a[c]) {
                            g = b[c];
                            break
                        }
                    return void 0 === g && (g = b[a.length]), -1 != e && e > 1500 && 4e3 > e ? 500 : g
                },
                oe = (new Date).getTime(),
                je = -1,
                ke = !1,
                le = -1,
                me = -1,
                P = function() {
                    return (new Date).getTime() - oe
                },
                pe = function(a) {
                    var b = [];
                    return yb(a, function(a, c) {
                        c in Object.prototype || "undefined" == typeof a || (r(a) && (a = a.join(",")), b.push([c, "=", a].join("")))
                    }), b.join("&")
                },
                se = function(a, b, c, d, e, f, g, h, i) {
                    this.b = qe.clone(), this.j = this.F = 0, this.Ra = this.Ta = this.Ha = -1, this.R = [0, 0, 0, 0, 0], this.O = [0, 0, 0, 0, 0], this.k = [0, 0, 0, 0, 0], this.ha = [0, 0, 0, 0, 0], this.A = d, this.D = this.oa = -1, this.M = e, this.Sa = function() {}, this.pa = this.h = c, this.Eb = 0, this.Db = -1, this.N = i || qe, this.l = "", this.Ib = null, this.Jb = "", this.g = {}, this.g.le = 0, this.g.nt = 2, this.g.Fr = 3, this.o = this.Va = this.Ua = this.ja = null, this.W = 0, this.$ = !1, this.ia = null, this.na = !1, this.Gb = f, this.Hb = !1, this.Fb = void 0, this.Y = [], this.U = void 0, this.Z = !1, this.q = void 0, this.Ja = 0, this.P = -1, this.Ia = this.K = 0, this.J = void 0, this.m = 0, this.w = !1, re(this, a, f)
                },
                qe = new Uc(0, 0, 0, 0),
                ue = function(a, b, c, d, e) {
                    if (!(0 > a.A)) {
                        var f = x.innerWidth,
                            g = x.innerHeight,
                            h = new Uc(Math.round(x.mozInnerScreenY), Math.round(x.mozInnerScreenX + f), Math.round(x.mozInnerScreenY + g), Math.round(x.mozInnerScreenX));
                        c = new Uc(x.screenY + d, x.screenX + c.width, x.screenY + c.height, x.screenX), e || (d = new Uc(h.top - c.top, h.right - c.left, h.bottom - c.top, h.left - c.left), d.top > a.b.top ? a.b = d : (a.b.right = a.b.left + f, a.b.bottom = a.b.top + g), a.F = f * g), te(a, h, c, b, e, !0)
                    }
                },
                we = function(a, b, c) {
                    var d = ve(a, x && x.document);
                    if (d) {
                        c || re(a, x, !0);
                        var e = Math.floor((a.b.left + a.b.right) / 2),
                            f = Math.floor((a.b.top + a.b.bottom) / 2),
                            g = Mc(document),
                            d = d(e - g.x, f - g.y) ? .5 : 0;
                        te(a, a.b, d, b, c, !0)
                    }
                },
                ve = function(a, b) {
                    if (xe(a), !a.ja) {
                        var c = [];
                        y(Cb(a.g), function(a) {
                            c[this.g[a] + 1] = a
                        }, a);
                        var d = c.join(""),
                            d = b && b[d];
                        a.ja = d && u(d, b)
                    }
                    return a.ja
                },
                xe = function(a) {
                    a.g.e = -1, a.g.i = 6, a.g.n = 7, a.g.t = 8
                },
                ze = function(a, b, c, d) {
                    var e = ye;
                    0 > a.A || (d || re(a, x, e), Boolean(null) && d && (x.clearInterval(a.Ua), a.Ua = null), Boolean(null) && d && (x.clearInterval(a.Va), a.Va = null), null != a.ia && (d ? (x.clearInterval(a.o), a.o = null, a.$ = !1) : a.na && !a.o && (a.o = x.setInterval(jb("osd_or_lidar::adblock::iem_int", u(a.pb, a, x, 1e3)), 1e3), a.pb(x))), te(a, a.b, c, b, d, !1))
                },
                te = function(a, b, c, d, e, f) {
                    var g = d - a.A || 1,
                        h = null;
                    if (da(c) ? b = Ae(a, c) : (h = c, b = Ae(a, b, h)), !a.U) {
                        c = b;
                        var i = a.oa,
                            j = h;
                        f = f && -1 != i && 2 >= i;
                        var k = -1 == i || -1 == c ? -1 : Math.max(i, c);
                        for (f = f ? k : i, -1 != f && (a.R[f] += g), (j = j || null) ? (-1 != f && 2 >= f && -1 != a.D && (a.ha[a.D] += g), j = 100 * a.F / ((j.bottom - j.top) * (j.right - j.left)), a.D = j >= 20 ? 0 : j >= 10 ? 1 : j >= 5 ? 2 : j >= 2.5 ? 3 : 4) : a.D = -1, 7 == a.M && (j = Be(a), i = -1 != f && 2 >= f, !i && p(a.J) && 0 < a.J && (a.K += g), a.K > a.Ia && (a.Ia = a.K), (i || !p(j) || 0 >= j) && (a.K = 0), a.J = j), j = f; j >= 0 && 4 >= j; j++) a.k[j] += g, a.k[j] > a.O[j] && (a.O[j] = a.k[j]);
                        for (j = 0; j < a.k.length; ++j)(c > j || e || -1 == c) && (a.k[j] = 0)
                    }
                    a.oa = e ? -1 : b, a.A = d, -1 != b && (0 > a.Ha && (a.Ha = d), a.Ra = d), -1 == a.Ta && 1e3 <= Math.max(a.k[2], a.O[2]) && (a.Ta = d), a.Sa(a, h || qe)
                },
                Ae = function(a, b, c) {
                    if (a.w && 7 == a.M) return a.j = 1, Ce(a.j);
                    var d = null;
                    if (da(b)) a.j = b;
                    else {
                        if (c = new Uc(Math.max(b.top, c.top), Math.min(b.right, c.right), Math.min(b.bottom, c.bottom), Math.max(b.left, c.left)), 0 >= a.F || c.top >= c.bottom || c.left >= c.right) return a.j = 0, -1;
                        var d = c.clone(),
                            e = -b.left;
                        b = -b.top, e instanceof K ? (d.left += e.x, d.right += e.x, d.top += e.y, d.bottom += e.y) : (d.left += e, d.right += e, da(b) && (d.top += b, d.bottom += b)), d = (c.bottom - c.top) * (c.right - c.left), a.j = d / a.F
                    }
                    return Ce(a.j)
                },
                Ce = function(a) {
                    var b = -1;
                    return a >= 1 ? b = 0 : a >= .75 ? b = 1 : a >= .5 ? b = 2 : a >= .25 ? b = 3 : a > 0 && (b = 4), b
                };
            se.prototype.pb = function(a, b) {
                var c = ve(this, a && a.document);
                if (c) {
                    re(this, a, !0);
                    var d = Math.floor((this.b.left + this.b.right) / 2),
                        e = Math.floor((this.b.top + this.b.bottom) / 2),
                        f = Mc(document),
                        c = Boolean(c(d - f.x, e - f.y)),
                        d = b || 0;
                    c ? (this.W += this.$ ? d : 0, this.$ = !0) : (this.W = 0, this.$ = !1), 1e3 <= this.W && (a.clearInterval(this.o), this.o = null, this.na = !1, this.ia = "v"), re(this, a, !1)
                } else a.clearInterval(this.o), this.o = null, this.na = !1, this.ia = "i"
            };
            var re = function(a, b, c) {
                    b = c ? b : b.top;
                    try {
                        var d = qe.clone(),
                            e = new K(0, 0);
                        if (a.pa) {
                            var d = a.pa.getBoundingClientRect(),
                                f = a.pa,
                                g = new K(0, 0),
                                h = M(Hc(f));
                            do {
                                var i;
                                if (h == b) i = Yc(f);
                                else {
                                    var j = f,
                                        k = void 0;
                                    if (j.getBoundingClientRect) var l = Wc(j),
                                        k = new K(l.left, l.top);
                                    else var m = Tc(Ic(j)),
                                        n = Yc(j),
                                        k = new K(n.x - m.x, n.y - m.y);
                                    if (c = void 0, Rb && !G(12)) {
                                        var o, p = void 0,
                                            q = void 0;
                                        a: {
                                            var r = Ba();
                                            if (void 0 === j.style[r]) {
                                                var s = (Sb ? "Webkit" : Rb ? "Moz" : E ? "ms" : Qb ? "O" : null) + Ca(r);
                                                if (void 0 !== j.style[s]) {
                                                    q = (Sb ? "-webkit" : Rb ? "-moz" : E ? "-ms" : Qb ? "-o" : null) + "-transform";
                                                    break a
                                                }
                                            }
                                            q = "transform"
                                        }
                                        if (o = Vc(j, q) || Vc(j, "transform")) var t = o.match(Zc),
                                            p = t ? new K(parseFloat(t[1]), parseFloat(t[2])) : new K(0, 0);
                                        else p = new K(0, 0);
                                        c = new K(k.x + p.x, k.y + p.y)
                                    } else c = k;
                                    i = c
                                }
                                c = i, g.x += c.x, g.y += c.y
                            } while (h && h != b && (f = h.frameElement) && (h = h.parent));
                            e = g
                        }
                        var u = d.right - d.left,
                            v = d.bottom - d.top,
                            w = e.x + a.N.left,
                            x = e.y + a.N.top,
                            y = a.N.right || u,
                            z = a.N.bottom || v;
                        a.b = new Uc(Math.round(x), Math.round(w + y), Math.round(x + z), Math.round(w))
                    } catch (A) {
                        a.b = a.N
                    } finally {
                        a.g.Po = 5, a.g.me = 1, a.g.om = 4
                    }
                    a.F = (a.b.bottom - a.b.top) * (a.b.right - a.b.left), a.Hb = 2 != a.M && 3 != a.M && 6 != a.M || 0 != a.F ? !1 : !0
                },
                De = function(a, b) {
                    var c = a.Ja;
                    return ke || a.U || -1 == a.P || (c += b - a.P), c
                },
                Be = function(a) {
                    if ("as" == a.q && ea(a.h.sdkVolume)) try {
                        return Number(a.h.sdkVolume())
                    } catch (b) {
                        return -1
                    }
                    if ("h" == a.q && (a = aa("ima.common.sdkVolume"), ea(a))) try {
                        return Number(a())
                    } catch (c) {
                        return -1
                    }
                },
                Ie = function(a, b) {
                    for (var c = b - a.Y.length + 1, d = [], e = 0; c > e; e++) d[e] = 0;
                    Za(a.Y, d), a.Y[b] = (100 * a.j | 0) / 100
                },
                R = function(a) {
                    if (a.Gb) return {
                        "if": 0
                    };
                    var b = a.b.clone();
                    b.round();
                    var c = Ra(a.Y, function(a) {
                            return 100 * a | 0
                        }),
                        b = {
                            "if": ye ? 1 : void 0,
                            sdk: a.q ? a.q : void 0,
                            p: [b.top, b.left, b.bottom, b.right],
                            tos: a.R,
                            mtos: a.O,
                            ps: void 0,
                            pt: c,
                            vht: De(a, P()),
                            mut: a.Ia
                        };
                    return Je && (b.ps = [Je.width, Je.height]), a.Z && (b.ven = "1"), a.m && (b.vds = a.m), Q() ? b.c = (100 * a.j | 0) / 100 : b.tth = P() - ie, b
                },
                Ke = function() {
                    return D("iPad") || D("Android") && !D("Mobile") || D("Silk")
                },
                Le = null,
                Me = null,
                Ne = null,
                Oe = !1,
                Re = function() {
                    Pe(!1), Qe()
                },
                Qe = function() {
                    S(T, !1)
                },
                af = function() {
                    Se && (Te = he(x, Se));
                    var a = Te,
                        b = Ue,
                        c = Ve;
                    if (We) {
                        a = b, Pe(!1);
                        var d = Xe,
                            e = d.height - a;
                        return 0 >= e && (e = d.height, a = 0), Te = new L(d.width, e), e = new Ye, e.o = !0, e.j = Te, e.h = d, e.g = a, e
                    }
                    if (c) return a = new Ye, a.k = !0, a;
                    if (Ze) return a = new Ye, a.l = !0, a;
                    if ($e) return a = new Ye, a.q = !0, a;
                    a: {
                        if (b = new Ye, b.j = a, b.b = !1, null != a && -1 != a.width && -1 != a.height && -12245933 != a.width && -12245933 != a.height) {
                            try {
                                var c = Se,
                                    f = x || x,
                                    f = f.top,
                                    e = a || he(f, c),
                                    g = Tc(Ic(f.document)),
                                    d = -1 == e.width || -12245933 == e.width ? new Uc(e.width, e.width, e.width, e.width) : new Uc(g.y, g.x + e.width, g.y + e.height, g.x)
                            } catch (h) {
                                a = b;
                                break a
                            }
                            b.m = d, b.b = !0
                        }
                        a = b
                    }
                    return a
                },
                S = function(a, b) {
                    if (!bf)
                        if (window.clearTimeout(cf), cf = null, 0 == a.length) b || df();
                        else {
                            var c = af();
                            try {
                                var d = P();
                                if (c.o)
                                    for (var e = 0; e < a.length; e++) ue(a[e], d, c.h, c.g, b);
                                else if (c.k)
                                    for (e = 0; e < a.length; e++) we(a[e], d, b);
                                else if ($e) y(a, function() {});
                                else if (c.l) y(a, function() {});
                                else if (c.b)
                                    for (e = 0; e < a.length; e++) ze(a[e], d, c.m, b);
                                ++ef
                            } finally {
                                b ? y(a, function(a) {
                                    a.j = 0
                                }) : df()
                            }
                        }
                },
                ff = function() {
                    var a = Q();
                    if (a) {
                        if (!ke) {
                            var b = P();
                            le = b, y(T, function(a) {
                                a.Ja = De(a, b)
                            })
                        }
                        ke = !0, Pe(!0)
                    } else b = P(), ke = !1, ie = b, y(T, function(a) {
                        0 <= a.A && (a.P = b)
                    });
                    S(T, !a)
                },
                Q = function() {
                    if (gf()) return !0;
                    var a;
                    return a = x.document, a = {
                        visible: 1,
                        hidden: 2,
                        prerender: 3,
                        preview: 4
                    }[a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || ""] || 0, 1 == a || 0 == a
                },
                df = function() {
                    x && (cf = x.setTimeout(jb("osd_or_lidar::psamp_to", function() {
                        S(T, !1)
                    }), ne()))
                },
                hf = function(a) {
                    return null != Ua(T, function(b) {
                        return b.h == a
                    })
                },
                T = [],
                bf = !1,
                Te = null,
                Xe = null,
                Je = null,
                cf = null,
                ye = !Fa(x.top),
                Ue = 0,
                We = !1,
                Ve = !1,
                Ze = !1,
                $e = !1,
                Se = Ke() || !Ke() && (D("iPod") || D("iPhone") || D("Android") || D("IEMobile")),
                ef = 0,
                jf = function() {
                    var a = x.document;
                    return a.body && a.body.getBoundingClientRect ? !0 : !1
                },
                Pe = function(a) {
                    if (Te = he(x, Se), !a) {
                        Xe = x.outerWidth ? new L(x.outerWidth, x.outerHeight) : new L(-12245933, -12245933), a = x, a.top != a && (a = a.top);
                        var b = 0,
                            c = 0,
                            d = Te;
                        try {
                            var e = a.document,
                                f = e.body,
                                g = e.documentElement;
                            if ("CSS1Compat" == e.compatMode && g.scrollHeight) b = g.scrollHeight != d.height ? g.scrollHeight : g.offsetHeight, c = g.scrollWidth != d.width ? g.scrollWidth : g.offsetWidth;
                            else {
                                var h = g.scrollHeight,
                                    i = g.scrollWidth,
                                    j = g.offsetHeight,
                                    k = g.offsetWidth;
                                g.clientHeight != j && (h = f.scrollHeight, i = f.scrollWidth, j = f.offsetHeight, k = f.offsetWidth), h > d.height ? h > j ? (b = h, c = i) : (b = j, c = k) : j > h ? (b = h, c = i) : (b = j, c = k)
                            }
                            Je = new L(c, b)
                        } catch (l) {
                            Je = new L(-12245933, -12245933)
                        }
                    }
                },
                kf = function(a) {
                    y(a, function(a) {
                        hf(a.h) || T.push(a)
                    })
                },
                gf = function() {
                    return Sa(T, function(a) {
                        return a.w
                    })
                },
                Ye = function() {
                    this.h = this.j = null, this.g = 0, this.m = null, this.b = this.q = this.l = this.k = this.o = !1
                },
                lf = function(a) {
                    if (a = String(a), /^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
                        return eval("(" + a + ")")
                    } catch (b) {}
                    throw Error("Invalid JSON string: " + a)
                },
                of = function(a) {
                    var b = [];
                    return mf(new nf, a, b), b.join("")
                },
                nf = function() {},
                mf = function(a, b, c) {
                    switch (typeof b) {
                        case "string":
                            pf(b, c);
                            break;
                        case "number":
                            c.push(isFinite(b) && !isNaN(b) ? b : "null");
                            break;
                        case "boolean":
                            c.push(b);
                            break;
                        case "undefined":
                            c.push("null");
                            break;
                        case "object":
                            if (null == b) {
                                c.push("null");
                                break
                            }
                            if (r(b)) {
                                var d = b.length;
                                c.push("[");
                                for (var e = "", f = 0; d > f; f++) c.push(e), mf(a, b[f], c), e = ",";
                                c.push("]");
                                break
                            }
                            c.push("{"), d = "";
                            for (e in b) Object.prototype.hasOwnProperty.call(b, e) && (f = b[e], "function" != typeof f && (c.push(d), pf(e, c), c.push(":"), mf(a, f, c), d = ","));
                            c.push("}");
                            break;
                        case "function":
                            break;
                        default:
                            throw Error("Unknown type: " + typeof b)
                    }
                },
                qf = {
                    '"': '\\"',
                    "\\": "\\\\",
                    "/": "\\/",
                    "\b": "\\b",
                    "\f": "\\f",
                    "\n": "\\n",
                    "\r": "\\r",
                    "	": "\\t",
                    "": "\\u000b"
                },
                rf = /\uffff/.test("ï¿¿") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g,
                pf = function(a, b) {
                    b.push('"', a.replace(rf, function(a) {
                        if (a in qf) return qf[a];
                        var b = a.charCodeAt(0),
                            c = "\\u";
                        return 16 > b ? c += "000" : 256 > b ? c += "00" : 4096 > b && (c += "0"), qf[a] = c + b.toString(16)
                    }), '"')
                },
                sf = function(a, b) {
                    return a.dataset ? b in a.dataset ? a.dataset[b] : null : a.getAttribute("data-" + String(b).replace(/([A-Z])/g, "-$1").toLowerCase())
                },
                tf = !1,
                uf = function() {
                    if (!Oe) {
                        Oe = !0, Le = Le || fe(x, "scroll", Qe, "osd_or_lidar::scroll"), Me = Me || fe(x, "resize", Re, "osd_or_lidar::resize");
                        var a;
                        Ga.mozVisibilityState ? a = "mozvisibilitychange" : Ga.webkitVisibilityState ? a = "webkitvisibilitychange" : Ga.visibilityState && (a = "visibilitychange"), a && (Ne = Ne || fe(Ga, a, ff, "osd_or_lidar::visibility")), ff()
                    }
                },
                vf = !1,
                wf = function() {
                    vf = !0;
                    try {
                        je = P(), kb(x), Pe(!1), jf() ? (window.setTimeout(function() {}, 1), uf()) : tf = !0
                    } catch (a) {
                        throw T = [], a
                    }
                },
                Lf = function(a, b, c) {
                    vf || wf();
                    var d = {};
                    Hb(d, {
                        opt_videoAdElement: void 0,
                        opt_VideoAdLength: void 0,
                        opt_fullscreen: void 0
                    }, c || {});
                    var e = a.toLowerCase();
                    if (a = Eb(function(a) {
                            return a == e
                        })) {
                        if (a = {
                                e: Ec[a],
                                hd: bf ? "1" : "0",
                                v: "235v",
                                hdr: void 0,
                                a: void 0
                            }, tf) return a.msg = "ue", pe(a);
                        if (b = xf(b, d), !b) return a.msg = "nf", pe(a);
                        if (c = d.opt_fullscreen, p(c) && (b.w = Boolean(c)), a.a = Be(b), p(b.J) && (a.la = b.J), c = {}, c.start = yf, c.firstquartile = zf, c.midpoint = Af, c.thirdquartile = Bf, c.complete = Cf, c.metric = Df, c.pause = Ef, c.resume = Ff, c.skip = Gf, c.viewable_impression = Df, c.mute = Hf, c.unmute = If, c.fullscreen = Jf, c.exitfullscreen = Kf, c = c[e]) return d = c(b, d), !p(d) || t(d) ? d : (Hb(a, d), pe(a))
                    }
                },
                yf = function(a, b) {
                    return bf = !1, Mf(a, b), Ie(a, 0), R(a)
                },
                zf = function(a) {
                    return Ie(a, 1), S([a], !Q()), R(a)
                },
                Af = function(a) {
                    return Ie(a, 2), S([a], !Q()), R(a)
                },
                Bf = function(a) {
                    return Ie(a, 3), S([a], !Q()), R(a)
                },
                Cf = function(a) {
                    Ie(a, 4), S([a], !Q());
                    var b = R(a);
                    return a.w = !1, Nf(a.l), b
                },
                Ef = function(a) {
                    a.Ja = De(a, P());
                    var b = !Q();
                    return S([a], b), a.U = !0, R(a)
                },
                Ff = function(a) {
                    var b = Q();
                    return a.U && !b && (a.P = P()), S([a], !b), a.U = !1, R(a)
                },
                Df = function(a) {
                    return R(a)
                },
                Gf = function(a) {
                    var b = !Q();
                    return S([a], b), b = R(a), a.w = !1, Nf(a.l), b
                },
                Hf = function(a) {
                    return S([a], !Q()), R(a)
                },
                If = function(a) {
                    return S([a], !Q()), R(a)
                },
                Jf = function(a) {
                    return a.w = !0, S([a], !Q()), R(a)
                },
                Kf = function(a) {
                    return a.w = !1, S([a], !Q()), R(a)
                },
                Mf = function(a, b) {
                    b && b.opt_VideoAdLength && (a.Fb = b.opt_VideoAdLength);
                    var c = P();
                    me = c, a.R = [0, 0, 0, 0, 0], a.O = [0, 0, 0, 0, 0], a.k = [0, 0, 0, 0, 0], a.ha = [0, 0, 0, 0, 0], a.A = -1, a.Ha = -1, a.Ra = -1, a.Eb = 0, a.Db = -1, a.oa = -1, a.D = -1, a.j = 0, a.A = c;
                    var d = !1;
                    Q() || (d = !0, a.P = c), S([a], d)
                },
                Nf = function(a) {
                    if (t(a)) {
                        var b = Ta(T, function(b) {
                            return b.l == a
                        });
                        b >= 0 && Oa.splice.call(T, b, 1)
                    }
                },
                xf = function(a, b) {
                    if (b.opt_videoAdElement) return Of(a, b.opt_videoAdElement);
                    var c = Pf(a);
                    return c ? c : c = Ua(T, function(b) {
                        return b.l == a
                    })
                },
                Of = function(a, b) {
                    var c = Ua(T, function(a) {
                        return a.h == b
                    });
                    return c || (c = Qf(b), c.l = a, c.q = "h"), c
                },
                Pf = function(a) {
                    var b = Ua(T, function(b) {
                        return b.h ? Rf(b.h) == a : !1
                    });
                    return b ? b : (b = Sf(), (b = Ua(b, function(b) {
                        return Rf(b) == a
                    })) ? (b = Qf(b), b.q = "as", Tf(b), b) : null)
                },
                Tf = function(a) {
                    var b = Rf(a.h);
                    t(b) && (a.l = b)
                },
                Sf = function() {
                    var a = x.document,
                        b = ab(Ra(["embed", "object"], function(b) {
                            return Ya(a.getElementsByTagName(b))
                        }));
                    return b = Qa(b, function(a) {
                        if (!a || !fa(a) || 1 != a.nodeType) return !1;
                        var b = a.getBoundingClientRect();
                        return 0 != b.width && 0 != b.height && a.metricID && ea(a.metricID) ? !0 : !1
                    })
                },
                Rf = function(a) {
                    if (!a || !a.metricID || !ea(a.metricID)) return null;
                    var b;
                    try {
                        b = a.metricID()
                    } catch (c) {
                        return null
                    }
                    return b.queryID
                },
                Qf = function(a) {
                    var b = P();
                    sf(a, "admeta") || sf(a, "admetaDfp");
                    var c, d = sf(a, "ord") || "";
                    a: if (d) {
                        c = x.document.getElementsByTagName("script");
                        for (var d = new RegExp(".doubleclick.net/(N.+/)?(pf)?(ad[ijx])/.*;ord=" + va(d)), e = 0; e < c.length; e++) {
                            var f = c[e];
                            if (f && f.src && d.test(f.src)) {
                                c = f.src;
                                break a
                            }
                        }
                        c = x != x.top && d.test(x.location.href) ? x.location.href : ""
                    } else c = "";
                    return a = new se(x, 0, a, b, 7, ye), b = c.match(/.doubleclick.net\/(N.+\/)?(pf)?(ad[ijx])\//), a.Ib = b ? {
                        adi: "adi",
                        adj: "adj",
                        adx: "adx"
                    }[b[3]] : "", c && (b = c && (b = c.match(/\/\/.*(;u=xb[^;\?]*)/i)) && (b = b[b.length - 1].split("=")) && 2 == b.length ? b[1] : null, a.Jb = b), a.Sa = Uf, kf([a]), uf(), a
                },
                Uf = function(a) {
                    if (2e3 <= Math.max(a.k[2], a.O[2]) && !a.Z && !ye) {
                        var b = "as" == a.q,
                            c = "h" == a.q,
                            d = aa("ima.common.triggerViewEvent"),
                            e = R(a);
                        e.e = 9;
                        try {
                            var f = pe(e);
                            c ? ea(d) ? (d(a.l, f), a.Z = !0) : a.m = 4 : b ? a.h && a.h.triggerViewEvent ? (a.h.triggerViewEvent(f), a.Z = !0) : a.m = 1 : a.m = 5
                        } catch (g) {
                            a.m = a.m || 2
                        }
                    } else a.m = 3
                };
            q("Goog_AdSense_Lidar_startMetricMeasurement", ib("lidar::startmm_ex", function(a, b) {
                var c = b || {};
                if (!t(a)) {
                    var d = xf(a, c);
                    d && Mf(d, c)
                }
            }), void 0), q("Goog_AdSense_Lidar_stopMetricMeasurement", ib("lidar::stopmm_ex", Nf), void 0), q("Goog_AdSense_Lidar_getMetric", ib("lidar::getmetric_ex", function(a) {
                var b = Ua(T, function(b) {
                    return b.l === a
                });
                if (!b) return "-1";
                var c = {
                    xsj: b.R,
                    mkdj: b.O
                };
                return Q() ? c.c7 = (100 * b.j | 0) / 100 : c.ftr = P() - ie, of(c)
            }), void 0), q("Goog_AdSense_Lidar_sendVastMessage", ib("lidar::handlevast_ex", Lf), void 0);
            var U = function(a, b, c) {
                I.call(this, a), this.j = b, this.h = null != c ? c : null
            };
            v(U, I), U.prototype.o = function() {
                return this.j
            }, U.prototype.l = function() {
                return this.h
            };
            var V = function(a) {
                yc.call(this), this.j = a, this.g = {}
            };
            v(V, yc);
            var Vf = [];
            V.prototype.r = function(a, b, c, d) {
                return Wf(this, a, b, c, d)
            };
            var Wf = function(a, b, c, d, e, f) {
                    r(c) || (c && (Vf[0] = c.toString()), c = Vf);
                    for (var g = 0; g < c.length; g++) {
                        var h = rd(b, c[g], d || a.handleEvent, e || !1, f || a.j || a);
                        if (!h) break;
                        a.g[h.Pa] = h
                    }
                    return a
                },
                Xf = function(a, b, c, d, e, f) {
                    if (r(c))
                        for (var g = 0; g < c.length; g++) Xf(a, b, c[g], d, e, f);
                    else(b = yd(b, c, d || a.handleEvent, e, f || a.j || a)) && (a.g[b.Pa] = b)
                };
            V.prototype.Ca = function(a, b, c, d, e) {
                if (r(b))
                    for (var f = 0; f < b.length; f++) this.Ca(a, b[f], c, d, e);
                else c = c || this.handleEvent, e = e || this.j || this, c = sd(c), d = !!d, b = fd(a) ? nd(a.X, String(b), c, d, e) : a && (a = ud(a)) ? nd(a, b, c, d, e) : null, b && (Ad(b), delete this.g[b.Pa]);
                return this
            }, V.prototype.B = function() {
                V.T.B.call(this), yb(this.g, Ad), this.g = {}
            }, V.prototype.handleEvent = function() {
                throw Error("EventHandler.handleEvent not implemented")
            };
            var Yf = function(a) {
                return (a = a.exec(B)) ? a[1] : ""
            };
            ! function() {
                if (Yd) return Yf(/Firefox\/([0-9.]+)/);
                if (E || Qb) return Wb;
                if (ce) return Yf(/Chrome\/([0-9.]+)/);
                if (de) return Yf(/Version\/([0-9.]+)/);
                if ($d || ae) {
                    var a;
                    if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(B)) return a[1] + "." + a[2]
                } else {
                    if (be) return (a = Yf(/Android\s+([0-9.]+)/)) ? a : Yf(/Version\/([0-9.]+)/);
                    if (Zd) return Yf(/Camino\/([0-9.]+)/)
                }
                return ""
            }();
            var Zf = {},
                $f = "",
                ag = /OS (\S+) like/,
                bg = /Android (\S+);/,
                cg = function() {
                    return Ob || w(B, "Mobile")
                },
                dg = function() {
                    return Pb || w(B, "iPod")
                },
                eg = function() {
                    return dg() || Ub
                },
                fg = function(a, b) {
                    if (null == Zf[b]) {
                        var c;
                        la($f) && (c = a.exec(B)) && ($f = c[1]), (c = $f) ? (c = c.replace(/_/g, "."), Zf[b] = 0 <= ya(c, b)) : Zf[b] = !1
                    }
                    return Zf[b]
                },
                gg = function() {
                    var a = B;
                    return a ? w(a, "AppleTV") || w(a, "GoogleTV") || w(a, "HbbTV") || w(a, "NetCast.TV") || w(a, "POV_TV") || w(a, "SMART-TV") || w(a, "SmartTV") || Ob && w(a, "AFT") : !1
                },
                hg = function() {
                    N.call(this), this.b = null, this.j = new V(this), zc(this, ia(Ac, this.j)), this.h = new A, this.g = !1
                };
            v(hg, N);
            var ig = null,
                jg = function() {
                    return null != ig || (ig = new hg), ig
                },
                kg = function(a) {
                    if (null == a) return !1;
                    if (dg() && null != a.webkitDisplayingFullscreen) return a.webkitDisplayingFullscreen;
                    var b = window.screen.availWidth || window.screen.width,
                        c = window.screen.availHeight || window.screen.height;
                    return a = ea(a.getBoundingClientRect) ? a.getBoundingClientRect() : {
                        left: a.offsetLeft,
                        top: a.offsetTop,
                        width: a.offsetWidth,
                        height: a.offsetHeight
                    }, 0 >= b - a.width && 42 >= c - a.height
                },
                lg = function(a, b, c, d, e, f) {
                    if (a.g) {
                        var g = {};
                        return (a = d ? a.h.get(d) : Dc.m) && (g.opt_videoAdElement = a, g.opt_fullscreen = kg(a)), e && (g.opt_fullscreen = e), f && (g.opt_offset = f), Lf(b, c, g) || ""
                    }
                    return ""
                };
            hg.prototype.k = function(a) {
                var b = a.I,
                    c = b.queryId,
                    d = {};
                switch (d.timeoutId = b.timeoutId, a.H) {
                    case "getViewability":
                        d.viewabilityString = lg(this, "metric", c) || "", this.b.send("activityMonitor", "viewability", d);
                        break;
                    case "reportVastEvent":
                        d.viewabilityString = lg(this, b.vastEvent, c, b.osdId, b.isFullscreen, b.isOverlay ? {
                            left: b.left,
                            top: b.top,
                            width: b.width,
                            height: b.height
                        } : void 0), this.b.send("activityMonitor", "viewability", d)
                }
            }, q("ima.common.sdkVolume", function() {
                var a = -1;
                return null != (jg(), null) && (a = (jg(), null)()), a
            }, void 0), q("ima.common.triggerViewEvent", function(a, b) {
                var c = {};
                c.queryId = a, c.viewabilityString = b;
                var d;
                (d = jg().b) ? d.send("activityMonitor", "viewableImpression", c): jg().dispatchEvent(new U("viewable_impression", null, c))
            }, void 0);
            var mg = function(a, b, c) {
                this.g = c, 0 == b.length && (b = [
                    []
                ]), this.b = Ra(b, function(b) {
                    b = a.concat(b);
                    for (var c = [], d = 0, e = 0; d < b.length;) {
                        var f = b[d++];
                        if (128 > f) c[e++] = String.fromCharCode(f);
                        else if (f > 191 && 224 > f) {
                            var g = b[d++];
                            c[e++] = String.fromCharCode((31 & f) << 6 | 63 & g)
                        } else {
                            var g = b[d++],
                                h = b[d++];
                            c[e++] = String.fromCharCode((15 & f) << 12 | (63 & g) << 6 | 63 & h)
                        }
                    }
                    return new RegExp(c.join(""))
                })
            };
            mg.prototype.match = function(a) {
                return Sa(this.b, function(b) {
                    return b = a.match(b), null == b ? !1 : !this.g || 1 <= b.length && "3.1.77" == b[1] || 2 <= b.length && "3.1.77" == b[2] ? !0 : !1
                }, this)
            };
            var ng = [104, 116, 116, 112, 115, 63, 58, 47, 47, 105, 109, 97, 115, 100, 107, 46, 103, 111, 111, 103, 108, 101, 97, 112, 105, 115, 46, 99, 111, 109, 47, 106, 115, 47, 40, 115, 100, 107, 108, 111, 97, 100, 101, 114, 124, 99, 111, 114, 101, 41, 47],
                og = [104, 116, 116, 112, 115, 63, 58, 47, 47, 115, 48, 46, 50, 109, 100, 110, 46, 110, 101, 116, 47, 105, 110, 115, 116, 114, 101, 97, 109, 47, 104, 116, 109, 108, 53, 47],
                pg = [
                    [97, 102, 105, 92, 46, 106, 115],
                    [105, 109, 97, 51, 92, 46, 106, 115],
                    [105, 109, 97, 51, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115],
                    [105, 109, 97, 51, 95, 116, 101, 115, 116, 46, 106, 115],
                    [105, 109, 97, 51, 95, 108, 111, 97, 100, 101, 114, 92, 46, 106, 115],
                    [105, 109, 97, 51, 95, 108, 111, 97, 100, 101, 114, 95, 100, 101, 98, 117, 103, 92, 46, 106, 115]
                ],
                qg = [
                    [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 40, 95, 91, 97, 45, 122, 93, 91, 97, 45, 122, 93, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108],
                    [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 100, 101, 98, 117, 103, 40, 95, 91, 97, 45, 122, 93, 91, 97, 45, 122, 93, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108],
                    [98, 114, 105, 100, 103, 101, 40, 91, 48, 45, 57, 93, 43, 92, 46, 91, 48, 45, 57, 92, 46, 93, 43, 41, 95, 116, 101, 115, 116, 40, 95, 91, 97, 45, 122, 93, 91, 97, 45, 122, 93, 41, 123, 48, 44, 50, 125, 92, 46, 104, 116, 109, 108]
                ],
                rg = new mg(ng, pg, !1),
                sg = new mg(ng, qg, !0),
                tg = new mg(og, pg, !1),
                ug = new mg(og, qg, !0),
                vg = new mg([104, 116, 116, 112, 115, 63, 58, 47, 47, 119, 119, 119, 46, 103, 115, 116, 97, 116, 105, 99, 46, 99, 111, 109, 47, 97, 100, 109, 111, 98, 47, 106, 115, 47, 97, 112, 118, 95, 116, 101, 109, 112, 108, 97, 116, 101, 115, 46, 106, 115], [], !1),
                wg = new mg([104, 116, 116, 112, 115, 63, 58, 47, 47, 109, 105, 110, 116, 45, 109, 97, 100, 46, 115, 97, 110, 100, 98, 111, 120, 46, 103, 111, 111, 103, 108, 101, 46, 99, 111, 109, 47, 109, 97, 100, 115, 47, 115, 116, 97, 116, 105, 99, 47, 102, 111, 114, 109, 97, 116, 115, 47, 97, 112, 118, 95, 116, 101, 109, 112, 108, 97, 116, 101, 115, 46, 106, 115], [], !1),
                xg = new mg([104, 116, 116, 112, 115, 63, 58, 47, 47, 103, 111, 111, 103, 108, 101, 97, 100, 115, 46, 103, 46, 100, 111, 117, 98, 108, 101, 99, 108, 105, 99, 107, 46, 110, 101, 116, 47, 109, 97, 100, 115, 47, 115, 116, 97, 116, 105, 99], [], !1),
                yg = new mg([104, 116, 116, 112, 115, 63, 58, 47, 47, 118, 105, 100, 101, 111, 45, 97, 100, 45, 116, 101, 115, 116, 46, 97, 112, 112, 115, 112, 111, 116, 46, 99, 111, 109, 47], [], !1),
                zb = {
                    o: rg,
                    k: sg,
                    m: tg,
                    l: ug,
                    b: vg,
                    g: wg,
                    h: xg,
                    j: yg
                },
                zg = ["://secure-...imrworldwide.com/", "://cdn.imrworldwide.com/", "://aksecure.imrworldwide.com/", "www.google.com/pagead/sul", "www.youtube.com/gen_204\\?a=sul"],
                Ag = 0,
                Bg = {},
                Cg = function(a) {
                    return la(wa(a)) ? !1 : null != Ua(zg, function(b) {
                        return null != a.match(b)
                    })
                },
                Dg = function(a) {
                    if (a) {
                        var b = Oc("iframe", {
                            src: 'javascript:"data:text/html,<body><img src=\\"' + a + '\\"></body>"',
                            style: "display:none"
                        });
                        a = Hc(b).body;
                        var c, d = Gd(function() {
                            Ad(c), Qc(b)
                        }, 15e3);
                        c = yd(b, ["load", "error"], function() {
                            Gd(function() {
                                l.clearTimeout(d), Qc(b)
                            }, 5e3)
                        }), a.appendChild(b)
                    }
                },
                Eg = function(a) {
                    if (a) {
                        var b = new Image,
                            c = "" + Ag++;
                        Bg[c] = b, b.onload = b.onerror = function() {
                            delete Bg[c]
                        }, b.src = a
                    }
                },
                Fg = {
                    Fd: "video/mp4",
                    Hd: "video/mpeg",
                    Cd: "application/x-mpegURL",
                    Id: "video/ogg",
                    Od: "video/3gpp",
                    Sd: "video/webm",
                    Ed: "audio/mpeg",
                    Gd: "audio/mp4"
                },
                Gg = ["*.googlesyndication.com"],
                Hg = ["*.youtu.be", "*.youtube.com"],
                Ig = "ad.doubleclick.net bid.g.doubleclick.net corp.google.com ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(" "),
                Kg = function(a, b) {
                    try {
                        var c = oc(new dc(b)),
                            c = c.replace(/^www./i, "");
                        return Sa(a, function(a) {
                            return Jg(a, c)
                        })
                    } catch (d) {
                        return !1
                    }
                },
                Jg = function(a, b) {
                    return la(wa(b)) ? !1 : (a = a.toLowerCase(), b = b.toLowerCase(), "*." == a.substr(0, 2) ? (a = a.substr(2), a.length > b.length ? !1 : b.substr(-a.length) == a && (b.length == a.length || "." == b.charAt(b.length - a.length - 1))) : a == b)
                },
                Lg = function(a) {
                    var b;
                    return (b = "https:" == window.location.protocol) && (b = new RegExp("^https?://([a-z0-9-]{1,63}\\.)*(" + Ig.join("|").replace(/\./g, ".") + ")(:[0-9]+)?([/?#]|$)", "i").test(a)), b ? (a = new dc(a), ec(a, "https"), a.toString()) : a
                },
                Mg = function(a) {
                    (a = Lg(a)) && (Cg(a) ? Dg(a) : Eg(a))
                },
                Ng = function() {
                    this.g = .05 > Math.random(), this.b = Math.floor(4503599627370496 * Math.random())
                };
            Ng.getInstance = function() {
                return Ng.b ? Ng.b : Ng.b = new Ng
            };
            var Vg = function(a, b, c, d) {
                    if (a.g || d) {
                        c = c || {}, c.lid = b, c = Tg(a, c);
                        var e = new dc("http://pagead2.googlesyndication.com/pagead/gen_204");

                        yb(c, function(a, b) {
                            var c = e.b,
                                d = b,
                                f = null != a ? "boolean" == typeof a ? a ? "t" : "f" : "" + a : "";
                            tc(c), c.h = null, d = sc(c, d), vc(c, d) && (c.g -= c.b.get(d).length), Ib(c.b, d, [f]), c.g++
                        }, a), a = Ug(), ec(e, a.ea), Mg(e.toString())
                    }
                },
                Tg = function(a, b) {
                    b.id = "ima_html5";
                    var c = Ug();
                    return b.c = a.b, b.domain = c.aa, b
                },
                Ug = function() {
                    var a = M(),
                        b = document;
                    return new dc(a.parent == a ? a.location.href : b.referrer)
                },
                Wg = function() {
                    this.b = -1
                },
                Xg = new Wg;
            Wg.prototype.clear = function() {};
            var Yg = function(a) {
                this.g = a
            };
            Yg.prototype.b = function() {
                return this.g
            };
            var Zg = function() {
                N.call(this), this.currentTime = 0
            };
            v(Zg, N);
            var $g = function(a, b) {
                    this.message = a, this.errorCode = b
                },
                ah = new $g("Invalid usage of the API. Cause: {0}", 900),
                bh = new $g("The provided {0} information: {1} is invalid.", 1101),
                ch = function(a, b) {
                    var c;
                    if (c = b || null, !(c instanceof H)) {
                        var d = a.errorCode,
                            e = a.message,
                            f = $a(arguments, 2);
                        if (0 < f.length)
                            for (var g = 0; g < f.length; g++) e = e.replace(new RegExp("\\{" + g + "\\}", "ig"), f[g]);
                        d = new H("adPlayError", e, d), d.g = c, c = d
                    }
                    return c
                },
                dh = function(a) {
                    if (Zg.call(this), this.currentTime = a.currentTime, !("currentTime" in a) || isNaN(a.currentTime)) throw ch(bh, null, "content", "currentTime");
                    this.g = a, this.b = new O(250), this.h = new V(this), Wf(this.h, this.b, "tick", this.j, !1, this)
                };
            v(dh, Zg), dh.prototype.start = function() {
                this.b.start()
            }, dh.prototype.B = function() {
                dh.T.B.call(this), this.h.G(), this.b.G()
            }, dh.prototype.j = function() {
                if ("currentTime" in this.g && !isNaN(this.g.currentTime)) {
                    var a = this.currentTime;
                    this.currentTime = this.g.currentTime, a != this.currentTime && this.dispatchEvent(new I("currentTimeUpdate"))
                } else this.dispatchEvent(new I("contentWrapperError")), Fd(this.b)
            };
            var eh = function(a, b) {
                U.call(this, "adMetadata", a), this.g = b || null
            };
            v(eh, U), eh.prototype.k = function() {
                return this.g
            };
            var fh = function() {
                N.call(this), this.k = this.l = this.m = !1, this.b = 0, this.g = [], this.q = !1, this.j = {}
            };
            v(fh, N);
            var hh = function(a, b) {
                    null == b || a.m || (a.h = b, gh(a), a.m = !0)
                },
                jh = function(a) {
                    null != a.h && a.m && (ih(a), a.m = !1, a.l = !1, a.k = !1, a.b = 0, a.g = [], a.q = !1)
                },
                gh = function(a) {
                    ih(a), a.j = a.h instanceof N || !eg() ? {
                        click: u(a.w, a)
                    } : {
                        touchstart: u(a.D, a),
                        touchmove: u(a.F, a),
                        touchend: u(a.A, a)
                    }, yb(a.j, function(a, b) {
                        this.h.addEventListener(b, a, !1)
                    }, a)
                },
                ih = function(a) {
                    yb(a.j, function(a, b) {
                        this.h.removeEventListener(b, a, !1)
                    }, a), a.j = {}
                };
            fh.prototype.D = function(a) {
                this.l = !0, this.b = a.touches.length, this.q = kh(this, a.touches) || 1 != a.touches.length, lh(this, a.touches)
            }, fh.prototype.F = function(a) {
                this.k = !0, this.b = a.touches.length
            }, fh.prototype.A = function(a) {
                this.l && 1 == this.b && !this.k && !this.q && kh(this, a.changedTouches) && this.dispatchEvent(new I("click")), this.b = a.touches.length, 0 == this.b && (this.k = this.l = !1, this.g = [])
            }, fh.prototype.w = function() {
                this.dispatchEvent(new I("click"))
            };
            var lh = function(a, b) {
                    a.g = [], y(b, function(a) {
                        var b = this.g;
                        a = a.identifier, 0 <= Pa(b, a) || b.push(a)
                    }, a)
                },
                kh = function(a, b) {
                    return Sa(b, function(a) {
                        return 0 <= Pa(this.g, a.identifier)
                    }, a)
                };
            fh.prototype.B = function() {
                jh(this), fh.T.B.call(this)
            };
            var mh = function() {
                this.b = [], this.g = []
            };
            g = mh.prototype, g.ga = function() {
                return this.b.length + this.g.length
            }, g.isEmpty = function() {
                return 0 == this.b.length && 0 == this.g.length
            }, g.clear = function() {
                this.b = [], this.g = []
            }, g.contains = function(a) {
                return 0 <= Pa(this.b, a) || 0 <= Pa(this.g, a)
            }, g.ba = function() {
                for (var a = [], b = this.b.length - 1; b >= 0; --b) a.push(this.b[b]);
                for (var c = this.g.length, b = 0; c > b; ++b) a.push(this.g[b]);
                return a
            };
            var nh = function() {},
                oh = {
                    Bd: "Image",
                    wd: "Flash",
                    hc: "All"
                },
                ph = {
                    xd: "Html",
                    yd: "IFrame",
                    Nd: "Static",
                    hc: "All"
                },
                qh = {
                    zd: "IgnoreSize",
                    Kd: "SelectExactMatch",
                    Ld: "SelectNearMatch"
                },
                sh = function(a, b) {
                    if (null == a || 0 >= a.width || 0 >= a.height) throw ch(bh, null, "ad slot size", a.toString());
                    this.g = a, this.b = null != b ? b : new nh, this.k = rh(ph, this.b.j) ? this.b.j : "All", this.j = rh(oh, this.b.h) ? this.b.h : "All", this.l = rh(qh, this.b.k) ? this.b.k : "SelectExactMatch", this.h = null != this.b.g ? this.b.g : [], this.o = da(this.b.b) && 0 < this.b.b && 100 >= this.b.b ? this.b.b : 90
                },
                vh = function(a, b) {
                    var c = [];
                    return y(b, function(a) {
                        !la(a.b) && (isNaN(a.o) || isNaN(a.k) || a.k == a.o) && th(this, a) ? c.push(a) : (a = uh(this, a), null != a && !la(a.b) && c.push(a))
                    }, a), c
                },
                th = function(a, b) {
                    var c;
                    if ((c = "Flash" != b.g() || Pd) && ((c = "All" == a.k || a.k == b.A) && (c = b.g(), c = null != c ? "All" == a.j || a.j == c : !0), c && (c = b.O, c = 0 == a.h.length ? !0 : null != c ? 0 <= Pa(a.h, c) : !1)), c) {
                        c = b.h;
                        var d;
                        (d = "IgnoreSize" == a.l) || (d = a.g, d = d == c ? !0 : d && c ? d.width == c.width && d.height == c.height : !1), c = d ? !0 : "SelectNearMatch" == a.l && (c.width > a.g.width || c.height > a.g.height || c.width < a.o / 100 * a.g.width || c.height < a.o / 100 * a.g.height ? !1 : !0)
                    } else c = !1;
                    return c
                },
                uh = function(a, b) {
                    var c = b.j;
                    return null != c ? Ua(c, function(a) {
                        return th(this, a)
                    }, a) : null
                },
                rh = function(a, b) {
                    var c;
                    if (c = null != b) a: {
                        for (var d in a)
                            if (a[d] == b) {
                                c = !0;
                                break a
                            }
                        c = !1
                    }
                    return c
                },
                wh = function(a) {
                    var b = {};
                    return y(a.split(","), function(a) {
                        var c = a.split("=");
                        2 == c.length && (a = ma(c[0]), c = ma(c[1]), 0 < a.length && (b[a] = c))
                    }), b
                },
                W = function() {
                    this.o = 1, this.h = -1, this.b = 1, this.k = this.j = 0, this.g = !1
                };
            g = W.prototype, g.xc = function() {
                return this.o
            }, g.uc = function() {
                return this.h
            }, g.sc = function() {
                return this.b
            }, g.vc = function() {
                return this.j
            }, g.wc = function() {
                return this.k
            }, g.tc = function() {
                return this.g
            };
            var X = function(a) {
                this.b = a.content, this.l = a.contentType, this.h = a.size, this.k = a.masterSequenceNumber, this.A = a.resourceType, this.o = a.sequenceNumber, this.O = a.adSlotId, this.j = [], a = a.backupCompanions, null != a && (this.j = Ra(a, function(a) {
                    return new X(a)
                }))
            };
            X.prototype.m = function() {
                return this.b
            }, X.prototype.g = function() {
                return this.l
            }, X.prototype.w = function() {
                return this.h.width
            }, X.prototype.q = function() {
                return this.h.height
            };
            var Y = function(a) {
                this.b = a
            };
            g = Y.prototype, g.yc = function() {
                return this.b.adId
            }, g.Ac = function() {
                return this.b.adSystem
            }, g.xb = function() {
                return this.b.clickThroughUrl
            }, g.Jc = function() {
                return this.b.adWrapperIds
            }, g.Kc = function() {
                return this.b.adWrapperSystems
            }, g.Lc = function() {
                return this.b.linear
            }, g.Mc = function() {
                return this.b.skippable
            }, g.Cc = function() {
                return this.b.contentType
            }, g.oc = function() {
                return this.b.description
            }, g.pc = function() {
                return this.b.title
            }, g.hb = function() {
                return this.b.duration
            }, g.Ic = function() {
                return this.b.width
            }, g.Dc = function() {
                return this.b.height
            }, g.Hc = function() {
                return this.b.uiElements
            }, g.Ec = function() {
                return this.b.minSuggestedDuration
            }, g.zc = function() {
                var a = this.b.adPodInfo,
                    b = new W;
                return b.j = a.podIndex, b.k = a.timeOffset, b.o = a.totalAds, b.b = a.adPosition, b.g = a.isBumper, b.h = a.maxDuration, b
            }, g.Bc = function(a, b, c) {
                var d = Ra(this.b.companions, function(a) {
                    return new X(a)
                });
                return vh(new sh(new L(a, b), c), d)
            }, g.Fc = function() {
                return wh(wa(this.b.traffickingParameters))
            }, g.Gc = function() {
                return this.b.traffickingParameters
            };
            var Z = function(a, b, c, d) {
                N.call(this), this.b = a, this.h = null, this.N = d, this.J = !1, this.P = 1, this.W = b, this.D = -1, this.g = this.j = null, this.l = new mh, this.M = !1, this.q = new A, this.w = this.K = !1, this.F = c && null != this.b.g, this.A = new V(this), this.A.r(this.N, "adsManager", this.U)
            };
            v(Z, N), Z.prototype.U = function(a) {
                switch (a.H) {
                    case "error":
                        a = a.I;
                        var b = new Bc(xh(a));
                        this.M ? (this.dispatchEvent(b), this.j = null) : this.l.g.push(b), Vg(Ng.getInstance(), 7, {
                            error: a.errorCode
                        }, !0);
                        break;
                    case "contentPauseRequested":
                        b = this.b.j, this.b.o() && null != this.h && this.h.restoreCustomPlaybackStateOnAdBreakComplete && null != b.eb && b.eb(), this.k(a.H, a.I);
                        break;
                    case "contentResumeRequested":
                        a = u(Z.prototype.k, this, a.H, a.I), b = this.b.j, this.b.o() && null != this.h && this.h.restoreCustomPlaybackStateOnAdBreakComplete && null != b.cb ? b.cb(a) : a();
                        break;
                    case "remainingTime":
                        b = a.I, this.D = b.remainingTime;
                        break;
                    case "skip":
                        this.k(a.H, a.I);
                        break;
                    case "log":
                        b = a.I, this.k(a.H, b.adData, b.logData);
                        break;
                    case "companionBackfill":
                        a = aa("window.google_show_companion_ad"), null != a && a();
                        break;
                    case "skipshown":
                        this.J = !0, this.k(a.H, a.I);
                        break;
                    default:
                        this.k(a.H, a.I)
                }
            }, Z.prototype.k = function(a, b, c) {
                if (null == b.companions) {
                    var d = this.q.get(b.adId);
                    b.companions = null != d ? d : []
                }
                switch (d = null != b.adData ? new Y(b.adData) : null, a) {
                    case "adBreakReady":
                        a = new U(a, null, b);
                        break;
                    case "adMetadata":
                        a = null, null != b.adCuePoints && (a = new Yg(b.adCuePoints)), a = new eh(d, a);
                        break;
                    case "allAdsCompleted":
                        this.K = !0, a = new U(a, d);
                        break;
                    case "contentPauseRequested":
                        this.w = !1, a = new U(a, d);
                        break;
                    case "contentResumeRequested":
                        this.w = !0, a = new U(a, d);
                        break;
                    case "loaded":
                        this.j = d, this.D = d.hb(), a = new U(a, d, b.adData);
                        break;
                    case "start":
                        Ib(this.q, b.adId, b.companions), null != yh(this.b) && (null != this.g ? jh(this.g) : (this.g = new fh, this.A.r(this.g, "click", this.Ub)), hh(this.g, yh(this.b))), a = new U(a, d);
                        break;
                    case "complete":
                        null != this.g && jh(this.g), this.j = null, Lb(this.q, b.adId), a = new U(a, d);
                        break;
                    case "log":
                        b = {
                            adError: xh(c)
                        }, a = new U(a, d, b);
                        break;
                    case "urlNavigationRequested":
                        a = new U(a, d, b.urlNavigationData);
                        break;
                    default:
                        a = new U(a, d)
                }
                this.dispatchEvent(a), this.K && this.w && this.ib()
            };
            var xh = function(a) {
                    var b = new H(a.type, a.errorMessage, a.errorCode);
                    return null != a.innerError && (b.g = Error(a.innerError)), b
                },
                $ = function(a, b, c) {
                    a.N.send("adsManager", b, c)
                };
            g = Z.prototype, g.fc = function() {
                $(this, "contentTimeUpdate", {
                    currentTime: this.R.currentTime
                })
            }, g.Xc = function() {
                $(this, "sendImpressionUrls")
            }, g.Uc = function(a, b, c) {
                if (this.l.isEmpty()) this.M = !0, this.mb(a, b, c), $(this, "init", {
                    width: a,
                    height: b,
                    viewMode: c
                });
                else {
                    for (; !this.l.isEmpty();) a = this.l, 0 == a.b.length && (a.b = a.g, a.b.reverse(), a.g = []), a = a.b.pop(), this.dispatchEvent(a);
                    this.G()
                }
            }, g.ld = function() {
                return this.b.o()
            }, g.kd = function() {
                return this.F
            }, g.Sc = function() {
                return this.D
            }, g.Pc = function() {
                return this.J
            }, g.$c = function() {
                $(this, "skip")
            }, g.start = function() {
                var a = this.b;
                a.m = this.F && null != a.g, this.b.k.g.style.opacity = 1, $(this, "start")
            }, g.Ub = function() {
                if ((null == this.h || !this.h.disableClickThrough) && null != this.j) {
                    var a = this.j.xb();
                    null != a && window.open(Lg(a), "_blank")
                }
            }, g.mb = function(a, b, c) {
                var d = this.b,
                    e = d.h;
                null != e && (-1 == a ? (e.style.right = 0, e.style.left = 0) : e.style.width = a + "px", -1 == b ? (e.style.bottom = 0, e.style.top = 0) : e.style.height = b + "px"), null != d.k && (d = d.k, d.g.width = -1 == a ? "100%" : a, d.g.height = -1 == b ? "100%" : b), $(this, "resize", {
                    width: a,
                    height: b,
                    viewMode: c
                })
            }, g.ad = function() {
                $(this, "stop")
            }, g.Oc = function() {
                $(this, "expand")
            }, g.Nc = function() {
                $(this, "collapse")
            }, g.Tc = function() {
                return this.P
            }, g.Zc = function(a) {
                this.P = a;
                var b = this.b.j;
                null != b && b.Oa(a), $(this, "volume", {
                    volume: a
                })
            }, g.Yc = function(a) {
                $(this, "mediaUrl", {
                    mediaUrl: a
                })
            }, g.Vc = function() {
                $(this, "pause")
            }, g.Wc = function() {
                $(this, "resume")
            }, g.ib = function() {
                this.G()
            }, g.Qc = function() {
                return this.W
            }, g.Rc = function() {
                return this.j
            }, g.B = function() {
                $(this, "destroy"), null != this.g && this.g.G(), this.A.G(), this.l.clear(), this.m && (Fd(this.m.b), this.m.G()), Z.T.B.call(this)
            };
            var zh = function() {};
            zh.prototype.disableClickThrough = !1, zh.prototype.mimeTypes = null, zh.prototype.restoreCustomPlaybackStateOnAdBreakComplete = !1;
            var Ah = function(a, b, c) {
                I.call(this, "adsManagerLoaded"), this.g = a, this.h = b, this.l = c || ""
            };
            v(Ah, I), Ah.prototype.j = function(a, b) {
                var c = this.g;
                c.R = a, null != b && (c.h = b), null != a.currentTime && (c.m = new dh(a), c.m.r("currentTimeUpdate", c.fc, !1, c), c.m.start());
                var d = {};
                return null != b && Hb(d, b), c.F && (d.useVideoAdUi = !1, d.disableClickThrough = !0), $(c, "configure", {
                    adsRenderingSettings: d
                }), this.g
            }, Ah.prototype.o = function() {
                return this.h
            }, Ah.prototype.k = function() {
                return this.l
            };
            var Bh = function(a) {
                N.call(this), this.g = a || "goog_" + za++, this.b = []
            };
            v(Bh, N), Bh.prototype.k = !1, Bh.prototype.connect = function() {
                for (this.k = !0; 0 != this.b.length;) {
                    var a = this.b.shift();
                    Ch(this, a.name, a.type, a.data)
                }
            }, Bh.prototype.send = function(a, b, c) {
                this.k ? Ch(this, a, b, c) : this.b.push({
                    name: a,
                    type: b,
                    data: c
                })
            };
            var Dh = function(a, b, c, d, e) {
                I.call(this, a), this.H = b, this.I = c, this.ya = d, this.gb = e
            };
            v(Dh, I), Dh.prototype.toString = function() {
                return ""
            };
            var Eh = function(a, b) {
                Bh.call(this, b), this.h = a, this.V = null, this.j = new V(this), this.j.r(M(), "message", this.l)
            };
            v(Eh, Bh);
            var Fh = function(a) {
                    if (null == a || !t(a) || 0 != a.lastIndexOf("ima://", 0)) return null;
                    a = a.substr(6);
                    try {
                        return lf(a)
                    } catch (b) {
                        return null
                    }
                },
                Ch = function(a, b, c, d) {
                    null != a.V && null != a.V.postMessage && a.V.postMessage(Gh(a, b, c, d), "*"), null != a.V && null == a.V.postMessage && Vg(Ng.getInstance(), 11)
                };
            Eh.prototype.B = function() {
                this.j.G(), Eh.T.B.call(this)
            }, Eh.prototype.l = function(a) {
                a = a.g;
                var b = Fh(a.data);
                if (null != b) {
                    if (null == this.V) this.V = a.source;
                    else if (this.V != a.source) return;
                    var c = b.channel;
                    null != c && c == this.h && (c = b.sid, null != c && ("*" != this.g && c != this.g || this.dispatchEvent(new Dh(b.name, b.type, b.data || {}, b.sid, a.origin))))
                }
            };
            var Gh = function(a, b, c, d) {
                    var e = {};
                    return e.name = b, e.type = c, null != d && (e.data = d), e.sid = a.g, e.channel = a.h, "ima://" + of(e)
                },
                Hh = function(a, b) {
                    N.call(this), this.j = a, this.h = b, this.b = {}, this.g = new V(this), this.g.r(M(), "message", this.k)
                };
            v(Hh, N), Hh.prototype.send = function(a) {
                var b = a.g;
                this.b.hasOwnProperty(b) && this.b[b].send(a.type, a.H, a.I)
            };
            var Jh = function(a, b, c, d) {
                a.b.hasOwnProperty(b) || (c = new Eh(b, c), a.g.r(c, a.j, function(a) {
                    this.dispatchEvent(new Ih(a.type, a.H, a.I, a.ya, a.gb, b))
                }), c.V = d, c.connect(), a.b[b] = c)
            };
            Hh.prototype.B = function() {
                this.g.G();
                for (var a in this.b) Ac(this.b[a]);
                Hh.T.B.call(this)
            }, Hh.prototype.k = function(a) {
                a = a.g;
                var b = Fh(a.data);
                if (null != b) {
                    var c = b.channel;
                    if (this.h && !this.b.hasOwnProperty(c)) {
                        var d = b.sid;
                        Jh(this, c, d, a.source), this.dispatchEvent(new Ih(b.name, b.type, b.data || {}, d, a.origin, c))
                    }
                }
            };
            var Ih = function(a, b, c, d, e, f) {
                Dh.call(this, a, b, c, d, e), this.g = f
            };
            v(Ih, Dh);
            var Lh = function() {
                var a = aa("google.ima.gptProxyInstance", M());
                return null != a ? a : (V.call(this), this.h = new Hh("gpt", !0), zc(this, ia(Ac, this.h)), this.r(this.h, "gpt", this.l), this.b = null, void(Kh() || M().top === M() || (this.b = new Hh("gpt", !1), zc(this, ia(Ac, this.b)), this.r(this.b, "gpt", this.k))))
            };
            v(Lh, V);
            var Kh = function() {
                    return !!aa("googletag.cmd", M())
                },
                Mh = function() {
                    var a = aa("googletag.console", M());
                    return null != a ? a : null
                };
            Lh.prototype.l = function(a) {
                var b = a.gb,
                    c = bc("//imasdk.googleapis.com"),
                    b = bc(b);
                if (c[3] == b[3] && c[4] == b[4])
                    if (null != this.b) Jh(this.b, a.g, a.ya, M().parent), null != this.b && this.b.send(a);
                    else if (c = a.I, null != c && p(c.scope)) {
                    var d, b = c.scope,
                        c = c.args;
                    if ("proxy" == b) c = a.H, "isGptPresent" == c ? d = Kh() : "isConsolePresent" == c && (d = null != Mh());
                    else if (Kh())
                        if ("pubads" == b || "companionAds" == b) {
                            d = a.H;
                            var e, f = M().googletag;
                            if (null != f && null != f[b] && (f = f[b](), null != f && (d = f[d], null != d))) try {
                                e = d.apply(f, c)
                            } catch (g) {}
                            d = e
                        } else if ("console" == b) {
                        if (f = a.H, e = Mh(), null != e && (f = e[f], null != f)) try {
                            f.apply(e, c)
                        } catch (h) {}
                    } else if (null === b) {
                        if (e = a.H, d = M(), 0 <= Pa(["googleGetCompanionAdSlots", "googleSetCompanionAdContents"], e) && (e = d[e], null != e)) try {
                            f = e.apply(d, c)
                        } catch (i) {}
                        d = f
                    }
                    p(d) && (a.I.returnValue = d, this.h.send(a))
                }
            }, Lh.prototype.k = function(a) {
                this.h.send(a)
            };
            var Nh = function() {
                N.call(this)
            };
            v(Nh, N);
            var Oh = {
                    td: "beginFullscreen",
                    CLICK: "click",
                    ud: "end",
                    vd: "endFullscreen",
                    ERROR: "error",
                    Dd: "mediaLoadTimeout",
                    Bb: "pause",
                    Jd: "play",
                    Md: "skip",
                    Cb: "start",
                    Pd: "timeUpdate",
                    Rd: "volumeChange"
                },
                Ph = function(a, b, c, d, e, f, g, h) {
                    this.h = a, this.j = b, this.k = c, this.o = g, this.l = d, this.m = e, this.b = f, this.g = h
                },
                Rh = function() {
                    var a = Array.prototype.slice.call(arguments),
                        b = a.shift();
                    if ("undefined" == typeof b) throw Error("[goog.string.format] Template required");
                    return b.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(b, c, d, e, f, g) {
                        if ("%" == g) return "%";
                        var h = a.shift();
                        if ("undefined" == typeof h) throw Error("[goog.string.format] Not enough arguments");
                        return arguments[0] = h, Qh[g].apply(null, arguments)
                    })
                },
                Qh = {
                    s: function(a, b, c) {
                        return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + Array(c - a.length + 1).join(" ") : Array(c - a.length + 1).join(" ") + a
                    },
                    f: function(a, b, c, d, e) {
                        d = a.toString(), isNaN(e) || "" == e || (d = a.toFixed(e));
                        var f;
                        return f = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "", a >= 0 && (d = f + d), isNaN(c) || d.length >= c ? d : (d = isNaN(e) ? Math.abs(a).toString() : Math.abs(a).toFixed(e), a = c - d.length - f.length, d = 0 <= b.indexOf("-", 0) ? f + d + Array(a + 1).join(" ") : f + Array(a + 1).join(0 <= b.indexOf("0", 0) ? "0" : " ") + d)
                    },
                    d: function(a, b, c, d, e, f, g, h) {
                        return Qh.f(parseInt(a, 10), b, c, d, 0, f, g, h)
                    }
                };
            Qh.i = Qh.d, Qh.u = Qh.d;
            var Th = function(a, b) {
                N.call(this), this.j = new V(this), this.q = !1, this.w = "goog_" + za++, this.l = new A;
                var c = this.w,
                    c = Oc("iframe", {
                        src: ("https:" == document.location.protocol ? "https:" : "http:") + Rh("//imasdk.googleapis.com/js/core/bridge3.1.77_%s.html", Dc.Wa()) + "#" + c,
                        style: "border:0; opacity:0; margin:0; padding:0; position:relative;"
                    });
                Xf(this.j, c, "load", this.Lb, void 0), a.appendChild(c), this.g = c, this.k = Sh(this), this.m = b, this.b = this.m.j, this.h = null, this.j.r(this.k, "mouse", this.A), this.j.r(this.k, "touch", this.Ob), null != this.b && (this.j.r(this.k, "displayContainer", this.Mb), this.j.r(this.k, "videoDisplay", this.Nb), this.j.r(this.b, Bb(Oh), this.Pb));
                var c = M(),
                    d = aa("google.ima.gptProxyInstance", c);
                null == d && (d = new Lh, q("google.ima.gptProxyInstance", d, c))
            };
            v(Th, N);
            var Sh = function(a, b) {
                var c = b || "*",
                    d = a.l.get(c);
                return null == d && (d = new Eh(a.w, c), a.q && (d.V = Sc(a.g), d.connect()), Ib(a.l, c, d)), d
            };
            Th.prototype.B = function() {
                this.j.G(), null !== this.h && (this.h.G(), this.h = null), xb(this.l.wa(!1), function(a) {
                    a.G()
                }), this.l.clear(), Qc(this.g), Th.T.B.call(this)
            }, Th.prototype.A = function(a) {
                var b = a.I,
                    c = Yc(this.g),
                    d = document.createEvent("MouseEvent");
                d.initMouseEvent(a.H, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, b.button, null), (!de || eg() || 0 == document.webkitIsFullScreen) && (this.g.blur(), window.focus()), this.g.dispatchEvent(d)
            };
            var Uh = function(a, b) {
                var c = Yc(a.g),
                    d = Ra(b, function(a) {
                        return document.createTouch(window, this.g, a.identifier, a.pageX + c.x, a.pageY + c.y, a.screenX, a.screenY)
                    }, a);
                return document.createTouchList.apply(document, d)
            };
            g = Th.prototype, g.Ob = function(a) {
                    var b = a.I,
                        c = Yc(this.g),
                        d = document.createEvent("TouchEvent");
                    d.initTouchEvent(a.H, !0, !0, window, b.detail, b.screenX, b.screenY, b.clientX + c.x, b.clientY + c.y, b.ctrlKey, b.altKey, b.shiftKey, b.metaKey, Uh(this, b.touches), Uh(this, b.targetTouches), Uh(this, b.changedTouches), b.scale, b.rotation), this.g.dispatchEvent(d)
                }, g.Nb = function(a) {
                    if (null != this.b) {
                        var b = a.I;
                        switch (a.H) {
                            case "startTracking":
                                this.b.ub();
                                break;
                            case "stopTracking":
                                this.b.qa();
                                break;
                            case "exitFullscreen":
                                this.b.rb();
                                break;
                            case "play":
                                this.b.za();
                                break;
                            case "pause":
                                this.b.tb();
                                break;
                            case "load":
                                this.b.sb(b.videoUrl, b.mimeType);
                                break;
                            case "setCurrentTime":
                                this.b.va(b.currentTime);
                                break;
                            case "setPlaybackOptions":
                                a = b.playbackOptions, this.b.vb(new Ph(a.adFormat, a.adSenseAgcid, a.ctaAnnotationTrackingEvents, a.showAnnotations, a.viewCountsDisabled, a.loadVideoTimeout, a.ibaDisabled, a.enablePreloading))
                        }
                    }
                }, g.Pb = function(a) {
                    var b = {};
                    switch (a.type) {
                        case "beginFullscreen":
                            a = "fullscreen";
                            break;
                        case "endFullscreen":
                            a = "exitFullscreen";
                            break;
                        case "click":
                            a = "click";
                            break;
                        case "end":
                            a = "end";
                            break;
                        case "error":
                            a = "error";
                            break;
                        case "mediaLoadTimeout":
                            a = "mediaLoadTimeout";
                            break;
                        case "pause":
                            a = "pause", b.ended = this.b.xa();
                            break;
                        case "play":
                            a = "play";
                            break;
                        case "skip":
                            a = "skip";
                            break;
                        case "start":
                            a = "start";
                            break;
                        case "timeUpdate":
                            a = "timeupdate", b.currentTime = this.b.da(), b.duration = this.b.Na();
                            break;
                        case "volumeChange":
                            a = "volumeChange", b.volume = this.b.ob();
                            break;
                        default:
                            return
                    }
                    this.k.send("videoDisplay", a, b)
                }, g.Mb = function(a) {
                    switch (a.H) {
                        case "showVideo":
                            null != this.h ? jh(this.h) : (this.h = new fh, this.j.r(this.h, "click", this.cc)), hh(this.h, yh(this.m)), a = this.m, null != a.b && (a = a.b.b, null != a && (a.style.display = "block"));
                            break;
                        case "hide":
                            null !== this.h && (this.h.G(), this.h = null), a = this.m, null != a.b && (a = a.b.b, null != a && (a.style.display = "none"))
                    }
                }, g.cc = function() {
                    this.k.send("displayContainer", "videoClick")
                }, g.Lb = function() {
                    xb(this.l.wa(!1), function(a) {
                        a.V = Sc(this.g), a.connect()
                    }, this), this.q = !0
                },
                function() {
                    if (!Ab(function(a) {
                            return a.match(M().location.href)
                        })) {
                        var a = Jc();
                        null == Ua(a, function(a) {
                            return Ab(function(b) {
                                return b.match(a.src)
                            })
                        }) && window.console && console.log("IMA SDK is either not loaded from a google domain or is not a supported version.")
                    }
                }();
            var Vh = function(a) {
                if (N.call(this), this.b = a, this.h = new A, this.g = this.b.k, this.j = new V(this), this.g) {
                    a = jg();
                    var b = Sh(this.g);
                    a.g || (a.b = b || null, a.b && a.j.r(a.b, "activityMonitor", a.k), a.g = !0), b = String(Math.floor(1e9 * Math.random())), Ib(a.h, b, this.b.w), this.k = b
                }
                var c;
                a: {
                    try {
                        c = window.top.location.href
                    } catch (d) {
                        c = 2;
                        break a
                    }
                    c = null != c ? c == window.document.location.href ? 0 : 1 : 2
                }
                Xg.b = c
            };
            v(Vh, N), g = Vh.prototype, g.B = function() {
                this.j.G();
                var a = jg();
                Lb(a.h, this.k), Vh.T.B.call(this)
            }, g.gd = function() {
                this.G()
            }, g.jd = function(a, b) {
                a.adTagUrl && Vg(Ng.getInstance(), 8, {
                    adtagurl: a.adTagUrl,
                    customPlayback: this.b.o(),
                    customClick: null != this.b.g,
                    restrict: Dc.ta()
                });
                var c;
                try {
                    c = window.top.location.href
                } catch (d) {
                    c = window.location.href
                }
                a.location = c, a.referrer = window.document.referrer, a.supportsYouTubeHosted = this.b.q(), c = a.adTagUrl;
                var e;
                if (e = null != c) {
                    e = c.search(cc);
                    var f;
                    a: {
                        for (f = 0; 0 <= (f = c.indexOf("client", f)) && e > f;) {
                            var g = c.charCodeAt(f - 1);
                            if ((38 == g || 63 == g) && (g = c.charCodeAt(f + 6), !g || 61 == g || 38 == g || 35 == g)) break a;
                            f += 7
                        }
                        f = -1
                    }
                    0 > f ? c = null : (g = c.indexOf("&", f), (0 > g || g > e) && (g = e), f += 7, c = decodeURIComponent(c.substr(f, g - f).replace(/\+/g, " "))), e = "ca-pub-6219811747049371" != c
                }
                if (e ? c = null : (c = aa("window.yt.util.activity.getTimeSinceActive"), c = null != c ? c().toString() : null), null != c && (a.lastActivity = c), c = a.adTagUrl, null != c ? (e = new dc(c), c = e.ua, e = e.aa, f = e.length - 27, (e = f >= 0 && e.indexOf("googleads.g.doubleclick.net", f) == f) && (e = la(wa(c)) ? !1 : /\/pagead\/ads/.test(c)), c = e) : c = !1, c) {
                    c = window, e = Na().document, f = {};
                    var h, i, g = kb(window);
                    if (h = wc()) h = {
                        url: h,
                        La: !0
                    };
                    else if (h = g.location.href, g == g.top) h = {
                        url: h,
                        La: !0
                    };
                    else {
                        i = !1;
                        var j = g.document;
                        j && j.referrer && (h = j.referrer, g.parent == g.top && (i = !0)), (j = g.location.ancestorOrigins) && (j = j[j.length - 1]) && -1 == h.indexOf(j) && (i = !1, h = j), h = {
                            url: h,
                            La: i
                        }
                    }
                    a: {
                        i = Na();
                        var j = c.Rb || i.Rb,
                            k = c.Qb || i.Qb;
                        if (i.top == i) i = !1;
                        else {
                            var l = e.documentElement;
                            if (j && k) {
                                var m = 1,
                                    n = 1;
                                if (i.innerHeight ? (m = i.innerWidth, n = i.innerHeight) : l && l.clientHeight ? (m = l.clientWidth, n = l.clientHeight) : e.body && (m = e.body.clientWidth, n = e.body.clientHeight), n > 2 * k || m > 2 * j) {
                                    i = !1;
                                    break a
                                }
                            }
                            i = !0
                        }
                    }
                    if (h = h.La, j = Na(), j = j.top == j ? 0 : Fa(j.top) ? 1 : 2, k = 4, i || 1 != j ? i || 2 != j ? i && 1 == j ? k = 7 : i && 2 == j && (k = 8) : k = 6 : k = 5, h && (k |= 16), f.pd = "" + k, !c.Ka && "ad.yieldmanager.com" == e.domain) {
                        for (h = e.URL.substring(e.URL.lastIndexOf("http")); - 1 < h.indexOf("%");) try {
                            h = decodeURIComponent(h)
                        } catch (o) {
                            break
                        }
                        c.Ka = h
                    }!wc() && c.Ka ? (f.bb = c.Ka, f.Tb = xc(e, i) || "EMPTY") : (f.bb = xc(e, i), f.Tb = null), f.qd = e.URL == f.bb ? Date.parse(e.lastModified) / 1e3 : null, f.rd = g == g.top ? g.document.referrer : wc(!0) || "", a.adSenseParams = f
                }
                e = "goog_" + za++, Ib(this.h, e, b || null), c = {}, Hb(c, a), c.settings = {
                    allowVpaid: this.ca().b,
                    autoPlayAdBreaks: this.ca().ab(),
                    chromelessPlayer: !1,
                    companionBackfill: this.ca().Ya(),
                    isAdMob: !1,
                    isYouTube: !1,
                    numRedirects: this.ca().Za(),
                    onScreenDetection: !0,
                    ppid: this.ca().$a(),
                    restrictToCustomPlayback: this.ca().ta()
                }, f = this.b.j, c.videoEnvironment = {
                    iframeState: Xg.b,
                    osdId: this.k,
                    supportedMimeTypes: null != f ? f.Xa() : null,
                    usesChromelessPlayer: this.b.F(),
                    usesCustomVideoPlayback: this.b.o(),
                    usesYouTubePlayer: this.b.q()
                }, e = Sh(this.g, e), this.j.r(e, "adsLoader", this.Sb), e.send("adsLoader", "requestAds", c)
            }, g.ca = function() {
                return Dc
            }, g.fd = function() {
                Sh(this.g).send("adsLoader", "contentComplete")
            }, g.Sb = function(a) {
                switch (a.H) {
                    case "adsLoaded":
                        var b = a.I;
                        a = a.ya;
                        var c = new Z(this.b, b.adCuePoints, b.isCustomClickTrackingAllowed, Sh(this.g, a));
                        this.dispatchEvent(new Ah(c, this.h.get(a), b.response));
                        break;
                    case "error":
                        b = a.I, a = a.ya, c = new H(b.type, b.errorMessage, b.errorCode), null != b.innerError && (c.g = Error(b.innerError)), this.dispatchEvent(new Bc(c, this.h.get(a))), Vg(Ng.getInstance(), 7, {
                            error: b.errorCode
                        }, !0)
                }
            };
            var Wh = function(a) {
                this.g = 0, this.h = a || 100, this.b = []
            };
            g = Wh.prototype, g.get = function(a) {
                if (a >= this.b.length) throw Error("Out of bounds exception");
                return a = this.b.length < this.h ? a : (this.g + Number(a)) % this.h, this.b[a]
            }, g.ga = function() {
                return this.b.length
            }, g.isEmpty = function() {
                return 0 == this.b.length
            }, g.clear = function() {
                this.g = this.b.length = 0
            }, g.ba = function() {
                for (var a = this.ga(), b = this.ga(), c = [], a = this.ga() - a; b > a; a++) c.push(this.get(a));
                return c
            }, g.ka = function() {
                for (var a = [], b = this.ga(), c = 0; b > c; c++) a[c] = c;
                return a
            };
            var Xh = function(a) {
                N.call(this), this.b = a, this.M = "", this.l = -1, this.P = new Wh(4), this.w = this.N = 0, this.K = this.h = this.q = !1, this.F = this.ra(), this.A = this.sa(), this.R = 15e3, this.D = !1
            };
            v(Xh, Nh), g = Xh.prototype, g.Xa = function() {
                return Qa(Bb(Fg), function(a) {
                    return !la(this.b.canPlayType(a))
                }, this)
            }, g.vb = function(a) {
                this.R = 0 < a.b ? a.b : 15e3
            }, g.qb = function(a) {
                this.b.seekable.length ? this.b.seekable.end(0) > this.l && (this.b.currentTime = this.l, a()) : setTimeout(u(this.qb, this, a), 100)
            }, g.eb = function() {
                this.M = this.b.currentSrc, this.l = this.b.ended ? -1 : this.b.currentTime
            }, g.cb = function(a) {
                if (0 <= this.l) {
                    var b = this;
                    this.b.addEventListener("loadedmetadata", function c() {
                        b.qb(a), b.b.removeEventListener("loadedmetadata", c, !1)
                    }, !1), this.b.src = this.M, this.b.load()
                }
            }, g.sb = function(a) {
                Yh(this), this.b.src = a, this.b.load()
            }, g.Oa = function(a) {
                this.b.volume = a
            }, g.ob = function() {
                return this.b.volume
            }, g.za = function() {
                this.D = !1, Gd(this.b.play, 0, this.b), this.J = Gd(this.gc, this.R, this)
            }, g.tb = function() {
                this.D = !0, this.b.pause()
            }, g.nb = function() {
                return this.b.paused ? eg() || ce ? this.b.currentTime < this.b.duration : !0 : !1
            }, g.rb = function() {
                dg() && this.b.webkitDisplayingFullscreen && this.b.webkitExitFullscreen()
            }, g.sa = function() {
                return kg(this.b)
            }, g.va = function(a) {
                this.b.currentTime = a
            }, g.da = function() {
                return this.b.currentTime
            }, g.Na = function() {
                return isNaN(this.b.duration) ? -1 : this.b.duration
            }, g.xa = function() {
                return this.b.ended
            }, g.ra = function() {
                return new L(this.b.offsetWidth, this.b.offsetHeight)
            }, g.B = function() {
                this.qa(), this.b = null, Xh.T.B.call(this)
            }, g.ub = function() {
                this.qa(), this.g = new V(this), this.g.r(this.b, "canplay", this.Xb), this.g.r(this.b, "ended", this.Yb), this.g.r(this.b, "webkitbeginfullscreen", this.Ma), this.g.r(this.b, "webkitendfullscreen", this.jb), this.g.r(this.b, "pause", this.Zb), this.g.r(this.b, "playing", this.$b), this.g.r(this.b, "timeupdate", this.ac), this.g.r(this.b, "volumechange", this.bc), this.g.r(this.b, "error", this.fb), this.k = new fh, this.g.r(this.k, "click", this.Vb), hh(this.k, this.b), this.m = new O(1e3), this.g.r(this.m, "tick", this.Wb), this.m.start()
            }, g.qa = function() {
                null != this.k && (jh(this.k), this.k = null), null != this.m && this.m.G(), null != this.g && (this.g.G(), this.g = null), Yh(this)
            };
            var Yh = function(a) {
                    a.h = !1, a.K = !1, a.P.clear(), l.clearTimeout(a.J), Ac(a.j)
                },
                Zh = function(a) {
                    a.h || (a.h = !0, l.clearTimeout(a.J), a.dispatchEvent("start"), (dg() && cg() && w(B, "Safari") || Ob && (!Ob || !fg(bg, 4)) || w(B, "CrKey") || w(B, "PlayStation") || w(B, "Roku") || gg() || w(B, "Xbox")) && Ob && (!Ob || !fg(bg, 3)) && (!dg() || eg() && fg(ag, 4)) && a.Ma())
                };
            g = Xh.prototype, g.Xb = function() {
                var a;
                (a = de) && (a = B, a = !(a && (w(a, "SMART-TV") || w(a, "SmartTV")))), a && !this.K && (this.va(.001), this.K = !0)
            }, g.$b = function() {
                this.dispatchEvent("play"), eg() || be || Zh(this)
            }, g.ac = function() {
                if (!this.h && (eg() || be)) {
                    if (0 >= this.da()) return;
                    if (be && this.xa() && 1 == this.Na()) return void this.fb();
                    Zh(this)
                }
                if (eg()) {
                    if (!this.q && 1.5 < this.da() - this.N) return this.q = !0, void this.va(this.w);
                    this.N = this.da(), this.q = !1, this.da() > this.w && (this.w = this.da())
                }
                var a = this.P;
                a.b[a.g] = this.b.currentTime, a.g = (a.g + 1) % a.h, this.dispatchEvent("timeUpdate")
            }, g.bc = function() {
                this.dispatchEvent("volumeChange")
            }, g.Zb = function() {
                var a;
                this.h && eg() && !this.D && 2 > $h(this) ? (this.j = new O(250), this.g.r(this.j, "tick", this.dc), this.j.start(), a = !0) : a = !1, a || this.dispatchEvent("pause")
            }, g.Yb = function() {
                var a = !0;
                eg() && (a = this.w >= this.b.duration - 1.5), !this.q && a && this.dispatchEvent("end")
            }, g.Ma = function() {
                this.dispatchEvent("beginFullscreen")
            }, g.jb = function() {
                this.dispatchEvent("endFullscreen")
            }, g.fb = function() {
                l.clearTimeout(this.J), this.dispatchEvent("error")
            }, g.Vb = function() {
                this.dispatchEvent("click")
            }, g.Wb = function() {
                var a = this.ra(),
                    b = this.sa();
                (a.width != this.F.width || a.height != this.F.height) && (!this.A && b ? this.Ma() : this.A && !b && this.jb(), this.F = a, this.A = b)
            }, g.gc = function() {
                if (!this.h) {
                    try {
                        Vg(Ng.getInstance(), 16)
                    } catch (a) {}
                    Yh(this), this.dispatchEvent("mediaLoadTimeout")
                }
            }, g.dc = function() {
                if (this.xa() || !this.nb()) Ac(this.j);
                else {
                    var a = this.b.duration - this.b.currentTime,
                        b = $h(this);
                    b > 0 && (b >= 2 || 2 > a) && (Ac(this.j), this.za())
                }
            };
            var $h = function(a) {
                    var b;
                    a: {
                        for (b = a.b.buffered.length - 1; b >= 0;) {
                            if (a.b.buffered.start(b) <= a.b.currentTime) {
                                b = a.b.buffered.end(b);
                                break a
                            }
                            b--
                        }
                        b = 0
                    }
                    return b - a.b.currentTime
                },
                ai = function(a, b) {
                    if (null == a || !Rc(Hc(a), a)) throw ch(bh, null, "containerElement", "element");
                    this.k = a, this.g = this.b = null, this.j = b, this.h = null, this.b = Oc("div", {
                        style: "display:none;"
                    });
                    var c = Oc("video", {
                        style: "background-color:#000;position:absolute;width:100%;height:100%;"
                    });
                    c.setAttribute("webkit-playsinline", !0), this.g = c, this.h = Oc("div", {
                        style: "position:absolute;width:100%;height:100%;"
                    }), this.k.appendChild(this.b), this.b.appendChild(this.g), this.j && (c = Oc("div", {
                        id: this.j,
                        style: "display:none;background-color:#000;position:absolute;width:100%;height:100%;"
                    }), this.b.appendChild(c)), this.b.appendChild(this.h)
                };
            v(ai, yc), ai.prototype.G = function() {
                Qc(this.b)
            };
            var bi = function(a) {
                    if (la(wa(a))) return null;
                    var b = a.match(/^https?:\/\/[^\/]*youtu\.be\/([a-zA-Z0-9_-]+)$/);
                    return null != b && 2 == b.length ? b[1] : (b = a.match(/^https?:\/\/[^\/]*youtube.com\/video\/([a-zA-Z0-9_-]+)$/), null != b && 2 == b.length ? b[1] : (b = a.match(/^https?:\/\/[^\/]*youtube.com\/watch\/([a-zA-Z0-9_-]+)$/), null != b && 2 == b.length ? b[1] : (a = new dc(a).b, vc(a, "v") ? a.get("v").toString() : vc(a, "video_id") ? a.get("video_id").toString() : null)))
                },
                di = function(a) {
                    N.call(this), this.F = "ima-chromeless-video";
                    var b = null;
                    null != a && (t(a) ? this.F = a : b = a), this.D = new V(this), this.k = null, this.j = !1, this.R = this.ra(), this.P = this.sa(), this.m = -1, this.N = !1, this.l = -1, this.g = this.J = this.q = null, this.Y = "", this.h = !1, this.Z = null != b, this.w = this.M = this.b = null, this.A = void 0, this.W = null, null != b ? (this.h = !0, this.b = b, this.A = 2) : (a = u(this.Kb, this), ci ? a() : (Va.push(a), a = document.createElement("script"), a.src = "https://www.youtube.com/iframe_api", b = document.getElementsByTagName("script")[0], b.parentNode.insertBefore(a, b)))
                };
            v(di, Nh);
            var ei = {
                    el: "adunit",
                    controls: 0,
                    html5: 1,
                    playsinline: 1,
                    showinfo: 0
                },
                Va = [],
                ci = !1;
            g = di.prototype, g.vb = function(a) {
                this.g = a
            }, g.sb = function(a, b) {
                null !== a && (this.Y = a, this.h ? fi(this, a, b) : (this.q = a, this.J = b))
            }, g.Oa = function(a) {
                this.Z ? this.dispatchEvent("volumeChange") : this.h ? (a = Math.min(Math.max(100 * a, 0), 100), this.b.setVolume(a), this.l = -1, this.dispatchEvent("volumeChange")) : this.l = a
            }, g.ob = function() {
                return this.h ? this.b.getVolume() / 100 : this.l
            }, g.za = function() {
                if (!la(wa(this.Y))) {
                    if (!this.j) {
                        gi(this);
                        var a = 15e3;
                        null != this.g && 0 < this.g.b && (a = this.g.b), this.ja = Gd(this.na, a, this)
                    }
                    this.h ? (this.N = !1, hi(this), this.k = new O(100), this.D.r(this.k, "tick", this.ha), this.k.start(), this.g && this.g.g ? this.b.loadVideoByPlayerVars(this.W) : this.b.playVideo()) : this.N = !0
                }
            }, g.tb = function() {
                this.h && this.j && (hi(this), this.b.pauseVideo())
            }, g.nb = function() {
                return this.h ? 2 == this.b.getPlayerState(this.A) : !1
            }, g.rb = function() {}, g.sa = function() {
                var a = document.getElementById(this.F);
                return a ? kg(a) : !1
            }, g.va = function(a) {
                this.h ? this.b.seekTo(a, !1) : this.m = a
            }, g.da = function() {
                return this.h ? this.b.getCurrentTime(this.A) : -1
            }, g.Na = function() {
                return this.h && this.j ? this.b.getDuration(this.A) : -1
            }, g.Xa = function() {
                return Bb(Fg)
            }, g.xa = function() {
                return this.h ? 0 == this.b.getPlayerState(this.A) : !1
            }, g.ra = function() {
                var a = document.getElementById(this.F);
                return a ? new L(a.offsetWidth, a.offsetHeight) : new L(0, 0)
            }, g.ec = function() {
                var a = this.ra(),
                    b = this.sa();
                (a.width != this.R.width || a.height != this.R.height) && (!this.P && b ? this.dispatchEvent("beginFullscreen") : this.P && !b && this.dispatchEvent("endFullscreen"), this.R = a, this.P = b)
            }, g.ub = function() {
                this.M = u(this.ia, this), this.w = u(this.U, this), this.Z && (this.b.addEventListener("onAdStateChange", this.w), this.b.addEventListener("onReady", this.M), this.b.addEventListener("onStateChange", this.w)), this.K = new O(1e3), this.D.r(this.K, "tick", this.ec), this.K.start()
            }, g.qa = function() {
                this.Z && (this.b.removeEventListener("onAdStateChange", this.w), this.b.removeEventListener("onReady", this.M), this.b.removeEventListener("onStateChange", this.w)), null != this.K && this.K.G()
            }, g.Kb = function() {
                var a = this.F,
                    b = {
                        playerVars: Fb(ei),
                        events: {
                            onError: u(this.oa, this),
                            onReady: u(this.ia, this),
                            onAdStateChange: u(this.U, this),
                            onStateChange: u(this.U, this)
                        }
                    },
                    c = aa("YT");
                this.b = null != c && null != c.Player ? new c.Player(a, b) : null
            };
            var fi = function(a, b, c) {
                var d = {};
                if (null != a.g) {
                    var e = a.g.j;
                    null != e && (d.agcid = e), e = a.g.h, null != e && (d.adformat = e), (e = a.g.k) && (d.cta_conversion_urls = e), d.iv_load_policy = a.g.l ? 1 : 3, a.g.o && (d.noiba = 1), a.g.m && (d.utpsa = 1)
                }
                null != b ? Kg(Gg, b) ? (e = b.match(/yt_vid\/([a-zA-Z0-9_-]{11})/), e = null != e && 1 < e.length ? e[1] : null) : e = null != b && Kg(Hg, b) ? bi(b) : null : e = null, null === e ? d.url_encoded_third_party_media = "url=" + encodeURIComponent(b) + "&type=" + encodeURIComponent(null === c ? "" : c) : d.videoId = e,
                    a.j = !1, a.g && a.g.g ? (a.W = d, a.b.preloadVideoByPlayerVars(a.W)) : a.b.cueVideoByPlayerVars(d)
            };
            di.prototype.oa = function() {
                this.dispatchEvent("error")
            }, di.prototype.ia = function() {
                this.h = !0, -1 != this.l && (this.Oa(this.l), this.l = -1), null != this.q && (fi(this, this.q, this.J), this.J = this.q = null), -1 != this.m && (this.va(this.m), this.m = -1), this.N && this.za()
            }, di.prototype.U = function(a) {
                switch (a.data) {
                    case 0:
                        this.dispatchEvent(this.j ? "end" : "error");
                        break;
                    case 1:
                        this.j || (gi(this), this.j = !0, this.dispatchEvent("start")), this.dispatchEvent("play");
                        break;
                    case 2:
                        this.dispatchEvent("pause")
                }
            };
            var hi = function(a) {
                    a.D.Ca(a.k, "tick", a.ha), null != a.k && (Fd(a.k), a.k = null)
                },
                gi = function(a) {
                    null != a.ja && l.clearTimeout(a.ja)
                };
            di.prototype.ha = function() {
                this.dispatchEvent("timeUpdate")
            }, di.prototype.na = function() {
                this.dispatchEvent("mediaLoadTimeout")
            }, di.prototype.B = function() {
                hi(this), gi(this), this.qa(), this.h = !1, this.D.G(), this.m = -1, this.J = null, this.N = !1, this.q = null, this.l = -1, this.M = this.b = this.g = null, this.j = !1, this.Y = "", di.T.B.call(this)
            }, q("onYouTubeIframeAPIReady", function() {
                ci = !0, y(Va, function(a) {
                    a()
                }), Wa()
            }, window);
            var ii = function(a, b, c, d) {
                if (null == a || !Rc(Hc(a), a)) throw ch(bh, null, "containerElement", "element");
                var e = null != b || null != d;
                if (!e && Dc.ta()) throw ch(ah, null, "Custom video element was not provided even though the setting restrictToCustomPlayback is set to true.");
                var f, g = e;
                (f = Dc.ta()) || (f = (eg() || Ob || w(B, "CrKey") || w(B, "PlayStation") || w(B, "Roku") || gg() || w(B, "Xbox")) && e), f || (g = !1), this.D = (this.l = g) && null != d, e = Oc("div", {
                    style: "position:absolute"
                }), a.insertBefore(e, a.firstChild), this.h = e, this.b = !this.l && this.h && cg() ? new ai(this.h, null) : null, a = null, this.l ? b ? a = new Xh(b) : d && (a = new di(d)) : this.b && (a = new Xh(this.b.g)), this.g = (this.j = a) ? c || null : null, this.m = null != this.g, Vg(Ng.getInstance(), 8, {
                    enabled: this.l,
                    yt: null != d,
                    customClick: null != this.g
                });
                var h;
                h = this.l && b ? b : this.h, this.w = h, this.k = null != this.h ? new Th(this.h, this) : null
            };
            ii.prototype.O = function() {
                null != this.b && cg() && this.b.g.load()
            }, ii.prototype.A = function() {
                Ac(this.b), Ac(this.k), Ac(this.j), Qc(this.h)
            };
            var yh = function(a) {
                return a.m && a.g ? a.g : null != a.b ? a.b.h : null
            };
            ii.prototype.o = function() {
                return this.l
            }, ii.prototype.F = function() {
                return !1
            }, ii.prototype.q = function() {
                return this.D
            };
            var ji = function() {};
            g = ji.prototype, g.clone = function() {
                var a = new ji;
                return "auto" == this.videoPlayActivation ? a.setAdWillAutoPlay(!0) : "click" == this.videoPlayActivation && a.setAdWillAutoPlay(!1), a.adTagUrl = this.adTagUrl, a.adSenseParams = Fb(this.adSenseParams), a.adsResponse = this.adsResponse, a.kb = Fb(this.kb), a.isAdMob = this.isAdMob, a.isYouTube = this.isYouTube, a.location = this.location, a.g = this.g, a.h = this.h, a.language = this.language, a.linearAdSlotWidth = this.linearAdSlotWidth, a.linearAdSlotHeight = this.linearAdSlotHeight, a.nonLinearAdSlotWidth = this.nonLinearAdSlotWidth, a.nonLinearAdSlotHeight = this.nonLinearAdSlotHeight, a.tagForChildDirectedContent = this.tagForChildDirectedContent, a.usePostAdRequests = this.usePostAdRequests, a.lb = this.lb, a.youTubeAdType = this.youTubeAdType, a.youTubeExperimentIds = this.youTubeExperimentIds, a.youTubeVideoAdStartDelay = this.youTubeVideoAdStartDelay, this.b && (a.b = Ya(this.b)), a
            }, g.adSenseParams = null, g.kb = null, g.videoPlayActivation = "unknown", g.isAdMob = !1, g.isYouTube = !1, g.linearAdSlotWidth = 0, g.linearAdSlotHeight = 0, g.nonLinearAdSlotWidth = 0, g.nonLinearAdSlotHeight = 0, g.tagForChildDirectedContent = !1, g.usePostAdRequests = !1, g.lb = !0, g.youTubeVideoAdStartDelay = 0, g.setAdWillAutoPlay = function(a) {
                this.videoPlayActivation = a ? "auto" : "click"
            }, Y.prototype.getClickThroughUrl = Y.prototype.xb, Y.prototype.getCompanionAds = Y.prototype.Bc, Y.prototype.isLinear = Y.prototype.Lc, Y.prototype.isSkippable = Y.prototype.Mc, Y.prototype.getAdId = Y.prototype.yc, Y.prototype.getAdSystem = Y.prototype.Ac, Y.prototype.getContentType = Y.prototype.Cc, Y.prototype.getDescription = Y.prototype.oc, Y.prototype.getTitle = Y.prototype.pc, Y.prototype.getDuration = Y.prototype.hb, Y.prototype.getHeight = Y.prototype.Dc, Y.prototype.getWidth = Y.prototype.Ic, Y.prototype.getWrapperAdIds = Y.prototype.Jc, Y.prototype.getWrapperAdSystems = Y.prototype.Kc, Y.prototype.getTraffickingParameters = Y.prototype.Fc, Y.prototype.getTraffickingParametersString = Y.prototype.Gc, Y.prototype.getAdPodInfo = Y.prototype.zc, Y.prototype.getUiElements = Y.prototype.Hc, Y.prototype.getMinSuggestedDuration = Y.prototype.Ec, Yg.prototype.getCuePoints = Yg.prototype.b, q("google.ima.AdCuePoints.PREROLL", 0, window), q("google.ima.AdCuePoints.POSTROLL", -1, window), q("google.ima.AdDisplayContainer", ii, window), ii.prototype.initialize = ii.prototype.O, ii.prototype.destroy = ii.prototype.A, W.prototype.getPodIndex = W.prototype.vc, W.prototype.getTimeOffset = W.prototype.wc, W.prototype.getTotalAds = W.prototype.xc, W.prototype.getMaxDuration = W.prototype.uc, W.prototype.getAdPosition = W.prototype.sc, W.prototype.getIsBumper = W.prototype.tc, q("google.ima.AdError.ErrorCode.VIDEO_PLAY_ERROR", 400, window), q("google.ima.AdError.ErrorCode.FAILED_TO_REQUEST_ADS", 1005, window), q("google.ima.AdError.ErrorCode.REQUIRED_LISTENERS_NOT_ADDED", 900, window), q("google.ima.AdError.ErrorCode.VAST_LOAD_TIMEOUT", 301, window), q("google.ima.AdError.ErrorCode.VAST_NO_ADS_AFTER_WRAPPER", 303, window), q("google.ima.AdError.ErrorCode.VAST_MEDIA_LOAD_TIMEOUT", 402, window), q("google.ima.AdError.ErrorCode.VAST_TOO_MANY_REDIRECTS", 302, window), q("google.ima.AdError.ErrorCode.VAST_ASSET_MISMATCH", 403, window), q("google.ima.AdError.ErrorCode.VAST_LINEAR_ASSET_MISMATCH", 403, window), q("google.ima.AdError.ErrorCode.VAST_NONLINEAR_ASSET_MISMATCH", 503, window), q("google.ima.AdError.ErrorCode.VAST_ASSET_NOT_FOUND", 1007, window), q("google.ima.AdError.ErrorCode.VAST_UNSUPPORTED_VERSION", 102, window), q("google.ima.AdError.ErrorCode.VAST_SCHEMA_VALIDATION_ERROR", 101, window), q("google.ima.AdError.ErrorCode.VAST_TRAFFICKING_ERROR", 200, window), q("google.ima.AdError.ErrorCode.VAST_UNEXPECTED_LINEARITY", 201, window), q("google.ima.AdError.ErrorCode.INVALID_ARGUMENTS", 1101, window), q("google.ima.AdError.ErrorCode.UNKNOWN_AD_RESPONSE", 1010, window), q("google.ima.AdError.ErrorCode.UNKNOWN_ERROR", 900, window), q("google.ima.AdError.ErrorCode.OVERLAY_AD_PLAYING_FAILED", 500, window), q("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_USED", -1, window), q("google.ima.AdError.ErrorCode.VIDEO_ELEMENT_REQUIRED", -1, window), q("google.ima.AdError.ErrorCode.VAST_MEDIA_ERROR", -1, window), q("google.ima.AdError.ErrorCode.ADSLOT_NOT_VISIBLE", -1, window), q("google.ima.AdError.ErrorCode.OVERLAY_AD_LOADING_FAILED", -1, window), q("google.ima.AdError.ErrorCode.VAST_MALFORMED_RESPONSE", -1, window), q("google.ima.AdError.ErrorCode.COMPANION_AD_LOADING_FAILED", -1, window), q("google.ima.AdError.Type.AD_LOAD", "adLoadError", window), q("google.ima.AdError.Type.AD_PLAY", "adPlayError", window), H.prototype.getErrorCode = H.prototype.zb, H.prototype.getVastErrorCode = H.prototype.qc, H.prototype.getInnerError = H.prototype.Qa, H.prototype.getMessage = H.prototype.Ab, H.prototype.getType = H.prototype.rc, q("google.ima.AdErrorEvent.Type.AD_ERROR", "adError", window), Bc.prototype.getError = Bc.prototype.j, Bc.prototype.getUserRequestContext = Bc.prototype.k, q("google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED", "contentResumeRequested", window), q("google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED", "contentPauseRequested", window), q("google.ima.AdEvent.Type.CLICK", "click", window), q("google.ima.AdEvent.Type.EXPANDED_CHANGED", "expandedChanged", window), q("google.ima.AdEvent.Type.STARTED", "start", window), q("google.ima.AdEvent.Type.IMPRESSION", "impression", window), q("google.ima.AdEvent.Type.PAUSED", "pause", window), q("google.ima.AdEvent.Type.RESUMED", "resume", window), q("google.ima.AdEvent.Type.FIRST_QUARTILE", "firstquartile", window), q("google.ima.AdEvent.Type.MIDPOINT", "midpoint", window), q("google.ima.AdEvent.Type.THIRD_QUARTILE", "thirdquartile", window), q("google.ima.AdEvent.Type.COMPLETE", "complete", window), q("google.ima.AdEvent.Type.USER_CLOSE", "userClose", window), q("google.ima.AdEvent.Type.LOADED", "loaded", window), q("google.ima.AdEvent.Type.AD_METADATA", "adMetadata", window), q("google.ima.AdEvent.Type.AD_BREAK_READY", "adBreakReady", window), q("google.ima.AdEvent.Type.ALL_ADS_COMPLETED", "allAdsCompleted", window), q("google.ima.AdEvent.Type.SKIPPED", "skip", window), q("google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED", "skippableStateChanged", window), q("google.ima.AdEvent.Type.LOG", "log", window), q("google.ima.AdEvent.Type.VOLUME_CHANGED", "volumeChange", window), q("google.ima.AdEvent.Type.VOLUME_MUTED", "mute", window), U.prototype.type = U.prototype.type, U.prototype.getAd = U.prototype.o, U.prototype.getAdData = U.prototype.l, eh.prototype.getAdCuePoints = eh.prototype.k, q("google.ima.AdsLoader", Vh, window), Vh.prototype.getSettings = Vh.prototype.ca, Vh.prototype.requestAds = Vh.prototype.jd, Vh.prototype.contentComplete = Vh.prototype.fd, Vh.prototype.destroy = Vh.prototype.gd, q("google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED", "adsManagerLoaded", window), Ah.prototype.getAdsManager = Ah.prototype.j, Ah.prototype.getUserRequestContext = Ah.prototype.o, Ah.prototype.getResponse = Ah.prototype.k, q("google.ima.CompanionAdSelectionSettings", nh, window), q("google.ima.CompanionAdSelectionSettings.CreativeType.IMAGE", "Image", void 0), q("google.ima.CompanionAdSelectionSettings.CreativeType.FLASH", "Flash", void 0), q("google.ima.CompanionAdSelectionSettings.CreativeType.ALL", "All", void 0), q("google.ima.CompanionAdSelectionSettings.ResourceType.HTML", "Html", void 0), q("google.ima.CompanionAdSelectionSettings.ResourceType.IFRAME", "IFrame", void 0), q("google.ima.CompanionAdSelectionSettings.ResourceType.STATIC", "Static", void 0), q("google.ima.CompanionAdSelectionSettings.ResourceType.ALL", "All", void 0), q("google.ima.CompanionAdSelectionSettings.SizeCriteria.IGNORE", "IgnoreSize", void 0), q("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_EXACT_MATCH", "SelectExactMatch", void 0), q("google.ima.CompanionAdSelectionSettings.SizeCriteria.SELECT_NEAR_MATCH", "SelectNearMatch", void 0), q("google.ima.CustomContentLoadedEvent.Type.CUSTOM_CONTENT_LOADED", "deprecated-event", window), q("ima.ImaSdkSettings", J, window), q("google.ima.settings", Dc, window), J.prototype.setCompanionBackfill = J.prototype.cd, J.prototype.getCompanionBackfill = J.prototype.Ya, J.prototype.setAutoPlayAdBreaks = J.prototype.bd, J.prototype.isAutoPlayAdBreak = J.prototype.ab, J.prototype.setPpid = J.prototype.ed, J.prototype.getPpid = J.prototype.$a, J.prototype.setVpaidAllowed = J.prototype.od, J.prototype.setRestrictToCustomPlayback = J.prototype.nd, J.prototype.isRestrictToCustomPlayback = J.prototype.ta, J.prototype.setNumRedirects = J.prototype.dd, J.prototype.getNumRedirects = J.prototype.Za, J.prototype.getLocale = J.prototype.Wa, J.prototype.setLocale = J.prototype.md, q("google.ima.ImaSdkSettings.CompanionBackfillMode.ALWAYS", "always", void 0), q("google.ima.ImaSdkSettings.CompanionBackfillMode.ON_MASTER_AD", "on_master_ad", void 0), q("google.ima.AdsRenderingSettings", zh, window), q("google.ima.AdsRenderingSettings.AUTO_SCALE", -1, window), q("google.ima.AdsRequest", ji, window), q("google.ima.VERSION", "3.1.77", void 0), q("google.ima.UiElements.AD_ATTRIBUTION", "adAttribution", void 0), q("google.ima.UiElements.COUNTDOWN", "countdown", void 0), q("google.ima.ViewMode.NORMAL", "normal", void 0), q("google.ima.ViewMode.FULLSCREEN", "fullscreen", void 0), Z.prototype.isCustomPlaybackUsed = Z.prototype.ld, Z.prototype.isCustomClickTrackingUsed = Z.prototype.kd, Z.prototype.destroy = Z.prototype.ib, Z.prototype.init = Z.prototype.Uc, Z.prototype.start = Z.prototype.start, Z.prototype.stop = Z.prototype.ad, Z.prototype.pause = Z.prototype.Vc, Z.prototype.resume = Z.prototype.Wc, Z.prototype.getCuePoints = Z.prototype.Qc, Z.prototype.getCurrentAd = Z.prototype.Rc, Z.prototype.getRemainingTime = Z.prototype.Sc, Z.prototype.expand = Z.prototype.Oc, Z.prototype.collapse = Z.prototype.Nc, Z.prototype.getAdSkippableState = Z.prototype.Pc, Z.prototype.resize = Z.prototype.mb, Z.prototype.skip = Z.prototype.$c, Z.prototype.getVolume = Z.prototype.Tc, Z.prototype.setVolume = Z.prototype.Zc, Z.prototype.setMediaUrl = Z.prototype.Yc, Z.prototype.sendImpressionUrls = Z.prototype.Xc, X.prototype.getContent = X.prototype.m, X.prototype.getContentType = X.prototype.g, X.prototype.getHeight = X.prototype.q, X.prototype.getWidth = X.prototype.w
        }()
    }, {}],
    58: [function(a) {
        ! function() {
            function b(a) {
                if ("enabled" === a.enabled && a.jsAdsEnabled === !0) {
                    var b = this;
                    if (a.debug && d.setMinLogLevel(d.getLogLevels().DEBUG), "Html5" !== b.techName) return void d.debug("Plugin not enabled for non-Html5 techs.");
                    d.debug("Starting google ads plugin"); {
                        new e(a, b)
                    }
                }
            }
            var c = a("projector-js-logger"),
                d = new c("videojs-google-ads"),
                e = a("./ad-controller");
            videojs.plugin("googleAdsPlugin", b)
        }()
    }, {
        "./ad-controller": 53,
        "projector-js-logger": 52
    }],
    59: [function() {
        ! function() {
            function a(a) {
                if (a.enabled) {
                    var c = this;
                    if (c.controls()) {
                        var d = c.options().metadata;
                        d && d.live && b(c)
                    }
                }
            }

            function b(a) {
                var b = videojs;
                b.LiveDisplay = b.Component.extend({
                    init: function(a, c) {
                        b.Component.call(this, a, c)
                    }
                });
                var c = function() {
                    var a = {
                        className: "vjs-time-divider",
                        innerHTML: "<div><span>LIVE</span></div>"
                    };
                    return videojs.Component.prototype.createEl(null, a)
                };
                a.controlBar.currentTimeDisplay.dispose(), a.controlBar.timeDivider.dispose(), a.controlBar.durationDisplay.dispose(), a.controlBar.remainingTimeDisplay.dispose(), a.controlBar.progressControl.dispose();
                var d = {
                        el: c()
                    },
                    e = new videojs.LiveDisplay(a, d);
                a.controlBar.el().appendChild(e.el())
            }
            videojs.plugin("liveDisplayPlugin", a)
        }()
    }, {}],
    60: [function(a, b) {
        var c = function() {
            function a(a, b) {
                var c = new XDomainRequest;
                return c.onload = function() {
                    a(c)
                }, c.onerror = function() {
                    b(c)
                }, c
            }

            function b(a, b) {
                function c() {
                    e || (e = !0, b(d))
                }
                var d = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
                    e = !1;
                return d.onreadystatechange = function() {
                    4 == d.readyState && (200 == d.status ? a(d) : c())
                }, d.onerror = c, d
            }
            return {
                createRequestXDR: a,
                createRequestXHR: b
            }
        };
        b.exports = c
    }, {}],
    61: [function(a) {
        function b(a, b) {
            function d() {
                f.on("track-info", function(a) {
                    a.data.section && e(a.data.section)
                })
            }

            function e(a) {
                var b = "http://player.mediabong.net/se/123.js?url=" + encodeURIComponent(document.location.href) + "&cat=" + encodeURIComponent(a),
                    c = function() {
                        console.error("mediabongPlugin::sendAPICall - could not send tracking call to URL: ", b)
                    },
                    d = function() {},
                    e = g.createRequestXHR(d, c);
                e.open("GET", b, !0), e.send()
            }
            var f = this,
                g = new c;
            b.plugins.mediabongPlugin.enabled && d()
        }
        var c = a("ajax-module");
        videojs.plugin("mediabongPlugin", b)
    }, {
        "ajax-module": 60
    }],
    62: [function() {
        ! function() {
            function a(a) {
                function b(a) {
                    a.className.length > 0 && (a.className += " "), a.className += "videojs-overlay", c.el().appendChild(a)
                }
                if (a.enabled) {
                    var c = this;
                    c.plugins = c.plugins || {}, c.plugins.overlayPlugin = {
                        addOverlay: b
                    }
                }
            }
            videojs.plugin("overlayPlugin", a)
        }()
    }, {}],
    63: [function() {
        function a(a, b) {
            function c(a) {
                try {
                    BLOOMBERG.video_tracking.track_bvp_playing(a)
                } catch (b) {}
            }

            function d(a) {
                try {
                    PARSELY.videoPlaying = a
                } catch (b) {}
            }

            function e(a, b) {
                c(a), d(b)
            }

            function f() {
                g.on("play", function(a) {
                    e(a.type, !0)
                }), g.on("ended", function(a) {
                    e(a.type, !1)
                }), g.on("pause", function(a) {
                    e(a.type, !1)
                })
            }
            var g = this;
            window.PARSELY && b.plugins.parselyPlugin.enabled && f()
        }
        videojs.plugin("parselyPlugin", a)
    }, {}],
    64: [function(a) {
        function b(a, b) {
            b.use_clickable_ads && this.on("adclick", function(a) {
                "" !== a.data.url && (newwindow = window.open(a.data.url, "ad"), newwindow.focus())
            })
        }
        var c = a("video");
        c.plugin("adClickPlugin", b)
    }, {
        video: "video"
    }],
    65: [function(a, b) {
        function c(a, b) {
            var c = new XDomainRequest;
            return c.onload = function() {
                a(c)
            }, c.onerror = function() {
                b(c)
            }, c
        }

        function d(a, b) {
            function c() {
                e || (e = !0, b(d))
            }
            var d = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"),
                e = !1;
            return d.onreadystatechange = function() {
                4 == d.readyState && (200 == d.status ? a(d) : c())
            }, d.onerror = c, d
        }
        b.exports = function(a, b) {
            return a.XDomainRequest && /^http/.test(b) ? c : d
        }
    }, {}],
    66: [function(a, b) {
        function c(a, b) {
            var c = function(a) {
                    b(a.status, null)
                },
                d = function(a) {
                    try {
                        b(null, g.JSON.parse(a.responseText))
                    } catch (c) {
                        console.error(c.stack), b(c, null)
                    }
                },
                e = f(window, a),
                h = e(d, c);
            h.open("GET", a, !0), h.send()
        }

        function d(b) {
            if (b.serverUrl && b.id) {
                var c = b.serverUrl + "?id=" + b.id + "&version=" + a("bvp-shims").version;
                return b.hasOwnProperty("idType") && (c += "&idType=" + b.idType), b.hasOwnProperty("live") && (c += "&live=" + b.live), c
            }
        }

        function e(a, b) {
            a.hasOwnProperty("live") && a.live ? b(null, {}) : c(d(a), b)
        }
        var f = a("./ajax"),
            g = a("video");
        b.exports = {
            get: c,
            url: d,
            fromOptions: e
        }
    }, {
        "./ajax": 65,
        "bvp-shims": "bvp-shims",
        video: "video"
    }],
    67: [function(require, module, exports) {
        module.exports = new function() {
            var quote = function(a) {
                    return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function(a) {
                        var b = meta[a];
                        return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    }) + '"' : '"' + a + '"'
                },
                str = function(a, b) {
                    var c, d, e, f, g, h = gap,
                        i = b[a];
                    switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
                        case "string":
                            return quote(i);
                        case "number":
                            return isFinite(i) ? String(i) : "null";
                        case "boolean":
                        case "null":
                            return String(i);
                        case "object":
                            if (!i) return "null";
                            if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                                for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
                                return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]", gap = h, e
                            }
                            if (rep && "object" == typeof rep)
                                for (f = rep.length, c = 0; f > c; c += 1) "string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                            else
                                for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                            return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}", gap = h, e
                    }
                };
            if (this.JSON = {}, "undefined" != typeof window.JSON && "function" === window.JSON.parse) this.JSON.stringify = window.JSON;
            else {
                var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    gap, indent, meta = {
                        "\b": "\\b",
                        "	": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "\\": "\\\\"
                    },
                    rep;
                this.JSON.stringify = function(a, b, c) {
                    var d;
                    if (gap = "", indent = "", "number" == typeof c)
                        for (d = 0; c > d; d += 1) indent += " ";
                    else "string" == typeof c && (indent = c);
                    if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw new Error("JSON.stringify");
                    return str("", {
                        "": a
                    })
                }, this.JSON.parse = function(text, reviver) {
                    function walk(a, b) {
                        var c, d, e = a[b];
                        if (e && "object" == typeof e)
                            for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
                        return reviver.call(a, b, e)
                    }
                    var j;
                    if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
                            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                        "": j
                    }, "") : j;
                    throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")
                }
            }
        }
    }, {}],
    68: [function(a, b) {
        function c() {}
        a("video"), a("videojs-comscore-stream-sense"), a("videojs-comscore-matrix"), a("videojs-chartbeat"), a("videojs-live-display"), a("videojs-overlay"), a("videojs-child-video"), a("videojs-google-ads"), a("./share_overlay"), a("./ads-click"), a("videojs-parsely"), a("videojs-mediabong");
        b.exports = c
    }, {
        "./ads-click": 64,
        "./share_overlay": 70,
        video: "video",
        "videojs-chartbeat": 44,
        "videojs-child-video": 45,
        "videojs-comscore-matrix": 47,
        "videojs-comscore-stream-sense": 49,
        "videojs-google-ads": 58,
        "videojs-live-display": 59,
        "videojs-mediabong": 61,
        "videojs-overlay": 62,
        "videojs-parsely": 63
    }],
    69: [function(require, module, exports) {
        function findScriptElement() {
            if (document.currentScript) return document.currentScript;
            var a, b, c, d = document.getElementsByTagName("script"),
                e = /bplayer\.js$|bplayer\.js\?/,
                f = /^bplayer$/,
                g = d[d.length - 1];
            if (e.test(g.src)) c = g;
            else
                for (a = 0, b = d.length; b > a; ++a) e.test(d[a].src) && !d[a].getAttribute("data-exclude") && (c = d[a]);
            if (!c)
                for (a = 0, b = d.length; b > a; ++a) f.test(d[a].getAttribute("data-name")) && (c = d[a]);
            return c
        }

        function getScriptQueryParameters(_el) {
            var queryString = _el.src.replace(/^[^\?]+\??/, "");
            return "" == queryString ? (eval(_el.innerHTML), "undefined" == typeof setup ? {} : setup) : parseUrlQuery(queryString)
        }

        function parseUrlQuery(a) {
            var b = {};
            if (!a) return b;
            for (var c = a.split(/[;&]/), d = 0; d < c.length; d++) {
                var e = c[d].split("=");
                e && 2 == e.length && (b[unescape(e[0])] = unescape(e[1]).replace(/\+/g, " "))
            }
            return b
        }
        module.exports = {
            findScriptElement: findScriptElement,
            getScriptQueryParameters: getScriptQueryParameters,
            parseUrlQuery: parseUrlQuery
        }
    }, {}],
    70: [function(a, b) {
        function c(a) {
            function b(a, c) {
                for (var d in c) d in a && a[d].constructor == Object ? b(a[d], c[d]) : a[d] = c[d];
                return a
            }

            function c(b) {
                newOptions = {};
                for (var c in b) d(newOptions, c, b[c], a);
                return newOptions
            }

            function d(b, c, d) {
                if (c in a)
                    if (Array.isArray(a[c]))
                        for (var f in a[c]) {
                            var g = a[c][f];
                            e(b, d, g)
                        } else e(b, d, a[c]);
                    else b[c] = d
            }

            function e(a, b, c) {
                if (c.constructor == Object)
                    for (var d in c) d in a || (a[d] = {}), e(a[d], b, c[d]);
                else a[c] = b
            }
            return {
                deepMerge: b,
                mapOptions: c
            }
        }

        function d(a, b) {
            function c(a, b) {
                a.hasOwnProperty("classList") && a.classList.hasOwnProperty("add") ? a.classList.add(b) : a.className += " " + b
            }

            function d(a, b) {
                var d = document.createElement(a);
                Array.isArray(b) || (b = [b]);
                for (i in b) c(d, b[i]);
                return d
            }

            function e(a, b, c) {
                if ("twitter" == c) {
                    var d = b.twitter_handle ? "&via=" + b.twitter_handle : "";
                    return "http://twitter.com/share?text=" + a + "&url=" + (b.bitly_url || b.canonical_url || "") + d
                }
                if ("facebook" == c) return "https://www.facebook.com/sharer/sharer.php?u=" + b.canonical_url;
                if ("linkedin" == c) {
                    var e = b.twitter_handle ? "&source=" + b.twitter_handle : "";
                    return "http://www.linkedin.com/shareArticle?mini=true&url=" + b.canonical_url + "&title=" + a + e
                }
                return "email" == c ? "mailto:?subject=" + a + "&body=" + a + "%0D%0A" + b.canonical_url : void 0
            }

            function f(c, f) {
                var g = d("span", ["vjs-share-overlay-share_link", "vjs-share-overlay-share_link_" + c]);
                return g.addEventListener("click", function() {
                    var d = b.live ? "Bloomberg TV" : a.options_.metadata.title,
                        g = e(d, a.options_.share_metadata || {}, c);
                    /^mailto:/.test(g) ? window.location.href = g : window.open(g, f, "width=1000,height=500"), a.trigger("share_action", [c])
                }), g
            }
            var h = d("div", "vjs-share-overlay");
            h.style.visibility = "hidden", b.live && c(h, "vjs-share-live");
            var j = d("div", "vjs-share-overlay-line"),
                k = d("div", "vjs-share-overlay-line");
            h.appendChild(j), h.appendChild(k);
            var m = d("div", "vjs-share-overlay-close");
            m.innerHTML = "x", j.appendChild(m), b.close = m;
            var n = d("span", "vjs-share-overlay-title"),
                o = "Share";
            b.live || (o += " &amp; Embed"), n.innerHTML = o, j.appendChild(n);
            var p = d("div", "vjs-share-overlay-share_links");
            j.appendChild(p), p.appendChild(f("facebook", "Facebook")), p.appendChild(f("twitter", "Twitter")), p.appendChild(f("linkedin", "LinkedIn")), p.appendChild(f("email", "Email"));
            var q = "vjs-share-overlay-code-" + vjs.guid++,
                r = d("div", "vjs-share-overlay-copy");
            r.innerHTML = "Copy Code", b.live && c(r, "vjs-share-live"), r.setAttribute("data-clipboard-target", q), k.appendChild(r), b.clipboard = new l(r), r.addEventListener("click", function() {
                a.trigger("share_action", ["embed-copy"])
            });
            var s = d("input", "vjs-share-overlay-code");
            return s.addEventListener("click", function() {
                a.trigger("share_action", ["embed-text"])
            }), b.live && c(s, "vjs-share-live"), s.setAttribute("id", q), s.setAttribute("type", "text"), s.setAttribute("readOnly", !0), s.setAttribute("size", 35), s.setAttribute("value", g(a)), k.appendChild(s), h
        }

        function e(a, b) {
            a.appendChild(b)
        }

        function f(b) {
            var d = c(a("bvp-shims").mappings),
                e = vjs.JSON.parse(b.options_["data-setup"]),
                f = d.deepMerge({}, e.original_user_options);
            d.deepMerge(f, {
                width: 640,
                height: 360
            }), d.deepMerge(f, {
                autoplay: !1
            }), f.serverUrl && !/\/\//.test(f.serverUrl) && (f.serverUrl = window.location.protocol + "//" + window.location.host + f.serverUrl);
            var g = {};
            return f.hasOwnProperty("share_overrides") && d.deepMerge(g, f.share_overrides), e.hasOwnProperty("share_overrides") && d.deepMerge(g, e.share_overrides), g.offsite_embed = !0, d.deepMerge(g, {
                ad_tag: "",
                ad_tag_cust_params_preroll: ""
            }), d.deepMerge(f, g), f
        }

        function g(a) {
            var b = vjs.JSON.stringify(f(a));
            return "<script src='//cdn.gotraffic.net/projector/latest/bplayer.js'>BPlayer(null, " + b + ");</script>"
        }

        function h(a, b) {
            b.tech.el_.vjs_setProperty && "function" == typeof b.tech.el_.vjs_setProperty && b.tech.el_.vjs_setProperty("keepControlsVisible", a._shown)
        }

        function j() {
            var a = this,
                b = {
                    player: a,
                    live: a.options_.metadata.live ? !0 : !1
                },
                c = d(a, b);
            e(a.el_, c), b._shown = !1, b.toggle = function() {
                return c.style.visibility = b._shown ? "hidden" : "visible", b._shown = !b._shown, h(b, a), b._shown ? a.pause() : a.play(), this
            }, b.close.addEventListener("click", function() {
                b.toggle()
            }), a.on("share", b.toggle), a.on("play", function() {
                b._shown && b.toggle()
            }), b.prepareSetup = function() {
                return f(b.player)
            }, a.plugins = a.plugins || {}, a.plugins.shareOverlayPlugin = b
        }
        var k = a("video"),
            l = a("zeroclipboard");
        k.plugin("shareOverlayPlugin", j), b.exports = j
    }, {
        "bvp-shims": "bvp-shims",
        video: "video",
        zeroclipboard: 73
    }],
    71: [function(a, b) {
        function c(a) {
            var b = /\/bvp\.css$/;
            if (!d(b)) {
                var c = document.getElementsByTagName("head")[0],
                    e = document.createElement("link");
                e.rel = "stylesheet", e.type = "text/css", e.href = a._getCdnUrl("bvp.css"), c.appendChild(e)
            }
        }

        function d(a) {
            var b, c = document.styleSheets,
                d = c.length;
            for (b = 0; d > b; ++b)
                if (c[b].href && c[b].href.match(a)) return !0;
            return !1
        }
        b.exports = {
            ensureBvpCss: c,
            pageContainsCss: d
        }
    }, {}],
    72: [function(a, b) {
        var c = (a("projector-settings-js").mergeUtils, a("./json-utils"), a("projector-view-helpers-js"));
        b.exports = function(a, b) {
            function d(c, d, e) {
                a.parentNode && (a.parentNode.replaceChild(d, a), e && _V_(c).ready(b.onReady))
            }
            return function(a) {
                var b = new c({
                        settings: a
                    }),
                    e = b.generateVideoTag();
                d(a.dataSetup.htmlChildId, e, !0)
            }
        }
    }, {
        "./json-utils": 67,
        "projector-settings-js": 41,
        "projector-view-helpers-js": 42
    }],
    73: [function(a, b) {
        (function(c) {
            __browserify_shim_require__ = a,
                function(a, b, c, d, e) {
                    ! function(b, c) {
                        "use strict";
                        var e, f, g = b,
                            h = g.document,
                            i = g.navigator,
                            j = g.setTimeout,
                            k = g.encodeURIComponent,
                            l = g.ActiveXObject,
                            m = g.Error,
                            n = g.Number.parseInt || g.parseInt,
                            o = g.Number.parseFloat || g.parseFloat,
                            p = g.Number.isNaN || g.isNaN,
                            q = g.Math.round,
                            r = g.Date.now,
                            s = g.Object.keys,
                            t = g.Object.defineProperty,
                            u = g.Object.prototype.hasOwnProperty,
                            v = g.Array.prototype.slice,
                            w = function() {
                                var a = function(a) {
                                    return a
                                };
                                if ("function" == typeof g.wrap && "function" == typeof g.unwrap) try {
                                    var b = h.createElement("div"),
                                        c = g.unwrap(b);
                                    1 === b.nodeType && c && 1 === c.nodeType && (a = g.unwrap)
                                } catch (d) {}
                                return a
                            }(),
                            x = function(a) {
                                return v.call(a, 0)
                            },
                            y = function() {
                                var a, b, d, e, f, g, h = x(arguments),
                                    i = h[0] || {};
                                for (a = 1, b = h.length; b > a; a++)
                                    if (null != (d = h[a]))
                                        for (e in d) u.call(d, e) && (f = i[e], g = d[e], i !== g && g !== c && (i[e] = g));
                                return i
                            },
                            z = function(a) {
                                var b, c, d, e;
                                if ("object" != typeof a || null == a) b = a;
                                else if ("number" == typeof a.length)
                                    for (b = [], c = 0, d = a.length; d > c; c++) u.call(a, c) && (b[c] = z(a[c]));
                                else {
                                    b = {};
                                    for (e in a) u.call(a, e) && (b[e] = z(a[e]))
                                }
                                return b
                            },
                            A = function(a, b) {
                                for (var c = {}, d = 0, e = b.length; e > d; d++) b[d] in a && (c[b[d]] = a[b[d]]);
                                return c
                            },
                            B = function(a, b) {
                                var c = {};
                                for (var d in a) - 1 === b.indexOf(d) && (c[d] = a[d]);
                                return c
                            },
                            C = function(a) {
                                if (a)
                                    for (var b in a) u.call(a, b) && delete a[b];
                                return a
                            },
                            D = function(a, b) {
                                if (a && 1 === a.nodeType && a.ownerDocument && b && (1 === b.nodeType && b.ownerDocument && b.ownerDocument === a.ownerDocument || 9 === b.nodeType && !b.ownerDocument && b === a.ownerDocument))
                                    do {
                                        if (a === b) return !0;
                                        a = a.parentNode
                                    } while (a);
                                return !1
                            },
                            E = function(a) {
                                var b;
                                return "string" == typeof a && a && (b = a.split("#")[0].split("?")[0], b = a.slice(0, a.lastIndexOf("/") + 1)), b
                            },
                            F = function(a) {
                                var b, c;
                                return "string" == typeof a && a && (c = a.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), c && c[1] ? b = c[1] : (c = a.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/), c && c[1] && (b = c[1]))), b
                            },
                            G = function() {
                                var a, b;
                                try {
                                    throw new m
                                } catch (c) {
                                    b = c
                                }
                                return b && (a = b.sourceURL || b.fileName || F(b.stack)), a
                            },
                            H = function() {
                                var a, b, d;
                                if (h.currentScript && (a = h.currentScript.src)) return a;
                                if (b = h.getElementsByTagName("script"), 1 === b.length) return b[0].src || c;
                                if ("readyState" in b[0])
                                    for (d = b.length; d--;)
                                        if ("interactive" === b[d].readyState && (a = b[d].src)) return a;
                                return "loading" === h.readyState && (a = b[b.length - 1].src) ? a : (a = G()) ? a : c
                            },
                            I = function() {
                                var a, b, d, e = h.getElementsByTagName("script");
                                for (a = e.length; a--;) {
                                    if (!(d = e[a].src)) {
                                        b = null;
                                        break
                                    }
                                    if (d = E(d), null == b) b = d;
                                    else if (b !== d) {
                                        b = null;
                                        break
                                    }
                                }
                                return b || c
                            },
                            J = function() {
                                var a = E(H()) || I() || "";
                                return a + "ZeroClipboard.swf"
                            },
                            K = {
                                bridge: null,
                                version: "0.0.0",
                                pluginType: "unknown",
                                disabled: null,
                                outdated: null,
                                unavailable: null,
                                deactivated: null,
                                overdue: null,
                                ready: null
                            },
                            L = "11.0.0",
                            M = {},
                            N = {},
                            O = null,
                            P = {
                                ready: "Flash communication is established",
                                error: {
                                    "flash-disabled": "Flash is disabled or not installed",
                                    "flash-outdated": "Flash is too outdated to support ZeroClipboard",
                                    "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
                                    "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate",
                                    "flash-overdue": "Flash communication was established but NOT within the acceptable time limit"
                                }
                            },
                            Q = {
                                swfPath: J(),
                                trustedDomains: b.location.host ? [b.location.host] : [],
                                cacheBust: !0,
                                forceEnhancedClipboard: !1,
                                flashLoadTimeout: 3e4,
                                autoActivate: !0,
                                bubbleEvents: !0,
                                containerId: "global-zeroclipboard-html-bridge",
                                containerClass: "global-zeroclipboard-container",
                                swfObjectId: "global-zeroclipboard-flash-bridge",
                                hoverClass: "zeroclipboard-is-hover",
                                activeClass: "zeroclipboard-is-active",
                                forceHandCursor: !1,
                                title: null,
                                zIndex: 999999999
                            },
                            R = function(a) {
                                if ("object" == typeof a && null !== a)
                                    for (var b in a)
                                        if (u.call(a, b))
                                            if (/^(?:forceHandCursor|title|zIndex|bubbleEvents)$/.test(b)) Q[b] = a[b];
                                            else if (null == K.bridge)
                                    if ("containerId" === b || "swfObjectId" === b) {
                                        if (!ea(a[b])) throw new Error("The specified `" + b + "` value is not valid as an HTML4 Element ID");
                                        Q[b] = a[b]
                                    } else Q[b] = a[b]; {
                                        if ("string" != typeof a || !a) return z(Q);
                                        if (u.call(Q, a)) return Q[a]
                                    }
                            },
                            S = function() {
                                return {
                                    browser: A(i, ["userAgent", "platform", "appName"]),
                                    flash: B(K, ["bridge"]),
                                    zeroclipboard: {
                                        version: Ha.version,
                                        config: Ha.config()
                                    }
                                }
                            },
                            T = function() {
                                return !!(K.disabled || K.outdated || K.unavailable || K.deactivated)
                            },
                            U = function(a, b) {
                                var c, d, e, f = {};
                                if ("string" == typeof a && a) e = a.toLowerCase().split(/\s+/);
                                else if ("object" == typeof a && a && "undefined" == typeof b)
                                    for (c in a) u.call(a, c) && "string" == typeof c && c && "function" == typeof a[c] && Ha.on(c, a[c]);
                                if (e && e.length) {
                                    for (c = 0, d = e.length; d > c; c++) a = e[c].replace(/^on/, ""), f[a] = !0, M[a] || (M[a] = []), M[a].push(b);
                                    if (f.ready && K.ready && Ha.emit({
                                            type: "ready"
                                        }), f.error) {
                                        var g = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];
                                        for (c = 0, d = g.length; d > c; c++)
                                            if (K[g[c]] === !0) {
                                                Ha.emit({
                                                    type: "error",
                                                    name: "flash-" + g[c]
                                                });
                                                break
                                            }
                                    }
                                }
                                return Ha
                            },
                            V = function(a, b) {
                                var c, d, e, f, g;
                                if (0 === arguments.length) f = s(M);
                                else if ("string" == typeof a && a) f = a.split(/\s+/);
                                else if ("object" == typeof a && a && "undefined" == typeof b)
                                    for (c in a) u.call(a, c) && "string" == typeof c && c && "function" == typeof a[c] && Ha.off(c, a[c]);
                                if (f && f.length)
                                    for (c = 0, d = f.length; d > c; c++)
                                        if (a = f[c].toLowerCase().replace(/^on/, ""), g = M[a], g && g.length)
                                            if (b)
                                                for (e = g.indexOf(b); - 1 !== e;) g.splice(e, 1), e = g.indexOf(b, e);
                                            else g.length = 0;
                                return Ha
                            },
                            W = function(a) {
                                var b;
                                return b = "string" == typeof a && a ? z(M[a]) || null : z(M)
                            },
                            X = function(a) {
                                var b, c, d;
                                return a = fa(a), a && !la(a) ? "ready" === a.type && K.overdue === !0 ? Ha.emit({
                                    type: "error",
                                    name: "flash-overdue"
                                }) : (b = y({}, a), ka.call(this, b), "copy" === a.type && (d = ra(N), c = d.data, O = d.formatMap), c) : void 0
                            },
                            Y = function() {
                                if ("boolean" != typeof K.ready && (K.ready = !1), !Ha.isFlashUnusable() && null === K.bridge) {
                                    var a = Q.flashLoadTimeout;
                                    "number" == typeof a && a >= 0 && j(function() {
                                        "boolean" != typeof K.deactivated && (K.deactivated = !0), K.deactivated === !0 && Ha.emit({
                                            type: "error",
                                            name: "flash-deactivated"
                                        })
                                    }, a), K.overdue = !1, pa()
                                }
                            },
                            Z = function() {
                                Ha.clearData(), Ha.blur(), Ha.emit("destroy"), qa(), Ha.off()
                            },
                            $ = function(a, b) {
                                var c;
                                if ("object" == typeof a && a && "undefined" == typeof b) c = a, Ha.clearData();
                                else {
                                    if ("string" != typeof a || !a) return;
                                    c = {}, c[a] = b
                                }
                                for (var d in c) "string" == typeof d && d && u.call(c, d) && "string" == typeof c[d] && c[d] && (N[d] = c[d])
                            },
                            _ = function(a) {
                                "undefined" == typeof a ? (C(N), O = null) : "string" == typeof a && u.call(N, a) && delete N[a]
                            },
                            aa = function(a) {
                                return "undefined" == typeof a ? z(N) : "string" == typeof a && u.call(N, a) ? N[a] : void 0
                            },
                            ba = function(a) {
                                if (a && 1 === a.nodeType) {
                                    e && (za(e, Q.activeClass), e !== a && za(e, Q.hoverClass)),
                                        e = a, ya(a, Q.hoverClass);
                                    var b = a.getAttribute("title") || Q.title;
                                    if ("string" == typeof b && b) {
                                        var c = oa(K.bridge);
                                        c && c.setAttribute("title", b)
                                    }
                                    var d = Q.forceHandCursor === !0 || "pointer" === Aa(a, "cursor");
                                    Ea(d), Da()
                                }
                            },
                            ca = function() {
                                var a = oa(K.bridge);
                                a && (a.removeAttribute("title"), a.style.left = "0px", a.style.top = "-9999px", a.style.width = "1px", a.style.top = "1px"), e && (za(e, Q.hoverClass), za(e, Q.activeClass), e = null)
                            },
                            da = function() {
                                return e || null
                            },
                            ea = function(a) {
                                return "string" == typeof a && a && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(a)
                            },
                            fa = function(a) {
                                var b;
                                if ("string" == typeof a && a ? (b = a, a = {}) : "object" == typeof a && a && "string" == typeof a.type && a.type && (b = a.type), b) {
                                    !a.target && /^(copy|aftercopy|_click)$/.test(b.toLowerCase()) && (a.target = f), y(a, {
                                        type: b.toLowerCase(),
                                        target: a.target || e || null,
                                        relatedTarget: a.relatedTarget || null,
                                        currentTarget: K && K.bridge || null,
                                        timeStamp: a.timeStamp || r() || null
                                    });
                                    var c = P[a.type];
                                    return "error" === a.type && a.name && c && (c = c[a.name]), c && (a.message = c), "ready" === a.type && y(a, {
                                        target: null,
                                        version: K.version
                                    }), "error" === a.type && (/^flash-(disabled|outdated|unavailable|deactivated|overdue)$/.test(a.name) && y(a, {
                                        target: null,
                                        minimumVersion: L
                                    }), /^flash-(outdated|unavailable|deactivated|overdue)$/.test(a.name) && y(a, {
                                        version: K.version
                                    })), "copy" === a.type && (a.clipboardData = {
                                        setData: Ha.setData,
                                        clearData: Ha.clearData
                                    }), "aftercopy" === a.type && (a = sa(a, O)), a.target && !a.relatedTarget && (a.relatedTarget = ga(a.target)), a = ha(a)
                                }
                            },
                            ga = function(a) {
                                var b = a && a.getAttribute && a.getAttribute("data-clipboard-target");
                                return b ? h.getElementById(b) : null
                            },
                            ha = function(a) {
                                if (a && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type)) {
                                    var b = a.target,
                                        d = "_mouseover" === a.type && a.relatedTarget ? a.relatedTarget : c,
                                        e = "_mouseout" === a.type && a.relatedTarget ? a.relatedTarget : c,
                                        f = Ca(b),
                                        i = g.screenLeft || g.screenX || 0,
                                        j = g.screenTop || g.screenY || 0,
                                        k = h.body.scrollLeft + h.documentElement.scrollLeft,
                                        l = h.body.scrollTop + h.documentElement.scrollTop,
                                        m = f.left + ("number" == typeof a._stageX ? a._stageX : 0),
                                        n = f.top + ("number" == typeof a._stageY ? a._stageY : 0),
                                        o = m - k,
                                        p = n - l,
                                        q = i + o,
                                        r = j + p,
                                        s = "number" == typeof a.movementX ? a.movementX : 0,
                                        t = "number" == typeof a.movementY ? a.movementY : 0;
                                    delete a._stageX, delete a._stageY, y(a, {
                                        srcElement: b,
                                        fromElement: d,
                                        toElement: e,
                                        screenX: q,
                                        screenY: r,
                                        pageX: m,
                                        pageY: n,
                                        clientX: o,
                                        clientY: p,
                                        x: o,
                                        y: p,
                                        movementX: s,
                                        movementY: t,
                                        offsetX: 0,
                                        offsetY: 0,
                                        layerX: 0,
                                        layerY: 0
                                    })
                                }
                                return a
                            },
                            ia = function(a) {
                                var b = a && "string" == typeof a.type && a.type || "";
                                return !/^(?:(?:before)?copy|destroy)$/.test(b)
                            },
                            ja = function(a, b, c, d) {
                                d ? j(function() {
                                    a.apply(b, c)
                                }, 0) : a.apply(b, c)
                            },
                            ka = function(a) {
                                if ("object" == typeof a && a && a.type) {
                                    var b = ia(a),
                                        c = M["*"] || [],
                                        d = M[a.type] || [],
                                        e = c.concat(d);
                                    if (e && e.length) {
                                        var f, h, i, j, k, l = this;
                                        for (f = 0, h = e.length; h > f; f++) i = e[f], j = l, "string" == typeof i && "function" == typeof g[i] && (i = g[i]), "object" == typeof i && i && "function" == typeof i.handleEvent && (j = i, i = i.handleEvent), "function" == typeof i && (k = y({}, a), ja(i, j, [k], b))
                                    }
                                    return this
                                }
                            },
                            la = function(a) {
                                var b = a.target || e || null,
                                    c = "swf" === a._source;
                                delete a._source;
                                var d = ["flash-disabled", "flash-outdated", "flash-unavailable", "flash-deactivated", "flash-overdue"];
                                switch (a.type) {
                                    case "error":
                                        -1 !== d.indexOf(a.name) && y(K, {
                                            disabled: "flash-disabled" === a.name,
                                            outdated: "flash-outdated" === a.name,
                                            unavailable: "flash-unavailable" === a.name,
                                            deactivated: "flash-deactivated" === a.name,
                                            overdue: "flash-overdue" === a.name,
                                            ready: !1
                                        });
                                        break;
                                    case "ready":
                                        var g = K.deactivated === !0;
                                        y(K, {
                                            disabled: !1,
                                            outdated: !1,
                                            unavailable: !1,
                                            deactivated: !1,
                                            overdue: g,
                                            ready: !g
                                        });
                                        break;
                                    case "beforecopy":
                                        f = b;
                                        break;
                                    case "copy":
                                        var h, i, j = a.relatedTarget;
                                        !N["text/html"] && !N["text/plain"] && j && (i = j.value || j.outerHTML || j.innerHTML) && (h = j.value || j.textContent || j.innerText) ? (a.clipboardData.clearData(), a.clipboardData.setData("text/plain", h), i !== h && a.clipboardData.setData("text/html", i)) : !N["text/plain"] && a.target && (h = a.target.getAttribute("data-clipboard-text")) && (a.clipboardData.clearData(), a.clipboardData.setData("text/plain", h));
                                        break;
                                    case "aftercopy":
                                        Ha.clearData(), b && b !== xa() && b.focus && b.focus();
                                        break;
                                    case "_mouseover":
                                        Ha.focus(b), Q.bubbleEvents === !0 && c && (b && b !== a.relatedTarget && !D(a.relatedTarget, b) && ma(y({}, a, {
                                            type: "mouseenter",
                                            bubbles: !1,
                                            cancelable: !1
                                        })), ma(y({}, a, {
                                            type: "mouseover"
                                        })));
                                        break;
                                    case "_mouseout":
                                        Ha.blur(), Q.bubbleEvents === !0 && c && (b && b !== a.relatedTarget && !D(a.relatedTarget, b) && ma(y({}, a, {
                                            type: "mouseleave",
                                            bubbles: !1,
                                            cancelable: !1
                                        })), ma(y({}, a, {
                                            type: "mouseout"
                                        })));
                                        break;
                                    case "_mousedown":
                                        ya(b, Q.activeClass), Q.bubbleEvents === !0 && c && ma(y({}, a, {
                                            type: a.type.slice(1)
                                        }));
                                        break;
                                    case "_mouseup":
                                        za(b, Q.activeClass), Q.bubbleEvents === !0 && c && ma(y({}, a, {
                                            type: a.type.slice(1)
                                        }));
                                        break;
                                    case "_click":
                                        f = null, Q.bubbleEvents === !0 && c && ma(y({}, a, {
                                            type: a.type.slice(1)
                                        }));
                                        break;
                                    case "_mousemove":
                                        Q.bubbleEvents === !0 && c && ma(y({}, a, {
                                            type: a.type.slice(1)
                                        }))
                                }
                                return /^_(?:click|mouse(?:over|out|down|up|move))$/.test(a.type) ? !0 : void 0
                            },
                            ma = function(a) {
                                if (a && "string" == typeof a.type && a) {
                                    var b, c = a.target || null,
                                        d = c && c.ownerDocument || h,
                                        e = {
                                            view: d.defaultView || g,
                                            canBubble: !0,
                                            cancelable: !0,
                                            detail: "click" === a.type ? 1 : 0,
                                            button: "number" == typeof a.which ? a.which - 1 : "number" == typeof a.button ? a.button : d.createEvent ? 0 : 1
                                        },
                                        f = y(e, a);
                                    c && d.createEvent && c.dispatchEvent && (f = [f.type, f.canBubble, f.cancelable, f.view, f.detail, f.screenX, f.screenY, f.clientX, f.clientY, f.ctrlKey, f.altKey, f.shiftKey, f.metaKey, f.button, f.relatedTarget], b = d.createEvent("MouseEvents"), b.initMouseEvent && (b.initMouseEvent.apply(b, f), b._source = "js", c.dispatchEvent(b)))
                                }
                            },
                            na = function() {
                                var a = h.createElement("div");
                                return a.id = Q.containerId, a.className = Q.containerClass, a.style.position = "absolute", a.style.left = "0px", a.style.top = "-9999px", a.style.width = "1px", a.style.height = "1px", a.style.zIndex = "" + Fa(Q.zIndex), a
                            },
                            oa = function(a) {
                                for (var b = a && a.parentNode; b && "OBJECT" === b.nodeName && b.parentNode;) b = b.parentNode;
                                return b || null
                            },
                            pa = function() {
                                var a, b = K.bridge,
                                    c = oa(b);
                                if (!b) {
                                    var d = wa(g.location.host, Q),
                                        e = "never" === d ? "none" : "all",
                                        f = ua(Q),
                                        i = Q.swfPath + ta(Q.swfPath, Q);
                                    c = na();
                                    var j = h.createElement("div");
                                    c.appendChild(j), h.body.appendChild(c);
                                    var k = h.createElement("div"),
                                        l = "activex" === K.pluginType;
                                    k.innerHTML = '<object id="' + Q.swfObjectId + '" name="' + Q.swfObjectId + '" width="100%" height="100%" ' + (l ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + i + '"') + ">" + (l ? '<param name="movie" value="' + i + '"/>' : "") + '<param name="allowScriptAccess" value="' + d + '"/><param name="allowNetworking" value="' + e + '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' + f + '"/></object>', b = k.firstChild, k = null, w(b).ZeroClipboard = Ha, c.replaceChild(b, j)
                                }
                                return b || (b = h[Q.swfObjectId], b && (a = b.length) && (b = b[a - 1]), !b && c && (b = c.firstChild)), K.bridge = b || null, b
                            },
                            qa = function() {
                                var a = K.bridge;
                                if (a) {
                                    var b = oa(a);
                                    b && ("activex" === K.pluginType && "readyState" in a ? (a.style.display = "none", function c() {
                                        if (4 === a.readyState) {
                                            for (var d in a) "function" == typeof a[d] && (a[d] = null);
                                            a.parentNode && a.parentNode.removeChild(a), b.parentNode && b.parentNode.removeChild(b)
                                        } else j(c, 10)
                                    }()) : (a.parentNode && a.parentNode.removeChild(a), b.parentNode && b.parentNode.removeChild(b))), K.ready = null, K.bridge = null, K.deactivated = null
                                }
                            },
                            ra = function(a) {
                                var b = {},
                                    c = {};
                                if ("object" == typeof a && a) {
                                    for (var d in a)
                                        if (d && u.call(a, d) && "string" == typeof a[d] && a[d]) switch (d.toLowerCase()) {
                                            case "text/plain":
                                            case "text":
                                            case "air:text":
                                            case "flash:text":
                                                b.text = a[d], c.text = d;
                                                break;
                                            case "text/html":
                                            case "html":
                                            case "air:html":
                                            case "flash:html":
                                                b.html = a[d], c.html = d;
                                                break;
                                            case "application/rtf":
                                            case "text/rtf":
                                            case "rtf":
                                            case "richtext":
                                            case "air:rtf":
                                            case "flash:rtf":
                                                b.rtf = a[d], c.rtf = d
                                        }
                                        return {
                                            data: b,
                                            formatMap: c
                                        }
                                }
                            },
                            sa = function(a, b) {
                                if ("object" != typeof a || !a || "object" != typeof b || !b) return a;
                                var c = {};
                                for (var d in a)
                                    if (u.call(a, d)) {
                                        if ("success" !== d && "data" !== d) {
                                            c[d] = a[d];
                                            continue
                                        }
                                        c[d] = {};
                                        var e = a[d];
                                        for (var f in e) f && u.call(e, f) && u.call(b, f) && (c[d][b[f]] = e[f])
                                    }
                                return c
                            },
                            ta = function(a, b) {
                                var c = null == b || b && b.cacheBust === !0;
                                return c ? (-1 === a.indexOf("?") ? "?" : "&") + "noCache=" + r() : ""
                            },
                            ua = function(a) {
                                var b, c, d, e, f = "",
                                    h = [];
                                if (a.trustedDomains && ("string" == typeof a.trustedDomains ? e = [a.trustedDomains] : "object" == typeof a.trustedDomains && "length" in a.trustedDomains && (e = a.trustedDomains)), e && e.length)
                                    for (b = 0, c = e.length; c > b; b++)
                                        if (u.call(e, b) && e[b] && "string" == typeof e[b]) {
                                            if (d = va(e[b]), !d) continue;
                                            if ("*" === d) {
                                                h.length = 0, h.push(d);
                                                break
                                            }
                                            h.push.apply(h, [d, "//" + d, g.location.protocol + "//" + d])
                                        }
                                return h.length && (f += "trustedOrigins=" + k(h.join(","))), a.forceEnhancedClipboard === !0 && (f += (f ? "&" : "") + "forceEnhancedClipboard=true"), "string" == typeof a.swfObjectId && a.swfObjectId && (f += (f ? "&" : "") + "swfObjectId=" + k(a.swfObjectId)), f
                            },
                            va = function(a) {
                                if (null == a || "" === a) return null;
                                if (a = a.replace(/^\s+|\s+$/g, ""), "" === a) return null;
                                var b = a.indexOf("//");
                                a = -1 === b ? a : a.slice(b + 2);
                                var c = a.indexOf("/");
                                return a = -1 === c ? a : -1 === b || 0 === c ? null : a.slice(0, c), a && ".swf" === a.slice(-4).toLowerCase() ? null : a || null
                            },
                            wa = function() {
                                var a = function(a) {
                                    var b, c, d, e = [];
                                    if ("string" == typeof a && (a = [a]), "object" != typeof a || !a || "number" != typeof a.length) return e;
                                    for (b = 0, c = a.length; c > b; b++)
                                        if (u.call(a, b) && (d = va(a[b]))) {
                                            if ("*" === d) {
                                                e.length = 0, e.push("*");
                                                break
                                            } - 1 === e.indexOf(d) && e.push(d)
                                        }
                                    return e
                                };
                                return function(b, c) {
                                    var d = va(c.swfPath);
                                    null === d && (d = b);
                                    var e = a(c.trustedDomains),
                                        f = e.length;
                                    if (f > 0) {
                                        if (1 === f && "*" === e[0]) return "always";
                                        if (-1 !== e.indexOf(b)) return 1 === f && b === d ? "sameDomain" : "always"
                                    }
                                    return "never"
                                }
                            }(),
                            xa = function() {
                                try {
                                    return h.activeElement
                                } catch (a) {
                                    return null
                                }
                            },
                            ya = function(a, b) {
                                if (!a || 1 !== a.nodeType) return a;
                                if (a.classList) return a.classList.contains(b) || a.classList.add(b), a;
                                if (b && "string" == typeof b) {
                                    var c = (b || "").split(/\s+/);
                                    if (1 === a.nodeType)
                                        if (a.className) {
                                            for (var d = " " + a.className + " ", e = a.className, f = 0, g = c.length; g > f; f++) d.indexOf(" " + c[f] + " ") < 0 && (e += " " + c[f]);
                                            a.className = e.replace(/^\s+|\s+$/g, "")
                                        } else a.className = b
                                }
                                return a
                            },
                            za = function(a, b) {
                                if (!a || 1 !== a.nodeType) return a;
                                if (a.classList) return a.classList.contains(b) && a.classList.remove(b), a;
                                if ("string" == typeof b && b) {
                                    var c = b.split(/\s+/);
                                    if (1 === a.nodeType && a.className) {
                                        for (var d = (" " + a.className + " ").replace(/[\n\t]/g, " "), e = 0, f = c.length; f > e; e++) d = d.replace(" " + c[e] + " ", " ");
                                        a.className = d.replace(/^\s+|\s+$/g, "")
                                    }
                                }
                                return a
                            },
                            Aa = function(a, b) {
                                var c = g.getComputedStyle(a, null).getPropertyValue(b);
                                return "cursor" !== b || c && "auto" !== c || "A" !== a.nodeName ? c : "pointer"
                            },
                            Ba = function() {
                                var a, b, c, d = 1;
                                return "function" == typeof h.body.getBoundingClientRect && (a = h.body.getBoundingClientRect(), b = a.right - a.left, c = h.body.offsetWidth, d = q(b / c * 100) / 100), d
                            },
                            Ca = function(a) {
                                var b = {
                                    left: 0,
                                    top: 0,
                                    width: 0,
                                    height: 0
                                };
                                if (a.getBoundingClientRect) {
                                    var c, d, e, f = a.getBoundingClientRect();
                                    "pageXOffset" in g && "pageYOffset" in g ? (c = g.pageXOffset, d = g.pageYOffset) : (e = Ba(), c = q(h.documentElement.scrollLeft / e), d = q(h.documentElement.scrollTop / e));
                                    var i = h.documentElement.clientLeft || 0,
                                        j = h.documentElement.clientTop || 0;
                                    b.left = f.left + c - i, b.top = f.top + d - j, b.width = "width" in f ? f.width : f.right - f.left, b.height = "height" in f ? f.height : f.bottom - f.top
                                }
                                return b
                            },
                            Da = function() {
                                var a;
                                if (e && (a = oa(K.bridge))) {
                                    var b = Ca(e);
                                    y(a.style, {
                                        width: b.width + "px",
                                        height: b.height + "px",
                                        top: b.top + "px",
                                        left: b.left + "px",
                                        zIndex: "" + Fa(Q.zIndex)
                                    })
                                }
                            },
                            Ea = function(a) {
                                K.ready === !0 && (K.bridge && "function" == typeof K.bridge.setHandCursor ? K.bridge.setHandCursor(a) : K.ready = !1)
                            },
                            Fa = function(a) {
                                if (/^(?:auto|inherit)$/.test(a)) return a;
                                var b;
                                return "number" != typeof a || p(a) ? "string" == typeof a && (b = Fa(n(a, 10))) : b = a, "number" == typeof b ? b : "auto"
                            },
                            Ga = function(a) {
                                function b(a) {
                                    var b = a.match(/[\d]+/g);
                                    return b.length = 3, b.join(".")
                                }

                                function c(a) {
                                    return !!a && (a = a.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(a) || "chrome.plugin" === a.slice(-13))
                                }

                                function d(a) {
                                    a && (h = !0, a.version && (l = b(a.version)), !l && a.description && (l = b(a.description)), a.filename && (k = c(a.filename)))
                                }
                                var e, f, g, h = !1,
                                    j = !1,
                                    k = !1,
                                    l = "";
                                if (i.plugins && i.plugins.length) e = i.plugins["Shockwave Flash"], d(e), i.plugins["Shockwave Flash 2.0"] && (h = !0, l = "2.0.0.11");
                                else if (i.mimeTypes && i.mimeTypes.length) g = i.mimeTypes["application/x-shockwave-flash"], e = g && g.enabledPlugin, d(e);
                                else if ("undefined" != typeof a) {
                                    j = !0;
                                    try {
                                        f = new a("ShockwaveFlash.ShockwaveFlash.7"), h = !0, l = b(f.GetVariable("$version"))
                                    } catch (m) {
                                        try {
                                            f = new a("ShockwaveFlash.ShockwaveFlash.6"), h = !0, l = "6.0.21"
                                        } catch (n) {
                                            try {
                                                f = new a("ShockwaveFlash.ShockwaveFlash"), h = !0, l = b(f.GetVariable("$version"))
                                            } catch (p) {
                                                j = !1
                                            }
                                        }
                                    }
                                }
                                K.disabled = h !== !0, K.outdated = l && o(l) < o(L), K.version = l || "0.0.0", K.pluginType = k ? "pepper" : j ? "activex" : h ? "netscape" : "unknown"
                            };
                        Ga(l);
                        var Ha = function() {
                            return this instanceof Ha ? void("function" == typeof Ha._createClient && Ha._createClient.apply(this, x(arguments))) : new Ha
                        };
                        t(Ha, "version", {
                            value: "2.1.6",
                            writable: !1,
                            configurable: !0,
                            enumerable: !0
                        }), Ha.config = function() {
                            return R.apply(this, x(arguments))
                        }, Ha.state = function() {
                            return S.apply(this, x(arguments))
                        }, Ha.isFlashUnusable = function() {
                            return T.apply(this, x(arguments))
                        }, Ha.on = function() {
                            return U.apply(this, x(arguments))
                        }, Ha.off = function() {
                            return V.apply(this, x(arguments))
                        }, Ha.handlers = function() {
                            return W.apply(this, x(arguments))
                        }, Ha.emit = function() {
                            return X.apply(this, x(arguments))
                        }, Ha.create = function() {
                            return Y.apply(this, x(arguments))
                        }, Ha.destroy = function() {
                            return Z.apply(this, x(arguments))
                        }, Ha.setData = function() {
                            return $.apply(this, x(arguments))
                        }, Ha.clearData = function() {
                            return _.apply(this, x(arguments))
                        }, Ha.getData = function() {
                            return aa.apply(this, x(arguments))
                        }, Ha.focus = Ha.activate = function() {
                            return ba.apply(this, x(arguments))
                        }, Ha.blur = Ha.deactivate = function() {
                            return ca.apply(this, x(arguments))
                        }, Ha.activeElement = function() {
                            return da.apply(this, x(arguments))
                        };
                        var Ia = 0,
                            Ja = {},
                            Ka = 0,
                            La = {},
                            Ma = {};
                        y(Q, {
                            autoActivate: !0
                        });
                        var Na = function(a) {
                                var b = this;
                                b.id = "" + Ia++, Ja[b.id] = {
                                    instance: b,
                                    elements: [],
                                    handlers: {}
                                }, a && b.clip(a), Ha.on("*", function(a) {
                                    return b.emit(a)
                                }), Ha.on("destroy", function() {
                                    b.destroy()
                                }), Ha.create()
                            },
                            Oa = function(a, b) {
                                var c, d, e, f = {},
                                    g = Ja[this.id] && Ja[this.id].handlers;
                                if ("string" == typeof a && a) e = a.toLowerCase().split(/\s+/);
                                else if ("object" == typeof a && a && "undefined" == typeof b)
                                    for (c in a) u.call(a, c) && "string" == typeof c && c && "function" == typeof a[c] && this.on(c, a[c]);
                                if (e && e.length) {
                                    for (c = 0, d = e.length; d > c; c++) a = e[c].replace(/^on/, ""), f[a] = !0, g[a] || (g[a] = []), g[a].push(b);
                                    if (f.ready && K.ready && this.emit({
                                            type: "ready",
                                            client: this
                                        }), f.error) {
                                        var h = ["disabled", "outdated", "unavailable", "deactivated", "overdue"];
                                        for (c = 0, d = h.length; d > c; c++)
                                            if (K[h[c]]) {
                                                this.emit({
                                                    type: "error",
                                                    name: "flash-" + h[c],
                                                    client: this
                                                });
                                                break
                                            }
                                    }
                                }
                                return this
                            },
                            Pa = function(a, b) {
                                var c, d, e, f, g, h = Ja[this.id] && Ja[this.id].handlers;
                                if (0 === arguments.length) f = s(h);
                                else if ("string" == typeof a && a) f = a.split(/\s+/);
                                else if ("object" == typeof a && a && "undefined" == typeof b)
                                    for (c in a) u.call(a, c) && "string" == typeof c && c && "function" == typeof a[c] && this.off(c, a[c]);
                                if (f && f.length)
                                    for (c = 0, d = f.length; d > c; c++)
                                        if (a = f[c].toLowerCase().replace(/^on/, ""), g = h[a], g && g.length)
                                            if (b)
                                                for (e = g.indexOf(b); - 1 !== e;) g.splice(e, 1), e = g.indexOf(b, e);
                                            else g.length = 0;
                                return this
                            },
                            Qa = function(a) {
                                var b = null,
                                    c = Ja[this.id] && Ja[this.id].handlers;
                                return c && (b = "string" == typeof a && a ? c[a] ? c[a].slice(0) : [] : z(c)), b
                            },
                            Ra = function(a) {
                                if (Wa.call(this, a)) {
                                    "object" == typeof a && a && "string" == typeof a.type && a.type && (a = y({}, a));
                                    var b = y({}, fa(a), {
                                        client: this
                                    });
                                    Xa.call(this, b)
                                }
                                return this
                            },
                            Sa = function(a) {
                                a = Ya(a);
                                for (var b = 0; b < a.length; b++)
                                    if (u.call(a, b) && a[b] && 1 === a[b].nodeType) {
                                        a[b].zcClippingId ? -1 === La[a[b].zcClippingId].indexOf(this.id) && La[a[b].zcClippingId].push(this.id) : (a[b].zcClippingId = "zcClippingId_" + Ka++, La[a[b].zcClippingId] = [this.id], Q.autoActivate === !0 && Za(a[b]));
                                        var c = Ja[this.id] && Ja[this.id].elements; - 1 === c.indexOf(a[b]) && c.push(a[b])
                                    }
                                return this
                            },
                            Ta = function(a) {
                                var b = Ja[this.id];
                                if (!b) return this;
                                var c, d = b.elements;
                                a = "undefined" == typeof a ? d.slice(0) : Ya(a);
                                for (var e = a.length; e--;)
                                    if (u.call(a, e) && a[e] && 1 === a[e].nodeType) {
                                        for (c = 0; - 1 !== (c = d.indexOf(a[e], c));) d.splice(c, 1);
                                        var f = La[a[e].zcClippingId];
                                        if (f) {
                                            for (c = 0; - 1 !== (c = f.indexOf(this.id, c));) f.splice(c, 1);
                                            0 === f.length && (Q.autoActivate === !0 && $a(a[e]), delete a[e].zcClippingId)
                                        }
                                    }
                                return this
                            },
                            Ua = function() {
                                var a = Ja[this.id];
                                return a && a.elements ? a.elements.slice(0) : []
                            },
                            Va = function() {
                                this.unclip(), this.off(), delete Ja[this.id]
                            },
                            Wa = function(a) {
                                if (!a || !a.type) return !1;
                                if (a.client && a.client !== this) return !1;
                                var b = Ja[this.id] && Ja[this.id].elements,
                                    c = !!b && b.length > 0,
                                    d = !a.target || c && -1 !== b.indexOf(a.target),
                                    e = a.relatedTarget && c && -1 !== b.indexOf(a.relatedTarget),
                                    f = a.client && a.client === this;
                                return d || e || f ? !0 : !1
                            },
                            Xa = function(a) {
                                if ("object" == typeof a && a && a.type) {
                                    var b = ia(a),
                                        c = Ja[this.id] && Ja[this.id].handlers["*"] || [],
                                        d = Ja[this.id] && Ja[this.id].handlers[a.type] || [],
                                        e = c.concat(d);
                                    if (e && e.length) {
                                        var f, h, i, j, k, l = this;
                                        for (f = 0, h = e.length; h > f; f++) i = e[f], j = l, "string" == typeof i && "function" == typeof g[i] && (i = g[i]), "object" == typeof i && i && "function" == typeof i.handleEvent && (j = i, i = i.handleEvent), "function" == typeof i && (k = y({}, a), ja(i, j, [k], b))
                                    }
                                    return this
                                }
                            },
                            Ya = function(a) {
                                return "string" == typeof a && (a = []), "number" != typeof a.length ? [a] : a
                            },
                            Za = function(a) {
                                if (a && 1 === a.nodeType) {
                                    var b = function(a) {
                                            (a || (a = g.event)) && ("js" !== a._source && (a.stopImmediatePropagation(), a.preventDefault()), delete a._source)
                                        },
                                        c = function(c) {
                                            (c || (c = g.event)) && (b(c), Ha.focus(a))
                                        };
                                    a.addEventListener("mouseover", c, !1), a.addEventListener("mouseout", b, !1), a.addEventListener("mouseenter", b, !1), a.addEventListener("mouseleave", b, !1), a.addEventListener("mousemove", b, !1), Ma[a.zcClippingId] = {
                                        mouseover: c,
                                        mouseout: b,
                                        mouseenter: b,
                                        mouseleave: b,
                                        mousemove: b
                                    }
                                }
                            },
                            $a = function(a) {
                                if (a && 1 === a.nodeType) {
                                    var b = Ma[a.zcClippingId];
                                    if ("object" == typeof b && b) {
                                        for (var c, d, e = ["move", "leave", "enter", "out", "over"], f = 0, g = e.length; g > f; f++) c = "mouse" + e[f], d = b[c], "function" == typeof d && a.removeEventListener(c, d, !1);
                                        delete Ma[a.zcClippingId]
                                    }
                                }
                            };
                        Ha._createClient = function() {
                            Na.apply(this, x(arguments))
                        }, Ha.prototype.on = function() {
                            return Oa.apply(this, x(arguments))
                        }, Ha.prototype.off = function() {
                            return Pa.apply(this, x(arguments))
                        }, Ha.prototype.handlers = function() {
                            return Qa.apply(this, x(arguments))
                        }, Ha.prototype.emit = function() {
                            return Ra.apply(this, x(arguments))
                        }, Ha.prototype.clip = function() {
                            return Sa.apply(this, x(arguments))
                        }, Ha.prototype.unclip = function() {
                            return Ta.apply(this, x(arguments))
                        }, Ha.prototype.elements = function() {
                            return Ua.apply(this, x(arguments))
                        }, Ha.prototype.destroy = function() {
                            return Va.apply(this, x(arguments))
                        }, Ha.prototype.setText = function(a) {
                            return Ha.setData("text/plain", a), this
                        }, Ha.prototype.setHtml = function(a) {
                            return Ha.setData("text/html", a), this
                        }, Ha.prototype.setRichText = function(a) {
                            return Ha.setData("application/rtf", a), this
                        }, Ha.prototype.setData = function() {
                            return Ha.setData.apply(this, x(arguments)), this
                        }, Ha.prototype.clearData = function() {
                            return Ha.clearData.apply(this, x(arguments)), this
                        }, Ha.prototype.getData = function() {
                            return Ha.getData.apply(this, x(arguments))
                        }, "function" == typeof d && d.amd ? d(function() {
                            return Ha
                        }) : "object" == typeof a && a && "object" == typeof a.exports && a.exports ? a.exports = Ha : b.ZeroClipboard = Ha
                    }(function() {
                        return this || window
                    }()), e("undefined" != typeof ZeroClipboard ? ZeroClipboard : window.ZeroClipboard)
                }.call(c, void 0, void 0, void 0, void 0, function(a) {
                    b.exports = a
                })
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    BPlayer: [function(a, b) {
        function c(a) {
            for (var b in a)
                if (a.hasOwnProperty(b)) return !1;
            return !0
        }

        function d(a) {
            var b = {
                onReady: function() {},
                onError: function() {}
            };
            return "object" == typeof a ? f.mergeUtils.deepMerge(b, a) : "function" == typeof a ? f.mergeUtils.deepMerge(b, {
                onReady: a
            }) : b
        }
        var e = (a("./projector"), a("bvp-shims").version),
            f = (a("video"), a("projector-settings-js")),
            g = a("projector-ads"),
            h = a("./script-element"),
            i = a("./styles"),
            j = a("./asset"),
            k = function(b, l, m) {
                function n(b, c) {
                    var d = new f({
                        userOptions: l,
                        version: e,
                        bmmrAsset: c,
                        liveId: l.live ? l.id : void 0
                    });
                    i.ensureBvpCss(d), a("zeroclipboard").config({
                        swfPath: d._getCdnUrl("ZeroClipboard.swf")
                    });
                    var h = d.getDataSetup();
                    h = f.mergeUtils.deepMerge(h, {
                        original_user_options: l
                    });
                    var j = new g(l, c);
                    h = f.mergeUtils.deepMerge(h, f.mergeUtils.mapOptions(j.prepare(), d.getMappings())), d.dataSetup = f.mergeUtils.deepMerge(d.dataSetup, h), p(d)
                }
                k.guid = 1, Array.isArray || (Array.isArray = function(a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                });
                var o = h.findScriptElement();
                if (o) {
                    m = d(m);
                    var p = a("./view")(o, m);
                    l = l ? l : h.getScriptQueryParameters(o), l && !c(l) && (b ? n(null, b) : j.fromOptions(l, n))
                }
            };
        return k.mergeUtils = f.mergeUtils, b.exports = k
    }, {
        "./asset": 66,
        "./projector": 68,
        "./script-element": 69,
        "./styles": 71,
        "./view": 72,
        "bvp-shims": "bvp-shims",
        "projector-ads": 3,
        "projector-settings-js": 41,
        video: "video",
        zeroclipboard: 73
    }],
    "bvp-shims": [function(a, b) {
        b.exports = {
            version: "v0.8.11"
        }
    }, {}],
    video: [function(require, module, exports) {
        function createMethod(a) {
            return function() {
                throw new Error('The "' + a + "\" method is not available on the playback technology's API")
            }
        }

        function quote(a) {
            return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function(a) {
                var b = meta[a];
                return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }

        function str(a, b) {
            var c, d, e, f, g, h = gap,
                i = b[a];
            switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
                case "string":
                    return quote(i);
                case "number":
                    return isFinite(i) ? String(i) : "null";
                case "boolean":
                case "null":
                    return String(i);
                case "object":
                    if (!i) return "null";
                    if (gap += indent, g = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                        for (f = i.length, c = 0; f > c; c += 1) g[c] = str(c, i) || "null";
                        return e = 0 === g.length ? "[]" : gap ? "[\n" + gap + g.join(",\n" + gap) + "\n" + h + "]" : "[" + g.join(",") + "]", gap = h, e
                    }
                    if (rep && "object" == typeof rep)
                        for (f = rep.length, c = 0; f > c; c += 1) "string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                    else
                        for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && g.push(quote(d) + (gap ? ": " : ":") + e));
                    return e = 0 === g.length ? "{}" : gap ? "{\n" + gap + g.join(",\n" + gap) + "\n" + h + "}" : "{" + g.join(",") + "}", gap = h, e
            }
        }
        document.createElement("video"), document.createElement("audio");
        var vjs = function(a, b, c) {
                var d;
                if ("string" == typeof a) {
                    if (0 === a.indexOf("#") && (a = a.slice(1)), vjs.players[a]) return vjs.players[a];
                    d = vjs.el(a)
                } else d = a;
                if (!d || !d.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
                return d.player || new vjs.Player(d, b, c)
            },
            videojs = vjs;
        window.videojs = window.vjs = vjs, vjs.CDN_VERSION = "GENERATED_CDN_VSN", vjs.ACCESS_PROTOCOL = "https:" == document.location.protocol ? "https://" : "http://", vjs.options = {
            techOrder: ["html5", "flash"],
            html5: {},
            flash: {},
            width: 300,
            height: 150,
            defaultVolume: 0,
            children: {
                mediaLoader: {},
                posterImage: {},
                textTrackDisplay: {},
                loadingSpinner: {},
                bigPlayButton: {},
                controlBar: {}
            }
        }, "GENERATED_CDN_VSN" !== vjs.CDN_VERSION && (videojs.options.flash.swf = vjs.ACCESS_PROTOCOL + "vjs.zencdn.net/" + vjs.CDN_VERSION + "/video-js.swf"), vjs.players = {}, vjs.CoreObject = vjs.CoreObject = function() {}, vjs.CoreObject.extend = function(a) {
            var b, c;
            a = a || {}, b = a.init || a.init || this.prototype.init || this.prototype.init || function() {}, c = function() {
                b.apply(this, arguments)
            }, c.prototype = vjs.obj.create(this.prototype), c.prototype.constructor = c, c.extend = vjs.CoreObject.extend, c.create = vjs.CoreObject.create;
            for (var d in a) a.hasOwnProperty(d) && (c.prototype[d] = a[d]);
            return c
        }, vjs.CoreObject.create = function() {
            var a = vjs.obj.create(this.prototype);
            return this.apply(a, arguments), a
        }, vjs.on = function(a, b, c) {
            var d = vjs.getData(a);
            d.handlers || (d.handlers = {}), d.handlers[b] || (d.handlers[b] = []), c.guid || (c.guid = vjs.guid++), d.handlers[b].push(c), d.dispatcher || (d.disabled = !1, d.dispatcher = function(b) {
                if (!d.disabled) {
                    b = vjs.fixEvent(b);
                    var c = d.handlers[b.type];
                    if (c)
                        for (var e = c.slice(0), f = 0, g = e.length; g > f && !b.isImmediatePropagationStopped(); f++) e[f].call(a, b)
                }
            }), 1 == d.handlers[b].length && (document.addEventListener ? a.addEventListener(b, d.dispatcher, !1) : document.attachEvent && a.attachEvent("on" + b, d.dispatcher))
        }, vjs.off = function(a, b, c) {
            if (vjs.hasData(a)) {
                var d = vjs.getData(a);
                if (d.handlers) {
                    var e = function(b) {
                        d.handlers[b] = [], vjs.cleanUpEvents(a, b)
                    };
                    if (b) {
                        var f = d.handlers[b];
                        if (f) {
                            if (!c) return void e(b);
                            if (c.guid)
                                for (var g = 0; g < f.length; g++) f[g].guid === c.guid && f.splice(g--, 1);
                            vjs.cleanUpEvents(a, b)
                        }
                    } else
                        for (var h in d.handlers) e(h)
                }
            }
        }, vjs.cleanUpEvents = function(a, b) {
            var c = vjs.getData(a);
            0 === c.handlers[b].length && (delete c.handlers[b], document.removeEventListener ? a.removeEventListener(b, c.dispatcher, !1) : document.detachEvent && a.detachEvent("on" + b, c.dispatcher)), vjs.isEmpty(c.handlers) && (delete c.handlers, delete c.dispatcher, delete c.disabled), vjs.isEmpty(c) && vjs.removeData(a)
        }, vjs.fixEvent = function(a) {
            function b() {
                return !0
            }

            function c() {
                return !1
            }
            if (!a || !a.isPropagationStopped) {
                var d = a || window.event;
                a = {};
                for (var e in d) "layerX" !== e && "layerY" !== e && (a[e] = d[e]);
                if (a.target || (a.target = a.srcElement || document), a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement, a.preventDefault = function() {
                        d.preventDefault && d.preventDefault(), a.returnValue = !1, a.isDefaultPrevented = b
                    }, a.isDefaultPrevented = c, a.stopPropagation = function() {
                        d.stopPropagation && d.stopPropagation(), a.cancelBubble = !0, a.isPropagationStopped = b
                    }, a.isPropagationStopped = c, a.stopImmediatePropagation = function() {
                        d.stopImmediatePropagation && d.stopImmediatePropagation(), a.isImmediatePropagationStopped = b, a.stopPropagation()
                    }, a.isImmediatePropagationStopped = c, null != a.clientX) {
                    var f = document.documentElement,
                        g = document.body;
                    a.pageX = a.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = a.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)
                }
                a.which = a.charCode || a.keyCode, null != a.button && (a.button = 1 & a.button ? 0 : 4 & a.button ? 1 : 2 & a.button ? 2 : 0), void 0 === a.data && (a.data = {})
            }
            return a
        }, vjs.trigger = function(a, b, c) {
            var d = vjs.hasData(a) ? vjs.getData(a) : {},
                e = a.parentNode || a.ownerDocument;
            if (("string" == typeof b || void 0 !== c && void 0 === b.data) && (b = {
                    type: b,
                    target: a,
                    data: c
                }), b = vjs.fixEvent(b), d.dispatcher && d.dispatcher.call(a, b), e && !b.isPropagationStopped()) vjs.trigger(e, b);
            else if (!e && !b.isDefaultPrevented()) {
                var f = vjs.getData(b.target);
                b.target[b.type] && (f.disabled = !0, "function" == typeof b.target[b.type] && b.target[b.type](), f.disabled = !1)
            }
            return !b.isDefaultPrevented()
        }, vjs.one = function(a, b, c) {
            vjs.on(a, b, function() {
                vjs.off(a, b, arguments.callee), c.apply(this, arguments)
            })
        };
        var hasOwnProp = Object.prototype.hasOwnProperty;
        vjs.createEl = function(a, b) {
                var c = document.createElement(a || "div");
                c.setAttribute("id", (a || "div") + vjs.guid++);
                for (var d in b) hasOwnProp.call(b, d) && (-1 !== d.indexOf("aria-") || "role" == d ? c.setAttribute(d, b[d]) : c[d] = b[d]);
                return c
            }, vjs.capitalize = function(a) {
                return a.charAt(0).toUpperCase() + a.slice(1)
            }, vjs.commonPrefix = function(a, b) {
                for (var c = a.length < b.length ? a.length : b.length, d = "", e = 0; c > e && a.charAt(e) == b.charAt(e); ++e) d += a.charAt(e);
                return d
            }, vjs.obj = {}, vjs.obj.toString = Object.prototype.toString, vjs.obj.hasOwnProperty = Object.prototype.hasOwnProperty, vjs.obj.create = Object.create || function(a) {
                function b() {}
                return b.prototype = a, new b
            }, vjs.obj.each = function(a, b, c) {
                for (var d in a) hasOwnProp.call(a, d) && b.call(c || this, d, a[d])
            }, vjs.obj.merge = function(a, b) {
                if (!b) return a;
                for (var c in b) hasOwnProp.call(b, c) && (a[c] = b[c]);
                return a
            }, vjs.obj.deepMerge = function(a, b) {
                var c, d, e, f;
                f = "[object Object]", a = vjs.obj.copy(a);
                for (c in b) hasOwnProp.call(b, c) && (d = a[c], e = b[c], a[c] = vjs.obj.isPlain(d) && vjs.obj.isPlain(e) ? vjs.obj.deepMerge(d, e) : b[c]);
                return a
            }, vjs.obj.copy = function(a) {
                return vjs.obj.merge({}, a)
            }, vjs.obj.isPlain = function(a) {
                return !!a && "object" == typeof a && "[object Object]" === a.toString() && a.constructor === Object
            }, vjs.bind = function(a, b, c) {
                b.guid || (b.guid = vjs.guid++);
                var d = function() {
                    return b.apply(a, arguments)
                };
                return d.guid = c ? c + "_" + b.guid : b.guid, d
            }, vjs.cache = {}, vjs.guid = 1, vjs.expando = "vdata" + (new Date).getTime(), vjs.getData = function(a) {
                var b = a[vjs.expando];
                return b || (b = a[vjs.expando] = vjs.guid++, vjs.cache[b] = {}), vjs.cache[b]
            }, vjs.hasData = function(a) {
                var b = a[vjs.expando];
                return !(!b || vjs.isEmpty(vjs.cache[b]))
            }, vjs.removeData = function(a) {
                var b = a[vjs.expando];
                if (b) {
                    delete vjs.cache[b];
                    try {
                        delete a[vjs.expando]
                    } catch (c) {
                        a.removeAttribute ? a.removeAttribute(vjs.expando) : a[vjs.expando] = null
                    }
                }
            }, vjs.isEmpty = function(a) {
                for (var b in a)
                    if (null !== a[b]) return !1;
                return !0
            }, vjs.addClass = function(a, b) {
                -1 == (" " + a.className + " ").indexOf(" " + b + " ") && (a.className = "" === a.className ? b : a.className + " " + b)
            }, vjs.removeClass = function(a, b) {
                if (-1 != a.className.indexOf(b)) {
                    for (var c = a.className.split(" "), d = c.length - 1; d >= 0; d--) c[d] === b && c.splice(d, 1);
                    a.className = c.join(" ")
                }
            }, vjs.TEST_VID = vjs.createEl("video"), vjs.USER_AGENT = navigator.userAgent, vjs.IS_IPHONE = !!vjs.USER_AGENT.match(/iPhone/i), vjs.IS_IPAD = !!vjs.USER_AGENT.match(/iPad/i), vjs.IS_IPOD = !!vjs.USER_AGENT.match(/iPod/i), vjs.IS_IOS = vjs.IS_IPHONE || vjs.IS_IPAD || vjs.IS_IPOD, vjs.IOS_VERSION = function() {
                var a = vjs.USER_AGENT.match(/OS (\d+)_/i);
                return a && a[1] ? a[1] : void 0
            }(), vjs.IS_ANDROID = !!vjs.USER_AGENT.match(/Android.*AppleWebKit/i), vjs.ANDROID_VERSION = function() {
                var a = vjs.USER_AGENT.match(/Android (\d+)\./i);
                return a && a[1] ? a[1] : null
            }(), vjs.IS_FIREFOX = function() {
                return !!vjs.USER_AGENT.match("Firefox")
            }, vjs.IS_IE = /MSIE (\d+\.\d+);/.test(vjs.USER_AGENT), vjs.IE_VERSION = Number(RegExp.$1), vjs.getAttributeValues = function(a) {
                var b = {},
                    c = ",autoplay,controls,loop,muted,default,";
                if (a && a.attributes && a.attributes.length > 0)
                    for (var d, e, f = a.attributes, g = f.length - 1; g >= 0; g--) d = f[g].name, e = f[g].value, ("boolean" == typeof a[d] || -1 !== c.indexOf("," + d + ",")) && (e = null !== e ? !0 : !1), b[d] = e;
                return b
            }, vjs.getComputedDimension = function(a, b) {
                var c = "";
                return document.defaultView && document.defaultView.getComputedStyle ? c = document.defaultView.getComputedStyle(a, "").getPropertyValue(b) : a.currentStyle && (c = a["client" + b.substr(0, 1).toUpperCase() + b.substr(1)] + "px"), c
            }, vjs.insertFirst = function(a, b) {
                b.firstChild ? b.insertBefore(a, b.firstChild) : b.appendChild(a)
            }, vjs.support = {}, vjs.el = function(a) {
                return 0 === a.indexOf("#") && (a = a.slice(1)), document.getElementById(a)
            }, vjs.formatTime = function(a, b) {
                b = b || a;
                var c = Math.floor(a % 60),
                    d = Math.floor(a / 60 % 60),
                    e = Math.floor(a / 3600),
                    f = Math.floor(b / 60 % 60),
                    g = Math.floor(b / 3600);
                return e = e > 0 || g > 0 ? e + ":" : "", d = ((e || f >= 10) && 10 > d ? "0" + d : d) + ":", c = 10 > c ? "0" + c : c, e + d + c
            }, vjs.blockTextSelection = function() {
                document.body.focus(), document.onselectstart = function() {
                    return !1
                }
            }, vjs.unblockTextSelection = function() {
                document.onselectstart = function() {
                    return !0
                }
            }, vjs.trim = function(a) {
                return a.toString().replace(/^\s+/, "").replace(/\s+$/, "")
            }, vjs.round = function(a, b) {
                return b || (b = 0), Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
            }, vjs.createTimeRange = function(a, b) {
                return {
                    length: 1,
                    start: function() {
                        return a
                    },
                    end: function() {
                        return b
                    }
                }
            }, vjs.get = function(a, b, c) {
                var d = 0 === a.indexOf("file:") || 0 === window.location.href.indexOf("file:") && -1 === a.indexOf("http");
                "undefined" == typeof XMLHttpRequest && (window.XMLHttpRequest = function() {
                    try {
                        return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")
                    } catch (a) {}
                    try {
                        return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")
                    } catch (b) {}
                    try {
                        return new window.ActiveXObject("Msxml2.XMLHTTP")
                    } catch (c) {}
                    throw new Error("This browser does not support XMLHttpRequest.")
                });
                var e = new XMLHttpRequest;
                try {
                    e.open("GET", a)
                } catch (f) {
                    c(f)
                }
                e.onreadystatechange = function() {
                    4 === e.readyState && (200 === e.status || d && 0 === e.status ? b(e.responseText) : c && c())
                };
                try {
                    e.send()
                } catch (f) {
                    c && c(f)
                }
            }, vjs.setLocalStorage = function(a, b) {
                try {
                    var c = window.localStorage || !1;
                    if (!c) return;
                    c[a] = b
                } catch (d) {
                    22 == d.code || 1014 == d.code ? vjs.log("LocalStorage Full (VideoJS)", d) : 18 == d.code ? vjs.log("LocalStorage not allowed (VideoJS)", d) : vjs.log("LocalStorage Error (VideoJS)", d)
                }
            }, vjs.getAbsoluteURL = function(a) {
                return a.match(/^https?:\/\//) || (a = vjs.createEl("div", {
                    innerHTML: '<a href="' + a + '">x</a>'
                }).firstChild.href), a
            }, vjs.log = function() {
                vjs.log.history = vjs.log.history || [], vjs.log.history.push(arguments), window.console && window.console.log(Array.prototype.slice.call(arguments))
            }, vjs.findPosition = function(a) {
                var b, c, d, e, f, g, h, i, j;
                return a.getBoundingClientRect && a.parentNode && (b = a.getBoundingClientRect()), b ? (c = document.documentElement, d = document.body, e = c.clientLeft || d.clientLeft || 0, f = window.pageXOffset || d.scrollLeft, g = b.left + f - e, h = c.clientTop || d.clientTop || 0, i = window.pageYOffset || d.scrollTop, j = b.top + i - h, {
                    left: g,
                    top: j
                }) : {
                    left: 0,
                    top: 0
                }
            }, vjs.Component = vjs.CoreObject.extend({
                init: function(a, b, c) {
                    this.player_ = a, this.options_ = vjs.obj.copy(this.options_), b = this.options(b), this.id_ = b.id || (b.el && b.el.id ? b.el.id : a.id() + "_component_" + vjs.guid++), this.name_ = b.name || null, this.el_ = b.el || this.createEl(), this.children_ = [], this.childIndex_ = {}, this.childNameIndex_ = {}, this.initChildren(), this.ready(c)
                }
            }), vjs.Component.prototype.dispose = function() {
                if (this.children_)
                    for (var a = this.children_.length - 1; a >= 0; a--) this.children_[a].dispose && this.children_[a].dispose();
                this.children_ = null, this.childIndex_ = null, this.childNameIndex_ = null, this.off(), this.el_.parentNode && this.el_.parentNode.removeChild(this.el_), vjs.removeData(this.el_), this.el_ = null
            }, vjs.Component.prototype.player_, vjs.Component.prototype.player = function() {
                return this.player_
            }, vjs.Component.prototype.options_, vjs.Component.prototype.options = function(a) {
                return void 0 === a ? this.options_ : this.options_ = vjs.obj.deepMerge(this.options_, a)
            }, vjs.Component.prototype.el_, vjs.Component.prototype.createEl = function(a, b) {
                return vjs.createEl(a, b)
            }, vjs.Component.prototype.el = function() {
                return this.el_
            }, vjs.Component.prototype.contentEl_, vjs.Component.prototype.contentEl = function() {
                return this.contentEl_ || this.el_
            }, vjs.Component.prototype.id_, vjs.Component.prototype.id = function() {
                return this.id_
            }, vjs.Component.prototype.name_, vjs.Component.prototype.name = function() {
                return this.name_
            }, vjs.Component.prototype.children_, vjs.Component.prototype.children = function() {
                return this.children_
            }, vjs.Component.prototype.childIndex_, vjs.Component.prototype.getChildById = function(a) {
                return this.childIndex_[a]
            }, vjs.Component.prototype.childNameIndex_, vjs.Component.prototype.getChild = function(a) {
                return this.childNameIndex_[a]
            }, vjs.Component.prototype.addChild = function(a, b) {
                var c, d, e;
                return "string" == typeof a ? (e = a, b = b || {}, d = b.componentClass || vjs.capitalize(e), b.name = e, c = new window.videojs[d](this.player_ || this, b)) : c = a, this.children_.push(c), "function" == typeof c.id && (this.childIndex_[c.id()] = c), e = e || c.name && c.name(), e && (this.childNameIndex_[e] = c), "function" == typeof c.el && c.el() && this.contentEl().appendChild(c.el()), c
            }, vjs.Component.prototype.removeChild = function(a) {
                if ("string" == typeof a && (a = this.getChild(a)), a && this.children_) {
                    for (var b = !1, c = this.children_.length - 1; c >= 0; c--)
                        if (this.children_[c] === a) {
                            b = !0, this.children_.splice(c, 1);
                            break
                        }
                    if (b) {
                        this.childIndex_[a.id] = null, this.childNameIndex_[a.name] = null;
                        var d = a.el();
                        d && d.parentNode === this.contentEl() && this.contentEl().removeChild(a.el())
                    }
                }
            }, vjs.Component.prototype.initChildren = function() {
                var a = this.options_;
                if (a && a.children) {
                    var b = this;
                    vjs.obj.each(a.children, function(a, c) {
                        if (c !== !1) {
                            var d = function() {
                                b[a] = b.addChild(a, c)
                            };
                            c.loadEvent || d()
                        }
                    })
                }
            }, vjs.Component.prototype.buildCSSClass = function() {
                return ""
            }, vjs.Component.prototype.on = function(a, b) {
                return vjs.on(this.el_, a, vjs.bind(this, b)), this
            }, vjs.Component.prototype.off = function(a, b) {
                return vjs.off(this.el_, a, b), this
            }, vjs.Component.prototype.one = function(a, b) {
                return vjs.one(this.el_, a, vjs.bind(this, b)), this
            }, vjs.Component.prototype.trigger = function(a, b) {
                return vjs.trigger(this.el_, a, b), this
            }, vjs.Component.prototype.isReady_, vjs.Component.prototype.isReadyOnInitFinish_ = !0, vjs.Component.prototype.readyQueue_, vjs.Component.prototype.ready = function(a) {
                return a && (this.isReady_ ? a.call(this) : (void 0 === this.readyQueue_ && (this.readyQueue_ = []), this.readyQueue_.push(a))), this
            }, vjs.Component.prototype.triggerReady = function() {
                this.isReady_ = !0;
                var a = this.readyQueue_;
                if (a && a.length > 0) {
                    for (var b = 0, c = a.length; c > b; b++) a[b].call(this);
                    this.readyQueue_ = [], this.trigger("ready")
                }
            }, vjs.Component.prototype.addClass = function(a) {
                return vjs.addClass(this.el_, a), this
            }, vjs.Component.prototype.removeClass = function(a) {
                return vjs.removeClass(this.el_, a), this
            }, vjs.Component.prototype.show = function() {
                return this.el_.style.display = "block", this
            }, vjs.Component.prototype.hide = function() {
                return this.el_.style.display = "none", this
            }, vjs.Component.prototype.fadeIn = function() {
                return this.removeClass("vjs-fade-out"), this.addClass("vjs-fade-in"), this
            }, vjs.Component.prototype.fadeOut = function() {
                return this.removeClass("vjs-fade-in"), this.addClass("vjs-fade-out"), this
            }, vjs.Component.prototype.lockShowing = function() {
                return this.player_.controls() && this.addClass("vjs-lock-showing"), this
            }, vjs.Component.prototype.unlockShowing = function() {
                return this.removeClass("vjs-lock-showing"), this
            }, vjs.Component.prototype.disable = function() {
                this.hide(), this.show = function() {}, this.fadeIn = function() {}
            }, vjs.Component.prototype.width = function(a, b) {
                return this.dimension("width", a, b)
            }, vjs.Component.prototype.height = function(a, b) {
                return this.dimension("height", a, b)
            }, vjs.Component.prototype.dimensions = function(a, b) {
                return this.width(a, !0).height(b)
            }, vjs.Component.prototype.dimension = function(a, b, c) {
                if (void 0 !== b) return this.el_.style[a] = -1 !== ("" + b).indexOf("%") || -1 !== ("" + b).indexOf("px") ? b : "auto" === b ? "" : b + "px", c || this.trigger("resize"), this;
                if (!this.el_) return 0;
                var d = this.el_.style[a],
                    e = d.indexOf("px");
                return -1 !== e ? parseInt(d.slice(0, e), 10) : parseInt(this.el_["offset" + vjs.capitalize(a)], 10)
            }, vjs.Button = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b);
                    var c = !1;
                    this.on("touchstart", function() {
                        c = !0
                    }), this.on("touchmove", function() {
                        c = !1
                    });
                    var d = this;
                    this.on("touchend", function(a) {
                        c && d.onClick(a), a.preventDefault(), a.stopPropagation()
                    }), this.on("click", this.onClick), this.on("focus", this.onFocus), this.on("blur", this.onBlur)
                }
            }), vjs.Button.prototype.createEl = function(a, b) {
                return b = vjs.obj.merge({
                    className: this.buildCSSClass(),
                    innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + (this.buttonText || "Need Text") + "</span></div>",
                    role: "button",
                    "aria-live": "polite",
                    tabIndex: 0
                }, b), vjs.Component.prototype.createEl.call(this, a, b)
            }, vjs.Button.prototype.buildCSSClass = function() {
                return "vjs-control " + vjs.Component.prototype.buildCSSClass.call(this)
            }, vjs.Button.prototype.onClick = function() {}, vjs.Button.prototype.onFocus = function() {
                vjs.on(document, "keyup", vjs.bind(this, this.onKeyPress))
            }, vjs.Button.prototype.onKeyPress = function(a) {
                (32 == a.which || 13 == a.which) && (a.preventDefault(), this.onClick())
            }, vjs.Button.prototype.onBlur = function() {
                vjs.off(document, "keyup", vjs.bind(this, this.onKeyPress))
            }, vjs.Slider = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b), this.bar = this.getChild(this.options_.barName), this.handle = this.getChild(this.options_.handleName), a.on(this.playerEvent, vjs.bind(this, this.update)), this.on("mousedown", this.onMouseDown), this.on("touchstart", this.onMouseDown), this.on("focus", this.onFocus), this.on("blur", this.onBlur), this.on("click", this.onClick), this.player_.on("controlsvisible", vjs.bind(this, this.update)), a.ready(vjs.bind(this, this.update)), this.boundEvents = {}
                }
            }), vjs.Slider.prototype.createEl = function(a, b) {
                return b = b || {}, b.className = b.className + " vjs-slider", b = vjs.obj.merge({
                    role: "slider",
                    "aria-valuenow": 0,
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    tabIndex: 0
                }, b), vjs.Component.prototype.createEl.call(this, a, b)
            }, vjs.Slider.prototype.onMouseDown = function(a) {
                a.preventDefault(), vjs.blockTextSelection(), this.boundEvents.move = vjs.bind(this, this.onMouseMove), this.boundEvents.end = vjs.bind(this, this.onMouseUp), vjs.on(document, "mousemove", this.boundEvents.move), vjs.on(document, "mouseup", this.boundEvents.end), vjs.on(document, "touchmove", this.boundEvents.move), vjs.on(document, "touchend", this.boundEvents.end), this.onMouseMove(a)
            }, vjs.Slider.prototype.onMouseUp = function() {
                vjs.unblockTextSelection(), vjs.off(document, "mousemove", this.boundEvents.move, !1), vjs.off(document, "mouseup", this.boundEvents.end, !1), vjs.off(document, "touchmove", this.boundEvents.move, !1), vjs.off(document, "touchend", this.boundEvents.end, !1), this.update()
            }, vjs.Slider.prototype.update = function() {
                if (this.el_) {
                    var a, b = this.getPercent(),
                        c = this.handle,
                        d = this.bar;
                    if (isNaN(b) && (b = 0), a = b, c) {
                        var e = this.el_,
                            f = e.offsetWidth,
                            g = c.el().offsetWidth,
                            h = g ? g / f : 0,
                            i = 1 - h,
                            j = b * i;
                        a = j + h / 2, c.el().style.left = vjs.round(100 * j, 2) + "%"
                    }
                    d.el().style.width = vjs.round(100 * a, 2) + "%"
                }
            }, vjs.Slider.prototype.calculateDistance = function(a) {
                var b, c, d, e, f, g, h, i, j;
                if (b = this.el_, c = vjs.findPosition(b), f = g = b.offsetWidth, h = this.handle, this.options_.vertical) {
                    if (e = c.top, j = a.changedTouches ? a.changedTouches[0].pageY : a.pageY, h) {
                        var k = h.el().offsetHeight;
                        e += k / 2, g -= k
                    }
                    return Math.max(0, Math.min(1, (e - j + g) / g))
                }
                if (d = c.left, i = a.changedTouches ? a.changedTouches[0].pageX : a.pageX, h) {
                    var l = h.el().offsetWidth;
                    d += l / 2, f -= l
                }
                return Math.max(0, Math.min(1, (i - d) / f))
            }, vjs.Slider.prototype.onFocus = function() {
                vjs.on(document, "keyup", vjs.bind(this, this.onKeyPress))
            }, vjs.Slider.prototype.onKeyPress = function(a) {
                37 == a.which ? (a.preventDefault(), this.stepBack()) : 39 == a.which && (a.preventDefault(), this.stepForward())
            }, vjs.Slider.prototype.onBlur = function() {
                vjs.off(document, "keyup", vjs.bind(this, this.onKeyPress))
            }, vjs.Slider.prototype.onClick = function(a) {
                a.stopImmediatePropagation(), a.preventDefault()
            }, vjs.SliderHandle = vjs.Component.extend(), vjs.SliderHandle.prototype.defaultValue = 0, vjs.SliderHandle.prototype.createEl = function(a, b) {
                return b = b || {}, b.className = b.className + " vjs-slider-handle", b = vjs.obj.merge({
                    innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
                }, b), vjs.Component.prototype.createEl.call(this, "div", b)
            }, vjs.Menu = vjs.Component.extend(), vjs.Menu.prototype.addItem = function(a) {
                this.addChild(a), a.on("click", vjs.bind(this, function() {
                    this.unlockShowing()
                }))
            }, vjs.Menu.prototype.createEl = function() {
                var a = this.options().contentElType || "ul";
                this.contentEl_ = vjs.createEl(a, {
                    className: "vjs-menu-content"
                });
                var b = vjs.Component.prototype.createEl.call(this, "div", {
                    append: this.contentEl_,
                    className: "vjs-menu"
                });
                return b.appendChild(this.contentEl_), vjs.on(b, "click", function(a) {
                    a.preventDefault(), a.stopImmediatePropagation()
                }), b
            }, vjs.MenuItem = vjs.Button.extend({
                init: function(a, b) {
                    vjs.Button.call(this, a, b), this.selected(b.selected)
                }
            }), vjs.MenuItem.prototype.createEl = function(a, b) {
                return vjs.Button.prototype.createEl.call(this, "li", vjs.obj.merge({
                    className: "vjs-menu-item",
                    innerHTML: this.options_.label
                }, b))
            }, vjs.MenuItem.prototype.onClick = function() {
                this.selected(!0)
            }, vjs.MenuItem.prototype.selected = function(a) {
                a ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-selected", !0)) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-selected", !1))
            }, vjs.MenuButton = vjs.Button.extend({
                init: function(a, b) {
                    vjs.Button.call(this, a, b), this.menu = this.createMenu(), this.addChild(this.menu), this.items && 0 === this.items.length && this.hide(), this.on("keyup", this.onKeyPress), this.el_.setAttribute("aria-haspopup", !0), this.el_.setAttribute("role", "button")
                }
            }), vjs.MenuButton.prototype.buttonPressed_ = !1, vjs.MenuButton.prototype.createMenu = function() {
                var a = new vjs.Menu(this.player_);
                if (this.options().title && a.el().appendChild(vjs.createEl("li", {
                        className: "vjs-menu-title",
                        innerHTML: vjs.capitalize(this.kind_),
                        tabindex: -1
                    })), this.items = this.createItems(), this.items)
                    for (var b = 0; b < this.items.length; b++) a.addItem(this.items[b]);
                return a
            }, vjs.MenuButton.prototype.createItems = function() {}, vjs.MenuButton.prototype.buildCSSClass = function() {
                return this.className + " vjs-menu-button " + vjs.Button.prototype.buildCSSClass.call(this)
            }, vjs.MenuButton.prototype.onFocus = function() {}, vjs.MenuButton.prototype.onBlur = function() {}, vjs.MenuButton.prototype.onClick = function() {
                this.one("mouseout", vjs.bind(this, function() {
                    this.menu.unlockShowing(), this.el_.blur()
                })), this.buttonPressed_ ? this.unpressButton() : this.pressButton()
            }, vjs.MenuButton.prototype.onKeyPress = function(a) {
                a.preventDefault(), 32 == a.which || 13 == a.which ? this.buttonPressed_ ? this.unpressButton() : this.pressButton() : 27 == a.which && this.buttonPressed_ && this.unpressButton()
            }, vjs.MenuButton.prototype.pressButton = function() {
                this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-pressed", !0), this.items && this.items.length > 0 && this.items[0].el().focus()
            }, vjs.MenuButton.prototype.unpressButton = function() {
                this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-pressed", !1)
            }, vjs.Player = vjs.Component.extend({
                init: function(a, b, c) {
                    this.tag = a, void 0 === b && a.getAttribute("data-setup") && (b = vjs.JSON.parse(a.getAttribute("data-setup") || "{}")), b = vjs.obj.merge(this.getTagSettings(a), b), this.cache_ = {}, this.poster_ = b.poster, this.controls_ = b.controls, b.customControlsOnMobile !== !0 && (vjs.IS_IOS || vjs.IS_ANDROID) ? (a.controls = !0, this.controls_ = !1) : a.controls = !1, vjs.Component.call(this, this, b, c), this.one("play", function(a) {
                        var b = {
                                type: "firstplay",
                                target: this.el_
                            },
                            c = vjs.trigger(this.el_, b);
                        c || (a.preventDefault(), a.stopPropagation(), a.stopImmediatePropagation())
                    }), this.on("ended", this.onEnded), this.on("play", this.onPlay), this.on("firstplay", this.onFirstPlay), this.on("pause", this.onPause), this.on("progress", this.onProgress), this.on("durationchange", this.onDurationChange), this.on("bitratechange", this.onBitrateChange), this.on("error", this.onError), this.on("fullscreenchange", this.onFullscreenChange), vjs.players[this.id_] = this, b.plugins && vjs.obj.each(b.plugins, function(a, c) {
                        this[a](c, b)
                    }, this)
                }
            }), vjs.Player.prototype.options_ = vjs.options, vjs.Player.prototype.dispose = function() {
                this.trigger("dispose"), this.off("dispose"), vjs.players[this.id_] = null, this.tag && this.tag.player && (this.tag.player = null), this.el_ && this.el_.player && (this.el_.player = null), this.stopTrackingProgress(), this.stopTrackingCurrentTime(), this.tech && this.tech.dispose(), vjs.Component.prototype.dispose.call(this)
            }, vjs.Player.prototype.getTagSettings = function(a) {
                var b = {
                    sources: [],
                    tracks: []
                };
                if (vjs.obj.merge(b, vjs.getAttributeValues(a)), a.hasChildNodes())
                    for (var c, d, e = a.childNodes, f = 0, g = e.length; g > f; f++) c = e[f], d = c.nodeName.toLowerCase(), "source" === d ? b.sources.push(vjs.getAttributeValues(c)) : "track" === d && b.tracks.push(vjs.getAttributeValues(c));
                return b
            }, vjs.Player.prototype.createEl = function() {
                var a = this.el_ = vjs.Component.prototype.createEl.call(this, "div"),
                    b = this.tag;
                if (b.removeAttribute("width"), b.removeAttribute("height"), b.hasChildNodes())
                    for (var c = b.childNodes.length, d = 0, e = b.childNodes; c > d; d++)("source" == e[0].nodeName.toLowerCase() || "track" == e[0].nodeName.toLowerCase()) && b.removeChild(e[0]);
                return b.id = b.id || "vjs_video_" + vjs.guid++, a.id = b.id, a.className = b.className, b.id += "_html5_api", b.className = "vjs-tech", b.player = a.player = this, this.addClass("vjs-paused"), this.width(this.options_.width, !0), this.height(this.options_.height, !0), b.parentNode && b.parentNode.insertBefore(a, b), vjs.insertFirst(b, a), a
            }, vjs.Player.prototype.loadTech = function(a, b) {
                this.tech ? this.unloadTech() : "Html5" !== a && this.tag && (this.el_.removeChild(this.tag), this.tag.player = null, this.tag = null), this.techName = a, this.isReady_ = !1;
                var c = function() {
                        this.player_.triggerReady(), this.features.progressEvents || this.player_.manualProgressOn(), this.features.timeupdateEvents || this.player_.manualTimeUpdatesOn()
                    },
                    d = vjs.obj.merge({
                        source: b,
                        parentEl: this.el_,
                        metadata: this.options_.metadata
                    }, this.options_[a.toLowerCase()]);
                b && (b.src == this.cache_.src && this.cache_.currentTime > 0 && (d.startTime = this.cache_.currentTime), this.cache_.src = b.src), this.tech = new window.videojs[a](this, d), this.tech.ready(c)
            }, vjs.Player.prototype.unloadTech = function() {
                this.isReady_ = !1, this.tech.dispose(), this.manualProgress && this.manualProgressOff(), this.manualTimeUpdates && this.manualTimeUpdatesOff(), this.tech = !1
            }, vjs.Player.prototype.manualProgressOn = function() {
                this.manualProgress = !0, this.trackProgress(), this.tech.one("progress", function() {
                    this.features.progressEvents = !0, this.player_.manualProgressOff()
                })
            }, vjs.Player.prototype.manualProgressOff = function() {
                this.manualProgress = !1, this.stopTrackingProgress()
            }, vjs.Player.prototype.trackProgress = function() {
                this.progressInterval = setInterval(vjs.bind(this, function() {
                    this.cache_.bufferEnd < this.buffered().end(0) ? this.trigger("progress") : 1 == this.bufferedPercent() && (this.stopTrackingProgress(), this.trigger("progress"))
                }), 500)
            }, vjs.Player.prototype.stopTrackingProgress = function() {
                clearInterval(this.progressInterval)
            }, vjs.Player.prototype.manualTimeUpdatesOn = function() {
                this.manualTimeUpdates = !0, this.on("play", this.trackCurrentTime), this.on("pause", this.stopTrackingCurrentTime), this.tech.one("timeupdate", function() {
                    this.features.timeupdateEvents = !0, this.player_.manualTimeUpdatesOff()
                })
            }, vjs.Player.prototype.manualTimeUpdatesOff = function() {
                this.manualTimeUpdates = !1, this.stopTrackingCurrentTime(), this.off("play", this.trackCurrentTime), this.off("pause", this.stopTrackingCurrentTime)
            }, vjs.Player.prototype.trackCurrentTime = function() {
                this.currentTimeInterval && this.stopTrackingCurrentTime(), this.currentTimeInterval = setInterval(vjs.bind(this, function() {
                    this.trigger("timeupdate")
                }), 250)
            }, vjs.Player.prototype.stopTrackingCurrentTime = function() {
                clearInterval(this.currentTimeInterval)
            }, vjs.Player.prototype.onEnded = function() {
                this.options_.loop && (this.currentTime(0), this.play())
            }, vjs.Player.prototype.onPlay = function() {
                vjs.removeClass(this.el_, "vjs-paused"), vjs.addClass(this.el_, "vjs-playing")
            }, vjs.Player.prototype.onFirstPlay = function() {
                this.options_.starttime && this.currentTime(this.options_.starttime)
            }, vjs.Player.prototype.onPause = function() {
                vjs.removeClass(this.el_, "vjs-playing"), vjs.addClass(this.el_, "vjs-paused")
            }, vjs.Player.prototype.onProgress = function() {
                1 == this.bufferedPercent() && this.trigger("loadedalldata")
            }, vjs.Player.prototype.onDurationChange = function() {
                this.duration(this.techGet("duration"))
            }, vjs.Player.prototype.onBitrateChange = function() {
                var a = this.techGet("bitrate");
                void 0 !== a && (this.cache_.bitrate = parseFloat(a))
            }, vjs.Player.prototype.onError = function(a) {
                vjs.log("Video Error", a)
            }, vjs.Player.prototype.onFullscreenChange = function() {
                this.isFullScreen() ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen")
            }, vjs.Player.prototype.cache_, vjs.Player.prototype.getCache = function() {
                return this.cache_
            }, vjs.Player.prototype.techCall = function(a, b) {
                if (this.tech && !this.tech.isReady_) this.tech.ready(function() {
                    this[a](b)
                });
                else try {
                    this.tech[a](b)
                } catch (c) {
                    throw vjs.log(c), c
                }
            }, vjs.Player.prototype.techGet = function(a) {
                if (this.tech.isReady_) try {
                    return this.tech[a]()
                } catch (b) {
                    throw void 0 === this.tech[a] ? vjs.log("Video.js: " + a + " method not defined for " + this.techName + " playback technology.", b) : "TypeError" == b.name ? (vjs.log("Video.js: " + a + " unavailable on " + this.techName + " playback technology element.", b), this.tech.isReady_ = !1) : vjs.log(b), b
                }
            }, vjs.Player.prototype.play = function() {
                return this.techCall("play"), this
            }, vjs.Player.prototype.pause = function() {
                return this.techCall("pause"), this
            }, vjs.Player.prototype.paused = function() {
                return this.techGet("paused") === !1 ? !1 : !0
            }, vjs.Player.prototype.currentTime = function(a) {
                return void 0 !== a ? (this.cache_.lastSetCurrentTime = a, this.techCall("setCurrentTime", a), this.manualTimeUpdates && this.trigger("timeupdate"), this) : this.cache_.currentTime = this.techGet("currentTime") || 0
            }, vjs.Player.prototype.duration = function(a) {
                return void 0 !== a ? (this.cache_.duration = parseFloat(a), this) : this.cache_.duration
            }, vjs.Player.prototype.bitrate = function() {
                return this.cache_.bitrate
            }, vjs.Player.prototype.nextClip = function(a) {
                return this.techCall("setNextClip", a), this
            }, vjs.Player.prototype.remainingTime = function() {
                return this.duration() - this.currentTime()
            }, vjs.Player.prototype.buffered = function() {
                var a = this.techGet("buffered"),
                    b = 0,
                    c = this.cache_.bufferEnd = this.cache_.bufferEnd || 0;
                return a && a.length > 0 && a.end(0) !== c && (c = a.end(0), this.cache_.bufferEnd = c), vjs.createTimeRange(b, c)
            }, vjs.Player.prototype.bufferedPercent = function() {
                return this.duration() ? this.buffered().end(0) / this.duration() : 0
            }, vjs.Player.prototype.volume = function(a) {
                var b;
                return void 0 !== a ? (b = Math.max(0, Math.min(1, parseFloat(a))), this.cache_.volume = b, this.techCall("setVolume", b), vjs.setLocalStorage("volume", b), this) : (b = parseFloat(this.techGet("volume")), isNaN(b) ? 1 : b)
            }, vjs.Player.prototype.muted = function(a) {
                return void 0 !== a ? (this.techCall("setMuted", a), this) : this.techGet("muted") || !1
            }, vjs.Player.prototype.supportsFullScreen = function() {
                return this.techGet("supportsFullScreen") || !1
            }, vjs.Player.prototype.isFullScreen_ = !1, vjs.Player.prototype.isFullScreen = function(a) {
                if (void 0 !== a) return this.isFullScreen_ = a, this;
                var b = this.techGet("fullScreen");
                return void 0 !== b ? b : this.isFullScreen_
            }, vjs.Player.prototype.requestFullScreen = function() {
                var a = vjs.support.requestFullScreen;
                return this.isFullScreen(!0), a ? (vjs.on(document, a.eventName, vjs.bind(this, function() {
                    this.isFullScreen(document[a.isFullScreen]), this.isFullScreen() === !1 && vjs.off(document, a.eventName, arguments.callee), this.trigger("fullscreenchange")
                })), this.el_[a.requestFn]()) : this.tech.supportsFullScreen() ? this.techCall("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange")), this
            }, vjs.Player.prototype.cancelFullScreen = function() {
                var a = vjs.support.requestFullScreen;
                return this.isFullScreen(!1), a ? document[a.cancelFn]() : this.tech.supportsFullScreen() ? this.techCall("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange")), this
            }, vjs.Player.prototype.enterFullWindow = function() {
                this.isFullWindow = !0, this.docOrigOverflow = document.documentElement.style.overflow, vjs.on(document, "keydown", vjs.bind(this, this.fullWindowOnEscKey)), document.documentElement.style.overflow = "hidden", vjs.addClass(document.body, "vjs-full-window"), this.trigger("enterFullWindow")
            }, vjs.Player.prototype.fullWindowOnEscKey = function(a) {
                27 === a.keyCode && (this.isFullScreen() === !0 ? this.cancelFullScreen() : this.exitFullWindow())
            }, vjs.Player.prototype.exitFullWindow = function() {
                this.isFullWindow = !1, vjs.off(document, "keydown", this.fullWindowOnEscKey), document.documentElement.style.overflow = this.docOrigOverflow, vjs.removeClass(document.body, "vjs-full-window"), this.trigger("exitFullWindow")
            }, vjs.Player.prototype.selectSource = function(a) {
                for (var b = 0, c = this.options_.techOrder; b < c.length; b++) {
                    var d = vjs.capitalize(c[b]),
                        e = window.videojs[d];
                    if (e.isSupported())
                        for (var f = 0, g = a; f < g.length; f++) {
                            var h = g[f];
                            if (e.canPlaySource(h)) return {
                                source: h,
                                tech: d
                            }
                        }
                }
                return !1
            }, vjs.Player.prototype.selectSources = function(a, b) {
                var c = [];
                a = vjs.capitalize(a);
                var d = window.videojs[a];
                if (d.isSupported())
                    for (var e = 0, f = b; e < f.length; e++) {
                        var g = f[e];
                        d.canPlaySource(g) && c.push(g)
                    }
                return c
            }, vjs.Player.prototype.src = function(a) {
                if (a instanceof Array) {
                    var b, c = this.selectSource(a);
                    c ? (b = c.tech, b == this.techName ? this.src(a) : window.videojs[b].supportsMBR() ? this.loadTech(b, this.selectSources(b, a)) : this.loadTech(b, c.source)) : this.el_.appendChild(vjs.createEl("p", {
                        innerHTML: 'Sorry, no compatible source and playback technology were found for this video. Try using another browser like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'
                    }))
                } else a instanceof Object ? this.src(window.videojs[this.techName].canPlaySource(a) ? a.src : [a]) : (this.cache_.src = a, this.isReady_ ? (this.techCall("src", a), "auto" == this.options_.preload && this.load(), this.options_.autoplay && this.play()) : this.ready(function() {
                    this.src(a)
                }));
                return this
            }, vjs.Player.prototype.load = function() {
                return this.techCall("load"), this
            }, vjs.Player.prototype.currentSrc = function() {
                return this.techGet("currentSrc") || this.cache_.src || ""
            }, vjs.Player.prototype.preload = function(a) {
                return void 0 !== a ? (this.techCall("setPreload", a), this.options_.preload = a, this) : this.techGet("preload")
            }, vjs.Player.prototype.autoplay = function(a) {
                return void 0 !== a ? (this.techCall("setAutoplay", a), this.options_.autoplay = a, this) : this.techGet("autoplay", a)
            }, vjs.Player.prototype.loop = function(a) {
                return void 0 !== a ? (this.techCall("setLoop", a), this.options_.loop = a, this) : this.techGet("loop")
            }, vjs.Player.prototype.poster_, vjs.Player.prototype.poster = function(a) {
                return void 0 !== a && (this.poster_ = a), this.poster_
            }, vjs.Player.prototype.controls_, vjs.Player.prototype.controls = function(a) {
                return void 0 !== a && this.controls_ !== a && (this.controls_ = !!a, this.trigger("controlschange")), this.controls_
            }, vjs.Player.prototype.techName = function() {
                return this.techName
            }, vjs.Player.prototype.error = function() {
                return this.techGet("error")
            }, vjs.Player.prototype.ended = function() {
                return this.techGet("ended")
            }, vjs.Player.prototype.seekable = function() {
                return this.techGet("seekable")
            },
            function() {
                var a, b, c;
                c = document.createElement("div"), b = {}, void 0 !== c.cancelFullscreen ? (b.requestFn = "requestFullscreen", b.cancelFn = "exitFullscreen", b.eventName = "fullscreenchange", b.isFullScreen = "fullScreen") : (document.mozCancelFullScreen ? (a = "moz", b.isFullScreen = a + "FullScreen") : (a = "webkit", b.isFullScreen = a + "IsFullScreen"), c[a + "RequestFullScreen"] && (b.requestFn = a + "RequestFullScreen", b.cancelFn = a + "CancelFullScreen"), b.eventName = a + "fullscreenchange"), document[b.cancelFn] && (vjs.support.requestFullScreen = b)
            }(), vjs.MediaLoader = function(a, b, c) {
                if (vjs.Component.call(this, a, b, c), a.options_.sources && 0 !== a.options_.sources.length) a.src(a.options_.sources);
                else
                    for (var d = 0, e = a.options_.techOrder; d < e.length; d++) {
                        var f = vjs.capitalize(e[d]),
                            g = window.videojs[f];
                        if (g && g.isSupported()) {
                            a.loadTech(f);
                            break
                        }
                    }
            }, vjs.ControlBar = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b), a.controls() || this.disable(), a.one("play", vjs.bind(this, function() {
                        var a, b = vjs.bind(this, this.fadeIn),
                            c = vjs.bind(this, this.fadeOut);
                        this.fadeIn(), "ontouchstart" in window || (this.player_.on("mouseover", b), this.player_.on("mouseout", c), this.player_.on("pause", vjs.bind(this, this.lockShowing)), this.player_.on("play", vjs.bind(this, this.unlockShowing))), a = !1, this.player_.on("touchstart", function() {
                            a = !0
                        }), this.player_.on("touchmove", function() {
                            a = !1
                        }), this.player_.on("touchend", vjs.bind(this, function(b) {
                            var c;
                            a && (c = this.el().className.search("fade-in"), -1 !== c ? this.fadeOut() : this.fadeIn()), a = !1, this.player_.paused() || vjs.IS_ANDROID || b.preventDefault()
                        }))
                    }))
                }
            }), vjs.ControlBar.prototype.options_ = {
                loadEvent: "play",
                children: {
                    playToggle: {},
                    currentTimeDisplay: {},
                    timeDivider: {},
                    durationDisplay: {},
                    remainingTimeDisplay: {},
                    progressControl: {},
                    fullscreenToggle: {},
                    volumeControl: {},
                    muteToggle: {}
                }
            }, vjs.ControlBar.prototype.createEl = function() {
                return vjs.createEl("div", {
                    className: "vjs-control-bar"
                })
            }, vjs.ControlBar.prototype.fadeIn = function() {
                vjs.Component.prototype.fadeIn.call(this), this.player_.trigger("controlsvisible")
            }, vjs.ControlBar.prototype.fadeOut = function() {
                vjs.Component.prototype.fadeOut.call(this), this.player_.trigger("controlshidden")
            }, vjs.PlayToggle = vjs.Button.extend({
                init: function(a, b) {
                    vjs.Button.call(this, a, b), a.on("play", vjs.bind(this, this.onPlay)), a.on("pause", vjs.bind(this, this.onPause))
                }
            }), vjs.PlayToggle.prototype.buttonText = "Play", vjs.PlayToggle.prototype.buildCSSClass = function() {
                return "vjs-play-control " + vjs.Button.prototype.buildCSSClass.call(this)
            }, vjs.PlayToggle.prototype.onClick = function() {
                this.player_.paused() ? this.player_.play() : this.player_.pause()
            }, vjs.PlayToggle.prototype.onPlay = function() {
                vjs.removeClass(this.el_, "vjs-paused"), vjs.addClass(this.el_, "vjs-playing"), this.el_.children[0].children[0].innerHTML = "Pause"
            }, vjs.PlayToggle.prototype.onPause = function() {
                vjs.removeClass(this.el_, "vjs-playing"), vjs.addClass(this.el_, "vjs-paused"), this.el_.children[0].children[0].innerHTML = "Play"
            }, vjs.CurrentTimeDisplay = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b), a.on("timeupdate", vjs.bind(this, this.updateContent))
                }
            }), vjs.CurrentTimeDisplay.prototype.createEl = function() {
                var a = vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-current-time vjs-time-controls vjs-control"
                });
                return this.content = vjs.createEl("div", {
                    className: "vjs-current-time-display",
                    innerHTML: '<span class="vjs-control-text">Current Time </span><span>0:00</span>',
                    "aria-live": "off"
                }), a.appendChild(vjs.createEl("div").appendChild(this.content)), a
            }, vjs.CurrentTimeDisplay.prototype.updateContent = function() {
                var a = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
                this.content.children[1].innerHTML = vjs.formatTime(a, this.player_.duration())
            }, vjs.DurationDisplay = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b), a.on("timeupdate", vjs.bind(this, this.updateContent))
                }
            }), vjs.DurationDisplay.prototype.createEl = function() {
                var a = vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-duration vjs-time-controls vjs-control"
                });
                return this.content = vjs.createEl("div", {
                    className: "vjs-duration-display",
                    innerHTML: '<span class="vjs-control-text">Duration Time </span><span>0:00<span>',
                    "aria-live": "off"
                }), a.appendChild(vjs.createEl("div").appendChild(this.content)), a
            }, vjs.DurationDisplay.prototype.updateContent = function() {
                this.player_.duration() && (this.content.children[1].innerHTML = vjs.formatTime(this.player_.duration()))
            }, vjs.TimeDivider = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b)
                }
            }), vjs.TimeDivider.prototype.createEl = function() {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-time-divider",
                    innerHTML: "<div><span>/</span></div>"
                })
            }, vjs.RemainingTimeDisplay = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b), a.on("timeupdate", vjs.bind(this, this.updateContent))
                }
            }), vjs.RemainingTimeDisplay.prototype.createEl = function() {
                var a = vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-remaining-time vjs-time-controls vjs-control"
                });
                return this.content = vjs.createEl("div", {
                    className: "vjs-remaining-time-display",
                    innerHTML: '<span class="vjs-control-text">Remaining Time </span><span>-0:00-<span>',
                    "aria-live": "off"
                }), a.appendChild(vjs.createEl("div").appendChild(this.content)), a
            }, vjs.RemainingTimeDisplay.prototype.updateContent = function() {
                this.player_.duration() && this.player_.duration() && (this.content.children[1].innerHTML = "-" + vjs.formatTime(this.player_.remainingTime()))
            }, vjs.FullscreenToggle = vjs.Button.extend({
                init: function(a, b) {
                    vjs.Button.call(this, a, b)
                }
            }), vjs.FullscreenToggle.prototype.buttonText = "Fullscreen", vjs.FullscreenToggle.prototype.buildCSSClass = function() {
                return "vjs-fullscreen-control " + vjs.Button.prototype.buildCSSClass.call(this)
            }, vjs.FullscreenToggle.prototype.onClick = function() {
                this.player_.isFullScreen ? (this.player_.cancelFullScreen(), this.el_.children[0].children[0].innerHTML = "Fullscreen") : (this.player_.requestFullScreen(), this.el_.children[0].children[0].innerHTML = "Non-Fullscreen")
            }, vjs.ProgressControl = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b)
                }
            }), vjs.ProgressControl.prototype.options_ = {
                children: {
                    seekBar: {}
                }
            }, vjs.ProgressControl.prototype.createEl = function() {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-progress-control vjs-control"
                })
            }, vjs.SeekBar = vjs.Slider.extend({
                init: function(a, b) {
                    vjs.Slider.call(this, a, b), a.on("timeupdate", vjs.bind(this, this.updateARIAAttributes)), a.ready(vjs.bind(this, this.updateARIAAttributes))
                }
            }), vjs.SeekBar.prototype.options_ = {
                children: {
                    loadProgressBar: {},
                    playProgressBar: {},
                    seekHandle: {}
                },
                barName: "playProgressBar",
                handleName: "seekHandle"
            }, vjs.SeekBar.prototype.playerEvent = "timeupdate", vjs.SeekBar.prototype.createEl = function() {
                return vjs.Slider.prototype.createEl.call(this, "div", {
                    className: "vjs-progress-holder",
                    "aria-label": "video progress bar"
                })
            }, vjs.SeekBar.prototype.updateARIAAttributes = function() {
                var a = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
                this.el_.setAttribute("aria-valuenow", vjs.round(100 * this.getPercent(), 2)), this.el_.setAttribute("aria-valuetext", vjs.formatTime(a, this.player_.duration()))
            }, vjs.SeekBar.prototype.getPercent = function() {
                return this.player_.currentTime() / this.player_.duration()
            }, vjs.SeekBar.prototype.onMouseDown = function(a) {
                this.player_.seekable() && (vjs.Slider.prototype.onMouseDown.call(this, a), this.player_.scrubbing = !0, this.videoWasPlaying = !this.player_.paused(), this.player_.pause())
            }, vjs.SeekBar.prototype.onMouseMove = function(a) {
                if (this.player_.seekable()) {
                    var b = this.calculateDistance(a) * this.player_.duration();
                    b == this.player_.duration() && (b -= .1), this.player_.currentTime(b)
                }
            }, vjs.SeekBar.prototype.onMouseUp = function(a) {
                this.player_.seekable() && (vjs.Slider.prototype.onMouseUp.call(this, a), this.player_.scrubbing = !1, this.videoWasPlaying && this.player_.play())
            }, vjs.SeekBar.prototype.stepForward = function() {
                this.player_.currentTime(this.player_.currentTime() + 5)
            }, vjs.SeekBar.prototype.stepBack = function() {
                this.player_.currentTime(this.player_.currentTime() - 5)
            }, vjs.LoadProgressBar = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b), a.on("progress", vjs.bind(this, this.update))
                }
            }), vjs.LoadProgressBar.prototype.createEl = function() {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-load-progress",
                    innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
                })
            }, vjs.LoadProgressBar.prototype.update = function() {
                this.el_.style && (this.el_.style.width = vjs.round(100 * this.player_.bufferedPercent(), 2) + "%")
            }, vjs.PlayProgressBar = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b)
                }
            }), vjs.PlayProgressBar.prototype.createEl = function() {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-play-progress",
                    innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
                })
            }, vjs.SeekHandle = vjs.SliderHandle.extend(), vjs.SeekHandle.prototype.defaultValue = "00:00", vjs.SeekHandle.prototype.createEl = function() {
                return vjs.SliderHandle.prototype.createEl.call(this, "div", {
                    className: "vjs-seek-handle"
                })
            }, vjs.VolumeControl = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b), a.tech && a.tech.features && a.tech.features.volumeControl === !1 && this.addClass("vjs-hidden"), a.on("loadstart", vjs.bind(this, function() {
                        a.tech.features && a.tech.features.volumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                    }))
                }
            }), vjs.VolumeControl.prototype.options_ = {
                children: {
                    volumeBar: {}
                }
            }, vjs.VolumeControl.prototype.createEl = function() {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-volume-control vjs-control"
                })
            }, vjs.VolumeBar = vjs.Slider.extend({
                init: function(a, b) {
                    vjs.Slider.call(this, a, b), a.on("volumechange", vjs.bind(this, this.updateARIAAttributes)), a.ready(vjs.bind(this, this.updateARIAAttributes)), setTimeout(vjs.bind(this, this.update), 0)
                }
            }), vjs.VolumeBar.prototype.updateARIAAttributes = function() {
                this.el_.setAttribute("aria-valuenow", vjs.round(100 * this.player_.volume(), 2)), this.el_.setAttribute("aria-valuetext", vjs.round(100 * this.player_.volume(), 2) + "%")
            }, vjs.VolumeBar.prototype.options_ = {
                children: {
                    volumeLevel: {},
                    volumeHandle: {}
                },
                barName: "volumeLevel",
                handleName: "volumeHandle"
            }, vjs.VolumeBar.prototype.playerEvent = "volumechange", vjs.VolumeBar.prototype.createEl = function() {
                return vjs.Slider.prototype.createEl.call(this, "div", {
                    className: "vjs-volume-bar",
                    "aria-label": "volume level"
                })
            }, vjs.VolumeBar.prototype.onMouseMove = function(a) {
                this.player_.volume(this.calculateDistance(a))
            }, vjs.VolumeBar.prototype.getPercent = function() {
                return this.player_.muted() ? 0 : this.player_.volume()
            }, vjs.VolumeBar.prototype.stepForward = function() {
                this.player_.volume(this.player_.volume() + .1)
            }, vjs.VolumeBar.prototype.stepBack = function() {
                this.player_.volume(this.player_.volume() - .1)
            }, vjs.VolumeLevel = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b)
                }
            }), vjs.VolumeLevel.prototype.createEl = function() {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-volume-level",
                    innerHTML: '<span class="vjs-control-text"></span>'
                })
            }, vjs.VolumeHandle = vjs.SliderHandle.extend(), vjs.VolumeHandle.prototype.defaultValue = "00:00", vjs.VolumeHandle.prototype.createEl = function() {
                return vjs.SliderHandle.prototype.createEl.call(this, "div", {
                    className: "vjs-volume-handle"
                })
            }, vjs.MuteToggle = vjs.Button.extend({
                init: function(a, b) {
                    vjs.Button.call(this, a, b), a.on("volumechange", vjs.bind(this, this.update)), a.tech && a.tech.features && a.tech.features.volumeControl === !1 && this.addClass("vjs-hidden"), a.on("loadstart", vjs.bind(this, function() {
                        a.tech.features && a.tech.features.volumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                    }))
                }
            }), vjs.MuteToggle.prototype.createEl = function() {
                return vjs.Button.prototype.createEl.call(this, "div", {
                    className: "vjs-mute-control vjs-control",
                    innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
                })
            }, vjs.MuteToggle.prototype.onClick = function() {
                this.player_.muted(this.player_.muted() ? !1 : !0)
            }, vjs.MuteToggle.prototype.update = function() {
                var a = this.player_.volume(),
                    b = 3;
                0 === a || this.player_.muted() ? b = 0 : .33 > a ? b = 1 : .67 > a && (b = 2), this.player_.muted() ? "Unmute" != this.el_.children[0].children[0].innerHTML && (this.el_.children[0].children[0].innerHTML = "Unmute") : "Mute" != this.el_.children[0].children[0].innerHTML && (this.el_.children[0].children[0].innerHTML = "Mute");
                for (var c = 0; 4 > c; c++) vjs.removeClass(this.el_, "vjs-vol-" + c);
                vjs.addClass(this.el_, "vjs-vol-" + b)
            }, vjs.VolumeMenuButton = vjs.MenuButton.extend({
                init: function(a, b) {
                    vjs.MenuButton.call(this, a, b), a.on("volumechange", vjs.bind(this, this.update)), a.tech && a.tech.features && a.tech.features.volumeControl === !1 && this.addClass("vjs-hidden"), a.on("loadstart", vjs.bind(this, function() {
                        a.tech.features && a.tech.features.volumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden")
                    })), this.addClass("vjs-menu-button")
                }
            }), vjs.VolumeMenuButton.prototype.createMenu = function() {
                var a = new vjs.Menu(this.player_, {
                        contentElType: "div"
                    }),
                    b = new vjs.VolumeBar(this.player_, vjs.obj.merge({
                        vertical: !0
                    }, this.options_.volumeBar));
                return a.addChild(b), a
            }, vjs.VolumeMenuButton.prototype.onClick = function() {
                vjs.MuteToggle.prototype.onClick.call(this), vjs.MenuButton.prototype.onClick.call(this)
            }, vjs.VolumeMenuButton.prototype.createEl = function() {
                return vjs.Button.prototype.createEl.call(this, "div", {
                    className: "vjs-volume-menu-button vjs-menu-button vjs-control",
                    innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
                })
            }, vjs.VolumeMenuButton.prototype.update = vjs.MuteToggle.prototype.update, vjs.PosterImage = vjs.Button.extend({
                init: function(a, b) {
                    vjs.Button.call(this, a, b), a.poster() && a.controls() || this.hide(), a.on("play", vjs.bind(this, this.hide))
                }
            }), vjs.PosterImage.prototype.createEl = function() {
                var a = vjs.createEl("div", {
                        className: "vjs-poster",
                        tabIndex: -1
                    }),
                    b = this.player_.poster();
                return b && ("backgroundSize" in a.style ? a.style.backgroundImage = 'url("' + b + '")' : a.appendChild(vjs.createEl("img", {
                    src: b
                }))), a
            }, vjs.PosterImage.prototype.onClick = function() {
                this.player_.play()
            }, vjs.LoadingSpinner = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b), a.on("canplay", vjs.bind(this, this.hide)), a.on("canplaythrough", vjs.bind(this, this.hide)), a.on("playing", vjs.bind(this, this.hide)), a.on("seeked", vjs.bind(this, this.hide)), a.on("seeking", vjs.bind(this, this.show)), a.on("seeked", vjs.bind(this, this.hide)), a.on("error", vjs.bind(this, this.show)), a.on("waiting", vjs.bind(this, this.show))
                }
            }), vjs.LoadingSpinner.prototype.createEl = function() {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-loading-spinner"
                })
            }, vjs.BigPlayButton = vjs.Button.extend({
                init: function(a, b) {
                    vjs.Button.call(this, a, b), a.controls() || this.hide(), a.on("play", vjs.bind(this, this.hide))
                }
            }), vjs.BigPlayButton.prototype.createEl = function() {
                return vjs.Button.prototype.createEl.call(this, "div", {
                    className: "vjs-big-play-button",
                    innerHTML: "<span></span>",
                    "aria-label": "play video"
                })
            }, vjs.BigPlayButton.prototype.onClick = function() {
                this.player_.play()
            }, vjs.MediaTechController = vjs.Component.extend({
                init: function(a, b, c) {
                    vjs.Component.call(this, a, b, c)
                }
            }), vjs.MediaTechController.prototype.onClick = function() {
                return vjs.IS_ANDROID ? function() {} : function() {
                    this.player_.controls() && (this.player_.paused() ? this.player_.play() : this.player_.pause())
                }
            }(), vjs.MediaTechController.prototype.features = {
                volumeControl: !0,
                fullscreenResize: !1,
                progressEvents: !1,
                timeupdateEvents: !1
            }, vjs.media = {}, vjs.media.ApiMethods = "play,pause,paused,nextClip,setNextClip,currentTime,setCurrentTime,duration,bitrate,buffered,volume,setVolume,muted,setMuted,width,height,supportsFullScreen,enterFullScreen,src,load,currentSrc,preload,setPreload,autoplay,setAutoplay,loop,setLoop,error,networkState,readyState,seeking,initialTime,startOffsetTime,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks,defaultPlaybackRate,playbackRate,mediaGroup,controller,controls,defaultMuted".split(",");
        for (var i = vjs.media.ApiMethods.length - 1; i >= 0; i--) {
            var methodName = vjs.media.ApiMethods[i];
            vjs.MediaTechController.prototype[vjs.media.ApiMethods[i]] = createMethod(methodName)
        }
        vjs.Html5 = vjs.MediaTechController.extend({
            init: function(a, b, c) {
                this.features.volumeControl = vjs.Html5.canControlVolume(), this.features.movingMediaElementInDOM = !vjs.IS_IOS, this.features.fullscreenResize = !0, vjs.MediaTechController.call(this, a, b, c);
                var d = b.source;
                d && this.el_.currentSrc == d.src ? a.trigger("loadstart") : d && (this.el_.src = d.src), a.ready(function() {
                    this.options_.autoplay && this.paused() && (this.tag.poster = null, this.play())
                }), this.on("click", this.onClick), this.setupTriggers(), this.triggerReady()
            }
        }), vjs.Html5.prototype.dispose = function() {
            vjs.MediaTechController.prototype.dispose.call(this)
        }, vjs.Html5.prototype.createEl = function() {
            var a = this.player_,
                b = a.tag;
            b && this.features.movingMediaElementInDOM !== !1 || (b ? (b.player = null, a.tag = null, a.el().removeChild(b), b = b.cloneNode(!1)) : b = vjs.createEl("video", {
                id: a.id() + "_html5_api",
                className: "vjs-tech"
            }), b.player = a, vjs.insertFirst(b, a.el()));
            for (var c = ["autoplay", "preload", "loop", "muted"], d = c.length - 1; d >= 0; d--) {
                var e = c[d];
                null !== a.options_[e] && (b[e] = a.options_[e])
            }
            return b
        }, vjs.Html5.prototype.setupTriggers = function() {
            for (var a = vjs.Html5.Events.length - 1; a >= 0; a--) vjs.on(this.el_, vjs.Html5.Events[a], vjs.bind(this.player_, this.eventHandler))
        }, vjs.Html5.prototype.eventHandler = function(a) {
            this.trigger(a), a.stopPropagation()
        }, vjs.Html5.prototype.play = function() {
            this.el_.play()
        }, vjs.Html5.prototype.pause = function() {
            this.el_.pause()
        }, vjs.Html5.prototype.paused = function() {
            return this.el_.paused
        }, vjs.Html5.prototype.currentTime = function() {
            return this.el_.currentTime
        }, vjs.Html5.prototype.setCurrentTime = function(a) {
            try {
                this.el_.currentTime = a
            } catch (b) {
                vjs.log(b, "Video is not ready. (Video.js)")
            }
        }, vjs.Html5.prototype.duration = function() {
            return this.el_.duration || 0
        }, vjs.Html5.prototype.bitrate = function() {
            return this.el_.bitrate || 0
        }, vjs.Html5.prototype.buffered = function() {
            return this.el_.buffered
        }, vjs.Html5.prototype.volume = function() {
            return this.el_.volume
        }, vjs.Html5.prototype.setVolume = function(a) {
            this.el_.volume = a
        }, vjs.Html5.prototype.muted = function() {
            return this.el_.muted
        }, vjs.Html5.prototype.setMuted = function(a) {
            this.el_.muted = a
        }, vjs.Html5.prototype.width = function() {
            return this.el_.offsetWidth
        }, vjs.Html5.prototype.height = function() {
            return this.el_.offsetHeight
        }, vjs.Html5.prototype.supportsFullScreen = function() {
            return "function" != typeof this.el_.webkitEnterFullScreen || !/Android/.test(vjs.USER_AGENT) && /Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT) ? !1 : !0
        }, vjs.Html5.prototype.enterFullScreen = function() {
            var a = this.el_;
            a.paused && a.networkState <= a.HAVE_METADATA ? (this.el_.play(), setTimeout(function() {
                a.pause(), a.webkitEnterFullScreen()
            }, 0)) : a.webkitEnterFullScreen()
        }, vjs.Html5.prototype.exitFullScreen = function() {
            this.el_.webkitExitFullScreen()
        }, vjs.Html5.prototype.src = function(a) {
            this.el_.src = a
        }, vjs.Html5.prototype.load = function() {
            this.el_.load()
        }, vjs.Html5.prototype.currentSrc = function() {
            return this.el_.currentSrc
        }, vjs.Html5.prototype.preload = function() {
            return this.el_.preload
        }, vjs.Html5.prototype.setPreload = function(a) {
            this.el_.preload = a
        }, vjs.Html5.prototype.autoplay = function() {
            return this.el_.autoplay
        }, vjs.Html5.prototype.setAutoplay = function(a) {
            this.el_.autoplay = a
        }, vjs.Html5.prototype.loop = function() {
            return this.el_.loop
        }, vjs.Html5.prototype.setLoop = function(a) {
            this.el_.loop = a
        }, vjs.Html5.prototype.error = function() {
            return this.el_.error
        }, vjs.Html5.prototype.seeking = function() {
            return this.el_.seeking
        }, vjs.Html5.prototype.seekable = function() {
            return this.el_.seekable
        }, vjs.Html5.prototype.ended = function() {
            return this.el_.ended
        }, vjs.Html5.prototype.defaultMuted = function() {
            return this.el_.defaultMuted
        }, vjs.Html5.isSupported = function() {
            return !!document.createElement("video").canPlayType
        }, vjs.Html5.canPlaySource = function(a) {
            return a.src.match(/^rtmpt/) || a.src.match(/manifest\.f4m(\?|$)/) ? void 0 : !!document.createElement("video").canPlayType(a.type)
        }, vjs.Html5.supportsMBR = function() {
            return !1
        }, vjs.Html5.canControlVolume = function() {
            var a = vjs.TEST_VID.volume;
            return vjs.TEST_VID.volume = a / 2 + .1, a !== vjs.TEST_VID.volume
        }, vjs.Html5.Events = "loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(","), vjs.IS_ANDROID && vjs.ANDROID_VERSION < 3 && (document.createElement("video").constructor.prototype.canPlayType = function(a) {
            return a && -1 != a.toLowerCase().indexOf("video/mp4") ? "maybe" : ""
        }), vjs.Flash = vjs.MediaTechController.extend({
            init: function(a, b, c) {
                vjs.MediaTechController.call(this, a, b, c);
                var d = b.source,
                    e = b.parentEl,
                    f = this.el_ = vjs.createEl("div", {
                        id: a.id() + "_temp_flash"
                    }),
                    g = a.id() + "_flash_api",
                    h = a.options_,
                    i = vjs.obj.merge({
                        readyFunction: "videojs.Flash.onReady",
                        eventProxyFunction: "videojs.Flash.onEvent",
                        errorEventProxyFunction: "videojs.Flash.onError",
                        autoplay: h.autoplay,
                        preload: h.preload,
                        loop: h.loop,
                        muted: h.muted
                    }, b.flashVars),
                    j = vjs.obj.merge({
                        wmode: "direct",
                        bgcolor: "#000000"
                    }, b.params),
                    k = vjs.obj.merge({
                        id: g,
                        name: g,
                        "class": "vjs-tech"
                    }, b.attributes);
                if (b.metadata && (i.metadata = encodeURIComponent(vjs.JSON.stringify(b.metadata))), i["conviva.custom.tags"] && (i["conviva.custom.tags"] = encodeURIComponent(vjs.JSON.stringify(i["conviva.custom.tags"]))), d instanceof Array && d.length > 1) {
                    for (var l = [], m = 0; m < d.length; ++m) {
                        var n = d[m];
                        if ("data-bitrate" in n && n["data-bitrate"] && 0 == n.src.indexOf("rtmp:")) {
                            var o = {};
                            o.stream = n.src, o.bitrate = n["data-bitrate"], l.push(o)
                        }
                    }
                    if (l.length > 0) {
                        for (var p = [], q = void 0, m = 0; m < l.length; ++m) {
                            var o = l[m];
                            if (p.push(o), void 0 == q) {
                                var r = new RegExp("/[a-zA-Z0-9]{2,4}:.*", "g");
                                q = o.stream.match(r) ? o.stream.replace(r, "/") : o.stream
                            } else -1 == o.stream.indexOf(q) && (q = vjs.commonPrefix(q, o.stream))
                        }
                        q = q.substring(0, q.lastIndexOf("/"));
                        for (var m = 0; m < l.length; ++m) l[m].stream = l[m].stream.substring(q.length + 1);
                        0 < p.length && (d.src = q, i.mbr = encodeURIComponent(vjs.JSON.stringify(p)))
                    }
                }
                if (d && (i.src = encodeURIComponent(d instanceof Array ? vjs.JSON.stringify(d) : vjs.getAbsoluteURL(d.src))), i.jsAdsEnabled && vjs.IS_IE && (i.jsAdsEnabled = !1), vjs.insertFirst(f, e), b.startTime && this.ready(function() {
                        this.load(), this.play(), this.currentTime(b.startTime)
                    }), b.iFrameMode !== !0 || vjs.IS_FIREFOX) vjs.Flash.embed(b.swf, f, i, j, k);
                else {
                    var s = vjs.createEl("iframe", {
                        id: g + "_iframe",
                        name: g + "_iframe",
                        className: "vjs-tech",
                        scrolling: "no",
                        marginWidth: 0,
                        marginHeight: 0,
                        frameBorder: 0
                    });
                    i.readyFunction = "ready", i.eventProxyFunction = "events", i.errorEventProxyFunction = "errors", vjs.on(s, "load", vjs.bind(this, function() {
                        var a, c = s.contentWindow;
                        a = s.contentDocument ? s.contentDocument : s.contentWindow.document, a.write(vjs.Flash.getEmbedCode(b.swf, i, j, k)), c.player = this.player_, c.ready = vjs.bind(this.player_, function(b) {
                            var c = a.getElementById(b),
                                d = this,
                                e = d.tech;
                            e.el_ = c, vjs.on(c, "click", e.bind(e.onClick)), vjs.Flash.checkReady(e)
                        }), c.events = vjs.bind(this.player_, function(a, b) {
                            var c = this;
                            c && "flash" === c.techName && c.trigger(b)
                        }), c.errors = vjs.bind(this.player_, function(a, b) {
                            vjs.log("Flash Error", b)
                        })
                    })), f.parentNode.replaceChild(s, f)
                }
            }
        }), vjs.Flash.prototype.dispose = function() {
            vjs.MediaTechController.prototype.dispose.call(this)
        }, vjs.Flash.prototype.play = function() {
            this.el_.vjs_play()
        }, vjs.Flash.prototype.pause = function() {
            this.el_.vjs_pause()
        }, vjs.Flash.prototype.src = function(a) {
            if (a = vjs.getAbsoluteURL(a), this.el_.vjs_src(a), this.player_.autoplay()) {
                var b = this;
                setTimeout(function() {
                    b.play()
                }, 0)
            }
        }, vjs.Flash.prototype.load = function() {
            this.el_.vjs_load()
        }, vjs.Flash.prototype.poster = function() {
            this.el_.vjs_getProperty("poster")
        }, vjs.Flash.prototype.buffered = function() {
            return vjs.createTimeRange(0, this.el_.vjs_getProperty("buffered"))
        }, vjs.Flash.prototype.supportsFullScreen = function() {
            return !1
        }, vjs.Flash.prototype.enterFullScreen = function() {
            return !1
        };
        var api = vjs.Flash.prototype,
            readWrite = "preload,currentTime,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted,nextClip".split(","),
            readOnly = "error,currentSrc,networkState,readyState,seeking,initialTime,duration,bitrate,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks,fullScreen".split(","),
            createSetter = function(a) {
                var b = a.charAt(0).toUpperCase() + a.slice(1);
                api["set" + b] = function(b) {
                    return this.el_.vjs_setProperty(a, b)
                }
            },
            createGetter = function(a) {
                api[a] = function() {
                    return this.el_.vjs_getProperty(a)
                }
            };
        if (function() {
                var a;
                for (a = 0; a < readWrite.length; a++) createGetter(readWrite[a]), createSetter(readWrite[a]);
                for (a = 0; a < readOnly.length; a++) createGetter(readOnly[a])
            }(), vjs.Flash.isSupported = function() {
                return vjs.Flash.version().split(",")[0] >= 10
            }, vjs.Flash.canPlaySource = function(a) {
                return a.type in vjs.Flash.formats && !a.src.match(/\.m3u8([?]+.*)?$/) ? "maybe" : void 0
            }, vjs.Flash.supportsMBR = function() {
                return !0
            }, vjs.Flash.formats = {
                "video/flv": "FLV",
                "video/x-flv": "FLV",
                "video/mp4": "MP4",
                "video/m4v": "MP4"
            }, vjs.Flash.onReady = function(a) {
                var b = vjs.el(a),
                    c = b.player || b.parentNode.player,
                    d = c.tech;
                b.player = c, d.el_ = b, d.on("click", d.onClick), vjs.Flash.checkReady(d)
            }, vjs.Flash.checkReady = function(a) {
                a.el().vjs_getProperty ? a.triggerReady() : setTimeout(function() {
                    vjs.Flash.checkReady(a)
                }, 50)
            }, vjs.Flash.onEvent = function(a, b, c) {
                var d = vjs.el(a).player;
                d.trigger(b, c)
            }, vjs.Flash.onError = function(a, b) {
                var c = vjs.el(a).player;
                c.trigger("error"), vjs.log("Flash Error", b, a)
            }, vjs.Flash.version = function() {
                var a = "0,0,0";
                try {
                    a = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
                } catch (b) {
                    try {
                        if (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
                            var c = navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"];
                            a = c.version ? c.version.replace(/\./g, ",") : c.description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]
                        }
                    } catch (d) {}
                }
                return a
            }, vjs.Flash.embed = function(a, b, c, d, e) {
                var f = vjs.Flash.getEmbedCode(a, c, d, e),
                    g = vjs.createEl("div", {
                        innerHTML: f
                    }).childNodes[0],
                    h = b.parentNode;
                if (b.parentNode.replaceChild(g, b), vjs.IS_IE && 6 == vjs.IE_VERSION) {
                    var i = h.childNodes[0];
                    setTimeout(function() {
                        i.style.display = "block"
                    }, 1e3)
                }
                return g
            }, vjs.Flash.getEmbedCode = function(a, b, c, d) {
                var e = '<object type="application/x-shockwave-flash"',
                    f = "",
                    g = "",
                    h = "";
                return b && vjs.obj.each(b, function(a, b) {
                    f += a + "=" + b + "&amp;"
                }), c = vjs.obj.merge({
                    movie: a,
                    flashvars: f,
                    allowScriptAccess: "always",
                    allowNetworking: "all"
                }, c), vjs.obj.each(c, function(a, b) {
                    g += '<param name="' + a + '" value="' + b + '" />'
                }), d = vjs.obj.merge({
                    data: a,
                    width: "100%",
                    height: "100%"
                }, d), vjs.obj.each(d, function(a, b) {
                    h += a + '="' + b + '" '
                }), e + h + ">" + g + "</object>"
            }, vjs.MediaLoader = vjs.Component.extend({
                init: function(a, b, c) {
                    if (vjs.Component.call(this, a, b, c), a.options_.sources && 0 !== a.options_.sources.length) a.src(a.options_.sources);
                    else
                        for (var d = 0, e = a.options_.techOrder; d < e.length; d++) {
                            var f = vjs.capitalize(e[d]),
                                g = window.videojs[f];
                            if (g && g.isSupported()) {
                                a.loadTech(f);
                                break
                            }
                        }
                }
            }), vjs.Player.prototype.textTracks_, vjs.Player.prototype.textTracks = function() {
                return this.textTracks_ = this.textTracks_ || [], this.textTracks_
            }, vjs.Player.prototype.addTextTrack = function(a, b, c, d) {
                var e = this.textTracks_ = this.textTracks_ || [];
                d = d || {}, d.kind = a, d.label = b, d.language = c;
                var f = vjs.capitalize(a || "subtitles"),
                    g = new window.videojs[f + "Track"](this, d);
                return e.push(g), g
            }, vjs.Player.prototype.addTextTracks = function(a) {
                for (var b, c = 0; c < a.length; c++) b = a[c], this.addTextTrack(b.kind, b.label, b.language, b);
                return this
            }, vjs.Player.prototype.showTextTrack = function(a, b) {
                for (var c, d, e, f = this.textTracks_, g = 0, h = f.length; h > g; g++) c = f[g], c.id() === a ? (c.show(), d = c) : b && c.kind() == b && c.mode() > 0 && c.disable();
                return e = d ? d.kind() : b ? b : !1, e && this.trigger(e + "trackchange"), this
            }, vjs.TextTrack = vjs.Component.extend({
                init: function(a, b) {
                    vjs.Component.call(this, a, b), this.id_ = b.id || "vjs_" + b.kind + "_" + b.language + "_" + vjs.guid++, this.src_ = b.src, this.dflt_ = b["default"] || b.dflt, this.title_ = b.title, this.language_ = b.srclang, this.label_ = b.label, this.cues_ = [], this.activeCues_ = [], this.readyState_ = 0, this.mode_ = 0, this.player_.on("fullscreenchange", vjs.bind(this, this.adjustFontSize))
                }
            }), vjs.TextTrack.prototype.kind_, vjs.TextTrack.prototype.kind = function() {
                return this.kind_
            }, vjs.TextTrack.prototype.src_, vjs.TextTrack.prototype.src = function() {
                return this.src_
            }, vjs.TextTrack.prototype.dflt_, vjs.TextTrack.prototype.dflt = function() {
                return this.dflt_
            }, vjs.TextTrack.prototype.title_, vjs.TextTrack.prototype.title = function() {
                return this.title_
            }, vjs.TextTrack.prototype.language_, vjs.TextTrack.prototype.language = function() {
                return this.language_
            }, vjs.TextTrack.prototype.label_, vjs.TextTrack.prototype.label = function() {
                return this.label_
            }, vjs.TextTrack.prototype.cues_, vjs.TextTrack.prototype.cues = function() {
                return this.cues_
            }, vjs.TextTrack.prototype.activeCues_, vjs.TextTrack.prototype.activeCues = function() {
                return this.activeCues_
            }, vjs.TextTrack.prototype.readyState_, vjs.TextTrack.prototype.readyState = function() {
                return this.readyState_
            }, vjs.TextTrack.prototype.mode_, vjs.TextTrack.prototype.mode = function() {
                return this.mode_
            }, vjs.TextTrack.prototype.adjustFontSize = function() {
                this.el_.style.fontSize = this.player_.isFullScreen ? screen.width / this.player_.width() * 1.4 * 100 + "%" : ""
            }, vjs.TextTrack.prototype.createEl = function() {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-" + this.kind_ + " vjs-text-track"
                })
            }, vjs.TextTrack.prototype.show = function() {
                this.activate(), this.mode_ = 2, vjs.Component.prototype.show.call(this)
            }, vjs.TextTrack.prototype.hide = function() {
                this.activate(), this.mode_ = 1, vjs.Component.prototype.hide.call(this)
            }, vjs.TextTrack.prototype.disable = function() {
                2 == this.mode_ && this.hide(), this.deactivate(), this.mode_ = 0
            }, vjs.TextTrack.prototype.activate = function() {
                0 === this.readyState_ && this.load(), 0 === this.mode_ && (this.player_.on("timeupdate", vjs.bind(this, this.update, this.id_)), this.player_.on("ended", vjs.bind(this, this.reset, this.id_)), ("captions" === this.kind_ || "subtitles" === this.kind_) && this.player_.getChild("textTrackDisplay").addChild(this))
            }, vjs.TextTrack.prototype.deactivate = function() {
                this.player_.off("timeupdate", vjs.bind(this, this.update, this.id_)), this.player_.off("ended", vjs.bind(this, this.reset, this.id_)), this.reset(), this.player_.getChild("textTrackDisplay").removeChild(this)
            }, vjs.TextTrack.prototype.load = function() {
                0 === this.readyState_ && (this.readyState_ = 1, vjs.get(this.src_, vjs.bind(this, this.parseCues), vjs.bind(this, this.onError)))
            }, vjs.TextTrack.prototype.onError = function(a) {
                this.error = a, this.readyState_ = 3, this.trigger("error")
            }, vjs.TextTrack.prototype.parseCues = function(a) {
                for (var b, c, d, e, f = a.split("\n"), g = "", h = 1, i = f.length; i > h; h++)
                    if (g = vjs.trim(f[h])) {
                        for (-1 == g.indexOf("-->") ? (e = g, g = vjs.trim(f[++h])) : e = this.cues_.length, b = {
                                id: e,
                                index: this.cues_.length
                            }, c = g.split(" --> "), b.startTime = this.parseCueTime(c[0]), b.endTime = this.parseCueTime(c[1]), d = []; f[++h] && (g = vjs.trim(f[h]));) d.push(g);
                        b.text = d.join("<br/>"), this.cues_.push(b)
                    }
                this.readyState_ = 2, this.trigger("loaded")
            }, vjs.TextTrack.prototype.parseCueTime = function(a) {
                var b, c, d, e, f, g = a.split(":"),
                    h = 0;
                return 3 == g.length ? (b = g[0], c = g[1], d = g[2]) : (b = 0, c = g[0], d = g[1]), d = d.split(/\s+/), e = d.splice(0, 1)[0], e = e.split(/\.|,/), f = parseFloat(e[1]), e = e[0], h += 3600 * parseFloat(b), h += 60 * parseFloat(c), h += parseFloat(e), f && (h += f / 1e3), h
            }, vjs.TextTrack.prototype.update = function() {
                if (this.cues_.length > 0) {
                    var a = this.player_.currentTime();
                    if (void 0 === this.prevChange || a < this.prevChange || this.nextChange <= a) {
                        var b, c, d, e, f = this.cues_,
                            g = this.player_.duration(),
                            h = 0,
                            i = !1,
                            j = [];
                        for (a >= this.nextChange || void 0 === this.nextChange ? e = void 0 !== this.firstActiveIndex ? this.firstActiveIndex : 0 : (i = !0, e = void 0 !== this.lastActiveIndex ? this.lastActiveIndex : f.length - 1);;) {
                            if (d = f[e], d.endTime <= a) h = Math.max(h, d.endTime), d.active && (d.active = !1);
                            else if (a < d.startTime) {
                                if (g = Math.min(g, d.startTime), d.active && (d.active = !1), !i) break
                            } else i ? (j.splice(0, 0, d), void 0 === c && (c = e), b = e) : (j.push(d), void 0 === b && (b = e), c = e), g = Math.min(g, d.endTime), h = Math.max(h, d.startTime), d.active = !0;
                            if (i) {
                                if (0 === e) break;
                                e--
                            } else {
                                if (e === f.length - 1) break;
                                e++
                            }
                        }
                        this.activeCues_ = j, this.nextChange = g, this.prevChange = h, this.firstActiveIndex = b, this.lastActiveIndex = c, this.updateDisplay(), this.trigger("cuechange")
                    }
                }
            }, vjs.TextTrack.prototype.updateDisplay = function() {
                for (var a = this.activeCues_, b = "", c = 0, d = a.length; d > c; c++) b += '<span class="vjs-tt-cue">' + a[c].text + "</span>";
                this.el_.innerHTML = b
            }, vjs.TextTrack.prototype.reset = function() {
                this.nextChange = 0, this.prevChange = this.player_.duration(), this.firstActiveIndex = 0, this.lastActiveIndex = 0
            }, vjs.CaptionsTrack = vjs.TextTrack.extend(), vjs.CaptionsTrack.prototype.kind_ = "captions", vjs.SubtitlesTrack = vjs.TextTrack.extend(), vjs.SubtitlesTrack.prototype.kind_ = "subtitles", vjs.ChaptersTrack = vjs.TextTrack.extend(), vjs.ChaptersTrack.prototype.kind_ = "chapters", vjs.TextTrackDisplay = vjs.Component.extend({
                init: function(a, b, c) {
                    vjs.Component.call(this, a, b, c), a.options_.tracks && a.options_.tracks.length > 0 && this.player_.addTextTracks(a.options_.tracks)
                }
            }), vjs.TextTrackDisplay.prototype.createEl = function() {
                return vjs.Component.prototype.createEl.call(this, "div", {
                    className: "vjs-text-track-display"
                })
            }, vjs.TextTrackMenuItem = vjs.MenuItem.extend({
                init: function(a, b) {
                    var c = this.track = b.track;
                    b.label = c.label(), b.selected = c.dflt(), vjs.MenuItem.call(this, a, b), this.player_.on(c.kind() + "trackchange", vjs.bind(this, this.update))
                }
            }), vjs.TextTrackMenuItem.prototype.onClick = function() {
                vjs.MenuItem.prototype.onClick.call(this), this.player_.showTextTrack(this.track.id_, this.track.kind())
            }, vjs.TextTrackMenuItem.prototype.update = function() {
                this.selected(2 == this.track.mode() ? !0 : !1)
            }, vjs.OffTextTrackMenuItem = vjs.TextTrackMenuItem.extend({
                init: function(a, b) {
                    b.track = {
                        kind: function() {
                            return b.kind
                        },
                        player: a,
                        label: function() {
                            return b.kind + " off"
                        },
                        dflt: function() {
                            return !1
                        },
                        mode: function() {
                            return !1
                        }
                    }, vjs.TextTrackMenuItem.call(this, a, b), this.selected(!0)
                }
            }), vjs.OffTextTrackMenuItem.prototype.onClick = function() {
                vjs.TextTrackMenuItem.prototype.onClick.call(this), this.player_.showTextTrack(this.track.id_, this.track.kind())
            }, vjs.OffTextTrackMenuItem.prototype.update = function() {
                for (var a, b = this.player_.textTracks(), c = 0, d = b.length, e = !0; d > c; c++) a = b[c], a.kind() == this.track.kind() && 2 == a.mode() && (e = !1);
                this.selected(e ? !0 : !1)
            }, vjs.TextTrackButton = vjs.MenuButton.extend({
                init: function(a, b) {
                    vjs.MenuButton.call(this, a, b), this.items.length <= 1 && this.hide()
                }
            }), vjs.TextTrackButton.prototype.createItems = function() {
                var a, b = [];
                b.push(new vjs.OffTextTrackMenuItem(this.player_, {
                    kind: this.kind_
                }));
                for (var c = 0; c < this.player_.textTracks().length; c++) a = this.player_.textTracks()[c], a.kind() === this.kind_ && b.push(new vjs.TextTrackMenuItem(this.player_, {
                    track: a
                }));
                return b
            }, vjs.CaptionsButton = vjs.TextTrackButton.extend({
                init: function(a, b, c) {
                    vjs.TextTrackButton.call(this, a, b, c), this.el_.setAttribute("aria-label", "Captions Menu")
                }
            }), vjs.CaptionsButton.prototype.kind_ = "captions", vjs.CaptionsButton.prototype.buttonText = "Captions", vjs.CaptionsButton.prototype.className = "vjs-captions-button", vjs.SubtitlesButton = vjs.TextTrackButton.extend({
                init: function(a, b, c) {
                    vjs.TextTrackButton.call(this, a, b, c), this.el_.setAttribute("aria-label", "Subtitles Menu")
                }
            }), vjs.SubtitlesButton.prototype.kind_ = "subtitles", vjs.SubtitlesButton.prototype.buttonText = "Subtitles", vjs.SubtitlesButton.prototype.className = "vjs-subtitles-button", vjs.ChaptersButton = vjs.TextTrackButton.extend({
                init: function(a, b, c) {
                    vjs.TextTrackButton.call(this, a, b, c), this.el_.setAttribute("aria-label", "Chapters Menu")
                }
            }), vjs.ChaptersButton.prototype.kind_ = "chapters", vjs.ChaptersButton.prototype.buttonText = "Chapters", vjs.ChaptersButton.prototype.className = "vjs-chapters-button", vjs.ChaptersButton.prototype.createItems = function() {
                for (var a, b = [], c = 0; c < this.player_.textTracks().length; c++) a = this.player_.textTracks()[c], a.kind() === this.kind_ && b.push(new vjs.TextTrackMenuItem(this.player_, {
                    track: a
                }));
                return b
            }, vjs.ChaptersButton.prototype.createMenu = function() {
                for (var a, b, c = this.player_.textTracks(), d = 0, e = c.length, f = this.items = []; e > d; d++)
                    if (a = c[d], a.kind() == this.kind_ && a.dflt()) {
                        if (a.readyState() < 2) return this.chaptersTrack = a, void a.on("loaded", vjs.bind(this, this.createMenu));
                        b = a;
                        break
                    }
                var g = this.menu = new vjs.Menu(this.player_);
                if (g.el_.appendChild(vjs.createEl("li", {
                        className: "vjs-menu-title",
                        innerHTML: vjs.capitalize(this.kind_),
                        tabindex: -1
                    })), b) {
                    var h, i, j = b.cues_;
                    for (d = 0, e = j.length; e > d; d++) h = j[d], i = new vjs.ChaptersTrackMenuItem(this.player_, {
                        track: b,
                        cue: h
                    }), f.push(i), g.addChild(i)
                }
                return this.items.length > 0 && this.show(), g
            }, vjs.ChaptersTrackMenuItem = vjs.MenuItem.extend({
                init: function(a, b) {
                    var c = this.track = b.track,
                        d = this.cue = b.cue,
                        e = a.currentTime();
                    b.label = d.text, b.selected = d.startTime <= e && e < d.endTime, vjs.MenuItem.call(this, a, b), c.on("cuechange", vjs.bind(this, this.update))
                }
            }), vjs.ChaptersTrackMenuItem.prototype.onClick = function() {
                vjs.MenuItem.prototype.onClick.call(this), this.player_.currentTime(this.cue.startTime), this.update(this.cue.startTime)
            }, vjs.ChaptersTrackMenuItem.prototype.update = function() {
                var a = this.cue,
                    b = this.player_.currentTime();
                this.selected(a.startTime <= b && b < a.endTime ? !0 : !1)
            }, vjs.obj.merge(vjs.ControlBar.prototype.options_.children, {
                subtitlesButton: {},
                captionsButton: {},
                chaptersButton: {}
            }), vjs.JSON, "undefined" != typeof window.JSON && "function" == typeof window.JSON.parse) vjs.JSON = window.JSON;
        else {
            vjs.JSON = {};
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap, indent, meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                rep;
            vjs.JSON.stringify = function(a, b, c) {
                var d;
                if (gap = "", indent = "", "number" == typeof c)
                    for (d = 0; c > d; d += 1) indent += " ";
                else "string" == typeof c && (indent = c);
                if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length)) throw new Error("JSON.stringify");
                return str("", {
                    "": a
                })
            }, vjs.JSON.parse = function(text, reviver) {
                function walk(a, b) {
                    var c, d, e = a[b];
                    if (e && "object" == typeof e)
                        for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
                    return reviver.call(a, b, e)
                }
                var j;
                if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
                        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                    "": j
                }, "") : j;
                throw new SyntaxError("JSON.parse(): invalid or malformed JSON data")
            }
        }
        vjs.autoSetup = function(a) {
            var b, c, d = document.getElementsByTagName("video");
            if (d && d.length > 0)
                for (var e = 0, f = d.length; f > e; e++) {
                    if (b = d[e], !b || !b.getAttribute) {
                        vjs.autoSetupTimeout(1);
                        break
                    }
                    void 0 === b.player && (!b.getAttribute("data-setup") || a != b.id && "false" === b.getAttribute("auto-setup") || (c = videojs(b)))
                } else vjs.windowLoaded || vjs.autoSetupTimeout(1)
        }, vjs.autoSetupTimeout = function(a) {
            setTimeout(vjs.autoSetup, a)
        }, vjs.one(window, "load", function() {
            vjs.windowLoaded = !0
        }), vjs.autoSetupTimeout(1), vjs.plugin = function(a, b) {
            vjs.Player.prototype[a] = b
        }, module.exports = vjs
    }, {}]
}, {}, [68]);
window._V_ = projector_require('video');

window.BPlayer = projector_require('BPlayer');

try {
    BPlayer(bplayerAsset);
    delete bplayerAsset;
} catch (e) {
    BPlayer();
}