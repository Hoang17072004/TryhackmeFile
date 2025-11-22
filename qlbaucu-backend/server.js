'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load connection profile
const ccpPath = path.resolve('/home/kali/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

// Khởi tạo gateway
async function getContract(user = 'sv102220105') {
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: user,
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('qlbaucu');
    return { contract, gateway };
}

// Health check
app.get('/health', (req, res) => res.send({ status: 'ok' }));

// Init ledger
app.post('/api/init', async (req, res) => {
    try {
        const { contract, gateway } = await getContract();
        await contract.submitTransaction('initLedger');
        await gateway.disconnect();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all ung vien
app.get('/api/ungvien', async (req, res) => {
    try {
        const { contract, gateway } = await getContract();
        const result = await contract.evaluateTransaction('queryAllUngVien');
        await gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get ung vien by ma
app.get('/api/ungvien/:maUV', async (req, res) => {
    try {
        const { maUV } = req.params;
        const { contract, gateway } = await getContract();
        const result = await contract.evaluateTransaction('queryUngVien', maUV);
        await gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new ung vien
app.post('/api/ungvien', async (req, res) => {
    try {
        const { maUV, hoTen, diaChi, ngaySinh, gioiTinh, vote } = req.body;
        const { contract, gateway } = await getContract();
        const result = await contract.submitTransaction('createUngVien', maUV, hoTen, diaChi, ngaySinh, gioiTinh, vote.toString());
        await gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update ung vien
app.put('/api/ungvien/:maUV', async (req, res) => {
    try {
        const { maUV } = req.params;
        const { hoTen, diaChi, ngaySinh, gioiTinh, vote } = req.body;
        const { contract, gateway } = await getContract();
        const result = await contract.submitTransaction('updateUngVien', maUV, hoTen, diaChi, ngaySinh, gioiTinh, vote.toString());
        await gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete ung vien
app.delete('/api/ungvien/:maUV', async (req, res) => {
    try {
        const { maUV } = req.params;
        const { contract, gateway } = await getContract();
        const result = await contract.submitTransaction('deleteUngVien', maUV);
        await gateway.disconnect();
        res.json({ success: true, message: result.toString() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Vote ung vien
app.post('/api/ungvien/:maUV/vote', async (req, res) => {
    try {
        const { maUV } = req.params;
        const { vote } = req.body;
        const { contract, gateway } = await getContract();
        const result = await contract.submitTransaction('voteUngVien', maUV, vote.toString());
        await gateway.disconnect();
        res.json(JSON.parse(result.toString()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
