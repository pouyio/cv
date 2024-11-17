const puppeteer = require("puppeteer");
const fs = require("fs");
const { createServer } = require("vite");

(async () => {
  const viteServer = await createServer({
    root: __dirname,
    server: { port: 1234 },
  });
  await viteServer.listen();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  console.log(`${process.env.LANGUAGE} language process start`);

  await page.goto(`http://localhost:1234/${process.env.LANGUAGE}.html`, {
    waitUntil: "networkidle0",
  });

  await page.evaluateHandle("document.fonts.ready");
  const buffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  if (!fs.existsSync("docs")) {
    fs.mkdirSync("docs");
  }
  fs.writeFileSync(
    `docs/cv_vicente_ortiz_${process.env.LANGUAGE}.pdf`,
    buffer,
    "binary"
  );

  console.log(`${process.env.LANGUAGE} language process end`);
  await viteServer.close();
  await browser.close();
  process.exit();
})();
