const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

fetch("data/projects.json")
    .then(response => response.json())
    .then(projects => {

        const project = projects.find(project => project.id === projectId);

        if (!project) {
            document.querySelector("#project-detail").innerHTML = `
                <h1>Projektet kunde inte hittas</h1>
                <a href="index.html">Tillbaka till startsidan</a>
            `;

            return;
        }

        document.title = `${project.title} | Adam Majava`;

        document.querySelector("#project-title").textContent =
            project.title;

        const image = document.querySelector("#project-image");

        image.src = project.image;
        image.alt = `Bild från projektet ${project.title}`;

        document.querySelector("#project-technologies").textContent =
            project.technologies;

        document.querySelector("#project-description").textContent =
            project.longDescription;

        document.querySelector("#project-github").href =
            project.github;
    })
    .catch(error => {
        console.error("Kunde inte läsa in projektet:", error);
    });