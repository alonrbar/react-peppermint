export default {
    testEnvironment: "node",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    moduleDirectories: ["node_modules"],
    testRegex: "/test/.*[.]tests[.](ts|tsx)$",
    reporters: [
        "default",
        ["jest-junit", { outputDirectory: "test-reports" }],
        ["jest-html-reporters", {
            publicPath: "./test-reports",
            filename: "report.html",
            urlForTestFiles: "https://github.com/alonrbar/react-peppermint/blob/develop",
            inlineSource: true,
        }]
    ]
};
