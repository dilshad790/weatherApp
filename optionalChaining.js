const user={
    name:"Dilshad",
    age:28,
    address:{
        street:"Main Road",
        City:"Gaya",
        state:"Bihar",
        zip:101
    }

};

console.log("Hello");
const name=user.name;
console.log(user.address);
console.log(user.address.street);
console.log(user.address.City);
console.log(user.address.pincode);
console.log(user.pincode);
console.log(user.city);

console.log(user.address.state.city);
console.log(user.address.village);
// console.log(user.address.village.name); //  it will throw an error bcz village ke andar name exist ni krta hai

// Optional Chaining
console.log(user.address.village?.name); // error handeled using optional chaining operator(?)
// means exist krta hai to show kro wrna ni show ni kro

console.log(user?.address?.country);
console.log(user?.address?.state);


// it can used in array of an object
const user2=[
    {name:"Dilshad",age:28},
    {name:"Aman",age:12},
    {name:"Sadab",age:18}
]

console.log(user2[0].name);
console.log(user2[2]);
// console.log(user2[3].name);// sabse phle to index 3rd is not exist then uske andar name exist ni krta hai
console.log(user2[3]?.name);// error resolved