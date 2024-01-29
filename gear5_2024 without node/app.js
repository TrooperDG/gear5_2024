const express = require("express");
const userModel = require("./model/users");
const productModel = require("./model/products");
const cookieParser= require("cookie-parser");
// const { name } = require("ejs");
// const {isloggedin} = require("./routes/index")

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());




function isLoggedIn(req, res, next){
    const availableuser =req.cookies.user
    if(availableuser){ 
      next(); 
    }else{
      res.redirect("/login")
    }
};





app.get("/",async (req, res) => {

  const userG = req.cookies.user
  
  const haloi = await productModel.find();
  

  if(userG){
    res.render("index", { user: userG, products: haloi})
  }else{
     res.render("index",{user:"",products: haloi})
  }

  console.log(userG);
  // console.log(haloi);
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) =>{
  try {
    const kipu= await userModel.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
    
    // console.log(kipu);
    res.redirect("/login");
    
  } catch (error) {
    console.log(error);
    res.send("something went wrong")
  }
}); 

app.post("/login", async (req, res) =>{
  
  try {
    const email = req.body.email;
    const password = req.body.password;
    const kipu = await userModel.findOne({email, password})
    // console.log(email); 
    // console.log(password);
    // console.log(kipu);


    // res.cookie("fname" , kipu.firstName)
    // res.cookie("lname" , kipu.lastName)
    res.cookie("user",kipu )

    if(kipu) res.redirect("/")
    
  } catch (error) {
    console.log(error)
    res.send("something went wrong")
  }
})
 


 app.get("/logout", (req, res) => {
  
     res.clearCookie("user");
     
     res.redirect("/");
  
 })


//  app.get("/create",async (req, res) => {
//    const hala = await productModel.create({
//      name: "rog",
//      image: "https://m.media-amazon.com/images/I/81dP-TY+9uL._SY450_.jpg",
//      review: {
//        stars: 5,
//        count: 34,
//      },
//      price: "888.99",
//    })

//    res.send(hala)
//  })

app.get("/checkout", isLoggedIn, async (req, res) => {
  const userG = req.cookies.user

  const puki = await userModel.findById(userG._id).populate("cart.productId") 
  const cartData = puki.cart
 
  if (userG) {
    res.render("cart-checkout", { user: userG, cartData: cartData })
  } else {
    res.render("cart-checkout", { user: "", cartData: "" })
  }

 
})




 app.post("/cart", async (req, res) => {

    const availableuser =req.cookies.user
    if(availableuser){


   const cartPid = req.body.cart


   const userId = req.cookies.user._id

   console.log(cartPid)
   /////////////////////////////////////////////

   const UserDoc = await userModel.findById(userId)

   const userCart = UserDoc.cart
   console.log("/////////////////////////") 

   let matchingItem

   for (const item of userCart) {
     const kiputid = item.productId.toString()
     if (cartPid === kiputid) {
       matchingItem = kiputid
     }
   }

   if (matchingItem) {
     console.log("GET", matchingItem)
     try {
       const jjuser = await userModel.findById(userId)
       const Total = (jjuser.cartTotal += 1)

       if (!jjuser) {
         console.log("User not found")
         return
       }

       // Find the index of the product in the cart array
       const index = jjuser.cart.findIndex((item) =>
         item.productId.equals(matchingItem)
       )

       if (index === -1) {
         console.log("Product not found in cart")
         return
       }

       // Update the quantity of the found product
       jjuser.cart[index].quantity += 1

       // Save the updated user
       const updatedUser = await jjuser.save()

       console.log("User with updated cart://///", updatedUser, Total)

       res.cookie("user", jjuser)
       res.json(Total)
     } catch (error) {
       console.error(error)
     }
   } else {
     console.log("nothing", matchingItem)

     const jjuser = await userModel.findById(userId)
     const Total = (jjuser.cartTotal += 1)
     jjuser.cart.push({
       productId: cartPid,
       quantity: 1,
     })

     try {
       await jjuser.save()
       console.log("User with newwwwwwwwww cart:", jjuser, Total)
     } catch (error) {
       console.log("dikkat hai bhai")
     }

     // try {
     //   const result = await userModel.findByIdAndUpdate(
     //     { _id: userId },
     //     {
     //       $push: {
     //         cart: {
     //           productId: cartPid,
     //           quantity: 1,
     //         },
     //       },
     //     },

     //     { new: true }
     //   )

     //   console.log("User with newwwwwwwwww cart:", result)
     // } catch (error) {
     //   console.log("dikkat")
     // }

     res.cookie("user", jjuser)
     res.json(Total)
   }

  }else{
    
    console.log("User not avilable in cookie");
  }




 })


 
 app.get("/dev", async (req, res)=>{

  res.render("dev");
 })


 app.post("/dev", async (req, res)=>{

  const pData= req.body;

  const hala = await productModel.create({
     name: pData.name,
     image: pData.image,
     review: {
       stars: pData.stars,
       count: pData.count,
     },
     price: pData.price,
   })

  console.log(pData);
  console.log(hala);

 
  res.render("dev");
  
 })


 app.get("/orders", async (req, res)=>{


 
  const userG = req.cookies.user

  const puki = await userModel.findById(userG._id).populate("cart.productId")
  const cartData = puki.cart

  if (userG) {
    res.render("orders", { user: userG, cartData: cartData })
  } else {
    res.render("orders", { user: "", cartData: "" })
  }
  
 })

 

 
app.listen(3000);
   