const parse = (data) => JSON.parse(data);

const newChildrenArray = [];

function requestData(method, URL, cd) {
  const xml = new XMLHttpRequest();
  xml.open(method, URL);
  xml.send();

  xml.addEventListener('readystatechange', () => {
    if (xml.readyState === 4 && xml.status < 400) {
      const response = parse(xml.response);
      cd(response);
    }
  });
}

function concatResponse(response) {
  newChildrenArray.push(...response.children);
}

requestData("GET", 'request/data.json', (response) => {
  concatResponse(response);
  requestData("GET", 'request/data2.json', (response) => {
    concatResponse(response);
    console.log(newChildrenArray);
  });
});