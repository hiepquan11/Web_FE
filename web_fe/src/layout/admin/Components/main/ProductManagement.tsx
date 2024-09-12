import { useEffect, useState } from "react";
import ProductModel from "../../../../Models/ProductModel";
import ImageModel from "../../../../Models/ImageModel";
import { GetAllProduct } from "../../../../Api/ProductApi";
import CategoryModel from "../../../../Models/CategoryModel";
import { getCategoryByProductID } from "../../../../Api/CategoryApi";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import RequireAdmin from "./Components/RequireAdmin";

const ProductPage = () =>{
    const [listProduct, setListProduct] = useState<ProductModel[]>([]);
    const [category, setCategory] = useState<CategoryModel>();
    const [image, setImage] = useState<ImageModel>();
    const [loadData, setLoadData] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() =>{
        GetAllProduct().then(
            productData =>{
                setListProduct(productData);
                setLoadData(false);
            }
        ).catch(
            error =>{
                setLoadData(false);
                setError(error.message);
            }
        );
    },[])

    return(
        <>
        <div className="text-black font-bold text-3xl ">
            Danh sách sản phẩm
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-64">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between pb-4">
            <div className="flex items-center space-x-4">
                <label className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for items"
                    />
                </div>
            </div>
            <div className="flex justify-center items-center mt-4 sm:mt-0">
                    <Link to="/admin/addProduct">
                        <Button className="bg-green-500 hover:bg-green-950">Thêm sản phẩm mới</Button>
                    </Link>
                </div>
        </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label  className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct.map((product) =>(
                            <tr key={product.ProductID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                    <label  className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                               {product.ProductName}
                            </th>
                            <td className="px-6 py-4">
                                {
                                  product.Category
                                }
                            </td>
                            
                            <td className="px-6 py-4">
                                {product.Price.toLocaleString('vi-VN')}đ
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                                <Button className="w-1/3 bg-yellow-300 font-medium items-center">Chỉnh sửa</Button>
                                <Button className="w-1/3 bg-red-700 font-medium items-center">Xóa</Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
               
            </div>
        </>
    )
        
}
const ProductManagementPage = RequireAdmin(ProductPage)
export default ProductManagementPage;