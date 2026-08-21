/* =========================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 12 — CTM™
   CASHFLOW • TRIBE • MACHINE

   Complete replacement:
   js/page12.js
   ========================================================= */

(function () {
    "use strict";


    /* =========================================================
       PAGE GUARD
       ========================================================= */

    function init() {

        if (!document.body) {
            return;
        }

        if (!document.body.classList.contains("page-12")) {
            return;
        }


        /* -----------------------------------------------------
           DOM REFERENCES
           ----------------------------------------------------- */

        const elements = {

            ctmHero:
                document.querySelector(".ctm-hero"),

            ctmComponents:
                document.querySelectorAll(".ctm-component"),

            flowNodes:
                document.querySelectorAll(".flow-node"),

            tribePeople:
                document.querySelectorAll(".tribe-person"),

            machineNodes:
                document.querySelectorAll(".machine-node"),

            flywheelSection:
                document.querySelector(".ctm-flywheel-section"),

            flywheel:
                document.querySelector(".ctm-flywheel"),

            flywheelNodes:
                document.querySelectorAll(".flywheel-node"),

            moneySteps:
                document.querySelectorAll(".money-step"),

            onlinePeople:
                document.querySelectorAll(".online-person"),

            onlineGrowth:
                document.querySelectorAll(".online-growth"),

            equationCards:
                document.querySelectorAll(".equation-card"),

            finalQuestions:
                document.querySelectorAll(".final-question"),

            finalPunch:
                document.querySelector(".final-punch"),

            cta:
                document.querySelector(".ctm-cta"),

            previousButton:
                document.querySelector(".nav-previous"),

            nextButton:
                document.querySelector(".nav-next"),

            navCurrent:
                document.querySelector(".nav-current")

        };


        /* -----------------------------------------------------
           INITIAL PAGE STATE
           ----------------------------------------------------- */

        document.body.classList.add("page12-initialized");

        setupHistory();

        setupNavigation(
            elements
        );

        setupRevealSystem(
            elements
        );

        setupInteractiveNodes(
            elements
        );

        setupFlywheel(
            elements
        );

        setupNetworkPulse(
            elements
        );

        setupCTA(
            elements
        );

        setupAccessibility(
            elements
        );

        setupPageMarker(
            elements
        );

        setupImageFallback();

        forcePageTop();

        document.body.classList.add("page-ready");

    }


    /* =========================================================
       HISTORY / SCROLL CONTROL
       ========================================================= */

    function setupHistory() {

        try {

            if ("scrollRestoration" in history) {
                history.scrollRestoration = "manual";
            }

        } catch (error) {
            /* Ignore browser restrictions. */
        }


        window.addEventListener(
            "pageshow",
            function () {

                forcePageTop();

            }
        );


        window.addEventListener(
            "load",
            function () {

                forcePageTop();

            }
        );

    }


    function forcePageTop() {

        /*
         * Page 12 is part of a guided journey.
         * Every page entry should begin at the top.
         */

        window.scrollTo(
            0,
            0
        );

        requestAnimationFrame(
            function () {

                window.scrollTo(
                    0,
                    0
                );

            }
        );

    }


    /* =========================================================
       NAVIGATION
       ========================================================= */

    function setupNavigation(elements) {

        if (elements.previousButton) {

            elements.previousButton.addEventListener(
                "click",
                function () {

                    savePageState(
                        "page12-navigation",
                        "previous"
                    );

                }
            );

        }


        if (elements.nextButton) {

            elements.nextButton.addEventListener(
                "click",
                function () {

                    savePageState(
                        "page12-navigation",
                        "next"
                    );

                }
            );

        }


        /*
         * Any direct page-to-page navigation should
         * start the destination at its top.
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

                            try {

                                sessionStorage.setItem(
                                    "ctmPathReturnScroll",
                                    "0"
                                );

                            } catch (error) {
                                /* Ignore storage errors. */
                            }

                        }
                    );

                }
            );

    }


    /* =========================================================
       REVEAL SYSTEM
       ========================================================= */

    function setupRevealSystem(elements) {

        const revealElements = [];


        /*
         * Main sections.
         */

        elements.ctmComponents.forEach(
            function (element) {

                revealElements.push(
                    element
                );

            }
        );


        /*
         * Other major sections.
         */

        [
            ".ctm-flywheel-section",
            ".money-flow-section",
            ".online-tribe-section",
            ".people-machine-section",
            ".simple-equation-section",
            ".ctm-final-section"
        ]
            .forEach(
                function (selector) {

                    const element =
                        document.querySelector(
                            selector
                        );

                    if (element) {
                        revealElements.push(
                            element
                        );
                    }

                }
            );


        /*
         * Do not animate if user prefers
         * reduced motion.
         */

        const reducedMotion =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (
            reducedMotion ||
            !("IntersectionObserver" in window)
        ) {

            revealElements.forEach(
                function (element) {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

            return;

        }


        revealElements.forEach(
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
                        "0px 0px -70px 0px"
                }
            );


        revealElements.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );

    }


    /* =========================================================
       INTERACTIVE NODES
       ========================================================= */

    function setupInteractiveNodes(elements) {

        setupNodeCollection(
            elements.flowNodes
        );

        setupNodeCollection(
            elements.tribePeople
        );

        setupNodeCollection(
            elements.machineNodes
        );

        setupNodeCollection(
            elements.moneySteps
        );

        setupNodeCollection(
            elements.onlinePeople
        );

        setupNodeCollection(
            elements.onlineGrowth
        );

        setupNodeCollection(
            elements.equationCards
        );

        setupNodeCollection(
            elements.flywheelNodes
        );

    }


    function setupNodeCollection(
        collection
    ) {

        if (!collection || !collection.length) {
            return;
        }


        collection.forEach(
            function (element, index) {

                /*
                 * Make non-button visual nodes
                 * keyboard accessible.
                 */

                if (
                    element.tagName !== "A" &&
                    element.tagName !== "BUTTON"
                ) {

                    element.setAttribute(
                        "tabindex",
                        "0"
                    );

                }


                /*
                 * Mouse interaction.
                 */

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


                /*
                 * Keyboard interaction.
                 */

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


                /*
                 * Sequential delay used by optional
                 * CSS animation hooks.
                 */

                element.style.setProperty(
                    "--node-index",
                    index
                );

            }
        );

    }


    /* =========================================================
       FLYWHEEL
       ========================================================= */

    function setupFlywheel(elements) {

        if (!elements.flywheel) {
            return;
        }


        /*
         * Activate the flywheel when it enters
         * the viewport.
         */

        if (
            "IntersectionObserver" in window
        ) {

            const observer =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    elements.flywheel.classList.add(
                                        "is-running"
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.25
                    }
                );


            observer.observe(
                elements.flywheel
            );

        } else {

            elements.flywheel.classList.add(
                "is-running"
            );

        }


        /*
         * Highlight the corresponding CTM
         * component when a flywheel node
         * receives focus.
         */

        elements.flywheelNodes.forEach(
            function (node) {

                node.addEventListener(
                    "focus",
                    function () {

                        const isCashflow =
                            node.classList.contains(
                                "flywheel-c"
                            );

                        const isTribe =
                            node.classList.contains(
                                "flywheel-t"
                            );

                        const isMachine =
                            node.classList.contains(
                                "flywheel-m"
                            );


                        elements.ctmComponents
                            .forEach(
                                function (component) {

                                    component.classList.remove(
                                        "ctm-focus"
                                    );

                                }
                            );


                        if (isCashflow) {

                            highlightComponent(
                                "cashflow-section"
                            );

                        }


                        if (isTribe) {

                            highlightComponent(
                                "tribe-section"
                            );

                        }


                        if (isMachine) {

                            highlightComponent(
                                "machine-section"
                            );

                        }

                    }
                );

            }
        );

    }


    function highlightComponent(
        className
    ) {

        const component =
            document.querySelector(
                "." + className
            );


        if (!component) {
            return;
        }


        component.classList.add(
            "ctm-focus"
        );


        window.setTimeout(
            function () {

                component.classList.remove(
                    "ctm-focus"
                );

            },
            1400
        );

    }


    /* =========================================================
       NETWORK PULSE
       ========================================================= */

    function setupNetworkPulse(elements) {

        const reducedMotion =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reducedMotion) {
            return;
        }


        /*
         * Tribe network.
         */

        if (
            elements.tribePeople &&
            elements.tribePeople.length
        ) {

            startSequentialPulse(
                elements.tribePeople,
                1000
            );

        }


        /*
         * Online tribe network.
         */

        if (
            elements.onlinePeople &&
            elements.onlinePeople.length
        ) {

            startSequentialPulse(
                elements.onlinePeople,
                1200
            );

        }


        if (
            elements.onlineGrowth &&
            elements.onlineGrowth.length
        ) {

            startSequentialPulse(
                elements.onlineGrowth,
                1500
            );

        }

    }


    function startSequentialPulse(
        collection,
        interval
    ) {

        let index = 0;


        window.setInterval(
            function () {

                collection.forEach(
                    function (element) {

                        element.classList.remove(
                            "network-pulse"
                        );

                    }
                );


                const current =
                    collection[index];


                if (current) {

                    current.classList.add(
                        "network-pulse"
                    );

                }


                index =
                    (index + 1) %
                    collection.length;

            },
            interval
        );

    }


    /* =========================================================
       CTA
       ========================================================= */

    function setupCTA(elements) {

        if (!elements.cta) {
            return;
        }


        elements.cta.addEventListener(
            "click",
            function () {

                savePageState(
                    "page12-cta",
                    "show-digital-system"
                );


                elements.cta.classList.add(
                    "is-activated"
                );

            }
        );


        elements.cta.addEventListener(
            "mouseenter",
            function () {

                elements.cta.classList.add(
                    "is-hovered"
                );

            }
        );


        elements.cta.addEventListener(
            "mouseleave",
            function () {

                elements.cta.classList.remove(
                    "is-hovered"
                );

            }
        );

    }


    /* =========================================================
       ACCESSIBILITY
       ========================================================= */

    function setupAccessibility(elements) {

        /*
         * Decorative symbols.
         */

        const decorativeSelectors = [
            ".global-divider span",
            ".ctm-separator",
            ".flow-arrow",
            ".machine-arrow",
            ".flywheel-arrow",
            ".pm-symbol",
            ".equation-symbol",
            ".money-arrow",
            ".flow-loop span",
            ".infinity-symbol",
            ".online-infinity",
            ".final-glow"
        ];


        decorativeSelectors.forEach(
            function (selector) {

                document
                    .querySelectorAll(
                        selector
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
        );


        /*
         * CTA.
         */

        if (elements.cta) {

            elements.cta.setAttribute(
                "aria-label",
                "Yes. Show me the CTM simple digital system"
            );

        }


        /*
         * Navigation.
         */

        if (elements.previousButton) {

            elements.previousButton.setAttribute(
                "aria-label",
                "Go back to Page 11"
            );

        }


        if (elements.nextButton) {

            elements.nextButton.setAttribute(
                "aria-label",
                "Continue to Page 13"
            );

        }

    }


    /* =========================================================
       PAGE NUMBER
       ========================================================= */

    function setupPageMarker(elements) {

        if (!elements.navCurrent) {
            return;
        }


        elements.navCurrent.setAttribute(
            "aria-current",
            "page"
        );


        elements.navCurrent.dataset.page =
            "12";

    }


    /* =========================================================
       IMAGE FALLBACK
       ========================================================= */

    function setupImageFallback() {

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
                         * Do not repeatedly retry
                         * a broken image.
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
                         * Support the logo filename
                         * convention used elsewhere
                         * in the project.
                         */

                        if (
                            source ===
                            "assets/ctmmtptlogo.svg"
                        ) {

                            image.src =
                                "assets/CTMMTPLogo.svg";

                        }

                    }
                );

            }
        );

    }


    /* =========================================================
       STATE
       ========================================================= */

    function savePageState(
        key,
        value
    ) {

        try {

            sessionStorage.setItem(
                key,
                value
            );

        } catch (error) {

            /*
             * Storage is optional.
             * The page continues normally.
             */

        }

    }


    /* =========================================================
       KEYBOARD PAGE NAVIGATION
       ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            /*
             * Do not hijack keyboard input
             * while the user is typing.
             */

            const target =
                event.target;


            if (
                target &&
                (
                    target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.tagName === "SELECT"
                )
            ) {

                return;

            }


            /*
             * ALT + LEFT
             * Previous page.
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
             * Next page.
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


    /* =========================================================
       INITIALIZATION
       ========================================================= */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );

    } else {

        init();

    }

})();
