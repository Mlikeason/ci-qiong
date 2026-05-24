// 詞窮 — curated lyrics by 林夕 & 黃偉文 from Eason Chan's repertoire.
//
// LINE BREAK CONVENTION
//   In `line`, every whitespace span is a hard line break.
//   Breaks were placed by AI judgment of Chinese 詞語 boundaries:
//   - 2-char compounds (擁抱, 失去, 代價, 時間, 朋友, 旅行…) NEVER split across lines
//   - Each visual line is ≤5 chars so the font can be very large
//   - Rhythm follows the original song's breath pattern when possible
//
// TAGS
//   scenes:   工作 / 玩樂 / 躺平 / 旅行 / 見人 / 獨處 / 想念 / 創作
//   moods:    開心 / 平靜 / 透支 / 沮喪 / 焦慮 / 釋然 / 懷念 / 期待
//   feelings: 有收穫 / 想逃 / 被理解 / 被忽視 / 想改變 / 順其自然 / 想念某人 / 看清了
//
// PALETTES (defined in app.js):
//   ink-white, charcoal-white      — heavy darkness
//   navy-mustard, navy-cream       — quiet introspection
//   midnight-mustard               — anxious night
//   wine-white, burgundy-cream     — soft nostalgia
//   crimson-white                  — bold ache
//   plum-cream                     — yearning
//   rust-cream                     — bittersweet warmth
//   forest-pale, olive-cream       — natural calm
//   teal-yellow                    — meditative
//   gold-black, orange-black       — joyful, graphic

