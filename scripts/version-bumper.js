/* eslint-disable no-console */
/**
 * Version bumper
 * --------------
 *
 * Bumps the package version and creates a PR to release the version change.
 *
 *
 * Defaults to bumping a minor version, but will accept [yarn version flags](https://classic.yarnpkg.com/en/docs/cli/version#toc-commands) and delegate the flags to the yarn command.
 *
 */

const {execSync} = require('child_process');
const {resolve} = require('path');

const chalk = require('chalk');

const packageJSON = require('../package.json');

const DEFAULT_VERSION_BUMP = '--minor';

const root = resolve(__dirname, '..');
const run = (cmd) => execSync(cmd, {stdio: 'inherit', cwd: root});

const hasUnstagedChanges = () => {
  try {
    run('git diff --exit-code --quiet');
  } catch (error) {
    console.log(
      chalk.red(`
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
      You have local changes and must commit or stash them before running this script.
  
      !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      `),
    );

    return true;
  }

  return false;
};

const args = process.argv.slice(2);

if (!hasUnstagedChanges()) {
  console.log(`\n\nCurrent version is: ${chalk.blue(packageJSON.version)}`);

  const newBranch = `bump-version-from-${packageJSON.version}`;
  console.log(`\n\nChecking out a new branch ${newBranch}...`);

  run(`git checkout -b ${newBranch}`);

  const versionBumpCmd = `yarn version ${
    args?.length > 0 ? args.join(' ') : DEFAULT_VERSION_BUMP
  }`;
  console.log(chalk.green(`\n\nRunning ${versionBumpCmd}`));

  run(versionBumpCmd);

  run(`git push origin bump-version-from-${packageJSON.version} --follow-tags`);
}
