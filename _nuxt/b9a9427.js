(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{417:function(t,e,r){"use strict";r.d(e,"a",(function(){return c})),r.d(e,"b",(function(){return f})),r.d(e,"c",(function(){return d}));var n=r(426),o=r(1),c=Object(o.i)("v-card__actions"),l=Object(o.i)("v-card__subtitle"),f=Object(o.i)("v-card__text"),d=Object(o.i)("v-card__title");n.a},426:function(t,e,r){"use strict";r(11),r(10),r(13),r(4),r(17),r(12),r(18);var n=r(2),o=(r(32),r(207),r(208),r(434),r(209)),c=r(448),l=r(94),f=r(15);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(f.a)(c.a,l.a,o.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return h(h({"v-card":!0},l.a.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},o.a.options.computed.classes.call(this))},styles:function(){var style=h({},o.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=c.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),r=e.tag,data=e.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(r,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},433:function(t,e){t.exports=function(t){t.options.__i18n=t.options.__i18n||[],t.options.__i18n.push('{"ja":{"aged":"享年"},"en":{"aged":"aged"}}'),delete t.options._Ctor}},548:function(t,e,r){"use strict";var n=r(433),o=r.n(n);e.default=o.a},559:function(t,e,r){"use strict";r.r(e);var n=r(30),o=r(31),c=r(42),l=r(38),f=r(28),d=r(19),h=(r(17),r(4),r(78),r(169)),v=r(462);function y(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(f.a)(t);if(e){var o=Object(f.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(l.a)(this,r)}}var O=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(d.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},m=function(t){Object(c.a)(r,t);var e=y(r);function r(){var t;return Object(n.a)(this,r),(t=e.apply(this,arguments)).defaultThumbnail="default-portrait.png",t.isInvalidThumbnail=!1,t}return Object(o.a)(r,[{key:"birthISOString",get:function(){return v.DateTime.fromSeconds(this.birth).toUTC().toISODate()}},{key:"deathISOString",get:function(){return v.DateTime.fromSeconds(this.death).toUTC().toISODate()}},{key:"age",get:function(){return v.DateTime.fromSeconds(this.death).diff(v.DateTime.fromSeconds(this.birth),["year","month","day"]).years}},{key:"thumbnail",get:function(){return""==this.portraitURL||this.isInvalidThumbnail?this.defaultThumbnail:this.portraitURL}}]),r}(h.Vue);O([Object(h.Prop)({default:"0x0"})],m.prototype,"address",void 0),O([Object(h.Prop)({default:"No Name"})],m.prototype,"name",void 0),O([Object(h.Prop)({default:0})],m.prototype,"birth",void 0),O([Object(h.Prop)({default:0})],m.prototype,"death",void 0),O([Object(h.Prop)({default:""})],m.prototype,"portraitURL",void 0);var j=m=O([h.Component],m),_=r(96),R=r(548),P=r(134),x=r.n(P),w=r(426),k=r(417),S=r(167),component=Object(_.a)(j,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{attrs:{link:"",exact:"",to:t.localePath({name:"grave-id",params:{id:t.address}}),nuxt:""}},[r("v-img",{attrs:{src:t.thumbnail,contain:"",height:"200px"},on:{error:function(e){t.isInvalidThumbnail=!0}}}),t._v(" "),r("v-card-title",[t._v("\n    "+t._s(t.name)+"\n  ")]),t._v(" "),r("v-card-text",[r("code",[t._v(t._s(t.birthISOString))]),t._v(" - "),r("code",[t._v(t._s(t.deathISOString))]),t._v(" ("+t._s(t.$t("aged"))+" "+t._s(t.age)+")")])],1)}),[],!1,null,null,null);"function"==typeof R.default&&Object(R.default)(component);e.default=component.exports;x()(component,{VCard:w.a,VCardText:k.b,VCardTitle:k.c,VImg:S.a})},983:function(t,e,r){"use strict";r.r(e);var n=r(20),o=r(30),c=r(31),l=r(42),f=r(38),d=r(28),h=r(19),v=(r(79),r(17),r(4),r(78),r(169)),y=r(428),O=r(559);function m(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(d.a)(t);if(e){var o=Object(d.a)(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return Object(f.a)(this,r)}}var j=function(t,e,r,desc){var n,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(h.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(c=(o<3?n(c):o>3?n(e,r,c):n(e,r))||c);return o>3&&c&&Object.defineProperty(e,r,c),c},_=function(t){Object(l.a)(d,t);var e,r,f=m(d);function d(){var t;return Object(o.a)(this,d),(t=f.apply(this,arguments)).PER_PAGE=24,t.pageIndex=0,t.graves=[],t}return Object(c.a)(d,[{key:"mounted",value:(r=Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.a.build();case 2:this.web3Gateway=t.sent,this.loadGraves();case 4:case"end":return t.stop()}}),t,this)}))),function(){return r.apply(this,arguments)})},{key:"loadGraves",value:(e=Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.web3Gateway.getGraves(this.PER_PAGE,this.pageIndex*this.PER_PAGE);case 2:this.graves=t.sent;case 3:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"onPageIndexChanged",value:function(t,e){this.loadGraves()}}]),d}(v.Vue);j([Object(v.Watch)("pageIndex")],_.prototype,"onPageIndexChanged",null);var R=_=j([Object(v.Component)({components:{GraveListElement:O.default}})],_),P=r(96),x=r(134),w=r.n(x),k=r(976),S=r(977),C=r(978),I=r(979),component=Object(P.a)(R,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-layout",{attrs:{wrap:""}},[r("v-flex",{attrs:{xs12:""}},[r("v-row",t._l(t.graves,(function(t,e){return r("v-col",{key:e,attrs:{cols:"12",sm:"6",md:"6",lg:"4"}},[r("grave-list-element",{attrs:{address:t.address,name:t.name,birth:t.birth,death:t.death,portraitURL:t.portraitURL}})],1)})),1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;w()(component,{GraveListElement:r(559).default}),w()(component,{VCol:k.a,VFlex:S.a,VLayout:C.a,VRow:I.a})}}]);