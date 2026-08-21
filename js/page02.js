/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 02 — JAVASCRIPT
   COMPLETE REPLACEMENT
   ============================================================

   PAGE 02 PURPOSE
   ------------------------------------------------------------
   Captures:

   1. Status of each of the 12 Basic Life Needs
      - FULLY FULFILLED
      - PARTIALLY FULFILLED
      - NOT YET FULFILLED

   2. One highest-priority life need.

   Navigation:
      /01 ← Previous
      /02 ← Current
      /03 → Next

   ============================================================ */


/* ============================================================
   01. CONFIGURATION
   ============================================================ */

const PAGE02_CONFIG = {

    PAGE_NUMBER: 2,

    TOTAL_NEEDS: 12,

    PREVIOUS_PAGE: '/01',

    NEXT_PAGE: '/03',

    STORAGE_KEY: 'ctmPage02Answers',

    SUMMARY_STORAGE_KEY: 'ctmPage02Summary',

    PRIORITY_STORAGE_KEY: 'ctmPage02Priority',

    BACKEND_URL:
        'https://script.google.com/macros/s/AKfycbx9eJru7EJYUpReeLv4Sym9wDVLgE_ruSw_ZUJ4ycDoneUKlkI_fcsJ2UJmKM7W_PXtEg/exec',

    ACTION_SAVE_ANSWER:
        'save_answer',

    ACTION_SAVE_PROGRESS:
        'save_progress'
};


/* ============================================================
   02. THE 12 BASIC LIFE NEEDS
   ============================================================ */

const PAGE02_NEEDS = [

    {
        id: 'NEED01',
        number: '01',
        ta: 'வீடு',
        en: 'HOME',
        questionTa:
            'உங்கள் குடும்பத்தின் தேவைகளுக்கும் கனவுகளுக்கும் ஏற்ற ஒரு நல்ல வீடு உங்களிடம் உள்ளதா?',
        questionEn:
            'Do you have the home you truly want for yourself and your family?'
    },

    {
        id: 'NEED02',
        number: '02',
        ta: 'கார்',
        en: 'CAR',
        questionTa:
            'உங்கள் குடும்பத்தின் தேவைக்கும் உங்கள் வாழ்க்கை முறைக்கும் ஏற்ற கார் உங்களிடம் உள்ளதா?',
        questionEn:
            "Do you have the car that suits your family's needs and lifestyle?"
    },

    {
        id: 'NEED03',
        number: '03',
        ta: 'பைக்',
        en: 'BIKE',
        questionTa:
            'உங்கள் தனிப்பட்ட பயணம் மற்றும் அன்றாட தேவைகளுக்கு ஏற்ற இருசக்கர வாகனம் உங்களிடம் உள்ளதா?',
        questionEn:
            'Do you have the two-wheeler you need for your daily life?'
    },

    {
        id: 'NEED04',
        number: '04',
        ta: 'குழந்தைகளின் கல்வி',
        en: "CHILDREN'S EDUCATION",
        questionTa:
            'உங்கள் குழந்தைகளின் கல்வி மற்றும் எதிர்காலத்திற்கான தேவைகளை நீங்கள் நம்பிக்கையுடன் நிறைவேற்றி வருகிறீர்களா?',
        questionEn:
            'Are you confident that you can provide the education and future opportunities your children deserve?'
    },

    {
        id: 'NEED05',
        number: '05',
        ta: 'நகை',
        en: 'JEWELLERY',
        questionTa:
            'உங்கள் குடும்பத்தின் முக்கியமான நகை மற்றும் மதிப்புமிக்க பொருட்கள் தொடர்பான தேவைகள் நிறைவேறியுள்ளனவா?',
        questionEn:
            "Have your family's important jewellery and valuables needs been fulfilled?"
    },

    {
        id: 'NEED06',
        number: '06',
        ta: 'கடனில்லா வாழ்க்கை',
        en: 'DEBT-FREE LIFE',
        questionTa:
            'உங்கள் தற்போதைய வாழ்க்கை தேவையற்ற கடன் சுமையிலிருந்து விடுபட்டுள்ளதா?',
        questionEn:
            'Are you living with the level of financial freedom you want, without burdensome debt?'
    },

    {
        id: 'NEED07',
        number: '07',
        ta: 'சேமிப்பு',
        en: 'SAVINGS',
        questionTa:
            'எதிர்பாராத சூழ்நிலைகளுக்கும் எதிர்கால இலக்குகளுக்கும் போதுமான சேமிப்பு உங்களிடம் உள்ளதா?',
        questionEn:
            'Do you have sufficient savings for emergencies and future goals?'
    },

    {
        id: 'NEED08',
        number: '08',
        ta: 'பெற்றோரை கவனித்தல்',
        en: 'CARING FOR PARENTS',
        questionTa:
            'உங்கள் பெற்றோருக்கு அவர்கள் தகுதியான பாதுகாப்பு, ஆதரவு மற்றும் கவனிப்பை வழங்க முடிகிறதா?',
        questionEn:
            'Are you able to provide your parents with the care, support and security they deserve?'
    },

    {
        id: 'NEED09',
        number: '09',
        ta: 'சுற்றுலா',
        en: 'TRAVEL',
        questionTa:
            'உங்களுக்கும் உங்கள் குடும்பத்திற்கும் விருப்பமான இடங்களுக்குச் சென்று அனுபவித்து மகிழும் சுதந்திரம் உங்களிடம் உள்ளதா?',
        questionEn:
            'Do you have the freedom to travel and create experiences with your family?'
    },

    {
        id: 'NEED10',
        number: '10',
        ta: 'மருத்துவம்',
        en: 'HEALTHCARE',
        questionTa:
            'உங்களுக்கும் உங்கள் குடும்பத்திற்கும் தேவையான தரமான மருத்துவப் பாதுகாப்பை நீங்கள் எளிதாகப் பெற முடிகிறதா?',
        questionEn:
            'Can you access the quality healthcare your family needs without financial stress?'
    },

    {
        id: 'NEED11',
        number: '11',
        ta: 'சமூக சேவை',
        en: 'SOCIAL SERVICE',
        questionTa:
            'மற்றவர்களின் வாழ்க்கையில் மாற்றத்தை ஏற்படுத்தவும், சமூகத்திற்கு பங்களிக்கவும் உங்களிடம் வளமும் நேரமும் உள்ளதா?',
        questionEn:
            'Do you have the time and resources to contribute meaningfully to society?'
    },

    {
        id: 'NEED12',
        number: '12',
        ta: 'பொழுதுபோக்கு',
        en: 'RECREATION',
        questionTa:
            'வேலை மற்றும் பொறுப்புகளுக்கு அப்பால், உங்களுக்காகவும் குடும்பத்திற்காகவும் மகிழ்ச்சியான நேரத்தை செலவிடுகிறீர்களா?',
        questionEn:
            'Do you have enough time and freedom for recreation, joy and meaningful experiences?'
    }

];


