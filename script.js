const revealNodes = document.querySelectorAll(".reveal");
const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuPanel = document.querySelector("[data-menu-panel]");
const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");
const yearNode = document.getElementById("year");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const carouselStates = [];

let scrollAnimationFrame = 0;

const closeMenu = () => {
  if (!topbar || !menuToggle) {
    return;
  }

  topbar.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
};

const setScrolledState = () => {
  if (!topbar) {
    return;
  }

  topbar.classList.toggle("is-scrolled", window.scrollY > 16);
};

const easeInOutCubic = (progress) => {
  if (progress < 0.5) {
    return 4 * progress * progress * progress;
  }

  return 1 - Math.pow(-2 * progress + 2, 3) / 2;
};

const smoothScrollToTarget = (target) => {
  if (!target) {
    return;
  }

  const headerOffset = topbar ? topbar.getBoundingClientRect().height + 20 : 0;
  const destination = Math.max(target.getBoundingClientRect().top + window.scrollY - headerOffset, 0);

  if (prefersReducedMotion.matches) {
    window.scrollTo(0, destination);
    return;
  }

  if (scrollAnimationFrame) {
    window.cancelAnimationFrame(scrollAnimationFrame);
  }

  const startY = window.scrollY;
  const distance = destination - startY;
  const duration = 900;
  let startTime = 0;

  const step = (timestamp) => {
    if (!startTime) {
      startTime = timestamp;
    }

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      scrollAnimationFrame = window.requestAnimationFrame(step);
      return;
    }

    scrollAnimationFrame = 0;
  };

  scrollAnimationFrame = window.requestAnimationFrame(step);
};

const updateRevealDelays = () => {
  revealNodes.forEach((node, index) => {
    node.style.transitionDelay = `${(index % 4) * 70}ms`;
  });
};

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
    threshold: 0.14,
    rootMargin: "0px 0px -8% 0px",
  }
);

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
    threshold: 0.72,
  }
);

const getVisibleCount = (carousel) => {
  const mobile = Number(carousel.dataset.visibleMobile || "1");
  const tablet = Number(carousel.dataset.visibleTablet || "2");
  const desktop = Number(carousel.dataset.visibleDesktop || "3");

  if (window.innerWidth <= 680) {
    return mobile;
  }

  if (window.innerWidth <= 1080) {
    return tablet;
  }

  return desktop;
};

