// App State
let currentPage = "home"
let currentUser = null
let usedCodes = []
let transactions = [] // Added transaction history

// Mock Data
const tournaments = [
  {
    //id: "t1",
    //title: "Weekly Challenge",
    //description: "Compete against players in a weekly tournament",
    //entryFee: 50,
    //date: "2023-06-15",
    //registrationLink: "https://example.com/tournament/1",
    //status: "upcoming",
    //participants: 24,
  },
  {
    //id: "t2",
    //title: "Pro League",
    //description: "Professional tournament with high rewards",
    //entryFee: 50,
    //date: "2023-06-20",
    //registrationLink: "https://example.com/tournament/2",
    //status: "upcoming",
    //participants: 16,
  },
  {
    //id: "t3",
    //title: "Beginner's Cup",
    //description: "Tournament for new players",
    //entryFee: 50,
    //date: "2023-06-25",
    //registrationLink: "https://example.com/tournament/3",
    //status: "upcoming",
    //participants: 32,
  },
  {
    //id: "t4",
    //title: "Championship",
    //description: "Monthly championship with prizes",
    //entryFee: 50,
    //date: "2023-05-30",
    //registrationLink: "https://example.com/tournament/4",
    //status: "completed",
    //participants: 64,
  },
]

const leaderboard = [
  {
    id: "u1",
    rank: 1,
    username: "champion123",
    profilePhoto: "https://via.placeholder.com/40",
    score: 1250,
    wins: 12,
    tournaments: 15,
  },
  {
    id: "u2",
    rank: 2,
    username: "gamer456",
    profilePhoto: "https://via.placeholder.com/40",
    score: 1120,
    wins: 10,
    tournaments: 14,
  },
  {
    id: "u3",
    rank: 3,
    username: "player789",
    profilePhoto: "https://via.placeholder.com/40",
    score: 980,
    wins: 8,
    tournaments: 12,
  },
  {
    id: "u4",
    rank: 4,
    username: "winner321",
    profilePhoto: "https://via.placeholder.com/40",
    score: 850,
    wins: 7,
    tournaments: 10,
  },
  {
    id: "u5",
    rank: 5,
    username: "topplayer",
    profilePhoto: "https://via.placeholder.com/40",
    score: 720,
    wins: 6,
    tournaments: 9,
  },
  {
    id: "u6",
    rank: 6,
    username: "gamingpro",
    profilePhoto: "https://via.placeholder.com/40",
    score: 650,
    wins: 5,
    tournaments: 8,
  },
  {
    id: "u7",
    rank: 7,
    username: "esportsfan",
    profilePhoto: "https://via.placeholder.com/40",
    score: 580,
    wins: 4,
    tournaments: 7,
  },
  {
    id: "u8",
    rank: 8,
    username: "competitivegamer",
    profilePhoto: "https://via.placeholder.com/40",
    score: 520,
    wins: 3,
    tournaments: 6,
  },
  {
    id: "u9",
    rank: 9,
    username: "tournamentking",
    profilePhoto: "https://via.placeholder.com/40",
    score: 450,
    wins: 2,
    tournaments: 5,
  },
  {
    id: "u10",
    rank: 10,
    username: "risingstar",
    profilePhoto: "https://via.placeholder.com/40",
    score: 380,
    wins: 1,
    tournaments: 4,
  },
]

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  // Initialize used codes
  initializeUsedCodes()

  // Initialize transactions
  initializeTransactions()

  // Load user from localStorage
  try {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      currentUser = JSON.parse(storedUser)
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error)
  }

  // Set up navigation
  setupNavigation()

  // Load initial page
  loadPage(currentPage)
})

// Function to initialize used codes
function initializeUsedCodes() {
  try {
    const storedCodes = localStorage.getItem("usedCodes")
    if (storedCodes) {
      usedCodes = JSON.parse(storedCodes)
    } else {
      usedCodes = []
      localStorage.setItem("usedCodes", JSON.stringify(usedCodes))
    }
    console.log("Initialized used codes:", usedCodes)
  } catch (error) {
    console.error("Error initializing used codes:", error)
    usedCodes = []
  }
}