const LYRICS = [
  // ── 富士山下 ──────────────────────────────────────
  { line: "誰都只得 那雙手 靠擁抱亦難 任你擁有", song: "富士山下", author: "林夕", year: 2006,
    scenes: ["想念","獨處"], moods: ["釋然","懷念"], feelings: ["看清了","順其自然"], palette: "navy-mustard" },
  { line: "要擁有 必先懂失去 怎接受", song: "富士山下", author: "林夕", year: 2006,
    scenes: ["獨處","想念"], moods: ["釋然","沮喪"], feelings: ["看清了"], palette: "ink-white" },
  { line: "原諒我 不再送花 傷口應要 結疤", song: "富士山下", author: "林夕", year: 2006,
    scenes: ["獨處","想念"], moods: ["釋然","懷念"], feelings: ["看清了","順其自然"], palette: "wine-white" },
  { line: "一生一世 等一天 需要代價", song: "富士山下", author: "林夕", year: 2006,
    scenes: ["想念","獨處"], moods: ["懷念","沮喪"], feelings: ["想念某人"], palette: "plum-cream" },
  { line: "前塵硬化 像石頭 隨緣地拋下 便逃走", song: "富士山下", author: "林夕", year: 2006,
    scenes: ["獨處","旅行"], moods: ["釋然"], feelings: ["想逃","順其自然"], palette: "teal-yellow" },

  // ── 不如不見 ──────────────────────────────────────
  { line: "我想見的 笑臉 只有懷念", song: "不如不見", author: "林夕", year: 2006,
    scenes: ["想念","獨處"], moods: ["懷念","沮喪"], feelings: ["想念某人"], palette: "burgundy-cream" },
  { line: "越渴望見面 然後發現 中間隔着 那十年", song: "不如不見", author: "林夕", year: 2006,
    scenes: ["想念","見人"], moods: ["懷念","釋然"], feelings: ["看清了","想念某人"], palette: "navy-cream" },
  { line: "似等了 一百年 忽已明白", song: "不如不見", author: "林夕", year: 2006,
    scenes: ["想念","獨處"], moods: ["釋然","懷念"], feelings: ["看清了"], palette: "navy-mustard" },

  // ── K歌之王 ───────────────────────────────────────
  { line: "誰人又相信 一世一生 這膚淺對白", song: "K歌之王", author: "林夕", year: 2000,
    scenes: ["獨處","想念"], moods: ["釋然","沮喪"], feelings: ["看清了"], palette: "ink-white" },
  { line: "我只得 千語萬言 放在你心", song: "K歌之王", author: "林夕", year: 2000,
    scenes: ["想念","見人"], moods: ["懷念","期待"], feelings: ["想念某人"], palette: "wine-white" },

  // ── 浮誇 ─────────────────────────────────────────
  { line: "其實怕 被忘記 至放大 來演吧", song: "浮誇", author: "黃偉文", year: 2005,
    scenes: ["工作","創作"], moods: ["焦慮","透支"], feelings: ["被忽視","想改變"], palette: "crimson-white" },
  { line: "在世間 平凡又普通 的路太多", song: "浮誇", author: "黃偉文", year: 2005,
    scenes: ["工作","獨處"], moods: ["焦慮","沮喪"], feelings: ["想改變","被忽視"], palette: "charcoal-white" },
  { line: "情愛中 工作中 受過的忽視 太多", song: "浮誇", author: "黃偉文", year: 2005,
    scenes: ["工作","見人"], moods: ["透支","沮喪"], feelings: ["被忽視"], palette: "midnight-mustard" },
  { line: "未曾獲得過 便知我為何", song: "浮誇", author: "黃偉文", year: 2005,
    scenes: ["工作","獨處"], moods: ["焦慮","透支"], feelings: ["被忽視","想改變"], palette: "rust-cream" },

  // ── 葡萄成熟時 ──────────────────────────────────
  { line: "就算失收 始終要守", song: "葡萄成熟時", author: "黃偉文", year: 2005,
    scenes: ["工作","獨處","創作"], moods: ["平靜","期待"], feelings: ["順其自然","想改變"], palette: "forest-pale" },
  { line: "儘量別教 今天的淚 白流", song: "葡萄成熟時", author: "黃偉文", year: 2005,
    scenes: ["獨處","工作"], moods: ["釋然","期待"], feelings: ["有收穫","想改變"], palette: "gold-black" },
  { line: "留低擊傷 你的石頭 從錯誤裏 吸收", song: "葡萄成熟時", author: "黃偉文", year: 2005,
    scenes: ["工作","獨處","創作"], moods: ["釋然","平靜"], feelings: ["有收穫","看清了"], palette: "forest-pale" },
  { line: "別讓寂寞 害你傷得 一夜白頭", song: "葡萄成熟時", author: "黃偉文", year: 2005,
    scenes: ["獨處","想念"], moods: ["沮喪","懷念"], feelings: ["想念某人","順其自然"], palette: "plum-cream" },
  { line: "贏得 不需要的 自由 和最耀眼 傷口", song: "葡萄成熟時", author: "黃偉文", year: 2005,
    scenes: ["獨處","工作"], moods: ["釋然","沮喪"], feelings: ["看清了","有收穫"], palette: "wine-white" },
  { line: "或者要到 你將愛 釀成醇酒 時機先至 熟透", song: "葡萄成熟時", author: "黃偉文", year: 2005,
    scenes: ["獨處","想念","創作"], moods: ["平靜","期待"], feelings: ["順其自然","看清了"], palette: "plum-cream" },

  // ── 單車 ─────────────────────────────────────────
  { line: "難離難捨 想抱緊些 茫茫人生 好像荒野", song: "單車", author: "黃偉文", year: 2002,
    scenes: ["想念","獨處"], moods: ["懷念","沮喪"], feelings: ["想念某人"], palette: "navy-cream" },
  { line: "不説一句 的愛 有多好", song: "單車", author: "黃偉文", year: 2002,
    scenes: ["想念","見人"], moods: ["懷念","釋然"], feelings: ["想念某人","看清了"], palette: "navy-mustard" },

  // ── Shall We Talk ─────────────────────────────────
  { line: "如果心聲 真有療效 誰怕暴露 更多", song: "Shall We Talk", author: "林夕", year: 2001,
    scenes: ["見人","獨處"], moods: ["釋然","期待"], feelings: ["被理解","想改變"], palette: "teal-yellow" },
  { line: "若沉默似金 還談 什麼戀愛", song: "Shall We Talk", author: "林夕", year: 2001,
    scenes: ["見人","想念"], moods: ["焦慮","沮喪"], feelings: ["想改變"], palette: "midnight-mustard" },
  { line: "孩童只盼望 歡樂 大人只知道 期望", song: "Shall We Talk", author: "林夕", year: 2001,
    scenes: ["獨處","見人"], moods: ["釋然","沮喪"], feelings: ["看清了"], palette: "navy-cream" },

  // ── 最佳損友 ─────────────────────────────────────
  { line: "卻沒人像你 讓我眼淚 背着流", song: "最佳損友", author: "黃偉文", year: 2006,
    scenes: ["想念","見人"], moods: ["懷念","沮喪"], feelings: ["想念某人"], palette: "plum-cream" },
  { line: "來年陌生的 是昨日 最親的 某某", song: "最佳損友", author: "黃偉文", year: 2006,
    scenes: ["想念","獨處"], moods: ["懷念","釋然"], feelings: ["看清了","想念某人"], palette: "burgundy-cream" },
  { line: "被推着走 跟着生活流", song: "最佳損友", author: "黃偉文", year: 2006,
    scenes: ["工作","獨處"], moods: ["透支","平靜"], feelings: ["順其自然"], palette: "charcoal-white" },

  // ── 沙龍 ─────────────────────────────────────────
  { line: "留住温度 速度 温柔和憤怒 凝住今日 怎樣好", song: "沙龍", author: "黃偉文", year: 2007,
    scenes: ["創作","旅行","玩樂"], moods: ["開心","期待"], feelings: ["有收穫"], palette: "orange-black" },
  { line: "拍下過 記住過 好過擁有", song: "沙龍", author: "黃偉文", year: 2007,
    scenes: ["旅行","創作","玩樂"], moods: ["開心","釋然"], feelings: ["順其自然","有收穫"], palette: "orange-black" },
  { line: "其實人生 並非虛耗 何來塵埃 飛舞", song: "沙龍", author: "黃偉文", year: 2007,
    scenes: ["獨處","創作"], moods: ["釋然","平靜"], feelings: ["看清了","有收穫"], palette: "gold-black" },

  // ── 落花流水 ─────────────────────────────────────
  { line: "這趟旅行 若算開心 亦是無負 這一生", song: "落花流水", author: "黃偉文", year: 2006,
    scenes: ["旅行","獨處"], moods: ["釋然","平靜"], feelings: ["順其自然"], palette: "forest-pale" },
  { line: "習慣無常 才會慶幸", song: "落花流水", author: "黃偉文", year: 2006,
    scenes: ["獨處","見人"], moods: ["釋然","平靜"], feelings: ["看清了","順其自然"], palette: "teal-yellow" },
  { line: "淡淡交會過 各不留下印", song: "落花流水", author: "黃偉文", year: 2006,
    scenes: ["獨處","想念","見人"], moods: ["釋然","懷念"], feelings: ["順其自然","看清了"], palette: "teal-yellow" },
  { line: "命運敲定了 要這麼發生", song: "落花流水", author: "黃偉文", year: 2006,
    scenes: ["獨處"], moods: ["釋然","平靜"], feelings: ["順其自然"], palette: "navy-cream" },

  // ── 黑擇明 ───────────────────────────────────────
  { line: "他不姓黑 不怕黑 選了光", song: "黑擇明", author: "林夕", year: 2009,
    scenes: ["獨處","創作"], moods: ["期待","釋然"], feelings: ["想改變","看清了"], palette: "ink-white" },
  { line: "既然浮生 就如遊戲 心能 隨心揀戲", song: "黑擇明", author: "林夕", year: 2009,
    scenes: ["玩樂","獨處"], moods: ["釋然","開心"], feelings: ["順其自然","看清了"], palette: "plum-cream" },

  // ── 陀飛輪 ───────────────────────────────────────
  { line: "曾付出 幾多心跳 來換取 一堆堆的 發票", song: "陀飛輪", author: "黃偉文", year: 2010,
    scenes: ["工作","獨處"], moods: ["透支","釋然"], feelings: ["看清了","想改變"], palette: "charcoal-white" },
  { line: "為何 用到盡了 至知 哪樣緊要", song: "陀飛輪", author: "黃偉文", year: 2010,
    scenes: ["工作","獨處"], moods: ["透支","釋然"], feelings: ["看清了","想改變"], palette: "ink-white" },
  { line: "賣了任性 日拼夜拼 忘掉了 為甚麼 高興", song: "陀飛輪", author: "黃偉文", year: 2010,
    scenes: ["工作"], moods: ["透支","沮喪"], feelings: ["想改變","看清了"], palette: "midnight-mustard" },
  { line: "還剩低 幾多心跳 在時計裏 看破一生", song: "陀飛輪", author: "黃偉文", year: 2010,
    scenes: ["獨處","工作"], moods: ["釋然","平靜"], feelings: ["看清了"], palette: "ink-white" },

  // ── 苦瓜 ─────────────────────────────────────────
  { line: "幸得艱辛 的引路 甜蜜不致 太寡", song: "苦瓜", author: "黃偉文", year: 2011,
    scenes: ["獨處","工作"], moods: ["釋然","平靜"], feelings: ["有收穫","看清了"], palette: "olive-cream" },
  { line: "至共你覺得 苦也不太差", song: "苦瓜", author: "黃偉文", year: 2011,
    scenes: ["見人","獨處"], moods: ["釋然","平靜"], feelings: ["順其自然","被理解"], palette: "olive-cream" },
  { line: "做人沒有 苦澀 可以嗎", song: "苦瓜", author: "黃偉文", year: 2011,
    scenes: ["獨處"], moods: ["釋然","平靜"], feelings: ["看清了","順其自然"], palette: "olive-cream" },
  { line: "珍惜淡定 的心境 苦過後 更加清", song: "苦瓜", author: "黃偉文", year: 2011,
    scenes: ["獨處","躺平"], moods: ["平靜","釋然"], feelings: ["看清了"], palette: "teal-yellow" },

  // ── 一絲不掛 ─────────────────────────────────────
  { line: "勒到 呼吸困難 才知變 扯線木偶", song: "一絲不掛", author: "林夕", year: 2010,
    scenes: ["獨處","想念"], moods: ["透支","焦慮"], feelings: ["想逃","看清了"], palette: "plum-cream" },
  { line: "難道愛本身 可愛 在於束縛", song: "一絲不掛", author: "林夕", year: 2010,
    scenes: ["想念","獨處"], moods: ["釋然","懷念"], feelings: ["看清了"], palette: "plum-cream" },

  // ── 我的快樂時代 ────────────────────────────────
  { line: "毫無代價唱 最幸福的歌", song: "我的快樂時代", author: "林夕", year: 1998,
    scenes: ["玩樂","創作"], moods: ["開心","期待"], feelings: ["順其自然"], palette: "gold-black" },
  { line: "讓我有勇氣 去喊停 沒有結局 也可即興", song: "我的快樂時代", author: "林夕", year: 1998,
    scenes: ["玩樂","創作","旅行"], moods: ["開心","期待"], feelings: ["想改變","順其自然"], palette: "orange-black" },
  { line: "讓我對 這世界 好奇", song: "我的快樂時代", author: "林夕", year: 1998,
    scenes: ["旅行","玩樂","獨處"], moods: ["開心","期待"], feelings: ["有收穫"], palette: "gold-black" },

  // ── 失憶蝴蝶 ─────────────────────────────────────
  { line: "這樣遺憾 或者更完美", song: "失憶蝴蝶", author: "林夕", year: 2013,
    scenes: ["想念","獨處"], moods: ["釋然","懷念"], feelings: ["順其自然","看清了"], palette: "plum-cream" },
  { line: "讓大家 只差半步 成詩", song: "失憶蝴蝶", author: "林夕", year: 2013,
    scenes: ["想念","獨處"], moods: ["釋然","懷念"], feelings: ["看清了"], palette: "wine-white" },

  // ── 與我常在 ─────────────────────────────────────
  { line: "除非你是我 才可 與我常在", song: "與我常在", author: "林夕", year: 2003,
    scenes: ["獨處","想念"], moods: ["懷念","釋然"], feelings: ["看清了"], palette: "navy-cream" },

  // ── 太陽照常升起 ────────────────────────────────
  { line: "時間到了 轉身 不眨眼睛", song: "太陽照常升起", author: "林夕", year: 2007,
    scenes: ["獨處","工作"], moods: ["平靜","釋然"], feelings: ["順其自然","看清了"], palette: "rust-cream" },
  { line: "一天都光了 人潮如常 流動了", song: "太陽照常升起", author: "林夕", year: 2007,
    scenes: ["躺平","獨處"], moods: ["透支","平靜"], feelings: ["順其自然"], palette: "gold-black" },

  // ── 於心有愧 ─────────────────────────────────────
  { line: "如果我聽歌 可眼紅 何以待你好 偏不懂", song: "於心有愧", author: "林夕", year: 2009,
    scenes: ["想念","見人"], moods: ["沮喪","懷念"], feelings: ["想念某人","看清了"], palette: "burgundy-cream" },

  // ── 謝謝儂 ───────────────────────────────────────
  { line: "我的頭痛 不再痛 能夠生存 就有恃無恐", song: "謝謝儂", author: "林夕", year: 2010,
    scenes: ["躺平","獨處"], moods: ["釋然","平靜"], feelings: ["有收穫","順其自然"], palette: "olive-cream" },
  { line: "苦痛説了 沒人懂 愛人沒有用 我一樣 很有用", song: "謝謝儂", author: "林夕", year: 2010,
    scenes: ["獨處","工作"], moods: ["釋然","期待"], feelings: ["有收穫","想改變"], palette: "forest-pale" },

  // ── 裙下之臣 ─────────────────────────────────────
  { line: "活着 就是無樂趣 也勝在 有女人", song: "裙下之臣", author: "黃偉文", year: 2007,
    scenes: ["玩樂","見人"], moods: ["開心","釋然"], feelings: ["順其自然"], palette: "crimson-white" },

  // ── 今日 ─────────────────────────────────────────
  { line: "今天 珍惜今天", song: "今日", author: "黃偉文", year: 2025,
    scenes: ["躺平","獨處","見人"], moods: ["開心","釋然","平靜"], feelings: ["順其自然","有收穫"], palette: "gold-black" },
  { line: "抬頭吧 黑暗過 會是晨曦", song: "今日", author: "黃偉文", year: 2025,
    scenes: ["獨處"], moods: ["期待","釋然"], feelings: ["想改變"], palette: "midnight-mustard" },

  // ── 時光倒流二十年 ──────────────────────────────
  { line: "餘下日子 多閃幾倍光", song: "時光倒流二十年", author: "林夕", year: 2010,
    scenes: ["想念","獨處"], moods: ["懷念","期待"], feelings: ["想念某人"], palette: "wine-white" },
];

if (typeof module !== 'undefined') module.exports = { LYRICS };
