const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/* Mobile menu */
const menuBtn = $("#menuBtn");
const navLinks = $("#navLinks");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

$$(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* Active navigation */
const sections = $$("section[id]");
const navItems = $$(".nav-links a");

function updateActiveNav(){
  const scrollY = window.scrollY + 120;

  let current = "home";
  sections.forEach(section => {
    if(scrollY >= section.offsetTop) current = section.id;
  });

  navItems.forEach(item => {
    item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
  });
}

/* Scroll progress + top button */
const progress = $("#scrollProgress");
const topBtn = $("#topBtn");

function updateScrollUI(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${percent}%`;

  topBtn.classList.toggle("show", window.scrollY > 500);
  updateActiveNav();
}

window.addEventListener("scroll", updateScrollUI, {passive:true});

topBtn.addEventListener("click", () => {
  window.scrollTo({top:0, behavior:"smooth"});
});

/* Reveal animations */
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, {threshold:.12});

$$(".reveal").forEach(el => observer.observe(el));

/* Project data */
const projectData = {
  cgpa:{
    title:"CGPA Grade Calculator",
    icon:"🎓",
    text:"A simple and accurate web-based CGPA calculator designed to help students calculate their semester or course grades quickly.",
    tech:["HTML","CSS","JavaScript"]
  },
  bmi:{
    title:"BMI Calculator (Android)",
    icon:"●",
    text:"A lightweight Android BMI calculator that lets users enter height and weight and quickly understand their BMI result.",
    tech:["Java","Android Studio"]
  },
  tajbih:{
    title:"Digital Tajbih",
    icon:"☪",
    text:"An Android dhikr counter designed for simple digital tasbih/prayer counting with an easy-to-use interface.",
    tech:["Java","Android Studio"]
  },
  hisab:{
    title:"Hisab Korun / ZakatCalculation",
    icon:"▣",
    text:"A Bangla Android application containing a simple calculator, BMI calculator and Zakat calculator in one place.",
    tech:["Java","Android Studio","Bangla UI"]
  },
  lanconv:{
    title:"LANConv2",
    icon:"☁",
    text:"An offline Android chat application for devices connected to the same Wi-Fi network. It supports server creation, joining, server discovery, multi-client communication and public/private servers.",
    tech:["Java","Android","Wi-Fi","UDP/Broadcast"]
  },
  qr:{
    title:"QR Code Generator",
    icon:"▦",
    text:"A responsive web app for generating QR codes online with a clean interface and mobile-friendly layout.",
    tech:["HTML","CSS","JavaScript"]
  },
  currency:{
    title:"Real-time Currency Exchange",
    icon:"৳",
    text:"A modern web application that displays live currency exchange information in a futuristic dark interface.",
    tech:["HTML","CSS","JavaScript","API"]
  }
};

const modal = $("#projectModal");
const modalTitle = $("#modalTitle");
const modalText = $("#modalText");
const modalIcon = $("#modalIcon");
const modalTech = $("#modalTech");

function openModal(key){
  const data = projectData[key];
  if(!data) return;

  modalTitle.textContent = data.title;
  modalText.textContent = data.text;
  modalIcon.textContent = data.icon;
  modalTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join("");

  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

$$(".details-btn").forEach(button => {
  button.addEventListener("click", () => openModal(button.dataset.project));
});

$("#modalClose").addEventListener("click", closeModal);
$("#modalBackdrop").addEventListener("click", closeModal);

document.addEventListener("keydown", e => {
  if(e.key === "Escape") closeModal();
});

/* Contact form
   This demo does not send email automatically.
   Connect Formspree / EmailJS / your backend later. */
$("#contactForm").addEventListener("submit", e => {
  e.preventDefault();

  const status = $("#formStatus");
  status.textContent = "Message form ready — connect your email service to receive messages.";

  e.target.reset();
});

/* Prevent placeholder # links from jumping */
$$('a[href="#"]').forEach(a => {
  a.addEventListener("click", e => e.preventDefault());
});

/* Initial state */
updateScrollUI();
