import React, { useState } from 'react'

const ContactForm = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            firstName, lastName, email, message
        }
        console.log(formData);
    }

    return (
        <form className='flex flex-col items-center justify-center xl:w-2/4 m-auto' onSubmit={handleSubmit}>
            <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Name" className='m-2 p-2 rounded' />
            <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className='m-2 p-2 rounded' />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className='m-2 p-2 rounded' />
            <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message' rows={6} cols={24} className='m-2 p-2 rounded'></textarea>
            <button className='m-4 px-4 py-2 rounded bg-white'>Submit</button>
        </form >
    )
}

export default ContactForm