/* ============================================================
   03. STATUS DEFINITIONS
   ============================================================ */

const PAGE02_STATUS = {

    FULL: 'fully',

    PARTIAL: 'partial',

    NONE: 'none'

};


/* ============================================================
   04. RUNTIME STATE
   ============================================================ */

let page02Answers = {};

let page02Priority = '';

let page02Saving = false;

let page02DOM = {};


/* ============================================================
   05. INITIALISATION
   ============================================================ */

function initPage02() {

    cachePage02DOM();

    attachStatusHandlers();

    attachPriorityHandler();

    attachNavigationHandlers();

    restorePage02State();

    updatePage02UI();

    exposePage02DebugAPI();

    console.log(
        'CTM PATH™ Page 02 initialised.'
    );

}


/* ============================================================
   06. DOM CACHE
   ============================================================ */

function cachePage02DOM() {

    page02DOM = {

        form:
            document.getElementById(
                'assessmentForm'
            ) ||
            document.querySelector(
                'form'
            ),

        cards:
            Array.from(
                document.querySelectorAll(
                    '[data-need]'
                )
            ),

        statusButtons:
            Array.from(
                document.querySelectorAll(
                    '[data-status]'
                )
            ),

        prioritySelect:
            document.getElementById(
                'prioritySelect'
            ) ||
            document.getElementById(
                'priority'
            ) ||
            document.querySelector(
                '.priority-select'
            ) ||
            document.querySelector(
                'select[name="priority"]'
            ),

        fullCount:
            document.getElementById(
                'fullCount'
            ) ||
            document.getElementById(
                'fullyFulfilledCount'
            ) ||
            document.querySelector(
                '[data-count="full"]'
            ),

        partialCount:
            document.getElementById(
                'partialCount'
            ) ||
            document.getElementById(
                'partiallyFulfilledCount'
            ) ||
            document.querySelector(
                '[data-count="partial"]'
            ),

        noneCount:
            document.getElementById(
                'noneCount'
            ) ||
            document.getElementById(
                'notYetFulfilledCount'
            ) ||
            document.querySelector(
                '[data-count="none"]'
            ),

        completionBar:
            document.getElementById(
                'completionBar'
            ) ||
            document.querySelector(
                '.completion-bar'
            ),

        completionPercent:
            document.getElementById(
                'completionPercent'
            ) ||
            document.querySelector(
                '[data-completion-percent]'
            ),

        completionMessage:
            document.getElementById(
                'completion-message'
            ) ||
            document.getElementById(
                'completionMessage'
            ),

        priorityConfirmation:
            document.getElementById(
                'priorityConfirmation'
            ) ||
            document.querySelector(
                '.priority-confirmation'
            ),

        saveContinue:
            document.getElementById(
                'saveContinueButton'
            ) ||
            document.getElementById(
                'continueButton'
            ) ||
            document.querySelector(
                '[data-action="save-continue"]'
            ),

        pageStatus:
            document.getElementById(
                'pageStatus'
            ) ||
            document.querySelector(
                '.page-status'
            ),

        previousButton:
            document.getElementById(
                'previousButton'
            ) ||
            document.querySelector(
                '[data-navigation="previous"]'
            ) ||
            document.querySelector(
                '.nav-back'
            ),

        nextButton:
            document.getElementById(
                'nextButton'
            ) ||
            document.querySelector(
                '[data-navigation="next"]'
            ) ||
            document.querySelector(
                '.nav-forward'
            )

    };

}


