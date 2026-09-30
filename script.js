document.addEventListener("DOMContentLoaded", () => {

/* =========================================
HEADER / MOBILE MENU
========================================= */

const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

const isOpen = navLinks.classList.toggle("open");

menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

menuBtn.classList.toggle("active", isOpen);
});

/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

link.addEventListener("click", () => {

navLinks.classList.remove("open");
menuBtn.classList.remove("active");
menuBtn.setAttribute("aria-expanded", "false");

});

});

/* =========================================
HEADER SCROLL EFFECT
========================================= */

const scrollProgress = document.getElementById("scrollProgress");
const topBtn = document.getElementById("topBtn");

function handleScroll() {

const scrollTop = window.scrollY;
const documentHeight =
document.documentElement.scrollHeight - window.innerHeight;

const progress =
documentHeight > 0
? (scrollTop / documentHeight) * 100
: 0;

scrollProgress.style.width = ${progress}%`;

if (scrollTop > 50) {
header.classList.add("scrolled");
} else {
header.classList.remove("scrolled");
}

if (scrollTop > 500) {
topBtn.classList.add("show");
} else {
topBtn.classList.remove("show");
}

updateActiveNav();

}

window.addEventListener("scroll", handleScroll, { passive: true });

handleScroll();

/* =========================================
ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNav() {

let current = "home";

sections.forEach(section => {

const sectionTop = section.offsetTop - 150;

if (window.scrollY >= sectionTop) {
current = section.id;
}

});

navItems.forEach(item => {

item.classList.remove("active");

const href = item.getAttribute("href");

if (href === #${current}`) {
item.classList.add("active");
}

});

}

/* =========================================
BACK TO TOP
========================================= */

topBtn.addEventListener("click", () => {

window.scrollTo({
top: 0,
behavior: "smooth"
});

});

/* =========================================
REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
entries => {

entries.forEach(entry => {

if (entry.isIntersecting) {

entry.target.classList.add("visible");

revealObserver.unobserve(entry.target);

}

});

},
{
threshold: 0.12
}
);

revealElements.forEach(element => {
revealObserver.observe(element);
});

/* =========================================
PROJECT MODAL DATA
========================================= */

const projectData = {

cgpa: {
icon: "🎓",
title: "CGPA Grade Calculator",
text:
"A simple and accurate web-based CGPA calculator designed to help students calculate their academic grade and CGPA quickly.",
tech: ["HTML", "CSS", "JavaScript"]
},

bmi: {
icon: "●",
title: "BMI Calculator",
text:
"A lightweight Android application that calculates Body Mass Index from height and weight and provides a simple result for the user.",
tech: ["Java", "Android Studio", "Android"]
},

tajbih: {
icon: "☪",
title: "Digital Tajbih",
text:
"An Android dhikr and prayer-bead counter designed for simple and convenient digital tasbih counting.",
tech: ["Java", "Android Studio", "Android"]
},

hisab: {
icon: "▣",
title: "Hisab Korun / ZakatCalculation",
text:
"A Bangla Android application containing a simple calculator, BMI calculator and Zakat calculator in one convenient app.",
tech: ["Java", "Android", "Android Studio"]
},

lanconv: {
icon: "☁",
title: "LANConv2",
text:
"An offline Android chat application that allows multiple devices connected to the same Wi-Fi network to communicate using a server and client system. It also supports public/private servers and password protection.",
tech: ["Java", "Android", "Wi-Fi", "Server / Client"]
},

qr: {
icon: "▦",
title: "QR Code Generator",
text:
"A responsive web application that generates QR codes with a clean and simple interface, designed to work smoothly on both mobile and desktop devices.",
tech: ["HTML", "CSS", "JavaScript"]
},

currency: {
icon: "৳",
title: "Real-time Currency Exchange",
text:
"A modern web application for checking real-time currency exchange rates with a futuristic dark interface.",
tech: ["HTML", "CSS", "JavaScript", "API"]
}

};

/* =========================================
PROJECT MODAL
========================================= */

const modal = document.getElementById("projectModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalTech = document.getElementById("modalTech");

const detailButtons = document.querySelectorAll(".details-btn");

function openModal(projectKey) {

const project = projectData[projectKey];

if (!project) {
return;
}

modalIcon.textContent = project.icon;
modalTitle.textContent = project.title;
modalText.textContent = project.text;

modalTech.innerHTML = "";

project.tech.forEach(tech => {

const tag = document.createElement("span");

tag.textContent = tech;

modalTech.appendChild(tag);

});

modal.classList.add("open");
modal.setAttribute("aria-hidden", "false");

document.body.style.overflow = "hidden";

}

function closeModal() {

modal.classList.remove("open");
modal.setAttribute("aria-hidden", "true");

document.body.style.overflow = "";

}

detailButtons.forEach(button => {

button.addEventListener("click", event => {

event.preventDefault();

const projectKey = button.dataset.project;

openModal(projectKey);

});

});

modalClose.addEventListener("click", closeModal);

modalBackdrop.addEventListener("click", closeModal);

/* ESC closes modal */

document.addEventListener("keydown", event => {

if (event.key === "Escape") {

if (modal.classList.contains("open")) {
closeModal();
}

if (navLinks.classList.contains("open")) {
navLinks.classList.remove("open");
menuBtn.classList.remove("active");
menuBtn.setAttribute("aria-expanded", "false");
}

}

});

/* =========================================
CONTACT FORM
========================================= */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", event => {

event.preventDefault();

const name =
contactForm.querySelector('[name="name"]').value.trim();

const email =
contactForm.querySelector('[name="email"]').value.trim();

const message =
contactForm.querySelector('[name="message"]').value.trim();

if (!name || !email || !message) {

formStatus.textContent =
"Please fill in all fields.";

return;
}

const subject =
encodeURIComponent(Portfolio Message from ${name}`);

const body =
encodeURIComponent(
Name:${name}\nEmail: latex
{email}\n\nMessage:\n

{message}`
);

/*
* Opens the user's email application.
*/

window.location.href =
mailto:sksojib5688@gmail.com?subject=${subject}&body=${body};

formStatus.textContent =
"Opening your email app...";

});

/* =========================================
SMOOTH ANCHOR FALLBACK
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

anchor.addEventListener("click", event => {

const targetId =
anchor.getAttribute("href");

if (!targetId || targetId === "#") {
return;
}

const target =
document.querySelector(targetId);

if (!target) {
return;
}

event.preventDefault();

target.scrollIntoView({
behavior: "smooth",
block: "start"
});

});

});

});