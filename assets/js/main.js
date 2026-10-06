/**
 * Sauod Azad Portfolio — Core Interactive JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initSkillsFilter();
  initModals();
  initContactForm();
  initScrollToTop();
  initActiveNavObserver();
});

/* --------------------------------------------------------------------------
   1. Theme Toggle (Dark / Light)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  if (!themeToggleBtn) return;

  const html = document.documentElement;
  const currentTheme = localStorage.getItem('sa_theme') || 'dark';

  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('sa_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggle i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-moon';
  } else {
    icon.className = 'fa-solid fa-sun';
  }
}

/* --------------------------------------------------------------------------
   2. Typing Animation Effect in Hero
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingEl = document.getElementById('typingText');
  if (!typingEl) return;

  const phrases = [
    "Native Android Apps (Kotlin & Java)",
    "Full-Stack Web Systems (PHP & JS)",
    "Normalized 3NF MySQL Databases",
    "Scalable, Clean & Tested Codebases"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 1800;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, pauseEnd);
        return;
      }
    } else {
      typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. Navbar Scroll Effect
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   4. Mobile Menu Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  function openDrawer() {
    drawer.classList.add('open');
    menuBtn.classList.add('active');
    menuBtn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    menuBtn.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* --------------------------------------------------------------------------
   5. Active Navigation Link on Scroll (Intersection Observer)
   -------------------------------------------------------------------------- */
function initActiveNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px'
  });

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   6. Skills Filter Tabs
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  if (!tabs.length || !skillCards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Modals: Resume & Project Deep Dives
   -------------------------------------------------------------------------- */
const projectData = {
  'cargo-web': {
    title: 'E-Cargo-Bility: Full-Stack Cargo Booking Platform',
    badge: 'Final Year Capstone Project',
    content: `
      <div class="modal-grid">
        <div>
          <h4 class="modal-section-title"><i class="fa-solid fa-layer-group"></i> Project Overview & Motivation</h4>
          <p class="modal-p">
            <strong>E-Cargo-Bility</strong> is an enterprise-grade digital freight and cargo dispatching system created to eliminate logistical friction between shippers and freight operators in Pakistan. The platform automates trip requests, quotation dispatching, driver assignment, and delivery verification.
          </p>
        </div>

        <div>
          <h4 class="modal-section-title"><i class="fa-solid fa-server"></i> System Architecture & Key Modules</h4>
          <div class="modal-list">
            <div class="modal-list-item">
              <i class="fa-solid fa-circle-check"></i>
              <div><strong>Shipper Portal:</strong> Cargo volume calculator, pickup/drop-off route setting, freight weight categorization, and real-time status tracking.</div>
            </div>
            <div class="modal-list-item">
              <i class="fa-solid fa-circle-check"></i>
              <div><strong>Carrier / Driver Portal:</strong> Available job feeds, vehicle capacity verification, instant bid acceptance, and route progression updates.</div>
            </div>
            <div class="modal-list-item">
              <i class="fa-solid fa-circle-check"></i>
              <div><strong>Real-Time Dispatch Engine:</strong> Asynchronous AJAX state updates ensuring drivers and consignors receive live trip progress without manual page reloads.</div>
            </div>
          </div>
        </div>

        <div>
          <h4 class="modal-section-title"><i class="fa-solid fa-database"></i> Database Modeling & Integrity</h4>
          <p class="modal-p">
            Modeled in strict <strong>Third Normal Form (3NF)</strong> with MySQL Workbench. Structured tables for Users, Authentication, DriverCredentials, Vehicles, Bookings, PaymentTransactions, and AuditLogs with enforced foreign key cascades and composite indexes.
          </p>
        </div>

        <div>
          <h4 class="modal-section-title"><i class="fa-solid fa-vial-circle-check"></i> Software Quality & Validation</h4>
          <p class="modal-p">
            Authored exhaustive test case suites covering validation boundaries (cargo weights, invalid coordinates, driver availability collisions) and defensive SQL query parameterization to prevent injection vulnerabilities.
          </p>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
          <a href="https://github.com/SauodAzad/my-projects" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <i class="fa-brands fa-github"></i> View GitHub Repository
          </a>
          <a href="assets/docs/E-Cargo-Bility-v1.0.apk" class="btn btn-outline" download="E-Cargo-Bility.apk">
            <i class="fa-brands fa-android"></i> Download Companion APK
          </a>
        </div>
      </div>
    `
  },
  'android-apps': {
    title: 'Native Android Mobile Applications',
    badge: 'Mobile Engineering • Kotlin & Java',
    content: `
      <div class="modal-grid">
        <div>
          <h4 class="modal-section-title"><i class="fa-brands fa-android"></i> Mobile Engineering Highlights</h4>
          <p class="modal-p">
            Developed native Android applications from the ground up utilizing Android Studio, Kotlin, and Java. Built with strict adherence to Google's Material Design standards and modern Android architectural principles.
          </p>
        </div>

        <div>
          <h4 class="modal-section-title"><i class="fa-solid fa-cubes"></i> Core Android Components & Patterns</h4>
          <div class="modal-list">
            <div class="modal-list-item">
              <i class="fa-solid fa-circle-check"></i>
              <div><strong>Activity & Fragment Lifecycle Management:</strong> Clean separation of UI rendering and data handling to prevent memory leaks and state loss on device rotation.</div>
            </div>
            <div class="modal-list-item">
              <i class="fa-solid fa-circle-check"></i>
              <div><strong>Navigation Components:</strong> Jetpack navigation graphs providing safe argument passing and predictable back-stack behavior.</div>
            </div>
            <div class="modal-list-item">
              <i class="fa-solid fa-circle-check"></i>
              <div><strong>Networking & Data Persistence:</strong> Background REST API synchronization, JSON parsing, and robust local caching for offline resilience.</div>
            </div>
            <div class="modal-list-item">
              <i class="fa-solid fa-circle-check"></i>
              <div><strong>Emulator & Device Testing:</strong> Tested on various screen sizes, DPI targets, and API levels (Android 8.0 to Android 14) for optimal rendering.</div>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
          <a href="assets/docs/E-Cargo-Bility-v1.0.apk" class="btn btn-primary" download="E-Cargo-Bility.apk">
            <i class="fa-solid fa-download"></i> Download Android APK (6.8 MB)
          </a>
          <a href="https://github.com/SauodAzad/my-projects" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
            <i class="fa-brands fa-github"></i> Source Code on GitHub
          </a>
        </div>
      </div>
    `
  },
  'database-design': {
    title: '3NF Relational Database Architecture & Optimization',
    badge: 'Database Engineering • MySQL Workbench',
    content: `
      <div class="modal-grid">
        <div>
          <h4 class="modal-section-title"><i class="fa-solid fa-database"></i> Architectural Overview</h4>
          <p class="modal-p">
            Designed for high concurrency and zero redundancy, this relational database architecture manages complete freight logistics operations. Designed using MySQL Workbench following the 3NF normal form rules.
          </p>
        </div>

        <div>
          <h4 class="modal-section-title"><i class="fa-solid fa-table-cells"></i> Database Specifications</h4>
          <div class="modal-list">
            <div class="modal-list-item">
              <i class="fa-solid fa-circle-check"></i>
              <div><strong>Normalized Entities:</strong> Structured schemas covering User Roles, Vehicle Classes, Weight Brackets, Dynamic Route Quotes, Trip Logs, and Ratings.</div>
            </div>
            <div class="modal-list-item">
              <i class="fa-solid fa-circle-check"></i>
              <div><strong>Referential Integrity:</strong> Strict foreign key relationships with defined ON UPDATE and ON DELETE rules preventing orphaned records.</div>
            </div>
            <div class="modal-list-item">
              <i class="fa-solid fa-circle-check"></i>
              <div><strong>Query Tuning & Indexing:</strong> B-tree indexes applied to frequently queried composite keys (e.g., driver_status + active_city) for sub-millisecond query execution.</div>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
          <a href="https://github.com/SauodAzad/my-projects" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
            <i class="fa-brands fa-github"></i> Inspect Database Scripts
          </a>
        </div>
      </div>
    `
  }
};

function initModals() {
  // Resume Modal
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtn = document.getElementById('openResumeModalBtn');
  const closeResumeBtn = document.getElementById('closeResumeModalBtn');

  if (resumeModal && openResumeBtn && closeResumeBtn) {
    openResumeBtn.addEventListener('click', () => {
      resumeModal.showModal();
    });

    closeResumeBtn.addEventListener('click', () => {
      resumeModal.close();
    });

    // Light dismiss: click on backdrop closes modal
    resumeModal.addEventListener('click', (e) => {
      const rect = resumeModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        resumeModal.close();
      }
    });
  }

  // Project Modal
  const projectModal = document.getElementById('projectModal');
  const closeProjectBtn = document.getElementById('closeProjectModalBtn');

  if (projectModal && closeProjectBtn) {
    closeProjectBtn.addEventListener('click', () => {
      projectModal.close();
    });

    projectModal.addEventListener('click', (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        projectModal.close();
      }
    });
  }
}

