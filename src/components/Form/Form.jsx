import { useState } from 'react';
import PropTypes from "prop-types";
import styled from './Form.module.css';

export default function Form (onSubmit) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    switch(name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, number);
    reset();
  }

  const reset = () => {
    setName('');
    setNumber('');
  }

return (
  <form onSubmit={handleSubmit}>
    <span className={styled.span}>Name</span>
    <input
      className={styled.input}
      type="text"
      name="name"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
      value={name}
      placeholder="Tom Red"
      required
      onChange={handleChange}
    />
    <span className={styled.span}>Number</span>
    <input
      className={styled.input}
      type="tel"
      name="number"
      pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
      title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
      placeholder="800-80-00"
      value={number}
      required
      onChange={handleChange}
    />
    <button type="submit" className={styled.button}>Add contact</button>
  </form>
);


}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
