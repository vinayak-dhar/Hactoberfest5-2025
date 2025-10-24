//function gets fired when the entire html content is loaded
document.addEventListener("DOMContentLoaded", function () {
    const readmePath = "readmeproblems.md";
    const problemList = document.getElementById("problem-list");
    const searchInput = document.getElementById("search");

    //fetching readme content from file stored locally
    async function fetchReadme() {
        try {
            const response = await fetch(readmePath); 
            const text = await response.text(); // converts response to text
            const problems = parseReadme(text);
            displayProblems(problems);
        } catch (error) {
            console.error("Error fetching README:", error);
        }
    }

    // function to extract details from readme
    function parseReadme(readmeText) {
        const problems = [];
        const regex = /\|\s*(\d+)\s*\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*(.*?)\s*\|/g; //regular expression used to extract details

        //creating booleans to distribute problems into categories
        let isLeetCodeShell = false;
        let isLintCode = false;

        const lines = readmeText.split("\n"); // readme text split into individual lines
        lines.forEach(line => {
            if (line.includes("### LeetCode Shell")) {
                isLeetCodeShell = true;
                isLintCode = false;
            } else if (line.includes("### LintCode")) {
                isLeetCodeShell = false;
                isLintCode = true;
            } else if (line.includes("###")) {
                isLeetCodeShell = false;
                isLintCode = false;
            }

            let match;
            while ((match = regex.exec(line)) !== null) {
                const number = match[1];
                const title = match[2];
                const problemUrl = match[3];
                const solutionText = match[4];

                const solutions = {};
                const solutionRegex = /\[([^\]]+)\]\(([^)]+)\)/g; // used to extract solution paths
                let solMatch;
                while ((solMatch = solutionRegex.exec(solutionText)) !== null) {
                    solutions[solMatch[1].trim()] = solMatch[2].trim();
                }

                problems.push({ number, title, problemUrl, solutions, isLeetCodeShell, isLintCode });
            }
        });

        return problems;
    }
    // function to display problems on webpage
    function displayProblems(problems) {
        problemList.innerHTML = "";

    //Grouping problems into different categories
        const groupedProblems = {
            "LeetCode": [],
            "LeetCode Shell": [],
            "LintCode": [],
        };

        problems.forEach(problem => {
            if (problem.isLeetCodeShell) {
                groupedProblems["LeetCode Shell"].push(problem);
            } else if (problem.isLintCode) {
                groupedProblems["LintCode"].push(problem);
            } else {
                groupedProblems["LeetCode"].push(problem);
            }
        });

        //Sorting each group by problem number using in-built sort() function
        for (const key in groupedProblems) {
            groupedProblems[key].sort((a, b) => parseInt(a.number) - parseInt(b.number));
        }

        //Function to add problems to the list
        function addProblemsToList(problems, title) {
            if (problems.length === 0) return;

            const header = document.createElement("h3");
            header.textContent = title;
            problemList.appendChild(header);

            problems.forEach(problem => {
                const listItem = document.createElement("li");

                const link = document.createElement("a");
                link.href = problem.problemUrl;
                link.textContent = `${problem.number}. ${problem.title}`;
                link.target = "_blank";

                const languageSelector = document.createElement("select");
                let hasSolutions = Object.keys(problem.solutions).length > 0;

                if (hasSolutions) {
                    for (const [lang, path] of Object.entries(problem.solutions)) {
                        const option = document.createElement("option");
                        option.value = path;
                        option.textContent = lang;
                        languageSelector.appendChild(option);
                    }
                    languageSelector.disabled = false;
                } else {
                    const option = document.createElement("option");
                    option.textContent = "No solutions";
                    option.disabled = true;
                    languageSelector.appendChild(option);
                    languageSelector.disabled = true;
                }

                const viewButton = document.createElement("button");
                viewButton.textContent = "View Solution";
                viewButton.onclick = () => {
                    const selectedFile = languageSelector.value;
                    if (selectedFile) {
                        fetchSolution(problem.title, selectedFile);
                    } else {
                        showSolution(problem.title, "No solution available", "");
                    }
                };

                listItem.append(link, languageSelector, viewButton);
                problemList.appendChild(listItem);
            });
        }

        //Displaying grouped problems
        addProblemsToList(groupedProblems["LeetCode"], "LeetCode Problems");
        addProblemsToList(groupedProblems["LeetCode Shell"], "LeetCode Shell Problems");
        addProblemsToList(groupedProblems["LintCode"], "LintCode Problems");
    }


    //fetching and displaying solutions
    async function fetchSolution(title, selectedLang) {
        if (!selectedLang) {
            showSolution(title, "No solution available", "");
            return;
        }

        const baseUrl = "https://raw.githubusercontent.com/haoel/leetcode/master/";
        const fixedPath = selectedLang.replace(/^\.\//, ""); // Remove leading './' if present
        const fullUrl = baseUrl + fixedPath;

        console.log("Fetching:", fullUrl);

        try {
            const response = await fetch(fullUrl);
            if (!response.ok) throw new Error("Solution file not found");

            const code = await response.text();
            showSolution(title, code, selectedLang);
        } catch (error) {
            showSolution(title, "Solution not found", selectedLang);
        }
    }
    //displaying solutions in dialog box on webpage
    function showSolution(title, code, lang) {
        let modal = document.getElementById("solution-modal");
        if (!modal) {
            modal = document.createElement("div");
            modal.id = "solution-modal";
            document.body.appendChild(modal);
        }

        modal.innerHTML = `<h2>${title}</h2>
                           <button onclick="document.getElementById('solution-modal').style.display='none'">Close</button>
                           <pre><code class="language-${lang.toLowerCase() === "c++" ? "cpp" : lang.toLowerCase()}">${code}</code></pre>`;
        modal.style.display = "block";
       
    }

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll("#problem-list li").forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(query) ? "block" : "none";
        });
    });

    fetchReadme();
});
