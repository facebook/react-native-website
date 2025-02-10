
module.exports = {
  name: `plugin-project-info`,
  factory: require => {
    const core = require(`@yarnpkg/core`);
    const fslib = require(`@yarnpkg/fslib`);
    
    return {
      default: {
        hooks: {
          afterAllInstalled: async () => {
            console.log(process.cwd());
            
            await core.execUtils.execvp('yarn', ['dedupe'], {
              cwd: fslib.npath.toPortablePath(process.cwd()),
            });
          },
        },
      },
    };
  },
};
