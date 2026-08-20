
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 02 — JAVASCRIPT
   ============================================================ */


/* ============================================================
   CONFIGURATION
   ============================================================ */

const CONFIG = {

    PAGE_NUMBER:
        2,

    TOTAL_PAGES:
        16,

    PREVIOUS_PAGE:
        '/01',

    NEXT_PAGE:
        '/03',

    STORAGE_KEY:
        'ctm_path_page02',

    TOTAL_NEEDS:
        12

};


/* ============================================================
   12 BASIC LIFE NEEDS
   ============================================================ */

const NEEDS = [

    {
        id: 'N01',
        number: '01',
        ta: 'வீடு',
        en: 'HOME',

        questionTa:
            'உங்கள் குடும்பத்தின் தேவைகளுக்கும் கனவுகளுக்கும் ஏற்ற ஒரு நல்ல வீடு உங்களிடம் உள்ளதா?',

        questionEn:
            'Do you have the home you truly want for yourself and your family?',

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M8 30L32 10l24 20"></path>
                <path d="M14 27v27h36V27"></path>
                <path d="M25 54V38h14v16"></path>
                <path d="M20 31h4"></path>
                <path d="M40 31h4"></path>
            </svg>
        `
    },

    {
        id: 'N02',
        number: '02',
        ta: 'கார்',
        en: 'CAR',

        questionTa:
            'உங்கள் குடும்பத்தின் தேவைக்கும் உங்கள் வாழ்க்கை முறைக்கும் ஏற்ற கார் உங்களிடம் உள்ளதா?',

        questionEn:
            "Do you have the car that suits your family's needs and lifestyle?",

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M12 39l5-15h30l5 15"></path>
                <path d="M8 39h48v10H8z"></path>
                <circle cx="18" cy="49" r="4"></circle>
                <circle cx="46" cy="49" r="4"></circle>
                <path d="M19 24l4-8h18l4 8"></path>
                <path d="M15 39h8"></path>
                <path d="M41 39h8"></path>
            </svg>
        `
    },

    {
        id: 'N03',
        number: '03',
        ta: 'பைக்',
        en: 'BIKE',

        questionTa:
            'உங்கள் தனிப்பட்ட பயணம் மற்றும் அன்றாட தேவைகளுக்கு ஏற்ற இருசக்கர வாகனம் உங்களிடம் உள்ளதா?',

        questionEn:
            'Do you have the two-wheeler you need for your daily life?',

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="16" cy="45" r="10"></circle>
                <circle cx="48" cy="45" r="10"></circle>
                <path d="M16 45l11-20h10l11 20"></path>
                <path d="M27 25l7 20"></path>
                <path d="M35 25h8l5 8"></path>
                <path d="M25 25h-6"></path>
            </svg>
        `
    },

    {
        id: 'N04',
        number: '04',
        ta: 'குழந்தைகளின் கல்வி',
        en: "CHILDREN'S EDUCATION",

        questionTa:
            'உங்கள் குழந்தைகளின் கல்வி மற்றும் எதிர்காலத்திற்கான தேவைகளை நீங்கள் நம்பிக்கையுடன் நிறைவேற்றி வருகிறீர்களா?',

        questionEn:
            'Are you confident that you can provide the education and future opportunities your children deserve?',

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M8 18l24-9 24 9-24 9z"></path>
                <path d="M16 25v17c8 6 24 6 32 0V25"></path>
                <path d="M56 20v18"></path>
                <circle cx="56" cy="42" r="3"></circle>
                <path d="M22 35c5 3 15 3 20 0"></path>
            </svg>
        `
    },

    {
        id: 'N05',
        number: '05',
        ta: 'நகை',
        en: 'JEWELLERY',

        questionTa:
            'உங்கள் குடும்பத்தின் முக்கியமான நகை மற்றும் மதிப்புமிக்க பொருட்கள் தொடர்பான தேவைகள் நிறைவேறியுள்ளனவா?',

        questionEn:
            "Have your family's important jewellery and valuables needs been fulfilled?",

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M16 13h32l8 12-24 29L8 25z"></path>
                <path d="M16 13l16 41"></path>
                <path d="M48 13L32 54"></path>
                <path d="M8 25h48"></path>
                <path d="M22 25l10-12 10 12"></path>
            </svg>
        `
    },

    {
        id: 'N06',
        number: '06',
        ta: 'கடனில்லா வாழ்க்கை',
        en: 'DEBT-FREE LIFE',

        questionTa:
            'உங்கள் தற்போதைய வாழ்க்கை தேவையற்ற கடன் சுமையிலிருந்து விடுபட்டுள்ளதா?',

        questionEn:
            'Are you living with the level of financial freedom you want, without burdensome debt?',

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <rect x="8" y="17" width="48" height="34" rx="4"></rect>
                <path d="M8 27h48"></path>
                <path d="M17 39h12"></path>
                <path d="M42 36l4 4 7-8"></path>
            </svg>
        `
    },

    {
        id: 'N07',
        number: '07',
        ta: 'சேமிப்பு',
        en: 'SAVINGS',

        questionTa:
            'எதிர்பாராத சூழ்நிலைகளுக்கும் எதிர்கால இலக்குகளுக்கும் போதுமான சேமிப்பு உங்களிடம் உள்ளதா?',

        questionEn:
            'Do you have sufficient savings for emergencies and future goals?',

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M13 22h38v31H13z"></path>
                <path d="M13 22l7-9h24l7 9"></path>
                <path d="M22 31h20"></path>
                <path d="M22 39h14"></path>
                <circle cx="45" cy="43" r="5"></circle>
            </svg>
        `
    },

    {
        id: 'N08',
        number: '08',
        ta: 'பெற்றோரை கவனித்தல்',
        en: 'CARING FOR PARENTS',

        questionTa:
            'உங்கள் பெற்றோருக்கு அவர்கள் தகுதியான பாதுகாப்பு, ஆதரவு மற்றும் கவனிப்பை வழங்க முடிகிறதா?',

        questionEn:
            'Are you able to provide your parents with the care, support and security they deserve?',

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="22" cy="21" r="7"></circle>
                <circle cx="43" cy="21" r="7"></circle>
                <path d="M10 48c1-10 7-15 12-15s11 5 12 15"></path>
                <path d="M30 48c1-10 7-15 13-15 5 0 10 5 11 15"></path>
                <path d="M27 40c3-4 7-4 10 0"></path>
            </svg>
        `
    },

    {
        id: 'N09',
        number: '09',
        ta: 'சுற்றுலா',
        en: 'TRAVEL',

        questionTa:
            'உங்களுக்கும் உங்கள் குடும்பத்திற்கும் விருப்பமான இடங்களுக்குச் சென்று அனுபவித்து மகிழும் சுதந்திரம் உங்களிடம் உள்ளதா?',

        questionEn:
            'Do you have the freedom to travel and create experiences with your family?',

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="32" cy="32" r="23"></circle>
                <path d="M9 32h46"></path>
                <path d="M32 9c7 7 10 15 10 23s-3 16-10 23"></path>
                <path d="M32 9c-7 7-10 15-10 23s3 16 10 23"></path>
                <path d="M14 20h36"></path>
                <path d="M14 44h36"></path>
            </svg>
        `
    },

    {
        id: 'N10',
        number: '10',
        ta: 'மருத்துவம்',
        en: 'HEALTHCARE',

        questionTa:
            'உங்களுக்கும் உங்கள் குடும்பத்திற்கும் தேவையான தரமான மருத்துவப் பாதுகாப்பை நீங்கள் எளிதாகப் பெற முடிகிறதா?',

        questionEn:
            'Can you access the quality healthcare your family needs without financial stress?',

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M32 53S10 39 10 23c0-8 5-13 12-13 5 0 8 3 10 7 2-4 5-7 10-7 7 0 12 5 12 13 0 16-22 30-22 30z"></path>
                <path d="M24 29h16"></path>
                <path d="M32 21v16"></path>
            </svg>
        `
    },

    {
        id: 'N11',
        number: '11',
        ta: 'சமூக சேவை',
        en: 'SOCIAL SERVICE',

        questionTa:
            'மற்றவர்களின் வாழ்க்கையில் மாற்றத்தை ஏற்படுத்தவும், சமூகத்திற்கு பங்களிக்கவும் உங்களிடம் வளமும் நேரமும் உள்ளதா?',

        questionEn:
            'Do you have the time and resources to contribute meaningfully to society?',

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <circle cx="22" cy="22" r="7"></circle>
                <circle cx="42" cy="22" r="7"></circle>
                <circle cx="32" cy="42" r="7"></circle>
                <path d="M27 26l5 9 5-9"></path>
                <path d="M17 29l15 13 15-13"></path>
            </svg>
        `
    },

    {
        id: 'N12',
        number: '12',
        ta: 'பொழுதுபோக்கு',
        en: 'RECREATION',

        questionTa:
            'வேலை மற்றும் பொறுப்புகளுக்கு அப்பால், உங்களுக்காகவும் குடும்பத்திற்காகவும் மகிழ்ச்சியான நேரத்தை செலவிடுகிறீர்களா?',

        questionEn:
            'Do you have enough time and freedom for recreation, joy and meaningful experiences?',

        icon: `
            <svg viewBox="0 0 64 64" aria-hidden="true">
                <path d="M18 27h28l5 20H13z"></path>
                <path d="M23 27l3-10h12l3 10"></path>
                <circle cx="25" cy="38" r="3"></circle>
                <circle cx="39" cy="38" r="3"></circle>
                <path d="M27 45c3 2 7 2 10 0"></path>
            </svg>
        `
    }

];


/* ============================================================
   STATUS DEFINITIONS
   ============================================================ */

const STATUS = {

    fulfilled: {

        className:
            'status-fulfilled',

        cardClass:
            'card-fulfilled',

        icon:
            '✓',

        ta:
            'முழுமையாக',

        en:
            'Fully Fulfilled'

    },

    partial: {

        className:
            'status-partial',

        cardClass:
            'card-partial',

        icon:
            '◐',

        ta:
            'ஓரளவு',

        en:
            'Partially Fulfilled'

    },

    pending: {

        className:
            'status-pending',

        cardClass:
            'card-pending',

        icon:
            '○',

        ta:
            'இன்னும் இல்லை',

        en:
            'Not Yet Fulfilled'

    }

};


/* ============================================================
   STATE
   ============================================================ */

let state = {

    responses: {},

    priority:
        ''

};


/* ============================================================
   DOM
   ============================================================ */

const needsGrid =
    document.getElementById('needsGrid');

const fullyCount =
    document.getElementById('fullyCount');

const partialCount =
    document.getElementById('partialCount');

const pendingCount =
    document.getElementById('pendingCount');

const completionPercent =
    document.getElementById('completionPercent');

const completionBar =
    document.getElementById('completionBar');

const completionMessage =
    document.getElementById('completionMessage');

const priorityNeed =
    document.getElementById('priorityNeed');

const priorityFeedback =
    document.getElementById('priorityFeedback');

const previousButton =
    document.getElementById('previousButton');

const nextButton =
    document.getElementById('nextButton');


/* ============================================================
   INIT
   ============================================================ */

document.addEventListener(
    'DOMContentLoaded',
    initializePage
);


function initializePage() {

    loadState();

    renderNeedCards();

    renderPriorityOptions();

    restoreSelections();

    updateSnapshot();

    bindNavigation();

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
            parsed &&
            typeof parsed === 'object'
        ) {

            state.responses =
                parsed.responses || {};

            state.priority =
                parsed.priority || '';

        }

    }
    catch (error) {

        console.warn(
            'CTM PATH™ Page 02: Could not restore saved state.',
            error
        );

    }

}


/* ============================================================
   SAVE STATE
   ============================================================ */

function saveState() {

    try {

        localStorage.setItem(
            CONFIG.STORAGE_KEY,
            JSON.stringify(state)
        );

    }
    catch (error) {

        console.warn(
            'CTM PATH™ Page 02: Could not save state.',
            error
        );

    }

}


/* ============================================================
   RENDER CARDS
   ============================================================ */

function renderNeedCards() {

    if (!needsGrid) {
        return;
    }

    needsGrid.innerHTML =
        NEEDS
            .map(
                createNeedCard
            )
            .join('');

}


/* ============================================================
   CREATE CARD
   ============================================================ */

function createNeedCard(need) {

    return `

        <article
            class="need-card"
            data-need-id="${need.id}"
        >

            <div class="need-top">

                <div class="need-number">
                    ${need.number}
                </div>

                <div class="need-icon-panel">
                    ${need.icon}
                </div>

            </div>


            <h3 class="need-title">
                ${need.ta}
            </h3>


            <div class="need-title-en">
                ${need.en}
            </div>


            <p class="need-question-ta">
                ${need.questionTa}
            </p>


            <p class="need-question-en">
                ${need.questionEn}
            </p>


            <div
                class="status-options"
                role="group"
                aria-label="${need.en} fulfilment status"
            >

                ${createStatusButton(
                    need,
                    'fulfilled'
                )}

                ${createStatusButton(
                    need,
                    'partial'
                )}

                ${createStatusButton(
                    need,
                    'pending'
                )}

            </div>


            <div class="need-current-status">

                நிலை:

                <strong
                    class="current-status-text"
                >
                    பதிலைத் தேர்வு செய்யுங்கள்
                </strong>

            </div>

        </article>

    `;

}


/* ============================================================
   CREATE STATUS BUTTON
   ============================================================ */

function createStatusButton(
    need,
    status
) {

    const item =
        STATUS[status];

    return `

        <button
            type="button"
            class="status-button ${item.className}"
            data-need-id="${need.id}"
            data-status="${status}"
            aria-label="${item.en}"
            aria-pressed="false"
        >

            <span class="status-icon">
                ${item.icon}
            </span>

            <span class="status-label-ta">
                ${item.ta}
            </span>

            <span class="status-label-en">
                ${item.en}
            </span>

        </button>

    `;

}


/* ============================================================
   EVENT DELEGATION
   ============================================================ */

if (needsGrid) {

    needsGrid.addEventListener(
        'click',
        handleStatusSelection
    );

}


function handleStatusSelection(event) {

    const button =
        event.target.closest(
            '.status-button'
        );

    if (!button) {
        return;
    }

    const needId =
        button.dataset.needId;

    const selectedStatus =
        button.dataset.status;

    if (
        !needId ||
        !STATUS[selectedStatus]
    ) {
        return;
    }

    state.responses[needId] =
        selectedStatus;

    saveState();

    updateCard(
        needId,
        selectedStatus
    );

    updateSnapshot();

}


/* ============================================================
   UPDATE CARD
   ============================================================ */

function updateCard(
    needId,
    selectedStatus
) {

    const card =
        document.querySelector(
            `.need-card[data-need-id="${needId}"]`
        );

    if (!card) {
        return;
    }


    const buttons =
        card.querySelectorAll(
            '.status-button'
        );


    buttons.forEach(
        button => {

            const status =
                button.dataset.status;

            const selected =
                status === selectedStatus;

            button.classList.toggle(
                'selected',
                selected
            );

            button.setAttribute(
                'aria-pressed',
                selected
                    ? 'true'
                    : 'false'
            );

        }
    );


    card.classList.remove(
        'selected-fulfilled',
        'selected-partial',
        'selected-pending'
    );


    card.classList.add(
        `selected-${selectedStatus}`
    );


    const statusText =
        card.querySelector(
            '.current-status-text'
        );


    if (statusText) {

        statusText.textContent =
            STATUS[selectedStatus].ta;

        statusText.style.color =
            getStatusColour(
                selectedStatus
            );

    }

}


/* ============================================================
   STATUS COLOUR
   ============================================================ */

function getStatusColour(status) {

    if (status === 'fulfilled') {
        return '#31D47A';
    }

    if (status === 'partial') {
        return '#F3A23C';
    }

    if (status === 'pending') {
        return '#F05A5A';
    }

    return '';

}


/* ============================================================
   RESTORE SELECTIONS
   ============================================================ */

function restoreSelections() {

    NEEDS.forEach(
        need => {

            const selected =
                state.responses[need.id];

            if (selected) {

                updateCard(
                    need.id,
                    selected
                );

            }

        }
    );

}


/* ============================================================
   SNAPSHOT
   ============================================================ */

function updateSnapshot() {

    const values =
        Object.values(
            state.responses
        );


    const fully =
        values.filter(
            value =>
                value === 'fulfilled'
        ).length;


    const partial =
        values.filter(
            value =>
                value === 'partial'
        ).length;


    const pending =
        values.filter(
            value =>
                value === 'pending'
        ).length;


    const answered =
        fully +
        partial +
        pending;


    const percentage =
        Math.round(
            (
                answered /
                CONFIG.TOTAL_NEEDS
            ) * 100
        );


    if (fullyCount) {
        fullyCount.textContent =
            fully;
    }


    if (partialCount) {
        partialCount.textContent =
            partial;
    }


    if (pendingCount) {
        pendingCount.textContent =
            pending;
    }


    if (completionPercent) {

        completionPercent.textContent =
            `${percentage}%`;

    }


    if (completionBar) {

        completionBar.style.width =
            `${percentage}%`;

    }


    updateCompletionMessage(
        answered,
        percentage
    );

}


/* ============================================================
   COMPLETION MESSAGE
   ============================================================ */

function updateCompletionMessage(
    answered,
    percentage
) {

    if (!completionMessage) {
        return;
    }


    if (answered === 0) {

        completionMessage.textContent =
            'உங்கள் 12 தேவைகளுக்கும் பதிலளிக்கவும்.';

        return;

    }


    if (answered < CONFIG.TOTAL_NEEDS) {

        completionMessage.textContent =
            `${answered} / 12 தேவைகளுக்கு நீங்கள் பதிலளித்துள்ளீர்கள். மீதமுள்ளவற்றையும் தொடருங்கள்.`;

        return;

    }


    completionMessage.textContent =
        'அருமை! உங்கள் 12 அடிப்படை தேவைகளின் நிலவரம் முழுமையாகப் பதிவாகியுள்ளது.';

}


/* ============================================================
   PRIORITY OPTIONS
   ============================================================ */

function renderPriorityOptions() {

    if (!priorityNeed) {
        return;
    }


    priorityNeed.innerHTML = `

        <option value="">
            உங்கள் மிக முக்கியமான தேவையைத் தேர்வு செய்யுங்கள்
        </option>

        ${
            NEEDS
                .map(
                    need => `

                        <option value="${need.id}">
                            ${need.number} — ${need.ta}
                        </option>

                    `
                )
                .join('')
        }

    `;


    priorityNeed.value =
        state.priority || '';

}


/* ============================================================
   PRIORITY CHANGE
   ============================================================ */

if (priorityNeed) {

    priorityNeed.addEventListener(
        'change',
        handlePriorityChange
    );

}


function handlePriorityChange(event) {

    state.priority =
        event.target.value;

    saveState();


    const need =
        NEEDS.find(
            item =>
                item.id === state.priority
        );


    if (
        priorityFeedback &&
        need
    ) {

        priorityFeedback.textContent =
            `${need.ta} — ${need.en} உங்கள் தற்போதைய முக்கிய முன்னுரிமையாக பதிவு செய்யப்பட்டுள்ளது.`;

    }
    else if (priorityFeedback) {

        priorityFeedback.textContent =
            '';

    }

}


/* ============================================================
   VALIDATION
   ============================================================ */

function validatePage() {

    const answered =
        Object.keys(
            state.responses
        ).length;


    if (
        answered <
        CONFIG.TOTAL_NEEDS
    ) {

        const firstUnanswered =
            NEEDS.find(
                need =>
                    !state.responses[need.id]
            );


        if (firstUnanswered) {

            const card =
                document.querySelector(
                    `.need-card[data-need-id="${firstUnanswered.id}"]`
                );


            if (card) {

                card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                card.style.outline =
                    '2px solid rgba(245,197,66,.65)';

                setTimeout(
                    () => {

                        card.style.outline =
                            '';

                    },
                    1800
                );

            }

        }


        updateCompletionMessage(
            answered,
            Math.round(
                (
                    answered /
                    CONFIG.TOTAL_NEEDS
                ) * 100
            )
        );


        return false;

    }


    return true;

}


/* ============================================================
   NAVIGATION
   ============================================================ */

function bindNavigation() {

    if (previousButton) {

        previousButton.addEventListener(
            'click',
            goPrevious
        );

    }


    if (nextButton) {

        nextButton.addEventListener(
            'click',
            goNext
        );

    }

}


function goPrevious() {

    saveState();

    window.location.href =
        CONFIG.PREVIOUS_PAGE;

}


function goNext() {

    if (!validatePage()) {
        return;
    }


    saveState();

    window.location.href =
        CONFIG.NEXT_PAGE;

}


/* ============================================================
   KEYBOARD SUPPORT
   ============================================================ */

document.addEventListener(
    'keydown',
    event => {

        if (
            event.key === 'Escape'
        ) {

            return;

        }

        if (
            event.ctrlKey &&
            event.key === 'Enter'
        ) {

            goNext();

        }

    }
);


/* ============================================================
   BEFORE LEAVING
   ============================================================ */

window.addEventListener(
    'beforeunload',
    saveState
);


/* ============================================================
   DEBUG HELPER
   ============================================================ */

window.CTMPage02 = {

    getState() {

        return {
            ...state,
            responses: {
                ...state.responses
            }
        };

    },

    getAnsweredCount() {

        return Object.keys(
            state.responses
        ).length;

    },

    reset() {

        state = {

            responses: {},

            priority: ''

        };


        localStorage.removeItem(
            CONFIG.STORAGE_KEY
        );


        location.reload();

    }

};


/* ============================================================
   END PAGE 02 JAVASCRIPT
   ============================================================ */
