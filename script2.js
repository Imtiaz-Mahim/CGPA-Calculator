document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.querySelector(".comCalc");
    const resetBtn = document.querySelector(".comReset");
    const inputFields = document.querySelectorAll("input");
    const resultContainer = document.createElement("h1");
    resultContainer.style.textAlign = "center";
    resultContainer.style.marginTop = "20px";
    resultContainer.style.opacity = "0";
    resultContainer.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
    document.querySelector(".bottom").appendChild(resultContainer);

    calculateBtn.addEventListener("click", function () {
        let totalWeightedGPA = 0;
        let totalCredits = 0;
        let allFieldsFilled = true;
        let validInputs = true;

        document.querySelectorAll(".middle ul").forEach((ul, index) => {
            if (index === 0) return; // Skip the header row
            
            const credits = ul.querySelector(".credits")?.value.trim();
            const gpa = ul.querySelector(".gpa")?.value.trim();
            const opt = ul.querySelector(".opt")?.value.trim();
            
            if ((credits === "" || gpa === "") && !ul.querySelector(".opt")) {
                allFieldsFilled = false;
            }

            if ((credits && isNaN(credits)) || (gpa && isNaN(gpa)) || (opt && isNaN(opt))) {
                validInputs = false;
            }

            const creditsVal = parseFloat(credits) || 0;
            const gpaVal = parseFloat(gpa) || 0;
            const optVal = parseFloat(opt) || 0;
            
            if (ul.querySelector(".opt")) {
                totalWeightedGPA += optVal;
            } else {
                totalWeightedGPA += (creditsVal) * gpaVal;
                totalCredits += creditsVal;
            }
        });
        
        if (!allFieldsFilled) {
            alert("Please fill in all required fields before calculating.");
            return;
        }
        
        if (!validInputs) {
            alert("Please enter only numeric values.");
            return;
        }

        const finalGPA = totalCredits > 0 ? (totalWeightedGPA / totalCredits).toFixed(2) : "0.00";
        resultContainer.textContent = `Cumulative GPA: ${finalGPA}`;
        resultContainer.style.opacity = "1";
        resultContainer.style.transform = "translateY(0px)";
    });

    resetBtn.addEventListener("click", function () {
        inputFields.forEach(input => {
            if (input.classList.contains("opt")) {
                input.value = "0.00";
            } else {
                input.value = "";
            }
        });
        
        resultContainer.style.opacity = "0";
        resultContainer.style.transform = "translateY(-20px)";
        setTimeout(() => {
            resultContainer.textContent = "";
        }, 500);
    });
});
