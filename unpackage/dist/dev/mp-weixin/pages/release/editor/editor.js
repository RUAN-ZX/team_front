(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/release/editor/editor"],{100:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=r(n(/*! ./node_modules/@babel/runtime/regenerator */21));function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,o,r,i,c){try{var u=e[i](c),s=u.value}catch(a){return void n(a)}u.done?t(s):Promise.resolve(s).then(o,r)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var c=e.apply(t,n);function u(e){i(c,o,r,u,s,"next",e)}function s(e){i(c,o,r,u,s,"throw",e)}u(void 0)}))}}var u,s=function(){n.e(/*! require.ensure | components/t-color-picker */"components/t-color-picker").then(function(){return resolve(n(/*! @/components/t-color-picker.vue */302))}.bind(null,n)).catch(n.oe)},a=function(){n.e(/*! require.ensure | components/hoverMenu/hoverMenu */"components/hoverMenu/hoverMenu").then(function(){return resolve(n(/*! @/components/hoverMenu/hoverMenu.vue */309))}.bind(null,n)).catch(n.oe)},d={components:{"t-color-picker":s,hoverMenu:a},data:function(){return{swiper_list:["字体大小 样式 颜色","字体大小 样式 颜色","字体大小 样式 颜色"],swiperCurrent:0,scrollTop:0,color:{r:255,g:0,b:0,a:.6},isEdit:!1,fontColor:"#000",formats:{},readOnly:!1,placeholder:"开始输入...",statusHeight:32,keyboardHeight:0,isIOS:!1,m_header_shadow:"0000",m_header_opacity:"0000",m_header_color:"transparent",m_side_toolbar_show:!1}},onLoad:function(){u=this,this.statusHeight=e.getStorageSync("statusHeight")},onPageScroll:function(e){this.scrollTop=e.scrollTop,0==e.scrollTop?(this.m_header_shadow="0000",this.m_header_opacity="0000"):(this.m_header_opacity="ffff",this.m_header_shadow="0020",this.m_header_color="#f5f5f5")},methods:{change:function(e){var t=e.detail.current;this.swiperCurrent=t},cancel:function(){this.isEdit=!1},open:function(){this.$refs.colorPicker.open(),this.isEdit=!0},hideKey:function(){e.hideKeyboard()},confirm:function(e){var t=this;return c(o.default.mark((function n(){return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.isEdit=!1,n.next=3,e.hex;case 3:t.fontColor=n.sent,t.onStatusChange({detail:{color:e.hex}}),t.$forceUpdate();case 6:case"end":return n.stop()}}),n)})))()},readOnlyChange:function(){this.readOnly=!this.readOnly},onEditorReady:function(){e.createSelectorQuery().select("#editor").context((function(e){u.editorCtx=e.context})).exec()},undo:function(){this.editorCtx.undo()},redo:function(){this.editorCtx.redo()},blur:function(){this.editorCtx.blur()},format:function(e){var t=e.target.dataset,n=t.name,o=t.value;n&&this.editorCtx.format(n,o)},onStatusChange:function(e){this.formats=e.detail},insertDivider:function(){this.editorCtx.insertDivider({success:function(){console.log("insert divider success")}})},store:function(t){this.editorCtx.getContents({success:function(n){1==t.currentTarget.id?console.log("保存内容:",n.html):e.navigateTo({url:"/pages/preview/preview?rich=".concat(encodeURIComponent(n.html))})}})},clear:function(){this.editorCtx.clear({success:function(e){console.log("clear success")}})},removeFormat:function(){this.editorCtx.removeFormat()},insertDate:function(){var e=new Date,t="".concat(e.getFullYear(),"/").concat(e.getMonth()+1,"/").concat(e.getDate());this.editorCtx.insertText({text:t})},insertImage:function(){e.chooseImage({count:1,success:function(e){u.editorCtx.insertImage({src:e.tempFilePaths[0],data:{id:"abcd",role:"god"},width:"80%",success:function(){console.log("insert image success")}})}})}}};t.default=d}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},101:
/*!**********************************************************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./editor.vue?vue&type=style&index=0&lang=css& */102),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},102:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){},103:
/*!***********************************************************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue?vue&type=style&index=1&lang=scss& ***!
  \***********************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./editor.vue?vue&type=style&index=1&lang=scss& */104),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},104:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue?vue&type=style&index=1&lang=scss& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){},105:
/*!***********************************************************************************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue?vue&type=style&index=2&id=2cdfe21e&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./editor.vue?vue&type=style&index=2&id=2cdfe21e&lang=scss&scoped=true& */106),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},106:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue?vue&type=style&index=2&id=2cdfe21e&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){},95:
/*!**********************************************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/main.js?{"page":"pages%2Frelease%2Feditor%2Feditor"} ***!
  \**********************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e){n(/*! uni-pages */4);o(n(/*! vue */2));var t=o(n(/*! ./pages/release/editor/editor.vue */96));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createPage"])},96:
/*!*************************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue ***!
  \*************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! ./editor.vue?vue&type=template&id=2cdfe21e&scoped=true& */97),r=n(/*! ./editor.vue?vue&type=script&lang=js& */99);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n(/*! ./editor.vue?vue&type=style&index=0&lang=css& */101),n(/*! ./editor.vue?vue&type=style&index=1&lang=scss& */103),n(/*! ./editor.vue?vue&type=style&index=2&id=2cdfe21e&lang=scss&scoped=true& */105);var c,u=n(/*! ../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */12),s=Object(u["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"2cdfe21e",null,!1,o["components"],c);s.options.__file="pages/release/editor/editor.vue",t["default"]=s.exports},97:
/*!********************************************************************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue?vue&type=template&id=2cdfe21e&scoped=true& ***!
  \********************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./editor.vue?vue&type=template&id=2cdfe21e&scoped=true& */98);n.d(t,"render",(function(){return o["render"]})),n.d(t,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(t,"components",(function(){return o["components"]}))},98:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue?vue&type=template&id=2cdfe21e&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */function(e,t,n){"use strict";var o;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return c})),n.d(t,"recyclableRender",(function(){return i})),n.d(t,"components",(function(){return o}));try{o={uBackTop:function(){return n.e(/*! import() | uview-ui/components/u-back-top/u-back-top */"uview-ui/components/u-back-top/u-back-top").then(n.bind(null,/*! @/uview-ui/components/u-back-top/u-back-top.vue */295))}}}catch(u){if(-1===u.message.indexOf("Cannot find module")||-1===u.message.indexOf(".vue"))throw u;console.error(u.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement;e._self._c},i=!1,c=[];r._withStripped=!0},99:
/*!**************************************************************************************************************!*\
  !*** D:/Users/Ryan/Documents/HBuilderProjects/team/pages/release/editor/editor.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var o=n(/*! -!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../../../../Program Files/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./editor.vue?vue&type=script&lang=js& */100),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a}},[[95,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/release/editor/editor.js.map