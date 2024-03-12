import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [products, setProducts] = useState();
  const [page, setPage] = useState(1);
  const [totalpages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = await res.json();
    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total/10);
    }
  };
  console.log(products);
  useEffect(() => {
    fetchProducts();
  }, [page]);

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalpages  &&
      selectedPage != page
    )
      setPage(selectedPage);
  };

  return (
    <>
      {products && products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products && products.length > 0 && (
        <div className="pagination">
          <span className={page > 1 ? "" : "pagination-disabled"} onClick={() => selectedPageHandler(page - 1)}>◀️</span>
          {[...Array(totalpages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectedPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalpages ? "" : "pagination-disabled"}
            onClick={() => selectedPageHandler(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </>
  );
}

export default App;
