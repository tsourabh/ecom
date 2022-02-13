import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { updateProfileStart } from './../../redux/User/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../../components/forms/FormInput';
import Button from '../../components/forms/Button';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})


const Profile = () => {

  const { currentUser } = useSelector(mapState);

  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [contact, setContact] = useState(currentUser.contact);
  
  const handleFormSubmit = event => {
    event.preventDefault();
    console.log(displayName, contact)

    dispatch(updateProfileStart({
      currentUser, 
      displayName, 
      contact
    }))
  }

  const validateContact = contact => {
    if (contact.length <= 10) {
      setContact(contact);
    }
  }



  return (
    <div>
      <form onSubmit={handleFormSubmit}>
       <FormInput
            type="text"
          name="displayName"
          value={displayName}
          placeholder="Full name"
          handleChange={e => setDisplayName(e.target.value)}
        />

        <FormInput
          type="number"
          name="contact"
          value={contact}
          placeholder="Contact Number" 
          maxLength="10"
          // onKeyPress={e => {if(contact.length > 10) return false;}}
          handleChange={e => validateContact(e.target.value)}
        />

        <Button type="submit">
            Save
          </Button>
      </form>
    </div>
  )

}

export default Profile;