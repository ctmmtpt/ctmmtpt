/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 03 — JAVASCRIPT

   FILE:
   js/page03.js

   PAGE:
   03 / 16

   PURPOSE:
   DIGNITY → IDENTITY → AUTHORITY

   NAVIGATION:
   BACK → 02.html
   NEXT → 04.html

   PRINCIPLES:
   - Vanilla JavaScript only
   - Defensive event handling
   - Persistent state
   - No unnecessary animation
   - No duplicate event listeners
   - Preserve existing scoring model
   ============================================================ */

(function () {

    "use strict";


    /* ============================================================
       CONFIGURATION
       ============================================================ */

    const CONFIG = {

        STORAGE_KEY:
            "CTM_PATH_PAGE03_TRANSFORMATION",

        PREVIOUS_PAGE:
            "02.html",

        NEXT_PAGE:
            "04.html",

        PAGE_NUMBER:
            "03",

        TOTAL_PAGES:
            16,

        TOTAL_QUESTIONS:
            6,

        SAVE_FEEDBACK_DURATION:
            1400

    };


    /* ============================================================
       DIMENSION MAP
       ============================================================ */

    const DIMENSIONS = {

        dignity: {

            labelTa:
                "மதிப்பு",

            labelEn:
                "DIGNITY",

            questions: [
                "dignity-1",
                "dignity-2"
            ],

            scoreElement:
                "dignityScore",

            resultElement:
                "resultDignity"

        },


        identity: {

            labelTa:
                "அடையாளம்",

            labelEn:
                "IDENTITY",

            questions: [
                "identity-1",
                "identity-2"
            ],

            scoreElement:
                "identityScore",

            resultElement:
                "resultIdentity"

        },


        authority: {

            labelTa:
                "அதிகாரம்",

            labelEn:
                "AUTHORITY",

            questions: [
                "authority-1",
                "authority-2"
            ],

            scoreElement:
                "authorityScore",

            resultElement:
                "resultAuthority"

        }

    };


    /* ============================================================
       INTERNAL STATE
       ============================================================ */

    let state =
        createInitialState();

    let initialized =
        false;

    let saveFeedbackTimer =
        null;


    /* ============================================================
       INITIAL STATE
       ============================================================ */

    function createInitialState() {

        return {

            answers: {

                "dignity-1":
                    null,

                "dignity-2":
                    null,

                "identity-1":
                    null,

                "identity-2":
                    null,

                "authority-1":
                    null,

                "authority-2":
                    null

            },

            development:
                ""

        };

    }


    /* ============================================================
       INITIALISE
       ============================================================ */

    function init() {

        if (initialized) {
            return;
        }

        initialized = true;

        loadState();

        applySavedAnswers();

        bindScoreButtons();

        bindDevelopmentButtons();

        bindNavigation();

        calculateAndRender();

    }


    /* ============================================================
       LOAD SAVED STATE
       ============================================================ */

    function loadState() {

        try {

            const saved =
                window.localStorage.getItem(
                    CONFIG.STORAGE_KEY
                );

            if (!saved) {
                return;
            }

            const parsed =
                JSON.parse(saved);

            if (
                !parsed ||
                typeof parsed !== "object"
            ) {
                return;
            }


            /* ----------------------------------------------------
               ANSWERS
               ---------------------------------------------------- */

            if (
                parsed.answers &&
                typeof parsed.answers === "object"
            ) {

                Object.keys(
                    state.answers
                ).forEach(function (questionId) {

                    const rawValue =
                        parsed.answers[questionId];

                    if (
                        rawValue === null ||
                        rawValue === undefined ||
                        rawValue === ""
                    ) {
                        return;
                    }

                    const value =
                        Number(rawValue);

                    if (
                        Number.isFinite(value) &&
                        value >= 1 &&
                        value <= 10
                    ) {

                        state.answers[questionId] =
                            value;

                    }

                });

            }


            /* ----------------------------------------------------
               DEVELOPMENT AREA
               ---------------------------------------------------- */

            if (
                typeof parsed.development ===
                "string" &&
                DIMENSIONS[parsed.development]
            ) {

                state.development =
                    parsed.development;

            }

        }
        catch (error) {

            console.warn(
                "CTM PATH™ Page 03 state load failed:",
                error
            );

        }

    }


    /* ============================================================
       SAVE STATE
       ============================================================ */

    function saveState() {

        const scores =
            calculateScores();

        const payload = {

            page:
                CONFIG.PAGE_NUMBER,

            answers:
                state.answers,

            development:
                state.development,

            scores:
                scores,

            overallScore:
                calculateOverallScore(
                    scores
                ),

            updatedAt:
                new Date().toISOString()

        };


        try {

            window.localStorage.setItem(
                CONFIG.STORAGE_KEY,
                JSON.stringify(payload)
            );

            return true;

        }
        catch (error) {

            console.warn(
                "CTM PATH™ Page 03 state save failed:",
                error
            );

            return false;

        }

    }


    /* ============================================================
       VALIDATION
       ============================================================ */

    function isValidQuestionId(
        questionId
    ) {

        return Object.prototype.hasOwnProperty.call(
            state.answers,
            questionId
        );

    }


    function isValidScore(
        score
    ) {

        return (
            Number.isFinite(score) &&
            score >= 1 &&
            score <= 10
        );

    }


    /* ============================================================
       SCORE BUTTONS
       ============================================================ */

    function bindScoreButtons() {

        const buttons =
            document.querySelectorAll(
                ".score-option"
            );

        buttons.forEach(function (button) {

            if (
                button.dataset.page03Bound ===
                "true"
            ) {
                return;
            }

            button.dataset.page03Bound =
                "true";


            button.addEventListener(
                "click",
                function () {

                    const questionBlock =
                        button.closest(
                            ".question-block"
                        );

                    if (!questionBlock) {
                        return;
                    }


                    const questionId =
                        questionBlock.dataset.question;

                    const score =
                        Number(
                            button.dataset.score
                        );


                    if (
                        !isValidQuestionId(
                            questionId
                        ) ||
                        !isValidScore(score)
                    ) {
                        return;
                    }


                    state.answers[
                        questionId
                    ] = score;


                    updateQuestionButtons(
                        questionBlock,
                        score
                    );


                    calculateAndRender();

                    saveState();

                }
            );

        });

    }


    /* ============================================================
       APPLY SAVED ANSWERS
       ============================================================ */

    function applySavedAnswers() {

        Object.keys(
            state.answers
        ).forEach(function (questionId) {

            const score =
                state.answers[
                    questionId
                ];

            if (
                !isValidScore(score)
            ) {
                return;
            }


            const questionBlock =
                document.querySelector(
                    `[data-question="${questionId}"]`
                );

            if (!questionBlock) {
                return;
            }


            updateQuestionButtons(
                questionBlock,
                score
            );

        });

    }


    /* ============================================================
       UPDATE QUESTION BUTTONS
       ============================================================ */

    function updateQuestionButtons(
        questionBlock,
        selectedScore
    ) {

        if (!questionBlock) {
            return;
        }


        const buttons =
            questionBlock.querySelectorAll(
                ".score-option"
            );


        buttons.forEach(function (button) {

            const score =
                Number(
                    button.dataset.score
                );


            button.classList.remove(
                "selected",
                "score-low",
                "score-medium",
                "score-high"
            );


            if (
                score >= 1 &&
                score <= 3
            ) {

                button.classList.add(
                    "score-low"
                );

            }
            else if (
                score >= 4 &&
                score <= 7
            ) {

                button.classList.add(
                    "score-medium"
                );

            }
            else if (
                score >= 8 &&
                score <= 10
            ) {

                button.classList.add(
                    "score-high"
                );

            }


            if (
                score === selectedScore
            ) {

                button.classList.add(
                    "selected"
                );

            }

        });

    }


    /* ============================================================
       CALCULATE DIMENSION SCORES
       ============================================================ */

    function calculateScores() {

        const scores = {};


        Object.keys(
            DIMENSIONS
        ).forEach(function (dimensionKey) {

            const dimension =
                DIMENSIONS[
                    dimensionKey
                ];


            const values =
                dimension.questions
                    .map(function (questionId) {

                        return Number(
                            state.answers[
                                questionId
                            ]
                        );

                    })
                    .filter(function (value) {

                        return (
                            Number.isFinite(value) &&
                            value >= 1 &&
                            value <= 10
                        );

                    });


            if (
                values.length === 0
            ) {

                scores[
                    dimensionKey
                ] = null;

                return;

            }


            const total =
                values.reduce(
                    function (
                        sum,
                        value
                    ) {

                        return sum + value;

                    },
                    0
                );


            scores[
                dimensionKey
            ] =
                Number(
                    (
                        total /
                        values.length
                    ).toFixed(1)
                );

        });


        return scores;

    }


    /* ============================================================
       CALCULATE OVERALL SCORE
       ============================================================ */

    function calculateOverallScore(
        scores
    ) {

        if (
            !scores ||
            typeof scores !== "object"
        ) {
            return null;
        }


        const values = [

            scores.dignity,

            scores.identity,

            scores.authority

        ].filter(function (value) {

            return (
                typeof value === "number" &&
                Number.isFinite(value)
            );

        });


        if (
            values.length === 0
        ) {

            return null;

        }


        const total =
            values.reduce(
                function (
                    sum,
                    value
                ) {

                    return sum + value;

                },
                0
            );


        return Number(
            (
                total /
                values.length
            ).toFixed(1)
        );

    }


    /* ============================================================
       RENDER EVERYTHING
       ============================================================ */

    function calculateAndRender() {

        const scores =
            calculateScores();


        renderDimensionScore(
            "dignity",
            scores.dignity
        );


        renderDimensionScore(
            "identity",
            scores.identity
        );


        renderDimensionScore(
            "authority",
            scores.authority
        );


        renderResultScore(
            "dignity",
            scores.dignity
        );


        renderResultScore(
            "identity",
            scores.identity
        );


        renderResultScore(
            "authority",
            scores.authority
        );


        renderDevelopmentChoice(
            scores
        );

    }


    /* ============================================================
       DIMENSION SCORE DISPLAY
       ============================================================ */

    function renderDimensionScore(
        dimensionKey,
        score
    ) {

        const dimension =
            DIMENSIONS[
                dimensionKey
            ];

        if (!dimension) {
            return;
        }


        const element =
            document.getElementById(
                dimension.scoreElement
            );

        if (!element) {
            return;
        }


        if (score === null) {

            element.textContent =
                "—";

            element.className =
                "";

            return;

        }


        element.textContent =
            formatScore(score);

        element.className =
            getScoreClass(score);

    }


    /* ============================================================
       RESULT SCORE DISPLAY
       ============================================================ */

    function renderResultScore(
        dimensionKey,
        score
    ) {

        const dimension =
            DIMENSIONS[
                dimensionKey
            ];

        if (!dimension) {
            return;
        }


        const element =
            document.getElementById(
                dimension.resultElement
            );

        if (!element) {
            return;
        }


        if (score === null) {

            element.textContent =
                "—";

            element.className =
                "";

            return;

        }


        element.textContent =
            formatScore(score);

        element.className =
            getScoreClass(score);

    }


    /* ============================================================
       SCORE CLASS
       ============================================================ */

    function getScoreClass(
        score
    ) {

        if (
            typeof score !== "number" ||
            !Number.isFinite(score)
        ) {

            return "";

        }


        if (score <= 3) {

            return "score-red";

        }


        if (score <= 7) {

            return "score-orange";

        }


        return "score-green";

    }


    /* ============================================================
       FORMAT SCORE
       ============================================================ */

    function formatScore(
        score
    ) {

        if (
            typeof score !== "number" ||
            !Number.isFinite(score)
        ) {

            return "—";

        }


        if (
            Number.isInteger(score)
        ) {

            return String(score);

        }


        return score.toFixed(1);

    }


    /* ============================================================
       DEVELOPMENT AREA
       ============================================================ */

    function bindDevelopmentButtons() {

        const buttons =
            document.querySelectorAll(
                ".development-choice"
            );


        buttons.forEach(function (button) {

            if (
                button.dataset.page03Bound ===
                "true"
            ) {
                return;
            }

            button.dataset.page03Bound =
                "true";


            button.addEventListener(
                "click",
                function () {

                    const dimension =
                        button.dataset.development;


                    if (
                        !dimension ||
                        !DIMENSIONS[dimension]
                    ) {

                        return;

                    }


                    state.development =
                        dimension;


                    updateDevelopmentButtons();

                    renderDevelopmentMessage();

                    saveState();

                }
            );

        });


        updateDevelopmentButtons();

    }


    /* ============================================================
       UPDATE DEVELOPMENT BUTTONS
       ============================================================ */

    function updateDevelopmentButtons() {

        const buttons =
            document.querySelectorAll(
                ".development-choice"
            );


        buttons.forEach(function (button) {

            button.classList.toggle(
                "selected",
                button.dataset.development ===
                state.development
            );

        });

    }


    /* ============================================================
       FIND LOWEST DIMENSION
       ============================================================ */

    function getLowestDimension(
        scores
    ) {

        if (
            !scores ||
            typeof scores !== "object"
        ) {

            return null;

        }


        const available =
            Object.keys(
                DIMENSIONS
            ).filter(function (key) {

                return (
                    typeof scores[key] ===
                    "number" &&
                    Number.isFinite(scores[key])
                );

            });


        if (
            available.length === 0
        ) {

            return null;

        }


        return available.reduce(
            function (
                lowest,
                current
            ) {

                if (!lowest) {
                    return current;
                }


                if (
                    scores[current] <
                    scores[lowest]
                ) {

                    return current;

                }


                return lowest;

            },
            null
        );

    }


    /* ============================================================
       DEVELOPMENT RECOMMENDATION
       ============================================================ */

    function renderDevelopmentChoice(
        scores
    ) {

        const lowest =
            getLowestDimension(
                scores
            );


        /*
         * If the user has not manually selected
         * a development area, show the lowest-scoring
         * dimension as the suggested area.
         */

        if (!lowest) {

            renderDevelopmentMessage();

            return;

        }


        if (!state.development) {

            renderDevelopmentMessage(
                lowest
            );

            return;

        }


        renderDevelopmentMessage();

    }


    /* ============================================================
       DEVELOPMENT MESSAGE
       ============================================================ */

    function renderDevelopmentMessage(
        suggestedDimension
    ) {

        const element =
            document.getElementById(
                "developmentMessage"
            );


        if (!element) {
            return;
        }


        const key =
            state.development ||
            suggestedDimension;


        if (
            !key ||
            !DIMENSIONS[key]
        ) {

            element.textContent =
                "";

            return;

        }


        const dimension =
            DIMENSIONS[key];


        if (
            state.development
        ) {

            element.textContent =
                `${dimension.labelTa} — ${dimension.labelEn} உங்கள் அடுத்த வளர்ச்சி நிலையாக தேர்ந்தெடுக்கப்பட்டது.`;

        }
        else {

            element.textContent =
                `உங்கள் மதிப்பீட்டின் அடிப்படையில் ${dimension.labelTa} — ${dimension.labelEn} அதிக கவனம் தேவைப்படும் நிலையாகத் தெரிகிறது.`;

        }

    }


    /* ============================================================
       NAVIGATION
       ============================================================

       Page 03:
       BACK → 02.html
       NEXT → 04.html

       Existing HTML href values remain authoritative.

       JavaScript saves state immediately before navigation.
       ============================================================ */

    function bindNavigation() {

        const previous =
            document.getElementById(
                "previousButton"
            );

        const next =
            document.getElementById(
                "nextButton"
            );

        const save =
            document.getElementById(
                "saveButton"
            );


        /* --------------------------------------------------------
           PREVIOUS
           -------------------------------------------------------- */

        bindNavigationButton(
            previous,
            CONFIG.PREVIOUS_PAGE
        );


        /* --------------------------------------------------------
           NEXT
           -------------------------------------------------------- */

        bindNavigationButton(
            next,
            CONFIG.NEXT_PAGE
        );


        /* --------------------------------------------------------
           SAVE
           -------------------------------------------------------- */

        if (
            save &&
            save.dataset.page03Bound !==
            "true"
        ) {

            save.dataset.page03Bound =
                "true";


            save.addEventListener(
                "click",
                function () {

                    saveState();

                    showSavedMessage();

                }
            );

        }

    }


    /* ============================================================
       NAVIGATION BUTTON HELPER
       ============================================================ */

    function bindNavigationButton(
        element,
        fallbackPage
    ) {

        if (!element) {
            return;
        }


        if (
            element.dataset.page03Bound ===
            "true"
        ) {
            return;
        }

        element.dataset.page03Bound =
            "true";


        element.addEventListener(
            "click",
            function (event) {

                saveState();


                /*
                 * If the existing element is an anchor,
                 * preserve its frozen href and normal
                 * browser navigation behavior.
                 */

                if (
                    element.tagName.toLowerCase() ===
                    "a"
                ) {

                    return;

                }


                event.preventDefault();


                if (fallbackPage) {

                    window.location.href =
                        fallbackPage;

                }

            }
        );

    }


    /* ============================================================
       SAVE CONFIRMATION
       ============================================================ */

    function showSavedMessage() {

        const button =
            document.getElementById(
                "saveButton"
            );


        if (!button) {
            return;
        }


        if (
            saveFeedbackTimer !== null
        ) {

            window.clearTimeout(
                saveFeedbackTimer
            );

        }


        const originalHTML =
            button.dataset.originalHtml ||
            button.innerHTML;


        button.dataset.originalHtml =
            originalHTML;


        button.textContent =
            "✓ SAVED";


        button.setAttribute(
            "aria-live",
            "polite"
        );


        saveFeedbackTimer =
            window.setTimeout(
                function () {

                    button.innerHTML =
                        originalHTML;

                    button.removeAttribute(
                        "aria-live"
                    );

                    saveFeedbackTimer =
                        null;

                },
                CONFIG.SAVE_FEEDBACK_DURATION
            );

    }


    /* ============================================================
       PUBLIC API
       ============================================================ */

    window.CTMPathPage03 = {

        /* --------------------------------------------------------
           RETURN COMPLETE STATE
           -------------------------------------------------------- */

        getState:
            function () {

                return JSON.parse(
                    JSON.stringify(
                        state
                    )
                );

            },


        /* --------------------------------------------------------
           RETURN DIMENSION SCORES
           -------------------------------------------------------- */

        getScores:
            function () {

                return calculateScores();

            },


        /* --------------------------------------------------------
           RETURN OVERALL SCORE
           -------------------------------------------------------- */

        getOverallScore:
            function () {

                const scores =
                    calculateScores();

                return calculateOverallScore(
                    scores
                );

            },


        /* --------------------------------------------------------
           SAVE
           -------------------------------------------------------- */

        save:
            function () {

                return saveState();

            },


        /* --------------------------------------------------------
           RESET
           -------------------------------------------------------- */

        reset:
            function () {

                state =
                    createInitialState();


                if (
                    saveFeedbackTimer !== null
                ) {

                    window.clearTimeout(
                        saveFeedbackTimer
                    );

                    saveFeedbackTimer =
                        null;

                }


                try {

                    window.localStorage.removeItem(
                        CONFIG.STORAGE_KEY
                    );

                }
                catch (error) {

                    console.warn(
                        "CTM PATH™ Page 03 reset failed:",
                        error
                    );

                }


                document
                    .querySelectorAll(
                        ".score-option"
                    )
                    .forEach(
                        function (button) {

                            button.classList.remove(
                                "selected",
                                "score-low",
                                "score-medium",
                                "score-high"
                            );

                        }
                    );


                document
                    .querySelectorAll(
                        ".development-choice"
                    )
                    .forEach(
                        function (button) {

                            button.classList.remove(
                                "selected"
                            );

                        }
                    );


                calculateAndRender();

            }

    };


    /* ============================================================
       START
       ============================================================ */

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

    }
    else {

        init();

    }


})();
