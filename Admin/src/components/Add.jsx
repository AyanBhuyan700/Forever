import React, { useState } from "react";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Loader from "../components/Loader";

function Add() {
  const url = import.meta.env.VITE_PORT_API_URL;
  const [loading, setLoading] = useState(false)
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    bestSeller: false,
    sizes: [],
  });

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeSelection = (size) => {
    setForm((prevForm) => ({
      ...prevForm,
      sizes: prevForm.sizes.includes(size)
        ? prevForm.sizes.filter((s) => s !== size)
        : [...prevForm.sizes, size],
    }));
  };

  async function createProduct() {
    try {
      setLoading(true)
      let formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, key === "sizes" ? JSON.stringify(form[key]) : form[key]);
      });
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);

      await axios.post(`${url}/api/product/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toastr.success("Product added successfully!");
      resetForm();
      setLoading(false)
    } catch (error) {
      toastr.error("Something went wrong!");
      setLoading(false)
    }
  }

  function resetForm() {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "Men",
      subCategory: "Topwear",
      bestSeller: false,
      sizes: [],
    });
    setImage1(null);
    setImage2(null);
  }

  function onProductSubmit(e) {
    e.preventDefault();
    createProduct();
  }

  if(loading) return <Loader/>

  return (
    <form className="flex flex-col w-full items-start gap-3" onSubmit={onProductSubmit}>
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[image1, image2].map((img, index) => (
            <label key={index}>
              <img src={img ? URL.createObjectURL(img) : "/images/img.png"} className="w-20" alt={`Upload Image ${index + 1}`} />
              <input type="file" hidden onChange={(e) => (index === 0 ? setImage1(e.target.files[0]) : setImage2(e.target.files[0]))} />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here" value={form.name} onChange={changeHandler} name="name" />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea className="w-full max-w-[500px] px-3 py-2" placeholder="Write content here" value={form.description} onChange={changeHandler} name="description" />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Category</p>
          <select className="w-full px-3 py-2" onChange={changeHandler} name="category">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub Category</p>
          <select className="w-full px-3 py-2" onChange={changeHandler} name="subCategory">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Price</p>
          <input className="w-full px-3 py-2 sm:w-[120px]" type="number" placeholder="20" value={form.price} onChange={changeHandler} name="price" />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div key={size} className={`px-3 py-1 cursor-pointer ${form.sizes.includes(size) ? "bg-[#fce7f3]" : "bg-gray-200"}`} onClick={() => handleSizeSelection(size)}>
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <input type="checkbox" id="bestSeller" onChange={changeHandler} name="bestSeller" checked={form.bestSeller} />
        <label htmlFor="bestSeller">Add to Bestseller</label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white">ADD</button>
    </form>
  );
}

export default Add;
