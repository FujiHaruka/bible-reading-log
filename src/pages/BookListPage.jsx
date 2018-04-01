import './BookListPage.css'
import React, {Component} from 'react'
import {BookLink} from '../components'
import {
  Tabs,
  List,
} from 'antd'
import asleep from 'asleep'
import c from 'classnames'
const {TabPane} = Tabs

class BookListPage extends Component {
  render () {
    const {
      bookList,
      isBookListAnimating,
    } = this.props
    return (
      <div className={c('BookListPage', {
        'BookListPage-moveAnimating': isBookListAnimating,
      })}>
        <Tabs type='card' className='BookListPage-tabs'>
          <TabPane tab='旧約' key='old'>
            <List
              dataSource={bookList.oldTestament}
              renderItem={(book) => <BookLink book={book} onClick={this.handleBookLink(book)} />}
            />
          </TabPane>
          <TabPane tab='新約' key='new'>
            <List
              dataSource={bookList.newTestament}
              renderItem={(book) => <BookLink book={book} onClick={this.handleBookLink(book)} />}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }

  handleBookLink (book) {
    const {toggleIsBookListAnimating, history} = this.props
    return async () => {
      toggleIsBookListAnimating(true)
      await asleep(400)
      const bookId = book.book.toLowerCase()
      history.push(`/books/${bookId}`)
      toggleIsBookListAnimating(false)
    }
  }
}

export default BookListPage
