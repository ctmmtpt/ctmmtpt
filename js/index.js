
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   INDEX PAGE JAVASCRIPT
   ============================================================ */


/* ============================================================
   CONFIGURATION
   ============================================================ */

const CONFIG = {

    /*
     * IMPORTANT
     * ----------------------------------------------------------
     * Paste the deployed Google Apps Script Web App URL here.
     *
     * Example:
     * https://script.google.com/macros/s/XXXXXXXXXXXX/exec
     *
     * This URL must be the Web App deployment of the
     * CTM PATH™ backend.
     */

    BACKEND_URL:
        'https://script.google.com/macros/s/AKfycbx9eJru7EJYUpReeLv4Sym9wDVLgE_ruSw_ZUJ4ycDoneUKlkI_fcsJ2UJmKM7W_PXtEg/exec',


    /*
     * First assessment page.
     */

    FIRST_PAGE:
        'html/page01.html'

};


/* ============================================================
   DOM
   ============================================================ */

const form =
    document.getElementById('kycForm');

const beginButton =
    document.getElementById('beginButton');

const formStatus =
    document.getElementById('formStatus');


/* ============================================================
   SAFETY CHECK
   ============================================================ */

if (!form) {

    console.error(
        'CTM PATH™: kycForm was not found.'
    );

}

if (!beginButton) {

    console.error(
        'CTM PATH™: beginButton was not found.'
    );

}

if (!formStatus) {

    console.error(
        'CTM PATH™: formStatus was not found.'
    );

}


/* ============================================================
   FORM SUBMIT
   ============================================================ */

if (form) {

    form.addEventListener(
        'submit',
        handleRegistration
    );

}


/* ============================================================
   REGISTRATION
   ============================================================ */

async function handleRegistration(event) {

    event.preventDefault();


    /* --------------------------------------------------------
       CLEAR PREVIOUS ERRORS
       -------------------------------------------------------- */

    clearErrors();


    /* --------------------------------------------------------
       READ FORM VALUES
       -------------------------------------------------------- */

    const fullName =
        document
            .getElementById('fullName')
            .value
            .trim();


    const mobile =
        document
            .getElementById('mobile')
            .value
            .trim();


    const email =
        document
            .getElementById('email')
            .value
            .trim();


    const district =
        document
            .getElementById('district')
            .value
            .trim();


    const state =
        document
            .getElementById('state')
            .value
            .trim();


    const consent =
        document
            .getElementById('consent')
            .checked;


    /* --------------------------------------------------------
       VALIDATION
       -------------------------------------------------------- */

    let valid = true;


    if (!fullName) {

        showFieldError(
            'fullNameError',
            'Please enter your name.'
        );

        valid = false;

    }


    if (!mobile) {

        showFieldError(
            'mobileError',
            'Please enter your WhatsApp number.'
        );

        valid = false;

    }
    else if (!isValidMobile(mobile)) {

        showFieldError(
            'mobileError',
            'Please enter a valid WhatsApp number.'
        );

        valid = false;

    }


    if (!email) {

        showFieldError(
            'emailError',
            'Please enter your email address.'
        );

        valid = false;

    }
    else if (!isValidEmail(email)) {

        showFieldError(
            'emailError',
            'Please enter a valid email address.'
        );

        valid = false;

    }


    if (!district) {

        showFieldError(
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

        return;

    }


    /* --------------------------------------------------------
       BACKEND CONFIGURATION CHECK
       -------------------------------------------------------- */

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

        console.error(
            'CTM PATH™: BACKEND_URL has not been configured.'
        );

        return;

    }


    /* --------------------------------------------------------
       PREVENT DOUBLE SUBMISSION
       -------------------------------------------------------- */

    setLoading(true);


    showStatus(
        'உங்கள் பயணம் தொடங்கப்படுகிறது... Please wait...',
        ''
    );


    /* --------------------------------------------------------
       PAYLOAD
       -------------------------------------------------------- */

    const payload = {

        /*
         * Backend router action.
         */

        action:
            'createParticipant',


        /*
         * KYC
         */

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


        /*
         * Tracking
         */

        referralSource:
            'Website',


        language:
            'ta-en',


        device:
            getDeviceType(),


        /*
         * Journey state
         */

        currentPage:
            0,


        completionStatus:
            'STARTED',


        startedAt:
            new Date().toISOString()

    };


    /* --------------------------------------------------------
       SEND TO BACKEND
       -------------------------------------------------------- */

    try {

        const result =
            await sendToBackend(payload);


        console.log(
            'CTM PATH™ backend response:',
            result
        );


        /* ----------------------------------------------------
           BACKEND FAILURE
           ---------------------------------------------------- */

        if (
            !result ||
            result.success === false
        ) {

            throw new Error(
                result &&
                result.message
                    ? result.message
                    : 'Registration failed. Your details were not saved.'
            );

        }


        /* ----------------------------------------------------
           GET VISITOR ID
           ---------------------------------------------------- */

        const visitorId =
            result &&
            (
                result.visitorId ||
                result.VisitorID ||
                result.id
            );


        /*
         * A valid VisitorID is required.
         *
         * We do NOT create a temporary ID here.
         * The backend must successfully create the participant.
         */

        if (!visitorId) {

            throw new Error(
                'The server did not return a Visitor ID. Your details may not have been saved.'
            );

        }


        /* ----------------------------------------------------
           SAVE VISITOR ID
           ---------------------------------------------------- */

        localStorage.setItem(
            'ctmVisitorId',
            visitorId
        );


        /* ----------------------------------------------------
           SAVE PARTICIPANT LOCALLY
           ---------------------------------------------------- */

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


        /* ----------------------------------------------------
           JOURNEY START SUCCESS
           ---------------------------------------------------- */

        showStatus(
            'பயணம் தொடங்குகிறது... Journey begins...',
            'success'
        );


        /* ----------------------------------------------------
           MOVE TO PAGE 01
           ---------------------------------------------------- */

        setTimeout(
            function () {

                window.location.href =
                    CONFIG.FIRST_PAGE;

            },
            700
        );

    }


    /* --------------------------------------------------------
       ERROR HANDLING
       -------------------------------------------------------- */

    catch (error) {

        console.error(
            'CTM PATH™ registration error:',
            error
        );


        showStatus(
            error &&
            error.message
                ? error.message
                : 'Unable to connect to the server. Please try again.',
            'error'
        );


        setLoading(false);

    }

}


