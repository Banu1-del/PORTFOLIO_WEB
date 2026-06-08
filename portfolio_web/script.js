const text = [
    "MCA Student",
    "Web Developer",
    "Python Developer",
    "Full Stack Learner"
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {

    if (count === text.length) {
        count = 0;
    }

    currentText = text[count];

    letter = currentText.slice(0, ++index);

    document.getElementById("typing").textContent = letter;

    if (letter.length === currentText.length) {

        setTimeout(() => {

            index = 0;
            count++;

        }, 1500);

    }

    setTimeout(type, 120);

})();

/* Smooth fade-in animation */

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});

/* Navbar active link */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (pageYOffset >= sectionTop - 200) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/* Lightbox Modal Functions */

function openCertModal(imgSrc, captionText) {
    const modal = document.getElementById("cert-modal");
    const modalImg = document.getElementById("modal-img");
    const caption = document.getElementById("caption");

    modal.style.display = "flex";
    // Force a reflow to trigger CSS transitions
    modal.offsetHeight;
    modal.classList.add("show");

    modalImg.src = imgSrc;
    caption.textContent = captionText;
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
}

function closeCertModal() {
    const modal = document.getElementById("cert-modal");
    modal.classList.remove("show");

    // Wait for transition to complete before setting display to none
    setTimeout(() => {
        if (!modal.classList.contains("show")) {
            modal.style.display = "none";
            document.body.style.overflow = ""; // Restore scrolling
        }
    }, 300);
}

// Close modal when clicking outside the certificate image
window.addEventListener("click", (e) => {
    const modal = document.getElementById("cert-modal");
    if (e.target === modal) {
        closeCertModal();
    }
});

/* Contact Form Submission via Web3Forms */

const contactForm = document.getElementById("contact-form");
const formSubmitBtn = document.getElementById("form-submit-btn");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // 1. Prepare visual feedback (disable button, update text, clear status)
        formSubmitBtn.disabled = true;
        const originalBtnText = formSubmitBtn.textContent;
        formSubmitBtn.textContent = "Sending...";
        formStatus.style.display = "none";
        formStatus.className = "";

        // 2. Extract form data
        const formData = new FormData(contactForm);
        const jsonObject = Object.fromEntries(formData);
        const json = JSON.stringify(jsonObject);

        // 3. Post to Web3Forms API
        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: json
        })
            .then(async (response) => {
                let result = await response.json();
                if (response.status === 200) {
                    // Success - hide form and show custom thank you message
                    contactForm.style.display = "none";
                    const successCard = document.getElementById("contact-success");
                    if (successCard) {
                        successCard.classList.add("show");
                    }
                } else {
                    // API returned error
                    formStatus.textContent = result.message || "Something went wrong. Please try again.";
                    formStatus.classList.add("error");
                }
            })
            .catch((error) => {
                // Network error
                formStatus.textContent = "Unable to connect to the server. Please check your connection and try again.";
                formStatus.classList.add("error");
            })
            .finally(() => {
                // Re-enable button
                formSubmitBtn.disabled = false;
                formSubmitBtn.textContent = originalBtnText;
            });
    });
}

