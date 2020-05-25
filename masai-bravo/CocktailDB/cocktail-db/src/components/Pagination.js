import React from "react"

export default class Pagination extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    buttons = (n)=>{
        // (n > 3) ? n=3 : n=n;
        const arr = []

        for(let i=0;i<n; i++){
            arr.push(<button onClick={e=>this.props.handlePage(e)} id={i+1}>{i+1}</button>)
        }
        return arr
    }



    render(){
        const {data, handlePage} = this.props
        const totalPages = data !== null && Math.ceil(data.length / 6)
        return(
            <div>
                {this.buttons(totalPages)}
            </div>
        )
    }
}
