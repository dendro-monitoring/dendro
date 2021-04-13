exports.handler = (event, context) => {
  console.log("Received event:", JSON.stringify(event, null, 2));
  console.log("Context:", context);
}