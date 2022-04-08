import React, { useEffect, useState } from 'react';
import { getCategories } from '../../services';
import '../../styles/pages/home.css';
import { Banner, Category } from '../components';

export const Home = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let responseCategories = await getCategories();
      setCategories(responseCategories.actionResponse.data.categories);
    }
    getData();
  });

  return (
      <main className='main bg-rainy'>
          <div className='pb-xs'>
              <Banner />
          </div>
          <div className="grid g-3-col g-g-1 px-xs pb-sm">
              {categories.map(category => <Category category={category} />)}
          </div>
      </main>
  );
}