// ═══════════════ STATE & DATA ═══════════════
// Expanded tag pools. The first 8 in each are the "canonical" tags used in lyric metadata.
// Extra tags map to canonical ones via TAG_SYNONYMS so they still contribute to matching.
const SCENES_POOL = ["工作","玩樂","躺平","旅行","見人","獨處","想念","創作",
                     "學習","加班","約會","看片","寫作","出門"];
const MOODS_POOL = ["開心","平靜","透支","沮喪","焦慮","釋然","懷念","期待",
                    "孤單","煩躁","感動","興奮","放空","麻木"];
const FEELINGS_POOL = ["有收穫","想逃","被理解","被忽視","想改變","順其自然","想念某人","看清了",
                       "想休息","被治癒","想喝酒","想哭","需要陪伴","沒感覺"];

// Map extra tags to canonical ones for scoring
const TAG_SYNONYMS = {
  "學習":["工作","獨處"], "加班":["工作","透支"], "約會":["見人","想念"],
  "看片":["玩樂","躺平"], "寫作":["創作","獨處"], "出門":["旅行","玩樂"],
  "孤單":["沮喪","想念"], "煩躁":["焦慮","透支"], "感動":["懷念","釋然"],
  "興奮":["開心","期待"], "放空":["平靜","釋然"], "麻木":["透支","沮喪"],
  "想休息":["想逃","順其自然"], "被治癒":["有收穫","被理解"], "想喝酒":["想逃","想念某人"],
  "想哭":["沮喪","想念某人"], "需要陪伴":["想念某人","被理解"], "沒感覺":["順其自然","看清了"],
};

function expandTags(tags) {
  const out = new Set();
  tags.forEach(t => {
    out.add(t);
    if (TAG_SYNONYMS[t]) TAG_SYNONYMS[t].forEach(s => out.add(s));
  });
  return Array.from(out);
}

// Pick N distinct random items from arr, optionally always including `keep`
function pickRandom(arr, n, keep = []) {
  const visible = new Set(keep);
  const pool = arr.filter(x => !visible.has(x));
  while (visible.size < n && pool.length > 0) {
    const idx = Math.floor(Math.random() * pool.length);
    visible.add(pool.splice(idx, 1)[0]);
  }
  // Preserve original pool order for stable display
  return arr.filter(x => visible.has(x));
}

// Bicolor palettes — bg + fg are chosen as high-contrast graphic pairings
const PALETTES = {
  "ink-white":        { bg: "#0a0a0e", fg: "#ffffff" },
  "charcoal-white":   { bg: "#1c1c20", fg: "#ffffff" },
  "navy-mustard":     { bg: "#0e1f40", fg: "#e8b820" },
  "navy-cream":       { bg: "#10254a", fg: "#f0e4bc" },
  "midnight-mustard": { bg: "#0a1525", fg: "#d4a014" },
  "wine-white":       { bg: "#5a0a1c", fg: "#ffffff" },
  "burgundy-cream":   { bg: "#5e1828", fg: "#f5e2c8" },
  "crimson-white":    { bg: "#a01828", fg: "#ffffff" },
  "plum-cream":       { bg: "#3a0a3e", fg: "#f5e2c8" },
  "rust-cream":       { bg: "#8a2814", fg: "#f5e2c8" },
  "forest-pale":      { bg: "#1a4628", fg: "#f0e6a8" },
  "olive-cream":      { bg: "#3a4514", fg: "#f5ead0" },
  "teal-yellow":      { bg: "#0a3a3e", fg: "#f0e2a0" },
  "gold-black":       { bg: "#c8950e", fg: "#0a0a0e" },
  "orange-black":     { bg: "#d8581a", fg: "#0a0a0e" },
};

// Resolve colors from any lyric or saved entry (handles legacy `color`-only data)
function getColors(item) {
  if (item.palette && PALETTES[item.palette]) return PALETTES[item.palette];
  // Legacy entry — has `color` (bg) but no palette
  return { bg: item.color || "#1a1a1f", fg: "#ffffff" };
}

