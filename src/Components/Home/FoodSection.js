import React from 'react';
import Loading from '../SharedComponents/Loading';
import '../../Styles/FoodSection.css';
import { useState } from 'react';
import { useQuery } from 'react-query';
import FoodCard from './FoodCard';

const FoodSection = ({searchText}) => {
    const [category, setCategory] = useState('Breakfast');
    const [activeBtn, setActiveBtn] = useState('breakfast');

    const { data: foods, isLoading } = useQuery(['food-items', category], () => fetch(`https://red-onion-server.up.railway.app/food-items/${category}`).then(res => res.json()))


    const breakfastBtn = () => {
        setActiveBtn('breakfast');
        setCategory('Breakfast');
    }
    const lunchBtn = () => {
        setActiveBtn('lunch');
        setCategory('Lunch');
    }
    const dinnerBtn = () => {
        setActiveBtn('dinner');
        setCategory('Dinner');
    }
    return (
        <div className='lg:px-12 text-accent py-12'>
            <div className='flex justify-center items-center '>
                <p onClick={breakfastBtn} className={`mx-5  font-semibold cursor-pointer ${activeBtn === 'breakfast' && 'border-b-2 border-red-500 text-primary py-2'}`}>Breakfast</p>
                <p onClick={lunchBtn} className={`mx-5  font-semibold cursor-pointer ${activeBtn === 'lunch' && 'border-b-2 border-red-500 text-primary py-2'}`}>Lunch</p>
                <p onClick={dinnerBtn} className={`mx-5  font-semibold cursor-pointer ${activeBtn === 'dinner' && 'border-b-2 border-red-500 text-primary py-2'}`}>Dinner</p>
            </div>

            {
                isLoading ? <Loading /> :
                    <div data-aos="fade-up" className='grid lg:grid-cols-3 sm:grid-cols-1 justify-items-center items-center'>
                        {
                            foods?.filter((val) => {
                                if (!searchText) {
                                    return val;
                                } else if (
                                    val.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                    val.price.toLowerCase().includes(searchText.toLowerCase())
                                ) {
                                    return val;
                                }
                            })?.map(food => <FoodCard
                                key={food._id}
                                food={food}
                            ></FoodCard>)
                        }
                    </div>
            }
        </div>
    );
};

export default FoodSection;