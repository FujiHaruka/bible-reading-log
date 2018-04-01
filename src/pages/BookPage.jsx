import './BookPage.css'
import React, {Component} from 'react'
import {List} from 'antd'
import {BackLink, ChapterListItem} from '../components'
import {Link} from 'react-router-dom'

class BookPage extends Component {
  render () {
    const {
      match,
      bookMetaData,
      readingLogs,
    } = this.props
    const {bookId} = match.params
    const book = bookMetaData[bookId]
    if (!book) {
      return <div>Not found</div>
    }
    const readingLog = readingLogs[bookId] || {}
    const chapters = new Array(book.chapter).fill(null)
      .map((_, index) => ({
        chapter: index + 1,
        logs: readingLog[index + 1] || []
      }))
    return (
      <div className='BookPage'>
        <BackLink to='/' />
        <List
          bordered
          header={<div>{book.name}</div>}
          dataSource={chapters}
          renderItem={({chapter, logs}) =>
            <ChapterListItem {...{chapter, logs}} onAdd={this.handleAddLog({bookId, chapter})} />
          }
        />
      </div>
    )
  }

  handleAddLog ({bookId, chapter}) {
    const {markAsReadOnToday} = this.props
    return () => {
      markAsReadOnToday({bookId, chapter})
    }
  }
}

export default BookPage
