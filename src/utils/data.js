import i1 from '../img/i1.png'
import d8 from '../img/d8.png'
import postreHero1 from '../img/postreHero1.png'
import c7 from '../img/c7.png'

export const heroData = [
    {
        id: 1, name: 'Helados',
        description: 'Oferta',
        price: '5.25',
        imageSrc: i1
    },
    {
        id: 2, name: 'Postres',
        description: 'Oferta',
        price: '8.25',
        imageSrc: postreHero1
    },
    {
        id: 3, name: 'Rotisería',
        description: 'Oferta',
        price: '7.25',
        imageSrc: c7
    },
    {
        id: 4, name: 'Bebidas',
        description: 'Oferta',
        price: '10.25',
        imageSrc: d8
    }

    // {
    //     id: 4, name: 'Rotisería',
    //     description: 'Oferta',
    //     price: '7.25',
    //     imageSrc: c7
    // },
    // {
    //     id: 4, name: 'Rotisería',
    //     description: 'Oferta',
    //     price: '7.25',
    //     imageSrc: c7
    // }
]

export const categories = [
    {
        id: 1,
        name: "Alimentos",
        urlParamName: "food",
    },
    {
        id: 2,
        name: "Frutas y Verduras",
        urlParamName: "vegetables",
    },
    {
        id: 3,
        name: "Lácteos",
        urlParamName: "milkproducts",
    },
    {
        id: 4,
        name: "Bebidas",
        urlParamName: "drinks",
    },
    {
        id: 5,
        name: "Postres",
        urlParamName: "desserts",
    },
    {
        id: 6,
        name: "Helados",
        urlParamName: "icecreams",
    },
    {
        id: 7,
        name: "Harinas y Pan",
        urlParamName: "bakery",
    },
    {
        id: 8,
        name: "Otros",
        urlParamName: "various",
    },
];
