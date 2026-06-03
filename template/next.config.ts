import { NextConfig } from "next";
import CONTENT_SECURITY_POLICY_CONFIG from "./src/configs/content-security-policy.config";

function nextConfig(): NextConfig {
    return {
        reactCompiler: true,
        headers: () => [{
            source: "/(.*)",
            headers: [{
                key: "Content-Security-Policy",
                value: CONTENT_SECURITY_POLICY_CONFIG
            }]
        }]
    };
}

export default nextConfig;
