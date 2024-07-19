import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchdata, sendData } from './store/cart-slice';

let initial = true;

function App() {
  const show = useSelector((state) => state.ui.Cartshow); // Ensure 'ui' is the correct slice name
  const cart = useSelector((state) => state.cart); // Ensure 'cart' is the correct slice name
  const notification = useSelector((state) => state.ui.notification); // Ensure 'ui' is the correct slice name
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchdata())
  },[dispatch])

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if(cart.changed){
      dispatch(sendData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
