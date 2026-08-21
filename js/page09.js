/* =========================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 09 — TIME™ / THE 5,000-HOUR COMMITMENT™
   COMPLETE PAGE-SPECIFIC JAVASCRIPT
   ========================================================= */

(function () {
    "use strict";


    /* =========================================================
       PAGE GUARD
       ========================================================= */

    const page = document.body;

    if (!page || !page.classList.contains("page-09")) {
        return;
    }


    /* =========================================================
       CONFIGURATION
       ========================================================= */

    const MASTERY_HOURS = 5000;

    /*
     * Planning conventions:
     *
     * 1 year   = 365 days
     * 1 month  = 30 days
     *
     * These conventions keep the calculation transparent
     * and predictable for the participant.
     */

    const DAYS_PER_YEAR = 365;
    const DAYS_PER_MONTH = 30;


    /* =========================================================
       DOM REFERENCES
       ========================================================= */

    let durationInput;
    let durationUnit;

    let modeButtons;
    let exampleCards;
    let commitmentButtons;

    let calculatedDays;
    let dailyHours;
    let dailyHoursLarge;

    let closingDuration;
    let closingDaily;


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
       SCROLL TO TOP
       ========================================================= */

    function scrollToTop() {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });
    }


    /* =========================================================
       BROWSER SCROLL RESTORATION
       ========================================================= */

    function configureScrollRestoration() {

        if ("scrollRestoration" in history) {

            try {

                history.scrollRestoration = "manual";

            } catch (error) {

                /* Ignore unsupported browser behavior. */

            }
        }
    }


    /* =========================================================
       PAGE NAVIGATION
       ========================================================= */

    function setupNavigation() {

        const links =
            document.querySelectorAll(
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


    /* =========================================================
       RESTORE PAGE POSITION
       ========================================================= */

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
         * Prevent the browser from reopening Page 09
         * halfway down the page after navigation.
         */

        requestAnimationFrame(function () {

            requestAnimationFrame(function () {

                if (window.scrollY > 0) {

                    scrollToTop();

                }

            });

        });
    }


    /* =========================================================
       CURRENT PAGE
       ========================================================= */

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


    /* =========================================================
       ACCESSIBILITY
       ========================================================= */

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


        /*
         * Give the timeline input a useful description.
         */

        if (durationInput) {

            durationInput.setAttribute(
                "aria-describedby",
                "durationUnit"
            );
        }
    }


    /* =========================================================
       ELEMENT INITIALIZATION
       ========================================================= */

    function cacheElements() {

        durationInput =
            document.getElementById(
                "masteryDuration"
            );

        durationUnit =
            document.getElementById(
                "durationUnit"
            );

        modeButtons =
            document.querySelectorAll(
                ".pace-mode-button"
            );

        exampleCards =
            document.querySelectorAll(
                ".example-card"
            );

        commitmentButtons =
            document.querySelectorAll(
                ".commitment-button"
            );

        calculatedDays =
            document.getElementById(
                "calculatedDays"
            );

        dailyHours =
            document.getElementById(
                "dailyHours"
            );

        dailyHoursLarge =
            document.getElementById(
                "dailyHoursLarge"
            );

        closingDuration =
            document.getElementById(
                "closingDuration"
            );

        closingDaily =
            document.getElementById(
                "closingDaily"
            );
    }


    /* =========================================================
       CURRENT MODE
       ========================================================= */

    let currentMode = "years";


    /* =========================================================
       UNIT LABELS
       ========================================================= */

    const MODE_LABELS = {
        years: "YEARS",
        months: "MONTHS",
        days: "DAYS"
    };


    /* =========================================================
       CALCULATE DAYS
       ========================================================= */

    function calculateDays(value, mode) {

        const numericValue =
            Number(value);


        if (
            !Number.isFinite(numericValue) ||
            numericValue <= 0
        ) {

            return 0;

        }


        switch (mode) {

            case "years":

                return (
                    numericValue *
                    DAYS_PER_YEAR
                );


            case "months":

                return (
                    numericValue *
                    DAYS_PER_MONTH
                );


            case "days":

                return numericValue;


            default:

                return 0;
        }
    }


    /* =========================================================
       FORMAT NUMBER
       ========================================================= */

    function formatNumber(
        value,
        maximumFractionDigits = 2
    ) {

        if (
            !Number.isFinite(value)
        ) {

            return "0";

        }


        return value.toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits
            }
        );
    }


    /* =========================================================
       FORMAT DAYS
       ========================================================= */

    function formatDays(value) {

        if (
            !Number.isFinite(value) ||
            value <= 0
        ) {

            return "0";

        }


        return Math.round(value)
            .toLocaleString("en-IN");
    }


    /* =========================================================
       FORMAT DAILY HOURS
       ========================================================= */

    function formatDailyHours(value) {

        if (
            !Number.isFinite(value) ||
            value <= 0
        ) {

            return "0";

        }


        return value.toFixed(2);
    }


    /* =========================================================
       UPDATE UNIT
       ========================================================= */

    function updateUnitLabel() {

        if (!durationUnit) {
            return;
        }


        durationUnit.textContent =
            MODE_LABELS[currentMode];
    }


    /* =========================================================
       UPDATE MODE BUTTONS
       ========================================================= */

    function updateModeButtons() {

        modeButtons.forEach(
            function (button) {

                const mode =
                    button.dataset.mode;


                button.classList.toggle(
                    "is-active",
                    mode === currentMode
                );

            }
        );
    }


    /* =========================================================
       UPDATE CALCULATION
       ========================================================= */

    function updateCalculation() {

        if (!durationInput) {
            return;
        }


        let value =
            Number(
                durationInput.value
            );


        /*
         * Invalid / empty state.
         */

        if (
            !Number.isFinite(value) ||
            value <= 0
        ) {

            if (calculatedDays) {

                calculatedDays.textContent =
                    "0";

            }


            if (dailyHours) {

                dailyHours.textContent =
                    "0";

            }


            if (dailyHoursLarge) {

                dailyHoursLarge.textContent =
                    "0";

            }


            updateClosingState(
                0,
                0
            );

            return;
        }


        /*
         * Prevent fractional duration values.
         * The interface is intentionally based on
         * whole days / months / years.
         */

        value =
            Math.max(
                1,
                Math.round(value)
            );


        durationInput.value =
            value;


        const days =
            calculateDays(
                value,
                currentMode
            );


        if (days <= 0) {
            return;
        }


        const requiredDailyHours =
            MASTERY_HOURS / days;


        const formattedDays =
            formatDays(days);


        const formattedHours =
            formatDailyHours(
                requiredDailyHours
            );


        /*
         * Main equation.
         */

        if (calculatedDays) {

            calculatedDays.textContent =
                formattedDays;

        }


        if (dailyHours) {

            dailyHours.textContent =
                formattedHours;

        }


        if (dailyHoursLarge) {

            dailyHoursLarge.textContent =
                formattedHours;

        }


        /*
         * Closing formula.
         */

        updateClosingState(
            value,
            requiredDailyHours
        );


        /*
         * Store current journey state.
         */

        saveJourneyState(
            value,
            currentMode
        );
    }


    /* =========================================================
       UPDATE CLOSING
       ========================================================= */

    function updateClosingState(
        value,
        hoursPerDay
    ) {

        if (
            closingDuration
        ) {

            if (
                value > 0
            ) {

                closingDuration.textContent =
                    value.toLocaleString(
                        "en-IN"
                    ) +
                    " " +
                    MODE_LABELS[
                        currentMode
                    ];

            } else {

                closingDuration.textContent =
                    "—";

            }
        }


        if (
            closingDaily
        ) {

            if (
                hoursPerDay > 0
            ) {

                closingDaily.textContent =
                    formatDailyHours(
                        hoursPerDay
                    ) +
                    " HOURS / DAY";

            } else {

                closingDaily.textContent =
                    "—";

            }
        }
    }


    /* =========================================================
       SET MODE
       ========================================================= */

    function setMode(mode) {

        if (
            !MODE_LABELS[mode]
        ) {

            return;

        }


        currentMode = mode;


        updateModeButtons();

        updateUnitLabel();


        /*
         * Keep the currently entered numerical value.
         * Only the meaning of that value changes.
         */

        updateCalculation();
    }


    /* =========================================================
       SET DURATION
       ========================================================= */

    function setDuration(value) {

        const numericValue =
            Number(value);


        if (
            !Number.isFinite(
                numericValue
            ) ||
            numericValue <= 0
        ) {

            return;

        }


        durationInput.value =
            Math.max(
                1,
                Math.round(
                    numericValue
                )
            );


        updateCalculation();
    }


    /* =========================================================
       SETUP MODE BUTTONS
       ========================================================= */

    function setupModeButtons() {

        if (
            !modeButtons.length
        ) {

            return;

        }


        modeButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const mode =
                            button.dataset.mode;


                        setMode(mode);


                        /*
                         * Focus the duration input
                         * after changing mode.
                         */

                        if (durationInput) {

                            durationInput.focus();

                        }

                    }
                );

            }
        );
    }


    /* =========================================================
       SETUP DURATION INPUT
       ========================================================= */

    function setupDurationInput() {

        if (!durationInput) {
            return;
        }


        durationInput.addEventListener(
            "input",
            function () {

                updateCalculation();

            }
        );


        durationInput.addEventListener(
            "change",
            function () {

                updateCalculation();

            }
        );


        durationInput.addEventListener(
            "blur",
            function () {

                let value =
                    Number(
                        durationInput.value
                    );


                if (
                    !Number.isFinite(value) ||
                    value <= 0
                ) {

                    durationInput.value = 1;

                } else {

                    durationInput.value =
                        Math.max(
                            1,
                            Math.round(
                                value
                            )
                        );

                }


                updateCalculation();

            }
        );


        /*
         * Prevent accidental non-numeric
         * characters in the number field.
         */

        durationInput.addEventListener(
            "keydown",
            function (event) {

                const allowedKeys = [
                    "Backspace",
                    "Delete",
                    "Tab",
                    "Escape",
                    "Enter",
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowUp",
                    "ArrowDown",
                    "Home",
                    "End"
                ];


                if (
                    allowedKeys.includes(
                        event.key
                    )
                ) {

                    return;

                }


                if (
                    event.ctrlKey ||
                    event.metaKey
                ) {

                    return;

                }


                if (
                    !/^\d$/.test(
                        event.key
                    )
                ) {

                    event.preventDefault();

                }

            }
        );
    }


    /* =========================================================
       EXAMPLE CARDS
       ========================================================= */

    function setupExampleCards() {

        if (
            !exampleCards.length
        ) {

            return;

        }


        exampleCards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        const years =
                            Number(
                                card.dataset.years
                            );


                        if (
                            !Number.isFinite(
                                years
                            ) ||
                            years <= 0
                        ) {

                            return;

                        }


                        /*
                         * Example cards always represent
                         * YEAR-based timelines.
                         */

                        currentMode =
                            "years";


                        updateModeButtons();

                        updateUnitLabel();


                        setDuration(
                            years
                        );


                        /*
                         * Highlight the selected
                         * example card.
                         */

                        exampleCards.forEach(
                            function (item) {

                                item.classList.remove(
                                    "is-selected"
                                );

                            }
                        );


                        card.classList.add(
                            "is-selected"
                        );


                        /*
                         * Bring the calculation
                         * into view.
                         */

                        const calculationSection =
                            document.querySelector(
                                ".calculation-section"
                            );


                        if (
                            calculationSection
                        ) {

                            calculationSection.scrollIntoView(
                                {
                                    behavior: "smooth",
                                    block: "center"
                                }
                            );

                        }

                    }
                );

            }
        );
    }


    /* =========================================================
       COMMITMENT BUTTONS
       ========================================================= */

    function setupCommitmentButtons() {

        if (
            !commitmentButtons.length
        ) {

            return;

        }


        commitmentButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        commitmentButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "is-selected"
                                );

                            }
                        );


                        button.classList.add(
                            "is-selected"
                        );


                        const commitment =
                            button.dataset.commitment;


                        saveCommitment(
                            commitment
                        );


                        /*
                         * Give the participant a subtle
                         * confirmation without opening
                         * another page or submitting data.
                         */

                        page.classList.add(
                            "commitment-made"
                        );


                        setTimeout(
                            function () {

                                page.classList.remove(
                                    "commitment-made"
                                );

                            },
                            900
                        );

                    }
                );

            }
        );
    }


    /* =========================================================
       SAVE COMMITMENT
       ========================================================= */

    function saveCommitment(
        commitment
    ) {

        try {

            sessionStorage.setItem(
                "ctmPathPage09Commitment",
                commitment
            );

        } catch (error) {

            /* Ignore storage errors. */

        }
    }


    /* =========================================================
       SAVE JOURNEY STATE
       ========================================================= */

    function saveJourneyState(
        value,
        mode
    ) {

        try {

            sessionStorage.setItem(
                "ctmPathPage09Duration",
                String(value)
            );

            sessionStorage.setItem(
                "ctmPathPage09Mode",
                mode
            );

        } catch (error) {

            /* Ignore storage errors. */

        }
    }


    /* =========================================================
       RESTORE JOURNEY STATE
       ========================================================= */

    function restoreJourneyState() {

        if (!durationInput) {
            return;
        }


        let savedMode = null;
        let savedDuration = null;


        try {

            savedMode =
                sessionStorage.getItem(
                    "ctmPathPage09Mode"
                );

            savedDuration =
                sessionStorage.getItem(
                    "ctmPathPage09Duration"
                );

        } catch (error) {

            return;

        }


        /*
         * Restore mode.
         */

        if (
            savedMode &&
            MODE_LABELS[savedMode]
        ) {

            currentMode =
                savedMode;

        }


        /*
         * Restore duration.
         */

        if (
            savedDuration
        ) {

            const numericValue =
                Number(
                    savedDuration
                );


            if (
                Number.isFinite(
                    numericValue
                ) &&
                numericValue > 0
            ) {

                durationInput.value =
                    Math.round(
                        numericValue
                    );

            }
        }


        updateModeButtons();

        updateUnitLabel();

        updateCalculation();


        /*
         * Restore commitment.
         */

        let savedCommitment = null;


        try {

            savedCommitment =
                sessionStorage.getItem(
                    "ctmPathPage09Commitment"
                );

        } catch (error) {

            savedCommitment = null;

        }


        if (
            savedCommitment
        ) {

            const button =
                document.querySelector(
                    '[data-commitment="' +
                    savedCommitment +
                    '"]'
                );


            if (button) {

                button.classList.add(
                    "is-selected"
                );

            }
        }
    }


    /* =========================================================
       SET DEFAULT STATE
       ========================================================= */

    function initializeDefaultState() {

        if (!durationInput) {
            return;
        }


        /*
         * Page 09 opens with the intended
         * 5-year example:
         *
         * 5,000 ÷ 1,825 = 2.74 hours/day
         */

        if (
            !durationInput.value
        ) {

            durationInput.value =
                "5";

        }


        currentMode =
            "years";


        updateModeButtons();

        updateUnitLabel();

        updateCalculation();
    }


    /* =========================================================
       KEYBOARD NAVIGATION
       ========================================================= */

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
                    tagName === "select";


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
                         * Support common CTM logo
                         * filename variations.
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

            }
        );
    }


    /* =========================================================
       PAGE READY
       ========================================================= */

    function revealPage() {

        page.classList.add(
            "page-ready"
        );
    }


    /* =========================================================
       INITIALIZE PAGE 09
       ========================================================= */

    function initPage09() {

        cacheElements();

        configureScrollRestoration();

        setupNavigation();

        markCurrentPage();

        setupAccessibility();

        setupModeButtons();

        setupDurationInput();

        setupExampleCards();

        setupCommitmentButtons();

        setupKeyboardNavigation();

        setupImageFallbacks();


        /*
         * Restore a participant's previous state if available.
         * Otherwise initialize the intended 5-year example.
         */

        let hasSavedState = false;


        try {

            hasSavedState =
                Boolean(
                    sessionStorage.getItem(
                        "ctmPathPage09Mode"
                    ) ||
                    sessionStorage.getItem(
                        "ctmPathPage09Duration"
                    )
                );

        } catch (error) {

            hasSavedState = false;

        }


        if (hasSavedState) {

            restoreJourneyState();

        } else {

            initializeDefaultState();

        }


        restoreTopPosition();

        revealPage();
    }


    /* =========================================================
       START
       ========================================================= */

    ready(initPage09);


    /* =========================================================
       BROWSER BACK / FORWARD
       ========================================================= */

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
