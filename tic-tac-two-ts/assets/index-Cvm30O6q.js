var de=Object.defineProperty;var _=n=>{throw TypeError(n)};var ce=(n,e,t)=>e in n?de(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var y=(n,e,t)=>ce(n,typeof e!="symbol"?e+"":e,t),$=(n,e,t)=>e.has(n)||_("Cannot "+t);var i=(n,e,t)=>($(n,e,"read from private field"),t?t.call(n):e.get(n)),f=(n,e,t)=>e.has(n)?_("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),a=(n,e,t,s)=>($(n,e,"write to private field"),s?s.call(n,t):e.set(n,t),t),o=(n,e,t)=>($(n,e,"access private method"),t);var K=(n,e,t,s)=>({set _(r){a(n,e,r,t)},get _(){return i(n,e,s)}});(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(r){if(r.ep)return;r.ep=!0;const l=t(r);fetch(r.href,l)}})();let te="Human-Human";function X(){return te}function ee(n){te=n}let Q=!1;function ue(){Q=!0}function V(){Q=!1}function q(){return Q}let G;function me(n){G=n}function Y(n,e=null){if(!G){console.error("Game message element is not set!");return}G.innerHTML=n,G.style.display="block",e&&setTimeout(()=>{G.style.display="none"},e)}var N,C,A,x,I,ie,U;class fe{constructor(e,t,s){f(this,I);f(this,N);f(this,C);f(this,A);f(this,x);y(this,"cells");y(this,"gameMode");y(this,"ai");y(this,"winningMaster");a(this,C,""),this.cells=e.children,a(this,A,4),a(this,x,4),this.gameMode=X(),this.ai=null,this.winningMaster=t,a(this,N,s)}setAI(e){this.ai=e}setGameMode(){this.gameMode=X()}makeMove(e){let t=this.getNextMove();if(o(this,I,ie).call(this,t)===!0){alert(`${t} you cannot do this move`);return}this.cells[e].textContent===""&&(this.cells[e].textContent=t,this.setNextMove(),this.reduceMoves(t),this.alertWinner(),o(this,I,U).call(this,t))}changeMove(e,t){let s=this.getNextMove();this.cells[e].textContent===s&&this.cells[t].textContent===""&&this.checkPlayerCount(s)?(this.cells[e].textContent="",this.cells[t].textContent=s,this.setNextMove(),this.alertWinner(),o(this,I,U).call(this,s)):alert(`${s} you cannot do this move`)}reduceMoves(e){e==="X"?K(this,A)._--:K(this,x)._--}checkPlayerCount(e){return e==="X"?i(this,A)<3:i(this,x)<3}getNextMove(){return i(this,C)===""||i(this,C)==="O"?"X":"O"}setNextMove(){i(this,C)===""||i(this,C)==="O"?a(this,C,"X"):a(this,C,"O")}alertWinner(){let e=this.winningMaster.checkWinner();e!==null&&(V(),setTimeout(()=>{Y("Game over! Winner: "+e),i(this,N).stopTheTimer()},100))}resetGame(){a(this,C,""),a(this,A,4),a(this,x,4),this.ai!==null&&this.ai.resetFields()}}N=new WeakMap,C=new WeakMap,A=new WeakMap,x=new WeakMap,I=new WeakSet,ie=function(e){return e==="X"?i(this,A)===0:i(this,x)===0},U=function(e){this.gameMode==="Human-AI"&&e==="X"&&this.ai&&this.ai.move()};var h,m,v,E;class Me{constructor(e){f(this,h);f(this,m);f(this,v);f(this,E);a(this,h,6),a(this,m,5),this.handleMovement=this.handleMovement.bind(this),a(this,v,e),a(this,E,null)}setAI(e){a(this,E,e)}highlightBoard(){document.querySelectorAll(".cell").forEach(t=>t.classList.remove("highlight")),[i(this,h),i(this,h)+1,i(this,h)+2,i(this,h)+i(this,m),i(this,h)+i(this,m)+1,i(this,h)+i(this,m)+2,i(this,h)+2*i(this,m),i(this,h)+2*i(this,m)+1,i(this,h)+2*i(this,m)+2].forEach(t=>{let s=document.querySelector(`.cell[data-index="${t}"]`);s&&s.classList.add("highlight")})}handleMovement(e){if(!i(this,v).checkPlayerCount(i(this,v).getNextMove())){alert(`${i(this,v).getNextMove()} you cannot do this move`);return}if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)&&e.preventDefault(),this.checkKeyEvent(e.key)===!1){alert(`${i(this,v).getNextMove()} you cannot do this move`);return}switch(e.key){case"ArrowUp":a(this,h,i(this,h)-i(this,m));break;case"ArrowDown":a(this,h,i(this,h)+i(this,m));break;case"ArrowLeft":a(this,h,i(this,h)-1);break;case"ArrowRight":a(this,h,i(this,h)+1);break}this.highlightBoard(),i(this,v).gameMode==="Human-AI"&&i(this,v).getNextMove()==="X"&&i(this,E)&&i(this,E).move(),i(this,v).setNextMove(),i(this,v).alertWinner()}clearTheBoard(){a(this,h,6),this.highlightBoard();let e=document.getElementsByClassName("cell");Array.from(e).forEach(t=>{t.textContent=""})}checkKeyEvent(e){switch(e){case"ArrowUp":if(i(this,h)>=i(this,m))return!0;break;case"ArrowDown":if(i(this,h)+2*i(this,m)+i(this,m)<25)return!0;break;case"ArrowLeft":if(i(this,h)%i(this,m)!==0)return!0;break;case"ArrowRight":if((i(this,h)+2)%i(this,m)!==i(this,m)-1)return!0;break}return!1}}h=new WeakMap,m=new WeakMap,v=new WeakMap,E=new WeakMap;var p,B,b,M,ne,re,F,z,le;class se{constructor(e,t,s){f(this,M);y(this,"aiMoveCount");f(this,p);f(this,B);f(this,b);y(this,"aiCellsArray");a(this,p,e),a(this,B,t),this.aiCellsArray=[],a(this,b,s),this.aiMoveCount=0}move(){if(!q())return;const e=s=>{setTimeout(()=>{s(),i(this,p).alertWinner()},500)};if(this.aiMoveCount<4){e(()=>o(this,M,ne).call(this));return}const t=i(this,b).findWinningMove("O")||i(this,b).findWinningMove("X");e(t?()=>o(this,M,z).call(this):Math.random()<.5?()=>o(this,M,z).call(this):()=>o(this,M,le).call(this))}resetFields(){this.aiCellsArray=[],this.aiMoveCount=0}}p=new WeakMap,B=new WeakMap,b=new WeakMap,M=new WeakSet,ne=function(){if(this.aiMoveCount>=4){console.log("AI shold not do this move");return}let e=o(this,M,F).call(this);i(this,p).cells[e].textContent="O",i(this,p).setNextMove(),i(this,p).reduceMoves("O"),this.aiMoveCount++,this.aiCellsArray.push(e)},re=function(){let e=Math.floor(Math.random()*24);for(;i(this,p).cells[e].textContent!=="";)e=Math.floor(Math.random()*24);return e},F=function(){return i(this,b).findWinningMove("O")||i(this,b).findWinningMove("X")||o(this,M,re).call(this)},z=function(){if(this.aiCellsArray.length===0)return;let e=o(this,M,F).call(this),t=Math.floor(Math.random()*this.aiCellsArray.length),s=this.aiCellsArray[t];i(this,p).cells[s].textContent="",i(this,p).cells[e].textContent="O",this.aiCellsArray.splice(t,1),this.aiCellsArray.push(e),i(this,p).setNextMove()},le=function(){const e=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];let t=e[Math.floor(Math.random()*e.length)];for(;!i(this,B).checkKeyEvent(t);)t=e[Math.floor(Math.random()*e.length)];i(this,B).handleMovement(new KeyboardEvent("keydown",{key:t}))};var W,u,O,j,J,ae,oe,he;class ge{constructor(e){f(this,u);f(this,W);a(this,W,e.children)}checkWinner(){return o(this,u,J).call(this,!1)||o(this,u,J).call(this,!0)||o(this,u,ae).call(this)||null}findWinningMove(e){let t=null;for(let s=0;s<3;s++)if(t=o(this,u,O).call(this,[s*3,s*3+1,s*3+2],e),t!==null)return t;for(let s=0;s<3;s++)if(t=o(this,u,O).call(this,[s,s+3,s+6],e),t!==null)return t;return t=o(this,u,O).call(this,[0,4,8],e),t!==null||(t=o(this,u,O).call(this,[2,4,6],e),t!==null)?t:null}}W=new WeakMap,u=new WeakSet,O=function(e,t){let s=o(this,u,he).call(this),r=i(this,W),l=0,c=null;for(let d of e){let g=s[d];r[g].textContent===t?l++:r[g].textContent===""&&(c=g)}return l===2&&c!==null?c:null},j=function(e){let t=o(this,u,oe).call(this);for(let s of e){let r=0,l=0;for(let c of s){let d=t[c].textContent;if(d==="X"?(r++,l=0):d==="O"?(l++,r=0):(r=0,l=0),r===3)return"X";if(l===3)return"O"}}return null},J=function(e){let t=[];for(let s=0;s<3;s++){let r=[];for(let l=0;l<3;l++)r.push(e?s*3+l:l*3+s);t.push(r)}return o(this,u,j).call(this,t)},ae=function(){return o(this,u,j).call(this,[[0,4,8],[2,4,6]])},oe=function(){return document.getElementsByClassName("highlight")},he=function(){let e=document.getElementsByClassName("highlight");return Array.from(e).map(s=>parseInt(s.dataset.index))};function ve(n,e){let t=document.createElement("div");t.classList.add("container","board");let s=new ge(t),r=new fe(t,s,e),l=new Me(r);if(n==="Human-AI"){let d=new se(r,l,s);l.setAI(d),r.setAI(d)}let c=null;for(let d=0;d<25;d++){let g=document.createElement("div");g.classList.add("cell"),g.dataset.index=d.toString(),g.addEventListener("click",()=>{if(!q()){alert("Please reset and start the game!");return}if(c===null)g.textContent===""?r.makeMove(d):(c=d,g.classList.add("selected"));else{let T=d;r.changeMove(c,T),document.querySelectorAll(".selected").forEach(w=>w.classList.remove("selected")),c=null}}),t.appendChild(g)}return document.body.appendChild(t),l.highlightBoard(),document.addEventListener("keydown",d=>{if(!q()){alert("Please reset and start the game!");return}l.handleMovement(d)}),{board:t,gameMaster:r,boardMaster:l}}function pe(n,e){n.resetGame(),e.clearTheBoard()}class ye{constructor(e){y(this,"sec");y(this,"intervalId");y(this,"initialSec");y(this,"timerDisplay",null);this.sec=e,this.intervalId=null,this.initialSec=e}startTheTimer(){if(this.timerDisplay=document.getElementById("timerDisplay"),!this.timerDisplay){console.error("Timer display element not found!");return}this.intervalId===null&&(this.intervalId=setInterval(()=>{if(this.sec<=0){this.stopTheTimer(),this.timerDisplay.innerHTML="Time's up!",V(),Y("Game over! Time's up!");return}this.timerDisplay.innerHTML=`00:${this.sec<10?"0":""}${this.sec}`,this.sec--},1e3))}stopTheTimer(e=null){this.timerDisplay.innerHTML="01:00",this.intervalId!==null&&(clearInterval(this.intervalId),this.intervalId=null),e!==null&&(this.sec=this.initialSec)}}function Ce(){let n=document.createElement("h1");n.innerHTML="Tic Tac Two",document.body.appendChild(n);let e=document.createElement("div");e.classList.add("flex-container"),document.body.appendChild(e);let t=document.createElement("div");t.classList.add("game-message"),e.appendChild(t),me(t);let s=document.createElement("div");s.classList.add("button-wrapper"),e.appendChild(s);let r=document.createElement("div");r.classList.add("start-button-wrapper"),s.appendChild(r);let l=document.createElement("button");l.innerHTML="Reset game",l.classList.add("reset-game-button"),r.appendChild(l);let c=document.createElement("button");c.innerHTML="Start game",c.classList.add("start-game-button"),r.appendChild(c);let d=document.createElement("div");d.classList.add("mode-button-wrapper"),s.appendChild(d);let g=document.createElement("label");g.innerHTML="Select game mode: ",d.appendChild(g);let T=document.createElement("div");T.classList.add("mode-button-container"),d.appendChild(T);let w=document.createElement("button");w.innerHTML="Human-Human",w.classList.add("game-mode-button","selected"),T.appendChild(w);let k=document.createElement("button");k.innerHTML="Human-AI",k.classList.add("game-mode-button"),T.appendChild(k),w.addEventListener("click",()=>{ee("Human-Human"),w.classList.add("selected"),k.classList.remove("selected")}),k.addEventListener("click",()=>{ee("Human-AI"),k.classList.add("selected"),w.classList.remove("selected")});let S=new ye(59),D=document.createElement("div");D.id="timerDisplay",D.innerHTML="01:00",D.classList.add("timer-style"),s.appendChild(D);let P,L=null,H=null,R=!1;c.addEventListener("click",()=>{if(!P)({board:P,gameMaster:L,boardMaster:H}=ve(X(),S)),e.appendChild(P);else if(!R){alert("Please press 'Reset game' before starting!");return}if(L&&H&&(L.setGameMode(),X()==="Human-AI"&&L.ai===null)){let Z=new se(L,H,L.winningMaster);H.setAI(Z),L.setAI(Z)}ue(),S.startTheTimer(),R=!1,Y("Game starts",2e3)}),l.addEventListener("click",()=>{!L||!H||(V(),S.stopTheTimer(59),pe(L,H),R=!0,t.style.display="none")})}document.addEventListener("DOMContentLoaded",()=>{Ce()});
