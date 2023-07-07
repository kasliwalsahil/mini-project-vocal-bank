const API_BASE_URL = 'http://localhost:5000'; // Update with your Flask backend URL

// Retrieve all accounts
export const getAllAccounts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/`);
    const data = await response.json();
    // sessionStorage.setItem('data', JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error retrieving accounts:', error);
    return [];
  }
};

// Retrieve account by name
export const getAccountByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${name}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error retrieving account ${name}:`, error);
    return null;
  }
};

// Create a new account
export const createAccount = async (accountData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/postData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating account:', error);
    return null;
  }
};

// Delete an account by name
export const deleteAccount = async (name) => {
  try {
    await fetch(`${API_BASE_URL}/deleteData/${name}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting account ${name}:`, error);
  }
};

// Update an account's name
export const updateAccountName = async (name, updatedName) => {
  try {
    await fetch(`${API_BASE_URL}/update/${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedName }),
    });
  } catch (error) {
    console.error(`Error updating account ${name}:`, error);
  }
};

