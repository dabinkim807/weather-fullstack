import {useState} from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const AddUser = (props) => {
  // open={addOpen} onClose={handleAddClose} contacts={contacts} setContacts={setContacts}

  const defaultContact = {
    name: "",
		email: "",
		phone: "",
		notes: ""
  }
  const [newContact, setNewContact] = useState(defaultContact);

  const handleNameChange = (e) => {
    e.preventDefault();
    setNewContact((newContact) => ({...newContact, name: e.target.value}));
  }
  const handleEmailChange = (e) => {
    e.preventDefault();
    setNewContact((newContact) => ({...newContact, email: e.target.value}));
  }
  const handlePhoneChange = (e) => {
    e.preventDefault();
    setNewContact((newContact) => ({...newContact, phone: e.target.value}));
  }
  const handleNoteChange = (e) => {
    e.preventDefault();
    setNewContact((newContact) => ({...newContact, notes: e.target.value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const postRequest = () => {
      fetch(`http://localhost:8081/api/contacts`, {
        method: "POST",
        headers: {
          "Content-type": "application/JSON"
        },
        body: JSON.stringify(newContact)
      })
        .then((response) => {
          if (response.status === 400) {
            response.text().then(function (text) {
              alert(text);
            });
            return null;
          } else {
            return response.json();
          }})
        .then((response) => {
          if (response !== null) {
            let n = [...props.contacts, response];
            props.setContacts(n);
            setNewContact(defaultContact);
          }
            props.onClose();
        });
            
    }
    postRequest();
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="main-modal">
      <Modal open={props.open} onClose={props.onClose}>
        <Box sx={style}>     
          <h2>New Contact</h2>
          <form>
            <label>Name</label>
            <input
              type="text"
              id="name"
              placeholder="Add name"
              required
              value={newContact.name}
              onChange={handleNameChange}
            />
            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="Add email"
              value={newContact.email}
              onChange={handleEmailChange}
            />
            <label>Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder="Add phone number"
              required
              value={newContact.phone}
              onChange={handlePhoneChange}
            />
            <label>Notes</label>
            <input
              type="text"
              id="notes"
              placeholder="Add notes"
              value={newContact.notes}
              onChange={handleNoteChange}
            />
            <button type="submit" onClick={props.onClose}>Cancel</button>
            <button type="submit" onClick={handleSubmit}>Save</button>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default AddUser;