import { readLines } from "https://deno.land/std/io/mod.ts";

function smallToBig(str) {
  const pos = "ァィゥェォヵヶッャュョヮ".indexOf(str);
  if (pos == -1) {
    return str;
  } else {
    return "アイウエオカケツヤユヨワ"[pos];
  }
}

function isIdiom(word) {
  if (3 <= word.length && word.length <= 6 && /^[ァ-ヶ]+$/.test(word)) {
    return true;
  } else {
    return false;
  }
}

async function build(threshold) {
  const siritori = {};
  const fileReader = await Deno.open(
    `graded-vocab-ja/dist/0.csv`,
  );
  for await (const line of readLines(fileReader)) {
    const arr = line.split(",");
    const word = arr[0];
    const count = parseInt(arr[1]);
    if (isIdiom(word) && count >= threshold) {
      const from = smallToBig(word[0]);
      const to = smallToBig(word.at(-1));
      if (to != "ン" || to != "ー") {
        if (siritori[from]) {
          siritori[from].push(word);
        } else {
          siritori[from] = [word];
        }
      }
    }
  }
  fileReader.close();
  Deno.writeTextFile("src/siritori.json", JSON.stringify(siritori, null, "\t"));
}

const threshold = 100000;
await build(threshold);
