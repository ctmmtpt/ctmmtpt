
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 01 — JAVASCRIPT
   COMPLETE REPLACEMENT
   ============================================================ */


/* ============================================================
   CONFIGURATION
   ============================================================ */

const CONFIG = {

    BACKEND_URL:
        'https://script.google.com/macros/s/AKfycbx9eJru7EJYUpReeLv4Sym9wDVLgE_ruSw_ZUJ4ycDoneUKlkI_fcsJ2UJmKM7W_PXtEg/exec',

    PAGE_NUMBER: 1,

    NEXT_PAGE: '/02',

    TOTAL_QUESTIONS: 16,

    MAX_SCORE_PER_QUESTION: 10,

    MAX_RAW_SCORE: 160,

    MAX_NORMALIZED_SCORE: 100,

    ANSWERS_STORAGE_KEY:
        'ctmPage01Answers',

    SUMMARY_STORAGE_KEY:
        'ctmPage01Summary',

    VISITOR_ID_KEY:
        'ctmVisitorId'

};


/* ============================================================
   SELVAMS
   ============================================================ */

const SELVAMS = [

    {
        id: 'SV01',
        number: '01',
        ta: 'கல்வி',
        en: 'EDUCATION',
        questionTa:
            'உங்கள் அறிவு, கற்றல் மற்றும் கல்வி வளர்ச்சியில் நீங்கள் எவ்வளவு நிறைவாக இருக்கிறீர்கள்?',
        questionEn:
            'Your knowledge, learning and educational growth'
    },

    {
        id: 'SV02',
        number: '02',
        ta: 'செல்வம்',
        en: 'WEALTH',
        questionTa:
            'உங்கள் தற்போதைய செல்வம் மற்றும் நிதி நிலை உங்கள் வாழ்க்கை இலக்குகளுக்கு போதுமானதாக உள்ளதா?',
        questionEn:
            'Your wealth and financial position'
    },

    {
        id: 'SV03',
        number: '03',
        ta: 'தானியம்',
        en: 'FOOD & PROSPERITY',
        questionTa:
            'உங்கள் குடும்பத்தின் உணவு, வளம் மற்றும் அடிப்படை வாழ்வாதாரத்தில் நீங்கள் எவ்வளவு நிறைவாக இருக்கிறீர்கள்?',
        questionEn:
            'Food, prosperity and material well-being'
    },

    {
        id: 'SV04',
        number: '04',
        ta: 'வீரம்',
        en: 'COURAGE',
        questionTa:
            'சவால்களை எதிர்கொண்டு, தேவையான முடிவுகளைத் துணிவுடன் எடுக்கும் உங்கள் திறனை எவ்வாறு மதிப்பிடுவீர்கள்?',
        questionEn:
            'Your courage to face challenges and make difficult decisions'
    },

    {
        id: 'SV05',
        number: '05',
        ta: 'வெற்றி',
        en: 'SUCCESS',
        questionTa:
            'நீங்கள் விரும்பிய இலக்குகளை அடைந்து வருகிறீர்கள் என்ற உணர்வு உங்களுக்கு எவ்வளவு உள்ளது?',
        questionEn:
            'Your progress toward the success you desire'
    },

    {
        id: 'SV06',
        number: '06',
        ta: 'நலம்',
        en: 'HEALTH',
        questionTa:
            'உங்கள் உடல் நலம் மற்றும் ஒட்டுமொத்த ஆரோக்கியத்தில் நீங்கள் எவ்வளவு நிறைவாக இருக்கிறீர்கள்?',
        questionEn:
            'Your physical health and overall well-being'
    },

    {
        id: 'SV07',
        number: '07',
        ta: 'ஆயுள்',
        en: 'LONGEVITY',
        questionTa:
            'நீண்ட, ஆரோக்கியமான மற்றும் அர்த்தமுள்ள வாழ்க்கைக்காக நீங்கள் எவ்வளவு தயாராக வாழ்கிறீர்கள்?',
        questionEn:
            'Your readiness to build a long, healthy and meaningful life'
    },

    {
        id: 'SV08',
        number: '08',
        ta: 'அழகு',
        en: 'BEAUTY',
        questionTa:
            'உங்கள் தோற்றம், தனிப்பட்ட பராமரிப்பு மற்றும் உங்களைப் பற்றிய நம்பிக்கையில் நீங்கள் எவ்வளவு நிறைவாக இருக்கிறீர்கள்?',
        questionEn:
            'Your appearance, personal care and self-confidence'
    },

    {
        id: 'SV09',
        number: '09',
        ta: 'புகழ்',
        en: 'GOOD REPUTATION',
        questionTa:
            'உங்களைப் பற்றி குடும்பம், நண்பர்கள் மற்றும் சமூகத்தில் உருவாகியுள்ள நல்ல மதிப்பை எவ்வாறு மதிப்பிடுவீர்கள்?',
        questionEn:
            'The respect and reputation you have built'
    },

    {
        id: 'SV10',
        number: '10',
        ta: 'அறிவு',
        en: 'WISDOM',
        questionTa:
            'சரியானதை அறிந்து, சரியான நேரத்தில் சரியான முடிவை எடுக்கும் உங்கள் ஞானத்தை எவ்வாறு மதிப்பிடுவீர்கள்?',
        questionEn:
            'Your wisdom and ability to make sound decisions'
    },

    {
        id: 'SV11',
        number: '11',
        ta: 'குடும்ப வளம்',
        en: 'HAPPY FAMILY',
        questionTa:
            'உங்கள் குடும்ப வாழ்க்கையில் அன்பு, மகிழ்ச்சி, பாதுகாப்பு மற்றும் ஒற்றுமை எவ்வளவு உள்ளது?',
        questionEn:
            'Love, happiness, security and harmony in your family'
    },

    {
        id: 'SV12',
        number: '12',
        ta: 'மகப்பேறு',
        en: 'BLESSED CHILDREN',
        questionTa:
            'உங்கள் குழந்தைகள் மற்றும் அவர்களின் எதிர்காலம் குறித்து நீங்கள் எவ்வளவு நிறைவாகவும் நம்பிக்கையுடனும் இருக்கிறீர்கள்?',
        questionEn:
            'Your children’s well-being and future'
    },

    {
        id: 'SV13',
        number: '13',
        ta: 'நல்ல நட்பு / உறவு',
        en: 'GOOD RELATIONSHIPS',
        questionTa:
            'உங்கள் வாழ்க்கையில் உள்ள முக்கியமான உறவுகள் உங்களுக்கு அன்பு, ஆதரவு மற்றும் நம்பிக்கையை வழங்குகின்றனவா?',
        questionEn:
            'The quality of your important relationships'
    },

    {
        id: 'SV14',
        number: '14',
        ta: 'மனநிறைவு',
        en: 'INNER PEACE',
        questionTa:
            'உங்கள் மனதில் அமைதி, சமநிலை மற்றும் வாழ்க்கையை ஏற்றுக்கொள்ளும் நிறைவு எவ்வளவு உள்ளது?',
        questionEn:
            'Your inner peace, emotional balance and contentment'
    },

    {
        id: 'SV15',
        number: '15',
        ta: 'அறம்',
        en: 'DHARMA',
        questionTa:
            'உங்கள் மதிப்புகள், பொறுப்பு மற்றும் நீங்கள் சரி என்று நம்பும் வாழ்க்கை முறைக்கு ஏற்ப வாழ்கிறீர்களா?',
        questionEn:
            'Living according to your values, responsibility and principles'
    },

    {
        id: 'SV16',
        number: '16',
        ta: 'இறை நிலை',
        en: 'SPIRITUAL GROWTH',
        questionTa:
            'உங்கள் உள்ளார்ந்த வளர்ச்சி, ஆன்மீக உணர்வு மற்றும் வாழ்க்கையின் ஆழமான அர்த்தத்துடன் உங்களுக்குள்ள தொடர்பை எவ்வாறு மதிப்பிடுவீர்கள்?',
        questionEn:
            'Your inner growth, spiritual awareness and sense of meaning'
    }

];


