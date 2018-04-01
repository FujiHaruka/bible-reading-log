import './BookLink.css'
import React from 'react'
import {pure} from 'recompose'
import {List} from 'antd'

const BookLink = ({book, onClick}) => (
  <List.Item className='BookLink' onClick={onClick}>
    {book.name}
  </List.Item>
)

export default pure(BookLink)
