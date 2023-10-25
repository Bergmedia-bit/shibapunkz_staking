
import * as webpack from 'webpack'
import { CracoConfig } from '@craco/craco'

const cracoConfig: CracoConfig = {
    webpack: {
        plugins: {
            add: [
                new webpack.ProvidePlugin({
                    Buffer: [require.resolve('buffer/'), 'Buffer'],
                    // process: 'process/browser',
                     process: require.resolve('process/browser.js'),
                }),
            ],
        },
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.resolve = {
                ...(webpackConfig?.resolve ?? {}),
                fallback: {
                    ...(webpackConfig?.resolve?.fallback ?? {}),
                    process: false,

                    assert: false,
                    // buffer: require.resolve('buffer/'),
                    crypto: false,
                    // events: require.resolve('events/'),
                    http: false,

                    os: false,
                    // 'process/browser': require.resolve('process/browser.js'),
                    // stream: require.resolve('stream-browserify'),
                     'https': require.resolve('https-browserify'),
                    // string_decoder: require.resolve('string_decoder/'),
                    url: false,
                    // util: require.resolve('util/'),
                    // tslib: require.resolve('tslib/'),
                },
            }
            webpackConfig.ignoreWarnings = [/Failed to parse source map/]
            webpackConfig.stats = {
                errorDetails: true,
            }
            return webpackConfig
        },
    },
}

export default cracoConfig