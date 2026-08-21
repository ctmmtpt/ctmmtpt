
/* ============================================================
   CTM PATH™ MILLIONAIRES™ — PAGE 02
   12 BASIC LIFE NEEDS
   ============================================================ */

const CONFIG = {
    PAGE_NUMBER: 2,
    TOTAL_NEEDS: 12,
    PREVIOUS_PAGE: '01',
    NEXT_PAGE: '03',
    BACKEND_URL:
        'https://script.google.com/macros/s/AKfycbx9eJru7EJYUpReeLv4Sym9wDVLgE_ruSw_ZUJ4ycDoneUKlkI_fcsJ2UJmKM7W_PXtEg/exec'
};

const NEEDS = [
    {
        id: 'home',
        no: '01',
        ta: 'வீடு',
        en: 'HOME',
        questionTa: 'உங்கள் குடும்பத்தின் தேவைகளுக்கும் கனவுகளுக்கும் ஏற்ற ஒரு நல்ல வீடு உங்களிடம் உள்ளதா?',
        questionEn: 'Do you have the home you truly want for yourself and your family?'
    },
    {
        id: 'car',
        no: '02',
        ta: 'கார்',
        en: 'CAR',
        questionTa: 'உங்கள் குடும்பத்தின் தேவைக்கும் உங்கள் வாழ்க்கை முறைக்கும் ஏற்ற கார் உங்களிடம் உள்ளதா?',
        questionEn: "Do you have the car that suits your family's needs and lifestyle?"
    },
    {
        id: 'bike',
        no: '03',
        ta: 'பைக்',
        en: 'BIKE',
        questionTa: 'உங்கள் தனிப்பட்ட பயணம் மற்றும் அன்றாட தேவைகளுக்கு ஏற்ற இருசக்கர வாகனம் உங்களிடம் உள்ளதா?',
        questionEn: 'Do you have the two-wheeler you need for your daily life?'
    },
    {
        id: 'childrenEducation',
        no: '04',
        ta: 'குழந்தைகளின் கல்வி',
        en: "CHILDREN'S EDUCATION",
        questionTa: 'உங்கள் குழந்தைகளின் கல்வி மற்றும் எதிர்காலத்திற்கான தேவைகளை நீங்கள் நம்பிக்கையுடன் நிறைவேற்றி வருகிறீர்களா?',
        questionEn: 'Are you confident that you can provide the education and future opportunities your children deserve?'
    },
    {
        id: 'jewellery',
        no: '05',
        ta: 'நகை',
        en: 'JEWELLERY',
        questionTa: 'உங்கள் குடும்பத்தின் முக்கியமான நகை மற்றும் மதிப்புமிக்க பொருட்கள் தொடர்பான தேவைகள் நிறைவேறியுள்ளனவா?',
        questionEn: "Have your family's important jewellery and valuables needs been fulfilled?"
    },
    {
        id: 'debtFree',
        no: '06',
        ta: 'கடனில்லா வாழ்க்கை',
        en: 'DEBT-FREE LIFE',
        questionTa: 'உங்கள் தற்போதைய வாழ்க்கை தேவையற்ற கடன் சுமையிலிருந்து விடுபட்டுள்ளதா?',
        questionEn: 'Are you living with the level of financial freedom you want, without burdensome debt?'
    },
    {
        id: 'savings',
        no: '07',
        ta: 'சேமிப்பு',
        en: 'SAVINGS',
        questionTa: 'எதிர்பாராத சூழ்நிலைகளுக்கும் எதிர்கால இலக்குகளுக்கும் போதுமான சேமிப்பு உங்களிடம் உள்ளதா?',
        questionEn: 'Do you have sufficient savings for emergencies and future goals?'
    },
    {
        id: 'parents',
        no: '08',
        ta: 'பெற்றோரை கவனித்தல்',
        en: 'CARING FOR PARENTS',
        questionTa: 'உங்கள் பெற்றோருக்கு அவர்கள் தகுதியான பாதுகாப்பு, ஆதரவு மற்றும் கவனிப்பை வழங்க முடிகிறதா?',
        questionEn: 'Are you able to provide your parents with the care, support and security they deserve?'
    },
    {
        id: 'travel',
        no: '09',
        ta: 'சுற்றுலா',
        en: 'TRAVEL',
        questionTa: 'உங்களுக்கும் உங்கள் குடும்பத்திற்கும் விருப்பமான இடங்களுக்குச் சென்று அனுபவித்து மகிழும் சுதந்திரம் உங்களிடம் உள்ளதா?',
        questionEn: 'Do you have the freedom to travel and create experiences with your family?'
    },
    {
        id: 'healthcare',
        no: '10',
        ta: 'மருத்துவம்',
        en: 'HEALTHCARE',
        questionTa: 'உங்களுக்கும் உங்கள் குடும்பத்திற்கும் தேவையான தரமான மருத்துவப் பாதுகாப்பை நீங்கள் எளிதாகப் பெற முடிகிறதா?',
        questionEn: 'Can you access the quality healthcare your family needs without financial stress?'
    },
    {
        id: 'socialService',
        no: '11',
        ta: 'சமூக சேவை',
        en: 'SOCIAL SERVICE',
        questionTa: 'மற்றவர்களின் வாழ்க்கையில் மாற்றத்தை ஏற்படுத்தவும், சமூகத்திற்கு பங்களிக்கவும் உங்களிடம் வளமும் நேரமும் உள்ளதா?',
        questionEn: 'Do you have the time and resources to contribute meaningfully to society?'
    },
    {
        id: 'recreation',
        no: '12',
        ta: 'பொழுதுபோக்கு',
        en: 'RECREATION',
        questionTa: 'வேலை மற்றும் பொறுப்புகளுக்கு அப்பால், உங்களுக்காகவும் குடும்பத்திற்காகவும் மகிழ்ச்சியான நேரத்தை செலவிடுகிறீர்களா?',
        questionEn: 'Do you have enough time and freedom for recreation, joy and meaningful experiences?'
    }
];

