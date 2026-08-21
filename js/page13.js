/* =========================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 13 — THE FOUNDATION™
   Complete replacement
   js/page13.js
   ========================================================= */

(function () {
    "use strict";


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initPage13() {

        if (!document.body) {
            return;
        }

        if (!document.body.classList.contains("page-13")) {
            return;
        }


        setupHistory();

        setupMilestones();

        setupReveal();

        setupNavigation();

        setupNextPhase();

        setupKeyboardNavigation();

        setupAccessibility();

        setupLogoFallback();

        document.body.classList.add("page13-ready");

    }


    /* =====================================================
       HISTORY / PAGE POSITION
       ===================================================== */

    function setupHistory() {

        try {

            if ("scrollRestoration" in history) {
                history.scrollRestoration = "manual";
            }

        } catch (error) {
            // Browser may restrict history settings.
        }


        window.addEventListener(
            "pageshow",
            function () {

                window.scrollTo(0, 0);

            }
        );


        window.addEventListener(
            "load",
            function () {

                window.scrollTo(0, 0);

            }
        );

    }


    /* =====================================================
       MILESTONE INTERACTION
       ===================================================== */

    function setupMilestones() {

        const milestones =
            document.querySelectorAll(
                ".milestone-card"
            );


        if (!milestones.length) {
            return;
        }


        milestones.forEach(
            function (milestone, index) {

                milestone.setAttribute(
                    "tabindex",
                    "0"
                );


                milestone.setAttribute(
                    "role",
                    "article"
                );


                milestone.style.setProperty(
                    "--milestone-index",
                    index
                );


                milestone.addEventListener(
                    "mouseenter",
                    function () {

                        activateMilestone(
                            milestone
                        );

                    }
                );


                milestone.addEventListener(
                    "mouseleave",
                    function () {

                        deactivateMilestone(
                            milestone
                        );

                    }
                );


                milestone.addEventListener(
                    "focus",
                    function () {

                        activateMilestone(
                            milestone
                        );

                    }
                );


                milestone.addEventListener(
                    "blur",
                    function () {

                        deactivateMilestone(
                            milestone
                        );

                    }
                );


                milestone.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            toggleMilestone(
                                milestone
                            );

                        }

                    }
                );

            }
        );

    }


    function activateMilestone(
        milestone
    ) {

        milestone.classList.add(
            "is-active"
        );

    }


    function deactivateMilestone(
        milestone
    ) {

        milestone.classList.remove(
            "is-active"
        );

    }


    function toggleMilestone(
        milestone
    ) {

        const currentlyActive =
            milestone.classList.contains(
                "is-active"
            );


        document
            .querySelectorAll(
                ".milestone-card.is-active"
            )
            .forEach(
                function (item) {

                    item.classList.remove(
                        "is-active"
                    );

                }
            );


        if (!currentlyActive) {

            milestone.classList.add(
                "is-active"
            );

        }

    }


    /* =====================================================
       REVEAL SYSTEM
       ===================================================== */

    function setupReveal() {

        const revealElements =
            document.querySelectorAll(
                [
                    ".foundation-hero",
                    ".milestone-intro",
                    ".milestone-card",
                    ".foundation-summary",
                    ".simple-business-section",
                    ".simple-business-card",
                    ".next-phase"
                ].join(",")
            );


        if (!revealElements.length) {
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
                    threshold: 0.10,

                    rootMargin:
                        "0px 0px -60px 0px"
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


        if (previous) {

            previous.addEventListener(
                "click",
                function () {

                    preparePageTransition(
                        "previous"
                    );

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                function () {

                    preparePageTransition(
                        "next"
                    );

                }
            );

        }

    }


    function preparePageTransition(
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

        } catch (error) {
            // Storage is optional.
        }

    }


    /* =====================================================
       NEXT PHASE CTA
       ===================================================== */

    function setupNextPhase() {

        const button =
            document.querySelector(
                ".next-phase-button"
            );


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                preparePageTransition(
                    "next"
                );

            }
        );


        button.addEventListener(
            "mouseenter",
            function () {

                button.classList.add(
                    "is-hovered"
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            function () {

                button.classList.remove(
                    "is-hovered"
                );

            }
        );

    }


    /* =====================================================
       KEYBOARD PAGE NAVIGATION
       ===================================================== */

    function setupKeyboardNavigation() {

        document.addEventListener(
            "keydown",
            function (event) {

                const target =
                    event.target;


                /*
                 * Never interfere with text fields.
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
         * Decorative elements.
         */

        const decorativeSelectors = [
            ".global-divider span",
            ".hero-principle b",
            ".road-line",
            ".summary-arrow"
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
         * Milestone descriptions.
         */

        document
            .querySelectorAll(
                ".milestone-card"
            )
            .forEach(
                function (card) {

                    const number =
                        card.querySelector(
                            ".milestone-number"
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
                "Go to Page 12"
            );

        }


        if (next) {

            next.setAttribute(
                "aria-label",
                "Go to Page 14"
            );

        }

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

                        /*
                         * Prevent an infinite fallback loop.
                         */

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


                        /*
                         * Project logo naming
                         * compatibility.
                         */

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
       SIMPLE PAGE STATE
       ===================================================== */

    function markPageReady() {

        document.body.classList.add(
            "page-ready"
        );


        document.body.dataset.page =
            "13";

    }


    /* =====================================================
       START
       ===================================================== */

    function start() {

        initPage13();

        markPageReady();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            start,
            {
                once: true
            }
        );

    } else {

        start();

    }

})();
