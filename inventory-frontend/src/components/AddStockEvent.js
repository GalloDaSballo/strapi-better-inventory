import React, {Component} from 'react'
import axios from 'axios'

class AddStockEvent extends Component{

  state = {
    qty: 0,
    type: 'add',
    product: 'no',

    show: false
  }

  handleChange = (event) => {
    console.log("AddStockEvent.handleChange event.target.name", event.target.name)
    console.log("AddStockEvent.handleChange event.target.value", event.target.value)

    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    const {qty, type, product} = this.state

    console.log("AddStockEvent.handleSubmit qty", qty)
    console.log("AddStockEvent.handleSubmit type", type)
    if(product != 'no'){

      const data = {
        qty,
        type,
        product: parseInt(product)
      }

      const add_stock_res = await axios({
        method: 'POST',
        url: 'http://localhost:1337/stockevents',
        data
      })

      console.log("AddStockEvent.handleSubmit add_stock_res", add_stock_res)
      if(add_stock_res.status === 200){
        alert("Success")
        window.location = window.location
      }
    } else {
      alert("No product chosen")
      return
    }
  }

  render(){
    //Select the product

    //Add a quantity
    //Select a type

    //Submit to Strapi

    const {qty, type, product, show} = this.state

    const {products} = this.props

    return(
      <div className="AddStockEvent">
        <h1>Add Stock Event <button onClick={() => this.setState({show: true})}>+ Add</button></h1>

        {show &&
          <form onSubmit={this.handleSubmit}>

            <select onChange={this.handleChange} name="product" value={product}>
              <option value='no'>Please select a product</option>
              {products.map((product, i) => (
                <option key={i} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            <input onChange={this.handleChange} type="number" name="qty" value={qty} />

            <select onChange={this.handleChange} name="type" value={type}>
              <option value='add'>Add</option>
              <option value='remove'>Remove</option>
            </select>

            <button>Submit</button>
          </form>
        }
      </div>
    )
  }
}

export default AddStockEvent
