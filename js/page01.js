
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   GUIDED JOURNEY™

   FILE:
   js/page01.js

   PAGE:
   01 / 16

   PURPOSE:
   16 Selvam assessment

   SCORING:
   Individual score = 1–10
   Raw total        = /160
   Normalized score = /100
   Average          = /10

   COLOUR SCALE:
   1–3  = RED
   4–7  = ORANGE
   8–10 = GREEN
   ============================================================ */


/* ============================================================
   CONFIGURATION
   ============================================================ */

const CONFIG = {

    BACKEND_URL:
        'https://script.google.com/macros/s/AKfycbx9eJru7EJYUpReeLv4Sym9wDVLgE_ruSw_ZUJ4ycDoneUKlkI_fcsJ2UJmKM7W_PXtEg/exec',

    PAGE_NUMBER:
        1,

    NEXT_PAGE:
        'page02.html',

    TOTAL_QUESTIONS:
        16

};


/* ============================================================
   SELVAM DATA
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
    document.getElementById(
        'selvamGrid'
    );

const normalizedScoreElement =
    document.getElementById(
        'normalizedScore'
    );

const rawTotalElement =
    document.getElementById(
        'rawTotal'
    );

const averageScoreElement =
    document.getElementById(
        'averageScore'
    );

const scoreMessageElement =
    document.getElementById(
        'scoreMessage'
    );

const continueButton =
    document.getElementById(
        'continueButton'
    );

const pageStatus =
    document.getElementById(
        'pageStatus'
    );


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

}


/* ============================================================
   RENDER SELVAMS
   ============================================================ */

function renderSelvams() {

    if (!selvamGrid) {
        return;
    }

    selvamGrid.innerHTML = '';

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


            const buttons =
                createScoreButtons(
                    selvam.id
                );


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
                    ${buttons}
                </div>


                <div
                    class="selected-score"
                    id="selected-${selvam.id}"
                >
                    உங்கள் மதிப்பீடு: —
                </div>

            `;


            selvamGrid.appendChild(
                card
            );

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

        html += `

            <button
                type="button"
                class="score-button"
                data-question-id="${questionId}"
                data-score="${score}"
                aria-label="${questionId} score ${score}"
            >
                ${score}
            </button>

        `;

    }

    return html;
}


/* ============================================================
   SCORE HANDLERS
   ============================================================ */

function attachScoreHandlers() {

    const buttons =
        document.querySelectorAll(
            '.score-button'
        );


    buttons.forEach(
        function(button) {

            button.addEventListener(
                'click',
                handleScoreSelection
            );

        }
    );

}


/* ============================================================
   SELECT SCORE
   ============================================================ */

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
        !score
    ) {

        return;

    }


    answers[questionId] =
        score;


    /* --------------------------------------------------------
       UI
       -------------------------------------------------------- */

    updateSelectedButton(
        questionId,
        score
    );


    updateScore();


    saveLocalAnswers();


    /* --------------------------------------------------------
       BACKEND
       -------------------------------------------------------- */

    await saveAnswerToBackend(
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


            button.classList.toggle(
                'selected',
                buttonScore === score
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

    const values =
        Object.values(
            answers
        );


    const rawTotal =
        values.reduce(
            function(total, score) {

                return total +
                    Number(score);

            },
            0
        );


    const answeredCount =
        values.length;


    const average =
        answeredCount > 0
            ? rawTotal /
              answeredCount
            : 0;


    /*
     * Normalized score:
     *
     * 160 raw marks = 100
     *
     * Therefore:
     *
     * rawTotal / 160 × 100
     */

    const normalized =
        rawTotal > 0
            ? Math.round(
                (
                    rawTotal /
                    160
                ) * 100
            )
            : 0;


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


    rawTotalElement.textContent =
        scores.rawTotal;


    averageScoreElement.textContent =
        scores.average.toFixed(1);


    normalizedScoreElement.textContent =
        scores.normalized;


    updateScoreMessage(
        scores
    );


    continueButton.disabled =
        scores.answeredCount !==
        CONFIG.TOTAL_QUESTIONS;

}


/* ============================================================
   SCORE MESSAGE
   ============================================================ */

function updateScoreMessage(
    scores
) {

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
   SAVE ANSWER TO BACKEND
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
        catch (
            parseError
        ) {

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
    catch (
        error
    ) {

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
   CONTINUE
   ============================================================ */

continueButton.addEventListener(
    'click',
    handleContinue
);


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
        'உங்கள் மதிப்பெண் பாதுகாக்கப்படுகிறது... Saving your final Page 01 score...',
        'loading'
    );


    saveLocalAnswers();


    /*
     * The individual answers have already been sent
     * to the backend.
     *
     * Store the Page 01 summary locally as well,
     * so Page 02 and subsequent pages can access it.
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
     * Give the final backend answer writes
     * a short moment to settle before navigation.
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


        if (
            !saved ||
            typeof saved !==
            'object'
        ) {

            return;

        }


        Object.keys(
            saved
        ).forEach(
            function(questionId) {

                const score =
                    Number(
                        saved[
                            questionId
                        ]
                    );


                if (
                    score >= 1 &&
                    score <= 10
                ) {

                    answers[
                        questionId
                    ] =
                        score;

                    updateSelectedButton(
                        questionId,
                        score
                    );

                }

            }
        );

    }
    catch (
        error
    ) {

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

    pageStatus.textContent =
        message;

    pageStatus.className =
        'page-status ' +
        (
            type ||
            ''
        );

}


/* ============================================================
   END
   ============================================================ */
