const jobs = [
    { title: "Software Engineer", skills: ["python", "javascript"], company: "Google", link: "https://careers.google.com" },
    { title: "Web Developer", skills: ["html", "css", "javascript"], company: "Amazon", link: "https://amazon.jobs" },
    { title: "Backend Developer", skills: ["java", "spring"], company: "Microsoft", link: "https://careers.microsoft.com" },
    { title: "Frontend Developer", skills: ["react", "javascript"], company: "Facebook", link: "https://www.metacareers.com" },
    { title: "Data Scientist", skills: ["python", "ml"], company: "Netflix", link: "https://jobs.netflix.com" },
    { title: "C++ Developer", skills: ["c++", "algorithms"], company: "Bloomberg", link: "https://bloomberg.com/careers" },
    { title: "AWS Engineer", skills: ["aws", "cloud"], company: "IBM", link: "https://ibm.com/jobs" }
];
document.getElementById("search-btn").addEventListener("click", () => {
    const name = document.getElementById("username").value.trim();
    const skill = document.getElementById("skills").value.trim().toLowerCase();

    const jobResults = document.getElementById("job-results");
    const jobDetails = document.getElementById("job-details");
    jobDetails.style.display = "none";

    if (!name || !skill) {
        jobResults.innerHTML = `<p>Please enter both name and skill to search for jobs.</p>`;
        jobResults.style.display = "block";
        return;
    }

    const filteredJobs = jobs.filter(job => 
        job.skills.some(s => s.toLowerCase().includes(skill))
    );

    if (filteredJobs.length === 0) {
        jobResults.innerHTML = `<p>Hi ${name}, no jobs found for "${skill}".</p>`;
        jobResults.style.display = "block";
        return;
    }

    filteredJobs.sort((a, b) => {
        const relevanceA = a.skills.filter(s => skill.includes(s)).length / a.skills.length;
        const relevanceB = b.skills.filter(s => skill.includes(s)).length / b.skills.length;
        return relevanceB - relevanceA;
    });

    jobResults.innerHTML = `<p>Hi ${name}, here are jobs matching "${skill}":</p>`;
    jobResults.style.display = "block";

    filteredJobs.forEach((job, index) => {
        const matchingSkills = job.skills.filter(s => skill.includes(s));
        const matchPercentage = (matchingSkills.length / job.skills.length) * 100;

        const jobElement = document.createElement("div");
        jobElement.className = "job show";
        if (matchPercentage >= 80) jobElement.classList.add("top-match");

        jobElement.innerHTML = `
            <strong>${job.title}</strong> at <em>${job.company}</em><br>
            <a href="#" data-index="${index}" class="view-job">View Job</a>
        `;
        jobResults.appendChild(jobElement);
    });

    document.querySelectorAll(".view-job").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const jobIndex = this.getAttribute("data-index");
            displayJobDetails(jobIndex);
        });
    });
});
function searchJobs() {
            const skill = document.getElementById("skills").value.trim().toLowerCase();
            const jobResults = document.getElementById("job-results");
            const jobDetails = document.getElementById("job-details");

            if (skill.length < 1) {
                jobResults.innerHTML = "";
                jobResults.style.display = "none";
                jobDetails.style.display = "none";
                return;
            }

            const filteredJobs = jobs.filter(job => job.skills.some(s => s.includes(skill)));

            if (filteredJobs.length === 0) {
                jobResults.innerHTML = "<p>No jobs found.</p>";
                jobResults.style.display = "block";
                return;
            }

            filteredJobs.sort((a, b) => {
                const relevanceA = a.skills.filter(s => skill.includes(s)).length / a.skills.length;
                const relevanceB = b.skills.filter(s => skill.includes(s)).length / b.skills.length;
                return relevanceB - relevanceA;
            });

            jobResults.innerHTML = "";
            jobResults.style.display = "block";

            filteredJobs.forEach((job, index) => {
                const matchingSkills = job.skills.filter(s => skill.includes(s));
                const matchPercentage = (matchingSkills.length / job.skills.length) * 100;

                const jobElement = document.createElement("div");
                jobElement.className = "job";
                if (matchPercentage >= 80) jobElement.classList.add("top-match");
                jobElement.classList.add("show");

                jobElement.innerHTML = `<strong>${job.title}</strong> at <em>${job.company}</em><br>
                    <a href="#" data-index="${index}" class="view-job">View Job</a>`;
                jobResults.appendChild(jobElement);
            });

            document.querySelectorAll(".view-job").forEach(link => {
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    const jobIndex = this.getAttribute("data-index");
                    displayJobDetails(jobIndex);
                });
            });
        }

        function displayJobDetails(index) {
            const job = jobs[index];
            const jobDetails = document.getElementById("job-details");
            jobDetails.style.display = "block";
            jobDetails.innerHTML = `
                <h3>${job.title}</h3>
                <p><strong>Company:</strong> ${job.company}</p>
                <p><strong>Required Skills:</strong> ${job.skills.join(", ")}</p>
                <button class="apply-here" onclick="window.open('${job.link}', '_blank')">Apply Here</button>
                `;

           
        }