import './BackLink.css'
import React from 'react'
import {pure} from 'recompose'
import {Icon} from 'antd'
import {Link} from 'react-router-dom'

const BackLink = ({to, text}) => (
  <div className='BackLink'>
    <Link to={to}><Icon type='left' /> {text}</Link>
  </div>
)

export default pure(BackLink)
