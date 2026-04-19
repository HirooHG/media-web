# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Changed

- Global layout unconstraigned to be in the middle

## [1.1.0] - 2026-04-18

### Added

- Minio handling
- Sign in form and account/session management
- Added a toast
- Home, previous and next button in the chapter page

### Changed

- Better code architecture
- Migrated thunks to redux toolkit API

### Fixed

- Remove use effects to remove case of bug

## [1.0.1] - 2026-01-03

### Fixed

- Refresh comic list with status
- Status filter disfunctional
- Migration from npm to bun
- Comic page status doesn't display
- UX : wider scroll for comics page
- Sync media-api v1.1.1 changes: images with ids

## [1.0.0] - 2025-12-28

### Added

- Comick media followed only
- A page list of media
- Paginate the list
- Filter by media status
- A page of media details, chapters & image
- A page Comick media chapter details with images
- Nextjs integration
- Shadcn UI components
- Redux state management