// Assign a random palette to a lyric (returns a new object)
const PALETTE_KEYS = Object.keys(PALETTES);
function withRandomPalette(lyric, excludeKey = null) {
  const pool = excludeKey
    ? PALETTE_KEYS.filter(k => k !== excludeKey)
    : PALETTE_KEYS;
  const palette = pool[Math.floor(Math.random() * pool.length)];
  return { ...lyric, palette };
}

const STORAGE_KEY = "lyrical_entries_v2_tc";

let state = {
  selectedScenes: [],
  selectedMoods: [],
  selectedFeelings: [],
  visibleScenes: pickRandom(SCENES_POOL, 8),
  visibleMoods: pickRandom(MOODS_POOL, 8),
  visibleFeelings: pickRandom(FEELINGS_POOL, 8),
  currentLyric: null,
  calCursor: new Date(), // currently viewed month
  reportRange: "week",
};

// ═══════════════ UTILITIES ═══════════════
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function fmtDate(d) {
  return `${d.getFullYear()} · ${String(d.getMonth()+1).padStart(2,"0")} · ${String(d.getDate()).padStart(2,"0")}`;
}

function loadEntries() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
  catch { return {}; }
}
function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// ═══════════════ MATCHING ═══════════════
function scoreLyrics(scenes, moods, feelings, excludeLines = []) {
  const ss = expandTags(scenes);
  const mm = expandTags(moods);
  const ff = expandTags(feelings);
  const scored = LYRICS.map(l => {
    let score = 0;
    ss.forEach(s => { if (l.scenes.includes(s)) score += 3; });
    mm.forEach(m => { if (l.moods.includes(m)) score += 4; });
    ff.forEach(f => { if (l.feelings.includes(f)) score += 5; });
    if (excludeLines.includes(l.line)) score -= 100;
    return { lyric: l, score };
  });
  scored.sort((a,b) => b.score - a.score);
  return scored;
}

function matchLyric(scenes, moods, feelings, excludeLines = []) {
  const scored = scoreLyrics(scenes, moods, feelings, excludeLines);
  const top = scored[0];
  const topPool = scored.filter(x => x.score >= top.score - 2 && x.score > 0);
  const pool = topPool.length > 0 ? topPool : scored.filter(x => x.score > 0);
  if (pool.length === 0) return LYRICS[Math.floor(Math.random()*LYRICS.length)];
  return pool[Math.floor(Math.random() * pool.length)].lyric;
}

// Pick 3 distinct lyrics from the top-matching pool, for the face-down picker.
function matchThreeLyrics(scenes, moods, feelings) {
  const scored = scoreLyrics(scenes, moods, feelings);
  const validPool = scored.filter(x => x.score > 0);
  // Need at least 3 candidates; if too few, fall back to random fills
  const pool = validPool.length >= 3
    ? validPool.slice(0, Math.max(8, Math.ceil(validPool.length * 0.5)))
    : scored;
  // Sample 3 distinct
  const picks = [];
  const used = new Set();
  while (picks.length < 3 && picks.length < pool.length) {
    const idx = Math.floor(Math.random() * pool.length);
    if (!used.has(idx)) {
      used.add(idx);
      picks.push(pool[idx].lyric);
    }
  }
  return picks;
}

// ═══════════════ ROUTER ═══════════════
function showPage(name) {
  $$(".page").forEach(p => p.classList.remove("active"));
  $(`#page-${name}`).classList.add("active");
  $$(".nav-link").forEach(n => n.classList.toggle("active", n.dataset.page === name));
  if (name === "calendar") renderCalendar();
  if (name === "report") renderReport();
}

// ═══════════════ TODAY PAGE ═══════════════
function renderChips(container, options, selected, onClick) {
  container.innerHTML = "";
  options.forEach(opt => {
    const b = document.createElement("button");
    b.className = "chip" + (selected.includes(opt) ? " selected" : "");
    b.textContent = opt;
    b.onclick = () => onClick(opt);
    container.appendChild(b);
  });
}

function toggleIn(arr, val, max = 3) {
  const i = arr.indexOf(val);
  if (i >= 0) arr.splice(i, 1);
  else if (arr.length < max) arr.push(val);
}

