import fs from "fs"
import { glob } from "glob"
import path from "path"

interface TranslationKey {
    key: string
    file: string
    fullPath: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractKeysFromObject(obj: any, prefix = ""): string[] {
    if (!obj || typeof obj !== "object") return []

    return Object.entries(obj).reduce((acc: string[], [key, value]) => {
        const currentKey = prefix ? `${prefix}.${key}` : key
        if (value && typeof value === "object") {
            return [...acc, ...extractKeysFromObject(value, currentKey)]
        }
        return [...acc, currentKey]
    }, [])
}

function findI18nFiles(rootDir: string): string[] {
    return glob.sync("**/*i18n.ts", {
        cwd: rootDir,
        absolute: true,
        ignore: ["**/node_modules/**", "**/dist/**", "**/build/**"]
    })
}

function extractTranslationKeys(filePath: string): TranslationKey[] {
    const content = fs.readFileSync(filePath, "utf-8")

    try {
        // Extract the en object content - look for const en = { ... }
        const match = content.match(
            /const\s+en\s*=\s*({[\s\S]*?})\s*(?:\n\s*const|\n\s*export|\n\s*$|$)/
        )
        if (!match) return []

        // Instead of parsing as JSON, let's use a different approach
        // We'll dynamically evaluate the object in a safe way
        const objStr = match[1]

        try {
            // Create a safe evaluation context
            const evalFunction = new Function("return " + objStr)
            const translations = evalFunction()
            const keys = extractKeysFromObject(translations)

            return keys.map(key => ({
                key,
                file: path.relative(process.cwd(), filePath),
                fullPath: filePath
            }))
        } catch (evalError) {
            console.error(`Evaluation error in ${filePath}:`, evalError)
            return []
        }
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error)
        return []
    }
}

function searchForKeyUsage(key: string, rootDir: string): boolean {
    try {
        const files = glob.sync("**/*.{ts,tsx}", {
            cwd: rootDir,
            absolute: true,
            ignore: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/*.d.ts"]
        })

        const keyParts = key.split(".")
        const lastPart = keyParts[keyParts.length - 1]

        for (const file of files) {
            // Skip i18n files themselves
            if (file.endsWith("i18n.ts")) continue

            const content = fs.readFileSync(file, "utf-8")

            // Search patterns
            const patterns = [
                `dictionary.${key}`, // Direct access
                `["${key}"]`, // Array access with double quotes
                `['${key}']`, // Array access with single quotes
                `\`${key}\``, // Template literal
                `"${lastPart}"`, // Just the last part in quotes
                `'${lastPart}'`, // Just the last part in single quotes
                `\`${lastPart}\`` // Just the last part in template literal
            ]

            if (patterns.some(pattern => content.includes(pattern))) {
                return true
            }
        }

        return false
    } catch (error) {
        console.error("Error searching for key usage:", error)
        return true // Assume used if there's an error
    }
}

async function main() {
    const rootDir = process.cwd()
    const i18nFiles = findI18nFiles(rootDir)
    const allKeys: TranslationKey[] = []

    console.log("Analyzing translation files...\n")

    // Extract all translation keys
    for (const file of i18nFiles) {
        const keys = extractTranslationKeys(file)
        if (keys.length > 0) {
            console.log(`Found ${keys.length} keys in ${path.relative(rootDir, file)}`)
            allKeys.push(...keys)
        } else {
            console.log(`No keys found in ${path.relative(rootDir, file)}`)
        }
    }

    console.log(`\nFound ${allKeys.length} total translation keys in ${i18nFiles.length} files.\n`)
    console.log("Searching for unused keys...\n")

    // Find unused keys
    const unusedKeys = allKeys.filter(({ key }) => !searchForKeyUsage(key, rootDir))

    // Group unused keys by file
    const unusedByFile = unusedKeys.reduce(
        (acc, key) => {
            if (!acc[key.file]) {
                acc[key.file] = []
            }
            acc[key.file].push(key.key)
            return acc
        },
        {} as Record<string, string[]>
    )

    // Print results
    console.log("\nUnused translation keys found:\n")

    if (Object.keys(unusedByFile).length === 0) {
        console.log("No unused translation keys found!")
    } else {
        Object.entries(unusedByFile).forEach(([file, keys]) => {
            console.log(`\nFile: ${file}`)
            console.log("Unused keys:")
            keys.sort().forEach(key => console.log(`  - ${key}`))
        })
    }

    console.log(`\nTotal unused keys: ${unusedKeys.length}`)
}

main().catch(console.error)
