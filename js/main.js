function updateLogoWrapping() {
    const logoTextPane = document.getElementById("logo-text-pane");
    const logoNamePane = document.getElementById("logo-name-pane");
    const logoPane = document.getElementById("logo-pane");

    const logoPicBottomY = document.getElementById("logo-pic").getBoundingClientRect().bottom;
    const logoTextTopY = logoTextPane.getBoundingClientRect().top;

    // if this passes, we know it wrapped, otherwise it didn't.
    if (logoPicBottomY <= logoTextTopY) {
        logoTextPane.style.alignItems = "center";
        logoPane.style.justifyContent = "center";
        logoNamePane.style.justifyContent = "center";
    } else {
        logoTextPane.style.alignItems = "start";
        logoPane.style.justifyContent = "start";
        logoNamePane.style.justifyContent = "start";
    }
}

window.addEventListener("load", updateLogoWrapping);
window.addEventListener("resize", updateLogoWrapping);