// Function to initialize transactions
function initializeTransactions() {
  try {
    const storedTransactions = localStorage.getItem("transactions")
    if (storedTransactions) {
      transactions = JSON.parse(storedTransactions)
    } else {
      transactions = []
      localStorage.setItem("transactions", JSON.stringify(transactions))
    }
  } catch (error) {
    console.error("Error initializing transactions:", error)
    transactions = []
  }
}

// Navigation Setup
function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-item")

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const page = item.getAttribute("data-page")

      // Update active nav item
      navItems.forEach((navItem) => navItem.classList.remove("active"))
      item.classList.add("active")

      // Load the page
      loadPage(page)
    })
  })
}

// Page Loading
function loadPage(page) {
  currentPage = page
  const mainContent = document.getElementById("main-content")
  mainContent.innerHTML = ""

  switch (page) {
    case "home":
      loadHomePage()
      break
    case "tournament":
      loadTournamentPage()
      break
    case "leaderboard":
      loadLeaderboardPage()
      break
    case "profile":
      loadProfilePage()
      break
    default:
      loadHomePage()
  }
}

// Home Page
function loadHomePage() {
  const template = document.getElementById("home-template")
  const clone = document.importNode(template.content, true)
  document.getElementById("main-content").appendChild(clone)

  const tournamentsList = document.getElementById("tournaments-list")

  // Filter for upcoming tournaments only
  const upcomingTournaments = tournaments.filter((t) => t.status === "upcoming")

  upcomingTournaments.forEach((tournament) => {
    const tournamentCard = createTournamentCard(tournament)
    tournamentsList.appendChild(tournamentCard)
  })
}

// Tournament Page
function loadTournamentPage() {
  const template = document.getElementById("tournament-template")
  const clone = document.importNode(template.content, true)
  document.getElementById("main-content").appendChild(clone)

  const tournamentsList = document.getElementById("all-tournaments-list")

  tournaments.forEach((tournament) => {
    const tournamentCard = createTournamentCard(tournament)
    tournamentsList.appendChild(tournamentCard)
  })
}

// Leaderboard Page
function loadLeaderboardPage() {
  const template = document.getElementById("leaderboard-template")
  const clone = document.importNode(template.content, true)
  document.getElementById("main-content").appendChild(clone)

  const leaderboardList = document.getElementById("leaderboard-list")

  leaderboard.forEach((entry) => {
    const entryElement = createLeaderboardEntry(entry)
    leaderboardList.appendChild(entryElement)
  })
}

// Profile Page
function loadProfilePage() {
  if (currentUser) {
    loadLoggedInProfile()
  } else {
    loadNotLoggedInProfile()
  }
}

// Not Logged In Profile
function loadNotLoggedInProfile() {
  const template = document.getElementById("profile-not-logged-in-template")
  const clone = document.importNode(template.content, true)
  document.getElementById("main-content").appendChild(clone)

  // Set up tab switching
  setupTabs()

  // Set up login form
  const loginForm = document.getElementById("login-form")
  loginForm.addEventListener("submit", handleLogin)

  // Set up register form
  const registerForm = document.getElementById("register-form")
  registerForm.addEventListener("submit", handleRegister)

  // Set up profile photo change
  const changePhotoBtn = document.getElementById("change-photo-btn")
  const profilePhotoInput = document.getElementById("profile-photo-input")

  changePhotoBtn.addEventListener("click", () => {
    profilePhotoInput.click()
  })

  profilePhotoInput.addEventListener("change", handleProfilePhotoChange)
}

