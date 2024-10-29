import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import start_icon from "../Assets/star_icon.png";
import start_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, theme } = useContext(ShopContext);

  const [selectedSize, setSelectedSize] = useState("S"); // State for selected size
  const [selectedQuantity, setSelectedQuantity] = useState(1); // State for selected quantity

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const increaseQuantity = () => {
    setSelectedQuantity(prev => (prev < 10 ? prev + 1 : prev));
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) setSelectedQuantity(prev => prev - 1);
  };

  const handleQuantityChange = (value) => {
    const quantity = Math.max(1, Math.min(10, parseInt(value))); // Restrict quantity between 1 and 10
    setSelectedQuantity(quantity);
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-image">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1 className={`ph1_${theme}`}>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_icon} alt="" />
          <img src={start_dull_icon} alt="" />
          <p className={`ph1_${theme}`}>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className={`productdisplay-right-description pdiv_${theme}`}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
          aspernatur assumenda cum eligendi tenetur, enim, expedita beatae,
          quasi et esse ipsam. Unde error quae animi distinctio numquam, a
          quidem dicta!
        </div>
        <div className="productdisplay-right-size">
          <h1 className={`ph1_${theme}`}>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div
                key={size}
                className={`size-option ${selectedSize === size ? "selected" : ""}`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        <div className="productdisplay-right-quantity">
          <h1 className={`ph1_${theme}`}>Select Quantity</h1>
          <div className="quantity-selector">
            <button onClick={decreaseQuantity} disabled={selectedQuantity === 1}>-</button>
            <input
              type="number"
              min="1"
              max="10" // Enforce maximum of 10 in the input
              value={selectedQuantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
            />
            <button onClick={increaseQuantity} disabled={selectedQuantity === 10}>+</button>
          </div>
          {selectedQuantity === 10 && (
            <p className="max-quantity-note">Max 10 items</p>
          )}
        </div>
        <button
          onClick={() => {
            addToCart(product.id, selectedSize, selectedQuantity);
            toast.success("Item added to cart", {
              autoClose: 1500,
              closeButton: false,
            });
          }}
        >
          ADD TO CART
        </button>
        <ToastContainer toastStyle={{ fontWeight: "bold", marginTop: "68px" }} />
        <p className={`productdisplay-right-category pdiv_${theme}`}>
          <span>Category : </span>Women, T-shirt, Crop Top
        </p>
        <p className={`productdisplay-right-category pdiv_${theme}`}>
          <span>Tags : </span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
