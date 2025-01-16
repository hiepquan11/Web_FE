// src/components/CartPage.tsx
import React, { useEffect, useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  totalPrice: number;
}

const Cart: React.FC = () => {
  // Dữ liệu mẫu cho giỏ hàng
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);


  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart data:", error);
      }
    }
    setLoadingData(false); // Data loading complete
  }, []); // Empty dependency array ensures this runs once on mount

  if (loadingData) {
    return <p>Loading...</p>; // Show a loading state
  }

  // Hàm tính tổng giá
  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Hàm xóa sản phẩm
  const removeItem = (id: number): void => {
    setCartItems(cartItems.filter((item) => item.id !== id));
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
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td>{item.price.toLocaleString()} VND</td>
                  <td>{item.quantity}</td>
                  <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                  <td>
                    <button
                      onClick={() => removeItem(item.id)}
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
