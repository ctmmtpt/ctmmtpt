/* =========================================================
   CTM PATH™ MILLIONAIRES™ — PAGE 08
   THE MONEY QUESTION™
   COMPLETE PAGE-SPECIFIC JAVASCRIPT
   ========================================================= */

(function () {
    "use strict";


    /* =========================================================
       PAGE GUARD
       ========================================================= */

    const page = document.body;

    if (!page || !page.classList.contains("page-08")) {
        return;
    }


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
       ELEMENT REFERENCES
       ========================================================= */

    let incomeOptions;
    let customIncomeBox;
    let customIncomeInput;

    let investmentInput;
    let fullInvestmentDisplay;
    let tenPercentDisplay;

    let decisionButtons;


    /* =========================================================
       NUMBER FORMATTING
       ========================================================= */

    function formatCurrency(value) {

        const number = Number(value);

        if (!Number.isFinite(number) || number <= 0) {
            return "₹0";
        }

        return "₹" + Math.round(number).toLocaleString("en-IN");
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

        const links = document.querySelectorAll(
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
         * Prevent the browser from reopening Page 08 halfway
         * down the page after navigating back from Page 09.
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
       CURRENT PAGE ACCESSIBILITY
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
       NAVIGATION ACCESSIBILITY
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
    }


    /* =========================================================
       INCOME OPTION SELECTION
       ========================================================= */

    function setupIncomeOptions() {

        incomeOptions =
            document.querySelectorAll(
                ".income-option"
            );

        customIncomeBox =
            document.querySelector(
                ".custom-income-box"
            );

        customIncomeInput =
            document.getElementById(
                "customIncome"
            );


        if (!incomeOptions.length) {
            return;
        }


        incomeOptions.forEach(function (option) {

            option.addEventListener(
                "click",
                function () {

                    /*
                     * Remove previous selection.
                     */

                    incomeOptions.forEach(
                        function (item) {
                            item.classList.remove(
                                "is-selected"
                            );
                        }
                    );


                    /*
                     * Select current option.
                     */

                    option.classList.add(
                        "is-selected"
                    );


                    /*
                     * Custom income option.
                     */

                    const isCustom =
                        option.classList.contains(
                            "income-custom"
                        );


                    if (isCustom) {

                        if (customIncomeBox) {

                            customIncomeBox.classList.add(
                                "is-visible"
                            );

                        }

                        if (customIncomeInput) {

                            customIncomeInput.focus();

                        }

                        return;
                    }


                    /*
                     * Extract numeric value from
                     * predefined income option.
                     */

                    const numericValue =
                        extractCurrencyValue(
                            option.textContent
                        );


                    if (customIncomeInput) {

                        customIncomeInput.value =
                            numericValue || "";

                    }


                    /*
                     * Hide custom input because
                     * a predefined amount was chosen.
                     */

                    if (customIncomeBox) {

                        customIncomeBox.classList.remove(
                            "is-visible"
                        );

                    }

                }
            );

        });
    }


    /* =========================================================
       EXTRACT CURRENCY VALUE
       ========================================================= */

    function extractCurrencyValue(text) {

        if (!text) {
            return 0;
        }


        /*
         * Convert:
         *
         * ₹50,000
         * ₹1,00,000
         * ₹10,00,000+
         *
         * into a numeric value.
         */

        const cleaned =
            text
                .replace(/₹/g, "")
                .replace(/,/g, "")
                .replace(/\+/g, "")
                .replace(/[^\d.]/g, "")
                .trim();


        const value =
            Number(cleaned);


        return Number.isFinite(value)
            ? value
            : 0;
    }


    /* =========================================================
       CUSTOM INCOME INPUT
       ========================================================= */

    function setupCustomIncomeInput() {

        if (!customIncomeInput) {
            return;
        }


        customIncomeInput.addEventListener(
            "input",
            function () {

                const value =
                    Number(
                        customIncomeInput.value
                    );


                /*
                 * Selecting a custom amount should
                 * automatically activate the custom option.
                 */

                incomeOptions.forEach(
                    function (option) {

                        option.classList.remove(
                            "is-selected"
                        );

                    }
                );


                const customOption =
                    document.querySelector(
                        ".income-custom"
                    );


                if (
                    customOption &&
                    value > 0
                ) {

                    customOption.classList.add(
                        "is-selected"
                    );

                }

            }
        );


        customIncomeInput.addEventListener(
            "blur",
            function () {

                if (
                    customIncomeInput.value === ""
                ) {
                    return;
                }


                const value =
                    Number(
                        customIncomeInput.value
                    );


                if (
                    !Number.isFinite(value) ||
                    value < 0
                ) {

                    customIncomeInput.value = "";

                }

            }
        );
    }


    /* =========================================================
       INVESTMENT INPUT
       ========================================================= */

    function setupInvestmentInput() {

        investmentInput =
            document.getElementById(
                "requiredInvestment"
            );

        fullInvestmentDisplay =
            document.getElementById(
                "fullInvestmentDisplay"
            );

        tenPercentDisplay =
            document.getElementById(
                "tenPercentDisplay"
            );


        if (!investmentInput) {
            return;
        }


        investmentInput.addEventListener(
            "input",
            function () {

                updateInvestmentDisplays();

            }
        );


        investmentInput.addEventListener(
            "change",
            function () {

                updateInvestmentDisplays();

            }
        );


        /*
         * Initial state.
         */

        updateInvestmentDisplays();
    }


    /* =========================================================
       UPDATE INVESTMENT DISPLAYS
       ========================================================= */

    function updateInvestmentDisplays() {

        if (!investmentInput) {
            return;
        }


        const investment =
            Number(
                investmentInput.value
            );


        if (
            !Number.isFinite(investment) ||
            investment <= 0
        ) {

            if (fullInvestmentDisplay) {

                fullInvestmentDisplay.textContent =
                    "₹0";

            }


            if (tenPercentDisplay) {

                tenPercentDisplay.textContent =
                    "₹0";

            }

            return;
        }


        const tenPercent =
            investment * 0.10;


        if (fullInvestmentDisplay) {

            fullInvestmentDisplay.textContent =
                formatCurrency(
                    investment
                );

        }


        if (tenPercentDisplay) {

            tenPercentDisplay.textContent =
                formatCurrency(
                    tenPercent
                );

        }
    }


    /* =========================================================
       OPTIONAL: SHOW CALCULATED 10% WHEN USER LEAVES INPUT
       ========================================================= */

    function setupInvestmentFocus() {

        if (!investmentInput) {
            return;
        }


        investmentInput.addEventListener(
            "focus",
            function () {

                investmentInput
                    .closest(
                        ".investment-input-box"
                    )
                    ?.classList.add(
                        "is-active"
                    );

            }
        );


        investmentInput.addEventListener(
            "blur",
            function () {

                investmentInput
                    .closest(
                        ".investment-input-box"
                    )
                    ?.classList.remove(
                        "is-active"
                    );

            }
        );
    }


    /* =========================================================
       DECISION BUTTONS
       ========================================================= */

    function setupDecisionButtons() {

        decisionButtons =
            document.querySelectorAll(
                ".decision-button"
            );


        if (!decisionButtons.length) {
            return;
        }


        decisionButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        decisionButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "is-selected"
                                );

                            }
                        );


                        button.classList.add(
                            "is-selected"
                        );


                        const decision =
                            button.dataset.decision;


                        /*
                         * Store only the local page state.
                         * This does not submit data anywhere.
                         */

                        try {

                            sessionStorage.setItem(
                                "ctmPathPage08Decision",
                                decision
                            );

                        } catch (error) {
                            /* Ignore storage errors. */
                        }

                    }
                );

            }
        );


        /*
         * Restore previous selection during
         * same-session navigation.
         */

        try {

            const savedDecision =
                sessionStorage.getItem(
                    "ctmPathPage08Decision"
                );


            if (savedDecision) {

                const savedButton =
                    document.querySelector(
                        '[data-decision="' +
                        savedDecision +
                        '"]'
                    );


                if (savedButton) {

                    savedButton.classList.add(
                        "is-selected"
                    );

                }

            }

        } catch (error) {
            /* Ignore storage errors. */
        }
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


        images.forEach(function (image) {

            image.addEventListener(
                "error",
                function () {

                    if (
                        image.dataset
                            .fallbackAttempted === "true"
                    ) {
                        return;
                    }


                    image.dataset
                        .fallbackAttempted = "true";


                    const source =
                        image.getAttribute(
                            "src"
                        ) || "";


                    /*
                     * Support both common CTM logo
                     * filename capitalizations.
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
       INITIALIZE
       ========================================================= */

    function initPage08() {

        configureScrollRestoration();

        setupNavigation();

        markCurrentPage();

        setupAccessibility();

        setupIncomeOptions();

        setupCustomIncomeInput();

        setupInvestmentInput();

        setupInvestmentFocus();

        setupDecisionButtons();

        setupKeyboardNavigation();

        setupImageFallbacks();

        restoreTopPosition();

        revealPage();
    }


    /* =========================================================
       START
       ========================================================= */

    ready(initPage08);


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
