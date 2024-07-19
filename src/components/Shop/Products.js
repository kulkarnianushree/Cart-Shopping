import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const dummy = [
    {
      id:'p1',
      title:'My First Book',
      description:'My First book i ever wrote',
      price: 6

    },
    
    {
      id:'p2',
      title:'My Second Book',
      description:'My Second book i ever wrote',
      price: 5
  
    }
    
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy.map((product)=>(
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}

      </ul>
    </section>
  );
};

export default Products;
