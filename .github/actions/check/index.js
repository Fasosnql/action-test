import * as core from '@actions/core';
import { getOctokit, context } from '@actions/github';

const LABEL_AUTOMERGE_NAME = 'AUTOMERGE';

const prHasAutomergeLabel = (pr) => {
  return !!pr.labels.find((label) => label.name === LABEL_AUTOMERGE_NAME);
};

async function main() {
  const token = core.getInput('repo-token');
  const client = getOctokit(token);

  if (context.payload.check_suite.conclusion === 'success') {
    console.log(context.payload.check_suite);
    await client.pulls.merge({
      ...context.repo,
      pull_number: context.payload.check_suite.pull_requests[0].number,
    });
  }
}

main();
