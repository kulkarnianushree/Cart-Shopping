import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { UiAction } from './store/ui-slice';
import Notification from './components/UI/Notification';

let initial = true

function App() {
  const show = useSelector((state) => state.Ui.Cartshow);
  const cart = useSelector((state) => state.Cart);
  const notification = useSelector((state) => state.Ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        UiAction.NotificationStatus({
          status: 'Waiting',
          title: 'Sending....',
          message: 'Sending data is in process',
        })
      );

      try {
        const response = await fetch('https://cart-shopping-21a46-default-rtdb.firebaseio.com/cart.json', {
          method: 'PUT',
          body: JSON.stringify(cart),
        });

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        dispatch(
          UiAction.NotificationStatus({
            status: 'Success',
            title: 'Success',
            message: 'Successfully sent the data',
          })
        );
      } catch (error) {
        dispatch(
          UiAction.NotificationStatus({
            status: 'Failed',
            title: 'Error',
            message: error.message,
          })
        );
      }
    };
    if(initial){
      initial=false
      return
    }

    sendCartData();
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
