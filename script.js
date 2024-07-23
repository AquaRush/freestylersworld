// ==UserScript==
// @name         FreestylersWorld V8 Script
// @namespace    FreestylersWorld
// @version      v1.0.2
// @description  Additional forum functionalities.
// @author       GeorgeGFX
// @match        https://freestylersworld.com/*
// @icon         https://freestylersworld.com/favicon.ico
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/AquaRush/freestylersworld/main/script.js
// @updateURL    https://raw.githubusercontent.com/AquaRush/freestylersworld/main/script.js
// ==/UserScript==

(function() {
    'use strict';


    // Remove inline styling rule for signature height
    var signatureContainers = document.querySelectorAll('.signaturecontainer');

    signatureContainers.forEach(function(container) {
        container.style.removeProperty('max-height');
        var image = container.querySelector('img');
        image.style.width = 'fit-content';
    });


    // Function to get the current user ID from the HTML structure for redirection on user click
    function getCurrentUserId() {
        const userLink = document.querySelector('#toplinks > div > span > a');
        if (userLink) {
            // Extract the href value
            const hrefValue = userLink.href;
            // Use a regular expression to extract the user ID (everything before the hyphen)
            const match = hrefValue.match(/member\.php\?(\d+)-/);
            if (match && match[1]) {
                return match[1]; // Return the user ID
            }
        }
        return null; // Return null if the user link is not found
    }

    // Function to handle image zoom
    function zoomImage(event) {
        const img = event.target;
        const container = img.parentElement;

        // Zoom in on mouse enter
        container.classList.add('zoomed');
        img.style.transform = 'scale(1.2)';
        img.style.transition = 'transform 0.3s ease';
    }

    // Function to reset zoom on mouse leave
    function resetZoom(event) {
        const img = event.target;
        const container = img.parentElement;

        container.classList.remove('zoomed');
        img.style.transform = 'scale(1)';
        img.style.transition = 'transform 0.3s ease';
    }

    // Function to handle image click for redirection
    function handleImageClick(event) {
        const img = event.target;

        // Check if the image src matches the custom avatar
        if (img.src.includes('customavatars')) {
            const currentUserId = getCurrentUserId(); // Get the current user ID dynamically
            if (currentUserId) {
                // Redirect to the user's page with the correct URL format
                window.location.href = 'https://freestylersworld.com/member.php?' + currentUserId;
            } else {
                console.error('User ID not found.');
            }
        }
    }

    // Add event listeners to all images on the page
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('mouseenter', zoomImage); // Zoom in on hover
        img.addEventListener('mouseleave', resetZoom); // Reset zoom on leave
        img.addEventListener('click', handleImageClick); // Add click event for redirection
    });

    // User hover fade effect
    const usernames = document.querySelectorAll('a[href*="member.php"]:not(:has(img)):not(button)');
    usernames.forEach(username => {
        if (username.tagName.toLowerCase() !== 'button') {
            username.addEventListener('mouseenter', () => {
                username.style.opacity = '0.7';
                username.style.transition = 'opacity 0.3s ease';
            });
            username.addEventListener('mouseleave', () => {
                username.style.opacity = '1';
                username.style.transition = 'opacity 0.3s ease';
            });
        }
    });

    // Chatbox greeting message
    window.addEventListener('load', function() {
        const chatbox = document.getElementById('zchat');
        const message = document.createElement('div');
        message.textContent = 'Hello there Freestyler!👋 Hope you have an awesome day, enjoy your stay! 😊';
        message.style.fontSize = '14px';
        message.style.padding ='6px';
        message.style.textShadow = '2px 2px 0 #0000006b';
        message.style.color = '#9aceffeb';
        message.style.fontWeight = 'bold';
        message.style.opacity = '0'; // Set initial opacity to 0 for fade-in effect
        chatbox.appendChild(message);

        // Fade-in effect
        setTimeout(() => {
            message.style.opacity = '1';
            message.style.transition = 'opacity 0.5s ease-in-out';
        }, 500); // Delay the fade-in effect by 500ms

        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.5s ease-in-out';
            setTimeout(() => {
                chatbox.removeChild(message);
            }, 500);
        }, 7000)
    });

    // ZChat system message timeout
    window.addEventListener('load', function() {
        setTimeout(function() {
            sendWelcomeMessage();
        }, 7000);
    });

    // ZChat system message
    function sendWelcomeMessage() {
        const welcomeMessage = 'Welcome to the chat, if you need any type of support, please refer to <a href="https://freestylersworld.com/showthread.php?75134" target="_blank">this link</a>.';
        const discordMessage = 'For additional support, please join our <a href="https://freestylersworld.com/showthread.php?75134" target="_blank">discord server</a> and create a support ticket.';
        const isExeVirus = '<span style="color:#ff0021eb;">Please keep in mind that FGunZ has no viruses in the gunz.exe, if your anti-virus warns you of one, it is a false positive.</span>';

        const welcomeRow1 = document.createElement('tr');
        welcomeRow1.innerHTML = `<td></td><td class="timestamp">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: undefined, hour12: true }).replace(' ', '')}</td><td>&lt;<span style="color:#cf9affeb; font-weight: bold">ZChat</span>&gt;</td><td class="chat" style="color:#cf9affeb;">${welcomeMessage}</td>`;
        document.querySelector('#zchat tbody').appendChild(welcomeRow1);

        const welcomeRow2 = document.createElement('tr');
        welcomeRow2.innerHTML = `<td></td><td class="timestamp">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: undefined, hour12: true }).replace(' ', '')}</td><td>&lt;<span style="color:#cf9affeb; font-weight: bold">ZChat</span>&gt;</td><td class="chat" style="color:#cf9affeb;">${discordMessage}</td>`;
        document.querySelector('#zchat tbody').appendChild(welcomeRow2);

        const welcomeRow3 = document.createElement('tr');
        welcomeRow3.innerHTML = `<td></td><td class="timestamp">${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: undefined, hour12: true }).replace(' ', '')}</td><td>&lt;<span style="color:#ff0021eb; font-weight: bold">ZChat</span>&gt;</td><td class="chat">${isExeVirus}</td>`;
        document.querySelector('#zchat tbody').appendChild(welcomeRow3);


        // Add the fade-in effect using JavaScript
        welcomeRow1.style.opacity = '0';
        welcomeRow1.style.transition = 'opacity 1s ease-in-out';
        setTimeout(function() {
            welcomeRow1.style.opacity = '1';
        }, 100);

        welcomeRow2.style.opacity = '0';
        welcomeRow2.style.transition = 'opacity 1s ease-in-out';
        setTimeout(function() {
            welcomeRow2.style.opacity = '1';
        }, 200);

        welcomeRow3.style.opacity = '0';
        welcomeRow3.style.transition = 'opacity 1s ease-in-out';
        setTimeout(function() {
            welcomeRow3.style.opacity = '1';
        }, 300);

        // Scroll to the bottom of the chatbox
        const chatBox = document.querySelector('#zchat');
        chatBox.scrollTop = chatBox.scrollHeight;

    }

    // Ainsley Harriot
    const imageUrl = 'https://i.ibb.co/yPsm1Hs/u-https-www-seekpng-com-png-full-31-318869-pogchamp-png.png';

    // Function to display the image
    function displayImage() {
        // Create a new image element
        const img = document.createElement('img');
        img.src = imageUrl;
        img.style.position = 'fixed';
        img.style.zIndex = '9999';
        img.style.width = '200px'; // Adjust the size as needed
        img.style.height = 'auto';
        img.style.top = '50%';
        img.style.left = '50%';
        img.style.transform = 'translate(-50%, -50%)';

        // Append the image to the body
        document.body.appendChild(img);

        // Set a timeout to remove the image after 1 second
        setTimeout(() => {
            document.body.removeChild(img);
        }, 1000);
    }

    // Generate a random duration between 1-10 seconds
    const duration = Math.floor(Math.random() * (3000 - 60 + 1)) + 60;

    // Set a timeout to display the image after the random duration
    setTimeout(displayImage, duration * 1000);



    // For Threads Targeting
    document.querySelectorAll('a[href*="member.php"] > strong > span[style*="color:#666666;"]').forEach(span => {
        span.style.letterSpacing = '.02em';
        span.style.textShadow = '0 0 0.25em #ffffff72';
        span.style.webkitTextFillColor = 'transparent';
        span.style.webkitBackgroundClip = 'border-box,border-box,text';
        span.style.backgroundImage = 'url(https://media.nulled.to/public/assets/fire.gif),url(https://media.nulled.to/public/assets/bg1.gif),linear-gradient(125deg,rgba(170,119,28,1) 0%,rgba(255,242,138,1) 26%,rgba(246,194,35,1) 37%,rgba(255,215,120,1) 49%,rgba(238,187,29,1) 61%,rgba(170,119,28,1) 100%)';
        span.style.backgroundSize = '2em,3em,10em';
        span.style.animation = 'poseidon-anim 4s linear infinite';
    });

    // For Profile Targeting
    document.querySelectorAll('.member_username > [style*="color:#666666;"]').forEach(span => {
        span.style.letterSpacing = '.02em';
        span.style.textShadow = '0 0 0.25em #ffffff72';
        span.style.webkitTextFillColor = 'transparent';
        span.style.webkitBackgroundClip = 'border-box,border-box,text';
        span.style.backgroundImage = 'url(https://media.nulled.to/public/assets/fire.gif),url(https://media.nulled.to/public/assets/bg1.gif),linear-gradient(125deg,rgba(170,119,28,1) 0%,rgba(255,242,138,1) 26%,rgba(246,194,35,1) 37%,rgba(255,215,120,1) 49%,rgba(238,187,29,1) 61%,rgba(170,119,28,1) 100%)';
        span.style.backgroundSize = '2em,3em,10em';
        span.style.animation = 'poseidon-anim 2s linear infinite';
    });

    // By Title For Posts Targeting
    document.querySelectorAll('a[title*="Posted By"] > span[style*="color:#666666;"]').forEach(span => {
        span.style.letterSpacing = '.02em';
        span.style.textShadow = '0 0 0.25em #ffffff72';
        span.style.webkitTextFillColor = 'transparent';
        span.style.webkitBackgroundClip = 'border-box,border-box,text';
        span.style.backgroundImage = 'url(https://media.nulled.to/public/assets/fire.gif),url(https://media.nulled.to/public/assets/bg1.gif),linear-gradient(125deg,rgba(170,119,28,1) 0%,rgba(255,242,138,1) 26%,rgba(246,194,35,1) 37%,rgba(255,215,120,1) 49%,rgba(238,187,29,1) 61%,rgba(170,119,28,1) 100%)';
        span.style.backgroundSize = '2em,3em,10em';
        span.style.animation = 'poseidon-anim 2s linear infinite';
    });

    // Online Members Targeting
    document.querySelectorAll('a[href*="member.php"] > span[style*="color:#666666;"]').forEach(span => {
        span.style.letterSpacing = '.02em';
        span.style.textShadow = '0 0 0.25em #ffffff72';
        span.style.background = 'transparent';
        span.style.webkitBackgroundClip = 'text';
        span.style.webkitTextFillColor = 'transparent';
        span.style.backgroundImage = 'linear-gradient(125deg,rgba(170,119,28,1) 0%,rgba(255,242,138,1) 26%,rgba(246,194,35,1) 37%,rgba(255,215,120,1) 49%,rgba(238,187,29,1) 61%,rgba(170,119,28,1) 100%)';
        span.style.backgroundSize = '2em,3em,10em';
        span.style.animation = 'poseidon-anim 2s linear infinite';
    });

    // On Thanked Posts
    document.querySelectorAll('a[href*="member.php?u="] > span[style*="color:#666666;"]').forEach(span => {
        span.style.letterSpacing = '.02em';
        span.style.textShadow = '0 0 0.25em #ffffff72';
        span.style.webkitTextFillColor = 'transparent';
        span.style.webkitBackgroundClip = 'border-box,border-box,text';
        span.style.backgroundImage = 'url(https://media.nulled.to/public/assets/fire.gif),url(https://media.nulled.to/public/assets/bg1.gif),linear-gradient(125deg,rgba(170,119,28,1) 0%,rgba(255,242,138,1) 26%,rgba(246,194,35,1) 37%,rgba(255,215,120,1) 49%,rgba(238,187,29,1) 61%,rgba(170,119,28,1) 100%)';
        span.style.backgroundSize = '2em,3em,10em';
        span.style.animation = 'poseidon-anim 2s linear infinite';
    });

    // Targeting all elements inside #zchat
    document.querySelectorAll('#zchat *').forEach(element => {
        if (element.tagName === 'SPAN') {
            const computedStyle = window.getComputedStyle(element);
            if (computedStyle.color === 'rgb(102, 102, 102)') { // Corresponds to #666666
                element.style.letterSpacing = '.02em';
                element.style.textShadow = '0 0 0.25em #ffffff72';
                element.style.webkitTextFillColor = 'transparent';
                element.style.webkitBackgroundClip = 'border-box,border-box,text';
                element.style.backgroundImage = 'url(https://media.nulled.to/public/assets/fire.gif),url(https://media.nulled.to/public/assets/bg1.gif),linear-gradient(125deg,rgba(170,119,28,1) 0%,rgba(255,242,138,1) 26%,rgba(246,194,35,1) 37%,rgba(255,215,120,1) 49%,rgba(238,187,29,1) 61%,rgba(170,119,28,1) 100%)';
                element.style.backgroundSize = '2em,3em,10em';
                element.style.animation = 'poseidon-anim 2s linear infinite';
            }
        }
    });

    // Targeting td > span with specific color
    document.querySelectorAll('td > span[style*="color:#666666;"]').forEach(span => {
        span.style.fontSize = '1.090em';
        span.style.position = 'relative';
        span.style.color = 'rgba(238,187,29,1)!important';
        span.style.textShadow = '2px 0px 6px rgba(238,187,29,1)';
    });

    // Show the full title of new threads instead of truncating them
    window.addEventListener('load', function() {
        // Select all <tr> elements that contain the thread details
        const threadRows = document.querySelectorAll('tr[valign="top"]');

        threadRows.forEach(row => {
            // Find the <td> elements within the <tr>
            const tdElements = row.querySelectorAll('td');

            // Assuming the thread title <td> is the second one
            const threadTitleTd = tdElements[1];

            // Find the <a> tag within the thread title <td>
            const threadLink = threadTitleTd.querySelector('a');

            if (threadLink) {
                // Get the full title from the <td>'s title attribute
                const fullTitle = threadTitleTd.title;

                // Set the text content of the <a> tag to the full title
                threadLink.textContent = fullTitle;

                // Optionally, set the title attribute to the full title for accessibility
                threadLink.setAttribute('title', fullTitle);
            }

            // Find the "Posted By" <td>
            const postedByTd = tdElements[2];

            // Find the "Date/Time" <td>
            const dateTimeTd = tdElements[3];

            // No changes needed for "Posted By" and "Date/Time" elements
        });
    });


})();
