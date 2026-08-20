
/* ================================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 01 — JAVASCRIPT
   ================================================================

   PURPOSE
   -------
   This file is written specifically for the existing 01.html DOM.

   IMPORTANT
   ---------
   Do NOT add another assessment renderer.
   Do NOT generate the Selvam cards from JavaScript.

   The HTML already contains all 16 cards and all 10 score buttons.

   SCORE MODEL
   -----------
   16 Selvams
   Each Selvam = 1–10

   Raw Total:
       maximum = 160

   Life Score:
       Raw Total / 160 × 100

   Average Selvam Score:
       Raw Total / 16

   SCORE COLOURS
   -------------
   1–3   = RED
   4–7   = ORANGE
   8–10  = GREEN
   ================================================================ */

'use strict';


/* ================================================================
   CONFIGURATION
   ================================================================ */

const PAGE01_CONFIG = Object.freeze({

    STORAGE_KEY: 'ctm_path_page01_scores',

    PAGE_NUMBER: '01',

    TOTAL_SELVAMS: 16,

    MIN_SCORE: 1,

    MAX_SCORE: 10,

    RAW_MAX: 160,

    LIFE_SCORE_MAX: 100,

    AVERAGE_MAX: 10,

    SCORE_RANGES: Object.freeze({

        LOW: {
            min: 1,
            max: 3,
            className: 'score-low',
            colour: 'red'
        },

        MID: {
            min: 4,
            max: 7,
            className: 'score-medium',
            colour: 'orange'
        },

        HIGH: {
            min: 8,
            max: 10,
            className: 'score-high',
            colour: 'green'
        }

    })

});


/* ================================================================
   SELVAM DEFINITIONS
   ================================================================

   These keys MUST match the data-field values in 01.html.
   ================================================================ */

const SELVAMS = Object.freeze([

    {
        number: '01',
        field: 'education',
        tamil: 'கல்வி',
        english: 'EDUCATION'
    },

    {
        number: '02',
        field: 'wealth',
        tamil: 'செல்வம்',
        english: 'WEALTH'
    },

    {
        number: '03',
        field: 'foodProsperity',
        tamil: 'தானியம்',
        english: 'FOOD & PROSPERITY'
    },

    {
        number: '04',
        field: 'courage',
        tamil: 'வீரம்',
        english: 'COURAGE'
    },

    {
        number: '05',
        field: 'success',
        tamil: 'வெற்றி',
        english: 'SUCCESS'
    },

    {
        number: '06',
        field: 'health',
        tamil: 'நலம்',
        english: 'HEALTH'
    },

    {
        number: '07',
        field: 'longevity',
        tamil: 'ஆயுள்',
        english: 'LONGEVITY'
    },

    {
        number: '08',
        field: 'beauty',
        tamil: 'அழகு',
        english: 'BEAUTY'
    },

    {
        number: '09',
        field: 'reputation',
        tamil: 'புகழ்',
        english: 'GOOD REPUTATION'
    },

    {
        number: '10',
        field: 'wisdom',
        tamil: 'அறிவு',
        english: 'WISDOM'
    },

    {
        number: '11',
        field: 'family',
        tamil: 'குடும்ப வளம்',
        english: 'HAPPY FAMILY'
    },

    {
        number: '12',
        field: 'children',
        tamil: 'மகப்பேறு',
        english: 'BLESSED CHILDREN'
    },

    {
        number: '13',
        field: 'relationships',
        tamil: 'நல்ல நட்பு / உறவு',
        english: 'GOOD RELATIONSHIPS'
    },

    {
        number: '14',
        field: 'innerPeace',
        tamil: 'மனநிறைவு',
        english: 'INNER PEACE'
    },

    {
        number: '15',
        field: 'dharma',
        tamil: 'அறம்',
        english: 'DHARMA'
    },

    {
        number: '16',
        field: 'spiritualGrowth',
        tamil: 'இறை நிலை',
        english: 'SPIRITUAL GROWTH'
    }

]);


/* ================================================================
   APPLICATION STATE
   ================================================================ */

