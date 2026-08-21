/* =========================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 10 — PEOPLE™ / THE CUSTOMER BASE™
   COMPLETE PAGE-SPECIFIC JAVASCRIPT
   ========================================================= */

(function () {
    "use strict";


    /* =========================================================
       PAGE GUARD
       ========================================================= */

    const body = document.body;

    if (!body || !body.classList.contains("page-10")) {
        return;
    }


    /* =========================================================
       CONFIGURATION
       ========================================================= */

    const STORAGE_KEYS = {
        page10Visited: "ctmPathPage10Visited",
        page10Action: "ctmPathPage10Action"
    };


    /* =========================================================
       DOM READY
       ========================================================= */

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


    /* =========================================================
       SCROLL CONTROL
       ========================================================= */

    function scrollToTop() {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });
    }


    function configureScrollRestoration() {

        if ("scrollRestoration" in history) {

            try {
                history.scrollRestoration = "manual";
            } catch (error) {
                /* Ignore browser limitations. */
            }
        }
    }


    /* =========================================================
       PAGE ELEMENTS
       ========================================================= */

    function cacheElements() {

        return {

            howButton:
                document.querySelector(
                    '[data-action="show-how"]'
                ),

            nextButton:
                document.querySelector(
                    ".nav-next"
                ),

            previousButton:
                document.querySelector(
                    ".nav-previous"
                ),

            systemNodes:
                document.querySelectorAll(
                    ".system-node"
                ),

            marketStats:
                document.querySelectorAll(
                    ".market-stat"
                ),

            trialCards:
                document.querySelectorAll(
                    ".trial-card"
                ),

            scaleNodes:
                document.querySelectorAll(
                    ".scale-node"
                )

        };
    }


    /* =========================================================
       SESSION STORAGE
       ========================================================= */

    function saveState(key, value) {

        try {

            sessionStorage.setItem(
                key,
                value
            );

        } catch (error) {

            /*
             * Session storage may be disabled.
             * The page remains fully functional.
             */

        }
    }


    function getState(key) {

        try {

            return sessionStorage.getItem(
                key
            );

        } catch (error) {

            return null;

        }
    }


    /* =========================================================
       MARK PAGE AS VISITED
       ========================================================= */

    function markPageVisited() {

        saveState(
            STORAGE_KEYS.page10Visited,
            "true"
        );
    }


    /* =========================================================
       NAVIGATION
       ========================================================= */

    function setupNavigation(elements) {

        if (elements.nextButton) {

            elements.nextButton.addEventListener(
                "click",
                function () {

                    saveState(
                        STORAGE_KEYS.page10Visited,
                        "true"
                    );

                    saveState(
                        "ctmPathReturnScroll",
                        "0"
                    );

                }
            );
        }


        if (elements.previousButton) {

            elements.previousButton.addEventListener(
                "click",
                function () {

                    saveState(
                        "ctmPathReturnScroll",
                        "0"
                    );

                }
            );
        }


        /*
         * Any internal page link should begin
         * the destination at the top.
         */

        const pageLinks =
            document.querySelectorAll(
                "a[href$='.html']"
            );


        pageLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        saveState(
                            "ctmPathReturnScroll",
                            "0"
                        );

                    }
                );

            }
        );
    }


    /* =========================================================
       RESTORE SCROLL POSITION
       ========================================================= */

    function restoreScrollPosition() {

        const returnPosition =
            getState(
                "ctmPathReturnScroll"
            );


        if (returnPosition === "0") {

            try {

                sessionStorage.removeItem(
                    "ctmPathReturnScroll"
                );

            } catch (error) {
                /* Ignore storage limitations. */
            }

            scrollToTop();

            return;
        }


        /*
         * Always open Page 10 from the top.
         */

        requestAnimationFrame(
            function () {

                requestAnimationFrame(
                    function () {

                        scrollToTop();

                    }
                );

            }
        );
    }


    /* =========================================================
       HOW BUTTON
       ========================================================= */

    function setupHowButton(elements) {

        if (!elements.howButton) {
            return;
        }


        elements.howButton.addEventListener(
            "click",
            function () {

                /*
                 * Record the participant's expression
                 * of interest.
                 */

                saveState(
                    STORAGE_KEYS.page10Action,
                    "show-how"
                );


                /*
                 * Add a temporary visual state.
                 */

                elements.howButton.classList.add(
                    "is-activated"
                );


                /*
                 * If Page 11 exists, continue the journey.
                 * Otherwise gracefully fall back to the
                 * Page 11 navigation button.
                 */

                const page11 =
                    "11.html";


                setTimeout(
                    function () {

                        window.location.href =
                            page11;

                    },
                    220
                );

            }
        );
    }


    /* =========================================================
       KEYBOARD ACCESS
       ========================================================= */

    function setupKeyboardNavigation(elements) {

        document.addEventListener(
            "keydown",
            function (event) {

                const active =
                    document.activeElement;


                const tag =
                    active
                        ? active.tagName.toLowerCase()
                        : "";


                /*
                 * Do not intercept keyboard commands
                 * while the user is typing.
                 */

                if (
                    tag === "input" ||
                    tag === "textarea" ||
                    tag === "select"
                ) {

                    return;

                }


                /*
                 * ALT + RIGHT → next page
                 */

                if (
                    event.altKey &&
                    event.key === "ArrowRight"
                ) {

                    if (
                        elements.nextButton
                    ) {

                        event.preventDefault();

                        elements.nextButton.click();

                    }

                }


                /*
                 * ALT + LEFT → previous page
                 */

                if (
                    event.altKey &&
                    event.key === "ArrowLeft"
                ) {

                    if (
                        elements.previousButton
                    ) {

                        event.preventDefault();

                        elements.previousButton.click();

                    }

                }


                /*
                 * ENTER / SPACE on focused CTA.
                 */

                if (
                    (
                        event.key === "Enter" ||
                        event.key === " "
                    ) &&
                    document.activeElement ===
                        elements.howButton
                ) {

                    event.preventDefault();

                    elements.howButton.click();

                }

            }
        );
    }


    /* =========================================================
       INTERSECTION OBSERVER
       ========================================================= */

    function setupRevealAnimations(elements) {

        /*
         * Respect users who have requested reduced motion.
         */

        const reducedMotion =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reducedMotion) {

            revealImmediately();

            return;

        }


        if (
            !("IntersectionObserver" in window)
        ) {

            revealImmediately();

            return;

        }


        const revealTargets = [];


        /*
         * Hero sections.
         */

        document
            .querySelectorAll(
                ".revenue-section, " +
                ".customer-system-section, " +
                ".market-section, " +
                ".digital-system-section, " +
                ".trial-section, " +
                ".scale-section, " +
                ".people-closing"
            )
            .forEach(
                function (element) {

                    revealTargets.push(
                        element
                    );

                }
            );


        /*
         * Individual visual cards.
         */

        elements.systemNodes.forEach(
            function (element) {

                revealTargets.push(
                    element
                );

            }
        );


        elements.marketStats.forEach(
            function (element) {

                revealTargets.push(
                    element
                );

            }
        );


        elements.trialCards.forEach(
            function (element) {

                revealTargets.push(
                    element
                );

            }
        );


        elements.scaleNodes.forEach(
            function (element) {

                revealTargets.push(
                    element
                );

            }
        );


        revealTargets.forEach(
            function (element) {

                element.classList.add(
                    "reveal-ready"
                );

            }
        );


        const observer =
            new IntersectionObserver(
                function (entries, observerInstance) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            entry.target.classList.add(
                                "is-visible"
                            );


                            observerInstance.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.14,
                    rootMargin:
                        "0px 0px -45px 0px"
                }
            );


        revealTargets.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );
    }


    /* =========================================================
       FALLBACK REVEAL
       ========================================================= */

    function revealImmediately() {

        document
            .querySelectorAll(
                ".reveal-ready"
            )
            .forEach(
                function (element) {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );
    }


    /* =========================================================
       NUMBER EMPHASIS
       ========================================================= */

    function setupNumberEmphasis(elements) {

        /*
         * Add semantic data attributes to the key
         * numerical statements so CSS/analytics can
         * identify them consistently.
         */

        const revenue =
            document.querySelector(
                ".revenue-number"
            );


        if (revenue) {

            revenue.dataset.metric =
                "monthly-revenue-potential";

        }


        const customerNumber =
            document.querySelector(
                ".revenue-question-card strong"
            );


        if (customerNumber) {

            customerNumber.dataset.metric =
                "target-customer-base";

        }


        const trialCustomer =
            document.querySelector(
                ".trial-card:first-child strong"
            );


        if (trialCustomer) {

            trialCustomer.dataset.metric =
                "trial-customer-base";

        }


        const trialDays =
            document.querySelector(
                ".trial-card:nth-child(3) strong"
            );


        if (trialDays) {

            trialDays.dataset.metric =
                "trial-duration";

        }


        const trialRevenue =
            document.querySelector(
                ".trial-card-income strong"
            );


        if (trialRevenue) {

            trialRevenue.dataset.metric =
                "trial-revenue-target";

        }
    }


    /* =========================================================
       MARKET STAT INTERACTION
       ========================================================= */

    function setupMarketInteraction(elements) {

        elements.marketStats.forEach(
            function (stat) {

                stat.setAttribute(
                    "tabindex",
                    "0"
                );


                stat.addEventListener(
                    "focus",
                    function () {

                        stat.classList.add(
                            "is-focused"
                        );

                    }
                );


                stat.addEventListener(
                    "blur",
                    function () {

                        stat.classList.remove(
                            "is-focused"
                        );

                    }
                );


                stat.addEventListener(
                    "mouseenter",
                    function () {

                        stat.classList.add(
                            "is-hovered"
                        );

                    }
                );


                stat.addEventListener(
                    "mouseleave",
                    function () {

                        stat.classList.remove(
                            "is-hovered"
                        );

                    }
                );

            }
        );
    }


    /* =========================================================
       TRIAL CARD INTERACTION
       ========================================================= */

    function setupTrialInteraction(elements) {

        elements.trialCards.forEach(
            function (card) {

                card.setAttribute(
                    "tabindex",
                    "0"
                );


                card.addEventListener(
                    "focus",
                    function () {

                        card.classList.add(
                            "is-focused"
                        );

                    }
                );


                card.addEventListener(
                    "blur",
                    function () {

                        card.classList.remove(
                            "is-focused"
                        );

                    }
                );

            }
        );
    }


    /* =========================================================
       SYSTEM FLOW INTERACTION
       ========================================================= */

    function setupSystemFlow(elements) {

        elements.systemNodes.forEach(
            function (node) {

                node.addEventListener(
                    "mouseenter",
                    function () {

                        node.classList.add(
                            "is-active"
                        );

                    }
                );


                node.addEventListener(
                    "mouseleave",
                    function () {

                        node.classList.remove(
                            "is-active"
                        );

                    }
                );

            }
        );
    }


    /* =========================================================
       SCALE FLOW INTERACTION
       ========================================================= */

    function setupScaleFlow(elements) {

        elements.scaleNodes.forEach(
            function (node) {

                node.addEventListener(
                    "mouseenter",
                    function () {

                        node.classList.add(
                            "is-active"
                        );

                    }
                );


                node.addEventListener(
                    "mouseleave",
                    function () {

                        node.classList.remove(
                            "is-active"
                        );

                    }
                );

            }
        );
    }


    /* =========================================================
       IMAGE FALLBACK
       ========================================================= */

    function setupImageFallbacks() {

        const images =
            document.querySelectorAll(
                "img"
            );


        images.forEach(
            function (image) {

                image.addEventListener(
                    "error",
                    function () {

                        /*
                         * Prevent an endless fallback loop.
                         */

                        if (
                            image.dataset
                                .fallbackAttempted ===
                            "true"
                        ) {

                            return;

                        }


                        image.dataset
                            .fallbackAttempted =
                            "true";


                        const source =
                            image.getAttribute(
                                "src"
                            ) || "";


                        /*
                         * Support the two common CTM
                         * logo filename variants used
                         * elsewhere in the journey.
                         */

                        if (
                            source ===
                            "assets/ctmmtptlogo.svg"
                        ) {

                            image.src =
                                "assets/CTMMTPLogo.svg";

                        } else if (
                            source ===
                            "assets/CTMMTPLogo.svg"
                        ) {

                            image.src =
                                "assets/ctmmtptlogo.svg";

                        }

                    }
                );

            }
        );
    }


    /* =========================================================
       ACCESSIBILITY
       ========================================================= */

    function setupAccessibility(elements) {

        /*
         * CTA.
         */

        if (elements.howButton) {

            elements.howButton.setAttribute(
                "aria-label",
                "Yes — show me how"
            );

        }


        /*
         * Page navigation.
         */

        if (elements.previousButton) {

            elements.previousButton.setAttribute(
                "aria-label",
                "Go to Page 09"
            );

        }


        if (elements.nextButton) {

            elements.nextButton.setAttribute(
                "aria-label",
                "Go to Page 11"
            );

        }


        /*
         * Make decorative arrows inaccessible
         * to screen readers where appropriate.
         */

        document
            .querySelectorAll(
                ".system-arrow, " +
                ".trial-symbol, " +
                ".scale-arrow, " +
                ".question-divider"
            )
            .forEach(
                function (element) {

                    element.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }
            );
    }


    /* =========================================================
       CURRENT PAGE MARKER
       ========================================================= */

    function markCurrentPage() {

        const current =
            document.querySelector(
                ".nav-current"
            );


        if (current) {

            current.setAttribute(
                "aria-current",
                "page"
            );

        }
    }


    /* =========================================================
       PAGE READY
       ========================================================= */

    function markPageReady() {

        requestAnimationFrame(
            function () {

                body.classList.add(
                    "page-ready"
                );

            }
        );
    }


    /* =========================================================
       BROWSER PAGESHOW
       ========================================================= */

    function setupPageShow() {

        window.addEventListener(
            "pageshow",
            function () {

                restoreScrollPosition();

            }
        );
    }


    /* =========================================================
       PREVENT HASH SCROLL
       ========================================================= */

    function preventUnexpectedHashScroll() {

        if (
            window.location.hash
        ) {

            /*
             * Page 10 is designed as a guided
             * full-page journey. Ignore accidental
             * browser hash restoration.
             */

            requestAnimationFrame(
                function () {

                    scrollToTop();

                }
            );

        }
    }


    /* =========================================================
       INITIALIZE
       ========================================================= */

    function initPage10() {

        configureScrollRestoration();

        const elements =
            cacheElements();


        markPageVisited();

        markCurrentPage();

        setupNavigation(
            elements
        );

        setupHowButton(
            elements
        );

        setupKeyboardNavigation(
            elements
        );

        setupRevealAnimations(
            elements
        );

        setupNumberEmphasis(
            elements
        );

        setupMarketInteraction(
            elements
        );

        setupTrialInteraction(
            elements
        );

        setupSystemFlow(
            elements
        );

        setupScaleFlow(
            elements
        );

        setupImageFallbacks();

        setupAccessibility(
            elements
        );

        setupPageShow();

        preventUnexpectedHashScroll();

        restoreScrollPosition();

        markPageReady();
    }


    /* =========================================================
       START
       ========================================================= */

    ready(
        initPage10
    );

})();
