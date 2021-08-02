require("dotenv").config();
const fetch = require("node-fetch");
const execSync = require("child_process").execSync;
const wallpaper = require("wallpaper");

const key = process.env.api_key;
let url = "https://api.nasa.gov/planetary/apod";
let hit_url = url + `?api_key=${key}`;

async function fetcher() {
  try {
    let response = await fetch(hit_url);
    let data = await response.json();
    let imgHd = data.hdurl ? data.hdurl : "";
    let img = data.url ? data.url : "";
    let imgext = ".jpg";
    path = `./Img/background${imgext}`;
    console.log(imgHd);
    console.log(img);
    if (imgHd.includes("jpg")) {
      execSync(`curl -o ${path} ${imgHd}`);
      setBackground(path);
      console.log("HD url");
    } else if (img.includes("jpg")) {
      execSync(`curl -o ${path} ${img}`);
      setBackground(path);
      console.log("Normal url");
    }
  } catch (e) {
    console.log("There was some error -> ", e);
  }
}
async function setBackground(path) {
  let file = path;
  console.log(file);
  await wallpaper.set(file, (scale = "center"));
  await wallpaper.get();
}
fetcher();