const state = {

    scores: {},

    totalAnswered: 0,

    rawTotal: 0,

    lifeScore: null,

    averageScore: null,

    initialized: false

};


/* ================================================================
   DOM REFERENCES
   ================================================================ */

const DOM = {

    form: null,

    cards: [],

    scoreGroups: [],

    totalScore: null,

    averageScore: null,

    backButton: null,

    continueButton: null

};


/* ================================================================
   INITIALIZATION
   ================================================================ */

document.addEventListener('DOMContentLoaded', function () {

    initializePage01();

});


function initializePage01() {

    if (state.initialized) {
        return;
    }

    cacheDOM();

    validateDOM();

    initializeScoreState();

    bindScoreButtons();

    bindNavigation();

    restoreSavedScores();

    calculateAndRender();

    state.initialized = true;

    console.log(
        '[CTM PATH™] Page 01 initialized successfully.'
    );

}


/* ================================================================
   CACHE DOM
   ================================================================ */

function cacheDOM() {

    DOM.form =
        document.getElementById('assessmentForm');

    DOM.cards =
        Array.from(
            document.querySelectorAll('.selvam-card')
        );

    DOM.scoreGroups =
        Array.from(
            document.querySelectorAll('.score-options')
        );

    DOM.totalScore =
        document.getElementById('totalScore100');

    DOM.averageScore =
        document.getElementById('averageScore');

    DOM.backButton =
        document.getElementById('backToIndex');

    DOM.continueButton =
        document.getElementById('continueToPage02');

}


/* ================================================================
   DOM VALIDATION
   ================================================================ */

function validateDOM() {

    const errors = [];

    if (!DOM.form) {
        errors.push('#assessmentForm');
    }

    if (DOM.cards.length !== PAGE01_CONFIG.TOTAL_SELVAMS) {

        console.warn(
            '[CTM PATH™] Expected 16 Selvam cards but found:',
            DOM.cards.length
        );

    }

    if (!DOM.totalScore) {
        errors.push('#totalScore100');
    }

    if (!DOM.averageScore) {
        errors.push('#averageScore');
    }

    if (!DOM.backButton) {
        errors.push('#backToIndex');
    }

    if (!DOM.continueButton) {
        errors.push('#continueToPage02');
    }

    if (errors.length > 0) {

        console.error(
            '[CTM PATH™] Page 01 missing required DOM elements:',
            errors
        );

    }

}


/* ================================================================
   INITIALIZE SCORE STATE
   ================================================================ */

function initializeScoreState() {

    SELVAMS.forEach(function (selvam) {

        state.scores[selvam.field] = null;

    });

}


/* ================================================================
   BIND SCORE BUTTONS
   ================================================================ */

function bindScoreButtons() {

    DOM.scoreGroups.forEach(function (group) {

        const field =
            group.getAttribute('data-field');

        if (!field) {

            console.warn(
                '[CTM PATH™] Score group has no data-field:',
                group
            );

            return;

        }

        const buttons =
            Array.from(
                group.querySelectorAll(
                    'button[data-score]'
                )
            );

        buttons.forEach(function (button) {

            button.addEventListener(
                'click',
                function () {

                    handleScoreSelection(
                        field,
                        button
                    );

                }
            );

        });

    });

}


/* ================================================================
   HANDLE SCORE SELECTION
   ================================================================ */

function handleScoreSelection(
    field,
    button
) {

    if (!field || !button) {
        return;
    }

    const score =
        Number(
            button.getAttribute('data-score')
        );

    if (!isValidScore(score)) {

        console.error(
            '[CTM PATH™] Invalid score:',
            score,
            'for field:',
            field
        );

        return;

    }

    state.scores[field] = score;

    updateScoreButtons(
        field,
        score
    );

    updateSelectedScoreDisplay(
        field,
        score
    );

    calculateAndRender();

    saveScores();

}


/* ================================================================
   VALIDATE SCORE
   ================================================================ */

