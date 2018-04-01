import './ReadingLogModal.css'
import React from 'react'
import {Modal} from 'antd'
import moment from 'moment'

const ReadingLogModal = ({bookName, chapter, date, visible, onOk, onCancel}) => (
  <Modal
    title='読書記録'
    visible={visible}
    okType='danger'
    okText='削除'
    cancelText='戻る'
    onOk={onOk}
    onCancel={onCancel}
  >
    <p>
      {bookName} {chapter}章
    </p>
    <p>
      読書日： {moment(date).format('YYYY/MM/DD')}
    </p>
  </Modal>
)

export default ReadingLogModal