const STATUS = {
    fulfilled: {
        value: 'FULLY_FULFILLED',
        ta: 'முழுமையாக',
        en: 'FULLY FULFILLED'
    },
    partial: {
        value: 'PARTIALLY_FULFILLED',
        ta: 'ஓரளவு',
        en: 'PARTIALLY FULFILLED'
    },
    pending: {
        value: 'NOT_YET_FULFILLED',
        ta: 'இன்னும் இல்லை',
        en: 'NOT YET FULFILLED'
    }
};

let answers = {};
let priority = '';

document.addEventListener('DOMContentLoaded', init);

function init() {
    renderNeeds();
    renderPriorityOptions();
    restoreLocalState();
    updateSummary();

    document.getElementById('previousButton')
        .addEventListener('click', goPrevious);

    document.getElementById('nextButton')
        .addEventListener('click', goNext);

    document.getElementById('priorityNeed')
        .addEventListener('change', function () {
            priority = this.value;
            saveLocalState();
        });
}

function renderNeeds() {
    const form = document.getElementById('needsForm');

    form.innerHTML = NEEDS.map(function (need) {
        return `
            <article class="need-card" data-need-id="${need.id}">
                <div class="need-top">
                    <div class="need-number">${need.no}</div>
                    <div>
                        <h3 class="need-title-ta">${need.ta}</h3>
                        <div class="need-title-en">${need.en}</div>
                    </div>
                </div>

                <p class="need-question-ta">${need.questionTa}</p>
                <p class="need-question-en">${need.questionEn}</p>

                <div class="status-options" role="group" aria-label="${need.en}">
                    ${renderStatusButton(need.id, 'fulfilled')}
                    ${renderStatusButton(need.id, 'partial')}
                    ${renderStatusButton(need.id, 'pending')}
                </div>

                <div id="readout-${need.id}" class="need-readout">
                    உங்கள் நிலை: —
                </div>
            </article>
        `;
    }).join('');

    form.querySelectorAll('.status-option').forEach(function (button) {
        button.addEventListener('click', function () {
            selectStatus(
                button.dataset.needId,
                button.dataset.status
            );
        });
    });
}

