const BINS=[{id:'azul',name:'Papel',color:'var(--azul)'},{id:'vermelho',name:'Plástico',color:'var(--vermelho)'},{id:'verde',name:'Vidro',color:'var(--verde)'},{id:'amarelo',name:'Metal',color:'var(--amarelo)'},{id:'marrom',name:'Orgânico',color:'var(--marrom)'}];
const ITEMS=[{name:'Jornal',correct:'azul',emoji:'📰'},{name:'Garrafa PET',correct:'vermelho',emoji:'🧴'},{name:'Pote de vidro',correct:'verde',emoji:'🍾'},{name:'Lata',correct:'amarelo',emoji:'🥫'},{name:'Casca de banana',correct:'marrom',emoji:'🍌'}];

const $=id=>document.getElementById(id);
const state={score:0,streak:0,lives:3,level:1,reward:'Bronze',checkpoint:0,challengeIdx:0,challengeDone:false,current:null,queue:[],dragging:false,offX:0,offY:0};
const CHALLENGES=[
  {text:'Desafio 1: acerte 3 seguidas',check:s=>s.streak>=3,reward:40},
  {text:'Desafio 2: chegue a 120 pontos',check:s=>s.score>=120,reward:80},
  {text:'Desafio 3: finalize com 2 vidas+',check:s=>s.score>=220 && s.lives>=2,reward:120},
];

function renderBins(){ $('bins').innerHTML=''; BINS.forEach(b=>{const el=document.createElement('div');el.className='bin';el.dataset.id=b.id;el.innerHTML=`<div style="height:120px;background:${b.color};border:3px solid #2b2118;border-radius:10px"></div><div class="label">${b.name}</div>`;$('bins').appendChild(el);}); }
function shuffle(){ state.queue=[...ITEMS].sort(()=>Math.random()-0.5); }
function nextItem(){ if(!state.queue.length) shuffle(); state.current=state.queue.pop(); $('item').textContent=state.current.emoji; $('hint').firstChild.nodeValue=`Onde joga ${state.current.name.toLowerCase()}? `; $('itemWrap').style.left='50%'; $('itemWrap').style.top='32%'; }
function setHUD(){ $('score').textContent=state.score; $('streak').textContent=state.streak; $('level').textContent=state.level; $('reward').textContent=state.reward; $('checkpoint').textContent=state.checkpoint; $('hearts').innerHTML='❤️'.repeat(state.lives)+'🖤'.repeat(3-state.lives); $('challenge').textContent=CHALLENGES[state.challengeIdx]?.text ?? 'Todos os desafios concluídos!'; }
function updateLevelReward(){ state.level=Math.floor(state.score/100)+1; state.reward=state.level>=6?'Diamante':state.level>=4?'Ouro':state.level>=2?'Prata':'Bronze'; }
function saveCheckpoint(){ if(state.score>=state.checkpoint+100){ state.checkpoint=state.score; }}
function checkChallenge(){ const ch=CHALLENGES[state.challengeIdx]; if(ch && ch.check(state)){ state.score+=ch.reward; state.challengeIdx++; flash(`DESAFIO CONCLUÍDO +${ch.reward}`);} }
function flash(text){ const el=document.createElement('div');el.className='feedback';el.textContent=text; $('stage').appendChild(el); setTimeout(()=>el.remove(),900); }
function binAt(x,y){return [...document.querySelectorAll('.bin')].find(b=>{const r=b.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom;});}
function onDown(e){ state.dragging=true; const p=point(e),r=$('itemWrap').getBoundingClientRect(); state.offX=p.x-(r.left+r.width/2); state.offY=p.y-(r.top+r.height/2); }
function onMove(e){ if(!state.dragging) return; const p=point(e),s=$('stage').getBoundingClientRect(); $('itemWrap').style.left=(p.x-s.left-state.offX)+'px'; $('itemWrap').style.top=(p.y-s.top-state.offY)+'px'; }
function onUp(e){ if(!state.dragging) return; state.dragging=false; const p=point(e); const b=binAt(p.x,p.y); if(!b){$('itemWrap').style.left='50%';$('itemWrap').style.top='32%'; return;} const ok=b.dataset.id===state.current.correct; if(ok){ state.score+=10+state.streak*2; state.streak++; flash('ACERTOU!'); nextItem(); } else { state.lives--; state.streak=0; flash('ERROU!'); if(state.lives<=0) return gameOver(); }
 updateLevelReward(); saveCheckpoint(); checkChallenge(); setHUD(); }
function point(e){if(e.touches?.length) return {x:e.touches[0].clientX,y:e.touches[0].clientY}; return {x:e.clientX,y:e.clientY};}
function gameOver(){ const m=document.createElement('div'); m.className='modal'; m.innerHTML=`<div class='card'><h2>Fim de jogo</h2><p>Pontos: ${state.score}</p><p>Checkpoint: ${state.checkpoint}</p><button id='again'>Jogar de novo</button></div>`; $('stage').appendChild(m); $('again').onclick=()=>{m.remove(); resetFromCheckpoint();}; }
function resetFromCheckpoint(){ state.score=state.checkpoint; state.streak=0; state.lives=3; updateLevelReward(); setHUD(); nextItem(); }
function restart(){ state.score=0;state.streak=0;state.lives=3;state.level=1;state.reward='Bronze';state.checkpoint=0;state.challengeIdx=0;shuffle();setHUD();nextItem(); }

$('item').addEventListener('mousedown',onDown); window.addEventListener('mousemove',onMove); window.addEventListener('mouseup',onUp);
$('item').addEventListener('touchstart',onDown,{passive:false}); window.addEventListener('touchmove',onMove,{passive:false}); window.addEventListener('touchend',onUp);
$('restart').addEventListener('click',restart);
renderBins(); shuffle(); nextItem(); setHUD();
