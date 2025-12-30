const DarkModeSlika = document.getElementById("darkLightPic");
const sekcijaWhyMe = document.getElementById("secWhyMe");
const logoGitHub = document.getElementById("GHLogo");
const GitHubSocial = document.getElementById("GHSlika");
const GmailSocial = document.getElementById("GmailSlika");
const DiscordSocial = document.getElementById("DiscordSlika");

const hamburgerMeni = document.querySelector("#hamburgerMenu");
const linkoviHeader = document.querySelector("#headerLinkovi");

const mediaQuery1280px = window.matchMedia('(min-width: 1280px)');
const mediaQueryManje1280px = window.matchMedia('(max-width: 1279px)');
const profSlika = document.querySelector("#profilnaSlika");

const GHLink = document.querySelector("#GitHubLink");
const MyProjects = document.querySelector("#myProjectsDiv");

const kartaSkills = document.getElementById("skillsKarta");
const kartaExp = document.getElementById("ExpKarta");
const kartaEdu = document.getElementById("EduKarta");
const vestineSkills = document.getElementById("vestineSkills");
const vestineExp = document.getElementById("vestineExp");
const vestineEdu = document.getElementById("vestineEdu");
const aboutMeGrid = document.getElementById("aboutMeKartice");
const buttonBack = document.getElementById("backButton");
const miniKartice = document.getElementById("miniKartice");

const prvaKartica = document.getElementById("kartica1");
const drugaKartica = document.getElementById("kartica2");
const trecaKartica = document.getElementById("kartica3");
const vestineNaslov = document.getElementById("naslovVestine");

const skillsTekst = `• Logical thinking<br>
• Analytical problem solving
• Experience with HTML, CSS, JS, and C# programming
• Working with APIs and integrations`;
const expTekst = `• Work on school and personal programming projects focused on web development and backend development
• Internship or self-study through online courses and tutorials`;
const eduTekst = `• Completed secondary technical school (electrical engineering) in Serbia
• Continuous learning through online courses and self-study`;

//Hamburger meni
hamburgerMeni.addEventListener("click", function () {
  hamburgerMeni.classList.toggle("Active");
  linkoviHeader.classList.toggle("Active");
});

document.querySelectorAll(".headerLink").forEach(a => {
  a.addEventListener("click", function () {
    hamburgerMeni.classList.remove("Active");
    linkoviHeader.classList.remove("Active");
  })
});
//------------------------------
//Slika About me
function PromeniSliku(e) {
  if (e.matches) {
    profSlika.src = "Pictures/PurpleDragon_BigPic.png";
  } else {
    // Ako je sirina < 1280px — resetuj sliku
    profSlika.src = "Pictures/PurpleDragon.png";
  }
}

PromeniSliku(mediaQuery1280px);
mediaQuery1280px.addEventListener('change', PromeniSliku);
//------------------------
//GitHub projekti
GHLink.addEventListener("mouseenter", function () {

  if (!document.getElementById("GHallProjects")) {


    let noviP = document.createElement("p");
    noviP.textContent = "All projects are on GitHub!";
    noviP.id = "GHallProjects";
    MyProjects.appendChild(noviP);

    requestAnimationFrame(() => {
      noviP.classList.add("show");
    });

  }
});

GHLink.addEventListener("mouseleave", function () {
  let deleteEl = document.getElementById("GHallProjects");

  if (deleteEl) {
    deleteEl.classList.remove("show");
    setTimeout(() => {
      deleteEl.remove();
    }, 300);
  }

});
//----------------------
//About Me, ekran manji-veci od 1280px...
function PromeniGrid(e) {
  if (e.matches) {
    buttonBack.style.display = "block";
    miniKartice.style.display = "flex";
  } else {
    buttonBack.style.display = "none";
    miniKartice.style.display = "none";
  }
}

