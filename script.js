// QUIZ DATA
const questions = [
  {
    q: "Seberapa sering kamu terus memikirkan kesalahan atau kegagalan masa lalu, bahkan ketika sudah berlalu lama?",
    opts: ["Hampir tidak pernah", "Kadang-kadang (1-2x/minggu)", "Sering (3-5x/minggu)", "Hampir setiap hari"],
    scores: [0,1,2,3]
  },
  {
    q: "Ketika menghadapi keputusan penting, berapa lama biasanya kamu menganalisis sebelum bertindak?",
    opts: ["Langsung bertindak dengan percaya diri", "Sedikit mempertimbangkan, lalu maju", "Banyak mempertimbangkan sampai ragu-ragu", "Seringkali menunda karena terlalu banyak berpikir"],
    scores: [0,1,2,3]
  },
  {
    q: "Sejauh mana kamu membandingkan pencapaianmu dengan teman atau orang lain di media sosial?",
    opts: ["Hampir tidak pernah", "Sesekali, tapi tidak terlalu terpengaruh", "Cukup sering dan sering merasa inferior", "Sangat sering dan sangat mempengaruhi perasaanku"],
    scores: [0,1,2,3]
  },
  {
    q: "Bagaimana kualitas tidurmu dalam 2 minggu terakhir?",
    opts: ["Sangat baik, jarang terganggu pikiran", "Baik, kadang sedikit sulit tidur", "Cukup terganggu, pikiran sering aktif sebelum tidur", "Sangat terganggu, sering tidak bisa tidur karena pikiran"],
    scores: [0,1,2,3]
  },
  {
    q: "Ketika ada konflik atau misunderstanding dengan orang lain, apa yang biasanya terjadi?",
    opts: ["Aku bisa melepaskan dengan cepat", "Sedikit kepikiran tapi bisa move on", "Terus mereplay percakapan dan menyalahkan diri", "Sangat obsesif memikirkannya berhari-hari"],
    scores: [0,1,2,3]
  }
];

let currentQ = 0;
let answers = [];
let selectedOpt = null;

const results = [
  {
    emoji: "🌱",
    title: "Pola Pikir Sehat",
    desc: "Luar biasa! Kamu memiliki kemampuan yang baik dalam mengelola pikiran. Kamu cenderung dapat memproses pengalaman tanpa terjebak dalam loop negatif. Pertahankan kebiasaan sehatmu!",
    tips: ["Terus praktikkan mindfulness secara konsisten", "Jadilah role model kesehatan mental di komunitasmu", "Bagikan strategi positifmu ke orang-orang sekitar"]
  },
  {
    emoji: "🌿",
    title: "Overthinking Ringan",
    desc: "Kamu sesekali mengalami overthinking, tapi masih dalam batas yang bisa dikelola. Dengan beberapa strategi sederhana, kamu bisa memperkuat kesejahteraan mentalmu lebih jauh.",
    tips: ["Coba teknik grounding 5-4-3-2-1 saat pikiran mulai berputar", "Praktikkan journaling 10 menit setiap pagi", "Batasi waktu scroll media sosial menjadi 30 menit/hari"]
  },
  {
    emoji: "🍂",
    title: "Overthinking Sedang",
    desc: "Overthinking sudah cukup mempengaruhi kehidupan sehari-harimu. Ini adalah sinyal penting untuk mulai memberikan perhatian serius pada kesehatan mentalmu. Kamu tidak sendirian!",
    tips: ["Mulai latihan pernapasan 4-7-8 dua kali sehari", "Pertimbangkan berbicara dengan konselor kampus", "Bergabunglah dengan kelompok peer support di kampusmu", "Coba teknik worry time — sisihkan 20 menit khusus untuk khawatir"]
  },
  {
    emoji: "🌧️",
    title: "Overthinking Berat",
    desc: "Overthinkingmu sudah signifikan mempengaruhi kualitas hidup. Ini bukan kelemahan — ini adalah sinyal bahwa kamu membutuhkan dukungan lebih. Mencari bantuan adalah tanda keberanian, bukan kegagalan.",
    tips: ["Hubungi layanan konseling kampus segera", "Pertimbangkan berbicara dengan psikolog profesional", "Into The Light Indonesia: 119 ext 8", "Jangan hadapi ini sendirian — cerita ke orang yang dipercaya"]
  }
];

function renderQuestion() {
  const q = questions[currentQ];
  document.getElementById('qNum').textContent = `Pertanyaan ${currentQ+1} dari ${questions.length}`;
  document.getElementById('qText').textContent = q.q;
  document.getElementById('qCounter').textContent = `${answers.length} / 5 dijawab`;
  document.getElementById('qProgress').style.width = `${(currentQ/questions.length)*100}%`;

  const optsDiv = document.getElementById('qOptions');
  optsDiv.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = () => selectOption(i, btn);
    optsDiv.appendChild(btn);
  });

  selectedOpt = null;
  document.getElementById('btnNext').classList.remove('active');
}

