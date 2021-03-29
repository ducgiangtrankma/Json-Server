const faker = require('faker');
const fs = require('fs');
faker.locale = "vi";
const randomCategoryList = (n)=>{
    const categoryList = [];
    if(n <= 0) return [];
    //Loop
    Array.from(new Array(n)).forEach(()=>{
        const category = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        categoryList.push(category)
    })
    return categoryList;
}
const randomProductList = (categoryList, numberOfProducts)=>{
    const productList = [];
    if(numberOfProducts <= 0) return [];

    //random
    for(const category of categoryList){
        Array.from(new Array(numberOfProducts)).forEach(()=>{
            const product = {
                id: faker.random.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price : Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt : Date.now(),
                thumbnailUrl : faker.image.imageUrl(400,400),
                categoryId : category.id,
            };
            productList.push(product)
        })
    }

    return productList;
}
//IFFE
(()=>{
    //random data
    const categoryList = randomCategoryList(2)
    const productList = randomProductList(categoryList,2)
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name :'Giang'
        }
    };
    //write db obj to db.json
    fs.writeFile('./db.json',JSON.stringify(db),()=>{
        console.log('Write successfully')
    });
})()