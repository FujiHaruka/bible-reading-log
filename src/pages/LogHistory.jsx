import './LogHistory.css'
import React from 'react'
import {
  BackLink,
} from '../components'
import {List} from 'antd'
import _ from 'lodash'
import moment from 'moment'

const parseLogsAsSorted = (readingLogs) => {
  let logs = []
  for (const bookId of Object.keys(readingLogs)) {
    for (const chapter of Object.keys(readingLogs[bookId])) {
      const dates = readingLogs[bookId][chapter].map((date) => moment(date))
      const logObjects = dates.map((date) => ({
        bookId,
        chapter,
        date,
      }))
      logs = logs.concat(logObjects)
    }
  }
  logs = _.sortBy(logs, ['date']).reverse()
  return logs
}

class LogHistory extends React.Component {
  render () {
    const {
      readingLogs,
      bookMetaData,
    } = this.props
    const bookNameOf = (id) => bookMetaData[id].name
    const logs = parseLogsAsSorted(readingLogs)
    return (
      <div className='LogHistory'>
        <BackLink to='/' text='TOPに戻る' />
        <div className='LogHistory-content'>
          <List
            header={<span className='LogHistory-list-title'>これまでの読書記録一覧</span>}
            dataSource={logs}
            renderItem={({bookId, chapter, date}) => (
              <List.Item>
                <div className='LogHistory-list-item'>
                  <div className='LogHistory-list-item-book'>
                    {`${bookNameOf(bookId)} ${chapter}章`}
                  </div>
                  <div className='LogHistory-list-item-date'>
                    {date.format('YYYY/MM/DD')}
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}

export default LogHistory