/* ============================================================
   APPLICATION STATE
   ============================================================ */

const answers = {};

let DOM = {

    selvamGrid: null,

    normalizedScore: null,

    rawTotal: null,

    averageScore: null,

    scoreMessage: null,

    continueButton: null,

    pageStatus: null

};


/* ============================================================
   DOM INITIALIZATION
   IMPORTANT:
   All DOM references are obtained AFTER DOM is ready.
   ============================================================ */

function cacheDOM() {

    DOM.selvamGrid =
        document.getElementById(
            'selvamGrid'
        );

    DOM.normalizedScore =
        document.getElementById(
            'normalizedScore'
        );

    DOM.rawTotal =
        document.getElementById(
            'rawTotal'
        );

    DOM.averageScore =
        document.getElementById(
            'averageScore'
        );

    DOM.scoreMessage =
        document.getElementById(
            'scoreMessage'
        );

    DOM.continueButton =
        document.getElementById(
            'continueButton'
        );

    DOM.pageStatus =
        document.getElementById(
            'pageStatus'
        );

}


/* ============================================================
   INITIALIZE PAGE
   ============================================================ */

function initializePage() {

    cacheDOM();

    installScoreStyles();

    restoreLocalAnswers();

    renderSelvams();

    updateAllSelectedStates();

    updateScore();

    attachContinueHandler();

}


