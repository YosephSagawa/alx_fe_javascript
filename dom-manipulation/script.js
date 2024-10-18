document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuote = document.getElementById("newQuote");
    const addQuoteButton = document.getElementById("addQuoteButton");

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
        localStorage.setItem("quotes",JSON.stringify(quotes));
        newQuoteText.value = "";
        newQuoteCategory.value = "";
        
        const addedQuote = document.createElement('p');
        addedQuote.innerHTML = `<h2>Category: ${newQuoteObj.category}</h2><p>Quote: ${newQuoteObj.text}</p>`;
        quoteDisplay.appendChild(addedQuote);
    };
    function showNewQuote(){
        showRandomQuote();
    };

    newQuote.addEventListener("click", showNewQuote);
    addQuoteButton.addEventListener('click',createAddQuoteForm);

    showRandomQuote();
});