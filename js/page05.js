/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 05 — TIME, WORK & BUSINESS
   ============================================================

   FILE:
   js/page05.js

   PAGE:
   05 / 16

   RESPONSIBILITIES:
   1. Date-of-birth calculation
   2. 100-year life calculation
   3. Life remaining display
   4. Life-bar rendering
   5. Five-question assessment
   6. Score calculation
   7. Score interpretation
   8. Save & Continue
   9. Page navigation

   SCORING:
   A = 2
   B = 5
   C = 8
   D = 10

   TOTAL:
   50

   AVERAGE:
   10
   ============================================================ */

(function () {

    "use strict";


    /* ========================================================
       01. CONFIGURATION
       ======================================================== */

    const PAGE_NUMBER = 5;
    const TOTAL_PAGES = 16;

    const LIFE_EXPECTANCY_YEARS = 100;

    const SCORE_VALUES = {
        A: 2,
        B: 5,
        C: 8,
        D: 10
    };

    const TOTAL_QUESTIONS = 5;


    /* ========================================================
       02. STATE
       ======================================================== */

    const state = {

        dateOfBirth: null,

        ageYears: 0,

        ageMonths: 0,

        ageDays: 0,

        ageHours: 0,

        remainingYears: 0,

        remainingMonths: 0,

        remainingDays: 0,

        remainingHours: 0,

        answers: {},

        totalScore: 0,

        averageScore: 0,

        lifeCalculated: false

    };


    /* ========================================================
       03. DOM REFERENCES
       ======================================================== */

    const elements = {};


    function cacheElements() {

        elements.birthDay =
            document.getElementById("birthDay");

        elements.birthMonth =
            document.getElementById("birthMonth");

        elements.birthYear =
            document.getElementById("birthYear");

        elements.calculateLifeButton =
            document.getElementById("calculateLifeButton");

        elements.dobError =
            document.getElementById("dobError");

        elements.lifeReveal =
            document.getElementById("lifeReveal");

        elements.ageYears =
            document.getElementById("ageYears");

        elements.remainingYears =
            document.getElementById("remainingYears");

        elements.remainingMonths =
            document.getElementById("remainingMonths");

        elements.remainingDays =
            document.getElementById("remainingDays");

        elements.remainingHours =
            document.getElementById("remainingHours");

        elements.lifeBarLived =
            document.getElementById("lifeBarLived");

        elements.livedYearsLabel =
            document.getElementById("livedYearsLabel");

        elements.totalScoreTop =
            document.getElementById("totalScoreTop");

        elements.averageScore =
            document.getElementById("averageScore");

        elements.totalScore =
            document.getElementById("totalScore");

        elements.averageScoreReveal =
            document.getElementById("averageScoreReveal");

        elements.businessInterpretation =
            document.getElementById("businessInterpretation");

        elements.jobBusinessForm =
            document.getElementById("jobBusinessForm");

        elements.saveContinueButton =
            document.getElementById("saveContinueButton");

        elements.previousButton =
            document.getElementById("previousButton");

        elements.nextButton =
            document.getElementById("nextButton");

    }


    /* ========================================================
       04. INITIALISE
       ======================================================== */

    function init() {

        cacheElements();

        setupNavigation();

        setupLifeCalculator();

        setupAssessment();

        setupSaveButton();

        restoreSavedData();

        updateScoreDisplay();

    }


    /* ========================================================
       05. NAVIGATION
       ======================================================== */

    function setupNavigation() {

        if (elements.previousButton) {

            elements.previousButton.setAttribute(
                "href",
                "04.html"
            );

        }


        if (elements.nextButton) {

            elements.nextButton.setAttribute(
                "href",
                "06.html"
            );

        }

    }


    /* ========================================================
       06. DOB CALCULATOR
       ======================================================== */

    function setupLifeCalculator() {

        if (!elements.calculateLifeButton) {
            return;
        }


        elements.calculateLifeButton.addEventListener(
            "click",
            calculateLife
        );


        [
            elements.birthDay,
            elements.birthMonth,
            elements.birthYear
        ].forEach(function (input) {

            if (!input) {
                return;
            }

            input.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Enter") {

                        event.preventDefault();

                        calculateLife();

                    }

                }
            );

        });

    }


    function calculateLife() {

        clearDobError();


        const day =
            parseInt(
                elements.birthDay.value,
                10
            );

        const month =
            parseInt(
                elements.birthMonth.value,
                10
            );

        const year =
            parseInt(
                elements.birthYear.value,
                10
            );


        if (
            !Number.isInteger(day) ||
            !Number.isInteger(month) ||
            !Number.isInteger(year)
        ) {

            showDobError(
                "Please enter your complete date of birth."
            );

            return;

        }


        if (
            day < 1 ||
            day > 31 ||
            month < 1 ||
            month > 12
        ) {

            showDobError(
                "Please enter a valid date of birth."
            );

            return;

        }


        const dob =
            new Date(
                year,
                month - 1,
                day
            );


        if (
            dob.getFullYear() !== year ||
            dob.getMonth() !== month - 1 ||
            dob.getDate() !== day
        ) {

            showDobError(
                "That date does not exist. Please check your date of birth."
            );

            return;

        }


        const now =
            new Date();


        if (dob > now) {

            showDobError(
                "Your date of birth cannot be in the future."
            );

            return;

        }


        if (
            year < 1900 ||
            year > now.getFullYear()
        ) {

            showDobError(
                "Please enter a valid year."
            );

            return;

        }


        state.dateOfBirth =
            dob;


        calculateExactLifeValues(
            dob,
            now
        );


        renderLifeResults();


        saveLifeData();

    }


    /* ========================================================
       07. EXACT AGE
       ======================================================== */

    function calculateExactLifeValues(
        dob,
        now
    ) {

        let years =
            now.getFullYear() -
            dob.getFullYear();


        let anniversary =
            new Date(
                now.getFullYear(),
                dob.getMonth(),
                dob.getDate()
            );


        if (anniversary > now) {

            years--;

        }


        const lastBirthday =
            new Date(
                now.getFullYear() - years,
                dob.getMonth(),
                dob.getDate()
            );


        const elapsedSinceBirthday =
            now.getTime() -
            lastBirthday.getTime();


        const elapsedDays =
            Math.floor(
                elapsedSinceBirthday /
                (1000 * 60 * 60 * 24)
            );


        const months =
            Math.floor(
                elapsedDays / 30.436875
            );


        const remainingDays =
            Math.floor(
                elapsedDays -
                (months * 30.436875)
            );


        const remainingHours =
            Math.floor(
                (
                    elapsedSinceBirthday /
                    (1000 * 60 * 60)
                ) % 24
            );


        state.ageYears =
            years;

        state.ageMonths =
            months % 12;

        state.ageDays =
            Math.max(
                0,
                remainingDays
            );

        state.ageHours =
            remainingHours;


        calculateRemainingLife(
            dob,
            now,
            years
        );

    }


    /* ========================================================
       08. REMAINING LIFE TO 100
       ======================================================== */

    function calculateRemainingLife(
        dob,
        now,
        ageYears
    ) {

        const hundredthBirthday =
            new Date(
                dob.getFullYear() +
                LIFE_EXPECTANCY_YEARS,
                dob.getMonth(),
                dob.getDate()
            );


        const remainingMilliseconds =
            Math.max(
                0,
                hundredthBirthday.getTime() -
                now.getTime()
            );


        const millisecondsPerHour =
            1000 *
            60 *
            60;


        const millisecondsPerDay =
            millisecondsPerHour *
            24;


        const millisecondsPerMonth =
            millisecondsPerDay *
            30.436875;


        const millisecondsPerYear =
            millisecondsPerDay *
            365.2425;


        state.remainingYears =
            Math.max(
                0,
                Math.floor(
                    remainingMilliseconds /
                    millisecondsPerYear
                )
            );


        state.remainingMonths =
            Math.max(
                0,
                Math.floor(
                    remainingMilliseconds /
                    millisecondsPerMonth
                )
            );


        state.remainingDays =
            Math.max(
                0,
                Math.floor(
                    remainingMilliseconds /
                    millisecondsPerDay
                )
            );


        state.remainingHours =
            Math.max(
                0,
                Math.floor(
                    remainingMilliseconds /
                    millisecondsPerHour
                )
            );


        state.lifeCalculated =
            true;

    }


    /* ========================================================
       09. RENDER LIFE RESULTS
       ======================================================== */

    function renderLifeResults() {

        if (!elements.lifeReveal) {
            return;
        }


        elements.ageYears.textContent =
            formatNumber(
                state.ageYears
            );


        elements.remainingYears.textContent =
            formatNumber(
                state.remainingYears
            );


        elements.remainingMonths.textContent =
            formatNumber(
                state.remainingMonths
            );


        elements.remainingDays.textContent =
            formatNumber(
                state.remainingDays
            );


        elements.remainingHours.textContent =
            formatNumber(
                state.remainingHours
            );


        if (elements.livedYearsLabel) {

            elements.livedYearsLabel.textContent =
                state.ageYears +
                " YEARS";

        }


        updateLifeBar();


        elements.lifeReveal.classList.add(
            "visible"
        );


        setTimeout(
            function () {

                elements.lifeReveal.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            },
            150
        );

    }


    /* ========================================================
       10. LIFE BAR
       ======================================================== */

    function updateLifeBar() {

        if (!elements.lifeBarLived) {
            return;
        }


        const percentage =
            Math.min(
                100,
                Math.max(
                    0,
                    (
                        state.ageYears /
                        LIFE_EXPECTANCY_YEARS
                    ) * 100
                )
            );


        requestAnimationFrame(
            function () {

                elements.lifeBarLived.style.width =
                    percentage.toFixed(2) +
                    "%";

            }
        );

    }


    /* ========================================================
       11. ASSESSMENT
       ======================================================== */

    function setupAssessment() {

        if (!elements.jobBusinessForm) {
            return;
        }


        const answerButtons =
            elements.jobBusinessForm.querySelectorAll(
                ".answer-option"
            );


        answerButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        selectAnswer(
                            button
                        );

                    }
                );

            }
        );

    }


    /* ========================================================
       12. SELECT ANSWER
       ======================================================== */

    function selectAnswer(
        button
    ) {

        const questionNumber =
            parseInt(
                button.dataset.question,
                10
            );


        const value =
            parseInt(
                button.dataset.value,
                10
            );


        if (
            !questionNumber ||
            !value
        ) {
            return;
        }


        const card =
            button.closest(
                ".assessment-card"
            );


        if (!card) {
            return;
        }


        const options =
            card.querySelectorAll(
                ".answer-option"
            );


        options.forEach(
            function (option) {

                option.classList.remove(
                    "selected"
                );

                option.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }
        );


        button.classList.add(
            "selected"
        );


        button.setAttribute(
            "aria-pressed",
            "true"
        );


        state.answers[
            questionNumber
        ] = value;


        updateQuestionScore(
            questionNumber,
            value
        );


        calculateTotalScore();

        saveAssessmentData();

    }


    /* ========================================================
       13. QUESTION SCORE
       ======================================================== */

    function updateQuestionScore(
        questionNumber,
        value
    ) {

        const scoreElement =
            document.getElementById(
                "questionScore" +
                questionNumber
            );


        if (!scoreElement) {
            return;
        }


        scoreElement.textContent =
            value;

    }


    /* ========================================================
       14. TOTAL SCORE
       ======================================================== */

    function calculateTotalScore() {

        let total =
            0;


        for (
            let question = 1;
            question <= TOTAL_QUESTIONS;
            question++
        ) {

            if (
                Object.prototype.hasOwnProperty.call(
                    state.answers,
                    question
                )
            ) {

                total +=
                    Number(
                        state.answers[question]
                    );

            }

        }


        state.totalScore =
            total;


        state.averageScore =
            total /
            TOTAL_QUESTIONS;


        updateScoreDisplay();


        updateInterpretation();

    }


    /* ========================================================
       15. SCORE DISPLAY
       ======================================================== */

    function updateScoreDisplay() {

        const total =
            state.totalScore;


        const average =
            state.averageScore;


        if (elements.totalScoreTop) {

            elements.totalScoreTop.textContent =
                total > 0
                    ? total
                    : "—";

        }


        if (elements.averageScore) {

            elements.averageScore.textContent =
                total > 0
                    ? average.toFixed(1)
                    : "—";

        }


        if (elements.totalScore) {

            elements.totalScore.textContent =
                total > 0
                    ? total
                    : "—";

        }


        if (elements.averageScoreReveal) {

            elements.averageScoreReveal.textContent =
                total > 0
                    ? average.toFixed(1)
                    : "—";

        }

    }


    /* ========================================================
       16. SCORE INTERPRETATION
       ======================================================== */

    function updateInterpretation() {

        if (
            !elements.businessInterpretation ||
            state.totalScore === 0
        ) {

            if (
                elements.businessInterpretation
            ) {

                elements.businessInterpretation.innerHTML =
                    "";

            }

            return;

        }


        const average =
            state.averageScore;


        let tamil =
            "";

        let english =
            "";


        if (average <= 3) {

            tamil =
                "உங்கள் தற்போதைய வருமான அணுகுமுறை பெரும்பாலும் தனிப்பட்ட நேரம் மற்றும் உழைப்பைச் சார்ந்துள்ளது. உங்கள் நேரத்தைத் தாண்டி வளரக்கூடிய அமைப்பை உருவாக்குவதற்கான வாய்ப்பு இங்கே உள்ளது.";

            english =
                "Your current income approach is largely dependent on your personal time and effort. There is an opportunity to begin building systems that can grow beyond your personal hours.";

        }

        else if (average <= 5.5) {

            tamil =
                "நீங்கள் ஒரு மாற்றக் கட்டத்தில் இருக்கிறீர்கள். வேலை மற்றும் கூடுதல் வருமான வாய்ப்புகளுக்கு இடையே பாலம் அமைக்கத் தொடங்கியுள்ளீர்கள்.";

            english =
                "You are in a transition stage. You are beginning to build a bridge between employment and additional income opportunities.";

        }

        else if (average <= 7.5) {

            tamil =
                "நீங்கள் உங்கள் நேரத்தை மட்டும் விற்காமல், அமைப்புகள், மக்கள் மற்றும் கூடுதல் வருமான வாய்ப்புகளை உருவாக்கும் திசையில் நகர்கிறீர்கள்.";

            english =
                "You are moving beyond simply trading time for income and beginning to build systems, people and additional income opportunities.";

        }

        else {

            tamil =
                "உங்கள் சிந்தனை ஒரு வணிக அமைப்பை உருவாக்கும் திசையில் உள்ளது. உங்கள் தனிப்பட்ட நேரத்தைத் தாண்டியும் மதிப்பை உருவாக்கக்கூடிய அமைப்பை தொடர்ந்து வளர்ப்பதே அடுத்த கட்டம்.";

            english =
                "Your thinking is oriented toward building a business system. The next step is to keep developing systems that can create value beyond your personal working hours.";

        }


        elements.businessInterpretation.innerHTML =

            "<strong>" +
            escapeHtml(tamil) +
            "</strong>" +

            "<span>" +
            escapeHtml(english) +
            "</span>";

    }


    /* ========================================================
       17. SAVE BUTTON
       ======================================================== */

    function setupSaveButton() {

        if (!elements.saveContinueButton) {
            return;
        }


        elements.saveContinueButton.addEventListener(
            "click",
            function () {

                calculateTotalScore();

                saveAllData();

                goToNextPage();

            }
        );

    }


    /* ========================================================
       18. SAVE ALL DATA
       ======================================================== */

    function saveAllData() {

        saveLifeData();

        saveAssessmentData();

    }


    /* ========================================================
       19. SAVE LIFE DATA
       ======================================================== */

    function saveLifeData() {

        if (!state.dateOfBirth) {
            return;
        }


        const lifeData = {

            dateOfBirth:
                state.dateOfBirth.toISOString(),

            ageYears:
                state.ageYears,

            ageMonths:
                state.ageMonths,

            ageDays:
                state.ageDays,

            ageHours:
                state.ageHours,

            remainingYears:
                state.remainingYears,

            remainingMonths:
                state.remainingMonths,

            remainingDays:
                state.remainingDays,

            remainingHours:
                state.remainingHours,

            lifeCalculated:
                state.lifeCalculated

        };


        localStorage.setItem(
            "ctm_path_page05_life",
            JSON.stringify(
                lifeData
            )
        );

    }


    /* ========================================================
       20. SAVE ASSESSMENT
       ======================================================== */

    function saveAssessmentData() {

        const assessmentData = {

            answers:
                state.answers,

            totalScore:
                state.totalScore,

            averageScore:
                state.averageScore

        };


        localStorage.setItem(
            "ctm_path_page05_assessment",
            JSON.stringify(
                assessmentData
            )
        );

    }


    /* ========================================================
       21. RESTORE DATA
       ======================================================== */

    function restoreSavedData() {

        restoreLifeData();

        restoreAssessmentData();

    }


    /* ========================================================
       22. RESTORE LIFE
       ======================================================== */

    function restoreLifeData() {

        const raw =
            localStorage.getItem(
                "ctm_path_page05_life"
            );


        if (!raw) {
            return;
        }


        try {

            const data =
                JSON.parse(raw);


            if (
                !data ||
                !data.dateOfBirth
            ) {
                return;
            }


            const dob =
                new Date(
                    data.dateOfBirth
                );


            if (
                Number.isNaN(
                    dob.getTime()
                )
            ) {
                return;
            }


            state.dateOfBirth =
                dob;


            state.ageYears =
                Number(
                    data.ageYears || 0
                );


            state.ageMonths =
                Number(
                    data.ageMonths || 0
                );


            state.ageDays =
                Number(
                    data.ageDays || 0
                );


            state.ageHours =
                Number(
                    data.ageHours || 0
                );


            state.remainingYears =
                Number(
                    data.remainingYears || 0
                );


            state.remainingMonths =
                Number(
                    data.remainingMonths || 0
                );


            state.remainingDays =
                Number(
                    data.remainingDays || 0
                );


            state.remainingHours =
                Number(
                    data.remainingHours || 0
                );


            state.lifeCalculated =
                Boolean(
                    data.lifeCalculated
                );


            if (elements.birthDay) {

                elements.birthDay.value =
                    dob.getDate();

            }


            if (elements.birthMonth) {

                elements.birthMonth.value =
                    dob.getMonth() + 1;

            }


            if (elements.birthYear) {

                elements.birthYear.value =
                    dob.getFullYear();

            }


            if (state.lifeCalculated) {

                renderLifeResults();

            }

        }

        catch (error) {

            console.warn(
                "Unable to restore Page 05 life data:",
                error
            );

        }

    }


    /* ========================================================
       23. RESTORE ASSESSMENT
       ======================================================== */

    function restoreAssessmentData() {

        const raw =
            localStorage.getItem(
                "ctm_path_page05_assessment"
            );


        if (!raw) {
            return;
        }


        try {

            const data =
                JSON.parse(raw);


            if (
                !data ||
                !data.answers
            ) {
                return;
            }


            state.answers =
                data.answers;


            Object.keys(
                state.answers
            ).forEach(
                function (questionNumber) {

                    const value =
                        Number(
                            state.answers[
                                questionNumber
                            ]
                        );


                    const card =
                        document.querySelector(
                            '.assessment-card[data-question="' +
                            questionNumber +
                            '"]'
                        );


                    if (!card) {
                        return;
                    }


                    const button =
                        card.querySelector(
                            '.answer-option[data-value="' +
                            value +
                            '"]'
                        );


                    if (!button) {
                        return;
                    }


                    button.classList.add(
                        "selected"
                    );


                    button.setAttribute(
                        "aria-pressed",
                        "true"
                    );


                    updateQuestionScore(
                        Number(
                            questionNumber
                        ),
                        value
                    );

                }
            );


            calculateTotalScore();

        }

        catch (error) {

            console.warn(
                "Unable to restore Page 05 assessment data:",
                error
            );

        }

    }


    /* ========================================================
       24. NEXT PAGE
       ======================================================== */

    function goToNextPage() {

        window.location.href =
            "06.html";

    }


    /* ========================================================
       25. ERROR HELPERS
       ======================================================== */

    function showDobError(
        message
    ) {

        if (!elements.dobError) {
            return;
        }


        elements.dobError.textContent =
            message;

    }


    function clearDobError() {

        if (!elements.dobError) {
            return;
        }


        elements.dobError.textContent =
            "";

    }


    /* ========================================================
       26. NUMBER FORMAT
       ======================================================== */

    function formatNumber(
        value
    ) {

        return Number(
            value
        ).toLocaleString(
            "en-IN"
        );

    }


    /* ========================================================
       27. HTML ESCAPE
       ======================================================== */

    function escapeHtml(
        value
    ) {

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
       28. START
       ======================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    }

    else {

        init();

    }


})();
