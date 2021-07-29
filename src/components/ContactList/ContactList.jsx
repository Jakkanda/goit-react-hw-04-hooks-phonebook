import React from 'react';
import PropTypes from "prop-types";
import styled from './ContactList.module.css';

export function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={styled.list}>
      {contacts.map(contact => {
        return (
          <li key={contact.id} className={styled.item}>
            <div className={styled.contact}>
              <span className={styled.span}>{contact.name} : </span>
              <span className={styled.span}> {contact.number}</span>
              <button
                onClick={() => onDeleteContact(contact.id)}
                className={styled.button}
              >
                Remove
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};