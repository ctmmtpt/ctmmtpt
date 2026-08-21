
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 02 — JAVASCRIPT
   COMPLETE REPLACEMENT
   ============================================================

   PAGE 02 PURPOSE
   ------------------------------------------------------------
   This page does NOT create another /120 score.

   It captures:
     1. Status of each of the 12 Basic Life Needs
        - FULLY FULFILLED
        - PARTIALLY FULFILLED
        - NOT YET FULFILLED

     2. One highest-priority life need.

   The page stores the visitor's responses locally and,
   when a Visitor ID is available, attempts to save them
   to the existing CTM PATH™ backend.

   Navigation:
       /01  ← Previous
       /02  ← Current page
       /03  → Next

   ============================================================ */


/* ============================================================
   01. CONFIGURATION
   ============================================================ */

const PAGE02_CONFIG = {

    PAGE_NUMBER: 2,

    TOTAL_NEEDS: 12,

    PREVIOUS_PAGE: '/01',

    NEXT_PAGE: '/03',

    STORAGE_KEY:
        'ctmPage02Answers',

    SUMMARY_STORAGE_KEY:
        'ctmPage02Summary',

    PRIORITY_STORAGE_KEY:
        'ctmPage02Priority',

    /*
     * Existing CTM PATH™ backend.
     *
     * Page 01 uses the same endpoint.
     */
    BACKEND_URL:
        'https://script.google.com/macros/s/AKfycbx9eJru7EJYUpReeLv4Sym9wDVLgE_ruSw_ZUJ4ycDoneUKlkI_fcsJ2UJmKM7W_PXtEg/exec',

    /*
     * Backend action names already used by the
     * CTM PATH™ assessment architecture.
     */
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

    FULL:
        'fully',

    PARTIAL:
        'partial',

    NONE:
        'none'

};


/* ============================================================
   04. RUNTIME STATE
   ============================================================ */

let page02Answers = {};

let page02Priority = '';

let page02Saving = false;


/* ============================================================
   05. DOM CACHE
   ============================================================ */

let page02DOM = {};


/* ============================================================
   06. INITIALISE
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
   07. DOM CACHE
   ============================================================ */