/* ============================================================
   07. STATUS HANDLERS
   ============================================================ */

function attachStatusHandlers() {

    page02DOM.statusButtons.forEach(
        button => {

            button.addEventListener(
                'click',
                event => {

                    event.preventDefault();

                    handleStatusSelection(
                        button
                    );

                }
            );

        }
    );

}


/* ============================================================
   08. STATUS SELECTION
   ============================================================ */

function handleStatusSelection(button) {

    const card =
        button.closest(
            '[data-need]'
        );

    if (!card) return;

    const needId =
        normalizeNeedId(
            card.dataset.need
        );

    const status =
        normalizeStatus(
            button.dataset.status
        );

    if (
        !needId ||
        !status
    ) {
        return;
    }

    page02Answers[needId] =
        status;

    savePage02Answers();

    updateCardSelection(
        card,
        status
    );

    updatePage02UI();

    saveAnswerToBackend(
        needId,
        status
    );

}


/* ============================================================
   09. NORMALISE NEED ID
   ============================================================ */

function normalizeNeedId(value) {

    if (!value) return '';

    const raw =
        String(value)
            .trim()
            .toUpperCase();

    const match =
        raw.match(
            /(\d{1,2})$/
        );

    if (!match) {
        return raw;
    }

    const number =
        Number(
            match[1]
        );

    if (
        !Number.isFinite(number) ||
        number < 1 ||
        number > PAGE02_CONFIG.TOTAL_NEEDS
    ) {
        return raw;
    }

    return (
        'NEED' +
        String(number)
            .padStart(2, '0')
    );

}


/* ============================================================
   10. NORMALISE STATUS
   ============================================================ */

function normalizeStatus(value) {

    if (!value) return '';

    const status =
        String(value)
            .trim()
            .toLowerCase();

    if (
        [
            'full',
            'fully',
            'fulfilled',
            'fully-fulfilled',
            'fully_fulfilled'
        ].includes(status)
    ) {
        return PAGE02_STATUS.FULL;
    }

    if (
        [
            'partial',
            'partially',
            'partially-fulfilled',
            'partially_fulfilled'
        ].includes(status)
    ) {
        return PAGE02_STATUS.PARTIAL;
    }

    if (
        [
            'none',
            'notyet',
            'not-yet',
            'not-yet-fulfilled',
            'not_yet_fulfilled'
        ].includes(status)
    ) {
        return PAGE02_STATUS.NONE;
    }

    return '';

}


/* ============================================================
   11. CARD SELECTION
   ============================================================ */

