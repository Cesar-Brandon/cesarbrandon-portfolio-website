import React from "react";
import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity.client";
import PreviewSuspense from "@/components/common/PreviewSuspense";
import PreviewList from "@/components/layouts/PreviewList";
import ProjectList from "@/components/layouts/ProjectList";

const query = groq`
		*[_type == "project"]{
				...,
				author->,
				topics[]->
		} | order(_createdAt desc)
`;

const Projects = async () => {
  if (previewData()) {
    return (
      <PreviewSuspense fallback={<div>Loading...</div>}>
        <PreviewList query={query} type={"project"} />
      </PreviewSuspense>
    );
  }

  const projects = await sanityClient.fetch(query);

  return <ProjectList projects={projects} />;
};

export default Projects;
