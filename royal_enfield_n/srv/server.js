const cds = require("@sap/cds");
const cov2ap = require("@sap/cds-odata-v2-adapter-proxy");

cds.on("bootstrap", (app) => {
    app.use(cov2ap());
});
cds.once("served", async () => {
    try {
        const vcapServices = JSON.parse(process.env.VCAP_SERVICES || "{}");
        const userProvidedService = vcapServices["user-provided"]?.find(
            (service) => service.name === "My-Credentials"
        );
        if (!userProvidedService) {
            console.error('User-provided service "My-Credentials" not found!');
            throw new Error("Missing user-provided service configuration.");
        }
        const { APIKey } = userProvidedService.credentials;
        if (!APIKey) {
            throw new Error("Missing APIKey in user-provided service configuration.");
        }
        console.log("Successfully retrieved API Key from user-provided service.");
        const S4bupa = await cds.connect.to("API_BUSINESS_PARTNER");
        S4bupa.before("READ", (req) => {
            req.headers = {
                ...req.headers,
                APIKey,
            };
        });
        console.log("API Key has been successfully added to all outgoing requests.");
    } catch (error) {
        console.error("Error in server.js:", error.message);
    }
});

module.exports = cds.server;