/* ============================================================
   START APPLICATION
   ============================================================ */

if (
    document.readyState ===
    'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        initializePage,
        {
            once: true
        }
    );

}
else {

    initializePage();

}


/* ============================================================
   RENDER SELVAMS
   ============================================================ */

function renderSelvams() {

    if (!DOM.selvamGrid) {

        console.error(
            'CTM PATH™ Page 01: #selvamGrid not found.'
        );

        return;

    }


    DOM.selvamGrid.innerHTML = '';


    SELVAMS.forEach(
        function(selvam) {

            const card =
                document.createElement(
                    'article'
                );


            card.className =
                'selvam-card';


            card.dataset.questionId =
                selvam.id;


            card.innerHTML = `

                <div class="selvam-top">

                    <div class="selvam-number">
                        ${selvam.number}
                    </div>

                    <div>

                        <div class="selvam-title-ta">
                            ${selvam.ta}
                        </div>

                        <div class="selvam-title-en">
                            ${selvam.en}
                        </div>

                    </div>

                </div>


                <div class="selvam-question-ta">
                    ${selvam.questionTa}
                </div>


                <div class="selvam-question-en">
                    ${selvam.questionEn}
                </div>


                <div class="score-buttons">

                    ${createScoreButtons(
                        selvam.id
                    )}

                </div>


                <div
                    class="selected-score"
                    id="selected-${selvam.id}"
                >
                    உங்கள் மதிப்பீடு: —
                </div>

            `;


            DOM.selvamGrid.appendChild(
                card
            );

        }
    );


    attachScoreHandlers();

}


/* ============================================================
   CREATE SCORE BUTTONS
   ============================================================ */

function createScoreButtons(
    questionId
) {

    let html = '';


    for (
        let score = 1;
        score <= CONFIG.MAX_SCORE_PER_QUESTION;
        score++
    ) {

        let scoreClass;


        if (score <= 3) {

            scoreClass =
                'score-low';

        }
        else if (score <= 7) {

            scoreClass =
                'score-mid';

        }
        else {

            scoreClass =
                'score-high';

        }


        html += `

            <button
                type="button"
                class="score-button ${scoreClass}"
                data-question-id="${questionId}"
                data-score="${score}"
                aria-label="${questionId} score ${score}"
                aria-pressed="false"
            >
                ${score}
            </button>

        `;

    }


    return html;

}


/* ============================================================
   SCORE BUTTON STYLES
   ============================================================ */

