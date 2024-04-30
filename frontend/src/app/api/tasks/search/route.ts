import {authenticate} from "@/src/app/api/login/utils";
import client from "@/src/app/client";
import {SEARCH_TASK_BY_NAME} from "@/src/app/api/graphql";
import {
    BAD_AUTH,
    TASKS_SEARCH_STRING_NOT_PROVIDED,
} from "@/src/app/utils/messages";

export async function POST(request: Request) {
    const {searchString} = (await request.json()) ?? {searchString: null};

    if (!searchString)
        return new Response(
            JSON.stringify({message: TASKS_SEARCH_STRING_NOT_PROVIDED}),
            {
                status: 401,
            },
        );

    const {user_id: userId} = authenticate(request) ?? {user_id: null};

    if (!userId)
        return new Response(JSON.stringify({message: BAD_AUTH}), {
            status: 401,
        });

    const data = await client.query({
        query: SEARCH_TASK_BY_NAME,
        variables: {userId, searchString},
        fetchPolicy: "no-cache",
    });
    return Response.json(data.data.searchTasksByName);
}
