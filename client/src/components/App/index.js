import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
 
const App = () => {
 
   const recipes = [
       {
           title: 'Fruit salad',
           difficulty: '2',
           ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
           calories: "200",
           instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl.",
           recipeID: 1,
       }, {
           title: 'Avocado wrap',
           difficulty: '3',
           ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
           calories: "400",
           instructions: "Wash all fruits and vegetables. Slice avocados and apples. Mix all ingredients and wrap them in a tortilla bread.",
           recipeID: 2
       },
   ];
   
   // Create stateful list
   const [ingredients, setIngredients] = React.useState([]);
 
   // Create a useEffect hook to call the function
   React.useEffect(() => {
       createIngredientsList();
     }, []);
     
  // For each recipe, add the ingredients 
   const createIngredientsList = () => {
       var allIngredients = [];
       for (var i = 0; i<recipes.length; i++){
           var recipeIngredients = recipes[i].ingredients;
           for (var j = 0; j < recipeIngredients.length; j++){
               allIngredients.push(recipeIngredients[j]);
           }
       }
       setIngredients(allIngredients);
   }
 
 
 // handle new item 
   const handleAddNewItem = (item) => {
    // the ... creates a TRUE copy of the ingredients array
     var ingredientsCopy = [...ingredients];
     ingredientsCopy.push(item);
     setIngredients(ingredientsCopy);
   }
 
   return (
       <div>
           <h1>
               Recipes
           </h1>
 
 
           <List
           // display the ingredients 
               list={ingredients}
 
           />
 
           <AddNewItem
               onAdd={handleAddNewItem}
           />
 
       </div>
   );
}
 
 
const AddNewItem = ({ onAdd }) => {
   const [newItem, setNewItem] = React.useState('');
 
   const onEditNewItem = (event) => {
       setNewItem(event.target.value);
   }
   const onSaveNewItem = () => {
       onAdd(newItem);
   }
 
   return (
       <div>
           <TextField
               required
               id='add'
               onChange={onEditNewItem}
               value={newItem}
           />
           <Button
               variant="contained"
               onClick={onSaveNewItem}
           >
               Add
           </Button>
       </div>
   )
}
 
const List = ({ list }) => {
   return (
       <ul>
           {list.map((item) => {
               return (
                   <Item
                       item={item}
 
                   />
               );
           })}
       </ul>
 
   )
}
 
const Item = ({ item }) => {
 
 
   return (
       <li>
           <p>{item}</p>
       </li>
   )
}
 
 
export default App;

