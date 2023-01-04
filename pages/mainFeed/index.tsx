import type { NextPage } from "next"
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState, useEffect } from "react";
import { Text } from "@nextui-org/react";
import ArticleCard from "../../components/ArticleCard";

const Mainfeed: NextPage = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser()
    const router = useRouter() //use supabase throughout components
    const [articles,setArticles] = useState<string[]>([])


    useEffect(() => {
        getArticles();
    },[])

    const getArticles = async () => {
        try {
            const {data,error} = await supabaseClient
            .from("articles")
            .select("*")
            .limit(10)
            if (data != null) {
                setArticles(data)
            }
        } catch(error: any) {
            alert(error.message)
        }
    }

    return (
        <>
            <Text h2>Main Feed</Text>
            <Text size="$lg" css={{my: "$8"}}>
                Check out articles here
            </Text>
            {/* article card */}
            {articles.map((article) => (
                <ArticleCard article={article} />
            ))}
        </>
    )
}

export default Mainfeed;