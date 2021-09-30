import { readLines } from "https://deno.land/std/io/mod.ts";

function smallToBig(str) {
  const pos = "ァィゥェォヵヶッャュョヮ".indexOf(str);
  if (pos == -1) {
    return str;
  } else {
    return "アイウエオカケツヤユヨワ"[pos];
  }
}

const siritori = {};
for (let i = 3; i <= 6; i++) {
  const fileReader = await Deno.open("ngram-idioms/kana-10000/" + i + ".lst");
  for await (const line of readLines(fileReader)) {
    const from = smallToBig(line[0]);
    const to = smallToBig(line[line.length - 1]);
    if (to != "ン" || to != "ー") {
      if (siritori[from]) {
        siritori[from].push(line);
      } else {
        siritori[from] = [line];
      }
    }
  }
}
Deno.writeTextFile("src/siritori.json", JSON.stringify(siritori, null, "\t"));
