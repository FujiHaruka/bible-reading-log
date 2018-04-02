import './App.css'
import 'antd/dist/antd.css'
import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'
import {injectState} from './store'
import {Layout, Icon} from 'antd'
import {BookListPage, BookPage} from './pages'
import {showHelpDialog} from './components'
import storage from 'store'
const {Header, Content} = Layout

class App extends Component {
  render () {
    const parentProps = this.props
    return (
      <Router basename={process.env.NODE_ENV === 'production' ? '/bible-reading-log/' : '/'} >
        <Layout>
          <Header className='App-header'>
            <div className='App-container'>
              聖書通読表
              <div className='App-header-right'>
                <Icon className='App-header-help' type='question-circle-o' onClick={showHelpDialog} />
              </div>
            </div>
          </Header>
          <Content className='App-content'>
            <div className='App-container'>
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
