/* ============================================================
   CTM PATH™ MILLIONAIRES™
   INDEX PAGE JAVASCRIPT
   Controlled Journey Entrance
   ============================================================ */


/* ============================================================
   CONFIGURATION
   ============================================================ */

const CONFIG = {

    BACKEND_URL:
        'https://script.google.com/macros/s/AKfycbx9eJru7EJYUpReeLv4Sym9wDVLgE_ruSw_ZUJ4ycDoneUKlkI_fcsJ2UJmKM7W_PXtEg/exec',

    FIRST_PAGE:
        '/01'

};


/* ============================================================
   PAGE INITIALISATION
   ============================================================ */

(function initialiseIndexPage() {

    /* --------------------------------------------------------
       Prevent duplicate initialisation if the script is loaded
       more than once by the hosting environment.
       -------------------------------------------------------- */

    if (window.__CTM_INDEX_INITIALISED__) {
        return;
    }

    window.__CTM_INDEX_INITIALISED__ = true;


    /* --------------------------------------------------------
       DOM REFERENCES
       -------------------------------------------------------- */

    const form =
        document.getElementById('kycForm');

    const beginButton =
        document.getElementById('beginButton');

    const formStatus =
        document.getElementById('formStatus');

    const fields = {

        fullName:
            document.getElementById('fullName'),

        mobile:
            document.getElementById('mobile'),

        email:
            document.getElementById('email'),

        district:
            document.getElementById('district'),

        state:
            document.getElementById('state'),

        consent:
            document.getElementById('consent')

    };


    /* --------------------------------------------------------
       Reduced-motion preference
       -------------------------------------------------------- */

    const reducedMotionQuery =
        window.matchMedia
            ? window.matchMedia('(prefers-reduced-motion: reduce)')
            : null;


    const prefersReducedMotion = function () {

        return reducedMotionQuery
            ? reducedMotionQuery.matches
            : false;

    };


    /* --------------------------------------------------------
       Page state
       -------------------------------------------------------- */

    let isSubmitting = false;


    /* ========================================================
       SCROLL / JOURNEY POSITION
       ======================================================== */

    function initialiseScrollPosition() {

        /*
         * The Index is the controlled entrance to the journey.
         * It should never reopen halfway down the page because
         * of browser scroll restoration.
         */

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: prefersReducedMotion()
                ? 'auto'
                : 'auto'
        });

    }


    /* ========================================================
       ACCESSIBILITY SETUP
       ======================================================== */

    function initialiseAccessibility() {

        if (form) {

            form.setAttribute(
                'aria-busy',
                'false'
            );

        }


        if (formStatus) {

            formStatus.setAttribute(
                'role',
                'status'
            );

            formStatus.setAttribute(
                'aria-live',
                'polite'
            );

            formStatus.setAttribute(
                'aria-atomic',
                'true'
            );

        }


        const errorMap = {

            fullName:
                'fullNameError',

            mobile:
                'mobileError',

            email:
                'emailError',

            district:
                'districtError'

        };


        Object.keys(errorMap).forEach(
            function (fieldName) {

                const field =
                    fields[fieldName];

                const errorId =
                    errorMap[fieldName];

                const errorElement =
                    document.getElementById(errorId);

                if (field) {

                    field.setAttribute(
                        'aria-invalid',
                        'false'
                    );

                    if (errorElement) {

                        field.setAttribute(
                            'aria-describedby',
                            errorId
                        );

                    }

                }

                if (errorElement) {

                    errorElement.setAttribute(
                        'aria-live',
                        'polite'
                    );

                }

            }
        );

    }


    /* ========================================================
       FIELD INTERACTION
       ======================================================== */

    function initialiseFieldListeners() {

        const errorMap = {

            fullName:
                'fullNameError',

            mobile:
                'mobileError',

            email:
                'emailError',

            district:
                'districtError'

        };


        Object.keys(errorMap).forEach(
            function (fieldName) {

                const field =
                    fields[fieldName];

                if (!field) {
                    return;
                }

                field.addEventListener(
                    'input',
                    function () {

                        clearFieldError(
                            fieldName,
                            errorMap[fieldName]
                        );

                    },
                    { passive: true }
                );

            }
        );


        if (fields.consent) {

            fields.consent.addEventListener(
                'change',
                function () {

                    if (fields.consent.checked) {

                        showStatus('', '');

                    }

                }
            );

        }

    }


    /* ========================================================
       FORM SUBMISSION
       ======================================================== */

    if (form) {

        /* Use our own validation so the visitor receives the
           same guided error experience across browsers. */

        form.noValidate = true;

        form.addEventListener(
            'submit',
            handleRegistration
        );

    }


    /*
     * If the existing CTA is a non-submit button, make it a
     * reliable form trigger without changing the HTML.
     */

    if (
        beginButton &&
        form &&
        beginButton.type !== 'submit'
    ) {

        beginButton.addEventListener(
            'click',
            handleRegistration
        );

    }


    /* ========================================================
       REGISTRATION
       ======================================================== */

    async function handleRegistration(event) {

        event.preventDefault();


        /* ----------------------------------------------------
           Prevent duplicate submissions, including synthetic
           submit events that may occur while the request is
           already in flight.
           ---------------------------------------------------- */

        if (isSubmitting) {
            return;
        }


        clearErrors();


        /* ----------------------------------------------------
           Confirm required DOM elements exist before reading
           values. This keeps the page defensive without adding
           console errors in production.
           ---------------------------------------------------- */

        const requiredFields = [
            fields.fullName,
            fields.mobile,
            fields.email,
            fields.district,
            fields.consent
        ];


        if (requiredFields.some(function (field) {
            return !field;
        })) {

            showStatus(
                'இந்தப் பக்கத்தை இப்போது தொடர முடியவில்லை. Please refresh and try again.',
                'error'
            );

            return;

        }


        /* ----------------------------------------------------
           READ FORM VALUES
           ---------------------------------------------------- */

        const fullName =
            fields.fullName.value.trim();

        const mobile =
            fields.mobile.value.trim();

        const email =
            fields.email.value.trim();

        const district =
            fields.district.value.trim();

        const state =
            fields.state
                ? fields.state.value.trim()
                : '';

        const consent =
            fields.consent.checked;


        /* ----------------------------------------------------
           VALIDATION
           ---------------------------------------------------- */

        let valid = true;


        if (!fullName) {

            showFieldError(
                'fullName',
                'fullNameError',
                'Please enter your name.'
            );

            valid = false;

        }


        if (!mobile) {

            showFieldError(
                'mobile',
                'mobileError',
                'Please enter your WhatsApp number.'
            );

            valid = false;

        }
        else if (!isValidMobile(mobile)) {

            showFieldError(
                'mobile',
                'mobileError',
                'Please enter a valid WhatsApp number.'
            );

            valid = false;

        }


        if (!email) {

            showFieldError(
                'email',
                'emailError',
                'Please enter your email address.'
            );

            valid = false;

        }
        else if (!isValidEmail(email)) {

            showFieldError(
                'email',
                'emailError',
                'Please enter a valid email address.'
            );

            valid = false;

        }


        if (!district) {

            showFieldError(
                'district',
                'districtError',
                'Please enter your district.'
            );

            valid = false;

        }


        if (!consent) {

            showStatus(
                'Please accept the consent before continuing.',
                'error'
            );

            valid = false;

        }


        if (!valid) {

            focusFirstInvalidField();

            return;

        }


        /* ----------------------------------------------------
           BACKEND CONFIGURATION CHECK
           ---------------------------------------------------- */

        if (
            !CONFIG.BACKEND_URL ||
            CONFIG.BACKEND_URL.includes(
                'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE'
            )
        ) {

            showStatus(
                'Backend is not connected yet. Please configure the Apps Script Web App URL.',
                'error'
            );

            return;

        }


        /* ----------------------------------------------------
           LOCK THE JOURNEY ENTRANCE
           ---------------------------------------------------- */

        isSubmitting = true;

        setLoading(true);

        showStatus(
            'உங்கள் பயணம் தொடங்கப்படுகிறது... Please wait...',
            ''
        );


        /* ----------------------------------------------------
           PAYLOAD
           ---------------------------------------------------- */

        const payload = {

            action:
                'createParticipant',

            fullName:
                fullName,

            email:
                email,

            mobile:
                mobile,

            district:
                district,

            state:
                state || 'Tamil Nadu',

            referralSource:
                'Website',

            language:
                'ta-en',

            device:
                getDeviceType(),

            currentPage:
                0,

            completionStatus:
                'STARTED',

            startedAt:
                new Date().toISOString()

        };


        /* ----------------------------------------------------
           SEND TO BACKEND
           ---------------------------------------------------- */

        try {

            const result =
                await sendToBackend(payload);


            /* ------------------------------------------------
               BACKEND FAILURE
               ------------------------------------------------ */

            if (
                !result ||
                result.success === false
            ) {

                throw new Error(
                    result && result.message
                        ? result.message
                        : 'Registration failed. Your details were not saved.'
                );

            }


            /* ------------------------------------------------
               GET VISITOR ID
               ------------------------------------------------ */

            const visitorId =
                result &&
                (
                    result.visitorId ||
                    result.VisitorID ||
                    result.id
                );


            /*
             * A valid VisitorID is required.
             * We do not create a temporary ID here.
             */

            if (!visitorId) {

                throw new Error(
                    'The server did not return a Visitor ID. Your details may not have been saved.'
                );

            }


            /* ------------------------------------------------
               SAVE VISITOR ID
               ------------------------------------------------ */

            localStorage.setItem(
                'ctmVisitorId',
                visitorId
            );


            /* ------------------------------------------------
               SAVE PARTICIPANT LOCALLY
               ------------------------------------------------ */

            localStorage.setItem(
                'ctmParticipant',
                JSON.stringify({

                    visitorId:
                        visitorId,

                    fullName:
                        fullName,

                    email:
                        email,

                    mobile:
                        mobile,

                    district:
                        district,

                    state:
                        state || 'Tamil Nadu',

                    referralSource:
                        'Website'

                })
            );


            /* ------------------------------------------------
               SUCCESS
               ------------------------------------------------ */

            showStatus(
                'பயணம் தொடங்குகிறது... Journey begins...',
                'success'
            );


            /* ------------------------------------------------
               MOVE TO CLEAN /01 ROUTE
               ------------------------------------------------ */

            navigateToFirstPage();

        }
        catch (error) {

            const message =
                error && error.message
                    ? error.message
                    : 'Unable to connect to the server. Please try again.';

            showStatus(
                message,
                'error'
            );

            setLoading(false);

            isSubmitting = false;

        }

    }


    /* ========================================================
       BACKEND REQUEST
       ======================================================== */

    async function sendToBackend(payload) {

        const response =
            await fetch(
                CONFIG.BACKEND_URL,
                {

                    method:
                        'POST',

                    headers:
                        {
                            'Content-Type':
                                'text/plain;charset=utf-8'
                        },

                    body:
                        JSON.stringify(payload)

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

            throw new Error(
                'The server returned an empty response.'
            );

        }


        try {

            return JSON.parse(text);

        }
        catch (error) {

            throw new Error(
                'The server returned an invalid response.'
            );

        }

    }


    /* ========================================================
       NAVIGATION
       ======================================================== */

    function navigateToFirstPage() {

        const delay =
            prefersReducedMotion()
                ? 0
                : 650;


        window.setTimeout(
            function () {

                window.location.assign(
                    CONFIG.FIRST_PAGE
                );

            },
            delay
        );

    }


    /* ========================================================
       VALIDATION HELPERS
       ======================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    function isValidMobile(mobile) {

        const digits =
            mobile.replace(/\D/g, '');

        return (
            digits.length >= 10 &&
            digits.length <= 15
        );

    }


    /* ========================================================
       UI HELPERS
       ======================================================== */

    function showFieldError(
        fieldId,
        elementId,
        message
    ) {

        const field =
            document.getElementById(fieldId);

        const element =
            document.getElementById(elementId);


        if (field) {

            field.setAttribute(
                'aria-invalid',
                'true'
            );

        }


        if (element) {

            element.textContent =
                message;

        }

    }


    function clearFieldError(
        fieldId,
        elementId
    ) {

        const field =
            document.getElementById(fieldId);

        const element =
            document.getElementById(elementId);


        if (field) {

            field.setAttribute(
                'aria-invalid',
                'false'
            );

        }


        if (element) {

            element.textContent = '';

        }

    }


    function clearErrors() {

        document
            .querySelectorAll('.field-error')
            .forEach(
                function (element) {

                    element.textContent = '';

                }
            );


        [
            'fullName',
            'mobile',
            'email',
            'district'
        ].forEach(
            function (fieldId) {

                const field =
                    document.getElementById(fieldId);

                if (field) {

                    field.setAttribute(
                        'aria-invalid',
                        'false'
                    );

                }

            }
        );


        if (formStatus) {

            formStatus.textContent = '';

            formStatus.className =
                'form-status';

        }

    }


    function showStatus(
        message,
        type
    ) {

        if (!formStatus) {
            return;
        }

        formStatus.textContent =
            message;

        formStatus.className =
            'form-status ' +
            (type || '');

    }


    function focusFirstInvalidField() {

        const invalidField =
            [
                fields.fullName,
                fields.mobile,
                fields.email,
                fields.district
            ].find(
                function (field) {

                    return field &&
                        field.getAttribute('aria-invalid') === 'true';

                }
            );


        if (invalidField) {

            invalidField.focus({
                preventScroll: true
            });

            scrollElementIntoView(
                invalidField
            );

            return;

        }


        if (
            fields.consent &&
            !fields.consent.checked
        ) {

            fields.consent.focus({
                preventScroll: true
            });

            scrollElementIntoView(
                fields.consent
            );

        }

    }


    function scrollElementIntoView(element) {

        if (!element) {
            return;
        }

        element.scrollIntoView({

            behavior: prefersReducedMotion()
                ? 'auto'
                : 'smooth',

            block: 'center',

            inline: 'nearest'

        });

    }


    /* ========================================================
       LOADING STATE
       ======================================================== */

    function setLoading(loading) {

        if (!beginButton) {
            return;
        }


        beginButton.disabled =
            loading;

        beginButton.setAttribute(
            'aria-busy',
            loading ? 'true' : 'false'
        );


        if (form) {

            form.setAttribute(
                'aria-busy',
                loading ? 'true' : 'false'
            );

        }


        const tamilText =
            beginButton.querySelector(
                '.button-tamil'
            );

        const englishText =
            beginButton.querySelector(
                '.button-english'
            );


        if (loading) {

            if (tamilText) {

                tamilText.textContent =
                    'தயவுசெய்து காத்திருக்கவும்...';

            }


            if (englishText) {

                englishText.textContent =
                    'SAVING YOUR DETAILS...';

            }

        }
        else {

            if (tamilText) {

                tamilText.textContent =
                    'என் பயணத்தைத் தொடங்குகிறேன்';

            }


            if (englishText) {

                englishText.textContent =
                    'BEGIN MY JOURNEY →';

            }

        }

    }


    /* ========================================================
       DEVICE TYPE
       ======================================================== */

    function getDeviceType() {

        const width =
            window.innerWidth;

        if (width <= 600) {
            return 'Mobile';
        }

        if (width <= 1024) {
            return 'Tablet';
        }

        return 'Desktop';

    }


    /* ========================================================
       INITIALISE
       ======================================================== */

    initialiseAccessibility();

    initialiseFieldListeners();

    initialiseScrollPosition();


    /* --------------------------------------------------------
       Handle browser back-forward cache restores. The Index
       remains the controlled starting point of the journey.
       -------------------------------------------------------- */

    window.addEventListener(
        'pageshow',
        function () {

            if (!isSubmitting) {
                initialiseScrollPosition();
            }

        },
        { passive: true }
    );

})();


/* ============================================================
   END
   ============================================================ */
