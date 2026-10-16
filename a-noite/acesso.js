/* A Casa da Costa · A Noite · acesso restrito (16/10/2026).
   Mesmo padrão do acesso do Eco do Amanhã (15/10): pede uma conta Google da lista de mestres
   do projeto (Firestore: config/mestres, campo "emails"). Quem chega por convite de uma sala
   (?sala=…) ou abre a sala em grupo (?grupo=1, que já exige o Google do Mestre) não passa por aqui. */
import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js';

const Q = new URLSearchParams(location.search);
const GRUPO = !!Q.get('sala');
if (!GRUPO) iniciar();

function iniciar() {
  const cfg = { apiKey:'AIzaSyDwshZbqaMOKxdRuyLtdpbijPRdrjVOcxE', authDomain:'mosaico-game.firebaseapp.com', projectId:'mosaico-game', storageBucket:'mosaico-game.firebasestorage.app', messagingSenderId:'436141261767', appId:'1:436141261767:web:6a83555a2f7c4ed4550fe2' };
  const app = getApps().find(a => a.name === 'dragon-mesa-noite') || initializeApp(cfg, 'dragon-mesa-noite');
  const auth = getAuth(app), db = getFirestore(app);

  const st = document.createElement('style');
  st.textContent = `#dgAcesso{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:20px;background:radial-gradient(900px 600px at 50% -10%,#2b170b 0,transparent 60%),#070605;color:#e8f4f6;font-family:Inter,system-ui,sans-serif}
#dgAcesso .cx{width:min(420px,100%);padding:24px 20px;border:1px solid #6b5226;border-radius:16px;background:linear-gradient(170deg,#21170f,#0e0b08);box-shadow:0 18px 50px #000c;text-align:center}
#dgAcesso small{display:block;font:700 11px/1 ui-monospace,monospace;letter-spacing:.2em;text-transform:uppercase;color:#e8bb55}
#dgAcesso h2{margin:12px 0 8px;font:700 26px Georgia,serif;color:#f4fbfc}
#dgAcesso p{margin:0 0 16px;color:#a9c3c9;line-height:1.5}
#dgAcesso button{width:100%;min-height:52px;border:0;border-radius:10px;font:800 14px/1 Inter,system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;background:linear-gradient(180deg,#f3d078,#e0b13a);color:#1a1206;box-shadow:0 4px 0 #6b5220}
#dgAcesso button[disabled]{opacity:.6;cursor:wait}
#dgAcesso .erro{margin-top:12px;padding:10px;border-left:3px solid #e56b52;background:#28110e;color:#ffd4ca;text-align:left;font-size:14px}
#dgAcesso .erro:empty{display:none}`;
  document.head.appendChild(st);
  const box = document.createElement('div');
  box.id = 'dgAcesso';
  box.innerHTML = `<div class="cx"><small>A Casa da Costa · acesso restrito</small><h2>Entre para jogar</h2>
<p>O jogo está em fase de testes e só abre para contas autorizadas. Entre com a sua conta Google.</p>
<button type="button" id="dgAcessoBtn">Entrar com Google</button><div class="erro" id="dgAcessoErro"></div></div>`;
  const montar = () => { if (!document.getElementById('dgAcesso')) document.body.appendChild(box); };
  if (document.body) montar(); else document.addEventListener('DOMContentLoaded', montar);
  const btn = () => document.getElementById('dgAcessoBtn');
  const erro = t => { const e = document.getElementById('dgAcessoErro'); if (e) e.textContent = t || ''; };

  async function autorizado(user) {
    if (!user || user.isAnonymous || !user.email) return false;
    try {
      const s = await getDoc(doc(db, 'config', 'mestres'));
      const lista = (s.exists() && Array.isArray(s.data().emails)) ? s.data().emails.map(e => String(e).toLowerCase()) : [];
      return lista.includes(user.email.toLowerCase());
    } catch (e) { console.warn('A Casa da Costa: lista de acesso', e); return false; }
  }
  async function conferir(user) {
    if (await autorizado(user)) { box.remove(); return; }
    if (user && !user.isAnonymous) {
      erro(`A conta ${user.email} não está autorizada. Entre com outra conta.`);
      await signOut(auth);
    }
  }
  onAuthStateChanged(auth, user => { if (user) conferir(user); });
  box.addEventListener('click', async ev => {
    if (ev.target.id !== 'dgAcessoBtn') return;
    const b = btn(); b.disabled = true; erro('');
    try {
      const { user } = await signInWithPopup(auth, new GoogleAuthProvider());
      await conferir(user);
    } catch (e) {
      const c = e && e.code || '';
      erro(c === 'auth/popup-blocked' ? 'O navegador bloqueou a janela do Google. Libere pop-ups para este site e tente de novo.'
        : (c === 'auth/popup-closed-by-user' || c === 'auth/cancelled-popup-request') ? 'A janela do Google foi fechada antes de terminar.'
        : c === 'auth/unauthorized-domain' ? 'Este endereço ainda não foi autorizado no Firebase.'
        : 'Não foi possível entrar. Tente de novo.');
    } finally { const b2 = btn(); if (b2) b2.disabled = false; }
  });
}
