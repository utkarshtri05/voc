const VIDEO_ITEMS = [
  {
    id: "v1",
    category: "shorts",
    title: "Shorts • Hook + Cut Rhythm",
    desc: "Short-form pacing with punchy transitions and clean captions.",
    tags: ["Short-form", "Captions", "Transitions"],
    // Demo source (placeholder). Replace with client’s real video URLs later.
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v2",
    category: "shorts",
    title: "Shorts • Sound-Design Punch",
    desc: "Beat-synced edits for maximum retention.",
    tags: ["Short-form", "Sound Design"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v3",
    category: "longform",
    title: "Long-form • Documentary Flow",
    desc: "Narrative structure with cinematic pacing and color polish.",
    tags: ["Long-form", "Documentary", "Color"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v4",
    category: "longform",
    title: "Long-form • Cinematic Storytelling",
    desc: "Smooth dynamics, captions for clarity, and polished grading.",
    tags: ["Long-form", "Cinematic"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v5",
    category: "gaming",
    
    title: "Gaming • Reaction Highlight",
    desc: "Fast cuts + zooms for impact, tuned to the action.",
    tags: ["Gaming", "Impact"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v6",
    category: "gaming",
    title: "Gaming • Montage Energy",
    desc: "Energy-first montage with clean titles and transitions.",
    tags: ["Gaming", "Montage"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v7",
    category: "football",
    title: "Football • Edge of the Play",
    desc: "Tight edits around key moments with tempo changes.",
    tags: ["Football", "Tempo"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v8",
    category: "football",
    title: "Football • Skill Montage",
    desc: "Crisp timing, cinematic overlays, and smooth pacing.",
    tags: ["Football", "Montage"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v9",
    category: "ecommerce",
    title: "eCommerce • Ad Creative Variant",
    desc: "Product-first composition with quick proof and CTA timing.",
    tags: ["eCommerce", "Ad"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v10",
    category: "ecommerce",
    title: "eCommerce • Conversion Cut",
    desc: "Hook → benefit → proof flow for better watch-time.",
    tags: ["eCommerce", "Conversion"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v11",
    category: "documentary",
    title: "Documentary • Interview Atmos",
    desc: "Natural tone with subtle grain, captions, and smooth transitions.",
    tags: ["Documentary", "Atmos"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v12",
    category: "colorgrading",
    title: "Color Grading • Cinematic Grade",
    desc: "Consistent skin tones and contrast tuning.",
    tags: ["Color Grading", "Contrast"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v13",
    category: "anime",
    title: "Anime • Speed Edit",
    desc: "Motion-focused transitions with clean text overlays.",
    tags: ["Anime", "Speed"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "v14",
    category: "ads",
    title: "Ads • Promo Teaser",
    desc: "Attention-grabbing motion with CTA timing.",
    tags: ["Ads", "Teaser"],
    src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  }
];

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

const grid = $("#grid");
const emptyState = $("#emptyState");
const filters = $$(".filter");
const searchInput = $("#searchInput");
const toggleMotion = $("#toggleMotion");
const btnClearFilters = $("#btnClearFilters");
const year = $("#year");

// Modal elements
const modal = $("#modal");
const modalClose = $("#modalClose");
const modalVideo = $("#modalVideo");
const modalCategory = $("#modalCategory");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const modalTags = $("#modalTags");
const modalBackdrop = $(".modal__backdrop");

let state = {
  category: "all",
  query: ""
};

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .trim();
}

function matches(item) {
  const catOk = state.category === "all" ? true : item.category === state.category;
  const q = normalize(state.query);
  if (!q) return catOk;
  const hay = normalize([item.title, item.desc, item.category, item.tags.join(" ")].join(" "));
  const qOk = hay.includes(q);
  return catOk && qOk;
}

function setActiveFilterButton() {
  filters.forEach((btn) => {
    const isActive = btn.dataset.filter === state.category;
    btn.setAttribute("aria-selected", String(isActive));
  });
}

function render(items) {
  grid.innerHTML = "";
  emptyState.hidden = items.length !== 0;

  items.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.setAttribute("data-item-id", item.id);
    card.setAttribute("aria-label", `Play preview: ${item.title}`);

    card.innerHTML = `
      <div class="card__thumb" aria-hidden="true">
        <video muted preload="metadata" src="${item.src}"></video>
        <div class="card__play">
          <div class="card__playBtn" aria-hidden="true">▶</div>
        </div>
      </div>
      <div class="card__body">
        <div class="card__title">${escapeHtml(item.title)}</div>
        <div class="card__meta">${escapeHtml(item.category.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (m)=>m.toUpperCase()))}</div>
        <div class="card__tags">
          ${item.tags.slice(0, 3).map((t) => `<span class="pill">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
    `;

    card.addEventListener("click", () => openModal(item));
    grid.appendChild(card);
  });

  applyFadeIn();
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "<")
    .replaceAll(">", ">")
    .replaceAll('"', """)
    .replaceAll("'", "&#039;");
}

function openModal(item) {
  modalCategory.textContent = item.category;
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.desc;
  modalTags.innerHTML = item.tags.map((t) => `<span class="pill">${escapeHtml(t)}</span>`).join("");

  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = item.src;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");

  // Focus close for accessibility
  modalClose.focus({ preventScroll: true });

  // Try play (will be blocked in some browsers until user gesture; click already happened)
  modalVideo.play().catch(() => {});
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
}

function applyFadeIn() {
  const enableMotion = toggleMotion ? toggleMotion.checked : true;
  const cards = $$(".card");
  cards.forEach((el) => {
    if (!enableMotion) {
      el.classList.remove("fade-in");
      el.classList.add("is-visible");
      return;
    }
    el.classList.add("fade-in");
  });

  if (!enableMotion || !("IntersectionObserver" in window)) {
    cards.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
      });
    },
    { threshold: 0.14 }
  );

  cards.forEach((el) => io.observe(el));
}

function getFilteredItems() {
  return VIDEO_ITEMS.filter(matches);
}

function syncAndRender() {
  setActiveFilterButton();
  const items = getFilteredItems();
  render(items);
}

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.category = btn.dataset.filter;
    syncAndRender();
  });
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value;
  syncAndRender();
});

toggleMotion.addEventListener("change", () => {
  applyFadeIn();
});

btnClearFilters.addEventListener("click", () => {
  state.category = "all";
  state.query = "";
  searchInput.value = "";
  syncAndRender();
  searchInput.focus({ preventScroll: true });
});

// Top bar CTA
$("#btnScrollToPortfolio").addEventListener("click", () => {
  const el = $("#portfolio");
  el.scrollIntoView({ behavior: "smooth", block: "start" });
});

year.textContent = new Date().getFullYear();

// Modal events
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target && e.target.dataset.close === "true") closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
});

// Initial render
syncAndRender();