function installScoreStyles() {

    if (
        document.getElementById(
            'ctm-page01-score-styles'
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            'style'
        );


    style.id =
        'ctm-page01-score-styles';


    style.textContent = `

        /* ---------------------------------------------
           1–3 RED
           --------------------------------------------- */

        .score-button.score-low {
            border-color:
                rgba(214, 90, 69, 0.55) !important;

            color:
                #f5c1b7 !important;

            background:
                rgba(214, 90, 69, 0.08) !important;
        }


        .score-button.score-low:hover {
            border-color:
                #d65a45 !important;

            color:
                #ffffff !important;

            background:
                #d65a45 !important;
        }


        /* ---------------------------------------------
           4–7 ORANGE
           --------------------------------------------- */

        .score-button.score-mid {
            border-color:
                rgba(232, 135, 36, 0.55) !important;

            color:
                #ffd19c !important;

            background:
                rgba(232, 135, 36, 0.08) !important;
        }


        .score-button.score-mid:hover {
            border-color:
                #e88724 !important;

            color:
                #ffffff !important;

            background:
                #e88724 !important;
        }


        /* ---------------------------------------------
           8–10 GREEN
           --------------------------------------------- */

        .score-button.score-high {
            border-color:
                rgba(41, 196, 125, 0.55) !important;

            color:
                #a9f0ca !important;

            background:
                rgba(41, 196, 125, 0.08) !important;
        }


        .score-button.score-high:hover {
            border-color:
                #29c47d !important;

            color:
                #ffffff !important;

            background:
                #18a66a !important;
        }


        /* ---------------------------------------------
           SELECTED RED
           --------------------------------------------- */

        .score-button.score-low.selected {
            border-color:
                #d65a45 !important;

            background:
                #d65a45 !important;

            color:
                #ffffff !important;

            box-shadow:
                0 8px 20px
                rgba(214, 90, 69, 0.30) !important;
        }


        /* ---------------------------------------------
           SELECTED ORANGE
           --------------------------------------------- */

        .score-button.score-mid.selected {
            border-color:
                #e88724 !important;

            background:
                #e88724 !important;

            color:
                #ffffff !important;

            box-shadow:
                0 8px 20px
                rgba(232, 135, 36, 0.30) !important;
        }


        /* ---------------------------------------------
           SELECTED GREEN
           --------------------------------------------- */

        .score-button.score-high.selected {
            border-color:
                #29c47d !important;

            background:
                #18a66a !important;

            color:
                #ffffff !important;

            box-shadow:
                0 8px 20px
                rgba(41, 196, 125, 0.30) !important;
        }


        /* ---------------------------------------------
           SCORE READOUT
           --------------------------------------------- */

        .selected-score.has-value {
            opacity: 1;
        }

    `;


    document.head.appendChild(
        style
    );

}


/* ============================================================
   SCORE BUTTON EVENTS
   ============================================================ */

function attachScoreHandlers() {

    document
        .querySelectorAll(
            '.score-button'
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    'click',
                    handleScoreSelection
                );

            }
        );

}


/* ============================================================
   HANDLE SCORE SELECTION
   ============================================================ */

async function handleScoreSelection(
    event
) {

    const button =
        event.currentTarget;


    if (!button) {
        return;
    }


    const questionId =
        button.dataset.questionId;


    const score =
        Number(
            button.dataset.score
        );


    if (
        !questionId ||
        !Number.isFinite(score) ||
        score < 1 ||
        score > CONFIG.MAX_SCORE_PER_QUESTION
    ) {

        console.error(
            'Invalid Page 01 score selection:',
            questionId,
            score
        );

        return;

    }


    /*
     * -----------------------------------------
     * 1. STORE ANSWER
     * -----------------------------------------
     */

    answers[questionId] =
        score;


    /*
     * -----------------------------------------
     * 2. UPDATE BUTTON
     * -----------------------------------------
     */

    updateSelectedButton(
        questionId,
        score
    );


    /*
     * -----------------------------------------
     * 3. SAVE LOCALLY IMMEDIATELY
     * -----------------------------------------
     */

    saveLocalAnswers();


    /*
     * -----------------------------------------
     * 4. RECALCULATE SCORE IMMEDIATELY
     * -----------------------------------------
     *
     * This MUST happen before any backend call.
     */

    updateScore();


    /*
     * -----------------------------------------
     * 5. BACKEND SAVE
     * -----------------------------------------
     *
     * Backend failure must never erase or
     * interrupt the local assessment.
     */

    saveAnswerToBackend(
        questionId,
        score
    );

}


