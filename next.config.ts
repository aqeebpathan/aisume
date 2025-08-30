import path from "path"
import type { NextConfig } from "next"
import type { Configuration, RuleSetRule, RuleSetCondition } from "webpack"

function isRuleSetRule(rule: unknown): rule is RuleSetRule {
  return typeof rule === "object" && rule !== null && "test" in rule
}

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    // Find the rule that handles SVG imports
    const fileLoaderRule = config.module?.rules?.find(
      (rule): rule is RuleSetRule =>
        isRuleSetRule(rule) &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg"),
    )

    if (!fileLoaderRule) {
      throw new Error("Could not find file loader rule for SVGs")
    }

    config.module?.rules?.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: {
          not: [
            ...(Array.isArray(
              fileLoaderRule.resourceQuery as RuleSetCondition | undefined,
            )
              ? (fileLoaderRule.resourceQuery as RuleSetCondition[])
              : []),
            /url/,
          ],
        } as RuleSetCondition,
        use: ["@svgr/webpack"],
        // Exclude Next.js metadata SVGs (like app/icon.svg)
        exclude: [path.resolve(__dirname, "src/app/icon.svg")],
      },
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },

  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
}

export default nextConfig
