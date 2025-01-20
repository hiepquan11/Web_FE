// src/components/CartPage.tsx
import React, { useEffect, useState } from "react";
import { getCart, removeItemFromCart } from "../../../Api/CartApi";
import RemoveItemInterface from "../../../Models/RemoveItemInterface";

interface CartItem {
  id: number;
  productName: string;
  price: number;
  productQuantity: number;
  imageUrl: string[];
  totalPrice: number;
  productId: number
}

const Cart: React.FC = () => {
  // Dữ liệu mẫu cho giỏ hàng
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const storedCart = localStorage.getItem('cart');

        if (!token) {
          if(storedCart){
          const parsedCart: CartItem[] = JSON.parse(storedCart);
          setCartItems(parsedCart);
          }
        } else {
          if (token) {
            const responseData = await getCart(token); 
            if (responseData) {
              setCartItems(responseData);
              
            }
          }
        }
      } catch (error: any) {
        console.error("Error loading cart data:", error.message);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);
  if (loadingData) {
    return <p>Loading...</p>; // Show a loading state
  }

  // Hàm tính tổng giá
  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.productQuantity, 0);
  };

  // Hàm xóa sản phẩm

const removeItem = async (id: number) => {
  setIsDeleting(id); // Đánh dấu sản phẩm đang được xóa

  try {
    const response = await removeItemFromCart(id);
    if (response) {
      setCartItems(cartItems.filter((item) => item.productId !== id));
      alert("Delete successfully")
    } else {
      alert('Failed to delete item.');
    }
  } catch (error) {
    console.error(error);
    alert('Error occurred while deleting the item.');
  } finally {
    setIsDeleting(null); // Xóa trạng thái sau khi hoàn tất
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">Giỏ hàng trống.</p>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Sản phẩm</th>
                <th className="text-left py-2">Giá</th>
                <th className="text-left py-2">Số lượng</th>
                <th className="text-left py-2">Tổng</th>
                <th className="text-left py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="flex items-center py-4">
                    <img
                      src={item.imageUrl[0]}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <span>{item.productName}</span>
                  </td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td>{item.productQuantity}</td>
                  <td>{(item.price * item.productQuantity).toLocaleString()} VND</td>
                  <td>{item.productId}</td>

                  <td>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 text-right">
            <p className="text-lg font-bold">
              Tổng cộng: {calculateTotal().toLocaleString()} VND
            </p>
            <button className="bg-blue-500 text-white px-6 py-2 mt-4 rounded hover:bg-blue-600">
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
