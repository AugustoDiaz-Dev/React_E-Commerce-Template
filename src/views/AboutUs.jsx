import React from 'react'
import shop from '../img/about/shop.jpg'

const AboutUs = () => {
    return (
        <section className='w-full h-screen'>
            <h2 className='text-center p-8 text-3xl'>About Us</h2>
            <div className='lg:w-2/4 sm:w-full m-auto '>
                <p>El Gusto de Sonia es un negocio familiar con 5 años de vida.</p>
                <br />
                <p>A lo largo del tiempo siempre intentamos crecer e incorporar nuevos productos y servicios siempre pensando en el beneficio de nuestro cliente. </p>
                <br />
                <p>Nuestra misión es brindarles la mejor calidad al mejor precio. ¡Los esperamos!</p>
                <br />
                <img src={shop} className='w-full rounded' alt='Shop' />
            </div>

        </section >
    )
}

export default AboutUs