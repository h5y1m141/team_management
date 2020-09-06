import React from 'react'

import firebase from '../../services/Firebase'

export const SignOut: React.FC = () => {
  firebase.auth().signOut()

  return (
    <>
      <h3>ログアウト完了しました</h3>
    </>
  )
}
