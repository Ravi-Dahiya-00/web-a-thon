// script.js

const apiKey = 'Dh1C3LAW1QHWioAUWIhTY1hmRWmBaCw7'; // Your provided API key
const externalUserId = 'user-123'; // Dummy user ID, replace if needed

// Function to create a chat session
async function createChatSession(apiKey, externalUserId) {
  const response = await fetch('https://api.on-demand.io/chat/v1/sessions', {
    method: 'POST',
    headers: {   
      'Content-Type': 'application/json',
      'apikey': apiKey
    },
    body: JSON.stringify({
      pluginIds: [],
      externalUserId: externalUserId
    })
  });

  const data = await response.json();
  return data.data.id; // Extract session ID
}


// Function to submit a query
async function submitQuery(apiKey, sessionId, query) {
  const response = await fetch(`https://api.on-demand.io/chat/v1/sessions/${sessionId}/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': apiKey
    },
    body: JSON.stringify({
      endpointId: 'predefined-openai-gpt4o',
      query: query,
      pluginIds: ['plugin-1712327325', 'plugin-1713962163'],
      responseMode: 'sync'
    })
  });

  const data = await response.json();
  return data;
}
function formatResponse(resultsElement) {
    const words = resultsElement.split(' ');
    let formattedText = '';
    
    for (let i = 0; i < words.length; i++) {
      formattedText += words[i] + ' ';
      if ((i + 1) % 10 === 0) { // Every 10 words, add a line break
        formattedText += '<br>';
      }
    }
  
    return formattedText;
  }

document.getElementById('submitBtn').addEventListener('click', async () => {
  const query = document.getElementById('queryInput').value;
  const loadingElement = document.getElementById('loading');
  const resultsElement = document.getElementById('results');
  const errorElement = document.getElementById('error');

  if (query.trim() === "") {
    resultsElement.innerHTML = "Please enter a query.";
    return;
  }

  loadingElement.style.display = 'block';
  resultsElement.innerHTML = '';
  resultsElement.classList.add('highlight');
  resultsElement.style.justifyContent='center'
  errorElement.innerHTML = '';
  


  errorElement.style.display = 'none';

  try {
    const sessionId = await createChatSession(apiKey, externalUserId);
    const response = await submitQuery(apiKey, sessionId, query);
    loadingElement.style.display = 'none';

    // Display results
    resultsElement.innerHTML = `<pre>
    ${JSON.stringify(response, null, 2)}
    </pre>`;
  } catch (error) {
    loadingElement.style.display = 'none';
    errorElement.style.display = 'block';
    console.error('Error:', error);
  }
});
