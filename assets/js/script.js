document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");
    const navbar = document.querySelector(".navbar");

    menu.addEventListener("click", function () {
        navbar.classList.toggle("nav-toggle");
    });
});


$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });
});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Frontend Development", "Backend Development", "Web Designing", "Android Development", "Web Development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

/***************************************************************************/
/** NEW FILTER-BASED TECH STACK CODE ***************************************/
/***************************************************************************/

/* 1) Category Mapping */
const categoryMap = {
  frontend: [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "ReactJS", "Next.js",
    "Angular", "MaterialUI", "Bootstrap", "TailwindCSS", "Sass", "Redux"
  ],
  backend: [
    "Node.js", "Python", "Java", "Spring Boot", "Django"
  ],
  database: [
    "MongoDB", "PostgreSQL", "MySQL", "MSSQL", "OracleDB"
  ],
  tools: [
    "AWS", "Firebase", "GCP", "GitHub"
  ]
};

/* 2) Helper to find category by skill name */
function getCategory(skillName) {
  skillName = skillName.toLowerCase();
  for (const cat in categoryMap) {
    if (categoryMap[cat].some(s => s.toLowerCase() === skillName)) {
      return cat;
    }
  }
  return "other"; // fallback if none matched
}

/* 3) Initialize Skills After DOM Loaded */
document.addEventListener("DOMContentLoaded", () => {
  // We fetch the skills JSON
  fetchData("skills")
    .then(skillsData => {
      // Build skill cards
      const skillsContainer = document.getElementById("skillsContainer");

      skillsData.forEach(skill => {
        const category = getCategory(skill.name);

        // Create card element
        const card = document.createElement("div");
        card.classList.add("skill-card");
        card.setAttribute("data-category", category);

        // Icon
        const icon = document.createElement("img");
        icon.src = skill.icon;
        icon.alt = skill.name;
        icon.classList.add("skill-icon");

        // Name
        const skillName = document.createElement("h3");
        skillName.textContent = skill.name;

        // Progress bar container
        const progressBarContainer = document.createElement("div");
        progressBarContainer.classList.add("progress-bar-container");

        // Progress label
        const progressLabel = document.createElement("span");
        progressLabel.classList.add("progress-label");
        // progressLabel.textContent = skill.level + "%";

        // Track
        const progressTrack = document.createElement("div");
        progressTrack.classList.add("progress-track");

        // Fill
        const progressFill = document.createElement("div");
        progressFill.classList.add("progress-fill");
        // progressFill.style.width = skill.level + "%";

        progressTrack.appendChild(progressFill);
        progressBarContainer.appendChild(progressLabel);
        progressBarContainer.appendChild(progressTrack);

        // Description
        const skillDesc = document.createElement("p");
        skillDesc.classList.add("skill-desc");
        skillDesc.textContent = skill.description || "";

        // Append all
        card.appendChild(icon);
        card.appendChild(skillName);
        card.appendChild(progressBarContainer);
        card.appendChild(skillDesc);

        skillsContainer.appendChild(card);
      });

      // Now that cards exist, set default filter to "all"
      filterSkills("all");
    })
    .catch(err => {
      console.error("Error loading skills.json:", err);
    });

  // Grab filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove 'active' from all
      filterButtons.forEach(b => b.classList.remove("active"));
      // Add to current
      btn.classList.add("active");

      // Filter value
      const filterValue = btn.getAttribute("data-filter");
      filterSkills(filterValue);
    });
  });
});

/* 4) Filter Function */
function filterSkills(category) {
  const allCards = document.querySelectorAll(".skill-card");
  allCards.forEach(card => {
    if (category === "all") {
      card.style.display = "block";
    } else {
      const cardCat = card.getAttribute("data-category");
      card.style.display = (cardCat === category) ? "block" : "none";
    }
  });
}

// Optional: Add hover effect on cards
document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.skill-card-front').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// Fetch and display skills
fetchData("skills").then(showSkills);

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 20,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->

document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const menuBtn = document.querySelector('#menu');
    const navbar = document.querySelector('.navbar');
    let isMenuOpen = false;

    // Initialize menu icon if it doesn't exist
    if (!menuBtn.classList.contains('fas')) {
        menuBtn.classList.add('fas', 'fa-bars');
    }

    // Menu button click handler
    menuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        isMenuOpen = !isMenuOpen;
        
        // Toggle menu icon
        menuBtn.classList.toggle('fa-bars');
        menuBtn.classList.toggle('fa-times');
        
        // Toggle navigation menu
        navbar.classList.toggle('nav-toggle');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navbar.contains(e.target) && !menuBtn.contains(e.target)) {
            isMenuOpen = false;
            menuBtn.classList.add('fa-bars');
            menuBtn.classList.remove('fa-times');
            navbar.classList.remove('nav-toggle');
            document.body.style.overflow = '';
        }
    });

    // Prevent clicks inside navbar from closing it
    navbar.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target section
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                // Scroll to section
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            
            // Close menu
            if (window.innerWidth <= 768) {
                isMenuOpen = false;
                menuBtn.classList.add('fa-bars');
                menuBtn.classList.remove('fa-times');
                navbar.classList.remove('nav-toggle');
                document.body.style.overflow = '';
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            isMenuOpen = false;
            menuBtn.classList.add('fa-bars');
            menuBtn.classList.remove('fa-times');
            navbar.classList.remove('nav-toggle');
            document.body.style.overflow = '';
        }
    });
});

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 500,
    reset: true
});

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.education .timeline', { delay: 200 });
srtop.reveal('.education .timeline .container', { interval: 200 });

const srside = ScrollReveal({
    origin: 'side',
    distance: '80px',
    duration: 200,
    reset: true
});

/* SCROLL HOME */
srside.reveal('.home .content h3', { delay: 200 });
srside.reveal('.home .content p', { delay: 200 });
srside.reveal('.home .content .btn', { delay: 200 });

srside.reveal('.home .image', { delay: 200 });
srside.reveal('.home .linkedin', { interval: 200 });
srside.reveal('.home .github', { interval: 200 });
srside.reveal('.home .twitter', { interval: 200 });
srside.reveal('.home .telegram', { interval: 200 });
srside.reveal('.home .instagram', { interval: 200 });
srside.reveal('.home .email', { interval: 200 });
srside.reveal('.home .dev', { interval: 200 });

/* SCROLL SKILLS */
srside.reveal('.skills .container', { interval: 200 });
srside.reveal('.skills .container .bar', { delay: 200 });

/* SCROLL PROJECTS */
srside.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srside.reveal('.experience', { delay: 200 });
srside.reveal('.experience .container', { interval: 200 });

/* SCROLL CONTACT */
srside.reveal('.contact .container', { delay: 200 });
srside.reveal('.contact .container .form-group', { delay: 200 });