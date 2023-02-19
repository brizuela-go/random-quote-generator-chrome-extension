async function insertQuote(quote, author) {
  document.getElementById("quote").innerHTML = quote;
  document.getElementById("author").innerHTML = author;
}

async function getQuote() {
  await fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      const quote = data.content;
      const author = data.author;
      translateQuote(quote, `- ${author}`);
    });
}

async function translateQuote(quote, author) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${quote}`;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let translatedQuote = "";
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i][0]) {
          translatedQuote += data[0][i][0];
        }
      }
      insertQuote(translatedQuote, author);
    });
}

getQuote();
