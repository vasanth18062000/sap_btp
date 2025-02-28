const cds = require('@sap/cds');
const bcrypt = require('bcryptjs');

module.exports = cds.service.impl(async function () {
    const { Dealer, ServiceCenterLocator, StoreLocator, BookTestRide, Customer, BulkOrders, ContactUs, WarrantyClaim, Motorcycles } = this.entities;

    const logger = cds.log('royalEnfieldService'); 

    // Fetch available motorcycle details
    this.on('getAvailableMotorcycle', async (req) => {
        logger.info('Fetching available motorcycles...');
        try {
            const availableMotorcycles = await cds.tx(req).run(
                SELECT.from('royal_enfield_n.db_Motorcycles AS m').where({ isAvailable: true })
            );
            logger.debug('Available motorcycles fetched successfully:', availableMotorcycles);
            return availableMotorcycles;
        } catch (error) {
            logger.error('Error fetching available motorcycles:', error);
            req.error(500, 'Failed to fetch available motorcycles.');
        }
    });

    // Update motorcycle stock
    this.on('updateMotorcycleStock', async (req) => {
        const { id, stockQuantity } = req.data;

        logger.info('Updating stock for motorcycle:', { id, stockQuantity });

        if (!id || stockQuantity === undefined) {
            logger.warn('Validation failed: Both id and stockQuantity are required.');
            req.error(400, 'Both id and stockQuantity are required.');
        }

        try {
            const motorcycle = await SELECT.one.from(Motorcycles).where({ ID: id });

            if (!motorcycle) {
                logger.warn(`Motorcycle with ID ${id} not found.`);
                req.error(404, `Motorcycle with ID ${id} not found.`);
            }

            await UPDATE(Motorcycles).set({ stockQuantity }).where({ ID: id });
            logger.info(`Stock updated successfully for Motorcycle ID: ${id}`);
            return `Stock updated successfully for Motorcycle ID: ${id}`;
        } catch (error) {
            logger.error('Error updating motorcycle stock:', error);
            req.error(500, 'Failed to update motorcycle stock.');
        }
    });

    // Validate Dealer uniqueness before creation
    this.before('CREATE', [Dealer], async (req) => {
        const { emailId, mobileNumber } = req.data;

        logger.info('Validating uniqueness for Dealer:', { emailId, mobileNumber });

        try {
            const emailExists = await cds.run(
                SELECT.one.from('royal_enfield_n.db_Dealer').where({ emailId: emailId })
            );

            if (emailExists) {
                logger.warn(`Validation failed: Email ID '${emailId}' already exists.`);
                req.error(400, `Email ID '${emailId}' already exists.`);
            }

            const mobileExists = await cds.run(
                SELECT.one.from('royal_enfield_n.db_Dealer').where({ mobileNumber: mobileNumber })
            );

            if (mobileExists) {
                logger.warn(`Validation failed: Mobile Number '${mobileNumber}' already exists.`);
                req.error(400, `Mobile Number '${mobileNumber}' already exists.`);
            }
        } catch (error) {
            logger.error('Error during Dealer validation:', error);
            req.error(500, 'Failed to validate Dealer.');
        }
    });

    // Validate Customer uniqueness before creation
    this.before('CREATE', [Customer], async (req) => {
        const { emailId, mobileNumber } = req.data;

        logger.info('Validating uniqueness for Customer:', { emailId, mobileNumber });

        try {
            const emailExists = await cds.run(
                SELECT.one.from('royal_enfield_n.db_Customer').where({ emailId: emailId })
            );

            if (emailExists) {
                logger.warn(`Validation failed: Email ID '${emailId}' already exists.`);
                req.error(400, `Email ID '${emailId}' already exists.`);
            }

            const mobileExists = await cds.run(
                SELECT.one.from('royal_enfield_n.db_Customer').where({ mobileNumber: mobileNumber })
            );

            if (mobileExists) {
                logger.warn(`Validation failed: Mobile Number '${mobileNumber}' already exists.`);
                req.error(400, `Mobile Number '${mobileNumber}' already exists.`);
            }
        } catch (error) {
            logger.error('Error during Customer validation:', error);
            req.error(500, 'Failed to validate Customer.');
        }
    });

    const S4bupa = await cds.connect.to('API_BUSINESS_PARTNER');
    this.on('READ', 'Supplier', (req) => {
        logger.info('Fetching Supplier data using API_BUSINESS_PARTNER...');
        return S4bupa.run(req.query);
    });
});