function isValidScore(score) {

    return (
        Number.isInteger(score) &&
        score >= PAGE01_CONFIG.MIN_SCORE &&
        score <= PAGE01_CONFIG.MAX_SCORE
    );

}


/* ================================================================
   UPDATE SCORE BUTTONS
   ================================================================ */

function updateScoreButtons(
    field,
    selectedScore
) {

    const group =
        document.querySelector(
            '.score-options[data-field="' +
            escapeAttribute(field) +
            '"]'
        );

    if (!group) {
        return;
    }

    const buttons =
        Array.from(
            group.querySelectorAll(
                'button[data-score]'
            )
        );

    buttons.forEach(function (button) {

        const buttonScore =
            Number(
                button.getAttribute('data-score')
            );

        /*
         * Remove ALL state classes first.
         */
        button.classList.remove(
            'selected',
            'score-low',
            'score-medium',
            'score-high',
            'score-red',
            'score-orange',
            'score-green'
        );

        button.removeAttribute(
            'aria-pressed'
        );

        /*
         * Reset inline colour properties that
         * may have been introduced by an older
         * version of the JavaScript.
         */
        button.style.removeProperty(
            'background-color'
        );

        button.style.removeProperty(
            'border-color'
        );

        button.style.removeProperty(
            'color'
        );

        /*
         * Only the selected button gets
         * the score colour.
         */
        if (
            buttonScore === selectedScore
        ) {

            button.classList.add('selected');

            applyScoreColour(
                button,
                selectedScore
            );

            button.setAttribute(
                'aria-pressed',
                'true'
            );

        } else {

            button.setAttribute(
                'aria-pressed',
                'false'
            );

        }

    });

}


/* ================================================================
   APPLY SCORE COLOUR
   ================================================================ */

function applyScoreColour(
    element,
    score
) {

    if (!element || !isValidScore(score)) {
        return;
    }

    /*
     * 1–3 = RED
     */
    if (
        score >= PAGE01_CONFIG.SCORE_RANGES.LOW.min &&
        score <= PAGE01_CONFIG.SCORE_RANGES.LOW.max
    ) {

        element.classList.add(
            PAGE01_CONFIG.SCORE_RANGES.LOW.className
        );

        element.classList.add(
            'score-red'
        );

        /*
         * Inline fallback guarantees the
         * requested colour even if the CSS
         * does not yet contain the classes.
         */
        element.style.backgroundColor =
            'rgba(190, 45, 45, 0.18)';

        element.style.borderColor =
            '#ef5350';

        element.style.color =
            '#ff6b6b';

        return;
    }


    /*
     * 4–7 = ORANGE
     */
    if (
        score >= PAGE01_CONFIG.SCORE_RANGES.MID.min &&
        score <= PAGE01_CONFIG.SCORE_RANGES.MID.max
    ) {

        element.classList.add(
            PAGE01_CONFIG.SCORE_RANGES.MID.className
        );

        element.classList.add(
            'score-orange'
        );

        element.style.backgroundColor =
            'rgba(230, 126, 34, 0.18)';

        element.style.borderColor =
            '#f39c12';

        element.style.color =
            '#ffb347';

        return;
    }


    /*
     * 8–10 = GREEN
     */
    if (
        score >= PAGE01_CONFIG.SCORE_RANGES.HIGH.min &&
        score <= PAGE01_CONFIG.SCORE_RANGES.HIGH.max
    ) {

        element.classList.add(
            PAGE01_CONFIG.SCORE_RANGES.HIGH.className
        );

        element.classList.add(
            'score-green'
        );

        element.style.backgroundColor =
            'rgba(39, 174, 96, 0.18)';

        element.style.borderColor =
            '#2ecc71';

        element.style.color =
            '#4ade80';

    }

}


/* ================================================================
   UPDATE SELECTED SCORE TEXT
   ================================================================ */

