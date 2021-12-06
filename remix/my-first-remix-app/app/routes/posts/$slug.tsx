import { useLoaderData } from "remix";
import invariant from "tiny-invariant";

import { getPost } from "~/post";

import type { LoaderFunction } from "remix";

export let loader: LoaderFunction = ({ params }) => {
    // in documentation there is an async, no need for it
    invariant(params.slug, "expected params.slug");
    return getPost(params.slug);
};

export default function PostSlug() {
    let post = useLoaderData();

    return (
        <div>
            <h1>Some Post: {post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
    );
}
