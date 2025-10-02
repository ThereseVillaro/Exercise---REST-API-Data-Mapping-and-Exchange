function createUserInput(onSubmit) {
    const container = document.createElement('div');
    const input = document.createElement('input');
    const button = document.createElement('button');

    input.type = 'text';
    input.placeholder = 'Enter search term...';
    button.textContent = 'Search';

    button.addEventListener('click', () => {
        const value = input.value.trim();
        if (value) {
            onSubmit(value);
            input.value = '';
        }
    });

    container.appendChild(input);
    container.appendChild(button);
    return container;
}

export default createUserInput;