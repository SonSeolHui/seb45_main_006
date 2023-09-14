import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@component/Button";
import Typography from "@component/Typography";
import Report from "@component/project-study/Report";

import { useCheckUser } from "@hook/useCheckUser";
import { useGetDetailProject } from "@api/project/hook";
import { useDeleteProject } from "@api/project/hook";
import { useToast } from "@hook/useToast";
import Bookmark from "@component/board/Bookmark";

// import { GetResDetailProject } from "@type/project/project.res.dto";

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const boardId = location.state;
    const [isBookmarked, setIsBookmarked] = useState(false);

    const { fireToast, createToast, errorToast } = useToast();
    const { data: projectInputs } = useGetDetailProject({ boardId: boardId });
    const { isMine } = useCheckUser({ memberId: projectInputs?.memberProfile.memberId || 0 });
    const { mutate: deleteProject } = useDeleteProject();

    const onClickDeleteHandler = () => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteProject(
                    { boardId: projectInputs?.boardId || 0 },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "게시글이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            navigate("/projects");
                        },
                        onError: (err) => {
                            console.log(err);
                            errorToast();
                        },
                    },
                );
            },
        });
    };

    return (
        <div>
            <div className="m-20 flex gap-20">
                <section
                    // eslint-disable-next-line tailwindcss/no-custom-classname
                    className={`relative flex w-3/4 justify-between rounded-2xl border-2 border-solid border-borderline ${
                        projectInputs?.projectStatus === "PROJECT_POSTED" ? "" : "bg-gray-300"
                    }`}
                >
                    <div>
                        {projectInputs?.projectStatus === "PROJECT_POSTED" ? (
                            <div className="absolute left-16 top-10 flex h-28 w-56 items-center justify-center rounded bg-deadline ">
                                <Typography type="SmallLabel" text="모집중" styles="text-white" />
                            </div>
                        ) : (
                            <div className="absolute left-16 top-10 flex h-30 w-68 items-center justify-center rounded bg-gray-600">
                                <Typography type="SmallLabel" text="모집완료" styles="text-white" />
                            </div>
                        )}
                        <h3 className="mx-20 mt-40">
                            <div className="mx-4 text-40 font-bold">{projectInputs?.title || ""}</div>
                        </h3>
                        <ul className="flex flex-col p-20">
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 상세내용" />
                                <div className="mx-4 my-6">{projectInputs?.content || ""}</div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 요구 스택" />

                                <div className="mx-4 my-6">java, javascript</div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 기간" />
                                <div className="mx-4 my-6">
                                    {projectInputs?.startDate || ""} ~ {projectInputs?.deadline || ""}
                                </div>
                            </li>
                            <li className="my-10">
                                <Typography type="Label" styles="list-disc" text="• 인원" />

                                <div className="mx-4 my-6">{projectInputs?.recruitNum || 0}명</div>
                            </li>
                        </ul>
                    </div>
                    {isMine && (
                        <div className="flex">
                            <Button
                                type="PROJECT_POINT"
                                styles="px-4 py-2 rounded-sm"
                                onClickHandler={() =>
                                    navigate(`/projects/${projectInputs?.boardId}/edit`, { state: projectInputs })
                                }
                            >
                                <Typography text="수정" type="Description" color="text-white" />
                            </Button>
                            <Button type="WARN" styles="px-4 py-2 rounded-sm" onClickHandler={onClickDeleteHandler}>
                                <Typography text="삭제" type="Description" color="text-white" />
                            </Button>
                        </div>
                    )}
                    <div>
                        <Bookmark
                            board="project"
                            boardId={projectInputs?.boardId || 0}
                            isBookmarked={isBookmarked}
                            setIsBookmarked={setIsBookmarked}
                        />
                        <Report />
                    </div>
                </section>
                <div className="flex w-1/4 flex-col items-center">
                    <div className="h-200 w-full border-2 border-solid border-borderline">유저리스트</div>
                    <Button type="PROJECT_POINT" styles="font-semibold m-20" isFullBtn={true}>
                        <Typography type="Body" text="참여하기" />
                    </Button>
                </div>
            </div>
            <div className="ml-20">
                <Typography type="Label" text="댓글 0개" />
            </div>
            <div className="mx-20 flex items-start">
                <div className="mt-20 h-40 w-40 rounded-3xl bg-deadline">유저</div>
                <textarea className="m-20 h-100 w-11/12 rounded-xl border-2 border-solid border-borderline" />
            </div>
            <Button type="PROJECT_POINT" styles="font-semibold mx-20" isFullBtn={false}>
                <Typography type="Body" text="댓글등록" />
            </Button>
        </div>
    );
};

export default Details;
