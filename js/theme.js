let darkLight = document.getElementById("toggle-mode");

function saveThemeToLocalStorage(theme) {
    localStorage.setItem("theme", theme);
}

function loadThemeFromLocalStorage() {
    return localStorage.getItem("theme");
}

darkLight.addEventListener("click", () => {
    let element = document.body;
    element.dataset.bsTheme = element.dataset.bsTheme == "light" ? "dark" : "light";
    saveThemeToLocalStorage(element.dataset.bsTheme);
});

// Verificar el tema en el localStorage y aplicarlo solo si existe al cargar la página.
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = loadThemeFromLocalStorage();
    if (savedTheme) {
        let element = document.body;
        element.dataset.bsTheme = savedTheme;
    }
});
