import React, { useCallback, useState, useEffect } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';

import { IFood } from '../../types'

import { FoodsContainer } from './styles';

type IFoodWithoutID = Omit<IFood, 'id'>

const Dashboard: React.FC = () => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood)

  useEffect(() => {
    async function loadFoods() {
      const { data: foods } = await api.get('/foods');

      setFoods(foods);
    }

    loadFoods();
  }, []);

  const handleAddFood = useCallback(async (food: IFoodWithoutID) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      const newStateFoods = [...foods, response.data];

      setFoods(newStateFoods);
    } catch (err) {
      console.log(err);
    }
  }, [foods]);

  const handleUpdateFood = useCallback(async (food: IFood) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }, [editingFood, foods]);

  const handleDeleteFood = useCallback(async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }, [foods]);

  const toggleModal = useCallback(() => {
    setModalOpen(!modalOpen);
  }, [modalOpen]);

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(!editModalOpen);
  }, [editModalOpen]);

  const handleEditFood = useCallback((food: IFood) => {
    setEditingFood(food);
    setEditModalOpen(true);
  }, []);

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

export default Dashboard;