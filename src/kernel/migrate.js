import migrations from '~/migrations'

function versionToNumber(version) {
    const versionParts = version.split('.')
    return (versionParts[0] * 100000) + (versionParts[1] * 1000) + (versionParts[2])
}

function isNewer(version, otherVersion) {
    return versionToNumber(version) > versionToNumber(otherVersion)
}

export default function(document) {

    if (!document || !document.defaults) {
        return null
    }

    const documentVersion = document.defaults.version || '0.0.0'

    migrations
        // Only find migrations that need to run based on the document version
        .filter (migration => isNewer(migration.before, documentVersion))
        .forEach(migration => {
            document = migration.up(document)
        })
    
    // Finally update the document's version
    document.defaults.version = SWD_VERSION

    return document
}