//Start setting Box
//Check The Storage
if (localStorage.getItem("color")) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color"));
    document.querySelectorAll(".colors-list li").forEach(li => {
        li.classList.remove("active");
        if (li.dataset.color === localStorage.getItem("color")) {
            li.classList.add("active");
        }
    });
};
//Add Click Event To Colors
document.querySelector(".icon").onclick = () => {
    document.querySelector(".gear").classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
};
document.querySelectorAll(".colors-list li").forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        activeHandler(e);
        //Storage The Colors 
        localStorage.setItem("color", e.target.dataset.color);
    });
});
//Variables
let landingPage = document.querySelector(".landing-page"),
    imgsArr = ["L1.jpg", "L2.jpg", "L3.jpg", "L4.jpg", "L5.jpg", "L6.jpg"],
    randomImg,
    randomInterval,
    runBack = true;
//Check The Storage
if (localStorage.getItem("background")) {
    document.querySelectorAll(".random-backgrounds span").forEach(s => {
        s.classList.remove("active");
        if (s.dataset.back === localStorage.getItem("background")) {
            s.classList.add("active");
        };
        if (localStorage.getItem("background") === "stop") {
            clearInterval(randomInterval);
            runBack = false;
            landingPage.style.backgroundImage = `url("imgs/` + imgsArr[0] + `")`;
        }
    });
};
//Randomize Background
document.querySelectorAll(".random-backgrounds span").forEach(c => {
    c.addEventListener("click", (e) => {
        document.querySelectorAll(".random-backgrounds span").forEach(c => {
            c.classList.remove("active");
        });
        e.target.classList.add("active");
        if (e.target.dataset.back === "stop") {
            clearInterval(randomInterval);
            runBack = false;
            landingPage.style.backgroundImage = `url("imgs/` + imgsArr[0] + `")`;
        } else {
            randomaizeBack();
        };
        localStorage.setItem("background", e.target.dataset.back);
    });
});
//Reset
let reset = document.querySelector(".reset span");
reset.onclick = () => {
    localStorage.clear();
    window.location.reload();
}
//End setting Box
// Start Scroll To Section
let bulletsDiv = document.querySelector(".nav-bullets"),
    navBullets = document.querySelectorAll(".nav-bullets .bullet"),
    links = document.querySelectorAll(".links a");
scrollToSection(navBullets);
scrollToSection(links);
document.querySelectorAll(".show-bullets span").forEach(b => {
    b.addEventListener("click", e => {
        activeHandler(e);
        if (e.target.dataset.bullet === "none") {
            bulletsDiv.style.display = "none";
        } else {
            bulletsDiv.style.display = "block";
        }
        localStorage.setItem("bullets", e.target.dataset.bullet);
    });
});
//check The Storage
if (localStorage.getItem("bullets")) {
    bulletsDiv.style.display = localStorage.getItem("bullets");
    document.querySelectorAll(".show-bullets span").forEach(b => {
        b.classList.remove("active");
        if (localStorage.getItem("bullets") === "block") {
            document.querySelector(".show-bullets .yes").classList.add("active");
        } else {
            document.querySelector(".show-bullets .no").classList.add("active");
        }
    })
}
// Start Landing
//Start Toggle Menu
let toggleMenu = document.querySelector(".toggle-menu"),
    toggleSpan = document.querySelectorAll(".toggle-menu span"),
    toggleLinks = document.querySelector(".header .links");
toggleMenu.onclick = (e) => {
    e.stopPropagation();
    toggleLinks.classList.toggle("open");
    toggleMenu.classList.toggle("menu-active");
};
toggleLinks.onclick = (e) => {
    e.stopPropagation();
}
window.onclick = (e) => {
    if (e.target !== toggleMenu || e.target !== toggleLinks) {
        toggleLinks.classList.remove("open");
        toggleMenu.classList.remove("menu-active");
    }
}
//End Toggle
function randomaizeBack() {
    randomInterval = setInterval(() => {
        randomImg = Math.floor(Math.random() * imgsArr.length);
        landingPage.style.backgroundImage = `url("imgs/` + imgsArr[randomImg] + `")`;
    }, 10000);
};
if (runBack === true) {
    randomaizeBack();
};
// End Landing
//Start Our Skills
let skills = document.querySelector(".our-skills"),
    progress = document.querySelectorAll(".our-skills .progress span");
window.onscroll = () => {
    if (window.scrollY > (skills.offsetTop + skills.offsetHeight - this.innerHeight)) {
        progress.forEach(p => {
            p.style.width = p.dataset.progress;
        });
    };
};
//End Our Skills
// Start Gallery
let imgsBox = document.querySelectorAll(".img-box"),
    galleryImgs = document.querySelectorAll(".img-box img");
galleryImgs.forEach(img => {
    img.addEventListener("click", (e) => {
        //overlay
        let galleryOverlay = document.createElement("div");
        galleryOverlay.className = "gallery-overlay";
        document.body.appendChild(galleryOverlay);
        //popup
        let galleryPopup = document.createElement("div");
        galleryPopup.className = "gallery-popup";
        let popupImg = document.createElement("img");
        popupImg.src = e.target.src;
        galleryPopup.appendChild(popupImg);
        document.body.appendChild(galleryPopup);
        let imgCaption = document.createElement("h3");
        if (e.target.alt !== null) {
            let imgText = document.createTextNode(e.target.alt);
            imgCaption.appendChild(imgText);
        };
        galleryPopup.prepend(imgCaption);
        //Close Button
        let closeButton = document.createElement("span");
        closeButton.className = "close-button";
        closeButton.textContent = "X";
        galleryPopup.prepend(closeButton);
    });
});
document.addEventListener("click", (e) => {
    if (e.target.className === "close-button") {
        e.target.parentElement.remove();
        document.querySelector(".gallery-overlay").remove();
    };
});
// End Gallery
// Handle functions
function scrollToSection(elements) {
    elements.forEach(ele => {
        ele.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
};
function activeHandler(e) {
    e.target.parentElement.querySelectorAll(".active").forEach(el => {
        el.classList.remove("active");
    });
    e.target.classList.add("active");
};