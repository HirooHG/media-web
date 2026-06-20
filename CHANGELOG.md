# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.11.0] - 2026-06-20

- Added a "Continue to read" or "Start to read" button that would refer to the bookmarked chapter

## [1.10.0] - 2026-06-17

### Added

- Implemented bookmarks, only one by media
- Added search with command + K button beside the filters in the media list

## [1.9.0] - 2026-06-12

### Added

- Implemented the media search through a dialog pressing the shortcut "cmd+K"

### Fixed

- Refresh token correctly refreshing

## [1.8.0] - 2026-05-17

### Added

- Introduced the sidebar, with the current page indicator, theme toggler, websockets status and logout

## [1.7.0] - 2026-05-17

### Added

- Unique chapter, distinch grouping translators
- Permit to go home on error

### Fix

- Media title fixed height to avoid overflow

## [1.6.0] - 2026-05-14

### Added

- Load all current media list images
- Filters under the media list title in a collapsible icon
- Clear media status select option
- Introduced Loading in background all media chapters images thanks to websockets

### Fixed

- Overflow to auto, not showing the plain white scroll indicator

## [1.5.0] - 2026-04-27

### Added

- Media list pagination: Added pagination last page and disabling next button on reaching last page
- Chapter: Added possibility to change the image width
- Added Logout from app and Keycloak

## [1.4.0] - 2026-04-25

### Added

- Option select medias per page in media list page
- Go to next, previous, precise chapter or home pages with fixed buttons in chapter page
- Dark theme with its toggle

### Fixed

- Description scroll
- Safe parse of media and chapter id params
- Remove flexible media list width

## [1.3.0] - 2026-04-24

### Added

- Go back buttons in media details and chapter pages
- Go up button in chapter page

### Fixed

- Keycloak refresh token would not work

## [1.2.0] - 2026-04-23

### Added

- Keycloak Authentication

### Changed

- Improved global page layout

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
