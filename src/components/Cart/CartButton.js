import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { UiAction } from '../../store/ui-slice';
const CartButton = (props) => {
  const dispatch = useDispatch()
  const count = useSelector((state)=>state.Cart.Totalquantity)
  const CartButtonHandler = () =>{
    dispatch(UiAction.toggle())
  }
  return (
    <button className={classes.button}onClick={CartButtonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{count}</span>
    </button>
  );
};

export default CartButton;
