const projectList = document.querySelector("#project-list");

fetch("../data/projects.json")
.then(response => response.json())
.then(projects => {
    projects.forEach(project => {
        const article = document.createElement("article");

        article.innerHTML = `
        <img src="${project.image}" alt="Projekt bild ${project.title}">
            <h3>${project.title}</h3>
            <p class="technologies">
                ${project.technologies}
            </p>
            <p>
                ${project.description}
            </p>

            <a href="project.html?id=${project.id}">
                Läs mer
            </a>`;
            projectList.appendChild(article);
    });
})
.catch(error => {
    console.error("Kunde inte läsa in projekten:", error);
});

const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    const nameError = document.querySelector("#name-error");
    const emailError = document.querySelector("#email-error");
    const messageError = document.querySelector("#message-error");
    const formSuccess = document.querySelector("#form-success");

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    if (name.length < 2) {
        nameError.textContent = "Namnet måste innehålla minst 2 tecken.";
        isValid = false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        emailError.textContent = "Ange en giltig e-postadress.";
        isValid = false;
    }

    if (message.length < 10) {
        messageError.textContent =
            "Meddelandet måste innehålla minst 10 tecken.";
        isValid = false;
    }

    if (isValid) {
        formSuccess.textContent =
            "Tack! Ditt meddelande har godkänts.";

        contactForm.reset();
    }
});

const visitorNameInput = document.querySelector("#visitor-name");
const saveNameButton = document.querySelector("#save-name");
const personalGreeting = document.querySelector("#personal-greeting");

const savedName = localStorage.getItem("visitorName");

if (savedName) {
    personalGreeting.textContent = `Kul att du är här, ${savedName}! Jag heter...`;
    visitorNameInput.value = savedName;
}

saveNameButton.addEventListener("click", () => {
    const visitorName = visitorNameInput.value.trim();

    if (visitorName.length < 2) {
        personalGreeting.textContent =
            "Skriv ett namn med minst 2 tecken.";
        return;
    }

    localStorage.setItem("visitorName", visitorName);

    personalGreeting.textContent =
        `Kul att du är här, ${visitorName}!`;
});