function updateCardSelection(
    card,
    selectedStatus
) {

    if (!card) return;

    const buttons =
        Array.from(
            card.querySelectorAll(
                '[data-status]'
            )
        );

    buttons.forEach(
        button => {

            const status =
                normalizeStatus(
                    button.dataset.status
                );

            const selected =
                status ===
                selectedStatus;

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

    card.classList.toggle(
        'has-selection',
        Boolean(selectedStatus)
    );

    if (selectedStatus) {

        card.dataset.selectedStatus =
            selectedStatus;

    }
    else {

        delete card.dataset.selectedStatus;

    }

}


/* ============================================================
   12. PRIORITY HANDLER
   ============================================================ */

function attachPriorityHandler() {

    const select =
        page02DOM.prioritySelect;

    if (!select) return;

    select.addEventListener(
        'change',
        () => {

            handlePriorityChange(
                select.value
            );

        }
    );

}


/* ============================================================
   13. PRIORITY CHANGE
   ============================================================ */

function handlePriorityChange(value) {

    page02Priority =
        normalizeNeedId(
            value
        );

    if (
        !page02Priority ||
        !isValidNeedId(
            page02Priority
        )
    ) {

        page02Priority =
            String(
                value || ''
            ).trim();

    }

    localStorage.setItem(
        PAGE02_CONFIG.PRIORITY_STORAGE_KEY,
        page02Priority
    );

    updatePriorityConfirmation();

    savePriorityToBackend();

}


/* ============================================================
   14. PRIORITY CONFIRMATION
   ============================================================ */

function updatePriorityConfirmation() {

    const element =
        page02DOM.priorityConfirmation;

    if (!element) return;

    const need =
        findNeed(
            page02Priority
        );

    if (!need) {

        element.classList.remove(
            'visible'
        );

        return;

    }

    const ta =
        element.querySelector(
            '[data-priority-ta]'
        );

    const en =
        element.querySelector(
            '[data-priority-en]'
        );

    if (ta) {

        ta.textContent =
            need.ta;

    }

    if (en) {

        en.textContent =
            need.en;

    }

    if (!ta && !en) {

        element.textContent =
            need.ta +
            ' — ' +
            need.en;

    }

    element.classList.add(
        'visible'
    );

}


/* ============================================================
   15. COMPLETE PAGE UI
   ============================================================ */

function updatePage02UI() {

    updateAllCardStates();

    updateSnapshotCounts();

    updateCompletionProgress();

    updatePriorityConfirmation();

}


/* ============================================================
   16. RESTORE CARD STATES
   ============================================================ */

function updateAllCardStates() {

    page02DOM.cards.forEach(
        card => {

            const needId =
                normalizeNeedId(
                    card.dataset.need
                );

            const status =
                page02Answers[
                    needId
                ] || '';

            updateCardSelection(
                card,
                status
            );

        }
    );

}


/* ============================================================
   17. SNAPSHOT
   ============================================================ */

function calculatePage02Snapshot() {

    let full = 0;

    let partial = 0;

    let none = 0;

    let answered = 0;

    PAGE02_NEEDS.forEach(
        need => {

            const status =
                page02Answers[
                    need.id
                ];

            if (
                status ===
                PAGE02_STATUS.FULL
            ) {

                full++;

                answered++;

            }
            else if (
                status ===
                PAGE02_STATUS.PARTIAL
            ) {

                partial++;

                answered++;

            }
            else if (
                status ===
                PAGE02_STATUS.NONE
            ) {

                none++;

                answered++;

            }

        }
    );

    return {

        full,

        partial,

        none,

        answered,

        unanswered:
            PAGE02_CONFIG.TOTAL_NEEDS -
            answered,

        total:
            PAGE02_CONFIG.TOTAL_NEEDS

    };

}


/* ============================================================
   18. SNAPSHOT COUNTERS
   ============================================================ */

function updateSnapshotCounts() {

    const snapshot =
        calculatePage02Snapshot();

    setElementText(
        page02DOM.fullCount,
        snapshot.full
    );

    setElementText(
        page02DOM.partialCount,
        snapshot.partial
    );

    setElementText(
        page02DOM.noneCount,
        snapshot.none
    );

}


/* ============================================================
   19. COMPLETION PROGRESS
   ============================================================ */

function updateCompletionProgress() {

    const snapshot =
        calculatePage02Snapshot();

    const percentage =
        Math.round(
            (
                snapshot.answered /
                snapshot.total
            ) * 100
        );

    if (
        page02DOM.completionBar
    ) {

        page02DOM.completionBar.style.width =
            percentage + '%';

    }

    if (
        page02DOM.completionPercent
    ) {

        page02DOM.completionPercent.textContent =
            percentage + '%';

    }

    if (
        page02DOM.completionMessage
    ) {

        let message;

        if (
            snapshot.answered === 0
        ) {

            message =
                'உங்கள் 12 தேவைகளில் ஒவ்வொன்றையும் மதிப்பிடுங்கள்.';

        }
        else if (
            snapshot.answered <
            snapshot.total
        ) {

            message =
                snapshot.answered +
                ' / ' +
                snapshot.total +
                ' தேவைகள் பதிவு செய்யப்பட்டுள்ளன.';

        }
        else {

            message =
                'அனைத்து 12 தேவைகளும் பதிவு செய்யப்பட்டுள்ளன.';

        }

        page02DOM.completionMessage.textContent =
            message;

    }

}


/* ============================================================
   20. LOCAL STORAGE — ANSWERS
   ============================================================ */

function savePage02Answers() {

    try {

        localStorage.setItem(
            PAGE02_CONFIG.STORAGE_KEY,
            JSON.stringify(
                page02Answers
            )
        );

    }
    catch (error) {

        console.warn(
            'CTM PATH™ Page 02 local save failed:',
            error
        );

    }

}


/* ============================================================
   21. LOCAL STORAGE — SUMMARY
   ============================================================ */

function savePage02Summary() {

    const snapshot =
        calculatePage02Snapshot();

    const summary = {

        pageNumber:
            PAGE02_CONFIG.PAGE_NUMBER,

        answers:
            {
                ...page02Answers
            },

        full:
            snapshot.full,

        partial:
            snapshot.partial,

        none:
            snapshot.none,

        answered:
            snapshot.answered,

        total:
            snapshot.total,

        priority:
            page02Priority,

        completed:
            snapshot.answered ===
            snapshot.total,

        completedAt:
            snapshot.answered ===
            snapshot.total
                ? new Date().toISOString()
                : null

    };

    try {

        localStorage.setItem(
            PAGE02_CONFIG.SUMMARY_STORAGE_KEY,
            JSON.stringify(
                summary
            )
        );

    }
    catch (error) {

        console.warn(
            'CTM PATH™ Page 02 summary save failed:',
            error
        );

    }

    return summary;

}


/* ============================================================
   22. RESTORE STATE
   ============================================================ */

function restorePage02State() {

    const storedAnswers =
        localStorage.getItem(
            PAGE02_CONFIG.STORAGE_KEY
        );

    if (storedAnswers) {

        try {

            const parsed =
                JSON.parse(
                    storedAnswers
                );

            if (
                parsed &&
                typeof parsed ===
                'object'
            ) {

                Object.keys(
                    parsed
                ).forEach(
                    key => {

                        const needId =
                            normalizeNeedId(
                                key
                            );

                        const status =
                            normalizeStatus(
                                parsed[key]
                            );

                        if (
                            isValidNeedId(
                                needId
                            ) &&
                            status
                        ) {

                            page02Answers[
                                needId
                            ] =
                                status;

                        }

                    }
                );

            }

        }
        catch (error) {

            console.warn(
                'CTM PATH™ Page 02 answers could not be restored:',
                error
            );

        }

    }

    const storedPriority =
        localStorage.getItem(
            PAGE02_CONFIG.PRIORITY_STORAGE_KEY
        );

    if (storedPriority) {

        page02Priority =
            String(
                storedPriority
            ).trim();

    }

    if (
        page02DOM.prioritySelect &&
        page02Priority
    ) {

        const option =
            Array.from(
                page02DOM.prioritySelect.options
            ).find(
                item =>
                    normalizeNeedId(
                        item.value
                    ) ===
                    page02Priority
            );

        if (option) {

            page02DOM.prioritySelect.value =
                option.value;

        }

    }

}


/* ============================================================
   23. VALIDATION
   ============================================================ */

function validatePage02() {

    const missing = [];

    PAGE02_NEEDS.forEach(
        need => {

            const status =
                page02Answers[
                    need.id
                ];

            if (
                !normalizeStatus(
                    status
                )
            ) {

                missing.push(
                    need
                );

            }

        }
    );

    return {

        valid:
            missing.length === 0,

        missing,

        answered:
            PAGE02_CONFIG.TOTAL_NEEDS -
            missing.length

    };

}


/* ============================================================
   24. VALIDATION MESSAGE
   ============================================================ */

function showValidationMessage(
    validation
) {

    if (
        !validation ||
        validation.valid
    ) {
        return;
    }

    const firstMissing =
        validation.missing[0];

    if (firstMissing) {

        const card =
            findCardByNeedId(
                firstMissing.id
            );

        if (card) {

            card.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'center'
                }
            );

            card.classList.add(
                'needs-attention'
            );

            setTimeout(
                () => {

                    card.classList.remove(
                        'needs-attention'
                    );

                },
                1200
            );

        }

    }

    setPage02Status(
        'முதலில் 12 தேவைகளுக்கும் உங்கள் நிலையைத் தேர்வு செய்யுங்கள்.',
        'error'
    );

}


