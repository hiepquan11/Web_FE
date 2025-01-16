export async function addToCart(productId:number, quantity:number) {
    try {
        const response = await fetch('http://localhost:8080/api/cart/add',{
            method: 'POST',
            body : JSON.stringify({
                productId,
                quantity
            })
        });
        if(!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add to cart");
        }
        return await response.json();
    } catch (error : any) {
        console.log("Error to add to cart: ", error.message);
        throw new Error(error.message || "An error occurred while adding to cart");
    }
}