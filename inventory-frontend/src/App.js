import React from 'react';
import axios from 'axios'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import StockEventsTable from './components/StockEventsTable'
import AddStockEvent from './components/AddStockEvent'
import AddProduct from './components/AddProduct'
import Nav from './components/Nav'

import './App.css';

//We are going to fetch all of the stock events

//We are going to separate them by the different products

//We are going to display them
class App extends React.Component{
  state = {
    fetchedProducts: [],
    fetchedStockEvents: [],
  }

  async componentDidMount(){

    const productsRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/products'
    })

    const stockEventsRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/stockevents'
    })
    console.log("App.componentDidMount stockEventsRes", stockEventsRes)

    const fetchedProducts = productsRes.data
    const fetchedStockEvents = stockEventsRes.data

    this.setState({fetchedProducts, fetchedStockEvents})
  }

  render(){
    console.log("App.render")
    const {fetchedProducts, fetchedStockEvents} = this.state

    return (
      <div className="App">
        <BrowserRouter>
          <Nav />

          <Switch>
            <Route exact path="/products">
              <AddProduct />
            </Route>

            <Route exact path="/stock/add">
              <AddStockEvent products={fetchedProducts} />
            </Route>

            <Route exact path="/stock">
              <StockEventsTable
                products={fetchedProducts}
                stockEvents={fetchedStockEvents}
              />
            </Route>

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
