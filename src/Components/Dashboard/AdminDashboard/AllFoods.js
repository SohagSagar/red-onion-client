import React,{ useState }  from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import swal from 'sweetalert';
import auth from '../../../Firebase/Firebase';
import Loading from '../../SharedComponents/Loading';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { Helmet } from 'react-helmet-async';

const AllFoods = () => {
    const navigate = useNavigate()
    const [category,setCategory]=useState('all-foods');
    const { data: foods, isLoading, refetch } = useQuery(['all-foods',category], () => fetch(`https://vast-wave-53666.herokuapp.com/all-foods/${category}`, {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 403 || res.status === 401) {
            signOut(auth);
            navigate('/login');
            localStorage.removeItem('accessToken');
            toast.error('Forbidden Access');
        }
        return res.json();
    }))


    const handledelete = (id) => {

        swal({
            title: "Are you sure to delete?",
            text: `Order ID: ${id}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://vast-wave-53666.herokuapp.com/food-items/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                        },

                    })
                        .then(res => {
                            if (res.status === 403 || res.status === 401) {
                                signOut(auth);
                                navigate('/login');
                                localStorage.removeItem('accessToken');
                                toast.error('Forbidden Access');
                            }
                            return res.json();
                        })
                        .then(data => {
                            if (data.deletedCount) {
                                toast.success('Item deleted successfully');
                                refetch();
                            }
                            else {
                                toast.error('Fail to delete item')
                            }
                        })

                }
            });

        return;

    }
    return (
        <div data-aos="fade-zoom-in"
        data-aos-easing="ease-in"
        data-aos-delay="30"
        data-aos-offset="0" className='mx-auto'>
            <Helmet><title>All Foods - Red Onion</title></Helmet>
            <div className='text-center font-bold text-xl my-5'>
                <p className='text-sm'>Food Collections</p>
            </div>



            {
                foods?.lenght < 1 ? <p className='text-center text-lg my-12'>No Food to review</p> :
                    <div className="overflow-x-auto">
                        <div className='flex justify-start'>
                            < div className='flex items-center gap-2'>
                                <p className='text-md font-semibold'>Filter: </p>
                                <select onChange={(e)=>setCategory(e.target.value)} className="select select-bordered select-sm w-full max-w-xs onFo">
                                    <option value={'all-foods'}>All</option>
                                    <option value={'Breakfast'} >Breakfast</option>
                                    <option value={'Lunch'}>Lunch</option>
                                    <option value={'Dinner'}>Dinner</option>
                                </select>
                            </div>
                        </div>
                        <table className="table table-compact lg:w-[1000px] font-semibold">

                            <thead className=''>
                                <tr>
                                    <th>SL</th>
                                    <th>Food Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price ($)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    isLoading ?  <tr><td colSpan="4"><Loading /></td></tr> :
                                        [...foods]?.reverse()?.map((food, index) =>
                                            <tr key={food?._id}>
                                                 <td>{index+1}</td>
                                                <td><img className='w-16 rounded' src={food.imageURL} alt="" srcSet="" />{}</td>
                                                <td>{food?.name}</td>
                                                <td>{food?.category}</td>
                                                <td>{food.price}</td>
                                                <td><>
                                                     <span onClick={() => handledelete(food?._id)} className='text-red-500 cursor-pointer'>Delete</span>
                                                </></td>
                                            </tr>
                                        )

                                }



                            </tbody>
                        </table>
                    </div>
            }


        </div>

    );
};

export default AllFoods;