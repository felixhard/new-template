import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Example code - Below we use fetch to get the blog data from the tRPC API and map the slugs to their relevant
    // URLs so that we can then supply Google Search Console with a dynamic sitemap to crawl. This will live at https://myurl.com/sitemap.xml
    // Fetch blogs data from the tRPC API
    // try {
    //     const blogResponse = await fetch(
    //         "https://myurl.com/api/trpc/blog.findMany"
    //     );
    //     const blogData = await blogResponse.json();
    //     const blog = blogData.result.data;

    //     const blogUrls = (blog || []).map((blog: any) => ({
    //         url: `https://myurl.com/${blog.slug}`,
    //         lastModified: new Date().toISOString(),
    //         changeFrequency: "weekly" as const,
    //         priority: 0.7,
    //     }));
    // } catch (error) {
    //     console.error("Error fetching blog data:", error);
    // }

    // Return combined sitemap
    return [
        {
            // @todo: update this URL
            url: "https://myurl.com",
            priority: 1,
        },
        // ...blogUrls,
    ];
}
