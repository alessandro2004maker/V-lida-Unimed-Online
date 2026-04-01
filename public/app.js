// API URL
const API_URL = 'https://your-backend-api.com/medical-records';

// Create a new medical record
async function createMedicalRecord(record) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(record)
        });
        return await response.json();
    } catch (error) {
        console.error('Error creating record:', error);
    }
}

// Read a medical record
async function getMedicalRecord(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    } catch (error) {
        console.error('Error retrieving record:', error);
    }
}

// Update a medical record
async function updateMedicalRecord(id, record) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(record)
        });
        return await response.json();
    } catch (error) {
        console.error('Error updating record:', error);
    }
}

// Delete a medical record
async function deleteMedicalRecord(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        console.log('Record deleted');
    } catch (error) {
        console.error('Error deleting record:', error);
    }
}