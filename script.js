const revealNodes = document.querySelectorAll(".reveal");
const topbar = document.querySelector(".topbar");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuPanel = document.querySelector("[data-menu-panel]");
const contactForm = document.querySelector("[data-contact-form]");
const contactStatus = document.querySelector("[data-contact-status]");
const yearNode = document.getElementById("year");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);
const carouselStates = [];
const progressBar = document.querySelector(".scroll-progress span");
const cursorGlow = document.querySelector(".cursor-glow");
const pageLoader = document.querySelector(".page-loader");

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

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0
    ? Math.min((window.scrollY / scrollableHeight) * 100, 100)
    : 0;

  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
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
  const destination = Math.max(
    target.getBoundingClientRect().top + window.scrollY - headerOffset,
    0,
  );

  if (prefersReducedMotion.matches) {
    window.scrollTo(0, destination);
    return;
  }

  if (scrollAnimationFrame) {
    window.cancelAnimationFrame(scrollAnimationFrame);
  }

  const startY = window.scrollY;
  const distance = destination - startY;
  const duration = Math.min(1500, Math.max(700, Math.abs(distance) * 0.52));
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
  },
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
  },
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

const getWrappedPage = (page, totalPages) => {
  if (totalPages <= 0) {
    return 0;
  }

  return ((page % totalPages) + totalPages) % totalPages;
};

const getClosestPageIndex = (state) => {
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

  return closestPage;
};

