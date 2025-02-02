document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".toggleBtn");
    const root = document.documentElement;
    const navLinks = document.querySelectorAll(".navBar ul li a");

    function setTheme(theme) {
        if (theme === "dark") {
            root.style.setProperty("--bg-primary", "#1E1E1E");
            root.style.setProperty("--nav-bg", "#585858");
            root.style.setProperty("--nav-text", "#b4b4b4");
            root.style.setProperty("--nav-border", "#868686");
            root.style.setProperty("--body-text", "#b4b4b4");
            root.style.setProperty("--body-border", "#585858");
            toggleBtn.textContent = "Activate Light Theme";
            localStorage.setItem("theme", "dark");
        } else {
            root.style.setProperty("--bg-primary", "#FDFBF6");
            root.style.setProperty("--nav-bg", "#D4B996");
            root.style.setProperty("--nav-text", "#282828");
            root.style.setProperty("--nav-border", "#FDFBF6");
            root.style.setProperty("--body-text", "#282828");
            root.style.setProperty("--body-border", "#D4B996");
            toggleBtn.textContent = "Activate Dark Theme";
            localStorage.setItem("theme", "light");
        }
    }

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    toggleBtn.addEventListener("click", function () {
        const currentTheme = localStorage.getItem("theme");
        setTheme(currentTheme === "dark" ? "light" : "dark");
    });
});
