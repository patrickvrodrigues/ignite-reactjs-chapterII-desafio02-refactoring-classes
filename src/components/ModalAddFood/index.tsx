import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { FoodProps } from '../../type';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (data: FoodProps) => void;
}

export function ModalAddFood(props: ModalAddFoodProps) {
  const formRef = createRef();

  async function handleSubmit(data: FoodProps) {
    props.handleAddFood(data);
    props.setIsOpen();
  };

  return (
    <Modal isOpen={props.isOpen} setIsOpen={props.setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" icon="" />

        <Input name="name" placeholder="Ex: Moda Italiana" icon="" />
        <Input name="price" placeholder="Ex: 19.90" icon="" />

        <Input name="description" placeholder="Descrição" icon="" />
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