const updateCarouselButtons = (state) => {
  const {
    currentPage,
    pageOffsets,
    prevButton,
    nextButton,
    status,
    paginationButtons,
  } = state;
  const totalPages = pageOffsets.length;

  if (status) {
    status.textContent = `${String(currentPage + 1).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;
  }

  if (prevButton) {
    prevButton.disabled = totalPages <= 1;
  }

  if (nextButton) {
    nextButton.disabled = totalPages <= 1;
  }

  paginationButtons.forEach((button, index) => {
    button.classList.toggle("is-active", index === currentPage);
    button.setAttribute(
      "aria-current",
      index === currentPage ? "true" : "false",
    );
  });
};

const scrollCarouselToPage = (state, page, smooth = true, wrap = false) => {
  const totalPages = state.pageOffsets.length;

  if (totalPages === 0) {
    return;
  }

  const targetPage = wrap
    ? getWrappedPage(page, totalPages)
    : Math.max(0, Math.min(page, totalPages - 1));
  const isLoopJump = state.loop && wrap && (page < 0 || page >= totalPages);
  const targetOffset = isLoopJump
    ? (page < 0
      ? state.prePageOffsets[totalPages - 1]
      : state.postPageOffsets[0])
    : state.pageOffsets[targetPage] || 0;

  state.currentPage = targetPage;

  state.viewport.scrollTo({
    left: targetOffset,
    behavior: smooth && !prefersReducedMotion.matches ? "smooth" : "auto",
  });

  updateCarouselButtons(state);

  if (isLoopJump) {
    window.clearTimeout(state.loopTimer);
    state.loopTimer = window.setTimeout(() => {
      state.viewport.scrollTo({
        left: state.pageOffsets[targetPage] || 0,
        behavior: "auto",
      });
    }, prefersReducedMotion.matches ? 0 : 620);
  }
};

const getCarouselStep = (carousel, visibleCount) => {
  const configuredStep = Number(carousel.dataset.step || "0");
  return configuredStep > 0 ? configuredStep : visibleCount;
};

const syncCarouselFromScroll = (state) => {
  const closestPage = getClosestPageIndex(state);

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
  const step = getCarouselStep(carousel, visibleCount);
  const pageOffsets = [];

  carousel.style.setProperty("--visible-count", String(visibleCount));

  for (let index = 0; index < slides.length; index += step) {
    pageOffsets.push(slides[index].offsetLeft);
  }

  state.visibleCount = visibleCount;
  state.step = step;
  state.pageOffsets = pageOffsets;

  if (state.loop) {
    state.prePageOffsets = [];
    state.postPageOffsets = [];

    for (let index = 0; index < state.preClones.length; index += step) {
      state.prePageOffsets.push(state.preClones[index].offsetLeft);
      state.postPageOffsets.push(state.postClones[index].offsetLeft);
    }
  }

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
      dragPointerId: null,
      dragStartX: 0,
      dragStartScrollLeft: 0,
      dragDeltaX: 0,
      dragMoved: false,
      loop: carousel.dataset.loop === "true",
      preClones: [],
      postClones: [],
      prePageOffsets: [],
      postPageOffsets: [],
      loopTimer: 0,
      autoTimer: 0,
    };

    if (!state.viewport || !state.track || state.slides.length === 0) {
      return;
    }

    if (state.loop) {
      const makeClone = (slide) => {
        const clone = slide.cloneNode(true);
        clone.dataset.carouselClone = "true";
        clone.setAttribute("aria-hidden", "true");
        clone.classList.remove("reveal", "is-visible");
        return clone;
      };

      const preFragment = document.createDocumentFragment();
      state.slides.forEach((slide) => {
        const clone = makeClone(slide);
        state.preClones.push(clone);
        preFragment.appendChild(clone);
      });

      const postFragment = document.createDocumentFragment();
      state.slides.forEach((slide) => {
        const clone = makeClone(slide);
        state.postClones.push(clone);
        postFragment.appendChild(clone);
      });

      state.track.prepend(preFragment);
      state.track.append(postFragment);
    }

    state.prevButton?.addEventListener("click", () => {
      scrollCarouselToPage(state, state.currentPage - 1, true, true);
    });

    state.nextButton?.addEventListener("click", () => {
      scrollCarouselToPage(state, state.currentPage + 1, true, true);
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
      { passive: true },
    );

    const stopDragging = (event) => {
      if (state.dragPointerId === null) {
        return;
      }

      if (
        event &&
        "pointerId" in event &&
        event.pointerId !== state.dragPointerId
      ) {
        return;
      }

      state.viewport.classList.remove("is-dragging");

      const maxOffset = state.pageOffsets[state.pageOffsets.length - 1] || 0;
      const threshold = 60;
      const edgeThreshold = 12;
      const atStart = state.viewport.scrollLeft <= edgeThreshold;
      const atEnd = state.viewport.scrollLeft >= maxOffset - edgeThreshold;
      const deltaX = state.dragDeltaX;
      const moved = state.dragMoved;
      const activePointerId = state.dragPointerId;

      state.dragPointerId = null;
      state.dragStartX = 0;
      state.dragStartScrollLeft = 0;
      state.dragDeltaX = 0;
      state.dragMoved = false;

      if (event && state.viewport.hasPointerCapture?.(activePointerId)) {
        state.viewport.releasePointerCapture(activePointerId);
      }

      if (!moved && Math.abs(deltaX) < 1) {
        return;
      }

      if (state.pageOffsets.length > 1) {
        if (atStart && deltaX > threshold) {
          scrollCarouselToPage(state, state.currentPage - 1, true, true);
          return;
        }

        if (atEnd && deltaX < -threshold) {
          scrollCarouselToPage(state, state.currentPage + 1, true, true);
          return;
        }
      }

      scrollCarouselToPage(state, getClosestPageIndex(state));
    };

    state.viewport.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      state.dragPointerId = event.pointerId;
      state.dragStartX = event.clientX;
      state.dragStartScrollLeft = state.viewport.scrollLeft;
      state.dragDeltaX = 0;
      state.dragMoved = false;

      state.viewport.classList.add("is-dragging");
      state.viewport.setPointerCapture?.(event.pointerId);
    });

    state.viewport.addEventListener("pointermove", (event) => {
      if (state.dragPointerId !== event.pointerId) {
        return;
      }

      state.dragDeltaX = event.clientX - state.dragStartX;

      if (Math.abs(state.dragDeltaX) > 4) {
        state.dragMoved = true;
      }

      state.viewport.scrollLeft = state.dragStartScrollLeft - state.dragDeltaX;

      if (state.dragMoved) {
        event.preventDefault();
      }
    });

    state.viewport.addEventListener("pointerup", stopDragging);
    state.viewport.addEventListener("pointercancel", stopDragging);
    state.viewport.addEventListener("lostpointercapture", stopDragging);

    carouselStates.push(state);
    configureCarousel(state);

    if (carousel.dataset.autoplay === "true" && !prefersReducedMotion.matches) {
      const pauseAutoPlay = () => window.clearInterval(state.autoTimer);
      const startAutoPlay = () => {
        pauseAutoPlay();
        state.autoTimer = window.setInterval(() => {
          if (!document.hidden && state.dragPointerId === null) {
            scrollCarouselToPage(state, state.currentPage + 1, true, true);
          }
        }, 4200);
      };

      carousel.addEventListener("pointerenter", pauseAutoPlay);
      carousel.addEventListener("pointerleave", startAutoPlay);
      carousel.addEventListener("focusin", pauseAutoPlay);
      carousel.addEventListener("focusout", startAutoPlay);
      startAutoPlay();
    }
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
  { passive: true },
);

window.addEventListener(
  "scroll",
  () => {
    setScrolledState();
  },
  { passive: true },
);

revealNodes.forEach((node) => revealObserver.observe(node));
document
  .querySelectorAll(".count-up")
  .forEach((counter) => counterObserver.observe(counter));

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

    contactStatus.textContent =
      "Opening your email app with a prefilled message.";
    window.location.href = mailto;
    contactForm.reset();
  });
}

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const learningFiles = [
  "Ai handbook.pdf", "C--.pdf", "CN notes part 2.pdf", "Coding Pattern.pdf", "Collections.pdf",
  "Computer Networks notes 1.pdf", "Copy of Sql part 2.pdf", "DevOps Notes.pdf", "Docker notes.pdf", "DSASheet.pdf",
  "Git Notes.pdf", "GitSheet.pdf", "Java Fundamental 1.pdf", "Java Program part 1.pdf", "Java script 2.pdf",
  "Java script part 1.pdf", "Java Tricky.pdf", "Kafka.pdf", "Kubernates Notes.pdf", "Linux pdf.pdf",
  "Low level design .pdf", "Maven Handbook.pdf", "NodeJs.pdf", "Oops.pdf", "Opesrating system.pdf",
  "Playwright .pdf", "Playwright Framework .pdf", "Playwright questions.pdf", "Python cheat sheet.pdf", "Python Oops and Collection .pdf",
  "Python part 3.pdf", "Python Questions .pdf", "Python Quick Notes.pdf", "Python sheet 2.pdf", "React Js.pdf",
  "Recursion .pdf", "Rest Api.pdf", "Rest Assured .pdf", "Selenium Questions.pdf", "Selenium.pdf",
  "Sorting And Searching.pdf", "Spring boot part 1.pdf", "Spring boot part 2.pdf", "Spring JPA- JWT.pdf", "Sql cheat sheet.pdf",
  "Sql handbook 1.pdf", "Sql part 2.pdf", "Sql Sheet.pdf", "System design part 1.pdf", "System design part 2.pdf",
  "System design Questions .pdf", "Tree and Graph.pdf", "Web development .pdf",
];

const learningList = document.querySelector("[data-learning-list]");
const learningSearch = document.querySelector("[data-library-search]");
const learningFilters = document.querySelector("[data-library-filters]");
const learningEmpty = document.querySelector("[data-library-empty]");
const pdfViewer = document.querySelector("[data-pdf-viewer]");
const pdfStage = document.querySelector("[data-pdf-stage]");
const pdfTitle = document.querySelector("[data-pdf-viewer-title]");
const pdfOpen = document.querySelector("[data-pdf-open]");

const getLearningCategory = (file) => {
  const name = file.toLowerCase();
  if (/(python|java |c--|nodejs|react|web development|javascript)/.test(name)) return "Development";
  if (/(sql|rest|api|spring|maven|kafka)/.test(name)) return "Backend & Data";
  if (/(docker|kubernates|devops|git|linux)/.test(name)) return "Cloud & DevOps";
  if (/(system design|low level|coding pattern|dsa|recursion|sorting|tree|graph)/.test(name)) return "Engineering";
  if (/(playwright|selenium)/.test(name)) return "Testing";
  if (/(network|opesrating)/.test(name)) return "Fundamentals";
  return "General";
};

const displayLearningTitle = (file) => file
  .replace(/\.pdf$/i, "")
  .replace(/\bpart\s+(\d+)/i, "Part $1")
  .replace(/\s+/g, " ")
  .trim();

const showPdfMessage = (message, detail = "") => {
  if (!pdfStage) return;
  pdfStage.innerHTML = `<div class="pdf-stage-message"><div><strong>${message}</strong>${detail ? `<span>${detail}</span>` : ""}</div></div>`;
};

const renderHostedPdfFallback = (url) => {
  if (!pdfStage) return;

  const absoluteUrl = new URL(url, window.location.href).href;
  const viewer = document.createElement("iframe");
  viewer.className = "pdf-hosted-viewer";
  viewer.title = "Document preview";
  viewer.src = `https://docs.google.com/gview?embedded=1&url=${encodeURIComponent(absoluteUrl)}`;
  pdfStage.replaceChildren(viewer);
};

const renderPdfPreview = async (url) => {
  if (!pdfStage) return;

  showPdfMessage("Preparing preview…", "Loading the document pages.");

  if (!window.pdfjsLib) {
    renderHostedPdfFallback(url);
    return;
    showPdfMessage("Preview is unavailable.", "Use “Open in new tab” to view this PDF.");
    return;
  }

  try {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const pdf = await window.pdfjsLib.getDocument(url).promise;
    pdfStage.replaceChildren();

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      const page = await pdf.getPage(pageNumber);
      const baseViewport = page.getViewport({ scale: 1 });
      const availableWidth = Math.max(pdfStage.clientWidth - 12, 280);
      const scale = Math.min(Math.max(availableWidth / baseViewport.width, 1), 1.65);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { alpha: false });
      const density = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(viewport.width * density);
      canvas.height = Math.floor(viewport.height * density);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;
      pdfStage.appendChild(canvas);
      await page.render({
        canvasContext: context,
        viewport,
        transform: density === 1 ? null : [density, 0, 0, density, 0, 0],
      }).promise;
    }
  } catch (error) {
    renderHostedPdfFallback(url);
    return;
    showPdfMessage("This document could not be previewed.", "Use “Open in new tab” to view or download it.");
  }
};

