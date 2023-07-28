const { strict: assert } = require('assert');
const {
  defaultGanacheOptions,
  withFixtures,
  unlockWallet,
  getEventPayloads,
  WINDOW_TITLES,
} = require('../helpers');
const FixtureBuilder = require('../fixture-builder');
const { TEST_SNAPS_WEBSITE_URL } = require('./enums');

async function mockSegment(mockServer) {
  return [
    await mockServer
      .forPost('https://api.segment.io/v1/batch')
      .withJsonBodyIncluding({
        batch: [{ type: 'track', event: 'Snap Installed' }],
      })
      .thenCallback(() => {
        return {
          statusCode: 200,
        };
      }),
  ];
}

describe('Snap Installed Event', function () {
  it('successfully tracked when snap is installed', async function () {
    await withFixtures(
      {
        fixtures: new FixtureBuilder()
          .withMetaMetricsController({
            metaMetricsId: 'fake-metrics-id',
            participateInMetaMetrics: true,
          })
          .build(),
        ganacheOptions: defaultGanacheOptions,
        title: this.test.title,
        testSpecificMock: mockSegment,
      },
      async ({ driver, mockedEndpoint: mockedEndpoints }) => {
        await driver.navigate();

        await unlockWallet(driver);

        // navigate to test snaps page and connect
        await driver.openNewPage(TEST_SNAPS_WEBSITE_URL);
        await driver.delay(1000);
        const confirmButton = await driver.findElement('#connectdialogs');
        await driver.scrollToElement(confirmButton);
        await driver.delay(500);
        await driver.clickElement('#connectdialogs');
        await driver.delay(500);

        // switch to metamask extension and click connect
        await driver.switchToWindowWithTitle(WINDOW_TITLES.Notification);

        await driver.clickElement({
          text: 'Connect',
          tag: 'button',
        });

        // Two clicks for two screen confirmations
        await driver.waitForSelector({ text: 'Install' });

        await driver.clickElement('[data-testid="page-container-footer-next"]');

        await driver.waitForSelector({ text: 'OK' });

        await driver.clickElement('[data-testid="page-container-footer-next"]');

        await driver.switchToWindowWithTitle(WINDOW_TITLES.TestSnaps);

        // wait for npm installation success
        await driver.waitForSelector({
          css: '#connectdialogs',
          text: 'Reconnect to Dialogs Snap',
        });

        const events = await getEventPayloads(driver, mockedEndpoints);

        assert.deepStrictEqual(events[0].properties, {
          snap_id: 'npm:@metamask/dialog-example-snap',
          version: '0.37.2-flask.1',
          category: 'Snaps',
          locale: 'en',
          chain_id: '0x539',
          environment_type: 'background',
        });
      },
    );
  });
});