/* ============================================================
   25. NAVIGATION
   ============================================================ */

function attachNavigationHandlers() {

    if (
        page02DOM.previousButton
    ) {

        page02DOM.previousButton.addEventListener(
            'click',
            event => {

                if (
                    page02DOM.previousButton.tagName
                        .toLowerCase() ===
                    'a'
                ) {
                    return;
                }

                event.preventDefault();

                savePage02Summary();

                window.location.href =
                    PAGE02_CONFIG.PREVIOUS_PAGE;

            }
        );

    }


    if (
        page02DOM.nextButton
    ) {

        page02DOM.nextButton.addEventListener(
            'click',
            handlePage02Continue
        );

    }


    if (
        page02DOM.saveContinue &&
        page02DOM.saveContinue !==
        page02DOM.nextButton
    ) {

        page02DOM.saveContinue.addEventListener(
            'click',
            handlePage02Continue
        );

    }


    if (
        page02DOM.form
    ) {

        page02DOM.form.addEventListener(
            'submit',
            event => {

                event.preventDefault();

                handlePage02Continue(
                    event
                );

            }
        );

    }

}


/* ============================================================
   26. CONTINUE TO PAGE 03
   ============================================================ */

async function handlePage02Continue(
    event
) {

    if (event) {

        event.preventDefault();

    }

    if (page02Saving) {

        return;

    }

    const validation =
        validatePage02();

    if (
        !validation.valid
    ) {

        showValidationMessage(
            validation
        );

        return;

    }

    if (
        !page02Priority ||
        !isValidNeedId(
            normalizeNeedId(
                page02Priority
            )
        )
    ) {

        setPage02Status(
            'இந்த 12 தேவைகளில் இப்போது உங்களுக்கு மிகவும் முக்கியமான தேவையைத் தேர்வு செய்யுங்கள்.',
            'error'
        );

        if (
            page02DOM.prioritySelect
        ) {

            page02DOM.prioritySelect.focus();

            page02DOM.prioritySelect.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'center'
                }
            );

        }

        return;

    }

    const summary =
        savePage02Summary();

    savePage02Answers();

    page02Saving = true;

    setNavigationDisabled(
        true
    );

    setPage02Status(
        'உங்கள் பதில்கள் பாதுகாக்கப்படுகின்றன...',
        'loading'
    );

    try {

        await saveAllAnswersToBackend();

        await savePageProgressToBackend(
            summary
        );

        setPage02Status(
            '✓ மதிப்பீடு பாதுகாக்கப்பட்டது / Assessment saved',
            'success'
        );

        setTimeout(
            () => {

                window.location.href =
                    PAGE02_CONFIG.NEXT_PAGE;

            },
            350
        );

    }
    catch (error) {

        console.error(
            'CTM PATH™ Page 02 save error:',
            error
        );

        setPage02Status(
            'உங்கள் பதில்கள் இந்த சாதனத்தில் பாதுகாக்கப்பட்டுள்ளன. அடுத்த பக்கத்திற்குச் செல்ல மீண்டும் முயற்சிக்கவும்.',
            'error'
        );

        setNavigationDisabled(
            false
        );

        page02Saving = false;

    }

}


