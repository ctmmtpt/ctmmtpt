
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 03 — JAVASCRIPT

   FILE:
   js/page03.js

   PAGE:
   03 / 16

   PURPOSE:
   DIGNITY → IDENTITY → AUTHORITY
   ============================================================ */

(function () {

    "use strict";


    /* ========================================================
       CONFIGURATION
       ======================================================== */

    const CONFIG = {

        STORAGE_KEY:
            "CTM_PATH_PAGE03_TRANSFORMATION",

        PREVIOUS_PAGE:
            "01.html",

        NEXT_PAGE:
            "04.html",

        TOTAL_QUESTIONS:
            6

    };


    /* ========================================================
       QUESTION MAP
       ======================================================== */

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


    /* ========================================================
       STATE
       ======================================================== */

    let state = {

        answers: {

            "dignity-1": null,

            "dignity-2": null,

            "identity-1": null,

            "identity-2": null,

            "authority-1": null,

            "authority-2": null

        },

        development:
            ""

    };


    /* ========================================================
       INITIALISE
       ======================================================== */

    function init() {

        loadState();

        applySavedAnswers();

        bindScoreButtons();

        bindDevelopmentButtons();

        bindNavigation();

        calculateAndRender();

    }


    /* ========================================================
       LOAD STATE
       ======================================================== */

    function loadState() {

        try {

            const saved =
                localStorage.getItem(
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


            if (
                parsed.answers &&
                typeof parsed.answers === "object"
            ) {

                Object.keys(
                    state.answers
                ).forEach(function (key) {

                    if (
                        parsed.answers[key] !==
                        undefined
                    ) {

                        const value =
                            Number(
                                parsed.answers[key]
                            );


                        if (
                            value >= 1 &&
                            value <= 10
                        ) {

                            state.answers[key] =
                                value;

                        }

                    }

                });

            }


            if (
                typeof parsed.development ===
                "string"
            ) {

                state.development =
                    parsed.development;

            }

        }
        catch (error) {

            console.warn(
                "Page 03 state load failed:",
                error
            );

        }

    }


    /* ========================================================
       SAVE STATE
       ======================================================== */

    function saveState() {

        const payload = {

            page:
                "03",

            answers:
                state.answers,

            development:
                state.development,

            scores:
                calculateScores(),

            updatedAt:
                new Date().toISOString()

        };


        try {

            localStorage.setItem(
                CONFIG.STORAGE_KEY,
                JSON.stringify(payload)
            );

        }
        catch (error) {

            console.warn(
                "Page 03 state save failed:",
                error
            );

        }

    }


    /* ========================================================
       SCORE BUTTONS
       ======================================================== */

    function bindScoreButtons() {

        const buttons =
            document.querySelectorAll(
                ".score-option"
            );


        buttons.forEach(function (button) {

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
                        !questionId ||
                        !Number.isFinite(score) ||
                        score < 1 ||
                        score > 10
                    ) {

                        return;

                    }


                    state.answers[questionId] =
                        score;


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


    /* ========================================================
       APPLY SAVED ANSWERS
       ======================================================== */

    function applySavedAnswers() {

        Object.keys(
            state.answers
        ).forEach(function (questionId) {

            const score =
                state.answers[questionId];


            if (!score) {

                return;

            }


            const block =
                document.querySelector(
                    `[data-question="${questionId}"]`
                );


            if (!block) {

                return;

            }


            updateQuestionButtons(
                block,
                score
            );

        });

    }


    /* ========================================================
       UPDATE QUESTION BUTTONS
       ======================================================== */

    function updateQuestionButtons(
        questionBlock,
        selectedScore
    ) {

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


            if (score >= 1 && score <= 3) {

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


    /* ========================================================
       CALCULATE DIMENSION SCORES
       ======================================================== */

    function calculateScores() {

        const scores = {};


        Object.keys(
            DIMENSIONS
        ).forEach(function (dimensionKey) {

            const dimension =
                DIMENSIONS[dimensionKey];


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

                scores[dimensionKey] =
                    null;

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


            /*
             * Each dimension contains two questions.
             *
             * Example:
             *
             * Q1 = 8
             * Q2 = 6
             *
             * Dimension score =
             * (8 + 6) / 2 = 7
             */

            scores[dimensionKey] =
                Number(
                    (
                        total /
                        values.length
                    ).toFixed(1)
                );

        });


        return scores;

    }


    /* ========================================================
       CALCULATE OVERALL TRANSFORMATION SCORE
       ======================================================== */

    function calculateOverallScore(
        scores
    ) {

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


    /* ========================================================
       RENDER SCORES
       ======================================================== */

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


    /* ========================================================
       DIMENSION SCORE DISPLAY
       ======================================================== */

    function renderDimensionScore(
        dimensionKey,
        score
    ) {

        const dimension =
            DIMENSIONS[dimensionKey];


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


    /* ========================================================
       RESULT SCORE DISPLAY
       ======================================================== */

    function renderResultScore(
        dimensionKey,
        score
    ) {

        const dimension =
            DIMENSIONS[dimensionKey];


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


    /* ========================================================
       SCORE CLASS
       ======================================================== */

    function getScoreClass(score) {

        if (score <= 3) {

            return "score-red";

        }


        if (score <= 7) {

            return "score-orange";

        }


        return "score-green";

    }


    /* ========================================================
       FORMAT SCORE
       ======================================================== */

    function formatScore(score) {

        if (
            typeof score !== "number"
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


    /* ========================================================
       DEVELOPMENT CHOICE
       ======================================================== */

    function bindDevelopmentButtons() {

        const buttons =
            document.querySelectorAll(
                ".development-choice"
            );


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const dimension =
                        button.dataset.development;


                    if (
                        !DIMENSIONS[
                            dimension
                        ]
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


    /* ========================================================
       UPDATE DEVELOPMENT BUTTONS
       ======================================================== */

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


    /* ========================================================
       DETERMINE LOWEST DIMENSION
       ======================================================== */

    function getLowestDimension(
        scores
    ) {

        const available =
            Object.keys(
                DIMENSIONS
            )
            .filter(function (key) {

                return (
                    typeof scores[key] ===
                    "number"
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


    /* ========================================================
       RENDER DEVELOPMENT RECOMMENDATION
       ======================================================== */

    function renderDevelopmentChoice(
        scores
    ) {

        const lowest =
            getLowestDimension(
                scores
            );


        if (
            !lowest
        ) {

            renderDevelopmentMessage();

            return;

        }


        /*
         * Only suggest automatically when the user has not
         * explicitly chosen a development area.
         */

        if (
            !state.development
        ) {

            renderDevelopmentMessage(
                lowest
            );

            return;

        }


        renderDevelopmentMessage();

    }


    /* ========================================================
       DEVELOPMENT MESSAGE
       ======================================================== */

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


        if (!key || !DIMENSIONS[key]) {

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


    /* ========================================================
       NAVIGATION
       ======================================================== */

    function bindNavigation() {

        const previous =
            document.getElementById(
                "previousButton"
            );


        const save =
            document.getElementById(
                "saveButton"
            );


        const next =
            document.getElementById(
                "nextButton"
            );


        if (previous) {

            previous.addEventListener(
                "click",
                function () {

                    saveState();

                    window.location.href =
                        CONFIG.PREVIOUS_PAGE;

                }
            );

        }


        if (save) {

            save.addEventListener(
                "click",
                function () {

                    saveState();

                    showSavedMessage();

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                function () {

                    saveState();

                    window.location.href =
                        CONFIG.NEXT_PAGE;

                }
            );

        }

    }


    /* ========================================================
       SAVE CONFIRMATION
       ======================================================== */

    function showSavedMessage() {

        const button =
            document.getElementById(
                "saveButton"
            );


        if (!button) {

            return;

        }


        const original =
            button.innerHTML;


        button.innerHTML =
            "✓ SAVED";


        window.setTimeout(
            function () {

                button.innerHTML =
                    original;

            },
            1400
        );

    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    window.CTMPathPage03 = {

        getState:
            function () {

                return JSON.parse(
                    JSON.stringify(
                        state
                    )
                );

            },


        getScores:
            function () {

                return calculateScores();

            },


        getOverallScore:
            function () {

                return calculateOverallScore(
                    calculateScores()
                );

            },


        save:
            function () {

                saveState();

            },


        reset:
            function () {

                state = {

                    answers: {

                        "dignity-1": null,

                        "dignity-2": null,

                        "identity-1": null,

                        "identity-2": null,

                        "authority-1": null,

                        "authority-2": null

                    },

                    development:
                        ""

                };


                try {

                    localStorage.removeItem(
                        CONFIG.STORAGE_KEY
                    );

                }
                catch (error) {

                    console.warn(
                        "Page 03 reset failed:",
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
                                "selected"
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


    /* ========================================================
       START
       ======================================================== */

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
