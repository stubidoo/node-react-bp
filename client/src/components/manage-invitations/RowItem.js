import React from 'react'

const RowItem = ({invite}) => {
  const primaryGuest = invite.users.find( user => user.primary_guest);
  return (
    <tr className="table-light" >
      <td>{primaryGuest.name}</td>
      <td>{invite.status}</td>
      <td>{invite.users.length}</td>
      <td>Column content</td>
      <td>Column content</td>
      <td>
          <button type="button" className="btn btn-outline-primary">Primary</button>
          <button type="button" className="btn btn-outline-primary">Primary</button>
      </td>
    </tr>
  )
}

export default RowItem
