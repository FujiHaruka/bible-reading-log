import './App.css'
import 'antd/dist/antd.css'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import {injectState} from './store'
import {Layout} from 'antd'
import {BookListPage, BookPage} from './pages'
const {Header, Content} = Layout

class App extends Component {
  render () {
    const parentProps = this.props
    return (
      <Router>
        <Layout>
          <Header className='App-header'>
            通読表
          </Header>
          <Content className='App-content'>
            <Route exact path='/' render={(props) => <BookListPage {...props} {...parentProps} />} />
            <Route exact path='/books/:bookId' render={(props) => <BookPage {...props} />} {...parentProps} />
          </Content>
        </Layout>
      </Router>
    )
  }
}

export default injectState(App)
