# Florescendo em Cristo

Site estático (HTML + CSS puro, sem build, sem dependências) do blog devocional
"Florescendo em Cristo".

## Como rodar localmente

Não precisa de servidor nem de instalação. Basta abrir `index.html` no navegador
(duplo clique, ou "Abrir com" → seu navegador). Se preferir servir via HTTP
(recomendado ao editar no Antigravity, para os links relativos funcionarem
exatamente como em produção):

```bash
npx serve .
# ou
python -m http.server 8080
```

## Arquivo principal

**`index.html`** — página inicial (Home). É o ponto de entrada do site.

## Estrutura

```
index.html                              → Página inicial
sobre.html                              → Página "Sobre"
quando-a-espera-parece-silencio.html    → Post de devocional (exemplo único até o momento)
README.md                               → este arquivo
_legacy-export/                         → arquivos originais exportados da ferramenta que criou o protótipo
_unused-assets/                         → arquivos órfãos, não usados pelo site (ver abaixo)
```

Cada página é autossuficiente: HTML + CSS inline + um pequeno `<style>` no
`<head>` com as regras compartilhadas (cores de fundo, fontes, estados de
`:hover`). Não há JavaScript — o site é 100% estático.

## O que foi feito nesta reorganização

O projeto original veio como um export de protótipo (arquivos `*.dc.html` +
`support.js`) de uma ferramenta de criação de sites com IA. Esse formato:

- Usava tags customizadas (`<x-dc>`, `<sc-for>`, `{{ }}`, `<helmet>`) que só
  fazem sentido para o runtime `support.js`.
- Só renderizava puxando **React, ReactDOM e Babel de um CDN (unpkg.com) em
  tempo real** — ou seja, **sem internet, a página ficava em branco**. Esse
  era o motivo do projeto não funcionar localmente.
- Tinha um atributo `style-hover="..."` que nunca funcionou (o runtime não o
  implementava) — os botões e cards não tinham efeito de hover de fato,
  mesmo a cor de hover estando especificada no código.

O que mudou:

1. **Convertidos os 3 arquivos `.dc.html` em HTML puro**, sem nenhuma
   dependência externa além das fontes do Google Fonts (já usadas
   originalmente). Design, textos e conteúdo foram mantidos 100% idênticos.
2. **Os loops de dados** (`sc-for` sobre `posts`, `cats`, `valores`,
   `related`) foram "desenrolados" nos itens estáticos exatos que já
   estavam no script embutido de cada página — o conteúdo final é
   pixel-a-pixel o mesmo.
3. **Hover reativado de fato**: os valores de `style-hover` (que antes eram
   ignorados) viraram classes CSS reais (`.btn-dark`, `.btn-gold`,
   `.card-cat`) com `:hover`, usando exatamente as mesmas cores já definidas
   no protótipo.
4. **Links internos corrigidos**: "Início" e "Sobre" no menu agora apontam
   para `index.html` e `sobre.html`; o botão "Ler o devocional de hoje" e o
   link "Todos os escritos" agora apontam para
   `quando-a-espera-parece-silencio.html` / `index.html`. Os demais links
   (Devocionais, Estudos, Instagram, formulário de newsletter, etc.)
   continuam como `#` porque as páginas/integrações correspondentes ainda
   não existem no projeto — não foram inventadas para não alterar o escopo
   funcional.
5. **Arquivos originais preservados**, não apagados: os `.dc.html` e o
   `support.js` foram movidos para `_legacy-export/`, caso você queira
   reabri-los na ferramenta original.
6. **Assets órfãos isolados**: `uploads/imagens-...jpeg` e `.thumbnail` não
   eram referenciados em nenhum lugar do site. A imagem, inclusive, é o
   moodboard de marca de **outro** projeto ("No Silêncio de São José"), não
   deste — parecem ter ficado misturados por armazenamento compartilhado da
   ferramenta original. Foram movidos para `_unused-assets/` em vez de
   apagados. Vale conferir e excluir manualmente se confirmar que não
   pertencem aqui.

## Próximos passos sugeridos (não feitos, fora do escopo pedido)

- Extrair o CSS inline repetido (header, footer, seção de newsletter) para
  um único `styles.css` compartilhado.
- Substituir os blocos de placeholder "foto — ..." pelas fotos reais quando
  estiverem disponíveis.
- Criar páginas reais para os links que hoje são `#` (Devocionais, Estudos,
  Testemunhos, Família, contato).
