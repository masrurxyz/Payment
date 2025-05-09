// DOM Elements
const sections = document.querySelectorAll(".section")
const navButtons = document.querySelectorAll(".nav-button")
const popup = document.getElementById("popup")
const popupMessage = document.getElementById("popup-message")
const closePopupBtn = document.getElementById("close-popup")
const popupOkBtn = document.getElementById("popup-ok-btn")
const addMoneyModal = document.getElementById("add-money-modal")
const transactionCodeInput = document.getElementById("transaction-code")
const cancelAddMoneyBtn = document.getElementById("cancel-add-money")
const confirmAddMoneyBtn = document.getElementById("confirm-add-money")

// App State
let userData = null
let activeSection = "home"
let usedTransactionIds = []

// Tournament Data
const tournaments = [
  {
    id: 1,
    title: "Weekly Scrime",
    date: "Every Friday",
    time: "9:00 PM",
    participants: 0,
    prize: "80 BDT",
    fee: 50,
    image: "tp1.jpg",
    description: "Join our weekend tournament and compete against the best players for amazing prizes!",
  },
  //{
    //id: 2,
    //title: "Pro Gaming League",
    //date: "May 20, 2025",
    //time: "5:00 PM",
    //participants: 64,
    //prize: "10000 BDT",
    //fee: 50,
    //image: "https://via.placeholder.com/350x200",
    //description: "The biggest tournament of the month with the largest prize pool. Don't miss your chance!",
  //},
  //{
    //id: 3,
    //title: "Mobile Masters Tournament",
    //date: "May 25, 2025",
    //time: "2:00 PM",
    //participants: 16,
    //prize: "3000 BDT",
    //fee: 50,
    //image: "https://via.placeholder.com/350x200",
    //description: "A special tournament for mobile gamers. Show your skills and win big!",
  //},
]

// Leaderboard Data
const leaderboardData = [
  { id: 1, username: "ProGamer123", points: 1250, wins: 15, avatar: "https://via.placeholder.com/50" },
  { id: 2, username: "GameMaster", points: 1120, wins: 12, avatar: "https://via.placeholder.com/50" },
  { id: 3, username: "TourneyKing", points: 980, wins: 10, avatar: "https://via.placeholder.com/50" },
  { id: 4, username: "MobileChamp", points: 850, wins: 8, avatar: "https://via.placeholder.com/50" },
  { id: 5, username: "GamingWizard", points: 720, wins: 7, avatar: "https://via.placeholder.com/50" },
  { id: 6, username: "PixelHero", points: 650, wins: 6, avatar: "https://via.placeholder.com/50" },
  { id: 7, username: "BattleQueen", points: 580, wins: 5, avatar: "https://via.placeholder.com/50" },
  { id: 8, username: "VictoryLord", points: 520, wins: 4, avatar: "https://via.placeholder.com/50" },
  { id: 9, username: "GameNinja", points: 450, wins: 3, avatar: "https://via.placeholder.com/50" },
  { id: 10, username: "TrophyHunter", points: 380, wins: 2, avatar: "https://via.placeholder.com/50" },
]

// Initialize App
function initApp() {
  // Load user data from localStorage
  loadUserData()
  loadUsedTransactionIds()

  // Initialize navigation
  initNavigation()

  // Initialize popup
  initPopup()

  // Initialize add money modal
  initAddMoneyModal()

  // Render initial content
  renderHomeTournaments()
  renderAllTournaments()
  renderLeaderboard()
  renderProfile()
}

// Load user data from localStorage
function loadUserData() {
  const savedUser = localStorage.getItem("userData")
  if (savedUser) {
    userData = JSON.parse(savedUser)
  }
}

// Load used transaction IDs from localStorage
function loadUsedTransactionIds() {
  const savedIds = localStorage.getItem("usedTransactionIds")
  if (savedIds) {
    usedTransactionIds = JSON.parse(savedIds)
  }
}

// Save used transaction IDs to localStorage
function saveUsedTransactionIds() {
  localStorage.setItem("usedTransactionIds", JSON.stringify(usedTransactionIds))
}

// Save user data to localStorage
function saveUserData() {
  localStorage.setItem("userData", JSON.stringify(userData))
}

// Initialize navigation
function initNavigation() {
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionName = button.getAttribute("data-section")
      changeSection(sectionName)
    })
  })
}

// Change active section
function changeSection(sectionName) {
  activeSection = sectionName

  // Update active section
  sections.forEach((section) => {
    if (section.id === `${sectionName}-section`) {
      section.classList.add("active")
    } else {
      section.classList.remove("active")
    }
  })

  // Update active nav button
  navButtons.forEach((button) => {
    if (button.getAttribute("data-section") === sectionName) {
      button.classList.add("active")
    } else {
      button.classList.remove("active")
    }
  })
}

// Initialize popup
function initPopup() {
  closePopupBtn.addEventListener("click", () => {
    popup.classList.add("hidden")
  })

  popupOkBtn.addEventListener("click", () => {
    popup.classList.add("hidden")
  })
}

