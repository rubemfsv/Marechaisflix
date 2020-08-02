import { useState } from 'react';

function useForm(valoresIniciais) {
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

  function clearForm() {
    setValores(valoresIniciais);
  }

  return {
    valores,
    handlerChange,
    clearForm,
  };
}

export default useForm;
