
    // Os dados ficam apenas na memória.
    // Se a página for atualizada, eles serão apagados.
    const alunos = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "cadastro") mostrarCadastro();
      if (rota === "lista") mostrarLista();
      if (rota === "sobre") mostrarSobre();
    }

    function mostrarInicio() {
      app.innerHTML = `
        <h1>Sistema de Cadastro de Contatos</h1>
        <p>
          Este sistema foi desenvolvido para salvar contatos, saber de onde vieram e para qual servico desejam fazer o agendamento
        </p>

        <p>
          Os Contatos cadastrados ficam temporariamente guardados em um array JavaScript.
        </p>

        <div class="contador">
          Contatos cadastrados nesta sessão: <strong>${alunos.length}</strong>
        </div>

        <div class="acoes">
          <button class="botao" id="btnCadastrar">Cadastrar Contato</button>
          <button class="botao secundario" id="btnVerAlunos">Ver Contatos</button>
        </div>
      `;

      document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("cadastro"));

      document.querySelector("#btnVerAlunos")
        .addEventListener("click", () => irPara("lista"));
    }

    function mostrarCadastro() {
      app.innerHTML = `
        <h1>Cadastrar contatos</h1>

        <form id="formAluno">
          <div class="campo">
            <label for="nome">Nome</label>
            <input id="nome" type="text" placeholder="Digite o nome do Contato" required />
          </div>

          <div class="campo">
            <label for="curso">Fonte</label>
            <input id="curso" type="text" placeholder="Digite de onde veio esse contato" required />
          </div>

          <div class="campo">
            <label for="matricula">Agendamento</label>
            <input id="matricula" type="text" placeholder="Digite qual servico deseja ultilizar" required />
          </div>

          <button class="botao" type="submit">Salvar Contato</button>
          <div id="mensagem"></div>
        </form>
      `;

      document.querySelector("#formAluno").addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const curso = document.querySelector("#curso").value.trim();
        const matricula = document.querySelector("#matricula").value.trim();

        alunos.push({
          nome,
          curso,
          matricula
        });

        document.querySelector("#mensagem").innerHTML =
          `<div class="mensagem">Contato cadastrado com sucesso.</div>`;

        evento.target.reset();
      });
    }

    function mostrarLista() {
      app.innerHTML = `
        <h1>Lista de contatos</h1>
        <p>Tabela criada para mostrar contatos salvos e para qaul servico estao fazendo o agendamento</p>
        <div id="conteudoLista"></div>
      `;

      renderizarTabela();
    }

    function renderizarTabela() {
      const conteudo = document.querySelector("#conteudoLista");

      if (alunos.length === 0) {
        conteudo.innerHTML = `
          <div class="vazio">
            Nenhum contato cadastrado ainda.
          </div>
        `;
        return;
      }

      let linhas = "";

      alunos.forEach((aluno, indice) => {
        linhas += `
          <tr>
            <td>${aluno.nome}</td>
            <td>${aluno.curso}</td>
            <td>${aluno.matricula}</td>
            <td>
              <button class="excluir" data-indice="${indice}">Excluir</button>
            </td>
          </tr>
        `;
      });

      conteudo.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>fonte</th>
              <th>agendamento</th>
              <th>Ações<
          <tbody>
            ${linhas}
          </tbody>
        </table>
      `;

      document.querySelectorAll(".excluir").forEach(botao => {
        botao.addEventListener("click", function() {
          const indice = Number(this.dataset.indice);
          alunos.splice(indice, 1);
          renderizarTabela();
        });
      });
    }

    function mostrarSobre() {
      app.innerHTML = `
        <h1>Sobre o projeto</h1>
        <p>
          Foi desenvolvido para salvar contatos e ao mesmo tempo relizar um agendamento e saber para qual servico
        </p>
        <p>
          Existe apenas um arquivo HTML. Ao clicar nas opções do menu,
          o JavaScript modifica o conteúdo do elemento <strong>#app</strong>.
        </p>
        <p>
         O projeto salvar os contatos junto com dados do cadrasto 
        </p>
      `;
    }

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

    mostrarInicio();
  