import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Loader from "../components/Loader";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sort: "rating",
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const urlItems = "https://63e79782cbdc56587379fc07.mockapi.io/items";
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const sort = sortType.sort.replace("-", "");
      const order = sortType.sort.includes("-") ? "asc" : "desc";

      try {
        const pizzasResponse = await axios.get(
          `${urlItems}?${category}&sortBy=${sort}&order=${order}`
        );
        setPizzas(pizzasResponse.data);
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе");
        console.error(error);
      }
    }

    window.scrollTo(0, 0);

    fetchData();
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChange={(i) => setCategoryId(i)} />
        <Sort value={sortType} onChange={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Loader key={i} />)
          : pizzas.map((pizza, i) => <PizzaBlock key={i} {...pizza} />)}
      </div>
    </div>
  );
}

export default Home;
