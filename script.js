const targetDate = new Date("2026-05-16T11:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.querySelector(".countdown").innerHTML = "";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / 1000 / 60) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}, 1000);


// lock scroll saat pertama buka
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

document.body.classList.add("lock-scroll");

document.getElementById("openBtn").addEventListener("click", function (e) {
    e.preventDefault();

    // 1. sembunyikan hero
    document.querySelector(".hero").style.display = "none";

    // 2. aktifkan scroll
    document.body.classList.remove("lock-scroll");

    // 3. scroll ke home
    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });
    setTimeout(() => {
      AOS.refresh();
    },100);
});

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


let commentCount = 0;

function tambahCommentKeSlider(nama, pesan) {
    const sliderTrack = document.getElementById("commentSliderTrack");
    
    const div = document.createElement("div");
    div.classList.add("comment-item");
    div.style.animationDelay = `${commentCount * 0.2}s`; // Stagger effect
    
    div.innerHTML = `
        <strong>${nama}</strong>
        <p>${pesan}</p>
    `;
    
    sliderTrack.appendChild(div);
    commentCount++;
    

}

function kirimPesan() {
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
        alert("Nama dan pesan tidak boleh kosong!");
        return;
    }

    // Tambah ke slider
    tambahCommentKeSlider(name, message);
    
    // Reset form
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    
    // Scroll ke wishes section
    document.getElementById("wishes").scrollIntoView({ behavior: 'smooth' });
}

// Auto scroll observer (optional - pause on hover sudah ada di CSS)
const wishesSection = document.getElementById("wishes");
const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Slider sudah auto run via CSS
            console.log("Slider wishes active!");
        }
    });
}, { threshold: 0.3 });

observerScroll.observe(wishesSection);


function tampilkanComment(nama, pesan, animate = true) {
  const commentList = document.getElementById("commentList");

  const div = document.createElement("div");
  div.classList.add("comment-item", "comment-enter"); // Mulai dengan animasi masuk

  div.innerHTML = `
    <strong>${nama}</strong>
    <p>${pesan}</p>
  `;

  // Tambahkan ke atas (prepend)
  commentList.prepend(div);

  // Trigger animasi masuk
  requestAnimationFrame(() => {
    div.classList.remove("comment-enter");
    div.classList.add("comment-visible");
  });
}

const photos = [
  "img/PAYD1984.webp",
  "img/PAYD2058.webp",
  "img/PAYD2145.webp",
  "img/PAYD2176.webp",
  "img/PAYD2257.webp",
  "img/PAYD2272.webp"
];

const photos1 = [
  "img/PAYD2194.webp",
  "img/PAYD2282.webp",
  "img/PAYD2291.webp",
  "img/PAYD2305.webp",
  "img/PAYD2339.webp",
  "img/PAYD2356.webp"
];

function loadMemories() {
    // 1. Ambil 3 ID berbeda dari HTML
    const track1 = document.getElementById("memoriesSliderTrack1"); 
    const track2 = document.getElementById("memoriesSliderTrack2"); 
    // const track3 = document.getElementById("memoriesSliderTrack3"); // Track baru
    
    // 2. Bagi array 'photos' menjadi dua bagian agar baris 1 dan 3 beda isinya
    // photos.slice(start, end) mengambil urutan foto tertentu
    const photosPart1 = photos.slice(0, 6);  // Foto ke 1 sampai 6
    // const photosPart2 = photos.slice(6, 12); // Foto ke 7 sampai 12

    // 3. Isi Baris 1 (Warna bagian pertama)
    if (track1 && typeof photos !== 'undefined') {
        track1.innerHTML = photosPart1.map(src => `
            <div class="memory-item">
                <img src="${src}" alt="Wedding Memory" loading="lazy">
            </div>
        `).join('');
    }

    // 4. Isi Baris 2 (Hitam Putih - photos1)
    if (track2 && typeof photos1 !== 'undefined') {
        track2.innerHTML = photos1.map(src => `
            <div class="memory-item">
                <img src="${src}" alt="Wedding Memory" loading="lazy">
            </div>
        `).join('');
    }


}

// Jalankan fungsi
document.addEventListener("DOMContentLoaded", loadMemories);

function BukaMaps() {
  window.open("https://maps.app.goo.gl/z41vsRuHToVADhx28?g_st=ic")
}

// --- BAGIAN MUSIK & BUKA UNDANGAN (GABUNGAN) ---
const openBtn = document.getElementById('openBtn');
const song = document.getElementById('mySong');
const musicControl = document.getElementById('music-control');
let isPlaying = false;

if (openBtn && song) {
    openBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // 1. Putar Musik
        song.play().then(() => {
            isPlaying = true;
            console.log("Musik berhasil diputar");
        }).catch(error => {
            console.error("Autoplay diblokir browser, tapi user sudah klik:", error);
        });

        // 2. Buka Scroll
        document.body.classList.remove("lock-scroll");

        // 3. Scroll ke Section Home
        const homeSection = document.getElementById("home");
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: "smooth" });
        }
    });
}

if (musicControl && song) {
  musicControl.addEventListener("click", function () {
    if (song.paused) {
      song.play();
      isPlaying = true;
      song.muted = false; // Memastikan tidak ter-mute
      song.volume = 1.0; // Set volume maksimal
      // Jika ada icon: musicControl.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      song.pause();
      isPlaying = false;
      // Jika ada icon: musicControl.innerHTML = '<i class="fas fa-play"></i>';
    }
  });
  
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const track = entry.target.querySelector('.memories-slider-track');
    if (track) {
      track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
    }
  });
});

observer.observe(document.querySelector('.memories-slider-container'));

// 1. Ambil parameter dari URL browser
const urlParams = new URLSearchParams(window.location.search);

// 2. Ambil isi dari parameter 'to'
const namaTamu = urlParams.get('to');

// 3. Masukkan nama tersebut ke dalam elemen HTML
if (namaTamu) {
    // Menghapus tanda + atau %20 menjadi spasi biasa
    const namaBersih = namaTamu.replace(/\+|%20/g, ' ');
    
    // Cari elemen dengan ID 'nama-tamu' dan ganti isinya
    document.getElementById("nama-tamu").innerText = namaBersih;
} else {
    // Jika tidak ada nama di link, tampilkan teks default
    document.getElementById("nama-tamu").innerText = "Tamu Undangan";
}
