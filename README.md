# A Casa da Costa · Dragon Games

## Desenvolvimento e acesso

Os jogos estão em diferentes etapas de desenvolvimento, teste e aperfeiçoamento e ainda não foram lançados ao público. Nesta fase, os testes são realizados internamente, sem participação externa.

Enquanto os jogos estiverem em desenvolvimento, regras, interfaces e funcionalidades poderão mudar. Algumas páginas poderão apresentar demonstrações do projeto, mas isso não significa que os jogos estejam disponíveis para participação do público.

Mário César Nascimento estuda **Game Design e desenvolvimento de jogos**. Estes projetos acompanham esse percurso de formação e experimentação. As autorias e condições de uso de cada projeto estão identificadas em [LICENSE.md](LICENSE.md).

**Development status:** internal testing only; external participation is not open. Demonstration pages do not constitute a public game launch. Rules, interfaces and features may change.


Projeto MOSAICO em desenvolvimento, com endereço oficial em **https://casa-da-costa.dragongames.dev.br** (GitHub Pages).
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

## Autoria e licença

Criação de **Mário César Nascimento e Osana Melo Nascimento**. As condições do projeto de origem Dragon/MOSAICO acompanham esta separação em [LICENSE.md](LICENSE.md); as licenças e os créditos de terceiros permanecem nos respectivos arquivos.

Portal Dragon Games: https://dragongames.dev.br/
