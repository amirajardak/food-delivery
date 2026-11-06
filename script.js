
/* =========================================
   FOOD DELIVERY - SCRIPT PRINCIPAL
========================================= */

(() => {
    "use strict";

    /* =====================================
       1. ANIMATION PIZZA AU SCROLL
    ===================================== */

    const video = document.getElementById("pizza-video");
    const track = document.getElementById("scroll-track");

    if (video && track) {
        let duration = 10.026667;
        let desiredTime = 0;
        let raf = null;
        let seeking = false;

        video.pause();
        video.preload = "auto";

        function updateScroll() {
            const rect = track.getBoundingClientRect();

            const scrollRange = Math.max(
                1,
                track.offsetHeight - window.innerHeight
            );

            const progress = Math.max(
                0,
                Math.min(1, -rect.top / scrollRange)
            );

            desiredTime = progress * Math.max(0, duration - 0.04);

            scheduleSync();
        }

        function scheduleSync() {
            if (raf === null) {
                raf = requestAnimationFrame(syncVideo);
            }
        }

        function syncVideo() {
            raf = null;

            if (video.readyState < 1 || seeking) {
                return;
            }

            if (Math.abs(video.currentTime - desiredTime) > 0.035) {
                seeking = true;

                try {
                    video.currentTime = desiredTime;
                } catch (error) {
                    seeking = false;
                    console.warn("Erreur vidéo :", error);
                }
            }
        }

        video.addEventListener("loadedmetadata", () => {
            if (
                Number.isFinite(video.duration) &&
                video.duration > 0
            ) {
                duration = video.duration;
            }

            updateScroll();
        });

        video.addEventListener("loadeddata", updateScroll);

        video.addEventListener("seeked", () => {
            seeking = false;
            scheduleSync();
        });

        window.addEventListener("scroll", updateScroll, {
            passive: true
        });

        window.addEventListener("resize", updateScroll);

        window.addEventListener("load", updateScroll);

        updateScroll();
    }

    /* =====================================
       2. PANIER
    ===================================== */

    let count = 0;

    const cartCount = document.getElementById("cart-count");

    document.querySelectorAll(".add").forEach(button => {
        button.addEventListener("click", () => {
            count++;

            if (cartCount) {
                cartCount.textContent = `(${count})`;
            }

            button.textContent = "✓";

            setTimeout(() => {
                button.textContent = "+";
            }, 700);
        });
    });

    /* =====================================
       3. FILTRES PRODUITS
    ===================================== */

    const filterButtons = document.querySelectorAll("[data-filter]");
    const products = document.querySelectorAll(".product");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach(item => {
                item.classList.toggle(
                    "active",
                    item === button
                );
            });

            products.forEach(product => {
                product.hidden =
                    selectedFilter !== "all" &&
                    product.dataset.type !== selectedFilter;
            });
        });
    });

    /* =====================================
       4. MENU DÉROULANT
    ===================================== */

    const dropdown = document.querySelector(".nav-dropdown");
    const dropdownBtn = document.querySelector(".nav-dropdown-btn");

    if (dropdown && dropdownBtn) {
        dropdownBtn.addEventListener("click", () => {
            const isOpen = dropdown.classList.toggle("is-open");

            dropdownBtn.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });

        document.addEventListener("click", event => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove("is-open");
                dropdownBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                dropdown.classList.remove("is-open");
                dropdownBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    }

    /* =====================================
       5. ICÔNES LUCIDE
    ===================================== */

    if (window.lucide) {
        window.lucide.createIcons();
    }

})();
