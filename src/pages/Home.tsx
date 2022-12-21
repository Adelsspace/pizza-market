import { useEffect, useRef } from "react";

import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  selectSort,
  selectFilter,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzasSlice";

import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import Card from "../components/Card";
import PlaceHolder from "../components/PlaceHolder";
import Pagination from "../components/PaginationComponent/Pagination";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const { sortProperty: sortType, type: orderType } = useSelector(selectSort);
  const { items, status } = useSelector(selectPizzaData);

  //https://6383693c6e6c83b7a992dead.mockapi.io/items

  const search = searchValue ? `&search=${searchValue}` : "";
  const category = categoryId > 0 ? `category=${categoryId}` : "";

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangeOrder = (sortType: string) => {
    dispatch(setSortType(sortType));
  };

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    dispatch(
      //@ts-ignore
      fetchPizzas({ currentPage, category, sortType, orderType, search })
    );
    window.scrollTo(0, 0);
  };

  //после первого рендера сохраняем url в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  //если был первый рендер то запрашиваем пиццы
  useEffect(() => {
    if (!isSearch.current) getPizzas();

    isSearch.current = false;
  }, [category, sortType, orderType, search, currentPage]);

  //если был первый рендер, то проверяем url-параметры и сохранием в redux
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortType,
        categoryId: categoryId,
        currentPage,
        orderType,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, orderType, currentPage]);

  const cards = items.map((obj: any) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      {" "}
      <Card
        id={obj.id}
        title={obj.title}
        price={obj.price}
        imageUrl={obj.imageUrl}
        sizes={obj.sizes}
        types={obj.types}
      />
    </Link>
  ));
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
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content_error-info">
          <h2>Произошла ошибка 😟</h2>
          <p>
            Не удалось получить данные от сервера, попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? placeHolders : cards}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;