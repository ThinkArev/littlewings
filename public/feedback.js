// Rating emoji functionality
const ratingContainers = document.querySelectorAll('.emoji-rating');
const ratings = {};

ratingContainers.forEach(container => {
const emojis = container.querySelectorAll('.emoji-option');
    const ratingType = container.getAttribute('data-rating');

    // Add error message element
    const errorMsg = document.createElement('div');
    errorMsg.className = 'rating-error';
    errorMsg.textContent = 'This field is required';
    container.parentElement.appendChild(errorMsg);

    emojis.forEach((emoji, index) => {
        emoji.addEventListener('click', () => {
            const value = parseInt(emoji.getAttribute('data-value'));
            ratings[ratingType] = value;

            // Hide error message
            const errorElement = container.parentElement.querySelector('.rating-error');
            if (errorElement) {
                errorElement.style.display = 'none';
            }

            // Update emoji display
            emojis.forEach((e, i) => {
                if (i < value) {
                    e.classList.add('active');
                } else {
                    e.classList.remove('active');
                }
            });

            updateProgress();
        });

        emoji.addEventListener('mouseover', () => {
            const value = parseInt(emoji.getAttribute('data-value'));
            emojis.forEach((e, i) => {
                if (i < value) {
                    e.style.opacity = '1';
                    e.style.transform = 'scale(1.2)';
                } else {
                    e.style.opacity = '0.4';
                    e.style.transform = 'scale(1)';
                }
            });
        });
    });

    container.addEventListener('mouseleave', () => {
        const currentRating = ratings[ratingType] || 0;
        emojis.forEach((e, i) => {
            if (i < currentRating) {
                e.style.opacity = '1';
                e.style.transform = 'scale(1.3)';
            } else {
                e.style.opacity = '0.4';
                e.style.transform = 'scale(1)';
            }
        });
    });
});

// Anonymous toggle functionality
const anonymousCheckbox = document.getElementById('anonymous');
const personalInfoDiv = document.getElementById('personalInfo');
const requiredInputs = personalInfoDiv.querySelectorAll('input[required]');

anonymousCheckbox.addEventListener('change', function () {
    if (this.checked) {
        personalInfoDiv.style.opacity = '0.3';
        personalInfoDiv.style.pointerEvents = 'none';
        requiredInputs.forEach(input => {
            input.removeAttribute('required');
            input.value = '';
        });
    } else {
        personalInfoDiv.style.opacity = '1';
        personalInfoDiv.style.pointerEvents = 'auto';
        requiredInputs.forEach(input => {
            input.setAttribute('required', 'required');
        });
    }
    updateProgress();
});

