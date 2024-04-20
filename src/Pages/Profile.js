import React, { useContext } from 'react';
import { UserContext } from '../Components/UserContext';
import Sidebar from '../Components/Sidebar';

function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div style={{display:'flex'}}>
        <div style={{flex:'1'}}>
            <Sidebar/>
        </div>
      <div style={{flex:'3'}}>
      <h1>Profile</h1>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      {/* Display other user data as needed */}
      </div>
    </div>
  );
}

export default Profile;