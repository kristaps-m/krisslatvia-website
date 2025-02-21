fetch('/navbar/nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem,oldelem);

    // Mobile Menu Toggle
    document.querySelector(".menu-toggle").addEventListener("click", function() {
        document.querySelector(".menu").classList.toggle("active");
    });

    // Dropdown Toggle for Mobile
    document.querySelectorAll(".dropdown .dropbtn").forEach(button => {
        button.addEventListener("click", function() {
        this.parentElement.classList.toggle("active");
        });
    });
});