function updateSelectedScoreDisplay(
    field,
    score
) {

    const target =
        document.querySelector(
            '[data-selected-score="' +
            escapeAttribute(field) +
            '"]'
        );

    if (!target) {

        console.warn(
            '[CTM PATH™] Selected-score element not found for:',
            field
        );

        return;

    }

    target.textContent =
        String(score);

    /*
     * Give the displayed score the same
     * semantic colour as the selected button.
     */
    target.classList.remove(
        'score-low',
        'score-medium',
        'score-high',
        'score-red',
        'score-orange',
        'score-green'
    );

    target.style.removeProperty(
        'color'
    );

    if (
        score >= PAGE01_CONFIG.SCORE_RANGES.LOW.min &&
        score <= PAGE01_CONFIG.SCORE_RANGES.LOW.max
    ) {

        target.classList.add(
            'score-low',
            'score-red'
        );

        target.style.color =
            '#ff6b6b';

    } else if (
        score >= PAGE01_CONFIG.SCORE_RANGES.MID.min &&
        score <= PAGE01_CONFIG.SCORE_RANGES.MID.max
    ) {

        target.classList.add(
            'score-medium',
            'score-orange'
        );

        target.style.color =
            '#ffb347';

    } else if (
        score >= PAGE01_CONFIG.SCORE_RANGES.HIGH.min &&
        score <= PAGE01_CONFIG.SCORE_RANGES.HIGH.max
    ) {

        target.classList.add(
            'score-high',
            'score-green'
        );

        target.style.color =
            '#4ade80';

    }

}


/* ================================================================
   CALCULATE EVERYTHING
   ================================================================ */

function calculateAndRender() {

    const scores =
        SELVAMS.map(function (selvam) {

            return state.scores[
                selvam.field
            ];

        });


    /*
     * Only valid numerical scores count.
     */
    const answeredScores =
        scores.filter(function (score) {

            return isValidScore(score);

        });


    state.totalAnswered =
        answeredScores.length;


    /*
     * RAW TOTAL
     *
     * Example:
     * 16 answers of 10
     * = 160
     */
    state.rawTotal =
        answeredScores.reduce(
            function (total, score) {

                return total + score;

            },
            0
        );


    /*
     * LIFE SCORE / 100
     *
     * We calculate from all 16 Selvams.
     *
     * If the assessment is incomplete,
     * the score remains provisional.
     */
    if (
        state.totalAnswered ===
        PAGE01_CONFIG.TOTAL_SELVAMS
    ) {

        state.lifeScore =
            roundToOneDecimal(
                (
                    state.rawTotal /
                    PAGE01_CONFIG.RAW_MAX
                ) *
                PAGE01_CONFIG.LIFE_SCORE_MAX
            );


        state.averageScore =
            roundToOneDecimal(
                state.rawTotal /
                PAGE01_CONFIG.TOTAL_SELVAMS
            );

    } else {

        /*
         * Do not falsely calculate a final
         * score from an incomplete assessment.
         */
        state.lifeScore = null;

        state.averageScore = null;

    }


    renderSummary();

    updateContinueState();

}


/* ================================================================
   RENDER SUMMARY
   ================================================================ */

function renderSummary() {

    /*
     * LIFE SCORE /100
     */
    if (DOM.totalScore) {

        if (state.lifeScore === null) {

            DOM.totalScore.textContent =
                '—';

        } else {

            DOM.totalScore.textContent =
                formatScore(
                    state.lifeScore
                );

        }

    }


    /*
     * AVERAGE /10
     */
    if (DOM.averageScore) {

        if (state.averageScore === null) {

            DOM.averageScore.textContent =
                '—';

        } else {

            DOM.averageScore.textContent =
                formatScore(
                    state.averageScore
                );

        }

    }

}


/* ================================================================
   UPDATE CONTINUE BUTTON
   ================================================================ */

function updateContinueState() {

    if (!DOM.continueButton) {
        return;
    }

    const complete =
        state.totalAnswered ===
        PAGE01_CONFIG.TOTAL_SELVAMS;


    /*
     * We deliberately do NOT use disabled=true
     * because the existing design may depend on
     * the button remaining visually present.
     */
    DOM.continueButton.setAttribute(
        'aria-disabled',
        complete ? 'false' : 'true'
    );

    if (complete) {

        DOM.continueButton.classList.remove(
            'navigation-disabled'
        );

    } else {

        DOM.continueButton.classList.add(
            'navigation-disabled'
        );

    }

}


