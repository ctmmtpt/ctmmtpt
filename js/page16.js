/* =========================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 16 — THE DECISION™
   Complete replacement
   js/page16.js
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURATION
       ===================================================== */

    const CONFIG = {

        whatsappNumber:
            "917036970339",

        whatsappMessage:
            "I want to build my bright future\n\n" +
            "I consent to follow the guidelines in " +
            "managing my MONEY TIME PEOPLE TASKS",

        previousPage:
            "15.html"

    };


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initPage16() {

        if (!document.body) {
            return;
        }

        if (!document.body.classList.contains("page-16")) {
            return;
        }

        setupScrollRestoration();

        setupWhatsAppCTA();

        setupRevealAnimations();

        setupPreviousNavigation();

        setupKeyboardNavigation();

        setupAccessibility();

        setupCTAState();

        setupLogoFallback();

        document.body.classList.add(
            "page16-ready"
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
            // Ignore unsupported browser behavior.
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
       WHATSAPP CTA
       ===================================================== */

    function setupWhatsAppCTA() {

        const cta =
            document.getElementById(
                "futureCta"
            );


        if (!cta) {
            return;
        }


        const whatsappUrl =
            buildWhatsAppUrl();


        cta.setAttribute(
            "href",
            whatsappUrl
        );


        cta.setAttribute(
            "target",
            "_blank"
        );


        cta.setAttribute(
            "rel",
            "noopener noreferrer"
        );


        cta.addEventListener(
            "click",
            function () {

                recordDecision();

            }
        );

    }


    function buildWhatsAppUrl() {

        const encodedMessage =
            encodeURIComponent(
                CONFIG.whatsappMessage
            );


        return (
            "https://wa.me/" +
            CONFIG.whatsappNumber +
            "?text=" +
            encodedMessage
        );

    }


    /* =====================================================
       RECORD FINAL DECISION
       ===================================================== */

    function recordDecision() {

        try {

            sessionStorage.setItem(
                "ctmPathFinalDecision",
                "true"
            );

            sessionStorage.setItem(
                "ctmPathFinalDecisionTime",
                new Date().toISOString()
            );

        } catch (error) {
            // Session storage is optional.
        }

    }


    /* =====================================================
       REVEAL ANIMATIONS
       ===================================================== */

    function setupRevealAnimations() {

        const elements =
            document.querySelectorAll(
                [
                    ".arrival-kicker",
                    ".welcome-block",
                    ".decision-divider",
                    ".legacy-message",
                    ".future-truth",
                    ".decision-question",
                    ".final-action",
                    ".commitment-card",
                    ".legacy-signature"
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
                    String(index)
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
                                    index * 90,
                                    600
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
                    threshold:
                        0.08,

                    rootMargin:
                        "0px 0px -45px 0px"
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
       PREVIOUS PAGE
       ===================================================== */

    function setupPreviousNavigation() {

        const previous =
            document.querySelector(
                ".final-previous"
            );


        if (!previous) {
            return;
        }


        previous.setAttribute(
            "href",
            CONFIG.previousPage
        );


        previous.addEventListener(
            "click",
            function () {

                try {

                    sessionStorage.setItem(
                        "ctmPathNavigationDirection",
                        "previous"
                    );

                    sessionStorage.setItem(
                        "ctmPathCurrentPage",
                        "16"
                    );

                } catch (error) {
                    // Ignore storage errors.
                }

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
                 * Never intercept keyboard shortcuts
                 * while the user is typing.
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
                 * Return to Page 15.
                 */

                if (
                    event.altKey &&
                    event.key === "ArrowLeft"
                ) {

                    const previous =
                        document.querySelector(
                            ".final-previous"
                        );


                    if (previous) {

                        event.preventDefault();

                        previous.click();

                    }

                }


                /*
                 * ENTER on focused CTA.
                 */

                if (
                    event.key === "Enter" &&
                    document.activeElement &&
                    document.activeElement.id ===
                        "futureCta"
                ) {

                    recordDecision();

                }

            }
        );

    }


    /* =====================================================
       ACCESSIBILITY
       ===================================================== */

    function setupAccessibility() {

        const cta =
            document.getElementById(
                "futureCta"
            );


        if (cta) {

            cta.setAttribute(
                "aria-label",
                "என் பிரகாசமான எதிர்காலத்தை உருவாக்க விரும்புகிறேன் — WhatsApp மூலம் தொடரவும்"
            );

        }


        const commitment =
            document.querySelector(
                ".commitment-card"
            );


        if (commitment) {

            commitment.setAttribute(
                "aria-label",
                "My commitment: Money, Time, People, Tasks"
            );

        }


        /*
         * Decorative elements should not be
         * announced by screen readers.
         */

        document
            .querySelectorAll(
                [
                    ".decision-divider",
                    ".signature-line",
                    ".cta-arrow",
                    ".cta-icon",
                    ".commitment-pillars > b"
                ].join(",")
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


    /* =====================================================
       CTA READY STATE
       ===================================================== */

    function setupCTAState() {

        const cta =
            document.getElementById(
                "futureCta"
            );


        if (!cta) {
            return;
        }


        /*
         * Delay the pulse very slightly so the
         * page first settles visually.
         */

        window.setTimeout(
            function () {

                cta.classList.add(
                    "is-ready"
                );

            },
            1200
        );

    }


    /* =====================================================
       LOGO FALLBACK
       ===================================================== */

    function setupLogoFallback() {

        const logos =
            document.querySelectorAll(
                ".global-logo, .final-logo"
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

    function startPage16() {

        initPage16();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startPage16,
            {
                once: true
            }
        );

    } else {

        startPage16();

    }


})();
