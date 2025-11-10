#!/usr/bin/env node

import os from "node:os";
import fs from "node:fs";
import degit from "degit";
import path from "node:path";

import { execSync } from "node:child_process";

const cwd = process.cwd();

(async () => {

    console.log("🚀 Creating frontend app...\n");


    console.log("\t- 🔃 Generating Next.js app...");

    const emitter = degit("LarsSK06/frontend-template");

    const tempFolderPath = path.join(os.tmpdir(), `${Date.now()}-create-frontend-app`);

    await emitter.clone(tempFolderPath);

    execSync("npx create-next-app . --yes --empty --skip-install");

    console.log("\t  ✅ Generated Next.js app!\n");


    console.log("\t- 🔃 Cloning files from template...");

    for (const objName of [
        "src",
        "public",
        "postcss.config.mjs",
        "next.config.ts"
    ]) {
        const absoluteCwdPath = path.join(cwd, objName);
        const absoluteTempFolderPath = path.join(tempFolderPath, objName);
        
        if (fs.existsSync(absoluteCwdPath)) {
            const stat = fs.statSync(absoluteCwdPath);

            if (stat.isFile()) fs.unlinkSync(absoluteCwdPath);
            else fs.rmSync(absoluteCwdPath, { recursive: true, force: true });
        }

        fs.cpSync(
            absoluteTempFolderPath,
            absoluteCwdPath,
            { recursive: true }
        );
    }

    console.log("\t  ✅ Cloned files from template!\n");


    console.log("\t- 🔃 Formatting files...");

    for (const fileName of [
        "package.json",
        "package-lock.json",
        "tsconfig.json"
    ]) {
        const absolutePath = path.join(cwd, fileName);

        if (!fs.existsSync(absolutePath))
            continue;

        const fileContent = fs.readFileSync(absolutePath).toString();

        fs.writeFileSync(
            absolutePath,
            JSON.stringify(JSON.parse(fileContent), null, 4)
        );
    }

    console.log("\t  ✅ Formatted files!\n");


    console.log("\t- 🔃 Deleting unnecessary files...");

    for (const objName of [
        "README.md"
    ]) {
        const absolutePath = path.join(cwd, objName);

        if (!fs.existsSync(absolutePath))
            continue;

        const stat = fs.statSync(absolutePath);

        if (stat.isFile()) fs.unlinkSync(absolutePath);
        else fs.rmSync(absolutePath, { recursive: true, force: true });
    }

    console.log("\t  ✅ Deleted unnecessary files!");

})();