function refreshTodayPage() {
  renderChips($("#sceneChips"), state.visibleScenes, state.selectedScenes, (val) => {
    toggleIn(state.selectedScenes, val, 2);
    if (state.selectedScenes.length > 0) $("#moodSection").style.display = "block";
    refreshTodayPage();
  });
  renderChips($("#moodChips"), state.visibleMoods, state.selectedMoods, (val) => {
    toggleIn(state.selectedMoods, val, 2);
    if (state.selectedMoods.length > 0) {
      $("#feelingSection").style.display = "block";
      $("#actionRow").style.display = "flex";
    }
    refreshTodayPage();
  });
  renderChips($("#feelingChips"), state.visibleFeelings, state.selectedFeelings, (val) => {
    toggleIn(state.selectedFeelings, val, 2);
    refreshTodayPage();
  });

  // Show today's saved lyric, if any
  const entries = loadEntries();
  const todayEntry = entries[todayKey()];
  const recent = $("#recentList");
  recent.innerHTML = "";
  const allKeys = Object.keys(entries).sort().reverse().slice(0, 4);
  if (allKeys.length === 0) {
    recent.innerHTML = '<div class="empty"><div class="empty-line">還沒有記錄</div><div style="font-size:12px">選完標籤，會有一句歌詞來找你</div></div>';
  } else {
    allKeys.forEach(k => {
      const e = entries[k];
      const row = document.createElement("div");
      row.className = "report-row";
      row.style.cursor = "pointer";
      row.onclick = () => openDayModal(k);
      const dt = new Date(k);
      const c = getColors(e);
      row.innerHTML = `
        <div class="report-day-color" style="background:${c.bg}">
          <span style="color:${c.fg};opacity:0.85">${dt.getMonth()+1}/${dt.getDate()}</span>
        </div>
        <div>
          <div class="report-line">${e.line}</div>
          <div class="report-attribution">${e.author} · ${e.song}</div>
        </div>
      `;
      recent.appendChild(row);
    });
  }
}

function reset() {
  state.selectedScenes = [];
  state.selectedMoods = [];
  state.selectedFeelings = [];
  $("#moodSection").style.display = "none";
  $("#feelingSection").style.display = "none";
  $("#actionRow").style.display = "none";
  refreshTodayPage();
}

// Re-pick a fresh 8 from a category's pool, keeping any currently-selected tags
function reshuffleChips(category) {
  if (category === "scene") {
    state.visibleScenes = pickRandom(SCENES_POOL, 8, state.selectedScenes);
  } else if (category === "mood") {
    state.visibleMoods = pickRandom(MOODS_POOL, 8, state.selectedMoods);
  } else if (category === "feeling") {
    state.visibleFeelings = pickRandom(FEELINGS_POOL, 8, state.selectedFeelings);
  }
  refreshTodayPage();
}

// ═══════════════ PICK PAGE (3 face-down cards) ═══════════════
function renderPick() {
  // Pick 3 matched lyrics, then give each a DIFFERENT random palette
  const matched = matchThreeLyrics(state.selectedScenes, state.selectedMoods, state.selectedFeelings);
  const usedPalettes = new Set();
  const three = matched.map(lyric => {
    let p;
    do { p = PALETTE_KEYS[Math.floor(Math.random() * PALETTE_KEYS.length)]; }
    while (usedPalettes.has(p) && usedPalettes.size < PALETTE_KEYS.length);
    usedPalettes.add(p);
    return { ...lyric, palette: p };
  });
  state.pickCandidates = three;
  const wrap = $("#pickCards");
  wrap.innerHTML = "";
  const labels = ["一", "二", "三"];
  three.forEach((l, i) => {
    const colors = getColors(l);
    const card = document.createElement("div");
    card.className = "pick-card";
    card.style.background = colors.bg;
    card.innerHTML = `<div class="pick-card-num" style="color:${colors.fg};opacity:0.55">${labels[i]}</div>`;
    card.onclick = () => choosePick(i);
    wrap.appendChild(card);
  });
}

function choosePick(idx) {
  const wrap = $("#pickCards");
  const cards = wrap.children;
  for (let i = 0; i < cards.length; i++) {
    if (i === idx) cards[i].classList.add("chosen");
    else cards[i].classList.add("fade-out");
  }
  setTimeout(() => {
    renderCard(state.pickCandidates[idx], true);
    showPage("card");
  }, 480);
}

