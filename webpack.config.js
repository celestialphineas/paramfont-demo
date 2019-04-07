const path = require('path');

function generateConfig(name) {
  var uglify = name.indexOf('min') > -1;
  var config = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'gridpaper',
      libraryTarget: 'umd'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [{
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          exclude: /node_modules/
        }
      ]
    }
  };
  config.optimization = {};
  if (uglify) {
    config.optimization.minimize = true;
    config.mode = 'production';
  }
  return config;
}

let config = ['index', 'index.min'].map((name) => generateConfig(name));

if(process.argv.indexOf('test') > 0) {
  config.push({
    mode: 'development',
    entry: './test/index.ts',
    output: {
      path: path.resolve(__dirname, 'test'),
      filename: 'index.js',
      sourceMapFilename: 'index.map'
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }]
    }
  });
}

module.exports = config;
