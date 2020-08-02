import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

function CadastroCategoria() {
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '#000000',
  };

  const { handlerChange, valores, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://marechais-flix.herokuapp.com/categorias';
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

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        setCategorias([
          ...categorias,
          valores,
        ]);

        clearForm(valoresIniciais);
      }}
      >

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
        <Button type="submit">Cadastrar</Button>
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
