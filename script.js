// Intersection Observer to show hidden elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Log the entry for debugging purposes
        console.log(entry);

        // If element is intersecting with the viewport, add 'show' class to reveal it
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Select all elements with class 'hidden' and observe them with Intersection Observer
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements with class 'bar' (assuming these are interactive bars or elements)
    const bars = document.querySelectorAll('.bar');

    // Add event listeners for mouseover, mousemove, and mouseout to create tooltips
    bars.forEach(bar => {
        bar.addEventListener('mouseover', (event) => {
            // Create tooltip element
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerText = event.target.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);

            // Position tooltip relative to the hovered bar
            const rect = event.target.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2)}px`;
            tooltip.style.top = `${rect.top + window.scrollY - 30}px`; // Adjust as needed
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.backgroundColor = '#333';
            tooltip.style.fontFamily = 'Arial';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '5px';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.fontSize = '14px';
            tooltip.style.zIndex = '1000';

            // Update tooltip position on mousemove to follow the cursor
            bar.addEventListener('mousemove', (event) => {
                tooltip.style.left = `${event.pageX}px`;
                tooltip.style.top = `${event.pageY - 30}px`; // Adjust as needed
            });

            // Remove tooltip from DOM on mouseout
            bar.addEventListener('mouseout', () => {
                document.body.removeChild(tooltip);
            });
        });
    });
});

// Function to format mailto link with contact form data
function formatMailto(form) {
    const name = form['Contact-Name'].value;
    const subject = form['Contact-Email'].value;
    const message = form['Contact-Message'].value;

    // Create email body with contact form data
    const emailBody = `From ${name},\n\n${message}`;
    
    // Set form action to mailto link with encoded subject and body
    form.action = `mailto:ulysse_rules@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
}


document.querySelectorAll('nav a, .nav-bar-container a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();  // Empêche le comportement par défaut du lien
        const targetID = this.getAttribute('href').substring(1);  // Récupère l'ID de l'élément cible
        const targetElement = document.getElementById(targetID);  // Trouve l'élément cible dans le DOM
        
        if (targetElement) {
            // Si l'élément cible existe, scrolle vers cet élément de manière fluide
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        } else {
            console.warn(`Element with ID ${targetID} not found.`);  // Affiche un avertissement si l'élément cible n'existe pas
        }
    });
});
