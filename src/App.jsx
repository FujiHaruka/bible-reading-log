import './App.css'
import 'antd/dist/antd.css'
import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom'
import {injectState} from './store'
import {compose} from 'recompose'
import {Layout, Icon, Menu, Dropdown} from 'antd'
import {BookListPage, BookPage, LogHistory} from './pages'
import {showHelpDialog} from './components'
import storage from 'store'
const {Header, Content} = Layout

class App extends Component {
  render () {
    const parentProps = this.props
    const {visibleMenu, toggleVisibleMenu, history, location} = this.props
    return (
      <Layout className='App'>
        <Header className='App-header'>
          <div className='App-container'>
            <Link to='/' className='App-header-title'>聖書通読表</Link>
            <div className='App-header-right'>
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key='0'>
                      <span onClick={showHelpDialog} className='App-menu-item'>このアプリについて</span>
                    </Menu.Item>
                    <Menu.Item key='1'>
                      <span onClick={() => history.push('/history')} className='App-menu-item'>読書記録一覧</span>
                    </Menu.Item>
                  </Menu>
                }
                placement='bottomRight'
                trigger={['click']}
                onVisibleChange={toggleVisibleMenu}
              >
                <Icon className='App-header-menu' type={visibleMenu ? 'menu-unfold' : 'menu-fold'} />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content className='App-content'>
          <div className='App-container'>
            <Switch location={location}>
              <Route exact path='/' render={(props) => <BookListPage {...parentProps} {...props} />} />
              <Route exact path='/books/:bookId' render={(props) => <BookPage {...parentProps} {...props} />} />
              <Route exact path='/history' render={(props) => <LogHistory {...parentProps} {...props} />} />
            </Switch>
          </div>
        </Content>
      </Layout>
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

const withRouter = (Comp) => (props) => (
  <Router basename={process.env.NODE_ENV === 'production' ? '/bible-reading-log/' : '/'} >
    <Route path='/' component={Comp} />
  </Router>
)

export default compose(
  withRouter,
  injectState
)(App)