let animatingManjeOd1280px = false;
function changeTextWithTransition(noviTekst, KlasaZaDodavanje, KlasaZaUklanjanje, vrstaVestina) {
  if (animatingManjeOd1280px) return;
  animatingManjeOd1280px = true;

  vrstaVestina.classList.remove("fade-in");
  vrstaVestina.classList.add("fade-out");

  vrstaVestina.addEventListener("transitionend", function handler() {
    vrstaVestina.textContent = noviTekst;

    vrstaVestina.classList.remove(KlasaZaUklanjanje);
    vrstaVestina.classList.add(KlasaZaDodavanje);

    vrstaVestina.classList.remove("fade-out");
    vrstaVestina.classList.add("fade-in");

    animatingManjeOd1280px = false;
    vrstaVestina.removeEventListener("transitionend", handler);
  });
}

function SirinaEkranaManjaOd1280px(e) {
  if (e.matches) { //Provera e.matches veoma vazna!!!
    let skillClick = false;
    let expClick = false;
    let eduClick = false;

    kartaSkills.removeEventListener("click", skillsHandler); //removeEventListener ne moze da koristi anonimne funkcije (one napravljene unutar nekog bloka, odnosno unutar addEventListener-a)
    kartaExp.removeEventListener("click", expHandler);
    kartaEdu.removeEventListener("click", eduHandler);

    kartaSkills.addEventListener("click", function () {
      if (!skillClick) {
        changeTextWithTransition(skillsTekst, "vestineOpis", "vestine", vestineSkills);
      } else {
        changeTextWithTransition("Skills", "vestine", "vestineOpis", vestineSkills);
      }
      skillClick = !skillClick;
    });

    kartaExp.addEventListener("click", function () {
      if (!expClick) {
        changeTextWithTransition(expTekst, "vestineOpis", "vestine", vestineExp);
      } else {
        changeTextWithTransition("Experience", "vestine", "vestineOpis", vestineExp);
      }
      expClick = !expClick;
    });

    kartaEdu.addEventListener("click", function () {
      if (!eduClick) {
        changeTextWithTransition(eduTekst, "vestineOpis", "vestine", vestineEdu);
      } else {
        changeTextWithTransition("Education", "vestine", "vestineOpis", vestineEdu);
      }
      eduClick = !eduClick;
    });
  }
}

SirinaEkranaManjaOd1280px(mediaQueryManje1280px);
mediaQueryManje1280px.addEventListener('change', SirinaEkranaManjaOd1280px);

function skillsHandler() {
  AboutMeCardOnClick(skillsTekst);
  prvaKartica.classList.add("oznacenaKartica");
  drugaKartica.classList.remove("oznacenaKartica");
  trecaKartica.classList.remove("oznacenaKartica");
  vestineNaslov.textContent = "Skills";
}

function expHandler() {
  AboutMeCardOnClick(expTekst);
  drugaKartica.classList.add("oznacenaKartica");
  prvaKartica.classList.remove("oznacenaKartica");
  trecaKartica.classList.remove("oznacenaKartica");
  vestineNaslov.textContent = "Experience";
}

function eduHandler() {
  AboutMeCardOnClick(eduTekst);
  trecaKartica.classList.add("oznacenaKartica");
  drugaKartica.classList.remove("oznacenaKartica");
  prvaKartica.classList.remove("oznacenaKartica");
  vestineNaslov.textContent = "Education";
}

function SirinaEkranaVecaOd1280px(e) {
  if (e.matches) { //Provera e.matches veoma vazna!!!
    kartaSkills.addEventListener("click", skillsHandler); //Koriste se handleri, jer ne sme funkcija da ima parametar u zagradi, kako se ne bi izvrsila
    kartaExp.addEventListener("click", expHandler);
    kartaEdu.addEventListener("click", eduHandler);
  }
}

SirinaEkranaVecaOd1280px(mediaQuery1280px);
mediaQuery1280px.addEventListener('change', SirinaEkranaVecaOd1280px);

