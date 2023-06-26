export const showPswrd = () => {
    var x = document.getElementById("password");
    var y = document.getElementById("password-eye-icon");
    if (x.type === "password") {
        x.type = "text";
        y.style.color = "#38ef7d";
    } else {
        x.type = "password";
        y.style.color = "#F5EEED";
    }
}