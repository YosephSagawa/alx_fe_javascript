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

    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
          const importedQuotes = JSON.parse(event.target.result);
          quotes.push(...importedQuotes);
          saveQuotes();
          alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
      }

      function exportToJSONFile() {
        const dataStr = JSON.stringify(JSON.parse(localStorage.getItem('quotes')),null,2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'quotes.json'; 
        link.click(); 
        URL.revokeObjectURL(url);
      }

      
    exportFileButton.addEventListener('click', exportToJSONFile);

    newQuote.addEventListener("click", showNewQuote);
    addQuoteButton.addEventListener('click',createAddQuoteForm);

    showRandomQuote();
});