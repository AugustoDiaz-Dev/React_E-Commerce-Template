import React from 'react'
import { SiInstagram, SiWhatsapp, SiFacebook } from 'react-icons/si'

const Footer = () => {
    return (
        <footer className='gap-2 w-full text-center p-8'>
            <div className='flex justify-between align-center max-w-xs m-auto'>

                <a href="https://github.com/AugustoDiaz-Dev"><SiInstagram className='text-2xl text-black' /></a>
                <a href="https://github.com/AugustoDiaz-Dev"><SiFacebook className='text-2xl text-black' /></a>
                <a href="https://github.com/AugustoDiaz-Dev"><SiWhatsapp className='text-2xl text-blacks' /></a>

            </div>
            <p className='text-black font-bold mt-2'>
                &copy; <a href="https://github.com/AugustoDiaz-Dev">Augusto Diaz</a>, 2022.
            </p>
        </footer>
    )
}

export default Footer