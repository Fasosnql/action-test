import * as core from '@actions/core';
import { getOctokit, context } from '@actions/github';

const LABEL_AUTOMERGE_NAME = 'AUTOMERGE';

const prHasAutomergeLabel = (pr) => {
  return !!pr.labels.find((label) => label.name === LABEL_AUTOMERGE_NAME);
};

async function main() {
  const token = core.getInput('repo-token');
  const client = getOctokit(token);
  const baseBranch = context.payload.ref;

  console.log(context);
  console.log(context.payload);

  /*const pullsResponse = await client.pulls.list({
    ...context.repo,
    base: baseBranch,
    state: 'open',
  });
  const prs = pullsResponse.data;

  prs.map((pr) => {
    if (prHasAutomergeLabel(pr)) {
      client.pulls.updateBranch({
        ...context.repo,
        pull_number: pr.number,
      });

      console.log(pr);
    }
  });*/
}

main();