// Show popup message
function showPopup(message) {
  popupMessage.textContent = message
  popup.classList.remove("hidden")

  // Auto-hide popup after 3 seconds
  setTimeout(() => {
    popup.classList.add("hidden")
  }, 3000)
}

// Initialize add money modal
function initAddMoneyModal() {
  cancelAddMoneyBtn.addEventListener("click", () => {
    addMoneyModal.classList.add("hidden")
    transactionCodeInput.value = ""
  })

  confirmAddMoneyBtn.addEventListener("click", () => {
    const code = transactionCodeInput.value.trim()
    addMoney(code)
    addMoneyModal.classList.add("hidden")
    transactionCodeInput.value = ""
  })
}

// Add money to wallet
function addMoney(code) {
  if (!code) {
    showPopup("Please enter a transaction code.")
    return
  }

  // Check if the transaction ID has already been used
  if (usedTransactionIds.includes(code)) {
    showPopup("This transaction ID has already been used.")
    return
  }

  if (code === "VALID123") {
    userData.balance += 50
    // Add the transaction ID to the used IDs list
    usedTransactionIds.push(code)
    saveUsedTransactionIds()
    saveUserData()
    renderProfile()
    showPopup("Successfully added 50 BDT to your wallet!")
  } else {
    showPopup("Wrong transaction ID. Please try again.")
  }
}

// Register for tournament
function registerForTournament(tournamentId, fee) {
  if (!userData) {
    showPopup("Please create a profile first!")
    changeSection("profile")
    return false
  }

  if (userData.balance < fee) {
    showPopup("Insufficient balance. Please add money to your wallet.")
    return false
  }

  userData.balance -= fee

  if (!userData.registeredTournaments) {
    userData.registeredTournaments = []
  }

  userData.registeredTournaments.push(tournamentId)
  saveUserData()
  renderProfile()
  showPopup("Successfully registered for the tournament!")

  // Redirect to tournament details
  window.open("https://example.com/tournament-details", "_blank")

  return true
}

// Render home tournaments
function renderHomeTournaments() {
  const container = document.getElementById("home-tournaments")
  container.innerHTML = ""

  tournaments.forEach((tournament) => {
    const tournamentCard = createTournamentCard(tournament)
    container.appendChild(tournamentCard)
  })
}

// Render all tournaments
function renderAllTournaments() {
  const container = document.getElementById("all-tournaments")
  container.innerHTML = ""

  tournaments.forEach((tournament) => {
    const tournamentCard = createTournamentCard(tournament, true)
    container.appendChild(tournamentCard)
  })
}

// Create tournament card
function createTournamentCard(tournament, showDescription = false) {
  const card = document.createElement("div")
  card.className = "tournament-card"

  card.innerHTML = `
    <img src="${tournament.image}" alt="${tournament.title}">
    <div class="tournament-card-content">
      <h3>${tournament.title}</h3>
      ${showDescription ? `<p>${tournament.description}</p>` : ""}
      <div class="tournament-info">
        <div class="info-item">
          <i class="fas fa-calendar"></i>
          <span>${tournament.date}</span>
        </div>
        ${
          showDescription
            ? `
        <div class="info-item">
          <i class="fas fa-clock"></i>
          <span>${tournament.time}</span>
        </div>
        `
            : ""
        }
        <div class="info-item">
          <i class="fas fa-users"></i>
          <span>${tournament.participants} Participants</span>
        </div>
        <div class="info-item">
          <i class="fas fa-award"></i>
          <span>Prize Pool: ${tournament.prize}</span>
        </div>
      </div>
      <div class="tournament-footer">
        <span class="entry-fee">Entry Fee: ${tournament.fee} BDT</span>
        <button class="btn-register">Register Now</button>
      </div>
    </div>
  `

  const registerBtn = card.querySelector(".btn-register")
  registerBtn.addEventListener("click", () => {
    registerForTournament(tournament.id, tournament.fee)
  })

  return card
}

// Render leaderboard
function renderLeaderboard() {
  const container = document.getElementById("leaderboard-list")
  container.innerHTML = ""

  leaderboardData.forEach((player, index) => {
    const item = document.createElement("div")
    item.className = "leaderboard-item"

    let rankIcon = ""
    if (index === 0) {
      rankIcon = '<i class="fas fa-trophy"></i>'
    } else if (index === 1) {
      rankIcon = '<i class="fas fa-medal" style="color: #c0c0c0;"></i>'
    } else if (index === 2) {
      rankIcon = '<i class="fas fa-medal" style="color: #cd7f32;"></i>'
    } else {
      rankIcon = `<span>${index + 1}</span>`
    }

    item.innerHTML = `
      <div class="rank">
        ${rankIcon}
      </div>
      <div class="player-info">
        <img src="${player.avatar}" alt="${player.username}">
        <div class="player-details">
          <span class="player-name">${player.username}</span>
          <span class="player-stats">${player.wins} Tournaments Won</span>
        </div>
      </div>
      <div class="player-points">${player.points} pts</div>
    `

    container.appendChild(item)
  })
}

