
// IMPORT
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// CONFIG (ISI PUNYA KAMU)
const firebaseConfig = {
  apiKey: "AIzaSyA-ej6_jaq6auEzlszhdiwqyM2zysByadg",
  authDomain: "wedding-invitation-6a7ce.firebaseapp.com",
  projectId: "wedding-invitation-6a7ce",
  storageBucket: "wedding-invitation-6a7ce.firebasestorage.app",
  messagingSenderId: "162346494548",
  appId: "1:162346494548:web:19799e258ff1d30686dbc1"
};

// INIT
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================
// KIRIM PESAN
// =========================
window.kirimPesan = async function () {
  const nama = document.getElementById("name").value;
  const pesan = document.getElementById("message").value;

  if (nama === "" || pesan === "") {
    alert("Isi dulu ya 😊");
    return;
  }

  await addDoc(collection(db, "comments"), {
    nama: nama,
    pesan: pesan,
    createdAt: new Date()
  });

  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
};

// =========================
// TAMPILKAN REALTIME
// =========================
// Firebase listener
const q = query(collection(db, "comments"), orderBy("createdAt", "asc"));

onSnapshot(q, (snapshot) => {
    const sliderTrack = document.getElementById("commentSliderTrack");
    
    // Clear existing comments
    sliderTrack.innerHTML = "";
    commentCount = 0;
    
    snapshot.forEach((doc) => {
        const data = doc.data();
        tambahCommentKeSlider(data.nama, data.pesan);
    });
});

// Export fungsi untuk form
window.tambahCommentKeSlider = tambahCommentKeSlider;