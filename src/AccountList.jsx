import React, { useState, useEffect } from 'react';
import {
  getAllAccounts,
  getAccountByName,
  createAccount,
  deleteAccount,
  updateAccountName,
} from './components/api'; // Import the API functions

const AccountList = () => {
  const [data, setData] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [newNameInput, setNewNameInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const accounts = await getAllAccounts();
    setData(accounts);
  };

  const handleRetrieve = async () => {
    if (nameInput.trim() !== '') {
      const account = await getAccountByName(nameInput);
      setData(account ? [account] : []);
    } else {
      fetchData();
    }
  };

  const handleCreate = async () => {
    if (newNameInput.trim() !== '') {
      const accountData = {
        name: newNameInput,
        address: 'Sample Address',
        balance: 0,
        account_number: '000000',
      };
      await createAccount(accountData);
      fetchData();
      setNewNameInput('');
    }
  };

  const handleDelete = async (name) => {
    await deleteAccount(name);
    fetchData();
  };

  const handleUpdate = async (name, updatedName) => {
    await updateAccountName(name, updatedName);
    fetchData();
  };

  return (
    <div>
      <h1>Bank Accounts</h1>

      {/* Create Account */}
      <div>
        <h2>Create Account</h2>
        <input
          type="text"
          placeholder="Name"
          value={newNameInput}
          onChange={(e) => setNewNameInput(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      {/* Retrieve Account */}
      <div>
        <h2>Retrieve Account</h2>
        <input
          type="text"
          placeholder="Name"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <button onClick={handleRetrieve}>Retrieve</button>
      </div>

      {/* Account List */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Balance</th>
            <th>Account Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((account) => (
            <tr key={account.account_number}>
              <td>{account.name}</td>
              <td>{account.address}</td>
              <td>{account.balance}</td>
              <td>{account.account_number}</td>
              <td>
                <button onClick={() => handleDelete(account.name)}>Delete</button>
                <input
                  type="text"
                  placeholder="New Name"
                  value={account.updatedName || ''}
                  onChange={(e) => {
                    const updatedAccount = { ...account, updatedName: e.target.value };
                    setData((prevData) =>
                      prevData.map((prevAccount) =>
                        prevAccount.account_number === account.account_number ? updatedAccount : prevAccount
                      )
                    );
                  }}
                />
                <button onClick={() => handleUpdate(account.name, account.updatedName)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