// ═══════════════ CARD PAGE ═══════════════
// Split by whitespace into logical lines (each space => line break)
function splitToLines(line) {
  return line.split(/\s+/).filter(x => x.length > 0);
}

// Auto-fit font sizing.
// Compute the largest font size that fits the lyric within the available
// area, constrained by both the longest line (horizontal) and the line
// count (vertical). Returns a unitless number — caller decides whether
// to interpret it as cqi (screen) or px (canvas).
function calcAutoFit(lines, areaW, areaH, opts = {}) {
  const charFactor = opts.charFactor ?? 0.95;  // Chinese char width / font-size
  const lineHeight = opts.lineHeight ?? 1.12;
  const longest = Math.max(...lines.map(l => l.length));
  const N = lines.length;
  const byWidth = areaW / (longest * charFactor);
  const byHeight = areaH / (N * lineHeight);
  let size = Math.min(byWidth, byHeight);
  if (opts.min != null) size = Math.max(opts.min, size);
  if (opts.max != null) size = Math.min(opts.max, size);
  return size;
}

// Convenience: compute font-size in `cqi` units for the screen card / modal.
// areaWPct / areaHPct are the lyric-area dimensions as % of the container.
function calcAutoFitCqi(lines, areaWPct = 88, areaHPct = 73, max = 32) {
  return calcAutoFit(lines, areaWPct, areaHPct, { min: 7, max });
}

// Render the lyric as line elements, each with per-character stagger spans
function renderLyricLines(line, animated) {
  const frag = document.createDocumentFragment();
  const lines = splitToLines(line);
  let charIdx = 0;
  lines.forEach(lineText => {
    const lineEl = document.createElement("div");
    lineEl.className = "lyric-line";
    Array.from(lineText).forEach(c => {
      const sp = document.createElement("span");
      sp.className = "char";
      sp.textContent = c;
      if (animated) {
        sp.style.animationDelay = `${0.25 + charIdx * 0.06}s`;
      } else {
        sp.style.animation = "none";
        sp.style.opacity = 1;
        sp.style.transform = "none";
        sp.style.filter = "none";
      }
      lineEl.appendChild(sp);
      charIdx++;
    });
    frag.appendChild(lineEl);
  });
  return { frag, count: charIdx };
}

function renderCard(lyric, animated = false) {
  state.currentLyric = lyric;
  const card = $("#lyricCard");
  const colors = getColors(lyric);
  card.style.background = colors.bg;
  const lineEl = $("#cardLine");
  lineEl.className = "card-line heavy";
  lineEl.style.color = colors.fg;
  lineEl.style.webkitTextStroke = `1.2px ${colors.fg}`;
  // Auto-fit: lyric area ≈ 88% × 73% of card (after padding 22 + badge zone)
  const cqi = calcAutoFitCqi(splitToLines(lyric.line), 88, 73, 30);
  lineEl.style.fontSize = `${cqi}cqi`;
  lineEl.innerHTML = "";
  const { frag, count } = renderLyricLines(lyric.line, animated);
  lineEl.appendChild(frag);

  // Inverted-color badges: bg = palette.fg, text = palette.bg
  const authorEl = $("#cardAuthor");
  const songEl = $("#cardSong");
  authorEl.textContent = lyric.author;
  songEl.textContent = lyric.song;
  authorEl.style.background = colors.fg;
  authorEl.style.color = colors.bg;
  songEl.style.background = colors.fg;
  songEl.style.color = colors.bg;

  const attrib = $("#cardAttrib");
  attrib.classList.remove("shown");
  card.classList.remove("entering");

  if (animated) {
    // Trigger card enter animation
    requestAnimationFrame(() => card.classList.add("entering"));
    // Attribution waits until characters mostly finished
    const attribDelay = 250 + count * 60 + 600; // ms
    setTimeout(() => attrib.classList.add("shown"), attribDelay);
  } else {
    attrib.classList.add("shown");
  }

  // Show what tags resulted in this match
  const tagsEl = $("#cardTags");
  tagsEl.innerHTML = "";
  [...state.selectedScenes, ...state.selectedMoods, ...state.selectedFeelings].forEach(t => {
    const span = document.createElement("span");
    span.className = "card-tag";
    span.textContent = t;
    tagsEl.appendChild(span);
  });

  // Update save button
  const entries = loadEntries();
  const saved = entries[todayKey()] && entries[todayKey()].line === lyric.line;
  $("#saveBtn").textContent = saved ? "已 收 入 ✓" : "收 入 歌 歷";
  $("#saveBtn").classList.toggle("saved-indicator", saved);
}

