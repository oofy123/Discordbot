const fetch = require('node-fetch');

async function wikipediaSearch(command) {
  const args = command.split(' ').slice(1);
  const searchTerm = args.join(' ');

  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(searchTerm)}`;
  const response = await fetch(url);
  const data = await response.json();

  const pageId = Object.keys(data.query.pages)[0];
  const page = data.query.pages[pageId];

  if (page.missing !== undefined) {
    return 'The article could not be found.';
  } else {
    const articleTitle = page.title;
    const articleExtract = page.extract;
    const articleUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(articleTitle)}`;

    return `**${articleTitle}**\n\n${articleExtract}\n\nRead more: ${articleUrl}`;
  }
}

wikipediaSearch('Discord');
