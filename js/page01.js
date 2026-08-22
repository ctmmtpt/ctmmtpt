/* ================================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 01 — JAVASCRIPT
   ================================================================

   PURPOSE
   -------
   Controls the existing Page 01 assessment.

   IMPORTANT
   ---------
   • Does NOT generate the assessment cards.
   • Does NOT generate score buttons.
   • HTML remains responsible for page content.
   • CSS remains responsible for visual styling.
   • JavaScript manages interaction, state, calculation,
     persistence and navigation.

   SCORE MODEL
   -----------
   16 Selvams
   Each Selvam = 1–10

   Raw Total:
       Maximum = 160

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

    STORAGE_KEY:
        'ctm_path_page01_scores',

    FINAL_STORAGE_KEY:
        'ctm_path_page01_final',

    PAGE_NUMBER:
        '01',

    NEXT_PAGE:
        '/02',

    INDEX_PAGE:
        '/',

    SCROLL_BEHAVIOR:
        'smooth',

    TOP_SCROLL_BEHAVIOR:
        'auto',

    TOTAL_SELVAMS:
        16,

    MIN_SCORE:
        1,

    MAX_SCORE:
        10,

    RAW_MAX:
        160,

    LIFE_SCORE_MAX:
        100,

    AVERAGE_MAX:
        10,

    SCORE_RANGES: Object.freeze({

        LOW: Object.freeze({
            min: 1,
            max: 3,
            className: 'score-low',
            colourClass: 'score-red'
        }),

        MID: Object.freeze({
            min: 4,
            max: 7,
            className: 'score-medium',
            colourClass: 'score-orange'
        }),

        HIGH: Object.freeze({
            min: 8,
            max: 10,
            className: 'score-high',
            colourClass: 'score-green'
        })

    })

});


/* ================================================================
   SELVAM DEFINITIONS
   ---------------------------------------------------------------
   These field names MUST match data-field values in 01.html.
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

    totalAnswered:
        0,

    rawTotal:
        0,

    lifeScore:
        null,

    averageScore:
        null,

    initialized:
        false

};


/* ================================================================
   DOM REFERENCES
   ================================================================ */

const DOM = {

    form:
        null,

    cards:
        [],

    scoreGroups:
        [],

    totalScore:
        null,

    averageScore:
        null,

    backButton:
        null,

    continueButton:
        null

};


/* ================================================================
   PAGE ENTRY / SCROLL MANAGEMENT
   ---------------------------------------------------------------
   Page 01 is a new chapter in the guided journey. Always enter
   at the top of the page so browser history or a previous scroll
   position cannot place the visitor in the middle of the experience.
   ================================================================ */

function resetPageScroll() {

    try {

        if ('scrollRestoration' in window.history) {

            window.history.scrollRestoration =
                'manual';

        }

    } catch (error) {

        console.warn(
            '[CTM PATH™] Could not set scroll restoration:',
            error
        );

    }

    window.scrollTo({

        top:
            0,

        left:
            0,

        behavior:
            PAGE01_CONFIG.TOP_SCROLL_BEHAVIOR

    });

}


/* ================================================================
   INITIALIZATION
   ================================================================ */

document.addEventListener(
    'DOMContentLoaded',
    initializePage01
);


function initializePage01() {

    if (state.initialized) {
        return;
    }

    resetPageScroll();


    /*
     * A second frame handles browsers that restore scroll position
     * after DOMContentLoaded.
     */

    window.requestAnimationFrame(
        function () {

            window.scrollTo({

                top:
                    0,

                left:
                    0,

                behavior:
                    PAGE01_CONFIG.TOP_SCROLL_BEHAVIOR

            });

        }
    );


    cacheDOM();


    validateDOM();


    initializeScoreState();


    bindScoreButtons();


    bindNavigation();


    restoreSavedScores();


    calculateAndRender();


    state.initialized =
        true;


    console.log(
        '[CTM PATH™] Page 01 initialized successfully.'
    );

}


/* ================================================================
   CACHE DOM
   ================================================================ */