function findLyric() {
  // New flow: route through pick page
  renderPick();
  showPage("pick");
}

function skipPick() {
  const lyric = matchLyric(state.selectedScenes, state.selectedMoods, state.selectedFeelings);
  renderCard(withRandomPalette(lyric), true);
  showPage("card");
}

function reshuffle() {
  if (!state.currentLyric) return;
  const lyric = matchLyric(state.selectedScenes, state.selectedMoods, state.selectedFeelings, [state.currentLyric.line]);
  // New lyric AND new palette (different from current)
  renderCard(withRandomPalette(lyric, state.currentLyric.palette), true);
}

function saveToCalendar() {
  if (!state.currentLyric) return;
  const entries = loadEntries();
  entries[todayKey()] = {
    ...state.currentLyric,
    scenes: [...state.selectedScenes],
    moods: [...state.selectedMoods],
    feelings: [...state.selectedFeelings],
    savedAt: new Date().toISOString(),
  };
  saveEntries(entries);
  $("#saveBtn").textContent = "已 收 入 ✓";
  $("#saveBtn").classList.add("saved-indicator");
}

// ═══════════════ CANVAS EXPORT ═══════════════
async function exportImage() {
  const lyric = state.currentLyric;
  if (!lyric) return;

  // Wait for Noto Sans TC heavy weight to be ready before drawing
  try {
    await document.fonts.load('900 100px "Noto Sans TC"');
    await document.fonts.ready;
  } catch (e) { /* fall back to system font */ }

  const SIZE = 1080;
  const PADDING = 58;  // matches screen card's 22px padding × (1080/408) ratio
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");

  // Background + foreground from palette
  const colors = getColors(lyric);
  ctx.fillStyle = colors.bg;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // ── Pre-compute attribution badge dimensions (we need to know how much
  // vertical space they take before we can size the lyric).
  const songFont    = 42, songPadX = 24, songPadY = 11;
  const authorFont  = 28, authorPadX = 19, authorPadY = 7;
  const badgeGap    = 11;
  const songH   = songFont   + songPadY   * 2;
  const authorH = authorFont + authorPadY * 2;
  const songY   = SIZE - PADDING - songH;
  const authorY = songY - badgeGap - authorH;

  // ── Auto-fit the lyric font to fill the available area without
  // colliding with the badges.
  const lines = splitToLines(lyric.line);
  const lyricAreaTop    = PADDING;
  const lyricAreaBottom = authorY - 28;        // small breathing gap
  const lyricAreaW      = SIZE - PADDING * 2;
  const lyricAreaH      = lyricAreaBottom - lyricAreaTop;
  const fontSize = calcAutoFit(lines, lyricAreaW, lyricAreaH, {
    charFactor: 0.95, lineHeight: 1.12, min: 60, max: 290,
  });
  const lineHeight = fontSize * 1.12;

  ctx.fillStyle    = colors.fg;
  ctx.strokeStyle  = colors.fg;
  ctx.lineWidth    = Math.max(2, fontSize / 70);   // stroke scales with font
  ctx.lineJoin     = "round";
  ctx.textBaseline = "top";
  ctx.font = `900 ${fontSize}px "Noto Sans TC", "PingFang TC", "PingFang HK", "Hiragino Sans CNS", "Microsoft JhengHei", sans-serif`;

  lines.forEach((text, i) => {
    const y = lyricAreaTop + i * lineHeight;
    ctx.fillText(text, PADDING, y);
    ctx.strokeText(text, PADDING, y);
  });

  // ── Attribution badges — author smaller on top, song larger below
  ctx.strokeStyle = "transparent";
  ctx.lineWidth = 0;
  ctx.textBaseline = "middle";

  ctx.font = `700 ${songFont}px "PingFang TC", "PingFang HK", "Hiragino Sans CNS", sans-serif`;
  const songTextW = ctx.measureText(lyric.song).width;
  const songW = songTextW + songPadX * 2;
  ctx.fillStyle = colors.fg;
  ctx.fillRect(PADDING, songY, songW, songH);
  ctx.fillStyle = colors.bg;
  ctx.fillText(lyric.song, PADDING + songPadX, songY + songH / 2 + 2);

  ctx.font = `700 ${authorFont}px "PingFang TC", "PingFang HK", "Hiragino Sans CNS", sans-serif`;
  const authorTextW = ctx.measureText(lyric.author).width;
  const authorW = authorTextW + authorPadX * 2;
  ctx.fillStyle = colors.fg;
  ctx.fillRect(PADDING, authorY, authorW, authorH);
  ctx.fillStyle = colors.bg;
  ctx.fillText(lyric.author, PADDING + authorPadX, authorY + authorH / 2 + 1);

  // Export — try native Web Share (iOS/Android sheet with WeChat, Instagram, etc.),
  // fall back to direct download (desktop browsers without share support).
  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
  const filename = `ciqiong-${lyric.song}-${todayKey()}.png`;
  const file = new File([blob], filename, { type: "image/png" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: "詞窮",
        text: `${lyric.author} 《${lyric.song}》`,
      });
      return;
    } catch (err) {
      if (err.name === "AbortError") return; // user dismissed sheet
      // Otherwise fall through to download
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

// Draw text with letter-spacing (canvas doesn't natively support letterSpacing in older browsers)
function drawTrackedText(ctx, text, x, y, tracking) {
  let cx = x;
  Array.from(text).forEach(c => {
    ctx.fillText(c, cx, y);
    cx += ctx.measureText(c).width + tracking;
  });
}

// Convert #rrggbb to rgba(...) with given alpha
function withAlpha(hex, alpha) {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ═══════════════ CALENDAR PAGE ═══════════════
function renderCalendar() {
  const cur = state.calCursor;
  const year = cur.getFullYear();
  const month = cur.getMonth();
  $("#calMonth").textContent = `${year} · ${String(month+1).padStart(2,"0")}`;

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month+1, 0);
  // Monday-based week start: 0 = Mon
  let leadEmpty = (firstDay.getDay() + 6) % 7;

  const grid = $("#calGrid");
  grid.innerHTML = "";

  for (let i = 0; i < leadEmpty; i++) {
    const div = document.createElement("div");
    div.className = "cal-cell empty";
    grid.appendChild(div);
  }

  const entries = loadEntries();
  const todayK = todayKey();
  let entryCount = 0;

  for (let day = 1; day <= lastDay.getDate(); day++) {
    const k = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const entry = entries[k];
    const cell = document.createElement("div");
    cell.className = "cal-cell";
    if (k === todayK) cell.classList.add("today");
    let fg = null;
    if (entry) {
      cell.classList.add("has-entry");
      const colors = getColors(entry);
      cell.style.background = colors.bg;
      fg = colors.fg;
      entryCount++;
    }
    const glyph = entry ? entry.line.replace(/\s/g, "").slice(0, 1) : "";
    cell.innerHTML = `
      <div class="cal-day"${fg ? ` style="color:${fg};opacity:0.75"` : ""}>${day}</div>
      <div class="cal-glyph"${fg ? ` style="color:${fg}"` : ""}>${glyph}</div>
    `;
    cell.onclick = () => {
      if (entry) openDayModal(k);
    };
    grid.appendChild(cell);
  }

  $("#calCount").textContent = `本月已記 ${entryCount} 天`;
}

// ═══════════════ DAY MODAL ═══════════════
function openDayModal(dateK) {
  const entries = loadEntries();
  const e = entries[dateK];
  if (!e) return;
  const colors = getColors(e);
  const dt = new Date(dateK);
  $("#modalDate").textContent = fmtDate(dt);
  $("#modalCard").style.background = colors.bg;
  // Modal lyric uses the same auto-fit logic as the main card,
  // with slightly tighter vertical constraint (smaller badge zone)
  const lineEl = $("#modalLine");
  lineEl.className = "card-line heavy";
  lineEl.innerHTML = "";
  lineEl.style.color = colors.fg;
  lineEl.style.webkitTextStroke = `0.6px ${colors.fg}`;
  const lines = splitToLines(e.line);
  const cqi = calcAutoFitCqi(lines, 88, 78, 28);  // modal cap slightly lower
  lineEl.style.fontSize = `${cqi}cqi`;
  lines.forEach(t => {
    const div = document.createElement("div");
    div.className = "lyric-line";
    div.textContent = t;
    lineEl.appendChild(div);
  });
  const ma = $("#modalAuthor"), ms = $("#modalSong");
  ma.textContent = e.author;
  ms.textContent = e.song;
  ma.style.background = colors.fg;
  ma.style.color = colors.bg;
  ms.style.background = colors.fg;
  ms.style.color = colors.bg;
  const tags = $("#modalTags");
  tags.innerHTML = "";
  [...(e.scenes||[]), ...(e.moods||[]), ...(e.feelings||[])].forEach(t => {
    const s = document.createElement("span");
    s.className = "card-tag";
    s.textContent = t;
    tags.appendChild(s);
  });
  $("#dayModal").classList.add("open");
}
function closeDayModal() { $("#dayModal").classList.remove("open"); }

// ═══════════════ REPORT PAGE ═══════════════
function getEntriesInRange(range) {
  const entries = loadEntries();
  const all = Object.entries(entries).sort((a,b) => a[0].localeCompare(b[0]));
  const today = new Date();
  if (range === "week") {
    // Last 7 days from today
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() - 6);
    return all.filter(([k]) => new Date(k) >= cutoff);
  }
  // Month
  return all.filter(([k]) => {
    const d = new Date(k);
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  });
}