if (learningList && learningFilters) {
  const learningItems = learningFiles.map((file) => ({
    file,
    title: displayLearningTitle(file),
    category: getLearningCategory(file),
    href: encodeURI(`assets/notes/${file}`),
  }));
  let activeLearningFilter = "All";
  let learningQuery = "";

  const renderLibrary = () => {
    const filteredItems = learningItems.filter((item) => {
      const matchesFilter = activeLearningFilter === "All" || item.category === activeLearningFilter;
      const searchable = `${item.title} ${item.category}`.toLowerCase();
      return matchesFilter && searchable.includes(learningQuery);
    });

    learningList.replaceChildren(...filteredItems.map((item) => {
      const card = document.createElement("article");
      card.className = "learning-card";
      card.innerHTML = `
        <div class="learning-card-top">
          <span class="learning-icon"><i class="fa-solid fa-file-pdf" aria-hidden="true"></i></span>
          <span class="learning-category">${item.category}</span>
        </div>
        <h3>${item.title}</h3>
        <p>Personal learning note and reference material.</p>
        <button class="learning-open" type="button" data-pdf-url="${item.href}" data-pdf-title="${item.title}">Preview PDF <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>`;
      return card;
    }));

    learningEmpty.hidden = filteredItems.length > 0;
  };

  const categories = ["All", ...new Set(learningItems.map((item) => item.category))];
  learningFilters.replaceChildren(...categories.map((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "library-filter";
    button.textContent = category;
    button.classList.toggle("is-active", category === activeLearningFilter);
    button.addEventListener("click", () => {
      activeLearningFilter = category;
      learningFilters.querySelectorAll("button").forEach((filterButton) => {
        filterButton.classList.toggle("is-active", filterButton.textContent === category);
      });
      renderLibrary();
    });
    return button;
  }));

  learningSearch?.addEventListener("input", () => {
    learningQuery = learningSearch.value.trim().toLowerCase();
    renderLibrary();
  });

  learningList.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-pdf-url]");
    if (!trigger || !pdfViewer || !pdfStage || !pdfTitle || !pdfOpen) return;

    const url = trigger.dataset.pdfUrl;
    pdfTitle.textContent = trigger.dataset.pdfTitle || "Document preview";
    pdfOpen.href = url;
    pdfViewer.showModal();
    renderPdfPreview(url);
  });

  renderLibrary();
}

