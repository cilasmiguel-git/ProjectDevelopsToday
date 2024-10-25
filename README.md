# Country Info App

Uma aplicação Full-Stack que fornece informações detalhadas sobre países, incluindo dados de população e países vizinhos. Este projeto inclui um Backend (BE) desenvolvido com Node.js (Nest.js ou Express.js) e um Frontend (FE) desenvolvido com React.

## Estrutura do Projeto

- **Backend (BE)**: Lida com chamadas de API e recuperação de dados de informações e população de países.
- **Frontend (FE)**: Exibe uma lista de países e informações detalhadas de cada um.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express (ou Nest.js), Axios
- **Frontend**: React, Chart.js, Axios, React Router

## Funcionalidades

### Backend

- **Lista de Países Disponíveis**
  - **Endpoint**: `GET /api/countries`
  - Busca uma lista de países a partir da Nager API ([https://date.nager.at/api/v3/AvailableCountries](https://date.nager.at/api/v3/AvailableCountries)).

- **Informações sobre um País**
  - **Endpoint**: `GET /api/country/:code`
  - Retorna detalhes sobre um país específico:
    - Nome e Região do País
    - Países Vizinhos
    - URL da Bandeira
    - Dados Históricos de População (obtidos de [https://countriesnow.space/api/v0.1/countries/population](https://countriesnow.space/api/v0.1/countries/population)).

### Frontend

- **Página de Lista de Países**
  - Exibe uma lista de países com opção de busca.
  - Usuários podem clicar em um país para visualizar mais detalhes.

- **Página de Informações do País**
  - Exibe:
    - Nome e bandeira do país
    - Lista clicável de países vizinhos
    - Gráfico de dados de população ao longo do tempo.

## Instruções de Execução

### Configuração do Ambiente

Crie um arquivo `.env` no diretório do backend com o seguinte conteúdo:

```env
PORT=5000
COUNTRY_API_BASE_URL=https://date.nager.at/api/v3
POPULATION_API_BASE_URL=https://countriesnow.space/api/v0.1/countries
