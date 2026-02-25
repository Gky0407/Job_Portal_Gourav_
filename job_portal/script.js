const form = document.getElementById("postJobForm");
const jobContainer = document.getElementById("dynamicJobs");

let editCard = null;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("jobTitle").value.trim();
    const company = document.getElementById("companyName").value.trim();
    const location = document.getElementById("jobLocation").value.trim();
    const type = document.getElementById("jobType").value;
    const desc = document.getElementById("jobDesc").value.trim();
    const logoInput = document.getElementById("companyLogo").value.trim();

    const logo =
        logoInput !== ""
            ? logoInput
            : `https://logo.clearbit.com/${company
                  .toLowerCase()
                  .replace(/\s+/g, "")}.com`;

    if (!title || !company || !location || !desc) {
        alert("Please fill all fields");
        return;
    }

    if (editCard) {
        editCard.querySelector(".title").innerText = title;
        editCard.querySelector(".company").innerText = "Company: " + company;
        editCard.querySelector(".location").innerText = "Location: " + location;
        editCard.querySelector(".type").innerText = "Type: " + type;
        editCard.querySelector(".desc").innerText = desc;
        editCard.querySelector(".logo").src = logo;

        editCard = null;
        form.reset();
        return;
    }

    const card = document.createElement("article");
    card.className = "job-card";

    card.innerHTML = `
        <img class="logo"
             src="${logo}"
             alt="logo"
             style="width:60px;height:60px;object-fit:contain;margin-bottom:8px;"
             onerror="this.src='https://via.placeholder.com/60'">

        <h3 class="title">${title}</h3>
        <p class="company">Company: ${company}</p>
        <p class="location">Location: ${location}</p>
        <p class="type">Type: ${type}</p>
        <p class="desc">${desc}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    card.querySelector(".delete-btn").addEventListener("click", function () {
        card.remove();
    });

    card.querySelector(".edit-btn").addEventListener("click", function () {
        document.getElementById("jobTitle").value =
            card.querySelector(".title").innerText;

        document.getElementById("companyName").value =
            card.querySelector(".company").innerText.replace("Company: ", "");

        document.getElementById("jobLocation").value =
            card.querySelector(".location").innerText.replace("Location: ", "");

        document.getElementById("jobType").value =
            card.querySelector(".type").innerText.replace("Type: ", "");

        document.getElementById("jobDesc").value =
            card.querySelector(".desc").innerText;

        document.getElementById("companyLogo").value =
            card.querySelector(".logo").src;

        editCard = card;
    });

    jobContainer.appendChild(card);
    form.reset();
});

const searchForm = document.getElementById("searchForm");
const searchTitle = document.getElementById("searchTitle");
const searchLocation = document.getElementById("searchLocation");
const searchType = document.getElementById("searchType");
const noResults = document.getElementById("noResults");

if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const titleValue = searchTitle.value.trim().toLowerCase();
        const locationValue = searchLocation.value.trim().toLowerCase();
        const typeValue = searchType.value.trim().toLowerCase();

        const jobs = document.querySelectorAll(".job-card");

        let visibleCount = 0;

        jobs.forEach(function (job) {
            const titleText = job.querySelector(".title").innerText.toLowerCase();
            const locationText = job.querySelector(".location").innerText.toLowerCase();
            const typeText = job.querySelector(".type").innerText.toLowerCase();

            const matchTitle = titleText.includes(titleValue);
            const matchLocation = locationText.includes(locationValue);
            const matchType =
                typeValue === "" ||
                typeValue === "job type" ||
                typeText.includes(typeValue);

            if (matchTitle && matchLocation && matchType) {
                job.style.display = "block";
                visibleCount++;
            } else {
                job.style.display = "none";
            }
        });

        if (visibleCount === 0 && noResults) {
            noResults.style.display = "block";
            jobs.forEach(job => (job.style.display = "block"));
        } else if (noResults) {
            noResults.style.display = "none";
        }
    });
}
