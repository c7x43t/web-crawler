// sources for improvement:
// https://stefankrause.net/js-frameworks-benchmark8/table.html
function getRegisteredCustomElements () {
  if (window.customElements === undefined) return [];
  function isRegistered (name) {
    // return Object.getPrototypeOf(document.createElement(name).constructor) !== window.HTMLElement;
    // document.createElement(name) instanceof HTMLElement
    return window.customElements.get(name);
  }

  const allElems = document.querySelectorAll('html /deep/ *');
  const nodeNames = [].map.call(allElems, el => el.nodeName.toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);

  // console.log('all elements', nodeNames);
  // console.log('registered, custom elements', nodeNames.filter(isRegistered));
  return nodeNames.filter(isRegistered);
}
// Script detects, whether a website likely needs javascript to render it's content correctly
// by detecting various javascript frameworks and detecting other more general indications
function dependsOnJs () { // -> Boolean
  const $ = function (selector) { return document.querySelector(selector); };
  if (
    // <noscript> Tag
    !!$('noscript') ||
    // Can.js
    !!window.can ||
    // react.js
    !!window.React || !!$('[data-reactroot], [data-reactid]') ||
    // angular.js
    !!window.angular ||
    !!$('.ng-binding, [ng-app], [data-ng-app], [ng-controller], [data-ng-controller], [ng-repeat], [data-ng-repeat]') ||
    !!$('script[src*="angular.js"], script[src*="angular.min.js"]') ||
    // Backbone.js
    !!window.Backbone ||
    // Ember.js
    !!window.Ember ||
    // Vue.js
    !!window.Vue ||
    // Meteor.js
    !!window.Meteor ||
    // Svelte & Sapper
    !!$('script[context="module"]') || !!$('#sapper') || !!$('#svelte') || !!$('[class*="svelte-"]') ||
    // AppRun
    !!window.apprun || !!window._apprun || !!$('[id*="apprun-"]') || !!$('[class*="apprun-"]') || !!$('[apprun-no-init]') ||
    // Elm
    !!window.Elm ||
    // Hyperapp
    !!$('script[type="module"]') ||

    // Imba
    (getRegisteredCustomElements().length > 0) ||
    // Stencil
    // Aurelia ?? how to detect ?? only partial detection (1%)
    !!$('template') || !!$('[screen-activated\\.trigger]')

  // Keechma
  ) {
    return true;
  }
  if (false) {
    if (
      !!window.Zepto ||
      !!window.jQuery
      // Dojo
      // re-frame
    ) { }
  }
  return false;
}
