(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/artifacts/neoproxy/src/app/components/IntroToggle.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "introToggle": "IntroToggle-module__mjFa7q__introToggle",
  "toggleInput": "IntroToggle-module__mjFa7q__toggleInput",
  "toggleLabel": "IntroToggle-module__mjFa7q__toggleLabel",
  "toggleSlider": "IntroToggle-module__mjFa7q__toggleSlider",
  "toggleText": "IntroToggle-module__mjFa7q__toggleText",
});
}),
"[project]/artifacts/neoproxy/src/app/components/IntroToggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IntroToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$IntroToggle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/artifacts/neoproxy/src/app/components/IntroToggle.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function IntroToggle() {
    _s();
    const [isEnabled, setIsEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "IntroToggle.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                return localStorage.getItem('neoproxy_skip_intro') !== 'true';
            }
            //TURBOPACK unreachable
            ;
        }
    }["IntroToggle.useState"]);
    const toggleIntro = ()=>{
        const newState = !isEnabled;
        setIsEnabled(newState);
        if ("TURBOPACK compile-time truthy", 1) {
            if (newState) {
                localStorage.removeItem('neoproxy_skip_intro');
                localStorage.removeItem('neoproxy_intro_seen');
            } else {
                localStorage.setItem('neoproxy_skip_intro', 'true');
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$IntroToggle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].introToggle,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$IntroToggle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggleLabel,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: isEnabled,
                    onChange: toggleIntro,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$IntroToggle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggleInput
                }, void 0, false, {
                    fileName: "[project]/artifacts/neoproxy/src/app/components/IntroToggle.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$IntroToggle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggleSlider
                }, void 0, false, {
                    fileName: "[project]/artifacts/neoproxy/src/app/components/IntroToggle.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$IntroToggle$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].toggleText,
                    children: isEnabled ? '🎬 Intro Enabled' : '⏭️ Intro Disabled'
                }, void 0, false, {
                    fileName: "[project]/artifacts/neoproxy/src/app/components/IntroToggle.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/artifacts/neoproxy/src/app/components/IntroToggle.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/artifacts/neoproxy/src/app/components/IntroToggle.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(IntroToggle, "bndSpm7gdlxNTm4aJjLq3dnpDgo=");
_c = IntroToggle;
var _c;
__turbopack_context__.k.register(_c, "IntroToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/artifacts/neoproxy/src/app/page.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "page-module__fEj-uq__active",
  "aiButton": "page-module__fEj-uq__aiButton",
  "aiInput": "page-module__fEj-uq__aiInput",
  "aiPanel": "page-module__fEj-uq__aiPanel",
  "awakening": "page-module__fEj-uq__awakening",
  "blink": "page-module__fEj-uq__blink",
  "canvas": "page-module__fEj-uq__canvas",
  "commandInput": "page-module__fEj-uq__commandInput",
  "dataTicker": "page-module__fEj-uq__dataTicker",
  "dataTickerInner": "page-module__fEj-uq__dataTickerInner",
  "footerStatus": "page-module__fEj-uq__footerStatus",
  "hovered": "page-module__fEj-uq__hovered",
  "inputCursor": "page-module__fEj-uq__inputCursor",
  "mainContent": "page-module__fEj-uq__mainContent",
  "menuLabel": "page-module__fEj-uq__menuLabel",
  "menuLabelDesc": "page-module__fEj-uq__menuLabelDesc",
  "menuLabelPulse": "page-module__fEj-uq__menuLabelPulse",
  "menuLabelTitle": "page-module__fEj-uq__menuLabelTitle",
  "metatronAwakenButton": "page-module__fEj-uq__metatronAwakenButton",
  "metatronDisplay": "page-module__fEj-uq__metatronDisplay",
  "metatronDormant": "page-module__fEj-uq__metatronDormant",
  "metatronFadeIn": "page-module__fEj-uq__metatronFadeIn",
  "metatronFadeOut": "page-module__fEj-uq__metatronFadeOut",
  "metatronFooter": "page-module__fEj-uq__metatronFooter",
  "metatronHeader": "page-module__fEj-uq__metatronHeader",
  "metatronInput": "page-module__fEj-uq__metatronInput",
  "metatronMode": "page-module__fEj-uq__metatronMode",
  "metatronOverlay": "page-module__fEj-uq__metatronOverlay",
  "metatronSleepButton": "page-module__fEj-uq__metatronSleepButton",
  "metatronStatus": "page-module__fEj-uq__metatronStatus",
  "metatronText": "page-module__fEj-uq__metatronText",
  "metatronTitle": "page-module__fEj-uq__metatronTitle",
  "navLink": "page-module__fEj-uq__navLink",
  "navTop": "page-module__fEj-uq__navTop",
  "node": "page-module__fEj-uq__node",
  "nodeDesc": "page-module__fEj-uq__nodeDesc",
  "nodeGrid": "page-module__fEj-uq__nodeGrid",
  "nodePulse": "page-module__fEj-uq__nodePulse",
  "nodeTitle": "page-module__fEj-uq__nodeTitle",
  "noiseOverlay": "page-module__fEj-uq__noiseOverlay",
  "portalButton": "page-module__fEj-uq__portalButton",
  "portalSection": "page-module__fEj-uq__portalSection",
  "prompt": "page-module__fEj-uq__prompt",
  "proxy": "page-module__fEj-uq__proxy",
  "root": "page-module__fEj-uq__root",
  "scanlines": "page-module__fEj-uq__scanlines",
  "sleeping": "page-module__fEj-uq__sleeping",
  "speaking": "page-module__fEj-uq__speaking",
  "statusBar": "page-module__fEj-uq__statusBar",
  "statusBarCursor": "page-module__fEj-uq__statusBarCursor",
  "subtitle": "page-module__fEj-uq__subtitle",
  "systemBlock": "page-module__fEj-uq__systemBlock",
  "systemMessage": "page-module__fEj-uq__systemMessage",
  "ticker": "page-module__fEj-uq__ticker",
  "title": "page-module__fEj-uq__title",
  "typingCursor": "page-module__fEj-uq__typingCursor",
  "ui": "page-module__fEj-uq__ui",
  "vignette": "page-module__fEj-uq__vignette",
});
}),
"[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NeoProxyClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/babylonjs@8.55.1/node_modules/babylonjs/babylon.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$IntroToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/artifacts/neoproxy/src/app/components/IntroToggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/artifacts/neoproxy/src/app/page.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function NeoProxyClient() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [systemMode, setSystemMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('IDLE');
    const modeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(systemMode);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('INITIALIZING');
    const [layer, setLayer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('CONSOLE');
    const [glitchActive, setGlitchActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [aiPrompt, setAiPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [aiDesign, setAiDesign] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0, 0),
        scale: 1.0,
        speed: 0.005
    });
    const applyAiDesign = ()=>{
        const prompt = aiPrompt.toLowerCase();
        let color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0, 0) // Default rojo
        ;
        let scale = 1.0;
        let speed = 0.005;
        if (prompt.includes('red')) color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0, 0);
        if (prompt.includes('blue')) color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](0, 0, 1);
        if (prompt.includes('green')) color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](0, 1, 0);
        if (prompt.includes('yellow')) color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 1, 0);
        if (prompt.includes('purple')) color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](0.5, 0, 0.5);
        if (prompt.includes('orange')) color = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0.5, 0);
        if (prompt.includes('big') || prompt.includes('large')) scale = 1.5;
        if (prompt.includes('small')) scale = 0.5;
        if (prompt.includes('fast')) speed = 0.02;
        if (prompt.includes('slow')) speed = 0.002;
        setAiDesign({
            color,
            scale,
            speed
        });
    };
    // Sync mode to ref for Babylon loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NeoProxyClient.useEffect": ()=>{
            modeRef.current = systemMode;
        }
    }["NeoProxyClient.useEffect"], [
        systemMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NeoProxyClient.useEffect": ()=>{
            if (!canvasRef.current) return;
            // Remove legacy HTML menu labels from prior renders
            document.querySelectorAll(`.${__TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].menuLabel}`).forEach({
                "NeoProxyClient.useEffect": (el)=>el.remove()
            }["NeoProxyClient.useEffect"]);
            // ENGINE
            let engine;
            try {
                engine = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Engine"](canvasRef.current, true, {
                    preserveDrawingBuffer: true,
                    stencil: true
                });
            } catch (e) {
                console.warn('WebGL not supported, skipping 3D engine');
                return;
            }
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"](engine);
            scene.clearColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color4"](0, 0, 0, 1);
            // CAMERA
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArcRotateCamera"]('cam', Math.PI / 4, Math.PI / 3, 10, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"].Zero(), scene);
            camera.attachControl(canvasRef.current, true);
            camera.lowerRadiusLimit = 8;
            camera.upperRadiusLimit = 12;
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HemisphericLight"]('light', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0), scene);
            // =============================
            // HEXACOSICORON (600-cell)
            // =============================
            const φ = (1 + Math.sqrt(5)) / 2;
            const invφ = 1 / φ;
            const signs = [
                -1,
                1
            ];
            const vertices4D = [];
            // Hypercube
            for (const x of signs)for (const y of signs)for (const z of signs)for (const w of signs)vertices4D.push([
                x,
                y,
                z,
                w
            ]);
            // Axes
            const axes = [
                [
                    2,
                    0,
                    0,
                    0
                ],
                [
                    0,
                    2,
                    0,
                    0
                ],
                [
                    0,
                    0,
                    2,
                    0
                ],
                [
                    0,
                    0,
                    0,
                    2
                ]
            ];
            axes.forEach({
                "NeoProxyClient.useEffect": (a)=>{
                    vertices4D.push(a);
                    vertices4D.push([
                        -a[0],
                        -a[1],
                        -a[2],
                        -a[3]
                    ]);
                }
            }["NeoProxyClient.useEffect"]);
            // Golden permutations
            const base = [
                0,
                1,
                φ,
                invφ
            ];
            function permute(arr) {
                if (arr.length === 1) return [
                    arr
                ];
                const res = [];
                for(let i = 0; i < arr.length; i++){
                    const rest = [
                        ...arr.slice(0, i),
                        ...arr.slice(i + 1)
                    ];
                    for (const p of permute(rest))res.push([
                        arr[i],
                        ...p
                    ]);
                }
                return res;
            }
            const perms = permute(base);
            for (const p of perms)for (const s1 of signs)for (const s2 of signs)for (const s3 of signs)vertices4D.push([
                p[0],
                s1 * p[1],
                s2 * p[2],
                s3 * p[3]
            ]);
            // Deduplicate
            const uniq = new Map();
            vertices4D.forEach({
                "NeoProxyClient.useEffect": (v)=>uniq.set(v.map({
                        "NeoProxyClient.useEffect": (n)=>n.toFixed(5)
                    }["NeoProxyClient.useEffect"]).join(','), v)
            }["NeoProxyClient.useEffect"]);
            const V = Array.from(uniq.values());
            // Edges
            const edges = [];
            const eps = 0.001;
            function dist4(a, b) {
                return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]);
            }
            const d0 = dist4(V[0], V[1]);
            for(let i = 0; i < V.length; i++){
                for(let j = i + 1; j < V.length; j++){
                    if (Math.abs(dist4(V[i], V[j]) - d0) < eps) {
                        edges.push([
                            i,
                            j
                        ]);
                    }
                }
            }
            // 4D rotation
            let rotXW = 0;
            let rotYW = 0;
            function rotate4D(v) {
                let [x, y, z, w] = v;
                const cx = Math.cos(rotXW);
                const sx = Math.sin(rotXW);
                const cy = Math.cos(rotYW);
                const sy = Math.sin(rotYW);
                const x1 = x * cx - w * sx;
                const w1 = x * sx + w * cx;
                const y1 = y * cy - w1 * sy;
                const w2 = y * sy + w1 * cy;
                return [
                    x1,
                    y1,
                    z,
                    w2
                ];
            }
            function project(v) {
                const d = 4;
                const s = d / (d - v[3]);
                return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](v[0] * s, v[1] * s, v[2] * s);
            }
            // CORE 4D GEOMETRY - OPTIMIZED
            const coreColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0, 0) // #FF0000 - Rojo
            ;
            const accentColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0.2, 0.2) // #CC3333 - Rojo más claro
            ;
            // 1. Optimized Points (Vertices)
            const sphereBox = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBuilder"].CreateSphere('p', {
                diameter: 0.04
            }, scene);
            const pMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardMaterial"]('pm', scene);
            pMat.emissiveColor = coreColor;
            pMat.alpha = 0.8;
            sphereBox.material = pMat;
            sphereBox.isVisible = false;
            const behaviors = {
                IDLE: {
                    speed: 0.005,
                    scale: 1.0,
                    alpha: 0.5,
                    color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0, 0)
                },
                SYSTEMS: {
                    speed: 0.02,
                    scale: 1.3,
                    alpha: 0.8,
                    color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](0.8, 0, 0)
                },
                FABRICATION: {
                    speed: 0.01,
                    scale: 0.8,
                    alpha: 0.9,
                    color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0.2, 0)
                },
                MEMORY: {
                    speed: 0.008,
                    scale: 1.6,
                    alpha: 0.3,
                    color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](0.6, 0, 0)
                },
                'R&D': {
                    speed: 0.015,
                    scale: 1.1,
                    alpha: 0.7,
                    color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0.4, 0.4)
                },
                AI: {
                    speed: 0.01,
                    scale: 1.2,
                    alpha: 0.9,
                    color: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](0.8, 0.2, 0.2)
                }
            };
            const pointInstances = [];
            V.forEach({
                "NeoProxyClient.useEffect": (_, i)=>{
                    const inst = sphereBox.createInstance('v' + i);
                    pointInstances.push(inst);
                }
            }["NeoProxyClient.useEffect"]);
            // 2. Optimized Edges using LineSystem (Single Draw Call)
            let edgeSystem = null;
            // =============================
            // INTEGRATED MENU SYSTEM - PART OF 600-CELL
            // =============================
            const menuNodes = [
                {
                    vertexIndex: 0,
                    mode: 'SYSTEMS',
                    label: 'SYSTEMS',
                    description: 'Architecture · Interfaces · Engineering'
                },
                {
                    vertexIndex: 8,
                    mode: 'FABRICATION',
                    label: 'FABRICATION',
                    description: '3D Print · Resina · Objetos Físicos'
                },
                {
                    vertexIndex: 16,
                    mode: 'MEMORY',
                    label: 'MEMORY',
                    description: 'Proceso · Diario · Conversaciones IA'
                },
                {
                    vertexIndex: 24,
                    mode: 'R&D',
                    label: 'R&D',
                    description: 'Generative Lab · Experimentos · STL'
                },
                {
                    vertexIndex: 32,
                    mode: 'AI',
                    label: 'AI DESIGN',
                    description: 'Agente Inteligente · Diseño Polítopo'
                },
                {
                    vertexIndex: 40,
                    mode: 'IDLE',
                    label: 'CORE',
                    description: 'NeoProxy OS · Central Hub'
                }
            ];
            // Menu node meshes (now fully inside the 600-cell geometry)
            const menuSpheres = [];
            menuNodes.forEach({
                "NeoProxyClient.useEffect": (node, index)=>{
                    // Create larger sphere for menu nodes
                    const sphere = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBuilder"].CreateSphere(`menuNode_${index}`, {
                        diameter: 0.15
                    }, scene);
                    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StandardMaterial"](`menuMat_${index}`, scene);
                    mat.emissiveColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0.5, 0); // Orange highlight for menu nodes
                    mat.alpha = 0.9;
                    sphere.material = mat;
                    sphere.isPickable = true;
                    sphere.actionManager = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionManager"](scene);
                    // Click / tap interaction
                    sphere.actionManager.registerAction(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExecuteCodeAction"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionManager"].OnPickTrigger, {
                        "NeoProxyClient.useEffect": ()=>{
                            setSystemMode(node.mode);
                        }
                    }["NeoProxyClient.useEffect"]));
                    // Hover highlight
                    sphere.actionManager.registerAction(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExecuteCodeAction"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionManager"].OnPointerOverTrigger, {
                        "NeoProxyClient.useEffect": ()=>{
                            mat.emissiveColor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"].Lerp(mat.emissiveColor, new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 1, 0.4), 0.4);
                        }
                    }["NeoProxyClient.useEffect"]));
                    sphere.actionManager.registerAction(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExecuteCodeAction"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ActionManager"].OnPointerOutTrigger, {
                        "NeoProxyClient.useEffect": ()=>{
                            mat.emissiveColor = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0.5, 0);
                        }
                    }["NeoProxyClient.useEffect"]));
                    menuSpheres.push(sphere);
                }
            }["NeoProxyClient.useEffect"]);
            // Interaction state
            let targetRotXW = 0;
            let targetRotYW = 0;
            let smoothRotXW = 0;
            let smoothRotYW = 0;
            let autoRot = 0;
            const handleMouseMove = {
                "NeoProxyClient.useEffect.handleMouseMove": (e)=>{
                    const x = e.clientX / window.innerWidth * 2 - 1;
                    const y = e.clientY / window.innerHeight * 2 - 1;
                    targetRotXW = x * 2;
                    targetRotYW = y * 2;
                }
            }["NeoProxyClient.useEffect.handleMouseMove"];
            window.addEventListener('mousemove', handleMouseMove);
            // Loop
            engine.runRenderLoop({
                "NeoProxyClient.useEffect": ()=>{
                    const mode = modeRef.current;
                    const config = mode === 'AI' ? {
                        speed: aiDesign.speed,
                        scale: aiDesign.scale,
                        alpha: 0.9,
                        color: aiDesign.color
                    } : behaviors[mode];
                    // Update Visuals based on Mode
                    pMat.emissiveColor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"].Lerp(pMat.emissiveColor, config.color, 0.05);
                    const targetScaling = config.scale;
                    sphereBox.scaling.x += (targetScaling - sphereBox.scaling.x) * 0.05;
                    sphereBox.scaling.y += (targetScaling - sphereBox.scaling.y) * 0.05;
                    sphereBox.scaling.z += (targetScaling - sphereBox.scaling.z) * 0.05;
                    autoRot += config.speed;
                    smoothRotXW += (targetRotXW - smoothRotXW) * 0.05;
                    smoothRotYW += (targetRotYW - smoothRotYW) * 0.05;
                    // Combine interactive rotation with auto-rotation
                    rotXW = smoothRotXW + autoRot;
                    rotYW = smoothRotYW + autoRot * 0.5;
                    const rotated = V.map(rotate4D);
                    const projected = rotated.map(project);
                    // Update Points
                    projected.forEach({
                        "NeoProxyClient.useEffect": (p, i)=>{
                            pointInstances[i].position.copyFrom(p);
                        }
                    }["NeoProxyClient.useEffect"]);
                    // Update Menu Nodes - Position them at specific 600-cell vertices
                    menuNodes.forEach({
                        "NeoProxyClient.useEffect": (node, index)=>{
                            if (node.vertexIndex < projected.length) {
                                const pos = projected[node.vertexIndex];
                                const sphere = menuSpheres[index];
                                sphere.position.copyFrom(pos);
                                // Highlight active mode
                                const isActive = mode === node.mode;
                                const mat = sphere.material;
                                const targetColor = isActive ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 1, 0) : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"](1, 0.5, 0);
                                mat.emissiveColor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"].Lerp(mat.emissiveColor, targetColor, 0.1);
                                sphere.scaling.setAll(isActive ? 1.5 : 1.0);
                            }
                        }
                    }["NeoProxyClient.useEffect"]);
                    // Update Edges (LineSystem)
                    const segments = edges.map({
                        "NeoProxyClient.useEffect.segments": ([i, j])=>[
                                projected[i],
                                projected[j]
                            ]
                    }["NeoProxyClient.useEffect.segments"]);
                    if (!edgeSystem) {
                        edgeSystem = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBuilder"].CreateLineSystem('edges', {
                            lines: segments,
                            updatable: true
                        }, scene);
                        edgeSystem.color = config.color;
                        edgeSystem.alpha = config.alpha;
                    } else {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBuilder"].CreateLineSystem('edges', {
                            lines: segments,
                            instance: edgeSystem
                        });
                        edgeSystem.color = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$babylonjs$40$8$2e$55$2e$1$2f$node_modules$2f$babylonjs$2f$babylon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color3"].Lerp(edgeSystem.color, config.color, 0.05);
                        edgeSystem.alpha += (config.alpha - edgeSystem.alpha) * 0.05;
                    }
                    scene.render();
                }
            }["NeoProxyClient.useEffect"]);
            window.addEventListener('resize', {
                "NeoProxyClient.useEffect": ()=>engine.resize()
            }["NeoProxyClient.useEffect"]);
            return ({
                "NeoProxyClient.useEffect": ()=>{
                    window.removeEventListener('mousemove', handleMouseMove);
                    engine.dispose();
                }
            })["NeoProxyClient.useEffect"];
        }
    }["NeoProxyClient.useEffect"], []);
    // System state reactions
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NeoProxyClient.useEffect": ()=>{
            setStatus('ONLINE');
            setLayer('INTERFACE_SYSTEM');
            // React to mode changes
            if (systemMode !== 'IDLE') {
                setGlitchActive(true);
                setTimeout({
                    "NeoProxyClient.useEffect": ()=>setGlitchActive(false)
                }["NeoProxyClient.useEffect"], 300);
            }
        }
    }["NeoProxyClient.useEffect"], [
        systemMode
    ]);
    const dataStream = '0x7F 0xE2 CORE_SYNC ENTANGLED_TESSERACT NODE_01 NODE_02 NODE_03 PROXY_ACTIVE MEMORY_BUFFER 0x00 0xFF GEOMETRY_4D FABRICATION_QUEUE SYSTEMS_OK '.repeat(4);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$components$2f$IntroToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                lineNumber: 367,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container} ${glitchActive ? __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].glitch : ''}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                        ref: canvasRef,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].canvas
                    }, void 0, false, {
                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                        lineNumber: 369,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].vignette
                    }, void 0, false, {
                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                        lineNumber: 370,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].noiseOverlay
                    }, void 0, false, {
                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                        lineNumber: 371,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].scanlines
                    }, void 0, false, {
                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                        lineNumber: 372,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ui,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBar,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBarCursor,
                                        children: [
                                            "NEOPROXY // CORE: ",
                                            systemMode
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                        lineNumber: 376,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "STATUS: ",
                                            status
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                        lineNumber: 377,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                lineNumber: 375,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                        children: [
                                            "NEO",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].proxy,
                                                children: "PROXY"
                                            }, void 0, false, {
                                                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                                lineNumber: 382,
                                                columnNumber: 43
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                        lineNumber: 382,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                                        children: "creative operating system"
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                        lineNumber: 383,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].systemBlock,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    "LAYER: ",
                                                    layer
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                                lineNumber: 387,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    "MODE: ",
                                                    systemMode
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                                lineNumber: 388,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: "OPERATOR: darkproxy"
                                            }, void 0, false, {
                                                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                                lineNumber: 389,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                        lineNumber: 386,
                                        columnNumber: 11
                                    }, this),
                                    systemMode === 'AI' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].aiPanel,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Agente de Diseño IA"
                                            }, void 0, false, {
                                                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                                lineNumber: 395,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: aiPrompt,
                                                onChange: (e)=>setAiPrompt(e.target.value),
                                                placeholder: "Describe el diseño (ej: red big fast)",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].aiInput
                                            }, void 0, false, {
                                                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                                lineNumber: 396,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: applyAiDesign,
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].aiButton,
                                                children: "Aplicar Diseño IA"
                                            }, void 0, false, {
                                                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                                lineNumber: 403,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                        lineNumber: 394,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].systemMessage,
                                        children: "[ SYSTEM READY FOR INPUT ]"
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                        lineNumber: 408,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].portalSection,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/npos",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].portalButton,
                                            children: "[ INITIATE_PROTOCOL ]"
                                        }, void 0, false, {
                                            fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                            lineNumber: 414,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                        lineNumber: 413,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                lineNumber: 381,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footerStatus,
                                children: [
                                    "// NPOS v0.2 // DEPLOYED // ENTANGLED_TESSERACT_ACTIVE",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dataTicker,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$neoproxy$2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dataTickerInner,
                                            children: [
                                                dataStream,
                                                dataStream
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                            lineNumber: 423,
                                            columnNumber: 13
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                        lineNumber: 422,
                                        columnNumber: 11
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                                lineNumber: 420,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                        lineNumber: 374,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx",
                lineNumber: 368,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(NeoProxyClient, "I09osUTpYNQtnAemRPDZ08tD0GQ=");
_c = NeoProxyClient;
var _c;
__turbopack_context__.k.register(_c, "NeoProxyClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/artifacts/neoproxy/src/app/NeoProxyClient.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=artifacts_neoproxy_src_app_af35e93e._.js.map