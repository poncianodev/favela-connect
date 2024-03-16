// MOBILE MENU

const header = document.querySelector("header");
const hamburgerBtn = document.querySelector("#hamburger-btn");
const closeMenuBtn = document.querySelector("#close-menu-btn");

hamburgerBtn.addEventListener("click", () =>
    header.classList.toggle("show-mobile-menu"),
);

closeMenuBtn.addEventListener("click", () => hamburgerBtn.click());

// EFEITO NAV BAR AO ROLAR A PÁGINA

window.onload = function () {
    window.addEventListener("scroll", e => {
        if (window.pageYOffset > 80) {
            document.querySelector("header").classList.add("header-scroll");
            document.querySelector(".logo").classList.add("logo-scroll");
            document.querySelector(".logo").style.padding = "0";
        } else {
            document.querySelector("header").classList.remove("header-scroll");
            document.querySelector(".logo").classList.remove("logo-scroll");
            document.querySelector(".logo").style.padding = "2rem 0 0 0";
        }
    });
};

// LOGOS CARROUSEL

let copy = document.querySelector(".logos-slide").cloneNode(true);
document.querySelector(".logos").appendChild(copy);

//LOGIN

const showHiddenPass = (loginPass, loginEye) => {
    const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye);

    iconEye.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";

            iconEye.classList.add("ri-eye-line");
            iconEye.classList.remove("ri-eye-off-line");
        } else {
            input.type = "password";

            iconEye.classList.remove("ri-eye-line");
            iconEye.classList.add("ri-eye-off-line");
        }
    });
};

showHiddenPass("login-pass", "login-eye");