let animating = false; //animating boolean ubacen da ne bi doslo do spama
let tekstVestine;
function AboutMeCardOnClick(noviTekst) {
  if (animating) return;
  animating = true;

  kartaSkills.classList.remove("InAnim"); //Uklanjanje animacija koje su ostale...
  kartaExp.classList.remove("InAnim");
  kartaEdu.classList.remove("InAnim");
  vestineNaslov.classList.remove("OutAnim");
  buttonBack.classList.remove("OutAnim");
  miniKartice.classList.remove("OutAnim"); //----------------------------------

  kartaSkills.classList.add("aboutMeKarta_Anim");
  kartaExp.classList.add("aboutMeKarta_Anim");
  kartaEdu.classList.add("aboutMeKarta_Anim");

  vestineNaslov.style.display = "block";
  vestineNaslov.classList.add("InAnim");

  tekstVestine = document.createElement("p");
  aboutMeGrid.appendChild(tekstVestine);
  tekstVestine.classList.add("tekstVestine");
  tekstVestine.classList.add("InAnim");
  tekstVestine.textContent = noviTekst;

  prvaKartica.addEventListener("click", () => {
    prvaKartica.classList.add("oznacenaKartica");
    drugaKartica.classList.remove("oznacenaKartica");
    trecaKartica.classList.remove("oznacenaKartica");
    tekstVestine.textContent = skillsTekst;
    vestineNaslov.textContent = "Skills";
  });

  drugaKartica.addEventListener("click", () => {
    drugaKartica.classList.add("oznacenaKartica");
    prvaKartica.classList.remove("oznacenaKartica");
    trecaKartica.classList.remove("oznacenaKartica");
    tekstVestine.textContent = expTekst;
    vestineNaslov.textContent = "Experience";
  });

  trecaKartica.addEventListener("click", () => {
    trecaKartica.classList.add("oznacenaKartica");
    drugaKartica.classList.remove("oznacenaKartica");
    prvaKartica.classList.remove("oznacenaKartica");
    tekstVestine.textContent = eduTekst;
    vestineNaslov.textContent = "Education";
  });

  buttonBack.addEventListener("click", () => {
    vestineNaslov.classList.add("OutAnim");
    tekstVestine.classList.add("OutAnim");
    miniKartice.classList.add("OutAnim");
    buttonBack.classList.add("OutAnim");

    kartaSkills.classList.remove("aboutMeKarta_Anim");
    //kartaSkills.style.display = "flex";
    kartaSkills.classList.add("InAnim");
    kartaExp.classList.remove("aboutMeKarta_Anim");
    //kartaExp.style.display = "flex";
    kartaExp.classList.add("InAnim");
    kartaEdu.classList.remove("aboutMeKarta_Anim");
    //kartaEdu.style.display = "flex";
    kartaEdu.classList.add("InAnim");
  });

  PromeniGrid(mediaQuery1280px);
  mediaQuery1280px.addEventListener('change', PromeniGrid);

  // vrstaVestina.classList.remove("fade-out");
  // vrstaVestina.classList.add("fade-in");

  animating = false;
}

//Dark mode
DarkOrLight();

function DarkOrLight() {
  if (localStorage.getItem("darkMode") === "true") {
    DarkModeOn();
  }
  else LightModeOn();
}

DarkModeSlika.addEventListener("click", function () {
  if(localStorage.getItem("darkMode") === "false") {
    DarkModeOn();
  } else LightModeOn();
});

function DarkModeOn() {
  localStorage.setItem("darkMode", true);
  document.body.classList.add("dark-mode");
  DarkModeSlika.style.backgroundColor = "#F9F9F9";
  DarkModeSlika.src = "Pictures/Light_mode.png";
  sekcijaWhyMe.style.backgroundImage = "url('Pictures/WhyMeBackground_Black.png')";
  logoGitHub.src = "Pictures/GitHubLogo_Black.png";
  GitHubSocial.src = "Pictures/GitHubLogo_Black.png";
  GmailSocial.src = "Pictures/Gmail_Black.png";
  DiscordSocial.src = "Pictures/Discord_Black.png";
}

function LightModeOn() {
  localStorage.setItem("darkMode", false);
  document.body.classList.remove("dark-mode");
  DarkModeSlika.style.backgroundColor = "#1E1E1E";
  DarkModeSlika.src = "Pictures/Dark_mode.png";
  sekcijaWhyMe.style.backgroundImage = "url('Pictures/WhyMeBackground_White.jpg')";
  logoGitHub.src = "Pictures/GitHubLogo_White.png";
  GitHubSocial.src = "Pictures/GitHubLogo_White.png";
  GmailSocial.src = "Pictures/Gmail_White.png";
  DiscordSocial.src = "Pictures/Discord_White.png";
}