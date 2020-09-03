import React from 'react';

function MyList({ items, removeItem, updateItem }) {
  const ListItem = ({ id, text, done }) => (
    <li>
      {`${text} ${done ? 'ok' : ''}`}
      <button onClick={() => updateItem(id, done)}>toggle</button>
      <button onClick={() => removeItem(id)}>X</button>
    </li>
  );

  return (
    <ul>
      {items.map((item) => (
        <ListItem key={item.id} {...item} />
      ))}
      {!items.length && 'no items'}
    </ul>
  );
}

export default MyList;
