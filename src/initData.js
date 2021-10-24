import { v4 as uuidv4 } from 'uuid';

export const MealTypesEnum = {
    MEAL: 'dish',
    SIDE: 'side',
    MAIN: 'main'
}


let initData = {
    menuList: [
        {
            uuid: uuidv4(),
            name: 'Calabaza Rellena',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Milanesa de berenjena',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Milanesa de pescado',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Pastel de papas',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Cerdo al horno con salsa de verdeo, papas y batatas',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Canelones de Verdura con salga boloñesa',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Milanesa de carne vacuna',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Milanesa de carne pollo',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Hamburguesas',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Tarta de calabaza choclo y queso',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Arroz',
            type: MealTypesEnum.SIDE
        },
        {
            uuid: uuidv4(),
            name: 'Ensalada rusa',
            type: MealTypesEnum.SIDE
        },
        {
            uuid: uuidv4(),
            name: 'Arroz primavera',
            type: MealTypesEnum.SIDE
        },
        {
            uuid: uuidv4(),
            name: 'Ensalada de tomate, zanahoria y huevo',
            type: MealTypesEnum.SIDE
        },
        {
            uuid: uuidv4(),
            name: 'Tarta de zapallitos',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Tarta de jamon y queso',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Tarta de atun',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Tortilla de papas',
            type: MealTypesEnum.SIDE
        },
        {
            uuid: uuidv4(),
            name: 'Empanadas',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Fideos',
            type: MealTypesEnum.SIDE
        },
        {
            uuid: uuidv4(),
            name: 'Torrejas de acelga',
            type: MealTypesEnum.SIDE
        },
        {
            uuid: uuidv4(),
            name: 'Pechuga a la plancha',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Fideos con tuco y carne picada',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Ravioles de verdura con salsa fileto',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Pizza',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Lasaña de verdura',
            type: MealTypesEnum.MEAL
        },
        {
            uuid: uuidv4(),
            name: 'Albondigas',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Pure de papas',
            type: MealTypesEnum.SIDE
        },
        {
            uuid: uuidv4(),
            name: 'Pure de calabaza',
            type: MealTypesEnum.SIDE
        },
        {
            uuid: uuidv4(),
            name: 'Pollo',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Crunchies de pollo',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Churrascos',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Berenjena napolitanas',
            type: MealTypesEnum.MAIN
        },
        {
            uuid: uuidv4(),
            name: 'Tacos',
            type: MealTypesEnum.MEAL
        },
    ]
};

export default initData;