/* =========================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 14 — ACTIVATE THE DIGITAL BUSINESS™
   Complete replacement
   js/page14.js
   ========================================================= */

(function () {
    "use strict";


    /* =====================================================
       INITIALIZATION
       ===================================================== */

    function initPage14() {

        if (!document.body) {
            return;
        }

        if (!document.body.classList.contains("page-14")) {
            return;
        }

        setupHistory();

        setupPipeline();

        setupMilestones();

        setupReveal();

        setupNavigation();

        setupNextPhase();

        setupKeyboardNavigation();

        setupAccessibility();

        setupLogoFallback();

        document.body.classList.add("page14-ready");

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
            // Optional browser feature.
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
       PIPELINE INTERACTION
       ===================================================== */

    function setupPipeline() {

        const stages =
            document.querySelectorAll(
                ".pipeline-stage"
            );


        if (!stages.length) {
            return;
        }


        stages.forEach(
            function (stage, index) {

                stage.setAttribute(
                    "tabindex",
                    "0"
                );

                stage.setAttribute(
                    "role",
                    "button"
                );


                stage.dataset.stageIndex =
                    String(index + 1);


                stage.addEventListener(
                    "mouseenter",
                    function () {

                        activatePipelineStage(
                            stage
                        );

                    }
                );


                stage.addEventListener(
                    "mouseleave",
                    function () {

                        deactivatePipelineStage(
                            stage
                        );

                    }
                );


                stage.addEventListener(
                    "focus",
                    function () {

                        activatePipelineStage(
                            stage
                        );

                    }
                );


                stage.addEventListener(
                    "blur",
                    function () {

                        deactivatePipelineStage(
                            stage
                        );

                    }
                );


                stage.addEventListener(
                    "keydown",
                    function (event) {

                        if (
                            event.key === "Enter" ||
                            event.key === " "
                        ) {

                            event.preventDefault();

                            togglePipelineStage(
                                stage
                            );

                        }

                    }
                );

            }
        );

    }


    function activatePipelineStage(
        stage
    ) {

        stage.classList.add(
            "is-active"
        );

    }


    function deactivatePipelineStage(
        stage
    ) {

        stage.classList.remove(
            "is-active"
        );

    }


    function togglePipelineStage(
        stage
    ) {

        const isActive =
            stage.classList.contains(
                "is-active"
            );


        document
            .querySelectorAll(
                ".pipeline-stage.is-active"
            )
            .forEach(
                function (item) {

                    item.classList.remove(
                        "is-active"
                    );

                }
            );


        if (!isActive) {

            stage.classList.add(
                "is-active"
            );

        }

    }


    /* =====================================================
       MILESTONE INTERACTION
       ===================================================== */

    function setupMilestones() {

        const milestones =
            document.querySelectorAll(
                ".milestone-card, .activation-card"
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

        const isActive =
            milestone.classList.contains(
                "is-active"
            );


        document
            .querySelectorAll(
                ".milestone-card.is-active, .activation-card.is-active"
            )
            .forEach(
                function (item) {

                    item.classList.remove(
                        "is-active"
                    );

                }
            );


        if (!isActive) {

            milestone.classList.add(
                "is-active"
            );

        }

    }


    /* =====================================================
       REVEAL ANIMATION
       ===================================================== */

    function setupReveal() {

        const revealElements =
            document.querySelectorAll(
                [
                    ".activation-hero",
                    ".milestone-intro",
                    ".digital-pipeline",
                    ".milestone-group",
                    ".milestone-card",
                    ".activation-card",
                    ".mid-statement",
                    ".system-principles",
                    ".principle-card",
                    ".system-live",
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
                                    (index % 7) * 55,
                                    330
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
                        "0px 0px -55px 0px"
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
       KEYBOARD NAVIGATION
       ===================================================== */

    function setupKeyboardNavigation() {

        document.addEventListener(
            "keydown",
            function (event) {

                const target =
                    event.target;


                /*
                 * Do not interfere with form controls.
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
                 * ALT + LEFT → previous page
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
                 * ALT + RIGHT → next page
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
            ".activation-principle > b",
            ".pipeline-arrow",
            ".pipeline-repeat b",
            ".statement-line",
            ".live-flow b"
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
         * Pipeline stages.
         */

        document
            .querySelectorAll(
                ".pipeline-stage"
            )
            .forEach(
                function (stage) {

                    const title =
                        stage.querySelector(
                            "strong"
                        );


                    if (title) {

                        stage.setAttribute(
                            "aria-label",
                            title.textContent.trim()
                        );

                    }

                }
            );


        /*
         * Milestone cards.
         */

        document
            .querySelectorAll(
                ".milestone-card, .activation-card"
            )
            .forEach(
                function (card) {

                    const number =
                        card.querySelector(
                            ".milestone-number, .activation-number"
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
                "Go to Page 13"
            );

        }


        if (next) {

            next.setAttribute(
                "aria-label",
                "Go to Page 15"
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
                         * Keep compatibility with
                         * alternate project logo naming.
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
       PAGE STATE
       ===================================================== */

    function markPageReady() {

        document.body.classList.add(
            "page-ready"
        );


        document.body.dataset.page =
            "14";

    }


    /* =====================================================
       START
       ===================================================== */

    function start() {

        initPage14();

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
