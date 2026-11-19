import {memos} from '../memos.js';
import {mkdtempSync, mkdirSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, dirname} from 'node:path';
import {spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';

const dir = mkdtempSync(join(tmpdir(), 'java21-memos-check-'));
function run(command, args, cwd = dir, timeout = 30000) {
  const result = spawnSync(command, args, {cwd, encoding:'utf8', timeout});
  if (result.status !== 0) throw Error(`${command} a échoué\n${result.error || ''}\n${result.stderr}`);
  return result.stdout;
}
assert.match(run('javac', ['-version']).trim(), /^javac 21\./, 'Utiliser le JDK 21 pour cette vérification.');
const imports = 'import java.util.*; import java.util.stream.*; import java.util.concurrent.*; import java.util.concurrent.atomic.*; import java.time.*; import java.time.format.*; import java.nio.file.*; import java.text.*;';
const examples = memos.flatMap(m => [m, ...(m.additionalExamples || []).map((example, i) => ({...example, id: `${m.id}-exemple-${i + 2}`}))]);
const executable = examples.filter(m => m.check && !['module', 'modules'].includes(m.check.kind));
const name = memo => 'Memo_' + memo.id.replaceAll('-', '_');
const files = executable.map(m => {
  const file = join(dir, name(m) + '.java');
  writeFileSync(file, `${imports}\nclass ${name(m)} { public static void main(String[] args) throws Exception {\n${m.code}\n} }\n`);
  return file;
});
run('javac', ['-encoding', 'UTF-8', '--release', '21', '-d', dir, ...files]);
for (const m of executable) {
  const output = run('java', ['-Dfile.encoding=UTF-8', '-cp', dir, name(m)]);
  assert.equal(output, m.check.output, m.id);
}
for (const memo of memos.filter(m => m.check?.kind === 'module')) {
  const sourceDir = join(dir, memo.id);
  const paths = Object.entries(memo.check.files).map(([path, code]) => {
    const file = join(sourceDir, path);
    mkdirSync(dirname(file), {recursive:true});
    writeFileSync(file, code);
    return file;
  });
  assert.equal(memo.check.files['module-info.java'], memo.code);
  run('javac', ['-encoding', 'UTF-8', '--release', '21', '-d', join(sourceDir, 'out'), ...paths]);
}
// Exemples à plusieurs modules : le code affiché doit être exactement la suite des fichiers compilés.
const multiModules = examples.filter(m => m.check?.kind === 'modules');
for (const example of multiModules) {
  const sourceDir = join(dir, example.id, 'src');
  const entries = Object.entries(example.check.files);
  assert.equal(example.code, entries.map(([path, code]) => `// ${path}\n${code}`).join('\n\n'), example.id);
  for (const [path, code] of entries) {
    const file = join(sourceDir, path);
    mkdirSync(dirname(file), {recursive:true});
    writeFileSync(file, code);
  }
  const modules = [...new Set(entries.map(([path]) => path.split('/')[0]))];
  const out = join(dir, example.id, 'out');
  run('javac', ['-encoding', 'UTF-8', '--release', '21', '-d', out, '--module-source-path', sourceDir, '--module', modules.join(',')]);
  assert.equal(run('java', ['-Dfile.encoding=UTF-8', '--module-path', out, '--module', example.check.main]), example.check.output, example.id);
}
// Tester les commandes affichées avec leur contexte minimal, dans le dossier temporaire.
mkdirSync(join(dir, 'src'));
writeFileSync(join(dir, 'src/Bonjour.java'), 'public class Bonjour { public static void main(String[] args) { System.out.print("Bonjour"); } }');
const compilation = memos.find(m => m.id === 'modules-compilation');
assert.equal(run('/bin/sh', ['-eu', '-c', compilation.code]), 'Bonjour');
const tools = memos.find(m => m.id === 'modules-outils');
assert.equal(run('/bin/sh', ['-eu', '-c', tools.code], dir, 60000).trim(), 'java.base');
assert.match(run(join(dir, 'runtime-minimal/bin/java'), ['--list-modules']), /^java\.base@21\./);
const migrationDir = join(dir, 'migration');
mkdirSync(join(migrationDir, 'src/com/texte'), {recursive: true});
writeFileSync(join(migrationDir, 'src/com/texte/Affiche.java'), 'package com.texte; public class Affiche { public static void main(String[] args) { Module m = Affiche.class.getModule(); System.out.println(m.isNamed() ? "module automatique " + m.getName() : "module non nommé"); } }');
const migration = memos.find(m => m.id === 'modules-migration');
assert.equal(run('/bin/sh', ['-eu', '-c', migration.code], migrationDir), 'module non nommé\nmodule automatique outils.texte\n');
assert.equal(run('/bin/sh', ['-eu', '-c', migration.additionalExamples[0].code], migrationDir), 'module automatique com.texte\n');
console.log(`${memos.length} fiches vérifiées : ${executable.length} fragments, ${memos.filter(m => m.check?.kind === 'module').length} descripteurs, ${multiModules.length} exemple(s) à plusieurs modules et 3 suites de commandes JDK 21.\nSources temporaires : ${dir}`);
