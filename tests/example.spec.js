// @ts-check
const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const mongoModule = require('./mongodb_utils');

test('MongoDB Connection Test', async ({}) => {
	const results = await mongoModule.connectToMongoDB();
});

test('MongoDB dump test', async ({}) => {
	const results = await mongoModule.dump_all();
});

test('MongoDB get collection test', async ({}) => {
	const results = await mongoModule.get_collection('roles');
});

test('MongoDB insert_one_record test', async ({}) => {
	const results = await mongoModule.insert_one_record();
});
