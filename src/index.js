const remSize = parseInt(getComputedStyle(document.documentElement).fontSize);
const tmpCanvas = document.createElement("canvas");
let siritoriList;
const size = 10;
const meiro = new Array(12);
let score = 0;
let counter = 0;
let processed;
let idioms;
const words =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヴガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュー"
    .split("");
loadConfig();


function loadConfig() {
  if (localStorage.getItem("darkMode") == 1) {
    document.documentElement.dataset.theme = "dark";
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]];
  }
  return array;
}

function calcReply() {
  const reply = new Array(size * size);
  const trs = document.getElementById("meiro").children;
  for (let x = 0; x < size; x++) {
    const tds = trs[x].children;
    for (let y = 0; y < size; y++) {
      const selected = tds[y].classList.contains("table-primary");
      const hinted = tds[y].classList.contains("table-secondary");
      const pos = meiro[x][y];
      if (pos > 0 && (selected || hinted)) {
        reply[pos - 1] = tds[y].innerText;
      }
    }
  }
  return reply;
}

function findMeiroIndex(n) {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (meiro[x][y] == n) {
        return x * size + y;
      }
    }
  }
  return -1;
}

function prependIdiomLink(idiom, correct) {
  const a = document.createElement("a");
  a.innerText = idiom;
  a.href = "https://www.google.com/search?q=" + idiom + "とは";
  a.target = "_blank";
  a.rel = "noopener noreferer";
  if (correct) {
    a.className = "btn btn-light m-1";
  } else {
    a.className = "btn btn-secondary m-1";
  }
  solvedPanel.prepend(a);
}

function showSolved(reply, hinted) {
  const trs = document.getElementById("meiro").children;
  let j = 0;
  let k = 0;
  for (let i = 0; i < counter; i++) {
    const idiom = idioms[j];
    if (!processed[i]) {
      if (reply[i] == idiom[k]) {
        if (k == idiom.length - 1) {
          prependIdiomLink(idiom, true);
          score += idiom.length;
          document.getElementById("score").innerText = score;
        }
        processed[i] = true;
      } else {
        prependIdiomLink(idiom, false);
        const pos = i - k;
        for (let l = pos; l < pos + idiom.length; l++) {
          processed[l] = true;
          const idx = findMeiroIndex(l + 1);
          const td = trs[Math.floor(idx / size)].children[idx % size];
          td.className = "";
          td.classList.add("table-secondary");
        }
        if (hinted) {
          break;
        }
      }
    }
    if (k == idiom.length - 1) {
      j += 1;
      k = 1;
    } else {
      k += 1;
    }
  }
}

function showHint() {
  const reply = calcReply();
  showSolved(reply, true);
}

function showAnswer() {
  const reply = calcReply();
  showSolved(reply, false);
  const trs = document.getElementById("meiro").children;
  for (let x = 0; x < size; x++) {
    const tds = trs[x].children;
    for (let y = 0; y < size; y++) {
      if (meiro[x][y] > 0) {
        tds[y].className = "";
        tds[y].classList.add("table-danger");
      }
    }
  }
  const startButton = document.getElementById("startButton");
  startButton.classList.remove("d-none");
  startButton.innerText = "スタート";
  const answerButton = document.getElementById("answerButton");
  answerButton.classList.add("d-none");
}

function _getNeighborText(trs, x, y, direction) {
  let text = trs[x].children[y].innerText;
  if (direction == 1) {
    if (meiro[x - 1][y] != 0) {
      text += trs[x - 1].children[y].innerText;
    }
  } else if (direction == 2) {
    if (meiro[x + 1][y] != 0) {
      text += trs[x + 1].children[y].innerText;
    }
  } else if (direction == 3) {
    if (meiro[x][y - 1] != 0) {
      text += trs[x].children[y - 1].innerText;
    }
  } else {
    if (meiro[x][y + 1] != 0) {
      text += trs[x].children[y + 1].innerText;
    }
  }
  return text;
}

