(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/t-color-picker"],{314:
/*!***********************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/components/t-color-picker.vue ***!
  \***********************************************************************************/
/*! no static exports found */function(t,e,r){"use strict";r.r(e);var n=r(/*! ./t-color-picker.vue?vue&type=template&id=0cb04c6c& */315),i=r(/*! ./t-color-picker.vue?vue&type=script&lang=js& */317);for(var o in i)"default"!==o&&function(t){r.d(e,t,(function(){return i[t]}))}(o);r(/*! ./t-color-picker.vue?vue&type=style&index=0&lang=css& */319);var s,a=r(/*! ../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */12),h=Object(a["default"])(i["default"],n["render"],n["staticRenderFns"],!1,null,null,null,!1,n["components"],s);h.options.__file="components/t-color-picker.vue",e["default"]=h.exports},315:
/*!******************************************************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/components/t-color-picker.vue?vue&type=template&id=0cb04c6c& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,r){"use strict";r.r(e);var n=r(/*! -!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./t-color-picker.vue?vue&type=template&id=0cb04c6c& */316);r.d(e,"render",(function(){return n["render"]})),r.d(e,"staticRenderFns",(function(){return n["staticRenderFns"]})),r.d(e,"recyclableRender",(function(){return n["recyclableRender"]})),r.d(e,"components",(function(){return n["components"]}))},316:
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Users/Ryan/Documents/HBuilderProjects/team/components/t-color-picker.vue?vue&type=template&id=0cb04c6c& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(t,e,r){"use strict";var n;r.r(e),r.d(e,"render",(function(){return i})),r.d(e,"staticRenderFns",(function(){return s})),r.d(e,"recyclableRender",(function(){return o})),r.d(e,"components",(function(){return n}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=!1,s=[];i._withStripped=!0},317:
/*!************************************************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/components/t-color-picker.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************/
/*! no static exports found */function(t,e,r){"use strict";r.r(e);var n=r(/*! -!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./t-color-picker.vue?vue&type=script&lang=js& */318),i=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},318:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Users/Ryan/Documents/HBuilderProjects/team/components/t-color-picker.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,r){"use strict";(function(t){function r(t,e){return a(t)||s(t,e)||i(t,e)||n()}function n(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,e){if(t){if("string"===typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function s(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,i=!1,o=void 0;try{for(var s,a=t[Symbol.iterator]();!(n=(s=a.next()).done);n=!0)if(r.push(s.value),e&&r.length===e)break}catch(h){i=!0,o=h}finally{try{n||null==a["return"]||a["return"]()}finally{if(i)throw o}}return r}}function a(t){if(Array.isArray(t))return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var h={props:{color:{type:Object,default:function(){return{r:0,g:0,b:0,a:0}}},spareColor:{type:Array,default:function(){return[]}}},data:function(){return{show:!1,active:!1,rgba:{r:0,g:0,b:0,a:1},hsb:{h:0,s:0,b:0},site:[{top:0,left:0},{left:0},{left:0}],index:0,bgcolor:{r:255,g:0,b:0,a:1},hex:"#000000",mode:!0,colorList:[{r:244,g:67,b:54,a:1},{r:233,g:30,b:99,a:1},{r:156,g:39,b:176,a:1},{r:103,g:58,b:183,a:1},{r:63,g:81,b:181,a:1},{r:33,g:150,b:243,a:1},{r:3,g:169,b:244,a:1},{r:0,g:188,b:212,a:1},{r:0,g:150,b:136,a:1},{r:76,g:175,b:80,a:1},{r:139,g:195,b:74,a:1},{r:205,g:220,b:57,a:1},{r:255,g:235,b:59,a:1},{r:255,g:193,b:7,a:1},{r:255,g:152,b:0,a:1},{r:255,g:87,b:34,a:1},{r:121,g:85,b:72,a:1},{r:158,g:158,b:158,a:1},{r:0,g:0,b:0,a:.5},{r:0,g:0,b:0,a:0}]}},created:function(){this.rgba=this.color,0!==this.spareColor.length&&(this.colorList=this.spareColor)},methods:{init:function(){this.hsb=this.rgbToHex(this.rgba),this.setValue(this.rgba)},moveHandle:function(){},open:function(){var e=this;t.hideKeyboard(),this.show=!0,this.$nextTick((function(){e.init(),setTimeout((function(){e.active=!0,setTimeout((function(){e.getSelectorQuery()}),350)}),50)}))},close:function(){var t=this;this.active=!1,this.$nextTick((function(){setTimeout((function(){t.show=!1}),500)})),this.$emit("cancel",{})},confirm:function(){this.close(),this.$emit("confirm",{rgba:this.rgba,hex:this.hex})},select:function(){this.mode=!this.mode},selectColor:function(t){this.setColorBySelect(t)},touchstart:function(t,e){var r=t.touches[0],n=r.pageX,i=r.pageY;this.pageX=n,this.pageY=i,this.setPosition(n,i,e)},touchmove:function(t,e){var r=t.touches[0],n=r.pageX,i=r.pageY;this.moveX=n,this.moveY=i,this.setPosition(n,i,e)},touchend:function(t,e){},setPosition:function(t,e,r){this.index=r;var n=this.position[r],i=n.top,o=n.left,s=n.width,a=n.height;this.site[r].left=Math.max(0,Math.min(parseInt(t-o),s)),0===r?(this.site[r].top=Math.max(0,Math.min(parseInt(e-i),a)),this.hsb.s=parseInt(100*this.site[r].left/s),this.hsb.b=parseInt(100-100*this.site[r].top/a),this.setColor(),this.setValue(this.rgba)):this.setControl(r,this.site[r].left)},setColor:function(){var t=this.HSBToRGB(this.hsb);this.rgba.r=t.r,this.rgba.g=t.g,this.rgba.b=t.b},setValue:function(t){this.hex="#"+this.rgbToHex(t)},setControl:function(t,e){var r=this.position[t],n=(r.top,r.left,r.width);r.height;1===t?(this.hsb.h=parseInt(360*e/n),this.bgcolor=this.HSBToRGB({h:this.hsb.h,s:100,b:100}),this.setColor()):this.rgba.a=(e/n).toFixed(1),this.setValue(this.rgba)},rgbToHex:function(t){var e=[t.r.toString(16),t.g.toString(16),t.b.toString(16)];return e.map((function(t,r){1==t.length&&(e[r]="0"+t)})),e.join("")},setColorBySelect:function(t){var e=t.r,r=t.g,n=t.b,i=t.a,o={};o={r:e?parseInt(e):0,g:r?parseInt(r):0,b:n?parseInt(n):0,a:i||0},this.rgba=o,this.hsb=this.rgbToHsb(o),this.changeViewByHsb()},changeViewByHsb:function(){var t=r(this.position,3),e=t[0],n=t[1],i=t[2];this.site[0].left=parseInt(this.hsb.s*e.width/100),this.site[0].top=parseInt((100-this.hsb.b)*e.height/100),this.setColor(this.hsb.h),this.setValue(this.rgba),this.bgcolor=this.HSBToRGB({h:this.hsb.h,s:100,b:100}),this.site[1].left=this.hsb.h/360*n.width,this.site[2].left=this.rgba.a*i.width},HSBToRGB:function(t){var e={},r=Math.round(t.h),n=Math.round(255*t.s/100),i=Math.round(255*t.b/100);if(0==n)e.r=e.g=e.b=i;else{var o=i,s=(255-n)*i/255,a=r%60*(o-s)/60;360==r&&(r=0),r<60?(e.r=o,e.b=s,e.g=s+a):r<120?(e.g=o,e.b=s,e.r=o-a):r<180?(e.g=o,e.r=s,e.b=s+a):r<240?(e.b=o,e.r=s,e.g=o-a):r<300?(e.b=o,e.g=s,e.r=s+a):r<360?(e.r=o,e.g=s,e.b=o-a):(e.r=0,e.g=0,e.b=0)}return{r:Math.round(e.r),g:Math.round(e.g),b:Math.round(e.b)}},rgbToHsb:function(t){var e={h:0,s:0,b:0},r=Math.min(t.r,t.g,t.b),n=Math.max(t.r,t.g,t.b),i=n-r;return e.b=n,e.s=0!=n?255*i/n:0,0!=e.s?t.r==n?e.h=(t.g-t.b)/i:t.g==n?e.h=2+(t.b-t.r)/i:e.h=4+(t.r-t.g)/i:e.h=-1,e.h*=60,e.h<0&&(e.h=0),e.s*=100/255,e.b*=100/255,e},getSelectorQuery:function(){var e=this,r=t.createSelectorQuery().in(this);r.selectAll(".boxs").boundingClientRect((function(t){t&&0!==t.length?(e.position=t,e.setColorBySelect(e.rgba)):setTimeout((function(){return e.getSelectorQuery()}),20)})).exec()}},watch:{spareColor:function(t){this.colorList=t}}};e.default=h}).call(this,r(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},319:
/*!********************************************************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/components/t-color-picker.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************/
/*! no static exports found */function(t,e,r){"use strict";r.r(e);var n=r(/*! -!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./t-color-picker.vue?vue&type=style&index=0&lang=css& */320),i=r.n(n);for(var o in n)"default"!==o&&function(t){r.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},320:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Users/Ryan/Documents/HBuilderProjects/team/components/t-color-picker.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,r){}}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/t-color-picker.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/t-color-picker-create-component',
    {
        'components/t-color-picker-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(314))
        })
    },
    [['components/t-color-picker-create-component']]
]);
