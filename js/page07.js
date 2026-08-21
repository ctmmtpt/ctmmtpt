/* =========================================================
   CTM PATH™ MILLIONAIRES™ — PAGE 07
   COMPLETE PAGE-SPECIFIC JAVASCRIPT
   THE FOUR LIFE CURRENCIES™
   MONEY • TIME • PEOPLE • TASKS
   ========================================================= */

(function () {
    "use strict";

    /* ---------------------------------------------------------
       PAGE GUARD
       --------------------------------------------------------- */

    const page = document.body;

    if (!page || !page.classList.contains("page-07")) {
        return;
    }


    /* ---------------------------------------------------------
       DOM READY
       --------------------------------------------------------- */

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener(
                "DOMContentLoaded",
                callback,
                { once: true }
            );
        } else {
            callback();
        }
    }


    /* ---------------------------------------------------------
       SCROLL TO TOP
       --------------------------------------------------------- */

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });
    }


    /* ---------------------------------------------------------
       BROWSER SCROLL RESTORATION
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
       PAGE NAVIGATION
       --------------------------------------------------------- */

    function setupNavigation() {

        const links = document.querySelectorAll(
            ".page-navigation a[href]"
        );

        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    const href =
                        link.getAttribute("href");

                    if (
                        !href ||
                        href.charAt(0) === "#"
                    ) {
                        return;
                    }

                    try {
                        sessionStorage.setItem(
                            "ctmPathReturnScroll",
                            "0"
                        );
                    } catch (error) {
                        /* Navigation still works. */
                    }
                }
            );
        });
    }


    /* ---------------------------------------------------------
       RESTORE PAGE POSITION
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
            /* Ignore storage errors. */
        }


        /*
         * Prevent browsers from restoring Page 07 halfway down
         * when navigating back from another page.
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
       ACTIVE PAGE
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
       ACCESSIBILITY
       --------------------------------------------------------- */

    function setupAccessibility() {

        const links =
            document.querySelectorAll(
                ".page-navigation a"
            );

        links.forEach(function (link) {

            if (
                !link.hasAttribute(
                    "aria-label"
                )
            ) {

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
       KEYBOARD PAGE NAVIGATION
       --------------------------------------------------------- */

    function setupKeyboardNavigation() {

        document.addEventListener(
            "keydown",
            function (event) {

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


                /*
                 * ALT + LEFT
                 * Previous page
                 */

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
                }


                /*
                 * ALT + RIGHT
                 * Next page
                 */

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
       CURRENCY CARD INTERACTION
       --------------------------------------------------------- */

    function setupCurrencyCards() {

        const cards =
            document.querySelectorAll(
                ".currency-card"
            );

        cards.forEach(function (card) {

            card.setAttribute(
                "tabindex",
                "0"
            );

            card.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter" ||
                        event.key === " "
                    ) {

                        event.preventDefault();

                        card.classList.toggle(
                            "is-focused"
                        );
                    }

                }
            );

        });
    }


    /* ---------------------------------------------------------
       IMAGE ERROR HANDLING
       --------------------------------------------------------- */

    function setupImageFallbacks() {

        const images =
            document.querySelectorAll(
                "img"
            );

        images.forEach(function (image) {

            image.addEventListener(
                "error",
                function () {

                    if (
                        image.dataset
                            .fallbackAttempted === "true"
                    ) {
                        return;
                    }

                    image.dataset
                        .fallbackAttempted = "true";


                    const source =
                        image.getAttribute(
                            "src"
                        ) || "";


                    /*
                     * Support both possible CTM logo
                     * filename capitalizations.
                     */

                    if (
                        source ===
                            "assets/ctmmtptlogo.svg" ||
                        source ===
                            "assets/CTMMTPLogo.svg"
                    ) {

                        image.src =
                            source ===
                                "assets/ctmmtptlogo.svg"
                                ? "assets/CTMMTPLogo.svg"
                                : "assets/ctmmtptlogo.svg";

                    }

                }
            );

        });
    }


    /* ---------------------------------------------------------
       PAGE READY STATE
       --------------------------------------------------------- */

    function revealPage() {

        page.classList.add(
            "page-ready"
        );
    }


    /* ---------------------------------------------------------
       INITIALIZATION
       --------------------------------------------------------- */

    function initPage07() {

        configureScrollRestoration();

        setupNavigation();

        setupAccessibility();

        markCurrentPage();

        setupKeyboardNavigation();

        setupCurrencyCards();

        setupImageFallbacks();

        restoreTopPosition();

        revealPage();
    }


    /* ---------------------------------------------------------
       START
       --------------------------------------------------------- */

    ready(initPage07);


    /* ---------------------------------------------------------
       BROWSER BACK / FORWARD
       --------------------------------------------------------- */

    window.addEventListener(
        "pageshow",
        function () {

            try {

                const savedPosition =
                    sessionStorage.getItem(
                        "ctmPathReturnScroll"
                    );

                if (
                    savedPosition === "0"
                ) {

                    sessionStorage.removeItem(
                        "ctmPathReturnScroll"
                    );

                    scrollToTop();
                }

            } catch (error) {
                /* Ignore storage errors. */
            }

        }
    );

})();
