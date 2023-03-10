import React from "react";
import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity.client";
import BlogList from "@/components/layouts/BlogList";
import PreviewSuspense from "@/components/common/PreviewSuspense";
import PreviewList from "@/components/layouts/PreviewList";

const query = groq`
		*[_type == "post"]{
				...,
				author->,
				topics[]->
		} | order(_createdAt desc)
`;

const Posts = async () => {
  if (previewData()) {
    return (
      <PreviewSuspense fallback={<div>Loading...</div>}>
        <PreviewList query={query} type={"blog"} />
      </PreviewSuspense>
    );
  }
  const posts = await sanityClient.fetch(query);

  return <BlogList posts={posts} />;
};

export default Posts;