/* ============================================================
   UPDATE SELECTED BUTTON
   ============================================================ */

function updateSelectedButton(
    questionId,
    score
) {

    const buttons =
        document.querySelectorAll(
            `.score-button[data-question-id="${questionId}"]`
        );


    buttons.forEach(
        function(button) {

            const buttonScore =
                Number(
                    button.dataset.score
                );


            const selected =
                buttonScore === score;


            button.classList.toggle(
                'selected',
                selected
            );


            button.setAttribute(
                'aria-pressed',
                String(selected)
            );


            /*
             * Inline visual enforcement.
             *
             * This guarantees that an existing
             * page stylesheet cannot turn the
             * selected score back to gold/yellow.
             */

            if (selected) {

                if (score <= 3) {

                    button.style.setProperty(
                        'background',
                        '#d65a45',
                        'important'
                    );

                    button.style.setProperty(
                        'border-color',
                        '#d65a45',
                        'important'
                    );

                    button.style.setProperty(
                        'color',
                        '#ffffff',
                        'important'
                    );

                }
                else if (score <= 7) {

                    button.style.setProperty(
                        'background',
                        '#e88724',
                        'important'
                    );

                    button.style.setProperty(
                        'border-color',
                        '#e88724',
                        'important'
                    );

                    button.style.setProperty(
                        'color',
                        '#ffffff',
                        'important'
                    );

                }
                else {

                    button.style.setProperty(
                        'background',
                        '#18a66a',
                        'important'
                    );

                    button.style.setProperty(
                        'border-color',
                        '#29c47d',
                        'important'
                    );

                    button.style.setProperty(
                        'color',
                        '#ffffff',
                        'important'
                    );

                }

            }
            else {

                button.style.removeProperty(
                    'background'
                );

                button.style.removeProperty(
                    'border-color'
                );

                button.style.removeProperty(
                    'color'
                );

            }

        }
    );


    /*
     * -----------------------------------------
     * UPDATE READOUT
     * -----------------------------------------
     */

    const readout =
        document.getElementById(
            `selected-${questionId}`
        );


    if (readout) {

        readout.textContent =
            `உங்கள் மதிப்பீடு: ${score} / 10`;


        readout.classList.add(
            'has-value'
        );

    }

}


/* ============================================================
   RESTORE ALL SELECTED BUTTONS
   ============================================================ */

function updateAllSelectedStates() {

    SELVAMS.forEach(
        function(selvam) {

            const score =
                Number(
                    answers[
                        selvam.id
                    ]
                );


            if (
                Number.isFinite(score) &&
                score >= 1 &&
                score <= CONFIG.MAX_SCORE_PER_QUESTION
            ) {

                updateSelectedButton(
                    selvam.id,
                    score
                );

            }

        }
    );

}


/* ============================================================
   CALCULATE SCORES
   ============================================================ */

function calculateScores() {

    let rawTotal = 0;

    let answeredCount = 0;


    /*
     * Only the official 16 SELVAMS
     * are included in the calculation.
     */

    SELVAMS.forEach(
        function(selvam) {

            const value =
                answers[
                    selvam.id
                ];


            const score =
                Number(value);


            if (
                Number.isFinite(score) &&
                score >= 1 &&
                score <= CONFIG.MAX_SCORE_PER_QUESTION
            ) {

                rawTotal += score;

                answeredCount++;

            }

        }
    );


    /*
     * Average is calculated from
     * answered questions only.
     */

    const average =
        answeredCount > 0
            ? rawTotal / answeredCount
            : 0;


    /*
     * Final Life Score:
     *
     * 16 questions × 10 = 160 maximum.
     *
     * 160 → 100
     */

    let normalized = 0;


    if (
        answeredCount ===
        CONFIG.TOTAL_QUESTIONS
    ) {

        normalized =
            Math.round(
                (
                    rawTotal /
                    CONFIG.MAX_RAW_SCORE
                ) *
                CONFIG.MAX_NORMALIZED_SCORE
            );

    }


    return {

        answeredCount:

            answeredCount,

        rawTotal:

            rawTotal,

        average:

            average,

        normalized:

            normalized

    };

}


