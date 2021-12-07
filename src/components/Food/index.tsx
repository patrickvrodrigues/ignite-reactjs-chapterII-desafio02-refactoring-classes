import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { FoodProps } from '../../type';

import { Container } from './styles';
import api from '../../services/api';

interface FoodPropsNew {

  food: FoodProps;
  handleDelete: (id: string) => void;
  handleEditFood: (food: FoodProps) => void;

}



export function Food(props: FoodPropsNew) {
  const [food, setFood] = useState(props.food);

  async function handleToggleAvailable() {

    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !food.available,
    });

    setFood({ ...food, available: !food.available })

  }

  function setHandleEditFood() {
    props.handleEditFood(food);
  }

  return (
    <Container available={food.available}>
      <header>
        <img src={food.image} alt={food.name} />
      </header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={setHandleEditFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => props.handleDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{food.available ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={food.available}
              onChange={handleToggleAvailable}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
}