function cacheDOM() {

    DOM.form =
        document.getElementById(
            'assessmentForm'
        );


    DOM.cards =
        Array.from(
            document.querySelectorAll(
                '.selvam-card'
            )
        );


    DOM.scoreGroups =
        Array.from(
            document.querySelectorAll(
                '.score-options'
            )
        );


    DOM.totalScore =
        document.getElementById(
            'totalScore100'
        );


    DOM.averageScore =
        document.getElementById(
            'averageScore'
        );


    DOM.backButton =
        document.getElementById(
            'backToIndex'
        );


    DOM.continueButton =
        document.getElementById(
            'continueToPage02'
        );

}


/* ================================================================
   DOM VALIDATION
   ================================================================ */

function validateDOM() {

    const errors = [];


    if (!DOM.form) {

        errors.push(
            '#assessmentForm'
        );

    }


    if (
        DOM.cards.length !==
        PAGE01_CONFIG.TOTAL_SELVAMS
    ) {

        console.warn(
            '[CTM PATH™] Expected ' +
            PAGE01_CONFIG.TOTAL_SELVAMS +
            ' Selvam cards but found:',
            DOM.cards.length
        );

    }


    if (!DOM.totalScore) {

        errors.push(
            '#totalScore100'
        );

    }


    if (!DOM.averageScore) {

        errors.push(
            '#averageScore'
        );

    }


    if (!DOM.backButton) {

        errors.push(
            '#backToIndex'
        );

    }


    if (!DOM.continueButton) {

        errors.push(
            '#continueToPage02'
        );

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

    SELVAMS.forEach(
        function (selvam) {

            state.scores[
                selvam.field
            ] = null;

        }
    );

}


/* ================================================================
   BIND SCORE BUTTONS
   ================================================================ */

function bindScoreButtons() {

    DOM.scoreGroups.forEach(
        function (group) {

            if (
                group.dataset.ctmBound === 'true'
            ) {
                return;
            }


            group.dataset.ctmBound =
                'true';


            const field =
                group.getAttribute(
                    'data-field'
                );


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


            buttons.forEach(
                function (button) {

                    button.addEventListener(
                        'click',
                        function () {

                            handleScoreSelection(
                                field,
                                button
                            );

                        }
                    );

                }
            );

        }
    );

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
            button.getAttribute(
                'data-score'
            )
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


    state.scores[field] =
        score;


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
   SCORE VALIDATION
   ================================================================ */

function isValidScore(score) {

    return (

        Number.isInteger(score) &&

        score >=
            PAGE01_CONFIG.MIN_SCORE &&

        score <=
            PAGE01_CONFIG.MAX_SCORE

    );

}


/* ================================================================
   GET SCORE RANGE
   ================================================================ */

function getScoreRange(score) {

    if (

        score >=
            PAGE01_CONFIG.SCORE_RANGES.LOW.min &&

        score <=
            PAGE01_CONFIG.SCORE_RANGES.LOW.max

    ) {

        return PAGE01_CONFIG.SCORE_RANGES.LOW;

    }


    if (

        score >=
            PAGE01_CONFIG.SCORE_RANGES.MID.min &&

        score <=
            PAGE01_CONFIG.SCORE_RANGES.MID.max

    ) {

        return PAGE01_CONFIG.SCORE_RANGES.MID;

    }


    if (

        score >=
            PAGE01_CONFIG.SCORE_RANGES.HIGH.min &&

        score <=
            PAGE01_CONFIG.SCORE_RANGES.HIGH.max

    ) {

        return PAGE01_CONFIG.SCORE_RANGES.HIGH;

    }


    return null;

}


/* ================================================================
   UPDATE SCORE BUTTONS
   ---------------------------------------------------------------
   JavaScript manages STATE only.
   CSS controls the actual colours.
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


    buttons.forEach(
        function (button) {

            const buttonScore =
                Number(
                    button.getAttribute(
                        'data-score'
                    )
                );


            /*
             * Remove all previous state classes.
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


            button.setAttribute(
                'aria-pressed',
                'false'
            );


            /*
             * Remove old inline colour styles.
             *
             * The page01.css stylesheet is the single
             * visual authority.
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
             * Apply state to selected button.
             */

            if (
                buttonScore === selectedScore
            ) {

                button.classList.add(
                    'selected'
                );


                const range =
                    getScoreRange(
                        selectedScore
                    );


                if (range) {

                    button.classList.add(

                        range.className,

                        range.colourClass

                    );

                }


                button.setAttribute(
                    'aria-pressed',
                    'true'
                );

            }

        }
    );

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


    const range =
        getScoreRange(score);


    if (!range) {
        return;
    }


    target.classList.add(

        range.className,

        range.colourClass

    );

}