/* ============================================================
   27. SAVE ALL ANSWERS
   ============================================================ */

async function saveAllAnswersToBackend() {

    const visitorId =
        getVisitorId();

    if (!visitorId) {

        console.warn(
            'CTM PATH™ Page 02: Visitor ID unavailable. Backend save skipped.'
        );

        return {

            success: false,

            skipped: true,

            reason:
                'VISITOR_ID_MISSING'

        };

    }

    const requests =
        PAGE02_NEEDS.map(
            need => {

                return saveAnswerToBackend(
                    need.id,
                    page02Answers[
                        need.id
                    ],
                    visitorId
                );

            }
        );

    const results =
        await Promise.all(
            requests
        );

    return {

        success:
            results.every(
                result =>
                    result === true ||
                    result?.skipped === true
            ),

        results

    };

}


/* ============================================================
   28. SAVE ONE ANSWER
   ============================================================ */

async function saveAnswerToBackend(
    needId,
    status,
    visitorIdOverride
) {

    const visitorId =
        visitorIdOverride ||
        getVisitorId();

    if (!visitorId) {

        return {
            skipped: true
        };

    }

    const need =
        findNeed(
            needId
        );

    if (!need) {

        return false;

    }

    const payload = {

        action:
            PAGE02_CONFIG.ACTION_SAVE_ANSWER,

        data: {

            visitorId,

            pageNumber:
                PAGE02_CONFIG.PAGE_NUMBER,

            questionId:
                need.id,

            question:
                need.ta +
                ' — ' +
                need.en,

            answer:
                status,

            score:
                statusToScore(
                    status
                ),

            status,

            statusLabelTa:
                getStatusLabelTa(
                    status
                ),

            statusLabelEn:
                getStatusLabelEn(
                    status
                )

        }

    };

    try {

        const response =
            await fetch(
                PAGE02_CONFIG.BACKEND_URL,
                {

                    method: 'POST',

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
                'Server error: ' +
                response.status
            );

        }

        const text =
            await response.text();

        if (!text) {

            return true;

        }

        let result;

        try {

            result =
                JSON.parse(
                    text
                );

        }
        catch (parseError) {

            console.warn(
                'Page 02 backend returned non-JSON response.'
            );

            return true;

        }

        if (
            result &&
            result.success === false
        ) {

            throw new Error(
                result.message ||
                'Unable to save Page 02 answer.'
            );

        }

        return true;

    }
    catch (error) {

        console.error(
            'CTM PATH™ Page 02 answer save failed:',
            error
        );

        return false;

    }

}


