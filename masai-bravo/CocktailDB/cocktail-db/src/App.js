import React from 'react';
import style from './App.module.css';
import axios from "axios"
import Card from "./components/Card"
import Details from "./components/Details"
import Nav from "./components/Nav"
import Loader from './components/Loader';
import Pagination from './components/Pagination';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "tetris",
      data: [],
      cocktail: [],
      categories: [],
      ingredients: [],
      alcoholic: [],
      isLoading: false,
      isCard: true,
      isDetails: false,
      start: 1,
      end: 6,
      perPage: []
    }
  }


  back = (e) => {
    this.setState({
      isCard: true,
      isDetails: false,
    })
  }


  showCocktail = (e) => {
    const { id } = e.target
    this.setState({ isLoading: true })
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => {
        // console.log(res.data.drinks)
        this.setState({
          cocktail: res.data.drinks,
          isLoading: false,
          isCard: false,
          isDetails: true,

        })
      })
  }

  handleSelectChange = (e) => {
    let { name, value } = e.target
    let url;
    if (name === "category") {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`
    }
    else if (name === "alcoholic") {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${value}`
    }
    else if (name === "ingredient") {
      url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`
    }

    this.setState({
      isLoading: true
    })
    axios.get(url)
      .then(res => {
        // console.log(res.data.drinks)
        this.setState({
          data: res.data.drinks,
          isLoading: false,
          isCard: true,
          isDetails: false,
        })
      })
  }

  handleClick = () => {
    this.setState({ isLoading: true })
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?", {
      params: {
        s: this.state.search
      }
    })
      .then(res => {
        // console.log(res.data)
        this.setState({
          data: res.data.drinks,
          isLoading: false,
          isCard: true,
          isDetails: false,
        })
      })

  }


  handleChange = (e) => {
    const search = e.target.value
    // console.log(search)
    this.setState({
      search: search,
    })
  }

  componentWillMount = () => {
    this.setState({
      isLoading: true
    })
    axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then(res => {
        // console.log(res.data.drinks)
        this.setState({
          data: res.data.drinks,
          isLoading: false,
        })
      })


    axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list")
      .then(res => {
        // console.log(res.data.drinks, "categ")
        this.setState({
          categories: res.data.drinks,
          isLoading: false
        })
      })

    axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
      .then(res => {
        // console.log(res.data.drinks, "ingre")
        this.setState({
          ingredients: res.data.drinks,
          isLoading: false
        })
      })

    axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list")
      .then(res => {
        // console.log(res.data.drinks, "alcohol")
        this.setState({
          alcoholic: res.data.drinks,
          isLoading: false
        })
      })

  }

  handlePage = (e) => {
    const page = e.target.id

    this.setState({
      start: 6 * (page - 1),
      end: 6 * (page),
      page: page
    })

  }

  // handleNext = (e) => {
  //   const {start,end} = this.state 
  //   let page = this.state.page
  //   page = page+1

  //   this.setState({
  //     start: page== Math.ceil(this.state.data.length/6)? start : (6 * (page -1)),
  //     end: page== Math.ceil(this.state.data.length/6)? end : (6 * (page)),
  //     page: page 
  //   })
  // }

  // handleprevious = (e) => {
  //   const {start,end} = this.state 
  //   let {page} = this.state
  //   page = page-1
  //   this.setState({
  //     start: page== 1 ? start : (6 * (page -1)),
  //     end: page== 1 ? end : (6 * (page)),
  //     page: page 
  //   })
  // }


  render() {
    const {page, data, isLoading, cocktail, isCard, isDetails, ingredients, alcoholic, categories, perPage, start, end } = this.state
    console.log(page)
    return (
      <div className={style.App}>
        <Nav handleClick={this.handleClick} handleChange={this.handleChange} categories={categories} alcoholic={alcoholic} ingredients={ingredients} handleSelectChange={this.handleSelectChange} />
        <br />
        <hr />
        {isLoading && <Loader />}

        <div >
          <div>
            <div className={style.flex}>
              {data == null ? !isLoading && <h1>No data found for perticular word please try with other word</h1> : !isLoading && data.length > 0 && isCard && data.slice(start, end).map(data => (<Card key={data.idDrink} item={data} showCocktail={this.showCocktail} />))}
            </div>
            {!isLoading && isDetails && cocktail.length > 0 && <Details cocktail={this.state.cocktail} back={this.back} />}
          </div>

          <div style={{display:"flex"}}>
            {/* {<button onClick={this.handleprevious} name="pre">&#8810;</button>} */}
            {<Pagination data={data} handlePage={this.handlePage} />}
            {/* { <button onClick={this.handleNext} name="next">&#8811;</button> } */}
          </div>

        </div>
      </div>
    );
  }
}

