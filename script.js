document.addEventListener("DOMContentLoaded", function () {
    const creditSelectors = [
        document.getElementById("4credit"),
        document.getElementById("3credit"),
        document.getElementById("2credit"),
    ];
    const yearSelector = document.getElementById("year");
    const loadButton = document.querySelector(".load button");
    const clearButton = document.querySelector(".clear button");
    const middleDiv = document.querySelector(".middle");
    const bottomDiv = document.querySelector(".bottom");

    function generateCourseList() {
        middleDiv.innerHTML = "";
        bottomDiv.innerHTML = "";
        middleDiv.style.borderBottom = "none";

        let totalCourses = creditSelectors.reduce((sum, selector) => sum + parseInt(selector.value), 0);
        if (totalCourses === 0) {
            alert("Please select at least one course before loading.");
            return;
        }

        const header = document.createElement("ul");
        header.classList.add("fade-in");
        header.innerHTML = `
            <li>Code</li>
            <li>Credit</li>
            <li>Result</li>
        `;
        middleDiv.appendChild(header);

        let courseCode = (parseInt(yearSelector.value) * 100) + 1;
        let courseElements = [];

        creditSelectors.forEach((selector, index) => {
            const courseCount = parseInt(selector.value);
            if (courseCount > 0) {
                const creditValue = index === 0 ? 4 : index === 1 ? 3 : 2;
                for (let i = 0; i < courseCount; i++) {
                    const courseRow = document.createElement("ul");
                    courseRow.classList.add("hidden");
                    courseRow.innerHTML = `
                        <li>${courseCode}</li>
                        <li>${creditValue}</li>
                        <li>
                            <select name="point">
                                <option value="4.00">4.00 (A+)</option>
                                <option value="3.75">3.75 (A)</option>
                                <option value="3.50">3.50 (A-)</option>
                                <option value="3.25">3.25 (B+)</option>
                                <option value="3.00">3.00 (B)</option>
                                <option value="2.75">2.75 (B-)</option>
                                <option value="2.50">2.50 (C+)</option>
                                <option value="2.25">2.25 (C)</option>
                                <option value="2.00">2.00 (D)</option>
                                <option value="0.00">0.00 (F)</option>
                            </select>
                        </li>
                    `;
                    middleDiv.appendChild(courseRow);
                    courseElements.push(courseRow);
                    courseCode++;
                }
            }
        });

        middleDiv.style.borderBottom = "2px solid var(--body-border)";

        courseElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.remove("hidden");
                element.classList.add("slide-in");
            }, index * 200);
        });

        setTimeout(() => {
            const calculateButton = document.createElement("button");
            calculateButton.textContent = "Calculate";
            calculateButton.classList.add("hidden");
            bottomDiv.appendChild(calculateButton);

            setTimeout(() => {
                calculateButton.classList.remove("hidden");
                calculateButton.classList.add("slide-in");
            }, 200);

            const resultDisplay = document.createElement("h1");
            resultDisplay.classList.add("gpa-result", "hidden");
            bottomDiv.appendChild(resultDisplay);

            calculateButton.addEventListener("click", function () {
                let totalWeightedPoints = 0;
                let totalCredits = 0;
                let isValid = true;

                document.querySelectorAll(".middle ul:not(:first-child)").forEach(row => {
                    const credit = parseFloat(row.children[1].textContent);
                    const result = parseFloat(row.children[2].querySelector("select").value);

                    if (isNaN(credit) || isNaN(result)) {
                        isValid = false;
                    } else {
                        totalWeightedPoints += credit * result;
                        totalCredits += credit;
                    }
                });

                if (!isValid) {
                    alert("Invalid input detected. Please enter only numbers.");
                    return;
                }

                if (totalCredits > 0) {
                    resultDisplay.textContent = `Your GPA is: ${(totalWeightedPoints / totalCredits).toFixed(2)}`;
                    resultDisplay.classList.remove("hidden");
                    resultDisplay.classList.add("grow-shrink");
                } else {
                    resultDisplay.textContent = "No courses selected for calculation.";
                }
            });
        }, courseElements.length * 200 + 500);
    }

    loadButton.addEventListener("click", generateCourseList);

    clearButton.addEventListener("click", function () {
        const elements = document.querySelectorAll(".middle ul, .bottom button, .bottom h1");
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add("slide-out");
            }, index * 200);
        });

        setTimeout(() => {
            middleDiv.innerHTML = "";
            bottomDiv.innerHTML = "";
            middleDiv.style.borderBottom = "none";
            creditSelectors.forEach(selector => selector.value = "0");
            yearSelector.value = "1";
        }, elements.length * 200 + 500);
    });
});