function _setNeighborText(trs, x, y, direction, text, isAnswer) {
  if (!isAnswer) {
    trs[x].children[y].innerText = text[0];
  }
  if (direction == 1) {
    trs[x - 1].children[y].innerText = text[1];
  } else if (direction == 2) {
    trs[x + 1].children[y].innerText = text[1];
  } else if (direction == 3) {
    trs[x].children[y - 1].innerText = text[1];
  } else {
    trs[x].children[y + 1].innerText = text[1];
  }
}

function _generateRandomText(text, isAnswer) {
  if (isAnswer) {
    const first = text[0];
    for (let i = 0; i < 5; i++) { // どうしても熟語ができてしまうケースがあるため回数打ち切り
      text = first + words[getRandomInt(0, words.length)];
      if (!includeIdiom(text)) return text;
    }
  } else {
    for (let i = 0; i < 5; i++) { // どうしても熟語ができてしまうケースがあるため回数打ち切り
      for (let j = 0; j < 2; j++) {
        text[j] = words[getRandomInt(0, words.length)];
      }
      if (!includeIdiom(text)) return text;
    }
  }
  return text;
}

function includeIdiom(text) {
  if (idioms.includes(text.slice(0, 2))) {
    return true;
  } else {
    return false;
  }
}

function startGame() {
  while (solvedPanel.firstChild) {
    solvedPanel.removeChild(solvedPanel.firstChild);
  }
  idioms = getIdioms();
  generateGame();
  const startButton = document.getElementById("startButton");
  startButton.classList.add("d-none");
  startButton.innerText = "やり直し";
  const answerButton = document.getElementById("answerButton");
  answerButton.classList.remove("d-none");
}

function isPassableRoute(x, y, routes) {
  if (routes.length == 4) {
    return true;
  } else if (routes.length == 3) {
    if (x == 0 || x == size - 1 || y == 0 || y == size - 1) {
      return true;
    }
  }
  return false;
}

function isPassableNeighbor(x, y, routes) {
  if (routes.length >= 3) {
    return true;
  } else if (routes.length == 2) {
    if (x == 0 || x == size - 1 || y == 0 || y == size - 1) {
      return true;
    }
  }
  return false;
}

function getRoute(x, y, direction, n) {
  let tmpRoutes = getNeighborRoutes(x, y);
  if (!isPassableNeighbor(x, y, tmpRoutes)) {
    return false;
  }

  if (direction == 1 && 0 <= x - n) {
    let passable = true;
    for (let i = 1; i <= n; i++) {
      tmpRoutes = getNeighborRoutes(x - i, y);
      if (!isPassableRoute(x - i, y, tmpRoutes)) {
        passable = false;
        break;
      }
    }
    if (passable) return [x - 1, y, 1];
  }
  if (direction == 2 && x + n < size) {
    let passable = true;
    for (let i = 1; i <= n; i++) {
      tmpRoutes = getNeighborRoutes(x + i, y);
      if (!isPassableRoute(x + i, y, tmpRoutes)) {
        passable = false;
        break;
      }
    }
    if (passable) return [x + 1, y, 2];
  }
  if (direction == 3 && 0 <= y - n) {
    let passable = true;
    for (let i = 1; i <= n; i++) {
      tmpRoutes = getNeighborRoutes(x, y - i);
      if (!isPassableRoute(x, y - i, tmpRoutes)) {
        passable = false;
        break;
      }
    }
    if (passable) return [x, y - 1, 3];
  }
  if (direction == 4 && y + n < size) {
    let passable = true;
    for (let i = 1; i <= n; i++) {
      tmpRoutes = getNeighborRoutes(x, y + i);
      if (!isPassableRoute(x, y + i, tmpRoutes)) {
        passable = false;
        break;
      }
    }
    if (passable) return [x, y + 1, 4];
  }
  return false;
}

function getNeighborRoutes(x, y) {
  const routes = [];
  if (0 <= x - 1 && meiro[x - 1][y] == 0) {
    routes.push([x - 1, y, 1]);
  }
  if (x + 1 < size && meiro[x + 1][y] == 0) {
    routes.push([x + 1, y, 2]);
  }
  if (0 <= y - 1 && meiro[x][y - 1] == 0) {
    routes.push([x, y - 1, 3]);
  }
  if (y + 1 < size && meiro[x][y + 1] == 0) {
    routes.push([x, y + 1, 4]);
  }
  return routes;
}

