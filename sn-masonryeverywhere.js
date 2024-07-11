/*!
 * MIT License
 * 
 * Copyright (c) [Year] [Author]
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function() {
    console.log('Script loaded completely');

    // Function to dynamically load CSS
    function loadCSS(href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
        console.log('CSS loaded:', href);
    }

    // Function to dynamically load JS
    function loadJS(src, callback) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
        console.log('JS loaded:', src);
    }

    // Function to check if all selectors exist and initialize FlexMasonry
    function initFlexMasonry(selectors, options) {
        console.log('Checking for selectors:', selectors);
        var selectorArray = selectors.split(',');
        var interval = setInterval(function() {
            var allElementsExist = selectorArray.every(function(selector) {
                return document.querySelector(selector.trim());
            });
            
            if (allElementsExist) {
                clearInterval(interval);
                clearTimeout(timeout);
                console.log('All selectors found. Initializing FlexMasonry with options:', options);
                
                // Default options
                var defaultOptions = {
                    responsive: true,
                    breakpointCols: {
                        'min-width: 1200px': 5, // Desktop
                        'min-width: 992px': 4,  // Laptop
                        'min-width: 768px': 3,  // Tablet
                        'min-width: 576px': 1   // Mobile
                    }
                };

                // Merge user options with default options
                var finalOptions = Object.assign({}, defaultOptions, options);

                selectorArray.forEach(function(selector) {
                    FlexMasonry.init(selector.trim(), finalOptions);
                    console.log('FlexMasonry initialized for selector:', selector.trim());
                });
            }
        }, 100); // Check every 100 milliseconds

        var timeout = setTimeout(function() {
            clearInterval(interval);
            console.log('Timeout reached. Not all selectors were found:', selectors);
        }, 3000); // Stop checking after 3 seconds
    }

    // Initialization function
    window.snMasonry = function(selectors, options) {
        console.log('snMasonry called with selectors:', selectors, 'and options:', options);
        // Load the CSS and JS files
        loadCSS('https://unpkg.com/flexmasonry/dist/flexmasonry.css');
        loadJS('https://unpkg.com/flexmasonry/dist/flexmasonry.js', function() {
            console.log('FlexMasonry script loaded');
            // Initialize FlexMasonry once the script is loaded
            window.addEventListener('load', function() {
                console.log('Window loaded. Initializing FlexMasonry.');
                initFlexMasonry(selectors, options);
            });
        });
    }

    // Automatically initialize if the selectors and options variables are defined
    if (typeof masonrySelectors !== 'undefined' && typeof masonryOptions !== 'undefined') {
        snMasonry(masonrySelectors, masonryOptions);
    } else {
        console.log('masonrySelectors or masonryOptions not defined');
    }
})();