import React, { useEffect, useState } from "react";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Loader from "./Loader";

function List() {
  const url = import.meta.env.VITE_PORT_API_URL;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  async function getProduct() {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/api/product/view`);
      setProducts(response.data.products);
      setLoading(false)
    } catch (error) {
      toastr.error("Something went wrong!");
      setLoading(false)
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  function deleteProduct(id) {
    axios
      .delete(`${url}/api/product/remove`, { data: { id } })
      .then(() => {
        toastr.success("Product deleted successfully!");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
      })
      .catch((error) => {
        toastr.error("Something went wrong!");
      });
  }

  if (loading) return <Loader />

  return (
    <>
      <p className="mb-2 text-lg font-semibold text-center sm:text-left">All Products List</p>
      <div className="flex flex-col gap-2 overflow-x-auto">
        <div className="hidden sm:grid grid-cols-2 sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-2 sm:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            >
              <img
                className="w-12 sm:w-16 mx-auto"
                src={product.image?.[0]}
                alt={product.name}
              />
              <p className="text-center sm:text-left">{product.name}</p>
              <p className="hidden sm:block">{product.category}</p>
              <p className="hidden sm:block">${product.price}</p>
              <p
                className="text-right sm:text-center cursor-pointer text-lg text-red-500"
                onClick={() => deleteProduct(product._id)}
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>
    </>
  );
}

export default List;
