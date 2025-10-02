const apiUrl = 'https://dog.ceo/api/breed'; // Dog API endpoint

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-input-form');
    const inputField = document.getElementById('user-input');
    const resultsContainer = document.getElementById('results');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userInput = inputField.value.trim().toLowerCase();

        try {
            const response = await fetch(`${apiUrl}/${userInput}/images`);
            if (!response.ok) {
                throw new Error('Breed not found or network error');
            }
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });

    function displayResults(data) {
        resultsContainer.innerHTML = '';
        if (data.status === 'success' && Array.isArray(data.message)) {
            data.message.slice(0, 10).forEach(imgUrl => { // Show up to 10 images
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = 'Dog image';
                img.className = 'result-item';
                img.style.width = '200px';
                img.style.margin = '10px';
                resultsContainer.appendChild(img);
            });
        } else {
            resultsContainer.innerHTML = '<p>No images found for this breed.</p>';
        }
    }
});