module.exports = {
  branches: ['stable'],
  plugins: {
    commitAnalyzer: [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'style', release: 'patch' },
          { type: 'chore', release: 'patch' },
          { type: 'docs', release: 'patch' },
        ],
      },
    ],
    releaseNotes: '@semantic-release/release-notes-generator',
    changelog: [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# CHANGELOG',
      },
    ],
    github: '@semantic-release/github',
    npm: '@semantic-release/npm',
    git: [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json'],
      },
    ],
  },
};
