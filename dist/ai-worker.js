import {chooseMove} from './engine.js';
self.onmessage=({data})=>{try{self.postMessage({id:data.id,move:chooseMove(data.state,data.level,data.budget)});}catch(error){self.postMessage({id:data.id,error:String(error)});}};
