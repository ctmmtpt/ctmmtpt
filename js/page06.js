/* =========================================================
   CTM PATH™ MILLIONAIRES™ — PAGE 06
   COMPLETE PAGE-SPECIFIC JAVASCRIPT REPLACEMENT
   Vanilla JavaScript — no framework / no dependencies
   ========================================================= */

(function () {
    "use strict";

    /* ---------------------------------------------------------
       PAGE GUARD
       --------------------------------------------------------- */

    const page = document.body;

    if (!page || !page.classList.contains("page-06")) {
        return;
    }

    /* ---------------------------------------------------------
       DOM READY
       --------------------------------------------------------- */

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback, {
                once: true
            });
        } else {
            callback();
        }
    }

    /* ---------------------------------------------------------
       SCROLL TO TOP
       Ensures Page 06 always opens from the beginning.
       --------------------------------------------------------- */

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });
    }

    /* ---------------------------------------------------------
       INTERNAL PAGE NAVIGATION
       --------------------------------------------------------- */

    function handlePageNavigation(event) {
        const link = event.currentTarget;
        const href = link.getAttribute("href");

        if (!href || href.charAt(0) === "#") {
            return;
        }

        /*
         * Let normal navigation happen, but reset the scroll
         * position immediately so the next page starts at top
         * even when the browser restores a previous scroll state.
         */
        try {
            sessionStorage.setItem("ctmPathReturnScroll", "0");
        } catch (error) {
            /* Storage may be unavailable; navigation still works. */
        }
    }

    /* ---------------------------------------------------------
       IMAGE FALLBACKS
       --------------------------------------------------------- */

    function setupImageFallbacks() {
        const images = document.querySelectorAll("img");

        images.forEach(function (image) {
            image.addEventListener("error", function () {
                /*
                 * Prevent an infinite error loop if the fallback
                 * itself is unavailable.
                 */
                if (image.dataset.fallbackAttempted === "true") {
                    return;
                }

                image.dataset.fallbackAttempted = "true";

                const source = image.getAttribute("src") || "";

                /*
                 * The repository may use either capitalization
                 * for the CTM logo. Try the alternate filename
                 * without changing the HTML.
                 */
                if (
                    source === "assets/ctmmtptlogo.svg" ||
                    source === "assets/CTMMTPLogo.svg"
                ) {
                    image.src =
                        source === "assets/ctmmtptlogo.svg"
                            ? "assets/CTMMTPLogo.svg"
                            : "assets/ctmmtptlogo.svg";

                    return;
                }

                /*
                 * For the UMBAR AVAI logo, retain the intended
                 * image location and hide only the broken image
                 * rather than showing a browser broken-image icon.
                 */
                if (
                    source === "assets/umbaravailogo.png" ||
                    image.classList.contains("umbar-avai-logo")
                ) {
                    image.classList.add("image-unavailable");
                }
            });
        });
    }

    /* ---------------------------------------------------------
       ACCESSIBILITY
       --------------------------------------------------------- */

    function setupAccessibility() {
        const navigationLinks = document.querySelectorAll(
            ".page-navigation a"
        );

        navigationLinks.forEach(function (link) {
            if (!link.hasAttribute("aria-label")) {
                const text = link.textContent.trim();

                if (text) {
                    link.setAttribute("aria-label", text);
                }
            }
        });
    }

    /* ---------------------------------------------------------
       ACTIVE PAGE NAVIGATION
       --------------------------------------------------------- */

    function markCurrentPage() {
        const current = document.querySelector(".nav-current");

        if (!current) {
            return;
        }

        current.setAttribute("aria-current", "page");
    }

    /* ---------------------------------------------------------
       PAGE VISIBILITY
       --------------------------------------------------------- */

    function revealPage() {
        page.classList.add("page-ready");
    }

    /* ---------------------------------------------------------
       PREVENT UNWANTED BROWSER SCROLL RESTORATION
       --------------------------------------------------------- */

    function configureScrollRestoration() {
        if ("scrollRestoration" in history) {
            try {
                history.scrollRestoration = "manual";
            } catch (error) {
                /* Ignore unsupported browser behavior. */
            }
        }
    }

    /* ---------------------------------------------------------
       RESTORE TOP POSITION
       --------------------------------------------------------- */

    function restoreTopPosition() {
        try {
            const savedPosition =
                sessionStorage.getItem("ctmPathReturnScroll");

            if (savedPosition === "0") {
                sessionStorage.removeItem("ctmPathReturnScroll");
                scrollToTop();
                return;
            }
        } catch (error) {
            /* Ignore storage errors. */
        }

        /*
         * A second frame catches browsers that apply their own
         * restoration after DOMContentLoaded.
         */
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                if (window.scrollY > 0) {
                    scrollToTop();
                }
            });
        });
    }

    /* ---------------------------------------------------------
       KEYBOARD NAVIGATION
       --------------------------------------------------------- */

    function setupKeyboardNavigation() {
        document.addEventListener("keydown", function (event) {
            /*
             * Alt + Left  = Previous page
             * Alt + Right = Next page
             *
             * Do not override the browser's normal Alt+Arrow
             * behavior; this only applies when the page contains
             * a corresponding navigation link and focus is not
             * inside a form control.
             */
            const activeElement = document.activeElement;
            const tagName = activeElement
                ? activeElement.tagName.toLowerCase()
                : "";

            const isFormField =
                tagName === "input" ||
                tagName === "textarea" ||
                tagName === "select" ||
                tagName === "button";

            if (isFormField) {
                return;
            }

            if (event.altKey && event.key === "ArrowLeft") {
                const previous = document.querySelector(".nav-previous");

                if (previous) {
                    event.preventDefault();
                    previous.click();
                }
            }

            if (event.altKey && event.key === "ArrowRight") {
                const next = document.querySelector(".nav-next");

                if (next) {
                    event.preventDefault();
                    next.click();
                }
            }
        });
    }

    /* ---------------------------------------------------------
       EXTERNAL / INTERNAL LINK SAFETY
       --------------------------------------------------------- */

    function setupNavigation() {
        const links = document.querySelectorAll(
            ".page-navigation a[href]"
        );

        links.forEach(function (link) {
            link.addEventListener("click", handlePageNavigation);
        });
    }

    /* ---------------------------------------------------------
       INITIALIZATION
       --------------------------------------------------------- */

    function initPage06() {
        configureScrollRestoration();
        setupNavigation();
        setupImageFallbacks();
        setupAccessibility();
        markCurrentPage();
        setupKeyboardNavigation();
        restoreTopPosition();
        revealPage();
    }

    ready(initPage06);

    /* ---------------------------------------------------------
       PAGE LIFECYCLE
       --------------------------------------------------------- */

    window.addEventListener("pageshow", function () {
        /*
         * pageshow fires on normal loads and browser back/forward
         * cache restoration. Only force the top position when the
         * stored navigation state explicitly requested it.
         */
        try {
            const savedPosition =
                sessionStorage.getItem("ctmPathReturnScroll");

            if (savedPosition === "0") {
                sessionStorage.removeItem("ctmPathReturnScroll");
                scrollToTop();
            }
        } catch (error) {
            /* Ignore storage errors. */
        }
    });

})();
