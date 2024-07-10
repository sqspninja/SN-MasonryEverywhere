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
    // Function to dynamically load CSS
    function loadCSS(href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    // Function to dynamically load JS
    function loadJS(src, callback) {
        var script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Function to check if the selector exists and initialize FlexMasonry
    function initFlexMasonry(selector, options) {
        var interval = setInterval(function() {
            if (document.querySelector(selector)) {
                clearInterval(interval);
                clearTimeout(timeout);

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

                FlexMasonry.init(selector, finalOptions);
            }
        }, 100); // Check every 100 milliseconds

        var timeout = setTimeout(function() {
            clearInterval(interval);
        }, 3000); // Stop checking after 3 seconds
    }

    // Initialization function
    window.snMasonry = function(selector, options) {
        // Load the CSS and JS files
        loadCSS('https://unpkg.com/flexmasonry/dist/flexmasonry.css');
        loadJS('https://unpkg.com/flexmasonry/dist/flexmasonry.js', function() {
            // Initialize FlexMasonry once the script is loaded
            document.addEventListener('DOMContentLoaded', function() {
                initFlexMasonry(selector, options);
            });
        });
    }
})();