import client from "@/src/app/client";
import {authenticate} from "@/src/app/api/login/utils";
import {
    ADD_TASK,
    DELETE_TASK,
    GET_All_TASKS_BY_USER_ID,
    UPDATE_TASK,
} from "@/src/app/api/graphql";
import {BAD_AUTH} from "@/src/app/utils/messages";

export async function POST(request: Request) {
    const {user_id: userId} = authenticate(request) ?? {user_id: null};
    if (!userId)
        return new Response(JSON.stringify({message: BAD_AUTH}), {
            status: 401,
        });

    const data = await client.query({
        query: GET_All_TASKS_BY_USER_ID,
        variables: {userId},
        fetchPolicy: "no-cache",
    });
    return Response.json(data.data.getAllTasksByUserId);
}

export async function PUT(request: Request) {
    const {user_id: userId} = authenticate(request) ?? {user_id: null};
    if (!userId)
        return new Response(JSON.stringify({message: BAD_AUTH}), {
            status: 401,
        });

    const res = await request.json();

    const data = await client.mutate({
        mutation: ADD_TASK,
        variables: {
            input: {
                ...res,
                user_id: userId,
            },
        },
        fetchPolicy: "no-cache",
    });

    return Response.json(data.data.createTask);
}

export async function PATCH(request: Request) {
    const {user_id: userId} = authenticate(request) ?? {user_id: null};

    if (!userId)
        return new Response(JSON.stringify({message: BAD_AUTH}), {
            status: 401,
        });

    const res = await request.json();

    const data = await client.mutate({
        mutation: UPDATE_TASK,
        variables: {
            input: {
                ...res,
                user_id: userId,
            },
        },
        fetchPolicy: "no-cache",
    });
    return Response.json(data.data.updateTask);
}

export async function DELETE(request: Request) {
    const {user_id: userId} = authenticate(request) ?? {user_id: null};
    if (!userId)
        return new Response(JSON.stringify({message: BAD_AUTH}), {
            status: 401,
        });

    const res = await request.json();

    const data = await client.mutate({
        mutation: DELETE_TASK,
        variables: {
            userId: userId,
            taskId: res.task_id,
        },
        fetchPolicy: "no-cache",
    });
    return Response.json(data.data.deleteTask);
}
