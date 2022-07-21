import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import { categories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const CreateContainer = () => {

    const [title, setTitle] = useState('');
    const [calories, setCalories] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState('danger');
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [{ foodItems, dispatch }] = useStateValue();

    const uploadImage = (e) => {
        setIsLoading(true);
        const imagefile = e.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()}-${imagefile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imagefile);

        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (error) => {
            console.log(error);
            setFields(true);
            setMsg('Error al cargar, intente nuevamente 💩');
            setAlertStatus('danger');
            setTimeout(() => {
                setFields(false)
                setIsLoading(false)
            }, 4000)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                setImageAsset(downloadURL);
                setIsLoading(false);
                setFields(true);
                setMsg('¡Imagen Cargada con Éxito! 🎉');
                setAlertStatus('success');
                setTimeout(() => {
                    setFields(false)
                }, 4000);
            })
        })
    }

    const deleteImage = () => {
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoading(false);
            setFields(true);
            setMsg("Imagen borrada 😊");
            setAlertStatus("success");
            setTimeout(() => {
                setFields(false);
            }, 4000);
        });
    };

    const saveDetails = () => {
        setIsLoading(true);
        try {
            if (!title || !calories || !imageAsset || !price || !category) {
                setFields(true);
                setMsg("Campos obligatorios: ¡NO PUEDEN QUEDAR VACÍOS! 🙄");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFields(false);
                    setIsLoading(false);
                }, 4000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category: category,
                    calories: calories,
                    qty: 1,
                    price: price,
                };
                saveItem(data);
                setIsLoading(false);
                setFields(true);
                setMsg("¡Información cargada con éxito! 😊");
                clearData();
                setAlertStatus("success");
                setTimeout(() => {
                    setFields(false);
                }, 4000);
            }
        } catch (error) {
            console.log(error);
            setFields(true);
            setMsg("Error al cargar, inténte de nuevo 🙇");
            setAlertStatus("danger");
            setTimeout(() => {
                setFields(false);
                setIsLoading(false);
            }, 4000);
        }
        fetchData();
    };

    const clearData = () => {
        setTitle("");
        setImageAsset(null);
        setCalories("");
        setPrice("");
        setCategory("Seleccione una categoría");
    };

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            });
        });
    };

    return (
        <section className='md:w-full lg:w-3/4 m-auto lg:-mt-4 min-h-screen flex items-center justify-center'>

            <div className='w-[90%] md:w-[75%] border-2 border-myGreen rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
                {/* <h2 className='font-bold text-2xl text-myGreen drop-shadow-lg'>Editar Productos</h2> */}
                {
                    fields && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-myGreen text-emerald-800'}`}>
                            {msg}
                        </motion.p>
                    )
                }
                {/* Inputs Start */}
                {/* Title input */}
                <div className='w-full py-2 border-b border-myGreen flex items-center gap-2'>
                    <MdFastfood className='text-2xl text-myGreen bg-black' />
                    <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Título...' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
                </div>
                {/* Select Cagegory */}
                <div className='w-full'>
                    <select onChange={(e) => setCategory(e.target.value)} className='outline-none w-full text-base border-b-2 border-myGreen p-2 rounded-md cursos-pointer'>
                        <option value="other" className='bg-white text-myGreen font-semibold'>Seleccionar Categoría</option>
                        {categories && categories.map(item => (
                            <option key={item.id} className='text-base border-0 outline-none capitalize bg-white text-headingColor'
                                value={item.urlParamName}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Upload Images */}
                <div className='group flex justify-center items-center flex-col border-4 border-dotted border-myGreen w-full h-225 md:h-420 cursor-pointer rounded-lg p-1'>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            {!imageAsset ? (
                                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                    <div className="w-full h-full flex flex-col items-center justify-center">
                                        <MdCloudUpload className="text-myGreen group-hover:text-gray-700 text-3xl" />
                                        <p className="text-gray-500 group-hover:text-gray-700">
                                            Cargar una imagen
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        name="upload-image"
                                        accept="image/*"
                                        onChange={uploadImage}
                                        className="w-0 h-0"
                                    />
                                </label>
                            ) : (
                                <div className="relative h-full">
                                    <img
                                        src={imageAsset}
                                        alt="upload"
                                        className="h-full w-full object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl
                  cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                                        onClick={deleteImage}
                                    >
                                        <MdDelete className="text-white" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {/* Calories Input */}
                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-b border-myGreen flex items-center gap-2">
                        <MdFoodBank className="text-myGreen bg-black text-2xl" />
                        <input
                            type="text"
                            required
                            placeholder="Calorías..."
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500 text-textColor"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                        />
                    </div>
                    {/* Price Input */}
                    <div className="w-full py-2 border-b border-myGreen flex items-center gap-2">
                        <MdAttachMoney className="text-myGreen bg-black text-2xl" />
                        <input
                            type="text"
                            required
                            placeholder="Precio..."
                            className="w-full h-full text-lg  bg-transparent outline-none order-none placeholder:text-gray-500"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                {/* Save Button */}
                <div className="flex items-center w-full">
                    <button
                        type="button"
                        className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-myGreen px-12 py-2 rounded-lg text-lg text-white font-semibold"
                        onClick={saveDetails}
                    >
                        Guardar
                    </button>
                </div>

            </div>
        </section >
    )
}

export default CreateContainer