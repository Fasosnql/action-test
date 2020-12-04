import * as core from '@actions/core';
import { GitHub, context } from '@actions/github';

async function main() {
  const token = core.getInput('github-token');
  const client = new GitHub(token);
  const baseBranch = context.payload.ref;

  const pullsResponse = await client.pulls.list({
    ...context.repo,
    base: baseBranch,
    state: 'open',
  });
  const prs = pullsResponse.data;

  await Promise.all(
    prs.map((pr) => {
      console.log(pr);
      /*client.pulls.updateBranch({
        ...github.context.repo,
        pull_number: pr.number,
      });*/
    }),
  );
}

main();

console.log('HELLO EVERYONE 1111111111');
