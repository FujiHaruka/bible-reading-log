import './BackLink.css'
import React from 'react'
import {pure} from 'recompose'
import {Icon} from 'antd'
import {Link} from 'react-router-dom'

const BackLink = ({to}) => (
  <div className='BackLink'>
    <Link to={to}><Icon type='left' /></Link>
  </div>
)

export default pure(BackLink)
