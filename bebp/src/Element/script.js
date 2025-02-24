var builder_settings_types_1 = (function(){
  var module = { exports: {} };
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function g(l, t) { for (var e in l)
    if (l.hasOwnProperty(e)) {
        var s = l[e];
        t(e, s);
    } }
var C = /** @class */ (function () {
    function C(t) {
        this.title = t.title, this.settings = t.settings, Object.assign(this, t.settings);
    }
    C.prototype.setOnChange = function (t) { this.onChange = t, g(this.settings, function (e, s) { s.setOnChange(t); }); };
    C.prototype.draw = function () {
        var t = document.createElement("div");
        t.className = "setting-group";
        var e = document.createElement("div");
        e.className = "setting-group-title";
        var s = document.createElement("h3");
        s.textContent = this.title;
        var n = document.createElement("span");
        n.className = "setting-group-arrow", n.innerHTML = "\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\">\n        <path d=\"M5 7.5L10 12.5L15 7.5\" stroke=\"#344054\" stroke-width=\"1.66667\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n      </svg>\n    ";
        var i = document.createElement("div");
        i.className = "setting-group-content";
        for (var a in this.settings) {
            var u = this.settings[a].draw();
            i.appendChild(u);
        }
        return e.onclick = function () { i.classList.toggle("collapsed"), n.classList.toggle("rotated"); }, e.appendChild(s), e.appendChild(n), t.appendChild(e), t.appendChild(i), t;
    };
    return C;
}());
function v(l) { switch (l) {
    case "number": return 0;
    case "text": return "";
    case "select": return null;
    case "color": return "#000000";
    case "date": return new Date().toISOString().split("T")[0];
} }
var m = /** @class */ (function () {
    function m(t) {
        if (t === void 0) { t = {}; }
        this.props = t, this.value = this.props.default, this.title = t.title || "", this.value = t.default;
    }
    m.prototype.setOnChange = function (t) { this.onChange = t; };
    m.prototype.createInput = function (t) {
        var _this = this;
        t = __assign(__assign({}, this.props.inputProps), t);
        var e = document.createElement("div");
        if (e.className = t.wrapperClassName || "", t.title || t.icon) {
            var i = document.createElement("div");
            if (i.className = "icon-container", t.icon) {
                var a = this.createIcon(t.icon, t.iconClassName);
                i.appendChild(a);
            }
            if (t.title) {
                var a = this.createLabel(t.title, t.labelClassName);
                i.appendChild(a);
            }
            e.appendChild(i);
        }
        var s = document.createElement("div");
        s.className = t.inputClassName || "";
        var n = document.createElement("input");
        return n.value = t.value || v(t.inputType), n.type = t.inputType, n.oninput = function (i) { var a = i.target; var c = a.value; t.inputType === "number" ? c = Number(a.value) : (t.inputType === "color" || t.inputType === "date") && (c = a.value), _this.value = c, _this.onChange && _this.onChange(_this.value); }, t.inputCustomizer && t.inputCustomizer(n), s.appendChild(n), e.appendChild(s), e;
    };
    m.prototype.createLabel = function (t, e) { var s = document.createElement("span"); return s.textContent = t, s.className = "input-label " + (e || ""), s; };
    m.prototype.createIcon = function (t, e) { var s = document.createElement("span"); return s.className = "input-icon " + (e || ""), s.innerHTML = t, s; };
    return m;
}());
var h = /** @class */ (function (_super) {
    __extends(h, _super);
    function h(t) {
        if (t === void 0) { t = {}; }
        var _this = this;
        _this = _super.call(this, t) || this, _this.inputType = "number";
        return _this;
    }
    h.prototype.draw = function () {
        var _this = this;
        var t = function (e) { _this.props.minValue !== void 0 && (e.min = String(_this.props.minValue)), _this.props.maxValue !== void 0 && (e.max = String(_this.props.maxValue)), _this.props.className && e.classList.add(_this.props.className), e.addEventListener("input", function () { var _a, _b; var s = (_a = _this.props.minValue) !== null && _a !== void 0 ? _a : Number.MIN_SAFE_INTEGER, n = (_b = _this.props.maxValue) !== null && _b !== void 0 ? _b : Number.MAX_SAFE_INTEGER; var i = Number(e.value); i < s && (i = s), i > n && (i = n), e.value = String(i); }); };
        return this.createInput({ value: this.value, inputType: this.inputType, title: this.props.title, icon: this.props.icon, inputClassName: "number-setting-input " + this.props.inputClassName, wrapperClassName: "number-setting-wrapper " + this.props.wrapperClassName, inputCustomizer: t });
    };
    return h;
}(m));
var w = /** @class */ (function (_super) {
    __extends(w, _super);
    function w() {
        return _super.call(this, { title: "Margin", settings: { margin: new h({ title: "Margin All" }), marginTop: new h({ title: "Margin Top" }), marginRight: new h({ title: "Margin Right" }), marginBottom: new h({ title: "Margin Bottom" }), marginLeft: new h({ title: "Margin Left" }) } }) || this;
    }
    w.prototype.getCssCode = function () {
        return "\n\t\tmargin-botton: ".concat(this.settings.marginBottom.value, "px;\n\t\tmargin-top: ").concat(this.settings.marginTop.value, "px;\n\t\tmargin-right: ").concat(this.settings.marginRight.value, "px;\n\t\tmargin-left: ").concat(this.settings.marginLeft.value, "px;\n\t\t");
    };
    return w;
}(C));
var N = /** @class */ (function (_super) {
    __extends(N, _super);
    function N(t) {
        var _this = this;
        _this = _super.call(this, t) || this, _this.inputType = "color", _this.icon = "<svg xmlns='http://www.w3.org/2000/svg' width='18' height='19' viewBox='0 0 18 19' fill='none'><path d='M8.99999 15.8542C9.79613 16.5667 10.8475 17 12 17C14.4853 17 16.5 14.9853 16.5 12.5C16.5 10.4248 15.0953 8.67769 13.1849 8.15763M4.81513 8.15762C2.9047 8.67768 1.5 10.4248 1.5 12.5C1.5 14.9853 3.51472 17 6 17C8.48528 17 10.5 14.9853 10.5 12.5C10.5 11.9146 10.3882 11.3554 10.1849 10.8424M13.5 6.5C13.5 8.98528 11.4853 11 9 11C6.51472 11 4.5 8.98528 4.5 6.5C4.5 4.01472 6.51472 2 9 2C11.4853 2 13.5 4.01472 13.5 6.5Z' stroke='#667085' stroke-linecap='round' stroke-linejoin='round'/></svg>";
        return _this;
    }
    N.prototype.draw = function () {
        var _this = this;
        var t = document.createElement("div");
        t.className = "color-setting-wrapper";
        var e = document.createElement("div");
        e.className = "icon-container";
        var s = this.createIcon(this.icon), n = this.createLabel("Color");
        n.className = "color-text", e.appendChild(s), e.appendChild(n);
        var i = document.createElement("div");
        i.className = "color-input-wrapper";
        var a, c;
        a = this.createInput({ value: this.value, inputType: "text", inputClassName: "color-text-input", inputCustomizer: function (p) { p.oninput = function (r) { var d; var o = r.target.value; _this.value = o, (d = _this.onChange) == null || d.call(_this, o), u.style.backgroundColor = o; }; } }), c = this.createInput({ value: this.value, inputType: this.inputType, inputClassName: "color-picker", inputCustomizer: function (p) { p.oninput = function (r) { var d; var o = r.target.value; _this.value = o, (d = _this.onChange) == null || d.call(_this, o), u.style.backgroundColor = o; }; } });
        var u = document.createElement("div");
        return u.className = "color-preview", u.style.backgroundColor = this.value || "", c.oninput = function (p) { var o; var r = p.target.value; _this.value = r, (o = _this.onChange) == null || o.call(_this, r), u.style.backgroundColor = r; }, a.oninput = function (p) { var o; var r = p.target.value; _this.value = r, (o = _this.onChange) == null || o.call(_this, r), u.style.backgroundColor = r; }, i.appendChild(u), i.appendChild(a), i.appendChild(c), t.appendChild(e), t.appendChild(i), t;
    };
    return N;
}(m));
var f = /** @class */ (function (_super) {
    __extends(f, _super);
    function f(t) {
        if (t === void 0) { t = {}; }
        var _this = this;
        _this = _super.call(this, t) || this, _this.inputType = "text";
        return _this;
    }
    f.prototype.draw = function () { return this.createInput({ value: this.value, inputType: this.inputType }); };
    return f;
}(m));
var y = /** @class */ (function (_super) {
    __extends(y, _super);
    function y(t) {
        var _this = this;
        _this = _super.call(this, __assign(__assign({}, t), { minValue: 0, maxValue: 100, icon: x, title: t.title || "Opacity", inputClassName: "number-setting-input", wrapperClassName: "opacity-setting-wrapper" })) || this, _this.inputType = "number";
        return _this;
    }
    return y;
}(h));
var x = "\n\t\t\t<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"19\" viewBox=\"0 0 18 19\" fill=\"none\">\n\t\t\t\t<path d=\"M3.69749 15.365C3.54749 15.365 3.40502 15.305 3.30002 15.2C1.77752 13.6775 0.9375 11.6525 0.9375 9.5C0.9375 5.0525 4.5525 1.4375 9 1.4375C11.1525 1.4375 13.1775 2.2775 14.7 3.8C14.805 3.905 14.865 4.0475 14.865 4.1975C14.865 4.3475 14.805 4.49 14.7 4.595L4.09502 15.2C3.99002 15.305 3.84749 15.365 3.69749 15.365ZM9 2.5625C5.175 2.5625 2.0625 5.675 2.0625 9.5C2.0625 11.165 2.64751 12.74 3.71251 13.9925L13.4925 4.2125C12.24 3.1475 10.665 2.5625 9 2.5625Z\" fill=\"#667085\"/>\n\t\t\t\t<path d=\"M9.00026 17.5623C6.84776 17.5623 4.82278 16.7223 3.30028 15.1998C3.19528 15.0948 3.13525 14.9523 3.13525 14.8023C3.13525 14.6523 3.19528 14.5098 3.30028 14.4048L13.9052 3.79984C14.1227 3.58234 14.4827 3.58234 14.7002 3.79984C16.2227 5.32234 17.0628 7.34734 17.0628 9.49984C17.0628 13.9473 13.4478 17.5623 9.00026 17.5623ZM4.50777 14.7873C5.76027 15.8523 7.33526 16.4373 9.00026 16.4373C12.8253 16.4373 15.9378 13.3248 15.9378 9.49984C15.9378 7.83484 15.3527 6.25984 14.2878 5.00734L4.50777 14.7873Z\" fill=\"#667085\"/>\n\t\t\t</svg>\n\t\t";
var b = /** @class */ (function (_super) {
    __extends(b, _super);
    function b(t) {
        if (t === void 0) { t = {}; }
        var _this = this;
        _this = _super.call(this, t) || this, _this.inputType = "select";
        return _this;
    }
    b.prototype.draw = function () {
        var _this = this;
        var t = document.createElement("div");
        if (t.classList.add("custom-select-container"), this.props.title) {
            var n = document.createElement("label");
            n.textContent = this.props.title, n.classList.add("custom-select-title"), t.appendChild(n);
        }
        if (this.props.icon) {
            var n = document.createElement("span");
            n.innerHTML = this.props.icon, n.classList.add("custom-select-icon"), t.appendChild(n);
        }
        var e = document.createElement("select");
        e.classList.add("custom-select"), e.onchange = function (n) { var i; (i = _this.onChange) == null || i.call(_this, n.target.value); };
        var s = [];
        return this.props.getOptions && (s = this.props.getOptions()), this.props.options && s.push.apply(s, this.props.options), s.forEach(function (_a) {
            var n = _a.value, i = _a.name;
            var a = document.createElement("option");
            a.value = n, a.textContent = i, e.appendChild(a);
        }), this.props.value && (e.value = this.props.value), t.appendChild(e), t;
    };
    return b;
}(m));
exports.ColorSetting = N;
exports.MarginSettingGroup = w;
exports.NumberSetting = h;
exports.OpacitySetting = y;
exports.SelectSetting = b;
exports.Setting = m;
exports.SettingGroup = C;
exports.StringSetting = f;
exports.iterateSettings = g;

  return module.exports;
})();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const onaim_endpoints_1 = {};
onaim_endpoints_1.balancesList = {"endpoint":"/HubApi/Hub/PlayerBalances","requestMethod":"GET","schemaType":{},"endpointType":"RT","schema":"{\"$schema\":\"http://json-schema.org/draft-07/schema#\",\"definitions\":{\"Balance\":{\"properties\":{\"amount\":{\"type\":\"number\"},\"coin\":{\"type\":\"string\"},\"id\":{\"type\":\"number\"},\"promotionId\":{\"type\":\"number\"}},\"type\":\"object\"}},\"properties\":{\"balances\":{\"items\":{\"$ref\":\"#/definitions/Balance\"},\"type\":\"array\"},\"playerId\":{\"type\":\"number\"}},\"type\":\"object\"}"};
onaim_endpoints_1.generateDummyData = undefined;
onaim_endpoints_1.leaderboardProgress = {"endpoint":"/api/v1/LeaderboardProgress/GetLeaderboardProgress","requestMethod":"GET","schemaType":{},"endpointType":"RT","schema":"{\"$schema\":\"http://json-schema.org/draft-07/schema#\",\"definitions\":{\"LeaderBoardProgressDataI\":{\"properties\":{\"amount\":{\"type\":\"number\"},\"coinId\":{\"type\":\"string\"},\"leaderboardRecordId\":{\"type\":\"number\"},\"placement\":{\"type\":\"number\"},\"playerId\":{\"type\":\"number\"},\"playerUsername\":{\"type\":\"string\"},\"prizeAmount\":{\"type\":\"number\"}},\"type\":\"object\"}},\"properties\":{\"data\":{\"items\":{\"$ref\":\"#/definitions/LeaderBoardProgressDataI\"},\"type\":\"array\"},\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"succeeded\":{\"type\":\"boolean\"},\"validationErrors\":{\"additionalProperties\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"type\":\"object\"}},\"type\":\"object\"}"};
onaim_endpoints_1.promotion = {"endpoint":"/api/Builder/GetPromotionForBuilder","requestMethod":"GET","schemaType":{},"endpointType":"DT","schema":"{\"$schema\":\"http://json-schema.org/draft-07/schema#\",\"definitions\":{\"ApiErrorI\":{\"properties\":{\"code\":{\"type\":\"number\"},\"message\":{\"type\":\"string\"}},\"type\":\"object\"},\"GameI\":{\"properties\":{\"name\":{\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"type\":\"object\"},\"LeaderboardI\":{\"properties\":{\"announcementDate\":{\"type\":\"string\"},\"creationDate\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"endDate\":{\"type\":\"string\"},\"eventType\":{\"type\":\"number\"},\"id\":{\"type\":\"number\"},\"isGenerated\":{\"type\":\"boolean\"},\"prizes\":{\"items\":{\"$ref\":\"#/definitions/PrizeI\"},\"type\":\"array\"},\"startDate\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"},\"PrizeI\":{\"properties\":{\"amount\":{\"type\":\"number\"},\"coinId\":{\"type\":\"string\"},\"endRank\":{\"type\":\"number\"},\"id\":{\"type\":\"number\"},\"startRank\":{\"type\":\"number\"}},\"type\":\"object\"},\"PromotionCoinI\":{\"properties\":{\"coinType\":{\"type\":\"number\"},\"description\":{\"type\":\"string\"},\"id\":{\"type\":\"string\"},\"imageUrl\":{\"type\":\"string\"},\"isDeleted\":{\"type\":\"boolean\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"PromotionDataI\":{\"properties\":{\"createDate\":{\"type\":\"string\"},\"description\":{\"type\":\"string\"},\"endDate\":{\"type\":\"string\"},\"games\":{\"items\":{\"$ref\":\"#/definitions/GameI\"},\"type\":\"array\"},\"id\":{\"type\":\"number\"},\"leaderboards\":{\"items\":{\"$ref\":\"#/definitions/LeaderboardI\"},\"type\":\"array\"},\"promotionCoins\":{\"items\":{\"$ref\":\"#/definitions/PromotionCoinI\"},\"type\":\"array\"},\"segments\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"startDate\":{\"type\":\"string\"},\"status\":{\"type\":\"number\"},\"title\":{\"type\":\"string\"}},\"type\":\"object\"}},\"properties\":{\"data\":{\"$ref\":\"#/definitions/PromotionDataI\"},\"errors\":{\"items\":{\"$ref\":\"#/definitions/ApiErrorI\"},\"type\":\"array\"},\"success\":{\"type\":\"boolean\"}},\"type\":\"object\"}"};

async function oa_fetchLeaderboard() {
    const progressResponse = await window.fetchEndpoint(onaim_endpoints_1.leaderboardProgress, { query: { LeaderboardRecordId: parseInt(`{{sourceId}}`) } });
    const leaderboardHeader = document.getElementById("leadebroard_header");
    if (leaderboardHeader) {
        leaderboardHeader.innerText = progressResponse.data[0].playerUsername;
    }
}
oa_fetchLeaderboard();
