document.addEventListener("DOMContentLoaded", () => {
    /* 1. Starry Sky & Floating Flower Petals Generation */
    const starsContainer = document.getElementById("stars");
    const petalsContainer = document.getElementById("petals");
    const starCount = window.innerWidth < 768 ? 50 : 120;
    const petalCount = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        const size = Math.random() * 2.5 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        starsContainer.appendChild(star);
    }

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        const width = Math.random() * 12 + 10;
        const height = width * 1.4;
        petal.style.width = `${width}px`;
        petal.style.height = `${height}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 8 + 7}s`;
        petal.style.animationDelay = `${Math.random() * 10}s`;
        petalsContainer.appendChild(petal);
    }

    /* 2. Loading Screen Sequence Functionality */
    const loadingItems = document.querySelectorAll(".loading-item");
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const bgAudio = document.getElementById("bg-audio");
    
    function startMemoriesSequence() {
        // Reset states
        loadingScreen.style.opacity = "1";
        loadingScreen.style.visibility = "visible";
        mainContent.classList.remove("visible-content");
        mainContent.classList.add("hidden-content");
        
        loadingItems.forEach(item => item.classList.remove("visible"));
        
        let delay = 500;
        loadingItems.forEach((item) => {
            setTimeout(() => {
                item.classList.add("visible");
            }, delay);
            delay += 600;
        });

        setTimeout(() => {
            loadingScreen.style.opacity = "0";
            loadingScreen.style.visibility = "hidden";
            mainContent.classList.remove("hidden-content");
            mainContent.classList.add("visible-content");
            
            // Trigger Hero Typewriter after loading screen fades away
            setTimeout(typeHeroTitle, 500);
        }, delay + 800);
    }

    // Start initial sequence sequence immediately
    startMemoriesSequence();

    /* 3. Audio Control System & Playback handling */
    const playPauseBtn = document.getElementById("play-pause-btn");
    const playIcon = document.getElementById("play-icon");
    const pauseIcon = document.getElementById("pause-icon");
    const muteBtn = document.getElementById("mute-btn");
    const muteIcon = document.getElementById("mute-icon");
    const volumeSlider = document.getElementById("volume-slider");
    let isPlaying = false;

    function playMusic() {
        bgAudio.play().then(() => {
            isPlaying = true;
            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");
        }).catch((err) => {
            console.log("Audio playback requires user interaction first.");
        });
    }

    function pauseMusic() {
        bgAudio.pause();
        isPlaying = false;
        playIcon.classList.remove("hidden");
        pauseIcon.classList.add("hidden");
    }

    playPauseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    muteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        bgAudio.muted = !bgAudio.muted;
        muteIcon.textContent = bgAudio.muted ? "🔇" : "🔊";
    });

    volumeSlider.addEventListener("input", (e) => {
        e.stopPropagation();
        bgAudio.volume = e.target.value;
        if (bgAudio.volume === 0) {
            muteIcon.textContent = "🔇";
        } else {
            muteIcon.textContent = "🔊";
            bgAudio.muted = false;
        }
    });

    function handleFirstInteraction() {
        if (!isPlaying) {
            playMusic();
        }
        document.removeEventListener("click", handleFirstInteraction);
        document.removeEventListener("keydown", handleFirstInteraction);
    }
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    /* 4. Hero Typewriter Effect */
    const textToType = "Hi Sayra 🌸";
    const typeTarget = document.getElementById("hero-title");
    const subtitle = document.querySelector(".hero-subtitle");
    let charIndex = 0;

    function typeHeroTitle() {
        typeTarget.textContent = "";
        charIndex = 0;
        subtitle.classList.remove("visible");
        
        function type() {
            if (charIndex < textToType.length) {
                typeTarget.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 120);
            } else {
                subtitle.classList.add("visible");
            }
        }
        type();
    }

    /* 5. Button Smooth Scroll to Gift Journey */
    document.getElementById("open-gift-btn").addEventListener("click", () => {
        const journeySection = document.querySelector(".journey");
        journeySection.scrollIntoView({ behavior: "smooth" });
    });

    /* 6. Mouse Glow Effect & Parallax (Desktop only) */
    const cursorGlow = document.getElementById("cursor-glow");
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener("mousemove", (e) => {
            cursorGlow.style.top = `${e.clientY}px`;
            cursorGlow.style.left = `${e.clientX}px`;
        });
    } else {
        cursorGlow.style.display = "none";
    }

    /* 7. Scroll Reveal Animation Setup */
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    let scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, observerOptions);

    revealElements.forEach(el => scrollObserver.observe(el));

    /* 8. Fullscreen Modal for Handwritten Poem */
    const poemFrame = document.getElementById("poem-frame");
    const modal = document.getElementById("image-modal");
    const fullPoemImg = document.getElementById("full-poem-img");
    const closeModal = document.getElementById("close-modal");
    const poemImgSrc = document.getElementById("poem-img").src;

    poemFrame.addEventListener("click", () => {
        fullPoemImg.src = poemImgSrc;
        modal.classList.remove("hidden");
        setTimeout(() => modal.classList.add("show"), 10);
        document.body.style.overflow = "hidden";
    });

    function hideModal() {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.classList.add("hidden");
            document.body.style.overflow = "auto";
        }, 400);
    }

    closeModal.addEventListener("click", hideModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show")) {
            hideModal();
        }
    });

    /* 9. Experience Relive Reset Action */
    const replayBtn = document.getElementById("replay-btn");
    replayBtn.addEventListener("click", () => {
        // Instantly snap scroll back to top window position
        window.scrollTo({ top: 0, behavior: "auto" });
        
        // Remove scroll animations classes to allow fresh re-triggers
        revealElements.forEach(el => el.classList.remove("active"));
        
        // Rerun memory loader process cleanly
        setTimeout(() => {
            startMemoriesSequence();
        }, 100);
    });
});