/* Coding Words Rain on Canvas */
const canvas = document.getElementById("skills-canvas");
if (canvas) {
    const ctx = canvas.getContext("2d");

    const codeWords = [
        // JavaScript
        "const", "let", "var", "function", "return", "import", "export",
        "from", "await", "async", "Promise", "resolve", "reject", "then()",
        "catch()", "arrow =>", "typeof", "instanceof", "undefined", "null",
        "console.log()", "document.getElementById()", "window.onload",
        "addEventListener()", "querySelector()", "innerHTML", "classList.add()",
        "JSON.parse()", "JSON.stringify()", "fetch()", "map()", "filter()",
        "forEach()", "reduce()", "spread ...", "destructure {}", "template `${}`",
        "setTimeout()", "setInterval()", "try { }", "catch(e) { }",

        // Python
        "def", "class", "self", "return", "import", "from", "as",
        "print()", "len()", "range()", "enumerate()", "zip()", "list()",
        "dict()", "set()", "tuple()", "lambda x:", "if __name__==",
        "for x in list:", "with open() as f:", "try: except:", "__init__",
        "numpy", "pandas", "matplotlib", "sklearn", "flask", "django",
        "model.fit()", "model.predict()", "train_test_split()",
        "RandomForestClassifier()", "accuracy_score()", "DataFrame()",
        "plt.show()", "pd.read_csv()", "np.array()", "pip install",

        // Java
        "public class", "public static void main", "System.out.println()",
        "String[] args", "new ArrayList<>()", "import java.util.*",
        "@Override", "interface", "extends", "implements",
        "try { } catch(Exception e)", "throw new Exception()",
        "HashMap<K,V>", "for(int i=0;)", "while(true)", "break;", "continue;",
        "this.value", "super()", "abstract class", "final int",

        // HTML
        "<html>", "<head>", "<body>", "<div>", "<span>", "<section>",
        "<nav>", "<header>", "<footer>", "<form>", "<input>", "<button>",
        "</div>", "</section>", "class=\"\"", "id=\"\"", "href=\"\"",
        "src=\"\"", "alt=\"\"", "data-attr", "aria-label",

        // CSS
        "display: flex;", "grid-template-columns:", "position: absolute;",
        "border-radius: 10px;", "background: linear-gradient()",
        "box-shadow: 0 0 20px", "transition: all 0.3s;",
        "transform: translateY()", "animation: fadeIn 1s;",
        "opacity: 0.5;", "z-index: 999;", "@media (max-width: 768px)",
        ":hover { }", "::before { }", "margin: auto;", "padding: 20px;",
        "font-family: Poppins;", "color: #38bdf8;", "backdrop-filter: blur()",

        // SQL / Database
        "SELECT * FROM", "INSERT INTO", "UPDATE SET", "DELETE FROM",
        "WHERE id =", "JOIN ON", "GROUP BY", "ORDER BY DESC",
        "CREATE TABLE", "ALTER TABLE", "PRIMARY KEY", "FOREIGN KEY",
        "db.connection()", "cursor.execute()", "commit()", "rollback()",

        // Git / Terminal
        "git init", "git add .", "git commit -m", "git push origin",
        "git pull", "git merge", "git branch", "git status", "git log",
        "npm install", "npm run dev", "node index.js",
        "cd project/", "ls -la", "mkdir src", "touch index.html",

        // Symbols
        "{ }", "[ ]", "( )", "</>", "//comment", "/* block */",
        "===", "!==", "&&", "||", "?? null", "?.optional",
        "++i", "--j", "+=", "%=", "**2", "~bitwise",
    ];

    let width, height, columns, drops;

    function init() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
        columns = Math.floor(width / 65); // Tighter spacing
        drops = [];

        const dropsPerColumn = 4; // Multiple words per column track
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < dropsPerColumn; j++) {
                drops.push({
                    x: i * 65 + Math.random() * 20,
                    y: (Math.random() * -height) - (j * (height / dropsPerColumn)),
                    speed: 0.4 + Math.random() * 0.5, // Slow gentle drift
                    word: codeWords[Math.floor(Math.random() * codeWords.length)],
                    fontSize: 10 + Math.floor(Math.random() * 5),
                    opacity: 0.12 + Math.random() * 0.23 // Slightly higher visibility
                });
            }
        }
    }

    init();

    window.addEventListener("resize", () => {
        // Only re-initialize if dimensions change significantly
        if (Math.abs(width - canvas.offsetWidth) > 20 || Math.abs(height - canvas.offsetHeight) > 20) {
            init();
        }
    });

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < drops.length; i++) {
            const drop = drops[i];

            // Render coding word
            ctx.fillStyle = `rgba(56, 189, 248, ${drop.opacity})`;
            ctx.font = `600 ${drop.fontSize}px 'Courier New', Courier, monospace`;
            ctx.fillText(drop.word, drop.x, drop.y);

            // Move drop down
            drop.y += drop.speed;

            // Reset when drop exits canvas
            if (drop.y > height + 20) {
                drop.y = -40;
                drop.word = codeWords[Math.floor(Math.random() * codeWords.length)];
                drop.speed = 0.4 + Math.random() * 0.5;
                drop.opacity = 0.12 + Math.random() * 0.23;
                drop.fontSize = 10 + Math.floor(Math.random() * 5);
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
}