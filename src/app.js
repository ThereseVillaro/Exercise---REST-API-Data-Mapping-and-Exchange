const apiUrl = 'https://catfact.ninja/facts'; // Cat Facts API endpoint

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-input-form');
    const inputField = document.getElementById('user-input');
    const resultsContainer = document.getElementById('results');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userInput = inputField.value.trim();

        if (!userInput || isNaN(userInput) || userInput < 1) {
            resultsContainer.innerHTML = `<p>Please enter a valid number (1 or more).</p>`;
            return;
        }

        try {
            const response = await fetch(`${apiUrl}?limit=${userInput}`);
            if (!response.ok) {
                throw new Error('Network error');
            }
            const data = await response.json();
            displayResults(data);
        } catch (error) {
            resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        }
    });

    function displayResults(data) {
        resultsContainer.innerHTML = '';
        if (Array.isArray(data.data) && data.data.length > 0) {
            data.data.forEach(factObj => {
                const factDiv = document.createElement('div');
                factDiv.className = 'result-item';
                factDiv.style.margin = '10px';
                factDiv.textContent = factObj.fact;
                resultsContainer.appendChild(factDiv);
            });
        } else {
            resultsContainer.innerHTML = '<p>No facts found.</p>';
        }
    }
});