/* ================================================================
   NAVIGATION
   ================================================================ */

function bindNavigation() {

    /*
     * BACK TO INDEX
     */
    if (DOM.backButton) {

        DOM.backButton.addEventListener(
            'click',
            function (event) {

                event.preventDefault();

                window.location.href = '/';

            }
        );

    }


    /*
     * CONTINUE TO PAGE 02
     */
    if (DOM.continueButton) {

        DOM.continueButton.addEventListener(
            'click',
            function (event) {

                event.preventDefault();

                if (
                    state.totalAnswered !==
                    PAGE01_CONFIG.TOTAL_SELVAMS
                ) {

                    showIncompleteMessage();

                    scrollToFirstUnanswered();

                    return;

                }


                /*
                 * Save one final time before
                 * leaving Page 01.
                 */
                saveScores();


                /*
                 * Make the final assessment
                 * object available to Page 02
                 * through sessionStorage.
                 */
                saveFinalAssessment();


                /*
                 * Navigate to Page 02.
                 */
                window.location.href =
                    '/02';

            }
        );

    }

}


/* ================================================================
   INCOMPLETE MESSAGE
   ================================================================ */

function showIncompleteMessage() {

    const remaining =
        PAGE01_CONFIG.TOTAL_SELVAMS -
        state.totalAnswered;


    const message =
        remaining === 1
            ? 'Please complete the remaining Selvam before continuing.'
            : 'Please complete all 16 Selvams before continuing.';


    /*
     * Use a simple browser alert rather than
     * creating another UI dependency.
     */
    window.alert(message);

}


/* ================================================================
   SCROLL TO FIRST UNANSWERED
   ================================================================ */

function scrollToFirstUnanswered() {

    const firstUnanswered =
        SELVAMS.find(function (selvam) {

            return !isValidScore(
                state.scores[selvam.field]
            );

        });


    if (!firstUnanswered) {
        return;
    }


    const card =
        document.querySelector(
            '.selvam-card[data-field="' +
            escapeAttribute(firstUnanswered.field) +
            '"]'
        );


    /*
     * Some versions of the HTML place
     * data-field only on the article,
     * while others place it on the
     * score-options container.
     *
     * Therefore use a second lookup.
     */
    const fallbackCard =
        card ||
        document.querySelector(
            '.selvam-card:has(.score-options[data-field="' +
            escapeAttribute(firstUnanswered.field) +
            '"])'
        );


    const target =
        fallbackCard ||
        document.querySelector(
            '.score-options[data-field="' +
            escapeAttribute(firstUnanswered.field) +
            '"]'
        );


    if (!target) {
        return;
    }


    target.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });

}


/* ================================================================
   SAVE SCORES
   ================================================================ */

function saveScores() {

    const payload =
        buildAssessmentPayload();


    try {

        localStorage.setItem(
            PAGE01_CONFIG.STORAGE_KEY,
            JSON.stringify(payload)
        );

    } catch (error) {

        console.error(
            '[CTM PATH™] Unable to save Page 01 scores:',
            error
        );

    }


    /*
     * Also keep the current assessment in
     * sessionStorage so the next page can
     * access it during the current journey.
     */
    try {

        sessionStorage.setItem(
            PAGE01_CONFIG.STORAGE_KEY,
            JSON.stringify(payload)
        );

    } catch (error) {

        console.warn(
            '[CTM PATH™] Unable to save Page 01 session data:',
            error
        );

    }


    /*
     * Expose the latest payload globally.
     * This gives later scripts a clean interface
     * without forcing them to inspect the DOM.
     */
    window.CTMPathPage01 =
        payload;

}


/* ================================================================
   SAVE FINAL ASSESSMENT
   ================================================================ */

