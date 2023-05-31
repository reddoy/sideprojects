window.onload = function() {
    // Get all the div elements from the selector

    function getDivElements() {
        const divElements = document.querySelectorAll('div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div > div > main > div.flex-1.overflow-hidden > div > div > div');

        // Loop through the div elements and log the text from the updated selector
    
        let textArray = [];
        divElements.forEach((divElement) => {
        const nestedDivElements = divElement.querySelectorAll('div.flex.flex-grow.flex-col.gap-3 > div');
        nestedDivElements.forEach((nestedDivElement) => {
            textArray.push(nestedDivElement.textContent);
        });
        });
    
        // Loop through the textArray and remove every odd index
        for (let i = textArray.length - 1; i >= 0; i--) {
            if (i % 2 !== 0) {
            textArray.splice(i, 1);
            }
        }
        return textArray;
    }

    // Add an event listener for the 'keydown' event on the document

    let currentIndex = -1;

    document.addEventListener('keydown', (event) => {
        const textArray = getDivElements();
        const textareaElement = document.querySelector('#prompt-textarea');
        const currentValue = textareaElement.value.trim();
        if (textArray.length === 0) { return; }
    
        else if (event.key === 'ArrowUp' && (textareaElement.value === '' || textArray[currentIndex] === currentValue)) {
            event.preventDefault();
            if (currentIndex === 0) {
                currentIndex = 0;
            }
            else{
                currentIndex = (currentIndex - 1 + textArray.length) % textArray.length; // Move to the previous index
                textareaElement.value = textArray[currentIndex]; // Set the textarea value to the text at the current index
                textareaElement.style.overflowY = 'auto';
            }


        }
    
        else if (event.key === 'ArrowDown' && (textareaElement.value === '' || textArray[currentIndex] === currentValue)) {
            event.preventDefault();
            if (currentIndex === textArray.length - 1) {
                currentIndex = textArray.length - 1;
            }
            else{
                currentIndex = (currentIndex + 1) % textArray.length; // Move to the next index
                textareaElement.value = textArray[currentIndex]; // Set the textarea value to the text at the current index
                textareaElement.style.overflowY = 'auto';
            }
        }
    });
}
