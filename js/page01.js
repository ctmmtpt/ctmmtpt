
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 01 — JAVASCRIPT
   ============================================================ */


/* ============================================================
   CONFIGURATION
   ============================================================ */

const CONFIG = {

    BACKEND_URL:
        'https://script.google.com/macros/s/AKfycbx9eJru7EJYUpReeLv4Sym9wDVLgE_ruSw_ZUJ4ycDoneUKlkI_fcsJ2UJmKM7W_PXtEg/exec',

    PAGE_NUMBER: 1,

    /*
     * Clean Cloudflare Pages route.
     * Page 01 must open as:
     *
     * https://ctmmtpt.pages.dev/02
     *
     * NOT:
     *
     * /html/page02.html
     */
    NEXT_PAGE: '/02',

    TOTAL_QUESTIONS: 16

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
   STATE
   ============================================================ */

const answers = {};


/* ============================================================
   DOM
   ============================================================ */

const selvamGrid =
    document.getElementById('selvamGrid');

const normalizedScoreElement =
    document.getElementById('normalizedScore');

const rawTotalElement =
    document.getElementById('rawTotal');

const averageScoreElement =
    document.getElementById('averageScore');

const scoreMessageElement =
    document.getElementById('scoreMessage');

const continueButton =
    document.getElementById('continueButton');

const pageStatus =
    document.getElementById('pageStatus');


/* ============================================================
   INITIALIZE
   ============================================================ */

document.addEventListener(
    'DOMContentLoaded',
    initializePage
);


function initializePage() {

    renderSelvams();

    restoreLocalAnswers();

    updateScore();

    updateAllSelectedStates();

}


/* ============================================================
   RENDER
   ============================================================ */

function renderSelvams() {

    if (!selvamGrid) {
        return;
    }

    selvamGrid.innerHTML = '';

    SELVAMS.forEach(
        function(selvam) {

            const card =
                document.createElement('article');

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
                    ${createScoreButtons(selvam.id)}
                </div>


                <div
                    class="selected-score"
                    id="selected-${selvam.id}"
                >
                    உங்கள் மதிப்பீடு: —
                </div>

            `;

            selvamGrid.appendChild(card);

        }
    );


    attachScoreHandlers();

}


/* ============================================================
   SCORE BUTTONS
   ============================================================ */

function createScoreButtons(
    questionId
) {

    let html = '';

    for (
        let score = 1;
        score <= 10;
        score++
    ) {

        const scoreBand =
            score <= 3
                ? 'score-low'
                : score <= 7
                    ? 'score-mid'
                    : 'score-high';


        html += `

            <button
                type="button"
                class="score-button ${scoreBand}"
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
   SCORE BUTTON COLOUR SYSTEM
   ============================================================ */

(function installScoreButtonColours() {

    if (
        document.getElementById(
            'ctm-page01-score-colours'
        )
    ) {
        return;
    }


    const style =
        document.createElement('style');


    style.id =
        'ctm-page01-score-colours';


    style.textContent = `

        /* =========================================
           1 – 3 : RED
           ========================================= */

        .score-button.score-low {

            border-color:
                rgba(214, 90, 69, 0.45);

            color:
                #f5c1b7;

            background:
                rgba(214, 90, 69, 0.08);

        }


        .score-button.score-low:hover {

            border-color:
                #d65a45;

            color:
                #ffffff;

            background:
                #d65a45;

        }


        /* =========================================
           4 – 7 : ORANGE
           ========================================= */

        .score-button.score-mid {

            border-color:
                rgba(232, 135, 36, 0.45);

            color:
                #ffd19c;

            background:
                rgba(232, 135, 36, 0.08);

        }


        .score-button.score-mid:hover {

            border-color:
                #e88724;

            color:
                #ffffff;

            background:
                #e88724;

        }


        /* =========================================
           8 – 10 : GREEN
           ========================================= */

        .score-button.score-high {

            border-color:
                rgba(41, 196, 125, 0.45);

            color:
                #a9f0ca;

            background:
                rgba(41, 196, 125, 0.08);

        }


        .score-button.score-high:hover {

            border-color:
                #29c47d;

            color:
                #ffffff;

            background:
                #18a66a;

        }


        /* =========================================
           SELECTED — RED
           ========================================= */

        .score-button.score-low.selected {

            border-color:
                #d65a45;

            background:
                #d65a45;

            color:
                #ffffff;

            box-shadow:
                0 8px 20px
                rgba(214, 90, 69, 0.25);

        }


        /* =========================================
           SELECTED — ORANGE
           ========================================= */

        .score-button.score-mid.selected {

            border-color:
                #e88724;

            background:
                #e88724;

            color:
                #ffffff;

            box-shadow:
                0 8px 20px
                rgba(232, 135, 36, 0.25);

        }


        /* =========================================
           SELECTED — GREEN
           ========================================= */

        .score-button.score-high.selected {

            border-color:
                #29c47d;

            background:
                #18a66a;

            color:
                #ffffff;

            box-shadow:
                0 8px 20px
                rgba(41, 196, 125, 0.25);

        }

    `;


    document.head.appendChild(style);

})();


/* ============================================================
   SCORE EVENTS
   ============================================================ */

function attachScoreHandlers() {

    document
        .querySelectorAll('.score-button')
        .forEach(
            function(button) {

                button.addEventListener(
                    'click',
                    handleScoreSelection
                );

            }
        );

}


async function handleScoreSelection(
    event
) {

    const button =
        event.currentTarget;


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
        score > 10
    ) {
        return;
    }


    answers[questionId] =
        score;


    updateSelectedButton(
        questionId,
        score
    );


    /*
     * Update the visible totals FIRST.
     * The calculation must never depend on the backend response.
     */

    updateScore();

    saveLocalAnswers();


    /*
     * Backend saving is secondary.
     * A network/backend failure must not prevent
     * the local score calculation.
     */

    await saveAnswerToBackend(
        questionId,
        score
    );

}


/* ============================================================
   UPDATE ALL SELECTED STATES
   ============================================================ */

function updateAllSelectedStates() {

    SELVAMS.forEach(
        function(selvam) {

            const score =
                Number(
                    answers[selvam.id]
                );


            if (
                Number.isFinite(score) &&
                score >= 1 &&
                score <= 10
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
   SELECTED BUTTON
   ============================================================ */

function updateSelectedButton(
    questionId,
    score
) {

    document
        .querySelectorAll(
            `.score-button[data-question-id="${questionId}"]`
        )
        .forEach(
            function(button) {

                const isSelected =
                    Number(
                        button.dataset.score
                    ) === score;


                button.classList.toggle(
                    'selected',
                    isSelected
                );


                button.setAttribute(
                    'aria-pressed',
                    String(isSelected)
                );

            }
        );


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
   SCORE CALCULATION
   ============================================================ */

function calculateScores() {

    /*
     * Always calculate from the official 16 SELVAMS.
     * This prevents unrelated localStorage keys or malformed
     * values from affecting the result.
     */

    let rawTotal = 0;

    let answeredCount = 0;


    SELVAMS.forEach(
        function(selvam) {

            const score =
                Number(
                    answers[selvam.id]
                );


            if (
                Number.isFinite(score) &&
                score >= 1 &&
                score <= 10
            ) {

                rawTotal += score;

                answeredCount++;

            }

        }
    );


    const average =
        answeredCount > 0
            ? rawTotal / answeredCount
            : 0;


    /*
     * 16 Selvam × 10 = 160 maximum.
     *
     * Convert the completed raw score
     * to a 100-point score.
     *
     * Do NOT calculate a normalized score
     * until all 16 questions have been answered.
     */

    const normalized =
        answeredCount === CONFIG.TOTAL_QUESTIONS
            ? Math.round(
                (
                    rawTotal /
                    (
                        CONFIG.TOTAL_QUESTIONS *
                        10
                    )
                ) *
                100
            )
            : 0;


    return {

        answeredCount,

        rawTotal,

        average,

        normalized

    };

}


/* ============================================================
   SCORE DISPLAY
   ============================================================ */

function updateScore() {

    const scores =
        calculateScores();


    if (rawTotalElement) {

        rawTotalElement.textContent =
            String(
                scores.rawTotal
            );

    }


    if (averageScoreElement) {

        averageScoreElement.textContent =
            scores.average.toFixed(1);

    }


    if (normalizedScoreElement) {

        normalizedScoreElement.textContent =
            String(
                scores.normalized
            );

    }


    updateScoreMessage(
        scores
    );


    if (continueButton) {

        continueButton.disabled =
            scores.answeredCount !==
            CONFIG.TOTAL_QUESTIONS;

    }

}


/* ============================================================
   SCORE MESSAGE
   ============================================================ */

function updateScoreMessage(
    scores
) {

    if (!scoreMessageElement) {
        return;
    }


    scoreMessageElement.className =
        'score-message';


    if (
        scores.answeredCount === 0
    ) {

        scoreMessageElement.textContent =
            'உங்கள் மதிப்பீடு இங்கே தோன்றும்.';

        return;

    }


    if (
        scores.answeredCount <
        CONFIG.TOTAL_QUESTIONS
    ) {

        scoreMessageElement.textContent =
            `${scores.answeredCount} / 16 மதிப்பீடுகள் முடிந்துள்ளன. மீதமுள்ளவற்றையும் மதிப்பிடுங்கள்.`;

        return;

    }


    if (
        scores.normalized <= 39
    ) {

        scoreMessageElement.classList.add(
            'score-low'
        );


        scoreMessageElement.textContent =
            'இது உங்கள் வாழ்க்கையின் இறுதி தீர்ப்பு அல்ல. இது உங்கள் மாற்றத்தின் தொடக்கப் புள்ளி.';

        return;

    }


    if (
        scores.normalized <= 69
    ) {

        scoreMessageElement.classList.add(
            'score-mid'
        );


        scoreMessageElement.textContent =
            'உங்கள் வாழ்க்கையின் பல பகுதிகளில் நல்ல அடித்தளம் உள்ளது. அடுத்த கட்ட வளர்ச்சிக்கான வாய்ப்புகளை இப்போது தெளிவாக பார்க்கலாம்.';

        return;

    }


    scoreMessageElement.classList.add(
        'score-high'
    );


    scoreMessageElement.textContent =
        'உங்கள் வாழ்க்கையில் பல வலுவான பகுதிகள் உள்ளன. அவற்றை மேலும் ஆழப்படுத்தி சமநிலையுடன் வளர்த்துக் கொள்ளுங்கள்.';

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


    if (!visitorId) {

        setStatus(
            'VisitorID கிடைக்கவில்லை. உங்கள் Index பக்கத்திலிருந்து பயணத்தைத் தொடங்கவும்.',
            'error'
        );

        return;

    }


    const selvam =
        SELVAMS.find(
            function(item) {

                return item.id ===
                    questionId;

            }
        );


    if (!selvam) {
        return;
    }


    const payload = {

        action:
            'save_answer',

        data: {

            visitorId,

            pageNumber:
                CONFIG.PAGE_NUMBER,

            questionId,

            question:
                `${selvam.ta} — ${selvam.en}`,

            answer:
                score,

            score:
                score

        }

    };


    setStatus(
        'மதிப்பீடு பாதுகாக்கப்படுகிறது... Saving your assessment...',
        'loading'
    );


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


        let result;


        try {

            result =
                JSON.parse(
                    text
                );

        }
        catch (error) {

            throw new Error(
                'The server returned an invalid response.'
            );

        }


        if (
            result &&
            result.success === false
        ) {

            throw new Error(
                result.message ||
                'Unable to save this assessment.'
            );

        }


        setStatus(
            '✓ மதிப்பீடு பாதுகாக்கப்பட்டது / Assessment saved',
            'success'
        );

    }
    catch (error) {

        console.error(
            'CTM PATH™ Page 01 save error:',
            error
        );


        setStatus(
            'மதிப்பீட்டை சேமிக்க முடியவில்லை. Please try again.',
            'error'
        );

    }

}


/* ============================================================
   CONTINUE TO PAGE 02
   ============================================================ */

function attachContinueHandler() {

    const button =
        document.getElementById(
            'continueButton'
        );


    if (button) {

        button.addEventListener(
            'click',
            handleContinue
        );

    }

}


if (
    document.readyState ===
    'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        attachContinueHandler
    );

}
else {

    attachContinueHandler();

}


async function handleContinue() {

    const scores =
        calculateScores();


    if (
        scores.answeredCount !==
        CONFIG.TOTAL_QUESTIONS
    ) {

        setStatus(
            'முதலில் 16 மதிப்பீடுகளையும் முடிக்கவும்.',
            'error'
        );

        return;

    }


    const visitorId =
        getVisitorId();


    if (!visitorId) {

        setStatus(
            'VisitorID கிடைக்கவில்லை. Index பக்கத்திலிருந்து பயணத்தைத் தொடங்கவும்.',
            'error'
        );

        return;

    }


    continueButton.disabled =
        true;


    setStatus(
        'உங்கள் மதிப்பெண் பாதுகாக்கப்படுகிறது...',
        'loading'
    );


    saveLocalAnswers();


    const page01Summary = {

        visitorId,

        pageNumber:
            CONFIG.PAGE_NUMBER,

        rawTotal:
            scores.rawTotal,

        average:
            Number(
                scores.average.toFixed(1)
            ),

        normalizedScore:
            scores.normalized,

        completed:
            true,

        completedAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        'ctmPage01Summary',
        JSON.stringify(
            page01Summary
        )
    );


    /*
     * --------------------------------------------------------
     * NAVIGATION
     * --------------------------------------------------------
     *
     * Page 01 → Page 02
     *
     * Clean URL:
     * https://ctmmtpt.pages.dev/02
     *
     * No /html/
     * No page02.html
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
   LOCAL STORAGE
   ============================================================ */

function saveLocalAnswers() {

    localStorage.setItem(
        'ctmPage01Answers',
        JSON.stringify(
            answers
        )
    );

}


function restoreLocalAnswers() {

    const stored =
        localStorage.getItem(
            'ctmPage01Answers'
        );


    if (!stored) {
        return;
    }


    try {

        const saved =
            JSON.parse(
                stored
            );


        Object.keys(saved)
            .forEach(
                function(questionId) {

                    const score =
                        Number(
                            saved[
                                questionId
                            ]
                        );


                    const knownQuestion =
                        SELVAMS.some(
                            function(selvam) {

                                return (
                                    selvam.id ===
                                    questionId
                                );

                            }
                        );


                    if (
                        knownQuestion &&
                        Number.isFinite(score) &&
                        score >= 1 &&
                        score <= 10
                    ) {

                        answers[
                            questionId
                        ] = score;

                    }

                }
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

    return (
        localStorage.getItem(
            'ctmVisitorId'
        ) ||
        ''
    ).trim();

}


/* ============================================================
   STATUS
   ============================================================ */

function setStatus(
    message,
    type
) {

    if (!pageStatus) {
        return;
    }


    pageStatus.textContent =
        message;


    pageStatus.className =
        'page-status ' +
        (
            type ||
            ''
        );

}
