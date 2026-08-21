/* =========================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 11 — TASKS™
   COMPLETE PAGE-SPECIFIC JAVASCRIPT
   ========================================================= */

(function () {
    "use strict";


    /* =========================================================
       PAGE GUARD
       ========================================================= */

    if (!document.body) {
        return;
    }

    if (!document.body.classList.contains("page-11")) {
        return;
    }


    /* =========================================================
       CONSTANTS
       ========================================================= */

    const STORAGE = {
        pageVisited: "ctmPathPage11Visited",
        lastAction: "ctmPathPage11LastAction",
        returnScroll: "ctmPathReturnScroll"
    };


    const SELECTORS = {
        nextButton: ".nav-next",
        previousButton: ".nav-previous",
        continueButton: ".continue-button",

        machineNodes: ".machine-node",
        taskCards: ".task-card",
        marketStats: ".market-stat",
        trialCards: ".trial-card",
        copyNodes: ".copy-node",
        scaleNodes: ".scale-node",

        revealTargets:
            ".task-card, " +
            ".war-machine-section, " +
            ".conversion-section, " +
            ".copy-section, " +
            ".synergy-section, " +
            ".hours-section, " +
            ".legacy-section, " +
            ".tasks-closing"
    };


    /* =========================================================
       UTILITY — DOM READY
       ========================================================= */

    function ready(callback) {

        if (
            document.readyState === "loading"
        ) {

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
       UTILITY — STORAGE
       ========================================================= */

    function saveState(key, value) {

        try {

            sessionStorage.setItem(
                key,
                String(value)
            );

        } catch (error) {

            /*
             * Storage may be unavailable in
             * private browsing or restricted contexts.
             */

        }
    }


    function readState(key) {

        try {

            return sessionStorage.getItem(
                key
            );

        } catch (error) {

            return null;

        }
    }


    function removeState(key) {

        try {

            sessionStorage.removeItem(
                key
            );

        } catch (error) {

            /* Ignore storage restrictions. */

        }
    }


    /* =========================================================
       SCROLL
       ========================================================= */

    function scrollTop() {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });
    }


    function configureScrollRestoration() {

        if (
            "scrollRestoration" in history
        ) {

            try {

                history.scrollRestoration =
                    "manual";

            } catch (error) {

                /* Browser does not permit modification. */

            }

        }
    }


    function forcePageTop() {

        requestAnimationFrame(
            function () {

                requestAnimationFrame(
                    function () {

                        scrollTop();

                    }
                );

            }
        );
    }


    /* =========================================================
       CACHE ELEMENTS
       ========================================================= */

    function getElements() {

        return {

            nextButton:
                document.querySelector(
                    SELECTORS.nextButton
                ),

            previousButton:
                document.querySelector(
                    SELECTORS.previousButton
                ),

            continueButton:
                document.querySelector(
                    SELECTORS.continueButton
                ),

            machineNodes:
                document.querySelectorAll(
                    SELECTORS.machineNodes
                ),

            taskCards:
                document.querySelectorAll(
                    SELECTORS.taskCards
                ),

            marketStats:
                document.querySelectorAll(
                    SELECTORS.marketStats
                ),

            trialCards:
                document.querySelectorAll(
                    SELECTORS.trialCards
                ),

            copyNodes:
                document.querySelectorAll(
                    SELECTORS.copyNodes
                ),

            scaleNodes:
                document.querySelectorAll(
                    SELECTORS.scaleNodes
                ),

            revealTargets:
                document.querySelectorAll(
                    SELECTORS.revealTargets
                )

        };
    }


    /* =========================================================
       PAGE STATE
       ========================================================= */

    function markPageVisited() {

        saveState(
            STORAGE.pageVisited,
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
                        STORAGE.lastAction,
                        "next"
                    );

                    saveState(
                        STORAGE.returnScroll,
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
                        STORAGE.lastAction,
                        "previous"
                    );

                    saveState(
                        STORAGE.returnScroll,
                        "0"
                    );

                }
            );

        }


        /*
         * Any direct HTML page navigation should
         * begin at the top of the destination page.
         */

        document
            .querySelectorAll(
                'a[href$=".html"]'
            )
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            saveState(
                                STORAGE.returnScroll,
                                "0"
                            );

                        }
                    );

                }
            );

    }


    /* =========================================================
       CONTINUE CTA
       ========================================================= */

    function setupContinueButton(elements) {

        if (!elements.continueButton) {
            return;
        }


        elements.continueButton.addEventListener(
            "click",
            function () {

                saveState(
                    STORAGE.lastAction,
                    "show-system"
                );

                saveState(
                    STORAGE.returnScroll,
                    "0"
                );


                /*
                 * Give the button a subtle tactile state.
                 */

                elements.continueButton.classList.add(
                    "is-activated"
                );


                /*
                 * Navigation is handled naturally
                 * by the href in 11.html.
                 */

            }
        );

    }


    /* =========================================================
       KEYBOARD NAVIGATION
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
                 * Never interfere with form controls.
                 */

                if (
                    tag === "input" ||
                    tag === "textarea" ||
                    tag === "select"
                ) {

                    return;

                }


                /*
                 * ALT + RIGHT
                 * Next page.
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
                 * ALT + LEFT
                 * Previous page.
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
                 * ENTER on the CTA.
                 */

                if (
                    event.key === "Enter" &&
                    active === elements.continueButton
                ) {

                    event.preventDefault();

                    elements.continueButton.click();

                }

            }
        );

    }


    /* =========================================================
       REVEAL ANIMATION
       ========================================================= */

    function setupRevealAnimation(elements) {

        const reducedMotion =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reducedMotion) {

            revealEverything(
                elements.revealTargets
            );

            return;

        }


        if (
            !("IntersectionObserver" in window)
        ) {

            revealEverything(
                elements.revealTargets
            );

            return;

        }


        elements.revealTargets.forEach(
            function (element) {

                element.classList.add(
                    "reveal-ready"
                );

            }
        );


        const observer =
            new IntersectionObserver(
                function (
                    entries,
                    observerInstance
                ) {

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
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -55px 0px"
                }
            );


        elements.revealTargets.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );

    }


    function revealEverything(elements) {

        elements.forEach(
            function (element) {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    /* =========================================================
       MACHINE NODE INTERACTION
       ========================================================= */

    function setupMachineNodes(elements) {

        elements.machineNodes.forEach(
            function (node) {

                node.setAttribute(
                    "tabindex",
                    "0"
                );


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


                node.addEventListener(
                    "focus",
                    function () {

                        node.classList.add(
                            "is-active"
                        );

                    }
                );


                node.addEventListener(
                    "blur",
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
       TASK CARD INTERACTION
       ========================================================= */

    function setupTaskCards(elements) {

        elements.taskCards.forEach(
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
       COPY FLOW
       ========================================================= */

    function setupCopyNodes(elements) {

        elements.copyNodes.forEach(
            function (node) {

                node.setAttribute(
                    "tabindex",
                    "0"
                );


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


                node.addEventListener(
                    "focus",
                    function () {

                        node.classList.add(
                            "is-active"
                        );

                    }
                );


                node.addEventListener(
                    "blur",
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
       SCALE FLOW
       ========================================================= */

    function setupScaleNodes(elements) {

        elements.scaleNodes.forEach(
            function (node) {

                node.setAttribute(
                    "tabindex",
                    "0"
                );


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
       CONVERSION MODEL
       ========================================================= */

    function setupConversionModel() {

        const conversionNumbers =
            document.querySelectorAll(
                ".conversion-number"
            );


        conversionNumbers.forEach(
            function (element) {

                element.setAttribute(
                    "tabindex",
                    "0"
                );


                element.addEventListener(
                    "mouseenter",
                    function () {

                        element.classList.add(
                            "is-active"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    function () {

                        element.classList.remove(
                            "is-active"
                        );

                    }
                );


                element.addEventListener(
                    "focus",
                    function () {

                        element.classList.add(
                            "is-active"
                        );

                    }
                );


                element.addEventListener(
                    "blur",
                    function () {

                        element.classList.remove(
                            "is-active"
                        );

                    }
                );

            }
        );

    }


    /* =========================================================
       5,000 HOURS
       ========================================================= */

    function setupHoursSection() {

        const hoursNumber =
            document.querySelector(
                ".hours-number"
            );


        if (!hoursNumber) {
            return;
        }


        hoursNumber.setAttribute(
            "aria-label",
            "5,000 hours"
        );


        hoursNumber.setAttribute(
            "data-hours",
            "5000"
        );

    }


    /* =========================================================
       DATA ATTRIBUTES
       ========================================================= */

    function setupSemanticMetrics() {

        const metricMap = [
            [
                ".hours-number",
                "commitment-hours",
                "5000"
            ],
            [
                ".conversion-number:first-child strong",
                "conversation-target",
                "10"
            ],
            [
                ".conversion-result strong",
                "customer-target",
                "3"
            ]
        ];


        metricMap.forEach(
            function (item) {

                const element =
                    document.querySelector(
                        item[0]
                    );


                if (!element) {
                    return;
                }


                element.dataset.metric =
                    item[1];

                element.dataset.value =
                    item[2];

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
                         * Support both logo filename
                         * conventions used by the project.
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

        if (elements.continueButton) {

            elements.continueButton.setAttribute(
                "aria-label",
                "Show me the system — continue to Page 12"
            );

        }


        if (elements.previousButton) {

            elements.previousButton.setAttribute(
                "aria-label",
                "Go to Page 10"
            );

        }


        if (elements.nextButton) {

            elements.nextButton.setAttribute(
                "aria-label",
                "Go to Page 12"
            );

        }


        /*
         * Decorative symbols should not be
         * announced by screen readers.
         */

        document
            .querySelectorAll(
                ".machine-arrow, " +
                ".conversion-arrow, " +
                ".copy-arrow, " +
                ".synergy-symbol, " +
                ".synergy-divider, " +
                ".legacy-flow > span, " +
                ".script-arrow, " +
                ".trial-symbol, " +
                ".scale-arrow"
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
       PAGE CURRENT MARKER
       ========================================================= */

    function setupCurrentPageMarker() {

        const marker =
            document.querySelector(
                ".nav-current"
            );


        if (marker) {

            marker.setAttribute(
                "aria-current",
                "page"
            );

        }

    }


    /* =========================================================
       PAGE SHOW
       ========================================================= */

    function setupPageShow() {

        window.addEventListener(
            "pageshow",
            function () {

                /*
                 * The guided journey should always
                 * begin a page at its top.
                 */

                forcePageTop();

            }
        );

    }


    /* =========================================================
       PREVENT HASH POSITION
       ========================================================= */

    function preventUnexpectedHashPosition() {

        if (
            window.location.hash
        ) {

            forcePageTop();

        }

    }


    /* =========================================================
       PAGE READY STATE
       ========================================================= */

    function markPageReady() {

        requestAnimationFrame(
            function () {

                document.body.classList.add(
                    "page-ready"
                );

            }
        );

    }


    /* =========================================================
       INITIALIZE
       ========================================================= */

    function initPage11() {

        configureScrollRestoration();

        const elements =
            getElements();


        markPageVisited();

        setupNavigation(
            elements
        );

        setupContinueButton(
            elements
        );

        setupKeyboardNavigation(
            elements
        );

        setupRevealAnimation(
            elements
        );

        setupMachineNodes(
            elements
        );

        setupTaskCards(
            elements
        );

        setupCopyNodes(
            elements
        );

        setupScaleNodes(
            elements
        );

        setupConversionModel();

        setupHoursSection();

        setupSemanticMetrics();

        setupImageFallbacks();

        setupAccessibility(
            elements
        );

        setupCurrentPageMarker();

        setupPageShow();

        preventUnexpectedHashPosition();

        forcePageTop();

        markPageReady();

    }


    /* =========================================================
       START
       ========================================================= */

    ready(
        initPage11
    );

})();
