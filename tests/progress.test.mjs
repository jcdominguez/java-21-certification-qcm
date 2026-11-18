import test from 'node:test';
import assert from 'node:assert/strict';
import {questions,topics} from '../bank.js';
import {newSession,selectQuestions} from '../core.js';
import {restoreTreated,treatedQuestionIds} from '../progress.js';
const ids=questions.map(q=>q.id);

test('entraînement : les questions traitées sont exclues, même incorrectes',()=>{
 const treated=ids.slice(0,15);
 for(let i=0;i<20;i++) {
  const selected=selectQuestions({mode:'training',count:50,treated});
  assert.equal(selected.length,50);
  assert.ok(selected.every(q=>!treated.includes(q.id)));
 }
 const remaining=questions.filter(q=>q.topic==='values').slice(-2);
 const selected=selectQuestions({mode:'training',themeIds:['values'],count:20,treated:ids.filter(id=>!remaining.some(q=>q.id===id))});
 assert.deepEqual(new Set(selected.map(q=>q.id)),new Set(remaining.map(q=>q.id)));
 assert.deepEqual(selectQuestions({mode:'training',treated:ids}),[]);
});

test('les erreurs restent révisables volontairement malgré leur traitement',()=>{
 const errors=ids.slice(0,3);
 assert.deepEqual(new Set(selectQuestions({mode:'training',treated:ids,errors}).map(q=>q.id)),new Set(errors));
 assert.deepEqual(selectQuestions({mode:'training',treated:ids,errors:[]}),[]);
});

test('examen : priorité aux inédites dans chaque thème et quotas conservés',()=>{
 const fresh=topics.flatMap(t=>questions.filter(q=>q.topic===t.id).slice(0,t.exam));
 const treated=ids.filter(id=>!fresh.some(q=>q.id===id));
 for(let i=0;i<20;i++) assert.deepEqual(new Set(selectQuestions({mode:'exam',treated}).map(q=>q.id)),new Set(fresh.map(q=>q.id)));
 const allTreated=selectQuestions({mode:'exam',treated:ids});
 assert.equal(allTreated.length,50);
 for(const t of topics)assert.equal(allTreated.filter(q=>q.topic===t.id).length,t.exam);
 const oneFresh=questions.find(q=>q.topic==='objects');
 const selected=selectQuestions({mode:'exam',treated:ids.filter(id=>id!==oneFresh.id)});
 assert.ok(selected.some(q=>q.id===oneFresh.id));
});

test('une consultation ou une réponse non remise ne suffit pas ; validation ou remise suffit',()=>{
 const session=newSession(questions.slice(0,3),'training');
 session.answers[session.ids[0]]=['0'];
 assert.deepEqual(treatedQuestionIds(session),[]);
 session.validated=[session.ids[0]];
 assert.deepEqual(treatedQuestionIds(session),[session.ids[0]]);
 session.answers[session.ids[1]]=['1'];
 session.finishedAt=Date.now();
 assert.deepEqual(treatedQuestionIds(session),session.ids.slice(0,2));
 const exam=newSession(questions.slice(0,2),'exam');
 exam.answers[exam.ids[0]]=['0'];
 assert.deepEqual(treatedQuestionIds(exam),[]);
 exam.finishedAt=Date.now();
 assert.deepEqual(treatedQuestionIds(exam),[exam.ids[0]]);
});

test('migration : bilans existants, validations de session et anciennes erreurs récupérés',()=>{
 const finished=newSession(questions.slice(0,3),'training');
 finished.answers[finished.ids[0]]=['0'];finished.finishedAt=Date.now();
 const active=newSession(questions.slice(3,5),'training');active.validated=[active.ids[0]];
 const saved={session:active,history:[finished],errors:[ids[8]]};
 assert.deepEqual(new Set(restoreTreated(saved,ids)),new Set([ids[0],ids[3],ids[8]]));
});

test('le suivi demeure sans bilans, et un nouveau cycle vide ne réimporte pas les anciens bilans',()=>{
 const old=newSession(questions.slice(0,1),'training');old.validated=[ids[0]];old.finishedAt=Date.now();
 assert.deepEqual(restoreTreated({session:null,history:[],errors:[],treated:[ids[0]]},ids),[ids[0]]);
 assert.deepEqual(restoreTreated({session:null,history:[old],errors:[ids[0]],treated:[]},ids),[]);
 assert.throws(()=>restoreTreated({treated:['inconnue']},ids));
});
