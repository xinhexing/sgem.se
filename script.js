
document.addEventListener('DOMContentLoaded', function() {
    
    function loadJSON(url, callback) {
        fetch(url)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error loading JSON:', error));
    }

    // Gallery
    
    function addImages(data) {
        const divGalleryCarousel = document.getElementById('gallery-carousel');

        data.forEach(function(item) {
            const divImg = document.createElement('div');
            divImg.className = 'carousel-cell';
            const img = document.createElement('img');
            img.src = 'images/' + item.img;
            divImg.appendChild(img);
            if (item.text) {
                img.alt = item.text;
                const caption = document.createElement('p');
                caption.className = 'caption';
                caption.textContent = item.text;
                divImg.appendChild(caption);
            }
            divGalleryCarousel.appendChild(divImg);
        });

        new Flickity(divGalleryCarousel, {
            wrapAround: true,
            autoPlay: true,
        });
    }
    loadJSON('images/gallery.json', addImages);

    // Member cards

    function addMemberCards(data) {
        const divMemberCards = document.getElementById('member-cards');

        data.forEach(function(memberDict) {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            divMemberCards.appendChild(memberCard);

            // Name
            const name = document.createElement('h2')
            name.id = 'name';
            name.textContent = memberDict.name;
            
            // Role
            const role = document.createElement('p');
            role.id = 'role';
            role.textContent = memberDict.role || 'Board member';

            // Image
            const img = document.createElement('img')
            img.id = 'img';
            img.src = memberDict.img || 'images/igem_official_black_full.png';
            img.alt = memberDict.name;
            
            // Bio
            let bio = null;
            if (memberDict.bio) {
                bio = document.createElement('p');
                bio.id = 'bio';
                bio.textContent = memberDict.bio;
            }
            
            // LinkedIn
            let link = null;
            if (memberDict.linkedin) {
                link = document.createElement('a');
                link.id = 'linkedin';
                link.href = memberDict.linkedin;
                link.target = '_blank';
                const button = document.createElement('button');
                button.innerHTML = '<i class="fa-brands fa-linkedin"></i> LinkedIn';
                link.appendChild(button);
            }

            if (bio) {
                const topDiv = document.createElement('div');
                topDiv.classList.add('top');
                memberCard.appendChild(topDiv);
                topDiv.appendChild(name);
                topDiv.appendChild(role);
                memberCard.classList.add('full'); // Full width if no bio
                const leftDiv = document.createElement('div');
                leftDiv.classList.add('left');
                memberCard.appendChild(leftDiv);
                leftDiv.appendChild(img);
                if (link) {leftDiv.appendChild(link);}
                const rightDiv = document.createElement('div');
                rightDiv.classList.add('right');
                memberCard.appendChild(rightDiv);
                rightDiv.appendChild(bio);
            } else {
                memberCard.classList.add('compact');
                memberCard.appendChild(name);
                memberCard.appendChild(role);
                memberCard.appendChild(img);
                if (link) {memberCard.appendChild(link);}
            }
        }); 
    }
    loadJSON('members.json', addMemberCards);
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