// Logged In Profile
function loadLoggedInProfile() {
  const template = document.getElementById("profile-logged-in-template")
  const clone = document.importNode(template.content, true)
  document.getElementById("main-content").appendChild(clone)

  // Set up tab switching
  setupTabs()

  // Fill user data
  document.getElementById("user-username").textContent = currentUser.username
  document.getElementById("user-id").textContent = `ID: ${currentUser.id}`
  document.getElementById("user-balance").textContent = `${currentUser.balance} BDT`
  document.getElementById("user-profile-photo").src = currentUser.profilePhoto

  // Set up add money form
  const addMoneyForm = document.getElementById("add-money-form")
  addMoneyForm.addEventListener("submit", handleAddMoney)

  // Set up withdraw form
  const withdrawForm = document.getElementById("withdraw-form")
  withdrawForm.addEventListener("submit", handleWithdraw)

  // Set up logout button
  const logoutBtn = document.getElementById("logout-btn")
  logoutBtn.addEventListener("click", handleLogout)

  // Set max withdraw amount
  document.getElementById("withdraw-amount").setAttribute("max", currentUser.balance)

  // Load transaction history if available
  if (document.getElementById("transaction-history")) {
    loadTransactionHistory()
  }
}

// Load Transaction History
function loadTransactionHistory() {
  const historyContainer = document.getElementById("transaction-history")
  if (!historyContainer) return

  // Clear existing content
  historyContainer.innerHTML = ""

  // Get user transactions
  const userTransactions = transactions.filter((t) => t.userId === currentUser.id)

  if (userTransactions.length === 0) {
    const emptyMessage = document.createElement("p")
    emptyMessage.className = "text-center text-muted"
    emptyMessage.textContent = "No transaction history available."
    historyContainer.appendChild(emptyMessage)
    return
  }

  // Sort transactions by date (newest first)
  userTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))

  // Create transaction list
  userTransactions.forEach((transaction) => {
    const item = document.createElement("div")
    item.className = "transaction-item"

    const date = document.createElement("div")
    date.className = "transaction-date"
    date.textContent = new Date(transaction.date).toLocaleDateString()

    const details = document.createElement("div")
    details.className = "transaction-details"

    const title = document.createElement("div")
    title.className = "transaction-title"
    title.textContent = transaction.title

    const amount = document.createElement("div")
    amount.className = transaction.amount > 0 ? "transaction-amount positive" : "transaction-amount negative"
    amount.textContent = `${transaction.amount > 0 ? "+" : ""}${transaction.amount} BDT`

    details.appendChild(title)
    details.appendChild(amount)

    item.appendChild(date)
    item.appendChild(details)

    historyContainer.appendChild(item)
  })
}

// Add Transaction
function addTransaction(title, amount) {
  if (!currentUser) return

  const transaction = {
    id: `tx_${Date.now()}`,
    userId: currentUser.id,
    title: title,
    amount: amount,
    date: new Date().toISOString(),
  }

  transactions.push(transaction)
  localStorage.setItem("transactions", JSON.stringify(transactions))

  // Refresh transaction history if on profile page
  if (currentPage === "profile" && document.getElementById("transaction-history")) {
    loadTransactionHistory()
  }
}

// Tab Switching
function setupTabs() {
  const tabItems = document.querySelectorAll(".tab-item")

  tabItems.forEach((item) => {
    item.addEventListener("click", () => {
      const tab = item.getAttribute("data-tab")
      const tabHeader = item.closest(".tab-header")
      const tabContent = tabHeader.nextElementSibling

      // Update active tab
      tabHeader.querySelectorAll(".tab-item").forEach((tabItem) => tabItem.classList.remove("active"))
      item.classList.add("active")

      // Show active tab content
      tabContent.querySelectorAll(".tab-pane").forEach((pane) => pane.classList.remove("active"))
      tabContent.querySelector(`#${tab}-tab`).classList.add("active")
    })
  })
}

