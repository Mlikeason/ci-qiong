// 词穷 — curated lyrics by 林夕 & 黄伟文 from Eason Chan's repertoire.
//
// LINE BREAK CONVENTION
//   In `line`, every whitespace span is a hard line break.
//   Breaks were placed by AI judgment of Chinese 词语 boundaries:
//   - 2-char compounds (拥抱, 失去, 代价, 时间, 朋友, 旅行…) NEVER split across lines
//   - Each visual line is ≤5 chars so the font can be very large
//   - Rhythm follows the original song's breath pattern when possible
//
// TAGS
//   scenes:   工作 / 玩乐 / 躺平 / 旅行 / 见人 / 独处 / 想念 / 创作
//   moods:    开心 / 平静 / 透支 / 沮丧 / 焦虑 / 释然 / 怀念 / 期待
//   feelings: 有收获 / 想逃 / 被理解 / 被忽视 / 想改变 / 顺其自然 / 想念某人 / 看清了
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
  { line: "谁都只得 那双手 靠拥抱亦难 任你拥有", song: "富士山下", author: "林夕", year: 2006,
    scenes: ["想念","独处"], moods: ["释然","怀念"], feelings: ["看清了","顺其自然"], palette: "navy-mustard" },
  { line: "要拥有 必先懂失去 怎接受", song: "富士山下", author: "林夕", year: 2006,
    scenes: ["独处","想念"], moods: ["释然","沮丧"], feelings: ["看清了"], palette: "ink-white" },
  { line: "原谅我 不再送花 伤口应要 结疤", song: "富士山下", author: "林夕", year: 2006,
    scenes: ["独处","想念"], moods: ["释然","怀念"], feelings: ["看清了","顺其自然"], palette: "wine-white" },
  { line: "一生一世 等一天 需要代价", song: "富士山下", author: "林夕", year: 2006,
    scenes: ["想念","独处"], moods: ["怀念","沮丧"], feelings: ["想念某人"], palette: "plum-cream" },
  { line: "前尘硬化 像石头 随缘地抛下 便逃走", song: "富士山下", author: "林夕", year: 2006,
    scenes: ["独处","旅行"], moods: ["释然"], feelings: ["想逃","顺其自然"], palette: "teal-yellow" },

  // ── 不如不见 ──────────────────────────────────────
  { line: "我想见的 笑脸 只有怀念", song: "不如不见", author: "林夕", year: 2006,
    scenes: ["想念","独处"], moods: ["怀念","沮丧"], feelings: ["想念某人"], palette: "burgundy-cream" },
  { line: "越渴望见面 然后发现 中间隔着 那十年", song: "不如不见", author: "林夕", year: 2006,
    scenes: ["想念","见人"], moods: ["怀念","释然"], feelings: ["看清了","想念某人"], palette: "navy-cream" },
  { line: "似等了 一百年 忽已明白", song: "不如不见", author: "林夕", year: 2006,
    scenes: ["想念","独处"], moods: ["释然","怀念"], feelings: ["看清了"], palette: "navy-mustard" },

  // ── K歌之王 ───────────────────────────────────────
  { line: "谁人又相信 一世一生 这肤浅对白", song: "K歌之王", author: "林夕", year: 2000,
    scenes: ["独处","想念"], moods: ["释然","沮丧"], feelings: ["看清了"], palette: "ink-white" },
  { line: "我只得 千语万言 放在你心", song: "K歌之王", author: "林夕", year: 2000,
    scenes: ["想念","见人"], moods: ["怀念","期待"], feelings: ["想念某人"], palette: "wine-white" },

  // ── 浮夸 ─────────────────────────────────────────
  { line: "其实怕 被忘记 至放大 来演吧", song: "浮夸", author: "黄伟文", year: 2005,
    scenes: ["工作","创作"], moods: ["焦虑","透支"], feelings: ["被忽视","想改变"], palette: "crimson-white" },
  { line: "在世间 平凡又普通 的路太多", song: "浮夸", author: "黄伟文", year: 2005,
    scenes: ["工作","独处"], moods: ["焦虑","沮丧"], feelings: ["想改变","被忽视"], palette: "charcoal-white" },
  { line: "情爱中 工作中 受过的忽视 太多", song: "浮夸", author: "黄伟文", year: 2005,
    scenes: ["工作","见人"], moods: ["透支","沮丧"], feelings: ["被忽视"], palette: "midnight-mustard" },
  { line: "未曾获得过 便知我为何", song: "浮夸", author: "黄伟文", year: 2005,
    scenes: ["工作","独处"], moods: ["焦虑","透支"], feelings: ["被忽视","想改变"], palette: "rust-cream" },

  // ── 葡萄成熟时 ──────────────────────────────────
  { line: "就算失收 始终要守", song: "葡萄成熟时", author: "黄伟文", year: 2005,
    scenes: ["工作","独处","创作"], moods: ["平静","期待"], feelings: ["顺其自然","想改变"], palette: "forest-pale" },
  { line: "尽量别教 今天的泪 白流", song: "葡萄成熟时", author: "黄伟文", year: 2005,
    scenes: ["独处","工作"], moods: ["释然","期待"], feelings: ["有收获","想改变"], palette: "gold-black" },
  { line: "留低击伤 你的石头 从错误里 吸收", song: "葡萄成熟时", author: "黄伟文", year: 2005,
    scenes: ["工作","独处","创作"], moods: ["释然","平静"], feelings: ["有收获","看清了"], palette: "forest-pale" },
  { line: "别让寂寞 害你伤得 一夜白头", song: "葡萄成熟时", author: "黄伟文", year: 2005,
    scenes: ["独处","想念"], moods: ["沮丧","怀念"], feelings: ["想念某人","顺其自然"], palette: "plum-cream" },
  { line: "赢得 不需要的 自由 和最耀眼 伤口", song: "葡萄成熟时", author: "黄伟文", year: 2005,
    scenes: ["独处","工作"], moods: ["释然","沮丧"], feelings: ["看清了","有收获"], palette: "wine-white" },
  { line: "或者要到 你将爱 酿成醇酒 时机先至 熟透", song: "葡萄成熟时", author: "黄伟文", year: 2005,
    scenes: ["独处","想念","创作"], moods: ["平静","期待"], feelings: ["顺其自然","看清了"], palette: "plum-cream" },

  // ── 单车 ─────────────────────────────────────────
  { line: "难离难舍 想抱紧些 茫茫人生 好像荒野", song: "单车", author: "黄伟文", year: 2002,
    scenes: ["想念","独处"], moods: ["怀念","沮丧"], feelings: ["想念某人"], palette: "navy-cream" },
  { line: "不说一句 的爱 有多好", song: "单车", author: "黄伟文", year: 2002,
    scenes: ["想念","见人"], moods: ["怀念","释然"], feelings: ["想念某人","看清了"], palette: "navy-mustard" },

  // ── Shall We Talk ─────────────────────────────────
  { line: "如果心声 真有疗效 谁怕暴露 更多", song: "Shall We Talk", author: "林夕", year: 2001,
    scenes: ["见人","独处"], moods: ["释然","期待"], feelings: ["被理解","想改变"], palette: "teal-yellow" },
  { line: "若沉默似金 还谈 什么恋爱", song: "Shall We Talk", author: "林夕", year: 2001,
    scenes: ["见人","想念"], moods: ["焦虑","沮丧"], feelings: ["想改变"], palette: "midnight-mustard" },
  { line: "孩童只盼望 欢乐 大人只知道 期望", song: "Shall We Talk", author: "林夕", year: 2001,
    scenes: ["独处","见人"], moods: ["释然","沮丧"], feelings: ["看清了"], palette: "navy-cream" },

  // ── 最佳损友 ─────────────────────────────────────
  { line: "却没人像你 让我眼泪 背着流", song: "最佳损友", author: "黄伟文", year: 2006,
    scenes: ["想念","见人"], moods: ["怀念","沮丧"], feelings: ["想念某人"], palette: "plum-cream" },
  { line: "来年陌生的 是昨日 最亲的 某某", song: "最佳损友", author: "黄伟文", year: 2006,
    scenes: ["想念","独处"], moods: ["怀念","释然"], feelings: ["看清了","想念某人"], palette: "burgundy-cream" },
  { line: "被推着走 跟着生活流", song: "最佳损友", author: "黄伟文", year: 2006,
    scenes: ["工作","独处"], moods: ["透支","平静"], feelings: ["顺其自然"], palette: "charcoal-white" },

  // ── 沙龙 ─────────────────────────────────────────
  { line: "留住温度 速度 温柔和愤怒 凝住今日 怎样好", song: "沙龙", author: "黄伟文", year: 2007,
    scenes: ["创作","旅行","玩乐"], moods: ["开心","期待"], feelings: ["有收获"], palette: "orange-black" },
  { line: "拍下过 记住过 好过拥有", song: "沙龙", author: "黄伟文", year: 2007,
    scenes: ["旅行","创作","玩乐"], moods: ["开心","释然"], feelings: ["顺其自然","有收获"], palette: "orange-black" },
  { line: "其实人生 并非虚耗 何来尘埃 飞舞", song: "沙龙", author: "黄伟文", year: 2007,
    scenes: ["独处","创作"], moods: ["释然","平静"], feelings: ["看清了","有收获"], palette: "gold-black" },

  // ── 落花流水 ─────────────────────────────────────
  { line: "这趟旅行 若算开心 亦是无负 这一生", song: "落花流水", author: "黄伟文", year: 2006,
    scenes: ["旅行","独处"], moods: ["释然","平静"], feelings: ["顺其自然"], palette: "forest-pale" },
  { line: "习惯无常 才会庆幸", song: "落花流水", author: "黄伟文", year: 2006,
    scenes: ["独处","见人"], moods: ["释然","平静"], feelings: ["看清了","顺其自然"], palette: "teal-yellow" },
  { line: "淡淡交会过 各不留下印", song: "落花流水", author: "黄伟文", year: 2006,
    scenes: ["独处","想念","见人"], moods: ["释然","怀念"], feelings: ["顺其自然","看清了"], palette: "teal-yellow" },
  { line: "命运敲定了 要这么发生", song: "落花流水", author: "黄伟文", year: 2006,
    scenes: ["独处"], moods: ["释然","平静"], feelings: ["顺其自然"], palette: "navy-cream" },

  // ── 黑择明 ───────────────────────────────────────
  { line: "他不姓黑 不怕黑 选了光", song: "黑择明", author: "林夕", year: 2009,
    scenes: ["独处","创作"], moods: ["期待","释然"], feelings: ["想改变","看清了"], palette: "ink-white" },
  { line: "既然浮生 就如游戏 心能 随心拣戏", song: "黑择明", author: "林夕", year: 2009,
    scenes: ["玩乐","独处"], moods: ["释然","开心"], feelings: ["顺其自然","看清了"], palette: "plum-cream" },

  // ── 陀飞轮 ───────────────────────────────────────
  { line: "曾付出 几多心跳 来换取 一堆堆的 发票", song: "陀飞轮", author: "黄伟文", year: 2010,
    scenes: ["工作","独处"], moods: ["透支","释然"], feelings: ["看清了","想改变"], palette: "charcoal-white" },
  { line: "为何 用到尽了 至知 哪样紧要", song: "陀飞轮", author: "黄伟文", year: 2010,
    scenes: ["工作","独处"], moods: ["透支","释然"], feelings: ["看清了","想改变"], palette: "ink-white" },
  { line: "卖了任性 日拼夜拼 忘掉了 为甚么 高兴", song: "陀飞轮", author: "黄伟文", year: 2010,
    scenes: ["工作"], moods: ["透支","沮丧"], feelings: ["想改变","看清了"], palette: "midnight-mustard" },
  { line: "还剩低 几多心跳 在时计里 看破一生", song: "陀飞轮", author: "黄伟文", year: 2010,
    scenes: ["独处","工作"], moods: ["释然","平静"], feelings: ["看清了"], palette: "ink-white" },

  // ── 苦瓜 ─────────────────────────────────────────
  { line: "幸得艰辛 的引路 甜蜜不致 太寡", song: "苦瓜", author: "黄伟文", year: 2011,
    scenes: ["独处","工作"], moods: ["释然","平静"], feelings: ["有收获","看清了"], palette: "olive-cream" },
  { line: "至共你觉得 苦也不太差", song: "苦瓜", author: "黄伟文", year: 2011,
    scenes: ["见人","独处"], moods: ["释然","平静"], feelings: ["顺其自然","被理解"], palette: "olive-cream" },
  { line: "做人没有 苦涩 可以吗", song: "苦瓜", author: "黄伟文", year: 2011,
    scenes: ["独处"], moods: ["释然","平静"], feelings: ["看清了","顺其自然"], palette: "olive-cream" },
  { line: "珍惜淡定 的心境 苦过后 更加清", song: "苦瓜", author: "黄伟文", year: 2011,
    scenes: ["独处","躺平"], moods: ["平静","释然"], feelings: ["看清了"], palette: "teal-yellow" },

  // ── 一丝不挂 ─────────────────────────────────────
  { line: "勒到 呼吸困难 才知变 扯线木偶", song: "一丝不挂", author: "林夕", year: 2010,
    scenes: ["独处","想念"], moods: ["透支","焦虑"], feelings: ["想逃","看清了"], palette: "plum-cream" },
  { line: "难道爱本身 可爱 在于束缚", song: "一丝不挂", author: "林夕", year: 2010,
    scenes: ["想念","独处"], moods: ["释然","怀念"], feelings: ["看清了"], palette: "plum-cream" },

  // ── 我的快乐时代 ────────────────────────────────
  { line: "毫无代价唱 最幸福的歌", song: "我的快乐时代", author: "林夕", year: 1998,
    scenes: ["玩乐","创作"], moods: ["开心","期待"], feelings: ["顺其自然"], palette: "gold-black" },
  { line: "让我有勇气 去喊停 没有结局 也可即兴", song: "我的快乐时代", author: "林夕", year: 1998,
    scenes: ["玩乐","创作","旅行"], moods: ["开心","期待"], feelings: ["想改变","顺其自然"], palette: "orange-black" },
  { line: "让我对 这世界 好奇", song: "我的快乐时代", author: "林夕", year: 1998,
    scenes: ["旅行","玩乐","独处"], moods: ["开心","期待"], feelings: ["有收获"], palette: "gold-black" },

  // ── 失忆蝴蝶 ─────────────────────────────────────
  { line: "这样遗憾 或者更完美", song: "失忆蝴蝶", author: "林夕", year: 2013,
    scenes: ["想念","独处"], moods: ["释然","怀念"], feelings: ["顺其自然","看清了"], palette: "plum-cream" },
  { line: "让大家 只差半步 成诗", song: "失忆蝴蝶", author: "林夕", year: 2013,
    scenes: ["想念","独处"], moods: ["释然","怀念"], feelings: ["看清了"], palette: "wine-white" },

  // ── 与我常在 ─────────────────────────────────────
  { line: "除非你是我 才可 与我常在", song: "与我常在", author: "林夕", year: 2003,
    scenes: ["独处","想念"], moods: ["怀念","释然"], feelings: ["看清了"], palette: "navy-cream" },

  // ── 太阳照常升起 ────────────────────────────────
  { line: "时间到了 转身 不眨眼睛", song: "太阳照常升起", author: "林夕", year: 2007,
    scenes: ["独处","工作"], moods: ["平静","释然"], feelings: ["顺其自然","看清了"], palette: "rust-cream" },
  { line: "一天都光了 人潮如常 流动了", song: "太阳照常升起", author: "林夕", year: 2007,
    scenes: ["躺平","独处"], moods: ["透支","平静"], feelings: ["顺其自然"], palette: "gold-black" },

  // ── 于心有愧 ─────────────────────────────────────
  { line: "如果我听歌 可眼红 何以待你好 偏不懂", song: "于心有愧", author: "林夕", year: 2009,
    scenes: ["想念","见人"], moods: ["沮丧","怀念"], feelings: ["想念某人","看清了"], palette: "burgundy-cream" },

  // ── 谢谢侬 ───────────────────────────────────────
  { line: "我的头痛 不再痛 能够生存 就有恃无恐", song: "谢谢侬", author: "林夕", year: 2010,
    scenes: ["躺平","独处"], moods: ["释然","平静"], feelings: ["有收获","顺其自然"], palette: "olive-cream" },
  { line: "苦痛说了 没人懂 爱人没有用 我一样 很有用", song: "谢谢侬", author: "林夕", year: 2010,
    scenes: ["独处","工作"], moods: ["释然","期待"], feelings: ["有收获","想改变"], palette: "forest-pale" },

  // ── 裙下之臣 ─────────────────────────────────────
  { line: "活着 就是无乐趣 也胜在 有女人", song: "裙下之臣", author: "黄伟文", year: 2007,
    scenes: ["玩乐","见人"], moods: ["开心","释然"], feelings: ["顺其自然"], palette: "crimson-white" },

  // ── 今日 ─────────────────────────────────────────
  { line: "今天 珍惜今天", song: "今日", author: "黄伟文", year: 2025,
    scenes: ["躺平","独处","见人"], moods: ["开心","释然","平静"], feelings: ["顺其自然","有收获"], palette: "gold-black" },
  { line: "抬头吧 黑暗过 会是晨曦", song: "今日", author: "黄伟文", year: 2025,
    scenes: ["独处"], moods: ["期待","释然"], feelings: ["想改变"], palette: "midnight-mustard" },

  // ── 时光倒流二十年 ──────────────────────────────
  { line: "余下日子 多闪几倍光", song: "时光倒流二十年", author: "林夕", year: 2010,
    scenes: ["想念","独处"], moods: ["怀念","期待"], feelings: ["想念某人"], palette: "wine-white" },
];

if (typeof module !== 'undefined') module.exports = { LYRICS };