/* ================================================================
   CALCULATE EVERYTHING
   ================================================================ */

function calculateAndRender() {

    const scores =
        SELVAMS.map(
            function (selvam) {

                return state.scores[
                    selvam.field
                ];

            }
        );


    const answeredScores =
        scores.filter(
            function (score) {

                return isValidScore(
                    score
                );

            }
        );


    state.totalAnswered =
        answeredScores.length;


    state.rawTotal =
        answeredScores.reduce(

            function (
                total,
                score
            ) {

                return total + score;

            },

            0

        );


    /*
     * Only calculate the FINAL Life Score
     * when all 16 Selvams are answered.
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

    }
    else {

        state.lifeScore =
            null;

        state.averageScore =
            null;

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

        DOM.totalScore.textContent =

            state.lifeScore === null

                ? '—'

                : formatScore(
                    state.lifeScore
                );

    }


    /*
     * AVERAGE /10
     */

    if (DOM.averageScore) {

        DOM.averageScore.textContent =

            state.averageScore === null

                ? '—'

                : formatScore(
                    state.averageScore
                );

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


    DOM.continueButton.setAttribute(

        'aria-disabled',

        complete
            ? 'false'
            : 'true'

    );


    DOM.continueButton.classList.toggle(

        'navigation-disabled',

        !complete

    );

}


/* ================================================================
   NAVIGATION
   ================================================================ */

function bindNavigation() {

    /*
     * BACK TO INDEX
     */

    if (DOM.backButton) {

        if (
            DOM.backButton.dataset.ctmBound !==
            'true'
        ) {

            DOM.backButton.dataset.ctmBound =
                'true';


            DOM.backButton.addEventListener(
                'click',
                function (event) {

                    event.preventDefault();


                    saveScores();


                    window.location.href =
                        PAGE01_CONFIG.INDEX_PAGE;

                }
            );

        }

    }


    /*
     * CONTINUE TO PAGE 02
     */

    if (DOM.continueButton) {

        if (
            DOM.continueButton.dataset.ctmBound !==
            'true'
        ) {

            DOM.continueButton.dataset.ctmBound =
                'true';


            DOM.continueButton.addEventListener(
                'click',
                function (event) {

                    event.preventDefault();


                    /*
                     * Do not allow an incomplete
                     * assessment to proceed.
                     */

                    if (

                        state.totalAnswered !==
                        PAGE01_CONFIG.TOTAL_SELVAMS

                    ) {

                        showIncompleteMessage();


                        scrollToFirstUnanswered();


                        return;

                    }


                    /*
                     * Save current state.
                     */

                    saveScores();


                    /*
                     * Save final Page 01 payload.
                     */

                    saveFinalAssessment();


                    /*
                     * Navigate to Page 02.
                     */

                    window.location.href =
                        PAGE01_CONFIG.NEXT_PAGE;

                }
            );

        }

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


    window.alert(
        message
    );

}


/* ================================================================
   SCROLL TO FIRST UNANSWERED
   ================================================================ */

function scrollToFirstUnanswered() {

    const firstUnanswered =
        SELVAMS.find(
            function (selvam) {

                return !isValidScore(
                    state.scores[
                        selvam.field
                    ]
                );

            }
        );


    if (!firstUnanswered) {
        return;
    }


    /*
     * First attempt:
     * card carries data-field.
     */

    let target =
        document.querySelector(
            '.selvam-card[data-field="' +
            escapeAttribute(
                firstUnanswered.field
            ) +
            '"]'
        );


    /*
     * Second attempt:
     * find the card containing the
     * correct score group.
     */

    if (!target) {

        const scoreGroup =
            document.querySelector(
                '.score-options[data-field="' +
                escapeAttribute(
                    firstUnanswered.field
                ) +
                '"]'
            );


        if (scoreGroup) {

            target =
                scoreGroup.closest(
                    '.selvam-card'
                ) ||
                scoreGroup;

        }

    }


    if (!target) {
        return;
    }


    target.scrollIntoView({

        behavior:
            PAGE01_CONFIG.SCROLL_BEHAVIOR,

        block:
            'center'

    });


    const firstScoreButton =
        target.querySelector(
            'button[data-score]'
        );


    if (firstScoreButton) {

        window.setTimeout(
            function () {

                firstScoreButton.focus({
                    preventScroll:
                        true
                });

            },
            250
        );

    }

}


/* ================================================================
   SAVE CURRENT SCORES
   ================================================================ */

function saveScores() {

    const payload =
        buildAssessmentPayload();


    /*
     * Local Storage
     */

    try {

        localStorage.setItem(

            PAGE01_CONFIG.STORAGE_KEY,

            JSON.stringify(
                payload
            )

        );

    }
    catch (error) {

        console.error(

            '[CTM PATH™] Unable to save Page 01 local data:',

            error

        );

    }


    /*
     * Session Storage
     */

    try {

        sessionStorage.setItem(

            PAGE01_CONFIG.STORAGE_KEY,

            JSON.stringify(
                payload
            )

        );

    }
    catch (error) {

        console.warn(

            '[CTM PATH™] Unable to save Page 01 session data:',

            error

        );

    }


    /*
     * Global reference for subsequent
     * page scripts during the journey.
     */

    window.CTMPathPage01 =
        payload;


    return payload;

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


    /*
     * Session Storage
     */

    try {

        sessionStorage.setItem(

            PAGE01_CONFIG.FINAL_STORAGE_KEY,

            JSON.stringify(
                payload
            )

        );

    }
    catch (error) {

        console.error(

            '[CTM PATH™] Unable to save final Page 01 session assessment:',

            error

        );

    }


    /*
     * Local Storage
     */

    try {

        localStorage.setItem(

            PAGE01_CONFIG.FINAL_STORAGE_KEY,

            JSON.stringify(
                payload
            )

        );

    }
    catch (error) {

        console.error(

            '[CTM PATH™] Unable to save final Page 01 local assessment:',

            error

        );

    }


    /*
     * Global reference.
     */

    window.CTMPathPage01Final =
        payload;


    return payload;

}


/* ================================================================
   BUILD ASSESSMENT PAYLOAD
   ================================================================ */

function buildAssessmentPayload() {

    const individualScores = {};


    SELVAMS.forEach(
        function (selvam) {

            individualScores[
                selvam.field
            ] =

                isValidScore(
                    state.scores[
                        selvam.field
                    ]
                )

                    ? state.scores[
                        selvam.field
                    ]

                    : null;

        }
    );


    return {

        page:
            PAGE01_CONFIG.PAGE_NUMBER,

        assessment:
            '16 Selwams of a Fulfilled Life',

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

    let savedData =
        null;


    /*
     * ------------------------------------------------------------
     * 1. Try localStorage
     * ------------------------------------------------------------
     */

    try {

        const raw =
            localStorage.getItem(
                PAGE01_CONFIG.STORAGE_KEY
            );


        if (raw) {

            savedData =
                JSON.parse(
                    raw
                );

        }

    }
    catch (error) {

        console.warn(

            '[CTM PATH™] Could not read Page 01 local data:',

            error

        );

    }


    /*
     * ------------------------------------------------------------
     * 2. Try sessionStorage if localStorage
     *    did not contain valid data.
     * ------------------------------------------------------------
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
                    JSON.parse(
                        raw
                    );

            }

        }
        catch (error) {

            console.warn(

                '[CTM PATH™] Could not read Page 01 session data:',

                error

            );

        }

    }


    /*
     * Nothing to restore.
     */

    if (

        !savedData ||
        !savedData.scores

    ) {

        return;

    }


    /*
     * Restore each Selvam.
     */

    SELVAMS.forEach(
        function (selvam) {

            const savedScore =
                Number(
                    savedData.scores[
                        selvam.field
                    ]
                );


            if (
                isValidScore(
                    savedScore
                )
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

        }
    );


    console.log(
        '[CTM PATH™] Previous Page 01 scores restored.'
    );

}


/* ================================================================
   PAGE EXIT SAFETY
   ---------------------------------------------------------------
   Persist current progress if the visitor leaves through browser
   history, refresh, tab close, or another navigation path.
   ================================================================ */

window.addEventListener(
    'pagehide',
    function () {

        try {

            saveScores();

        }
        catch (error) {

            console.warn(

                '[CTM PATH™] Could not persist Page 01 before exit:',

                error

            );

        }

    },
    {
        capture:
            true
    }
);


/* ================================================================
   PUBLIC API
   ================================================================ */

window.CTMPathPage01API = {

    /*
     * ------------------------------------------------------------
     * Get individual scores.
     * ------------------------------------------------------------
     */

    getScores:
        function () {

            return {
                ...state.scores
            };

        },


    /*
     * ------------------------------------------------------------
     * Get calculated results.
     * ------------------------------------------------------------
     */

    getResults:
        function () {

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
     * ------------------------------------------------------------
     * Get complete assessment object.
     * ------------------------------------------------------------
     */

    getAssessment:
        function () {

            return buildAssessmentPayload();

        },


    /*
     * ------------------------------------------------------------
     * Force save.
     * ------------------------------------------------------------
     */

    save:
        function () {

            saveScores();

            return buildAssessmentPayload();

        },


    /*
     * ------------------------------------------------------------
     * Clear Page 01.
     * ------------------------------------------------------------
     */

    clear:
        function () {

            clearAssessment();

        }

};


/* ================================================================
   CLEAR ASSESSMENT
   ================================================================ */

function clearAssessment() {

    /*
     * Reset state.
     */

    SELVAMS.forEach(
        function (selvam) {

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

        }
    );


    state.totalAnswered =
        0;


    state.rawTotal =
        0;


    state.lifeScore =
        null;


    state.averageScore =
        null;


    /*
     * Clear localStorage.
     */

    try {

        localStorage.removeItem(
            PAGE01_CONFIG.STORAGE_KEY
        );

        localStorage.removeItem(
            PAGE01_CONFIG.FINAL_STORAGE_KEY
        );

    }
    catch (error) {

        console.warn(

            '[CTM PATH™] Could not clear localStorage:',

            error

        );

    }


    /*
     * Clear sessionStorage.
     */

    try {

        sessionStorage.removeItem(
            PAGE01_CONFIG.STORAGE_KEY
        );

        sessionStorage.removeItem(
            PAGE01_CONFIG.FINAL_STORAGE_KEY
        );

    }
    catch (error) {

        console.warn(

            '[CTM PATH™] Could not clear sessionStorage:',

            error

        );

    }


    /*
     * Clear global references.
     */

    try {

        delete window.CTMPathPage01;

        delete window.CTMPathPage01Final;

    }
    catch (error) {

        window.CTMPathPage01 =
            null;

        window.CTMPathPage01Final =
            null;

    }


    /*
     * Re-render.
     */

    calculateAndRender();

}


/* ================================================================
   UTILITY — ROUND TO ONE DECIMAL
   ================================================================ */

function roundToOneDecimal(value) {

    if (
        !Number.isFinite(value)
    ) {

        return null;

    }


    return Math.round(

        (
            value +
            Number.EPSILON
        ) *
        10

    ) / 10;

}


/* ================================================================
   UTILITY — FORMAT SCORE
   ================================================================ */

function formatScore(value) {

    if (
        !Number.isFinite(value)
    ) {

        return '—';

    }


    /*
     * Whole numbers remain clean.
     *
     * 80  → 80
     * 8   → 8
     */

    if (
        Number.isInteger(value)
    ) {

        return String(value);

    }


    /*
     * Decimal values use one decimal place.
     *
     * 81.3 → 81.3
     * 7.6  → 7.6
     */

    return value.toFixed(1);

}


/* ================================================================
   UTILITY — ESCAPE ATTRIBUTE
   ================================================================ */

function escapeAttribute(value) {

    if (

        window.CSS &&

        typeof window.CSS.escape ===
            'function'

    ) {

        return window.CSS.escape(
            String(value)
        );

    }


    /*
     * Safe fallback for the known
     * field names used by Page 01.
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
   ERROR MONITORING
   ================================================================ */

window.addEventListener(
    'error',
    function (event) {

        console.error(

            '[CTM PATH™] Page 01 JavaScript error:',

            event.error ||
            event.message

        );

    }
);


window.addEventListener(
    'unhandledrejection',
    function (event) {

        console.error(

            '[CTM PATH™] Page 01 unhandled promise rejection:',

            event.reason

        );

    }
);


/* ================================================================
   DEVELOPMENT CONSOLE
   ---------------------------------------------------------------
   Intentionally quiet in production. Error monitoring above remains
   active so genuine runtime failures can still be diagnosed.
   ================================================================ */


/* ================================================================
   END OF PAGE 01 JAVASCRIPT
   ================================================================ */
