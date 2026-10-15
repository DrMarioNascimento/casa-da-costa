/* Integridade dos caminhos depois da separação do repositório Dragon (14/10/2026).
   Toda referência relativa (../) e todo caminho citado a partir da raiz precisa existir;
   nenhum endereço antigo (/Dragon/, jogos/casa-da-costa/, historias/) pode sobrar no código. */
import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const IGNORA = /(^|\/)(node_modules|\.git|tests)(\/|$)|_SUBSTITUIDO_/;
function arquivos(d) {
  return readdirSync(d).flatMap(n => {
    const p = join(d, n), r = relative(RAIZ, p).replace(/\\/g, "/");
    if (IGNORA.test(r)) return [];
    return statSync(p).isDirectory() ? arquivos(p) : [r];
  });
}
const TODOS = arquivos(RAIZ);
const CODIGO = TODOS.filter(f => /\.(html|js|css|webmanifest)$/.test(f) && !/a-noite\/assets\//.test(f));
const semComentarios = t => t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/<!--[\s\S]*?-->/g, "").replace(/(^|[^:\\])\/\/.*$/gm, "$1");

test("referências ../ apontam para arquivos que existem", () => {
  const faltando = [];
  for (const f of CODIGO) {
    const t = semComentarios(readFileSync(join(RAIZ, f), "utf8"));
    for (const m of t.matchAll(/(?<![\w./-])((?:\.\.\/)+[\w./%-]+)/g)) {
      const ref = m[1].replace(/[.,]+$/, "");
      const candidatos = [dirname(f), dirname(dirname(f)), dirname(dirname(dirname(f)))];
      if (!candidatos.some(d => existsSync(normalize(join(RAIZ, d, ref))))) faltando.push(`${f} → ${ref}`);
    }
  }
  assert.deepEqual(faltando, []);
});

test("nenhum endereço do repositório antigo sobrou no código", () => {
  const antigos = [];
  for (const f of CODIGO) {
    const t = semComentarios(readFileSync(join(RAIZ, f), "utf8"));
    for (const m of t.matchAll(/["'`(](\/Dragon\/|jogos\/casa-da-costa\/|historias\/casa-da-costa\/)/g)) antigos.push(`${f}: ${m[1]}`);
  }
  assert.deepEqual(antigos, []);
});

test("a raiz oferece as duas versões e as páginas de entrada existem", () => {
  const raiz = readFileSync(join(RAIZ, "index.html"), "utf8");
  assert.match(raiz, /href="a-mesa\/"/);
  assert.match(raiz, /href="o-impostor\/"/);
  for (const f of ["a-mesa/index.html", "a-mesa/MOSAICO-mesa.html", "o-impostor/index.html", "o-impostor/mesa.html",
                   "o-impostor/laboratorio-ra.html", "a-noite/index.html", "solo/index.html", "telao.html", "firebase-room.js"])
    assert.ok(existsSync(join(RAIZ, f)), f);
});

test("A Noite foi montada para morar em /a-noite/", () => {
  const js = readdirSync(join(RAIZ, "a-noite/assets")).filter(n => n.startsWith("index-") && n.endsWith(".js"));
  assert.ok(js.length);
  for (const n of js) {
    const t = readFileSync(join(RAIZ, "a-noite/assets", n), "utf8");
    assert.ok(t.includes("`/a-noite/`"), n);
    assert.ok(!t.includes("/Dragon/jogos/"), n);
  }
});
