// Add Text to Builder
function addText() {
  const textElement = document.createElement('div');
  textElement.contentEditable = true;
  textElement.classList.add('draggable-text');
  textElement.textContent = "Edit me!";
  document.getElementById('builder').appendChild(textElement);
}

// Add Button to Builder
function addButton() {
  const buttonElement = document.createElement('button');
  buttonElement.textContent = "Click me";
  buttonElement.classList.add('draggable-button');
  document.getElementById('builder').appendChild(buttonElement);
}

// Open Image Uploader
function openImageUploader() {
  document.getElementById('imageUploadInput').click();
}

// Handle Image Upload
function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function() {
    const imgElement = document.createElement('img');
    imgElement.src = reader.result;
    imgElement.classList.add('draggable-image');
    document.getElementById('builder').appendChild(imgElement);
  };
  reader.readAsDataURL(file);
}

// Export Full Site HTML
function exportFullHTML() {
  const htmlContent = document.documentElement.outerHTML;
  const blob = new Blob([htmlContent], { type: 'text/html' });
  saveAs(blob, 'wix-clone.html');
}

// Download Project as ZIP
function downloadProjectZip() {
  const zip = new JSZip();
  zip.file('index.html', document.documentElement.outerHTML);
  // Add other files like CSS, JS, etc.
  zip.generateAsync({ type: "blob" }).then(function(content) {
    saveAs(content, 'wix-clone.zip');
  });
}

// Deploy to Netlify (This is a placeholder, and requires API integration to work)
function deployToNetlify() {
  alert("Deploying to Netlify...");
  // You would need to integrate Netlify's API for this to work
}

// Drag & Drop functionality for Components
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.innerHTML);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var newElement = document.createElement('div');
  newElement.innerHTML = data;
  ev.target.appendChild(newElement);
}


let pages = {};
let currentPage = null;

// Add a new page
function addPage() {
  const pageName = document.getElementById('pageName').value.trim();
  if (!pageName) {
    alert("Please enter a page name.");
    return;
  }

  if (pages[pageName]) {
    alert("Page already exists!");
    return;
  }

  // Create a new builder div for the page
  const newPage = document.createElement("div");
  newPage.className = "builder-page";
  newPage.contentEditable = true;
  newPage.style.display = "none";
  newPage.id = `page-${pageName}`;
  document.body.appendChild(newPage);

  pages[pageName] = newPage;

  // Add option to dropdown
  const option = document.createElement("option");
  option.value = pageName;
  option.textContent = pageName;
  document.getElementById("pageSelector").appendChild(option);

  // Switch to the new page
  document.getElementById("pageSelector").value = pageName;
  switchPage(pageName);

  document.getElementById('pageName').value = "";
}

// Switch page from dropdown
function switchPage(pageName) {
  if (!pages[pageName]) return;

  if (currentPage) {
    pages[currentPage].style.display = "none";
  }

  currentPage = pageName;
  pages[pageName].style.display = "block";
}

// Delete the current page
function deletePage() {
  const selector = document.getElementById("pageSelector");
  const selectedPage = selector.value;

  if (!selectedPage) {
    alert("No page selected.");
    return;
  }

  // Remove from DOM
  const pageElement = pages[selectedPage];
  if (pageElement) {
    pageElement.remove();
    delete pages[selectedPage];
  }

  // Remove from dropdown
  [...selector.options].forEach(option => {
    if (option.value === selectedPage) option.remove();
  });

  currentPage = null;
  if (selector.options.length > 0) {
    const nextPage = selector.options[0].value;
    selector.value = nextPage;
    switchPage(nextPage);
  } else {
    // No pages left
    const builder = document.getElementById('builder');
    if (builder) builder.innerHTML = '';
  }
}


particlesJS('particles-js', {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" }
    },
    opacity: {
      value: 0.5,
      random: true
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" }
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});


function applyTheme(theme) {
  document.body.classList.remove("theme-light", "theme-dark", "theme-colorful");
  document.body.classList.add(`theme-${theme}`);
}


let slideIndex = 0;

function moveSlide(step) {
  const slides = document.querySelectorAll('.testimonial-card');
  const totalSlides = slides.length;
  slideIndex += step;

  if (slideIndex < 0) {
    slideIndex = totalSlides - 1;
  } else if (slideIndex >= totalSlides) {
    slideIndex = 0;
  }

  const container = document.querySelector('.testimonial-container');
  container.style.transform = `translateX(-${slideIndex * 320}px)`;
}

// Auto-scroll every 4 seconds
setInterval(() => {
  moveSlide(1); // Automatically move to the next slide
}, 4000);

const footer = document.querySelector('.site-footer');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      footer.classList.add('animate');
    }
  });
}, {
  threshold: 0.2
});

observer.observe(footer);



const chatToggle = document.getElementById("chatbot-toggle");
const chatWindow = document.getElementById("chatbot-window");
const closeChat = document.getElementById("close-chat");
const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

chatToggle.onclick = () => chatWindow.classList.toggle("hidden");
closeChat.onclick = () => chatWindow.classList.add("hidden");

let step = 0;

function addMessage(message, type = "bot") {
  const msg = document.createElement("div");
  msg.className = type === "bot" ? "bot-msg" : "user-msg";
  msg.innerText = message;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function sendMessage() {
  const userInput = chatInput.value.trim();
  if (!userInput) return;

  addMessage(userInput, "user");
  chatInput.value = "";

  setTimeout(() => {
    handleStep(userInput.toLowerCase());
  }, 600);
}

function handleStep(input) {
  if (step === 0) {
    addMessage("What type of website would you like to create?\n1. Portfolio\n2. Blog\n3. Business\n4. E-Commerce");
    step = 1;
  } else if (step === 1) {
    if (["1", "portfolio"].includes(input)) {
      redirectToTemplate("portfolio");
    } else if (["2", "blog"].includes(input)) {
      redirectToTemplate("blog");
    } else if (["3", "business"].includes(input)) {
      redirectToTemplate("business");
    } else if (["4", "ecommerce", "e-commerce"].includes(input)) {
      redirectToTemplate("ecommerce");
    } else {
      addMessage("Please choose a valid option from 1 to 4.");
    }
  }
}

function redirectToTemplate(type) {
  addMessage(`Great choice! Redirecting you to the ${type} template...`);
  setTimeout(() => {
    window.location.href = `templates/${type}.html`; // Adjust path if needed
  }, 1500);
}

sendBtn.onclick = sendMessage;
chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

window.onload = () => handleStep();






