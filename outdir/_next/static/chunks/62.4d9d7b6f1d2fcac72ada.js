(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[62],{"+YNn":function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return v}));var c=n("nKUr"),a=n("rePB"),s=n("Ff2n"),r=n("KQm4"),i=n("q1tI"),l=n("HzgH"),o=n("ZUvb"),u=n("IdFE"),b=n("wqVm"),m=n("6ImU"),d=n("RW2Z"),j=n("xm5f"),p=n("vWZZ"),x=n("LvDl"),f=n("20a2"),O=n.n(f);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,c)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){Object(a.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y=[{id:0,link:"https://www.facebook.com/redqinc/",icon:Object(c.jsx)(d.m,{}),className:"facebook",title:"text-facebook"},{id:1,link:"https://twitter.com/redqinc",icon:Object(c.jsx)(d.q,{}),className:"twitter",title:"text-twitter"},{id:2,link:"https://www.youtube.com/channel/UCjld1tyVHRNy_pe3ROLiLhw",icon:Object(c.jsx)(d.r,{}),className:"youtube",title:"text-youtube"},{id:3,link:"https://www.instagram.com/redqinc/",icon:Object(c.jsx)(d.n,{}),className:"instagram",title:"text-instagram"}];function v(){var e=Object(i.useState)([]),t=e[0],n=e[1],a=Object(m.b)().closeSidebar,f=Object(j.b)("menu").t,h=Object(p.a)().data,v=h.map((function(e){return e.columns.map((function(e){return e.columnItems.map((function(e){var t=Object(x.cloneDeep)(e),n=t,c=n.columnItemItems;return t=w(w({},Object(s.a)(n,["columnItemItems"])),c.length>0&&{subMenu:c})}))}))})).flat(2);v=[].concat(Object(r.a)(v),Object(r.a)(l.a));var g=function(e){var s=e.dept,i=e.data,l=e.hasSubMenu,o=e.menuName,b=e.menuIndex,m=e.className,d=void 0===m?"":m;return i.label&&Object(c.jsxs)("li",{className:"mb-0.5 ".concat(d),children:[Object(c.jsxs)("div",{className:"flex items-center justify-between",children:[Object(c.jsx)("div",{onClick:function(){!i.subMenu&&i.path?O.a.push(i.path):l?O.a.push("/categories/".concat(i.label,"-").concat(i.id)):O.a.push("/category/".concat(i.unique_id))},className:"w-full text-[15px] menu-item relative py-3 ps-5 md:ps-7 pe-4 transition duration-300 ease-in-out",children:Object(c.jsx)("span",{className:"block w-full",onClick:a,children:f("".concat(i.label))})}),l&&Object(c.jsx)("div",{className:"cursor-pointer w-16 md:w-20 h-8 text-lg flex-shrink-0 flex items-center justify-center",onClick:function(){return function(e){var c=Object(r.a)(t);if(c.includes(e)){var a=c.indexOf(e);a>-1&&c.splice(a,1)}else c.push(e);n(c)}(o)},children:Object(c.jsx)(u.b,{className:"transition duration-200 ease-in-out transform text-heading ".concat(t.includes(o)?"-rotate-180":"rotate-0")})})]}),l&&Object(c.jsx)(N,{dept:s,data:i.subMenu,toggle:t.includes(o),menuIndex:b})]})},N=function(e){var t=e.dept,n=e.data,a=e.toggle,s=e.menuIndex;return a?(t+=1,Object(c.jsx)("ul",{className:"pt-0.5",children:null===n||void 0===n?void 0:n.map((function(e,n){var a="sidebar-submenu-".concat(t,"-").concat(s,"-").concat(n);return Object(c.jsx)(g,{dept:t,data:e,hasSubMenu:e.subMenu,menuName:a,menuIndex:n,className:t>1&&"ps-4"},a)}))})):null};return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"flex flex-col justify-between w-full h-full",children:[Object(c.jsxs)("div",{className:"w-full border-b border-gray-100 flex justify-between items-center relative ps-5 md:ps-7 flex-shrink-0 py-0.5",children:[Object(c.jsx)(b.a,{}),Object(c.jsx)("button",{className:"flex text-2xl items-center justify-center text-gray-500 px-4 md:px-5 py-6 lg:py-8 focus:outline-none transition-opacity hover:opacity-60",onClick:a,"aria-label":"close",children:Object(c.jsx)(d.g,{className:"text-black mt-1 md:mt-0.5"})})]}),Object(c.jsx)(o.a,{className:"menu-scrollbar flex-grow mb-auto",children:Object(c.jsx)("div",{className:"flex flex-col py-7 px-0 lg:px-2 text-heading",children:Object(c.jsx)("ul",{className:"mobileMenu",children:v.map((function(e,t){var n="sidebar-menu-".concat(1,"-").concat(t);return Object(c.jsx)(g,{dept:1,data:e,hasSubMenu:e.subMenu,menuName:n,menuIndex:t},n)}))})})}),Object(c.jsx)("div",{className:"flex items-center justify-center bg-white border-t border-gray-100 px-7 flex-shrink-0 space-s-1",children:null===y||void 0===y?void 0:y.map((function(e,t){return Object(c.jsxs)("a",{href:e.link,className:"text-heading p-5 opacity-60 first:-ms-4 transition duration-300 ease-in hover:opacity-100 ".concat(e.className),target:"_blank",children:[Object(c.jsx)("span",{className:"sr-only",children:f("".concat(e.title))}),e.icon]},t)}))})]})})}}}]);