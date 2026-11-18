import {memos, memoGroups} from './memos.js';

const main = document.querySelector('main');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const href = memo => `memo.html?id=${encodeURIComponent(memo.id)}`;
const list = (items, ordered = false) => `<${ordered ? 'ol' : 'ul'}>${items.map(text => `<li>${esc(text)}</li>`).join('')}</${ordered ? 'ol' : 'ul'}>`;
const params = new URLSearchParams(location.search);

function renderIndex() {
  document.title = 'Sommaire des fiches mémo — Java SE 21';
  main.innerHTML = `<section class="hero memo-hero"><h1>Fiches mémo</h1><p class="intro">${memos.length} fiches de révision, classées selon les thèmes du programme officiel Java SE 21.</p><a href="./">← Retour au QCM</a></section>
    <nav class="memo-topics" aria-label="Thèmes du programme">${memoGroups.map((g, i) => `<a href="#theme-${g.id}"><span>${i < 10 ? String(i + 1).padStart(2, '0') : '+'}</span> ${esc(g.label)}</a>`).join('')}</nav>
    <div class="memo-index">${memoGroups.map((g, i) => `<section class="card memo-group" id="theme-${g.id}" aria-labelledby="title-${g.id}"><span class="number">${i < 10 ? `THÈME ${String(i + 1).padStart(2, '0')}` : 'COMPÉTENCES COMPLÉMENTAIRES'}</span><h2 id="title-${g.id}">${esc(g.name)}</h2><p class="muted">${esc(g.label)}</p><ul>${memos.filter(m => m.group === g.id).map(m => `<li><a href="${href(m)}">${esc(m.title)} <span aria-hidden="true">→</span></a></li>`).join('')}</ul></section>`).join('')}</div>`;
  // Les sections sont créées après le chargement : restaurer la cible du fragment.
  const target = document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView();
}

function renderMemo(id) {
  const memo = memos.find(m => m.id === id);
  if (!memo) {
    document.title = 'Fiche introuvable — Java SE 21';
    main.innerHTML = '<section class="hero"><h1>Fiche introuvable</h1><p class="intro">Ce lien ne correspond à aucune fiche mémo.</p><a href="memo.html">← Sommaire des fiches mémo</a></section>';
    return;
  }
  const group = memoGroups.find(g => g.id === memo.group);
  const position = memos.indexOf(memo);
  const related = memo.related.map(id => memos.find(m => m.id === id));
  document.title = `${memo.title} — Mémo Java SE 21`;
  const context = memo.language === 'sh'
    ? '<p class="muted">Commandes du JDK 21 à exécuter dans un terminal, avec les fichiers décrits ci-dessous.</p>'
    : memo.check?.kind === 'module'
      ? '<p class="muted">Exemple de descripteur module-info.java ; les fichiers des packages nécessaires sont précisés sous le code.</p>'
      : '<details class="memo-context"><summary>Contexte du fragment Java 21</summary><p>À placer dans une méthode <code>public static void main(String[] args) throws Exception</code>, dans une classe ordinaire, avec les imports suivants. Les imports inutilisés peuvent être omis.</p><pre><code>import java.util.*;\nimport java.util.stream.*;\nimport java.util.concurrent.*;\nimport java.util.concurrent.atomic.*;\nimport java.time.*;\nimport java.time.format.*;\nimport java.nio.file.*;\nimport java.text.*;</code></pre></details>';
  main.innerHTML = `<nav class="session-bar" aria-label="Navigation de la fiche"><a href="memo.html#theme-${group.id}">← Sommaire des fiches mémo</a><a href="./">Retour au QCM</a></nav>
    <article class="card memo-sheet"><p class="eyebrow">${esc(group.name)}</p><h1>${esc(memo.title)}</h1>
      ${memo.cheatsheet ? `<aside class="memo-cheatsheet" aria-labelledby="cheatsheet"><h2 id="cheatsheet">${esc(memo.cheatsheet.title)}</h2><table><thead><tr>${memo.cheatsheet.head.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${memo.cheatsheet.rows.map(([action, param]) => `<tr><td>${esc(action)}</td><td><code>${esc(param)}</code></td></tr>`).join('')}</tbody></table><p>${esc(memo.cheatsheet.legend)}</p><pre tabindex="0" aria-label="Types acceptés par extends et par super, à partir de Number"><code>${esc(memo.cheatsheet.diagram)}</code></pre>${list(memo.cheatsheet.notes)}</aside>` : ''}
      <section aria-labelledby="rule"><h2 id="rule">Règle essentielle</h2>${list(memo.rules)}${memo.hierarchy ? `<figure class="memo-hierarchy"><figcaption>Arborescence des principales classes</figcaption><pre tabindex="0" aria-label="Hiérarchie des exceptions, de la superclasse vers ses sous-classes"><code>${esc(memo.hierarchy)}</code></pre></figure>` : ''}</section>
      <section aria-labelledby="method"><h2 id="method">Méthode de raisonnement</h2>${list(memo.method, true)}</section>
      <section aria-labelledby="example"><h2 id="example">Exemple commenté</h2>${context}${[{title: memo.exampleTitle, code: memo.code, explanation: memo.explanation}, ...(memo.additionalExamples || [])].map(example => `${example.title ? `<h3>${esc(example.title)}</h3>` : ''}<div class="code-label">${memo.language === 'sh' ? 'TERMINAL · JDK 21' : 'JAVA 21'}</div><pre><code>${esc(example.code)}</code></pre><p>${esc(example.explanation)}</p>`).join('')}</section>
      <section aria-labelledby="pitfalls"><h2 id="pitfalls">Pièges</h2>${list(memo.pitfalls)}</section>
      <section aria-labelledby="sources"><h2 id="sources">Sources officielles</h2><ul>${memo.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)} ↗</a></li>`).join('')}</ul></section>
      ${related.length ? `<nav class="memo-related" aria-label="Fiches liées"><h2>Fiches liées</h2>${listRelated(related)}</nav>` : ''}
    </article>
    <nav class="memo-pagination" aria-label="Parcourir les fiches">${position > 0 ? `<a href="${href(memos[position - 1])}">← ${esc(memos[position - 1].title)}</a>` : '<span></span>'}${position < memos.length - 1 ? `<a href="${href(memos[position + 1])}">${esc(memos[position + 1].title)} →</a>` : ''}</nav>`;
}

function listRelated(related) {
  return `<ul>${related.map(m => `<li><a href="${href(m)}">${esc(m.title)}</a></li>`).join('')}</ul>`;
}

if (params.has('id')) renderMemo(params.get('id'));
else renderIndex();
