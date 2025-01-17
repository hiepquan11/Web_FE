import { error } from "console";
import RemoveItemInterface from "../Models/RemoveItemInterface";

export async function addToCart(productId:number, quantity:number, token: string) {
    try {
        const response = await fetch('http://localhost:8080/api/cart/add',{
            method: 'POST',
            body : JSON.stringify({
                productId,
                quantity
            }),
            headers : {
                "Content-Type": 'application/json',
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

export async function removeItemFromCart(productId: number): Promise<any> {
    try {
        const token : string | null = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/cart/delete',{
            method: "DELETE",
            body: JSON.stringify({productId}),
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if(!response.ok){
            throw new Error("Failed to delete item from cart")
        }
        return await response.json();
    } catch (error:any) {
        console.log(error.message);
    }
}