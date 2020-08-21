import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // callback para lidar com submit, recebe como parâmetro os dados do form
  //  Aqui vamos colocar a validação do form
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({}); // limpa os erros do input

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  // retorno do component SignUp
  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome"></Input>
          <Input name="email" icon={FiMail} placeholder="Email"></Input>

          <Input
            name="password"
            icon={FiLock} // passando um component como propriedade de outro component
            type="password"
            placeholder="Senha"
          ></Input>

          <Button type="submit">Entrar</Button>
        </Form>

        <a href="login">
          <FiArrowLeft /> Voltar para Logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
