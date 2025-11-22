'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

const USER_NAME = 'sv102220105';

async function main() {
    try {
        const ccpPath = path.resolve('/home/kali/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        const userIdentity = await wallet.get(USER_NAME);
        if (userIdentity) {
            console.log(`User ${USER_NAME} already exists`);
            return;
        }

        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('Admin identity not found. Run enrollAdmin.js first');
            return;
        }

        const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: USER_NAME, role: 'client' }, adminUser);
        const enrollment = await ca.enroll({ enrollmentID: USER_NAME, enrollmentSecret: secret });

        const x509Identity = {
            credentials: { certificate: enrollment.certificate, privateKey: enrollment.key.toBytes() },
            mspId: 'Org1MSP',
            type: 'X.509'
        };

        await wallet.put(USER_NAME, x509Identity);
        console.log(`Successfully registered and enrolled user "${USER_NAME}"`);

    } catch (error) {
        console.error(`Failed to register user: ${error}`);
        process.exit(1);
    }
}

main();
