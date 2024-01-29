// import {products} from './data/product_data.js';
// import {cart} from './data/cart.js';

const cart = [];

// let productsHTML = '';

// products.forEach(product => {
//     productsHTML += `
//     <div class="product"> 
//         <div class="product-image">
//             <img src="images/${product.image}" alt="">
//         </div>

//         <div class="product-details-container">
//             <div class="product-name-container">
//                 <div class="product-name">${product.name} </div>
//             </div>
//                 <div class="product-review">

//                     <div class="product-review-stars">
//                         <img src="images/ratings/rating-${
//                           product.review.stars * 10
//                         }.png" alt="">
//                     </div>
//                     <div class="product-review-count">${
//                       product.review.count
//                     } </div>

//                 </div>
//                 <div class= "product-price-container">
//                     <div class="rupee-symbol"> &#8377 </div>
//                     <div class="product-price">${product.price} </div>
//                 </div>
//             <div class="product-addToCart-container">
//                 <button class="addToCart-button js-addToCart-button"  data-product-id="${
//                   product.id
//                 }">Add To Cart</button>
//             </div>
//         </div>
         

//     </div>

//     `

//     document.querySelector('.js-product-container')
//     .innerHTML= productsHTML;
// });



const updateUserCart = async (cartData) => {
    
    try {
        const response = await fetch("/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: cartData }),
        })
          
        
        
        if (response.ok) {
          
          console.log("User cart updated successfully:")
        } else {
          console.error("Failed to update user cart:", response.statusText)
        }
        

    } catch (error) {
        console.log(error)

    }
};



document.querySelectorAll('.js-addToCart-button')
    .forEach((button) =>{
        button.addEventListener('click', ()=>{
            // console.log('Added Product');
            // console.log(button.dataset.productId)
            const productId= button.dataset.productId;

            updateUserCart(productId);

            fetchCartData();


            // console.log(productId);

            // let matchingItem;
            // cart.forEach((item)=>{
            //     if(productId === item.productId){
            //         matchingItem= item;
            //     }
            // });

            // if(matchingItem){
            //     matchingItem.quantity += 1;
            // }else{
            //     cart.push({
            //         productId: productId,
            //         quantity: 1
            //     });

                 
            // }

            // let cartQuantity = 0;

            // cart.forEach((item) =>{
            //     cartQuantity += item.quantity;
            // })

            
            
            
///////////////////////////////////////////////////

///////////////////////////////////////////

            
        })
    })

    function fetchCartData() {
      fetch("/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // You might want to send some data in the request body
        // body: JSON.stringify({ /* your data here */ }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
          }
          return response.json()
        })
        .then((data) => {
          // Handle the fetched cart data
          updateCartTotal(data)
        })
        .catch((error) => console.error("Error fetching cart data:", error))
    }



    function updateCartTotal(cartQuantity) {
      document.querySelector(".js-cart-value").innerHTML = cartQuantity;

      console.log(cart)
      console.log("///////////////////////",cartQuantity)
    }