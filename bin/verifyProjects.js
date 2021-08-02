const cp = require('child_process')
const fs = require('fs')
const path = require('path')

// get projects root
const root = path.resolve(__dirname, '../projects/')

fs.readdirSync(root).forEach((module) => {
  const modulePath = path.join(root, module)
  console.log(modulePath)

  const skipTests = module === ''

  const project = ['--project', module]

  const build = ['ng', 'build', '--configuration production'].concat(project)
  const test = ['ng', 'test', '--watch=false'].concat(project)
  const e2e = ['ng', 'e2e', module]

  const npmCommandsArray = skipTests ? [build] : [build, test, e2e]

  npmCommandsArray.forEach((command) => {
    const spawn = cp.spawnSync(
      /^win/.test(process.platform) ? 'npx.cmd' : 'npx',
      command,
      {
        env: process.env,
        cwd: modulePath,
        stdio: 'inherit',
      }
    )

    if (spawn.status != 0) {
      throw `Error: npx ${command.join(' ')} failed`
    }
  })
})
