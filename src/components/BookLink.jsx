import './BookLink.css'
import React from 'react'
import {pure} from 'recompose'
import {List, Icon} from 'antd'

const BookLink = ({book, onClick}) => (
  <List.Item onClick={onClick}>
    <div className='BookLink'>
      <div>
        {book.name}
      </div>
      <div>
        <Icon type='right' />
      </div>
    </div>
  </List.Item>
)

export default pure(BookLink)
