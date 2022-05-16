import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import Phonebook from './Phonebook/Phonebook';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';

const App = () => {
  const [contacts, setContacts] = useState(
    () => {
      return JSON.parse(localStorage.getItem('contacts')) || [];
    }
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  );

  const [filter, setFilter] = useState('');

  // сохраняем инфо в локал сторедж

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddUser = contact => {
    const searchedName = contact.name.toLowerCase();

    if (contacts.some(element => element.name.toLowerCase() === searchedName)) {
      return alert(`${contact.name} is already in contacts.`);
    }

    contact.id = nanoid();
    setContacts(prev => [...prev, contact]);
  };

  const getFilteredContacts = () => {
    if (filter === '') return contacts;
    const filterToLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterToLowerCase)
    );
  };

  const onDeleteUser = id => {
    setContacts(prev => prev.filter(element => element.id !== id));
  };

  return (
    <div>
      <Section>
        <Phonebook onAddUser={onAddUser} />
        <h3>Contacts</h3>
        <Filter value={filter} setFilter={setFilter} />
        <ContactsList
          contacts={getFilteredContacts()}
          onDeleteUser={onDeleteUser}
        />
      </Section>
    </div>
  );
};

export default App;
