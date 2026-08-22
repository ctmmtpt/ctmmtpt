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

    if (!document.body || !document.body.classList.contains("page-11")) {
        return;
    }

    /*
     * Prevent accidental double-initialisation if the script
     * is loaded twice by the production page.
     */
    if (document.body.dataset.page11JsReady === "true") {
        return;
    }

    document.body.dataset.page11JsReady = "true";


    /* =========================================================
       CONSTANTS
       ========================================================= */

    const STORAGE = {
        pageVisited: "ctmPathPage11Visited",
        lastAction: "ctmPathPage11LastAction",
        returnScroll: "ctmPathReturnScroll",
        selectedActivity: "ctmPathPage11SelectedActivity"
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
        conversionNumbers: ".conversion-number",

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
       RUNTIME STATE
       ========================================================= */

    let progressFrame = 0;
    let progressListenersBound = false;


    /* =========================================================
       UTILITY — DOM READY
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
             * Storage may be unavailable in private browsing
             * or restricted contexts.
             */
        }
    }


    function readState(key) {
        try {
            return sessionStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }


    function removeState(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            /* Ignore storage restrictions. */
        }
    }


    /* =========================================================
       SCROLL
       ========================================================= */

    function prefersReducedMotion() {
        return Boolean(
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        );
    }


    function scrollTop(behavior) {
        const mode =
            behavior === "smooth"
                ? "smooth"
                : "auto";

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: mode
        });
    }


    function configureScrollRestoration() {
        if (!("scrollRestoration" in history)) {
            return;
        }

        try {
            history.scrollRestoration = "manual";
        } catch (error) {
            /*
             * Browser does not permit modification.
             */
        }
    }


    function forcePageTop() {
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                scrollTop("auto");
            });
        });
    }


    function scrollElementIntoView(element) {
        if (
            !element ||
            typeof element.scrollIntoView !== "function"
        ) {
            return;
        }

        element.scrollIntoView({
            behavior:
                prefersReducedMotion()
                    ? "auto"
                    : "smooth",

            block: "center",
            inline: "nearest"
        });
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

            conversionNumbers:
                document.querySelectorAll(
                    SELECTORS.conversionNumbers
                ),

            revealTargets:
                document.querySelectorAll(
                    SELECTORS.revealTargets
                ),

            progressElements:
                document.querySelectorAll(
                    "[data-page-progress], " +
                    "[data-progress-fill], " +
                    ".global-progress-fill, " +
                    ".progress-fill"
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

    function rememberNavigation(action) {
        saveState(
            STORAGE.lastAction,
            action
        );

        saveState(
            STORAGE.returnScroll,
            "0"
        );
    }


    function setupNavigation(elements) {

        if (elements.nextButton) {

            elements.nextButton.addEventListener(
                "click",
                function () {

                    rememberNavigation("next");

                }
            );

        }


        if (elements.previousButton) {

            elements.previousButton.addEventListener(
                "click",
                function () {

                    rememberNavigation("previous");

                }
            );

        }


        /*
         * Any direct HTML page navigation should begin
         * at the top of the destination page.
         */

        document
            .querySelectorAll('a[href$=".html"]')
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            rememberNavigation(
                                "page-link"
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

                rememberNavigation(
                    "show-system"
                );


                /*
                 * Give the button a subtle tactile state.
                 */

                elements.continueButton.classList.add(
                    "is-activated"
                );

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
                 * Never interfere with form controls
                 * or editable content.
                 */

                if (
                    tag === "input" ||
                    tag === "textarea" ||
                    tag === "select" ||
                    tag === "option" ||
                    (
                        active &&
                        active.isContentEditable
                    )
                ) {
                    return;
                }


                /*
                 * ALT + RIGHT
                 * Next page.
                 */

                if (
                    event.altKey &&
                    event.key === "ArrowRight" &&
                    elements.nextButton
                ) {

                    event.preventDefault();

                    elements.nextButton.click();

                    return;

                }


                /*
                 * ALT + LEFT
                 * Previous page.
                 */

                if (
                    event.altKey &&
                    event.key === "ArrowLeft" &&
                    elements.previousButton
                ) {

                    event.preventDefault();

                    elements.previousButton.click();

                    return;

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

        if (!elements.revealTargets.length) {
            return;
        }


        const reducedMotion =
            prefersReducedMotion();


        if (
            reducedMotion ||
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
       BUSINESS-ACTIVITY INTERACTION
       ========================================================= */

    function getActivityLabel(
        element,
        groupName,
        index
    ) {

        const explicit =
            element.getAttribute(
                "data-activity"
            ) ||
            element.getAttribute(
                "data-label"
            ) ||
            element.getAttribute(
                "aria-label"
            );


        if (explicit) {
            return explicit.trim();
        }


        const heading =
            element.querySelector(
                "h1, h2, h3, h4, strong, span"
            );


        if (
            heading &&
            heading.textContent.trim()
        ) {

            return heading.textContent
                .replace(/\s+/g, " ")
                .trim();

        }


        return (
            groupName +
            " " +
            String(index + 1)
        );

    }


    function clearGroupSelection(
        groupElements,
        selectedElement
    ) {

        groupElements.forEach(
            function (element) {

                const selected =
                    element === selectedElement;


                element.classList.toggle(
                    "is-selected",
                    selected
                );


                element.classList.toggle(
                    "is-active",
                    selected
                );


                if (
                    element.getAttribute("role") ===
                    "button"
                ) {

                    element.setAttribute(
                        "aria-pressed",
                        selected
                            ? "true"
                            : "false"
                    );

                }

            }
        );

    }


    function selectActivity(
        element,
        groupName,
        groupElements,
        index,
        shouldScroll
    ) {

        if (!element) {
            return;
        }


        clearGroupSelection(
            groupElements,
            element
        );


        const label =
            getActivityLabel(
                element,
                groupName,
                index
            );


        saveState(
            STORAGE.selectedActivity,
            groupName +
            ":" +
            index
        );


        element.dataset.selected =
            "true";


        element.setAttribute(
            "data-selected",
            "true"
        );


        /*
         * aria-current is useful for the active
         * step in the guided execution sequence.
         */

        element.setAttribute(
            "aria-current",
            "true"
        );


        groupElements.forEach(
            function (other) {

                if (other !== element) {

                    other.removeAttribute(
                        "data-selected"
                    );

                    other.removeAttribute(
                        "aria-current"
                    );

                }

            }
        );


        const liveRegion =
            document.querySelector(
                "[data-page11-live]"
            );


        if (liveRegion) {

            liveRegion.textContent =
                label;

        }


        if (shouldScroll) {

            scrollElementIntoView(
                element
            );

        }

    }


    function activateFromKeyboard(
        event,
        element,
        groupName,
        groupElements,
        index
    ) {

        if (
            event.key !== "Enter" &&
            event.key !== " "
        ) {
            return;
        }


        event.preventDefault();


        selectActivity(
            element,
            groupName,
            groupElements,
            index,
            true
        );

    }


    function restoreActivitySelection(
        groupName,
        groupElements
    ) {

        const saved =
            readState(
                STORAGE.selectedActivity
            );


        if (
            !saved ||
            saved.indexOf(
                groupName + ":"
            ) !== 0
        ) {

            return;

        }


        const index =
            Number(
                saved.split(":")[1]
            );


        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= groupElements.length
        ) {

            return;

        }


        selectActivity(
            groupElements[index],
            groupName,
            groupElements,
            index,
            false
        );

    }


    function setupActivityGroup(
        nodeList,
        groupName
    ) {

        const groupElements =
            Array.from(nodeList || []);


        if (!groupElements.length) {
            return;
        }


        groupElements.forEach(
            function (element, index) {

                if (
                    !element.hasAttribute(
                        "tabindex"
                    )
                ) {

                    element.setAttribute(
                        "tabindex",
                        "0"
                    );

                }


                /*
                 * Do not add a button role to a container
                 * that already contains native interactive
                 * controls.
                 */

                const containsInteractive =
                    Boolean(
                        element.querySelector(
                            'a, button, input, textarea, select, [contenteditable="true"]'
                        )
                    );


                if (!containsInteractive) {

                    element.setAttribute(
                        "role",
                        "button"
                    );

                    element.setAttribute(
                        "aria-pressed",
                        "false"
                    );

                }


                element.setAttribute(
                    "aria-label",
                    getActivityLabel(
                        element,
                        groupName,
                        index
                    )
                );


                /*
                 * Pointer hover.
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

                        if (
                            element.dataset.selected !==
                            "true"
                        ) {

                            element.classList.remove(
                                "is-active"
                            );

                        }

                    }
                );


                /*
                 * Keyboard focus.
                 */

                element.addEventListener(
                    "focus",
                    function () {

                        element.classList.add(
                            "is-focused"
                        );

                        element.classList.add(
                            "is-active"
                        );

                    }
                );


                element.addEventListener(
                    "blur",
                    function () {

                        element.classList.remove(
                            "is-focused"
                        );


                        if (
                            element.dataset.selected !==
                            "true"
                        ) {

                            element.classList.remove(
                                "is-active"
                            );

                        }

                    }
                );


                /*
                 * Mouse / touch selection.
                 */

                element.addEventListener(
                    "click",
                    function () {

                        selectActivity(
                            element,
                            groupName,
                            groupElements,
                            index,
                            false
                        );

                    }
                );


                /*
                 * Keyboard selection.
                 */

                element.addEventListener(
                    "keydown",
                    function (event) {

                        activateFromKeyboard(
                            event,
                            element,
                            groupName,
                            groupElements,
                            index
                        );

                    }
                );

            }
        );


        restoreActivitySelection(
            groupName,
            groupElements
        );

    }


    function setupBusinessActivityInteractions(
        elements
    ) {

        setupActivityGroup(
            elements.machineNodes,
            "execution-sequence"
        );


        setupActivityGroup(
            elements.taskCards,
            "task"
        );


        setupActivityGroup(
            elements.marketStats,
            "market"
        );


        setupActivityGroup(
            elements.trialCards,
            "trial"
        );


        setupActivityGroup(
            elements.copyNodes,
            "copy-flow"
        );


        setupActivityGroup(
            elements.scaleNodes,
            "scale"
        );


        setupActivityGroup(
            elements.conversionNumbers,
            "conversion"
        );

    }


    /* =========================================================
       PROGRESS
       ========================================================= */

    function getDocumentProgress() {

        const root =
            document.documentElement;


        const scrollable =
            Math.max(
                1,
                root.scrollHeight -
                window.innerHeight
            );


        return Math.max(
            0,
            Math.min(
                100,
                (
                    window.scrollY /
                    scrollable
                ) * 100
            )
        );

    }


    function updateProgress(elements) {

        const progress =
            getDocumentProgress();


        elements.progressElements.forEach(
            function (element) {

                const value =
                    progress.toFixed(1);


                const property =
                    element.getAttribute(
                        "data-progress-property"
                    );


                if (
                    property === "width" ||
                    element.classList.contains(
                        "global-progress-fill"
                    ) ||
                    element.classList.contains(
                        "progress-fill"
                    )
                ) {

                    element.style.width =
                        value + "%";

                } else if (
                    element.hasAttribute(
                        "data-page-progress"
                    ) ||
                    element.hasAttribute(
                        "data-progress-fill"
                    )
                ) {

                    element.setAttribute(
                        "data-progress-value",
                        value
                    );

                }


                element.setAttribute(
                    "aria-valuenow",
                    String(
                        Math.round(progress)
                    )
                );


                element.setAttribute(
                    "aria-valuemin",
                    "0"
                );


                element.setAttribute(
                    "aria-valuemax",
                    "100"
                );

            }
        );


        document
            .querySelectorAll(
                "[data-progress-label]"
            )
            .forEach(
                function (label) {

                    label.textContent =
                        Math.round(progress) +
                        "%";

                }
            );

    }


    function scheduleProgressUpdate(
        elements
    ) {

        if (progressFrame) {
            return;
        }


        progressFrame =
            window.requestAnimationFrame(
                function () {

                    progressFrame = 0;

                    updateProgress(
                        elements
                    );

                }
            );

    }


    function setupProgress(elements) {

        if (
            !elements.progressElements.length &&
            !document.querySelector(
                "[data-progress-label]"
            )
        ) {

            return;

        }


        updateProgress(
            elements
        );


        if (progressListenersBound) {
            return;
        }


        progressListenersBound = true;


        window.addEventListener(
            "scroll",
            function () {

                scheduleProgressUpdate(
                    elements
                );

            },
            { passive: true }
        );


        window.addEventListener(
            "resize",
            function () {

                scheduleProgressUpdate(
                    elements
                );

            },
            { passive: true }
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


        const value =
            hoursNumber.dataset.hours ||
            "5000";


        hoursNumber.setAttribute(
            "aria-label",
            value + " hours"
        );


        hoursNumber.setAttribute(
            "data-hours",
            value
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

        document
            .querySelectorAll("img")
            .forEach(
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

                        },
                        { once: false }
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


        /*
         * Lightweight live region for selected
         * business activities.
         */

        if (
            !document.querySelector(
                "[data-page11-live]"
            )
        ) {

            const live =
                document.createElement(
                    "span"
                );


            live.setAttribute(
                "data-page11-live",
                "true"
            );


            live.setAttribute(
                "aria-live",
                "polite"
            );


            live.setAttribute(
                "aria-atomic",
                "true"
            );


            /*
             * Visually hidden without requiring
             * another stylesheet.
             */

            live.style.position =
                "absolute";

            live.style.width =
                "1px";

            live.style.height =
                "1px";

            live.style.padding =
                "0";

            live.style.margin =
                "-1px";

            live.style.overflow =
                "hidden";

            live.style.clip =
                "rect(0, 0, 0, 0)";

            live.style.whiteSpace =
                "nowrap";

            live.style.border =
                "0";


            document.body.appendChild(
                live
            );

        }

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

        if (!window.location.hash) {
            return;
        }


        /*
         * Page 11 is a guided journey page.
         * Prevent a stale hash from reopening the
         * page halfway down the document.
         */

        window.setTimeout(
            forcePageTop,
            0
        );

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


        setupBusinessActivityInteractions(
            elements
        );


        setupHoursSection();


        setupSemanticMetrics();


        setupImageFallbacks();


        setupAccessibility(
            elements
        );


        setupCurrentPageMarker();


        setupProgress(
            elements
        );


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
