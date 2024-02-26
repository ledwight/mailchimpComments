import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import Comment from "@/Components/Comment";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, Head } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Index({ auth, comments }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: "",
        commenter: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("comments.store"), {
            onSuccess: () => {
                toast(`New Comment from ${data.commenter}!`);
                reset();
            },
        });
    };

    const deleteAll = (e) => {
        e.preventDefault();
        post(route("comments.deleteAll"), { onSuccess: () => {
            reset() 
            toast("All Comments Deleted")
        }
    });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Comments" />
            <ToastContainer />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input
                        value={data.commenter}
                        placeholder="What's your name?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("commenter", e.target.value)}
                    ></input>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block mt-2 w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={(e) => setData("message", e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Comment
                    </PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
                <div className="mt-6">
                    <form onSubmit={deleteAll}>
                        <DangerButton>Delete All Comments</DangerButton>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
