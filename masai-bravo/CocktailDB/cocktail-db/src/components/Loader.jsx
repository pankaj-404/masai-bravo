import React from "react"
import style from "../App.module.css"


export default class Loader extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    render(){
        return(
            <div className={style.loader}></div>
        )
    }
}
    