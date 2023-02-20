import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Loader from "../components/Loader";
import PizzaBlock from "../components/PizzaBlock";

import axios from "axios";
import ReactPaginate from "react-paginate";
import { AppContext } from "../App";
import { setCategoryId } from "../redux/slice/filterSlice";

function Home() {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = useContext(AppContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const urlItems = `https://63e79782cbdc56587379fc07.mockapi.io/items?page=${currentPage}&limit=4&`;
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const sortType = sort.sort.replace("-", "");
      const order = sort.sort.includes("-") ? "asc" : "desc";
      const search = searchValue ? `&search=${searchValue}` : "";

      try {
        await axios
          .get(
            `${urlItems}${category}&sortBy=${sortType}&order=${order}${search}`
          )
          .then((res) => {
            setPizzas(res.data);
            setIsLoading(false);
          });
      } catch (error) {
        alert("Ошибка при запросе");
        console.error(error);
      }
    }

    window.scrollTo(0, 0);

    fetchData();
  }, [categoryId, sort.sort, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChange={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Loader key={i} />)
          : pizzas.map((pizza, i) => <PizzaBlock key={i} {...pizza} />)}
      </div>
      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => setCurrentPage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        renderOnZeroPageCount={null}
      />
    </div>
  );
}

export default Home;
