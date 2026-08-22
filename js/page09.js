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

    const MODE_LABELS = Object.freeze({
        years: "YEARS",
        months: "MONTHS",
        days: "DAYS"
    });

    const STORAGE_KEYS = Object.freeze({
        duration: "ctmPathPage09Duration",
        mode: "ctmPathPage09Mode",
        commitment: "ctmPathPage09Commitment",
        returnScroll: "ctmPathReturnScroll"
    });

    let currentMode = "years";
    let initialized = false;


    /* =========================================================
       DOM REFERENCES
       ========================================================= */

    let durationInput = null;
    let durationUnit = null;
    let durationNote = null;

    let modeButtons = [];
    let exampleCards = [];
    let commitmentButtons = [];

    let calculatedDays = null;
    let dailyHours = null;
    let dailyHoursLarge = null;

    let closingDuration = null;
    let closingDaily = null;

    let originalDurationNote = "";


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
        if (!("scrollRestoration" in history)) {
            return;
        }

        try {
            history.scrollRestoration = "manual";
        } catch (error) {
            /* Ignore unsupported browser behavior. */
        }
    }


    /* =========================================================
       PAGE NAVIGATION
       ========================================================= */

    function setupNavigation() {
        const links = document.querySelectorAll(
            ".page-navigation a[href]"
        );

        links.forEach(function (link) {
            link.addEventListener("click", function () {
                const href = link.getAttribute("href");

                if (!href || href.charAt(0) === "#") {
                    return;
                }

                try {
                    sessionStorage.setItem(
                        STORAGE_KEYS.returnScroll,
                        "0"
                    );
                } catch (error) {
                    /* Navigation still works. */
                }
            });
        });
    }


    /* =========================================================
       RESTORE PAGE POSITION
       ========================================================= */

    function restoreTopPosition() {
        try {
            const savedPosition = sessionStorage.getItem(
                STORAGE_KEYS.returnScroll
            );

            if (savedPosition === "0") {
                sessionStorage.removeItem(
                    STORAGE_KEYS.returnScroll
                );

                scrollToTop();
                return;
            }
        } catch (error) {
            /* Ignore storage errors. */
        }

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
        const current = document.querySelector(
            ".nav-current"
        );

        if (!current) {
            return;
        }

        current.setAttribute("aria-current", "page");
    }


    /* =========================================================
       ACCESSIBILITY
       ========================================================= */

    function setupAccessibility() {
        const links = document.querySelectorAll(
            ".page-navigation a"
        );

        links.forEach(function (link) {
            if (link.hasAttribute("aria-label")) {
                return;
            }

            const text = link.textContent.trim();

            if (text) {
                link.setAttribute("aria-label", text);
            }
        });

        if (durationInput) {
            durationInput.setAttribute(
                "aria-describedby",
                "durationUnit"
            );

            if (!durationInput.getAttribute("inputmode")) {
                durationInput.setAttribute("inputmode", "numeric");
            }

            if (!durationInput.getAttribute("min")) {
                durationInput.setAttribute("min", "1");
            }

            if (!durationInput.getAttribute("step")) {
                durationInput.setAttribute("step", "1");
            }
        }

        exampleCards.forEach(function (card) {
            if (!card.hasAttribute("role")) {
                card.setAttribute("role", "button");
            }

            if (!card.hasAttribute("tabindex")) {
                card.setAttribute("tabindex", "0");
            }

            if (!card.hasAttribute("aria-label")) {
                const text = card.textContent.trim();

                if (text) {
                    card.setAttribute("aria-label", text);
                }
            }
        });
    }


    /* =========================================================
       ELEMENT INITIALIZATION
       ========================================================= */

    function cacheElements() {
        durationInput = document.getElementById(
            "masteryDuration"
        );

        durationUnit = document.getElementById(
            "durationUnit"
        );

        durationNote = document.querySelector(
            ".duration-note"
        );

        if (durationNote) {
            originalDurationNote = durationNote.textContent.trim();
        }

        modeButtons = Array.from(
            document.querySelectorAll(
                ".pace-mode-button"
            )
        );

        exampleCards = Array.from(
            document.querySelectorAll(
                ".example-card"
            )
        );

        commitmentButtons = Array.from(
            document.querySelectorAll(
                ".commitment-button"
            )
        );

        calculatedDays = document.getElementById(
            "calculatedDays"
        );

        dailyHours = document.getElementById(
            "dailyHours"
        );

        dailyHoursLarge = document.getElementById(
            "dailyHoursLarge"
        );

        closingDuration = document.getElementById(
            "closingDuration"
        );

        closingDaily = document.getElementById(
            "closingDaily"
        );
    }


    /* =========================================================
       NUMBER / VALIDATION HELPERS
       ========================================================= */

    function getNumericDuration(value) {
        if (typeof value === "number") {
            return value;
        }

        if (typeof value !== "string") {
            return NaN;
        }

        const trimmed = value.trim();

        if (!trimmed) {
            return NaN;
        }

        return Number(trimmed);
    }


    function getDurationLimit() {
        if (!durationInput) {
            return Number.MAX_SAFE_INTEGER;
        }

        const maxAttribute = Number(
            durationInput.getAttribute("max")
        );

        if (
            Number.isFinite(maxAttribute) &&
            maxAttribute > 0
        ) {
            return Math.floor(maxAttribute);
        }

        return Number.MAX_SAFE_INTEGER;
    }


    function validateDuration(value, mode) {
        const numericValue = getNumericDuration(value);

        if (!Number.isFinite(numericValue)) {
            return {
                valid: false,
                value: 0,
                message: "Enter a timeline to continue."
            };
        }

        if (numericValue <= 0) {
            return {
                valid: false,
                value: 0,
                message: "Enter a number greater than zero."
            };
        }

        if (!Number.isSafeInteger(Math.round(numericValue))) {
            return {
                valid: false,
                value: 0,
                message: "Enter a smaller whole number."
            };
        }

        const roundedValue = Math.round(numericValue);
        const limit = getDurationLimit();

        if (roundedValue > limit) {
            return {
                valid: false,
                value: 0,
                message:
                    "Please enter a value within the available timeline."
            };
        }

        const days = calculateDays(
            roundedValue,
            mode
        );

        if (
            !Number.isFinite(days) ||
            days <= 0 ||
            days > Number.MAX_SAFE_INTEGER
        ) {
            return {
                valid: false,
                value: 0,
                message: "That timeline is too large to calculate safely."
            };
        }

        return {
            valid: true,
            value: roundedValue,
            message: ""
        };
    }


    function setValidationState(isValid, message) {
        if (!durationInput) {
            return;
        }

        durationInput.setAttribute(
            "aria-invalid",
            isValid ? "false" : "true"
        );

        try {
            durationInput.setCustomValidity(
                isValid ? "" : message
            );
        } catch (error) {
            /* Ignore unsupported validation behavior. */
        }

        if (durationNote) {
            durationNote.textContent =
                isValid
                    ? originalDurationNote
                    : message;
        }
    }


    /* =========================================================
       CALCULATE DAYS
       ========================================================= */

    function calculateDays(value, mode) {
        const numericValue = Number(value);

        if (
            !Number.isFinite(numericValue) ||
            numericValue <= 0
        ) {
            return 0;
        }

        switch (mode) {
            case "years":
                return numericValue * DAYS_PER_YEAR;

            case "months":
                return numericValue * DAYS_PER_MONTH;

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
        if (!Number.isFinite(value)) {
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

        return Math.round(value).toLocaleString("en-IN");
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

        durationUnit.textContent = MODE_LABELS[currentMode];
    }


    /* =========================================================
       UPDATE MODE BUTTONS
       ========================================================= */

    function updateModeButtons() {
        modeButtons.forEach(function (button) {
            const mode = button.dataset.mode;
            const active = mode === currentMode;

            button.classList.toggle(
                "is-active",
                active
            );

            button.setAttribute(
                "aria-pressed",
                active ? "true" : "false"
            );
        });
    }


    /* =========================================================
       UPDATE CALCULATION
       ========================================================= */

    function updateCalculation(options) {
        const settings = options || {};

        if (!durationInput) {
            return;
        }

        const validation = validateDuration(
            durationInput.value,
            currentMode
        );

        if (!validation.valid) {
            setValidationState(
                false,
                validation.message
            );

            if (calculatedDays) {
                calculatedDays.textContent = "0";
            }

            if (dailyHours) {
                dailyHours.textContent = "0";
            }

            if (dailyHoursLarge) {
                dailyHoursLarge.textContent = "0";
            }

            updateClosingState(0, 0);

            return;
        }

        const value = validation.value;

        setValidationState(true, "");

        if (settings.normalize !== false) {
            durationInput.value = String(value);
        }

        const days = calculateDays(
            value,
            currentMode
        );

        const requiredDailyHours =
            MASTERY_HOURS / days;

        if (
            !Number.isFinite(requiredDailyHours) ||
            requiredDailyHours <= 0
        ) {
            setValidationState(
                false,
                "That timeline cannot be calculated safely."
            );

            return;
        }

        const formattedDays = formatDays(days);

        const formattedHours = formatDailyHours(
            requiredDailyHours
        );

        if (calculatedDays) {
            calculatedDays.textContent = formattedDays;
        }

        if (dailyHours) {
            dailyHours.textContent = formattedHours;
        }

        if (dailyHoursLarge) {
            dailyHoursLarge.textContent = formattedHours;
        }

        updateClosingState(
            value,
            requiredDailyHours
        );

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
        if (closingDuration) {
            if (value > 0) {
                closingDuration.textContent =
                    formatNumber(value, 0) +
                    " " +
                    MODE_LABELS[currentMode];
            } else {
                closingDuration.textContent = "—";
            }
        }

        if (closingDaily) {
            if (hoursPerDay > 0) {
                closingDaily.textContent =
                    formatDailyHours(hoursPerDay) +
                    " HOURS / DAY";
            } else {
                closingDaily.textContent = "—";
            }
        }
    }


    /* =========================================================
       SET MODE
       ========================================================= */

    function setMode(mode) {
        if (!MODE_LABELS[mode]) {
            return;
        }

        currentMode = mode;

        updateModeButtons();
        updateUnitLabel();
        updateCalculation();
    }


    /* =========================================================
       SET DURATION
       ========================================================= */

    function setDuration(value) {
        if (!durationInput) {
            return;
        }

        const numericValue = getNumericDuration(value);

        if (
            !Number.isFinite(numericValue) ||
            numericValue <= 0
        ) {
            return;
        }

        const limit = getDurationLimit();

        const normalized = Math.min(
            limit,
            Math.max(1, Math.round(numericValue))
        );

        durationInput.value = String(normalized);

        updateCalculation();
    }


    /* =========================================================
       SETUP MODE BUTTONS
       ========================================================= */

    function setupModeButtons() {
        modeButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                setMode(button.dataset.mode);

                if (durationInput) {
                    durationInput.focus({
                        preventScroll: true
                    });
                }
            });
        });
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
                updateCalculation({
                    normalize: false
                });
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
                const validation = validateDuration(
                    durationInput.value,
                    currentMode
                );

                if (!validation.valid) {
                    updateCalculation({
                        normalize: false
                    });

                    return;
                }

                durationInput.value = String(
                    validation.value
                );

                updateCalculation();
            }
        );

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

                if (allowedKeys.includes(event.key)) {
                    return;
                }

                if (event.ctrlKey || event.metaKey) {
                    return;
                }

                if (!/^\d$/.test(event.key)) {
                    event.preventDefault();
                }
            }
        );

        durationInput.addEventListener(
            "paste",
            function (event) {
                const pasted =
                    event.clipboardData
                        ? event.clipboardData.getData("text")
                        : "";

                if (!/^\d+$/.test(pasted.trim())) {
                    event.preventDefault();
                }
            }
        );

        durationInput.addEventListener(
            "wheel",
            function () {
                if (document.activeElement === durationInput) {
                    durationInput.blur();
                }
            },
            { passive: true }
        );
    }


    /* =========================================================
       EXAMPLE CARD ACTIVATION
       ========================================================= */

    function activateExampleCard(card) {
        const years = Number(
            card.dataset.years
        );

        if (
            !Number.isFinite(years) ||
            years <= 0
        ) {
            return;
        }

        currentMode = "years";

        updateModeButtons();
        updateUnitLabel();
        setDuration(years);

        exampleCards.forEach(function (item) {
            item.classList.remove("is-selected");

            item.setAttribute(
                "aria-pressed",
                "false"
            );
        });

        card.classList.add("is-selected");

        card.setAttribute(
            "aria-pressed",
            "true"
        );

        const calculationSection = document.querySelector(
            ".calculation-section"
        );

        if (calculationSection) {
            calculationSection.scrollIntoView({
                behavior:
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                        ? "auto"
                        : "smooth",
                block: "center"
            });
        }
    }


    function setupExampleCards() {
        exampleCards.forEach(function (card) {
            card.setAttribute(
                "aria-pressed",
                "false"
            );

            card.addEventListener(
                "click",
                function () {
                    activateExampleCard(card);
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
                        activateExampleCard(card);
                    }
                }
            );
        });
    }


    /* =========================================================
       COMMITMENT BUTTONS
       ========================================================= */

    function selectCommitment(button) {
        commitmentButtons.forEach(function (item) {
            item.classList.remove("is-selected");

            item.setAttribute(
                "aria-pressed",
                "false"
            );
        });

        button.classList.add("is-selected");

        button.setAttribute(
            "aria-pressed",
            "true"
        );

        const commitment =
            button.dataset.commitment;

        if (commitment) {
            saveCommitment(commitment);
        }

        page.classList.add("commitment-made");

        window.setTimeout(function () {
            page.classList.remove(
                "commitment-made"
            );
        }, 900);
    }


    function setupCommitmentButtons() {
        commitmentButtons.forEach(function (button) {
            if (!button.hasAttribute("aria-pressed")) {
                button.setAttribute(
                    "aria-pressed",
                    "false"
                );
            }

            button.addEventListener(
                "click",
                function () {
                    selectCommitment(button);
                }
            );
        });
    }


    /* =========================================================
       SAVE COMMITMENT
       ========================================================= */

    function saveCommitment(commitment) {
        try {
            sessionStorage.setItem(
                STORAGE_KEYS.commitment,
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
                STORAGE_KEYS.duration,
                String(value)
            );

            sessionStorage.setItem(
                STORAGE_KEYS.mode,
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
        let savedCommitment = null;

        try {
            savedMode = sessionStorage.getItem(
                STORAGE_KEYS.mode
            );

            savedDuration = sessionStorage.getItem(
                STORAGE_KEYS.duration
            );

            savedCommitment = sessionStorage.getItem(
                STORAGE_KEYS.commitment
            );
        } catch (error) {
            savedMode = null;
            savedDuration = null;
            savedCommitment = null;
        }

        if (
            savedMode &&
            MODE_LABELS[savedMode]
        ) {
            currentMode = savedMode;
        }

        if (savedDuration) {
            const numericValue = Number(
                savedDuration
            );

            if (
                Number.isFinite(numericValue) &&
                numericValue > 0
            ) {
                durationInput.value = String(
                    Math.round(numericValue)
                );
            }
        }

        updateModeButtons();
        updateUnitLabel();
        updateCalculation();

        if (savedCommitment) {
            commitmentButtons.forEach(function (button) {
                const selected =
                    button.dataset.commitment ===
                    savedCommitment;

                button.classList.toggle(
                    "is-selected",
                    selected
                );

                button.setAttribute(
                    "aria-pressed",
                    selected ? "true" : "false"
                );
            });
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

        if (!durationInput.value) {
            durationInput.value = "5";
        }

        currentMode = "years";

        updateModeButtons();
        updateUnitLabel();
        updateCalculation();
    }


    /* =========================================================
       RESTORE / VALIDATE COMMITMENT STATE
       ========================================================= */

    function restoreCommitmentState() {
        let savedCommitment = null;

        try {
            savedCommitment = sessionStorage.getItem(
                STORAGE_KEYS.commitment
            );
        } catch (error) {
            savedCommitment = null;
        }

        if (!savedCommitment) {
            return;
        }

        commitmentButtons.forEach(function (button) {
            const selected =
                button.dataset.commitment ===
                savedCommitment;

            button.classList.toggle(
                "is-selected",
                selected
            );

            button.setAttribute(
                "aria-pressed",
                selected ? "true" : "false"
            );
        });
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

                const tagName = activeElement
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
            document.querySelectorAll("img");

        images.forEach(function (image) {
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
        });
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
        if (initialized) {
            return;
        }

        initialized = true;

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
            hasSavedState = Boolean(
                sessionStorage.getItem(
                    STORAGE_KEYS.mode
                ) ||
                sessionStorage.getItem(
                    STORAGE_KEYS.duration
                )
            );
        } catch (error) {
            hasSavedState = false;
        }

        if (hasSavedState) {
            restoreJourneyState();
        } else {
            initializeDefaultState();
            restoreCommitmentState();
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
                        STORAGE_KEYS.returnScroll
                    );

                if (
                    savedPosition === "0"
                ) {
                    sessionStorage.removeItem(
                        STORAGE_KEYS.returnScroll
                    );

                    scrollToTop();
                }
            } catch (error) {
                /* Ignore storage errors. */
            }
        }
    );


})();
