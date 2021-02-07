"use strict";

/**
 * @fileoverview markdown 插件
 * Include marked (https://github.com/markedjs/marked)
 * Include github-markdown-css (https://github.com/sindresorhus/github-markdown-css)
 */
var marked = require('./marked.min');

var index = 0;

function markdown(vm) {
  this.vm = vm;
  vm._ids = {};
}

markdown.prototype.onUpdate = function (content) {
  if (this.vm.markdown) return marked(content);
};

markdown.prototype.onParse = function (node, vm) {
  if (vm.options.markdown) {
    // 中文 id 需要转换，否则无法跳转
    if (vm.options.useAnchor && node.attrs && /[\u4e00-\u9fa5]/.test(node.attrs.id)) {
      var id = 't' + index++;
      this.vm._ids[node.attrs.id] = id;
      node.attrs.id = id;
    }

    if (node.name == 'p' || node.name == 'table' || node.name == 'tr' || node.name == 'th' || node.name == 'td' || node.name == 'blockquote' || node.name == 'pre' || node.name == 'code') node.attrs["class"] = "md-".concat(node.name, " ").concat(node.attrs["class"] || '');
  }
};

module.exports = markdown;