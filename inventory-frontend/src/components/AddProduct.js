import React, {Component} from 'react'
import axios from 'axios'

class AddProduct extends Component{

  state = {
    name: ''
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const {name} = this.state

    //Async
    const create_product_res = await axios({
      method: 'POST',
      url: 'http://localhost:1337/products',
      data: {
        name
      }
    })

    if(create_product_res.status === 200){
      alert("Successfully created product")
      window.location = window.location
    }
  }

  render(){
    const {name} = this.state
    return(
      <div className="AddProduct">
        <form onSubmit={this.handleSubmit}>
          <input onChange={(event) => this.setState({name: event.target.value})} type="text" name="name" value={name} />
          <button type="submit">Create new product</button>
        </form>
      </div>
    )
  }
}

export default AddProduct
