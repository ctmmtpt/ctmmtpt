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
                /* Browser limitation — intentionally ignored. */
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
             * Session storage may be unavailable.
             * The page remains functional without it.
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
         * Any internal HTML page link begins
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
         * Two animation frames allow the browser to
         * complete initial layout first.
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

                saveState(
                    STORAGE_KEYS.page10Action,
                    "show-how"
                );

                elements.howButton.classList.add(
                    "is-activated"
                );

                /*
                 * Continue the guided journey.
                 */

                const page11 = "11.html";

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
                 * Never intercept navigation shortcuts
                 * while the visitor is entering information.
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

                    if (elements.nextButton) {

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

                    if (elements.previousButton) {

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
         * Main sections.
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
         * System nodes.
         */

        elements.systemNodes.forEach(
            function (element) {

                revealTargets.push(
                    element
                );
            }
        );

        /*
         * Market statistics.
         */

        elements.marketStats.forEach(
            function (element) {

                revealTargets.push(
                    element
                );
            }
        );

        /*
         * Trial cards.
         */

        elements.trialCards.forEach(
            function (element) {

                revealTargets.push(
                    element
                );
            }
        );

        /*
         * Scale nodes.
         */

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
       CUSTOMER ECONOMICS AUDIT
       ========================================================= */

    /*
     * The existing Page 10 presentation uses fixed narrative
     * values. We must NOT invent a different financial model.
     *
     * This optional calculation layer activates only if the
     * HTML explicitly provides these data attributes:
     *
     * data-economics-customers
     * data-economics-value
     * data-economics-months
     * data-economics-output
     *
     * Formula:
     *
     * CUSTOMER BASE × CUSTOMER VALUE × TIME
     *
     * The resulting figure is a MODELLED POSSIBILITY.
     * It is never presented by this script as guaranteed
     * revenue, income, performance, or outcome.
     */

    function parsePositiveNumber(value) {

        const number =
            Number(
                String(value)
                    .replace(/,/g, "")
                    .replace(/₹/g, "")
                    .trim()
            );

        return Number.isFinite(number) &&
            number > 0
            ? number
            : null;
    }

    function formatNumber(
        value,
        maximumFractionDigits
    ) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                maximumFractionDigits:
                    maximumFractionDigits || 0
            }
        ).format(value);
    }

    function setupEconomicsControls() {

        const customersInput =
            document.querySelector(
                "[data-economics-customers]"
            );

        const valueInput =
            document.querySelector(
                "[data-economics-value]"
            );

        const monthsInput =
            document.querySelector(
                "[data-economics-months]"
            );

        const output =
            document.querySelector(
                "[data-economics-output]"
            );

        /*
         * Current Page 10 does not contain these optional
         * controls. In that case this function intentionally
         * does nothing.
         */

        if (
            !customersInput ||
            !valueInput ||
            !monthsInput ||
            !output
        ) {
            return;
        }

        function calculate() {

            const customers =
                parsePositiveNumber(
                    customersInput.value
                );

            const value =
                parsePositiveNumber(
                    valueInput.value
                );

            const months =
                parsePositiveNumber(
                    monthsInput.value
                );

            const controls = [
                customersInput,
                valueInput,
                monthsInput
            ];

            controls.forEach(
                function (control) {

                    control.setCustomValidity(
                        ""
                    );
                }
            );

            if (!customers) {

                customersInput.setCustomValidity(
                    "Enter a customer count greater than zero."
                );
            }

            if (!value) {

                valueInput.setCustomValidity(
                    "Enter a customer value greater than zero."
                );
            }

            if (!months) {

                monthsInput.setCustomValidity(
                    "Enter a time period greater than zero."
                );
            }

            if (
                !customers ||
                !value ||
                !months
            ) {

                output.textContent =
                    "Enter valid values to model the possibility.";

                output.dataset.valid =
                    "false";

                return;
            }

            const result =
                customers *
                value *
                months;

            if (
                !Number.isFinite(result) ||
                result <= 0
            ) {

                output.textContent =
                    "Enter valid values to model the possibility.";

                output.dataset.valid =
                    "false";

                return;
            }

            output.textContent =
                "₹" +
                formatNumber(
                    result,
                    0
                );

            output.dataset.valid =
                "true";
        }

        [
            customersInput,
            valueInput,
            monthsInput
        ].forEach(
            function (input) {

                input.addEventListener(
                    "input",
                    calculate
                );

                input.addEventListener(
                    "change",
                    calculate
                );
            }
        );

        calculate();
    }

    /* =========================================================
       NUMBER EMPHASIS
       ========================================================= */

    function setupNumberEmphasis(elements) {

        /*
         * Add semantic data attributes to key numerical
         * statements so CSS and analytics can identify
         * them consistently.
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
                         * logo filename variants.
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

        if (elements.howButton) {

            elements.howButton.setAttribute(
                "aria-label",
                "Yes — show me how"
            );
        }

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
         * Decorative elements remain hidden from
         * assistive technology.
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

        if (window.location.hash) {

            /*
             * Page 10 is a guided full-page journey.
             * Ignore accidental browser hash restoration.
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

        setupEconomicsControls();

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
