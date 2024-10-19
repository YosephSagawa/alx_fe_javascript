document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuote = document.getElementById("newQuote");
    const addQuoteButton = document.getElementById("addQuoteButton");
    const exportFileButton = document.getElementById("exportFileButton");

    const quotes = [{category: "Love", text: "I love JavaScript"},
                    {category: "Aesthetic", text: "Live your life the way you want to."},
                    {category: "Psychology", text: "No soul is burdened more than it could bear"},
                    {category: "Life", text: "Life is what happens when you're busy making other plans."},
                    {category: "Motivation", text: "Get busy living or get busy dying."},
                    {category: "Happiness", text: "The purpose of our lives is to be happy."}];

    function showRandomQuote() {

        const storedQuotes = localStorage.getItem('quotes');
        const storedQuotesArray = JSON.parse(storedQuotes);
        const index = Math.floor(Math.random() * storedQuotesArray.length);
        quoteDisplay.innerHTML = `<h2>Category: ${storedQuotesArray[index].category}</h2><p>Quote: ${storedQuotesArray[index].text}</p>`; 
    };

    function createAddQuoteForm(){
        const newQuoteText = document.getElementById('newQuoteText');
        const newQuoteCategory = document.getElementById('newQuoteCategory');
        
        const newQuoteTextValue = newQuoteText.value.trim();
        const newQuoteCategoryValue = newQuoteCategory.value.trim();
        const newQuoteObj = {category: newQuoteCategoryValue , text: newQuoteTextValue};

        if(newQuoteTextValue === "" || newQuoteCategoryValue === ""){
            alert("Please fill in all fields!");
            return;
        }
        quotes.push(newQuoteObj);
        saveQuotes();
        newQuoteText.value = "";
        newQuoteCategory.value = "";
        
        const addedQuote = document.createElement('p');
        addedQuote.innerHTML = `<h2>Category: ${newQuoteObj.category}</h2><p>Quote: ${newQuoteObj.text}</p>`;
        quoteDisplay.appendChild(addedQuote);
    };
    function showNewQuote(){
        showRandomQuote();
    };

    function saveQuotes(){
        localStorage.setItem("quotes",JSON.stringify(quotes));
    }

    /**
     * Imports quotes from a JSON file and adds them to the existing quotes array.
     * @param {Event} event The event fired when the user selects a file to import.
     */
    function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        // Add the imported quotes to the existing quotes array
        quotes.push(...importedQuotes);
        // Save the updated quotes array to local storage
        saveQuotes();
        // Alert the user that the import was successful
        alert('Quotes imported successfully!');
      };
      // Read the selected file as text
      fileReader.readAsText(event.target.files[0]);
    }


      /**
       * Exports the quotes stored in local storage to a JSON file.
       */
      function exportToJSONFile() {
        // Retrieve quotes from local storage and convert them to a formatted JSON string
        const dataStr = JSON.stringify(JSON.parse(localStorage.getItem('quotes')), null, 2);
        
        // Create a new Blob object containing the JSON data
        const blob = new Blob([dataStr], { type: "application/json" });
        
        // Generate a URL for the Blob object
        const url = URL.createObjectURL(blob);
        
        // Create a temporary anchor element to initialize the download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'quotes.json';

        // Programmatically click the link to trigger the download
        link.click();
        
        // Revoke the object URL to free up resources
        URL.revokeObjectURL(url);
      }


      /**
       * Populates the select element with categories from the quotes stored in local storage.
       */
      function populateCategories() {
        // Retrieve the select element
        const categoryFilter = document.getElementById('categoryFilter');

        // Retrieve the quotes from local storage and convert them to an array
        const savedQuotes = localStorage.getItem('quotes');
        const savedQuotesArray = JSON.parse(savedQuotes);

        // Create an array of unique categories from the quotes
        const categories = savedQuotesArray.map(quote => quote.category);

        // Create an option element for each category and append it to the select element
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
      }

      function filterQuotes(){

      }
      
    exportFileButton.addEventListener('click', exportToJSONFile);

    newQuote.addEventListener("click", showNewQuote);
    addQuoteButton.addEventListener('click',createAddQuoteForm);

    showRandomQuote();
    populateCategories();
});