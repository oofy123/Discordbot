async function sendTextMessage(text) {
  const messageData = {
    content: Hello!
  };

  await sendText(messageData);
}
