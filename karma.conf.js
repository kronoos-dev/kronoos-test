// karma.conf.js
module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine'],
      files: [
        'src/**/*.js',
        'tests/**/*.spec.js',
      ],
      reporters: ['progress'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      concurrency: Infinity,
    });
  };
  