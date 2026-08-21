
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 02 — JAVASCRIPT
   YOUR 12 BASIC LIFE NEEDS

   FILE:
   js/page02.js

   DEPENDENCIES:
   02.html
   css/page02.css

   NO EXTERNAL LIBRARIES
   ============================================================ */

(function () {

    "use strict";


    /* ========================================================
       01. CONFIGURATION
       ======================================================== */

    const CONFIG = {

        STORAGE_KEY:
            "CTM_PATH_PAGE02_LIFE_NEEDS",

        PAGE_NUMBER:
            "02",

        TOTAL_NEEDS:
            12,

        PREVIOUS_PAGE:
            "01.html",

        NEXT_PAGE:
            "03.html"

    };


    /* ========================================================
       02. STATUS DEFINITIONS
       ======================================================== */

    const STATUS = {

        FULFILLED: "fulfilled",

        PARTIAL: "partial",

        PENDING: "pending"

    };


    /* ========================================================
       03. STATUS DISPLAY
       ======================================================== */

    const STATUS_LABELS = {

        fulfilled: {

            ta:
                "முழுமையாக நிறைவேறியது",

            en:
                "Fully Fulfilled",

            symbol:
                "✓"

        },

        partial: {

            ta:
                "ஓரளவு நிறைவேறியது",

            en:
                "Partially Fulfilled",

            symbol:
                "◐"

        },

        pending: {

            ta:
                "இன்னும் நிறைவேறவில்லை",

            en:
                "Not Yet Fulfilled",

            symbol:
                "○"

        }

    };


    /* ========================================================
       04. THE 12 BASIC LIFE NEEDS

       The structure is deliberately kept in one place so
       Page 02 can be maintained without changing the HTML.
       ======================================================== */

    const NEEDS = [

        {
            id: "home",

            number: "01",

            ta: "வீடு",

            en: "HOME",

            questionTa:
                "உங்கள் குடும்பத்தின் தேவைகளுக்கும் கனவுகளுக்கும் ஏற்ற ஒரு நல்ல வீடு உங்களிடம் உள்ளதா?",

            questionEn:
                "Do you have the home you truly want for yourself and your family?",

            icon: "home"
        },


        {
            id: "car",

            number: "02",

            ta: "கார்",

            en: "CAR",

            questionTa:
                "உங்கள் குடும்பத்தின் தேவைகளுக்கும் உங்கள் வாழ்க்கை முறைக்கும் ஏற்ற கார் உங்களிடம் உள்ளதா?",

            questionEn:
                "Do you have the car that suits your family's needs and lifestyle?",

            icon: "car"
        },


        {
            id: "education",

            number: "03",

            ta: "கல்வி",

            en: "EDUCATION",

            questionTa:
                "உங்களுக்கும் உங்கள் குடும்பத்திற்கும் தேவையான தரமான கல்வி மற்றும் கற்றல் வாய்ப்புகள் கிடைக்கிறதா?",

            questionEn:
                "Do you and your family have access to the education and learning opportunities you need?",

            icon: "education"
        },


        {
            id: "health",

            number: "04",

            ta: "ஆரோக்கியம்",

            en: "HEALTH",

            questionTa:
                "உங்களுக்கும் உங்கள் குடும்பத்திற்கும் தேவையான நல்ல ஆரோக்கியத்தையும் பராமரிப்பையும் பெறுகிறீர்களா?",

            questionEn:
                "Do you and your family have the health, care and wellbeing you need?",

            icon: "health"
        },


        {
            id: "food",

            number: "05",

            ta: "உணவு",

            en: "FOOD",

            questionTa:
                "உங்களுக்கும் உங்கள் குடும்பத்திற்கும் தேவையான சத்தான மற்றும் தரமான உணவு போதுமான அளவில் கிடைக்கிறதா?",

            questionEn:
                "Do you and your family have reliable access to nutritious and quality food?",

            icon: "food"
        },


        {
            id: "clothing",

            number: "06",

            ta: "உடை",

            en: "CLOTHING",

            questionTa:
                "உங்களுக்கும் உங்கள் குடும்பத்திற்கும் தேவையான தரமான உடைகள் மற்றும் தனிப்பட்ட தேவைகள் நிறைவேறுகிறதா?",

            questionEn:
                "Do you and your family have the clothing and personal essentials you need?",

            icon: "clothing"
        },


        {
            id: "family",

            number: "07",

            ta: "குடும்பம்",

            en: "FAMILY",

            questionTa:
                "உங்கள் குடும்பத்துடன் அன்பு, பாதுகாப்பு மற்றும் மகிழ்ச்சியுடன் வாழும் வாழ்க்கை உங்களிடம் உள்ளதா?",

            questionEn:
                "Do you have the loving, secure and happy family life you desire?",

            icon: "family"
        },


        {
            id: "travel",

            number: "08",

            ta: "பயணம்",

            en: "TRAVEL",

            questionTa:
                "உங்களுக்கு விருப்பமான இடங்களுக்கு பயணம் செய்து புதிய அனுபவங்களைப் பெறுவதற்கான வாய்ப்பு உங்களிடம் உள்ளதா?",

            questionEn:
                "Do you have the freedom and resources to travel and experience the places you desire?",

            icon: "travel"
        },


        {
            id: "technology",

            number: "09",

            ta: "தொழில்நுட்பம்",

            en: "TECHNOLOGY",

            questionTa:
                "உங்கள் வாழ்க்கை மற்றும் பணிக்குத் தேவையான நவீன தொழில்நுட்ப வசதிகள் உங்களிடம் உள்ளதா?",

            questionEn:
                "Do you have the technology and digital tools you need for your life and work?",

            icon: "technology"
        },


        {
            id: "savings",

            number: "10",

            ta: "சேமிப்பு",

            en: "SAVINGS",

            questionTa:
                "எதிர்காலத் தேவைகளுக்கும் எதிர்பாராத சூழ்நிலைகளுக்கும் போதுமான சேமிப்பு உங்களிடம் உள்ளதா?",

            questionEn:
                "Do you have enough savings to support your future needs and unexpected situations?",

            icon: "savings"
        },


        {
            id: "security",

            number: "11",

            ta: "பாதுகாப்பு",

            en: "SECURITY",

            questionTa:
                "உங்கள் குடும்பத்தின் எதிர்காலத்திற்கு தேவையான நிதி மற்றும் வாழ்க்கைப் பாதுகாப்பு உங்களிடம் உள்ளதா?",

            questionEn:
                "Do you have the financial and life security your family needs for the future?",

            icon: "security"
        },


        {
            id: "experiences",

            number: "12",

            ta: "வாழ்க்கை அனுபவங்கள்",

            en: "LIFE EXPERIENCES",

            questionTa:
                "நீங்கள் விரும்பும் மகிழ்ச்சியான அனுபவங்கள், ஓய்வு மற்றும் வாழ்க்கையை அனுபவிக்கும் வாய்ப்புகள் உங்களிடம் உள்ளதா?",

            questionEn:
                "Do you have the experiences, recreation and opportunities to enjoy the life you want?",

            icon: "experiences"
        }

    ];


    /* ========================================================
       05. APPLICATION STATE
       ======================================================== */

    let state = {

        answers: {},

        priorityNeed: ""

    };


    /* ========================================================
       06. DOM REFERENCES
       ======================================================== */

    let elements = {};


    /* ========================================================
       07. SVG ICON HELPERS
       ======================================================== */

    function svg(content, label) {

        return `
            <svg
                viewBox="0 0 100 100"
                role="img"
                aria-label="${escapeAttribute(label)}"
                xmlns="http://www.w3.org/2000/svg"
            >
                ${content}
            </svg>
        `;

    }


    function iconHome() {

        return svg(`

            <path d="M18 46 L50 19 L82 46"/>

            <path d="M25 42 V82 H75 V42"/>

            <path d="M42 82 V57 H58 V82"/>

            <path d="M34 49 H66"/>

        `, "Home");

    }


    function iconCar() {

        return svg(`

            <path d="
                M19 60
                L25 42
                Q27 35 35 34
                H65
                Q73 35 75 42
                L81 60
                V72
                H19
                Z
            "/>

            <path d="M28 44 H72"/>

            <path d="M34 50 H66"/>

            <circle cx="30" cy="70" r="6"/>

            <circle cx="70" cy="70" r="6"/>

            <path d="M19 59 H81"/>

        `, "Car");

    }


    function iconEducation() {

        return svg(`

            <path d="
                M15 38
                L50 21
                L85 38
                L50 55
                Z
            "/>

            <path d="M28 46 V67"/>

            <path d="
                M72 46
                V67
                Q50 80 28 67
            "/>

            <path d="M85 38 V60"/>

            <circle cx="85" cy="66" r="3"/>

        `, "Education");

    }


    function iconHealth() {

        return svg(`

            <path d="
                M50 82
                C45 77 20 61 20 42
                C20 29 36 23 50 37
                C64 23 80 29 80 42
                C80 61 55 77 50 82
                Z
            "/>

            <path d="M36 51 H45 V42 H55 V51 H64 V61 H55 V70 H45 V61 H36 Z"/>

        `, "Health");

    }


    function iconFood() {

        return svg(`

            <path d="M25 24 V76"/>

            <path d="M18 24 V43 Q18 50 25 50 Q32 50 32 43 V24"/>

            <path d="M68 24 V76"/>

            <path d="M68 24 Q82 31 82 45 Q82 55 68 55"/>

            <path d="M44 57 H56"/>

            <path d="M50 50 V76"/>

        `, "Food");

    }


    function iconClothing() {

        return svg(`

            <path d="
                M37 25
                L47 19
                H53
                L63 25
                L77 34
                L68 49
                L60 44
                V80
                H40
                V44
                L32 49
                L23 34
                Z
            "/>

            <path d="M47 19 Q50 27 53 19"/>

            <path d="M40 62 H60"/>

        `, "Clothing");

    }


    function iconFamily() {

        return svg(`

            <circle cx="50" cy="31" r="9"/>

            <circle cx="28" cy="39" r="7"/>

            <circle cx="72" cy="39" r="7"/>

            <path d="
                M34 74
                V61
                Q34 49 50 49
                Q66 49 66 61
                V74
            "/>

            <path d="
                M12 72
                V61
                Q12 51 25 51
                Q34 51 38 57
            "/>

            <path d="
                M88 72
                V61
                Q88 51 75 51
                Q66 51 62 57
            "/>

        `, "Family");

    }


    function iconTravel() {

        return svg(`

            <circle cx="50" cy="50" r="30"/>

            <path d="M20 50 H80"/>

            <path d="M50 20 V80"/>

            <path d="
                M31 27
                Q40 50 31 73
            "/>

            <path d="
                M69 27
                Q60 50 69 73
            "/>

            <path d="
                M27 35
                Q50 43 73 35
            "/>

            <path d="
                M27 65
                Q50 57 73 65
            "/>

        `, "Travel");

    }


    function iconTechnology() {

        return svg(`

            <rect
                x="19"
                y="21"
                width="62"
                height="43"
                rx="4"
            />

            <path d="M36 79 H64"/>

            <path d="M50 64 V79"/>

            <path d="M30 72 H70"/>

            <circle cx="50" cy="42" r="9"/>

        `, "Technology");

    }


    function iconSavings() {

        return svg(`

            <path d="
                M22 39
                H76
                Q82 39 82 46
                V68
                Q82 75 75 75
                H25
                Q18 75 18 68
                V46
                Q18 39 22 39
            "/>

            <path d="
                M27 39
                V31
                Q27 25 34 25
                H67
                Q73 25 73 31
                V39
            "/>

            <circle cx="50" cy="56" r="12"/>

            <path d="M50 49 V63"/>

            <path d="M45 53 Q50 48 55 53"/>

            <path d="M45 60 Q50 65 55 60"/>

        `, "Savings");

    }


    function iconSecurity() {

        return svg(`

            <path d="
                M50 18
                L78 28
                V48
                Q78 69 50 83
                Q22 69 22 48
                V28
                Z
            "/>

            <path d="
                M36 49
                L46 59
                L65 38
            "/>

        `, "Security");

    }


    function iconExperiences() {

        return svg(`

            <circle cx="50" cy="50" r="29"/>

            <path d="
                M50 30
                L56 44
                L71 45
                L59 55
                L63 70
                L50 61
                L37 70
                L41 55
                L29 45
                L44 44
                Z
            "/>

        `, "Life Experiences");

    }


    const ICONS = {

        home: iconHome,

        car: iconCar,

        education: iconEducation,

        health: iconHealth,

        food: iconFood,

        clothing: iconClothing,

        family: iconFamily,

        travel: iconTravel,

        technology: iconTechnology,

        savings: iconSavings,

        security: iconSecurity,

        experiences: iconExperiences

    };


    /* ========================================================
       08. INITIALISATION
       ======================================================== */

    function init() {

        cacheElements();

        loadState();

        renderNeeds();

        renderPriorityOptions();

        bindEvents();

        updateAll();

        scrollToTop();

    }


    /* ========================================================
       09. CACHE DOM
       ======================================================== */

    function cacheElements() {

        elements.form =
            document.getElementById("needsForm");

        elements.fulfilledCount =
            document.getElementById("fulfilledCount");

        elements.partialCount =
            document.getElementById("partialCount");

        elements.pendingCount =
            document.getElementById("pendingCount");

        elements.completionText =
            document.getElementById("completionText");

        elements.completionBar =
            document.getElementById("completionBar");

        elements.priorityNeed =
            document.getElementById("priorityNeed");

        elements.pageStatus =
            document.getElementById("pageStatus");

        elements.previousButton =
            document.getElementById("previousButton");

        elements.nextButton =
            document.getElementById("nextButton");

    }


    /* ========================================================
       10. LOAD SAVED STATE
       ======================================================== */

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
                typeof parsed === "object"
            ) {

                if (
                    parsed.answers &&
                    typeof parsed.answers === "object"
                ) {

                    state.answers =
                        parsed.answers;

                }

                if (
                    typeof parsed.priorityNeed ===
                    "string"
                ) {

                    state.priorityNeed =
                        parsed.priorityNeed;

                }

            }

        } catch (error) {

            console.warn(
                "CTM PATH™ Page 02: saved state could not be loaded.",
                error
            );

        }

    }


    /* ========================================================
       11. SAVE STATE
       ======================================================== */

    function saveState() {

        try {

            localStorage.setItem(

                CONFIG.STORAGE_KEY,

                JSON.stringify({

                    page:
                        CONFIG.PAGE_NUMBER,

                    answers:
                        state.answers,

                    priorityNeed:
                        state.priorityNeed,

                    updatedAt:
                        new Date().toISOString()

                })

            );

        } catch (error) {

            console.warn(
                "CTM PATH™ Page 02: state could not be saved.",
                error
            );

        }

    }


    /* ========================================================
       12. RENDER THE 12 CARDS
       ======================================================== */

    function renderNeeds() {

        if (!elements.form) {
            return;
        }

        elements.form.innerHTML =
            NEEDS.map(
                renderNeedCard
            ).join("");

    }


    /* ========================================================
       13. RENDER INDIVIDUAL CARD
       ======================================================== */

    function renderNeedCard(need) {

        const selected =
            state.answers[need.id] || "";

        const iconFunction =
            ICONS[need.icon];

        const iconMarkup =
            iconFunction
                ? iconFunction()
                : "";


        return `

            <article
                class="need-card"
                data-need-id="${escapeAttribute(need.id)}"
            >

                <div class="need-card-top">

                    <div class="need-number">

                        ${escapeHTML(need.number)}

                    </div>


                    <div class="need-icon">

                        ${iconMarkup}

                    </div>

                </div>


                <h3 class="need-title">

                    ${escapeHTML(need.ta)}

                </h3>


                <div class="need-title-en">

                    ${escapeHTML(need.en)}

                </div>


                <p class="need-question">

                    ${escapeHTML(need.questionTa)}

                </p>


                <p class="need-question-en">

                    ${escapeHTML(need.questionEn)}

                </p>


                <div
                    class="need-options"
                    role="radiogroup"
                    aria-label="${escapeAttribute(
                        need.en
                    )}"
                >


                    ${renderOption(
                        need,
                        STATUS.FULFILLED,
                        selected
                    )}


                    ${renderOption(
                        need,
                        STATUS.PARTIAL,
                        selected
                    )}


                    ${renderOption(
                        need,
                        STATUS.PENDING,
                        selected
                    )}

                </div>


                <div
                    class="need-card-status"
                    id="status-${escapeAttribute(
                        need.id
                    )}"
                ></div>

            </article>

        `;

    }


    /* ========================================================
       14. RENDER STATUS OPTION
       ======================================================== */

    function renderOption(
        need,
        status,
        selected
    ) {

        const labels =
            STATUS_LABELS[status];

        const inputId =
            `${need.id}-${status}`;

        const checked =
            selected === status
                ? "checked"
                : "";


        return `

            <label
                class="
                    need-option
                    option-${status}
                "
                for="${escapeAttribute(inputId)}"
            >

                <input
                    type="radio"
                    id="${escapeAttribute(inputId)}"
                    name="need-${escapeAttribute(need.id)}"
                    value="${escapeAttribute(status)}"
                    ${checked}
                >


                <span
                    class="option-icon"
                    aria-hidden="true"
                >
                    ${escapeHTML(labels.symbol)}
                </span>


                <span class="option-ta">

                    ${escapeHTML(labels.ta)}

                </span>


                <span class="option-en">

                    ${escapeHTML(labels.en)}

                </span>

            </label>

        `;

    }


    /* ========================================================
       15. RENDER PRIORITY OPTIONS
       ======================================================== */

    function renderPriorityOptions() {

        if (!elements.priorityNeed) {
            return;
        }


        const options =
            NEEDS.map(function (need) {

                return `

                    <option
                        value="${escapeAttribute(need.id)}"
                    >

                        ${escapeHTML(need.number)}
                        —
                        ${escapeHTML(need.ta)}
                        /
                        ${escapeHTML(need.en)}

                    </option>

                `;

            }).join("");


        elements.priorityNeed.insertAdjacentHTML(
            "beforeend",
            options
        );


        elements.priorityNeed.value =
            state.priorityNeed || "";

    }


    /* ========================================================
       16. EVENT BINDING
       ======================================================== */

    function bindEvents() {


        /* ----------------------------------------------------
           STATUS SELECTION
           ---------------------------------------------------- */

        if (elements.form) {

            elements.form.addEventListener(
                "change",
                handleFormChange
            );

        }


        /* ----------------------------------------------------
           PRIORITY
           ---------------------------------------------------- */

        if (elements.priorityNeed) {

            elements.priorityNeed.addEventListener(
                "change",
                function () {

                    state.priorityNeed =
                        elements.priorityNeed.value;

                    saveState();

                    updatePriorityStatus();

                }
            );

        }


        /* ----------------------------------------------------
           PREVIOUS
           ---------------------------------------------------- */

        if (elements.previousButton) {

            elements.previousButton.addEventListener(
                "click",
                function () {

                    saveState();

                    window.location.href =
                        CONFIG.PREVIOUS_PAGE;

                }
            );

        }


        /* ----------------------------------------------------
           NEXT
           ---------------------------------------------------- */

        if (elements.nextButton) {

            elements.nextButton.addEventListener(
                "click",
                handleNext
            );

        }

    }


    /* ========================================================
       17. FORM CHANGE
       ======================================================== */

    function handleFormChange(event) {

        const input =
            event.target;


        if (
            !input ||
            input.type !== "radio"
        ) {

            return;

        }


        const name =
            input.name;


        if (
            !name.startsWith("need-")
        ) {

            return;

        }


        const needId =
            name.replace(
                "need-",
                ""
            );


        state.answers[needId] =
            input.value;


        saveState();

        updateAll();

    }


    /* ========================================================
       18. UPDATE EVERYTHING
       ======================================================== */

    function updateAll() {

        const counts =
            calculateCounts();


        updateCounters(
            counts
        );


        updateCompletion(
            counts
        );


        updateCardStatuses();


        updatePriorityStatus();

    }


    /* ========================================================
       19. CALCULATE COUNTS
       ======================================================== */

    function calculateCounts() {

        let fulfilled = 0;

        let partial = 0;

        let pending = 0;

        let answered = 0;


        NEEDS.forEach(function (need) {

            const value =
                state.answers[need.id];


            if (
                value === STATUS.FULFILLED
            ) {

                fulfilled++;

                answered++;

            }
            else if (
                value === STATUS.PARTIAL
            ) {

                partial++;

                answered++;

            }
            else if (
                value === STATUS.PENDING
            ) {

                pending++;

                answered++;

            }

        });


        const unanswered =
            CONFIG.TOTAL_NEEDS -
            answered;


        return {

            fulfilled,

            partial,

            pending,

            answered,

            unanswered,

            completion:
                Math.round(
                    (
                        answered /
                        CONFIG.TOTAL_NEEDS
                    ) * 100
                )

        };

    }


    /* ========================================================
       20. UPDATE COUNTERS
       ======================================================== */

    function updateCounters(counts) {

        if (elements.fulfilledCount) {

            elements.fulfilledCount.textContent =
                counts.fulfilled;

        }


        if (elements.partialCount) {

            elements.partialCount.textContent =
                counts.partial;

        }


        if (elements.pendingCount) {

            elements.pendingCount.textContent =
                counts.pending;

        }

    }


    /* ========================================================
       21. UPDATE COMPLETION BAR
       ======================================================== */

    function updateCompletion(counts) {

        if (elements.completionBar) {

            elements.completionBar.style.width =
                `${counts.completion}%`;

        }


        if (elements.completionText) {

            elements.completionText.textContent =
                `${counts.answered} / ${CONFIG.TOTAL_NEEDS}`;

        }

    }


    /* ========================================================
       22. UPDATE CARD STATUS
       ======================================================== */

    function updateCardStatuses() {

        NEEDS.forEach(function (need) {

            const statusElement =
                document.getElementById(
                    `status-${need.id}`
                );


            if (!statusElement) {
                return;
            }


            const selected =
                state.answers[need.id];


            if (!selected) {

                statusElement.textContent =
                    "ஒரு பதிலைத் தேர்வு செய்யுங்கள்";

                statusElement.style.color =
                    "var(--text-muted)";

                return;

            }


            const labels =
                STATUS_LABELS[selected];


            statusElement.innerHTML = `

                <strong>

                    ${escapeHTML(labels.ta)}

                </strong>

                <span>

                    /
                    ${escapeHTML(labels.en)}

                </span>

            `;


            if (
                selected === STATUS.FULFILLED
            ) {

                statusElement.style.color =
                    "var(--green-light)";

            }
            else if (
                selected === STATUS.PARTIAL
            ) {

                statusElement.style.color =
                    "var(--orange-light)";

            }
            else {

                statusElement.style.color =
                    "var(--red-light)";

            }

        });

    }


    /* ========================================================
       23. PRIORITY STATUS
       ======================================================== */

    function updatePriorityStatus() {

        if (!elements.pageStatus) {
            return;
        }


        if (
            state.priorityNeed
        ) {

            const selectedNeed =
                NEEDS.find(
                    function (need) {

                        return (
                            need.id ===
                            state.priorityNeed
                        );

                    }
                );


            if (selectedNeed) {

                elements.pageStatus.textContent =
                    `✓ ${selectedNeed.ta} / ${selectedNeed.en} — உங்கள் முக்கியமான தேவை பதிவு செய்யப்பட்டது.`;

                return;

            }

        }


        elements.pageStatus.textContent =
            "";

    }


    /* ========================================================
       24. NEXT PAGE
       ======================================================== */

    function handleNext() {

        const counts =
            calculateCounts();


        saveState();


        /*
         * The user can move forward even if some cards are
         * unanswered. The page remains exploratory rather
         * than becoming a hard-blocking form.
         */

        if (
            counts.unanswered > 0
        ) {

            showTemporaryStatus(

                `இன்னும் ${counts.unanswered} தேவைகளுக்கு பதில் அளிக்கப்படவில்லை.`

            );

        }


        window.setTimeout(
            function () {

                window.location.href =
                    CONFIG.NEXT_PAGE;

            },
            180
        );

    }


    /* ========================================================
       25. TEMPORARY STATUS MESSAGE
       ======================================================== */

    function showTemporaryStatus(message) {

        if (!elements.pageStatus) {
            return;
        }


        elements.pageStatus.textContent =
            message;


        window.setTimeout(
            function () {

                if (
                    elements.pageStatus
                ) {

                    updatePriorityStatus();

                }

            },
            2200
        );

    }


    /* ========================================================
       26. SCROLL TO TOP
       ======================================================== */

    function scrollToTop() {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto"
        });

    }


    /* ========================================================
       27. ESCAPE HTML
       ======================================================== */

    function escapeHTML(value) {

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


    /* ========================================================
       28. ESCAPE ATTRIBUTE
       ======================================================== */

    function escapeAttribute(value) {

        return escapeHTML(value);

    }


    /* ========================================================
       29. PUBLIC PAGE API
       ======================================================== */

    window.CTMPathPage02 = {

        getState: function () {

            return {

                answers:
                    Object.assign(
                        {},
                        state.answers
                    ),

                priorityNeed:
                    state.priorityNeed

            };

        },


        getNeeds: function () {

            return NEEDS.slice();

        },


        getCounts: function () {

            return calculateCounts();

        },


        save: function () {

            saveState();

        },


        reset: function () {

            state = {

                answers: {},

                priorityNeed: ""

            };


            try {

                localStorage.removeItem(
                    CONFIG.STORAGE_KEY
                );

            } catch (error) {

                console.warn(
                    "CTM PATH™ Page 02: reset failed.",
                    error
                );

            }


            renderNeeds();

            if (elements.priorityNeed) {

                elements.priorityNeed.value =
                    "";

            }


            updateAll();

        }

    };


    /* ========================================================
       30. START APPLICATION
       ======================================================== */

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

