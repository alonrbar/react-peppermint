# Change Log

## [Unreleased](https://github.com/alonrbar/react-peppermint)

## [1.0.1 - 2019-04-23](https://github.com/alonrbar/react-peppermint/tree/v1.0.1)

### Fixed

- Fix view-model properties not being copied on certain Object.assign implementations (e.g. when compiling with babel).

## [1.0.0 - 2018-12-01](https://github.com/alonrbar/react-peppermint/tree/v1.0.0)

### Added

- Publish to npm.
- Set display name of withViewModel HOC.
- Support multiple 'activate' and 'deactivate' methods.

### Changed

- 'activate' now also refresh the view.
- Update readme and typings.
- Major internal code refactor.

## [0.3.0 - 2018-07-11](https://github.com/alonrbar/react-peppermint/tree/v0.3.0)

### Added

- Update typings.
- Raise event instead of log on activate and deactivate.

## [0.2.0 - 2018-06-21](https://github.com/alonrbar/react-peppermint/tree/v0.2.0)

### Changed

- Raise event instead of log when method invoked.

### Fixed

- Patch view-model instance only once.

## [0.1.0 - 2018-06-21](https://github.com/alonrbar/react-peppermint/tree/v0.1.0)

### Added

- Better support for async methods.

## [0.0.2 - 2018-06-15](https://github.com/alonrbar/react-peppermint/tree/v0.0.2)

- First working version.

## [0.0.1 - 2018-05-16](https://github.com/alonrbar/react-peppermint)

- Welcome react-peppermint!

---

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

#### [Types of changes](http://keepachangelog.com)

- **Added** for new features.
- **Changed** for changes in existing functionality.
- **Deprecated** for soon-to-be removed features.
- **Removed** for now removed features.
- **Fixed** for any bug fixes.
- **Security** in case of vulnerabilities.