/*!
 * (C) Ionic http://ionicframework.com - MIT License
 * Built with http://stenciljs.com
 */
Ionic.loadBundle("chunk-76c391e2.js", ["exports"], function (e) { window.Ionic.h; var o = "opacity"; function n(e) { if (e.classList.contains("ion-page"))
    return e; return e.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs") || e; } e.iosTransitionAnimation = function (e, n, t) { var r = "rtl" === document.dir, a = r ? "-99.5%" : "99.5%", l = r ? "33%" : "-33%", d = t.enteringEl, i = t.leavingEl, c = new e; if (c.addElement(d).duration(t.duration || 500).easing(t.easing || "cubic-bezier(0.36,0.66,0.04,1)").beforeRemoveClass("hide-page"), i && n) {
    var o_1 = new e;
    o_1.addElement(n).duringAddClass("show-decor"), c.add(o_1);
} var s = "back" === t.direction; if (d) {
    var n_1 = d.querySelector(":scope > ion-content"), t_1 = d.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"), i_1 = d.querySelector(":scope > ion-header > ion-toolbar"), m = new e;
    if (n_1 || i_1 || 0 !== t_1.length ? (m.addElement(n_1), m.addElement(t_1)) : m.addElement(d.querySelector(":scope > ion-page, :scope > ion-nav, :scope > ion-tabs")), c.add(m), s ? m.beforeClearStyles([o]).fromTo("translateX", l, "0%", !0).fromTo(o, .8, 1, !0) : m.beforeClearStyles([o]).fromTo("translateX", a, "0%", !0), i_1) {
        var n_2 = new e;
        n_2.addElement(i_1), c.add(n_2);
        var t_2 = new e;
        t_2.addElement(i_1.querySelector("ion-title"));
        var d_1 = new e;
        d_1.addElement(i_1.querySelectorAll("ion-buttons,[menuToggle]"));
        var m_1 = new e;
        m_1.addElement(i_1.querySelector(".toolbar-background"));
        var u = new e;
        if (u.addElement(i_1.querySelector("ion-back-button")), n_2.add(t_2).add(d_1).add(m_1).add(u), t_2.fromTo(o, .01, 1, !0), d_1.fromTo(o, .01, 1, !0), s)
            t_2.fromTo("translateX", l, "0%", !0), u.fromTo(o, .01, 1, !0);
        else {
            t_2.fromTo("translateX", a, "0%", !0), m_1.beforeClearStyles([o]).fromTo(o, .01, 1, !0), u.fromTo(o, .01, 1, !0);
            var l_1 = new e;
            l_1.addElement(i_1.querySelector("ion-back-button .button-text")).fromTo("translateX", r ? "-100px" : "100px", "0px"), n_2.add(l_1);
        }
    }
} if (i) {
    var n_3 = new e;
    n_3.addElement(i.querySelector(":scope > ion-content")), n_3.addElement(i.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")), c.add(n_3), s ? n_3.beforeClearStyles([o]).fromTo("translateX", "0%", r ? "-100%" : "100%") : n_3.fromTo("translateX", "0%", l, !0).fromTo(o, 1, .8, !0);
    var t_3 = i.querySelector(":scope > ion-header > ion-toolbar");
    if (t_3) {
        var n_4 = new e;
        n_4.addElement(t_3);
        var a_1 = new e;
        a_1.addElement(t_3.querySelector("ion-title"));
        var d_2 = new e;
        d_2.addElement(t_3.querySelectorAll("ion-buttons,[menuToggle]"));
        var i_2 = new e;
        i_2.addElement(t_3.querySelector(".toolbar-background"));
        var m = new e;
        if (m.addElement(t_3.querySelector("ion-back-button")), n_4.add(a_1).add(d_2).add(m).add(i_2), c.add(n_4), m.fromTo(o, .99, 0, !0), a_1.fromTo(o, .99, 0, !0), d_2.fromTo(o, .99, 0, !0), s) {
            a_1.fromTo("translateX", "0%", r ? "-100%" : "100%"), i_2.beforeClearStyles([o]).fromTo(o, 1, .01, !0);
            var l_2 = new e;
            l_2.addElement(t_3.querySelector("ion-back-button .button-text")), l_2.fromTo("translateX", "0%", (r ? -124 : 124) + "px"), n_4.add(l_2);
        }
        else
            a_1.fromTo("translateX", "0%", l).afterClearStyles(["transform"]), m.afterClearStyles([o]), a_1.afterClearStyles([o]), d_2.afterClearStyles([o]);
    }
} return Promise.resolve(c); }, e.mdTransitionAnimation = function (e, o, t) { var r = t.enteringEl, a = t.leavingEl, l = n(r), d = new e; d.addElement(l).beforeRemoveClass("hide-page"); var i = "back" === t.direction; if (r) {
    i ? d.duration(t.duration || 200).easing("cubic-bezier(0.47,0,0.745,0.715)") : d.duration(t.duration || 280).easing("cubic-bezier(0.36,0.66,0.04,1)").fromTo("translateY", "40px", "0px", !0).fromTo("opacity", .01, 1, !0);
    var o_2 = l.querySelector("ion-toolbar");
    if (o_2) {
        var n_5 = new e;
        n_5.addElement(o_2), d.add(n_5);
    }
} if (a && i) {
    d.duration(t.duration || 200).easing("cubic-bezier(0.47,0,0.745,0.715)");
    var o_3 = new e;
    o_3.addElement(n(a)).fromTo("translateY", "0px", "40px").fromTo("opacity", 1, 0), d.add(o_3);
} return Promise.resolve(d); }; });
