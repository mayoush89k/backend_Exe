import { createServer } from "node:http";

const server = createServer(async (req, res) => {
  const { url, method } = req;
  switch (method) {
    case "GET":
      const jsonUrl = "https://dog.ceo/api/breeds/image/random";
      const data = await fetchData(jsonUrl);
      console.log(data);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<img src="${data.message}" />`);
      res.end();
    default:
      break;
  }
});

server.listen(4545, () => {
  console.log("listening to server");
});
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
