import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';

import { FiCheckSquare } from 'react-icons/fi';

import Modal from '../Modal';
import Input from '../Input';

import { Form } from './styles';

interface IFood {
  id: number;
  image: string;
  name: string;
  price: string;
  description: string;
}

interface IModalEditFoodProps {
  isOpen: boolean;
  editingFood: IFood;
  setIsOpen: Function;
  handleUpdateFood: Function;
}

const ModalEditFood: React.FC<IModalEditFoodProps> = ({ isOpen, setIsOpen, editingFood, handleUpdateFood }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data: IFood) => {
    handleUpdateFood(data);
    setIsOpen();
  }, [handleUpdateFood, setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}

export default ModalEditFood;