// Login Handler
function handleLogin(e) {
  e.preventDefault()

  const username = document.getElementById("login-username").value
  const password = document.getElementById("login-password").value

  if (!username || !password) {
    showLoginError("Please enter both username and password")
    return
  }

  try {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u) => u.username === username && u.password === password)

    if (user) {
      // Set current user
      currentUser = {
        id: user.id,
        username: user.username,
        profilePhoto: user.profilePhoto,
        balance: user.balance,
      }

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(currentUser))

      // Show success popup
      showPopup({
        title: "Login Successful",
        message: `Welcome back, ${currentUser.username}!`,
        type: "success",
        onConfirm: () => loadProfilePage(),
      })
    } else {
      showLoginError("Invalid username or password")
    }
  } catch (error) {
    console.error("Error during login:", error)
    showLoginError("An error occurred. Please try again.")
  }
}

// Register Handler
function handleRegister(e) {
  e.preventDefault()

  const username = document.getElementById("register-username").value
  const password = document.getElementById("register-password").value
  const profilePhoto = document.getElementById("profile-preview").src

  if (!username || !password) {
    showRegisterError("Please enter both username and password")
    return
  }

  try {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if username exists
    if (users.some((u) => u.username === username)) {
      showRegisterError("Username already exists")
      return
    }

    // Create new user
    const newUser = {
      id: `USER${Math.floor(100000 + Math.random() * 900000)}`,
      username,
      password,
      profilePhoto,
      balance: 0,
    }

    // Add to users
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Set current user
    currentUser = {
      id: newUser.id,
      username: newUser.username,
      profilePhoto: newUser.profilePhoto,
      balance: newUser.balance,
    }

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(currentUser))

    // Show success popup
    showPopup({
      title: "Registration Successful",
      message: `Welcome, ${currentUser.username}! Your account has been created.`,
      type: "success",
      onConfirm: () => loadProfilePage(),
    })
  } catch (error) {
    console.error("Error during registration:", error)
    showRegisterError("An error occurred. Please try again.")
  }
}

// Profile Photo Change Handler
function handleProfilePhotoChange(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (event) => {
      document.getElementById("profile-preview").src = event.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Add Money Handler
function handleAddMoney(e) {
  e.preventDefault()

  const transactionCode = document.getElementById("transaction-code").value.trim()

  if (!transactionCode) {
    showPopup({
      title: "Error",
      message: "Please enter a transaction code",
      type: "error",
    })
    return
  }

  // Validate transaction code - only accept "1098"
  if (transactionCode !== "1098") {
    showPopup({
      title: "Invalid Code",
      message: "Invalid transaction code. Please use the correct code.",
      type: "error",
    })
    return
  }

  try {
    // Load the most recent used codes from localStorage to ensure we have the latest data
    const storedCodes = JSON.parse(localStorage.getItem("usedCodes") || "[]")

    // Check if code has been used
    if (storedCodes.includes(transactionCode)) {
      showPopup({
        title: "Code Already Used",
        message: "This transaction code has already been used",
        type: "error",
      })
      return
    }

    // Add money to balance
    updateBalance(50)

    // Add transaction record
    addTransaction("Added money with code: " + transactionCode, 50)

    // Add code to used codes
    storedCodes.push(transactionCode)
    localStorage.setItem("usedCodes", JSON.stringify(storedCodes))
    usedCodes = storedCodes // Update the in-memory array

    // Show success message
    showPopup({
      title: "Money Added",
      message: "Successfully added 50 BDT to your wallet",
      type: "success",
    })

    // Clear form
    document.getElementById("transaction-code").value = ""
  } catch (error) {
    console.error("Error adding money:", error)
    showPopup({
      title: "Error",
      message: "An error occurred. Please try again.",
      type: "error",
    })
  }
}

// Withdraw Handler
function handleWithdraw(e) {
  e.preventDefault()

  const bkashNumber = document.getElementById("bkash-number").value
  const withdrawAmount = document.getElementById("withdraw-amount").value

  if (!bkashNumber || !withdrawAmount) {
    showWithdrawError("Please enter both bKash number and amount")
    return
  }

  const amount = Number.parseFloat(withdrawAmount)
  if (isNaN(amount) || amount <= 0) {
    showWithdrawError("Please enter a valid amount")
    return
  }

  if (amount > currentUser.balance) {
    showWithdrawError("Insufficient balance")
    return
  }

  try {
    // Submit to SheetDB
    fetch("https://sheetdb.io/api/v1/2prhuuz399aja", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: [
          {
            bkashNumber: bkashNumber,
            Amount: amount,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Deduct from balance
        updateBalance(-amount)

        // Add transaction record
        addTransaction(`Withdrawal to bKash: ${bkashNumber}`, -amount)

        // Show success popup
        showPopup({
          title: "Withdrawal Successful",
          message: `Your withdrawal request for ${amount} BDT has been submitted successfully.`,
          type: "success",
        })

        // Clear form
        document.getElementById("bkash-number").value = ""
        document.getElementById("withdraw-amount").value = ""
      })
      .catch((error) => {
        console.error("Error:", error)
        showWithdrawError("Failed to submit withdrawal request. Please try again.")
      })
  } catch (error) {
    console.error("Error during withdrawal:", error)
    showWithdrawError("An error occurred. Please try again.")
  }
}

// Logout Handler
function handleLogout() {
  showPopup({
    title: "Confirm Logout",
    message: "Are you sure you want to logout?",
    type: "info",
    showCancel: true,
    onConfirm: () => {
      currentUser = null
      localStorage.removeItem("user")
      loadProfilePage()
    },
  })
}

// Tournament Registration Handler
function handleTournamentRegister(tournament) {
  if (!currentUser) {
    showPopup({
      title: "Login Required",
      message: "Please login or create an account to register for tournaments.",
      type: "info",
      onConfirm: () => loadPage("profile"),
    })
    return
  }

  if (currentUser.balance < tournament.entryFee) {
    showPopup({
      title: "Insufficient Balance",
      message: "You don't have enough balance to register for this tournament. Please add money to your wallet.",
      type: "error",
      onConfirm: () => loadPage("profile"),
    })
    return
  }

  showPopup({
    title: "Confirm Registration",
    message: `Are you sure you want to register for ${tournament.title}? Entry fee: ${tournament.entryFee} BDT will be deducted from your wallet.`,
    type: "info",
    showCancel: true,
    confirmText: "Register",
    cancelText: "Cancel",
    onConfirm: () => {
      // Deduct entry fee
      updateBalance(-tournament.entryFee)

      // Add transaction record
      addTransaction(`Tournament registration: ${tournament.title}`, -tournament.entryFee)

      // Show success message
      showPopup({
        title: "Registration Successful",
        message: `You have successfully registered for ${tournament.title}. You will be redirected to the registration page.`,
        type: "success",
        onConfirm: () => window.open(tournament.registrationLink, "_blank"),
      })
    },
  })
}

// Update Balance
function updateBalance(amount) {
  if (!currentUser) return

  try {
    // Update current user balance
    currentUser.balance += amount

    // Update in localStorage
    localStorage.setItem("user", JSON.stringify(currentUser))

    // Update users array
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u) => {
      if (u.id === currentUser.id) {
        return { ...u, balance: currentUser.balance }
      }
      return u
    })
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    // Update UI if on profile page
    if (currentPage === "profile" && document.getElementById("user-balance")) {
      document.getElementById("user-balance").textContent = `${currentUser.balance} BDT`
      document.getElementById("withdraw-amount").setAttribute("max", currentUser.balance)
    }
  } catch (error) {
    console.error("Error updating balance:", error)
  }
}

// Create Tournament Card
function createTournamentCard(tournament) {
  const template = document.getElementById("tournament-card-template")
  const clone = document.importNode(template.content, true)

  // Set tournament data
  clone.querySelector(".tournament-title").textContent = tournament.title
  clone.querySelector(".tournament-date").textContent = `Date: ${tournament.date}`
  clone.querySelector(".tournament-description").textContent = tournament.description
  clone.querySelector(".tournament-fee").textContent = `Entry Fee: ${tournament.entryFee} BDT`

  // Set participants if available
  if (tournament.participants) {
    clone.querySelector(".tournament-participants").textContent = `Participants: ${tournament.participants}`
  } else {
    clone.querySelector(".tournament-participants").style.display = "none"
  }

  // Set status badge
  const statusElement = clone.querySelector(".tournament-status")
  if (tournament.status) {
    const statusClass = `status-${tournament.status}`
    statusElement.classList.add(statusClass)

    switch (tournament.status) {
      case "upcoming":
        statusElement.textContent = "Upcoming"
        break
      case "ongoing":
        statusElement.textContent = "Ongoing"
        break
      case "completed":
        statusElement.textContent = "Completed"
        break
    }
  } else {
    statusElement.style.display = "none"
  }

  // Set register button
  const registerBtn = clone.querySelector(".tournament-register-btn")
  if (tournament.status === "completed") {
    registerBtn.textContent = "View Results"
    registerBtn.classList.remove("btn-primary")
    registerBtn.classList.add("btn-outline")
  } else if (tournament.status === "ongoing") {
    registerBtn.textContent = "View Details"
  }

  registerBtn.addEventListener("click", () => {
    if (tournament.status === "upcoming") {
      handleTournamentRegister(tournament)
    } else if (tournament.status === "completed") {
      // View results (not implemented)
      showPopup({
        title: "Tournament Results",
        message: "Results viewing is not implemented in this demo.",
        type: "info",
      })
    } else {
      // View details (not implemented)
      showPopup({
        title: "Tournament Details",
        message: "Tournament details viewing is not implemented in this demo.",
        type: "info",
      })
    }
  })

  return clone
}

// Create Leaderboard Entry
function createLeaderboardEntry(entry) {
  const template = document.getElementById("leaderboard-entry-template")
  const clone = document.importNode(template.content, true)

  // Create rank badge
  const rankElement = clone.querySelector(".leaderboard-rank")
  const rankBadge = document.createElement("div")
  rankBadge.classList.add("rank-badge")

  if (entry.rank === 1) {
    rankBadge.classList.add("rank-1")
    rankBadge.textContent = "1st"
  } else if (entry.rank === 2) {
    rankBadge.classList.add("rank-2")
    rankBadge.textContent = "2nd"
  } else if (entry.rank === 3) {
    rankBadge.classList.add("rank-3")
    rankBadge.textContent = "3rd"
  } else {
    rankBadge.classList.add("rank-other")
    rankBadge.textContent = `${entry.rank}th`
  }

  rankElement.appendChild(rankBadge)

  // Set user data
  clone.querySelector(".leaderboard-avatar").src = entry.profilePhoto
  clone.querySelector(".leaderboard-username").textContent = entry.username
  clone.querySelector(".leaderboard-stats").textContent = `${entry.wins} wins / ${entry.tournaments} tournaments`
  clone.querySelector(".leaderboard-score").textContent = entry.score

  return clone
}

// Show Login Error
function showLoginError(message) {
  const errorElement = document.getElementById("login-error")
  const errorMessageElement = document.getElementById("login-error-message")

  errorMessageElement.textContent = message
  errorElement.style.display = "flex"
}

// Show Register Error
function showRegisterError(message) {
  const errorElement = document.getElementById("register-error")
  const errorMessageElement = document.getElementById("register-error-message")

  errorMessageElement.textContent = message
  errorElement.style.display = "flex"
}

// Show Transaction Error
function showTransactionError(message) {
  const errorElement = document.getElementById("transaction-error")
  const errorMessageElement = document.getElementById("transaction-error-message")
  const successElement = document.getElementById("transaction-success")

  errorMessageElement.textContent = message
  errorElement.style.display = "flex"
  successElement.style.display = "none"
}

// Show Transaction Success
function showTransactionSuccess(message) {
  const errorElement = document.getElementById("transaction-error")
  const successElement = document.getElementById("transaction-success")
  const successMessageElement = document.getElementById("transaction-success-message")

  successMessageElement.textContent = message
  successElement.style.display = "flex"
  errorElement.style.display = "none"
}

// Show Withdraw Error
function showWithdrawError(message) {
  const errorElement = document.getElementById("withdraw-error")
  const errorMessageElement = document.getElementById("withdraw-error-message")
  const successElement = document.getElementById("withdraw-success")

  errorMessageElement.textContent = message
  errorElement.style.display = "flex"
  successElement.style.display = "none"
}

// Show Withdraw Success
function showWithdrawSuccess(message) {
  const errorElement = document.getElementById("withdraw-error")
  const successElement = document.getElementById("withdraw-success")
  const successMessageElement = document.getElementById("withdraw-success-message")

  successMessageElement.textContent = message
  successElement.style.display = "flex"
  errorElement.style.display = "none"
}

// Popup Functions
function showPopup(options) {
  const {
    title = "Notification",
    message = "",
    type = "info", // 'success', 'error', 'info'
    showCancel = false,
    confirmText = "OK",
    cancelText = "Cancel",
    onConfirm = () => {},
    onCancel = () => {},
  } = options

  // Set popup content
  document.getElementById("popup-title").textContent = title
  document.getElementById("popup-message").textContent = message

  // Set popup icon
  const iconElement = document.getElementById("popup-icon")
  const iconSymbol = document.getElementById("popup-icon-symbol")

  iconElement.className = "popup-icon"
  iconElement.classList.add(type)

  if (type === "success") {
    iconSymbol.className = "fas fa-check"
  } else if (type === "error") {
    iconSymbol.className = "fas fa-exclamation-circle"
  } else {
    iconSymbol.className = "fas fa-info-circle"
  }

  // Set buttons
  const confirmBtn = document.getElementById("popup-confirm-btn")
  const cancelBtn = document.getElementById("popup-cancel-btn")

  confirmBtn.textContent = confirmText
  cancelBtn.textContent = cancelText

  if (showCancel) {
    cancelBtn.style.display = "block"
  } else {
    cancelBtn.style.display = "none"
  }

  // Set button actions
  confirmBtn.onclick = () => {
    hidePopup()
    onConfirm()
  }

  cancelBtn.onclick = () => {
    hidePopup()
    onCancel()
  }

  // Show popup
  document.getElementById("popup-overlay").classList.add("active")
}

function hidePopup() {
  document.getElementById("popup-overlay").classList.remove("active")
}

// Handle keyboard events for popup
document.addEventListener("keydown", (event) => {
  const popup = document.getElementById("popup-overlay")
  if (popup.classList.contains("active")) {
    if (event.key === "Escape") {
      // Close popup on ESC key
      const cancelBtn = document.getElementById("popup-cancel-btn")
      if (cancelBtn.style.display !== "none") {
        cancelBtn.click()
      } else {
        document.getElementById("popup-confirm-btn").click()
      }
    } else if (event.key === "Enter") {
      // Confirm on Enter key
      document.getElementById("popup-confirm-btn").click()
    }
  }
})

// Handle outside click to close popup
document.addEventListener("click", (event) => {
  const popup = document.getElementById("popup-overlay")
  const popupContainer = document.querySelector(".popup-container")

  if (popup.classList.contains("active") && event.target === popup && !popupContainer.contains(event.target)) {
    const cancelBtn = document.getElementById("popup-cancel-btn")
    if (cancelBtn.style.display !== "none") {
      cancelBtn.click()
    }
  }
})
