// ----- Configuration -----
const PASSWORD = "classeIDA2025"; // change la valeur si tu veux une autre clé
const STORAGE_KEY = "photosClasse"; // nom sous lequel on sauvegarde dans localStorage

// ----- Références DOM -----
const loginDiv = document.getElementById("login");
const galleryDiv = document.getElementById("gallery");
const errorP = document.getElementById("error");
const photosDiv = document.getElementById("photos");

const enterBtn = document.getElementById("enterBtn");
const addBtn = document.getElementById("addBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Associer les événements
enterBtn.addEventListener("click", checkPassword);
addBtn.addEventListener("click", addPhoto);
logoutBtn.addEventListener("click", logout);

// ---- Vérifie le mot de passe ----
function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === PASSWORD) {
    loginDiv.classList.add("hidden");
    galleryDiv.classList.remove("hidden");
    errorP.textContent = "";
    loadPhotos();
  } else {
    errorP.textContent = "Mot de passe incorrect !";
  }
}

// ---- Ajoute une photo (lit le fichier et sauve dans localStorage) ----
function addPhoto() {
  const fileInput = document.getElementById("photoInput");
  const file = fileInput.files[0];
  if (!file) return alert("Choisis une photo d'abord.");
  
  // Vérifier taille (optionnel) : limiter à 2MB par exemple
  const maxSizeMB = 5;
  if (file.size > maxSizeMB * 1024 * 1024) {
    return alert("Image trop lourde — choisis une image plus petite (<= " + maxSizeMB + "MB).");
  }
  
  // FileReader convertit le fichier en Data URL (base64)
  const reader = new FileReader();
  reader.onload = function(e) {
    const imgData = e.target.result; // string base64 (data:image/...)
    // Récupérer la liste actuelle ou initialiser
    let savedPhotos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    savedPhotos.push(imgData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPhotos));
    displayPhoto(imgData);
    fileInput.value = ""; // réinitialise le champ fichier
  };
  reader.readAsDataURL(file);
}

// ---- Affiche une image sur la page ----
function displayPhoto(imgData) {
  const img = document.createElement("img");
  img.src = imgData;
  photosDiv.appendChild(img);
}

// ---- Charge toutes les photos depuis localStorage ----
function loadPhotos() {
  photosDiv.innerHTML = "";
  const savedPhotos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  savedPhotos.forEach(displayPhoto);
}

// ---- Déconnexion simple (retour page de login sans effacer) ----
function logout() {
  galleryDiv.classList.add("hidden");
  loginDiv.classList.remove("hidden");
}