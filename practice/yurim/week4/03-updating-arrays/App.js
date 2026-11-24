import { useState } from "react";

const initialProducts = [
  { id: 0, name: "아메리카노", count: 1 },
  { id: 1, name: "앙버터소금빵", count: 5 },
  { id: 2, name: "다크초콜릿", count: 2 },
];

export default function ShoppingCart() {
  const [products, setProducts] = useState(initialProducts);

  function handleIncreaseClick(productId) {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product,
      ),
    );
  }

  return (
    <section>
      <h1>Real:ly 주전부리 장바구니</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} <strong>{product.count}개</strong>{" "}
            <button
              type="button"
              aria-label={`${product.name} 수량 1개 추가`}
              onClick={() => handleIncreaseClick(product.id)}
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
