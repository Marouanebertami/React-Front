import React, {Component} from 'react'
import { Container } from 'react-bootstrap'
import Header from './Components/Shared/Header'
import Home from './Components/Home'
import About from './Components/About'
import Contact from './Components/Contact'
import Footer from './Components/Shared/Footer'
import OfferComp from './Components/offerComponent'
import SearchComponent from './Components/SearchComponent/Search'
import Checkout from './Components/Checkout/Checkout'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from './ScrollToTop';
import { Provider } from 'react-redux';
import store from './store'
import './App.css';

class App extends Component {

  render(){
    return (
      <Provider store={store}>
        <Container fluid>
          <Router>
            <ScrollToTop>
              <Header />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/offer/:id" render={(props) => <OfferComp {...props} type="offer" />}/>
                <Route path="/destination/:id" render={(props) => <OfferComp {...props} type="destination" />}/>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/confirm">Done</Route>
                <Route path="/search" component={SearchComponent} />
                <Route path="/404">
                  404
                </Route>
              </Switch>
              <Footer />
            </ScrollToTop>
          </Router>
        </Container>
      </Provider>
    );
  }

}

export default App;
