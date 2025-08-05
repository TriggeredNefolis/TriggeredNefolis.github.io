// Fetch profile data from profile.json and update UI
function loadProfile() {
    fetch('profile.json')
        .then(response => {
            if (!response.ok) throw new Error("profile.json not found or invalid!");
            return response.json();
        })
        .then(data => {
            document.getElementById("site-desc").innerText = data.description || "Welcome!";
            document.getElementById("profile-pic").src = data.image || "default-profile.png";
        })
        .catch(err => {
            document.getElementById("site-desc").innerText = "Welcome!";
            document.getElementById("profile-pic").src = "default-profile.png";
            document.getElementById("profile-error").innerText = err.message;
        });
}
window.onload = loadProfile;