/* ============================================================
   UPDATE SCORE DISPLAY
   ============================================================ */

function updateScore() {

    const scores =
        calculateScores();


    /*
     * RAW TOTAL
     */

    if (DOM.rawTotal) {

        DOM.rawTotal.textContent =
            String(
                scores.rawTotal
            );

    }


    /*
     * AVERAGE
     */

    if (DOM.averageScore) {

        DOM.averageScore.textContent =
            scores.average.toFixed(
                1
            );

    }


    /*
     * LIFE SCORE
     */

    if (DOM.normalizedScore) {

        DOM.normalizedScore.textContent =
            String(
                scores.normalized
            );

    }


    /*
     * MESSAGE
     */

    updateScoreMessage(
        scores
    );


    /*
     * CONTINUE BUTTON
     */

    if (DOM.continueButton) {

        DOM.continueButton.disabled =
            scores.answeredCount !==
            CONFIG.TOTAL_QUESTIONS;

    }


    /*
     * DEBUG
     *
     * This makes browser-console verification
     * very easy.
     */

    console.log(
        'CTM PATH™ Page 01 Score:',
        scores
    );

}


/* ============================================================
   SCORE MESSAGE
   ============================================================ */

function updateScoreMessage(
    scores
) {

    if (!DOM.scoreMessage) {
        return;
    }


    DOM.scoreMessage.className =
        'score-message';


    /*
     * NOTHING ANSWERED
     */

    if (
        scores.answeredCount === 0
    ) {

        DOM.scoreMessage.textContent =
            'உங்கள் மதிப்பீடு இங்கே தோன்றும்.';

        return;

    }


    /*
     * PARTIALLY ANSWERED
     */

    if (
        scores.answeredCount <
        CONFIG.TOTAL_QUESTIONS
    ) {

        DOM.scoreMessage.textContent =
            `${scores.answeredCount} / 16 மதிப்பீடுகள் முடிந்துள்ளன. மீதமுள்ளவற்றையும் மதிப்பிடுங்கள்.`;

        return;

    }


    /*
     * COMPLETE — LOW
     */

    if (
        scores.normalized <= 39
    ) {

        DOM.scoreMessage.classList.add(
            'score-low'
        );


        DOM.scoreMessage.textContent =
            'இது உங்கள் வாழ்க்கையின் இறுதி தீர்ப்பு அல்ல. இது உங்கள் மாற்றத்தின் தொடக்கப் புள்ளி.';

        return;

    }


    /*
     * COMPLETE — DEVELOPING
     */

    if (
        scores.normalized <= 69
    ) {

        DOM.scoreMessage.classList.add(
            'score-mid'
        );


        DOM.scoreMessage.textContent =
            'உங்கள் வாழ்க்கையின் பல பகுதிகளில் நல்ல அடித்தளம் உள்ளது. அடுத்த கட்ட வளர்ச்சிக்கான வாய்ப்புகளை இப்போது தெளிவாக பார்க்கலாம்.';

        return;

    }


    /*
     * COMPLETE — STRONG
     */

    DOM.scoreMessage.classList.add(
        'score-high'
    );


    DOM.scoreMessage.textContent =
        'உங்கள் வாழ்க்கையில் பல வலுவான பகுதிகள் உள்ளன. அவற்றை மேலும் ஆழப்படுத்தி சமநிலையுடன் வளர்த்துக் கொள்ளுங்கள்.';

}


/* ============================================================
   LOCAL STORAGE — SAVE
   ============================================================ */

function saveLocalAnswers() {

    try {

        localStorage.setItem(
            CONFIG.ANSWERS_STORAGE_KEY,
            JSON.stringify(
                answers
            )
        );

    }
    catch (error) {

        console.error(
            'CTM PATH™ Page 01 local save error:',
            error
        );

    }

}


/* ============================================================
   LOCAL STORAGE — RESTORE
   ============================================================ */

