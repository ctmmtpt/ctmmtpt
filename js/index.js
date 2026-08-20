
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   INDEX PAGE JAVASCRIPT
   ============================================================ */


/* ============================================================
   CONFIGURATION
   ============================================================ */

const CONFIG = {

    /*
     * Replace this with the deployed
     * Google Apps Script Web App URL.
     *
     * Example:
     *
     * https://script.google.com/macros/s/XXXXXXXXXXXX/exec
     */

    BACKEND_URL:
        'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE',


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
   FORM SUBMIT
   ============================================================ */

form.addEventListener(
    'submit',
    handleRegistration
);


/* ============================================================
   REGISTRATION
   ============================================================ */

async function handleRegistration(event) {

    event.preventDefault();


    clearErrors();


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


    /* --------------------------------------------------------
       SEND TO BACKEND
       -------------------------------------------------------- */

    try {

        const result =
            await sendToBackend(payload);


        /*
         * The backend should return:
         *
         * {
         *     success: true,
         *     visitorId: "CTM-XXXXXXXX",
         *     ...
         * }
         */


        if (
            result &&
            result.success === false
        ) {

            throw new Error(
                result.message ||
                'Registration failed.'
            );

        }


        /*
         * Save participant information locally
         * so Pages 01–15 can identify the visitor.
         */

        const visitorId =
            result &&
            (
                result.visitorId ||
                result.VisitorID ||
                result.id
            );


        if (visitorId) {

            localStorage.setItem(
                'ctmVisitorId',
                visitorId
            );

        }


        localStorage.setItem(
            'ctmParticipant',
            JSON.stringify({

                visitorId:
                    visitorId || '',

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


        /*
         * Move to Page 01.
         */

        showStatus(
            'பயணம் தொடங்குகிறது... Journey begins...',
            'success'
        );


        setTimeout(
            function () {

                window.location.href =
                    CONFIG.FIRST_PAGE;

            },
            500
        );


    }
    catch (error) {

        console.error(
            'CTM registration error:',
            error
        );


        showStatus(
            error.message ||
            'Unable to connect to the server. Please try again.',
            'error'
        );


        setLoading(false);

    }

}


/* ============================================================
   BACKEND REQUEST
   ============================================================ */

async function sendToBackend(payload) {


    if (
        !CONFIG.BACKEND_URL ||
        CONFIG.BACKEND_URL.includes(
            'PASTE_YOUR'
        )
    ) {

        /*
         * Development fallback.
         *
         * This prevents the page from becoming
         * unusable before the real Web App URL
         * is inserted.
         */

        console.warn(
            'Apps Script Web App URL has not been configured.'
        );


        return {

            success: true,

            visitorId:
                createTemporaryVisitorId(),

            developmentMode:
                true

        };

    }


    const response =
        await fetch(
            CONFIG.BACKEND_URL,
            {

                method: 'POST',

                headers: {

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

        return {

            success: true

        };

    }


    try {

        return JSON.parse(text);

    }
    catch (error) {

        console.warn(
            'Backend response was not JSON:',
            text
        );


        return {

            success: true

        };

    }

}


/* ============================================================
   VALIDATION HELPERS
   ============================================================ */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


function isValidMobile(mobile) {

    const digits =
        mobile.replace(/\D/g, '');

    return digits.length >= 10 &&
           digits.length <= 15;

}


/* ============================================================
   UI HELPERS
   ============================================================ */

function showFieldError(
    elementId,
    message
) {

    const element =
        document.getElementById(elementId);

    if (element) {

        element.textContent =
            message;

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


    formStatus.textContent = '';

    formStatus.className =
        'form-status';

}


function showStatus(
    message,
    type
) {

    formStatus.textContent =
        message;

    formStatus.className =
        'form-status ' +
        (type || '');

}


function setLoading(
    loading
) {

    beginButton.disabled =
        loading;


    if (loading) {

        beginButton.querySelector(
            '.button-tamil'
        ).textContent =
            'தயவுசெய்து காத்திருக்கவும்...';


        beginButton.querySelector(
            '.button-english'
        ).textContent =
            'SAVING YOUR DETAILS...';

    }
    else {

        beginButton.querySelector(
            '.button-tamil'
        ).textContent =
            'என் பயணத்தைத் தொடங்குகிறேன்';


        beginButton.querySelector(
            '.button-english'
        ).textContent =
            'BEGIN MY JOURNEY →';

    }

}


/* ============================================================
   DEVICE
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
   TEMPORARY DEVELOPMENT ID
   ============================================================ */

function createTemporaryVisitorId() {

    const date =
        new Date();


    const datePart =
        date
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, '');


    const randomPart =
        Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();


    return `CTM-${datePart}-${randomPart}`;

}
