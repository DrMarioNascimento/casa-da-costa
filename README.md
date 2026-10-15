# A Casa da Costa · Dragon Games

Jogo MOSAICO publicado em **https://casa-da-costa.dragongames.dev.br** (GitHub Pages).
Separado do repositório `Dragon` em 14/10/2026 — regra "um jogo = um repositório = um subdomínio"
(ver `documentos/ORGANIZACAO-DRAGON.md` no Dragon).

| Endereço | Conteúdo | Origem no Dragon |
|---|---|---|
| `/` | escolha da versão | — |
| `/a-mesa/` | entrada da Mesa; jogo em `/a-mesa/MOSAICO-mesa.html` | `historias/casa-da-costa/a-mesa/` + `jogos/casa-da-costa/a-mesa/` |
| `/o-impostor/` | entrada do Impostor; jogo em `/o-impostor/mesa.html`; laboratório de RA em `/o-impostor/laboratorio-ra.html` | `historias/casa-da-costa/o-impostor/` + `jogos/casa-da-costa/o-impostor/` |
| `/a-noite/` | A Noite (app montado; base `/a-noite/`) | `jogos/casa-da-costa/a-noite/` |
| `/solo/` | Solo | `jogos/casa-da-costa/solo/` |
| `/telao.html?jogo=casa-da-costa` | telão | `telao.html` |

Arquivos comuns copiados do Dragon (cópia própria deste jogo): `firebase-room.js`, `firebase-user.js`,
`abertura-casa.js`, `hipoteses-por-camada.js`, `papel-camada.js`, `brand/`.

Firebase: projetos `mosaico-game` (Mesa) e `mosaico-noite` (Noite) — os mesmos de antes.
O domínio `casa-da-costa.dragongames.dev.br` precisa estar em *Authentication → Domínios autorizados* nos dois.

Testes: `npm test` (integridade dos caminhos). Os testes completos da Casa continuam no Dragon até a limpeza.
