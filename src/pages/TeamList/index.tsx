import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

import { TeamListTemplate } from '../../components/templates/TeamListTemplate'
import firebase from '../../services/Firebase'

export const TeamList: React.FC = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('teams'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  if (loading) {
    return <div>Loading...</div>
  }
  if (error && !value) {
    return <div>Error:</div>
  }

  return (
    <>
      {value && (
        <TeamListTemplate
          teams={value.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().name,
            }
          })}
        />
      )}
    </>
  )
}
