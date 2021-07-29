import React from 'react';
import styled from './Filter.module.css';

export function Filter({value, onChange}) {
  return <input type="text" value={value} onChange={onChange} className={styled.input}></input>;
}
