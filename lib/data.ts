export const PROGRAM_DAYS = 40
export const PROGRAM_WEEKS = 6

export const COMMITMENTS = [
  { id: 'morning', title: 'Morning prayer', desc: 'Before phone, email, or social — start with Him.' },
  { id: 'scripture', title: '20 min Bible reading', desc: 'Read, reflect, ask what God is teaching you.' },
  { id: 'workout', title: '45 min workout', desc: 'Honor the body He entrusted to you.' },
  { id: 'nutrition', title: 'Nourish Well', desc: 'Every meal is an act of stewardship. Choose with intention.' },
  { id: 'fast', title: 'Daily fast', desc: 'Food, tech, or comfort — create space for God.' },
  { id: 'water', title: '1 gallon of water', desc: 'Hydrate your body and brain.' },
  { id: 'evening', title: 'Evening prayer', desc: 'Reflect, give thanks, release tomorrow to Him.' },
  { id: 'reflection', title: 'Daily reflection', desc: '5 min writing — where did you see God today?' },
]

export const WEEKLY_COMMITMENTS = [
  { id: 'sabbath', title: 'Sabbath hour', desc: 'A weekly invitation to step away from work, quiet the noise, and turn your attention to Christ.' },
  { id: 'scripture_memory', title: 'Scripture memory', desc: 'This week\'s verse is assigned below. Commit it to memory.', hasVerse: true },
  { id: 'act_of_service', title: 'Act of service', desc: 'Faith without works is dead. Go prove yours alive.' },
]

export const WEEKLY_VERSES = [
  { week: 1, verse: 'But the fruit of the Spirit is love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, self-control. Against such there is no law.', ref: 'Galatians 5:22-23 (NKJV)' },
  { week: 2, verse: 'For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.', ref: 'John 3:16 (NKJV)' },
  { week: 3, verse: 'For by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, lest anyone should boast.', ref: 'Ephesians 2:8-9 (NKJV)' },
  { week: 4, verse: 'Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus.', ref: 'Philippians 4:6-7 (NKJV)' },
  { week: 5, verse: 'For I know the thoughts that I think toward you, says the Lord, thoughts of peace and not of evil, to give you a future and a hope.', ref: 'Jeremiah 29:11 (NKJV)' },
  { week: 6, verse: 'Trust in the Lord with all your heart, And lean not on your own understanding; In all your ways acknowledge Him, And He shall direct your paths.', ref: 'Proverbs 3:5-6 (NKJV)' },
]

export const FRUIT_DATA = [
  { week: 1, name: 'The Fruit of the Spirit', eyebrow: 'Week 1 / Introduction', def: 'The fruit of the Spirit is not something you force. It is something the Holy Spirit produces as you walk with Him. A healthy tree naturally produces fruit. Stay close to the vine.', verse: '"But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law."', ref: 'Galatians 5:22-23 (KJV)', anchor: null, anchorRef: null, isList: true, fruits: ['Love — Caring for others the way God cares for us.', 'Joy — A deep happiness that comes from God, even when life is hard.', 'Peace — A calm heart because you trust God.', 'Patience — Being patient with people and difficult situations.', 'Kindness — Choosing gentleness and compassion toward others.', 'Goodness — Choosing to do what is right.', 'Faithfulness — Trusting God and being faithful to Him.', 'Gentleness — Being humble and thoughtful, not proud.', 'Self-Control — Having discipline over your flesh.'] },

  { week: 2, name: 'Love & Joy', eyebrow: 'Week 2', def: 'Love is caring for others the way God cares for us. Not because they deserve it, but because He first loved us. Joy is a deep happiness that comes from God, not from circumstances. It is not the absence of pain. It is the presence of God in the middle of it.', verse: '"A new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another."', ref: 'John 13:34 (KJV)', anchor: '"The love of God is shed abroad in our hearts by the Holy Ghost which is given unto us."', anchorRef: 'Romans 5:5 (KJV)', isList: true, fruits: ['Love — Caring for others the way God cares for us, even when it costs you something.', 'Joy — "The joy of the Lord is your strength." Nehemiah 8:10 (KJV)'] },

  { week: 3, name: 'Peace & Patience', eyebrow: 'Week 3', def: 'Peace is a calm heart because you trust God — not the absence of trouble, but the presence of God in the middle of it. Patience is staying steady through people and difficult situations, the way God has stayed patient with you.', verse: '"Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid."', ref: 'John 14:27 (KJV)', anchor: '"The love of God is shed abroad in our hearts by the Holy Ghost which is given unto us."', anchorRef: 'Romans 5:5 (KJV)', isList: true, fruits: ['Peace — A calm heart because you trust God.', 'Patience — "Tribulation worketh patience; and patience, experience; and experience, hope." Romans 5:3-4 (KJV)'] },

  { week: 4, name: 'Kindness & Goodness', eyebrow: 'Week 4', def: 'Kindness is choosing gentleness and compassion toward others, the way God has been kind to you. Goodness is choosing to do what is right — not because anyone is watching, but because God is good and you belong to Him.', verse: '"And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ\'s sake hath forgiven you."', ref: 'Ephesians 4:32 (KJV)', anchor: '"The love of God is shed abroad in our hearts by the Holy Ghost which is given unto us."', anchorRef: 'Romans 5:5 (KJV)', isList: true, fruits: ['Kindness — Choosing gentleness and compassion toward others.', 'Goodness — "Surely goodness and mercy shall follow me all the days of my life." Psalm 23:6 (KJV)'] },

  { week: 5, name: 'Faithfulness & Gentleness', eyebrow: 'Week 5', def: 'Faithfulness is trusting God and being faithful to Him — in the seen and the unseen, in the answered and the waiting. Gentleness is strength under control. Jesus described Himself as meek and lowly, and He was the most powerful person who ever lived.', verse: '"Now faith is the substance of things hoped for, the evidence of things not seen."', ref: 'Hebrews 11:1 (KJV)', anchor: '"The love of God is shed abroad in our hearts by the Holy Ghost which is given unto us."', anchorRef: 'Romans 5:5 (KJV)', isList: true, fruits: ['Faithfulness — Trusting God in the seen and the unseen.', 'Gentleness — "Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls." Matthew 11:29 (KJV)'] },

  { week: 6, name: 'Self-Control', eyebrow: 'Week 6 / Finish Strong', def: 'Self-control is the fruit that guards all the others. The discipline you have built over these 40 days is itself an act of self-control. Look back at who you were on Day 1 — the Holy Spirit has been at work. Finish strong.', verse: '"Every man that striveth for the mastery is temperate in all things. Now they do it to obtain a corruptible crown; but we an incorruptible."', ref: '1 Corinthians 9:25 (KJV)', anchor: '"The love of God is shed abroad in our hearts by the Holy Ghost which is given unto us."', anchorRef: 'Romans 5:5 (KJV)', isHarvest: true, fruits: ['Love', 'Joy', 'Peace', 'Patience', 'Kindness', 'Goodness', 'Faithfulness', 'Gentleness', 'Self-Control'] },
]