/* ============================================================
   BACKEND REQUEST
   ============================================================ */

async function sendToBackend(payload) {


    /*
     * IMPORTANT
     * ----------------------------------------------------------
     * Apps Script Web Apps can respond with redirects.
     *
     * Using text/plain avoids unnecessary CORS preflight
     * behaviour and is appropriate for this JSON POST.
     */

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


    /* --------------------------------------------------------
       HTTP ERROR
       -------------------------------------------------------- */

    if (!response.ok) {

        throw new Error(
            `Server error: ${response.status}`
        );

    }


    /* --------------------------------------------------------
       READ RESPONSE
       -------------------------------------------------------- */

    const text =
        await response.text();


    if (!text) {

        throw new Error(
            'The server returned an empty response.'
        );

    }


    /* --------------------------------------------------------
       PARSE JSON
       -------------------------------------------------------- */

    try {

        return JSON.parse(text);

    }

    catch (error) {

        console.error(
            'Invalid backend response:',
            text
        );

        throw new Error(
            'The server returned an invalid response.'
        );

    }

}


/* ============================================================
   EMAIL VALIDATION
   ============================================================ */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* ============================================================
   MOBILE VALIDATION
   ============================================================ */

function isValidMobile(mobile) {

    const digits =
        mobile.replace(
            /\D/g,
            ''
        );

    return (
        digits.length >= 10 &&
        digits.length <= 15
    );

}


/* ============================================================
   UI HELPERS
   ============================================================ */

function showFieldError(
    elementId,
    message
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            message;

    }

}


/* ============================================================
   CLEAR ERRORS
   ============================================================ */

function clearErrors() {

    document
        .querySelectorAll(
            '.field-error'
        )
        .forEach(
            function (element) {

                element.textContent =
                    '';

            }
        );


    if (formStatus) {

        formStatus.textContent =
            '';

        formStatus.className =
            'form-status';

    }

}


/* ============================================================
   STATUS MESSAGE
   ============================================================ */

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


/* ============================================================
   LOADING STATE
   ============================================================ */

function setLoading(
    loading
) {

    if (!beginButton) {

        return;

    }


    beginButton.disabled =
        loading;


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


/* ============================================================
   DEVICE TYPE
   ============================================================ */

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


/* ============================================================
   END
   ============================================================ */