// Progress bar update
function updateProgress() {
    const formElements = document.querySelectorAll('input[required], select[required]');
    const ratingElements = document.querySelectorAll('.emoji-rating');

    let filledCount = 0;
    let totalCount = 1 + ratingElements.length; // 1 for class selection + ratings

    // Always count class selection as required
    const classSelect = document.getElementById('childClass');
    if (classSelect.value.trim() !== '') {
        filledCount++;
    }

    // If not anonymous, count personal info
    if (!anonymousCheckbox.checked) {
        const personalRequiredFields = personalInfoDiv.querySelectorAll('input[required]');
        totalCount += personalRequiredFields.length;

        personalRequiredFields.forEach(element => {
            if (element.value.trim() !== '') {
                filledCount++;
            }
        });
    }

    // Check ratings
    ratingElements.forEach(element => {
        const ratingType = element.getAttribute('data-rating');
        if (ratings[ratingType]) {
            filledCount++;
        }
    });

    const progress = (filledCount / totalCount) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Form submission
document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate ratings
    const requiredRatings = ['teaching', 'safety', 'communication', 'facilities', 'staff', 'overall'];
    const missingRatings = requiredRatings.filter(key => !ratings[key]);

    // Reset all errors first
    document.querySelectorAll('.rating-error').forEach(el => el.style.display = 'none');

    if (missingRatings.length > 0) {
        // Show errors for missing ratings
        missingRatings.forEach(key => {
            const container = document.querySelector(`.emoji-rating[data-rating="${key}"]`);
            if (container) {
                const errorElement = container.parentElement.querySelector('.rating-error');
                if (errorElement) {
                    errorElement.style.display = 'block';
                }
            }
        });

        const firstMissing = document.querySelector(`.emoji-rating[data-rating="${missingRatings[0]}"]`);
        if (firstMissing) {
            firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }

    // Validate "What do you love most"
    const selectedLoves = document.querySelectorAll('input[name="loves"]:checked');
    const loveSection = document.getElementById('loveSection');
    
    // Reset love section error
    const existingLoveError = loveSection.querySelector('.rating-error');
    if (existingLoveError) existingLoveError.remove();

    if (selectedLoves.length === 0) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'rating-error';
        errorMsg.style.display = 'block';
        errorMsg.style.marginTop = '-20px';
        errorMsg.textContent = 'Please select at least one option';
        loveSection.querySelector('.checkbox-group').appendChild(errorMsg);
        
        loveSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(this);

    // Add ratings to form data
    for (const [key, value] of Object.entries(ratings)) {
        formData.append(`rating_${key}`, value);
    }

    // Create formatted message for email
    let emailMessage = "=== PLAY SCHOOL FEEDBACK FORM ===\n\n";

    // Basic Info
    if (!document.getElementById('anonymous').checked) {
        emailMessage += `Parent Name: ${formData.get('parentName') || 'N/A'}\n`;
        emailMessage += `Child Name: ${formData.get('childName') || 'N/A'}\n`;
        emailMessage += `Email: ${formData.get('email') || 'N/A'}\n`;
    } else {
        emailMessage += "ANONYMOUS FEEDBACK\n";
    }

    emailMessage += `Class: ${formData.get('childClass') || 'N/A'}\n\n`;

    // Ratings
    emailMessage += "=== RATINGS ===\n";
    const ratingLabels = {
        'teaching': 'Teaching Quality',
        'safety': 'Safety & Security',
        'communication': 'Communication',
        'facilities': 'Facilities & Cleanliness',
        'staff': 'Staff Behavior',
        'overall': 'Overall Satisfaction'
    };

    for (const [key, label] of Object.entries(ratingLabels)) {
        const rating = ratings[key] || 0;
        const stars = '⭐'.repeat(rating);
        emailMessage += `${label}: ${stars} (${rating}/5)\n`;
    }

    // What they love
    emailMessage += "\n=== WHAT THEY LOVE ===\n";
    const loves = formData.getAll('loves');
    if (loves.length > 0) {
        loves.forEach(love => {
            emailMessage += `• ${love.replace('-', ' ').toUpperCase()}\n`;
        });
    } else {
        emailMessage += "No specific aspects mentioned\n";
    }

    // Dislikes
    emailMessage += "\n=== WHAT DO YOU DISLIKE MOST ===\n";
    emailMessage += (formData.get('dislikes') || 'None provided') + "\n";

    // Improvements
    emailMessage += "\n=== SUGGESTIONS FOR IMPROVEMENT ===\n";
    emailMessage += (formData.get('improvements') || 'None provided') + "\n";

    // Additional comments
    emailMessage += "\n=== ADDITIONAL COMMENTS ===\n";
    emailMessage += (formData.get('additional') || 'None provided') + "\n";

    // Recommendation
    emailMessage += "\n=== RECOMMENDATION ===\n";
    emailMessage += formData.get('recommend') ? "✅ Would recommend to other parents" : "❌ Would not recommend";

    emailMessage += `\n\nSubmitted on: ${new Date().toLocaleString()}`;

    // Add formatted message to form data
    formData.append('message', emailMessage);

    // Formsubmit.co (Replace INSERT_YOUR_EMAIL_HERE@gmail.com with your actual Gmail address)
    // We use the 'https://formsubmit.co/ajax/YOUR_EMAIL' endpoint for AJAX submissions
    const yourEmail = 'littewingsplayschool25@gmail.com';

    // Add Formsubmit.co specific configuration
    formData.append('_subject', 'New Little Wings Feedback Submission');
    formData.append('_template', 'table'); // Use a nice table format
    formData.append('_captcha', 'false'); // Disable captcha if you want direct submission

    fetch(`https://formsubmit.co/ajax/${yourEmail}`, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === "true" || data.ok === true) {
                // Success
                document.querySelector('.container').style.display = 'none';
                document.getElementById('thankYou').style.display = 'block';
            } else {
                // Even if success is not explicitly true, sometimes it returns just the data. 
                // If we got here without error, it's likely fine, but let's check.
                document.querySelector('.container').style.display = 'none';
                document.getElementById('thankYou').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Sorry, there was an error submitting your feedback. Please try again.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });

    // OPTION 2: EmailJS (Uncomment and configure if using EmailJS)
    /*
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: formData.get('parentName') || 'Anonymous',
        from_email: formData.get('email') || 'anonymous@school.com',
        message: emailMessage,
        to_email: 'school@example.com'
    }).then(function(response) {
        document.querySelector('.container').style.display = 'none';
        document.getElementById('thankYou').style.display = 'block';
    }, function(error) {
        console.error('EmailJS Error:', error);
        alert('Sorry, there was an error submitting your feedback. Please try again.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
    */

    // OPTION 3: Google Apps Script (Uncomment if using Google Sheets)
    /*
    fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.querySelector('.container').style.display = 'none';
            document.getElementById('thankYou').style.display = 'block';
        } else {
            throw new Error('Submission failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sorry, there was an error submitting your feedback. Please try again.');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
    */
});

// Input event listeners for progress
document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('input', updateProgress);
});

// Initial progress update
updateProgress();

// Add smooth scrolling for better UX
document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('focus', function () {
        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});