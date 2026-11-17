import {questions, topics} from './bank.js';
export const VERSION=1;
export function shuffle(xs, random=Math.random){const a=[...xs];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function isCorrect(q,answer=[]){const keys=q.options.filter(o=>o.correct).map(o=>o.id);return answer.length===keys.length && new Set(answer).size===keys.length && keys.every(k=>answer.includes(k));}
export function selectQuestions({mode,themeIds=topics.map(t=>t.id),count=20,errors=null},random=Math.random){
 if(mode==='exam') return shuffle(topics.flatMap(t=>shuffle(questions.filter(q=>q.topic===t.id),random).slice(0,t.exam)),random);
 const pool=questions.filter(q=>themeIds.includes(q.topic)&&(!errors||errors.includes(q.id)));
 return shuffle(pool,random).slice(0,count);
}
export function newSession(selected,mode,now=Date.now()) {return {version:VERSION,id:globalThis.crypto.randomUUID(),mode,ids:selected.map(q=>q.id),answers:{},validated:[],flags:[],index:0,startedAt:now,deadline:mode==='exam'?now+120*60*1000:null,finishedAt:null};}
export function result(session){const selected=session.ids.map(id=>questions.find(q=>q.id===id));const correct=selected.filter(q=>isCorrect(q,session.answers[q.id])).length;return {correct,total:selected.length,percent:Math.round(correct/selected.length*100),passed:correct/selected.length>=.68,byTopic:topics.map(t=>{const qs=selected.filter(q=>q.topic===t.id);return {id:t.id,name:t.name,total:qs.length,correct:qs.filter(q=>isCorrect(q,session.answers[q.id])).length};}).filter(t=>t.total)};}
export function validSession(s){return !!s&&s.version===VERSION&&typeof s.id==='string'&&['exam','training'].includes(s.mode)&&Array.isArray(s.ids)&&s.ids.length>0&&s.ids.length<=50&&new Set(s.ids).size===s.ids.length&&s.ids.every(id=>questions.some(q=>q.id===id))&&Number.isInteger(s.index)&&s.index>=0&&s.index<s.ids.length&&!!s.answers&&typeof s.answers==='object'&&Object.entries(s.answers).every(([id,a])=>s.ids.includes(id)&&Array.isArray(a)&&new Set(a).size===a.length&&a.every(v=>questions.find(q=>q.id===id).options.some(o=>o.id===v)))&&['validated','flags'].every(k=>Array.isArray(s[k])&&s[k].every(id=>s.ids.includes(id)))&&Number.isFinite(s.startedAt)&&(s.finishedAt===null||Number.isFinite(s.finishedAt))&&(s.mode==='exam'?Number.isFinite(s.deadline)&&s.deadline===s.startedAt+7200000:s.deadline===null);}
export function remaining(s,now=Date.now()){return Math.max(0,Math.ceil((s.deadline-now)/1000));}
