
/* =========================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 02 — JAVASCRIPT
   12 BASIC LIFE NEEDS
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURATION
       ===================================================== */

    const CONFIG = {

        STORAGE_KEY:
            "ctm_path_page02",

        NEXT_URL:
            "/03",

        PREVIOUS_URL:
            "/01"

    };


    /* =====================================================
       NEED DEFINITIONS
       ===================================================== */

    const NEEDS = [

        {
            id: "home",
            number: 1,
            tamil: "வீடு",
            english: "HOME"
        },

        {
            id: "car",
            number: 2,
            tamil: "கார்",
            english: "CAR"
        },

        {
            id: "bike",
            number: 3,
            tamil: "பைக்",
            english: "BIKE"
        },

        {
            id: "education",
            number: 4,
            tamil: "குழந்தைகளின் கல்வி",
            english: "CHILDREN'S EDUCATION"
        },

        {
            id: "jewellery",
            number: 5,
            tamil: "நகை",
            english: "JEWELLERY"
        },

        {
            id: "debtFree",
            number: 6,
            tamil: "கடனில்லா வாழ்க்கை",
            english: "DEBT-FREE LIFE"
        },

        {
            id: "savings",
            number: 7,
            tamil: "சேமிப்பு",
            english: "SAVINGS"
        },

        {
            id: "parents",
            number: 8,
            tamil: "பெற்றோரை கவனித்தல்",
            english: "CARING FOR PARENTS"
        },

        {
            id: "travel",
            number: 9,
            tamil: "சுற்றுலா",
            english: "TRAVEL"
        },

        {
            id: "healthcare",
            number: 10,
            tamil: "மருத்துவம்",
            english: "HEALTHCARE"
        },

        {
            id: "socialService",
            number: 11,
            tamil: "சமூக சேவை",
            english: "SOCIAL SERVICE"
        },

        {
            id: "recreation",
            number: 12,
            tamil: "பொழுதுபோக்கு",
            english: "RECREATION"
        }

    ];


    /* =====================================================
       STATUS DEFINITIONS
       ===================================================== */

    const STATUS = {

        fulfilled: {

            tamil:
                "முழுமையாக நிறைவேறியது",

            english:
                "Fully Fulfilled"

        },

        partial: {

            tamil:
                "ஓரளவு நிறைவேறியது",

            english:
                "Partially Fulfilled"

        },

        pending: {

            tamil:
                "இன்னும் நிறைவேறவில்லை",

            english:
                "Not Yet Fulfilled"

        }

    };


    /* =====================================================
       STATE
       ===================================================== */

    const state = {

        responses: {},

        priorityNeed: ""

    };


    /* =====================================================
       DOM REFERENCES
       ===================================================== */

    let needsGrid;
    let prioritySelect;
    let saveButton;
    let pageStatus;
    let priorityError;


    /* =====================================================
       INITIALISE
       ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        init
    );


    function init() {

        cacheDOM();

        loadSavedData();

        bindStatusButtons();

        bindPriority();

        bindNavigation();

        updateAllUI();

    }


    /* =====================================================
       CACHE DOM
       ===================================================== */

    function cacheDOM() {

        needsGrid =
            document.getElementById(
                "needsGrid"
            );

        prioritySelect =
            document.getElementById(
                "priorityNeed"
            );

        saveButton =
            document.getElementById(
                "saveContinueButton"
            );

        pageStatus =
            document.getElementById(
                "pageStatus"
            );

        priorityError =
            document.getElementById(
                "priorityError"
            );

    }


    /* =====================================================
       BIND STATUS BUTTONS
       ===================================================== */

    function bindStatusButtons() {

        if (!needsGrid) {
            return;
        }


        const cards =
            needsGrid.querySelectorAll(
                ".need-card"
            );


        cards.forEach(function (card) {

            const needId =
                card.dataset.need;


            const buttons =
                card.querySelectorAll(
                    ".status-button"
                );


            buttons.forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const selectedStatus =
                            button.dataset.status;


                        setResponse(
                            needId,
                            selectedStatus
                        );

                    }
                );

            });

        });

    }


    /* =====================================================
       SET RESPONSE
       ===================================================== */

    function setResponse(
        needId,
        selectedStatus
    ) {

        if (
            !needId ||
            !STATUS[selectedStatus]
        ) {
            return;
        }


        state.responses[needId] =
            selectedStatus;


        updateCard(
            needId
        );


        updateSnapshot();

        saveStateSilently();

    }


    /* =====================================================
       UPDATE CARD
       ===================================================== */

    function updateCard(
        needId
    ) {

        const card =
            document.querySelector(
                '.need-card[data-need="' +
                needId +
                '"]'
            );


        if (!card) {
            return;
        }


        const selectedStatus =
            state.responses[needId];


        const buttons =
            card.querySelectorAll(
                ".status-button"
            );


        const statusText =
            card.querySelector(
                "[data-status-text]"
            );


        card.classList.remove(
            "status-fulfilled",
            "status-partial",
            "status-pending"
        );


        buttons.forEach(
            function (button) {

                const isSelected =
                    button.dataset.status ===
                    selectedStatus;


                button.classList.toggle(
                    "selected",
                    isSelected
                );


                button.setAttribute(
                    "aria-pressed",
                    isSelected
                        ? "true"
                        : "false"
                );

            }
        );


        if (
            selectedStatus &&
            STATUS[selectedStatus]
        ) {

            card.classList.add(
                "status-" +
                selectedStatus
            );


            if (statusText) {

                statusText.textContent =
                    STATUS[selectedStatus].tamil;

            }

        } else {

            if (statusText) {

                statusText.textContent =
                    "தேர்வு செய்யப்படவில்லை";

            }

        }

    }


    /* =====================================================
       UPDATE ALL CARDS
       ===================================================== */

    function updateAllCards() {

        NEEDS.forEach(
            function (need) {

                updateCard(
                    need.id
                );

            }
        );

    }


    /* =====================================================
       SNAPSHOT CALCULATION
       ===================================================== */

    function calculateSnapshot() {

        const snapshot = {

            fulfilled: 0,

            partial: 0,

            pending: 0

        };


        NEEDS.forEach(
            function (need) {

                const value =
                    state.responses[
                        need.id
                    ];


                if (
                    value === "fulfilled"
                ) {

                    snapshot.fulfilled++;

                } else if (
                    value === "partial"
                ) {

                    snapshot.partial++;

                } else if (
                    value === "pending"
                ) {

                    snapshot.pending++;

                }

            }
        );


        return snapshot;

    }


    /* =====================================================
       UPDATE SNAPSHOT
       ===================================================== */

    function updateSnapshot() {

        const snapshot =
            calculateSnapshot();


        const fulfilledElement =
            document.getElementById(
                "fulfilledCount"
            );


        const partialElement =
            document.getElementById(
                "partialCount"
            );


        const pendingElement =
            document.getElementById(
                "pendingCount"
            );


        if (fulfilledElement) {

            animateNumber(
                fulfilledElement,
                snapshot.fulfilled
            );

        }


        if (partialElement) {

            animateNumber(
                partialElement,
                snapshot.partial
            );

        }


        if (pendingElement) {

            animateNumber(
                pendingElement,
                snapshot.pending
            );

        }

    }


    /* =====================================================
       NUMBER UPDATE
       ===================================================== */

    function animateNumber(
        element,
        value
    ) {

        element.textContent =
            String(value);

    }


    /* =====================================================
       BIND PRIORITY
       ===================================================== */

    function bindPriority() {

        if (!prioritySelect) {
            return;
        }


        prioritySelect.addEventListener(
            "change",
            function () {

                state.priorityNeed =
                    prioritySelect.value;


                clearPriorityError();

                saveStateSilently();

            }
        );

    }


    /* =====================================================
       BIND NAVIGATION
       ===================================================== */

    function bindNavigation() {

        if (!saveButton) {
            return;
        }


        saveButton.addEventListener(
            "click",
            handleSaveAndContinue
        );

    }


    /* =====================================================
       SAVE AND CONTINUE
       ===================================================== */

    function handleSaveAndContinue() {

        clearMessages();


        const validation =
            validatePage();


        if (!validation.valid) {

            showError(
                validation.message
            );

            return;

        }


        saveState();


        showSuccess(
            "பதில்கள் சேமிக்கப்பட்டுள்ளன. அடுத்த பக்கத்திற்கு செல்கிறோம்..."
        );


        saveButton.disabled = true;


        setTimeout(
            function () {

                window.location.href =
                    CONFIG.NEXT_URL;

            },
            500
        );

    }


    /* =====================================================
       VALIDATION
       ===================================================== */

    function validatePage() {

        const answered =
            Object.keys(
                state.responses
            ).length;


        if (answered < NEEDS.length) {

            const remaining =
                NEEDS.length -
                answered;


            return {

                valid: false,

                message:
                    "தயவுசெய்து 12 தேவைகளுக்கும் உங்கள் நிலையைத் தேர்வு செய்யுங்கள். " +
                    remaining +
                    " தேவைகள் இன்னும் தேர்வு செய்யப்படவில்லை."

            };

        }


        if (!state.priorityNeed) {

            showPriorityError(
                "தொடர்வதற்கு முன், உங்களுக்கு மிகவும் முக்கியமான ஒரு தேவையைத் தேர்வு செய்யுங்கள்."
            );


            return {

                valid: false,

                message:
                    "உங்களுக்கு மிகவும் முக்கியமான தேவையைத் தேர்வு செய்யுங்கள்."

            };

        }


        return {

            valid: true,

            message: ""

        };

    }


    /* =====================================================
       STORAGE
       ===================================================== */

    function buildPayload() {

        const snapshot =
            calculateSnapshot();


        return {

            page:
                2,

            pageId:
                "02",

            savedAt:
                new Date().toISOString(),

            responses:
                Object.assign(
                    {},
                    state.responses
                ),

            priorityNeed:
                state.priorityNeed,

            snapshot: {

                fullyFulfilled:
                    snapshot.fulfilled,

                partiallyFulfilled:
                    snapshot.partial,

                notYetFulfilled:
                    snapshot.pending

            }

        };

    }


    function saveStateSilently() {

        try {

            const payload =
                buildPayload();


            localStorage.setItem(
                CONFIG.STORAGE_KEY,
                JSON.stringify(payload)
            );

        } catch (error) {

            console.warn(
                "Page 02 local save failed:",
                error
            );

        }

    }


    function saveState() {

        saveStateSilently();

    }


    /* =====================================================
       LOAD SAVED DATA
       ===================================================== */

    function loadSavedData() {

        try {

            const raw =
                localStorage.getItem(
                    CONFIG.STORAGE_KEY
                );


            if (!raw) {
                return;
            }


            const saved =
                JSON.parse(raw);


            if (
                saved &&
                saved.responses &&
                typeof saved.responses ===
                "object"
            ) {

                state.responses =
                    Object.assign(
                        {},
                        saved.responses
                    );

            }


            if (
                saved &&
                typeof saved.priorityNeed ===
                "string"
            ) {

                state.priorityNeed =
                    saved.priorityNeed;

            }


            if (prioritySelect) {

                prioritySelect.value =
                    state.priorityNeed;

            }

        } catch (error) {

            console.warn(
                "Page 02 saved data could not be loaded:",
                error
            );

        }

    }


    /* =====================================================
       UPDATE UI
       ===================================================== */

    function updateAllUI() {

        updateAllCards();

        updateSnapshot();

        if (prioritySelect) {

            prioritySelect.value =
                state.priorityNeed;

        }

    }


    /* =====================================================
       MESSAGES
       ===================================================== */

    function clearMessages() {

        if (pageStatus) {

            pageStatus.textContent = "";

            pageStatus.className =
                "page-status";

        }


        clearPriorityError();

    }


    function showSuccess(
        message
    ) {

        if (!pageStatus) {
            return;
        }


        pageStatus.textContent =
            message;


        pageStatus.className =
            "page-status success";

    }


    function showError(
        message
    ) {

        if (!pageStatus) {
            return;
        }


        pageStatus.textContent =
            message;


        pageStatus.className =
            "page-status error";

    }


    function showPriorityError(
        message
    ) {

        if (!priorityError) {
            return;
        }


        priorityError.textContent =
            message;

    }


    function clearPriorityError() {

        if (!priorityError) {
            return;
        }


        priorityError.textContent =
            "";

    }


    /* =====================================================
       PUBLIC DEBUG API
       ===================================================== */

    window.CTMPage02 = {

        getState:
            function () {

                return JSON.parse(
                    JSON.stringify(state)
                );

            },

        getSnapshot:
            function () {

                return calculateSnapshot();

            },

        save:
            function () {

                saveState();

            },

        clear:
            function () {

                state.responses = {};

                state.priorityNeed = "";


                localStorage.removeItem(
                    CONFIG.STORAGE_KEY
                );


                updateAllUI();

            }

    };


})();

