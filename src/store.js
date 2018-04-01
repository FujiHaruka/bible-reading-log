import bookListData from './data/book_list.json'
import bookMetaData from './data/book_meta.json'
import {withStateHandlers, withProps, compose} from 'recompose'
import merge from 'deepmerge'
const updaterOf = (name) => (state) => (payload) => ({[name]: payload})

const stateHandlers = withStateHandlers({
  // View
  isFirstVisit: true,
  isBookListAnimating: false,
  // Book
  selectedBookId: null,
  selectedChapter: null,
  // Reading log
  readingLog: {},
}, {
  toggleIsBookListAnimating: updaterOf('isBookListAnimating'),
  selectBook: updaterOf('selectedBookId'),
  selectChapter: updaterOf('selectedChapter'),
  markAsReadOnToday: ({readingLog}) => ({bookId, chapter}) => {
    const today = String(new Date())
    const marks = (readingLog[bookId] && readingLog[bookId][chapter]) || [] 
    const nextReadingLog = merge(
      readingLog,
      {
        [bookId]: {
          [chapter]: [...marks, today]
        }
      }
    )
    return {readingLog: nextReadingLog}
  }
})

const bookList = {
  oldTestament: bookListData.oldTestament.map((bookId) => bookMetaData[bookId]),
  newTestament: bookListData.newTestament.map((bookId) => bookMetaData[bookId]),
}
const props = withProps((props) => ({
  bookListData,
  bookMetaData,
  bookList,
}))

export const injectState = compose(
  stateHandlers,
  props,
)
