export async function addToCart(productId:number, quantity:number, token: string) {
    try {
        const response = await fetch('http://localhost:8080/api/cart/add',{
            method: 'POST',
            body : JSON.stringify({
                productId,
                quantity
            }),
            headers : {
                "Authorization" : `Bearer ${token}`
            }
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

export async function getCart(token: string) {
    try {
        const response = await fetch('http://localhost:8080/api/cart/getAll',{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if(!response.ok){
            const responseData = await response.json();
            throw new Error('Error: ', responseData.message);
        }
        return await response.json();
    } catch (error : any) {
        console.log('Error: ', error.message);
        throw new Error(error.message);
    }
}