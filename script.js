// Reload reset page position

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});


// Section scroll

function vh(percent) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const sectionLinks = document.querySelectorAll('.section-link');
    const topMargin = vh(0);
    function highlightSectionLink() {
        let fromTop = window.scrollY + topMargin;
        sections.forEach(section => {
            if (section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop) {
                sectionLinks.forEach(link => {
                    link.classList.remove('section-highlight');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('section-highlight');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', highlightSectionLink);
});


// Dropdown menu functionality

// Deselect all checkboxes when document loads
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {checkbox.checked = false;});
});

// Resize all dropdown menus when window size changes
window.addEventListener('resize', function () {
    const toggles = document.querySelectorAll('.dropdown-toggle');
    toggles.forEach(toggle => resizeMenu(findDropdownMenu(toggle), toggle.checked))
});

// Connect toggles to dropdown menu signals
document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.dropdown-toggle');
    toggles.forEach(function(toggle) {
        toggle.addEventListener('change', function () {        
            const menu = findDropdownMenu(toggle)
            resizeMenu(menu, toggle.checked)
        });
    });
});

function resizeMenu(menu, value) {
    var height = menu.scrollHeight;
    var duration = calculateTransitionDuration(height);
    menu.style.transition = `max-height ${duration}s`;
    if (value)  {menu.style.maxHeight = height + 'px';}
    else        {menu.style.maxHeight = 0;}
}

function findDropdownMenu(element) {
    let sibling = element.nextElementSibling;
    while (sibling) {
        if (sibling.classList.contains('dropdown-menu')) {return sibling;}
        sibling = sibling.nextElementSibling;
    }
    return null;
}

function calculateTransitionDuration(height) {
    const baseDuration = 0.2;
    const factor = 0.0005;
    return baseDuration + (height * factor);
}


// Close top navigation menu when user clicks elsewhere

document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById("nav-top-menu");
    const checkbox = document.getElementById("nav-top-checkbox");
    document.addEventListener('click', function(event){ 
        if (menu.offsetHeight && !menu.contains(event.target)){
            checkbox.checked = false;
            resizeMenu(menu, false);
        }
    });
});