const cds = require('@sap/cds');
const ExcelJS = require('exceljs');
const { v4: uuidv4 } = require('uuid');

module.exports = cds.service.impl(async function () {
    const { TcodeMapping } = this.entities;

    this.on('uploadProductsXLSX', async (req) => {
        try {
            const fileBase64 = req.data.file;
            if (!fileBase64) {
                return req.error(400, 'No file provided');
            }

            // Decode base64 to buffer
            const buffer = Buffer.from(fileBase64, 'base64');

            // Load workbook from buffer
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(buffer);

            const worksheet = workbook.worksheets[0]; // Assume data is in first sheet
            const records = [];

            // Get header row indexes
            const headerRow = worksheet.getRow(1);
            const headers = headerRow.values.map(v => v?.toString().trim().toLowerCase());

            worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
                if (rowNumber === 1) return; // skip header

                const values = row.values;
            const record = {
    ID: uuidv4(),
    secruityRoleLevel: values[headers.indexOf('secruityrolelevel')],
    s4HanaForSelfServiceUse: values[headers.indexOf('s4hanaforselfserviceuse')],
    tCode: values[headers.indexOf('tcode')],
};

                records.push(record);
            });

            if (records.length > 0) {
                await INSERT.into(TcodeMapping).entries(records);
                return { message: `Inserted ${records.length} records successfully.` };
            } else {
                return { message: 'No valid records found in file.' };
            }

        } catch (error) {
            console.error('Upload Error:', error);
            return req.error(500, 'Failed to process XLSX file: ' + error.message);
        }
    });
});