function saveFinalAssessment() {

    const payload =
        buildAssessmentPayload();


    payload.completed =
        state.totalAnswered ===
        PAGE01_CONFIG.TOTAL_SELVAMS;


    payload.completedAt =
        new Date().toISOString();


    try {

        sessionStorage.setItem(
            'ctm_path_page01_final',
            JSON.stringify(payload)
        );

        localStorage.setItem(
            'ctm_path_page01_final',
            JSON.stringify(payload)
        );

    } catch (error) {

        console.error(
            '[CTM PATH™] Unable to save final Page 01 assessment:',
            error
        );

    }


    window.CTMPathPage01Final =
        payload;

}


/* ================================================================
   BUILD ASSESSMENT PAYLOAD
   ================================================================ */

function buildAssessmentPayload() {

    const individualScores = {};


    SELVAMS.forEach(function (selvam) {

        individualScores[
            selvam.field
        ] =
            isValidScore(
                state.scores[selvam.field]
            )
                ? state.scores[selvam.field]
                : null;

    });


    return {

        page: PAGE01_CONFIG.PAGE_NUMBER,

        assessment: '16 Selwams of a Fulfilled Life',

        totalSelvams:
            PAGE01_CONFIG.TOTAL_SELVAMS,

        answered:
            state.totalAnswered,

        complete:
            state.totalAnswered ===
            PAGE01_CONFIG.TOTAL_SELVAMS,

        rawTotal:
            state.rawTotal,

        rawMaximum:
            PAGE01_CONFIG.RAW_MAX,

        lifeScore:
            state.lifeScore,

        lifeScoreMaximum:
            PAGE01_CONFIG.LIFE_SCORE_MAX,

        averageScore:
            state.averageScore,

        averageMaximum:
            PAGE01_CONFIG.AVERAGE_MAX,

        scores:
            individualScores,

        timestamp:
            new Date().toISOString()

    };

}


/* ================================================================
   RESTORE SAVED SCORES
   ================================================================ */

function restoreSavedScores() {

    let savedData = null;


    /*
     * Try localStorage first.
     */
    try {

        const raw =
            localStorage.getItem(
                PAGE01_CONFIG.STORAGE_KEY
            );

        if (raw) {

            savedData =
                JSON.parse(raw);

        }

    } catch (error) {

        console.warn(
            '[CTM PATH™] Could not read saved Page 01 scores:',
            error
        );

    }


    /*
     * If localStorage has nothing useful,
     * try sessionStorage.
     */
    if (
        !savedData ||
        !savedData.scores
    ) {

        try {

            const raw =
                sessionStorage.getItem(
                    PAGE01_CONFIG.STORAGE_KEY
                );

            if (raw) {

                savedData =
                    JSON.parse(raw);

            }

        } catch (error) {

            console.warn(
                '[CTM PATH™] Could not read Page 01 session scores:',
                error
            );

        }

    }


    if (
        !savedData ||
        !savedData.scores
    ) {

        return;

    }


    SELVAMS.forEach(function (selvam) {

        const savedScore =
            Number(
                savedData.scores[
                    selvam.field
                ]
            );


        if (
            isValidScore(savedScore)
        ) {

            state.scores[
                selvam.field
            ] =
                savedScore;


            updateScoreButtons(
                selvam.field,
                savedScore
            );


            updateSelectedScoreDisplay(
                selvam.field,
                savedScore
            );

        }

    });


    console.log(
        '[CTM PATH™] Previous Page 01 scores restored.'
    );

}


/* ================================================================
   PUBLIC API
   ================================================================ */

window.CTMPathPage01API = {

    /*
     * Get the current scores.
     */
    getScores: function () {

        return {
            ...state.scores
        };

    },


    /*
     * Get the current calculations.
     */
    getResults: function () {

        return {

            answered:
                state.totalAnswered,

            rawTotal:
                state.rawTotal,

            rawMaximum:
                PAGE01_CONFIG.RAW_MAX,

            lifeScore:
                state.lifeScore,

            averageScore:
                state.averageScore,

            complete:
                state.totalAnswered ===
                PAGE01_CONFIG.TOTAL_SELVAMS

        };

    },


    /*
     * Get the complete assessment object.
     */
    getAssessment: function () {

        return buildAssessmentPayload();

    },


    /*
     * Force a save.
     */
    save: function () {

        saveScores();

        return buildAssessmentPayload();

    },


    /*
     * Clear Page 01.
     */
    clear: function () {

        clearAssessment();

    }

};


