import React from 'react'
import {Modal} from 'antd'

function showHelpDialog () {
  Modal.info({
    title: '聖書通読表',
    content: (
      <div>
        <p>
          スマホで使える聖書通読表です。
        </p>
        <p>
          ホーム画面に追加するとアプリとして使えます。データはブラウザに保存するのでオフラインでも使用できます。
        </p>
        <p>
          感想・不具合などは <a href='https://github.com/FujiHaruka/bible-reading-log' target='_blank'>FujiHaruka/bible-reading-log</a> までお願いします。
        </p>
      </div>
    )
  })
}

export default showHelpDialog