function paint(x, y, direction, n) {
  if (direction == 1) {
    for (let i = 0; i < n; i++) {
      counter += 1;
      meiro[x - i][y] = counter;
    }
    return [x - n + 1, y];
  } else if (direction == 2) {
    for (let i = 0; i < n; i++) {
      counter += 1;
      meiro[x + i][y] = counter;
    }
    return [x + n - 1, y];
  } else if (direction == 3) {
    for (let i = 0; i < n; i++) {
      counter += 1;
      meiro[x][y - i] = counter;
    }
    return [x, y - n + 1];
  } else {
    for (let i = 0; i < n; i++) {
      counter += 1;
      meiro[x][y + i] = counter;
    }
    return [x, y + n - 1];
  }
}

function _p() {
  let str = "";
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      str += meiro[i][j];
    }
    str += "\n";
  }
  console.log(str);
}

function generateGame() {
  // 開始地点を選び隣接しないように熟語を埋めていく
  let generating = true;
  while (generating) {
    let x1 = 0;
    let y1 = getRandomInt(1, size - 1);
    let painting = true;
    counter = 0;
    for (let x = 0; x < size; x++) {
      meiro[x] = new Array(size);
      for (let y = 0; y < size; y++) {
        meiro[x][y] = 0;
      }
    }
    let route = getRoute(x1, y1, -1, idioms[0].length);
    let xy = paint(x1, y1, route[2], idioms[0].length);
    x1 = xy[0];
    y1 = xy[1];
    let i = 1;
    while (painting) {
      const firsts = shuffle(getNeighborRoutes(x1, y1));
      if (firsts.length == 0) {
        painting = false;
      } else {
        let noRoute = true;
        for (let j = 0; j < firsts.length; j++) {
          route = getRoute(
            firsts[j][0],
            firsts[j][1],
            firsts[j][2],
            idioms[i].length - 2,
          );
          if (route) {
            noRoute = false;
            paint(firsts[j][0], firsts[j][1], firsts[j][2], 1);
            xy = paint(route[0], route[1], route[2], idioms[i].length - 2);
            x1 = xy[0];
            y1 = xy[1];
            if (x1 == 0 || x1 == size - 1 || y1 == 0 || y1 == size - 1) {
              painting = false;
              if (counter > 20) { // 良い迷路になっている
                generating = false;
                processed = new Array(counter); // 回答リストのキャッシュを生成
              }
            }
            i += 1;
            break;
          }
        }
        if (noRoute) painting = false;
      }
    }
  }
  const meiroNode = document.getElementById("meiro");
  while (meiroNode.firstChild) meiroNode.removeChild(meiroNode.firstChild);
  for (let x = 0; x < size; x++) {
    const tr = document.createElement("tr");
    meiroNode.appendChild(tr);
    for (let y = 0; y < size; y++) {
      const td = document.createElement("td");
      td.innerText = words[getRandomInt(0, words.length)];
      tr.appendChild(td);
      td.onclick = function () {
        this.classList.toggle("table-primary");
      };
    }
  }
  const trs = meiroNode.children;
  let j = 0;
  let k = 0;
  for (let i = 1; i <= counter; i++) {
    const idx = findMeiroIndex(i);
    const idiom = idioms[j][k];
    const td = trs[Math.floor(idx / size)].children[idx % size];
    td.innerText = idiom;
    if (i == 1) {
      td.classList.add("table-secondary");
    }
    if (k == idioms[j].length - 1) {
      j += 1;
      k = 1;
    } else {
      k += 1;
    }
  }
}

