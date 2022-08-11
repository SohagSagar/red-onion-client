import React from 'react';

const TestimonialCard = ({ review }) => {
    const { name, profession, imageURL, rating, review: userReview } = review
    const dummyImage='https://i.ibb.co/64Jfd5g/dummy-user.png'
    return (
        <div className=" lg:w-[500px] xs:max-w-xs h-52 bg-base-100 border-2 border-primary  rounded-xl mt-20 mx-auto">
            <div className="card-body">
                <div className="avatar mx-auto mt-[-80px] z-100  ">
                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={imageURL ? imageURL : dummyImage} alt={'reviewer_image'} />
                    </div>
                </div>
                <div className='mx-auto'>
                    <p className='text-center font-semibold'>{name}</p>
                    <p className='text-gray-500 text-center text-sm leading-none'>An {profession}</p>
                </div>
                <p className='break-all text-gray-600'>{userReview}</p>

                <div className="rating rating-sm mx-auto gap-2">

                    {
                        parseInt(rating) === 5 ?
                            <>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />

                            </> :

                            parseInt(rating) === 4 ?
                            <>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                            </> :

                            parseInt(rating) === 3 ?
                            <>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                            </>:

                            parseInt(rating) === 2 ?
                            <>
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                            </>:
                             <>
                                 <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                 <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                 <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                 <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                                 <input type="radio" name="rating-2" className="mask mask-star-2 bg-gray-400" />
                             </>


                    }

                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;