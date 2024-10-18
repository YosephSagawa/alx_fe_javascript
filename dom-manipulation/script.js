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
        const index = Math.floor(Math.random() * quotes.length);
        quoteDisplay.innerHTML = `<h2>Category: ${quotes[index].category}</h2><p>Quote: ${quotes[index].text}</p>`; 
    };

    function createAddQuoteForm(){
        const newQuoteText = document.getElementById('newQuoteText');
        const newQuoteCategory = document.getElementById('newQuoteCategory');
        
        const newQuoteTextValue = newQuoteText.value.trim();
        const newQuoteCategoryValue = newQuoteCategory.value.trim();
        const newQuoteObj = {category: newQuoteCategoryValue , text: newQuoteTextValue};

        if(newQuoteTextValue === "" || newQuoteCategoryValue === ""){
            const error = document.createElement('p');
            error.innerHTML = "Please fill in all the fields!";
            quoteDisplay.appendChild(error);
            return;
        }
        quotes.push(newQuoteObj);
        newQuoteText.value = "";
        newQuoteCategory.value = "";
        const success = document.createElement('p');
        success.innerHTML = "New quote added successfully!";
        quoteDisplay.appendChild(success);
    };
    function showNewQuote(){
        showRandomQuote();
    };
    newQuote.addEventListener("click", showNewQuote);
    addQuoteButton.addEventListener('click',createAddQuoteForm);
});