function resizeFontSize(node) {
  // https://stackoverflow.com/questions/118241/
  function getTextWidth(text, font) {
    // re-use canvas object for better performance
    // const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = tmpCanvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }
  function getTextRect(text, fontSize, font, lineHeight) {
    const lines = text.split("\n");
    let maxWidth = 0;
    const fontConfig = fontSize + "px " + font;
    for (let i = 0; i < lines.length; i++) {
      const width = getTextWidth(lines[i], fontConfig);
      if (maxWidth < width) {
        maxWidth = width;
      }
    }
    return [maxWidth, fontSize * lines.length * lineHeight];
  }
  function getNodeRect() {
    const width = document.getElementById("container").clientWidth;
    const headerHeight = document.getElementById("header").clientHeight;
    const startButtonHeight = document.getElementById("startButton").clientHeight;
    const height = document.documentElement.clientHeight - headerHeight -
      startButtonHeight;
    return [width, height];
  }
  // function getPaddingRect(style) {
  //   const width = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  //   const height = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  //   return [width, height];
  // }
  const style = getComputedStyle(node);
  const font = style.fontFamily;
  const fontSize = 16; // parseFloat(style.fontSize);
  const lineHeight = 1.1; // parseFloat(style.lineHeight) / fontSize;
  const nodeRect = getNodeRect();
  const textRect = getTextRect("禿", fontSize, font, lineHeight);
  const paddingRect = [remSize * 2 + 21, remSize * 1.5 + 6]; // getPaddingRect(style);

  // https://stackoverflow.com/questions/46653569/
  // Safariで正確な算出ができないので誤差ぶんだけ縮小化 (10%)
  const rowFontSize = fontSize * (nodeRect[0] - paddingRect[0]) / 12 /
    textRect[0] * 0.90;
  const colFontSize = fontSize * (nodeRect[1] - paddingRect[1]) / 12 /
    textRect[1] * 0.90;
  if (colFontSize < rowFontSize) {
    node.style.fontSize = colFontSize + "px";
  } else {
    node.style.fontSize = rowFontSize + "px";
  }
}

function toggleDarkMode() {
  if (localStorage.getItem("darkMode") == 1) {
    localStorage.setItem("darkMode", 0);
    delete document.documentElement.dataset.theme;
  } else {
    localStorage.setItem("darkMode", 1);
    document.documentElement.dataset.theme = "dark";
  }
}

function generateSiritoriCandidates() {
  const candidates = {};
  for (const [aiueo, idioms] of Object.entries(siritoriList)) {
    if (candidates[aiueo]) {
      const newIdioms = candidates[aiueo].concat(idioms);
      candidates[aiueo] = newIdioms;
    } else {
      candidates[aiueo] = idioms;
    }
  }
  return candidates;
}

function getIdioms() {
  const siritori = generateSiritoriCandidates();
  const aiueos = Object.keys(siritori);
  let aiueo = aiueos[getRandomInt(0, aiueos.length)];
  let list = [];
  let generating = true;
  while (generating) {
    for (let i = 0; i < 30; i++) {
      const tmpIdioms = siritori[aiueo];
      if (tmpIdioms) {
        let dupricated = true;
        for (let i = 0; i < 5; i++) {
          const idiom = tmpIdioms[getRandomInt(0, tmpIdioms.length)];
          aiueo = idiom[idiom.length - 1];
          if (!list.includes(idiom)) {
            list.push(idiom);
            dupricated = false;
            break;
          }
        }
        if (dupricated) {
          break;
        }
      } else {
        break;
      }
    }
    if (list.length == 30) {
      generating = false;
    } else {
      // 小1は生成不可
      aiueo = aiueos[getRandomInt(0, aiueos.length)];
      list = [];
    }
  }
  return list;
}

const meiroObj = document.getElementById("meiro");
resizeFontSize(meiroObj);
window.addEventListener("resize", function () {
  resizeFontSize(meiroObj);
});

fetch("/kana-siritori/index.json")
  .then((response) => response.json())
  .then((data) => {
    siritoriList = data;
    idioms = getIdioms();
    generateGame();
    while (solvedPanel.firstChild) {
      solvedPanel.removeChild(solvedPanel.firstChild);
    }
    showAnswer();
  });

document.getElementById("toggleDarkMode").onclick = toggleDarkMode;
document.getElementById("startButton").onclick = startGame;
document.getElementById("answerButton").onclick = showAnswer;
document.getElementById("hintButton").onclick = showHint;
