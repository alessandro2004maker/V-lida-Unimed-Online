const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Set up SQLite database
const db = new sqlite3.Database(':memory:');

// Create medical records table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS medical_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        endereco TEXT,
        cpf TEXT,
        nomePaciente TEXT,
        nomeDoutor TEXT,
        crmDoutor TEXT,
        cid TEXT,
        dataEmissao TEXT,
        dataRepouso TEXT
    )`);
});

// Create medical record
app.post('/records', (req, res) => {
    const { endereco, cpf, nomePaciente, nomeDoutor, crmDoutor, cid, dataEmissao, dataRepouso } = req.body;
    db.run(`INSERT INTO medical_records (endereco, cpf, nomePaciente, nomeDoutor, crmDoutor, cid, dataEmissao, dataRepouso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [endereco, cpf, nomePaciente, nomeDoutor, crmDoutor, cid, dataEmissao, dataRepouso], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Read all medical records
app.get('/records', (req, res) => {
    db.all(`SELECT * FROM medical_records`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Update medical record
app.put('/records/:id', (req, res) => {
    const { id } = req.params;
    const { endereco, cpf, nomePaciente, nomeDoutor, crmDoutor, cid, dataEmissao, dataRepouso } = req.body;
    db.run(`UPDATE medical_records SET endereco = ?, cpf = ?, nomePaciente = ?, nomeDoutor = ?, crmDoutor = ?, cid = ?, dataEmissao = ?, dataRepouso = ? WHERE id = ?`, [endereco, cpf, nomePaciente, nomeDoutor, crmDoutor, cid, dataEmissao, dataRepouso, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record updated successfully' });
    });
});

// Delete medical record
app.delete('/records/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM medical_records WHERE id = ?`, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json({ message: 'Record deleted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