function buildNarrative(entries, range) {
  if (entries.length === 0) {
    return range === "week"
      ? "這一周還沒有記錄。<br><span style='font-size:13px;color:#999'>點幾個標籤，讓一句歌詞陪你寫完它。</span>"
      : "這個月才剛開始。";
  }
  // Count tags
  const moodCount = {};
  const sceneCount = {};
  entries.forEach(([_, e]) => {
    (e.moods||[]).forEach(m => moodCount[m] = (moodCount[m]||0)+1);
    (e.scenes||[]).forEach(s => sceneCount[s] = (sceneCount[s]||0)+1);
  });
  const topMood = Object.entries(moodCount).sort((a,b) => b[1]-a[1])[0];
  const topScene = Object.entries(sceneCount).sort((a,b) => b[1]-a[1])[0];

  const authorCount = {};
  entries.forEach(([_, e]) => authorCount[e.author] = (authorCount[e.author]||0)+1);
  const topAuthor = Object.entries(authorCount).sort((a,b) => b[1]-a[1])[0];

  const period = range === "week" ? "這一周" : "這一個月";
  let narrative = `${period}你記錄了 ${entries.length} 天。`;
  if (topMood) narrative += `${topMood[0]}是常客，出現了 ${topMood[1]} 次。`;
  if (topScene) narrative += `多數日子都在${topScene[0]}。`;
  if (topAuthor) narrative += `<br><br>陪你最多的是${topAuthor[0]}的筆——他的話出現了 ${topAuthor[1]} 次。`;

  // Last line of period
  const last = entries[entries.length-1][1];
  narrative += `<br><br>最近的一句來自《${last.song}》：<br><span style="letter-spacing:0.04em">「${last.line}」</span>`;

  return narrative;
}

