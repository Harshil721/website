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

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Harshil Shah";
            $("#favicon").attr("href", "assets/images/favicon.png");
        }
        else {
            document.title = "Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
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

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach((skill, index) => {
        const animationDirection = index % 2 === 0 ? "left" : "right"; // Alternate between left and right
        skillHTML += `
        <div class="bar" data-animation="${animationDirection}" style="animation-delay: ${index * 0.2}s;">
            <div class="info">
                <img src="${skill.icon}" alt="${skill.name}" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });
    skillsContainer.innerHTML = skillHTML;
}

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
    duration: 1000,
    reset: true
});

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.education .timeline', { delay: 400 });
srtop.reveal('.education .timeline .container', { interval: 400 });

const srside = ScrollReveal({
    origin: 'side',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srside.reveal('.home .content h3', { delay: 400 });
srside.reveal('.home .content p', { delay: 400 });
srside.reveal('.home .content .btn', { delay: 400 });

srside.reveal('.home .image', { delay: 400 });
srside.reveal('.home .linkedin', { interval: 600 });
srside.reveal('.home .github', { interval: 800 });
srside.reveal('.home .twitter', { interval: 1000 });
srside.reveal('.home .telegram', { interval: 600 });
srside.reveal('.home .instagram', { interval: 600 });
srside.reveal('.home .email', { interval: 600 });
srside.reveal('.home .dev', { interval: 600 });

/* SCROLL SKILLS */
srside.reveal('.skills .container', { interval: 800 });
srside.reveal('.skills .container .bar', { delay: 800 });

/* SCROLL PROJECTS */
srside.reveal('.work .box', { interval: 800 });

/* SCROLL EXPERIENCE */
srside.reveal('.experience', { delay: 800 });
srside.reveal('.experience .container', { interval: 800 });

/* SCROLL CONTACT */
srside.reveal('.contact .container', { delay: 800 });
srside.reveal('.contact .container .form-group', { delay: 800 });

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.8 }
    );
  
    cards.forEach((card) => observer.observe(card));
  });  

  const projectCards = [
    {
      image: 'assets/images/project1.gif',
      link: 'https://github.com/Harshil721/project1',
      name: 'Project 1 Name',
      description: 'A brief description of Project 1 that highlights its key features and purpose.'
    },
    {
      image: 'assets/images/project2.gif',
      link: 'https://github.com/Harshil721/project2',
      name: 'Project 2 Name',
      description: 'A brief description of Project 2 that highlights its key features and purpose.'
    },
    {
      image: 'assets/images/project3.gif',
      link: 'https://github.com/Harshil721/project3',
      name: 'Project 3 Name',
      description: 'A brief description of Project 3 that highlights its key features and purpose.'
    }
  ];
  
  const projectSlider = document.querySelector('.project-slider');
  let currentIndex = 0;
  
  function updateProjectCard() {
    const card = document.querySelector('#project-card');
    const project = projectCards[currentIndex];
  
    card.querySelector('.project-image img').src = project.image;
    card.querySelector('.github-link').href = project.link;
    card.querySelector('.github-link').innerHTML = `<i class="fab fa-github"></i> ${project.name}`;
    card.querySelector('h3').textContent = project.name;
    card.querySelector('p').textContent = project.description;
  
    // Move to next index
    currentIndex = (currentIndex + 1) % projectCards.length;
  
    // Add slide animation
    card.classList.remove('active');
    setTimeout(() => card.classList.add('active'), 50);
  }
  
  // Initialize slider
  updateProjectCard();
  setInterval(updateProjectCard, 5000);
  
  AOS.init({
    duration: 1000, // Animation duration in ms
    once: false,    // Allow animations to trigger every time the section is revisited
  });
  
