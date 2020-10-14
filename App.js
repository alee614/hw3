import React, { Component } from 'react';
import './App.css';
import recipeJson from './asset/data/recipe.json'
import Results from "./components/results/Results"
import cookingmama from "./asset/images/cookingmama.png"
import donemama from "./asset/images/cookingmama 2.png"


let logo = cookingmama;

class App extends Component{
  constructor(){
    super();
    this.state ={
        resultList: [],
        recipes: recipeJson.recipes,
    };
    
    this._onKeyPressed = this._onKeyPressed.bind(this);
    this._filterList = this._filterList.bind(this);
    this._reset = this._reset.bind(this);

    this.searchInput = React.createRef();
    this.prepInput = React.createRef();
    this.dietInput = React.createRef();

    this.categoryInput = React.createRef();

  }

  
_filterList(e){
  let inquiry = e.target.value;
  let filteredList = [];

  if (inquiry === this.prepInput.current.value){
    filteredList = this.state.recipes.filter( recipe =>
      recipe.prepTime <= parseInt(inquiry)
    );
    this.setState({
      recipes: filteredList,
    })

    console.log("preptime activated");
    filteredList = [];
  }

  if (inquiry === this.dietInput.current.value){
    filteredList =  this.state.recipes.filter( recipe => 
      recipe.dietLabel === inquiry);
      this.setState({
        recipes: filteredList,
      })
      console.log("dietinput activated");
      filteredList = [];
  }

  if (inquiry === this.categoryInput.current.value){
    filteredList = this.state.recipes.filter( recipe =>
      recipe.recipeCategory === inquiry);
      this.setState({
        recipes: filteredList,
      })
      console.log("category activated");
      filteredList = [];
  }

}

_onKeyPressed(){
  console.log("this button has been pressed");
  // will include the input filter here

  console.log(this.searchInput.current.value);
  let filterList = [];
  if (this.searchInput.current.value !== "undefined"){
    this.state.recipes.forEach(recipe => { 
      if (!filterList.includes(recipe)){
        if (recipe.title.toLowerCase().includes(this.searchInput.current.value.toLowerCase())){
          filterList.push(recipe);
          console.log("this has been pushed");
          console.log(filterList);
        }
    }
    },
    console.log(filterList),
    this.setState({
      resultList: filterList,
  } )
    )
} else{
  this.setState({
    resultList: this.state.recipes,
  })
}

logo = donemama;

}

_reset(){
  this.setState({
    resultList:[],
    recipes: recipeJson.recipes,
  })

  logo = cookingmama;

  console.log("it has been reset!");
}



  
  render(){
    console.log("below is the first round of filters");
    console.log(this.state.recipes);
    console.log(this.state.resultList);
    return(
      // have a list of the search queries, it's empty ? (the search stuff) : (Results)
      
        <div className="App">
            <img src= {logo} alt="cooking mama"/>
            <h1>let's get cooking!</h1>
            <div className="searchSection">
                <div className="search">
                <input type="text" className="searchBar"
                        placeholder="Search me"
                        ref = {this.searchInput}
                        />
                </div>

                <div className="search">
                <label for="category">Recipe Category: </label>
                <select name="category" className="dropDown"
                      ref = {this.categoryInput}
                      onChange = {this._filterList}
                      >
                  <option value="empty">All</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Entree">Entree</option>
                  <option value="Dessert">Dessert</option>

                  </select> 

                </div>

                <div className="search">
                <label for="preptime">I want to spend a max time of: </label>
                <select name="preptime" className="dropDown" 
                        ref = {this.prepInput}
                        onChange = {this._filterList}
                        >
                  <option value = "empty">All</option>
                  <option value="30">30 Min</option>
                  <option value="60">60 Min</option>
                  <option value="180">3 Hrs</option>
                  <option value="360">6 Hrs</option>
                </select>

                </div>
                <div className="search">
                <label for="dietLabel">Type of Diet: </label>
                <select name="dietLabel" className="dropDown"
                        ref = {this.dietInput}
                        onChange = {this._filterList}
                        >
                  <option value="empty">All</option>
                  <option value="Low-Sodium">Low-Sodium</option>
                  <option value="Balanced">Balanced</option>
                  <option value="Low-Carb">Low-Carb</option>
                  <option value="Medium-Carb">Medium-Carb</option>
                  <option value="High-Carb">High-Carb</option>
                  <option value="Low-Fat">Low-Fat</option>
                  <option value="Vegetarian">Vegetarian</option>
                </select>

                </div>
                <input type="submit" className="custom-btn" value="OK!" onClick={this._onKeyPressed}/>
                <br/>

                <input type="submit" className="custom-btn" value="RESET" onClick={this._reset}/>
          

                <div>
                  <Results recipes = {this.state.recipes} resultList = {this.state.resultList} />
                </div>
              
                
              

            </div>

      </div>     
            
    

    
    )
}
}

export default App;

