import {questions} from '../bank.js';
import {mkdtempSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
const dir=mkdtempSync(join(tmpdir(),'java21-qcm-check-'));
const imports='import java.util.*; import java.util.stream.*; import java.util.concurrent.*; import java.util.concurrent.atomic.*; import java.time.*; import java.time.format.*; import java.nio.file.*; import java.text.*;';
let checked=0;
for(const q of questions.filter(q=>q.check)){
 const c=q.check,name='Q'+q.id.replaceAll('-','_'),file=join(dir,name+'.java');
 writeFileSync(file,`${imports}\nclass ${name}{${c.members||''}\npublic static void main(String[] args) throws Exception {${c.body}}}\n`);
 const compiled=spawnSync('javac',['--release','21','-d',dir,file],{encoding:'utf8',timeout:15000});
 if(c.kind==='fail'){if(compiled.status===0)throw Error(q.id+': devait échouer à la compilation');console.log('✓',q.id,'compilation rejetée');checked++;continue;}
 if(compiled.status!==0)throw Error(q.id+': '+compiled.stderr);
 const executed=spawnSync('java',['-cp',dir,name],{encoding:'utf8',timeout:10000});
 if(c.kind==='throws'){if(executed.status===0||!executed.stderr.includes('java.lang.'+c.exception))throw Error(q.id+': exception inattendue '+executed.stderr);}
 else if(executed.status!==0||executed.stdout!==c.output)throw Error(q.id+': attendu '+JSON.stringify(c.output)+', reçu '+JSON.stringify(executed.stdout)+' '+executed.stderr);
 console.log('✓',q.id,c.kind);checked++;
}
console.log(`${checked} fragments vérifiés sous Java 21. Sources temporaires : ${dir}`);
