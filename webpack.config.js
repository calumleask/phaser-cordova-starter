const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const SRC_DIR = path.resolve(__dirname, "src");
const DEBUG_BUILD_DIR = path.resolve(__dirname, "dist");
const CORDOVA_BUILD_DIR = path.resolve(__dirname, "www/build");

module.exports = (env) => {
  const production = env.production === "true";
  const cordova = env.cordova === "true";
  const BUILD_DIR = cordova ? CORDOVA_BUILD_DIR : DEBUG_BUILD_DIR;

  console.log("Production: ", production);
  console.log("Output directory: ", BUILD_DIR);

  return {
    mode: production ? "production" : "development",

    devtool: production ? "source-map" : "inline-source-map",

    entry: {
      game: SRC_DIR + "/index.ts"
    },

    output: {
      path: BUILD_DIR,
      filename: "[name].js",
      library: "game",
      libraryTarget: "umd"
    },

    module : {
      rules : [
        {
          test : /\.ts$/,
          include : SRC_DIR,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript"
              ]
            }
          }
        }
      ]
    },

    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        "@phaser-framework": path.resolve(__dirname, "./libs/phaser-framework"),
        "~": path.resolve(__dirname, "./src"),
      }
    },

    devServer: {
      contentBase: DEBUG_BUILD_DIR,
      port: 8080
    },

    plugins: cordova ? [] : [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public/index.html"),
            to: BUILD_DIR
          }
        ]
      })
    ],

    optimization: production ? {
      minimize: true,
      minimizer: [new TerserPlugin()],
    } : {},
  };
}
