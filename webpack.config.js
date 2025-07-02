const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/js/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
      assetModuleFilename: 'assets/[name][ext]'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                api: 'modern',
                sassOptions: {
                  quietDeps: true, // Suppress deprecation warnings from dependencies
                }
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ],
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules/swiper')
          ]
        },
        {
          test: /\.(png|jpg|jpeg|gif|mp4)$/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'content',
            to: 'assets',
            noErrorOnMissing: true
          }
        ]
      }),
      ...(isProduction ? [
        new MiniCssExtractPlugin({
          filename: 'style.css'
        })
      ] : [])
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'content'),
          publicPath: '/assets'
        }
      ],
      compress: true,
      port: 3000,
      hot: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@content': path.resolve(__dirname, 'content')
      }
    }
  };
}; 