const rows = 20;
const cols = 20;
const grid = document.getElementById("grid");

let cells = [];
let start = { r: 0, c: 0 };
let end = { r: 19, c: 19 };

// 🔹 Create Grid
for (let r = 0; r < rows; r++) {
  let row = [];
  for (let c = 0; c < cols; c++) {
    let div = document.createElement("div");
    div.classList.add("cell");

    // Click to toggle wall
    div.addEventListener("click", () => {
      if (!div.classList.contains("start") && !div.classList.contains("end")) {
        div.classList.toggle("wall");
      }
    });

    grid.appendChild(div);
    row.push(div);
  }
  cells.push(row);
}

// 🔹 Mark start and end
cells[start.r][start.c].classList.add("start");
cells[end.r][end.c].classList.add("end");

// 🔹 Sleep (for animation)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 🔹 BFS Algorithm
async function runBFS() {
  let queue = [[start.r, start.c]];

  let visited = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  let parent = {};

  visited[start.r][start.c] = true;

  let directions = [
    [1, 0], [-1, 0], [0, 1], [0, -1]
  ];

  while (queue.length > 0) {
    let [r, c] = queue.shift();

    if (r === end.r && c === end.c) break;

    for (let [dr, dc] of directions) {
      let nr = r + dr;
      let nc = c + dc;

      if (
        nr >= 0 && nc >= 0 &&
        nr < rows && nc < cols &&
        !visited[nr][nc] &&
        !cells[nr][nc].classList.contains("wall")
      ) {
        queue.push([nr, nc]);
        visited[nr][nc] = true;
        parent[`${nr},${nc}`] = [r, c];

        cells[nr][nc].classList.add("visited");
        await sleep(20);
      }
    }
  }

  // 🔹 Trace Path
  let cur = [end.r, end.c];

  while (cur && !(cur[0] === start.r && cur[1] === start.c)) {
    let key = `${cur[0]},${cur[1]}`;
    cur = parent[key];

    if (cur) {
      cells[cur[0]][cur[1]].classList.add("path");
      await sleep(30);
    }
  }
}


    