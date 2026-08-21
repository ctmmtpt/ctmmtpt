/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 04 — MONEY MINDSET
   ============================================================

   FILE:
   js/page04.js

   PAGE:
   04 / 16

   CORE MESSAGE:
   மனமே உங்கள் வெற்றியை தீர்மானிக்கிறது.
   YOUR MINDSET DETERMINES YOUR SUCCESS.

   SCORING:
   A = 2
   B = 5
   C = 8
   D = 10

   TOTAL:
   50

   AVERAGE:
   10

   NAVIGATION:
   PREVIOUS → 03.html
   NEXT     → 05.html
   ============================================================ */

(function () {

    "use strict";


    /* ============================================================
       CONFIGURATION
       ============================================================ */

    const CONFIG = {

        STORAGE_KEY:
            "CTM_PATH_PAGE04_MONEY_MINDSET",

        PREVIOUS_PAGE:
            "03.html",

        NEXT_PAGE:
            "05.html",

        PAGE_NUMBER:
            "04",

        TOTAL_PAGES:
            16,

        QUESTION_COUNT:
            5,

        TOTAL_SCORE:
            50

    };


    /* ============================================================
       SCORE MAP
       ============================================================ */

    const SCORE_MAP = {

        A: 2,
        B: 5,
        C: 8,
        D: 10

    };


    /* ============================================================
       STATE
       ============================================================ */

    let state = {

        answers: {

            1: null,
            2: null,
            3: null,
            4: null,
            5: null

        },

        transformations: []

    };


    /* ============================================================
       INITIALISE
       ============================================================ */

    function init() {

        loadState();

        bindAnswerButtons();

        bindTransformationInputs();

        bindNavigation();

        applySavedAnswers();

        applySavedTransformations();

        calculateAndRender();

    }


    /* ============================================================
       LOAD STATE
       ============================================================ */

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

                for (
                    let i = 1;
                    i <= CONFIG.QUESTION_COUNT;
                    i++
                ) {

                    const value =
                        Number(
                            parsed.answers[i]
                        );


                    if (
                        Number.isFinite(value) &&
                        (
                            value === 2 ||
                            value === 5 ||
                            value === 8 ||
                            value === 10
                        )
                    ) {

                        state.answers[i] =
                            value;

                    }

                }

            }


            if (
                Array.isArray(
                    parsed.transformations
                )
            ) {

                state.transformations =
                    parsed.transformations.slice();

            }

        }
        catch (error) {

            console.warn(
                "CTM PATH™ Page 04: Unable to load saved state.",
                error
            );

        }

    }


    /* ============================================================
       SAVE STATE
       ============================================================ */

    function saveState() {

        const total =
            calculateTotalScore();


        const average =
            calculateAverageScore(
                total
            );


        const payload = {

            page:
                CONFIG.PAGE_NUMBER,

            answers:
                state.answers,

            transformations:
                state.transformations,

            totalScore:
                total,

            averageScore:
                average,

            mindset:
                getMindsetLevel(
                    average
                ),

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
                "CTM PATH™ Page 04: Unable to save state.",
                error
            );

        }

    }


    /* ============================================================
       ANSWER BUTTONS
       ============================================================ */

    function bindAnswerButtons() {

        const buttons =
            document.querySelectorAll(
                ".answer-option"
            );


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const question =
                        Number(
                            button.dataset.question
                        );


                    const value =
                        Number(
                            button.dataset.value
                        );


                    if (
                        !Number.isFinite(question) ||
                        question < 1 ||
                        question > CONFIG.QUESTION_COUNT
                    ) {

                        return;

                    }


                    if (
                        !(
                            value === 2 ||
                            value === 5 ||
                            value === 8 ||
                            value === 10
                        )
                    ) {

                        return;

                    }


                    state.answers[question] =
                        value;


                    updateQuestionSelection(
                        question,
                        value
                    );


                    calculateAndRender();

                    saveState();

                }
            );

        });

    }


    /* ============================================================
       UPDATE QUESTION SELECTION
       ============================================================ */

    function updateQuestionSelection(
        question,
        value
    ) {

        const buttons =
            document.querySelectorAll(
                `.answer-option[data-question="${question}"]`
            );


        buttons.forEach(function (button) {

            const buttonValue =
                Number(
                    button.dataset.value
                );


            button.classList.toggle(
                "selected",
                buttonValue === value
            );

        });

    }


    /* ============================================================
       APPLY SAVED ANSWERS
       ============================================================ */

    function applySavedAnswers() {

        for (
            let question = 1;
            question <= CONFIG.QUESTION_COUNT;
            question++
        ) {

            const value =
                state.answers[question];


            if (
                value === null
            ) {

                continue;

            }


            updateQuestionSelection(
                question,
                value
            );

        }

    }


    /* ============================================================
       TRANSFORMATION INPUTS
       ============================================================ */

    function bindTransformationInputs() {

        const inputs =
            document.querySelectorAll(
                'input[name="transformation"]'
            );


        inputs.forEach(function (input) {

            input.addEventListener(
                "change",
                function () {

                    updateTransformationState();

                    saveState();

                }
            );

        });

    }


    /* ============================================================
       UPDATE TRANSFORMATION STATE
       ============================================================ */

    function updateTransformationState() {

        const checked =
            document.querySelectorAll(
                'input[name="transformation"]:checked'
            );


        state.transformations =
            Array.from(
                checked
            ).map(function (input) {

                return input.value;

            });

    }


    /* ============================================================
       APPLY SAVED TRANSFORMATIONS
       ============================================================ */

    function applySavedTransformations() {

        const inputs =
            document.querySelectorAll(
                'input[name="transformation"]'
            );


        inputs.forEach(function (input) {

            input.checked =
                state.transformations.includes(
                    input.value
                );

        });

    }


    /* ============================================================
       CALCULATE TOTAL
       ============================================================ */

    function calculateTotalScore() {

        let total = 0;


        for (
            let question = 1;
            question <= CONFIG.QUESTION_COUNT;
            question++
        ) {

            const value =
                Number(
                    state.answers[question]
                );


            if (
                Number.isFinite(value)
            ) {

                total += value;

            }

        }


        return total;

    }


    /* ============================================================
       CALCULATE AVERAGE
       ============================================================ */

    function calculateAverageScore(
        total
    ) {

        const answered =
            Object.values(
                state.answers
            ).filter(function (value) {

                return Number.isFinite(
                    Number(value)
                );

            }).length;


        if (
            answered === 0
        ) {

            return null;

        }


        return Number(
            (
                total /
                answered
            ).toFixed(1)
        );

    }


    /* ============================================================
       ANSWERED COUNT
       ============================================================ */

    function getAnsweredCount() {

        return Object.values(
            state.answers
        ).filter(function (value) {

            return Number.isFinite(
                Number(value)
            );

        }).length;

    }


    /* ============================================================
       COMPLETE CHECK
       ============================================================ */

    function isAssessmentComplete() {

        return (
            getAnsweredCount() ===
            CONFIG.QUESTION_COUNT
        );

    }


    /* ============================================================
       MINDSET LEVEL
       ============================================================ */

    function getMindsetLevel(
        average
    ) {

        if (
            average === null
        ) {

            return null;

        }


        if (
            average >= 9
        ) {

            return {

                key:
                    "wealth",

                title:
                    "WEALTH-BUILDING MINDSET",

                tamil:
                    "செல்வத்தை உருவாக்கும் மனப்பான்மை",

                description:
                    "உங்கள் சிந்தனை பாதுகாப்பைத் தாண்டி உருவாக்கம், சொத்துகள், பணப்புழக்கம் மற்றும் வாழ்க்கைச் சுதந்திரத்தை நோக்கி நகர்கிறது."

            };

        }


        if (
            average >= 7
        ) {

            return {

                key:
                    "builder",

                title:
                    "BUILDER MINDSET",

                tamil:
                    "உருவாக்கும் மனப்பான்மை",

                description:
                    "நீங்கள் பணத்தை வெறும் செலவாக அல்லாமல் உருவாக்கவும் வளர்க்கவும் பயன்படுத்தும் மனப்பான்மையை வளர்த்துக் கொண்டிருக்கிறீர்கள்."

            };

        }


        if (
            average >= 5
        ) {

            return {

                key:
                    "awareness",

                title:
                    "AWARENESS MINDSET",

                tamil:
                    "விழிப்புணர்வு மனப்பான்மை",

                description:
                    "பணத்தைப் பற்றிய உங்கள் சிந்தனையில் விழிப்புணர்வு உருவாகி வருகிறது. அடுத்த நிலை — திட்டமிட்டு உருவாக்கத் தொடங்குவது."

            };

        }


        return {

            key:
                "security",

            title:
                "SECURITY MINDSET",

            tamil:
                "பாதுகாப்பை முதன்மையாகக் காணும் மனப்பான்மை",

            description:
                "உங்கள் தற்போதைய பதில்கள் பாதுகாப்பு மற்றும் உடனடி தேவைகளுக்கு அதிக முக்கியத்துவம் தருகின்றன. அடுத்த கட்டம் — வாய்ப்பு மற்றும் உருவாக்கத்தைப் பார்க்கத் தொடங்குவது."

        };

    }


    /* ============================================================
       RENDER ALL SCORES
       ============================================================ */

    function calculateAndRender() {

        renderIndividualScores();

        const total =
            calculateTotalScore();


        const average =
            calculateAverageScore(
                total
            );


        renderTotalScore(
            total
        );


        renderAverageScore(
            average
        );


        renderMindsetLevel(
            average
        );


        updateCompletionState();

    }


    /* ============================================================
       INDIVIDUAL QUESTION SCORES
       ============================================================ */

    function renderIndividualScores() {

        for (
            let question = 1;
            question <= CONFIG.QUESTION_COUNT;
            question++
        ) {

            const element =
                document.getElementById(
                    `questionScore${question}`
                );


            if (!element) {
                continue;
            }


            const value =
                state.answers[question];


            element.textContent =
                value === null
                    ? "—"
                    : String(value);

        }

    }


    /* ============================================================
       TOTAL SCORE
       ============================================================ */

    function renderTotalScore(
        total
    ) {

        const element =
            document.getElementById(
                "totalScore"
            );


        if (!element) {
            return;
        }


        element.textContent =
            total > 0
                ? String(total)
                : "—";

    }


    /* ============================================================
       AVERAGE SCORE
       ============================================================ */

    function renderAverageScore(
        average
    ) {

        const top =
            document.getElementById(
                "averageScore"
            );


        const reveal =
            document.getElementById(
                "averageScoreReveal"
            );


        const display =
            average === null
                ? "—"
                : average.toFixed(1);


        if (top) {

            top.textContent =
                display;

        }


        if (reveal) {

            reveal.textContent =
                display;

        }

    }


    /* ============================================================
       MINDSET LADDER
       ============================================================ */

    function renderMindsetLevel(
        average
    ) {

        const steps =
            document.querySelectorAll(
                ".ladder-step"
            );


        steps.forEach(function (step) {

            step.classList.remove(
                "active"
            );

        });


        const interpretation =
            document.getElementById(
                "mindsetInterpretation"
            );


        if (
            interpretation
        ) {

            interpretation.textContent =
                "";

        }


        if (
            average === null
        ) {

            return;

        }


        const mindset =
            getMindsetLevel(
                average
            );


        if (!mindset) {
            return;
        }


        const activeStep =
            document.querySelector(
                `.ladder-step.${mindset.key}`
            );


        if (
            activeStep
        ) {

            activeStep.classList.add(
                "active"
            );

        }


        if (
            interpretation
        ) {

            interpretation.innerHTML =
                `
                <strong>${escapeHtml(mindset.tamil)}</strong>
                <br>
                <span>${escapeHtml(mindset.title)}</span>
                <br>
                <small>${escapeHtml(mindset.description)}</small>
                `;

        }

    }


    /* ============================================================
       COMPLETION STATE
       ============================================================ */

    function updateCompletionState() {

        const complete =
            isAssessmentComplete();


        document.body.classList.toggle(
            "assessment-complete",
            complete
        );


        const next =
            document.getElementById(
                "nextButton"
            );


        const saveContinue =
            document.getElementById(
                "saveContinueButton"
            );


        if (next) {

            next.classList.toggle(
                "ready",
                complete
            );

        }


        if (saveContinue) {

            saveContinue.classList.toggle(
                "ready",
                complete
            );

        }

    }


    /* ============================================================
       NAVIGATION
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


        const saveContinue =
            document.getElementById(
                "saveContinueButton"
            );


        /* --------------------------------------------------------
           PREVIOUS → 03.html
           -------------------------------------------------------- */

        if (previous) {

            previous.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    saveState();

                    navigateTo(
                        CONFIG.PREVIOUS_PAGE
                    );

                }
            );

        }


        /* --------------------------------------------------------
           NEXT → 05.html
           -------------------------------------------------------- */

        if (next) {

            next.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    if (
                        !isAssessmentComplete()
                    ) {

                        showIncompleteMessage();

                        scrollToFirstUnanswered();

                        return;

                    }


                    saveState();

                    navigateTo(
                        CONFIG.NEXT_PAGE
                    );

                }
            );

        }


        /* --------------------------------------------------------
           SAVE & CONTINUE
           -------------------------------------------------------- */

        if (saveContinue) {

            saveContinue.addEventListener(
                "click",
                function () {

                    if (
                        !isAssessmentComplete()
                    ) {

                        showIncompleteMessage();

                        scrollToFirstUnanswered();

                        return;

                    }


                    saveState();

                    showSaveConfirmation();

                }
            );

        }

    }


    /* ============================================================
       NAVIGATE
       ============================================================ */

    function navigateTo(
        url
    ) {

        /*
         * Ensure the page begins at the top after navigation.
         */

        try {

            sessionStorage.setItem(
                "CTM_PATH_SCROLL_TOP",
                "true"
            );

        }
        catch (error) {

            /* Ignore storage errors. */

        }


        window.location.href =
            url;

    }


    /* ============================================================
       FIRST UNANSWERED QUESTION
       ============================================================ */

    function getFirstUnansweredQuestion() {

        for (
            let question = 1;
            question <= CONFIG.QUESTION_COUNT;
            question++
        ) {

            if (
                state.answers[question] === null
            ) {

                return question;

            }

        }


        return null;

    }


    /* ============================================================
       SCROLL TO FIRST UNANSWERED
       ============================================================ */

    function scrollToFirstUnanswered() {

        const question =
            getFirstUnansweredQuestion();


        if (!question) {
            return;
        }


        const card =
            document.querySelector(
                `.mindset-question-card[data-question="${question}"]`
            );


        if (!card) {
            return;
        }


        card.scrollIntoView({

            behavior:
                "smooth",

            block:
                "center"

        });


        card.classList.add(
            "question-needs-answer"
        );


        window.setTimeout(
            function () {

                card.classList.remove(
                    "question-needs-answer"
                );

            },
            1600
        );

    }


    /* ============================================================
       INCOMPLETE MESSAGE
       ============================================================ */

    function showIncompleteMessage() {

        const remaining =
            CONFIG.QUESTION_COUNT -
            getAnsweredCount();


        const message =
            document.getElementById(
                "mindsetInterpretation"
            );


        if (!message) {
            return;
        }


        message.innerHTML =
            `
            <strong>
                இன்னும் ${remaining} கேள்விகளுக்கு பதிலளிக்க வேண்டும்.
            </strong>
            <br>
            <span>
                Please answer all five questions before continuing.
            </span>
            `;


        message.scrollIntoView({

            behavior:
                "smooth",

            block:
                "center"

        });

    }


    /* ============================================================
       SAVE CONFIRMATION
       ============================================================ */

    function showSaveConfirmation() {

        const button =
            document.getElementById(
                "saveContinueButton"
            );


        if (!button) {
            return;
        }


        const original =
            button.innerHTML;


        button.innerHTML =
            "✓ SAVED";


        button.classList.add(
            "saved"
        );


        window.setTimeout(
            function () {

                button.innerHTML =
                    original;

                button.classList.remove(
                    "saved"
                );

            },
            1500
        );

    }


    /* ============================================================
       HTML ESCAPE
       ============================================================ */

    function escapeHtml(
        value
    ) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* ============================================================
       PUBLIC API
       ============================================================ */

    window.CTMPathPage04 = {

        getState:
            function () {

                return JSON.parse(
                    JSON.stringify(
                        state
                    )
                );

            },


        getTotalScore:
            function () {

                return calculateTotalScore();

            },


        getAverageScore:
            function () {

                return calculateAverageScore(
                    calculateTotalScore()
                );

            },


        getMindset:
            function () {

                return getMindsetLevel(
                    calculateAverageScore(
                        calculateTotalScore()
                    )
                );

            },


        isComplete:
            function () {

                return isAssessmentComplete();

            },


        save:
            function () {

                saveState();

            },


        reset:
            function () {

                state = {

                    answers: {

                        1: null,
                        2: null,
                        3: null,
                        4: null,
                        5: null

                    },

                    transformations: []

                };


                try {

                    localStorage.removeItem(
                        CONFIG.STORAGE_KEY
                    );

                }
                catch (error) {

                    console.warn(
                        "CTM PATH™ Page 04: reset failed.",
                        error
                    );

                }


                document
                    .querySelectorAll(
                        ".answer-option"
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
                        'input[name="transformation"]'
                    )
                    .forEach(
                        function (input) {

                            input.checked =
                                false;

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
