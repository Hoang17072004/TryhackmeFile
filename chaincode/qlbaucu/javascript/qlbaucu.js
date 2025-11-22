'use strict';

const { Contract } = require('fabric-contract-api');

class QLBauCu extends Contract {

    // Khởi tạo ledger với dữ liệu mẫu
    async initLedger(ctx) {
        console.info('============= START : Khoi Tao Du Lieu Ung Vien ===========');
        const ungviens = [
            { maUV: 'UV001', hoTen: 'Nguyen Van A', diaChi: 'Da Nang', ngaySinh: '2000-01-01', gioiTinh: 'Nam', vote: 1 },
            { maUV: 'UV002', hoTen: 'Tran Thi B', diaChi: 'Quang Nam', ngaySinh: '2000-02-02', gioiTinh: 'Nu', vote: 2 },
            { maUV: 'UV003', hoTen: 'Le Van C', diaChi: 'Quang Tri', ngaySinh: '2000-03-03', gioiTinh: 'Nam', vote: 3 },
            { maUV: 'UV004', hoTen: 'Pham Thi D', diaChi: 'Hue', ngaySinh: '2000-04-04', gioiTinh: 'Nu', vote: 4 },
            { maUV: 'UV005', hoTen: 'Hoang Van E', diaChi: 'Sai Gon', ngaySinh: '2000-05-05', gioiTinh: 'Nam', vote: 2 }
        ];

        for (let i = 0; i < ungviens.length; i++) {
            ungviens[i].docType = 'ungvien';
            await ctx.stub.putState(ungviens[i].maUV, Buffer.from(JSON.stringify(ungviens[i])));
            console.info('Da them ung vien: ', ungviens[i].maUV, ' - ', ungviens[i].hoTen);
        }
        console.info('============= END : Khoi Tao Du Lieu Ung Vien ===========');
    }

    // Query 1 ung vien
    async queryUngVien(ctx, maUV) {
        const ungvienAsBytes = await ctx.stub.getState(maUV);
        if (!ungvienAsBytes || ungvienAsBytes.length === 0) {
            throw new Error(`Ung vien ${maUV} khong ton tai`);
        }
        return ungvienAsBytes.toString();
    }

    // Tao ung vien moi
    async createUngVien(ctx, maUV, hoTen, diaChi, ngaySinh, gioiTinh, vote) {
        const exists = await ctx.stub.getState(maUV);
        if (exists && exists.length > 0) {
            throw new Error(`Ung vien ${maUV} da ton tai`);
        }

        const ungvien = {
            docType: 'ungvien',
            maUV,
            hoTen,
            diaChi,
            ngaySinh,
            gioiTinh,
            vote: parseInt(vote)
        };

        await ctx.stub.putState(maUV, Buffer.from(JSON.stringify(ungvien)));
        return JSON.stringify(ungvien);
    }

    // Query tất cả ung vien
    async queryAllUngVien(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];

        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }

        return JSON.stringify(allResults);
    }

    // Update ung vien
    async updateUngVien(ctx, maUV, hoTen, diaChi, ngaySinh, gioiTinh, vote) {
        const ungvienAsBytes = await ctx.stub.getState(maUV);
        if (!ungvienAsBytes || ungvienAsBytes.length === 0) {
            throw new Error(`Ung vien ${maUV} khong ton tai`);
        }

        const ungvien = JSON.parse(ungvienAsBytes.toString());
        ungvien.hoTen = hoTen;
        ungvien.diaChi = diaChi;
        ungvien.ngaySinh = ngaySinh;
        ungvien.gioiTinh = gioiTinh;
        ungvien.vote = parseInt(vote);

        await ctx.stub.putState(maUV, Buffer.from(JSON.stringify(ungvien)));
        return JSON.stringify(ungvien);
    }

    // Delete ung vien
    async deleteUngVien(ctx, maUV) {
        const exists = await ctx.stub.getState(maUV);
        if (!exists || exists.length === 0) {
            throw new Error(`Ung vien ${maUV} khong ton tai`);
        }

        await ctx.stub.deleteState(maUV);
        return `Da xoa ung vien ${maUV}`;
    }

    // Vote ung vien
    async voteUngVien(ctx, maUV, vote) {
        const ungvienAsBytes = await ctx.stub.getState(maUV);
        if (!ungvienAsBytes || ungvienAsBytes.length === 0) {
            throw new Error(`Ung vien ${maUV} khong ton tai`);
        }

        const ungvien = JSON.parse(ungvienAsBytes.toString());
        ungvien.vote += parseInt(vote);

        await ctx.stub.putState(maUV, Buffer.from(JSON.stringify(ungvien)));
        return JSON.stringify(ungvien);
    }
}

module.exports = QLBauCu;

