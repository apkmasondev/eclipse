// ECLIPSE: 8x8 draughts with flying kings, compulsory captures and shifting gates.
export const WHITE=1, BLACK=-1;
const dirs=[[-1,-1],[-1,1],[1,-1],[1,1]];
const pairs=[[26,37],[28,35],[19,44],[21,42]];
export const coord=i=>'ABCDEFGH'[i%8]+(8-Math.floor(i/8));
export const portalPair=s=>s.variant==='eclipse'?pairs[Math.floor(s.ply/8)%pairs.length]:[];
export const positionKey=s=>s.board.join(',')+'|'+s.turn+'|'+(s.variant==='eclipse'?s.ply%32:0);
export function initialState(variant='eclipse'){
 const board=Array(64).fill(0);for(let i=0;i<64;i++){const r=i>>3,c=i%8;if((r+c)%2===1)board[i]=r<3?-1:r>4?1:0;}
 const s={board,turn:1,ply:0,variant,quiet:0,seen:{}};s.seen[positionKey(s)]=1;return s;
}
const inside=(r,c)=>r>=0&&r<8&&c>=0&&c<8;
function gate(board,from,land,capture,pair){
 const next=board.slice(),piece=next[from];next[from]=0;if(capture!==null)next[capture]=0;
 const exit=pair.includes(land)?pair.find(i=>i!==land):undefined;
 const to=exit!==undefined&&!next[exit]?exit:land;next[to]=piece;
 return {board:next,step:{from,land,to,capture,portal:to!==land}};
}
function captureSteps(board,from,pair){
 const p=board[from],r=from>>3,c=from%8,out=[];
 for(const [dr,dc] of dirs){
  let rr=r+dr,cc=c+dc;
  if(Math.abs(p)===1){if(!inside(rr+dr,cc+dc)||!inside(rr,cc))continue;const cap=rr*8+cc,land=(rr+dr)*8+cc+dc;if(board[cap]*p<0&&!board[land])out.push(gate(board,from,land,cap,pair));}
  else{let cap=null;while(inside(rr,cc)){const i=rr*8+cc;if(board[i]){if(board[i]*p>0||cap!==null)break;cap=i;}else if(cap!==null)out.push(gate(board,from,i,cap,pair));rr+=dr;cc+=dc;}}
 }
 return out;
}
export function legalTurns(s){
 const captures=[],moves=[],pair=portalPair(s);
 function walk(board,from,steps,origin){const next=captureSteps(board,from,pair);if(!next.length){captures.push({from:origin,steps,captures:steps.length});return;}for(const n of next)walk(n.board,n.step.to,[...steps,n.step],origin);}
 for(let i=0;i<64;i++)if(s.board[i]*s.turn>0){const first=captureSteps(s.board,i,pair);for(const n of first)walk(n.board,n.step.to,[n.step],i);}
 if(captures.length)return captures;
 for(let i=0;i<64;i++)if(s.board[i]*s.turn>0){const p=s.board[i],r=i>>3,c=i%8;
  for(const [dr,dc] of dirs){if(Math.abs(p)===1&&dr!==-s.turn)continue;let rr=r+dr,cc=c+dc;while(inside(rr,cc)&&!s.board[rr*8+cc]){const n=gate(s.board,i,rr*8+cc,null,pair);moves.push({from:i,steps:[n.step],captures:0});if(Math.abs(p)===1)break;rr+=dr;cc+=dc;}}
 }
 return moves;
}
export function stepBoard(board,step){const next=board.slice(),p=next[step.from];next[step.from]=0;if(step.capture!==null)next[step.capture]=0;next[step.to]=p;return next;}
export function applyTurn(s,move){
 let board=s.board.slice();for(const step of move.steps)board=stepBoard(board,step);
 const last=move.steps.at(-1).to,p=board[last],promoted=Math.abs(p)===1&&((p===1&&last<8)||(p===-1&&last>=56));if(promoted)board[last]=p*2;
 const next={...s,board,turn:-s.turn,ply:s.ply+1,quiet:move.captures||promoted?0:s.quiet+1,seen:{...s.seen}};
 const key=positionKey(next);next.seen[key]=(next.seen[key]||0)+1;return next;
}
export function outcome(s){if(!legalTurns(s).length)return {winner:-s.turn,reason:s.board.some(p=>p*s.turn>0)?'Brak dozwolonych ruchów.':'Wszystkie piony zostały zbite.'};if(s.quiet>=80)return {winner:0,reason:'40 rund bez bicia ani awansu.'};if(s.seen[positionKey(s)]>=3)return {winner:0,reason:'Ta sama pozycja pojawiła się trzykrotnie.'};return null;}
export function notation(move){return coord(move.from)+move.steps.map(t=>(t.capture!==null?' × ':' – ')+coord(t.land)+(t.portal?' ◇ '+coord(t.to):'')).join('');}
function evaluate(s){let score=0;for(let i=0;i<64;i++){const p=s.board[i];if(!p)continue;const side=Math.sign(p),r=i>>3,c=i%8;score+=side*(Math.abs(p)===2?310:100+(side===1?7-r:r)*5)+(3.5-Math.abs(c-3.5))*side*3;}return score;}
export function chooseMove(s,level='normal',budget=850){
 const moves=legalTurns(s);if(!moves.length)return null;if(level==='easy')return moves[Math.floor(Math.random()*moves.length)];
 const end=Date.now()+budget;let best=moves[0];const limit=level==='hard'?6:4;
 const ordered=ms=>ms.sort((a,b)=>b.captures-a.captures);
 function search(state,depth,alpha,beta){if(Date.now()>end)throw new Error('budget');const ms=legalTurns(state);if(!ms.length)return -state.turn*(100000+depth);if(state.quiet>=80||state.seen[positionKey(state)]>=3)return 0;if(!depth)return evaluate(state);
  let v=state.turn===1?-Infinity:Infinity;for(const m of ordered(ms)){const n=search(applyTurn(state,m),depth-1,alpha,beta);if(state.turn===1){v=Math.max(v,n);alpha=Math.max(alpha,v);}else{v=Math.min(v,n);beta=Math.min(beta,v);}if(beta<=alpha)break;}return v;}
 for(let depth=1;depth<=limit;depth++){try{let val=-Infinity,candidate=best;for(const m of ordered([...moves])){const v=search(applyTurn(s,m),depth-1,-Infinity,Infinity)*s.turn;if(v>val){val=v;candidate=m;}}best=candidate;}catch{break;}}
 return best;
}