const updateCarouselButtons = (state) => {
  const { currentPage, pageOffsets, prevButton, nextButton, status, paginationButtons } = state;
  const totalPages = pageOffsets.length;

  if (status) {
    status.textContent = `${String(currentPage + 1).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;
  }

  if (prevButton) {
    prevButton.disabled = currentPage === 0;
  }

  if (nextButton) {
    nextButton.disabled = currentPage === totalPages - 1;
  }

  paginationButtons.forEach((button, index) => {
    button.classList.toggle("is-active", index === currentPage);
    button.setAttribute("aria-current", index === currentPage ? "true" : "false");
  });
};

const scrollCarouselToPage = (state, page, smooth = true) => {
  const targetPage = Math.max(0, Math.min(page, state.pageOffsets.length - 1));
  const targetOffset = state.pageOffsets[targetPage] || 0;

  state.currentPage = targetPage;

  state.viewport.scrollTo({
    left: targetOffset,
    behavior: smooth && !prefersReducedMotion.matches ? "smooth" : "auto",
  });

  updateCarouselButtons(state);
};

const syncCarouselFromScroll = (state) => {
  const { pageOffsets, viewport } = state;
  const currentLeft = viewport.scrollLeft;

  let closestPage = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  pageOffsets.forEach((offset, index) => {
    const distance = Math.abs(offset - currentLeft);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestPage = index;
    }
  });

  if (closestPage !== state.currentPage) {
    state.currentPage = closestPage;
    updateCarouselButtons(state);
  }
};

const buildCarouselPagination = (state) => {
  const { carousel, pagination, pageOffsets, label } = state;

  if (!pagination) {
    return;
  }

  pagination.replaceChildren();
  state.paginationButtons = [];

  pageOffsets.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "carousel-dot";
    button.setAttribute("aria-label", `Go to ${label} page ${index + 1}`);
    button.addEventListener("click", () => {
      scrollCarouselToPage(state, index);
    });

    pagination.appendChild(button);
    state.paginationButtons.push(button);
  });
};

const configureCarousel = (state, smooth = false) => {
  const { carousel, slides } = state;
  const visibleCount = getVisibleCount(carousel);
  const pageOffsets = [];

  carousel.style.setProperty("--visible-count", String(visibleCount));

  for (let index = 0; index < slides.length; index += visibleCount) {
    pageOffsets.push(slides[index].offsetLeft);
  }

  state.visibleCount = visibleCount;
  state.pageOffsets = pageOffsets;

  const hasPages = pageOffsets.length > 1;
  carousel.dataset.hasPages = hasPages ? "true" : "false";

  buildCarouselPagination(state);

  if (!hasPages) {
    state.currentPage = 0;
    state.viewport.scrollLeft = 0;
    updateCarouselButtons(state);
    return;
  }

  state.currentPage = Math.min(state.currentPage, pageOffsets.length - 1);
  scrollCarouselToPage(state, state.currentPage, smooth);
};

const setupCarousels = () => {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const state = {
      carousel,
      label: carousel.dataset.carouselLabel || "carousel",
      viewport: carousel.querySelector("[data-carousel-viewport]"),
      track: carousel.querySelector("[data-carousel-track]"),
      slides: Array.from(carousel.querySelectorAll(".carousel-slide")),
      prevButton: carousel.querySelector("[data-carousel-prev]"),
      nextButton: carousel.querySelector("[data-carousel-next]"),
      pagination: carousel.querySelector("[data-carousel-pagination]"),
      status: carousel.querySelector("[data-carousel-status]"),
      paginationButtons: [],
      currentPage: 0,
      pageOffsets: [],
      scrollTicking: false,
      resizeFrame: 0,
    };

    if (!state.viewport || !state.track || state.slides.length === 0) {
      return;
    }

    state.prevButton?.addEventListener("click", () => {
      scrollCarouselToPage(state, state.currentPage - 1);
    });

    state.nextButton?.addEventListener("click", () => {
      scrollCarouselToPage(state, state.currentPage + 1);
    });

    state.viewport.addEventListener(
      "scroll",
      () => {
        if (state.scrollTicking) {
          return;
        }

        state.scrollTicking = true;

        window.requestAnimationFrame(() => {
          syncCarouselFromScroll(state);
          state.scrollTicking = false;
        });
      },
      { passive: true }
    );

    carouselStates.push(state);
    configureCarousel(state);
  });
};

const refreshCarousels = () => {
  carouselStates.forEach((state) => {
    if (state.resizeFrame) {
      window.cancelAnimationFrame(state.resizeFrame);
    }

    state.resizeFrame = window.requestAnimationFrame(() => {
      configureCarousel(state);
      state.resizeFrame = 0;
    });
  });
};

if (topbar && menuToggle && menuPanel) {
  menuToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuPanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  const href = link.getAttribute("href");

  if (!href || href === "#") {
    return;
  }

  const target = document.querySelector(href);

  if (!target) {
    return;
  }

  link.addEventListener("click", (event) => {
    event.preventDefault();
    closeMenu();
    smoothScrollToTarget(target);

    if (history.replaceState) {
      history.replaceState(null, "", href);
    }
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }

    refreshCarousels();
  },
  { passive: true }
);

window.addEventListener(
  "scroll",
  () => {
    setScrolledState();
  },
  { passive: true }
);

revealNodes.forEach((node) => revealObserver.observe(node));
document.querySelectorAll(".count-up").forEach((counter) => counterObserver.observe(counter));

updateRevealDelays();
setScrolledState();
setupCarousels();

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

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
