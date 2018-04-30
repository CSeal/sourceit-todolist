export const Categories = {
    1: {
        id: 1,
        title: "Изучение ReactJS",
        parent: null
    },
    2:{
        id: 2,
        title: "Изучение создание компонетов",
        parent: 1
    },
    3: {
        id: 3,
        title: "Изучение стека MEAN",
        parent: null
    },
    4:{
        id: 4,
        title: "Изучение AngularJS",
        parent: 3
    },
    5:{
        id: 5,
        title: "Изучение TypeScript",
        parent: 4
    },
    6:{
        id: 6,
        title: "Изучение Mongo",
        parent: 3
    },
    7:{
        id: 7,
        title: "Изучение Redux",
        parent: null
    },
    8:{
        id: 8,
        title: "Изучение NodeJS",
        parent: 3
    },
    9:{
        id: 9,
        title: "Изучение Expres",
        parent: 3
    },
    10:{
        id: 10,
        title: "Изучение Commet",
        parent: 8
    },
    11:{
        id: 11,
        title: "Изучение Scope",
        parent: 4
    }

};
export const ToDoList = {
    1: {
        id: 1,
        title:"Сделать домашку ко второму уроку",
        text: "Продумать структуру приложения ToDo",
        dateToDone: "Fri Apr 13 2018",
        categoriesId: "1",
        done: true
    },
    2: {
        id: 2,
        title:"Научится создовать компоненты",
        text: "Научится создавать компоненты из функций и ES6 классов.\n\rРазобратся с их особеностями применения",
        dateToDone: "Mon Apr 16 2018",
        categoriesId: "2",
        done: false
    }
};

export default {
    Categories,
    ToDoList
}