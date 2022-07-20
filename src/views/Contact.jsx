import React from 'react'
import { ContactForm } from '../components/index'

const Contact = () => {
    return (
        <section className='w-full h-screen'>
            <h2 className='text-center p-8 text-3xl'>Contact</h2>
            <div className='w-3/4 m-auto'>
                <ContactForm />
            </div>
        </section>
    )
}

export default Contact