const testData = await fetch('/testData.json').then(response =>
  response.json()
);

export default testData;