function renderReport() {
  const range = state.reportRange;
  const entries = getEntriesInRange(range);
  $$(".report-tab").forEach(t => t.classList.toggle("active", t.dataset.range === range));

  const body = $("#reportBody");
  body.innerHTML = `
    <div class="report-narrative serif">${buildNarrative(entries, range)}</div>
    <div class="section-label" style="margin-bottom:14px">每 一 句</div>
    <div class="report-list" id="reportList"></div>
  `;
  const list = $("#reportList");
  if (entries.length === 0) {
    list.innerHTML = '<div class="empty"><div class="empty-line">空白也是一種誠實</div></div>';
    return;
  }
  entries.reverse().forEach(([k, e]) => {
    const dt = new Date(k);
    const row = document.createElement("div");
    row.className = "report-row";
    row.style.cursor = "pointer";
    row.onclick = () => openDayModal(k);
    row.innerHTML = `
      <div class="report-day-color" style="background:${e.color}">
        <span>${dt.getMonth()+1}/${dt.getDate()}</span>
      </div>
      <div>
        <div class="report-line">${e.line}</div>
        <div class="report-attribution">${e.author} · 《${e.song}》</div>
      </div>
    `;
    list.appendChild(row);
  });
}

// ═══════════════ DEMO DATA SEED ═══════════════
// Seed some past days so calendar/report aren't empty on first run.
function seedDemoIfEmpty() {
  const entries = loadEntries();
  if (Object.keys(entries).length > 0) return;
  const today = new Date();
  const seedDays = [
    { offset: -1, sceneIdx: 0, moodIdx: 2, feelIdx: 4 }, // 工作 透支 想改變
    { offset: -2, sceneIdx: 5, moodIdx: 5, feelIdx: 5 }, // 獨處 釋然 順其自然
    { offset: -3, sceneIdx: 1, moodIdx: 0, feelIdx: 0 }, // 玩樂 開心 有收穫
    { offset: -5, sceneIdx: 6, moodIdx: 6, feelIdx: 6 }, // 想念 懷念 想念某人
    { offset: -7, sceneIdx: 3, moodIdx: 5, feelIdx: 5 }, // 旅行 釋然 順其自然
    { offset: -10, sceneIdx: 0, moodIdx: 4, feelIdx: 1 }, // 工作 焦慮 想逃
    { offset: -13, sceneIdx: 2, moodIdx: 1, feelIdx: 5 }, // 躺平 平靜 順其自然
  ];
  seedDays.forEach(s => {
    const d = new Date(today);
    d.setDate(d.getDate() + s.offset);
    const k = dateKey(d);
    const sn = SCENES_POOL[s.sceneIdx], mn = MOODS_POOL[s.moodIdx], fn = FEELINGS_POOL[s.feelIdx];
    const lyric = withRandomPalette(matchLyric([sn], [mn], [fn]));
    entries[k] = {
      ...lyric,
      scenes: [sn],
      moods: [mn],
      feelings: [fn],
      savedAt: d.toISOString(),
    };
  });
  saveEntries(entries);
}