// Global project modal opener
window.openProjectModal = function(projectId) {
  const modal = document.getElementById('projectModal');
  const titleEl = document.getElementById('modalProjectTitle');
  const bodyEl = document.getElementById('modalProjectBody');

  if (!modal || !titleEl || !bodyEl) return;

  const project = projectData[projectId];
  if (!project) return;

  titleEl.textContent = project.title;
  bodyEl.innerHTML = project.content;
  modal.showModal();
};

/* --------------------------------------------------------------------------
   8. Contact Form Handling
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const waBtn = document.getElementById('submitWhatsAppBtn');

  if (!form || !feedback) return;

  // Submit via Mail client
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('senderSubject').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all fields before submitting.', 'error');
      return;
    }

    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject} - from ${name}`);
    const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    const mailtoLink = `mailto:sauodriphah@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    showFeedback('Opening your email client to send message...', 'success');
    window.location.href = mailtoLink;
  });

  // Submit via WhatsApp
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      let text = `Hello Sauod!`;
      if (name) text += ` My name is ${name}.`;
      if (email) text += ` (Email: ${email})`;
      if (subject) text += `\nRegarding: ${subject}`;
      if (message) text += `\n\nMessage:\n${message}`;

      const waUrl = `https://wa.me/923135151023?text=${encodeURIComponent(text)}`;
      showFeedback('Redirecting to WhatsApp chat...', 'success');
      window.open(waUrl, '_blank');
    });
  }

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    feedback.style.display = 'block';

    setTimeout(() => {
      feedback.style.display = 'none';
    }, 6000);
  }
}

/* --------------------------------------------------------------------------
   9. Scroll To Top Button
   -------------------------------------------------------------------------- */
function initScrollToTop() {
  const scrollBtn = document.getElementById('scrollToTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