// Render profile
function renderProfile() {
  const container = document.getElementById("profile-content")

  if (!userData) {
    // Render empty profile state
    container.innerHTML = `
      <div class="profile-empty">
        <i class="fas fa-user"></i>
        <h2>No Profile Found</h2>
        <p>Create a profile to participate in tournaments and track your progress.</p>
        <button id="create-profile-btn" class="btn-primary">Create Profile</button>
      </div>
    `

    const createProfileBtn = document.getElementById("create-profile-btn")
    createProfileBtn.addEventListener("click", () => {
      renderProfileForm()
    })
  } else if (document.getElementById("profile-form")) {
    // If we're already in the form view, don't re-render
    return
  } else {
    // Render user profile
    container.innerHTML = `
      <div class="profile-container">
        <div class="profile-header">
          <img class="profile-image" src="${userData.profileImage || "https://via.placeholder.com/200"}" alt="Profile">
          <h2 class="profile-name">${userData.username}</h2>
          <p class="profile-id">ID: ${userData.uniqueId}</p>
          <div class="profile-wallet">
            <i class="fas fa-wallet"></i>
            <span>${userData.balance} BDT</span>
          </div>
        </div>
        <div class="profile-actions">
          <button id="edit-profile-btn" class="btn-secondary">Edit Profile</button>
          <button id="add-money-btn" class="btn-primary">
            <i class="fas fa-plus"></i>
            Add Money
          </button>
        </div>
      </div>
    `

    // Add registered tournaments if any
    if (userData.registeredTournaments && userData.registeredTournaments.length > 0) {
      const tournamentsDiv = document.createElement("div")
      tournamentsDiv.className = "registered-tournaments"
      tournamentsDiv.innerHTML = `
        <h3>Registered Tournaments</h3>
        <div class="tournaments-list">
          ${userData.registeredTournaments
            .map(
              (id) => `
            <div class="tournament-item">
              <p>Tournament #${id}</p>
              <p>Registered successfully</p>
            </div>
          `,
            )
            .join("")}
        </div>
      `
      container.appendChild(tournamentsDiv)
    }

    // Add event listeners
    const editProfileBtn = document.getElementById("edit-profile-btn")
    editProfileBtn.addEventListener("click", () => {
      renderProfileForm(true)
    })

    const addMoneyBtn = document.getElementById("add-money-btn")
    addMoneyBtn.addEventListener("click", () => {
      addMoneyModal.classList.remove("hidden")
    })
  }
}

// Render profile form
function renderProfileForm(isEditing = false) {
  const container = document.getElementById("profile-content")

  container.innerHTML = `
    <div class="profile-container">
      <h2>${isEditing ? "Edit Profile" : "Create Profile"}</h2>
      <form id="profile-form" class="form-container">
        <div class="profile-header">
          <div class="profile-image-container">
            <img id="profile-preview" class="profile-image" src="${isEditing && userData.profileImage ? userData.profileImage : "https://via.placeholder.com/200"}" alt="Profile">
            <button type="button" id="upload-photo-btn" class="camera-button">
              <i class="fas fa-camera"></i>
            </button>
            <input type="file" id="profile-photo-input" class="file-input" accept="image/*">
          </div>
        </div>
        
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" value="${isEditing && userData ? userData.username : ""}" placeholder="Enter your username" required>
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" value="${isEditing && userData ? userData.password : ""}" placeholder="Enter your password" required>
        </div>
        
        <div class="form-actions">
          ${
            isEditing
              ? `
            <button type="button" id="cancel-edit-btn" class="btn-secondary">Cancel</button>
          `
              : ""
          }
          <button type="submit" class="btn-primary">${isEditing ? "Save Changes" : "Create Profile"}</button>
        </div>
      </form>
    </div>
  `

  // Add event listeners
  const profileForm = document.getElementById("profile-form")
  const uploadPhotoBtn = document.getElementById("upload-photo-btn")
  const profilePhotoInput = document.getElementById("profile-photo-input")
  const profilePreview = document.getElementById("profile-preview")

  uploadPhotoBtn.addEventListener("click", () => {
    profilePhotoInput.click()
  })

  profilePhotoInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        profilePreview.src = e.target.result
      }
      reader.readAsDataURL(file)
    }
  })

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const profileImage = profilePreview.src

    if (!username || !password) {
      showPopup("Please fill in all required fields")
      return
    }

    if (isEditing) {
      // Update existing user data
      userData.username = username
      userData.password = password
      userData.profileImage = profileImage
    } else {
      // Create new user data
      userData = {
        username,
        password,
        profileImage,
        uniqueId: `USER${Math.floor(100000 + Math.random() * 900000)}`,
        balance: 0,
        registeredTournaments: [],
      }
    }

    saveUserData()
    renderProfile()
    showPopup(`Profile ${isEditing ? "updated" : "created"} successfully!`)
  })

  if (isEditing) {
    const cancelEditBtn = document.getElementById("cancel-edit-btn")
    cancelEditBtn.addEventListener("click", () => {
      renderProfile()
    })
  }
}

// Initialize the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", initApp)
