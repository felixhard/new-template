import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/private/",
        },
        // @todo: add domain here
        sitemap: "https://home.com/sitemap.xml",
    };
}
