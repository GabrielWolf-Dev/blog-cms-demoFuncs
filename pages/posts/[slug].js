import * as prismic from '@prismicio/client';
import Link from 'next/link';
import { getPrismicClient } from "../../services/prismic";

export default function Posts(props){
    return(
        <div>
            <h1>Posts vindos no CMS Prismic!</h1>
            <br/>

            <article key={props.post.slug}>
                <h2>{props.post.title}</h2>
                <p>{props.post.content}</p>
                <br />
                <p>{props.post.subContent}</p>
            </article>

            <Link href="/" passHref>Voltar</Link>
        </div>
    );
}

export async function getStaticPaths() {
    const prismicFuncs = getPrismicClient();
  
    const postsSlugs = await prismicFuncs.get([prismic.predicate.at("document.type", "posts")]);
    const paths = postsSlugs.results.map(datas => {
        return {
          params: {
            slug: datas.uid
          },
        }
      });

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(context) {
    const prismicFuncs = getPrismicClient();
    const { slug } = context.params;
    const res = await prismicFuncs.getByUID("posts", String(slug), {});

    const post = {
        slug: res.uid,
        title: res.data.title[0].text,
        content: res.data.content[0].text,
        subContent: res.data['sub-content'][0].text
    };
  
    return {
      props: {
        post
      },
      revalidate: 1800
    };
  }