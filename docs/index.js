const remSize=parseInt(getComputedStyle(document.documentElement).fontSize);let siritoriList;const size=10,meiro=new Array(12);let score=0,counter=0,processed,idioms;const words="アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンヴガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポァィゥェォッャュー".split("");loadConfig();function loadConfig(){localStorage.getItem("darkMode")==1&&(document.documentElement.dataset.theme="dark")}function getRandomInt(a,b){return a=Math.ceil(a),b=Math.floor(b),Math.floor(Math.random()*(b-a))+a}function shuffle(a){for(let b=a.length;1<b;b--){const c=Math.floor(Math.random()*b);[a[c],a[b-1]]=[a[b-1],a[c]]}return a}function calcReply(){const a=new Array(size*size),b=document.getElementById("meiro").children;for(let c=0;c<size;c++){const d=b[c].children;for(let b=0;b<size;b++){const f=d[b].classList.contains("table-primary"),g=d[b].classList.contains("table-secondary"),e=meiro[c][b];e>0&&(f||g)&&(a[e-1]=d[b].textContent)}}return a}function findMeiroIndex(a){for(let b=0;b<size;b++)for(let c=0;c<size;c++)if(meiro[b][c]==a)return b*size+c;return-1}function prependIdiomLink(b,c){const a=document.createElement("a");a.textContent=b,a.href="https://www.google.com/search?q="+b+"とは",a.target="_blank",a.rel="noopener noreferer",c?a.className="btn btn-light m-1":a.className="btn btn-secondary m-1",a.role="button",solvedPanel.prepend(a)}function showSolved(c,d){const e=document.getElementById("meiro").children;let b=0,a=0;for(let g=0;g<counter;g++){const f=idioms[b];if(!processed[g])if(c[g]==f[a])a==f.length-1&&(prependIdiomLink(f,!0),score+=f.length,document.getElementById("score").textContent=score),processed[g]=!0;else{prependIdiomLink(f,!1);const b=g-a;for(let a=b;a<b+f.length;a++){processed[a]=!0;const c=findMeiroIndex(a+1),d=e[Math.floor(c/size)].children[c%size];d.className="",d.classList.add("table-secondary")}if(d)break}a==f.length-1?(b+=1,a=1):a+=1}}function showHint(){const a=calcReply();showSolved(a,!0)}function showAnswer(){const b=calcReply();showSolved(b,!1);const c=document.getElementById("meiro").children;for(let a=0;a<size;a++){const b=c[a].children;for(let c=0;c<size;c++)meiro[a][c]>0&&(b[c].className="",b[c].classList.add("table-danger"))}const a=document.getElementById("startButton");a.classList.remove("d-none"),a.textContent="スタート";const d=document.getElementById("answerButton");d.classList.add("d-none")}function _getNeighborText(c,a,b,e){let d=c[a].children[b].textContent;return e==1?meiro[a-1][b]!=0&&(d+=c[a-1].children[b].textContent):e==2?meiro[a+1][b]!=0&&(d+=c[a+1].children[b].textContent):e==3?meiro[a][b-1]!=0&&(d+=c[a].children[b-1].textContent):meiro[a][b+1]!=0&&(d+=c[a].children[b+1].textContent),d}function _setNeighborText(a,b,c,e,d,f){f||(a[b].children[c].textContent=d[0]),e==1?a[b-1].children[c].textContent=d[1]:e==2?a[b+1].children[c].textContent=d[1]:e==3?a[b].children[c-1].textContent=d[1]:a[b].children[c+1].textContent=d[1]}function _generateRandomText(a,b){if(b){{const b=a[0];for(let c=0;c<5;c++)if(a=b+words[getRandomInt(0,words.length)],!includeIdiom(a))return a}}else for(let b=0;b<5;b++){for(let b=0;b<2;b++)a[b]=words[getRandomInt(0,words.length)];if(!includeIdiom(a))return a}return a}function includeIdiom(a){return!!idioms.includes(a.slice(0,2))}function startGame(){while(solvedPanel.firstChild)solvedPanel.removeChild(solvedPanel.firstChild);idioms=getIdioms(),generateGame();const a=document.getElementById("startButton");a.classList.add("d-none"),a.textContent="やり直し";const b=document.getElementById("answerButton");b.classList.remove("d-none")}function isPassableRoute(a,b,c){if(c.length==4)return!0;if(c.length==3)if(a==0||a==size-1||b==0||b==size-1)return!0;return!1}function isPassableNeighbor(a,b,c){if(c.length>=3)return!0;if(c.length==2)if(a==0||a==size-1||b==0||b==size-1)return!0;return!1}function getRoute(a,b,e,d){let c=getNeighborRoutes(a,b);if(!isPassableNeighbor(a,b,c))return!1;if(e==1&&0<=a-d){let e=!0;for(let f=1;f<=d;f++)if(c=getNeighborRoutes(a-f,b),!isPassableRoute(a-f,b,c)){e=!1;break}if(e)return[a-1,b,1]}if(e==2&&a+d<size){let e=!0;for(let f=1;f<=d;f++)if(c=getNeighborRoutes(a+f,b),!isPassableRoute(a+f,b,c)){e=!1;break}if(e)return[a+1,b,2]}if(e==3&&0<=b-d){let e=!0;for(let f=1;f<=d;f++)if(c=getNeighborRoutes(a,b-f),!isPassableRoute(a,b-f,c)){e=!1;break}if(e)return[a,b-1,3]}if(e==4&&b+d<size){let e=!0;for(let f=1;f<=d;f++)if(c=getNeighborRoutes(a,b+f),!isPassableRoute(a,b+f,c)){e=!1;break}if(e)return[a,b+1,4]}return!1}function getNeighborRoutes(a,b){const c=[];return 0<=a-1&&meiro[a-1][b]==0&&c.push([a-1,b,1]),a+1<size&&meiro[a+1][b]==0&&c.push([a+1,b,2]),0<=b-1&&meiro[a][b-1]==0&&c.push([a,b-1,3]),b+1<size&&meiro[a][b+1]==0&&c.push([a,b+1,4]),c}function paint(a,b,d,c){if(d==1){for(let d=0;d<c;d++)counter+=1,meiro[a-d][b]=counter;return[a-c+1,b]}if(d==2){for(let d=0;d<c;d++)counter+=1,meiro[a+d][b]=counter;return[a+c-1,b]}if(d==3){for(let d=0;d<c;d++)counter+=1,meiro[a][b-d]=counter;return[a,b-c+1]}for(let d=0;d<c;d++)counter+=1,meiro[a][b+d]=counter;return[a,b+c-1]}function _p(){let a="";for(let b=0;b<size;b++){for(let c=0;c<size;c++)a+=meiro[b][c];a+="\n"}console.log(a)}function generateGame(){let d=!0;while(d){let a=0,b=getRandomInt(1,size-1),f=!0;counter=0;for(let a=0;a<size;a++){meiro[a]=new Array(size);for(let b=0;b<size;b++)meiro[a][b]=0}let c=getRoute(a,b,-1,idioms[0].length),e=paint(a,b,c[2],idioms[0].length);a=e[0],b=e[1];let g=1;while(f){const h=shuffle(getNeighborRoutes(a,b));if(h.length==0)f=!1;else{let i=!0;for(let j=0;j<h.length;j++)if(c=getRoute(h[j][0],h[j][1],h[j][2],idioms[g].length-2),c){i=!1,paint(h[j][0],h[j][1],h[j][2],1),e=paint(c[0],c[1],c[2],idioms[g].length-2),a=e[0],b=e[1],(a==0||a==size-1||b==0||b==size-1)&&(f=!1,counter>20&&(d=!1,processed=new Array(counter))),g+=1;break}i&&(f=!1)}}}const a=document.getElementById("meiro");while(a.firstChild)a.removeChild(a.firstChild);for(let b=0;b<size;b++){const c=document.createElement("tr");a.appendChild(c);for(let b=0;b<size;b++){const a=document.createElement("td");a.role="button",a.textContent=words[getRandomInt(0,words.length)],c.appendChild(a),a.onclick=()=>{a.classList.toggle("table-primary")}}}const e=a.children;let c=0,b=0;for(let a=1;a<=counter;a++){const d=findMeiroIndex(a),g=idioms[c][b],f=e[Math.floor(d/size)].children[d%size];f.textContent=g,a==1&&f.classList.add("table-secondary"),b==idioms[c].length-1?(c+=1,b=1):b+=1}}function resizeFontSize(a){const b=document.getElementById("masu").offsetWidth,c=1.2,d=remSize*5,e=11,f=(b-d-e)/12/c;a.style.fontSize=f+"px"}function toggleDarkMode(){localStorage.getItem("darkMode")==1?(localStorage.setItem("darkMode",0),delete document.documentElement.dataset.theme):(localStorage.setItem("darkMode",1),document.documentElement.dataset.theme="dark")}function generateSiritoriCandidates(){const a={};for(const[b,c]of Object.entries(siritoriList))if(a[b]){const d=a[b].concat(c);a[b]=d}else a[b]=c;return a}function getIdioms(){const d=generateSiritoriCandidates(),b=Object.keys(d);let c=b[getRandomInt(0,b.length)],a=[],e=!0;while(e){for(let e=0;e<30;e++){const b=d[c];if(b){{let d=!0;for(let f=0;f<5;f++){const e=b[getRandomInt(0,b.length)];if(c=e[e.length-1],!a.includes(e)){a.push(e),d=!1;break}}if(d)break}}else break}a.length==30?e=!1:(c=b[getRandomInt(0,b.length)],a=[])}return a}const meiroObj=document.getElementById("meiro");resizeFontSize(meiroObj),window.addEventListener("resize",()=>{resizeFontSize(meiroObj)}),fetch("siritori.json").then(a=>a.json()).then(a=>{for(siritoriList=a,idioms=getIdioms(),generateGame();solvedPanel.firstChild;)solvedPanel.removeChild(solvedPanel.firstChild);showAnswer()}),document.getElementById("toggleDarkMode").onclick=toggleDarkMode,document.getElementById("startButton").onclick=startGame,document.getElementById("answerButton").onclick=showAnswer,document.getElementById("hintButton").onclick=showHint