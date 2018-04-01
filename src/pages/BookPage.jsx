import './BookPage.css'
import React, {Component} from 'react'
import {List} from 'antd'
import asleep from 'asleep'
import {BackLink, ChapterListItem, ReadingLogModal} from '../components'

class BookPage extends Component {
  render () {
    const {
      match,
      bookMetaData,
      readingLogs,
      readingLogModalProps,
      setReadingLogModal,
      removeLog,
      closeReadingLogModal,
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
          header={<div>{book.name}</div>}
          dataSource={chapters}
          renderItem={({chapter, logs}) =>
            <ChapterListItem
              {...{chapter, logs, book}}
              onAdd={this.handleAddLog({bookId, chapter})}
              onClickAvastar={setReadingLogModal}
            />
          }
        />

        <ReadingLogModal
          {...readingLogModalProps}
          onOk={async () => {
            closeReadingLogModal()
            await asleep(100)
            const {bookId, chapter, date} = readingLogModalProps
            removeLog({bookId, chapter, date})
            setReadingLogModal({})
          }}
          onCancel={closeReadingLogModal}
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
