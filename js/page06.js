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

        if (!link) {
            return;
        }

        const href = link.getAttribute("href");

        /*
         * Hash links are not page navigation and should retain
         * normal browser behavior.
         */
        if (!href || href.charAt(0) === "#") {
            return;
        }

        /*
         * Let normal navigation happen, but record that the
         * destination page should begin at the top.
         */
        try {
            sessionStorage.setItem(
                "ctmPathReturnScroll",
                "0"
            );
        } catch (error) {
            /*
             * Storage may be unavailable.
             * Navigation itself must continue normally.
             */
        }
    }


    /* ---------------------------------------------------------
       IMAGE FALLBACKS
       --------------------------------------------------------- */

    function setupImageFallbacks() {
        const images = document.querySelectorAll(
            "img"
        );

        images.forEach(function (image) {
            /*
             * Avoid registering the same listener twice.
             */
            if (image.dataset.p06FallbackBound === "true") {
                return;
            }

            image.dataset.p06FallbackBound = "true";

            image.addEventListener("error", function () {

                /*
                 * Prevent an infinite fallback loop.
                 */
                if (
                    image.dataset.fallbackAttempted === "true"
                ) {
                    return;
                }

                image.dataset.fallbackAttempted = "true";

                const source =
                    image.getAttribute("src") || "";

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
                    image.classList.contains(
                        "umbar-avai-logo"
                    )
                ) {
                    image.classList.add(
                        "image-unavailable"
                    );
                }
            });
        });
    }


    /* ---------------------------------------------------------
       ACCESSIBILITY
       --------------------------------------------------------- */

    function setupAccessibility() {
        const navigationLinks =
            document.querySelectorAll(
                ".page-navigation a"
            );

        navigationLinks.forEach(function (link) {
            if (!link.hasAttribute("aria-label")) {
                const text =
                    link.textContent.trim();

                if (text) {
                    link.setAttribute(
                        "aria-label",
                        text
                    );
                }
            }
        });
    }


    /* ---------------------------------------------------------
       ACTIVE PAGE NAVIGATION
       --------------------------------------------------------- */

    function markCurrentPage() {
        const current =
            document.querySelector(
                ".nav-current"
            );

        if (!current) {
            return;
        }

        current.setAttribute(
            "aria-current",
            "page"
        );
    }


    /* ---------------------------------------------------------
       PAGE VISIBILITY
       --------------------------------------------------------- */

    function revealPage() {
        page.classList.add(
            "page-ready"
        );
    }


    /* ---------------------------------------------------------
       PREVENT UNWANTED BROWSER SCROLL RESTORATION
       --------------------------------------------------------- */

    function configureScrollRestoration() {
        if ("scrollRestoration" in history) {
            try {
                history.scrollRestoration =
                    "manual";
            } catch (error) {
                /*
                 * Ignore unsupported browser behavior.
                 */
            }
        }
    }


    /* ---------------------------------------------------------
       RESTORE TOP POSITION
       --------------------------------------------------------- */

    function restoreTopPosition() {
        try {
            const savedPosition =
                sessionStorage.getItem(
                    "ctmPathReturnScroll"
                );

            if (savedPosition === "0") {
                sessionStorage.removeItem(
                    "ctmPathReturnScroll"
                );

                scrollToTop();

                return;
            }
        } catch (error) {
            /*
             * Ignore storage errors.
             */
        }

        /*
         * A second frame catches browsers that apply their
         * own restoration after DOMContentLoaded.
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

        if (
            document.documentElement.dataset
                .p06KeyboardNavigationBound === "true"
        ) {
            return;
        }

        document.documentElement.dataset
            .p06KeyboardNavigationBound = "true";

        document.addEventListener(
            "keydown",
            function (event) {

                /*
                 * Alt + Left  = Previous page
                 * Alt + Right = Next page
                 *
                 * Do not interfere with keyboard interaction
                 * inside form controls.
                 */
                const activeElement =
                    document.activeElement;

                const tagName =
                    activeElement
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

                if (
                    event.altKey &&
                    event.key === "ArrowLeft"
                ) {
                    const previous =
                        document.querySelector(
                            ".nav-previous"
                        );

                    if (previous) {
                        event.preventDefault();
                        previous.click();
                    }

                    return;
                }

                if (
                    event.altKey &&
                    event.key === "ArrowRight"
                ) {
                    const next =
                        document.querySelector(
                            ".nav-next"
                        );

                    if (next) {
                        event.preventDefault();
                        next.click();
                    }
                }
            }
        );
    }


    /* ---------------------------------------------------------
       PAGE NAVIGATION
       --------------------------------------------------------- */

    function setupNavigation() {
        const links =
            document.querySelectorAll(
                ".page-navigation a[href]"
            );

        links.forEach(function (link) {

            /*
             * Defensive guard against duplicate listeners.
             */
            if (
                link.dataset.p06NavigationBound ===
                "true"
            ) {
                return;
            }

            link.dataset.p06NavigationBound =
                "true";

            link.addEventListener(
                "click",
                handlePageNavigation
            );
        });
    }


    /* ---------------------------------------------------------
       IMAGE LOADING
       Defensive handling to reduce visible layout
       changes caused by late-loading images.
       --------------------------------------------------------- */

    function setupImageLoading() {
        const images =
            document.querySelectorAll(
                "img"
            );

        images.forEach(function (image) {

            /*
             * The CSS already controls the principal image
             * dimensions. This only adds a safe decoding hint
             * where supported and does not alter the layout.
             */
            try {
                image.decoding = "async";
            } catch (error) {
                /*
                 * Ignore browsers that do not expose
                 * the decoding property.
                 */
            }
        });
    }


    /* ---------------------------------------------------------
       INITIALIZATION
       --------------------------------------------------------- */

    function initPage06() {
        configureScrollRestoration();

        setupNavigation();

        setupImageFallbacks();

        setupImageLoading();

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

    window.addEventListener(
        "pageshow",
        function () {

            /*
             * pageshow fires on normal loads and browser
             * back/forward cache restoration.
             *
             * Only force the top position when the stored
             * navigation state explicitly requested it.
             */
            try {
                const savedPosition =
                    sessionStorage.getItem(
                        "ctmPathReturnScroll"
                    );

                if (savedPosition === "0") {
                    sessionStorage.removeItem(
                        "ctmPathReturnScroll"
                    );

                    scrollToTop();
                }
            } catch (error) {
                /*
                 * Ignore storage errors.
                 */
            }
        }
    );


    /* ---------------------------------------------------------
       REDUCED MOTION SAFETY
       --------------------------------------------------------- */

    const reducedMotionQuery =
        window.matchMedia
            ? window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            )
            : null;

    if (reducedMotionQuery) {
        page.dataset.reducedMotion =
            reducedMotionQuery.matches
                ? "true"
                : "false";

        const handleMotionPreferenceChange =
            function (event) {
                page.dataset.reducedMotion =
                    event.matches
                        ? "true"
                        : "false";
            };

        /*
         * Modern browsers.
         */
        if (
            typeof reducedMotionQuery.addEventListener ===
            "function"
        ) {
            reducedMotionQuery.addEventListener(
                "change",
                handleMotionPreferenceChange
            );
        }
        /*
         * Older browsers.
         */
        else if (
            typeof reducedMotionQuery.addListener ===
            "function"
        ) {
            reducedMotionQuery.addListener(
                handleMotionPreferenceChange
            );
        }
    }

})();
