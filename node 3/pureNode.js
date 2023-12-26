import { createServer } from "node:http";
import { readFileSync } from "node:fs";

const server = createServer((req, res) => {
  const { url, method } = req;
  switch (url) {
    case "/raw-html":
      const htmlLine = "<h1>Welcome</h1>";
      res.end(htmlLine);
      return;
    case "/style.css":
      const styleFile = readFileSync("./src/style.css", "utf-8");
      res.end(styleFile);
      return;
    case "/script.js":
      const scriptFile = readFileSync("./src/script.js", "utf-8");
      res.end(scriptFile);
      return;
    case "/users":
      const jsonFile = readFileSync("./src/user.json", "utf-8");
      res.end(jsonFile);
      return;

    case "/":
      const htmlFile = readFileSync("./src/index.html", "utf-8");
      res.end(htmlFile);
      return;

    default:
      break;
  }
});

server.listen(4545, () => {
  console.log("listening to server");
});
