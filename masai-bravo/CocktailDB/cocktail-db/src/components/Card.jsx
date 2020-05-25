import React from "react"
import styles from "./Card.module.css"


export default class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        const { idDrink, strAlcoholic, strDrink, strDrinkThumb } = this.props.item
        const { showCocktail } = this.props


        return (
            <div className={styles.card}>
                <div className={styles.f2}>{strDrink}</div>
                {strAlcoholic && <div className={styles.left, styles.f1}>Category : {strAlcoholic}</div> }
                <div className={styles.clear}></div>
                <img src={strDrinkThumb+"/preview"} alt="Cocktail's Image"/>
                <br/>
                <button onClick={showCocktail} id={idDrink}>Show more</button>
            </div>
        )
    }
}