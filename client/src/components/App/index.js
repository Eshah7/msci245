import * as React from 'react';

const App = () => {

  const Search = (props) => {
    const [query, setQuery] = React.useState("")
    const [difficulty, setDifficulty] = React.useState("1")

    function handleChange(event){
        setQuery(event.target.value);
    }

    function handleSelectChange(event){
      setDifficulty(event.target.value)
    }

    function handleSubmit(event){
      props.handleSearch(query, difficulty)
    }

    return (
      <div>
        <input type="text" value={query} onChange={handleChange}>

        </input>
        <select onChange={handleSelectChange}>
          <option value={"1"}>
            1
          </option>
          <option value={"2"}>
            2
          </option>
          <option value={"3"}>
            3
          </option>
        </select>

        <button onClick={handleSubmit}>search</button>
      </div>
    )
  }

  const List = (props) => {
    const {recipes} = props 

    return (
      <div> 
        {
          recipes.map((recipe) => {
            return (
              <>
                <h3>{recipe.title}</h3>
                <ul>
                  {
                    recipe.ingredients.map((ingredient) => {
                      return (<li>{ingredient}</li>)
                    })
                  }
                </ul>
                <h4>{recipe.instructions}</h4>
              </>
            )
          })
        }
      </div>
    )
  }

  const recipes = [
    {
      title: 'Fruit salad',
      difficulty: '2',
      ingredients: ['apple', 'banana', 'blueberries', 'raisins', 'walnuts'],
      calories: "200",
      instructions: "Wash fresh fruit. Slice fruit into pieces. Mix all ingredients in a bowl."
    }, {
      title: 'Avocado wrap',
      difficulty: '3',
      ingredients: ['avocado', 'spinach', 'pine nuts', 'mayo', 'apple', 'tortilla bread'],
      calories: "400",
      instructions: "Wash all fruits and vegetables. Slice avocadoes and apples. Mix all ingredients and wrap them in a tortilla bread."
    },
  ];

  const [recipesToDisplay, setRecipesToDisplay] = React.useState(recipes)

  function handleSearch(query, difficulty){
    const searchRecipes = recipes.filter((recipe) => {
      if (parseInt(difficulty) < parseInt(recipe.difficulty)) return false;
      if (recipe.ingredients.indexOf(query) === -1 ) return false;
      return true
    })

    setRecipesToDisplay(searchRecipes)
  }

  return (
    <div>
      <h1>
        Recipe finder
      </h1>
    
    <Search 
      handleSearch={handleSearch}
    />

    <List 
      recipes = {recipesToDisplay}
    />




    </div>
  );

  
}





export default App;