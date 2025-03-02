import React from 'react';
import Item, { ProductItem } from './Item';

interface ItemListProps {
  items: ProductItem[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;