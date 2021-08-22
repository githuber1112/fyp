const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': 'black',
                          '@border-color-base' : 'black',
                          "@input-hover-border-color": "black",
                        },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};