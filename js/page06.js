/* ============================================================
   CTM PATH™ MILLIONAIRES™
   PAGE 06 — UMBAR AVAI™ / HEALER KING RAPHAEL RAJ
   COMPLETE REPLACEMENT
   ============================================================ */

(function () {
    "use strict";

    /* =========================================================
       PAGE CONFIGURATION
       ========================================================= */

    const PAGE_NUMBER = 6;
    const TOTAL_PAGES = 16;

    const PREVIOUS_PAGE = "05.html";
    const NEXT_PAGE = "07.html";


    /* =========================================================
       INITIALISE PAGE
       ========================================================= */

    document.addEventListener("DOMContentLoaded", function () {

        initialisePage();

    });


    function initialisePage() {

        setupNavigation();

        setupKeyboardNavigation();

        setupImageProtection();

        setupSectionReveal();

        scrollToTop();

        markPageReady();

    }


    /* =========================================================
       PAGE READY STATE
       ========================================================= */

    function markPageReady() {

        document.body.classList.add("page06-ready");

        document.body.dataset.page = String(PAGE_NUMBER);

        document.body.dataset.totalPages = String(TOTAL_PAGES);

    }


    /* =========================================================
       NAVIGATION
       ========================================================= */

    function setupNavigation() {

        const previousButton =
            document.querySelector(".nav-previous");

        const nextButton =
            document.querySelector(".nav-next");


        /* -----------------------------------------------------
           PREVIOUS PAGE
           ----------------------------------------------------- */

        if (previousButton) {

            previousButton.addEventListener("click", function (event) {

                event.preventDefault();

                navigateToPage(PREVIOUS_PAGE);

            });

        }


        /* -----------------------------------------------------
           NEXT PAGE
           ----------------------------------------------------- */

        if (nextButton) {

            nextButton.addEventListener("click", function (event) {

                event.preventDefault();

                navigateToPage(NEXT_PAGE);

            });

        }

    }


    /* =========================================================
       PAGE NAVIGATION FUNCTION
       ========================================================= */

    function navigateToPage(page) {

        if (!page) {
            return;
        }

        /*
         * Store the destination so the next page can optionally
         * restore the intended navigation state.
         */

        try {

            sessionStorage.setItem(
                "ctmPathPreviousPage",
                String(PAGE_NUMBER)
            );

        } catch (error) {

            /*
             * sessionStorage may be unavailable in restricted
             * browser environments. Navigation should continue.
             */

        }


        window.location.href = page;

    }


    /* =========================================================
       KEYBOARD NAVIGATION
       ========================================================= */

    function setupKeyboardNavigation() {

        document.addEventListener("keydown", function (event) {

            /*
             * Do not hijack keyboard arrows when the user is
             * interacting with an input, textarea, select, etc.
             */

            const activeElement = document.activeElement;

            if (activeElement) {

                const tagName =
                    activeElement.tagName.toLowerCase();

                if (
                    tagName === "input" ||
                    tagName === "textarea" ||
                    tagName === "select" ||
                    tagName === "button"
                ) {
                    return;
                }

            }


            /* -------------------------------------------------
               LEFT ARROW → PAGE 05
               ------------------------------------------------- */

            if (event.key === "ArrowLeft") {

                event.preventDefault();

                navigateToPage(PREVIOUS_PAGE);

            }


            /* -------------------------------------------------
               RIGHT ARROW → PAGE 07
               ------------------------------------------------- */

            if (event.key === "ArrowRight") {

                event.preventDefault();

                navigateToPage(NEXT_PAGE);

            }

        });

    }


    /* =========================================================
       SCROLL TO TOP
       ========================================================= */

    function scrollToTop() {

        /*
         * Always start Page 06 at the top.
         *
         * This prevents the browser from restoring the previous
         * page's scroll position when moving between pages.
         */

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });

        /*
         * Some browsers restore scroll position after DOM load.
         * Run a second correction immediately after rendering.
         */

        requestAnimationFrame(function () {

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant"
            });

        });

    }


    /* =========================================================
       RAPHAEL RAJ IMAGE PROTECTION
       ========================================================= */

    function setupImageProtection() {

        const image =
            document.querySelector(".raphael-image");

        if (!image) {
            return;
        }


        /* -----------------------------------------------------
           IMAGE SUCCESS
           ----------------------------------------------------- */

        image.addEventListener("load", function () {

            image.classList.add("image-loaded");

            image.classList.remove("image-error");

        });


        /* -----------------------------------------------------
           IMAGE FAILURE
           ----------------------------------------------------- */

        image.addEventListener("error", function () {

            image.classList.add("image-error");

            /*
             * Do not replace the source automatically.
             *
             * The project uses:
             *
             * assets/raphaelraj.png
             *
             * If the image is unavailable, keeping the broken
             * state visible makes the missing asset immediately
             * identifiable during deployment testing.
             */

            console.warn(
                "CTM PATH™ Page 06: raphaelraj.png could not be loaded."
            );

        });


        /*
         * Handle the case where the browser already completed
         * loading before the listener was attached.
         */

        if (image.complete) {

            if (image.naturalWidth > 0) {

                image.classList.add("image-loaded");

            } else {

                image.classList.add("image-error");

            }

        }

    }


    /* =========================================================
       SECTION REVEAL
       ========================================================= */

    function setupSectionReveal() {

        /*
         * Respect users who have requested reduced motion.
         */

        if (
            window.matchMedia &&
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {

            revealAllSections();

            return;

        }


        const sections =
            document.querySelectorAll(
                ".page06-intro, " +
                ".raphael-profile, " +
                ".contribution-section, " +
                ".umbar-avai-section, " +
                ".three-pillars, " +
                ".page06-closing"
            );


        if (!sections.length) {
            return;
        }


        /*
         * Initial state.
         */

        sections.forEach(function (section) {

            section.classList.add("page06-reveal");

        });


        /*
         * IntersectionObserver gives us a lightweight,
         * framework-free reveal system.
         */

        if ("IntersectionObserver" in window) {

            const observer =
                new IntersectionObserver(
                    function (entries, observerInstance) {

                        entries.forEach(function (entry) {

                            if (!entry.isIntersecting) {
                                return;
                            }

                            entry.target.classList.add(
                                "page06-visible"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );

                        });

                    },
                    {
                        threshold: 0.12,
                        rootMargin: "0px 0px -40px 0px"
                    }
                );


            sections.forEach(function (section) {

                observer.observe(section);

            });

        } else {

            revealAllSections();

        }

    }


    /* =========================================================
       REVEAL FALLBACK
       ========================================================= */

    function revealAllSections() {

        const sections =
            document.querySelectorAll(
                ".page06-reveal"
            );

        sections.forEach(function (section) {

            section.classList.add("page06-visible");

        });

    }


    /* =========================================================
       OPTIONAL ACCESSIBLE PAGE STATUS
       ========================================================= */

    function exposePageStatus() {

        const currentPage =
            document.querySelector(".nav-current");

        if (!currentPage) {
            return;
        }

        currentPage.setAttribute(
            "aria-label",
            "Page " +
            PAGE_NUMBER +
            " of " +
            TOTAL_PAGES
        );

    }


    /* =========================================================
       PAGE STATUS INITIALISATION
       ========================================================= */

    exposePageStatus();


})();
