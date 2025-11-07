#!/usr/bin/env node

import os from "node:os";
import fs from "node:fs";
import degit from "degit";
import path from "node:path";

import { execSync } from "node:child_process";

const cwd = process.cwd();

(async () => {

    console.log("🔃 Creating frontend app...");

    const emitter = degit("LarsSK06/frontend-template");

    const tempFolderPath = path.join(os.tmpdir(), `${Date.now()}-create-frontend-app`);

    await emitter.clone(tempFolderPath);

    execSync("npx create-next-app . --yes --empty --skip-install");

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

    console.log("✅ Created frontend app!");

})();