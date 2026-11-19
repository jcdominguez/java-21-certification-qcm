import test from 'node:test';
import assert from 'node:assert/strict';
import {questions} from '../bank.js';
import {memos, memoGroups, questionMemoIds} from '../memos.js';
import {canReadMemo, memoLink} from '../memo-link.js';

test('toutes les questions ont une fiche existante, sans correspondance orpheline', () => {
  const memoIds = new Set(memos.map(m => m.id));
  assert.equal(memoIds.size, memos.length);
  assert.deepEqual(Object.keys(questionMemoIds).sort(), questions.map(q => q.id).sort());
  for (const q of questions) {
    assert.ok(memoIds.has(q.memoId), q.id);
    assert.equal(q.memoId, questionMemoIds[q.id]);
  }
});

test('fiches complètes, sources officielles Java 21 et renvois valides', () => {
  assert.equal(memoGroups.length, 11);
  assert.equal(new Set(memoGroups.map(g => g.id)).size, memoGroups.length);
  for (const group of memoGroups) assert.ok(memos.some(m => m.group === group.id), group.id);
  for (const m of memos) {
    assert.match(m.id, /^[a-z0-9-]+$/);
    assert.ok(memoGroups.some(g => g.id === m.group), m.id);
    for (const field of ['title', 'code', 'explanation']) assert.ok(m[field]?.trim(), `${m.id}: ${field}`);
    for (const field of ['rules', 'method', 'pitfalls']) assert.ok(m[field].length && m[field].every(s => s.trim()), `${m.id}: ${field}`);
    assert.ok(m.sources.length, m.id);
    for (const source of m.sources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, 'https:');
      assert.equal(url.hostname, 'docs.oracle.com');
      assert.match(url.pathname, /(?:\/21\/|\/se21\/)/);
    }
    assert.equal(new Set(m.related).size, m.related.length);
    for (const id of m.related) assert.ok(id !== m.id && memos.some(other => other.id === id), `${m.id} -> ${id}`);
    assert.ok(m.language === 'sh' || m.check, `${m.id}: exemple vérifiable`);
    for (const t of m.tables || []) {
      assert.ok(t.title?.trim() && t.head.length && t.rows.length, `${m.id}: tableau`);
      for (const row of t.rows) assert.equal(row.length, t.head.length, `${m.id}: ${t.title}`);
      for (const i of t.codeColumns || []) assert.ok(i >= 0 && i < t.head.length, `${m.id}: ${t.title}`);
    }
  }
});

test('les fiches ne reproduisent pas les fragments des questions', () => {
  const compact = code => code.replace(/\s+/g, '');
  for (const q of questions.filter(q => q.code)) {
    const memo = memos.find(m => m.id === q.memoId);
    assert.notEqual(compact(memo.code), compact(q.code), q.id);
  }
});

test('accès aux mémos en entraînement et dans les corrigés, jamais pendant un examen actif', () => {
  const q = questions[0];
  const exam = {mode:'exam', finishedAt:null};
  const training = {mode:'training', finishedAt:null};
  assert.equal(canReadMemo(exam), false);
  assert.equal(memoLink(q, exam), '');
  assert.equal(canReadMemo(training), true);
  assert.equal(canReadMemo(exam, true), true);
  assert.equal(canReadMemo({...exam, finishedAt:1000}), true);
  for (const [session, review] of [[training, false], [exam, true], [{...exam, finishedAt:1000}, false]]) {
    const html = memoLink(q, session, review);
    assert.ok(html.includes(`memo.html?id=${q.memoId}`));
    assert.ok(html.includes('target="_blank"'));
    assert.ok(html.includes('rel="noopener"'));
  }
});
