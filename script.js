// --- 1. EASTER EGG (Console) ---
// Ispisujemo poruku samo ako stranica NIJE učitana unutar simulatora (iframe-a)
if (window.self === window.top) {
    const coffeeAscii = `
    (  )   (   )  )
     ) (   )  (  (
     ( )  (    ) )
    ____________
   |            |___
   |  SQL / CSS |   |
   |   COFFEE   |___|
   |____________|
   \\___________/
`;

    console.log(
        `%c${coffeeAscii}%c\n\nHello World! ☕️💻\n\n` +
        `We see you like inspecting code! As a fellow developer, here is a secret 10% discount code for your first visit to our cafe:\n\n` +
        `👉 %cCODE: COFFEE_AND_CODE_2026%c\n\n` +
        `Happy coding! 🚀`,
        "color: #ff7a00; font-family: monospace; font-weight: bold;",
        "color: #ffffff; font-family: 'Poppins', sans-serif; font-size: 14px;",
        "background: #ff7a00; color: #1a1e23; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-family: monospace;",
        "color: #ffffff; font-family: 'Poppins', sans-serif; font-size: 14px;"
    );
}


// --- 2. MUSIC PLAYER CONTROL ---
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

music.volume = 0.3;

musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicBtn.innerHTML = `<i class="fa-solid fa-pause"></i> Pause Lo-Fi`;
        musicBtn.style.background = "#ff7a00";
        musicBtn.style.color = "#1a1e23";
    } else {
        music.pause();
        musicBtn.innerHTML = `<i class="fa-solid fa-play"></i> Play Lo-Fi`;
        musicBtn.style.background = "rgba(255, 122, 0, 0.1)";
        musicBtn.style.color = "#ff7a00";
    }
});


// --- 3. RESPONSIVE NAVBAR & SCROLL ACTIVE LINKS ---
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
        const icon = menuBtn.querySelector("i");
        if (navbar.classList.contains("active")) {
            icon.classList.replace("fa-bars", "fa-xmark");
        } else {
            icon.classList.replace("fa-xmark", "fa-bars");
        }
    });
}

const navLinks = document.querySelectorAll(".navbar a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navbar.classList.contains("active")) {
            navbar.classList.remove("active");
            menuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");
        }
    });
});


// --- 4. CONTROLS FOR MOBILE PREVIEW SIMULATOR ---
const previewBtn = document.getElementById("preview-btn");
const phoneModal = document.getElementById("phone-modal");
const phoneCloseBtn = document.getElementById("phone-close-btn");
const phoneIframe = document.getElementById("phone-iframe");

// PREVENT RECURSION: 
if (window.self !== window.top) {
    if (previewBtn) previewBtn.style.display = "none";
}

if (previewBtn && phoneModal && phoneCloseBtn && phoneIframe) {
    // Open simulator
    previewBtn.addEventListener("click", () => {
        phoneIframe.src = window.location.href;
        phoneModal.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    // Close simulator
    phoneCloseBtn.addEventListener("click", () => {
        phoneModal.classList.remove("active");
        phoneIframe.src = "";
        document.body.style.overflow = "auto";
    });

    // Close simulator on outside click
    phoneModal.addEventListener("click", (e) => {
        if (e.target === phoneModal) {
            phoneModal.classList.remove("active");
            phoneIframe.src = "";
            document.body.style.overflow = "auto";
        }
    });
}


// --- 5. MENU TAB SWITCHER ---
const tabButtons = document.querySelectorAll(".tab-btn");
const menuContents = document.querySelectorAll(".menu-content");

if (tabButtons.length > 0 && menuContents.length > 0) {
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Reset active tabs and contents
            tabButtons.forEach(b => b.classList.remove("active"));
            menuContents.forEach(c => c.classList.remove("active"));

            // Activate current tab button
            btn.classList.add("active");
            
            // Show target content block
            const targetId = btn.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add("active");
            }
            
            // Refresh AOS layouts
            AOS.refresh();
        });
    });
}


// --- 6. INITIALIZE AOS (Animate On Scroll) ---
AOS.init({
    once: false,
    offset: 120,
});


// --- 7. SCROLL SPY (Praćenje aktivne sekcije prilikom skrolovanja) ---
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150; 
        const sectionId = current.getAttribute("id");
        
        // Povezujemo detekciju ID-eva sa odgovarajućim linkom u navigaciji
        let querySelectorString = `.navbar a[href*='${sectionId}']`;
        if (sectionId === "menu-cards") {
            querySelectorString = `.navbar a[href*='menu']`;
        }
        
        const navLink = document.querySelector(querySelectorString);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll(".navbar a").forEach(link => link.classList.remove("active"));
                navLink.classList.add("active");
            }
        }
    });
});