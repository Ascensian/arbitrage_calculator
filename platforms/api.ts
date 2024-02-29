import express from 'express';

export function launchAPI() {
    const app = express();


    app.listen(process.env.PORT, () => {
        console.log(`Structuring Pairs service listening on port ${process.env.PORT}`);
    });
}