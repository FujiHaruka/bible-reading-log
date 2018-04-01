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
import storage from 'store'
const {Header, Content} = Layout

class App extends Component {
  render () {
    const parentProps = this.props
    return (
      <Router>
        <Layout>
          <Header className='App-header'>
            聖書通読表
          </Header>
          <Content className='App-content'>
            <div className='App-content-inner'>
              <Route exact path='/' render={(props) => <BookListPage {...props} {...parentProps} />} />
              <Route exact path='/books/:bookId' render={(props) => <BookPage {...props} {...parentProps} />} />
            </div>
          </Content>
        </Layout>
      </Router>
    )
  }

  componentDidMount () {
    // Load from local storage
    const readingLogs = storage.get('readingLogs')
    if (readingLogs) {
      this.props.setReadingLogs(readingLogs)
    }
  }

  componentDidUpdate () {
    // Save to local storage
    const {readingLogs} = this.props
    storage.set('readingLogs', readingLogs)
  }
}

export default injectState(App)
