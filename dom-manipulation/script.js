document.addEventListener("DOMContentLoaded", () => {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const newQuote = document.getElementById("newQuote");

    const quotes = [{category: "loveQuote", text: "I love JavaScript"},
                    {category: "aestheticQuote", text: "Live your life the way you want to."},
                    {category: "psychologyQuote", text: "No soul is burdened more than it could bear"}];

    function showRandomQuote() {
        const index = Math.floor(Math.random() * quotes.length);
        quoteDisplay.innerHTML = `<h2>Catregory: ${quotes[index].category}</h2><p>Quote: ${quotes[index].text}</p>`; 
    };

    function createAddQuoteForm(){

    };

    showRandomQuote();
});