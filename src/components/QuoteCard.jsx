const quotes = [
    { text: "If you're not making mistakes, then you're not making decisions.", author: "Catherine Cook" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "Small steps every day lead to big results.", author: "Unknown" },
  ];
  
  export default function QuoteCard() {
    const index = new Date().getDate() % quotes.length;
    const quote = quotes[index];
  
    return (
      <div className="quote-card">
        <h4>Quote of the Day</h4>
        <p>"{quote.text}"</p>
        <small>— {quote.author.toUpperCase()}</small>
      </div>
    );
  }