import { RefObject, useRef, useState } from "react";

import { useRecoilState } from "recoil";
import { isChatBotShowAtom, chatBotStatusAtom } from "@feature/chat";

import { useGetChatRooms } from "@api/chat/hook";

import IconLogo from "@assets/icon_logo.png";
import Typography from "@component/Typography";

import { AiOutlineClose } from "react-icons/ai";
import ChatRoomList from "./component/ChatRoomList";
import ChatRoomItem from "./component/ChatRoomItem";

function ChatBot() {
    const { data: chats } = useGetChatRooms();

    const chatBtnRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    const [chatBotStatus, setChatBotStatus] = useRecoilState(chatBotStatusAtom);
    const [isChatBotShow, setIsChatBotShow] = useRecoilState(isChatBotShowAtom);
    // TODO: 채팅방 생성 후 채팅방 입장이 되지 않는 이슈 수정 필요

    const [isDescriptionShow, setIsDescriptionShow] = useState(true);

    // useEffect(() => {
    //     const outsideClick = (e: MouseEvent) => {
    //         if (isChatBotShow && !chatBtnRef.current?.contains(e.target as Node)) {
    //             setIsChatBotShow(false);
    //         }
    //     };

    //     document.body.addEventListener("click", outsideClick);

    //     return () => {
    //         document.body.removeEventListener("click", outsideClick);
    //     };
    // }, [isChatBotShow, setIsChatBotShow]);

    return (
        <div ref={chatBtnRef}>
            {isChatBotShow && (
                <ol className="fixed bottom-100 right-30 h-500 w-300 overflow-auto rounded-md border-1 border-main bg-white p-8 shadow-sm shadow-main">
                    {chatBotStatus === "LIST" && <ChatRoomList chats={chats} />}

                    {chatBotStatus === "DETAIL" && <ChatRoomItem />}
                </ol>
            )}

            {isDescriptionShow && !isChatBotShow && (
                <div className="fixed bottom-100 right-30 h-50 w-280 rounded-md bg-white p-10 shadow-md">
                    <div className="flex justify-between">
                        <Typography text="하단 버튼을 눌러주시면" type="Description" />
                        <button onClick={() => setIsDescriptionShow(false)}>
                            <AiOutlineClose size="0.8rem" />
                        </button>
                    </div>
                    <Typography text="내가 참여중인 채팅방 리스트를 확인할 수 있어요!" type="Description" />
                </div>
            )}

            <button
                className="fixed bottom-30 right-30 h-50 w-50 rounded-lg bg-study"
                onClick={() => {
                    setIsChatBotShow(!isChatBotShow);
                    setIsDescriptionShow(false);
                    setChatBotStatus("LIST");
                }}
            >
                <div className="relative">
                    <img src={IconLogo} alt="DevSquad 로고" width={40} className="absolute left-4 top-0" />
                </div>
                <div className="ml-4 mt-22 h-15 w-40 rounded-3xl bg-[#3b6830]"></div>
            </button>
        </div>
    );
}

export default ChatBot;
