import { createServer } from "node:http";
import axios from "axios";
import request from "request";

// fetching data by http Module
const serverHttpModule = createServer(async (req, res) => {
  const { url, method } = req;
  switch (method) {
    case "GET":
      const jsonUrl = "https://dog.ceo/api/breeds/image/random";
      const data = await fetchData(jsonUrl);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<img src="${data.message}" />`);
      res.end();
    default:
      break;
  }
});
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// fetching data by Axios
const serverAxios = createServer(async (req, res) => {
  const { url, method } = req;
  switch (method) {
    case "GET":
      const jsonUrl = "https://dog.ceo/api/breeds/image/random";
      const data = await fetchDataByAxios(jsonUrl);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<img src="${data.message}" />`);
      res.end();
    default:
      break;
  }
});
const fetchDataByAxios = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

// fetching data by Request
const serverRequest = createServer(async (req, res) => {
  const { url, method } = req;
  switch (method) {
    case "GET":
      const jsonUrl = "https://dog.ceo/api/breeds/image/random";
      const data = await fetchDataByRequest(jsonUrl);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<img src="${data?.message}" />`);
      res.end();
    default:
      break;
  }
});
const fetchDataByRequest = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (response.statusCode !== 200) {
        reject(new Error(`Unexpected status code: ${response.statusCode}`));
      } else {
        // Parse the JSON data from the body
        const data = JSON.parse(body);
        resolve(data);
      }
    });
  });
};

serverHttpModule.listen(4040, () => {
  console.log("listening to server");
});
serverAxios.listen(4545, () => {
  console.log("listening to server");
});
serverRequest.listen(4343, () => {
  console.log("listening to server");
});
