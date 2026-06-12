window.initializeScrollReveal = () => {

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal")
        .forEach(el => revealObserver.observe(el));
};


/* PARALLAX BACKGROUND */
window.initializeParallax = () => {

    const bg = document.querySelector(".parallax-bg");
    const section = document.querySelector(".testimonials");

    if (!bg || !section) return;

    window.addEventListener("scroll", () => {

        const rect = section.getBoundingClientRect();

        const speed = 0.4;
        const offset = rect.top * speed;

        bg.style.transform = `translateY(${offset}px)`;
    }, { passive: true });
};


function initNavIndicator() {

    const links = document.querySelectorAll(".nav-container a");
    const indicator = document.getElementById("navIndicator");

    if (!indicator || links.length === 0) return;

    function moveIndicator(el) {
        if (!el) return;

        indicator.style.width = el.offsetWidth + "px";
        indicator.style.left = el.offsetLeft + "px";
    }

    links.forEach(link => {
        link.addEventListener("click", () => {
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
            moveIndicator(link);
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const id = entry.target.id;
                const activeLink = document.querySelector(
                    `.nav-container a[data-target="${id}"]`
                );

                if (activeLink) {
                    links.forEach(l => l.classList.remove("active"));
                    activeLink.classList.add("active");
                    moveIndicator(activeLink);
                }
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll("section").forEach(sec => observer.observe(sec));

    const first = document.querySelector(".nav-container a");
    moveIndicator(first);
}

/* WAIT FOR DOM READY */
window.addEventListener("load", initNavIndicator);