document.querySelector("[data-pdf-close]")?.addEventListener("click", () => pdfViewer?.close());
pdfViewer?.addEventListener("close", () => {
  if (pdfStage) pdfStage.replaceChildren();
});

const finishPageLoad = () => {
  if (!pageLoader) {
    return;
  }

  window.setTimeout(() => pageLoader.classList.add("is-complete"), 280);
};

if (document.readyState === "complete") {
  finishPageLoad();
} else {
  window.addEventListener("load", finishPageLoad, { once: true });
}

// Desktop-only motion keeps touch interactions direct and preserves accessibility.
const motionEnabled = !prefersReducedMotion.matches && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (motionEnabled) {
  document.body.addEventListener("pointermove", (event) => {
    if (!cursorGlow) {
      return;
    }

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    document.body.classList.add("cursor-active");
  }, { passive: true });

  document.body.addEventListener("pointerleave", () => {
    document.body.classList.remove("cursor-active");
  });

  document.querySelectorAll(".button, .carousel-button").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.13;
      const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
      element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.removeProperty("transform");
    });
  });

  document.querySelectorAll(".metric-card, .info-card, .timeline-card, .project-card, .skill-card, .contact-card, .contact-form, .certificate-card").forEach((card) => {
    card.classList.add("tilt-card");
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const rotateY = (x - 0.5) * 5;
      const rotateX = (0.5 - y) * 5;

      card.style.setProperty("--pointer-x", `${x * 100}%`);
      card.style.setProperty("--pointer-y", `${y * 100}%`);
      card.style.transform = `perspective(900px) translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("transform");
    });
  });
}

const navLinks = Array.from(document.querySelectorAll(".topnav a[href^='#']"));
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (navSections.length) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  navSections.forEach((section) => navObserver.observe(section));
}
