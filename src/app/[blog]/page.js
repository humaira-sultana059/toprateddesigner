"use client";
import ContactModal from "@/components/ContactModal";
import { blogDetails } from "@/constants/constants";
import { formatDate } from "@/func";
import Head from "next/head";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const blog = searchParams.get("blog");

  const blogItem = blog ? JSON.parse(blog) : null;
  const {
    uid,
    title,
    content,
    images,
    slug,
    summary,
    keywords,
    updated_at,
    author,
  } = blogItem || {};

  // const filteredBlog = blogDetails.filter((item) => item.id === id)[0];

  // if (!filteredBlog) {
  //   return <div className="text-center py-20">Blog post not found</div>;
  // }

  return (
    <>
      <Head>
        <title>{slug || title}</title>
        <meta name="description" content={summary} />
        <meta
          name="keywords"
          content={
            keywords ||
            "web development, high-performance websites, SEO, mobile optimization, UX design"
          }
        />
        <meta property="og:title" content={slug} />
        <meta property="og:description" content={summary} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={updated_at} />
        <meta property="article:author" content={author} />
        <meta property="og:image" content={images[1]} />
        <meta name="twitter:card" content="summary_large_image" />
        <link
          rel="canonical"
          href={`https://toprateddesigner.com/blog/${title}/${slug}`}
        />
      </Head>

      <div itemScope itemType="https://schema.org/BlogPosting">
        {/* Structured data for breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://toprateddesigner.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://toprateddesigner.com/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: `https://toprateddesigner.com/blog/${title}/${slug}`,
              },
            ],
          })}
        </script>

        {/* Home button */}
        <Link
          href="/"
          className="bg-gradient-to-r from-cyan-500/70 to-blue-500/70 blackdrop-blur-lg text-white px-2 py-1 rounded-md fixed top-5 left-10 max-sm:left-5 flex flex-row font-alata items-center text-[12px] max-sm:text-[11px] z-50"
          aria-label="Return to home page"
        >
          <img
            src="/assets/logo-2.svg"
            className="w-[70px] h-[30px]"
            alt="Company logo"
          />
          <i
            className="fa-solid fa-house mr-1 text-[10px] max-sm:text-[8px]"
            aria-hidden="true"
          ></i>
          <p>Home</p>
        </Link>

        <main className="px-10 max-md:px-5 pb-20">
          <article>
            <header className="mb-8">
              <div className="flex flex-row justify-center">
                <img
                  src={images[0].image_url}
                  className="h-[500px] max-sm:h-[380px] w-full object-contain"
                  alt={title}
                  loading="lazy"
                />
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <span itemProp="datePublished">{formatDate(updated_at)}</span>
                <span className="mx-2">•</span>
                <span itemProp="author">{author}</span>
              </div>
              <h1
                className="text-[48px] max-md:text-[32px] max-sm:text-[24px] font-semibold font-sans mt-4"
                itemProp="headline"
              >
                {title}
              </h1>
            </header>

            <div itemProp="articleBody">
              {" "}
              <BlogPost content={content} />
            </div>
          </article>
        </main>

        {/* Floating CTA Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 
          bg-gradient-to-r from-blue-500 to-purple-500 text-white 
          px-6 max-sm:px-2 py-3 w-[230px] max-sm:w-[180px] text-center rounded-lg 
          shadow-lg transition-all duration-300 ease-in-out
          hover:shadow-[0px_0px_20px_5px_rgba(59,130,246,0.3),0px_0px_20px_5px_rgba(139,92,246,0.3)] 
          flex flex-row items-center gap-2 group"
          aria-label="Start a project with us"
        >
          <p className="ml-2 max-sm:ml-4 font-alata text-[16px] max-sm:text-[13px] text-white font-semibold hover:font-bold">
            Let's Start a Project
          </p>
          <div className="absolute right-5 top-[21px] transform -translate-y-1/2 duration-500">
            <span className="inline-block animate-slide text-2xl max-sm:text-lg text-white">
              →
            </span>
          </div>
        </button>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

function BlogPost({ content }) {
  // Split the content into paragraphs at each \\n\\n
  const paragraphs = content
    .split("\\n\\n")
    .filter((paragraph) => paragraph.trim() !== ""); // Remove empty paragraphs

  return (
    <div className="blog-content">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export default Page;
