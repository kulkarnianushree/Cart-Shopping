import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartitem = useSelector((state)=>state.Cart.item)
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartitem.map((items)=>(
          <CartItem
            key = {items.id}
            item={{ 
              id:items.id,
              title:items.name, 
              quantity:items.quantity,
              total: items.totalPrice,
              price: items.price
            }}
          />
        ))}

      </ul>
    </Card>
  );
};

export default Cart;