// ═══════════════ INIT & EVENTS ═══════════════
function init() {
  const now = new Date();
  $("#topDate").textContent = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,"0")}.${String(now.getDate()).padStart(2,"0")}`;

  seedDemoIfEmpty();

  // Nav
  $$(".nav-link").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      showPage(a.dataset.page);
    });
  });

  // Today actions
  $("#findBtn").addEventListener("click", findLyric);
  $("#resetBtn").addEventListener("click", reset);
  $$(".section-reshuffle").forEach(btn => {
    btn.addEventListener("click", () => reshuffleChips(btn.dataset.category));
  });

  // Pick actions
  $("#pickSkip").addEventListener("click", skipPick);

  // Card actions
  $("#reshuffleBtn").addEventListener("click", reshuffle);
  $("#saveBtn").addEventListener("click", saveToCalendar);
  $("#exportBtn").addEventListener("click", exportImage);

  // Calendar nav
  $("#calPrev").addEventListener("click", () => {
    state.calCursor.setMonth(state.calCursor.getMonth() - 1);
    renderCalendar();
  });
  $("#calNext").addEventListener("click", () => {
    state.calCursor.setMonth(state.calCursor.getMonth() + 1);
    renderCalendar();
  });

  // Modal
  $("#modalClose").addEventListener("click", closeDayModal);
  $("#dayModal").addEventListener("click", e => {
    if (e.target.id === "dayModal") closeDayModal();
  });

  // Report tabs
  $$(".report-tab").forEach(t => {
    t.addEventListener("click", () => {
      state.reportRange = t.dataset.range;
      renderReport();
    });
  });

  refreshTodayPage();
}

window.addEventListener("DOMContentLoaded", init);
