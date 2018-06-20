// Paths
import { source, build } from '../paths';

// Webpack modules
import {
    loadJavaScript,
    loadFonts,
    loadImages,
    setupHtml,
    setupFavicon,
    setupContextReplacement,
    setupStyledReporting,
    initializeEnvVariables
} from '../modules';

// Instruments
import merge from 'webpack-merge';

export const generateCommonConfiguration = () => {
    const BUILD_ENV = process.env.BUILD_ENV;
    const REPOSITORY_NAME = process.env.REPOSITORY_NAME;

    return merge(
        // Loaders
        loadJavaScript(),
        loadFonts(),
        loadImages(),

        // Plugins
        setupHtml(),
        setupContextReplacement(),
        setupFavicon(),
        setupStyledReporting(),
        initializeEnvVariables({
            __ENV__:  JSON.stringify(BUILD_ENV),
            __DEV__:  BUILD_ENV === 'development',
            __PROD__: BUILD_ENV === 'production',
        }),
        {
            entry: {
                source,
            },
            output: {
                path:       build,
                publicPath: REPOSITORY_NAME ? `/${REPOSITORY_NAME}/` : '/',
            },
            resolve: {
                extensions: [
                    '.mjs',
                    '.js',
                    '.json',
                    '.css',
                    '.m.css',
                    '.png',
                    '.jpg'
                ],
                modules: [source, 'node_modules'],
            },
            optimization: {
                nodeEnv: process.env.NODE_ENV,
            },
        },
    );
};