function renderStatusButton(needId, statusKey) {
    const item = STATUS[statusKey];

    return `
        <button
            type="button"
            class="status-option ${statusKey}"
            data-need-id="${needId}"
            data-status="${statusKey}"
            aria-pressed="false"
        >
            <span class="status-ta">${item.ta}</span>
            <span class="status-en">${item.en}</span>
        </button>
    `;
}

function renderPriorityOptions() {
    const select = document.getElementById('priorityNeed');

    NEEDS.forEach(function (need) {
        const option = document.createElement('option');
        option.value = need.id;
        option.textContent = `${need.ta} — ${need.en}`;
        select.appendChild(option);
    });
}

function selectStatus(needId, statusKey) {
    const need = NEEDS.find(function (item) {
        return item.id === needId;
    });

    if (!need || !STATUS[statusKey]) {
        return;
    }

    answers[needId] = statusKey;

    document.querySelectorAll(
        `.status-option[data-need-id="${needId}"]`
    ).forEach(function (button) {
        const selected = button.dataset.status === statusKey;

        button.classList.toggle('selected', selected);
        button.setAttribute('aria-pressed', String(selected));
    });

    const readout = document.getElementById(`readout-${needId}`);

    if (readout) {
        readout.textContent =
            `உங்கள் நிலை: ${STATUS[statusKey].ta}`;
        readout.classList.add('has-value');
    }

    saveLocalState();
    updateSummary();

    // Backend saving is secondary. A failure must not break the UI.
    saveAnswerToBackend(need, statusKey);
}

function updateSummary() {
    const values = Object.values(answers);

    const fulfilled = values.filter(
        value => value === 'fulfilled'
    ).length;

    const partial = values.filter(
        value => value === 'partial'
    ).length;

    const pending = values.filter(
        value => value === 'pending'
    ).length;

    const answered = values.length;
    const percent = Math.round(
        (answered / CONFIG.TOTAL_NEEDS) * 100
    );

    document.getElementById('fulfilledCount').textContent = fulfilled;
    document.getElementById('partialCount').textContent = partial;
    document.getElementById('pendingCount').textContent = pending;

    document.getElementById('completionText').textContent =
        `${answered} / ${CONFIG.TOTAL_NEEDS}`;

    document.getElementById('completionBar').style.width =
        `${percent}%`;
}

function saveLocalState() {
    localStorage.setItem(
        'ctmPage02Answers',
        JSON.stringify(answers)
    );

    localStorage.setItem(
        'ctmPage02Priority',
        priority
    );
}

function restoreLocalState() {
    try {
        const storedAnswers =
            localStorage.getItem('ctmPage02Answers');

        if (storedAnswers) {
            const parsed = JSON.parse(storedAnswers);

            if (
                parsed &&
                typeof parsed === 'object'
            ) {
                NEEDS.forEach(function (need) {
                    if (
                        ['fulfilled', 'partial', 'pending']
                            .includes(parsed[need.id])
                    ) {
                        answers[need.id] =
                            parsed[need.id];
                    }
                });
            }
        }

        priority =
            localStorage.getItem('ctmPage02Priority') || '';

        document.getElementById('priorityNeed').value =
            priority;

        NEEDS.forEach(function (need) {
            const selected = answers[need.id];

            if (selected) {
                const button =
                    document.querySelector(
                        `.status-option[data-need-id="${need.id}"][data-status="${selected}"]`
                    );

                if (button) {
                    button.classList.add('selected');
                    button.setAttribute(
                        'aria-pressed',
                        'true'
                    );
                }

                const readout =
                    document.getElementById(
                        `readout-${need.id}`
                    );

                if (readout) {
                    readout.textContent =
                        `உங்கள் நிலை: ${STATUS[selected].ta}`;
                    readout.classList.add('has-value');
                }
            }
        });
    }
    catch (error) {
        console.warn(
            'Unable to restore Page 02 state:',
            error
        );
    }
}

