import React from 'react'
import { heroData } from '../utils/data'
import heroBg from '../img/heroBg.png'

const Header = () => {
    return (
        <header className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-10 mb-12' id='home'>
            {/* Title starts */}
            <div className='py-2 flex-1 flex flex-col items-start md:items-center justify-center gap-6'>

                <p className='text-[2.5rem] lg:[4.5rem] font-bold tracking-wide text-headingColor'>
                    Todos los productos que quieras en...<br />
                    <span className='text-myGreen text-[3rem] md:text-[5rem]'>¡El gusto de Sonia!</span>
                </p>

                <p className='text-base text-textColor text-center md:w-[80%] font-semibold'>
                    ¡Veni a visitarnos! Estamos en  Av. 7 de Marzo 2808!
                </p>

                <button type='button' className='bg-gradient-to-br from-slate-300 to-black text-primary w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-xl transition-all ease-in-out duration-100 mb-2'>Contacto</button>
            </div>
            {/* Title ends */}
            {/* Pictures start */}
            <div className='py-2 flex-1 flex items-center relative'>
                {/* Background Hero starts */}
                <img src={heroBg} className='ml-auto h-420 w-full lg:w-auto lg:h-650 lg:hidden' alt='Hero background' />
                {/* Background Hero ends */}
                {/* Static Cards Hero start */}
                <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 xl:px-0 xl:gap-10 flex-wrap'>
                    {heroData && heroData.map(item => (
                        <div
                            key={item.id}
                            className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                        >
                            <img
                                src={item.imageSrc}
                                className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                                alt="I1"
                            />
                            <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                                {item.name}
                            </p>

                            <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                                {item.description}
                            </p>

                            <p className="text-sm font-semibold text-headingColor">
                                <span className="text-xs text-myGreen">$</span> {item.price}
                            </p>
                        </div>

                    ))}
                </div>
                {/* Static Cards Hero end */}
            </div>
            {/* Pictures end */}
        </header>
    )
}

export default Header