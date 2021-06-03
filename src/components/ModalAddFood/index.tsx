import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';

import Modal from '../Modal';
import Input from '../Input';

import { Form } from './styles';

interface IModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: Function;
  handleAddFood: Function;
}

interface ISubmitData {
  image: string;
  name: string;
  price: string;
  description: string;
}

const ModalAddFood: React.FC<IModalAddFoodProps> = ({ isOpen, setIsOpen, handleAddFood }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: ISubmitData) => {
    handleAddFood(data);
    setIsOpen();
  }, [handleAddFood, setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalAddFood;