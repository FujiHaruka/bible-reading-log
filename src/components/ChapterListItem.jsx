import './ChapterListItem.css'
import React from 'react'
import {pure} from 'recompose'
import moment from 'moment'
import {List, Button, Avatar} from 'antd'
const {Item: ListItem} = List

const isDateEqual = (date1, date2) => moment(date1).format('YYYYMMDD') === moment(date2).format('YYYYMMDD')
const hasBeenCheckedToday = (logs) =>
  logs.some((date) => isDateEqual(date, new Date()))

const ReadAvator = ({date}) => (
  <Avatar className='ChapterListItem-avatar'>
    {moment(date).format('MM/DD')}
  </Avatar>
)

const ChapterListItem = ({chapter, logs, onAdd}) => (
  <ListItem>
    <div className='ChapterListItem'>
      <div className='ChapterListItem-left'>
        <span className='ChapterListItem-chapter'>
          {chapter}章
        </span>
        <span className='ChapterListItem-avatars'>
          {
            logs.map((date) => <ReadAvator date={date} />)
          }
        </span>
      </div>
      <div>
        <Button
          onClick={onAdd}
          disabled={hasBeenCheckedToday(logs)}
          icon='check'
          shape='circle'
          className='ChapterListItem-right'
        />
      </div>
    </div>
  </ListItem>
)

export default pure(ChapterListItem)