function selectOption(idx, el) {
  document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  selectedOpt = idx;
  document.getElementById('btnNext').classList.add('active');
  document.getElementById('btnNext').textContent = currentQ < questions.length-1 ? 'Lanjut →' : 'Lihat Hasil →';
}

function nextQuestion() {
  if (selectedOpt === null) return;
  answers.push(questions[currentQ].scores[selectedOpt]);

  if (currentQ < questions.length - 1) {
    currentQ++;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const total = answers.reduce((a,b) => a+b, 0);
  const max = questions.length * 3;
  const pct = total / max;
  let level = pct < 0.25 ? 0 : pct < 0.5 ? 1 : pct < 0.75 ? 2 : 3;
  const res = results[level];

  document.getElementById('qProgress').style.width = '100%';
  document.getElementById('quizBody').style.display = 'none';
  const rDiv = document.getElementById('quizResult');
  rDiv.style.display = 'block';
  document.getElementById('rEmoji').textContent = res.emoji;
  document.getElementById('rTitle').textContent = res.title;
  document.getElementById('rDesc').textContent = res.desc;
  document.getElementById('rTips').innerHTML = `<h5>Rekomendasi untukmu:</h5><ul>${res.tips.map(t=>`<li>${t}</li>`).join('')}</ul>`;
  document.getElementById('qCounter').textContent = `Skor: ${total}/${max}`;
  document.getElementById('btnNext').style.display = 'none';
}

function restartQuiz() {
  currentQ = 0; answers = []; selectedOpt = null;
  document.getElementById('quizBody').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
  document.getElementById('btnNext').style.display = '';
  document.getElementById('qProgress').style.width = '0%';
  renderQuestion();
}

renderQuestion();

// BREATHING
let breathInterval = null;
let breathPhase = 0;
const phases = ['Hirup...','Tahan...','Hembuskan...','Istirahat'];
const phaseDuration = [4000,7000,8000,1000];
const phaseClass = ['inhale','hold','exhale',''];

function startBreathing() {
  const circle = document.getElementById('breathCircle');
  const label = document.getElementById('breathLabel');
  if (breathInterval) { clearTimeout(breathInterval); breathPhase = 0; }

  function runPhase() {
    circle.className = 'breathing-circle ' + phaseClass[breathPhase];
    circle.textContent = phases[breathPhase];
    label.textContent = phases[breathPhase] + ' (' + (phaseDuration[breathPhase]/1000) + 's)';
    breathInterval = setTimeout(() => {
      breathPhase = (breathPhase + 1) % 4;
      runPhase();
    }, phaseDuration[breathPhase]);
  }
  runPhase();
}

// JOURNALING PROMPTS
const journalingData = [
  { num:1, q:"Apa pikiran yang paling sering berulang di kepalamu minggu ini?", hint:"Tulis tanpa filter — ini hanya untukmu." },
  { num:2, q:"Apa yang kamu takutkan paling banyak dalam 3 bulan ke depan?", hint:"Pisahkan: mana yang bisa kamu kontrol, mana yang tidak?" },
  { num:3, q:"Kapan terakhir kali kamu merasa cukup? Situasi seperti apa itu?", hint:"Apa yang berbeda dari biasanya?" },
  { num:4, q:"Jika pikiran negatifmu adalah teman lama yang mengunjungi, apa yang akan kamu katakan kepadanya?", hint:"Coba dengan nada yang hangat tapi tegas." },
  { num:5, q:"Apa 3 hal tentang dirimu yang kamu syukuri hari ini?", hint:"Tidak perlu besar — hal kecil pun bermakna." },
  { num:6, q:"Kalau versi dirimu 5 tahun ke depan bisa berbicara padamu sekarang, apa yang akan ia katakan?", hint:"Percayakan pada kebijaksanaanmu sendiri." },
  { num:7, q:"Siapa satu orang di lingkunganmu yang menurutmu juga membutuhkan dukungan? Bagaimana kamu bisa hadir untuknya?", hint:"Membantu orang lain adalah salah satu cara terbaik menyembuhkan diri." }
];

function showJournaling() {
  const container = document.getElementById('journalingPrompts');
  container.innerHTML = journalingData.map(p => `
    <div style="border:1px solid var(--line); border-radius:var(--radius-sm); padding:1.25rem">
      <div style="font-size:0.7rem; letter-spacing:0.08em; text-transform:uppercase; color:var(--muted); margin-bottom:0.5rem">Prompt ${p.num}</div>
      <div style="font-size:0.9rem; font-weight:500; color:var(--dark); margin-bottom:0.5rem">${p.q}</div>
      <div style="font-size:0.8rem; color:var(--sage); font-style:italic">${p.hint}</div>
    </div>
  `).join('');
  document.getElementById('journalingModal').style.display = 'flex';
}

document.getElementById('journalingModal').addEventListener('click', function(e) {
  if (e.target === this) this.style.display = 'none';
});