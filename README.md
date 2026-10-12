# SmartCarbo – Tela de Evolução

Frontend web (ReactJS + Vite) da tela **Evolução**, seguindo a arquitetura do projeto:
React Router, Zustand e consumo de API REST (Spring Boot) via HTTPS/JSON.

## Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

Abra http://localhost:5173

## Estrutura

```
src/
  components/   Layout, Sidebar, Header, StatCard, WeightChart, Icons
  pages/        Evolucao.jsx
  services/     evolucaoService.js   (chamada à API / mock)
  store/        useEvolucaoStore.js  (Zustand: aba, período, dados)
  mocks/        evolucaoMock.js      (dados de exemplo)
  styles/       global.css           (variáveis e estilos)
```

## Mock x API real

No arquivo `.env`:

```
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK=true    # true = dados de exemplo | false = API Spring Boot
```

Com `VITE_USE_MOCK=false`, o serviço chama:

```
GET {VITE_API_URL}/evolucao?tipo={peso|calorias|health-score}&periodo={7|30|90}
Authorization: Bearer <token JWT salvo em localStorage("token")>
```

Resposta esperada (JSON):

```json
{
  "titulo": "Seu peso (kg)",
  "unidade": "kg",
  "eixoY": { "min": 50, "max": 65, "passo": 5 },
  "meta": { "valor": 55 },
  "serie": [{ "data": "01/09", "valor": 59 }, { "data": "08/09", "valor": 58.5 }],
  "resumo": [
    { "rotulo": "Peso atual", "valor": "57 kg", "legenda": "desde o início", "icone": "down" },
    { "rotulo": "Variação", "valor": "-2 kg", "legenda": "últimos 30 dias", "icone": "trend-down" },
    { "rotulo": "Meta", "valor": "55 kg", "legenda": "faltam 2 kg", "icone": "flag", "progresso": 50 }
  ]
}
```

Ícones aceitos: `down`, `up`, `trend-down`, `trend-up`, `flag`.

- `meta.valor` desenha a linha tracejada da meta no gráfico (só aparece se estiver dentro do `eixoY`).
- `progresso` (0 a 100) é opcional e mostra a barra "% do caminho concluído" no card. Fórmula sugerida:
  `(valorInicial - valorAtual) / (valorInicial - meta) * 100`, limitada entre 0 e 100.

### Registrar peso (botão "+ Registrar peso")

```
POST {VITE_API_URL}/evolucao/peso
Content-Type: application/json
Authorization: Bearer <token JWT>

{ "data": "2026-10-11", "valor": 56.5 }
```

Depois de salvar, a tela recarrega os dados. Se a API responder com erro, a mensagem aparece dentro do formulário.

No modo mock, os pesos registrados ficam salvos no navegador (`localStorage`, chave
`smartcarbo:mock:pesos`) e os cards são recalculados. Para limpar, apague essa chave nas
ferramentas do navegador.

No Spring Boot, lembre de liberar o CORS para `http://localhost:5173`.

## Juntando com as outras telas

- `Layout` (Sidebar + Header) já envolve todas as rotas em `src/App.jsx`.
- Para adicionar uma tela, crie a página em `src/pages/` e troque o `EmBreve` da rota correspondente.
- Os dados do usuário no `Header` (nome, iniciais, plano) estão fixos em `Header.jsx` e devem vir do login.
- O botão **Sair** remove `localStorage("token")`; ajuste ao fluxo de autenticação do projeto.
