import React from 'react';
import { FooterBase } from './styles';
import LogoMarechais from '../../assets/img/LogoMarechais.png';

function Footer() {
  return (
    <FooterBase>
      <a href="https://www.alura.com.br/">
        <img className="Logo" src={LogoMarechais} alt="Logo Marechais" />
      </a>

      <p>
        Associação Desportista Maceio Marechais
        <br />
        CNPJ: 17639203000125
      </p>
    </FooterBase>
  );
}

export default Footer;