function getVisitorId() {
    return (
        localStorage.getItem('ctmVisitorId') || ''
    ).trim();
}

async function saveAnswerToBackend(need, statusKey) {
    const visitorId = getVisitorId();

    if (!visitorId) {
        return;
    }

    const item = STATUS[statusKey];

    const payload = {
        action: 'save_answer',
        data: {
            visitorId: visitorId,
            pageNumber: CONFIG.PAGE_NUMBER,
            questionId: need.id,
            question: `${need.ta} — ${need.en}`,
            answer: item.value,
            score: ''
        }
    };

    try {
        await fetch(
            CONFIG.BACKEND_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'text/plain;charset=utf-8'
                },
                body: JSON.stringify(payload)
            }
        );
    }
    catch (error) {
        console.warn(
            'Page 02 backend save failed:',
            error
        );
    }
}

async function savePageProgress() {
    const visitorId = getVisitorId();

    if (!visitorId) {
        return true;
    }

    const payload = {
        action: 'save_progress',
        data: {
            visitorId: visitorId,
            pageNumber: CONFIG.PAGE_NUMBER,
            answers: answers,
            priority: priority,
            completed: true
        }
    };

    try {
        const response = await fetch(
            CONFIG.BACKEND_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type':
                        'text/plain;charset=utf-8'
                },
                body: JSON.stringify(payload)
            }
        );

        if (!response.ok) {
            throw new Error(
                `Server error: ${response.status}`
            );
        }

        return true;
    }
    catch (error) {
        console.warn(
            'Page 02 progress save failed:',
            error
        );

        // Local state remains the source of continuity.
        return false;
    }
}

function setStatus(message, type) {
    const element =
        document.getElementById('pageStatus');

    if (!element) {
        return;
    }

    element.textContent = message;
    element.className =
        `page-status ${type || ''}`;
}

async function goPrevious() {
    saveLocalState();
    window.location.href = CONFIG.PREVIOUS_PAGE;
}

async function goNext() {
    const answered =
        Object.keys(answers).length;

    if (answered < CONFIG.TOTAL_NEEDS) {
        setStatus(
            'முதலில் 12 தேவைகளுக்கும் உங்கள் நிலையைத் தேர்வு செய்யுங்கள்.',
            'error'
        );

        const firstUnanswered =
            NEEDS.find(function (need) {
                return !answers[need.id];
            });

        if (firstUnanswered) {
            const card =
                document.querySelector(
                    `[data-need-id="${firstUnanswered.id}"]`
                );

            if (card) {
                card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }

        return;
    }

    if (!priority) {
        setStatus(
            'தொடர்வதற்கு முன் உங்கள் மிக முக்கியமான தேவையைத் தேர்வு செய்யுங்கள்.',
            'error'
        );

        document.getElementById('priorityNeed').focus();
        return;
    }

    const nextButton =
        document.getElementById('nextButton');

    nextButton.disabled = true;

    setStatus(
        'உங்கள் பதில்கள் பாதுகாக்கப்படுகின்றன... Saving your responses...',
        'loading'
    );

    saveLocalState();

    localStorage.setItem(
        'ctmPage02Summary',
        JSON.stringify({
            visitorId: getVisitorId(),
            pageNumber: CONFIG.PAGE_NUMBER,
            answers: answers,
            priority: priority,
            fulfilled: countStatus('fulfilled'),
            partial: countStatus('partial'),
            pending: countStatus('pending'),
            completed: true,
            completedAt: new Date().toISOString()
        })
    );

    await savePageProgress();

    setStatus(
        '✓ பதில்கள் பாதுகாக்கப்பட்டன / Responses saved',
        'success'
    );

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(function () {
        window.location.href = CONFIG.NEXT_PAGE;
    }, 450);
}

function countStatus(statusKey) {
    return Object.values(answers)
        .filter(value => value === statusKey)
        .length;
}