function cachePage02DOM() {

    page02DOM = {

        /*
         * Form
         */
        form:
            document.getElementById(
                'assessmentForm'
            ) ||
            document.querySelector(
                'form'
            ),

        /*
         * Need cards
         */
        cards:
            Array.from(
                document.querySelectorAll(
                    '[data-need]'
                )
            ),

        /*
         * Status buttons
         */
        statusButtons:
            Array.from(
                document.querySelectorAll(
                    '[data-status]'
                )
            ),

        /*
         * Priority selector
         */
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

        /*
         * Snapshot counters
         */
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

        /*
         * Completion progress
         */
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

        /*
         * Priority confirmation
         */
        priorityConfirmation:
            document.getElementById(
                'priorityConfirmation'
            ) ||
            document.querySelector(
                '.priority-confirmation'
            ),

        /*
         * Save / continue
         */
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

        /*
         * Generic status area
         */
        pageStatus:
            document.getElementById(
                'pageStatus'
            ) ||
            document.querySelector(
                '.page-status'
            ),

        /*
         * Navigation buttons
         */
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
   08. STATUS HANDLERS
   ============================================================ */

function attachStatusHandlers() {

    const buttons =
        page02DOM.statusButtons;

    if (!buttons.length) {

        console.warn(
            'Page 02: no [data-status] buttons found.'
        );

        return;
    }


    buttons.forEach(
        function(button) {

            button.addEventListener(
                'click',
                function(event) {

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
   09. STATUS SELECTION
   ============================================================ */

function handleStatusSelection(
    button
) {

    const card =
        button.closest(
            '[data-need]'
        );

    if (!card) {
        return;
    }


    const needId =
        normalizeNeedId(
            card.dataset.need
        );

    if (!needId) {
        return;
    }


    const status =
        normalizeStatus(
            button.dataset.status
        );

    if (!status) {
        return;
    }


    /*
     * Save locally immediately.
     */
    page02Answers[needId] =
        status;

    savePage02Answers();

    /*
     * Update visual state.
     */
    updateCardSelection(
        card,
        status
    );

    /*
     * Update snapshot.
     */
    updatePage02UI();

    /*
     * Save this answer to backend.
     * Do not block the user's interaction.
     */
    saveAnswerToBackend(
        needId,
        status
    );

}


/* ============================================================
   10. NORMALISE NEED ID
   ============================================================ */

function normalizeNeedId(
    value
) {

    if (!value) {
        return '';
    }


    const raw =
        String(value)
            .trim()
            .toUpperCase();


    /*
     * Accept:
     *
     * NEED01
     * need01
     * 01
     * 1
     */
    const digits =
        raw.match(
            /(\d{1,2})$/
        );


    if (!digits) {
        return raw;
    }


    const number =
        Number(
            digits[1]
        );


    if (
        !Number.isFinite(
            number
        ) ||
        number < 1 ||
        number > PAGE02_CONFIG.TOTAL_NEEDS
    ) {
        return raw;
    }


    return (
        'NEED' +
        String(number)
            .padStart(
                2,
                '0'
            )
    );

}


/* ============================================================
   11. NORMALISE STATUS
   ============================================================ */

function normalizeStatus(
    value
) {

    if (!value) {
        return '';
    }


    const status =
        String(value)
            .trim()
            .toLowerCase();


    if (
        status === 'full' ||
        status === 'fully' ||
        status === 'fulfilled' ||
        status === 'fully-fulfilled' ||
        status === 'fully_fulfilled'
    ) {
        return PAGE02_STATUS.FULL;
    }


    if (
        status === 'partial' ||
        status === 'partially' ||
        status === 'partially-fulfilled' ||
        status === 'partially_fulfilled'
    ) {
        return PAGE02_STATUS.PARTIAL;
    }


    if (
        status === 'none' ||
        status === 'notyet' ||
        status === 'not-yet' ||
        status === 'not-yet-fulfilled' ||
        status === 'not_yet_fulfilled'
    ) {
        return PAGE02_STATUS.NONE;
    }


    return '';

}


/* ============================================================
   12. UPDATE CARD SELECTION
   ============================================================ */

function updateCardSelection(
    card,
    selectedStatus
) {

    if (!card) {
        return;
    }


    const buttons =
        Array.from(
            card.querySelectorAll(
                '[data-status]'
            )
        );


    buttons.forEach(
        function(button) {

            const status =
                normalizeStatus(
                    button.dataset.status
                );

            const selected =
                status ===
                selectedStatus;


            /*
             * Remove old visual state.
             */
            button.classList.remove(
                'selected'
            );


            button.removeAttribute(
                'aria-pressed'
            );


            /*
             * Apply new visual state.
             */
            if (selected) {

                button.classList.add(
                    'selected'
                );

                button.setAttribute(
                    'aria-pressed',
                    'true'
                );

            }
            else {

                button.setAttribute(
                    'aria-pressed',
                    'false'
                );

            }

        }
    );


    /*
     * Mark the card itself.
     */
    if (selectedStatus) {

        card.classList.add(
            'has-selection'
        );

        card.dataset.selectedStatus =
            selectedStatus;

    }
    else {

        card.classList.remove(
            'has-selection'
        );

        delete card.dataset.selectedStatus;

    }

}


/* ============================================================
   13. PRIORITY HANDLER
   ============================================================ */

function attachPriorityHandler() {

    const select =
        page02DOM.prioritySelect;

    if (!select) {

        console.warn(
            'Page 02: priority selector not found.'
        );

        return;
    }


    select.addEventListener(
        'change',
        function() {

            handlePriorityChange(
                select.value
            );

        }
    );

}


/* ============================================================
   14. PRIORITY CHANGE
   ============================================================ */

function handlePriorityChange(
    value
) {

    page02Priority =
        normalizeNeedId(
            value
        );


    /*
     * If HTML stores the actual value
     * as NEED01 etc, preserve it.
     */
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


    /*
     * Save priority separately.
     */
    savePriorityToBackend();

}


/* ============================================================
   15. PRIORITY CONFIRMATION
   ============================================================ */

function updatePriorityConfirmation() {

    const element =
        page02DOM.priorityConfirmation;

    if (!element) {
        return;
    }


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


    /*
     * Keep existing HTML if the
     * page already contains a
     * structured confirmation.
     */
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


    /*
     * If no dedicated elements exist,
     * update only a safe text container.
     */
    if (
        !ta &&
        !en
    ) {

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
   16. UPDATE COMPLETE PAGE UI
   ============================================================ */

function updatePage02UI() {

    updateAllCardStates();

    updateSnapshotCounts();

    updateCompletionProgress();

    updatePriorityConfirmation();

}


/* ============================================================
   17. UPDATE ALL CARD STATES
   ============================================================ */

function updateAllCardStates() {

    const cards =
        page02DOM.cards;

    cards.forEach(
        function(card) {

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
   18. CALCULATE SNAPSHOT
   ============================================================ */

function calculatePage02Snapshot() {

    let full = 0;

    let partial = 0;

    let none = 0;

    let answered = 0;


    PAGE02_NEEDS.forEach(
        function(need) {

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
   19. UPDATE SNAPSHOT COUNTERS
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
   20. COMPLETION PROGRESS
   ============================================================ */

function updateCompletionProgress() {

    const snapshot =
        calculatePage02Snapshot();


    const percentage =
        Math.round(
            (
                snapshot.answered /
                snapshot.total
            ) *
            100
        );


    /*
     * Progress bar.
     */
    if (
        page02DOM.completionBar
    ) {

        page02DOM.completionBar.style.width =
            percentage +
            '%';

    }


    /*
     * Percentage text.
     */
    if (
        page02DOM.completionPercent
    ) {

        page02DOM.completionPercent.textContent =
            percentage +
            '%';

    }


    /*
     * Completion message.
     */
    if (
        page02DOM.completionMessage
    ) {

        let message;


        if (
            snapshot.answered ===
            0
        ) {

            message =
                'உங்கள் 12 தேவைகளில் ஒவ்வொன்றையும் மதிப்பிடுங்கள்.';

        }
        else if (
            snapshot.answered <
            snapshot.total
        ) {

            message =
                (
                    snapshot.answered +
                    ' / ' +
                    snapshot.total +
                    ' தேவைகள் பதிவு செய்யப்பட்டுள்ளன.'
                );

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
   21. LOCAL STORAGE — SAVE ANSWERS
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
   22. LOCAL STORAGE — SAVE SUMMARY
   ============================================================ */

function savePage02Summary() {

    const snapshot =
        calculatePage02Snapshot();


    const summary = {

        pageNumber:
            PAGE02_CONFIG.PAGE_NUMBER,

        answers:
            page02Answers,

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
   23. RESTORE PAGE 02 STATE
   ============================================================ */

function restorePage02State() {

    /*
     * Restore answers.
     */
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
                    function(key) {

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
                            ] = status;

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


    /*
     * Restore priority.
     */
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


    /*
     * Restore select visually.
     */
    if (
        page02DOM.prioritySelect &&
        page02Priority
    ) {

        const select =
            page02DOM.prioritySelect;


        const matchingOption =
            Array.from(
                select.options
            ).find(
                function(option) {

                    return (
                        normalizeNeedId(
                            option.value
                        ) ===
                        page02Priority
                    );

                }
            );


        if (matchingOption) {

            select.value =
                matchingOption.value;

        }

    }

}


/* ============================================================
   24. VALIDATE ALL 12 RESPONSES
   ============================================================ */

function validatePage02() {

    const missing = [];


    PAGE02_NEEDS.forEach(
        function(need) {

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
   25. SHOW VALIDATION MESSAGE
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
                function() {

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
   26. NAVIGATION HANDLERS
   ============================================================ */

function attachNavigationHandlers() {

    /*
     * Previous.
     */
    if (
        page02DOM.previousButton
    ) {

        page02DOM.previousButton.addEventListener(
            'click',
            function(event) {

                /*
                 * If it is already an <a>,
                 * allow the browser to navigate.
                 */
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


    /*
     * Next.
     */
    if (
        page02DOM.nextButton
    ) {

        page02DOM.nextButton.addEventListener(
            'click',
            handlePage02Continue
        );

    }


    /*
     * Save & Continue.
     */
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


    /*
     * Form submit.
     */
    if (
        page02DOM.form
    ) {

        page02DOM.form.addEventListener(
            'submit',
            function(event) {

                event.preventDefault();

                handlePage02Continue(
                    event
                );

            }
        );

    }

}


/* ============================================================
   27. CONTINUE TO PAGE 03
   ============================================================ */

async function handlePage02Continue(
    event
) {

    if (
        event
    ) {
        event.preventDefault();
    }


    /*
     * Prevent double click.
     */
    if (
        page02Saving
    ) {
        return;
    }


    /*
     * Validate all 12.
     */
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


    /*
     * Priority is required by
     * the frozen Page 02 concept.
     */
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


    /*
     * Save locally before backend.
     */
    const summary =
        savePage02Summary();


    savePage02Answers();


    /*
     * Lock navigation while saving.
     */
    page02Saving = true;

    setNavigationDisabled(
        true
    );


    setPage02Status(
        'உங்கள் பதில்கள் பாதுகாக்கப்படுகின்றன...',
        'loading'
    );


    try {

        /*
         * Save all 12 answers.
         */
        await saveAllAnswersToBackend();


        /*
         * Save priority / page progress.
         */
        await savePageProgressToBackend(
            summary
        );


        setPage02Status(
            '✓ மதிப்பீடு பாதுகாக்கப்பட்டது / Assessment saved',
            'success'
        );


        /*
         * Small delay so the user sees
         * confirmation before navigation.
         */
        setTimeout(
            function() {

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


        /*
         * Important:
         *
         * Local data has already been saved.
         * Therefore the user does not lose
         * the assessment even if backend
         * saving fails.
         */
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
   28. SAVE ALL ANSWERS
   ============================================================ */

async function saveAllAnswersToBackend() {

    const visitorId =
        getVisitorId();


    /*
     * No Visitor ID:
     *
     * Do not destroy the user's journey.
     * Local storage remains authoritative
     * for this browser session.
     */
    if (!visitorId) {

        console.warn(
            'CTM PATH™ Page 02: Visitor ID unavailable. Backend save skipped.'
        );

        return {

            success: false,

            skipped:
                true,

            reason:
                'VISITOR_ID_MISSING'

        };

    }


    const requests =
        PAGE02_NEEDS.map(
            function(need) {

                const status =
                    page02Answers[
                        need.id
                    ];


                return saveAnswerToBackend(
                    need.id,
                    status,
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
                function(result) {
                    return (
                        result === true ||
                        result?.skipped === true
                    );
                }
            ),

        results

    };

}


/* ============================================================
   29. SAVE ONE ANSWER TO BACKEND
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

            status:

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


        if (
            !response.ok
        ) {

            throw new Error(
                'Server error: ' +
                response.status
            );

        }


        const text =
            await response.text();


        /*
         * Apps Script occasionally returns
         * an empty body. Treat the HTTP success
         * as sufficient in that case.
         */
        if (
            !text
        ) {

            return true;

        }


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

            /*
             * If the endpoint returned HTTP 200
             * but not JSON, do not immediately
             * destroy the user's progress.
             */
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


        /*
         * Keep local state intact.
         */
        return false;

    }

}


/* ============================================================
   30. SAVE PAGE PROGRESS
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


        if (
            !response.ok
        ) {

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


        /*
         * The 12 individual answers have
         * already been saved locally.
         */
        return false;

    }

}


/* ============================================================
   31. SAVE PRIORITY TO BACKEND
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


    /*
     * Priority is stored locally first.
     */
    localStorage.setItem(
        PAGE02_CONFIG.PRIORITY_STORAGE_KEY,
        page02Priority
    );


    /*
     * Use save_progress so this remains
     * compatible with the existing backend
     * architecture.
     */
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

    }
    catch (error) {

        /*
         * Priority is already safely
         * stored locally.
         */
        console.warn(
            'Page 02 priority backend save failed:',
            error
        );

    }

}


/* ============================================================
   32. STATUS → SCORE
   ============================================================

   IMPORTANT:
   Page 02 is NOT presented as a /120 score.

   These values are only useful if the backend
   wants a normalized internal representation.

       Fully Fulfilled       = 2
       Partially Fulfilled   = 1
       Not Yet Fulfilled     = 0
   */

function statusToScore(
    status
) {

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
   33. STATUS LABEL — TAMIL
   ============================================================ */

function getStatusLabelTa(
    status
) {

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
   34. STATUS LABEL — ENGLISH
   ============================================================ */

function getStatusLabelEn(
    status
) {

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
   35. FIND NEED
   ============================================================ */

function findNeed(
    needId
) {

    const normalized =
        normalizeNeedId(
            needId
        );


    return (
        PAGE02_NEEDS.find(
            function(need) {

                return (
                    need.id ===
                    normalized
                );

            }
        ) ||
        null
    );

}


/* ============================================================
   36. FIND CARD
   ============================================================ */

function findCardByNeedId(
    needId
) {

    const normalized =
        normalizeNeedId(
            needId
        );


    return (
        page02DOM.cards.find(
            function(card) {

                return (
                    normalizeNeedId(
                        card.dataset.need
                    ) ===
                    normalized
                );

            }
        ) ||
        null
    );

}


/* ============================================================
   37. VALID NEED ID
   ============================================================ */

function isValidNeedId(
    needId
) {

    return Boolean(
        findNeed(
            needId
        )
    );

}


/* ============================================================
   38. VISITOR ID
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
   39. SET PAGE STATUS
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
   40. DISABLE / ENABLE NAVIGATION
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
        function(button) {

            if (!button) {
                return;
            }


            /*
             * Buttons.
             */
            if (
                button.tagName
                    .toLowerCase() ===
                'button'
            ) {

                button.disabled =
                    disabled;

            }


            /*
             * Links.
             */
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
   41. SAFE TEXT UPDATE
   ============================================================ */

function setElementText(
    element,
    value
) {

    if (!element) {
        return;
    }


    element.textContent =
        String(
            value
        );

}


/* ============================================================
   42. DEBUG / QA API
   ============================================================

   Available from browser console:

       page02Debug.getState()

       page02Debug.getSnapshot()

       page02Debug.clear()

       page02Debug.completeAll()

   These helpers do not affect normal production
   operation unless explicitly called.
   */

function exposePage02DebugAPI() {

    window.page02Debug = {

        getState:
            function() {

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


        getSnapshot:
            function() {

                return calculatePage02Snapshot();

            },


        clear:
            function() {

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


        completeAll:
            function(
                status
            ) {

                const selectedStatus =
                    normalizeStatus(
                        status
                    ) ||
                    PAGE02_STATUS.FULL;


                PAGE02_NEEDS.forEach(
                    function(need) {

                        page02Answers[
                            need.id
                        ] =
                            selectedStatus;

                    }
                );


                savePage02Answers();

                updatePage02UI();

            },


        setAnswer:
            function(
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


                if (
                    !normalizedStatus
                ) {

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
   43. INITIALISATION
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

