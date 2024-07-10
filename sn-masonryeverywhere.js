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
    function initFlexMasonry(selector) {
        var interval = setInterval(function() {
            if (document.querySelector(selector)) {
                clearInterval(interval);
                clearTimeout(timeout);
                FlexMasonry.init(selector);
            }
        }, 100); // Check every 100 milliseconds

        var timeout = setTimeout(function() {
            clearInterval(interval);
        }, 3000); // Stop checking after 3 seconds
    }

    // Initialization function
    window.snMasonry = function(selector) {
        // Load the CSS and JS files
        loadCSS('https://unpkg.com/flexmasonry/dist/flexmasonry.css');
        loadJS('https://unpkg.com/flexmasonry/dist/flexmasonry.js', function() {
            // Initialize FlexMasonry once the script is loaded
            document.addEventListener('DOMContentLoaded', function() {
                initFlexMasonry(selector);
            });
        });
    }
})();