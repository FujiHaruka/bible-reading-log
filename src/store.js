import bookListData from './data/book_list.json'
import bookMetaData from './data/book_meta.json'
import {withStateHandlers, withProps, compose} from 'recompose'
import merge from 'deepmerge'
const updaterOf = (name) => (state) => (payload) => ({[name]: payload})

const stateHandlers = withStateHandlers({
  // View
  isFirstVisit: true,
  isBookListAnimating: false,
  readingLogModalProps: {},
  // Book
  selectedChapter: null,
  // Reading log
  readingLogs: {},
}, {
  toggleIsBookListAnimating: updaterOf('isBookListAnimating'),
  selectChapter: updaterOf('selectedChapter'),
  markAsReadOnToday: ({readingLogs}) => ({bookId, chapter}) => {
    const today = String(new Date())
    const nextReadingLog = merge(
      readingLogs,
      {
        [bookId]: {
          [chapter]: [today]
        }
      }
    )
    return {readingLogs: nextReadingLog}
  },
  removeLog: ({readingLogs}) => ({bookId, chapter, date}) => {
    const dates = readingLogs[bookId][chapter].filter((d) => d !== date)
    const nextReadingLog = {...readingLogs}
    nextReadingLog[bookId][chapter] = dates
    return {readingLogs: nextReadingLog}
  },
  setReadingLogs: updaterOf('readingLogs'),
  setReadingLogModal: () => ({bookId, bookName, chapter, date, visible}) => ({
    readingLogModalProps: {bookId, bookName, chapter, date, visible}
  }),
  closeReadingLogModal: ({readingLogModalProps}) => () => ({
    readingLogModalProps: {...readingLogModalProps, visible: false}
  })
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