function restoreLocalAnswers() {

    let stored = null;


    try {

        stored =
            localStorage.getItem(
                CONFIG.ANSWERS_STORAGE_KEY
            );

    }
    catch (error) {

        console.error(
            'Unable to access Page 01 localStorage:',
            error
        );

        return;

    }


    if (!stored) {
        return;
    }


    try {

        const saved =
            JSON.parse(
                stored
            );


        if (
            !saved ||
            typeof saved !== 'object'
        ) {

            return;

        }


        SELVAMS.forEach(
            function(selvam) {

                const score =
                    Number(
                        saved[
                            selvam.id
                        ]
                    );


                if (
                    Number.isFinite(score) &&
                    score >= 1 &&
                    score <= CONFIG.MAX_SCORE_PER_QUESTION
                ) {

                    answers[
                        selvam.id
                    ] = score;

                }

            }
        );


        console.log(
            'CTM PATH™ Page 01 restored answers:',
            answers
        );

    }
    catch (error) {

        console.warn(
            'Unable to restore Page 01 answers:',
            error
        );

    }

}


/* ============================================================
   VISITOR ID
   ============================================================ */

function getVisitorId() {

    try {

        return (
            localStorage.getItem(
                CONFIG.VISITOR_ID_KEY
            ) ||
            ''
        ).trim();

    }
    catch (error) {

        console.warn(
            'Unable to read VisitorID:',
            error
        );

        return '';

    }

}


/* ============================================================
   BACKEND SAVE
   ============================================================ */

