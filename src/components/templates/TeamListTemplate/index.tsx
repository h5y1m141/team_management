import React from 'react'

type Props = {
  teams: any[]
}
export const TeamListTemplate: React.FC<Props> = ({ teams }) => {
  return (
    <>
      <h3>TeamList</h3>
      {teams.map((team) => {
        return <div>{team.name}</div>
      })}
    </>
  )
}
