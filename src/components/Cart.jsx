import React from 'react'
import { useSelector } from 'react-redux'
import '../stylings/cart.css'
import { RiDeleteBinLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { incrementQty, decrementQty, removeFromCart } from "../Redux/cartSlide"
import { useDispatch } from 'react-redux'


const Cart = () => {
  const data = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  // console.log(data);

  const originalTotal = data.reduce((acc, item) => {
    return acc + item.originalPrice * item.qty
  }, 0)

  const finalTotal = data.reduce((acc, item) => {
    return acc + item.finalPrice * item.qty
  }, 0)

  const discount = originalTotal - finalTotal


  return (
    <div className='cart-main'>

      {/* LEFT SIDE — CART ITEMS */}
      <div className="cart-details">
        {data.length > 0 ? (
          data.map((product, index) => (

            <div className='product-cont' key={index}>

              <div className='img-container'>
                <img src={product.images?.[0]} alt={product.title} />
              </div>

              <div className='product-info'>
                <div className='d-flex justify-content-between'>
                  <p className='product-title'>{product.title} {product.info} </p>
                  <button className='btn delete-button' onClick={() => dispatch(removeFromCart(product.id))}><RiDeleteBinLine className='text-white delete-icon' /></button>
                </div>

                <p className='product-price'>
                  ₹{product.finalPrice}
                  <del> ₹{product.originalPrice}</del>
                </p>

                <div className='qty-box'>
                  <button className='btn btn-secondary'
                    onClick={() => dispatch(decrementQty(product.id))}>-</button>
                  <span className='total-prod text-warning'>{product.qty}</span>
                  <button className='btn btn-secondary' disabled={product.qty === 5}
                    onClick={() => dispatch(incrementQty(product.id))}>+</button>
                </div>

              </div>

            </div>

          ))
        ) : (
          <div className='empty-cart text-center'>
            <FiShoppingCart className='shoping-icon text-white'/>
            <p className='fw-bold text-white'>Cart is Empty</p>
            <Link to="/allproducts" className='btn btn-danger text-white'>Go to Shopping</Link>
          </div>
        )}
      </div>


      {/* RIGHT SIDE — ORDER SUMMARY */}
      {data.length > 0 && (
        <div className='order-box bg-dark text-white'>

          <p className='order-title'>
            Order Summary (<span>{data.length} items</span>)
          </p>

          <div className='order-summary pb-2'>

            <div className='order-detail'>
              <p>Original price</p>
              <p>Discount</p>
              <p>Delivery</p>
            </div>

            <div className='order-price'>
              <p>{originalTotal}</p>
              <p className='text-success'>₹{discount}</p>
              <p className='text-success'>Free</p>
            </div>



          </div>
          <div className='d-flex justify-content-between border-top pt-3 pb-3'>
            <p className='total-text fw-bold fs-4 '>Total Price</p>
            <p className='total-price fw-bold fs-4'>₹{finalTotal}</p>

          </div>
          <button className='btn btn-danger text-white text-center w-100'>Checkout</button>

        </div>
      )}

    </div>

  )
}

export default Cart