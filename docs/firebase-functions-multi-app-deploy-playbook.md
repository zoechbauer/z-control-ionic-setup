# Multi-App Firebase Functions Playbook (Tailored)

## Scope

This document is tailored to the current setup in this repository and your related apps.

Current known mapping:

- `appId: ionic_setup` -> `collection: ZC_ionic_setup`
- `appId: translator` -> `collection: MLT_translations_statistics`

Primary goal:

- Reuse one backend pattern for multiple apps
- Keep contingent statistics structure consistent
- Prevent crashes for old app versions during migration

## Current Source Of Truth

Frontend constants:

- `src/app/shared/app.constants.ts`
  - `FireStoreConstants.COLLECTION_NAME = 'ZC_ionic_setup'`
  - `FireStoreConstants.APP_ID = 'ionic_setup'`

Backend constants:

- `functions/src/shared/app.constants.ts`
  - `FireStoreConstants.COLLECTION_NAME = 'ZC_ionic_setup'`
  - `APP_TO_COLLECTION` map includes `ionic_setup` and `translator`

## Firestore Structure Per App

Use the same subtree for each app root collection.

```text
<collection>/
  userMapping/
    users/
    programmerDevices/
  <YYYY-MM>/
    users/
    meta/
      totalChars
      contingentData
```

Concrete examples:

```text
ZC_ionic_setup/
MLT_translations_statistics/
```

## Contract Rules (Required)

1. FE sends `appId` in callable payloads.
2. BE reads `appId` from `request.data`.
3. BE converts `appId` to collection via `getCollectionByAppId(...)`.
4. BE never accepts a raw collection path from FE.

## Required Callable Payload Pattern

For callables that read/write contingent or user-mapping data, payload must include:

```ts
{
  appId: FireStoreConstants.APP_ID,
  // function-specific fields
}
```

## Backward Compatibility Policy

Use a migration window so existing users do not crash.

Recommended behavior for translator functions during migration:

- If `appId` is present: map normally
- If `appId` is missing: default to `translator` collection (`MLT_translations_statistics`)

Reason:

- Old translator app versions might not send `appId`
- Strictly requiring `appId` immediately can break those clients

After most users updated, you can enforce strict `appId`.

## Deployment Safety (Critical)

If multiple apps deploy to the same Firebase project:

- Deploying one repo can replace function implementations with same function names
- Removing a function file can trigger function deletion in deploy flow

To avoid accidental cross-app breakage, prefer one of these:

1. Separate Firebase project per app (safest)
2. Same project with multiple Functions codebases (good compromise)

Single shared codebase in one project requires strict release discipline.

## Setup And Deploy Steps

1. Build and type-check functions.

```bash
npm --prefix functions run build
```

2. Run tests.

```bash
npm --prefix functions run test
```

3. Validate emulator behavior.

```bash
firebase emulators:start --only functions,firestore
```

4. Deploy functions.

```bash
firebase deploy --only functions
```

## No-Downtime Rollout Sequence

1. Backend deploy with appId support plus translator fallback.
2. Frontend release that sends `appId` for translator and setup app.
3. Monitor logs/errors.
4. Later remove fallback and enforce strict `appId`.

## Checklist Before Every Deploy

- [ ] `request.data.appId` is used (not `request.appId`)
- [ ] `getCollectionByAppId(...)` contains all active apps
- [ ] Unknown appIds return `invalid-argument`
- [ ] Old translator clients still supported (during migration window)
- [ ] No accidental deletion of still-used functions

## Suggested Next App Onboarding (Example: image-to-text)

When adding a new app:

1. FE app constants:

- `APP_ID = 'image_to_text'`
- app-local `COLLECTION_NAME` for paths

2. BE mapping:

- Add `image_to_text` entry in `APP_TO_COLLECTION`

3. Reuse same contingent/user-mapping callable contract.

4. Release with same compatibility policy if legacy clients exist.

## Notes On Interfaces

Interfaces in `functions/src/shared/firebase-firestore.interfaces.ts` are compile-time only.

- Deleting interfaces does not directly change deployed runtime behavior.
- Runtime behavior changes only through callable/service implementation changes and deployments.

Keep interfaces aligned with active callable payloads to preserve type safety and readable code.
