let menu = document.getElementById("menu");
let menuLinks = menu.getElementsByTagName("a");
for (const menuLink of menuLinks) {
  menuLink.onclick = function(e){ 
    // Override default behavior for smooth scroll
    event.preventDefault();
    document.querySelector(menuLink.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });

    // Hide menu in responsive mobile version
    menu.classList.remove("show");
  };
}

function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

document.getElementById("burger").onclick = function() { 
  menu.classList.toggle("show");
};

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
} 