export const APPROACH_NAMES: Record<string, string> = {
  mediterranean: 'Mediterranean eating',
  paleo: 'Paleo',
  keto: 'Ketogenic eating',
  plantbased: 'Plant-based eating',
  whole30: 'Whole30',
  mypath: 'my own path',
}

export const PROMISE_TEXT = `I choose today to make Christ my standard.

I will seek Christ before the world.
I will honor Him with my body, my mind, and my spirit.
I will strengthen my mind through His Word.
I will discipline my flesh through fasting.
I will pray without ceasing.
I will move with gratitude.
I will walk in the Spirit, bearing His fruit: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self control.
I will serve others with humility and love.
I will lead others to Christ through how I live.
I will choose obedience over convenience.
Faith over fear.
Truth over comfort.

For these next 40 days, I am building disciplines that will outlast this journey.

I am establishing a new standard for how I live.
A standard that seeks Christ daily.
A standard that walks in the Spirit.
A standard that serves others with love.
A standard that leads others to Christ.

May every step draw me closer to Christ.
May my life reflect His love, His truth, and His purpose.

This is not simply a challenge.

THIS IS THE STANDARD`

// Date utilities (local time, no UTC offset issues)
export function localDateStr(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function today(): Date {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function parseLocalDate(s: string): Date {
  const parts = s.slice(0, 10).split('-')
  return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
}

export function dayNumber(startDate: Date, currentDate: Date = today()): number {
  return Math.max(1, Math.min(PROGRAM_DAYS, Math.floor((currentDate.getTime() - startDate.getTime()) / 86400000) + 1))
}

export function weekNumber(startDate: Date): number {
  return Math.max(1, Math.min(PROGRAM_WEEKS, Math.ceil(dayNumber(startDate) / 7)))
}

export function dayKey(startDate: Date, day: number): string {
  const d = new Date(startDate)
  d.setDate(d.getDate() + day - 1)
  return localDateStr(d)
}

export function formatDate(startDate: Date, day: number): string {
  const d = new Date(startDate)
  d.setDate(d.getDate() + day - 1)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function weekRange(startDate: Date, week: number): string {
  const d1 = new Date(startDate)
  d1.setDate(d1.getDate() + (week - 1) * 7)
  const d2 = new Date(startDate)
  const lastDayOfWeek = Math.min(week * 7, PROGRAM_DAYS)
  d2.setDate(d2.getDate() + lastDayOfWeek - 1)
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return `${fmt(d1)} — ${fmt(d2)}`
}

// ── LAUNCH GATE ──
// The date the church begins together. Stored as plain text, YYYY-MM-DD, so
// there is no month arithmetic to get wrong (JavaScript months count from 0,
// which makes new Date(2026, 8, 3) September rather than August).
// Change this one line to move the launch. A past date opens the app to everyone.
export const LAUNCH_DATE = '2026-08-03'

// True while the launch date has not arrived yet. Text comparison on
// YYYY-MM-DD sorts correctly, so this needs no Date objects at all.
export function isBeforeLaunch(currentDate: Date = today()): boolean {
  return localDateStr(currentDate) < LAUNCH_DATE
}

// "Monday, August 3" for display. Derived from LAUNCH_DATE so it can never
// disagree with the gate above.
export function launchDateLabel(): string {
  return parseLocalDate(LAUNCH_DATE).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  })
}
