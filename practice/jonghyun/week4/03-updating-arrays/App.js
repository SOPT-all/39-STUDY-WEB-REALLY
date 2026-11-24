import { useState } from 'react';

const initialProducts = [
  { id: 0, name: '아이스티', count: 1 },
  { id: 1, name: '샤브샤브', count: 2 },
  { id: 2, name: '이삭토스트', count: 3 },
];

export default function ShoppingCart() {
  const [products, setProducts] = useState(initialProducts);

  function handleIncreaseClick(productId) {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          count: product.count + 1
        };
      } else {
        return product;
      }
    }));
  }

  return (
    <section>
      <h2>종현이의 장바구니</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}{' '}
            <b>{product.count}개</b>{' '}
            <button onClick={() => {
              handleIncreaseClick(product.id);
            }}>
              +
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}