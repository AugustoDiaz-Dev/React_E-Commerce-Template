import React from 'react'
import { heroData } from '../utils/data'
import delivery from '../img/delivery.png'
import heroBg from '../img/heroBg.png'

const Header = () => {
    return (
        <header className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-10 mb-12' id='home'>
            <div className='py-2 flex-1 flex flex-col items-start md:items-center justify-center gap-6'>

                <p className='text-[2.5rem] lg:[4.5rem] font-bold tracking-wide text-headingColor'>
                    The fastest delivery in
                    <span className='text-myGreen text-[3rem] md:text-[5rem]'>your city</span>
                </p>

                <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur placeat repellendus nam porro hic quisquam? Esse quia aliquam voluptate qui quaerat mollitia, ducimus asperiores quod? Placeat laudantium necessitatibus iure maiores!
                </p>

                <button type='button' className='bg-gradient-to-br from-slate-300 to-black text-primary w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>Comprar</button>
                <div className='flex items-center gap-2 justify-center bg-myGreen px-2 py-1 rounded-full'>
                    <p className='text-base text-black font-semibold'>Delivery</p>
                    <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
                        <img src={delivery} className='w-full h-full object-contain' alt='delivery' />
                    </div>

                </div>
            </div>


            <div className='py-2 flex-1 flex items-center relative'>

                <img src={heroBg} className='ml-auto h-420 w-full lg:hidden' alt='hero' />
                {/* <img src={heroBg} className='ml-auto h-420 w-full lg:w-auto lg-:h-650' alt='hero' /> */}
                <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap'>

                    {heroData && heroData.map(n => (
                        <div key={n.id} className='lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify center drop-shadow-lg mb-12'>
                            <img src={n.imageSrc} className='w-20 lg:w-40 -mt-10 lg:-mt-20' alt='i1' />
                            <p className='text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'>{n.name}</p>
                            <p className='text-[12px] lg:text-sm text-lightTextGray font-semibold my-1 lg:my-3'>{n.description}</p>
                            <p className='lg:text-sm font-semibold text-headingColor'>
                                <span className='text-xs text-red-600'>$</span>
                                {n.price}
                            </p>

                        </div>
                    ))}

                </div>


            </div>
        </header>
    )
}

export default Header