/* ============================================================
   29. SAVE PAGE PROGRESS
   ============================================================ */

async function savePageProgressToBackend(
    summary
) {

    const visitorId =
        getVisitorId();

    if (!visitorId) {

        return {
            skipped: true
        };

    }

    const payload = {

        action:
            PAGE02_CONFIG.ACTION_SAVE_PROGRESS,

        data: {

            visitorId,

            pageNumber:
                PAGE02_CONFIG.PAGE_NUMBER,

            completed:
                summary.completed,

            answers:
                summary.answers,

            full:
                summary.full,

            partial:
                summary.partial,

            none:
                summary.none,

            answered:
                summary.answered,

            total:
                summary.total,

            priority:
                summary.priority,

            priorityNeed:
                findNeed(
                    summary.priority
                ) || null,

            completedAt:
                summary.completedAt

        }

    };

    try {

        const response =
            await fetch(
                PAGE02_CONFIG.BACKEND_URL,
                {

                    method: 'POST',

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
                'Page progress server error: ' +
                response.status
            );

        }

        return true;

    }
    catch (error) {

        console.error(
            'CTM PATH™ Page 02 progress save failed:',
            error
        );

        return false;

    }

}


/* ============================================================
   30. SAVE PRIORITY
   ============================================================ */

async function savePriorityToBackend() {

    const visitorId =
        getVisitorId();

    if (!visitorId) {

        return;

    }

    const need =
        findNeed(
            page02Priority
        );

    if (!need) {

        return;

    }

    localStorage.setItem(
        PAGE02_CONFIG.PRIORITY_STORAGE_KEY,
        page02Priority
    );

    const payload = {

        action:
            PAGE02_CONFIG.ACTION_SAVE_PROGRESS,

        data: {

            visitorId,

            pageNumber:
                PAGE02_CONFIG.PAGE_NUMBER,

            priority:
                need.id,

            priorityTa:
                need.ta,

            priorityEn:
                need.en,

            answers:
                page02Answers,

            completed:
                calculatePage02Snapshot()
                    .answered ===
                PAGE02_CONFIG.TOTAL_NEEDS

        }

    };

    try {

        await fetch(
            PAGE02_CONFIG.BACKEND_URL,
            {

                method: 'POST',

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

    }
    catch (error) {

        console.warn(
            'CTM PATH™ Page 02 priority backend save failed:',
            error
        );

    }

}


/* ============================================================
   31. STATUS → SCORE
   ============================================================ */

function statusToScore(status) {

    switch (
        normalizeStatus(
            status
        )
    ) {

        case PAGE02_STATUS.FULL:

            return 2;

        case PAGE02_STATUS.PARTIAL:

            return 1;

        case PAGE02_STATUS.NONE:

            return 0;

        default:

            return null;

    }

}


/* ============================================================
   32. STATUS LABEL — TAMIL
   ============================================================ */

function getStatusLabelTa(status) {

    switch (
        normalizeStatus(
            status
        )
    ) {

        case PAGE02_STATUS.FULL:

            return 'முழுமையாக நிறைவேறியது';

        case PAGE02_STATUS.PARTIAL:

            return 'ஓரளவு நிறைவேறியது';

        case PAGE02_STATUS.NONE:

            return 'இன்னும் நிறைவேறவில்லை';

        default:

            return '';

    }

}


/* ============================================================
   33. STATUS LABEL — ENGLISH
   ============================================================ */

function getStatusLabelEn(status) {

    switch (
        normalizeStatus(
            status
        )
    ) {

        case PAGE02_STATUS.FULL:

            return 'Fully Fulfilled';

        case PAGE02_STATUS.PARTIAL:

            return 'Partially Fulfilled';

        case PAGE02_STATUS.NONE:

            return 'Not Yet Fulfilled';

        default:

            return '';

    }

}


/* ============================================================
   34. FIND NEED
   ============================================================ */

function findNeed(needId) {

    const normalized =
        normalizeNeedId(
            needId
        );

    return (
        PAGE02_NEEDS.find(
            need =>
                need.id ===
                normalized
        ) ||
        null
    );

}


/* ============================================================
   35. FIND CARD
   ============================================================ */

function findCardByNeedId(needId) {

    const normalized =
        normalizeNeedId(
            needId
        );

    return (
        page02DOM.cards.find(
            card =>
                normalizeNeedId(
                    card.dataset.need
                ) ===
                normalized
        ) ||
        null
    );

}


/* ============================================================
   36. VALID NEED ID
   ============================================================ */

function isValidNeedId(needId) {

    return Boolean(
        findNeed(
            needId
        )
    );

}


/* ============================================================
   37. VISITOR ID
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
   38. PAGE STATUS
   ============================================================ */

function setPage02Status(
    message,
    type
) {

    const element =
        page02DOM.pageStatus;

    if (!element) {

        console.log(
            'Page 02 status:',
            message
        );

        return;

    }

    element.textContent =
        message;

    element.className =
        'page-status ' +
        (
            type ||
            ''
        );

}


/* ============================================================
   39. DISABLE / ENABLE NAVIGATION
   ============================================================ */

function setNavigationDisabled(
    disabled
) {

    const buttons = [

        page02DOM.saveContinue,

        page02DOM.nextButton,

        page02DOM.previousButton

    ];

    buttons.forEach(
        button => {

            if (!button) return;

            if (
                button.tagName
                    .toLowerCase() ===
                'button'
            ) {

                button.disabled =
                    disabled;

            }

            if (
                button.tagName
                    .toLowerCase() ===
                'a'
            ) {

                if (disabled) {

                    button.dataset.page02Disabled =
                        'true';

                    button.setAttribute(
                        'aria-disabled',
                        'true'
                    );

                }
                else {

                    delete button.dataset.page02Disabled;

                    button.removeAttribute(
                        'aria-disabled'
                    );

                }

            }

        }
    );

}


/* ============================================================
   40. SAFE TEXT UPDATE
   ============================================================ */

function setElementText(
    element,
    value
) {

    if (!element) return;

    element.textContent =
        String(
            value
        );

}


/* ============================================================
   41. DEBUG / QA API
   ============================================================ */

function exposePage02DebugAPI() {

    window.page02Debug = {

        getState() {

            return {

                answers:
                    {
                        ...page02Answers
                    },

                priority:
                    page02Priority,

                snapshot:
                    calculatePage02Snapshot()

            };

        },


        getSnapshot() {

            return calculatePage02Snapshot();

        },


        clear() {

            page02Answers = {};

            page02Priority = '';

            localStorage.removeItem(
                PAGE02_CONFIG.STORAGE_KEY
            );

            localStorage.removeItem(
                PAGE02_CONFIG.SUMMARY_STORAGE_KEY
            );

            localStorage.removeItem(
                PAGE02_CONFIG.PRIORITY_STORAGE_KEY
            );

            if (
                page02DOM.prioritySelect
            ) {

                page02DOM.prioritySelect.value =
                    '';

            }

            updatePage02UI();

        },


        completeAll(
            status
        ) {

            const selectedStatus =
                normalizeStatus(
                    status
                ) ||
                PAGE02_STATUS.FULL;

            PAGE02_NEEDS.forEach(
                need => {

                    page02Answers[
                        need.id
                    ] =
                        selectedStatus;

                }
            );

            savePage02Answers();

            updatePage02UI();

        },


        setAnswer(
            needId,
            status
        ) {

            const normalizedNeed =
                normalizeNeedId(
                    needId
                );

            const normalizedStatus =
                normalizeStatus(
                    status
                );

            if (
                !isValidNeedId(
                    normalizedNeed
                )
            ) {

                console.warn(
                    'Invalid Page 02 need:',
                    needId
                );

                return;

            }

            if (!normalizedStatus) {

                console.warn(
                    'Invalid Page 02 status:',
                    status
                );

                return;

            }

            page02Answers[
                normalizedNeed
            ] =
                normalizedStatus;

            savePage02Answers();

            updatePage02UI();

        }

    };

}


/* ============================================================
   42. INITIALISE
   ============================================================ */

if (
    document.readyState ===
    'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        initPage02
    );

}
else {

    initPage02();

}


/* ============================================================
   END OF js/page02.js
   ============================================================ */
