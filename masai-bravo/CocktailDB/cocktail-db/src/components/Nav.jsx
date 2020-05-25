import React from "react"
import styles from "../App.module.css"
// import 'bootstrap/dist/css/bootstrap.min.css';

export default class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { handleChange, handleSelectChange, categories, alcoholic, ingredients } = this.props
        return (
            <div>
                <img className={styles.logo} src="./cocktailDB-logo.jpg" style={{float:"left"}} alt="CocktailDB logo"/>
                <div className={styles.nav}>
                    <div className={styles.select}>
                        <select name="category" id="category" onChange={e => handleSelectChange(e)}>
                            <option>Categories</option>
                            {categories.map(item => (<option value={item.strCategory} key={item.strCategory}>{item.strCategory}</option>))}
                        </select>
                    </div>
                    <div className={styles.select, styles.type}>
                        <select name="alcoholic" id="alcoholic" onChange={e => handleSelectChange(e)}>
                            <option>Typies</option>
                            {alcoholic.map(item => (<option value={item.strAlcoholic} key={item.strAlcoholic}>{item.strAlcoholic}</option>))}
                        </select>
                    </div>
                    <div className={styles.select, styles.type}>
                        <select name="ingredient" id="ingredient" onChange={e => handleSelectChange(e)}>
                            <option>Ingredients</option>
                            {ingredients.map(item => (<option value={item.strIngredient1} key={item.strIngredient1}>{item.strIngredient1}</option>))}
                        </select>
                    </div>
                    <div className={styles.search}>
                        <input name={"search"} onChange={e => handleChange(e)} placeholder="Search by Cocktail's name" />
                        <button onClick={this.props.handleClick}>Search</button>
                    </div>
                </div>
            </div>

        )
    }
}


