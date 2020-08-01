import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const [categorias, setCategorias] = useState([]);
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000000',
  };
  const [valores, setValores] = useState(valoresIniciais);

  function setValor(chave, valor) {
    setValores({
      ...valores,
      [chave]: valor,
    });
  }

  function handlerChange(infosDoEvento) {
    const infos = infosDoEvento.target;
    setValor(infos.getAttribute('name'), infos.value);
  }

  function hangleSubmit(infosDoEvento) {
    infosDoEvento.preventDefault();
    setCategorias([
      ...categorias,
      valores,
    ]);

    setValores(valoresIniciais);
  }

  useEffect(() => {
    const URL = 'https://marechais-flix.herokuapp.com/categorias';
    fetch(URL)
      .then(async (response) => {
        const res = await response.json();

        setCategorias([
          ...res,
        ]);
      });
  }, [
    valores.nome,
  ]);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {valores.nome}
      </h1>

      <form onSubmit={hangleSubmit}>

        <FormField
          label="Nome da Categoria"
          name="nome"
          value={valores.nome}
          onChange={handlerChange}
        />
        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={valores.descricao}
          onChange={handlerChange}
        />
        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={valores.cor}
          onChange={handlerChange}
        />
        <Button>Cadastrar</Button>
      </form>

      {categorias.length === 0 && (
        <div>
          Carregando. . .
        </div>
      )}

      <ul>
        {categorias.map((categoria, indice) => (
          <li key={`${categoria}${indice}`}>
            {categoria.titulo}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir pra Home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