/* ================================================================
   CLEAR ASSESSMENT
   ================================================================ */

function clearAssessment() {

    SELVAMS.forEach(function (selvam) {

        state.scores[
            selvam.field
        ] = null;


        updateScoreButtons(
            selvam.field,
            null
        );


        const target =
            document.querySelector(
                '[data-selected-score="' +
                escapeAttribute(
                    selvam.field
                ) +
                '"]'
            );


        if (target) {

            target.textContent =
                '—';

            target.classList.remove(
                'score-low',
                'score-medium',
                'score-high',
                'score-red',
                'score-orange',
                'score-green'
            );

            target.style.removeProperty(
                'color'
            );

        }

    });


    state.totalAnswered = 0;

    state.rawTotal = 0;

    state.lifeScore = null;

    state.averageScore = null;


    try {

        localStorage.removeItem(
            PAGE01_CONFIG.STORAGE_KEY
        );

        localStorage.removeItem(
            'ctm_path_page01_final'
        );

    } catch (error) {

        console.warn(
            '[CTM PATH™] Could not clear localStorage:',
            error
        );

    }


    try {

        sessionStorage.removeItem(
            PAGE01_CONFIG.STORAGE_KEY
        );

        sessionStorage.removeItem(
            'ctm_path_page01_final'
        );

    } catch (error) {

        console.warn(
            '[CTM PATH™] Could not clear sessionStorage:',
            error
        );

    }


    calculateAndRender();

}


/* ================================================================
   UTILITY — ROUND TO ONE DECIMAL
   ================================================================ */

function roundToOneDecimal(value) {

    if (!Number.isFinite(value)) {
        return null;
    }

    return Math.round(
        (value + Number.EPSILON) * 10
    ) / 10;

}


/* ================================================================
   UTILITY — FORMAT SCORE
   ================================================================ */

function formatScore(value) {

    if (!Number.isFinite(value)) {
        return '—';
    }


    /*
     * Keep whole numbers clean:
     *
     * 80 → "80"
     * 8  → "8"
     *
     * Decimal values:
     *
     * 81.3 → "81.3"
     * 7.6  → "7.6"
     */
    if (
        Number.isInteger(value)
    ) {

        return String(value);

    }


    return value.toFixed(1);

}


/* ================================================================
   UTILITY — ESCAPE ATTRIBUTE
   ================================================================ */

function escapeAttribute(value) {

    if (
        window.CSS &&
        typeof window.CSS.escape === 'function'
    ) {

        return window.CSS.escape(
            String(value)
        );

    }


    /*
     * Safe fallback for the known field
     * names used by this page.
     */
    return String(value)
        .replace(
            /\\/g,
            '\\\\'
        )
        .replace(
            /"/g,
            '\\"'
        );

}


/* ================================================================
   DEBUG INFORMATION
   ================================================================ */

window.addEventListener(
    'error',
    function (event) {

        /*
         * Keep unexpected JavaScript errors
         * visible in the console so debugging
         * Page 01 does not become guesswork.
         */
        console.error(
            '[CTM PATH™] Page 01 JavaScript error:',
            event.error || event.message
        );

    }
);


/* ================================================================
   DEVELOPMENT CONSOLE HELPER
   ================================================================ */

console.log(
    '[CTM PATH™] Page 01 scoring engine loaded.'
);

console.log(
    '[CTM PATH™] Scoring:',
    '1–3 RED | 4–7 ORANGE | 8–10 GREEN'
);

console.log(
    '[CTM PATH™] Calculation:',
    'Raw Total / 160 × 100 = Life Score / 100'
);

console.log(
    '[CTM PATH™] Calculation:',
    'Raw Total / 16 = Average / 10'
);
