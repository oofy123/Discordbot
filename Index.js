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
const fetch = require('node-fetch');

async function wikipediaSearch(command) {
  const args = command.split(' ').slice(2); // Extracting the arguments
  const searchTerm = args.join(' '); // Joining the arguments into a single string
  const isAssystTag = command.startsWith('-t Wikipedia');

  if (isAssystTag) {
    // Handle Assyst tag for Wikipedia
    const count = args.length; // Number of arguments passed
    const article = searchTerm;
    return `Performing Assyst tag search for ${count} example(s) with the article: ${article}`;
  } else {
    // Handle regular Wikipedia search
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

      const maxLength = 200; // Maximum character length for the article extract
      const truncatedExtract = articleExtract.length > maxLength ? articleExtract.substring(0, maxLength) + '...' : articleExtract;

      return `**${articleTitle}**\n\n${truncatedExtract}\n\nRead more: ${articleUrl}`;
    }
  }
}

wikipediaSearch('-t create example you have 5 many example(s)');
