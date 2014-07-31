'use strict';

function equalheight (selector) {
  var tallestHeight = 0;

  function runEqualheight () {
    var elements = document.querySelectorAll(selector);
    var scrollTop = document.body.scrollTop;
    var row = [];
    var rowOffsetTop = 0;

    Array.prototype.forEach.call(elements, function (element) {
      element.style.height = 'auto';
      var elementOffsetTop = element.getBoundingClientRect().top + scrollTop;
      var elemHeight = parseInt(window.getComputedStyle(element).height, 10);

      if (elementOffsetTop === rowOffsetTop) {
        tallestHeight = Math.max(elemHeight, tallestHeight);
      } else {
        setRowHeight(row);
        row = [];
        rowOffsetTop = elementOffsetTop;
        tallestHeight = elemHeight;
      }

      row.push(element);
    });

    setRowHeight(row); // run for last row
  }

  function setRowHeight (row) {
    row.forEach(function (element) {
      element.style.height = tallestHeight + 'px';
    });
  }

  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);
      runEqualheight();
    }
  }, 10);

  window.addEventListener('resize', function () {
    tallestHeight = 0;
    runEqualheight();
  }, true);

  runEqualheight();
}

/**
 * UMD (Universal Module Definition)
 */
(function (root, factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    define([], factory); // AMD
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(); // Node
  } else {
    root.equalheight = factory(); // Browser
  }
}(this, function () { return equalheight; }));