async function saveAnswerToBackend(
    questionId,
    score
) {

    const visitorId =
        getVisitorId();


    /*
     * No VisitorID?
     *
     * Do NOT block the assessment.
     * Local assessment remains authoritative
     * for the current browser session.
     */

    if (!visitorId) {

        console.warn(
            'CTM PATH™ Page 01: VisitorID not available. Local score retained.'
        );

        return;

    }


    const selvam =
        SELVAMS.find(
            function(item) {

                return (
                    item.id ===
                    questionId
                );

            }
        );


    if (!selvam) {

        console.warn(
            'Unknown Page 01 question:',
            questionId
        );

        return;

    }


    const payload = {

        action:
            'save_answer',

        data: {

            visitorId:

                visitorId,

            pageNumber:

                CONFIG.PAGE_NUMBER,

            questionId:

                questionId,

            question:

                `${selvam.ta} — ${selvam.en}`,

            answer:

                score,

            score:

                score

        }

    };


    try {

        const response =
            await fetch(
                CONFIG.BACKEND_URL,
                {

                    method:
                        'POST',

                    headers: {

                        'Content-Type':
                            'text/plain;charset=utf-8'

                    },

                    body:
                        JSON.stringify(
                            payload
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                `Server error: ${response.status}`
            );

        }


        const text =
            await response.text();


        if (!text) {

            console.warn(
                'Page 01 backend returned an empty response.'
            );

            return;

        }


        let result;


        try {

            result =
                JSON.parse(
                    text
                );

        }
        catch (error) {

            console.warn(
                'Page 01 backend response was not JSON:',
                text
            );

            return;

        }


        if (
            result &&
            result.success === false
        ) {

            throw new Error(
                result.message ||
                'Unable to save assessment.'
            );

        }


        /*
         * Do not replace the score message with
         * "saved" after every single click.
         *
         * The score display belongs to the assessment.
         */

        console.log(
            'CTM PATH™ Page 01 backend saved:',
            {
                questionId:
                    questionId,

                score:
                    score,

                result:
                    result
            }
        );

    }
    catch (error) {

        /*
         * IMPORTANT:
         *
         * Backend failure does NOT affect:
         *
         * 1. selected button
         * 2. raw total
         * 3. average
         * 4. life score
         * 5. localStorage
         */

        console.error(
            'CTM PATH™ Page 01 backend save error:',
            error
        );

    }

}


/* ============================================================
   CONTINUE HANDLER
   ============================================================ */

function attachContinueHandler() {

    if (!DOM.continueButton) {

        console.warn(
            'CTM PATH™ Page 01: #continueButton not found.'
        );

        return;

    }


    /*
     * Prevent duplicate event handlers.
     */

    if (
        DOM.continueButton.dataset.page01Bound ===
        'true'
    ) {

        return;

    }


    DOM.continueButton.dataset.page01Bound =
        'true';


    DOM.continueButton.addEventListener(
        'click',
        handleContinue
    );

}


/* ============================================================
   CONTINUE TO PAGE 02
   ============================================================ */

async function handleContinue() {

    /*
     * ALWAYS recalculate directly from
     * the current answers.
     */

    const scores =
        calculateScores();


    console.log(
        'CTM PATH™ Page 01 Continue:',
        scores
    );


    /*
     * REQUIRE ALL 16 ANSWERS
     */

    if (
        scores.answeredCount !==
        CONFIG.TOTAL_QUESTIONS
    ) {

        setStatus(
            `முதலில் 16 மதிப்பீடுகளையும் முடிக்கவும். ${scores.answeredCount} / 16 முடிந்துள்ளன.`,
            'error'
        );


        /*
         * Scroll to the first unanswered card.
         */

        scrollToFirstUnanswered();


        return;

    }


    /*
     * VISITOR ID
     *
     * We retain the existing requirement for
     * progression, but do not require VisitorID
     * for score calculation.
     */

    const visitorId =
        getVisitorId();


    if (!visitorId) {

        setStatus(
            'VisitorID கிடைக்கவில்லை. Index பக்கத்திலிருந்து பயணத்தைத் தொடங்கவும்.',
            'error'
        );

        return;

    }


    /*
     * DISABLE CONTINUE
     */

    if (DOM.continueButton) {

        DOM.continueButton.disabled =
            true;

    }


    setStatus(
        'உங்கள் மதிப்பெண் பாதுகாக்கப்படுகிறது...',
        'loading'
    );


    /*
     * SAVE ANSWERS LOCALLY
     */

    saveLocalAnswers();


    /*
     * CREATE PAGE 01 SUMMARY
     */

    const page01Summary = {

        visitorId:

            visitorId,

        pageNumber:

            CONFIG.PAGE_NUMBER,

        rawTotal:

            scores.rawTotal,

        average:

            Number(
                scores.average.toFixed(
                    1
                )
            ),

        normalizedScore:

            scores.normalized,

        answeredCount:

            scores.answeredCount,

        completed:

            true,

        completedAt:

            new Date().toISOString()

    };


    /*
     * SAVE SUMMARY LOCALLY
     */

    try {

        localStorage.setItem(
            CONFIG.SUMMARY_STORAGE_KEY,
            JSON.stringify(
                page01Summary
            )
        );

    }
    catch (error) {

        console.error(
            'Unable to save Page 01 summary:',
            error
        );

    }


    /*
     * FINAL STATUS
     */

    setStatus(
        '✓ மதிப்பீடு முடிந்தது / Assessment complete',
        'success'
    );


    /*
     * SHORT DELAY FOR USER FEEDBACK
     *
     * Then navigate to Page 02.
     */

    setTimeout(
        function() {

            window.location.href =
                CONFIG.NEXT_PAGE;

        },
        450
    );

}


/* ============================================================
   SCROLL TO FIRST UNANSWERED QUESTION
   ============================================================ */

function scrollToFirstUnanswered() {

    const unanswered =
        SELVAMS.find(
            function(selvam) {

                const score =
                    Number(
                        answers[
                            selvam.id
                        ]
                    );


                return !(
                    Number.isFinite(score) &&
                    score >= 1 &&
                    score <= CONFIG.MAX_SCORE_PER_QUESTION
                );

            }
        );


    if (!unanswered) {
        return;
    }


    const card =
        document.querySelector(
            `.selvam-card[data-question-id="${unanswered.id}"]`
        );


    if (!card) {
        return;
    }


    card.scrollIntoView(
        {
            behavior:
                'smooth',

            block:
                'center'
        }
    );

}


/* ============================================================
   STATUS
   ============================================================ */

function setStatus(
    message,
    type
) {

    if (!DOM.pageStatus) {
        return;
    }


    DOM.pageStatus.textContent =
        message;


    DOM.pageStatus.className =
        'page-status';


    if (type) {

        DOM.pageStatus.classList.add(
            type
        );

    }

}
