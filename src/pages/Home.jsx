import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setSortType } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Card from "../components/Card";
import PlaceHolder from "../components/PlaceHolder";
import Pagination from "../components/PaginationComponent/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const orderType = useSelector((state) => state.filter.sort.type);

  //https://6383693c6e6c83b7a992dead.mockapi.io/items
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const search = searchValue ? `&search=${searchValue}` : "";
  const category = categoryId > 0 ? `category=${categoryId}` : "";

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangeOrder = (sortType) => {
    dispatch(setSortType(sortType));
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6383693c6e6c83b7a992dead.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType}&order=${orderType}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderType, searchValue, currentPage]);
  const cards = items.map((obj) =>
    isLoading ? (
      <PlaceHolder />
    ) : (
      <Card
        key={obj.id}
        title={obj.title}
        price={obj.price}
        imageUrl={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    )
  );
  const placeHolders = [...new Array(6)].map((_, index) => (
    <PlaceHolder key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort onChangeOrder={onChangeOrder} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? placeHolders : cards}</div>

      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;