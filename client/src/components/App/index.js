/*

MSci 245 - Test 1

********* This test contains 4 questions, listed below. ***********

Q1. Turn products list into a stateful list.

Q2. Create "inStock" stateful variable of type Boolean, and set it to true by default.

Q3. Using ternary operator for conditional rendering, display only those products that are in stock. 
    Use "inStock" stateful variable to perform conditional rendering.

Q4. Complete the function "handleDiscountedProducts" that toggles between two modes: "Show discounted products only" 
    and "Show all products", in response to the user checking/unckecking the checkbox "DiscountCheckBox".

*/

import * as React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';

const App = () => {

  const products = [
    {
      id: 1,
      title: 'Gala apple',
      category: 'fruit',
      price: 1.20,
      discount: true,
      discountAmount: "20%",
      inStock: true
    },
    {
      id: 2,
      title: 'Green pepper',
      category: 'vegetable',
      price: 2.30,
      discount: true,
      discountAmount: "10%",
      inStock: false
    },
    {
      id: 3,
      title: 'Whole-wheat tortilla',
      category: 'bread',
      price: 3.20,
      discount: false,
      discountAmount: "20%",
      inStock: true
    },
    {
      id: 4,
      title: 'Sesame bagel',
      category: 'bread',
      price: 1.05,
      discount: true,
      discountAmount: "10%",
      inStock: false
    },
    {
      id: 3,
      title: 'Fruit yoghurt',
      category: 'dairy',
      price: 4.30,
      discount: false,
      discountAmount: "10%",
      inStock: true
    },
    {
      id: 4,
      title: 'Cheddar cheese',
      category: 'dairy',
      price: 5.00,
      discount: true,
      discountAmount: "10%",
      inStock: true
    },
  ];

  // Q1
  const [selectedProducts, setSelectedProducts] = React.useState(products);

  // Q2
  const [inStock, setInStock] = React.useState(true); 

  // Q3
  const validationCheck = () => {
    setInStock(); 
  
    if (selectedProducts.inStock === true) {
      setInStock(true); 
    } else {
      setInStock(false); 
    }
  }


  
  // Q4
  const handleDiscountedProducts = (checked) => {
    if (products.discount === true) {
        setSelectedProducts('');
      } else {
        setSelectedProducts(false);
      }
  }

  /* 
    const handleDiscountedProducts = (checked) => {
    if (checked.discount(true)) {
        var selectedProductsCopy = [...selectedProducts];
        selectedProductsCopy.splice(index, 1);
        setSelectedProducts(selectedProductsCopy);
  
      } else {
        var selectedProductsCopy = [...selectedProducts];
        selectedProductsCopy .push(false);
        setSelectedProducts (selectedProductsCopy);
  }
  */

  return (
    <Grid
      container
      spacing={1}
      style={{ maxWidth: '50%', margin: 20 }}
      direction="column"
      justify="flex-start"
      alignItems="stretch"
    >
      <Typography variant="h3" gutterBottom component="div">
        Online Grocery Store
      </Typography>

      <DiscountCheckBox
        onCheck={handleDiscountedProducts}
      />

      <List
        list={products}
        selectedProducts = {selectedProducts}
        handleDiscountedProducts = {handleDiscountedProducts}
        validationCheck = {validationCheck}

      />

    </Grid>
  );
}


const DiscountCheckBox = ({ onCheck, item, handleDiscountedProducts }) => {

  const handleChange = (event) => {
    onCheck(event.target.checked);
  };

  return (
    <div>
      {onCheck ? "Show discounted products only" : "Show all products" }
      <Checkbox
        onChange={handleChange}
        item={item}
        onCheck={handleDiscountedProducts}
        // {onCheck ? "Show discounted products only" : "Show all products" }
      />
      <hr />
    </div>
  );
}

const List = ({ list, selectedProducts, handleDiscountedProducts, validationCheck}) => {
  return (
    <>
      {list.map((item) => {
        return (
          <>

              <Item
                // item = {item}
                // Q3
                item = {item}
                selectedRecipe={selectedProducts}
                handleDiscountedProducts={handleDiscountedProducts}
                validationCheck = {validationCheck}
                
              />

          </>
        );
      })}
    </>

  )
}

const Item = ({ item, validationCheck}) => {

// Q3
  return (
    <>
      <Grid item>
        <Typography variant="h6" gutterBottom component="div">
          {item.inStock === true && item.title}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          {item.inStock === true && "Category: " + item.category}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          {item.inStock === true && "Price: $" + item.price}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          {item.inStock === true && "Discount: " + item.discount}
        </Typography>
        <Typography variant="body1" gutterBottom component="div">
          {item.inStock === true && "Discount Percentage: " + item.discountAmount}
        </Typography>
      </Grid>
    </>
  )
}


export default App;