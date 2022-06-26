import Directory from "./components/directory/directory.component";

const App = () => {
    const categories = [
        {
            id: 1,
            title: "Hats",
            imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
        },
        {
            id: 2,
            title: "Jackets",
            imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
        },
        {
            id: 3,
            title: "Sneakers",
            imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
        },
        {
            id: 4,
            title: "Babies",
            imageUrl:
                "https://i.pinimg.com/originals/9d/6c/db/9d6cdb45ff7b3400b2a5bb9a8cdc5775.png",
        },
        {
            id: 5,
            title: "Womens",
            imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
        },
        {
            id: 6,
            title: "Mens",
            imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
        },
        {
            id: 7,
            title: "Groceries",
            imageUrl:
                "https://toppng.com/uploads/preview/grocery-png-11553955872cerceh5w5f.png",
        },
        {
            id: 8,
            title: "Electronics",
            imageUrl:
                "https://w7.pngwing.com/pngs/454/1021/png-transparent-consumer-electronics-gadget-advanced-electronics-electronic-component-others-electronics-laptop-electronic-device.png",
        },
    ];

    return (
        <Directory propsCategories={categories} />
    );
};

export default App;
