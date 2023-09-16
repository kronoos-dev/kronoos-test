const server = require('../bin/server.js');
const supertest = require('supertest');
const fs = require('fs');
const requestWithSupertest = supertest(server);

describe('ProcessCSV Endpoints', () => {

    it('POST /process should exist', async () => {
        const res = await requestWithSupertest.post('/process','');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('data')
    });

});