const assert = require('assert').strict;
const fs = require('fs');

const glob = require('glob');

const packageJSON = require('../package.json');

// Validation to assert the output of the build.

validateStandardBuild();
validateEsNextBuild();
validateAncillaryOutput();
validateVersionReplacement();

function validateStandardBuild() {
  // Standard build
  assert.ok(fs.existsSync('./build/cjs/index.js'));
  assert.ok(fs.existsSync('./build/esm/index.js'));
  assert.ok(fs.existsSync('./build/esm/styles.css'));

  // Assert it uses named exports rather than properties from the React default
  // export to help tree-shaking.
  // React.createElement and React.Fragment are the allowed exceptions
  const files = glob.sync('./build/cjs/**/*.js');
  assert.notStrictEqual(files.length, 0);
  const filesContainingUnwantedReactUsage = [];
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');

    const unwantedReactUsageMatches =
      content.match(
        /React__default\['default'\]\.(?!createElement|Fragment)[A-Za-z0-9]+/g,
      ) || [];

    if (unwantedReactUsageMatches.length) {
      filesContainingUnwantedReactUsage.push(file);
    }
  });

  assert.deepStrictEqual(filesContainingUnwantedReactUsage, []);

  // Standard build css contains namespaced classes
  const cssContent = fs.readFileSync('./build/esm/styles.css', 'utf-8');
  assert.ok(
    cssContent.includes(
      '.DiscountAppComponents-UsageLimitsCard__TotalUsageLimitTextField{',
    ),
  );
}

function validateEsNextBuild() {
  // ESnext build
  assert.ok(fs.existsSync('./build/esnext/index.esnext'));

  assert.ok(
    fs.existsSync(
      './build/esnext/components/UsageLimitsCard/UsageLimitsCard.esnext',
    ),
  );
  assert.ok(
    fs.existsSync(
      './build/esnext/components/UsageLimitsCard/UsageLimitsCard.css',
    ),
  );

  // ESnext build css contains namespaced classes
  const cssContent = fs.readFileSync(
    './build/esnext/components/UsageLimitsCard/UsageLimitsCard.css',
    'utf-8',
  );
  assert.ok(
    cssContent.includes(
      '.DiscountAppComponents-UsageLimitsCard__TotalUsageLimitTextField_1kj4n{',
    ),
  );

  const jsContent = fs.readFileSync(
    './build/esnext/components/UsageLimitsCard/UsageLimitsCard.scss.esnext',
    'utf-8',
  );

  assert.ok(jsContent.includes("import './UsageLimitsCard.css';"));
  assert.ok(
    jsContent.includes(
      '"TotalUsageLimitTextField": "DiscountAppComponents-UsageLimitsCard__TotalUsageLimitTextField_1kj4n"',
    ),
  );
}

function validateAncillaryOutput() {
  assert.ok(fs.existsSync('./build/ts/latest/src/index.d.ts'));
  // Downleveled for consumers on older TypeScript versions
  assert.ok(fs.existsSync('./build/ts/3.4/src/index.d.ts'));
}

function validateVersionReplacement() {
  const files = glob.sync('./build/**/*.{js,mjs,esnext,css}');

  assert.notStrictEqual(files.length, 0);

  const fileBuckets = {
    includesTemplateString: [],
    includesVersion: [],
  };

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8');

    if (content.includes('DISCOUNT_APP_COMPONENTS_VERSION')) {
      fileBuckets.includesTemplateString.push(file);
    }

    if (content.includes(packageJSON.version)) {
      fileBuckets.includesVersion.push(file);
    }
  });

  assert.strictEqual(fileBuckets.includesTemplateString.length, 0);

  assert.deepStrictEqual(fileBuckets.includesVersion, [
    'build/esnext/configure.esnext',
    'build/esnext/components/AppProvider/AppProvider.css',
    'build/esm/styles.css',
    'build/esm/configure.js',
    'build/cjs/configure.js',
  ]);
}
