import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@redux/slices/categorySlice.js';
import './Breadcrumbs.scss';

const Breadcrumbs = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { items: categories } = useSelector(state => state.categories);
  const { current: product } = useSelector(state => state.products);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  const paths = location.pathname.split('/').filter(Boolean);
  const isHome = location.pathname === '/';
  const isCart = location.pathname === '/cart';

  if (isHome || isCart) return null;

  // Строим крошки
  const crumbs = [];

  // Добавляем Home только если мы НЕ на главной
  if (!isHome) {
    crumbs.push({ name: 'Main page', url: '/' });
  }

  if (paths[0] === 'categories') {
    crumbs.push({ name: 'Categories', url: '/categories' });
  } else if (paths[0] === 'category' && paths[1]) {
    const cat = categories.find(c => c.id === Number(paths[1]));
    crumbs.push({ name: 'Categories', url: '/categories' });
    crumbs.push({ name: cat ? cat.title : paths[1], url: `/category/${paths[1]}` });
  } else if (paths[0] === 'product' && paths[1]) {
    crumbs.push({ name: 'Categories', url: '/categories' });
    const cat = categories.find(c => c.id === product?.categoryId);
    if (product?.categoryId) {
      crumbs.push({
        name: cat ? cat.title : String(product.categoryId),
        url: `/category/${product.categoryId}`
      });
    }
    crumbs.push({ name: product ? product.title : paths[1], url: `/product/${paths[1]}` });
  } else {
    // Общий случай — добавляем каждый сегмент пути
    paths.forEach((segment, idx) => {
      const url = '/' + paths.slice(0, idx + 1).join('/');
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      crumbs.push({ name, url });
    });
  }



  return (
    <nav className="breadcrumb">
      <ol className="breadcrumb-list">
        {crumbs.map(({ name, url }) => (
          <React.Fragment key={url}>
            <li className="breadcrumb-item">
              <Link to={url}>{name}</Link>
            </li>
            <div className="breadcrumb-line"></div>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
