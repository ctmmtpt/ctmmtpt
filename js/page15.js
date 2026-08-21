/* =========================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 15 — BUILD YOUR CUSTOMER BASE™
   Complete replacement
   js/page15.js
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       PAGE INITIALIZATION
       ===================================================== */

    function initPage15() {

        if (!document.body) {
            return;
        }

        if (!document.body.classList.contains("page-15")) {
            return;
        }

        setupPageState();

        setupScrollRestoration();

        setupRevealAnimations();

        setupGrowthCards();

        setupTransformationCards();

        setupCustomerTarget();

        setupNavigation();

        setupKeyboardNavigation();

        setupAccessibility();

        setupLogoFallback();

        document.body.classList.add("page15-ready");

    }


    /* =====================================================
       PAGE STATE
       ===================================================== */

    function setupPageState() {

        document.body.dataset.page = "15";

        document.body.classList.add(
            "page-ready"
        );

    }


    /* =====================================================
       SCROLL RESTORATION
       ===================================================== */

    function setupScrollRestoration() {

        try {

            if ("scrollRestoration" in history) {
                history.scrollRestoration = "manual";
            }

        } catch (error) {
            // Browser may not support scrollRestoration.
        }


        window.addEventListener(
            "pageshow",
            function () {

                window.scrollTo(
                    0,
                    0
                );

            }
        );


        window.addEventListener(
            "load",
            function () {

                window.scrollTo(
                    0,
                    0
                );

            }
        );

    }


    /* =====================================================
       REVEAL ANIMATIONS
       ===================================================== */

    function setupRevealAnimations() {

        const elements =
            document.querySelectorAll(
                [
                    ".growth-hero",
                    ".growth-principle",
                    ".milestone-intro",
                    ".growth-card",
                    ".customer-transformation",
                    ".transformation-card",
                    ".hundred-target",
                    ".revenue-connection",
                    ".final-punch",
                    ".next-phase"
                ].join(",")
            );


        if (!elements.length) {
            return;
        }


        const reducedMotion =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (
            reducedMotion ||
            !("IntersectionObserver" in window)
        ) {

            elements.forEach(
                function (element) {

                    element.classList.add(
                        "is-visible"
                    );

                }
            );

            return;

        }


        elements.forEach(
            function (element, index) {

                element.classList.add(
                    "reveal-ready"
                );

                element.style.setProperty(
                    "--reveal-index",
                    index
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


                            const element =
                                entry.target;


                            const index =
                                parseInt(
                                    element.style.getPropertyValue(
                                        "--reveal-index"
                                    ),
                                    10
                                );


                            const delay =
                                Math.min(
                                    (index % 7) * 65,
                                    390
                                );


                            window.setTimeout(
                                function () {

                                    element.classList.add(
                                        "is-visible"
                                    );

                                },
                                delay
                            );


                            observerInstance.unobserve(
                                element
                            );

                        }
                    );

                },
                {
                    threshold: 0.10,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        elements.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       GROWTH CARDS
       ===================================================== */

    function setupGrowthCards() {

        const cards =
            document.querySelectorAll(
                ".growth-card"
            );


        if (!cards.length) {
            return;
        }


        cards.forEach(
            function (card, index) {

                card.setAttribute(
                    "tabindex",
                    "0"
                );

                card.setAttribute(
                    "role",
                    "article"
                );


                card.dataset.cardIndex =
                    String(index + 1);


                card.addEventListener(
                    "mouseenter",
                    function () {

                        activateGrowthCard(
                            card
                        );

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    function () {

                        deactivateGrowthCard(
                            card
                        );

                    }
                );


                card.addEventListener(
                    "focus",
                    function () {

                        activateGrowthCard(
                            card
                        );

                    }
                );


                card.addEventListener(
                    "blur",
                    function () {

                        deactivateGrowthCard(
                            card
                        );

                    }
                );


                card.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            toggleGrowthCard(
                                card
                            );

                        }

                    }
                );

            }
        );

    }


    function activateGrowthCard(
        card
    ) {

        card.classList.add(
            "is-active"
        );

    }


    function deactivateGrowthCard(
        card
    ) {

        card.classList.remove(
            "is-active"
        );

    }


    function toggleGrowthCard(
        card
    ) {

        const active =
            card.classList.contains(
                "is-active"
            );


        document
            .querySelectorAll(
                ".growth-card.is-active"
            )
            .forEach(
                function (item) {

                    item.classList.remove(
                        "is-active"
                    );

                }
            );


        if (!active) {

            card.classList.add(
                "is-active"
            );

        }

    }


    /* =====================================================
       TRANSFORMATION CARDS
       ===================================================== */

    function setupTransformationCards() {

        const cards =
            document.querySelectorAll(
                ".transformation-card"
            );


        cards.forEach(
            function (card, index) {

                card.dataset.step =
                    String(index + 1);


                card.addEventListener(
                    "mouseenter",
                    function () {

                        card.classList.add(
                            "is-active"
                        );

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    function () {

                        card.classList.remove(
                            "is-active"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       CUSTOMER TARGET INTERACTION
       ===================================================== */

    function setupCustomerTarget() {

        const target =
            document.querySelector(
                ".hundred-target"
            );


        if (!target) {
            return;
        }


        const number =
            target.querySelector(
                ".target-number"
            );


        if (!number) {
            return;
        }


        /*
         * Small visual emphasis when the
         * 100-customer target enters the viewport.
         */

        if (
            !("IntersectionObserver" in window)
        ) {
            return;
        }


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                target.classList.add(
                                    "target-reached"
                                );

                                number.classList.add(
                                    "target-number-visible"
                                );

                                observer.unobserve(
                                    target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.35
                }
            );


        observer.observe(
            target
        );

    }


    /* =====================================================
       NAVIGATION
       ===================================================== */

    function setupNavigation() {

        const previous =
            document.querySelector(
                ".nav-previous"
            );


        const next =
            document.querySelector(
                ".nav-next"
            );


        const continueButton =
            document.querySelector(
                ".next-phase-button"
            );


        if (previous) {

            previous.addEventListener(
                "click",
                function () {

                    prepareNavigation(
                        "previous"
                    );

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                function () {

                    prepareNavigation(
                        "next"
                    );

                }
            );

        }


        if (continueButton) {

            continueButton.addEventListener(
                "click",
                function () {

                    prepareNavigation(
                        "next"
                    );

                }
            );

        }

    }


    function prepareNavigation(
        direction
    ) {

        try {

            sessionStorage.setItem(
                "ctmPathNavigationDirection",
                direction
            );

            sessionStorage.setItem(
                "ctmPathReturnScroll",
                "0"
            );

            sessionStorage.setItem(
                "ctmPathCurrentPage",
                "15"
            );

        } catch (error) {
            // Session storage is optional.
        }

    }


    /* =====================================================
       KEYBOARD NAVIGATION
       ===================================================== */

    function setupKeyboardNavigation() {

        document.addEventListener(
            "keydown",
            function (event) {

                const target =
                    event.target;


                /*
                 * Do not intercept keyboard
                 * commands inside form controls.
                 */

                if (
                    target &&
                    (
                        target.tagName === "INPUT" ||
                        target.tagName === "TEXTAREA" ||
                        target.tagName === "SELECT" ||
                        target.isContentEditable
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

    }


    /* =====================================================
       ACCESSIBILITY
       ===================================================== */

    function setupAccessibility() {

        /*
         * Growth cards.
         */

        document
            .querySelectorAll(
                ".growth-card"
            )
            .forEach(
                function (card) {

                    const number =
                        card.querySelector(
                            ".growth-number"
                        );

                    const heading =
                        card.querySelector(
                            "h3"
                        );


                    if (
                        number &&
                        heading
                    ) {

                        card.setAttribute(
                            "aria-label",
                            "Milestone " +
                            number.textContent.trim() +
                            ": " +
                            heading.textContent.trim()
                        );

                    }

                }
            );


        /*
         * Transformation cards.
         */

        document
            .querySelectorAll(
                ".transformation-card"
            )
            .forEach(
                function (card, index) {

                    const heading =
                        card.querySelector(
                            "h3"
                        );


                    if (heading) {

                        card.setAttribute(
                            "aria-label",
                            "Business principle " +
                            String(index + 1) +
                            ": " +
                            heading.textContent.trim()
                        );

                    }

                }
            );


        /*
         * Navigation labels.
         */

        const previous =
            document.querySelector(
                ".nav-previous"
            );


        const next =
            document.querySelector(
                ".nav-next"
            );


        if (previous) {

            previous.setAttribute(
                "aria-label",
                "Go to Page 14"
            );

        }


        if (next) {

            next.setAttribute(
                "aria-label",
                "Go to Page 16"
            );

        }


        /*
         * Decorative arrows.
         */

        document
            .querySelectorAll(
                ".growth-principle > b"
            )
            .forEach(
                function (arrow) {

                    arrow.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }
            );

    }


    /* =====================================================
       LOGO FALLBACK
       ===================================================== */

    function setupLogoFallback() {

        const logos =
            document.querySelectorAll(
                ".global-logo"
            );


        logos.forEach(
            function (logo) {

                logo.addEventListener(
                    "error",
                    function () {

                        if (
                            logo.dataset
                                .fallbackAttempted ===
                            "true"
                        ) {

                            return;

                        }


                        logo.dataset
                            .fallbackAttempted =
                            "true";


                        const source =
                            logo.getAttribute(
                                "src"
                            ) || "";


                        if (
                            source.includes(
                                "ctmmtptlogo.svg"
                            )
                        ) {

                            logo.src =
                                "assets/CTMMTPLogo.svg";

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       START
       ===================================================== */

    function startPage15() {

        initPage15();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startPage15,
            {
                once: true
            }
        );

    } else {

        startPage15();

    }


})();
