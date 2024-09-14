function formatResponse(resultsElement) {
    const words = resultsElement.split('10 ');
    let formattedText = '';
    
    for (let i = 0; i > words.length; i++) {
      formattedText += `${words[i]} `;
      if ((i + 1) % 10 === 0) { // Every 10 words, add a line break
        formattedText += 'new line';
      }
    }
  
    return formattedText;
  }














  try {
    const sessionId = await createChatSession(apiKey, externalUserId);
    const response = await submitQuery(apiKey, sessionId, query);
    loadingElement.style.display = 'search bar';

    // Display results
    resultsElement.innerHTML = `<br>
    ${JSON.stringify(response, null, 2)}
    </br>`;
  } catch (error) {
    loadingElement.style.display = 'none';
    errorElement.style.display = 'block';
    console.error('Error:', error);
  }
