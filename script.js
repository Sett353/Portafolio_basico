// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const nav = document.getElementById("nav")
  const header = document.getElementById("header")

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("active")
    }
  })

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Typing animation
  const typingElement = document.getElementById("typing")
  const words = [
    "Estudiante de Programación",
    "Desarrollador Frontend Junior",
    "Aprendiz de React",
    "Futuro Full Stack",
    "Creador de Proyectos",
  ]
  let wordIndex = 0
  let letterIndex = 0
  let currentWord = ""
  let currentLetters = ""
  let isDeleting = false

  function type() {
    if (isDeleting) {
      currentLetters = currentWord.substring(0, letterIndex - 1)
      letterIndex--
    } else {
      currentLetters = currentWord.substring(0, letterIndex + 1)
      letterIndex++
    }

    typingElement.innerHTML = currentLetters

    let typeSpeed = 150
    if (isDeleting) {
      typeSpeed /= 2
    }

    if (!isDeleting && letterIndex === currentWord.length) {
      typeSpeed = 2000
      isDeleting = true
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false
      wordIndex++
      if (wordIndex === words.length) {
        wordIndex = 0
      }
      currentWord = words[wordIndex]
      typeSpeed = 500
    }

    setTimeout(type, typeSpeed)
  }

  currentWord = words[wordIndex]
  type()

  // Smooth scrolling for navigation links
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }

      // Update active nav link
      document.querySelectorAll("nav a").forEach((link) => link.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Create floating particles
  function createParticles() {
    const particlesContainer = document.getElementById("particles")
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 8 + "s"
      particle.style.animationDuration = Math.random() * 3 + 5 + "s"

      particlesContainer.appendChild(particle)
    }
  }

  createParticles()

  // Contact form handling
  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const name = formData.get("name")
    const email = formData.get("email")
    const subject = formData.get("subject")
    const message = formData.get("message")

    if (name && email && subject && message) {
      const submitBtn = this.querySelector(".submit-btn")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Enviando mensaje..."
      submitBtn.disabled = true

      setTimeout(() => {
        alert(
          "¡Mensaje enviado exitosamente! 📧\n\n" +
            "Gracias por contactarme. Como estudiante, valoro mucho cada mensaje.\n" +
            "Te responderé muy pronto. ¡Que tengas un excelente día! 😊",
        )
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    }
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".skill-card, .project-card, .education-item, .about-content > div").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    observer.observe(el)
  })

  // Add hover effects to cards
  document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const icon = this.querySelector("i")
      const level = this.querySelector(".skill-level")

      icon.style.transform = "scale(1.2) rotate(360deg)"
      icon.style.transition = "transform 0.5s ease"

      if (level) {
        level.style.transform = "scale(1.1)"
        level.style.transition = "transform 0.3s ease"
      }
    })

    card.addEventListener("mouseleave", function () {
      const icon = this.querySelector("i")
      const level = this.querySelector(".skill-level")

      icon.style.transform = "scale(1) rotate(0deg)"

      if (level) {
        level.style.transform = "scale(1)"
      }
    })
  })

  // Update active nav on scroll
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const navLinks = document.querySelectorAll("nav a")

    let currentSection = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150
      const sectionHeight = section.offsetHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active")
      }
    })
  })

  // Course items animation on scroll
  const courseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateX(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll(".course-item").forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-50px)"
    item.style.transition = "opacity 0.8s ease, transform 0.8s ease"
    courseObserver.observe(item)
  })

  // Enhanced social links with student-friendly messages
  document.querySelectorAll(".social-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const platform = this.title

      if (platform === "GitHub") {
        setTimeout(() => {
          console.log("🌟 ¡Gracias por visitar mi GitHub!")
          console.log("💡 Recuerda dar estrella a los repos que te gusten")
        }, 500)
      }
    })
  })

  // Student motivation messages
  const motivationalMessages = [
    "¡Sigue aprendiendo! 🚀",
    "Cada línea de código cuenta 💻",
    "El futuro es tuyo 🌟",
    "Nunca pares de crear 🎨",
    "Los errores son aprendizaje 🐛➡️✨",
  ]

  // Show random motivational message every 30 seconds
  setInterval(() => {
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    console.log(`💪 ${randomMessage}`)
  }, 30000)

  // GitHub starring functionality
  const starReposBtn = document.getElementById("star-repos")
  const autoStarBtn = document.getElementById("auto-star")

  if (starReposBtn) {
    starReposBtn.addEventListener("click", () => {
      // Open GitHub profile in new tab
      window.open("https://github.com/Sett353", "_blank")

      // Show encouraging message
      setTimeout(() => {
        alert(
          "¡Gracias por visitar mi GitHub! 🌟\n\nNo olvides dar estrella a los repositorios que te gusten.\n¡Tu apoyo significa mucho para un estudiante! 😊",
        )
      }, 1000)
    })
  }

  if (autoStarBtn) {
    autoStarBtn.addEventListener("click", function () {
      const originalText = this.textContent
      this.textContent = "⭐ Abriendo GitHub..."
      this.disabled = true

      // List of repositories to star
      const repos = [
        "https://github.com/Sett353/tienda-basica",
        "https://github.com/Sett353/todo-app",
        "https://github.com/Sett353/memory-game",
        "https://github.com/Sett353",
      ]

      // Open each repository in a new tab
      repos.forEach((repo, index) => {
        setTimeout(() => {
          window.open(repo, "_blank")
        }, index * 500)
      })

      setTimeout(() => {
        alert(
          "🚀 ¡Repositorios abiertos!\n\n" +
            "⭐ Por favor, da estrella a los proyectos que te gusten\n" +
            "👨‍💻 Tu apoyo ayuda a motivar a estudiantes como yo\n" +
            "💪 ¡Cada estrella cuenta!",
        )

        this.textContent = originalText
        this.disabled = false
      }, 2000)
    })
  }

  // Add styles for missing elements
  const style = document.createElement("style")
  style.textContent = `
        .about-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 3rem;
        }

        .stat-item {
            text-align: center;
            padding: 2rem;
            background: rgba(183, 75, 75, 0.1);
            border-radius: 15px;
            border: 2px solid rgba(183, 75, 75, 0.3);
            transition: all 0.3s ease;
        }

        .stat-item:hover {
            transform: translateY(-5px);
            border-color: #b74b4b;
        }

        .stat-item h3 {
            font-size: 3rem;
            color: #b74b4b;
            margin-bottom: 1rem;
        }

        .stat-item p {
            font-size: 1.4rem;
            color: rgba(255, 255, 255, 0.9);
        }

        .contact-details {
            margin-top: 3rem;
        }

        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 1.5rem;
            font-size: 1.6rem;
        }

        .contact-item i {
            color: #b74b4b;
            width: 3rem;
            margin-right: 1rem;
        }

        .contact-item span {
            color: rgba(255, 255, 255, 0.9);
        }

        @media (max-width: 768px) {
            .about-stats {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
            
            .stat-item h3 {
                font-size: 2.5rem;
            }
        }
    `
  document.head.appendChild(style)

  console.log("🚀 Portafolio estudiantil de Santiago cargado exitosamente!")
  console.log("📚 Estudiante en constante aprendizaje")
  console.log("⭐ No olvides dar estrella a mis repositorios")
  console.log("💪 ¡El futuro desarrollador que serás!")
})
