import React, { useEffect, useState } from 'react'

import { TeamListTemplate } from '../../components/templates/TeamListTemplate'
import { db } from '../../services/Firebase'

export const TeamList: React.FC = () => {
  const initTeams = [{ id: '', name: '' }]
  const [teams, setTeams] = useState(initTeams)
  useEffect(() => {
    fetchTeams().then((docs) => {
      if (docs) {
        const result = docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.name,
          }
        })
        setTeams(result)
      }
    })
  }, [])

  async function fetchTeams() {
    const collectionRef = db.collection('teams')
    const snapshots = await collectionRef.get()
    const docs = snapshots.docs.map((doc) => doc.data())
    return docs
  }

  return (
    <>
      <TeamListTemplate teams={teams} />
    </>
  )
}
