const revealNodes = document.querySelectorAll(".reveal");
const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuPanel = document.querySelector("[data-menu-panel]");

const closeMenu = () => {
  if (!topbar || !menuToggle) {
    return;
  }

  topbar.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

if (topbar && menuToggle && menuPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
  }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const counters = document.querySelectorAll(".count-up");

const animateCounter = (node) => {
  const target = Number(node.dataset.target || "0");
  const suffix = node.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    node.textContent = `${current}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.75,
  }
);

counters.forEach((counter) => counterObserver.observe(counter));

const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const role = String(formData.get("role") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subjectParts = ["Opportunity"];

    if (company) {
      subjectParts.push(`from ${company}`);
    }

    if (role) {
      subjectParts.push(`for ${role}`);
    }

    const subject = subjectParts.join(" ");

    const lines = [
      "Hello Raj Kumar,",
      "",
      `My name is ${name}.`,
      `You can reply to me at ${email}.`,
    ];

    if (company) {
      lines.push(`I am reaching out from ${company}.`);
    }

    if (role) {
      lines.push(`This is regarding: ${role}.`);
    }

    lines.push("", message, "", "Regards,", name);

    const mailto = `mailto:rjksharma23@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

    contactStatus.textContent = "Opening your email app with a prefilled message.";
    window.location.href = mailto;
    contactForm.reset();
  });
}

const yearNode = document.getElementById("year");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
