import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import toastr from "toastr";
import Loader from "../components/Loader"

function Collection() {
  const url = import.meta.env.VITE_PORT_API_URL;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false)

  async function getProduct() {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/api/product/view`);
      const allProducts = response.data.products || [];
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setLoading(false)
    } catch (error) {
      toastr.error("Something went wrong!");
      setLoading(false)
    }
  }

  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, []);


  const toggleCategory = (e) => {
    const { value } = e.target;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    let filtered = products;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.some((cat) => cat.toLowerCase() === product.category?.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategories, products]);

  if (loading) return <Loader />

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-[#e5e7eb]">

        <div className="sm:min-w-60">

          <p
            className="my-2 text-xl flex items-center cursor-pointer gap-2 sm:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            FILTERS {showFilters ? "▲" : "▼"}
          </p>

          {(showFilters || window.innerWidth >= 640) && (
            <div className="border border-gray-300 pl-5 py-3 mt-6">
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                {["Men", "Women", "Kids"].map((category) => (
                  <label key={category} className="flex gap-2">
                    <input
                      type="checkbox"
                      value={category}
                      className="w-3"
                      onChange={toggleCategory}
                      checked={selectedCategories.includes(category)}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <div className="inline-flex gap-2 items-center mb-3">
              <p className="text-gray-500">
                ALL <span className="text-gray-700 font-medium"> COLLECTIONS</span>
              </p>
              <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`} className="text-gray-700 cursor-pointer">
                  <div className="overflow-hidden">
                    <img
                      className="hover:scale-110 transition ease-in-out w-full h-auto"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <p className="pt-3 pb-1 text-sm">{product.name}</p>
                  <p className="text-sm font-medium">${product.price}</p>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Collection;
